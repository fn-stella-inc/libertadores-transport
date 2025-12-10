package main

import (
	"server/internal/config"
	"server/internal/database/seeds"
	"server/pkgs/logger"

	"github.com/joho/godotenv"
)

func main() {
	// Cargar variables de entorno
	_ = godotenv.Load()

	// Inicializar logger (zerolog)
	logger.InitLogger()
	logger.Log.Info().Msg("starting-seed-cli...")

	// Config y DB
	config.LoadConfig()
	config.ConnectDB()

	// Ejecutar comando de seed
	seeds.HandleSeed()
}
