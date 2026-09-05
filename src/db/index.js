// ============================================================================
// YATRA CLOUDFLARE D1 DATABASE ACCESS LAYER
// ============================================================================

function parseJson(str, fallback = []) {
  if (!str) return fallback;
  try {
    return JSON.parse(str);
  } catch {
    return fallback;
  }
}

export function formatCity(row) {
  if (!row) return null;
  return {
    id: row.id,
    name: row.name,
    country: row.country || 'India',
    state: row.state,
    region: row.region,
    latitude: row.latitude,
    longitude: row.longitude,
    description: row.description,
    bestSeason: row.best_season,
    popularityScore: row.popularity_score,
    rating: row.rating,
    averageRating: row.average_rating || row.rating,
    estimatedDailyBudget: row.estimated_daily_budget,
    themes: parseJson(row.themes, []),
    imageUrl: row.image_url
  };
}

export function formatAttraction(row) {
  if (!row) return null;
  return {
    id: row.id,
    cityId: row.city_id,
    name: row.name,
    category: row.category,
    description: row.description,
    latitude: row.latitude,
    longitude: row.longitude,
    rating: row.rating,
    durationHours: row.duration_hours,
    entryFee: row.entry_fee,
    tags: parseJson(row.tags, [])
  };
}

export function formatHotel(row) {
  if (!row) return null;
  return {
    id: row.id,
    cityId: row.city_id,
    name: row.name,
    type: row.type,
    address: row.address,
    latitude: row.latitude,
    longitude: row.longitude,
    rating: row.rating,
    pricePerNight: row.price_per_night,
    amenities: parseJson(row.amenities, []),
    nearbyAttractionIds: parseJson(row.nearby_attraction_ids, [])
  };
}

export function formatTip(row) {
  if (!row) return null;
  return {
    id: row.id,
    cityId: row.city_id,
    title: row.title,
    tip: row.tip,
    category: row.category
  };
}

export function formatBooking(row) {
  if (!row) return null;
  return {
    bookingId: row.booking_id,
    status: row.status,
    customerName: row.customer_name,
    customerEmail: row.customer_email,
    bookingType: row.booking_type,
    cityId: row.city_id,
    cityName: row.city_name,
    itemName: row.item_name,
    checkInDate: row.check_in_date,
    checkOutDate: row.check_out_date,
    travelers: row.travelers,
    rooms: row.rooms,
    totalAmountInr: row.total_amount_inr,
    createdAt: row.created_at
  };
}

export function formatReview(row) {
  if (!row) return null;
  return {
    id: row.id,
    cityId: row.city_id,
    travelerName: row.traveler_name,
    rating: row.rating,
    comment: row.comment,
    travelMonth: row.travel_month,
    createdAt: row.created_at
  };
}

// ----------------------------------------------------------------------------
// DATABASE QUERIES (Cloudflare D1 Prepared Statements)
// ----------------------------------------------------------------------------

export async function getCities(db, { search = '', state = '', theme = '', maxBudget = null } = {}) {
  let query = 'SELECT * FROM cities WHERE 1=1';
  const params = [];

  if (search && search.trim()) {
    query += ' AND (LOWER(name) LIKE ? OR LOWER(state) LIKE ? OR LOWER(region) LIKE ? OR LOWER(description) LIKE ?)';
    const term = `%${search.trim().toLowerCase()}%`;
    params.push(term, term, term, term);
  }

  if (state && state.trim()) {
    query += ' AND LOWER(state) = ?';
    params.push(state.trim().toLowerCase());
  }

  if (theme && theme.trim() && theme !== 'all') {
    query += ' AND LOWER(themes) LIKE ?';
    params.push(`%${theme.trim().toLowerCase()}%`);
  }

  if (maxBudget && Number(maxBudget) > 0) {
    query += ' AND estimated_daily_budget <= ?';
    params.push(Number(maxBudget));
  }

  query += ' ORDER BY popularity_score DESC, rating DESC';

  const stmt = db.prepare(query).bind(...params);
  const { results } = await stmt.all();
  return (results || []).map(formatCity);
}

export async function getCityById(db, id) {
  const stmt = db.prepare('SELECT * FROM cities WHERE id = ?').bind(Number(id));
  const row = await stmt.first();
  return formatCity(row);
}

export async function getAttractionsByCityId(db, cityId) {
  const stmt = db.prepare('SELECT * FROM attractions WHERE city_id = ? ORDER BY rating DESC').bind(Number(cityId));
  const { results } = await stmt.all();
  return (results || []).map(formatAttraction);
}

export async function getHotelsByCityId(db, cityId) {
  const stmt = db.prepare('SELECT * FROM hotels WHERE city_id = ? ORDER BY rating DESC').bind(Number(cityId));
  const { results } = await stmt.all();
  return (results || []).map(formatHotel);
}

export async function getTravelTipsByCityId(db, cityId) {
  const stmt = db.prepare('SELECT * FROM travel_tips WHERE city_id = ?').bind(Number(cityId));
  const { results } = await stmt.all();
  return (results || []).map(formatTip);
}

export async function getReviewsByCityId(db, cityId) {
  let query = 'SELECT * FROM reviews';
  let stmt;
  if (cityId) {
    query += ' WHERE city_id = ? ORDER BY id DESC';
    stmt = db.prepare(query).bind(Number(cityId));
  } else {
    query += ' ORDER BY id DESC';
    stmt = db.prepare(query);
  }
  const { results } = await stmt.all();
  return (results || []).map(formatReview);
}

export async function getCityDetails(db, cityId) {
  const id = Number(cityId);
  const [city, attractions, hotels, travelTips, reviews] = await Promise.all([
    getCityById(db, id),
    getAttractionsByCityId(db, id),
    getHotelsByCityId(db, id),
    getTravelTipsByCityId(db, id),
    getReviewsByCityId(db, id)
  ]);

  if (!city) return null;

  return {
    city,
    attractions,
    hotels,
    travelTips,
    reviews,
    famousPlaces: attractions,
    recommendedHotels: hotels,
    bestTimeToVisit: city.bestSeason || 'October to March'
  };
}

export async function getBookings(db) {
  const stmt = db.prepare('SELECT * FROM bookings ORDER BY created_at DESC');
  const { results } = await stmt.all();
  return (results || []).map(formatBooking);
}

export async function createBooking(db, data) {
  const bookingId = data.bookingId || `YTR-${Math.floor(100000 + Math.random() * 900000)}`;
  const status = data.status || 'CONFIRMED';
  const customerName = data.customerName || 'Traveler';
  const customerEmail = data.customerEmail || 'traveler@yatra.in';
  const bookingType = data.bookingType || 'hotel';
  const cityId = Number(data.cityId) || 1;
  const cityName = data.cityName || 'Destination';
  const itemName = data.itemName || 'Booking Reservation';
  const checkInDate = data.checkInDate || new Date().toISOString().slice(0, 10);
  const checkOutDate = data.checkOutDate || new Date(Date.now() + 86400000 * 3).toISOString().slice(0, 10);
  const travelers = Number(data.travelers) || 1;
  const rooms = Number(data.rooms) || 1;
  const totalAmountInr = Number(data.totalAmountInr) || 4500;

  const stmt = db.prepare(`
    INSERT INTO bookings (
      booking_id, status, customer_name, customer_email, booking_type,
      city_id, city_name, item_name, check_in_date, check_out_date,
      travelers, rooms, total_amount_inr
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `).bind(
    bookingId, status, customerName, customerEmail, bookingType,
    cityId, cityName, itemName, checkInDate, checkOutDate,
    travelers, rooms, totalAmountInr
  );

  await stmt.run();

  return {
    bookingId,
    status,
    customerName,
    customerEmail,
    bookingType,
    cityId,
    cityName,
    itemName,
    checkInDate,
    checkOutDate,
    travelers,
    rooms,
    totalAmountInr
  };
}

export async function cancelBooking(db, bookingId) {
  const stmt = db.prepare('UPDATE bookings SET status = ? WHERE booking_id = ?').bind('CANCELLED', bookingId);
  await stmt.run();
  const getStmt = db.prepare('SELECT * FROM bookings WHERE booking_id = ?').bind(bookingId);
  const row = await getStmt.first();
  return formatBooking(row);
}

export async function addReview(db, data) {
  const cityId = Number(data.cityId) || 1;
  const travelerName = data.travelerName || 'Verified Traveler';
  const rating = Math.min(5, Math.max(1, Number(data.rating) || 5));
  const comment = data.comment || 'Wonderful experience in this city.';
  const travelMonth = data.travelMonth || 'Recent';

  const stmt = db.prepare(`
    INSERT INTO reviews (city_id, traveler_name, rating, comment, travel_month)
    VALUES (?, ?, ?, ?, ?)
  `).bind(cityId, travelerName, rating, comment, travelMonth);

  const res = await stmt.run();

  // Recalculate and update city average rating
  const avgStmt = db.prepare('SELECT AVG(rating) as avg_rating FROM reviews WHERE city_id = ?').bind(cityId);
  const avgRow = await avgStmt.first();
  if (avgRow && avgRow.avg_rating) {
    const newRating = Math.round(avgRow.avg_rating * 10) / 10;
    await db.prepare('UPDATE cities SET rating = ?, average_rating = ? WHERE id = ?').bind(newRating, newRating, cityId).run();
  }

  return {
    id: res.meta?.last_row_id || Date.now(),
    cityId,
    travelerName,
    rating,
    comment,
    travelMonth
  };
}

// ----------------------------------------------------------------------------
// USER AUTHENTICATION & SIGN-IN (Cloudflare D1)
// ----------------------------------------------------------------------------

export function formatUser(row) {
  if (!row) return null;
  return {
    id: row.id,
    email: row.email,
    name: row.name,
    avatarUrl: row.avatar_url,
    authProvider: row.auth_provider,
    city: row.city,
    interest: row.interest,
    createdAt: row.created_at,
    lastLoginAt: row.last_login_at
  };
}

export async function getUserByEmail(db, email) {
  if (!email) return null;
  const stmt = db.prepare('SELECT * FROM users WHERE LOWER(email) = LOWER(?)').bind(email.trim());
  const row = await stmt.first();
  return formatUser(row);
}

export async function saveUserSignIn(db, { email, name, avatarUrl = null, authProvider = 'email', city = 'Jaipur', interest = 'Heritage' } = {}) {
  if (!email || !email.trim()) throw new Error('Email is required for sign in');
  const cleanEmail = email.trim().toLowerCase();
  const cleanName = name?.trim() || cleanEmail.split('@')[0];

  const stmt = db.prepare(`
    INSERT INTO users (email, name, avatar_url, auth_provider, city, interest, last_login_at)
    VALUES (?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)
    ON CONFLICT(email) DO UPDATE SET
      name = excluded.name,
      avatar_url = COALESCE(excluded.avatar_url, users.avatar_url),
      auth_provider = excluded.auth_provider,
      city = COALESCE(excluded.city, users.city),
      interest = COALESCE(excluded.interest, users.interest),
      last_login_at = CURRENT_TIMESTAMP
  `).bind(cleanEmail, cleanName, avatarUrl, authProvider, city, interest);

  await stmt.run();
  return getUserByEmail(db, cleanEmail);
}

