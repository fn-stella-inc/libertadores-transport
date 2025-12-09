package seeds

import (
	"fmt"
	"os"
	"time"

	"server/internal/config"
	"server/internal/models"
	"server/pkgs/logger"
	"server/pkgs/security"

	"github.com/google/uuid"
	"gopkg.in/yaml.v3"
	"gorm.io/gorm"
)

// estructura para leer el YAML de usuarios
type seedUser struct {
	Username        string `yaml:"username"`
	Email           string `yaml:"email"`
	Password        string `yaml:"password"` // texto plano en YAML, se hashea aquí con Argon2
	Role            string `yaml:"role"`     // ADMIN, DRIVER, DISPATCHER
	FirstName       string `yaml:"first_name"`
	LastName        string `yaml:"last_name"`
	DocumentType    string `yaml:"document_type"`
	DocumentNumber  string `yaml:"document_number"`
	PhoneNumber     string `yaml:"phone_number"`
	IsDriver        bool   `yaml:"is_driver"`
	LicenseNumber   string `yaml:"license_number"`
	LicenseCategory string `yaml:"license_category"`
	// AHORA es string, no time.Time
	LicenseExpiresAt string `yaml:"license_expires_at"` // "YYYY-MM-DD"
}

// HandleSeed lee el comando (seed-users, seed-all) desde os.Args[1]
func HandleSeed() {
	if config.DB == nil {
		logger.Log.Error().Msg("database-is-not-initialized.-make-sure-ConnectDB()-sets-config.DB")
		os.Exit(1)
	}

	// comando por defecto: seed-all
	cmd := "seed-all"
	if len(os.Args) >= 2 {
		cmd = os.Args[1]
	}

	var err error

	switch cmd {
	case "seed-users":
		err = SeedUsers()
	case "seed-all":
		if err = SeedUsers(); err != nil {
			break
		}
	default:
		printUsageError(fmt.Sprintf("unknown-command: %s", cmd))
		os.Exit(1)
	}

	if err != nil {
		logger.Log.Error().Err(err).Msgf("seed-command-%s-failed", cmd)
		os.Exit(1)
	}

	logger.Log.Info().Msgf("seed-command-%s-completed-successfully", cmd)
}

func printUsageError(msg string) {
	logger.Log.Error().Msg(msg)
	fmt.Println("Usage: go run cmd/seed/main.go [seed-users | seed-all]")
}

// SeedUsers lee internal/database/seeds/data/user.yml y crea/actualiza usuarios
func SeedUsers() error {
	db := config.DB

	logger.Log.Info().Msg("running-seed-users...")

	const usersFile = "internal/database/seeds/data/user.yml"

	data, err := os.ReadFile(usersFile)
	if err != nil {
		logger.Log.Error().Err(err).Msgf("cannot-read-file-%s", usersFile)
		return err
	}

	var users []seedUser
	if err := yaml.Unmarshal(data, &users); err != nil {
		logger.Log.Error().Err(err).Msg("cannot-unmarshal-user-yaml")
		return err
	}

	if len(users) == 0 {
		logger.Log.Warn().Msg("no-users-found-in-yaml-file")
		return nil
	}

	// servicio de Argon2 para hashear passwords
	argon := security.NewArgon2Service()

	// transacción por seguridad
	return db.Transaction(func(tx *gorm.DB) error {
		for _, su := range users {
			if su.Username == "" {
				logger.Log.Warn().Msg("skipping-user-with-empty-username")
				continue
			}

			// verificar si ya existe por username
			var existing models.User
			err := tx.Where("username = ?", su.Username).First(&existing).Error
			if err == nil {
				logger.Log.Info().Msgf("user-%s-already-exists-skipping", su.Username)
				continue
			}

			// hash de contraseña si viene en YAML (ARGON2)
			var passwordHash string
			if su.Password != "" {
				hash, err := argon.HashPassword(su.Password)
				if err != nil {
					logger.Log.Error().Err(err).Msgf("error-hashing-password-for-user-%s", su.Username)
					return err
				}
				passwordHash = hash
			}

			// crear User
			userID := uuid.New()
			user := models.User{
				ID:       userID,
				Username: su.Username,
				Email:    su.Email,
				Role:     su.Role,
				IsActive: true,
				// PasswordHash lo puedes dejar vacío si siempre usas Credential para login
				PasswordHash: passwordHash,
			}

			if err := tx.Create(&user).Error; err != nil {
				logger.Log.Error().Err(err).Msgf("error-creating-user-%s", su.Username)
				return err
			}

			// crear Credential si hay password
			if passwordHash != "" {
				cred := models.Credential{
					ID:           uuid.New(),
					UserID:       user.ID,
					PasswordHash: passwordHash, // hash Argon2
					Provider:     "credentials",
				}
				if err := tx.Create(&cred).Error; err != nil {
					logger.Log.Error().Err(err).Msgf("error-creating-credential-for-user-%s", su.Username)
					return err
				}
			}

			// crear UserInfo
			userInfo := models.UserInfo{
				ID:             uuid.New(),
				UserID:         user.ID,
				FirstName:      su.FirstName,
				LastName:       su.LastName,
				DocumentType:   su.DocumentType,
				DocumentNumber: su.DocumentNumber,
				PhoneNumber:    su.PhoneNumber,
			}

			if err := tx.Create(&userInfo).Error; err != nil {
				logger.Log.Error().Err(err).Msgf("error-creating-user-info-for-user-%s", su.Username)
				return err
			}

			// si es driver, crear Driver
			if su.IsDriver {
				var licenseExp time.Time
				if su.LicenseExpiresAt != "" {
					licenseExp, err = time.Parse("2006-01-02", su.LicenseExpiresAt)
					if err != nil {
						logger.Log.Error().Err(err).Msgf("invalid-license_expires_at-for-user-%s", su.Username)
						return err
					}
				} else {
					// si no viene fecha, puedes dejarla en cero o poner algo por defecto
					licenseExp = time.Now().AddDate(5, 0, 0)
				}

				driver := models.Driver{
					ID:                uuid.New(),
					UserID:            user.ID,
					LicenseNumber:     su.LicenseNumber,
					LicenseCategory:   su.LicenseCategory,
					LicenseExpiration: licenseExp,
					Status:            "ACTIVE",
				}

				if err := tx.Create(&driver).Error; err != nil {
					logger.Log.Error().Err(err).Msgf("error-creating-driver-for-user-%s", su.Username)
					return err
				}
			}

			logger.Log.Info().Msgf("seeded-user-%s-role-%s", su.Username, su.Role)
		}

		return nil
	})
}
