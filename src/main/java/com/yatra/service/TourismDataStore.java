package com.yatra.service;

import com.yatra.model.Attraction;
import com.yatra.model.City;
import com.yatra.model.Hotel;
import com.yatra.model.ItineraryDay;
import com.yatra.model.Review;
import com.yatra.model.TravelTip;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class TourismDataStore {

    private final List<City> cities = new ArrayList<>(List.of(
            new City(1L, "Jaipur", "Rajasthan", "North India", "/images/jaipur.jpg", 26.9124, 75.7873,
                    "The Pink City, known for royal forts, palaces, bazaars, crafts, and desert gateways.",
                    "October to March", 96, 4.8, 4200, List.of("heritage", "forts", "culture", "shopping")),
            new City(2L, "Agra", "Uttar Pradesh", "North India", "/images/agra.jpg", 27.1767, 78.0081,
                    "A world heritage destination built around the Taj Mahal, Mughal gardens, and marble craft.",
                    "November to February", 98, 4.9, 3800, List.of("heritage", "romantic", "architecture")),
            new City(3L, "Delhi", "Delhi", "North India", "/images/delhi.jpg", 28.6139, 77.2090,
                    "India's capital with layered history, monuments, street food, museums, and markets.",
                    "October to March", 94, 4.6, 5200, List.of("history", "food", "markets", "museums")),
            new City(4L, "Mumbai", "Maharashtra", "West India", "/images/mumbai.jpg", 19.0760, 72.8777,
                    "A coastal metropolis famous for cinema, beaches, art deco buildings, food, and nightlife.",
                    "November to February", 91, 4.5, 6500, List.of("beaches", "nightlife", "food", "cinema")),
            new City(5L, "Udaipur", "Rajasthan", "West India", "/images/udaipur.jpg", 24.5854, 73.7125,
                    "The City of Lakes, loved for palaces, calm water views, heritage stays, and romantic sunsets.",
                    "September to March", 93, 4.8, 5000, List.of("lakes", "palaces", "romantic", "heritage")),
            new City(6L, "Varanasi", "Uttar Pradesh", "North India", "/images/varanasi.jpg", 25.3176, 82.9739,
                    "One of the world's oldest living cities, centered on ghats, temples, music, and the Ganga.",
                    "October to March", 92, 4.7, 3200, List.of("spiritual", "culture", "river", "heritage")),
            new City(7L, "Goa", "Goa", "West India", "/images/goa.jpg", 15.2993, 74.1240,
                    "India's beach capital with Portuguese heritage, seafood, churches, waterfalls, and nightlife.",
                    "November to February", 95, 4.7, 6200, List.of("beaches", "nightlife", "heritage", "food")),
            new City(8L, "Kochi", "Kerala", "South India", "/images/kochi.jpg", 9.9312, 76.2673,
                    "A port city with backwater gateways, spice trade history, art spaces, churches, and seafood.",
                    "October to February", 88, 4.6, 4600, List.of("backwaters", "heritage", "food", "art")),
            new City(9L, "Amritsar", "Punjab", "North India", "/images/amritsar.jpg", 31.6340, 74.8723,
                    "The spiritual and cultural heartbeat of Punjab, home to the Golden Temple, Wagah Border, and legendary street food.",
                    "October to March", 94, 4.9, 3600, List.of("spiritual", "food", "heritage", "history")),
            new City(10L, "Manali", "Himachal Pradesh", "North India", "/images/manali.jpg", 32.2432, 77.1892,
                    "Himalayan resort town set amidst snow peaks, pine forests, adventure passes, and scenic river valleys.",
                    "March to June & Oct to Feb", 92, 4.7, 4400, List.of("mountains", "adventure", "snow", "nature")),
            new City(11L, "Rishikesh", "Uttarakhand", "North India", "/images/rishikesh.jpg", 30.0869, 78.2676,
                    "The Yoga Capital of the World along the turquoise Ganga, renowned for ashrams, rafting, and scenic cliff cafes.",
                    "September to April", 90, 4.8, 3400, List.of("yoga", "spiritual", "adventure", "nature")),
            new City(12L, "Bengaluru", "Karnataka", "South India", "/images/bengaluru.jpg", 12.9716, 77.5946,
                    "The Garden City and Silicon Valley of India, famed for pleasant weather, lush parks, royal palaces, and microbreweries.",
                    "Year-round", 89, 4.6, 5400, List.of("gardens", "food", "breweries", "culture")),
            new City(13L, "Hampi", "Karnataka", "South India", "/images/hampi.jpg", 15.3350, 76.4600,
                    "UNESCO World Heritage landscape of boulder hills and 14th-century Vijayanagara Empire stone temple monuments.",
                    "October to March", 93, 4.9, 3200, List.of("unesco", "heritage", "ruins", "architecture")),
            new City(14L, "Darjeeling", "West Bengal", "East India", "/images/darjeeling.jpg", 27.0410, 88.2663,
                    "The Queen of the Hills in the Eastern Himalayas, world-famous for aromatic tea estates, UNESCO Toy Train, and Kanchenjunga views.",
                    "March to May & Oct to Dec", 91, 4.7, 4800, List.of("mountains", "tea", "unesco", "nature")),
            new City(15L, "Shimla", "Himachal Pradesh", "North India", "/images/shimla.jpg", 31.1048, 77.1734,
                    "The Queen of Hill Stations featuring pine-clad ridges, the historic Mall Road, and colonial Victorian architecture.",
                    "March to June & Dec to Feb", 93, 4.8, 4100, List.of("mountains", "colonial", "snow", "nature")),
            new City(16L, "Leh Ladakh", "Ladakh", "North India", "/images/ladakh.jpg", 34.1526, 77.5771,
                    "High-altitude desert wonderland famed for turquoise Pangong Lake, Buddhist monasteries, and high mountain passes.",
                    "May to September", 95, 4.9, 5800, List.of("mountains", "adventure", "monastery", "lakes")),
            new City(17L, "Mysore", "Karnataka", "South India", "/images/mysore.jpg", 12.2958, 76.6394,
                    "The City of Palaces renowned for the illuminated Amba Vilas Palace, silk sarees, and aromatic sandalwood craft.",
                    "October to March", 92, 4.7, 3600, List.of("palaces", "heritage", "silk", "architecture")),
            new City(18L, "Srinagar", "Jammu & Kashmir", "North India", "/images/srinagar.jpg", 34.0837, 74.7973,
                    "Paradise on Earth featuring serene Dal Lake houseboats, Mughal gardens, and snow-capped Himalayan peaks.",
                    "April to October", 94, 4.8, 5200, List.of("lakes", "houseboats", "nature", "gardens")),
            new City(19L, "Pondicherry", "Puducherry", "South India", "/images/pondicherry.jpg", 11.9416, 79.8083,
                    "French colonial coastal enclave with pastel heritage villas, Promenade Beach, seaside cafes, and spiritual Auroville.",
                    "October to March", 91, 4.7, 4300, List.of("beaches", "french", "cafes", "spiritual")),
            new City(20L, "Hyderabad", "Telangana", "South India", "/images/hyderabad.jpg", 17.3850, 78.4867,
                    "The City of Pearls blending Nizam royal grandeur, Golconda Fort, world-famous Dum Biryani, and modern tech hubs.",
                    "October to March", 92, 4.7, 4600, List.of("heritage", "food", "palaces", "monuments"))
    ));

    private final List<Attraction> attractions = new ArrayList<>(List.of(
            new Attraction(101L, 1L, "Amber Fort", "Fort", "Hilltop Rajput fort with courtyards and city views.", 26.9855, 75.8513, 4.8, 3, 100, List.of("heritage", "architecture")),
            new Attraction(102L, 1L, "Hawa Mahal", "Palace", "Iconic honeycomb palace facade in the old city.", 26.9239, 75.8267, 4.6, 1, 50, List.of("heritage", "photography")),
            new Attraction(103L, 1L, "City Palace Jaipur", "Palace", "Royal complex with museums and courtyards.", 26.9258, 75.8237, 4.6, 2, 200, List.of("museum", "royal")),
            new Attraction(201L, 2L, "Taj Mahal", "Monument", "White marble mausoleum and India's most recognized landmark.", 27.1751, 78.0421, 4.9, 3, 250, List.of("unesco", "architecture")),
            new Attraction(202L, 2L, "Agra Fort", "Fort", "Massive red sandstone Mughal fort near the Yamuna.", 27.1795, 78.0211, 4.7, 2, 100, List.of("unesco", "history")),
            new Attraction(203L, 2L, "Mehtab Bagh", "Garden", "Riverside garden with sunset views of the Taj Mahal.", 27.1929, 78.0419, 4.4, 1, 30, List.of("sunset", "garden")),
            new Attraction(301L, 3L, "Red Fort", "Fort", "Mughal fort complex and Independence Day landmark.", 28.6562, 77.2410, 4.5, 2, 50, List.of("history", "unesco")),
            new Attraction(302L, 3L, "India Gate", "Memorial", "War memorial and central Delhi public space.", 28.6129, 77.2295, 4.6, 1, 0, List.of("landmark", "evening")),
            new Attraction(303L, 3L, "Qutub Minar", "Monument", "Tall minaret and Indo-Islamic architecture complex.", 28.5245, 77.1855, 4.6, 2, 40, List.of("unesco", "architecture")),
            new Attraction(401L, 4L, "Gateway of India", "Monument", "Waterfront arch facing Mumbai harbour.", 18.9220, 72.8347, 4.6, 1, 0, List.of("landmark", "waterfront")),
            new Attraction(402L, 4L, "Marine Drive", "Promenade", "Curving seafront boulevard popular at sunset.", 18.9432, 72.8230, 4.7, 2, 0, List.of("sunset", "sea")),
            new Attraction(403L, 4L, "Elephanta Caves", "Caves", "Island cave temples reached by ferry.", 18.9633, 72.9315, 4.4, 4, 40, List.of("unesco", "history")),
            new Attraction(501L, 5L, "City Palace Udaipur", "Palace", "Lakeside palace complex with sweeping views.", 24.5764, 73.6835, 4.7, 3, 300, List.of("palace", "lake")),
            new Attraction(502L, 5L, "Lake Pichola", "Lake", "Scenic lake with boat rides and island palaces.", 24.5720, 73.6790, 4.8, 2, 400, List.of("boat", "sunset")),
            new Attraction(601L, 6L, "Dashashwamedh Ghat", "Ghat", "Major ghat known for the evening Ganga Aarti.", 25.3062, 83.0104, 4.8, 2, 0, List.of("spiritual", "river")),
            new Attraction(602L, 6L, "Kashi Vishwanath Temple", "Temple", "Important Hindu temple near the ghats.", 25.3109, 83.0107, 4.8, 2, 0, List.of("spiritual", "temple")),
            new Attraction(701L, 7L, "Baga Beach", "Beach", "Popular beach with water sports and nightlife.", 15.5553, 73.7517, 4.5, 3, 0, List.of("beach", "nightlife")),
            new Attraction(702L, 7L, "Basilica of Bom Jesus", "Church", "Historic church and UNESCO heritage site.", 15.5009, 73.9116, 4.5, 2, 0, List.of("unesco", "heritage")),
            new Attraction(801L, 8L, "Fort Kochi", "Heritage Quarter", "Walkable old town with cafes, art, and colonial-era streets.", 9.9658, 76.2421, 4.6, 3, 0, List.of("heritage", "art")),
            new Attraction(802L, 8L, "Chinese Fishing Nets", "Landmark", "Historic shore-operated fishing nets.", 9.9667, 76.2427, 4.3, 1, 0, List.of("waterfront", "photography")),
            new Attraction(901L, 9L, "Golden Temple (Harmandir Sahib)", "Gurudwara", "Gilded spiritual sanctuary with holy sarovar and round-the-clock free community langar.", 31.6200, 74.8765, 4.9, 3, 0, List.of("spiritual", "unesco", "food")),
            new Attraction(902L, 9L, "Wagah Border", "Border Ceremony", "Electrifying patriotic daily flag-lowering military parade between India and Pakistan.", 31.6047, 74.5724, 4.8, 3, 0, List.of("national", "parade")),
            new Attraction(10010L, 10L, "Solang Valley", "Adventure Valley", "Alpine hub for paragliding, skiing, zorbing, and cable car rides.", 32.3166, 77.1578, 4.7, 4, 150, List.of("adventure", "snow")),
            new Attraction(10020L, 10L, "Hadimba Temple", "Heritage Temple", "Ancient wooden pagoda temple in cedar forests built in 1553.", 32.2483, 77.1806, 4.6, 1, 30, List.of("temple", "forest")),
            new Attraction(1101L, 11L, "Ram Jhula & Laxman Jhula", "Suspension Bridge", "Iconic iron suspension bridges over the Ganges connecting ashrams and markets.", 30.1232, 78.3175, 4.7, 2, 0, List.of("river", "landmark")),
            new Attraction(1102L, 11L, "Triveni Ghat Evening Aarti", "Spiritual Ghat", "Mesmerizing daily sunset Maha Aarti with glowing brass lamps on the holy Ganges.", 30.1033, 78.2936, 4.8, 2, 0, List.of("spiritual", "aarti")),
            new Attraction(1201L, 12L, "Bangalore Palace", "Palace", "Tudor-style royal estate with fortified towers, stained glass, and lush courtyards.", 12.9982, 77.5921, 4.5, 2, 250, List.of("palace", "history")),
            new Attraction(1202L, 12L, "Lalbagh Botanical Garden", "Botanical Garden", "240-acre botanical haven with rare plants, lake, and Victorian glass house.", 12.9507, 77.5848, 4.6, 2, 30, List.of("nature", "garden")),
            new Attraction(1301L, 13L, "Virupaksha Temple", "Temple", "7th-century active temple complex dedicated to Lord Shiva with towering gopuram.", 15.3353, 76.4601, 4.9, 2, 50, List.of("unesco", "spiritual")),
            new Attraction(1302L, 13L, "Stone Chariot & Vijaya Vittala", "Architectural Wonder", "Iconic stone chariot shrine and musical stone pillars of Vijayanagara empire.", 15.3437, 76.4752, 4.9, 3, 40, List.of("unesco", "monument")),
            new Attraction(1401L, 14L, "Tiger Hill Sunrise", "Viewpoint", "World-renowned sunrise vantage point showing the sun rising over Kanchenjunga.", 26.9944, 88.2861, 4.8, 2, 50, List.of("mountains", "sunrise")),
            new Attraction(1402L, 14L, "Happy Valley Tea Estate", "Tea Plantation", "Historic rolling emerald tea garden offering tea plucking and artisanal tasting.", 27.0543, 88.2618, 4.6, 2, 100, List.of("tea", "nature")),
            new Attraction(1501L, 15L, "The Ridge & Mall Road", "Colonial Promenade", "Pedestrian cultural heart of Shimla with Tudor library and panoramic Himalayan views.", 31.1044, 77.1750, 4.7, 2, 0, List.of("hills", "colonial", "evening")),
            new Attraction(1502L, 15L, "Kufri Snow Point", "Alpine Adventure", "Scenic winter sports hub for tobogganing, pony trekking, and Himalayan nature parks.", 31.0979, 77.2678, 4.6, 3, 100, List.of("snow", "adventure")),
            new Attraction(1601L, 16L, "Pangong Tso Lake", "High-Altitude Lake", "World-famous azure saltwater lake changing colors from blue to turquoise under Himalayan skies.", 33.7595, 78.6674, 4.9, 4, 200, List.of("lakes", "photography", "nature")),
            new Attraction(1602L, 16L, "Thiksey Monastery", "Buddhist Gompa", "Imposing 12-storey hilltop monastery resembling the Potala Palace of Lhasa.", 34.0583, 77.6667, 4.8, 2, 50, List.of("monastery", "culture", "peace")),
            new Attraction(1701L, 17L, "Mysore Palace (Amba Vilas)", "Royal Palace", "One of India's most grand palaces, illuminated by 100,000 golden bulbs on weekends.", 12.3051, 76.6552, 4.9, 3, 100, List.of("palaces", "royal", "architecture")),
            new Attraction(1702L, 17L, "Chamundi Hill & Temple", "Hilltop Shrine", "Ancient Dravidian temple overlooking Mysore with giant monolith Nandi statue.", 12.2745, 76.6710, 4.7, 2, 0, List.of("spiritual", "viewpoint")),
            new Attraction(1801L, 18L, "Dal Lake & Shikara Cruise", "Scenic Lake", "Romantic wooden Shikara rides through floating lotus gardens and water bazaars.", 34.1111, 74.8722, 4.9, 3, 500, List.of("lakes", "boat", "romantic")),
            new Attraction(1802L, 18L, "Mughal Gardens (Shalimar)", "Royal Garden", "Terraced royal Mughal garden with stepped cascades, fountains, and chinar trees.", 34.1500, 74.8700, 4.7, 2, 50, List.of("gardens", "history")),
            new Attraction(1901L, 19L, "White Town French Quarter", "Heritage Enclave", "Charming mustard-yellow Franco-Tamil villas, boutique bakeries, and bougainvillea streets.", 11.9333, 79.8333, 4.7, 3, 0, List.of("french", "heritage", "cafes")),
            new Attraction(1902L, 19L, "Auroville Matrimandir", "Spiritual Dome", "Futuristic golden geodesic dome dedicated to universal human unity and silent meditation.", 12.0069, 79.8106, 4.8, 2, 0, List.of("peace", "architecture")),
            new Attraction(2001L, 20L, "Charminar", "Historical Monument", "1591 landmark mosque with four grand arches and bustling Laad Bazaar bangle markets.", 17.3616, 78.4747, 4.7, 2, 25, List.of("history", "bazaar", "heritage")),
            new Attraction(2002L, 20L, "Golconda Fort", "Medieval Fort", "Acoustic wonder fortress renowned for sound resonance and diamond trade history.", 17.3833, 78.4011, 4.8, 3, 80, List.of("fort", "history", "sound"))
    ));

    private final List<Hotel> hotels = new ArrayList<>(List.of(
            // Jaipur
            new Hotel(1001L, 1L, "Zostel Jaipur (Backpacker Hostel)", "Hostel", "Near Hawa Mahal, Pink City, Jaipur", 26.9240, 75.8270, 4.7, 850, List.of("dorm beds", "rooftop cafe", "free wifi", "social events"), List.of(102L, 103L)),
            new Hotel(1002L, 1L, "Heritage Haveli Jaipur", "Heritage", "Near Johari Bazaar, Jaipur", 26.9225, 75.8199, 4.6, 4200, List.of("breakfast", "rooftop pool", "parking", "folk music"), List.of(102L, 103L)),
            new Hotel(1003L, 1L, "The Raj Palace Royal Suites", "Luxury Palace", "Amer Road, Jaipur", 26.9450, 75.8350, 4.9, 11500, List.of("heritage suites", "butler service", "royal museum", "spa"), List.of(101L)),
            new Hotel(1004L, 1L, "Amber View Resort", "Resort", "Amer Foothills, Jaipur", 26.9701, 75.8455, 4.5, 5600, List.of("swimming pool", "cab service", "family lawns"), List.of(101L)),

            // Agra
            new Hotel(2001L, 2L, "The Hosteller Agra (Hostel)", "Hostel", "Taj East Gate Rd, Agra", 27.1650, 78.0480, 4.6, 750, List.of("ac dorms", "rooftop taj view", "cafe", "board games"), List.of(201L)),
            new Hotel(2002L, 2L, "Taj East Gate Hotel", "Premium", "Taj East Gate Road, Agra", 27.1688, 78.0496, 4.7, 6200, List.of("taj view", "restaurant", "airport pickup"), List.of(201L, 203L)),
            new Hotel(2003L, 2L, "Agra Fort Heritage Inn", "Budget", "Rakabganj, Agra", 27.1749, 78.0165, 4.3, 1900, List.of("wifi", "family rooms", "tour desk"), List.of(202L)),

            // Delhi
            new Hotel(3001L, 3L, "Zostel Delhi Central", "Hostel", "Paharganj, New Delhi", 28.6430, 77.2180, 4.5, 790, List.of("metro 200m", "rooftop terrace", "clean dorms", "travel desk"), List.of(301L, 302L)),
            new Hotel(3002L, 3L, "The Imperial New Delhi", "Luxury Heritage", "Janpath, Connaught Place, Delhi", 28.6235, 77.2180, 4.8, 9800, List.of("art collection", "fine dining", "spa", "gardens"), List.of(302L, 303L)),
            new Hotel(3003L, 3L, "Central Delhi Business Stay", "Business", "Connaught Place, Delhi", 28.6315, 77.2167, 4.4, 5200, List.of("metro nearby", "breakfast", "workspace"), List.of(301L, 302L)),

            // Mumbai
            new Hotel(4001L, 4L, "Backpacker Panda Colaba", "Hostel", "Colaba, Mumbai", 18.9190, 72.8310, 4.5, 950, List.of("walk to gateway", "ac dorms", "wifi", "lounge"), List.of(401L)),
            new Hotel(4002L, 4L, "The Taj Mahal Palace Mumbai", "Luxury Palace", "Apollo Bunder, Colaba, Mumbai", 18.9217, 72.8332, 4.9, 14500, List.of("sea view", "heritage wing", "pool", "celebrity dining"), List.of(401L, 402L)),
            new Hotel(4003L, 4L, "Marine Bay Seafront Hotel", "Premium", "Churchgate, Mumbai", 18.9368, 72.8258, 4.6, 7800, List.of("sea view", "breakfast", "gym"), List.of(401L, 402L)),

            // Udaipur
            new Hotel(5001L, 5L, "Zostel Udaipur (Lakefront)", "Hostel", "Purohit Ji Ka Khurra, Udaipur", 24.5810, 73.6810, 4.8, 890, List.of("lake view terrace", "cafe", "sunset music", "wifi"), List.of(501L, 502L)),
            new Hotel(5002L, 5L, "Lake Palace View Boutique", "Heritage", "Lake Pichola Road, Udaipur", 24.5774, 73.6822, 4.8, 6800, List.of("lake view", "boat booking", "rooftop dining"), List.of(501L, 502L)),

            // Varanasi
            new Hotel(6001L, 6L, "Hostie Ganga Ghat (Hostel)", "Hostel", "Dashashwamedh Ghat, Varanasi", 25.3050, 83.0090, 4.6, 720, List.of("ghat access", "aarti terrace", "chai station"), List.of(601L)),
            new Hotel(6002L, 6L, "Ganga Ghat Heritage Residency", "Boutique", "Godowlia, Varanasi", 25.3098, 83.0085, 4.6, 3600, List.of("aarti booking", "terrace", "guide desk"), List.of(601L, 602L)),

            // Goa
            new Hotel(7001L, 7L, "Zostel Goa Palolem (Beach Hostel)", "Hostel", "Palolem Beach, South Goa", 15.0110, 74.0240, 4.8, 850, List.of("walk to sand", "hammocks", "surf desk", "wifi"), List.of(701L)),
            new Hotel(7002L, 7L, "North Goa Beach Resort & Spa", "Resort", "Baga Beach, North Goa", 15.5520, 73.7530, 4.6, 6800, List.of("beach access", "pool", "bike rental", "cocktail bar"), List.of(701L)),

            // Kochi
            new Hotel(8001L, 8L, "Zostel Kochi (Art District)", "Hostel", "Burgar Street, Fort Kochi", 9.9670, 76.2410, 4.7, 780, List.of("art cafe", "bicycle rental", "courtyard"), List.of(801L, 802L)),
            new Hotel(8002L, 8L, "Fort Kochi Heritage Art Hotel", "Boutique", "Princess Street, Kochi", 9.9660, 76.2440, 4.6, 5200, List.of("colonial cafe", "walking tours", "seafood"), List.of(801L, 802L)),

            // Amritsar
            new Hotel(9001L, 9L, "Hosteller Amritsar Golden Gate", "Hostel", "Near Heritage Street, Amritsar", 31.6250, 74.8730, 4.7, 750, List.of("5 min to temple", "ac dorms", "amritsari breakfast"), List.of(901L)),
            new Hotel(9002L, 9L, "Golden Sarovar Premiere Amritsar", "Premium", "Court Road, Amritsar", 31.6421, 74.8812, 4.7, 4500, List.of("free shuttle to temple", "punjabi buffet", "spa"), List.of(901L)),

            // Manali
            new Hotel(10001L, 10L, "Zostel Old Manali (Apple Orchard)", "Hostel", "Manu Temple Rd, Old Manali", 32.2570, 77.1820, 4.8, 890, List.of("orchard view", "bonfire", "live acoustic nights", "cafe"), List.of(10010L, 10020L)),
            new Hotel(10002L, 10L, "Snow Peak Himalayan Chalet", "Resort", "Old Manali Road, Manali", 32.2541, 77.1852, 4.6, 5100, List.of("mountain view", "fireplace", "adventure desk"), List.of(10010L, 10020L)),

            // Rishikesh
            new Hotel(11001L, 11L, "Zostel Tapovan Rishikesh", "Hostel", "Tapovan, Rishikesh", 30.1360, 78.3260, 4.8, 820, List.of("rooftop yoga", "cafe", "river trail guide", "wifi"), List.of(1101L, 1102L)),
            new Hotel(11002L, 11L, "Ganga Riverside Eco Retreat", "Wellness Resort", "Tapovan, Rishikesh", 30.1341, 78.3245, 4.8, 4600, List.of("daily yoga session", "ayurvedic spa", "river view cafe"), List.of(1101L, 1102L)),

            // Bengaluru
            new Hotel(12001L, 12L, "Zostel Bangalore Indiranagar", "Hostel", "Indiranagar, Bengaluru", 12.9710, 77.6410, 4.6, 920, List.of("co-working pods", "cafe", "high-speed wifi"), List.of(1201L, 1202L)),
            new Hotel(12002L, 12L, "The Heritage Bangalore Residency", "Business Boutique", "MG Road, Bengaluru", 12.9750, 77.6080, 4.5, 5900, List.of("rooftop lounge", "metro connectivity", "breakfast"), List.of(1201L, 1202L)),

            // Hampi
            new Hotel(13001L, 13L, "Zostel Hampi (Hippie Island)", "Hostel", "Sanapur, Hampi", 15.3520, 76.4420, 4.8, 790, List.of("boulder views", "bamboo huts", "scooter rental"), List.of(1301L, 1302L)),
            new Hotel(13002L, 13L, "Boulders & Heritage Camp", "Boutique Heritage", "Kamalapura, Hampi", 15.3180, 76.4680, 4.8, 3800, List.of("cycle rental", "guided sunset walk", "open-air dining"), List.of(1301L, 1302L)),

            // Darjeeling
            new Hotel(14001L, 14L, "Hideout Darjeeling Backpacker Hostel", "Hostel", "HD Lama Rd, Darjeeling", 27.0420, 88.2640, 4.7, 750, List.of("kanchenjunga view", "darjeeling tea", "guitar lounge"), List.of(1401L, 1402L)),
            new Hotel(14002L, 14L, "Windamere Heritage Colonial Stay", "Colonial Heritage", "Observatory Hill, Darjeeling", 27.0450, 88.2670, 4.7, 6500, List.of("kanchenjunga view", "tea lounge", "colonial fireplaces"), List.of(1401L, 1402L)),

            // Shimla
            new Hotel(15001L, 15L, "Zostel Homes Mashobra Shimla", "Hostel", "Mashobra Ridge, Shimla", 31.1300, 77.2300, 4.7, 850, List.of("pine forest view", "bonfire", "apple orchard walk"), List.of(1501L, 1502L)),
            new Hotel(15002L, 15L, "The Cecil Luxury Heritage Shimla", "Heritage", "Chaura Maidan, Shimla", 31.1030, 77.1580, 4.9, 8200, List.of("colonial ballroom", "spa", "heated pool", "himalayan view"), List.of(1501L, 1502L)),

            // Leh Ladakh
            new Hotel(16001L, 16L, "Zostel Leh (Old Town)", "Hostel", "Karzoo, Leh Ladakh", 34.1680, 77.5850, 4.8, 950, List.of("stargazing terrace", "acclimatization room", "bike rental"), List.of(1601L, 1602L)),
            new Hotel(16002L, 16L, "The Grand Dragon Ladakh", "Luxury Eco Resort", "Old Road Sheynam, Leh", 34.1560, 77.5750, 4.9, 9400, List.of("oxygen enrichment", "solar heated", "stok kangri views"), List.of(1601L, 1602L)),

            // Mysore
            new Hotel(17001L, 17L, "Roamer Backpacker Hostel Mysore", "Hostel", "Gokulam, Mysore", 12.3300, 76.6280, 4.6, 750, List.of("yoga lawn", "community kitchen", "bicycle rental"), List.of(1701L, 1702L)),
            new Hotel(17002L, 17L, "Lalitha Mahal Palace Hotel", "Heritage Palace", "Lalitha Mahal Nagar, Mysore", 12.3020, 76.6920, 4.8, 6200, List.of("viceroy hall", "italian marble", "palace carriage ride"), List.of(1701L, 1702L)),

            // Srinagar
            new Hotel(18001L, 18L, "Zostel Srinagar (Nigeen Lake)", "Hostel", "Nigeen Lake, Srinagar", 34.1200, 74.8350, 4.8, 890, List.of("lake view balcony", "kahwa station", "shikara ride"), List.of(1801L, 1802L)),
            new Hotel(18002L, 18L, "Mascot Houseboats Dal Lake", "Luxury Houseboat", "Dal Lake Ghat 7, Srinagar", 34.0950, 74.8450, 4.9, 7500, List.of("hand-carved walnut wood", "kashmiri wazwan", "private shikara"), List.of(1801L, 1802L)),

            // Pondicherry
            new Hotel(19001L, 19L, "Micasa White Town Hostel", "Hostel", "Rue Romain Rolland, Pondicherry", 11.9320, 79.8340, 4.7, 850, List.of("french quarter", "rooftop hammock", "croissant breakfast"), List.of(1901L, 1902L)),
            new Hotel(19002L, 19L, "Le Dupleix Heritage Villa", "French Heritage", "Casimir Street, White Town, Pondicherry", 11.9310, 79.8350, 4.8, 6400, List.of("18th century villa", "courtyard dining", "cocktail bar"), List.of(1901L, 1902L)),

            // Hyderabad
            new Hotel(20001L, 20L, "Shepherd Backpacker Stay Hyderabad", "Hostel", "Banjara Hills, Hyderabad", 17.4150, 78.4480, 4.6, 780, List.of("ac dorms", "co-work area", "metro connectivity"), List.of(2001L, 2002L)),
            new Hotel(20002L, 20L, "Taj Falaknuma Palace", "Luxury Palace", "Engine Bowli, Falaknuma, Hyderabad", 17.3314, 78.4674, 4.9, 13800, List.of("nizam carriage ride", "scented gardens", "durbar hall", "jade collection"), List.of(2001L, 2002L))
    ));

    private final List<TravelTip> tips = new ArrayList<>(List.of(
            new TravelTip(1L, 1L, "Start forts early", "Amber Fort gets crowded by late morning, especially in winter.", "timing"),
            new TravelTip(2L, 2L, "Book Taj tickets ahead", "Morning slots are best for photos and cooler weather.", "booking"),
            new TravelTip(3L, 3L, "Use the metro", "Delhi Metro is usually faster than road travel during peak hours.", "transport"),
            new TravelTip(4L, 4L, "Plan around traffic", "Keep buffer time between South Mumbai and suburbs.", "transport"),
            new TravelTip(5L, 5L, "Reserve lake-view dinners", "Sunset tables near Lake Pichola fill quickly in season.", "booking"),
            new TravelTip(6L, 6L, "Respect ghat etiquette", "Ask before photographing people during rituals.", "culture"),
            new TravelTip(7L, 7L, "Check beach flags", "Follow lifeguard warnings during monsoon and rough-sea days.", "safety"),
            new TravelTip(8L, 8L, "Walk Fort Kochi", "Many heritage streets, cafes, and galleries are best explored on foot.", "transport"),
            new TravelTip(9L, 9L, "Temple head covering", "Both men and women must cover their heads and remove shoes inside the Golden Temple.", "culture"),
            new TravelTip(10L, 10L, "Rohtang Pass permits", "Online permits are mandatory for vehicles visiting Rohtang Pass.", "booking"),
            new TravelTip(11L, 11L, "Rafting seasons", "River rafting is optimal from October to May; avoid monsoons.", "adventure"),
            new TravelTip(12L, 12L, "Peak traffic buffer", "Allow ample commute time between electronic city and central areas.", "transport"),
            new TravelTip(13L, 13L, "Rent a bicycle or moped", "Hampi's ruins span 40+ sq km; cycling across boulder routes is magical.", "transport"),
            new TravelTip(14L, 14L, "Pre-book Toy Train", "Darjeeling Himalayan Railway joyrides sell out weeks ahead in peak holiday season.", "booking")
    ));

    private final List<Review> reviews = new ArrayList<>(List.of(
            new Review(1L, 1L, "Aarav", 5, "Perfect mix of forts, food, and markets.", "December"),
            new Review(2L, 2L, "Maya", 5, "The Taj at sunrise was worth the early start.", "January"),
            new Review(3L, 5L, "Kabir", 5, "Udaipur felt calm, scenic, and easy to explore.", "February"),
            new Review(4L, 7L, "Nisha", 4, "Great beaches and food, but pre-book hotels in peak season.", "November"),
            new Review(5L, 9L, "Harpreet", 5, "The tranquility of Harmandir Sahib and the langar is life-changing.", "January"),
            new Review(6L, 10L, "Rohan", 5, "Solang valley snow sports were fantastic! Fresh mountain air.", "December"),
            new Review(7L, 11L, "Elena", 5, "The Ganga Aarti at Triveni Ghat brought tears of joy. Outstanding yoga retreats.", "March"),
            new Review(8L, 13L, "Marcus", 5, "Felt like walking through another planet. The stone chariot is majestic.", "November"),
            new Review(9L, 14L, "Priya", 5, "Sunrise over Kanchenjunga from Tiger Hill was breathtaking.", "April")
    ));

    public List<City> cities() {
        return cities;
    }

    public List<Attraction> attractions() {
        return attractions;
    }

    public List<Hotel> hotels() {
        return hotels;
    }

    public List<TravelTip> tips() {
        return tips;
    }

    public List<Review> reviews() {
        return reviews;
    }

    public List<ItineraryDay> baseItinerary(Long cityId) {
        return switch (cityId.intValue()) {
            case 1 -> List.of(
                    new ItineraryDay(1, "Royal Jaipur", List.of("Amber Fort"), List.of("City Palace Jaipur"), List.of("Hawa Mahal and old bazaar walk"), 1200),
                    new ItineraryDay(2, "Crafts and Culture", List.of("Jantar Mantar area"), List.of("Block-printing or craft market visit"), List.of("Rajasthani dinner"), 1800));
            case 2 -> List.of(
                    new ItineraryDay(1, "Taj and Mughal Core", List.of("Taj Mahal sunrise"), List.of("Agra Fort"), List.of("Mehtab Bagh sunset"), 900),
                    new ItineraryDay(2, "Local Craft Trail", List.of("Marble inlay workshop"), List.of("Old city food walk"), List.of("Yamuna river viewpoint"), 1100));
            case 6 -> List.of(
                    new ItineraryDay(1, "Ghats and Aarti", List.of("Morning boat ride"), List.of("Kashi Vishwanath Temple"), List.of("Dashashwamedh Ghat Aarti"), 700),
                    new ItineraryDay(2, "Culture Walk", List.of("Old lanes walk"), List.of("Silk weaving market"), List.of("Classical music cafe"), 1000));
            case 9 -> List.of(
                    new ItineraryDay(1, "Golden Temple & Langar", List.of("Harmandir Sahib dawn prayers"), List.of("Community kitchen langar seva"), List.of("Heritage street walk and lassi"), 400),
                    new ItineraryDay(2, "Patriotism & Cuisine", List.of("Jallianwala Bagh memorial"), List.of("Amritsari Kulcha food trail"), List.of("Wagah Border beating retreat ceremony"), 800));
            case 10 -> List.of(
                    new ItineraryDay(1, "Himalayan Vistas", List.of("Hadimba Temple cedar forest"), List.of("Old Manali cafe culture"), List.of("Vashisht hot springs"), 600),
                    new ItineraryDay(2, "Solang Valley Adventure", List.of("Solang valley paragliding"), List.of("Cable car summit ride"), List.of("Riverside bonfire"), 1800));
            case 11 -> List.of(
                    new ItineraryDay(1, "Yoga & Holy Ganga", List.of("Morning yoga session at ashram"), List.of("Ram & Laxman Jhula stroll"), List.of("Triveni Ghat sunset Aarti"), 500),
                    new ItineraryDay(2, "White Water Thrills", List.of("Shivpuri to Rishikesh river rafting"), List.of("Neer Garh waterfall hike"), List.of("Riverside organic dinner"), 1500));
            case 13 -> List.of(
                    new ItineraryDay(1, "Sacred Center", List.of("Virupaksha Temple at sunrise"), List.of("Hemakuta Hill monument clusters"), List.of("Tungabhadra river coracle boat ride"), 500),
                    new ItineraryDay(2, "Royal Enclosure & Vittala", List.of("Stone Chariot & Vijaya Vittala"), List.of("Lotus Mahal & Elephant Stables"), List.of("Matanga Hill panoramic sunset"), 700));
            case 14 -> List.of(
                    new ItineraryDay(1, "Kanchenjunga & Tea", List.of("Tiger Hill 4 AM sunrise"), List.of("Ghoom Monastery"), List.of("Happy Valley Tea estate plucking tour"), 900),
                    new ItineraryDay(2, "Toy Train & Mall Road", List.of("Darjeeling Himalayan Toy Train joyride"), List.of("Himalayan Mountaineering Institute"), List.of("Chowrasta Mall road bakery & tea tasting"), 1200));
            default -> List.of(
                    new ItineraryDay(1, "City Highlights", List.of("Top-rated landmark"), List.of("Museum or heritage walk"), List.of("Local food street"), 1200),
                    new ItineraryDay(2, "Slow Exploration", List.of("Scenic viewpoint"), List.of("Shopping and craft trail"), List.of("Sunset experience"), 1400));
        };
    }
}
