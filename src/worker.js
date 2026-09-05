// ============================================================================
// YATRA CLOUDFLARE WORKER ENTRYPOINT
// Provides REST APIs backed by Cloudflare D1 (env.DB) and serves static assets
// ============================================================================

import * as db from './db/index.js';
import { googleConsentHtml } from './googleConsentPage.js';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

function jsonResponse(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'Content-Type': 'application/json',
      ...corsHeaders,
    },
  });
}

function errorResponse(message, status = 500) {
  return jsonResponse({ error: message, status }, status);
}

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const pathname = url.pathname;
    const method = request.method.toUpperCase();

    // Handle CORS preflight
    if (method === 'OPTIONS') {
      return new Response(null, {
        status: 204,
        headers: corsHeaders,
      });
    }

    // Google OAuth Account Chooser & Consent Window (/auth/google)
    if ((pathname === '/auth/google' || pathname === '/auth/google/' || pathname === '/google-auth') && method === 'GET') {
      return new Response(googleConsentHtml, {
        headers: {
          'Content-Type': 'text/html; charset=utf-8',
          ...corsHeaders,
        },
      });
    }

    // Health check endpoint
    if (pathname === '/api/health' && method === 'GET') {
      try {
        if (!env.DB) {
          return jsonResponse({
            status: 'DEGRADED',
            service: 'yatra-worker',
            database: 'cloudflare-d1',
            d1Connected: false,
            message: 'D1 binding DB is not configured in environment',
            timestamp: new Date().toISOString()
          }, 503);
        }

        const dbCheck = await env.DB.prepare('SELECT count(*) as count FROM cities').first();
        return jsonResponse({
          status: 'UP',
          service: 'yatra-worker',
          database: 'cloudflare-d1',
          d1Connected: true,
          citiesCount: dbCheck?.count ?? 0,
          timestamp: new Date().toISOString()
        });
      } catch (err) {
        return jsonResponse({
          status: 'ERROR',
          service: 'yatra-worker',
          database: 'cloudflare-d1',
          d1Connected: false,
          error: err.message,
          timestamp: new Date().toISOString()
        }, 500);
      }
    }

    // API Routes
    if (pathname.startsWith('/api/')) {
      if (!env.DB) {
        return errorResponse('D1 Database binding (env.DB) is missing. Check wrangler.jsonc', 503);
      }

      try {
        // --- CITIES API ---
        // GET /api/cities
        if (pathname === '/api/cities' && method === 'GET') {
          const search = url.searchParams.get('search') || '';
          const state = url.searchParams.get('state') || '';
          const theme = url.searchParams.get('theme') || '';
          const maxBudget = url.searchParams.get('maxBudget');
          const cities = await db.getCities(env.DB, { search, state, theme, maxBudget });
          return jsonResponse(cities);
        }

        // GET /api/cities/:id/details
        const cityDetailsMatch = pathname.match(/^\/api\/cities\/(\d+)\/details\/?$/);
        if (cityDetailsMatch && method === 'GET') {
          const cityId = Number(cityDetailsMatch[1]);
          const details = await db.getCityDetails(env.DB, cityId);
          if (!details) {
            return errorResponse(`City with ID ${cityId} not found`, 404);
          }
          return jsonResponse(details);
        }

        // GET /api/cities/:id/attractions
        const cityAttractionsMatch = pathname.match(/^\/api\/cities\/(\d+)\/attractions\/?$/);
        if (cityAttractionsMatch && method === 'GET') {
          const cityId = Number(cityAttractionsMatch[1]);
          const attractions = await db.getAttractionsByCityId(env.DB, cityId);
          return jsonResponse(attractions);
        }

        // GET /api/cities/:id/hotels
        const cityHotelsMatch = pathname.match(/^\/api\/cities\/(\d+)\/hotels\/?$/);
        if (cityHotelsMatch && method === 'GET') {
          const cityId = Number(cityHotelsMatch[1]);
          const hotels = await db.getHotelsByCityId(env.DB, cityId);
          return jsonResponse(hotels);
        }

        // GET /api/cities/:id/tips
        const cityTipsMatch = pathname.match(/^\/api\/cities\/(\d+)\/tips\/?$/);
        if (cityTipsMatch && method === 'GET') {
          const cityId = Number(cityTipsMatch[1]);
          const tips = await db.getTravelTipsByCityId(env.DB, cityId);
          return jsonResponse(tips);
        }

        // GET /api/cities/:id
        const cityMatch = pathname.match(/^\/api\/cities\/(\d+)\/?$/);
        if (cityMatch && method === 'GET') {
          const cityId = Number(cityMatch[1]);
          const city = await db.getCityById(env.DB, cityId);
          if (!city) {
            return errorResponse(`City with ID ${cityId} not found`, 404);
          }
          return jsonResponse(city);
        }

        // --- BOOKINGS API ---
        // GET /api/bookings
        if (pathname === '/api/bookings' && method === 'GET') {
          const bookings = await db.getBookings(env.DB);
          return jsonResponse(bookings);
        }

        // POST /api/bookings
        if (pathname === '/api/bookings' && method === 'POST') {
          const body = await request.json();
          const booking = await db.createBooking(env.DB, body);
          return jsonResponse(booking, 201);
        }

        // DELETE /api/bookings/:id
        const bookingMatch = pathname.match(/^\/api\/bookings\/([A-Za-z0-9_-]+)\/?$/);
        if (bookingMatch && method === 'DELETE') {
          const bookingId = bookingMatch[1];
          const cancelled = await db.cancelBooking(env.DB, bookingId);
          return jsonResponse(cancelled);
        }

        // --- REVIEWS API ---
        // GET /api/reviews?cityId=:id
        if (pathname === '/api/reviews' && method === 'GET') {
          const cityId = url.searchParams.get('cityId');
          const reviews = await db.getReviewsByCityId(env.DB, cityId ? Number(cityId) : null);
          return jsonResponse(reviews);
        }

        // POST /api/reviews
        if (pathname === '/api/reviews' && method === 'POST') {
          const body = await request.json();
          const review = await db.addReview(env.DB, body);
          return jsonResponse(review, 201);
        }

        // --- AUTH & SIGN-IN API ---
        // POST /api/auth/login
        if (pathname === '/api/auth/login' && method === 'POST') {
          const body = await request.json();
          const result = await db.verifyUserLogin(env.DB, body.email, body.password);
          if (!result.success) {
            return errorResponse(result.error, 401);
          }
          return jsonResponse(result.user, 200);
        }

        // POST /api/auth/register
        if (pathname === '/api/auth/register' && method === 'POST') {
          const body = await request.json();
          try {
            const user = await db.saveUserRegistration(env.DB, body);
            return jsonResponse(user, 201);
          } catch (err) {
            return errorResponse(err.message, 400);
          }
        }

        // POST /api/auth/google
        if (pathname === '/api/auth/google' && method === 'POST') {
          const body = await request.json();
          try {
            const user = await db.saveGoogleUser(env.DB, body);
            return jsonResponse(user, 200);
          } catch (err) {
            return errorResponse(err.message, 400);
          }
        }

        // POST /api/auth/signin
        if (pathname === '/api/auth/signin' && method === 'POST') {
          const body = await request.json();
          const user = await db.saveUserSignIn(env.DB, body);
          return jsonResponse(user, 200);
        }

        // GET /api/auth/user
        if (pathname === '/api/auth/user' && method === 'GET') {
          const email = url.searchParams.get('email');
          if (!email) return errorResponse('Email parameter is required', 400);
          const user = await db.getUserByEmail(env.DB, email);
          if (!user) return errorResponse('User not found', 404);
          return jsonResponse(user);
        }

        return errorResponse(`API Route '${pathname}' with method '${method}' not found`, 404);
      } catch (err) {
        return errorResponse(`Server Error: ${err.message}`, 500);
      }
    }

    // Static Asset Serving (Frontend React dist)
    if (env.ASSETS) {
      return env.ASSETS.fetch(request);
    }

    return new Response('Not Found', { status: 404 });
  }
};
