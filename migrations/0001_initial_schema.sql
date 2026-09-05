-- Cities Table
CREATE TABLE IF NOT EXISTS cities (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  country TEXT NOT NULL DEFAULT 'India',
  state TEXT,
  region TEXT,
  latitude REAL NOT NULL,
  longitude REAL NOT NULL,
  description TEXT,
  best_season TEXT,
  popularity_score INTEGER DEFAULT 90,
  rating REAL DEFAULT 4.7,
  average_rating REAL DEFAULT 4.7,
  estimated_daily_budget INTEGER DEFAULT 4000,
  themes TEXT,
  image_url TEXT,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP
);

-- Attractions / Landmarks Table
CREATE TABLE IF NOT EXISTS attractions (
  id INTEGER PRIMARY KEY,
  city_id INTEGER NOT NULL,
  name TEXT NOT NULL,
  category TEXT,
  description TEXT,
  latitude REAL NOT NULL,
  longitude REAL NOT NULL,
  rating REAL DEFAULT 4.7,
  duration_hours INTEGER DEFAULT 2,
  entry_fee INTEGER DEFAULT 0,
  tags TEXT,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (city_id) REFERENCES cities(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_attractions_city_id ON attractions(city_id);

-- Hotels & Hostels Table
CREATE TABLE IF NOT EXISTS hotels (
  id INTEGER PRIMARY KEY,
  city_id INTEGER NOT NULL,
  name TEXT NOT NULL,
  type TEXT NOT NULL DEFAULT 'Hotel',
  address TEXT,
  latitude REAL NOT NULL,
  longitude REAL NOT NULL,
  rating REAL DEFAULT 4.7,
  price_per_night INTEGER NOT NULL,
  amenities TEXT,
  nearby_attraction_ids TEXT,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (city_id) REFERENCES cities(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_hotels_city_id ON hotels(city_id);

-- Travel Tips Table
CREATE TABLE IF NOT EXISTS travel_tips (
  id INTEGER PRIMARY KEY,
  city_id INTEGER NOT NULL,
  title TEXT NOT NULL,
  tip TEXT NOT NULL,
  category TEXT DEFAULT 'general',
  created_at TEXT DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (city_id) REFERENCES cities(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_travel_tips_city_id ON travel_tips(city_id);

-- Bookings Table
CREATE TABLE IF NOT EXISTS bookings (
  booking_id TEXT PRIMARY KEY,
  status TEXT NOT NULL DEFAULT 'CONFIRMED',
  customer_name TEXT NOT NULL,
  customer_email TEXT NOT NULL,
  booking_type TEXT NOT NULL,
  city_id INTEGER,
  city_name TEXT,
  item_name TEXT NOT NULL,
  check_in_date TEXT,
  check_out_date TEXT,
  travelers INTEGER DEFAULT 1,
  rooms INTEGER DEFAULT 1,
  total_amount_inr INTEGER NOT NULL,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_bookings_status ON bookings(status);
CREATE INDEX IF NOT EXISTS idx_bookings_city_id ON bookings(city_id);

-- Traveler Community Reviews Table
CREATE TABLE IF NOT EXISTS reviews (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  city_id INTEGER NOT NULL,
  traveler_name TEXT NOT NULL,
  rating INTEGER NOT NULL CHECK(rating >= 1 AND rating <= 5),
  comment TEXT NOT NULL,
  travel_month TEXT DEFAULT 'Recent',
  created_at TEXT DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (city_id) REFERENCES cities(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_reviews_city_id ON reviews(city_id);
