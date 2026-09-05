// ============================================================================
// YATRA 66 — GOOGLE GEMINI TRAVEL INTELLIGENCE SERVICE
// Powered by gemini-3.6-flash
// ============================================================================

export const GEMINI_MODEL = 'gemini-3.6-flash';

const CITY_COORDINATES = {
  Jaipur: { lat: 26.9124, lng: 75.7873 },
  Agra: { lat: 27.1767, lng: 78.0081 },
  Delhi: { lat: 28.6139, lng: 77.2090 },
  Mumbai: { lat: 19.0760, lng: 72.8777 },
  Udaipur: { lat: 24.5854, lng: 73.7125 },
  Varanasi: { lat: 25.3176, lng: 82.9739 },
  Goa: { lat: 15.2993, lng: 74.1240 },
  Kochi: { lat: 9.9312, lng: 76.2673 },
  Amritsar: { lat: 31.6340, lng: 74.8723 },
  Manali: { lat: 32.2432, lng: 77.1892 },
  Rishikesh: { lat: 30.0869, lng: 78.2676 },
  Shimla: { lat: 31.1048, lng: 77.1734 },
  Mysore: { lat: 12.2958, lng: 76.6394 },
  Jodhpur: { lat: 26.2389, lng: 73.0243 },
  Hampi: { lat: 15.3350, lng: 76.4600 },
  Darjeeling: { lat: 27.0410, lng: 88.2663 },
  Kolkata: { lat: 22.5726, lng: 88.3639 },
  Bengaluru: { lat: 12.9716, lng: 77.5946 },
  Chennai: { lat: 13.0827, lng: 80.2707 },
  Hyderabad: { lat: 17.3850, lng: 78.4867 },
  Srinagar: { lat: 34.0837, lng: 74.7973 },
  Leh: { lat: 34.1526, lng: 77.5771 },
  Ooty: { lat: 11.4102, lng: 76.6950 },
  Munnar: { lat: 10.0889, lng: 77.0595 },
  Pondicherry: { lat: 11.9416, lng: 79.8083 },
};

export function getCityCenter(cityName) {
  if (!cityName) return { lat: 26.9124, lng: 75.7873 };
  const foundKey = Object.keys(CITY_COORDINATES).find(
    (k) => k.toLowerCase() === cityName.trim().toLowerCase()
  );
  return foundKey ? CITY_COORDINATES[foundKey] : { lat: 20.5937, lng: 78.9629 };
}

/**
 * Low-level call to Google Generative Language API
 */
export async function callGemini(env, payload) {
  const apiKey = env?.GEMINI_API_KEY || (typeof process !== 'undefined' && process.env?.GEMINI_API_KEY);
  if (!apiKey) {
    throw new Error('Gemini API key is not configured. Please ensure GEMINI_API_KEY secret is set.');
  }
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${apiKey}`;

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorBody = await response.text();
    console.error('Gemini API returned error status:', response.status, errorBody);
    throw new Error(`Google Gemini Error (${response.status}): ${errorBody}`);
  }

  const result = await response.json();
  const text = result.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!text) {
    throw new Error('Gemini returned an empty candidate');
  }
  return text;
}

/**
 * AI Smart Trip Planner Generator
 */
export async function generateAiTripPlan(env, params) {
  const {
    city = 'Jaipur',
    durationDays = 3,
    budgetTier = 'comfort',
    customDailyBudget,
    travellers = 2,
    adults = 2,
    children = 0,
    interests = ['heritage', 'food', 'textiles'],
    pace = 'Balanced',
    customNotes = '',
  } = params;

  const daysNum = Math.min(Math.max(Number(durationDays) || 1, 1), 10);
  const cityCenter = getCityCenter(city);

  const systemPrompt = `You are the Principal AI Travel Architect at Yatra 66 (yatra66.in), India's premier intelligent travel platform.
Create a rich, realistic, culturally immersive day-by-day travel itinerary for ${city}, India for ${daysNum} days.
Travelers: ${travellers} (${adults} Adults, ${children} Children).
Budget Tier: ${budgetTier}${customDailyBudget ? ` (₹${customDailyBudget}/person/day)` : ''}.
Key Interests: ${Array.isArray(interests) ? interests.join(', ') : interests}.
Travel Pace: ${pace}.
Special preferences/notes: ${customNotes || 'None'}.

Instructions:
1. Provide a realistic chronological schedule for each day starting from morning (08:30 AM) to night.
2. Include authentic local heritage landmarks, culinary specialties (famous sweets, street foods, thalis), artisan workshops, and scenic viewpoints.
3. Keep timings logical with buffer time between stops.
4. Provide practical crowd forecast advice (best entry slots, booking passes in advance) and insider hacks.
5. Provide approximate latitude and longitude for each stop within or near ${city} (base coordinates: ${cityCenter.lat}, ${cityCenter.lng}).

You MUST respond ONLY with valid JSON matching this schema:
{
  "summary": "Captivating 1-2 sentence overview of the trip",
  "crowdForecast": "Peak queue times, ASI ticket tips, and early morning recommendations",
  "weatherAdvice": "Best clothing, footwear, and climate considerations",
  "insiderHacks": [
    "Practical hack 1 with specific local detail",
    "Practical hack 2 with specific local detail",
    "Practical hack 3 with specific local detail",
    "Practical hack 4 with specific local detail"
  ],
  "days": [
    {
      "dayNumber": 1,
      "theme": "Captivating thematic title for Day 1",
      "waypoints": [
        {
          "name": "Exact attraction or restaurant name",
          "type": "Heritage Monument / Culinary Stop / Scenic View / Artisan Hub / Spiritual / Bazaar",
          "time": "08:30 AM",
          "slot": "Morning",
          "highlight": "One sentence describing why to visit or what to eat/see",
          "lat": ${cityCenter.lat},
          "lng": ${cityCenter.lng},
          "approxDuration": "1.5 hours"
        }
      ]
    }
  ]
}`;

  const payload = {
    contents: [{ parts: [{ text: systemPrompt }] }],
    generationConfig: {
      responseMimeType: 'application/json',
      temperature: 0.65,
    },
  };

  const rawJson = await callGemini(env, payload);
  let parsed;
  try {
    parsed = JSON.parse(rawJson);
  } catch (err) {
    console.error('Failed to parse Gemini JSON:', rawJson);
    throw new Error('Gemini response could not be parsed as JSON: ' + err.message);
  }

  // Ensure valid waypoints with IDs and coordinate fallbacks
  if (Array.isArray(parsed.days)) {
    parsed.days.forEach((day, dIdx) => {
      const dayNum = day.dayNumber || dIdx + 1;
      if (Array.isArray(day.waypoints)) {
        day.waypoints.forEach((wp, wIdx) => {
          wp.id = `ai-${dayNum}-${wIdx + 1}`;
          wp.sequenceOrder = wIdx + 1;
          // Ensure valid coordinates for Leaflet Route Map
          if (typeof wp.lat !== 'number' || typeof wp.lng !== 'number' || isNaN(wp.lat) || isNaN(wp.lng)) {
            const angle = ((wIdx * 55) % 360) * (Math.PI / 180);
            const radius = 0.015 + (wIdx * 0.008);
            wp.lat = Number((cityCenter.lat + radius * Math.cos(angle)).toFixed(6));
            wp.lng = Number((cityCenter.lng + radius * Math.sin(angle)).toFixed(6));
          }
        });
      }
    });
  }

  return parsed;
}

/**
 * AI Itinerary Natural Language Modifier
 */
export async function modifyAiItinerary(env, params) {
  const {
    city = 'Jaipur',
    activeDay = 1,
    query = '',
    currentWaypoints = [],
    pace = 'Balanced',
  } = params;

  if (!query || !query.trim()) {
    throw new Error('Query cannot be empty');
  }

  const cityCenter = getCityCenter(city);
  const prompt = `You are the AI Itinerary Modifier on Yatra 66 (yatra66.in).
The traveler is viewing Day ${activeDay} of their trip to ${city}, India.
Current Travel Pace: ${pace}.
Current Stops on this Day:
${JSON.stringify(currentWaypoints.map((w, idx) => ({ order: idx + 1, name: w.name, type: w.type, time: w.time, slot: w.slot, highlight: w.highlight })), null, 2)}

User's Modification Request:
"${query}"

Task:
1. Modify or add/remove/reorder the waypoints for Day ${activeDay} strictly according to the user's request.
2. Formulate a catchy updated theme title for Day ${activeDay}.
3. Provide a warm, helpful explanation of the adjustments made.
4. Ensure every waypoint has realistic coordinates for ${city} (around lat: ${cityCenter.lat}, lng: ${cityCenter.lng}).

You MUST respond ONLY with valid JSON matching:
{
  "updatedTheme": "Day ${activeDay}: Theme reflecting the modification",
  "explanation": "Brief 1-2 sentence explanation of what was changed and why",
  "updatedWaypoints": [
    {
      "name": "Attraction or food stop name",
      "type": "Heritage / Food / Sunset / Leisure",
      "time": "09:00 AM",
      "slot": "Morning / Afternoon / Evening / Night",
      "highlight": "Short highlight or dish recommendation",
      "lat": ${cityCenter.lat},
      "lng": ${cityCenter.lng}
    }
  ]
}`;

  const payload = {
    contents: [{ parts: [{ text: prompt }] }],
    generationConfig: {
      responseMimeType: 'application/json',
      temperature: 0.6,
    },
  };

  const rawJson = await callGemini(env, payload);
  let parsed;
  try {
    parsed = JSON.parse(rawJson);
  } catch (err) {
    throw new Error('Gemini response could not be parsed: ' + err.message);
  }

  if (Array.isArray(parsed.updatedWaypoints)) {
    parsed.updatedWaypoints.forEach((wp, idx) => {
      wp.id = `mod-${activeDay}-${idx + 1}-${Date.now()}`;
      wp.sequenceOrder = idx + 1;
      if (typeof wp.lat !== 'number' || typeof wp.lng !== 'number' || isNaN(wp.lat) || isNaN(wp.lng)) {
        const angle = ((idx * 65) % 360) * (Math.PI / 180);
        const radius = 0.012 + (idx * 0.007);
        wp.lat = Number((cityCenter.lat + radius * Math.cos(angle)).toFixed(6));
        wp.lng = Number((cityCenter.lng + radius * Math.sin(angle)).toFixed(6));
      }
    });
  }

  return parsed;
}

/**
 * AI Travel Concierge Multi-Turn Chat
 */
export async function chatWithAi(env, params) {
  const { messages = [], currentCity = 'Jaipur' } = params;

  if (!Array.isArray(messages) || messages.length === 0) {
    throw new Error('Messages array must contain at least one user query');
  }

  const systemInstruction = `You are Yatra AI, the official intelligent travel guide and concierge on Yatra 66 (yatra66.in), India's premier smart tourism platform.
Your expertise spans all 28 Indian States and 8 Union Territories.

Primary Responsibilities:
1. Destination Intelligence: Historical context, UNESCO heritage facts, architectural marvels, best sunrise/sunset spots, photography viewpoints.
2. Transit & Route Logistics: IRCTC train recommendations (Vande Bharat, Rajdhani, Shatabdi, Tatkal tricks), airport transfers, state road transport (KSRTC, RSRTC, HRTC Volvo), metro lines, and local transport options (auto-rickshaw, e-rickshaws, ferry, prepaid taxis).
3. Culinary Heritage: Legendary century-old eateries, authentic regional thalis, street food alleys, sweetmeat shops, hygiene ratings, pure vegetarian / vegan / jain options.
4. Tourist Safety & Helplines: Always ready to provide emergency assistance numbers (National Emergency 112, 24/7 Tourist Police 1363, Women Helpline 1091, Cyber Crime 1930).
5. Cultural Etiquette & Tips: Temple dress codes (covering knees/shoulders, removing footwear, photography bans inside sanctums), bazaar bargaining etiquette, tipping customs, seasonal climate precautions.
6. Offbeat & Hidden Gems: Uncrowded stepped wells, sacred groves, artisanal weaving clusters, tribal craft villages, and peaceful ghats.

Current City Context: The user is currently exploring or inquiring about "${currentCity}". Provide specific, high-value local knowledge for this city where applicable.

Communication Style:
- Warm, polite, respectful, and enthusiastic ("Namaste!", "Shubh Yatra!").
- Structure responses with clean bullet points, bold landmark names, and tasteful travel emojis (🏛️, 🍛, 🚂, 🛡️, 📸).
- Keep answers practical, actionable, and focused on Indian tourism. Avoid generic fluff.`;

  // Format messages into Gemini role format
  // Gemini expects: role 'user' or 'model'
  const contents = [];
  messages.forEach((msg) => {
    const role = msg.role === 'assistant' || msg.role === 'model' ? 'model' : 'user';
    const text = typeof msg.text === 'string' ? msg.text : typeof msg.content === 'string' ? msg.content : '';
    if (text && text.trim()) {
      contents.push({
        role,
        parts: [{ text: text.trim() }],
      });
    }
  });

  // If empty after sanitization, add default
  if (contents.length === 0) {
    contents.push({ role: 'user', parts: [{ text: 'Hello Yatra AI! How can you help me plan my India trip?' }] });
  }

  // Ensure first message is from 'user'
  if (contents[0].role !== 'user') {
    contents.unshift({ role: 'user', parts: [{ text: 'Hello!' }] });
  }

  const payload = {
    systemInstruction: {
      parts: [{ text: systemInstruction }],
    },
    contents,
    generationConfig: {
      temperature: 0.7,
      maxOutputTokens: 1200,
    },
  };

  const replyText = await callGemini(env, payload);
  return { reply: replyText };
}
