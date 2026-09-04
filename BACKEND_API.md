# Yatra Backend API

Yatra is a comprehensive Spring Boot tourism platform for discovering Indian destinations, real-time live weather, Wikipedia extracts, festival calendars, multi-currency conversions, transit routes, hotel reservations, and trip plans.

## Run Backend

```powershell
$env:MAVEN_USER_HOME='C:\codes\yatra\.m2local'
& "c:\codes\yatra\.m2local\wrapper\dists\apache-maven-3.9.16\0daed3be3ebd1c706f0e69e8b07c6b73f5cc4ea3dfce72a8d0ec2e849ca2ddb0\bin\mvn.cmd" spring-boot:run
```

## Core Endpoints

### 1. Destinations & Discovery
- `GET /api/health` - Health check & server status
- `GET /api/map/india` - India map markers with coordinates and themes
- `GET /api/cities` - Filter cities by query, state, theme, budget
- `GET /api/cities/{cityId}` - Detailed city profile, places, hotels, tips, reviews
- `GET /api/cities/{cityId}/attractions` - Famous monuments and places
- `GET /api/cities/{cityId}/hotels` - Filter hotels by price and rating
- `GET /api/cities/{cityId}/cab-fares` - Fare matrix from hotels to famous places
- `GET /api/cities/{cityId}/nearby` - Radius-based nearby search
- `GET /api/search?q={query}` - Global fuzzy search

### 2. Live External Web API Integrations
- `GET /api/weather/{cityId}` - Live real-time temperature, apparent temp, humidity, wind, and 7-day daily forecast (powered by Open-Meteo)
- `GET /api/weather` - Batch live weather for top travel destinations
- `GET /api/cities/{cityId}/wiki` - Live encyclopedic summary, high-res Wikimedia thumbnail, facts, and Wikipedia URL (powered by Wikipedia REST API)
- `GET /api/wiki?query={topic}` - Search any monument or attraction on Wikipedia
- `GET /api/festivals?year={year}` - Live calendar of Indian festivals & gazetted holidays with cultural significance and travel tips (powered by Nager.Date API)
- `GET /api/currency/rates` - Real-time conversion rates against INR for USD, EUR, GBP, AUD, CAD, SGD, AED, JPY (powered by Open Exchange Rates)

### 3. Multi-Modal Transit Routes
- `GET /api/routes?fromCityId={origin}&toCityId={dest}` - Intercity transit comparison (Flight vs Train vs Volvo Bus vs Highway Cab) with durations, fares, frequencies, and carbon footprints.

### 4. Interactive Bookings Engine
- `GET /api/bookings` - List all reservations
- `GET /api/bookings/{bookingId}` - View specific booking
- `POST /api/bookings` - Create reservation (hotel, cab, package) with confirmation code
- `DELETE /api/bookings/{bookingId}` - Cancel reservation

### 5. Traveler Community Reviews
- `GET /api/reviews?cityId={cityId}` - Get reviews for a city
- `POST /api/reviews` - Submit review and dynamically recalculate city rating

### 6. AI Trip Planner
- `POST /api/trip-plans` - Generate customized day-by-day itinerary and budget estimates
