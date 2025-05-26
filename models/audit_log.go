package models

import (
	"time"

	"github.com/google/uuid"
)

type AuditLog struct {
	ID        uuid.UUID  `gorm:"type:uuid;primaryKey"`
	UserID    *uuid.UUID `gorm:"type:uuid"`
	Action    string     `gorm:"type:varchar(50)"`
	Resource  string     `gorm:"type:varchar(255)"`
	CreatedAt time.Time
}
