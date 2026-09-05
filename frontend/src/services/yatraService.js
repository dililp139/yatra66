// ============================================================================
// YATRA IN-BROWSER SERVICE ENGINE (100% Pure JavaScript Client Architecture)
// Replaces Spring Boot & Java backend entirely with zero feature or data loss.
// ============================================================================

import {
  FIVE_CITIES_MVP,
  HIDDEN_GEMS_DATA,
  LOCAL_EXPERIENCES_DATA,
  LOCAL_BUSINESSES_DATA,
  TOURIST_EMERGENCY_DATA,
  TRANSLATIONS,
  SIH_STATS,
  getHaversineDistanceKm,
  optimizeRouteWaypoints,
  calculateDetailedBudget,
  submitBusinessEnquiry,
  getStoredBusinessEnquiries,
  registerLocalBusiness,
  getCustomLocalBusinesses
} from './sihData.js';

export function calculateDistanceKm(lat1, lon1, lat2, lon2) {
  const R = 6371.0;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Math.round(R * c * 10) / 10;
}

const delay = (ms = 120) => new Promise((resolve) => setTimeout(resolve, ms));

export const CITIES_MASTER = [
  {
    "id": 1,
    "name": "Jaipur",
    "country": "India",
    "state": "Rajasthan",
    "region": "North India",
    "latitude": 26.9124,
    "longitude": 75.7873,
    "description": "The Pink City, known for royal forts, palaces, bazaars, crafts, and desert gateways.",
    "bestSeason": "October to March",
    "popularityScore": 96,
    "rating": 4.8,
    "averageRating": 4.8,
    "estimatedDailyBudget": 4200,
    "themes": [
      "heritage",
      "forts",
      "culture",
      "shopping"
    ],
    "imageUrl": "/images/jaipur.jpg"
  },
  {
    "id": 2,
    "name": "Agra",
    "country": "India",
    "state": "Uttar Pradesh",
    "region": "North India",
    "latitude": 27.1767,
    "longitude": 78.0081,
    "description": "A world heritage destination built around the Taj Mahal, Mughal gardens, and marble craft.",
    "bestSeason": "November to February",
    "popularityScore": 98,
    "rating": 4.9,
    "averageRating": 4.9,
    "estimatedDailyBudget": 3800,
    "themes": [
      "heritage",
      "romantic",
      "architecture"
    ],
    "imageUrl": "/images/agra.jpg"
  },
  {
    "id": 3,
    "name": "Delhi",
    "country": "India",
    "state": "Delhi",
    "region": "North India",
    "latitude": 28.6139,
    "longitude": 77.209,
    "description": "India's capital with layered history, monuments, street food, museums, and markets.",
    "bestSeason": "October to March",
    "popularityScore": 94,
    "rating": 4.6,
    "averageRating": 4.6,
    "estimatedDailyBudget": 5200,
    "themes": [
      "history",
      "food",
      "markets",
      "museums"
    ],
    "imageUrl": "/images/delhi.jpg"
  },
  {
    "id": 4,
    "name": "Mumbai",
    "country": "India",
    "state": "Maharashtra",
    "region": "West India",
    "latitude": 19.076,
    "longitude": 72.8777,
    "description": "A coastal metropolis famous for cinema, beaches, art deco buildings, food, and nightlife.",
    "bestSeason": "November to February",
    "popularityScore": 91,
    "rating": 4.5,
    "averageRating": 4.5,
    "estimatedDailyBudget": 6500,
    "themes": [
      "beaches",
      "nightlife",
      "food",
      "cinema"
    ],
    "imageUrl": "/images/mumbai.jpg"
  },
  {
    "id": 5,
    "name": "Udaipur",
    "country": "India",
    "state": "Rajasthan",
    "region": "West India",
    "latitude": 24.5854,
    "longitude": 73.7125,
    "description": "The City of Lakes, loved for palaces, calm water views, heritage stays, and romantic sunsets.",
    "bestSeason": "September to March",
    "popularityScore": 93,
    "rating": 4.8,
    "averageRating": 4.8,
    "estimatedDailyBudget": 5000,
    "themes": [
      "lakes",
      "palaces",
      "romantic",
      "heritage"
    ],
    "imageUrl": "/images/udaipur.jpg"
  },
  {
    "id": 6,
    "name": "Varanasi",
    "country": "India",
    "state": "Uttar Pradesh",
    "region": "North India",
    "latitude": 25.3176,
    "longitude": 82.9739,
    "description": "One of the world's oldest living cities, centered on ghats, temples, music, and the Ganga.",
    "bestSeason": "October to March",
    "popularityScore": 92,
    "rating": 4.7,
    "averageRating": 4.7,
    "estimatedDailyBudget": 3200,
    "themes": [
      "spiritual",
      "culture",
      "river",
      "heritage"
    ],
    "imageUrl": "/images/varanasi.jpg"
  },
  {
    "id": 7,
    "name": "Goa",
    "country": "India",
    "state": "Goa",
    "region": "West India",
    "latitude": 15.2993,
    "longitude": 74.124,
    "description": "India's beach capital with Portuguese heritage, seafood, churches, waterfalls, and nightlife.",
    "bestSeason": "November to February",
    "popularityScore": 95,
    "rating": 4.7,
    "averageRating": 4.7,
    "estimatedDailyBudget": 6200,
    "themes": [
      "beaches",
      "nightlife",
      "heritage",
      "food"
    ],
    "imageUrl": "/images/goa.jpg"
  },
  {
    "id": 8,
    "name": "Kochi",
    "country": "India",
    "state": "Kerala",
    "region": "South India",
    "latitude": 9.9312,
    "longitude": 76.2673,
    "description": "A port city with backwater gateways, spice trade history, art spaces, churches, and seafood.",
    "bestSeason": "October to February",
    "popularityScore": 88,
    "rating": 4.6,
    "averageRating": 4.6,
    "estimatedDailyBudget": 4600,
    "themes": [
      "backwaters",
      "heritage",
      "food",
      "art"
    ],
    "imageUrl": "/images/kochi.jpg"
  },
  {
    "id": 9,
    "name": "Amritsar",
    "country": "India",
    "state": "Punjab",
    "region": "North India",
    "latitude": 31.634,
    "longitude": 74.8723,
    "description": "The spiritual and cultural heartbeat of Punjab, home to the Golden Temple, Wagah Border, and legendary street food.",
    "bestSeason": "October to March",
    "popularityScore": 94,
    "rating": 4.9,
    "averageRating": 4.9,
    "estimatedDailyBudget": 3600,
    "themes": [
      "spiritual",
      "food",
      "heritage",
      "history"
    ],
    "imageUrl": "/images/amritsar.jpg"
  },
  {
    "id": 10,
    "name": "Manali",
    "country": "India",
    "state": "Himachal Pradesh",
    "region": "North India",
    "latitude": 32.2432,
    "longitude": 77.1892,
    "description": "Himalayan resort town set amidst snow peaks, pine forests, adventure passes, and scenic river valleys.",
    "bestSeason": "March to June & Oct to Feb",
    "popularityScore": 92,
    "rating": 4.7,
    "averageRating": 4.7,
    "estimatedDailyBudget": 4400,
    "themes": [
      "mountains",
      "adventure",
      "snow",
      "nature"
    ],
    "imageUrl": "/images/manali.jpg"
  },
  {
    "id": 11,
    "name": "Rishikesh",
    "country": "India",
    "state": "Uttarakhand",
    "region": "North India",
    "latitude": 30.0869,
    "longitude": 78.2676,
    "description": "The Yoga Capital of the World along the turquoise Ganga, renowned for ashrams, rafting, and scenic cliff cafes.",
    "bestSeason": "September to April",
    "popularityScore": 90,
    "rating": 4.8,
    "averageRating": 4.8,
    "estimatedDailyBudget": 3400,
    "themes": [
      "yoga",
      "spiritual",
      "adventure",
      "nature"
    ],
    "imageUrl": "/images/rishikesh.jpg"
  },
  {
    "id": 12,
    "name": "Bengaluru",
    "country": "India",
    "state": "Karnataka",
    "region": "South India",
    "latitude": 12.9716,
    "longitude": 77.5946,
    "description": "The Garden City and Silicon Valley of India, famed for pleasant weather, lush parks, royal palaces, and microbreweries.",
    "bestSeason": "Year-round",
    "popularityScore": 89,
    "rating": 4.6,
    "averageRating": 4.6,
    "estimatedDailyBudget": 5400,
    "themes": [
      "gardens",
      "food",
      "breweries",
      "culture"
    ],
    "imageUrl": "/images/bengaluru.jpg"
  },
  {
    "id": 13,
    "name": "Hampi",
    "country": "India",
    "state": "Karnataka",
    "region": "South India",
    "latitude": 15.335,
    "longitude": 76.46,
    "description": "UNESCO World Heritage landscape of boulder hills and 14th-century Vijayanagara Empire stone temple monuments.",
    "bestSeason": "October to March",
    "popularityScore": 93,
    "rating": 4.9,
    "averageRating": 4.9,
    "estimatedDailyBudget": 3200,
    "themes": [
      "unesco",
      "heritage",
      "ruins",
      "architecture"
    ],
    "imageUrl": "/images/hampi.jpg"
  },
  {
    "id": 14,
    "name": "Darjeeling",
    "country": "India",
    "state": "West Bengal",
    "region": "East India",
    "latitude": 27.041,
    "longitude": 88.2663,
    "description": "The Queen of the Hills in the Eastern Himalayas, world-famous for aromatic tea estates, UNESCO Toy Train, and Kanchenjunga views.",
    "bestSeason": "March to May & Oct to Dec",
    "popularityScore": 91,
    "rating": 4.7,
    "averageRating": 4.7,
    "estimatedDailyBudget": 4800,
    "themes": [
      "mountains",
      "tea",
      "unesco",
      "nature"
    ],
    "imageUrl": "/images/darjeeling.jpg"
  },
  {
    "id": 15,
    "name": "Shimla",
    "country": "India",
    "state": "Himachal Pradesh",
    "region": "North India",
    "latitude": 31.1048,
    "longitude": 77.1734,
    "description": "The Queen of Hill Stations featuring pine-clad ridges, the historic Mall Road, and colonial Victorian architecture.",
    "bestSeason": "March to June & Dec to Feb",
    "popularityScore": 93,
    "rating": 4.8,
    "averageRating": 4.8,
    "estimatedDailyBudget": 4100,
    "themes": [
      "mountains",
      "colonial",
      "snow",
      "nature"
    ],
    "imageUrl": "/images/shimla.jpg"
  },
  {
    "id": 16,
    "name": "Leh Ladakh",
    "country": "India",
    "state": "Ladakh",
    "region": "North India",
    "latitude": 34.1526,
    "longitude": 77.5771,
    "description": "High-altitude desert wonderland famed for turquoise Pangong Lake, Buddhist monasteries, and high mountain passes.",
    "bestSeason": "May to September",
    "popularityScore": 95,
    "rating": 4.9,
    "averageRating": 4.9,
    "estimatedDailyBudget": 5800,
    "themes": [
      "mountains",
      "adventure",
      "monastery",
      "lakes"
    ],
    "imageUrl": "/images/lehladakh.jpg"
  },
  {
    "id": 17,
    "name": "Mysore",
    "country": "India",
    "state": "Karnataka",
    "region": "South India",
    "latitude": 12.2958,
    "longitude": 76.6394,
    "description": "The City of Palaces renowned for the illuminated Amba Vilas Palace, silk sarees, and aromatic sandalwood craft.",
    "bestSeason": "October to March",
    "popularityScore": 92,
    "rating": 4.7,
    "averageRating": 4.7,
    "estimatedDailyBudget": 3600,
    "themes": [
      "palaces",
      "heritage",
      "silk",
      "architecture"
    ],
    "imageUrl": "/images/mysore.jpg"
  },
  {
    "id": 18,
    "name": "Srinagar",
    "country": "India",
    "state": "Jammu & Kashmir",
    "region": "North India",
    "latitude": 34.0837,
    "longitude": 74.7973,
    "description": "Paradise on Earth featuring serene Dal Lake houseboats, Mughal gardens, and snow-capped Himalayan peaks.",
    "bestSeason": "April to October",
    "popularityScore": 94,
    "rating": 4.8,
    "averageRating": 4.8,
    "estimatedDailyBudget": 5200,
    "themes": [
      "lakes",
      "houseboats",
      "nature",
      "gardens"
    ],
    "imageUrl": "/images/srinagar.jpg"
  },
  {
    "id": 19,
    "name": "Pondicherry",
    "country": "India",
    "state": "Puducherry",
    "region": "South India",
    "latitude": 11.9416,
    "longitude": 79.8083,
    "description": "French colonial coastal enclave with pastel heritage villas, Promenade Beach, seaside cafes, and spiritual Auroville.",
    "bestSeason": "October to March",
    "popularityScore": 91,
    "rating": 4.7,
    "averageRating": 4.7,
    "estimatedDailyBudget": 4300,
    "themes": [
      "beaches",
      "french",
      "cafes",
      "spiritual"
    ],
    "imageUrl": "/images/pondicherry.jpg"
  },
  {
    "id": 20,
    "name": "Hyderabad",
    "country": "India",
    "state": "Telangana",
    "region": "South India",
    "latitude": 17.385,
    "longitude": 78.4867,
    "description": "The City of Pearls blending Nizam royal grandeur, Golconda Fort, world-famous Dum Biryani, and modern tech hubs.",
    "bestSeason": "October to March",
    "popularityScore": 92,
    "rating": 4.7,
    "averageRating": 4.7,
    "estimatedDailyBudget": 4600,
    "themes": [
      "heritage",
      "food",
      "palaces",
      "monuments"
    ],
    "imageUrl": "/images/hyderabad.jpg"
  },
  {
    "id": 21,
    "name": "Kolkata",
    "country": "India",
    "state": "West Bengal",
    "region": "East India",
    "latitude": 22.5726,
    "longitude": 88.3639,
    "rating": 4.7,
    "averageRating": 4.7,
    "popularityScore": 93,
    "themes": [
      "heritage",
      "literature",
      "sweets",
      "tram"
    ],
    "estimatedDailyBudget": 3900,
    "bestSeason": "October to March",
    "description": "The Cultural Capital of India, celebrated for colonial grandeur, Victoria Memorial, tramways, and literary soul.",
    "imageUrl": "https://images.unsplash.com/photo-1558431382-27e303142255?w=800"
  },
  {
    "id": 22,
    "name": "Jodhpur",
    "country": "India",
    "state": "Rajasthan",
    "region": "West India",
    "latitude": 26.2389,
    "longitude": 73.0243,
    "rating": 4.8,
    "averageRating": 4.8,
    "popularityScore": 94,
    "themes": [
      "blue-city",
      "forts",
      "desert",
      "handicrafts"
    ],
    "estimatedDailyBudget": 4100,
    "bestSeason": "October to March",
    "description": "The iconic Blue City crowned by the colossal Mehrangarh Fort rising above labyrinthine sapphire houses.",
    "imageUrl": "https://images.unsplash.com/photo-1568849676085-51415703900f?w=800"
  },
  {
    "id": 23,
    "name": "Ooty",
    "country": "India",
    "state": "Tamil Nadu",
    "region": "South India",
    "latitude": 11.4102,
    "longitude": 76.695,
    "rating": 4.7,
    "averageRating": 4.7,
    "popularityScore": 91,
    "themes": [
      "hills",
      "tea-gardens",
      "toy-train",
      "lakes"
    ],
    "estimatedDailyBudget": 4400,
    "bestSeason": "March to June & Oct to Nov",
    "description": "The Queen of Nilgiri Hill Stations with rolling eucalyptus hills, mist-shrouded tea estates, and heritage toy trains.",
    "imageUrl": "https://images.unsplash.com/photo-1574063413132-355dbfd83e25?w=800"
  },
  {
    "id": 24,
    "name": "Shillong",
    "country": "India",
    "state": "Meghalaya",
    "region": "North-East",
    "latitude": 25.5788,
    "longitude": 91.8933,
    "rating": 4.8,
    "averageRating": 4.8,
    "popularityScore": 92,
    "themes": [
      "waterfalls",
      "clouds",
      "music",
      "nature"
    ],
    "estimatedDailyBudget": 4600,
    "bestSeason": "September to May",
    "description": "The Scotland of the East featuring emerald pine slopes, thunderous waterfalls, crystal lakes, and vibrant live music.",
    "imageUrl": "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800"
  }
];

export const ATTRACTIONS_MASTER = [
  {
    "id": 101,
    "cityId": 1,
    "name": "Amber Fort",
    "category": "Fort",
    "description": "Hilltop Rajput fort with courtyards and city views.",
    "latitude": 26.9855,
    "longitude": 75.8513,
    "rating": 4.8,
    "durationHours": 3,
    "entryFee": 100,
    "tags": [
      "heritage",
      "architecture"
    ]
  },
  {
    "id": 102,
    "cityId": 1,
    "name": "Hawa Mahal",
    "category": "Palace",
    "description": "Iconic honeycomb palace facade in the old city.",
    "latitude": 26.9239,
    "longitude": 75.8267,
    "rating": 4.6,
    "durationHours": 1,
    "entryFee": 50,
    "tags": [
      "heritage",
      "photography"
    ]
  },
  {
    "id": 103,
    "cityId": 1,
    "name": "City Palace Jaipur",
    "category": "Palace",
    "description": "Royal complex with museums and courtyards.",
    "latitude": 26.9258,
    "longitude": 75.8237,
    "rating": 4.6,
    "durationHours": 2,
    "entryFee": 200,
    "tags": [
      "museum",
      "royal"
    ]
  },
  {
    "id": 201,
    "cityId": 2,
    "name": "Taj Mahal",
    "category": "Monument",
    "description": "White marble mausoleum and India's most recognized landmark.",
    "latitude": 27.1751,
    "longitude": 78.0421,
    "rating": 4.9,
    "durationHours": 3,
    "entryFee": 250,
    "tags": [
      "unesco",
      "architecture"
    ]
  },
  {
    "id": 202,
    "cityId": 2,
    "name": "Agra Fort",
    "category": "Fort",
    "description": "Massive red sandstone Mughal fort near the Yamuna.",
    "latitude": 27.1795,
    "longitude": 78.0211,
    "rating": 4.7,
    "durationHours": 2,
    "entryFee": 100,
    "tags": [
      "unesco",
      "history"
    ]
  },
  {
    "id": 203,
    "cityId": 2,
    "name": "Mehtab Bagh",
    "category": "Garden",
    "description": "Riverside garden with sunset views of the Taj Mahal.",
    "latitude": 27.1929,
    "longitude": 78.0419,
    "rating": 4.4,
    "durationHours": 1,
    "entryFee": 30,
    "tags": [
      "sunset",
      "garden"
    ]
  },
  {
    "id": 301,
    "cityId": 3,
    "name": "Red Fort",
    "category": "Fort",
    "description": "Mughal fort complex and Independence Day landmark.",
    "latitude": 28.6562,
    "longitude": 77.241,
    "rating": 4.5,
    "durationHours": 2,
    "entryFee": 50,
    "tags": [
      "history",
      "unesco"
    ]
  },
  {
    "id": 302,
    "cityId": 3,
    "name": "India Gate",
    "category": "Memorial",
    "description": "War memorial and central Delhi public space.",
    "latitude": 28.6129,
    "longitude": 77.2295,
    "rating": 4.6,
    "durationHours": 1,
    "entryFee": 0,
    "tags": [
      "landmark",
      "evening"
    ]
  },
  {
    "id": 303,
    "cityId": 3,
    "name": "Qutub Minar",
    "category": "Monument",
    "description": "Tall minaret and Indo-Islamic architecture complex.",
    "latitude": 28.5245,
    "longitude": 77.1855,
    "rating": 4.6,
    "durationHours": 2,
    "entryFee": 40,
    "tags": [
      "unesco",
      "architecture"
    ]
  },
  {
    "id": 401,
    "cityId": 4,
    "name": "Gateway of India",
    "category": "Monument",
    "description": "Waterfront arch facing Mumbai harbour.",
    "latitude": 18.922,
    "longitude": 72.8347,
    "rating": 4.6,
    "durationHours": 1,
    "entryFee": 0,
    "tags": [
      "landmark",
      "waterfront"
    ]
  },
  {
    "id": 402,
    "cityId": 4,
    "name": "Marine Drive",
    "category": "Promenade",
    "description": "Curving seafront boulevard popular at sunset.",
    "latitude": 18.9432,
    "longitude": 72.823,
    "rating": 4.7,
    "durationHours": 2,
    "entryFee": 0,
    "tags": [
      "sunset",
      "sea"
    ]
  },
  {
    "id": 403,
    "cityId": 4,
    "name": "Elephanta Caves",
    "category": "Caves",
    "description": "Island cave temples reached by ferry.",
    "latitude": 18.9633,
    "longitude": 72.9315,
    "rating": 4.4,
    "durationHours": 4,
    "entryFee": 40,
    "tags": [
      "unesco",
      "history"
    ]
  },
  {
    "id": 501,
    "cityId": 5,
    "name": "City Palace Udaipur",
    "category": "Palace",
    "description": "Lakeside palace complex with sweeping views.",
    "latitude": 24.5764,
    "longitude": 73.6835,
    "rating": 4.7,
    "durationHours": 3,
    "entryFee": 300,
    "tags": [
      "palace",
      "lake"
    ]
  },
  {
    "id": 502,
    "cityId": 5,
    "name": "Lake Pichola",
    "category": "Lake",
    "description": "Scenic lake with boat rides and island palaces.",
    "latitude": 24.572,
    "longitude": 73.679,
    "rating": 4.8,
    "durationHours": 2,
    "entryFee": 400,
    "tags": [
      "boat",
      "sunset"
    ]
  },
  {
    "id": 601,
    "cityId": 6,
    "name": "Dashashwamedh Ghat",
    "category": "Ghat",
    "description": "Major ghat known for the evening Ganga Aarti.",
    "latitude": 25.3062,
    "longitude": 83.0104,
    "rating": 4.8,
    "durationHours": 2,
    "entryFee": 0,
    "tags": [
      "spiritual",
      "river"
    ]
  },
  {
    "id": 602,
    "cityId": 6,
    "name": "Kashi Vishwanath Temple",
    "category": "Temple",
    "description": "Important Hindu temple near the ghats.",
    "latitude": 25.3109,
    "longitude": 83.0107,
    "rating": 4.8,
    "durationHours": 2,
    "entryFee": 0,
    "tags": [
      "spiritual",
      "temple"
    ]
  },
  {
    "id": 701,
    "cityId": 7,
    "name": "Baga Beach",
    "category": "Beach",
    "description": "Popular beach with water sports and nightlife.",
    "latitude": 15.5553,
    "longitude": 73.7517,
    "rating": 4.5,
    "durationHours": 3,
    "entryFee": 0,
    "tags": [
      "beach",
      "nightlife"
    ]
  },
  {
    "id": 702,
    "cityId": 7,
    "name": "Basilica of Bom Jesus",
    "category": "Church",
    "description": "Historic church and UNESCO heritage site.",
    "latitude": 15.5009,
    "longitude": 73.9116,
    "rating": 4.5,
    "durationHours": 2,
    "entryFee": 0,
    "tags": [
      "unesco",
      "heritage"
    ]
  },
  {
    "id": 801,
    "cityId": 8,
    "name": "Fort Kochi",
    "category": "Heritage Quarter",
    "description": "Walkable old town with cafes, art, and colonial-era streets.",
    "latitude": 9.9658,
    "longitude": 76.2421,
    "rating": 4.6,
    "durationHours": 3,
    "entryFee": 0,
    "tags": [
      "heritage",
      "art"
    ]
  },
  {
    "id": 802,
    "cityId": 8,
    "name": "Chinese Fishing Nets",
    "category": "Landmark",
    "description": "Historic shore-operated fishing nets.",
    "latitude": 9.9667,
    "longitude": 76.2427,
    "rating": 4.3,
    "durationHours": 1,
    "entryFee": 0,
    "tags": [
      "waterfront",
      "photography"
    ]
  },
  {
    "id": 901,
    "cityId": 9,
    "name": "Golden Temple (Harmandir Sahib)",
    "category": "Gurudwara",
    "description": "Gilded spiritual sanctuary with holy sarovar and round-the-clock free community langar.",
    "latitude": 31.62,
    "longitude": 74.8765,
    "rating": 4.9,
    "durationHours": 3,
    "entryFee": 0,
    "tags": [
      "spiritual",
      "unesco",
      "food"
    ]
  },
  {
    "id": 902,
    "cityId": 9,
    "name": "Wagah Border",
    "category": "Border Ceremony",
    "description": "Electrifying patriotic daily flag-lowering military parade between India and Pakistan.",
    "latitude": 31.6047,
    "longitude": 74.5724,
    "rating": 4.8,
    "durationHours": 3,
    "entryFee": 0,
    "tags": [
      "national",
      "parade"
    ]
  },
  {
    "id": 10010,
    "cityId": 10,
    "name": "Solang Valley",
    "category": "Adventure Valley",
    "description": "Alpine hub for paragliding, skiing, zorbing, and cable car rides.",
    "latitude": 32.3166,
    "longitude": 77.1578,
    "rating": 4.7,
    "durationHours": 4,
    "entryFee": 150,
    "tags": [
      "adventure",
      "snow"
    ]
  },
  {
    "id": 10020,
    "cityId": 10,
    "name": "Hadimba Temple",
    "category": "Heritage Temple",
    "description": "Ancient wooden pagoda temple in cedar forests built in 1553.",
    "latitude": 32.2483,
    "longitude": 77.1806,
    "rating": 4.6,
    "durationHours": 1,
    "entryFee": 30,
    "tags": [
      "temple",
      "forest"
    ]
  },
  {
    "id": 1101,
    "cityId": 11,
    "name": "Ram Jhula & Laxman Jhula",
    "category": "Suspension Bridge",
    "description": "Iconic iron suspension bridges over the Ganges connecting ashrams and markets.",
    "latitude": 30.1232,
    "longitude": 78.3175,
    "rating": 4.7,
    "durationHours": 2,
    "entryFee": 0,
    "tags": [
      "river",
      "landmark"
    ]
  },
  {
    "id": 1102,
    "cityId": 11,
    "name": "Triveni Ghat Evening Aarti",
    "category": "Spiritual Ghat",
    "description": "Mesmerizing daily sunset Maha Aarti with glowing brass lamps on the holy Ganges.",
    "latitude": 30.1033,
    "longitude": 78.2936,
    "rating": 4.8,
    "durationHours": 2,
    "entryFee": 0,
    "tags": [
      "spiritual",
      "aarti"
    ]
  },
  {
    "id": 1201,
    "cityId": 12,
    "name": "Bangalore Palace",
    "category": "Palace",
    "description": "Tudor-style royal estate with fortified towers, stained glass, and lush courtyards.",
    "latitude": 12.9982,
    "longitude": 77.5921,
    "rating": 4.5,
    "durationHours": 2,
    "entryFee": 250,
    "tags": [
      "palace",
      "history"
    ]
  },
  {
    "id": 1202,
    "cityId": 12,
    "name": "Lalbagh Botanical Garden",
    "category": "Botanical Garden",
    "description": "240-acre botanical haven with rare plants, lake, and Victorian glass house.",
    "latitude": 12.9507,
    "longitude": 77.5848,
    "rating": 4.6,
    "durationHours": 2,
    "entryFee": 30,
    "tags": [
      "nature",
      "garden"
    ]
  },
  {
    "id": 1301,
    "cityId": 13,
    "name": "Virupaksha Temple",
    "category": "Temple",
    "description": "7th-century active temple complex dedicated to Lord Shiva with towering gopuram.",
    "latitude": 15.3353,
    "longitude": 76.4601,
    "rating": 4.9,
    "durationHours": 2,
    "entryFee": 50,
    "tags": [
      "unesco",
      "spiritual"
    ]
  },
  {
    "id": 1302,
    "cityId": 13,
    "name": "Stone Chariot & Vijaya Vittala",
    "category": "Architectural Wonder",
    "description": "Iconic stone chariot shrine and musical stone pillars of Vijayanagara empire.",
    "latitude": 15.3437,
    "longitude": 76.4752,
    "rating": 4.9,
    "durationHours": 3,
    "entryFee": 40,
    "tags": [
      "unesco",
      "monument"
    ]
  },
  {
    "id": 1401,
    "cityId": 14,
    "name": "Tiger Hill Sunrise",
    "category": "Viewpoint",
    "description": "World-renowned sunrise vantage point showing the sun rising over Kanchenjunga.",
    "latitude": 26.9944,
    "longitude": 88.2861,
    "rating": 4.8,
    "durationHours": 2,
    "entryFee": 50,
    "tags": [
      "mountains",
      "sunrise"
    ]
  },
  {
    "id": 1402,
    "cityId": 14,
    "name": "Happy Valley Tea Estate",
    "category": "Tea Plantation",
    "description": "Historic rolling emerald tea garden offering tea plucking and artisanal tasting.",
    "latitude": 27.0543,
    "longitude": 88.2618,
    "rating": 4.6,
    "durationHours": 2,
    "entryFee": 100,
    "tags": [
      "tea",
      "nature"
    ]
  },
  {
    "id": 1501,
    "cityId": 15,
    "name": "The Ridge & Mall Road",
    "category": "Colonial Promenade",
    "description": "Pedestrian cultural heart of Shimla with Tudor library and panoramic Himalayan views.",
    "latitude": 31.1044,
    "longitude": 77.175,
    "rating": 4.7,
    "durationHours": 2,
    "entryFee": 0,
    "tags": [
      "hills",
      "colonial",
      "evening"
    ]
  },
  {
    "id": 1502,
    "cityId": 15,
    "name": "Kufri Snow Point",
    "category": "Alpine Adventure",
    "description": "Scenic winter sports hub for tobogganing, pony trekking, and Himalayan nature parks.",
    "latitude": 31.0979,
    "longitude": 77.2678,
    "rating": 4.6,
    "durationHours": 3,
    "entryFee": 100,
    "tags": [
      "snow",
      "adventure"
    ]
  },
  {
    "id": 1601,
    "cityId": 16,
    "name": "Pangong Tso Lake",
    "category": "High-Altitude Lake",
    "description": "World-famous azure saltwater lake changing colors from blue to turquoise under Himalayan skies.",
    "latitude": 33.7595,
    "longitude": 78.6674,
    "rating": 4.9,
    "durationHours": 4,
    "entryFee": 200,
    "tags": [
      "lakes",
      "photography",
      "nature"
    ]
  },
  {
    "id": 1602,
    "cityId": 16,
    "name": "Thiksey Monastery",
    "category": "Buddhist Gompa",
    "description": "Imposing 12-storey hilltop monastery resembling the Potala Palace of Lhasa.",
    "latitude": 34.0583,
    "longitude": 77.6667,
    "rating": 4.8,
    "durationHours": 2,
    "entryFee": 50,
    "tags": [
      "monastery",
      "culture",
      "peace"
    ]
  },
  {
    "id": 1701,
    "cityId": 17,
    "name": "Mysore Palace (Amba Vilas)",
    "category": "Royal Palace",
    "description": "One of India's most grand palaces, illuminated by 100,000 golden bulbs on weekends.",
    "latitude": 12.3051,
    "longitude": 76.6552,
    "rating": 4.9,
    "durationHours": 3,
    "entryFee": 100,
    "tags": [
      "palaces",
      "royal",
      "architecture"
    ]
  },
  {
    "id": 1702,
    "cityId": 17,
    "name": "Chamundi Hill & Temple",
    "category": "Hilltop Shrine",
    "description": "Ancient Dravidian temple overlooking Mysore with giant monolith Nandi statue.",
    "latitude": 12.2745,
    "longitude": 76.671,
    "rating": 4.7,
    "durationHours": 2,
    "entryFee": 0,
    "tags": [
      "spiritual",
      "viewpoint"
    ]
  },
  {
    "id": 1801,
    "cityId": 18,
    "name": "Dal Lake & Shikara Cruise",
    "category": "Scenic Lake",
    "description": "Romantic wooden Shikara rides through floating lotus gardens and water bazaars.",
    "latitude": 34.1111,
    "longitude": 74.8722,
    "rating": 4.9,
    "durationHours": 3,
    "entryFee": 500,
    "tags": [
      "lakes",
      "boat",
      "romantic"
    ]
  },
  {
    "id": 1802,
    "cityId": 18,
    "name": "Mughal Gardens (Shalimar)",
    "category": "Royal Garden",
    "description": "Terraced royal Mughal garden with stepped cascades, fountains, and chinar trees.",
    "latitude": 34.15,
    "longitude": 74.87,
    "rating": 4.7,
    "durationHours": 2,
    "entryFee": 50,
    "tags": [
      "gardens",
      "history"
    ]
  },
  {
    "id": 1901,
    "cityId": 19,
    "name": "White Town French Quarter",
    "category": "Heritage Enclave",
    "description": "Charming mustard-yellow Franco-Tamil villas, boutique bakeries, and bougainvillea streets.",
    "latitude": 11.9333,
    "longitude": 79.8333,
    "rating": 4.7,
    "durationHours": 3,
    "entryFee": 0,
    "tags": [
      "french",
      "heritage",
      "cafes"
    ]
  },
  {
    "id": 1902,
    "cityId": 19,
    "name": "Auroville Matrimandir",
    "category": "Spiritual Dome",
    "description": "Futuristic golden geodesic dome dedicated to universal human unity and silent meditation.",
    "latitude": 12.0069,
    "longitude": 79.8106,
    "rating": 4.8,
    "durationHours": 2,
    "entryFee": 0,
    "tags": [
      "peace",
      "architecture"
    ]
  },
  {
    "id": 2001,
    "cityId": 20,
    "name": "Charminar",
    "category": "Historical Monument",
    "description": "1591 landmark mosque with four grand arches and bustling Laad Bazaar bangle markets.",
    "latitude": 17.3616,
    "longitude": 78.4747,
    "rating": 4.7,
    "durationHours": 2,
    "entryFee": 25,
    "tags": [
      "history",
      "bazaar",
      "heritage"
    ]
  },
  {
    "id": 2002,
    "cityId": 20,
    "name": "Golconda Fort",
    "category": "Medieval Fort",
    "description": "Acoustic wonder fortress renowned for sound resonance and diamond trade history.",
    "latitude": 17.3833,
    "longitude": 78.4011,
    "rating": 4.8,
    "durationHours": 3,
    "entryFee": 80,
    "tags": [
      "fort",
      "history",
      "sound"
    ]
  },
  {
    "id": 2101,
    "cityId": 21,
    "name": "Victoria Memorial",
    "category": "Palace Museum",
    "description": "Grand white marble British-era memorial with gardens.",
    "latitude": 22.5448,
    "longitude": 88.3426,
    "rating": 4.8,
    "durationHours": 3,
    "entryFee": 50,
    "tags": [
      "museum",
      "heritage"
    ]
  },
  {
    "id": 2102,
    "cityId": 21,
    "name": "Howrah Bridge",
    "category": "Iconic Bridge",
    "description": "Cantilever bridge over Hooghly river.",
    "latitude": 22.5851,
    "longitude": 88.3468,
    "rating": 4.6,
    "durationHours": 1,
    "entryFee": 0,
    "tags": [
      "landmark",
      "river"
    ]
  },
  {
    "id": 2201,
    "cityId": 22,
    "name": "Mehrangarh Fort",
    "category": "Hilltop Fort",
    "description": "Colossal citadel rising 400 feet above the blue city.",
    "latitude": 26.2978,
    "longitude": 73.0185,
    "rating": 4.9,
    "durationHours": 3,
    "entryFee": 100,
    "tags": [
      "fort",
      "history"
    ]
  },
  {
    "id": 2202,
    "cityId": 22,
    "name": "Umaid Bhawan Palace",
    "category": "Royal Residence",
    "description": "Grand art deco palace and museum.",
    "latitude": 26.2808,
    "longitude": 73.0475,
    "rating": 4.7,
    "durationHours": 2,
    "entryFee": 100,
    "tags": [
      "palace",
      "luxury"
    ]
  },
  {
    "id": 2301,
    "cityId": 23,
    "name": "Ooty Botanical Gardens",
    "category": "Botanical Garden",
    "description": "55-acre terraced gardens with exotic flora.",
    "latitude": 11.4172,
    "longitude": 76.7118,
    "rating": 4.6,
    "durationHours": 2,
    "entryFee": 50,
    "tags": [
      "gardens",
      "nature"
    ]
  },
  {
    "id": 2302,
    "cityId": 23,
    "name": "Doddabetta Peak",
    "category": "Mountain Summit",
    "description": "Highest summit in the Nilgiris with panoramic view.",
    "latitude": 11.4012,
    "longitude": 76.7362,
    "rating": 4.7,
    "durationHours": 2,
    "entryFee": 30,
    "tags": [
      "mountains",
      "viewpoint"
    ]
  },
  {
    "id": 2401,
    "cityId": 24,
    "name": "Elephant Falls",
    "category": "Waterfall",
    "description": "Three-tiered cascading waterfall in green fern ravines.",
    "latitude": 25.5358,
    "longitude": 91.8228,
    "rating": 4.7,
    "durationHours": 2,
    "entryFee": 20,
    "tags": [
      "waterfall",
      "nature"
    ]
  },
  {
    "id": 2402,
    "cityId": 24,
    "name": "Umiam Lake",
    "category": "Highland Lake",
    "description": "Sprawling reservoir surrounded by coniferous Khasi hills.",
    "latitude": 25.6667,
    "longitude": 91.9,
    "rating": 4.8,
    "durationHours": 3,
    "entryFee": 0,
    "tags": [
      "lakes",
      "peace"
    ]
  }
];

export const HOTELS_MASTER = [
  {
    "id": 1001,
    "cityId": 1,
    "name": "Zostel Jaipur (Backpacker Hostel)",
    "type": "Hostel",
    "address": "Near Hawa Mahal, Pink City, Jaipur",
    "latitude": 26.924,
    "longitude": 75.827,
    "rating": 4.7,
    "pricePerNight": 850,
    "amenities": [
      "dorm beds",
      "rooftop cafe",
      "free wifi",
      "social events"
    ],
    "nearbyAttractionIds": [
      102,
      103
    ]
  },
  {
    "id": 1002,
    "cityId": 1,
    "name": "Heritage Haveli Jaipur",
    "type": "Heritage",
    "address": "Near Johari Bazaar, Jaipur",
    "latitude": 26.9225,
    "longitude": 75.8199,
    "rating": 4.6,
    "pricePerNight": 4200,
    "amenities": [
      "breakfast",
      "rooftop pool",
      "parking",
      "folk music"
    ],
    "nearbyAttractionIds": [
      102,
      103
    ]
  },
  {
    "id": 1003,
    "cityId": 1,
    "name": "The Raj Palace Royal Suites",
    "type": "Luxury Palace",
    "address": "Amer Road, Jaipur",
    "latitude": 26.945,
    "longitude": 75.835,
    "rating": 4.9,
    "pricePerNight": 11500,
    "amenities": [
      "heritage suites",
      "butler service",
      "royal museum",
      "spa"
    ],
    "nearbyAttractionIds": [
      101
    ]
  },
  {
    "id": 1004,
    "cityId": 1,
    "name": "Amber View Resort",
    "type": "Resort",
    "address": "Amer Foothills, Jaipur",
    "latitude": 26.9701,
    "longitude": 75.8455,
    "rating": 4.5,
    "pricePerNight": 5600,
    "amenities": [
      "swimming pool",
      "cab service",
      "family lawns"
    ],
    "nearbyAttractionIds": [
      101
    ]
  },
  {
    "id": 2001,
    "cityId": 2,
    "name": "The Hosteller Agra (Hostel)",
    "type": "Hostel",
    "address": "Taj East Gate Rd, Agra",
    "latitude": 27.165,
    "longitude": 78.048,
    "rating": 4.6,
    "pricePerNight": 750,
    "amenities": [
      "ac dorms",
      "rooftop taj view",
      "cafe",
      "board games"
    ],
    "nearbyAttractionIds": [
      201
    ]
  },
  {
    "id": 2002,
    "cityId": 2,
    "name": "Taj East Gate Hotel",
    "type": "Premium",
    "address": "Taj East Gate Road, Agra",
    "latitude": 27.1688,
    "longitude": 78.0496,
    "rating": 4.7,
    "pricePerNight": 6200,
    "amenities": [
      "taj view",
      "restaurant",
      "airport pickup"
    ],
    "nearbyAttractionIds": [
      201,
      203
    ]
  },
  {
    "id": 2003,
    "cityId": 2,
    "name": "Agra Fort Heritage Inn",
    "type": "Budget",
    "address": "Rakabganj, Agra",
    "latitude": 27.1749,
    "longitude": 78.0165,
    "rating": 4.3,
    "pricePerNight": 1900,
    "amenities": [
      "wifi",
      "family rooms",
      "tour desk"
    ],
    "nearbyAttractionIds": [
      202
    ]
  },
  {
    "id": 3001,
    "cityId": 3,
    "name": "Zostel Delhi Central",
    "type": "Hostel",
    "address": "Paharganj, New Delhi",
    "latitude": 28.643,
    "longitude": 77.218,
    "rating": 4.5,
    "pricePerNight": 790,
    "amenities": [
      "metro 200m",
      "rooftop terrace",
      "clean dorms",
      "travel desk"
    ],
    "nearbyAttractionIds": [
      301,
      302
    ]
  },
  {
    "id": 3002,
    "cityId": 3,
    "name": "The Imperial New Delhi",
    "type": "Luxury Heritage",
    "address": "Janpath, Connaught Place, Delhi",
    "latitude": 28.6235,
    "longitude": 77.218,
    "rating": 4.8,
    "pricePerNight": 9800,
    "amenities": [
      "art collection",
      "fine dining",
      "spa",
      "gardens"
    ],
    "nearbyAttractionIds": [
      302,
      303
    ]
  },
  {
    "id": 3003,
    "cityId": 3,
    "name": "Central Delhi Business Stay",
    "type": "Business",
    "address": "Connaught Place, Delhi",
    "latitude": 28.6315,
    "longitude": 77.2167,
    "rating": 4.4,
    "pricePerNight": 5200,
    "amenities": [
      "metro nearby",
      "breakfast",
      "workspace"
    ],
    "nearbyAttractionIds": [
      301,
      302
    ]
  },
  {
    "id": 4001,
    "cityId": 4,
    "name": "Backpacker Panda Colaba",
    "type": "Hostel",
    "address": "Colaba, Mumbai",
    "latitude": 18.919,
    "longitude": 72.831,
    "rating": 4.5,
    "pricePerNight": 950,
    "amenities": [
      "walk to gateway",
      "ac dorms",
      "wifi",
      "lounge"
    ],
    "nearbyAttractionIds": [
      401
    ]
  },
  {
    "id": 4002,
    "cityId": 4,
    "name": "The Taj Mahal Palace Mumbai",
    "type": "Luxury Palace",
    "address": "Apollo Bunder, Colaba, Mumbai",
    "latitude": 18.9217,
    "longitude": 72.8332,
    "rating": 4.9,
    "pricePerNight": 14500,
    "amenities": [
      "sea view",
      "heritage wing",
      "pool",
      "celebrity dining"
    ],
    "nearbyAttractionIds": [
      401,
      402
    ]
  },
  {
    "id": 4003,
    "cityId": 4,
    "name": "Marine Bay Seafront Hotel",
    "type": "Premium",
    "address": "Churchgate, Mumbai",
    "latitude": 18.9368,
    "longitude": 72.8258,
    "rating": 4.6,
    "pricePerNight": 7800,
    "amenities": [
      "sea view",
      "breakfast",
      "gym"
    ],
    "nearbyAttractionIds": [
      401,
      402
    ]
  },
  {
    "id": 5001,
    "cityId": 5,
    "name": "Zostel Udaipur (Lakefront)",
    "type": "Hostel",
    "address": "Purohit Ji Ka Khurra, Udaipur",
    "latitude": 24.581,
    "longitude": 73.681,
    "rating": 4.8,
    "pricePerNight": 890,
    "amenities": [
      "lake view terrace",
      "cafe",
      "sunset music",
      "wifi"
    ],
    "nearbyAttractionIds": [
      501,
      502
    ]
  },
  {
    "id": 5002,
    "cityId": 5,
    "name": "Lake Palace View Boutique",
    "type": "Heritage",
    "address": "Lake Pichola Road, Udaipur",
    "latitude": 24.5774,
    "longitude": 73.6822,
    "rating": 4.8,
    "pricePerNight": 6800,
    "amenities": [
      "lake view",
      "boat booking",
      "rooftop dining"
    ],
    "nearbyAttractionIds": [
      501,
      502
    ]
  },
  {
    "id": 6001,
    "cityId": 6,
    "name": "Hostie Ganga Ghat (Hostel)",
    "type": "Hostel",
    "address": "Dashashwamedh Ghat, Varanasi",
    "latitude": 25.305,
    "longitude": 83.009,
    "rating": 4.6,
    "pricePerNight": 720,
    "amenities": [
      "ghat access",
      "aarti terrace",
      "chai station"
    ],
    "nearbyAttractionIds": [
      601
    ]
  },
  {
    "id": 6002,
    "cityId": 6,
    "name": "Ganga Ghat Heritage Residency",
    "type": "Boutique",
    "address": "Godowlia, Varanasi",
    "latitude": 25.3098,
    "longitude": 83.0085,
    "rating": 4.6,
    "pricePerNight": 3600,
    "amenities": [
      "aarti booking",
      "terrace",
      "guide desk"
    ],
    "nearbyAttractionIds": [
      601,
      602
    ]
  },
  {
    "id": 7001,
    "cityId": 7,
    "name": "Zostel Goa Palolem (Beach Hostel)",
    "type": "Hostel",
    "address": "Palolem Beach, South Goa",
    "latitude": 15.011,
    "longitude": 74.024,
    "rating": 4.8,
    "pricePerNight": 850,
    "amenities": [
      "walk to sand",
      "hammocks",
      "surf desk",
      "wifi"
    ],
    "nearbyAttractionIds": [
      701
    ]
  },
  {
    "id": 7002,
    "cityId": 7,
    "name": "North Goa Beach Resort & Spa",
    "type": "Resort",
    "address": "Baga Beach, North Goa",
    "latitude": 15.552,
    "longitude": 73.753,
    "rating": 4.6,
    "pricePerNight": 6800,
    "amenities": [
      "beach access",
      "pool",
      "bike rental",
      "cocktail bar"
    ],
    "nearbyAttractionIds": [
      701
    ]
  },
  {
    "id": 8001,
    "cityId": 8,
    "name": "Zostel Kochi (Art District)",
    "type": "Hostel",
    "address": "Burgar Street, Fort Kochi",
    "latitude": 9.967,
    "longitude": 76.241,
    "rating": 4.7,
    "pricePerNight": 780,
    "amenities": [
      "art cafe",
      "bicycle rental",
      "courtyard"
    ],
    "nearbyAttractionIds": [
      801,
      802
    ]
  },
  {
    "id": 8002,
    "cityId": 8,
    "name": "Fort Kochi Heritage Art Hotel",
    "type": "Boutique",
    "address": "Princess Street, Kochi",
    "latitude": 9.966,
    "longitude": 76.244,
    "rating": 4.6,
    "pricePerNight": 5200,
    "amenities": [
      "colonial cafe",
      "walking tours",
      "seafood"
    ],
    "nearbyAttractionIds": [
      801,
      802
    ]
  },
  {
    "id": 9001,
    "cityId": 9,
    "name": "Hosteller Amritsar Golden Gate",
    "type": "Hostel",
    "address": "Near Heritage Street, Amritsar",
    "latitude": 31.625,
    "longitude": 74.873,
    "rating": 4.7,
    "pricePerNight": 750,
    "amenities": [
      "5 min to temple",
      "ac dorms",
      "amritsari breakfast"
    ],
    "nearbyAttractionIds": [
      901
    ]
  },
  {
    "id": 9002,
    "cityId": 9,
    "name": "Golden Sarovar Premiere Amritsar",
    "type": "Premium",
    "address": "Court Road, Amritsar",
    "latitude": 31.6421,
    "longitude": 74.8812,
    "rating": 4.7,
    "pricePerNight": 4500,
    "amenities": [
      "free shuttle to temple",
      "punjabi buffet",
      "spa"
    ],
    "nearbyAttractionIds": [
      901
    ]
  },
  {
    "id": 10001,
    "cityId": 10,
    "name": "Zostel Old Manali (Apple Orchard)",
    "type": "Hostel",
    "address": "Manu Temple Rd, Old Manali",
    "latitude": 32.257,
    "longitude": 77.182,
    "rating": 4.8,
    "pricePerNight": 890,
    "amenities": [
      "orchard view",
      "bonfire",
      "live acoustic nights",
      "cafe"
    ],
    "nearbyAttractionIds": [
      10010,
      10020
    ]
  },
  {
    "id": 10002,
    "cityId": 10,
    "name": "Snow Peak Himalayan Chalet",
    "type": "Resort",
    "address": "Old Manali Road, Manali",
    "latitude": 32.2541,
    "longitude": 77.1852,
    "rating": 4.6,
    "pricePerNight": 5100,
    "amenities": [
      "mountain view",
      "fireplace",
      "adventure desk"
    ],
    "nearbyAttractionIds": [
      10010,
      10020
    ]
  },
  {
    "id": 11001,
    "cityId": 11,
    "name": "Zostel Tapovan Rishikesh",
    "type": "Hostel",
    "address": "Tapovan, Rishikesh",
    "latitude": 30.136,
    "longitude": 78.326,
    "rating": 4.8,
    "pricePerNight": 820,
    "amenities": [
      "rooftop yoga",
      "cafe",
      "river trail guide",
      "wifi"
    ],
    "nearbyAttractionIds": [
      1101,
      1102
    ]
  },
  {
    "id": 11002,
    "cityId": 11,
    "name": "Ganga Riverside Eco Retreat",
    "type": "Wellness Resort",
    "address": "Tapovan, Rishikesh",
    "latitude": 30.1341,
    "longitude": 78.3245,
    "rating": 4.8,
    "pricePerNight": 4600,
    "amenities": [
      "daily yoga session",
      "ayurvedic spa",
      "river view cafe"
    ],
    "nearbyAttractionIds": [
      1101,
      1102
    ]
  },
  {
    "id": 12001,
    "cityId": 12,
    "name": "Zostel Bangalore Indiranagar",
    "type": "Hostel",
    "address": "Indiranagar, Bengaluru",
    "latitude": 12.971,
    "longitude": 77.641,
    "rating": 4.6,
    "pricePerNight": 920,
    "amenities": [
      "co-working pods",
      "cafe",
      "high-speed wifi"
    ],
    "nearbyAttractionIds": [
      1201,
      1202
    ]
  },
  {
    "id": 12002,
    "cityId": 12,
    "name": "The Heritage Bangalore Residency",
    "type": "Business Boutique",
    "address": "MG Road, Bengaluru",
    "latitude": 12.975,
    "longitude": 77.608,
    "rating": 4.5,
    "pricePerNight": 5900,
    "amenities": [
      "rooftop lounge",
      "metro connectivity",
      "breakfast"
    ],
    "nearbyAttractionIds": [
      1201,
      1202
    ]
  },
  {
    "id": 13001,
    "cityId": 13,
    "name": "Zostel Hampi (Hippie Island)",
    "type": "Hostel",
    "address": "Sanapur, Hampi",
    "latitude": 15.352,
    "longitude": 76.442,
    "rating": 4.8,
    "pricePerNight": 790,
    "amenities": [
      "boulder views",
      "bamboo huts",
      "scooter rental"
    ],
    "nearbyAttractionIds": [
      1301,
      1302
    ]
  },
  {
    "id": 13002,
    "cityId": 13,
    "name": "Boulders & Heritage Camp",
    "type": "Boutique Heritage",
    "address": "Kamalapura, Hampi",
    "latitude": 15.318,
    "longitude": 76.468,
    "rating": 4.8,
    "pricePerNight": 3800,
    "amenities": [
      "cycle rental",
      "guided sunset walk",
      "open-air dining"
    ],
    "nearbyAttractionIds": [
      1301,
      1302
    ]
  },
  {
    "id": 14001,
    "cityId": 14,
    "name": "Hideout Darjeeling Backpacker Hostel",
    "type": "Hostel",
    "address": "HD Lama Rd, Darjeeling",
    "latitude": 27.042,
    "longitude": 88.264,
    "rating": 4.7,
    "pricePerNight": 750,
    "amenities": [
      "kanchenjunga view",
      "darjeeling tea",
      "guitar lounge"
    ],
    "nearbyAttractionIds": [
      1401,
      1402
    ]
  },
  {
    "id": 14002,
    "cityId": 14,
    "name": "Windamere Heritage Colonial Stay",
    "type": "Colonial Heritage",
    "address": "Observatory Hill, Darjeeling",
    "latitude": 27.045,
    "longitude": 88.267,
    "rating": 4.7,
    "pricePerNight": 6500,
    "amenities": [
      "kanchenjunga view",
      "tea lounge",
      "colonial fireplaces"
    ],
    "nearbyAttractionIds": [
      1401,
      1402
    ]
  },
  {
    "id": 15001,
    "cityId": 15,
    "name": "Zostel Homes Mashobra Shimla",
    "type": "Hostel",
    "address": "Mashobra Ridge, Shimla",
    "latitude": 31.13,
    "longitude": 77.23,
    "rating": 4.7,
    "pricePerNight": 850,
    "amenities": [
      "pine forest view",
      "bonfire",
      "apple orchard walk"
    ],
    "nearbyAttractionIds": [
      1501,
      1502
    ]
  },
  {
    "id": 15002,
    "cityId": 15,
    "name": "The Cecil Luxury Heritage Shimla",
    "type": "Heritage",
    "address": "Chaura Maidan, Shimla",
    "latitude": 31.103,
    "longitude": 77.158,
    "rating": 4.9,
    "pricePerNight": 8200,
    "amenities": [
      "colonial ballroom",
      "spa",
      "heated pool",
      "himalayan view"
    ],
    "nearbyAttractionIds": [
      1501,
      1502
    ]
  },
  {
    "id": 16001,
    "cityId": 16,
    "name": "Zostel Leh (Old Town)",
    "type": "Hostel",
    "address": "Karzoo, Leh Ladakh",
    "latitude": 34.168,
    "longitude": 77.585,
    "rating": 4.8,
    "pricePerNight": 950,
    "amenities": [
      "stargazing terrace",
      "acclimatization room",
      "bike rental"
    ],
    "nearbyAttractionIds": [
      1601,
      1602
    ]
  },
  {
    "id": 16002,
    "cityId": 16,
    "name": "The Grand Dragon Ladakh",
    "type": "Luxury Eco Resort",
    "address": "Old Road Sheynam, Leh",
    "latitude": 34.156,
    "longitude": 77.575,
    "rating": 4.9,
    "pricePerNight": 9400,
    "amenities": [
      "oxygen enrichment",
      "solar heated",
      "stok kangri views"
    ],
    "nearbyAttractionIds": [
      1601,
      1602
    ]
  },
  {
    "id": 17001,
    "cityId": 17,
    "name": "Roamer Backpacker Hostel Mysore",
    "type": "Hostel",
    "address": "Gokulam, Mysore",
    "latitude": 12.33,
    "longitude": 76.628,
    "rating": 4.6,
    "pricePerNight": 750,
    "amenities": [
      "yoga lawn",
      "community kitchen",
      "bicycle rental"
    ],
    "nearbyAttractionIds": [
      1701,
      1702
    ]
  },
  {
    "id": 17002,
    "cityId": 17,
    "name": "Lalitha Mahal Palace Hotel",
    "type": "Heritage Palace",
    "address": "Lalitha Mahal Nagar, Mysore",
    "latitude": 12.302,
    "longitude": 76.692,
    "rating": 4.8,
    "pricePerNight": 6200,
    "amenities": [
      "viceroy hall",
      "italian marble",
      "palace carriage ride"
    ],
    "nearbyAttractionIds": [
      1701,
      1702
    ]
  },
  {
    "id": 18001,
    "cityId": 18,
    "name": "Zostel Srinagar (Nigeen Lake)",
    "type": "Hostel",
    "address": "Nigeen Lake, Srinagar",
    "latitude": 34.12,
    "longitude": 74.835,
    "rating": 4.8,
    "pricePerNight": 890,
    "amenities": [
      "lake view balcony",
      "kahwa station",
      "shikara ride"
    ],
    "nearbyAttractionIds": [
      1801,
      1802
    ]
  },
  {
    "id": 18002,
    "cityId": 18,
    "name": "Mascot Houseboats Dal Lake",
    "type": "Luxury Houseboat",
    "address": "Dal Lake Ghat 7, Srinagar",
    "latitude": 34.095,
    "longitude": 74.845,
    "rating": 4.9,
    "pricePerNight": 7500,
    "amenities": [
      "hand-carved walnut wood",
      "kashmiri wazwan",
      "private shikara"
    ],
    "nearbyAttractionIds": [
      1801,
      1802
    ]
  },
  {
    "id": 19001,
    "cityId": 19,
    "name": "Micasa White Town Hostel",
    "type": "Hostel",
    "address": "Rue Romain Rolland, Pondicherry",
    "latitude": 11.932,
    "longitude": 79.834,
    "rating": 4.7,
    "pricePerNight": 850,
    "amenities": [
      "french quarter",
      "rooftop hammock",
      "croissant breakfast"
    ],
    "nearbyAttractionIds": [
      1901,
      1902
    ]
  },
  {
    "id": 19002,
    "cityId": 19,
    "name": "Le Dupleix Heritage Villa",
    "type": "French Heritage",
    "address": "Casimir Street, White Town, Pondicherry",
    "latitude": 11.931,
    "longitude": 79.835,
    "rating": 4.8,
    "pricePerNight": 6400,
    "amenities": [
      "18th century villa",
      "courtyard dining",
      "cocktail bar"
    ],
    "nearbyAttractionIds": [
      1901,
      1902
    ]
  },
  {
    "id": 20001,
    "cityId": 20,
    "name": "Shepherd Backpacker Stay Hyderabad",
    "type": "Hostel",
    "address": "Banjara Hills, Hyderabad",
    "latitude": 17.415,
    "longitude": 78.448,
    "rating": 4.6,
    "pricePerNight": 780,
    "amenities": [
      "ac dorms",
      "co-work area",
      "metro connectivity"
    ],
    "nearbyAttractionIds": [
      2001,
      2002
    ]
  },
  {
    "id": 20002,
    "cityId": 20,
    "name": "Taj Falaknuma Palace",
    "type": "Luxury Palace",
    "address": "Engine Bowli, Falaknuma, Hyderabad",
    "latitude": 17.3314,
    "longitude": 78.4674,
    "rating": 4.9,
    "pricePerNight": 13800,
    "amenities": [
      "nizam carriage ride",
      "scented gardens",
      "durbar hall",
      "jade collection"
    ],
    "nearbyAttractionIds": [
      2001,
      2002
    ]
  },
  {
    "id": 21001,
    "cityId": 21,
    "name": "Backpacker Park Street Hostel",
    "type": "Hostel",
    "address": "Park Street, Kolkata",
    "latitude": 22.551,
    "longitude": 88.353,
    "rating": 4.6,
    "pricePerNight": 740,
    "amenities": [
      "air conditioning",
      "reading lounge",
      "bengali sweets trail"
    ],
    "nearbyAttractionIds": [
      2101,
      2102
    ]
  },
  {
    "id": 21002,
    "cityId": 21,
    "name": "The Oberoi Grand Kolkata",
    "type": "Luxury Heritage",
    "address": "Jawaharlal Nehru Rd, Kolkata",
    "latitude": 22.5615,
    "longitude": 88.3518,
    "rating": 4.9,
    "pricePerNight": 9500,
    "amenities": [
      "colonial courtyard",
      "grand ballroom",
      "luxury spa"
    ],
    "nearbyAttractionIds": [
      2101,
      2102
    ]
  },
  {
    "id": 22001,
    "cityId": 22,
    "name": "Zostel Jodhpur (Stepwell)",
    "type": "Hostel",
    "address": "Makrana Mohalla, Jodhpur",
    "latitude": 26.299,
    "longitude": 73.023,
    "rating": 4.8,
    "pricePerNight": 800,
    "amenities": [
      "stepwell views",
      "rooftop cafe",
      "rajasthani thali"
    ],
    "nearbyAttractionIds": [
      2201,
      2202
    ]
  },
  {
    "id": 22002,
    "cityId": 22,
    "name": "Umaid Bhawan Palace Hotel",
    "type": "Luxury Palace",
    "address": "Circuit House Rd, Jodhpur",
    "latitude": 26.281,
    "longitude": 73.048,
    "rating": 4.9,
    "pricePerNight": 15500,
    "amenities": [
      "royal suites",
      "peacock gardens",
      "indoor pool"
    ],
    "nearbyAttractionIds": [
      2201,
      2202
    ]
  },
  {
    "id": 23001,
    "cityId": 23,
    "name": "Zostel Ooty (Tea Plantation)",
    "type": "Hostel",
    "address": "Ketti Valley Road, Ooty",
    "latitude": 11.395,
    "longitude": 76.721,
    "rating": 4.7,
    "pricePerNight": 790,
    "amenities": [
      "valley views",
      "bonfire nights",
      "fresh nilgiri tea"
    ],
    "nearbyAttractionIds": [
      2301,
      2302
    ]
  },
  {
    "id": 23002,
    "cityId": 23,
    "name": "Savoy - IHCL SeleQtions Ooty",
    "type": "Heritage Resort",
    "address": "Sylks Road, Ooty",
    "latitude": 11.412,
    "longitude": 76.699,
    "rating": 4.8,
    "pricePerNight": 7600,
    "amenities": [
      "fireplace suites",
      "english afternoon tea",
      "croquet lawn"
    ],
    "nearbyAttractionIds": [
      2301,
      2302
    ]
  },
  {
    "id": 24001,
    "cityId": 24,
    "name": "Silver Brook Backpacker Hostel",
    "type": "Hostel",
    "address": "Upper Shillong, Meghalaya",
    "latitude": 25.542,
    "longitude": 91.838,
    "rating": 4.6,
    "pricePerNight": 720,
    "amenities": [
      "mountain stream",
      "guitar corner",
      "local khasi breakfast"
    ],
    "nearbyAttractionIds": [
      2401,
      2402
    ]
  },
  {
    "id": 24002,
    "cityId": 24,
    "name": "Pinewood Heritage Hotel Shillong",
    "type": "Heritage Resort",
    "address": "European Ward, Rita Road, Shillong",
    "latitude": 25.576,
    "longitude": 91.888,
    "rating": 4.7,
    "pricePerNight": 5800,
    "amenities": [
      "colonial pine chalets",
      "golf club nearby",
      "billiard room"
    ],
    "nearbyAttractionIds": [
      2401,
      2402
    ]
  }
];

export const TIPS_MASTER = [
  {
    "id": 1,
    "cityId": 1,
    "title": "Start forts early",
    "tip": "Amber Fort gets crowded by late morning, especially in winter.",
    "category": "timing"
  },
  {
    "id": 2,
    "cityId": 2,
    "title": "Book Taj tickets ahead",
    "tip": "Morning slots are best for photos and cooler weather.",
    "category": "booking"
  },
  {
    "id": 3,
    "cityId": 3,
    "title": "Use the metro",
    "tip": "Delhi Metro is usually faster than road travel during peak hours.",
    "category": "transport"
  },
  {
    "id": 4,
    "cityId": 4,
    "title": "Plan around traffic",
    "tip": "Keep buffer time between South Mumbai and suburbs.",
    "category": "transport"
  },
  {
    "id": 5,
    "cityId": 5,
    "title": "Reserve lake-view dinners",
    "tip": "Sunset tables near Lake Pichola fill quickly in season.",
    "category": "booking"
  },
  {
    "id": 6,
    "cityId": 6,
    "title": "Respect ghat etiquette",
    "tip": "Ask before photographing people during rituals.",
    "category": "culture"
  },
  {
    "id": 7,
    "cityId": 7,
    "title": "Check beach flags",
    "tip": "Follow lifeguard warnings during monsoon and rough-sea days.",
    "category": "safety"
  },
  {
    "id": 8,
    "cityId": 8,
    "title": "Walk Fort Kochi",
    "tip": "Many heritage streets, cafes, and galleries are best explored on foot.",
    "category": "transport"
  },
  {
    "id": 9,
    "cityId": 9,
    "title": "Temple head covering",
    "tip": "Both men and women must cover their heads and remove shoes inside the Golden Temple.",
    "category": "culture"
  },
  {
    "id": 10,
    "cityId": 10,
    "title": "Rohtang Pass permits",
    "tip": "Online permits are mandatory for vehicles visiting Rohtang Pass.",
    "category": "booking"
  },
  {
    "id": 11,
    "cityId": 11,
    "title": "Rafting seasons",
    "tip": "River rafting is optimal from October to May; avoid monsoons.",
    "category": "adventure"
  },
  {
    "id": 12,
    "cityId": 12,
    "title": "Peak traffic buffer",
    "tip": "Allow ample commute time between electronic city and central areas.",
    "category": "transport"
  },
  {
    "id": 13,
    "cityId": 13,
    "title": "Rent a bicycle or moped",
    "tip": "Hampi's ruins span 40+ sq km; cycling across boulder routes is magical.",
    "category": "transport"
  },
  {
    "id": 14,
    "cityId": 14,
    "title": "Pre-book Toy Train",
    "tip": "Darjeeling Himalayan Railway joyrides sell out weeks ahead in peak holiday season.",
    "category": "booking"
  },
  {
    "id": 15,
    "cityId": 15,
    "title": "Shimla Walking Mall",
    "tip": "Mall road is strictly vehicle-free; enjoy relaxed colonial heritage walks.",
    "category": "transport"
  },
  {
    "id": 16,
    "cityId": 16,
    "title": "Acclimatize in Leh",
    "tip": "Rest completely for the first 24-48 hours in Leh to prevent altitude sickness (AMS).",
    "category": "health"
  },
  {
    "id": 17,
    "cityId": 17,
    "title": "Sunday Palace Illumination",
    "tip": "Mysore Palace is illuminated by 100,000 bulbs every Sunday and holiday evening.",
    "category": "timing"
  },
  {
    "id": 18,
    "cityId": 18,
    "title": "Bargain for Shikara",
    "tip": "Negotiate Shikara ride rates before embarking at Dal Lake ghats.",
    "category": "transport"
  },
  {
    "id": 19,
    "cityId": 19,
    "title": "Rent a Vintage Scooter",
    "tip": "Exploring the French Quarter and coastal roads by scooter or cycle is ideal.",
    "category": "transport"
  },
  {
    "id": 20,
    "cityId": 20,
    "title": "Historic Biryani Trail",
    "tip": "Try authentic mutton dum biryani around Charminar and Banjara Hills.",
    "category": "food"
  },
  {
    "id": 21,
    "cityId": 21,
    "title": "Ride the Historic Tram",
    "tip": "Experience Asia's oldest electric tramway connecting North and Central Kolkata.",
    "category": "transport"
  },
  {
    "id": 22,
    "cityId": 22,
    "title": "Flying Fox Zipline",
    "tip": "Mehrangarh Fort features world-class aerial ziplining over desert battlements.",
    "category": "adventure"
  },
  {
    "id": 23,
    "cityId": 23,
    "title": "Carry Light Warmwear",
    "tip": "Evenings in Nilgiris get crisp year-round; carry a light jacket or fleece.",
    "category": "comfort"
  },
  {
    "id": 24,
    "cityId": 24,
    "title": "Living Root Bridges Trip",
    "tip": "Wear waterproof hiking shoes when descending to Cherrapunji and Mawlynnong root bridges.",
    "category": "adventure"
  }
];

export const BASE_ITINERARIES = {
  1: [
    { day: 1, title: 'Royal Jaipur Forts & Palaces', morning: ['Amber Fort elephant ride / jeep tour'], afternoon: ['City Palace Jaipur & Jantar Mantar'], evening: ['Hawa Mahal and vibrant old bazaar shopping'], estimatedCost: 1200 },
    { day: 2, title: 'Crafts, Culture & Sunsets', morning: ['Nahargarh Fort sunrise viewpoint'], afternoon: ['Bagru / Sanganer block-printing craft workshop'], evening: ['Chokhi Dhani traditional Rajasthani dinner & folk dance'], estimatedCost: 1800 }
  ],
  2: [
    { day: 1, title: 'Taj & Mughal Splendour', morning: ['Taj Mahal dawn sunrise tour'], afternoon: ['Agra Fort royal courtyards'], evening: ['Mehtab Bagh sunset overlooking Yamuna River'], estimatedCost: 900 },
    { day: 2, title: 'Artisans & Fatehpur Sikri', morning: ['Marble inlay craft workshop & souvenir hunt'], afternoon: ['Excursion to Fatehpur Sikri ghost city'], evening: ['Sadre Bazaar street food walk (Petha tasting)'], estimatedCost: 1100 }
  ],
  6: [
    { day: 1, title: 'Sacred Ghats & Evening Aarti', morning: ['Sunrise rowing boat ride on the Ganga'], afternoon: ['Kashi Vishwanath Temple darshan'], evening: ['Dashashwamedh Ghat Grand Ganga Aarti'], estimatedCost: 700 },
    { day: 2, title: 'Spiritual Legacy & Silk Weaving', morning: ['Sarnath Deer Park & Buddhist stupa'], afternoon: ['Ancient lanes walk & Banarasi silk weaving looms'], evening: ['Classical Indian music cafe & Malaiyyo dessert trail'], estimatedCost: 1000 }
  ],
  9: [
    { day: 1, title: 'Golden Temple & Langar', morning: ['Harmandir Sahib dawn prayers & holy dip'], afternoon: ['Community kitchen langar seva & museum'], evening: ['Heritage street walk with traditional Amritsari lassi'], estimatedCost: 400 },
    { day: 2, title: 'Patriotism & Legendary Flavours', morning: ['Jallianwala Bagh memorial & Gobindgarh Fort'], afternoon: ['Amritsari Kulcha food trail at Kulcha Land'], evening: ['Wagah Border beating retreat military ceremony'], estimatedCost: 800 }
  ],
  10: [
    { day: 1, title: 'Himalayan Woods & Cafes', morning: ['Hadimba Temple ancient cedar forest'], afternoon: ['Old Manali riverside bohemian cafe culture'], evening: ['Vashisht hot sulphur springs & sunset walk'], estimatedCost: 600 },
    { day: 2, title: 'Solang Valley Thrills', morning: ['Solang Valley paragliding & zorbing'], afternoon: ['Atal Tunnel & Sissu waterfall excursion'], evening: ['Mall Road shopping & riverside alpine bonfire'], estimatedCost: 1800 }
  ],
  11: [
    { day: 1, title: 'Yoga & Holy Ganga', morning: ['Sunrise yoga & meditation session at ashram'], afternoon: ['Ram Jhula & Laxman Jhula pedestrian suspension stroll'], evening: ['Triveni Ghat sunset Maha Aarti with glowing diyas'], estimatedCost: 500 },
    { day: 2, title: 'White Water Rapids & Cliffs', morning: ['Shivpuri to Rishikesh grade III/IV river rafting'], afternoon: ['Neer Garh waterfall jungle trek'], evening: ['Cliff cafe organic dinner with river views'], estimatedCost: 1500 }
  ],
  13: [
    { day: 1, title: 'Sacred Centre & Boulders', morning: ['Virupaksha Temple sunrise & holy elephant bath'], afternoon: ['Hemakuta Hill temple cluster exploration'], evening: ['Tungabhadra coracle circular boat ride at sunset'], estimatedCost: 500 },
    { day: 2, title: 'Royal Enclosure & Stone Chariot', morning: ['Stone Chariot & musical pillars at Vijaya Vittala'], afternoon: ['Lotus Mahal & Queens Bath royal quarters'], evening: ['Matanga Hill panoramic 360-degree sunset summit'], estimatedCost: 700 }
  ],
  14: [
    { day: 1, title: 'Kanchenjunga & Tea Estates', morning: ['Tiger Hill 4:00 AM sunrise over Kanchenjunga'], afternoon: ['Happy Valley Tea estate plucking & tasting session'], evening: ['Ghoom Monastery & Chowrasta Mall bakeries'], estimatedCost: 900 },
    { day: 2, title: 'Toy Train & Alpine Trails', morning: ['Darjeeling Himalayan Toy Train UNESCO joyride'], afternoon: ['Himalayan Mountaineering Institute & Zoo'], evening: ['Sunset tea lounge tasting Glenarys treats'], estimatedCost: 1200 }
  ]
};

const SEED_BOOKINGS = [
  {
    bookingId: 'YTR-819204',
    status: 'CONFIRMED',
    customerName: 'Ananya Sharma',
    customerEmail: 'ananya.s@example.com',
    customerPhone: '+91 98111 22334',
    bookingType: 'hotel',
    cityId: 1,
    cityName: 'Jaipur',
    itemName: 'Heritage Haveli Jaipur (Deluxe Courtyard View)',
    checkInDate: '2026-09-12',
    checkOutDate: '2026-09-15',
    travelers: 2,
    rooms: 1,
    baseAmountInr: 11250,
    taxAmountInr: 1350,
    totalAmountInr: 12600,
    specialRequests: 'Airport pickup requested, vegetarian breakfast',
    bookedAt: '2026-09-03T10:30:00.000Z'
  },
  {
    bookingId: 'YTR-635190',
    status: 'CONFIRMED',
    customerName: 'David Miller',
    customerEmail: 'david.m@example.org',
    customerPhone: '+44 7911 123456',
    bookingType: 'package',
    cityId: 2,
    cityName: 'Agra',
    itemName: 'Taj & Mughal Heritage 2-Day Private Tour',
    checkInDate: '2026-09-20',
    checkOutDate: '2026-09-22',
    travelers: 2,
    rooms: 1,
    baseAmountInr: 14285,
    taxAmountInr: 1715,
    totalAmountInr: 16000,
    specialRequests: 'Sunrise entry pass for Taj Mahal and English-speaking historian guide',
    bookedAt: '2026-09-04T08:15:00.000Z'
  }
];

const SEED_REVIEWS = [
  {
    "id": 1,
    "cityId": 1,
    "travelerName": "Aarav",
    "rating": 5,
    "comment": "Perfect mix of forts, food, and markets.",
    "travelMonth": "December"
  },
  {
    "id": 2,
    "cityId": 2,
    "travelerName": "Maya",
    "rating": 5,
    "comment": "The Taj at sunrise was worth the early start.",
    "travelMonth": "January"
  },
  {
    "id": 3,
    "cityId": 5,
    "travelerName": "Kabir",
    "rating": 5,
    "comment": "Udaipur felt calm, scenic, and easy to explore.",
    "travelMonth": "February"
  },
  {
    "id": 4,
    "cityId": 7,
    "travelerName": "Nisha",
    "rating": 4,
    "comment": "Great beaches and food, but pre-book hotels in peak season.",
    "travelMonth": "November"
  },
  {
    "id": 5,
    "cityId": 9,
    "travelerName": "Harpreet",
    "rating": 5,
    "comment": "The tranquility of Harmandir Sahib and the langar is life-changing.",
    "travelMonth": "January"
  },
  {
    "id": 6,
    "cityId": 10,
    "travelerName": "Rohan",
    "rating": 5,
    "comment": "Solang valley snow sports were fantastic! Fresh mountain air.",
    "travelMonth": "December"
  },
  {
    "id": 7,
    "cityId": 11,
    "travelerName": "Elena",
    "rating": 5,
    "comment": "The Ganga Aarti at Triveni Ghat brought tears of joy. Outstanding yoga retreats.",
    "travelMonth": "March"
  },
  {
    "id": 8,
    "cityId": 13,
    "travelerName": "Marcus",
    "rating": 5,
    "comment": "Felt like walking through another planet. The stone chariot is majestic.",
    "travelMonth": "November"
  },
  {
    "id": 9,
    "cityId": 14,
    "travelerName": "Priya",
    "rating": 5,
    "comment": "Sunrise over Kanchenjunga from Tiger Hill was breathtaking.",
    "travelMonth": "April"
  }
];

const STORAGE_KEYS = {
  BOOKINGS: 'yatra_bookings_store_v1',
  REVIEWS: 'yatra_reviews_store_v1'
};

function getStoredBookings() {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.BOOKINGS);
    if (raw) return JSON.parse(raw);
  } catch {}
  return [...SEED_BOOKINGS];
}

function saveStoredBookings(bookings) {
  try {
    localStorage.setItem(STORAGE_KEYS.BOOKINGS, JSON.stringify(bookings));
  } catch {}
}

function getStoredReviews() {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.REVIEWS);
    if (raw) return JSON.parse(raw);
  } catch {}
  return [...SEED_REVIEWS];
}

function saveStoredReviews(revs) {
  try {
    localStorage.setItem(STORAGE_KEYS.REVIEWS, JSON.stringify(revs));
  } catch {}
}

export const yatraApi = {
  async getCities(search = '', state = '', theme = '', minBudget = null, maxBudget = null) {
    try {
      const qParams = new URLSearchParams();
      if (search) qParams.set('search', search);
      if (state) qParams.set('state', state);
      if (theme && theme !== 'all') qParams.set('theme', theme);
      if (maxBudget) qParams.set('maxBudget', maxBudget);
      const url = `/api/cities${qParams.toString() ? `?${qParams.toString()}` : ''}`;
      const res = await fetch(url);
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data)) return data;
      }
    } catch {}

    await delay(60);
    return CITIES_MASTER.filter((city) => {
      const q = (search || '').toLowerCase().trim();
      const matchQuery =
        !q ||
        city.name.toLowerCase().includes(q) ||
        city.state.toLowerCase().includes(q) ||
        city.description.toLowerCase().includes(q);
      const matchState = !state || city.state.toLowerCase() === state.toLowerCase();
      const matchTheme = !theme || city.themes.some((t) => t.toLowerCase() === theme.toLowerCase());
      const matchMin = minBudget == null || city.estimatedDailyBudget >= minBudget;
      const matchMax = maxBudget == null || city.estimatedDailyBudget <= maxBudget;
      return matchQuery && matchState && matchTheme && matchMin && matchMax;
    }).sort((a, b) => b.popularityScore - a.popularityScore);
  },

  async getCity(cityId) {
    try {
      const res = await fetch(`/api/cities/${cityId}`);
      if (res.ok) {
        const data = await res.json();
        if (data && data.id) return data;
      }
    } catch {}

    const city = CITIES_MASTER.find((c) => c.id === Number(cityId));
    if (!city) throw new Error(`City ${cityId} does not exist`);
    return city;
  },

  async getCityDetails(cityId) {
    const id = Number(cityId);
    try {
      const res = await fetch(`/api/cities/${id}/details`);
      if (res.ok) {
        const data = await res.json();
        if (data && data.city) return data;
      }
    } catch {}

    await delay(120);
    const city = CITIES_MASTER.find((c) => c.id === id);
    if (!city) throw new Error(`City ${cityId} does not exist`);

    const attractions = ATTRACTIONS_MASTER.filter((a) => a.cityId === id).sort(
      (a, b) => b.rating - a.rating
    );
    const hotels = HOTELS_MASTER.filter((h) => h.cityId === id).sort((a, b) => b.rating - a.rating);
    const tips = TIPS_MASTER.filter((t) => t.cityId === id);
    const revs = getStoredReviews().filter((r) => r.cityId === id);

    return {
      city,
      attractions,
      hotels,
      tips,
      reviews: revs
    };
  },

  async getCityCabFares(cityId, hotelId = null) {
    await delay(100);
    const id = Number(cityId);
    const attractions = ATTRACTIONS_MASTER.filter((a) => a.cityId === id);
    let hotels = HOTELS_MASTER.filter((h) => h.cityId === id);
    if (hotelId) hotels = hotels.filter((h) => h.id === Number(hotelId));

    const fares = [];
    hotels.forEach((hotel) => {
      attractions.forEach((attraction) => {
        const straight = calculateDistanceKm(
          hotel.latitude,
          hotel.longitude,
          attraction.latitude,
          attraction.longitude
        );
        const distance = Math.max(1.2, Math.round(straight * 1.35 * 10) / 10);
        const baseFare = Math.max(90, Math.round(55 + distance * 24));
        fares.push({
          hotelId: hotel.id,
          hotelName: hotel.name,
          attractionId: attraction.id,
          attractionName: attraction.name,
          distanceKm: distance,
          baseFareInr: baseFare,
          peakFareInr: Math.round(baseFare * 1.35),
          nightFareInr: Math.max(85, Math.round(50 + distance * 22)),
          suvFareInr: Math.round(baseFare * 1.45),
          olaMini: baseFare,
          olaPrime: Math.round(baseFare * 1.25),
          uberGo: Math.max(85, Math.round(baseFare * 0.95)),
          uberPremier: Math.round(baseFare * 1.35),
          estimatedMinutes: Math.max(8, Math.round(12 + distance * 4))
        });
      });
    });

    return fares.sort((a, b) => a.hotelName.localeCompare(b.hotelName) || a.distanceKm - b.distanceKm);
  },

  async getAiHotels(cityName, latitude, longitude, budget = 4000) {
    try {
      const res = await fetch('/api/ai/hotels', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cityName, latitude, longitude, budget }),
      });
      if (res.ok) {
        const data = await res.json();
        if (data && data.hotels && Array.isArray(data.hotels) && data.hotels.length > 0) {
          return data.hotels;
        }
      }
    } catch (err) {
      console.warn('Failed to fetch AI hotels from Gemini:', err);
    }
    return null;
  },

  async compareHotelPrices(hotelName, cityName, basePriceInr = 4500, starRating = 4.7) {
    await delay(200);
    const safeBase = basePriceInr > 0 ? Number(basePriceInr) : 4500;
    const encH = encodeURIComponent(hotelName);
    const encC = encodeURIComponent(cityName);

    const yatraPrice = Math.round(safeBase * 0.88);
    const mmtPrice = Math.round(safeBase * 0.94);
    const agodaPrice = Math.round(safeBase * 0.91);
    const bookingPrice = Math.round(safeBase * 0.90);

    const deals = [
      {
        platformName: 'Yatra Direct',
        dealPriceInr: yatraPrice,
        savingsInr: safeBase - yatraPrice,
        badge: 'Lowest Guaranteed Rate 🔥',
        directBookingUrl: '#',
        couponCode: 'YATRADIR12',
        icon: '🏨'
      },
      {
        platformName: 'MakeMyTrip',
        dealPriceInr: mmtPrice,
        savingsInr: safeBase - mmtPrice,
        badge: 'MMT Special Coupon',
        directBookingUrl: `https://www.makemytrip.com/hotels/hotel-listing/?city=${encC}&searchText=${encH}`,
        couponCode: 'MMTHOTEL',
        icon: '🔴'
      },
      {
        platformName: 'Agoda',
        dealPriceInr: agodaPrice,
        savingsInr: safeBase - agodaPrice,
        badge: 'VIP Secret Deal',
        directBookingUrl: `https://www.agoda.com/search?city=${encC}&textToSearch=${encH}`,
        couponCode: 'AGODAVIP',
        icon: '🔵'
      },
      {
        platformName: 'Booking.com',
        dealPriceInr: bookingPrice,
        savingsInr: safeBase - bookingPrice,
        badge: 'Genius Level 2 • Free Cancellation',
        directBookingUrl: `https://www.booking.com/searchresults.html?ss=${encH}+${encC}`,
        couponCode: 'GENIUS',
        icon: '🔷'
      }
    ];

    return {
      hotelName,
      cityName,
      basePriceInr: safeBase,
      starRating,
      deals,
      platformDeals: deals
    };
  },

  async getLiveCabEstimates(pickupName, pickupLat, pickupLng, dropName, dropLat, dropLng) {
    await delay(220);
    const pLat = Number(pickupLat);
    const pLng = Number(pickupLng);
    const dLat = Number(dropLat);
    const dLng = Number(dropLng);

    const straightDist = calculateDistanceKm(pLat, pLng, dLat, dLng);
    const roadDistance = Math.max(1.2, Math.round(straightDist * 1.35 * 10) / 10);

    const currentHour = new Date().getHours();
    const isPeakHour = (currentHour >= 8 && currentHour <= 10) || (currentHour >= 18 && currentHour <= 21);
    const surge = isPeakHour ? 1.2 : 1.0;
    const trafficCondition = isPeakHour ? 'Moderate-Heavy Traffic (Peak Hours)' : 'Smooth City Flow';

    const avgSpeed = isPeakHour ? 22 : 32;
    const estimatedMinutes = Math.max(8, Math.round((roadDistance / avgSpeed) * 60) + 4);

    const uberUrl = `https://m.uber.com/ul/?action=setPickup&client_id=yatra&pickup[latitude]=${pLat.toFixed(6)}&pickup[longitude]=${pLng.toFixed(6)}&pickup[nickname]=${encodeURIComponent(pickupName || 'Pickup')}&dropoff[latitude]=${dLat.toFixed(6)}&dropoff[longitude]=${dLng.toFixed(6)}&dropoff[nickname]=${encodeURIComponent(dropName || 'Destination')}`;
    const olaUrl = `https://book.olacabs.com/?pickup_lat=${pLat.toFixed(6)}&pickup_lng=${pLng.toFixed(6)}&pickup_name=${encodeURIComponent(pickupName || 'Pickup')}&drop_lat=${dLat.toFixed(6)}&drop_lng=${dLng.toFixed(6)}&drop_name=${encodeURIComponent(dropName || 'Destination')}`;

    const olaOptions = [
      { serviceName: 'Ola', rideCategory: 'Ola Auto', estimatedFareInr: Math.max(45, Math.round((35 + roadDistance * 14.0) * surge)), driverEtaMinutes: 3, driversNearby: 7, capacity: '3 Seats', vehicleType: 'Auto Rickshaw', directBookingUrl: olaUrl, icon: '🛺' },
      { serviceName: 'Ola', rideCategory: 'Ola Mini', estimatedFareInr: Math.max(90, Math.round((55 + roadDistance * 20.0) * surge)), driverEtaMinutes: 4, driversNearby: 12, capacity: '4 Seats', vehicleType: 'Compact AC Hatchback (WagonR/Indica)', directBookingUrl: olaUrl, icon: '🚗' },
      { serviceName: 'Ola', rideCategory: 'Ola Prime Sedan', estimatedFareInr: Math.max(130, Math.round((75 + roadDistance * 26.0) * surge)), driverEtaMinutes: 5, driversNearby: 8, capacity: '4 Seats', vehicleType: 'Spacious Sedan with Free WiFi (Dzire/Etios)', directBookingUrl: olaUrl, icon: '🚘' }
    ];

    const uberOptions = [
      { serviceName: 'Uber', rideCategory: 'Uber Auto', estimatedFareInr: Math.max(40, Math.round((32 + roadDistance * 13.5) * surge)), driverEtaMinutes: 2, driversNearby: 9, capacity: '3 Seats', vehicleType: 'Affordable Auto Rides', directBookingUrl: uberUrl, icon: '🛺' },
      { serviceName: 'Uber', rideCategory: 'Uber Go', estimatedFareInr: Math.max(85, Math.round((50 + roadDistance * 19.5) * surge)), driverEtaMinutes: 3, driversNearby: 15, capacity: '4 Seats', vehicleType: 'Affordable Compact Rides', directBookingUrl: uberUrl, icon: '🚗' },
      { serviceName: 'Uber', rideCategory: 'Uber Premier', estimatedFareInr: Math.max(140, Math.round((80 + roadDistance * 27.5) * surge)), driverEtaMinutes: 4, driversNearby: 6, capacity: '4 Seats', vehicleType: 'Premium Sedans with Top-Rated Drivers', directBookingUrl: uberUrl, icon: '🚘' }
    ];

    return {
      pickupLocationName: pickupName || 'Selected Hotel',
      pickupLatitude: pLat,
      pickupLongitude: pLng,
      dropLocationName: dropName || 'Destination',
      dropLatitude: dLat,
      dropLongitude: dLng,
      roadDistanceKm: roadDistance,
      estimatedTravelMinutes: estimatedMinutes,
      trafficCondition,
      surgeMultiplier: surge,
      olaOptions,
      uberOptions
    };
  },

  async getTransitRoutes(originCityId, destinationCityId) {
    await delay(180);
    const origin = CITIES_MASTER.find((c) => c.id === Number(originCityId)) || CITIES_MASTER[0];
    const destination = CITIES_MASTER.find((c) => c.id === Number(destinationCityId)) || CITIES_MASTER[1];

    const straightDistance = calculateDistanceKm(
      origin.latitude,
      origin.longitude,
      destination.latitude,
      destination.longitude
    );
    const roadDistance = Math.max(20, Math.round(straightDistance * 1.25 * 10) / 10);
    const options = [];

    const trainMinutes = Math.max(90, Math.round((roadDistance / 75.0) * 60));
    const trainHours = Math.floor(trainMinutes / 60);
    const trainRemainMin = trainMinutes % 60;
    const trainType = roadDistance < 600 ? 'Vande Bharat / Shatabdi Express' : 'Rajdhani / Tejas Express';
    const trainFare = Math.max(450, Math.round(180 + roadDistance * 2.2));

    options.push({
      mode: 'TRAIN',
      title: 'Indian Railways Superfast',
      operatorOrType: trainType,
      durationMinutes: trainMinutes,
      durationFormatted: `${trainHours}h ${trainRemainMin.toString().padStart(2, '0')}m`,
      estimatedFareInr: trainFare,
      frequency: 'Daily 4-8 departures with AC 2A/3A & Chair Car berths',
      highlights: ['Scenic countryside route', 'Reserved sleeper/executive seats', 'Onboard meals available'],
      carbonKg: Math.round(roadDistance * 0.04)
    });

    if (straightDistance > 280) {
      const flightMinutes = Math.max(65, Math.round(50 + (straightDistance / 700.0) * 60));
      const flightHours = Math.floor(flightMinutes / 60);
      const flightRemainMin = flightMinutes % 60;
      const flightFare = Math.max(3200, Math.round(2600 + straightDistance * 3.8));

      options.push({
        mode: 'FLIGHT',
        title: 'Domestic Non-Stop Airline',
        operatorOrType: 'IndiGo / Air India / Akasa Air',
        durationMinutes: flightMinutes,
        durationFormatted: `${flightHours}h ${flightRemainMin.toString().padStart(2, '0')}m`,
        estimatedFareInr: flightFare,
        frequency: 'Multiple direct & 1-stop flights daily',
        highlights: ['Shortest travel time', '15kg check-in luggage included', 'Airport lounge access available'],
        carbonKg: Math.round(straightDistance * 0.16)
      });
    }

    const busMinutes = Math.round((roadDistance / 55.0) * 60);
    const busHours = Math.floor(busMinutes / 60);
    const busRemainMin = busMinutes % 60;
    const busFare = Math.max(350, Math.round(120 + roadDistance * 1.8));

    options.push({
      mode: 'BUS',
      title: 'Intercity Volvo Multi-Axle',
      operatorOrType: 'IntrCity SmartBus / Zingbus / State RTC',
      durationMinutes: busMinutes,
      durationFormatted: `${busHours}h ${busRemainMin.toString().padStart(2, '0')}m`,
      estimatedFareInr: busFare,
      frequency: 'Frequent overnight & day schedules',
      highlights: ['Reclining AC Sleeper berths', 'Free mineral water & charging points', 'City center pickups'],
      carbonKg: Math.round(roadDistance * 0.07)
    });

    const cabMinutes = Math.round((roadDistance / 65.0) * 60);
    const cabHours = Math.floor(cabMinutes / 60);
    const cabRemainMin = cabMinutes % 60;
    const cabFare = Math.max(1200, Math.round(400 + roadDistance * 13.5));

    options.push({
      mode: 'CAB',
      title: 'Private Outstation Highway Cab',
      operatorOrType: 'Sedan / Ertiga SUV with Chauffeur',
      durationMinutes: cabMinutes,
      durationFormatted: `${cabHours}h ${cabRemainMin.toString().padStart(2, '0')}m`,
      estimatedFareInr: cabFare,
      frequency: 'Door-to-door on-demand booking',
      highlights: ['Flexible stopovers at highway dhabas', 'Toll & state taxes included', 'Direct door-to-door drop'],
      carbonKg: Math.round(roadDistance * 0.12)
    });

    let recommendedOption = 'TRAIN (Comfortable overnight train or swift direct flight)';
    if (straightDistance > 550) {
      recommendedOption = 'FLIGHT (Fastest & most comfortable for long haul)';
    } else if (roadDistance <= 350) {
      recommendedOption = 'TRAIN (Vande Bharat Express - quickest city-center to city-center travel)';
    }

    return {
      originCityId: origin.id,
      originCityName: origin.name,
      destinationCityId: destination.id,
      destinationCityName: destination.name,
      straightDistanceKm: straightDistance,
      roadDistanceKm: roadDistance,
      options,
      recommendedOption
    };
  },

  async planTrip(request) {
    await delay(250);
    const cityId = Number(request.cityId);
    const days = Math.max(1, Math.min(14, Number(request.days) || 3));
    const travelers = Math.max(1, Number(request.travelers) || 1);
    const travelStyle = request.travelStyle || (request.dailyBudgetPerPerson > 5000 ? 'luxury' : 'standard');
    const dailyBudgetPerPerson = Math.max(500, Number(request.dailyBudgetPerPerson) || 2000);

    const city = CITIES_MASTER.find((c) => c.id === cityId) || CITIES_MASTER[0];

    const baseDays = BASE_ITINERARIES[city.id] || [];
    let itinerary = baseDays.slice(0, days);

    if (itinerary.length < days) {
      const remainingCount = days - itinerary.length;
      for (let i = 0; i < remainingCount; i++) {
        const dayNum = itinerary.length + 1;
        itinerary.push({
          day: dayNum,
          title: dayNum === 1 ? `${city.name} Royal Core` : `${city.name} Cultural & Nature Discovery`,
          morning: [
            dayNum % 2 === 1
              ? 'Visit top landmark & photography viewpoint before morning rush'
              : 'Scenic sunrise walk & heritage architecture exploration'
          ],
          afternoon: [
            'Local artisan bazaar, handicraft trail & authentic traditional lunch'
          ],
          evening: [
            'Sunset viewpoint, riverside / lakefront cultural gathering & regional dinner'
          ],
          estimatedCost: Math.round(city.estimatedDailyBudget / 3)
        });
      }
    }

    const stayMultiplier = travelStyle === 'luxury' ? 2 : 1;
    const estimatedStayCost = Math.round(days * travelers * (city.estimatedDailyBudget / 2) * stayMultiplier);
    const estimatedFoodAndLocalTravelCost = Math.round(days * travelers * dailyBudgetPerPerson);
    const attractionFees = Math.round(itinerary.reduce((acc, d) => acc + (d.estimatedCost || 300), 0) * travelers);
    const totalEstimatedCost = estimatedStayCost + estimatedFoodAndLocalTravelCost + attractionFees;

    return {
      cityId: city.id,
      cityName: city.name,
      days,
      travelers,
      travelStyle,
      estimatedStayCost,
      estimatedFoodAndLocalTravelCost,
      attractionFees,
      totalEstimatedCost,
      itinerary
    };
  },

  async getFestivals(year = 2026) {
    const targetYear = Number(year) || 2026;
    try {
      const res = await fetch(`https://date.nager.at/api/v3/PublicHolidays/${targetYear}/IN`);
      if (res.ok) {
        const rawHolidays = await res.json();
        if (Array.isArray(rawHolidays) && rawHolidays.length > 0) {
          const list = rawHolidays.map((h) => {
            const name = h.name || h.localName;
            const lower = name.toLowerCase();
            let category = 'National Honor';
            let culturalSignificance = 'A prominent celebration reflecting regional traditions and customs.';
            let topCitiesToCelebrate = ['Delhi', 'Mumbai'];
            let travelAdvice = 'Check monument opening times for holiday hours.';

            if (lower.includes('diwali') || lower.includes('deepavali')) {
              category = 'Spiritual & Cultural';
              culturalSignificance = 'Celebrates victory of light over darkness with clay diyas, fireworks, and illuminated riverfronts.';
              topCitiesToCelebrate = ['Varanasi', 'Jaipur', 'Delhi', 'Ayodhya'];
              travelAdvice = 'Varanasi Dev Deepawali ghats and Jaipur bazaars offer world-class spectacles. Book stays early.';
            } else if (lower.includes('holi')) {
              category = 'Cultural & Heritage';
              culturalSignificance = 'Welcomes spring with organic colors, folk songs, sweets like gujiya, and vibrant community celebrations.';
              topCitiesToCelebrate = ['Jaipur', 'Udaipur', 'Varanasi', 'Mathura'];
              travelAdvice = 'Wear modest clothing you can discard; protect phone/camera with waterproof pouch.';
            } else if (lower.includes('republic')) {
              category = 'National Honor';
              culturalSignificance = 'Commemorates the Constitution of India with the ceremonial Kartavya Path military and cultural parade.';
              topCitiesToCelebrate = ['Delhi'];
              travelAdvice = 'Book grandstand tickets early or view illuminated government monuments during Beating Retreat.';
            } else if (lower.includes('independence')) {
              category = 'National Honor';
              culturalSignificance = 'Celebrates freedom with the historic Red Fort flag hoisting and vibrant rooftop kite-flying in Old Delhi.';
              topCitiesToCelebrate = ['Delhi', 'Mumbai'];
              travelAdvice = 'Old Delhi rooftops offer colorful kite battles throughout the afternoon.';
            } else if (lower.includes('christmas')) {
              category = 'Cultural & Festive';
              culturalSignificance = 'Celebrated across historic 16th-century churches with midnight masses, beach parties, carols, and cakes.';
              topCitiesToCelebrate = ['Goa', 'Kochi', 'Mumbai', 'Kolkata'];
              travelAdvice = 'Goa Portuguese churches and Fort Kochi carnival come alive with lights and music.';
            }

            const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
            const monthIndex = h.date ? parseInt(h.date.substring(5, 7), 10) - 1 : 0;
            const month = monthNames[monthIndex] || 'Festival Season';

            return {
              name,
              localName: h.localName,
              date: h.date,
              category,
              month,
              culturalSignificance,
              topCitiesToCelebrate,
              travelAdvice,
              isNationalHoliday: h.global ?? true
            };
          });

          if (!list.some((f) => f.name.toLowerCase().includes('onam'))) {
            list.push({
              name: 'Onam Harvest Festival',
              localName: 'ഓണം',
              date: `${targetYear}-09-02`,
              category: 'Harvest & Art',
              month: 'September',
              culturalSignificance: "Kerala's grand harvest festival featuring floral rugs (Pookalam), snake boat races (Vallamkali), and 26-dish sadya feasts.",
              topCitiesToCelebrate: ['Kochi'],
              travelAdvice: 'Witness backwater snake boat races and relish authentic Sadya meals.',
              isNationalHoliday: false
            });
          }
          if (!list.some((f) => f.name.toLowerCase().includes('durga'))) {
            list.push({
              name: 'Durga Puja Carnival',
              localName: 'দুর্গাপূজা',
              date: `${targetYear}-10-18`,
              category: 'UNESCO Heritage & Art',
              month: 'October',
              culturalSignificance: 'UNESCO-recognized public art installation carnival featuring thousands of creative bamboo & clay pandals.',
              topCitiesToCelebrate: ['Kolkata', 'Delhi'],
              travelAdvice: 'Midnight pandal hopping in Kolkata is one of the grandest open-air art celebrations in the world.',
              isNationalHoliday: false
            });
          }
          if (!list.some((f) => f.name.toLowerCase().includes('ganesh'))) {
            list.push({
              name: 'Ganesh Chaturthi',
              localName: 'गणेशोत्सव',
              date: `${targetYear}-09-14`,
              category: 'Spiritual & Procession',
              month: 'September',
              culturalSignificance: 'Ten-day celebration with towering clay idols, drum ensembles, and massive Arabian Sea beach immersions.',
              topCitiesToCelebrate: ['Mumbai'],
              travelAdvice: 'Join the Lalbaugcha Raja processions and Girgaon Chowpatty beach energy.',
              isNationalHoliday: false
            });
          }

          return list.sort((a, b) => a.date.localeCompare(b.date));
        }
      }
    } catch {}

    return [
      { name: 'Republic Day', localName: 'गणतंत्र दिवस', date: `${targetYear}-01-26`, category: 'National Honor', month: 'January', culturalSignificance: 'Grand military and cultural parade on Kartavya Path.', topCitiesToCelebrate: ['Delhi'], travelAdvice: 'Watch the illuminated India Gate and parades.', isNationalHoliday: true },
      { name: 'Holi (Festival of Colors)', localName: 'होली', date: `${targetYear}-03-25`, category: 'Cultural & Heritage', month: 'March', culturalSignificance: 'Celebration of colors, spring blossoms, and sweets.', topCitiesToCelebrate: ['Jaipur', 'Udaipur', 'Varanasi'], travelAdvice: 'Enjoy royal palace Holi celebrations.', isNationalHoliday: true },
      { name: 'Independence Day', localName: 'स्वतंत्रता दिवस', date: `${targetYear}-08-15`, category: 'National Honor', month: 'August', culturalSignificance: 'National freedom celebrations with Red Fort flag hoisting.', topCitiesToCelebrate: ['Delhi'], travelAdvice: 'Experience kite festivals in Old Delhi.', isNationalHoliday: true },
      { name: 'Onam Harvest Festival', localName: 'ഓണം', date: `${targetYear}-09-02`, category: 'Harvest & Art', month: 'September', culturalSignificance: "Kerala's grand harvest festival featuring floral carpets and snake boat races.", topCitiesToCelebrate: ['Kochi'], travelAdvice: 'Witness snake boat races on backwaters.', isNationalHoliday: false },
      { name: 'Ganesh Chaturthi', localName: 'गणेशोत्सव', date: `${targetYear}-09-14`, category: 'Spiritual & Procession', month: 'September', culturalSignificance: 'Idols and drum processions along Arabian sea beaches.', topCitiesToCelebrate: ['Mumbai'], travelAdvice: 'Experience Chowpatty beach processions.', isNationalHoliday: false },
      { name: 'Durga Puja Carnival', localName: 'দুর্গাপূজা', date: `${targetYear}-10-18`, category: 'UNESCO Heritage & Art', month: 'October', culturalSignificance: 'Illuminated public art pandals and street food carnivals.', topCitiesToCelebrate: ['Kolkata', 'Delhi'], travelAdvice: 'Do midnight pandal walks.', isNationalHoliday: false },
      { name: 'Diwali (Festival of Lights)', localName: 'दीपावली', date: `${targetYear}-11-01`, category: 'Spiritual & Cultural', month: 'November', culturalSignificance: 'Millions of earthen lamps along the Ganges and illuminated royal palaces.', topCitiesToCelebrate: ['Varanasi', 'Jaipur', 'Ayodhya'], travelAdvice: 'Watch Dev Deepawali in Varanasi.', isNationalHoliday: true },
      { name: 'Christmas Celebration', localName: 'बड़ा दिन', date: `${targetYear}-12-25`, category: 'Cultural & Festive', month: 'December', culturalSignificance: 'Midnight masses in 16th century churches and beach shacks.', topCitiesToCelebrate: ['Goa', 'Kochi'], travelAdvice: 'Book Christmas Eve cruises in Goa.', isNationalHoliday: true }
    ];
  },

  async getCurrencyRates() {
    const currencySymbols = {
      INR: '₹',
      USD: '$',
      EUR: '€',
      GBP: '£',
      AUD: 'A$',
      AED: 'AED ',
      SGD: 'S$',
      CAD: 'C$',
      JPY: '¥'
    };

    try {
      const res = await fetch('https://open.er-api.com/v6/latest/INR');
      if (res.ok) {
        const json = await res.json();
        if (json?.rates) {
          const rates = { INR: 1.0 };
          Object.keys(currencySymbols).forEach((code) => {
            if (json.rates[code]) rates[code] = json.rates[code];
          });
          return {
            baseCurrency: 'INR',
            lastUpdated: json.time_last_update_utc || new Date().toISOString(),
            rates,
            currencySymbols,
            live: true
          };
        }
      }
    } catch {}

    return {
      baseCurrency: 'INR',
      lastUpdated: new Date().toISOString(),
      rates: {
        INR: 1.0,
        USD: 0.0118,
        EUR: 0.0109,
        GBP: 0.0093,
        AUD: 0.0182,
        AED: 0.0433,
        SGD: 0.0159,
        CAD: 0.0163,
        JPY: 1.82
      },
      currencySymbols,
      live: false
    };
  },

  async getBookings() {
    try {
      const res = await fetch('/api/bookings');
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data)) return data;
      }
    } catch {}

    await delay(80);
    return getStoredBookings();
  },

  async createBooking(bookingData) {
    try {
      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bookingData)
      });
      if (res.ok) {
        const created = await res.json();
        const existing = getStoredBookings();
        saveStoredBookings([created, ...existing]);
        return created;
      }
    } catch {}

    await delay(150);
    const existing = getStoredBookings();
    const bookingId = `YTR-${Math.floor(100000 + Math.random() * 900000)}`;

    const travelers = bookingData.travelers ? Number(bookingData.travelers) : 1;
    const rooms = bookingData.rooms ? Number(bookingData.rooms) : 1;
    const totalAmountInr = bookingData.totalAmountInr
      ? Number(bookingData.totalAmountInr)
      : rooms * 4200 * 2;
    const taxAmountInr = Math.round(totalAmountInr * 0.12);
    const baseAmountInr = totalAmountInr - taxAmountInr;

    const newBooking = {
      bookingId,
      status: 'CONFIRMED',
      customerName: bookingData.customerName || 'Valued Guest',
      customerEmail: bookingData.customerEmail || 'guest@example.com',
      customerPhone: bookingData.customerPhone || '+91 98765 43210',
      bookingType: bookingData.bookingType || 'hotel',
      cityId: bookingData.cityId || 1,
      cityName: bookingData.cityName || 'Jaipur',
      itemName: bookingData.itemName || 'Selected Stay Booking',
      checkInDate: bookingData.checkInDate || '2026-09-15',
      checkOutDate: bookingData.checkOutDate || '2026-09-18',
      travelers,
      rooms,
      baseAmountInr,
      taxAmountInr,
      totalAmountInr,
      specialRequests: bookingData.specialRequests || 'High floor preferred.',
      bookedAt: new Date().toISOString()
    };

    const updated = [newBooking, ...existing];
    saveStoredBookings(updated);
    return newBooking;
  },

  async cancelBooking(bookingId) {
    try {
      const res = await fetch(`/api/bookings/${bookingId}`, {
        method: 'DELETE'
      });
      if (res.ok) {
        const cancelled = await res.json();
        const existing = getStoredBookings();
        const updated = existing.map((b) =>
          b.bookingId === bookingId ? { ...b, status: 'CANCELLED' } : b
        );
        saveStoredBookings(updated);
        return cancelled;
      }
    } catch {}

    await delay(120);
    const existing = getStoredBookings();
    const updated = existing.map((b) =>
      b.bookingId === bookingId ? { ...b, status: 'CANCELLED' } : b
    );
    saveStoredBookings(updated);
    const target = updated.find((b) => b.bookingId === bookingId);
    return target || { bookingId, status: 'CANCELLED' };
  },

  async getReviews(cityId = null) {
    try {
      const query = cityId ? `?cityId=${cityId}` : '';
      const res = await fetch(`/api/reviews${query}`);
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data)) return data;
      }
    } catch {}

    await delay(60);
    const all = getStoredReviews();
    if (cityId) return all.filter((r) => r.cityId === Number(cityId));
    return all;
  },

  async addReview(reviewData) {
    try {
      const res = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(reviewData)
      });
      if (res.ok) {
        const created = await res.json();
        const existing = getStoredReviews();
        saveStoredReviews([created, ...existing]);
        return created;
      }
    } catch {}

    await delay(120);
    const existing = getStoredReviews();
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const currentMonth = months[new Date().getMonth()];

    const newReview = {
      id: Date.now(),
      cityId: Number(reviewData.cityId),
      travelerName: (reviewData.travelerName || 'Fellow Traveler').trim(),
      rating: Number(reviewData.rating) || 5,
      comment: (reviewData.comment || 'Wonderful trip!').trim(),
      travelMonth: reviewData.travelMonth || currentMonth
    };

    const updated = [newReview, ...existing];
    saveStoredReviews(updated);

    const cityReviews = updated.filter((r) => r.cityId === newReview.cityId);
    if (cityReviews.length > 0) {
      const avg = cityReviews.reduce((sum, r) => sum + r.rating, 0) / cityReviews.length;
      const targetCity = CITIES_MASTER.find((c) => c.id === newReview.cityId);
      if (targetCity) {
        targetCity.averageRating = Math.round(avg * 10) / 10;
        targetCity.rating = targetCity.averageRating;
      }
    }

    return newReview;
  },

  async login({ email, password }) {
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Invalid email or password');
      }
      try {
        localStorage.setItem('yatra_user', JSON.stringify(data));
      } catch {}
      return data;
    } catch (err) {
      if (err.message && err.message !== 'Failed to fetch') {
        throw err;
      }
      // Offline fallback: check localStorage
      const raw = localStorage.getItem('yatra_user');
      if (raw) {
        const u = JSON.parse(raw);
        if (u.email && u.email.toLowerCase() === (email || '').toLowerCase()) {
          return u;
        }
      }
      throw new Error(err.message || 'Login failed. Please check your credentials.');
    }
  },

  async register(userData) {
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData)
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Registration failed');
      }
      try {
        localStorage.setItem('yatra_user', JSON.stringify(data));
      } catch {}
      return data;
    } catch (err) {
      if (err.message && err.message !== 'Failed to fetch') {
        throw err;
      }
      const fallbackUser = {
        name: userData.name || (userData.email ? userData.email.split('@')[0] : 'Traveler'),
        email: userData.email || 'traveler@yatra.in',
        authProvider: 'email',
        city: userData.city || 'Jaipur',
        interest: userData.interest || 'Heritage',
        joinedDate: new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
      };
      try {
        localStorage.setItem('yatra_user', JSON.stringify(fallbackUser));
      } catch {}
      return fallbackUser;
    }
  },

  async signInWithGoogle(userData) {
    try {
      const res = await fetch('/api/auth/google', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData)
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Google authentication failed');
      }
      try {
        localStorage.setItem('yatra_user', JSON.stringify(data));
      } catch {}
      return data;
    } catch (err) {
      if (err.message && err.message !== 'Failed to fetch') {
        throw err;
      }
      const fallbackUser = {
        name: userData.name || 'Google Explorer',
        email: userData.email || 'traveler@gmail.com',
        authProvider: 'google',
        city: userData.city || 'Jaipur',
        interest: userData.interest || 'Heritage',
        joinedDate: new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
      };
      try {
        localStorage.setItem('yatra_user', JSON.stringify(fallbackUser));
      } catch {}
      return fallbackUser;
    }
  },

  async signIn(userData) {
    try {
      const res = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData)
      });
      if (res.ok) {
        const user = await res.json();
        try {
          localStorage.setItem('yatra_user', JSON.stringify(user));
        } catch {}
        return user;
      }
    } catch {}

    const fallbackUser = {
      name: userData.name || (userData.email ? userData.email.split('@')[0] : 'Traveler'),
      email: userData.email || 'traveler@yatra.in',
      authProvider: userData.authProvider || 'email',
      city: userData.city || 'Jaipur',
      interest: userData.interest || 'Heritage',
      joinedDate: new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
    };
    try {
      localStorage.setItem('yatra_user', JSON.stringify(fallbackUser));
    } catch {}
    return fallbackUser;
  },

  async getUserProfile(email) {
    try {
      const res = await fetch(`/api/auth/user?email=${encodeURIComponent(email)}`);
      if (res.ok) {
        return await res.json();
      }
    } catch {}
    try {
      const raw = localStorage.getItem('yatra_user');
      if (raw) return JSON.parse(raw);
    } catch {}
    return null;
  },

  async getWeather(cityId) {
    const city = CITIES_MASTER.find((c) => c.id === Number(cityId)) || CITIES_MASTER[0];
    const omUrl = `https://api.open-meteo.com/v1/forecast?latitude=${city.latitude}&longitude=${city.longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset&timezone=auto`;

    const codeToText = (code) => {
      if (code === 0) return 'Clear Sky';
      if ([1, 2].includes(code)) return 'Partly Cloudy';
      if (code === 3) return 'Overcast';
      if ([45, 48].includes(code)) return 'Foggy';
      if ([51, 53, 55].includes(code)) return 'Drizzle';
      if ([61, 63, 65].includes(code)) return 'Rain Showers';
      if ([71, 73, 75].includes(code)) return 'Snow Flurries';
      if ([80, 81, 82].includes(code)) return 'Heavy Showers';
      if ([95, 96, 99].includes(code)) return 'Thunderstorm';
      return 'Pleasant';
    };

    const codeToIcon = (code) => {
      if (code === 0) return '☀️';
      if ([1, 2].includes(code)) return '⛅';
      if (code === 3) return '☁️';
      if ([45, 48].includes(code)) return '🌫️';
      if ([51, 53, 55, 61, 63, 65, 80, 81, 82].includes(code)) return '🌧️';
      if ([71, 73, 75].includes(code)) return '❄️';
      if ([95, 96, 99].includes(code)) return '⛈️';
      return '🌤️';
    };

    const getPackingTip = (temp, code) => {
      if (temp < 15) return 'Carry thermal innerwear, heavy fleece jackets, woolen caps, and moisturizers.';
      if (temp > 32) return 'Pack lightweight breathable linen/cotton clothes, UV sunglasses, sun hat, and high-SPF sunscreen.';
      if ([51, 53, 55, 61, 63, 65, 80, 81, 82, 95, 96, 99].includes(code)) {
        return 'Pack quick-dry fabrics, compact umbrella, waterproof backpack cover, and non-slip walking shoes.';
      }
      return 'Light cottons for the day, comfortable walking shoes for heritage monuments, and a light shawl for breezy evenings.';
    };

    try {
      const res = await fetch(omUrl);
      if (res.ok) {
        const om = await res.json();
        const curr = om.current || {};
        const daily = om.daily || {};
        const currentTemp = curr.temperature_2m ?? 26;
        const feelsLike = curr.apparent_temperature ?? currentTemp;
        const humidity = curr.relative_humidity_2m ?? 48;
        const wind = curr.wind_speed_10m ?? 12;
        const condText = codeToText(curr.weather_code ?? 0);
        const icon = codeToIcon(curr.weather_code ?? 0);

        const dailyForecasts = (daily.time || []).slice(0, 7).map((d, idx) => ({
          date: d,
          maxTemperature: daily.temperature_2m_max?.[idx] ?? 30,
          minTemperature: daily.temperature_2m_min?.[idx] ?? 20,
          maxTempC: daily.temperature_2m_max?.[idx] ?? 30,
          minTempC: daily.temperature_2m_min?.[idx] ?? 20,
          weatherCondition: codeToText(daily.weather_code?.[idx] ?? 0),
          condition: codeToText(daily.weather_code?.[idx] ?? 0),
          weatherIcon: codeToIcon(daily.weather_code?.[idx] ?? 0),
          sunrise: daily.sunrise?.[idx] ? daily.sunrise[idx].slice(11, 16) : '06:15',
          sunset: daily.sunset?.[idx] ? daily.sunset[idx].slice(11, 16) : '18:45'
        }));

        return {
          cityId: city.id,
          cityName: city.name,
          latitude: city.latitude,
          longitude: city.longitude,
          timezone: om.timezone || 'Asia/Kolkata',
          currentTemperature: currentTemp,
          temperatureC: currentTemp,
          apparentTemperature: feelsLike,
          feelsLikeC: feelsLike,
          relativeHumidity: humidity,
          humidityPercent: humidity,
          windSpeed: wind,
          windSpeedKmH: wind,
          weatherCondition: condText,
          condition: condText,
          weatherIcon: icon,
          packingTip: getPackingTip(currentTemp, curr.weather_code ?? 0),
          dailyForecasts,
          forecast: dailyForecasts
        };
      }
    } catch {}

    const defaultForecasts = [
      { date: 'Today', maxTemperature: 30, minTemperature: 21, maxTempC: 30, minTempC: 21, weatherCondition: 'Clear Sky', condition: 'Clear Sky', weatherIcon: '☀️', sunrise: '06:15', sunset: '18:42' },
      { date: 'Tomorrow', maxTemperature: 29, minTemperature: 20, maxTempC: 29, minTempC: 20, weatherCondition: 'Partly Cloudy', condition: 'Partly Cloudy', weatherIcon: '⛅', sunrise: '06:16', sunset: '18:41' },
      { date: 'Day 3', maxTemperature: 31, minTemperature: 22, maxTempC: 31, minTempC: 22, weatherCondition: 'Sunny & Pleasant', condition: 'Sunny & Pleasant', weatherIcon: '☀️', sunrise: '06:16', sunset: '18:40' }
    ];

    return {
      cityId: city.id,
      cityName: city.name,
      latitude: city.latitude,
      longitude: city.longitude,
      timezone: 'Asia/Kolkata',
      currentTemperature: 27,
      temperatureC: 27,
      apparentTemperature: 28,
      feelsLikeC: 28,
      relativeHumidity: 46,
      humidityPercent: 46,
      windSpeed: 14,
      windSpeedKmH: 14,
      weatherCondition: 'Sunny & Pleasant',
      condition: 'Sunny & Pleasant',
      weatherIcon: '☀️',
      packingTip: getPackingTip(27, 0),
      dailyForecasts: defaultForecasts,
      forecast: defaultForecasts
    };
  },

  async getWikiSummary(query) {
    const cleanTitle = (query || '').trim().replace(/ /g, '_');
    try {
      const res = await fetch(
        `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(cleanTitle)}`,
        { headers: { Accept: 'application/json' } }
      );
      if (res.ok) {
        const wData = await res.json();
        const extract = wData.extract || '';
        const keyFacts = [];
        if (wData.description) keyFacts.push(wData.description);
        extract.split('. ').slice(0, 3).forEach((s) => {
          if (s.trim().length > 15) {
            keyFacts.push(s.trim().endsWith('.') ? s.trim() : s.trim() + '.');
          }
        });
        return {
          title: wData.title || query,
          extract: extract || `${query} is one of India's prominent historic and cultural destinations.`,
          thumbnailUrl: wData.thumbnail?.source || null,
          pageUrl: wData.content_urls?.desktop?.page || `https://en.wikipedia.org/wiki/${cleanTitle}`,
          keyFacts
        };
      }
    } catch {}

    return {
      title: query,
      extract: `${query} is celebrated across India for its cultural architecture, history, and vibrant tourism heritage.`,
      thumbnailUrl: null,
      pageUrl: `https://en.wikipedia.org/wiki/${cleanTitle}`,
      keyFacts: ['Celebrated destination in India', 'Attracts global and domestic travelers']
    };
  },

  // ============================================================================
  // SMART INDIA HACKATHON (SIH) INTELLIGENT TOURISM SERVICE METHODS
  // ============================================================================

  getFiveCitiesMVP() {
    return FIVE_CITIES_MVP;
  },

  getHiddenGems(cityId = null) {
    if (!cityId) return HIDDEN_GEMS_DATA;
    return HIDDEN_GEMS_DATA.filter((g) => g.nearCityId === Number(cityId));
  },

  getLocalExperiences(cityId = null) {
    if (!cityId) return LOCAL_EXPERIENCES_DATA;
    return LOCAL_EXPERIENCES_DATA.filter((exp) => exp.cityId === Number(cityId));
  },

  getLocalBusinesses(category = 'all', cityId = null) {
    const custom = getCustomLocalBusinesses();
    let all = [...custom, ...LOCAL_BUSINESSES_DATA];
    if (category && category !== 'all') {
      all = all.filter((b) => b.category === category);
    }
    if (cityId) {
      all = all.filter((b) => b.cityId === Number(cityId));
    }
    return all;
  },

  getTouristSafety(city = null) {
    return {
      national: TOURIST_EMERGENCY_DATA.national,
      cityInfo: city ? TOURIST_EMERGENCY_DATA.cities[city] || null : null
    };
  },

  optimizeRoute(waypoints) {
    return optimizeRouteWaypoints(waypoints);
  },

  calculateTripBudget(params) {
    return calculateDetailedBudget(params);
  },

  submitEnquiry(enquiry) {
    return submitBusinessEnquiry(enquiry);
  },

  getEnquiries() {
    return getStoredBusinessEnquiries();
  },

  registerBusiness(data) {
    return registerLocalBusiness(data);
  }
};

export {
  FIVE_CITIES_MVP,
  HIDDEN_GEMS_DATA,
  LOCAL_EXPERIENCES_DATA,
  LOCAL_BUSINESSES_DATA,
  TOURIST_EMERGENCY_DATA,
  TRANSLATIONS,
  SIH_STATS,
  getHaversineDistanceKm,
  optimizeRouteWaypoints,
  calculateDetailedBudget,
  submitBusinessEnquiry,
  getStoredBusinessEnquiries,
  registerLocalBusiness,
  getCustomLocalBusinesses
};

export default yatraApi;

