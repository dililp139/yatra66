-- ============================================================================
-- YATRA D1 MIGRATION: 0004_user_password.sql
-- Adds password column to users table for credentials-based authentication
-- ============================================================================

ALTER TABLE users ADD COLUMN password TEXT;
