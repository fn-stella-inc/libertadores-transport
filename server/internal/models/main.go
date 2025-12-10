package models

import (
	"time"

	"github.com/google/uuid"
)

type User struct {
	ID           uuid.UUID `gorm:"type:uuid;default:gen_random_uuid();primaryKey"`
	Username     string    `gorm:"size:50;not null;uniqueIndex"`
	Email        string    `gorm:"size:120"`
	PasswordHash string    `gorm:"type:text"`        // for local credentials (optional if you use separate table)
	Role         string    `gorm:"size:20;not null"` // e.g. "ADMIN", "DRIVER", "DISPATCHER"
	IsActive     bool      `gorm:"not null;default:true"`
	CreatedAt    time.Time `gorm:"not null;default:now()"`
	UpdatedAt    time.Time `gorm:"not null;default:now()"`

	UserInfo *UserInfo `gorm:"foreignKey:UserID"`
	Driver   *Driver   `gorm:"foreignKey:UserID"`

	OAuthAccounts []OAuthAccount `gorm:"foreignKey:UserID"`
	Credentials   []Credential   `gorm:"foreignKey:UserID"`
}

func (User) TableName() string { return "user" }

type UserInfo struct {
	ID             uuid.UUID `gorm:"type:uuid;default:gen_random_uuid();primaryKey"`
	UserID         uuid.UUID `gorm:"type:uuid;not null;uniqueIndex"`
	FirstName      string    `gorm:"size:80;not null"`
	LastName       string    `gorm:"size:80;not null"`
	DocumentType   string    `gorm:"size:10"`
	DocumentNumber string    `gorm:"size:20"`
	PhoneNumber    string    `gorm:"size:20"`

	User User `gorm:"foreignKey:UserID"`
}

func (UserInfo) TableName() string { return "user_info" }

type Driver struct {
	ID                uuid.UUID `gorm:"type:uuid;default:gen_random_uuid();primaryKey"`
	UserID            uuid.UUID `gorm:"type:uuid;not null;uniqueIndex"`
	LicenseNumber     string    `gorm:"size:30;not null"`
	LicenseCategory   string    `gorm:"size:10;not null"`
	LicenseExpiration time.Time `gorm:"not null"`
	Status            string    `gorm:"size:20;not null;default:ACTIVE"`
	HireDate          *time.Time
	TerminationDate   *time.Time

	User        User                      `gorm:"foreignKey:UserID"`
	Assignments []AssignmentDriverVehicle `gorm:"foreignKey:DriverID"`
	Trips       []Trip                    `gorm:"foreignKey:DriverID"`
}

func (Driver) TableName() string { return "driver" }

type AssignmentDriverVehicle struct {
	ID        uuid.UUID `gorm:"type:uuid;default:gen_random_uuid();primaryKey"`
	DriverID  uuid.UUID `gorm:"type:uuid;not null"`
	VehicleID uuid.UUID `gorm:"type:uuid;not null"`
	StartDate time.Time `gorm:"not null"`
	EndDate   *time.Time

	Driver  Driver  `gorm:"foreignKey:DriverID"`
	Vehicle Vehicle `gorm:"foreignKey:VehicleID"`
}

func (AssignmentDriverVehicle) TableName() string {
	return "assignment_driver_vehicle"
}

type Trip struct {
	ID                 uuid.UUID `gorm:"type:uuid;default:gen_random_uuid();primaryKey"`
	TripCode           string    `gorm:"size:30;uniqueIndex"`
	RouteID            uuid.UUID `gorm:"type:uuid;not null"`
	VehicleID          uuid.UUID `gorm:"type:uuid;not null"`
	DriverID           uuid.UUID `gorm:"type:uuid;not null"`
	PlannedDepartureAt time.Time `gorm:"not null"`
	PlannedArrivalAt   *time.Time
	ActualDepartureAt  *time.Time
	ActualArrivalAt    *time.Time

	OdometerStartKm *float64 `gorm:"type:numeric(12,2)"`
	OdometerEndKm   *float64 `gorm:"type:numeric(12,2)"`

	FuelStartL *float64 `gorm:"type:numeric(10,2)"`
	FuelEndL   *float64 `gorm:"type:numeric(10,2)"`

	TripStatusID uuid.UUID `gorm:"type:uuid;not null"`
	Notes        string

	Route      Route      `gorm:"foreignKey:RouteID"`
	Vehicle    Vehicle    `gorm:"foreignKey:VehicleID"`
	Driver     Driver     `gorm:"foreignKey:DriverID"`
	TripStatus TripStatus `gorm:"foreignKey:TripStatusID"`
}

func (Trip) TableName() string { return "trip" }

type OAuthAccount struct {
	ID                uuid.UUID `gorm:"type:uuid;default:gen_random_uuid();primaryKey"`
	UserID            uuid.UUID `gorm:"type:uuid;not null;index"`
	Provider          string    `gorm:"size:100;not null"` // "google"
	ProviderAccountID string    `gorm:"size:255;not null"` // Google "sub"
	Email             string    `gorm:"size:200"`
	CreatedAt         time.Time `gorm:"not null;default:now()"`

	User User `gorm:"foreignKey:UserID"`
}

func (OAuthAccount) TableName() string { return "oauth_account" }

type Credential struct {
	ID           uuid.UUID `gorm:"type:uuid;default:gen_random_uuid();primaryKey"`
	UserID       uuid.UUID `gorm:"type:uuid;not null;index"`
	PasswordHash string    `gorm:"type:text;not null"`
	Provider     string    `gorm:"size:30;not null;default:credentials"` // "credentials"
	CreatedAt    time.Time `gorm:"not null;default:now()"`
	UpdatedAt    time.Time `gorm:"not null;default:now()"`

	User User `gorm:"foreignKey:UserID"`
}

func (Credential) TableName() string { return "credential" }

type Vehicle struct {
	ID              uuid.UUID `gorm:"type:uuid;default:gen_random_uuid();primaryKey"`
	Plate           string    `gorm:"size:10;not null;uniqueIndex"`
	VehicleTypeID   uuid.UUID `gorm:"type:uuid;not null"`
	VehicleStatusID uuid.UUID `gorm:"type:uuid;not null"`
	ManufactureYear int16     `gorm:"not null"`
	TankCapacityL   float64   `gorm:"type:numeric(10,2)"`
	ReferenceKmPerL float64   `gorm:"type:numeric(10,2)"`
	CreatedAt       time.Time `gorm:"not null;default:now()"`
	DeactivatedAt   *time.Time

	Assignments []AssignmentDriverVehicle `gorm:"foreignKey:VehicleID"`
	Trips       []Trip                    `gorm:"foreignKey:VehicleID"`
}

func (Vehicle) TableName() string { return "vehicle" }

type Route struct {
	ID                   uuid.UUID `gorm:"type:uuid;default:gen_random_uuid();primaryKey"`
	Code                 string    `gorm:"size:20;not null;uniqueIndex"`
	Origin               string    `gorm:"size:80;not null"`
	Destination          string    `gorm:"size:80;not null"`
	DistanceKm           float64   `gorm:"type:numeric(10,2);not null"`
	EstimatedDurationMin *int
	IsActive             bool `gorm:"not null;default:true"`

	Trips []Trip `gorm:"foreignKey:RouteID"`
}

func (Route) TableName() string { return "route" }

type TripStatus struct {
	ID          uuid.UUID `gorm:"type:uuid;default:gen_random_uuid();primaryKey"`
	Name        string    `gorm:"size:30;not null"` // PLANNED, IN_PROGRESS, COMPLETED, CANCELLED
	Description string

	Trips []Trip `gorm:"foreignKey:TripStatusID"`
}

func (TripStatus) TableName() string { return "trip_status" }
