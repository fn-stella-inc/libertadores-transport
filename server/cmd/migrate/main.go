package main

import (
	"server/internal/config"
	"server/internal/database/migrations"
	"server/pkgs/logger"

	"github.com/joho/godotenv"
)

func main() {
	// Cargar .env primero
	_ = godotenv.Load()

	// Inicializar logger (zerolog)
	logger.InitLogger()
	logger.Log.Info().Msg("starting-migration-cli...")

	// Config y DB
	config.LoadConfig()
	config.ConnectDB()

	// Ejecutar comando de migración según os.Args[1]
	migrations.HandleMigration()
}
