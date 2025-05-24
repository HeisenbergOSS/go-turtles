package models

import (
	"time"

	"github.com/google/uuid"
)

type Content struct {
	ID            uuid.UUID  `gorm:"type:uuid;primaryKey"`
	Title         string     `gorm:"type:varchar(255)"`
	Body          string     `gorm:"type:text"`
	Category      string     `gorm:"type:varchar(50)"`
	VaccineType   string     `gorm:"type:varchar(50)"`
	SourceURL     string     `gorm:"type:varchar(255)"`
	ContributorID *uuid.UUID `gorm:"type:uuid"`
	PublishedDate time.Time  `gorm:"type:timestamp"`
	Status        string     `gorm:"type:varchar(20)"`
	CreatedAt     time.Time
	UpdatedAt     time.Time
}
