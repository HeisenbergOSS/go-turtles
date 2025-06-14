package main

import (
	"fmt"
	"log"
	"os"

	gormpostgres "gorm.io/driver/postgres"
	"gorm.io/gorm"

	"github.com/heisenbergoss/go-turtles/internal/data"
)

func main() {
	fmt.Println("Starting database migration...")

	dsn := os.Getenv("DSN")
	if dsn == "" {
		dsn = "host=localhost user=myuser password=mypassword dbname=turtles_db port=5432 sslmode=disable"
		log.Println("DSN environment variable not set, using default for local development.")
	}

	db, err := gorm.Open(gormpostgres.Open(dsn), &gorm.Config{})
	if err != nil {
		log.Fatalf("Failed to connect to database: %v", err)
	}

	fmt.Println("Running AutoMigrate for 'facts' table...")
	if err := db.AutoMigrate(&data.Fact{}).Error; err != nil {
		log.Fatalf("Failed to migrate database: %v", err)
	}

	fmt.Println("Setting up full-text search...")
	if err := db.Exec(`ALTER TABLE facts ADD COLUMN IF NOT EXISTS search_vector tsvector`).Error; err != nil {
		log.Fatalf("Failed to setup FTS: %v", err)
	}
	if err := db.Exec(`CREATE INDEX IF NOT EXISTS facts_search_idx ON facts USING gin(search_vector)`).Error; err != nil {
		log.Fatalf("Failed to setup FTS: %v", err)
	}
	if err := db.Exec(`
		CREATE OR REPLACE FUNCTION facts_search_trigger() RETURNS trigger AS $$
		begin
			new.search_vector :=
				setweight(to_tsvector('pg_catalog.english', coalesce(new.title,'')), 'A') ||
				setweight(to_tsvector('pg_catalog.english', coalesce(new.content,'')), 'B');
			return new;
		end
		$$ LANGUAGE plpgsql;
	`).Error; err != nil {
		log.Fatalf("Failed to setup FTS: %v", err)
	}
	if err := db.Exec(`
		DROP TRIGGER IF EXISTS tsvectorupdate ON facts;
		CREATE TRIGGER tsvectorupdate BEFORE INSERT OR UPDATE
		ON facts FOR EACH ROW EXECUTE PROCEDURE facts_search_trigger();
	`).Error; err != nil {
		log.Fatalf("Failed to setup FTS: %v", err)
	}

	fmt.Println("Database migration completed successfully!")
}
