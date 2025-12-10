package migrations

import (
	"fmt"
	"os"
	"strings"

	"server/internal/config"
	"server/internal/models"
	"server/pkgs/logger"
)

// HandleMigration lee el comando (migrate-up, migrate-down, migrate-reset)
// desde os.Args[1] y ejecuta la acción correspondiente.
func HandleMigration() {
	if config.DB == nil {
		logger.Log.Error().Msg("database-is-not-initialized.-make-sure-ConnectDB()-sets-config.DB")
		os.Exit(1)
	}

	if len(os.Args) < 2 {
		printUsageError("missing-migration-command")
		os.Exit(1)
	}

	cmd := os.Args[1]
	var err error

	switch cmd {
	case "migrate-up":
		err = MigrateUp()
	case "migrate-down":
		err = MigrateDown()
	case "migrate-reset":
		err = MigrateReset()
	default:
		printUsageError(fmt.Sprintf("unknown-command: %s", cmd))
		os.Exit(1)
	}

	if err != nil {
		logger.Log.Error().Err(err).Msgf("migration-command-%s-failed", cmd)
		os.Exit(1)
	}

	logger.Log.Info().Msgf("migration-command-%s-completed-successfully", cmd)
}

func printUsageError(msg string) {
	logger.Log.Error().Msg(msg)
	fmt.Println("Usage: go run cmd/migrate/main.go [migrate-up | migrate-down | migrate-reset]")
}

// MigrateUp crea/actualiza las tablas usando AutoMigrate.
func MigrateUp() error {
	db := config.DB

	logger.Log.Info().Msg("running-migrate-up...")

	return db.AutoMigrate(
		// CORE AUTH / USERS
		&models.User{},
		&models.UserInfo{},
		&models.Driver{},
		&models.OAuthAccount{},
		&models.Credential{},

		// TRANSPORT CORE
		&models.Vehicle{},
		&models.Route{},
		&models.TripStatus{},
		&models.AssignmentDriverVehicle{},
		&models.Trip{},
	)
}

// MigrateDown elimina las tablas (en orden inverso para respetar FKs).
func MigrateDown() error {
	db := config.DB

	logger.Log.Warn().Msg("running-migrate-down-(dropping-tables)...")

	return db.Migrator().DropTable(
		// TRANSPORT CORE
		&models.Trip{},
		&models.AssignmentDriverVehicle{},
		&models.TripStatus{},
		&models.Route{},
		&models.Vehicle{},

		// AUTH / USERS
		&models.Credential{},
		&models.OAuthAccount{},
		&models.Driver{},
		&models.UserInfo{},
		&models.User{},
	)
}

// MigrateReset limpia los datos de todas las tablas (TRUNCATE),
// pero mantiene el esquema actual (no hace drop ni AutoMigrate).
func MigrateReset() error {
	db := config.DB

	logger.Log.Warn().Msg("running-migrate-reset-(truncate-all-domain-tables)...")

	// IMPORTANTE:
	// - "user" es palabra reservada en PostgreSQL, por eso va con comillas.
	// - Usamos CASCADE para respetar FKs.
	// - RESTART IDENTITY reinicia secuencias (por si tuvieras IDs serial, aunque aquí uses UUID).
	tables := []string{
		"trip",
		"assignment_driver_vehicle",
		"trip_status",
		"route",
		"vehicle",
		"credential",
		"oauth_account",
		"driver",
		"user_info",
		"\"user\"",
	}

	sql := fmt.Sprintf("TRUNCATE TABLE %s RESTART IDENTITY CASCADE;", strings.Join(tables, ", "))

	if err := db.Exec(sql).Error; err != nil {
		logger.Log.Error().Err(err).Msg("error-truncating-tables-on-migrate-reset")
		return err
	}

	logger.Log.Info().Msg("migrate-reset-finished-(tables-truncated-successfully)")
	return nil
}
