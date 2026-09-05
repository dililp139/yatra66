-- ============================================================================
-- YATRA D1 MIGRATION: 0003_users_schema.sql
-- Adds users and user authentication / sign-in tracking table
-- ============================================================================

CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT NOT NULL UNIQUE,
    name TEXT NOT NULL,
    avatar_url TEXT,
    auth_provider TEXT DEFAULT 'email',
    city TEXT DEFAULT 'Jaipur',
    interest TEXT DEFAULT 'Heritage',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    last_login_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);

-- Insert default / demo user
INSERT OR IGNORE INTO users (email, name, auth_provider, city, interest)
VALUES ('dilip@google.com', 'Dilip Kumar', 'google', 'Jaipur', 'Heritage');
