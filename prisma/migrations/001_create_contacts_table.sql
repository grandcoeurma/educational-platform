-- Migration: Create contacts table for Grand Cœur contact form
-- Created: 2025-10-12
-- Description: Stores contact form submissions from the website

-- Create contacts table
CREATE TABLE contacts (
    id TEXT PRIMARY KEY,
    full_name TEXT NOT NULL,
    phone TEXT NOT NULL,
    condition_type TEXT NOT NULL,
    address TEXT NOT NULL,
    message TEXT NOT NULL,
    created_at TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP(3) NOT NULL
);

-- Create index on created_at for efficient sorting and querying
CREATE INDEX idx_contacts_created_at ON contacts(created_at DESC);

-- Optional: Create index on phone for duplicate checking
CREATE INDEX idx_contacts_phone ON contacts(phone);

-- Comments for documentation
COMMENT ON TABLE contacts IS 'Stores contact form submissions from website visitors';
COMMENT ON COLUMN contacts.id IS 'Unique identifier (CUID)';
COMMENT ON COLUMN contacts.full_name IS 'Full name from "Nom et prénom" field';
COMMENT ON COLUMN contacts.phone IS 'Phone number from "Numéro de téléphone" field';
COMMENT ON COLUMN contacts.condition_type IS 'Type of child condition';
COMMENT ON COLUMN contacts.address IS 'Address from "Adresse" field';
COMMENT ON COLUMN contacts.message IS 'Message content';
COMMENT ON COLUMN contacts.created_at IS 'Timestamp when contact was created';
COMMENT ON COLUMN contacts.updated_at IS 'Timestamp when contact was last updated';
