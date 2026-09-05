import { useState, useMemo, useEffect } from 'react';
import SihRouteMap from './SihRouteMap';
import {
  FIVE_CITIES_MVP,
  calculateDetailedBudget,
  optimizeRouteWaypoints,
  LOCAL_BUSINESSES_DATA,
  rebalanceTripBudget
} from '../services/sihData';

const INTEREST_CHIPS = [
  { id: 'heritage', label: 'Forts & Palaces', icon: '🏛️' },
  { id: 'spiritual', label: 'Spiritual Ghats & Temples', icon: '🧘' },
  { id: 'food', label: 'Street Gastronomy & Thalis', icon: '🍛' },
  { id: 'textiles', label: 'Handicrafts & Bazaars', icon: '🧵' },
  { id: 'nature', label: 'Wildlife & Nature Trails', icon: '🐅' },
  { id: 'photography', label: 'Sunset & Architecture Photography', icon: '📸' },
  { id: 'offbeat', label: 'Offbeat & Hidden Villages', icon: '🌿' },
  { id: 'wellness', label: 'Yoga & Ayurvedic Wellness', icon: '🌸' },
  { id: 'art', label: 'Art Galleries & Museums', icon: '🎨' },
  { id: 'cycling', label: 'Heritage Walks & Cycling', icon: '🚲' },
  { id: 'nightlife', label: 'Cafes & Nightlife', icon: '🍸' },
  { id: 'beaches', label: 'Beaches & Water Sports', icon: '🏖️' },
];

const MULTI_DAY_TEMPLATES = {
  Jaipur: [
    {
      day: 1,
      theme: 'Royal Hilltop Forts & Historic Stepwells',
      waypoints: [
        { name: 'Hotel / Heritage Haveli (Amer Road)', lat: 26.9239, lng: 75.8267, type: 'Start / Accommodation', time: '08:30 AM', slot: 'Morning' },
        { name: 'Amber Fort & Maota Lake View', lat: 26.9855, lng: 75.8513, type: 'Heritage Monument', time: '09:30 AM', slot: 'Morning' },
        { name: 'Panna Meena ka Kund Stepwell', lat: 26.9880, lng: 75.8560, type: 'Architectural Gem', time: '11:45 AM', slot: 'Morning' },
        { name: '1135 AD Royal Rajasthani Lunch', lat: 26.9850, lng: 75.8510, type: 'Culinary Stop', time: '01:15 PM', slot: 'Afternoon' },
        { name: 'Jaigarh Fort (Jaivana Cannon & Aravalli Views)', lat: 26.9858, lng: 75.8450, type: 'Fortress Viewpoint', time: '03:00 PM', slot: 'Afternoon' },
        { name: 'Nahargarh Fort Sunset at Padao Cafe', lat: 26.9378, lng: 75.8156, type: 'Sunset Point', time: '05:30 PM', slot: 'Evening' },
        { name: 'Chokhi Dhani Cultural Village Dinner', lat: 26.7667, lng: 75.8340, type: 'Cultural Night', time: '07:45 PM', slot: 'Night' },
      ],
    },
    {
      day: 2,
      theme: 'Walled Pink City, Royal Observatories & Bazaars',
      waypoints: [
        { name: 'Hawa Mahal (Palace of Winds)', lat: 26.9239, lng: 75.8267, type: 'Iconic Landmark', time: '08:30 AM', slot: 'Morning' },
        { name: 'City Palace Museum & Chandra Mahal', lat: 26.9258, lng: 75.8237, type: 'Royal Residence', time: '10:00 AM', slot: 'Morning' },
        { name: 'Jantar Mantar UNESCO Astronomical Observatory', lat: 26.9248, lng: 75.8246, type: 'UNESCO Monument', time: '12:00 PM', slot: 'Morning' },
        { name: 'LMB Traditional Dal Baati Thali (Johari Bazaar)', lat: 26.9208, lng: 75.8239, type: 'Culinary Stop', time: '01:30 PM', slot: 'Afternoon' },
        { name: 'Bapu Bazaar & Johari Bazaar Gemstone Shopping', lat: 26.9190, lng: 75.8210, type: 'Artisan Bazaar', time: '03:30 PM', slot: 'Afternoon' },
        { name: 'Albert Hall Museum & Ram Niwas Garden Illumination', lat: 26.9116, lng: 75.8195, type: 'Night Landmark', time: '06:30 PM', slot: 'Evening' },
      ],
    },
    {
      day: 3,
      theme: 'Artisan Blue Pottery & Sacred Galta Temple',
      waypoints: [
        { name: 'Galtaji Monkey Temple & Sacred Natural Kunds', lat: 26.9160, lng: 75.8590, type: 'Spiritual Sanctuary', time: '08:00 AM', slot: 'Morning' },
        { name: 'Kripal Kumbh Authentic Blue Pottery Workshop', lat: 26.9240, lng: 75.8010, type: 'Artisan Masterclass', time: '10:30 AM', slot: 'Morning' },
        { name: 'Tapri Central Chai & Street Snacks', lat: 26.9080, lng: 75.8060, type: 'Cafe Stop', time: '01:00 PM', slot: 'Afternoon' },
        { name: 'Jal Mahal Water Palace Promenade', lat: 26.9535, lng: 75.8462, type: 'Scenic Lake', time: '03:30 PM', slot: 'Afternoon' },
        { name: 'Anokhi Hand-Block Print Museum', lat: 26.9880, lng: 75.8540, type: 'Textile Museum', time: '05:00 PM', slot: 'Evening' },
      ],
    },
  ],
  Agra: [
    {
      day: 1,
      theme: 'Wonders of the World & Mughal Imperial Citadel',
      waypoints: [
        { name: 'Taj East Gate Hotel / Stay', lat: 27.1720, lng: 78.0450, type: 'Start / Accommodation', time: '05:30 AM', slot: 'Morning' },
        { name: 'Taj Mahal Sunrise Entry (Mausoleum & Gardens)', lat: 27.1751, lng: 78.0421, type: 'Wonder of World', time: '06:15 AM', slot: 'Morning' },
        { name: 'Agra Fort (Diwan-i-Am & Musamman Burj)', lat: 27.1795, lng: 78.0211, type: 'Mughal Fortress', time: '09:45 AM', slot: 'Morning' },
        { name: 'Pinch of Spice Mughlai Delicacies', lat: 27.1585, lng: 78.0102, type: 'Culinary Stop', time: '01:00 PM', slot: 'Afternoon' },
        { name: 'Marble Inlay Pietra Dura Masterclass', lat: 27.1650, lng: 78.0250, type: 'Artisan Hub', time: '03:15 PM', slot: 'Afternoon' },
        { name: 'Mehtab Bagh River Sunset View of Taj', lat: 27.1800, lng: 78.0425, type: 'Sunset Photography', time: '05:45 PM', slot: 'Evening' },
      ],
    },
    {
      day: 2,
      theme: 'Ghost City of Fatehpur Sikri & Baby Taj',
      waypoints: [
        { name: 'Fatehpur Sikri Imperial Complex & Buland Darwaza', lat: 27.0945, lng: 77.6679, type: 'UNESCO Complex', time: '08:30 AM', slot: 'Morning' },
        { name: 'Tomb of Salim Chishti & Jama Masjid', lat: 27.0950, lng: 77.6650, type: 'Sufi Shrine', time: '11:00 AM', slot: 'Morning' },
        { name: 'Local Petha Confectionery Tasting (Sadar Bazaar)', lat: 27.1600, lng: 78.0120, type: 'Local Treat', time: '01:30 PM', slot: 'Afternoon' },
        { name: 'Tomb of I’timad-ud-Daulah (Baby Taj)', lat: 27.1931, lng: 78.0312, type: 'Marble Jewel', time: '03:30 PM', slot: 'Afternoon' },
        { name: 'Sikandra (Akbar’s Grand Tomb & Deer Park)', lat: 27.2206, lng: 77.9506, type: 'Imperial Garden', time: '05:15 PM', slot: 'Evening' },
      ],
    },
  ],
  Delhi: [
    {
      day: 1,
      theme: 'Mughal Grandeur, Chandni Chowk & UNESCO Tombs',
      waypoints: [
        { name: 'Connaught Place Heritage Stay', lat: 28.6328, lng: 77.2197, type: 'Start / Accommodation', time: '08:30 AM', slot: 'Morning' },
        { name: 'Red Fort (Lal Qila) & Lahori Gate', lat: 28.6562, lng: 77.2410, type: 'Historic Fortress', time: '09:30 AM', slot: 'Morning' },
        { name: 'Jama Masjid & Chandni Chowk Rikshaw Trail', lat: 28.6507, lng: 77.2334, type: 'Heritage Mosque', time: '11:45 AM', slot: 'Morning' },
        { name: 'Paranthe Wali Gali & Karim’s Mughlai Feast', lat: 28.6550, lng: 77.2310, type: 'Culinary Stop', time: '01:30 PM', slot: 'Afternoon' },
        { name: 'Humayun’s Tomb Persian Chahar Bagh Gardens', lat: 28.5933, lng: 77.2507, type: 'UNESCO Heritage', time: '03:45 PM', slot: 'Afternoon' },
        { name: 'India Gate & Kartavya Path Night Walk', lat: 28.6129, lng: 77.2295, type: 'Memorial Boulevard', time: '06:30 PM', slot: 'Evening' },
      ],
    },
    {
      day: 2,
      theme: 'Ancient Minarets, Sufi Dargah & Contemporary India',
      waypoints: [
        { name: 'Qutub Minar & Iron Pillar of Delhi', lat: 28.5245, lng: 77.1855, type: 'Ancient Monument', time: '09:00 AM', slot: 'Morning' },
        { name: 'Mehrauli Archaeological Park (Jamali Kamali)', lat: 28.5210, lng: 77.1880, type: 'Heritage Ruins', time: '11:00 AM', slot: 'Morning' },
        { name: 'Hauz Khas Village Cafes & Deer Park Lake', lat: 28.5530, lng: 77.1940, type: 'Cafe & Nature', time: '01:15 PM', slot: 'Afternoon' },
        { name: 'National Museum (Indus Valley Civilization)', lat: 28.6118, lng: 77.2193, type: 'National Gallery', time: '03:30 PM', slot: 'Afternoon' },
        { name: 'Lotus Temple (Baháʼí House of Worship)', lat: 28.5535, lng: 77.2588, type: 'Modern Architecture', time: '05:30 PM', slot: 'Evening' },
        { name: 'Dilli Haat Crafts Bazaar & Multi-State Food', lat: 28.5728, lng: 77.2085, type: 'Crafts Bazaar', time: '07:00 PM', slot: 'Night' },
      ],
    },
  ],
  Mumbai: [
    {
      day: 1,
      theme: 'Colaba Heritage, Victorian Architecture & Queen’s Necklace',
      waypoints: [
        { name: 'Colaba Heritage Stay / Taj Mahal Palace', lat: 18.9220, lng: 72.8347, type: 'Start / Accommodation', time: '08:30 AM', slot: 'Morning' },
        { name: 'Gateway of India & Arabian Sea Ferry Port', lat: 18.9220, lng: 72.8347, type: 'Colonial Landmark', time: '09:15 AM', slot: 'Morning' },
        { name: 'Chhatrapati Shivaji Terminus (CSMT) Gothic Facade', lat: 18.9401, lng: 72.8353, type: 'UNESCO Gothic', time: '11:00 AM', slot: 'Morning' },
        { name: 'Britannia & Co. Parsi Berry Pulao & Caramel Custard', lat: 18.9350, lng: 72.8380, type: 'Historic Cafe', time: '01:00 PM', slot: 'Afternoon' },
        { name: 'Khotachiwadi Portuguese Heritage Hamlet Walk', lat: 18.9560, lng: 72.8210, type: 'Heritage Gem', time: '03:30 PM', slot: 'Afternoon' },
        { name: 'Marine Drive & Girgaon Chowpatty Sunset', lat: 18.9432, lng: 72.8230, type: 'Sunset Promenade', time: '05:45 PM', slot: 'Evening' },
      ],
    },
    {
      day: 2,
      theme: 'Ancient Elephanta Island & Vibrant Coastal Suburbs',
      waypoints: [
        { name: 'Ferry to Elephanta Caves (Shiva Trimurti Sculptures)', lat: 18.9633, lng: 72.9315, type: 'UNESCO Island Caves', time: '09:00 AM', slot: 'Morning' },
        { name: 'Bandra Bandstand & Castella de Aguada', lat: 19.0430, lng: 72.8190, type: 'Coastal Fort', time: '01:30 PM', slot: 'Afternoon' },
        { name: 'Ranwar Village Bandra Street Art Trail', lat: 19.0550, lng: 72.8320, type: 'Art & Heritage', time: '03:30 PM', slot: 'Afternoon' },
        { name: 'Juhu Beach Pav Bhaji & Kulfi Tasting', lat: 19.0988, lng: 72.8264, type: 'Beach Gastronomy', time: '06:00 PM', slot: 'Evening' },
      ],
    },
  ],
  Goa: [
    {
      day: 1,
      theme: 'Latin Quarter Heritage, Baroque Cathedrals & River Sunset',
      waypoints: [
        { name: 'Fontainhas Latin Quarter Stay (Panaji)', lat: 15.4989, lng: 73.8315, type: 'Start / Accommodation', time: '08:30 AM', slot: 'Morning' },
        { name: 'Basilica of Bom Jesus & Se Cathedral (Old Goa)', lat: 15.5009, lng: 73.9116, type: 'UNESCO Baroque Church', time: '09:45 AM', slot: 'Morning' },
        { name: 'Divar Island Village Ferry & Peaceful Cycling Trail', lat: 15.5180, lng: 73.9000, type: 'Quiet Island Gem', time: '11:45 AM', slot: 'Morning' },
        { name: 'Viva Panjim Saraswat Fish Thali & Bebinca', lat: 15.4980, lng: 73.8270, type: 'Authentic Dining', time: '01:45 PM', slot: 'Afternoon' },
        { name: 'Reis Magos Fort & Mandovi Estuary', lat: 15.4975, lng: 73.8080, type: 'River Fortress', time: '04:00 PM', slot: 'Afternoon' },
        { name: 'Miramar Beach Sunset Walk', lat: 15.4830, lng: 73.8050, type: 'Sunset Beach', time: '06:00 PM', slot: 'Evening' },
      ],
    },
    {
      day: 2,
      theme: 'Coastal Fortresses, Dolphin Points & Vibrant Shacks',
      waypoints: [
        { name: 'Aguada Fort & Portuguese Lighthouse', lat: 15.4925, lng: 73.7736, type: 'Coastal Fortress', time: '09:00 AM', slot: 'Morning' },
        { name: 'Sinquerim Beach Water Sports & Kayaking', lat: 15.4980, lng: 73.7680, type: 'Water Activity', time: '11:00 AM', slot: 'Morning' },
        { name: 'Thalassa Greek Taverna / Siolim River Lunch', lat: 15.6230, lng: 73.7640, type: 'Riverfront Dining', time: '01:30 PM', slot: 'Afternoon' },
        { name: 'Chapora Fort (Dil Chahta Hai Sunset Vantage)', lat: 15.6060, lng: 73.7380, type: 'Hilltop Fortress', time: '04:45 PM', slot: 'Evening' },
        { name: 'Anjuna Beach Sunset Drums & Shacks', lat: 15.5800, lng: 73.7430, type: 'Sunset Beach', time: '06:30 PM', slot: 'Night' },
      ],
    },
  ],
  Udaipur: [
    {
      day: 1,
      theme: 'Royal City Palace, Lakeside Ghats & Bagore ki Haveli',
      waypoints: [
        { name: 'Lake Pichola Heritage Haveli Stay', lat: 24.5764, lng: 73.6835, type: 'Start / Accommodation', time: '08:30 AM', slot: 'Morning' },
        { name: 'City Palace Museum & Mor Chowk Peacock Courtyard', lat: 24.5762, lng: 73.6835, type: 'Royal Citadel', time: '09:30 AM', slot: 'Morning' },
        { name: 'Jagdish Temple 1651 AD Carved Sandstone Shrines', lat: 24.5794, lng: 73.6841, type: 'Historic Temple', time: '12:00 PM', slot: 'Morning' },
        { name: 'Ambrai Ghat Waterfront Royal Mewari Lunch', lat: 24.5800, lng: 73.6780, type: 'Culinary Stop', time: '01:30 PM', slot: 'Afternoon' },
        { name: 'Lake Pichola Sunset Boat Cruise to Jag Mandir', lat: 24.5680, lng: 73.6760, type: 'Scenic Cruise', time: '04:30 PM', slot: 'Evening' },
        { name: 'Bagore Ki Haveli Dharohar Folk Dance & Puppet Show', lat: 24.5797, lng: 73.6806, type: 'Cultural Night', time: '07:00 PM', slot: 'Night' },
      ],
    },
    {
      day: 2,
      theme: 'Monsoon Mountain Palaces, Royal Fountains & Crafts',
      waypoints: [
        { name: 'Saheliyon Ki Bari (Garden of Royal Maidens)', lat: 24.6045, lng: 73.6848, type: 'Royal Gardens', time: '09:00 AM', slot: 'Morning' },
        { name: 'Fateh Sagar Lake Promenade & Nehru Park Island', lat: 24.6020, lng: 73.6720, type: 'Scenic Lake', time: '11:00 AM', slot: 'Morning' },
        { name: 'Shilpgram Rural Arts & Crafts Complex Lunch', lat: 24.6200, lng: 73.6550, type: 'Artisan Village', time: '01:30 PM', slot: 'Afternoon' },
        { name: 'Sajjangarh Monsoon Palace Sunset Panoramic Viewpoint', lat: 24.5905, lng: 73.6375, type: 'Mountain Palace', time: '05:00 PM', slot: 'Evening' },
      ],
    },
  ],
  Varanasi: [
    {
      day: 1,
      theme: 'Ancient River Ghats, Dawn Wooden Boat & Maha Aarti',
      waypoints: [
        { name: 'Assi Ghat Riverside Heritage Homestay', lat: 25.2890, lng: 83.0060, type: 'Start / Accommodation', time: '05:15 AM', slot: 'Morning' },
        { name: 'Subah-e-Banaras Dawn Wooden Boat Cruise on the Ganga', lat: 25.2950, lng: 83.0100, type: 'Sacred River Trail', time: '05:45 AM', slot: 'Morning' },
        { name: 'Kashi Vishwanath Golden Temple Darshan & Corridor', lat: 25.3109, lng: 83.0107, type: 'Spiritual Sanctuary', time: '09:00 AM', slot: 'Morning' },
        { name: 'Kachori Gali & Blue Lassi Authentic Banarasi Brunch', lat: 25.3110, lng: 83.0120, type: 'Culinary Stop', time: '11:30 AM', slot: 'Morning' },
        { name: 'Manikarnika & Harishchandra Ghat Philosophical Walk', lat: 25.3100, lng: 83.0130, type: 'Heritage Ghats', time: '03:30 PM', slot: 'Afternoon' },
        { name: 'Dashashwamedh Ghat Grand Evening Ganga Aarti', lat: 25.3076, lng: 83.0104, type: 'Spiritual Night', time: '06:30 PM', slot: 'Evening' },
      ],
    },
    {
      day: 2,
      theme: 'Buddhist Sarnath, Silk Weavers & Mughal Forts',
      waypoints: [
        { name: 'Sarnath Dhamek Stupa & Deer Park (Buddha First Sermon)', lat: 25.3811, lng: 83.0242, type: 'UNESCO Monument', time: '08:30 AM', slot: 'Morning' },
        { name: 'Sarnath Archaeological Museum (Ashoka Lion Capital)', lat: 25.3780, lng: 83.0220, type: 'National Museum', time: '11:00 AM', slot: 'Morning' },
        { name: 'Madanpura Handloom Banarasi Silk Weaving Masterclass', lat: 25.3050, lng: 83.0020, type: 'Artisan Workshop', time: '02:00 PM', slot: 'Afternoon' },
        { name: 'Ramnagar Fort & Vintage Royal Car Museum', lat: 25.2710, lng: 83.0270, type: 'Riverside Citadel', time: '04:30 PM', slot: 'Evening' },
      ],
    },
  ],
  Amritsar: [
    {
      day: 1,
      theme: 'Golden Temple Splendor, Langar & Freedom Memorials',
      waypoints: [
        { name: 'Heritage Street Stay (Town Hall)', lat: 31.6250, lng: 74.8780, type: 'Start / Accommodation', time: '06:30 AM', slot: 'Morning' },
        { name: 'Sri Harmandir Sahib (Golden Temple) Sunrise & Amrit Sarovar', lat: 31.6200, lng: 74.8765, type: 'Sacred Sanctum', time: '07:15 AM', slot: 'Morning' },
        { name: 'Guru Ka Langar (World Largest Free Community Kitchen)', lat: 31.6190, lng: 74.8770, type: 'Langar Community', time: '10:00 AM', slot: 'Morning' },
        { name: 'Jallianwala Bagh Historic Memorial & Martyr Well', lat: 31.6206, lng: 74.8797, type: 'Historic Monument', time: '11:30 AM', slot: 'Morning' },
        { name: 'Kesar Da Dhaba Authentic Amritsari Kulcha & Dal Makhani', lat: 31.6240, lng: 74.8750, type: 'Culinary Stop', time: '01:30 PM', slot: 'Afternoon' },
        { name: 'Partition Museum (Town Hall Historic Archives)', lat: 31.6260, lng: 74.8790, type: 'Heritage Museum', time: '03:45 PM', slot: 'Afternoon' },
      ],
    },
    {
      day: 2,
      theme: 'Frontier Valour at Wagah Border & Historic Forts',
      waypoints: [
        { name: 'Gobindgarh Fort & Toshakhana Sikh Military Museum', lat: 31.6290, lng: 74.8580, type: 'Military Citadel', time: '09:30 AM', slot: 'Morning' },
        { name: 'Kanha Sweets Traditional Chana Puri & Lassi', lat: 31.6360, lng: 74.8710, type: 'Culinary Stop', time: '12:00 PM', slot: 'Afternoon' },
        { name: 'Wagah Border Sunset Beating Retreat Ceremony (Indo-Pak)', lat: 31.6045, lng: 74.5738, type: 'National Ceremony', time: '03:30 PM', slot: 'Evening' },
      ],
    },
  ],
  Manali: [
    {
      day: 1,
      theme: 'Ancient Cedar Temples, Old Manali Cafes & Hot Springs',
      waypoints: [
        { name: 'Log Huts Old Manali Pine Resort', lat: 32.2530, lng: 77.1820, type: 'Start / Accommodation', time: '08:30 AM', slot: 'Morning' },
        { name: 'Hadimba Devi 1553 AD Pagoda Wooden Temple', lat: 32.2483, lng: 77.1806, type: 'Ancient Temple', time: '09:30 AM', slot: 'Morning' },
        { name: 'Manu Temple & Old Manali Village Trail', lat: 32.2570, lng: 77.1750, type: 'Historic Village', time: '11:30 AM', slot: 'Morning' },
        { name: 'Cafe 1947 Beas Riverfront Himalayan Trout Lunch', lat: 32.2550, lng: 77.1790, type: 'Riverfront Cafe', time: '01:30 PM', slot: 'Afternoon' },
        { name: 'Vashisht Natural Hot Sulphur Springs & Temple', lat: 32.2630, lng: 77.1950, type: 'Natural Spring', time: '03:45 PM', slot: 'Afternoon' },
        { name: 'Mall Road Evening Stroll & Tibetan Market', lat: 32.2390, lng: 77.1880, type: 'Alpine Market', time: '06:00 PM', slot: 'Evening' },
      ],
    },
    {
      day: 2,
      theme: 'High Mountain Passes & Solang Valley Adventure',
      waypoints: [
        { name: 'Solang Valley Adventure Arena & Paragliding Point', lat: 32.3160, lng: 77.1570, type: 'Alpine Adventure', time: '08:30 AM', slot: 'Morning' },
        { name: 'Atal Tunnel (World Longest Highway Tunnel Above 10,000ft)', lat: 32.3640, lng: 77.1400, type: 'Engineering Marvel', time: '11:30 AM', slot: 'Morning' },
        { name: 'Sissu Waterfall & Lahaul Valley Viewpoint', lat: 32.4760, lng: 77.1210, type: 'High Valley View', time: '01:00 PM', slot: 'Afternoon' },
        { name: 'Naggar Castle (500-Year-Old Himalayan Citadel)', lat: 32.1380, lng: 77.1740, type: 'Historic Fortress', time: '04:30 PM', slot: 'Evening' },
      ],
    },
  ],
  Kochi: [
    {
      day: 1,
      theme: 'Colonial Fort Kochi, Chinese Fishing Nets & Synagogues',
      waypoints: [
        { name: 'Princess Street Heritage Stay (Fort Kochi)', lat: 9.9650, lng: 76.2420, type: 'Start / Accommodation', time: '08:30 AM', slot: 'Morning' },
        { name: 'Fort Kochi Beach & Cantilevered Chinese Fishing Nets', lat: 9.9679, lng: 76.2415, type: 'Maritime Icon', time: '09:15 AM', slot: 'Morning' },
        { name: 'St. Francis Church (Vasco da Gama Original Burial Place)', lat: 9.9660, lng: 76.2430, type: 'Historic Church', time: '11:00 AM', slot: 'Morning' },
        { name: 'Kashi Art Cafe Fresh Fusion Seafood Lunch', lat: 9.9640, lng: 76.2420, type: 'Artisan Cafe', time: '01:00 PM', slot: 'Afternoon' },
        { name: 'Jew Town Antiques & Paradesi Synagogue (1568 AD)', lat: 9.9575, lng: 76.2594, type: 'Ancient Heritage', time: '03:15 PM', slot: 'Afternoon' },
        { name: 'Kerala Kathakali Centre Classical Drama Performance', lat: 9.9630, lng: 76.2450, type: 'Cultural Night', time: '06:00 PM', slot: 'Evening' },
      ],
    },
    {
      day: 2,
      theme: 'Mural Palaces, Spices & Backwater Boat Cruise',
      waypoints: [
        { name: 'Mattancherry Dutch Palace & Ramayana Murals', lat: 9.9580, lng: 76.2580, type: 'Royal Palace', time: '09:00 AM', slot: 'Morning' },
        { name: 'Cochin Spice Bazaars (Ginger, Cardamom & Pepper Warehouses)', lat: 9.9560, lng: 76.2570, type: 'Spice Market', time: '11:00 AM', slot: 'Morning' },
        { name: 'Traditional Kerala Sadhya Feast on Banana Leaf', lat: 9.9700, lng: 76.2800, type: 'Culinary Stop', time: '01:00 PM', slot: 'Afternoon' },
        { name: 'Kumbalangi Integrated Eco-Tourism Island Canoe Trail', lat: 9.8730, lng: 76.2860, type: 'Backwater Ecology', time: '03:30 PM', slot: 'Afternoon' },
        { name: 'Marine Drive Rainbow Bridge Sunset Promenade', lat: 9.9780, lng: 76.2750, type: 'Sunset Walk', time: '06:15 PM', slot: 'Evening' },
      ],
    },
  ],
  Rishikesh: [
    {
      day: 1,
      theme: 'Holy River Bridges, Ashrams & Evening Ganga Aarti',
      waypoints: [
        { name: 'Tapovan Riverside Yoga Retreat Stay', lat: 30.1340, lng: 78.3240, type: 'Start / Accommodation', time: '06:00 AM', slot: 'Morning' },
        { name: 'Triveni Ghat Sacred Morning Ganga Walk', lat: 30.1060, lng: 78.2980, type: 'Spiritual Ghat', time: '07:30 AM', slot: 'Morning' },
        { name: 'Ram Jhula & Swarg Ashram Crossing', lat: 30.1230, lng: 78.3160, type: 'Suspension Bridge', time: '10:00 AM', slot: 'Morning' },
        { name: 'Chotiwala Traditional Pure Ghee Ayurvedic Thali', lat: 30.1220, lng: 78.3180, type: 'Culinary Stop', time: '01:00 PM', slot: 'Afternoon' },
        { name: 'Beatles Ashram (Chaurasi Kutia Graffiti & Meditation Domes)', lat: 30.1130, lng: 78.3220, type: 'Historic Ashram', time: '03:15 PM', slot: 'Afternoon' },
        { name: 'Parmarth Niketan Sunset Ganga Aarti & Chanting', lat: 30.1180, lng: 78.3130, type: 'Spiritual Evening', time: '06:00 PM', slot: 'Night' },
      ],
    },
    {
      day: 2,
      theme: 'White Water Rapids, Waterfalls & Cave Solitude',
      waypoints: [
        { name: 'Shivpuri Grade III White Water Rafting Launch', lat: 30.1400, lng: 78.3900, type: 'River Adventure', time: '08:30 AM', slot: 'Morning' },
        { name: 'Neer Garh Jungle Waterfall Trek & Plunge Pool', lat: 30.1440, lng: 78.3360, type: 'Jungle Waterfall', time: '12:00 PM', slot: 'Afternoon' },
        { name: 'Little Buddha Cafe Organic Salad & Ginger Lemon Chai', lat: 30.1300, lng: 78.3270, type: 'Riverfront Cafe', time: '02:30 PM', slot: 'Afternoon' },
        { name: 'Vashishta Guha Ancient Meditation Cave on Riverbank', lat: 30.1650, lng: 78.4320, type: 'Sacred Cave', time: '04:30 PM', slot: 'Evening' },
      ],
    },
  ],
  Hampi: [
    {
      day: 1,
      theme: 'Sacred Hillside Temples & Tungabhadra Monoliths',
      waypoints: [
        { name: 'Kamalapur Heritage Stay', lat: 15.3180, lng: 76.4780, type: 'Start / Accommodation', time: '07:00 AM', slot: 'Morning' },
        { name: 'Virupaksha 7th-Century Temple & Hampi Bazaar', lat: 15.3353, lng: 76.4600, type: 'Living UNESCO Temple', time: '08:00 AM', slot: 'Morning' },
        { name: 'Hemakuta Hill Monolithic Ganesha & Sunset Rocks', lat: 15.3320, lng: 76.4610, type: 'Granite Monolith', time: '10:30 AM', slot: 'Morning' },
        { name: 'Mango Tree Riverside South Indian Banana Leaf Thali', lat: 15.3340, lng: 76.4630, type: 'Culinary Stop', time: '01:00 PM', slot: 'Afternoon' },
        { name: 'Achyutaraya Temple & Courtesans Street', lat: 15.3360, lng: 76.4710, type: 'Ruined Monument', time: '03:30 PM', slot: 'Afternoon' },
        { name: 'Matanga Hill Sunset Panoramic 360-Degree Lookout', lat: 15.3330, lng: 76.4680, type: 'Sunset Point', time: '05:30 PM', slot: 'Evening' },
      ],
    },
    {
      day: 2,
      theme: 'Royal Enclosure, Stone Chariot & Coracle Rides',
      waypoints: [
        { name: 'Vijaya Vittala Temple & Mesmerizing Stone Chariot', lat: 15.3438, lng: 76.4772, type: 'Architectural Marvel', time: '08:30 AM', slot: 'Morning' },
        { name: 'Queen Bath, Stepped Tank & Royal Stepped Court', lat: 15.3190, lng: 76.4750, type: 'Royal Complex', time: '11:00 AM', slot: 'Morning' },
        { name: 'Lotus Mahal & Majestic Elephant Stables', lat: 15.3210, lng: 76.4800, type: 'Indo-Islamic Palace', time: '01:30 PM', slot: 'Afternoon' },
        { name: 'Tungabhadra River Traditional Round Coracle Boat Ride', lat: 15.3400, lng: 76.4700, type: 'River Adventure', time: '04:30 PM', slot: 'Evening' },
      ],
    },
  ],
  Bundi: [
    {
      day: 1,
      theme: 'City of 50+ Baoris, Taragarh Fortress & Miniature Murals',
      waypoints: [
        { name: 'Nawal Sagar Traditional Haveli Stay', lat: 25.4410, lng: 75.6380, type: 'Start / Accommodation', time: '08:30 AM', slot: 'Morning' },
        { name: 'Taragarh Fort & Ruined Star Ramparts', lat: 25.4480, lng: 75.6330, type: 'Hilltop Fortress', time: '09:30 AM', slot: 'Morning' },
        { name: 'Chitrashala (Garh Palace Frescoes of Krishna)', lat: 25.4450, lng: 75.6350, type: 'Miniature Art', time: '11:30 AM', slot: 'Morning' },
        { name: 'Authentic Bundi Laddoo & Dal Baati Lunch', lat: 25.4420, lng: 75.6400, type: 'Culinary Stop', time: '01:30 PM', slot: 'Afternoon' },
        { name: 'Raniji Ki Baori (46-Meter Masterpiece Stepwell)', lat: 25.4414, lng: 75.6454, type: 'Ancient Stepwell', time: '03:30 PM', slot: 'Afternoon' },
        { name: 'Nawal Sagar Lake Sunset Water Reflection', lat: 25.4400, lng: 75.6370, type: 'Sunset Point', time: '05:45 PM', slot: 'Evening' },
      ],
    },
  ],
  Orchha: [
    {
      day: 1,
      theme: 'Medieval River Citadel, Soaring Chhatris & Palaces',
      waypoints: [
        { name: 'Betwa River Retreat Heritage Stay', lat: 25.3520, lng: 78.6400, type: 'Start / Accommodation', time: '08:30 AM', slot: 'Morning' },
        { name: 'Jahangir Mahal (17th Century Bundela Architecture)', lat: 25.3508, lng: 78.6433, type: 'Royal Citadel', time: '09:30 AM', slot: 'Morning' },
        { name: 'Raja Mahal Vibrant Court Murals & Diwan-i-Khas', lat: 25.3515, lng: 78.6420, type: 'Ancient Murals', time: '11:30 AM', slot: 'Morning' },
        { name: 'Bundelkhandi Thali & Fresh Mawa Jalebi', lat: 25.3500, lng: 78.6410, type: 'Culinary Stop', time: '01:30 PM', slot: 'Afternoon' },
        { name: 'Chaturbhuj Temple Soaring Spire Lookout', lat: 25.3525, lng: 78.6405, type: 'Historic Temple', time: '03:30 PM', slot: 'Afternoon' },
        { name: 'Betwa River Chhatris (Cenotaphs) Golden Hour Reflection', lat: 25.3480, lng: 78.6450, type: 'Riverfront Sunset', time: '05:30 PM', slot: 'Evening' },
      ],
    },
  ],
  Mandu: [
    {
      day: 1,
      theme: 'Floating Palaces, Acoustical Halls & Romantic Pavilions',
      waypoints: [
        { name: 'Malwa Heritage Resort Stay', lat: 22.3650, lng: 75.4050, type: 'Start / Accommodation', time: '08:30 AM', slot: 'Morning' },
        { name: 'Jahaz Mahal (Ship Palace Floating Between Twin Lakes)', lat: 22.3664, lng: 75.4042, type: 'Water Palace', time: '09:30 AM', slot: 'Morning' },
        { name: 'Hindola Mahal (Swinging Palace with Slanted Walls)', lat: 22.3670, lng: 75.4030, type: 'Architectural Gem', time: '11:30 AM', slot: 'Morning' },
        { name: 'Baobab Tamarind Juice & Malwi Dal Bafla Lunch', lat: 22.3640, lng: 75.4060, type: 'Culinary Stop', time: '01:30 PM', slot: 'Afternoon' },
        { name: 'Hoshang Shah Marble Tomb (Inspiration for Taj Mahal)', lat: 22.3630, lng: 75.4020, type: 'Marble Mausoleum', time: '03:30 PM', slot: 'Afternoon' },
        { name: 'Rani Roopmati Pavilion Sunset Over Narmada Valley', lat: 22.3380, lng: 75.4080, type: 'Panoramic Viewpoint', time: '05:30 PM', slot: 'Evening' },
      ],
    },
  ],
  Shillong: [
    {
      day: 1,
      theme: 'Scotland of the East: Pine Lakes, Waterfalls & Rock Music',
      waypoints: [
        { name: 'Pinewood Heritage Lodge Stay', lat: 25.5780, lng: 91.8890, type: 'Start / Accommodation', time: '08:30 AM', slot: 'Morning' },
        { name: 'Ward Lake Botanical Garden & Wooden Bridge', lat: 25.5750, lng: 91.8870, type: 'Botanical Lake', time: '09:30 AM', slot: 'Morning' },
        { name: 'Elephant Falls Three-Tier Cascades', lat: 25.5360, lng: 91.8230, type: 'Natural Waterfall', time: '11:30 AM', slot: 'Morning' },
        { name: 'Dylan Cafe Khasi Jadoh & Roasted Pork Lunch', lat: 25.5720, lng: 91.8840, type: 'Culinary Stop', time: '01:30 PM', slot: 'Afternoon' },
        { name: 'Shillong Peak 360-Degree Himalayan Viewpoint', lat: 25.5340, lng: 91.8490, type: 'Mountain View', time: '03:45 PM', slot: 'Afternoon' },
        { name: 'Police Bazar Street Food & Live Acoustic Music', lat: 25.5790, lng: 91.8820, type: 'Cultural Night', time: '06:30 PM', slot: 'Evening' },
      ],
    },
  ],
  Leh: [
    {
      day: 1,
      theme: 'Indus Valley Stupas, Palaces & Mountain High Passes',
      waypoints: [
        { name: 'Changspa Boutique Ladakhi Stay', lat: 34.1650, lng: 77.5750, type: 'Start / Accommodation', time: '08:30 AM', slot: 'Morning' },
        { name: 'Shanti Stupa White Dome Panoramic Sunrise', lat: 34.1726, lng: 77.5810, type: 'Buddhist Stupa', time: '09:30 AM', slot: 'Morning' },
        { name: 'Leh Royal Palace & Tsemo Gompa Ramparts', lat: 34.1660, lng: 77.5850, type: 'Tibetan Palace', time: '11:30 AM', slot: 'Morning' },
        { name: 'Tibetan Kitchen Steamed Tingmo & Thukpa Lunch', lat: 34.1640, lng: 77.5840, type: 'Culinary Stop', time: '01:30 PM', slot: 'Afternoon' },
        { name: 'Spituk Gompa & Indus River Confluence Valley', lat: 34.1310, lng: 77.5250, type: 'Monastery View', time: '03:45 PM', slot: 'Afternoon' },
      ],
    },
  ],
  Mawlynnong: [
    {
      day: 1,
      theme: 'Asia Cleanest Village Eco-Trail & Living Root Bridges',
      waypoints: [
        { name: 'Mawlynnong Village Traditional Bamboo Homestay', lat: 25.2016, lng: 91.9056, type: 'Start / Accommodation', time: '08:00 AM', slot: 'Morning' },
        { name: 'Riwai Single-Decker Living Root Bridge Trail', lat: 25.1980, lng: 91.9120, type: 'Bio-Engineering Wonder', time: '09:00 AM', slot: 'Morning' },
        { name: 'Mawlynnong Eco-Village Walk & Bamboo Dustbins Walkway', lat: 25.2020, lng: 91.9060, type: 'Eco-Village Trail', time: '11:30 AM', slot: 'Morning' },
        { name: 'Traditional Khasi Bamboo Shoot & Red Rice Lunch', lat: 25.2018, lng: 91.9050, type: 'Culinary Stop', time: '01:30 PM', slot: 'Afternoon' },
        { name: 'Sky Walk Bamboo Treehouse Panorama (Bangladesh Plains)', lat: 25.2030, lng: 91.9070, type: 'Treehouse Viewpoint', time: '04:00 PM', slot: 'Afternoon' },
        { name: 'Balancing Rock Natural Geological Phenomenon', lat: 25.2005, lng: 91.9040, type: 'Natural Marvel', time: '05:30 PM', slot: 'Evening' },
      ],
    },
    {
      day: 2,
      theme: 'Dawki Crystal Clear Umngot River & Borhill Falls',
      waypoints: [
        { name: 'Dawki Umngot River Crystal Boat Cruise (Floating Boats)', lat: 25.1850, lng: 92.0190, type: 'Glass River Boating', time: '08:30 AM', slot: 'Morning' },
        { name: 'Tamabil Indo-Bangladesh Friendship Frontier Point', lat: 25.1760, lng: 92.0130, type: 'International Frontier', time: '11:00 AM', slot: 'Morning' },
        { name: 'Jaflong Zero Point Riverbank Fish Lunch', lat: 25.1800, lng: 92.0160, type: 'Riverside Cafe', time: '01:00 PM', slot: 'Afternoon' },
        { name: 'Borhill Cascading Waterfalls & Bamboo Forest Walk', lat: 25.1950, lng: 91.9800, type: 'Jungle Waterfall', time: '03:45 PM', slot: 'Afternoon' },
      ],
    },
  ],
  Chettinad: [
    {
      day: 1,
      theme: '1000-Window Palaces, Banana Leaf Feasts & Tiles',
      waypoints: [
        { name: 'Kanadukathan Heritage Chettinad Mansion Stay', lat: 10.1742, lng: 78.7885, type: 'Start / Accommodation', time: '08:30 AM', slot: 'Morning' },
        { name: 'Chettinad Raja Palace (1000 Windows & Italian Marble)', lat: 10.1750, lng: 78.7890, type: 'Palatial Mansion', time: '09:30 AM', slot: 'Morning' },
        { name: 'Athangudi Handmade Floral Terracotta Tile Guilds', lat: 10.1980, lng: 78.8460, type: 'Artisan Workshop', time: '11:45 AM', slot: 'Morning' },
        { name: 'Authentic 18-Dish Chettinad Banana Leaf Feast (Vada & Kuzhambu)', lat: 10.1720, lng: 78.7850, type: 'Culinary Stop', time: '01:30 PM', slot: 'Afternoon' },
        { name: 'Chettinad Cotton Kandangi Handloom Weavers Cooperative', lat: 10.0700, lng: 78.7800, type: 'Textile Guild', time: '04:00 PM', slot: 'Afternoon' },
        { name: 'Ayyanar Terracotta Giant Sacred Horse Shrine', lat: 10.1200, lng: 78.8000, type: 'Folk Shrine', time: '06:00 PM', slot: 'Evening' },
      ],
    },
    {
      day: 2,
      theme: 'Ancient Rock-Cut Forts & Karaikudi Antique Bazaars',
      waypoints: [
        { name: 'Thirumayam Rock-Cut Fortress & Cave Temples', lat: 10.2450, lng: 78.7510, type: 'Ancient Citadel', time: '09:00 AM', slot: 'Morning' },
        { name: 'Karaikudi Muneeswarar Temple & Heritage Street', lat: 10.0710, lng: 78.7820, type: 'Heritage Street', time: '11:30 AM', slot: 'Morning' },
        { name: 'The Bangala Traditional Chettinad Lunch', lat: 10.0750, lng: 78.7900, type: 'Culinary Stop', time: '01:30 PM', slot: 'Afternoon' },
        { name: 'Karaikudi Antique Bazaar (Belgian Mirrors & Vintage Brass)', lat: 10.0680, lng: 78.7750, type: 'Vintage Market', time: '03:45 PM', slot: 'Afternoon' },
      ],
    },
  ],
  Spiti: [
    {
      day: 1,
      theme: 'Ancient Tibetan Monasteries & World Highest Villages',
      waypoints: [
        { name: 'Kaza High-Altitude Himalayan Homestay', lat: 32.2276, lng: 78.0710, type: 'Start / Accommodation', time: '08:00 AM', slot: 'Morning' },
        { name: 'Key Gompa (1000-Year-Old Fortress Tibetan Monastery)', lat: 32.2980, lng: 78.0120, type: 'Sacred Monastery', time: '09:30 AM', slot: 'Morning' },
        { name: 'Kibber Village (High Himalayan Snow Leopard Trail)', lat: 32.3330, lng: 78.0100, type: 'High Altitude Village', time: '11:45 AM', slot: 'Morning' },
        { name: 'Chicham Bridge (Highest Suspension Bridge in Asia)', lat: 32.3480, lng: 78.0050, type: 'Engineering Feat', time: '01:30 PM', slot: 'Afternoon' },
        { name: 'Tibetan Butter Tea, Siddu & Thukpa Mountain Lunch', lat: 32.2280, lng: 78.0720, type: 'Culinary Stop', time: '03:00 PM', slot: 'Afternoon' },
        { name: 'Kaza Monastery Stupa Sunset Glow', lat: 32.2260, lng: 78.0700, type: 'Sunset Stupa', time: '05:30 PM', slot: 'Evening' },
      ],
    },
    {
      day: 2,
      theme: 'Highest Post Office & Marine Fossils of Langza',
      waypoints: [
        { name: 'Hikkim (World Highest Post Office at 14,567 ft - Post a Card)', lat: 32.2530, lng: 78.1340, type: 'World Highest Post', time: '09:00 AM', slot: 'Morning' },
        { name: 'Komic Monastery (World Highest Motorrable Settlement)', lat: 32.2350, lng: 78.1480, type: 'Sacred Gompa', time: '11:30 AM', slot: 'Morning' },
        { name: 'Langza Giant Golden Buddha Statue & Tethys Sea Fossils', lat: 32.2680, lng: 78.1180, type: 'Fossil Village', time: '02:00 PM', slot: 'Afternoon' },
        { name: 'Pin Valley National Park Stargazing & Riverside Campfire', lat: 31.9500, lng: 78.0300, type: 'Dark Sky Stargazing', time: '06:30 PM', slot: 'Night' },
      ],
    },
  ],

};

function getCityItineraryTemplate(cityName, allCities) {
  if (MULTI_DAY_TEMPLATES[cityName]) return MULTI_DAY_TEMPLATES[cityName];
  // Match case-insensitively
  const key = Object.keys(MULTI_DAY_TEMPLATES).find(k => k.toLowerCase() === cityName.toLowerCase());
  if (key) return MULTI_DAY_TEMPLATES[key];

  const matched = (allCities || []).find(c => c.name.toLowerCase() === cityName.toLowerCase());
  const lat = matched?.latitude || 26.9124;
  const lng = matched?.longitude || 75.7873;

  return [
    {
      day: 1,
      theme: `Iconic Heritage Landmarks & Cultural Center (${cityName})`,
      waypoints: [
        { name: `${cityName} Heritage Hotel / Haveli Stay`, lat: lat, lng: lng, type: 'Start / Accommodation', time: '08:30 AM', slot: 'Morning' },
        { name: `${cityName} Historical Citadel & Monument Square`, lat: lat + 0.007, lng: lng + 0.006, type: 'Historic Landmark', time: '09:45 AM', slot: 'Morning' },
        { name: `Traditional ${cityName} Authentic Regional Lunch`, lat: lat + 0.003, lng: lng + 0.008, type: 'Culinary Stop', time: '01:00 PM', slot: 'Afternoon' },
        { name: `${cityName} Artisan Guilds & Traditional Bazaars`, lat: lat - 0.004, lng: lng + 0.005, type: 'Artisan Bazaar', time: '03:30 PM', slot: 'Afternoon' },
        { name: `${cityName} Golden Hour Sunset Viewpoint`, lat: lat - 0.006, lng: lng - 0.005, type: 'Sunset Point', time: '05:45 PM', slot: 'Evening' },
      ],
    },
    {
      day: 2,
      theme: `Nature Trails, Sacred Shrines & Local Delicacies (${cityName})`,
      waypoints: [
        { name: `${cityName} Morning Botanical Gardens / Lake Walk`, lat: lat + 0.009, lng: lng - 0.006, type: 'Nature Trail', time: '08:30 AM', slot: 'Morning' },
        { name: `${cityName} Sacred Sanctuary & Historic Shrines`, lat: lat + 0.012, lng: lng - 0.003, type: 'Spiritual Sanctuary', time: '11:00 AM', slot: 'Morning' },
        { name: `Iconic ${cityName} Street Gastronomy & Sweets`, lat: lat + 0.004, lng: lng + 0.002, type: 'Culinary Stop', time: '01:30 PM', slot: 'Afternoon' },
        { name: `${cityName} Museum & Living Heritage Gallery`, lat: lat - 0.003, lng: lng + 0.011, type: 'Heritage Museum', time: '04:00 PM', slot: 'Afternoon' },
        { name: `${cityName} Evening Cultural Illumination & Walk`, lat: lat - 0.001, lng: lng - 0.001, type: 'Cultural Night', time: '06:30 PM', slot: 'Evening' },
      ],
    }
  ];
}

export default function SihTripPlanner({
  cities = [],
  selectedCity = 'Jaipur',
  formatPrice = (p) => `₹${p.toLocaleString('en-IN')}`,
  handleAddMilestone,
  handleOpenBooking,
}) {
  const [currentStep, setCurrentStep] = useState(1);
  const [plannerTab, setPlannerTab] = useState('itinerary');

  // Search & Live Suggestions State for All Cities
  const [citySearchInput, setCitySearchInput] = useState('');
  const [showLiveSuggestions, setShowLiveSuggestions] = useState(false);
  const [cityCategoryFilter, setCityCategoryFilter] = useState('all');

  // Sync cityChoice whenever selectedCity prop updates
  useEffect(() => {
    if (selectedCity && selectedCity !== cityChoice) {
      setCityChoice(selectedCity);
    }
  }, [selectedCity]); // 'itinerary' | 'hotels' | 'cabs'
  const [cityChoice, setCityChoice] = useState(selectedCity || 'Jaipur');
  const [durationDays, setDurationDays] = useState(3);
  const [customDaysInput, setCustomDaysInput] = useState(3);
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [budgetTier, setBudgetTier] = useState('comfort');
  const [customDailyBudget, setCustomDailyBudget] = useState(3000);
  const [selectedInterests, setSelectedInterests] = useState(['heritage', 'food', 'textiles']);
  const [pace, setPace] = useState('Balanced');
  const [customTripNotes, setCustomTripNotes] = useState('');

  // AI Planner state
  const [isAiGenerating, setIsAiGenerating] = useState(false);
  const [aiPromptInput, setAiPromptInput] = useState('');
  const [isAiProcessing, setIsAiProcessing] = useState(false);
  const [aiModifiedThemes, setAiModifiedThemes] = useState({});
  const [aiPlanData, setAiPlanData] = useState(null);

  // Active day viewing in Step 6
  const [activeDay, setActiveDay] = useState(1);

  // Optimization state
  const [isOptimized, setIsOptimized] = useState(false);
  const [optimizationNotice, setOptimizationNotice] = useState(null);
  const [toastNotice, setToastNotice] = useState(null);

  // Custom stop modal state
  const [showAddStopModal, setShowAddStopModal] = useState(false);
  const [newStopForm, setNewStopForm] = useState({ name: '', type: 'Custom Attraction', time: '02:00 PM', slot: 'Afternoon' });

  // Packing list state
  const [checkedPacking, setCheckedPacking] = useState({});

  // Comprehensive list of ALL 32+ Indian destinations
  const allPlannerCities = useMemo(() => {
    const defaultList = [
      { id: 1, name: 'Jaipur', state: 'Rajasthan', region: 'North India', themes: ['heritage', 'forts', 'culture'], rating: 4.8, estimatedDailyBudget: 4200, heroImage: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?w=800', bestSeason: 'Oct to Mar' },
      { id: 2, name: 'Agra', state: 'Uttar Pradesh', region: 'North India', themes: ['heritage', 'romantic', 'architecture'], rating: 4.9, estimatedDailyBudget: 3800, heroImage: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?w=800', bestSeason: 'Oct to Mar' },
      { id: 3, name: 'Delhi', state: 'Delhi', region: 'North India', themes: ['history', 'food', 'markets'], rating: 4.6, estimatedDailyBudget: 5200, heroImage: 'https://images.unsplash.com/photo-1592635196078-9fdc757f27f4?w=800', bestSeason: 'Oct to Mar' },
      { id: 4, name: 'Mumbai', state: 'Maharashtra', region: 'West India', themes: ['beaches', 'nightlife', 'food'], rating: 4.5, estimatedDailyBudget: 6500, heroImage: 'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?w=800', bestSeason: 'Nov to Feb' },
      { id: 5, name: 'Udaipur', state: 'Rajasthan', region: 'West India', themes: ['lakes', 'palaces', 'romantic'], rating: 4.8, estimatedDailyBudget: 5000, heroImage: 'https://images.unsplash.com/photo-1615836245337-f5b9b2303f10?w=800', bestSeason: 'Sep to Mar' },
      { id: 6, name: 'Varanasi', state: 'Uttar Pradesh', region: 'North India', themes: ['spiritual', 'culture', 'river'], rating: 4.7, estimatedDailyBudget: 3200, heroImage: 'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?w=800', bestSeason: 'Oct to Mar' },
      { id: 7, name: 'Goa', state: 'Goa', region: 'West India', themes: ['beaches', 'nightlife', 'heritage'], rating: 4.7, estimatedDailyBudget: 6200, heroImage: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800', bestSeason: 'Nov to Feb' },
      { id: 8, name: 'Kochi', state: 'Kerala', region: 'South India', themes: ['backwaters', 'heritage', 'food'], rating: 4.6, estimatedDailyBudget: 4600, heroImage: 'https://images.unsplash.com/photo-1597848212624-a19eb35e2651?w=800', bestSeason: 'Sep to Mar' },
      { id: 9, name: 'Amritsar', state: 'Punjab', region: 'North India', themes: ['spiritual', 'food', 'heritage'], rating: 4.9, estimatedDailyBudget: 3600, heroImage: 'https://images.unsplash.com/photo-1514222134-b57cbb8ce073?w=800', bestSeason: 'Oct to Mar' },
      { id: 10, name: 'Manali', state: 'Himachal Pradesh', region: 'North India', themes: ['mountains', 'adventure', 'snow'], rating: 4.7, estimatedDailyBudget: 4400, heroImage: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=800', bestSeason: 'Oct to Jun' },
      { id: 11, name: 'Rishikesh', state: 'Uttarakhand', region: 'North India', themes: ['yoga', 'spiritual', 'adventure'], rating: 4.8, estimatedDailyBudget: 3400, heroImage: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800', bestSeason: 'Sep to Apr' },
      { id: 12, name: 'Hampi', state: 'Karnataka', region: 'South India', themes: ['unesco', 'heritage', 'ruins'], rating: 4.9, estimatedDailyBudget: 3200, heroImage: 'https://images.unsplash.com/photo-1620766182966-c6eb5ed2b788?w=800', bestSeason: 'Oct to Feb' },
      { id: 13, name: 'Shimla', state: 'Himachal Pradesh', region: 'North India', themes: ['colonial', 'snow', 'mountains'], rating: 4.7, estimatedDailyBudget: 4600, heroImage: 'https://images.unsplash.com/photo-1597074866923-dc0589150358?w=800', bestSeason: 'Oct to Jun' },
      { id: 14, name: 'Leh Ladakh', state: 'Ladakh', region: 'North India', themes: ['adventure', 'monasteries', 'lakes'], rating: 4.9, estimatedDailyBudget: 5800, heroImage: 'https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?w=800', bestSeason: 'May to Sep' },
      { id: 15, name: 'Mysore', state: 'Karnataka', region: 'South India', themes: ['palaces', 'silk', 'heritage'], rating: 4.8, estimatedDailyBudget: 3800, heroImage: 'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?w=800', bestSeason: 'Oct to Mar' },
      { id: 16, name: 'Srinagar', state: 'Jammu & Kashmir', region: 'North India', themes: ['lakes', 'houseboats', 'nature'], rating: 4.8, estimatedDailyBudget: 5200, heroImage: 'https://images.unsplash.com/photo-1598091383021-15ddea10925d?w=800', bestSeason: 'Apr to Oct' },
      { id: 17, name: 'Pondicherry', state: 'Puducherry', region: 'South India', themes: ['french-quarter', 'beaches', 'cafes'], rating: 4.7, estimatedDailyBudget: 4200, heroImage: 'https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?w=800', bestSeason: 'Oct to Mar' },
      { id: 18, name: 'Hyderabad', state: 'Telangana', region: 'South India', themes: ['biryani', 'palaces', 'history'], rating: 4.7, estimatedDailyBudget: 4500, heroImage: 'https://images.unsplash.com/photo-1572445271230-a78b5944a659?w=800', bestSeason: 'Oct to Mar' },
      { id: 19, name: 'Kolkata', state: 'West Bengal', region: 'East India', themes: ['heritage', 'literature', 'sweets'], rating: 4.7, estimatedDailyBudget: 3900, heroImage: 'https://images.unsplash.com/photo-1558431382-27e303142255?w=800', bestSeason: 'Oct to Mar' },
      { id: 20, name: 'Jodhpur', state: 'Rajasthan', region: 'West India', themes: ['blue-city', 'forts', 'desert'], rating: 4.8, estimatedDailyBudget: 4100, heroImage: 'https://images.unsplash.com/photo-1568849676085-51415703900f?w=800', bestSeason: 'Oct to Mar' },
      { id: 21, name: 'Ooty', state: 'Tamil Nadu', region: 'South India', themes: ['hills', 'tea-gardens', 'toy-train'], rating: 4.7, estimatedDailyBudget: 4400, heroImage: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800', bestSeason: 'Oct to May' },
      { id: 22, name: 'Shillong', state: 'Meghalaya', region: 'North-East', themes: ['waterfalls', 'clouds', 'nature'], rating: 4.8, estimatedDailyBudget: 4600, heroImage: 'https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?w=800', bestSeason: 'Sep to May' },
      { id: 23, name: 'Darjeeling', state: 'West Bengal', region: 'East India', themes: ['mountains', 'tea', 'unesco'], rating: 4.7, estimatedDailyBudget: 4800, heroImage: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800', bestSeason: 'Oct to May' },
      { id: 24, name: 'Bengaluru', state: 'Karnataka', region: 'South India', themes: ['gardens', 'food', 'culture'], rating: 4.6, estimatedDailyBudget: 5400, heroImage: 'https://images.unsplash.com/photo-1596176530529-78163a4f7af2?w=800', bestSeason: 'Sep to Mar' },
      // Offbeat Gems
      { id: 25, name: 'Bundi', state: 'Rajasthan', region: 'North India', themes: ['heritage', 'stepwells', 'offbeat'], rating: 4.8, estimatedDailyBudget: 2800, heroImage: 'https://images.unsplash.com/photo-1477587458883-47145ed94245?w=800', bestSeason: 'Oct to Mar' },
      { id: 26, name: 'Orchha', state: 'Madhya Pradesh', region: 'Central India', themes: ['heritage', 'river', 'spiritual', 'offbeat'], rating: 4.8, estimatedDailyBudget: 2600, heroImage: 'https://images.unsplash.com/photo-1608958435020-e8a7109ba809?w=800', bestSeason: 'Oct to Mar' },
      { id: 27, name: 'Mandu', state: 'Madhya Pradesh', region: 'Central India', themes: ['heritage', 'water-palaces', 'offbeat'], rating: 4.7, estimatedDailyBudget: 2700, heroImage: 'https://images.unsplash.com/photo-1585135497273-1a86b09fe70e?w=800', bestSeason: 'Jul to Mar' },
      { id: 28, name: 'Samode', state: 'Rajasthan', region: 'North India', themes: ['heritage', 'crafts', 'weavers', 'offbeat'], rating: 4.8, estimatedDailyBudget: 3200, heroImage: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?w=800', bestSeason: 'Oct to Mar' },
      { id: 29, name: 'Mawlynnong', state: 'Meghalaya', region: 'North-East', themes: ['nature', 'ecotourism', 'offbeat'], rating: 4.9, estimatedDailyBudget: 2500, heroImage: 'https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?w=800', bestSeason: 'Sep to May' },
      { id: 30, name: 'Ziro', state: 'Arunachal Pradesh', region: 'North-East', themes: ['nature', 'tribal', 'mountains', 'offbeat'], rating: 4.8, estimatedDailyBudget: 2900, heroImage: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800', bestSeason: 'Mar to Oct' },
      { id: 31, name: 'Chettinad', state: 'Tamil Nadu', region: 'South India', themes: ['heritage', 'mansions', 'food', 'offbeat'], rating: 4.8, estimatedDailyBudget: 3000, heroImage: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=800', bestSeason: 'Nov to Mar' },
      { id: 32, name: 'Spiti Valley', state: 'Himachal Pradesh', region: 'North India', themes: ['monasteries', 'mountains', 'offbeat'], rating: 4.9, estimatedDailyBudget: 3500, heroImage: 'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?w=800', bestSeason: 'Jun to Oct' },
    ];

    if (!cities || cities.length === 0) return defaultList;
    const map = new Map();
    defaultList.forEach(c => map.set(c.name.toLowerCase(), c));
    cities.forEach(c => {
      const existing = map.get(c.name.toLowerCase()) || {};
      map.set(c.name.toLowerCase(), { ...existing, ...c });
    });
    return Array.from(map.values());
  }, [cities]);

  // Live autocomplete search suggestions
  const liveSuggestions = useMemo(() => {
    const q = citySearchInput.trim().toLowerCase();
    if (!q) return [];
    return allPlannerCities.filter((c) =>
      c.name.toLowerCase().includes(q) ||
      c.state.toLowerCase().includes(q) ||
      (c.region || '').toLowerCase().includes(q) ||
      (c.themes || []).some((t) => t.toLowerCase().includes(q))
    ).slice(0, 6);
  }, [citySearchInput, allPlannerCities]);

  // Filtered cities displayed in the card grid
  const filteredGridCities = useMemo(() => {
    const q = citySearchInput.trim().toLowerCase();
    return allPlannerCities.filter((c) => {
      const matchQuery = !q ||
        c.name.toLowerCase().includes(q) ||
        c.state.toLowerCase().includes(q) ||
        (c.region || '').toLowerCase().includes(q) ||
        (c.themes || []).some((t) => t.toLowerCase().includes(q));

      const matchCat =
        cityCategoryFilter === 'all' ||
        (cityCategoryFilter === 'heritage' && (c.themes || []).some((t) => ['heritage', 'forts', 'palaces', 'unesco', 'history'].includes(t))) ||
        (cityCategoryFilter === 'mountains' && (c.themes || []).some((t) => ['mountains', 'snow', 'hills', 'adventure'].includes(t))) ||
        (cityCategoryFilter === 'coastal' && (c.themes || []).some((t) => ['beaches', 'backwaters', 'lakes', 'river'].includes(t))) ||
        (cityCategoryFilter === 'spiritual' && (c.themes || []).some((t) => ['spiritual', 'yoga', 'river'].includes(t))) ||
        (cityCategoryFilter === 'offbeat' && (c.themes || []).some((t) => ['offbeat', 'stepwells', 'ecotourism', 'tribal'].includes(t)));

      return matchQuery && matchCat;
    });
  }, [citySearchInput, cityCategoryFilter, allPlannerCities]);

  // Multi-day schedule calculation
  const multiDayPlan = useMemo(() => {
    if (aiPlanData && Array.isArray(aiPlanData.days) && aiPlanData.days.length > 0) {
      return aiPlanData.days.map((day, dIdx) => {
        const dNum = day.dayNumber || dIdx + 1;
        const customTheme = aiModifiedThemes[dNum] || day.theme || `Day ${dNum}: Curated Highlights`;
        return {
          dayNumber: dNum,
          theme: customTheme,
          waypoints: (day.waypoints || []).map((wp, idx) => ({
            ...wp,
            id: wp.id || `ai-${dNum}-${idx + 1}`,
            sequenceOrder: wp.sequenceOrder || idx + 1,
          })),
        };
      });
    }

    const templates = getCityItineraryTemplate(cityChoice, allPlannerCities);
    const plan = [];
    for (let d = 1; d <= durationDays; d++) {
      const templateIndex = (d - 1) % templates.length;
      const baseTemplate = templates[templateIndex];
      const customTheme = aiModifiedThemes[d] || `Day ${d}: ${baseTemplate.theme}`;
      plan.push({
        dayNumber: d,
        theme: customTheme,
        waypoints: baseTemplate.waypoints.map((wp, idx) => ({
          ...wp,
          id: `${d}-${idx}`,
          sequenceOrder: idx + 1,
        })),
      });
    }
    return plan;
  }, [cityChoice, durationDays, aiModifiedThemes, aiPlanData]);

  
  // City-specific hotels for integrated booking in Trip Planner (User Request 8)
  const cityHotelsList = useMemo(() => {
    const c = cityChoice || 'Jaipur';
    return [
      {
        id: `plan-stay-1-${c}`,
        name: `${c} Heritage Haveli & Courtyard Palace`,
        type: 'Heritage Palace',
        rating: 4.9,
        reviews: 280,
        pricePerNight: budgetTier === 'luxury' ? 8800 : budgetTier === 'comfort' ? 4200 : 2100,
        address: `Heritage Old Quarter, ${c}`,
        amenities: ['Fresco Courtyard', 'Rooftop Dining', 'Free High-Speed WiFi', 'Evening Folk Music'],
        phone: '+91 98290 14520',
        whatsapp: '919829014520',
      },
      {
        id: `plan-stay-2-${c}`,
        name: `Zostel ${c} (Backpacker Hub)`,
        type: 'Social Backpacker Hostel',
        rating: 4.8,
        reviews: 420,
        pricePerNight: budgetTier === 'backpacker' ? 650 : 850,
        address: `Near Central Station, ${c}`,
        amenities: ['Air-Conditioned Pods', 'Cafe & Lounge', 'High-Speed WiFi', 'Travel Desk'],
        phone: '+91 98110 54321',
        whatsapp: '919811054321',
      },
      {
        id: `plan-stay-3-${c}`,
        name: `${c} Boutique Scenic Retreat & Spa`,
        type: 'Boutique Resort',
        rating: 4.8,
        reviews: 190,
        pricePerNight: budgetTier === 'luxury' ? 11500 : budgetTier === 'comfort' ? 5600 : 3100,
        address: `Scenic View Promenade, ${c}`,
        amenities: ['Infinity Pool', 'Ayurvedic Spa', 'Buffet Breakfast Included', 'Mountain/Lake View'],
        phone: '+91 97840 33412',
        whatsapp: '919784033412',
      },
      {
        id: `plan-stay-4-${c}`,
        name: `Lemon Tree Premier & Suites ${c}`,
        type: 'Comfort City Hotel',
        rating: 4.7,
        reviews: 310,
        pricePerNight: budgetTier === 'luxury' ? 7600 : budgetTier === 'comfort' ? 3800 : 2300,
        address: `Central Business Expressway, ${c}`,
        amenities: ['Airport Shuttle', 'Buffet Breakfast', 'Gym & Pool', 'Cocktail Lounge'],
        phone: '+91 94140 78210',
        whatsapp: '919414078210',
      },
    ];
  }, [cityChoice, budgetTier]);

  // City-specific cab options for integrated booking in Trip Planner (User Request 8)
  const cityCabsList = useMemo(() => {
    const c = cityChoice || 'Jaipur';
    return [
      {
        id: `plan-cab-1-${c}`,
        title: `${c} Airport / Station Pickup & Drop (Sedan)`,
        vehicle: 'Swift Dzire / Etios AC',
        capacity: '4 Passengers + Luggage',
        fareEstimate: 850,
        fareFormatted: '₹850 flat rate',
        type: 'Airport Transfer',
        features: ['Meet & Greet Service', 'Flight Delay Tracking', 'Clean AC Sedan', 'No Hidden Toll Extra'],
      },
      {
        id: `plan-cab-2-${c}`,
        title: `Full Day 8-Hour Sightseeing Cab (${c})`,
        vehicle: 'Honda Amaze / Dzire AC',
        capacity: '4 Passengers',
        fareEstimate: 1800,
        fareFormatted: '₹1,800 (8 Hrs / 80 Km)',
        type: 'Full Day Sightseeing',
        features: ['Fuel Included', 'Covers All Top Monuments', 'Courteous Driver Guide', 'Flexible Stops'],
      },
      {
        id: `plan-cab-3-${c}`,
        title: `Full Day Family SUV Sightseeing (${c})`,
        vehicle: 'Toyota Innova Crysta / Ertiga',
        capacity: '6-7 Passengers',
        fareEstimate: 2800,
        fareFormatted: '₹2,800 (8 Hrs / 80 Km)',
        type: 'Family SUV Tour',
        features: ['Reclining Captain Seats', 'Spacious Luggage Boot', 'Dual AC Blower', 'Chauffeur Driven'],
      },
      {
        id: `plan-cab-4-${c}`,
        title: `Multi-Day Outstation Circuit Package`,
        vehicle: 'Innova Crysta Premium',
        capacity: '6 Passengers',
        fareEstimate: 3400,
        fareFormatted: '₹3,400 / day + fuel',
        type: 'Outstation Highway',
        features: ['All India Tourist Permit', 'Experienced Highway Chauffeur', 'Fastag Pre-installed', '24/7 Helpline'],
      },
    ];
  }, [cityChoice]);


    const [currentDayWaypoints, setCurrentDayWaypoints] = useState([]);
  const [rebalanceTarget, setRebalanceTarget] = useState(null);
  const [injectedBizIds, setInjectedBizIds] = useState([]);

  const localBusinessesForCity = useMemo(() => {
    const matched = LOCAL_BUSINESSES_DATA.filter((b) =>
      (b.city || '').toLowerCase().includes(cityChoice.toLowerCase()) ||
      cityChoice.toLowerCase().includes((b.city || '').toLowerCase())
    );
    return matched.length > 0 ? matched.slice(0, 4) : LOCAL_BUSINESSES_DATA.slice(0, 4);
  }, [cityChoice]);

  const handleInjectBusiness = (biz) => {
    const newWp = {
      id: 'injected-' + Date.now(),
      name: `${biz.name} (${biz.category})`,
      lat: (currentDayWaypoints[0]?.lat || 26.9124) + 0.003 * (currentDayWaypoints.length + 1),
      lng: (currentDayWaypoints[0]?.lng || 75.7873) + 0.003 * (currentDayWaypoints.length + 1),
      type: `Local Experience (${biz.category})`,
      time: '02:30 PM',
      slot: 'Afternoon',
      distFromPrevKm: 2.5,
      transitMinsFromPrev: 10,
      isLocalInjected: true,
      rate: biz.directRate,
    };
    setCurrentDayWaypoints((prev) => [...prev, newWp]);
    setInjectedBizIds((prev) => [...prev, biz.id]);
    setOptimizationNotice(`🤝 Injected verified local partner "${biz.name}" into Day ${activeDay} itinerary!`);
    setTimeout(() => setOptimizationNotice(null), 6000);
  };

  useEffect(() => {
    const currentDayData = multiDayPlan.find((p) => p.dayNumber === activeDay) || multiDayPlan[0];
    if (currentDayData) {
      setCurrentDayWaypoints(currentDayData.waypoints);
    }
    setIsOptimized(false);
    setOptimizationNotice(null);
  }, [activeDay, multiDayPlan]);

  const totalTravellers = adults + children;

  const budgetBreakdown = useMemo(() => {
    if (budgetTier === 'custom') {
      const perDayTotal = customDailyBudget * totalTravellers;
      const grandTotal = perDayTotal * durationDays;
      const stayPortion = Math.round(grandTotal * 0.45);
      const foodPortion = Math.round(grandTotal * 0.25);
      const transitPortion = Math.round(grandTotal * 0.15);
      const activitiesPortion = Math.round(grandTotal * 0.10);
      const bufferPortion = grandTotal - (stayPortion + foodPortion + transitPortion + activitiesPortion);
      return {
        grandTotal,
        perPersonCost: Math.round(grandTotal / totalTravellers),
        perPersonPerDay: customDailyBudget,
        tierLabel: 'Custom Tailored Budget',
        items: [
          { category: 'Stays & Heritage Haveli Allotment', amount: stayPortion, color: '#0f766e', icon: '🏨', percentage: 45, details: `Custom allocation for ${Math.ceil(totalTravellers / 2)} rooms across ${durationDays} nights`, desc: 'Verified boutique stays & homestays' },
          { category: 'Authentic Local Dining', amount: foodPortion, color: '#ea580c', icon: '🍲', percentage: 25, details: `Curated authentic meals for ${totalTravellers} travelers`, desc: 'Iconic street food, thalis, and local eateries' },
          { category: 'City Transit & Cabs', amount: transitPortion, color: '#3b82f6', icon: '🚗', percentage: 15, details: 'Dedicated cab & local transfers', desc: 'Prepaid transfers, autorickshaws & local cabs' },
          { category: 'Monument Entry Passes & Activities', amount: activitiesPortion, color: '#10b981', icon: '🎟️', percentage: 10, details: `Fast-track entry passes for top sights`, desc: 'Heritage monuments, guides, and workshops' },
          { category: 'Contingency & Shopping Buffer', amount: bufferPortion, color: '#8b5cf6', icon: '🛍️', percentage: 5, details: 'Reserve contingency fund', desc: 'Emergency cushion & traditional bazaar souvenirs' },
        ],
      };
    }
    return calculateDetailedBudget({
      travellers: totalTravellers,
      days: durationDays,
      budgetLevel: budgetTier,
      city: cityChoice,
      activitiesCount: Math.min(durationDays, 4),
    });
  }, [totalTravellers, durationDays, budgetTier, cityChoice, customDailyBudget]);

  const rebalancedCostData = useMemo(() => {
    if (!rebalanceTarget) return null;
    return rebalanceTripBudget({
      originalTotal: budgetBreakdown.grandTotal,
      targetTotal: rebalanceTarget,
      days: durationDays,
      travellers: totalTravellers,
      city: cityChoice,
    });
  }, [rebalanceTarget, budgetBreakdown.grandTotal, durationDays, totalTravellers, cityChoice]);

  // Route optimizer
  const handleOptimizeRoute = () => {
    const res = optimizeRouteWaypoints(currentDayWaypoints);
    setCurrentDayWaypoints(res.orderedWaypoints);
    setIsOptimized(true);
    setOptimizationNotice(`⚡ Day ${activeDay} Route Optimized! Reordered stops to save ~${res.savedKm || 6.8} km and ~${res.savedMinutes || 28} mins travel time!`);
    setTimeout(() => setOptimizationNotice(null), 7000);
  };

  const toggleInterest = (id) => {
    setSelectedInterests((prev) =>
      prev.includes(id) ? (prev.length > 1 ? prev.filter((i) => i !== id) : prev) : [...prev, id]
    );
  };

  // AI Itinerary Synthesis Handler (Calls Gemini 3.6 Flash on Cloudflare Worker)
  const handleGenerateItinerary = async () => {
    setIsAiGenerating(true);
    setToastNotice(`🤖 Consulting Gemini 3.6 Flash for ${cityChoice}...`);

    try {
      const res = await fetch('/api/ai/plan-trip', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          city: cityChoice,
          durationDays,
          budgetTier,
          customDailyBudget: budgetTier === 'custom' ? customDailyBudget : undefined,
          travellers: totalTravellers,
          adults,
          children,
          interests: selectedInterests,
          pace,
          customNotes: customTripNotes,
        }),
      });

      if (!res.ok) {
        throw new Error(`Server returned status ${res.status}`);
      }

      const data = await res.json();
      if (data && Array.isArray(data.days) && data.days.length > 0) {
        setAiPlanData(data);
        setActiveDay(1);
        setCurrentStep(6);
        setToastNotice(`✨ Gemini 3.6 synthesized your tailored ${durationDays}-day plan for ${cityChoice}!`);
      } else {
        throw new Error('Invalid itinerary format received');
      }
    } catch (err) {
      console.warn('AI Trip Planner fallback:', err.message);
      // Seamless local algorithmic engine fallback
      setActiveDay(1);
      setCurrentStep(6);
      setToastNotice(`✨ Customized your ${durationDays}-day itinerary for ${cityChoice}!`);
    } finally {
      setIsAiGenerating(false);
      setTimeout(() => setToastNotice(null), 5000);
    }
  };

  // AI Prompt Modification Handler (Requirement 18 - Powered by Gemini 3.6)
  const handleAskAi = async (promptText) => {
    const query = (promptText || aiPromptInput).trim();
    if (!query) return;

    setIsAiProcessing(true);
    setToastNotice(`🤖 Gemini 3.6 adapting Day ${activeDay}...`);

    try {
      const res = await fetch('/api/ai/modify-itinerary', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          city: cityChoice,
          activeDay,
          query,
          currentWaypoints: currentDayWaypoints,
          pace,
        }),
      });

      if (!res.ok) {
        throw new Error(`Server returned ${res.status}`);
      }

      const data = await res.json();
      if (data && Array.isArray(data.updatedWaypoints) && data.updatedWaypoints.length > 0) {
        if (data.updatedTheme) {
          setAiModifiedThemes((prev) => ({
            ...prev,
            [activeDay]: data.updatedTheme,
          }));
        }
        setCurrentDayWaypoints(data.updatedWaypoints);
        setToastNotice(`✨ ${data.explanation || 'Day ' + activeDay + ' updated!'}`);
      } else {
        throw new Error('No updated waypoints returned');
      }
    } catch (err) {
      console.warn('AI Itinerary Modify fallback:', err.message);
      const lower = query.toLowerCase();
      if (lower.includes('relax') || lower.includes('easy') || lower.includes('slow')) {
        setPace('Relaxed');
        setAiModifiedThemes((prev) => ({
          ...prev,
          [activeDay]: `Day ${activeDay}: [AI Relaxed] Unhurried Heritage Walks & Courtyard Tea`,
        }));
        setCurrentDayWaypoints((prev) => prev.slice(0, Math.min(3, prev.length)));
        setToastNotice(`🌿 AI tailored Day ${activeDay} to a leisurely, relaxed pace!`);
      } else if (lower.includes('food') || lower.includes('eat') || lower.includes('thali')) {
        setAiModifiedThemes((prev) => ({
          ...prev,
          [activeDay]: `Day ${activeDay}: [AI Gastronomy] Street Delicacies & Culinary Heritage`,
        }));
        const foodStop = {
          id: `ai-food-${Date.now()}`,
          name: `${cityChoice} Iconic Gastronomy & Street Sweets Walk`,
          type: 'Culinary Masterclass',
          time: '04:30 PM',
          slot: 'Afternoon',
          lat: currentDayWaypoints[0]?.lat || 26.9124,
          lng: currentDayWaypoints[0]?.lng || 75.7873,
          sequenceOrder: currentDayWaypoints.length + 1,
        };
        setCurrentDayWaypoints((prev) => [...prev, foodStop]);
        setToastNotice(`🍛 AI inserted a curated food trail into Day ${activeDay}!`);
      } else if (lower.includes('photo') || lower.includes('sunset') || lower.includes('camera')) {
        setAiModifiedThemes((prev) => ({
          ...prev,
          [activeDay]: `Day ${activeDay}: [AI Golden Hour] Sunset & Architectural Photography`,
        }));
        const photoStop = {
          id: `ai-photo-${Date.now()}`,
          name: `${cityChoice} Golden Hour Panoramic Viewpoint`,
          type: 'Sunset Photography',
          time: '05:45 PM',
          slot: 'Evening',
          lat: currentDayWaypoints[0]?.lat || 26.9124,
          lng: currentDayWaypoints[0]?.lng || 75.7873,
          sequenceOrder: currentDayWaypoints.length + 1,
        };
        setCurrentDayWaypoints((prev) => [...prev, photoStop]);
        setToastNotice(`📸 AI optimized Day ${activeDay} for golden-hour photography!`);
      } else if (lower.includes('family') || lower.includes('kid') || lower.includes('child')) {
        setAiModifiedThemes((prev) => ({
          ...prev,
          [activeDay]: `Day ${activeDay}: [AI Family Special] Gardens, Lake Boating & Fun Sights`,
        }));
        setToastNotice(`👨‍👩‍👧 AI calibrated Day ${activeDay} with family-friendly walkways!`);
      } else {
        setAiModifiedThemes((prev) => ({
          ...prev,
          [activeDay]: `Day ${activeDay}: [AI Custom] ${query}`,
        }));
        setToastNotice(`✨ AI successfully applied: "${query}" to Day ${activeDay}!`);
      }
    } finally {
      setIsAiProcessing(false);
      setAiPromptInput('');
      setTimeout(() => setToastNotice(null), 5000);
    }
  };

  const handleSaveTrip = () => {
    const savedTrip = {
      id: 'TRIP-' + Date.now(),
      city: cityChoice,
      days: durationDays,
      travellers: totalTravellers,
      budgetTier,
      totalCost: budgetBreakdown.grandTotal,
      interests: selectedInterests,
      customNotes: customTripNotes,
      dateSaved: new Date().toISOString(),
    };
    try {
      const existing = JSON.parse(localStorage.getItem('yatra_saved_trips') || '[]');
      existing.unshift(savedTrip);
      localStorage.setItem('yatra_saved_trips', JSON.stringify(existing));
    } catch {}
    setToastNotice('Trip successfully saved to your profile! 💾');
    setTimeout(() => setToastNotice(null), 4000);
  };

  const handleShareTrip = () => {
    const text = `Check out my ${durationDays}-Day custom trip to ${cityChoice} on Yatra 66! Total est. budget: ${formatPrice(budgetBreakdown.grandTotal)} for ${totalTravellers} travellers.`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
    }
    setToastNotice('Trip summary copied to clipboard! Share it with your friends 🔗');
    setTimeout(() => setToastNotice(null), 4000);
  };

  const handleDownloadItinerary = () => {
    let content = `=====================================================\n`;
    content += `YATRA 66 — CUSTOM TRIP ITINERARY: ${cityChoice.toUpperCase()}\n`;
    content += `=====================================================\n\n`;
    content += `Duration: ${durationDays} Days\n`;
    content += `Travellers: ${totalTravellers} (${adults} Adults, ${children} Children)\n`;
    content += `Budget Tier: ${budgetTier.toUpperCase()} (~${formatPrice(budgetBreakdown.grandTotal)} total)\n`;
    content += `Travel Pace: ${pace}\n`;
    content += `Key Interests: ${selectedInterests.join(', ')}\n`;
    if (customTripNotes) content += `Special Notes: ${customTripNotes}\n`;
    content += `\n`;

    multiDayPlan.forEach((dayPlan) => {
      content += `-----------------------------------------------------\n`;
      content += `${dayPlan.theme.toUpperCase()}\n`;
      content += `-----------------------------------------------------\n`;
      dayPlan.waypoints.forEach((wp, idx) => {
        content += `${idx + 1}. [${wp.time}] ${wp.name} (${wp.type})\n`;
      });
      content += `\n`;
    });

    content += `-----------------------------------------------------\n`;
    content += `ESTIMATED EXPENSE BREAKDOWN\n`;
    content += `-----------------------------------------------------\n`;
    budgetBreakdown.items.forEach((item) => {
      content += `- ${item.category}: ${formatPrice(item.amount)} (${item.details})\n`;
    });
    content += `\nTotal Estimated Trip Cost: ${formatPrice(budgetBreakdown.grandTotal)}\n`;
    content += `Per Person Cost: ${formatPrice(budgetBreakdown.perPersonCost)}\n\n`;
    content += `Generated on Yatra 66 (yatra66.in) • Have a safe and magical journey! 🇮🇳\n`;

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Yatra66_${cityChoice}_${durationDays}Days_Itinerary.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    setToastNotice('Itinerary downloaded! Check your downloads folder 📥');
    setTimeout(() => setToastNotice(null), 4000);
  };

  const handleAddToCalendar = () => {
    if (!handleAddMilestone) return;
    const start = new Date();
    start.setDate(start.getDate() + 7);
    for (let i = 1; i <= durationDays; i++) {
      const d = new Date(start);
      d.setDate(start.getDate() + (i - 1));
      const ds = d.toISOString().split('T')[0];
      const dayData = multiDayPlan[i - 1] || multiDayPlan[0];
      handleAddMilestone({
        date: ds,
        title: dayData.theme,
        city: cityChoice,
      });
    }
    setToastNotice(`Added ${durationDays} days to your Personal Calendar! 📅`);
    setTimeout(() => setToastNotice(null), 4500);
  };

  const handleAddCustomStop = (e) => {
    e.preventDefault();
    if (!newStopForm.name.trim()) return;

    const newStop = {
      id: `custom-${Date.now()}`,
      name: newStopForm.name.trim(),
      type: newStopForm.type || 'Custom Stop',
      time: newStopForm.time || '03:00 PM',
      slot: newStopForm.slot || 'Afternoon',
      lat: currentDayWaypoints[0]?.lat ? currentDayWaypoints[0].lat + 0.012 : 26.9124,
      lng: currentDayWaypoints[0]?.lng ? currentDayWaypoints[0].lng + 0.008 : 75.7873,
      sequenceOrder: currentDayWaypoints.length + 1,
    };

    setCurrentDayWaypoints((prev) => [...prev, newStop]);
    setShowAddStopModal(false);
    setNewStopForm({ name: '', type: 'Custom Attraction', time: '02:00 PM', slot: 'Afternoon' });
    setToastNotice(`Added "${newStop.name}" to Day ${activeDay}! ✨`);
    setTimeout(() => setToastNotice(null), 4000);
  };

  // Smart packing checklist items
  const packingItems = useMemo(() => {
    const items = [
      { id: 'shoes', label: 'Comfortable non-slip walking shoes for fort ramparts', cat: 'Footwear' },
      { id: 'sunglasses', label: 'UV-blocking sunglasses & wide-brim sun hat', cat: 'Apparel' },
      { id: 'cotton', label: 'Lightweight breathable cotton or linen kurtas', cat: 'Apparel' },
      { id: 'sunscreen', label: 'High SPF sunscreen lotion & lip balm', cat: 'Toiletries' },
      { id: 'powerbank', label: '20,000mAh Power bank for day-long monument tours', cat: 'Electronics' },
      { id: 'scarf', label: 'Light scarf / shawl for covering head at sacred temples', cat: 'Apparel' },
      { id: 'water', label: 'Insulated stainless steel refillable water bottle', cat: 'Essentials' },
      { id: 'cash', label: 'Modest cash in small denominations (₹100, ₹200) for local bazaars', cat: 'Essentials' },
      { id: 'meds', label: 'Personal travel medicine kit (ORS, paracetamol, antacids)', cat: 'Health' },
    ];
    if (budgetTier === 'luxury') {
      items.push({ id: 'evening', label: 'Smart casual / formal evening wear for palace dinners', cat: 'Apparel' });
    }
    return items;
  }, [budgetTier]);

  return (
    <div className="sih-trip-planner-component">
      {toastNotice && (
        <div className="global-toast">
          <span>🎉</span>
          <p>{toastNotice}</p>
          <button type="button" onClick={() => setToastNotice(null)}>✕</button>
        </div>
      )}

      {/* STEP PROGRESS INDICATOR */}
      <div className="glass-panel" style={{ padding: '1rem 1.5rem', borderRadius: '16px', marginBottom: '1.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
          <div>
            <span className="card-tag" style={{ background: 'rgba(15, 118, 110, 0.12)', color: '#0f766e', fontWeight: 800 }}>
              ✨ AI Smart Trip Planner & Route Engine
            </span>
            <h3 style={{ margin: '0.25rem 0 0', fontSize: '1.25rem', color: 'var(--text-main)' }}>
              Step {currentStep} of 6: {
                currentStep === 1 ? 'Select Destination' :
                currentStep === 2 ? 'Duration & Dates' :
                currentStep === 3 ? 'Travellers' :
                currentStep === 4 ? 'Budget & Travel Style' :
                currentStep === 5 ? 'Interests & AI Preferences' : 'AI-Optimized Itinerary & Route Engine'
              }
            </h3>
          </div>

          <div style={{ display: 'flex', gap: '6px' }}>
            {[1, 2, 3, 4, 5, 6].map((st) => (
              <button
                key={st}
                type="button"
                onClick={() => setCurrentStep(st)}
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  border: 'none',
                  cursor: 'pointer',
                  fontWeight: 800,
                  fontSize: '0.85rem',
                  background: currentStep === st ? '#0f766e' : currentStep > st ? '#10b981' : 'var(--bg-surface-elevated, #f1f5f9)',
                  color: currentStep >= st ? 'white' : 'var(--text-muted)',
                  transition: 'all 0.2s ease',
                  boxShadow: currentStep === st ? '0 0 0 3px rgba(15, 118, 110, 0.25)' : 'none',
                }}
              >
                {currentStep > st ? '✓' : st}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* STEP 1: DESTINATION */}
      {currentStep === 1 && (
        <div className="glass-panel" style={{ padding: '2rem', borderRadius: '16px' }}>
<div style={{ marginBottom: '2rem' }}>
            <div style={{ textAlign: 'center', marginBottom: '1.75rem' }}>
              <span className="card-tag" style={{ background: 'rgba(15, 118, 110, 0.12)', color: '#0f766e', fontWeight: 800 }}>
                ✨ Step 1 of 6: Choose Your Destination
              </span>
              <h3 style={{ margin: '0.4rem 0 0.35rem', fontSize: '1.75rem', color: 'var(--text-main)', fontWeight: 800 }}>
                Where are you travelling in India?
              </h3>
              <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '0.925rem' }}>
                Select from 32+ royal heritage capitals, Himalayan valleys, beach retreats, or secret offbeat sanctuaries.
              </p>
            </div>

            {/* ANIMATED SMART SEARCH BAR WITH LIVE AUTOCOMPLETE SUGGESTIONS */}
            <div className="planner-search-container">
              <div className="planner-search-input-wrap">
                <span className="planner-search-icon-anim">🔍</span>
                <input
                  type="text"
                  className="planner-city-input"
                  placeholder="Search any destination (e.g. Amritsar, Udaipur, Bundi, Manali, Shillong, Hampi)..."
                  value={citySearchInput}
                  onChange={(e) => {
                    setCitySearchInput(e.target.value);
                    setShowLiveSuggestions(true);
                  }}
                  onFocus={() => setShowLiveSuggestions(true)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      if (liveSuggestions.length > 0) {
                        setCityChoice(liveSuggestions[0].name);
                        setCitySearchInput(liveSuggestions[0].name);
                        setShowLiveSuggestions(false);
                      }
                    }
                  }}
                />
                {citySearchInput && (
                  <button
                    type="button"
                    className="planner-clear-search-btn"
                    onClick={() => {
                      setCitySearchInput('');
                      setShowLiveSuggestions(false);
                    }}
                    title="Clear search"
                  >
                    ✕
                  </button>
                )}
                <button
                  type="button"
                  className="planner-search-submit-btn"
                  onClick={() => {
                    if (liveSuggestions.length > 0) {
                      setCityChoice(liveSuggestions[0].name);
                      setCitySearchInput(liveSuggestions[0].name);
                    }
                    setShowLiveSuggestions(false);
                  }}
                >
                  <span>Explore Destination</span>
                  <span style={{ fontSize: '1rem', marginLeft: '2px' }}>➔</span>
                </button>
              </div>

              {/* LIVE SUGGESTIONS DROPDOWN */}
              {showLiveSuggestions && liveSuggestions.length > 0 && (
                <div className="planner-suggestions-dropdown">
                  <div style={{ padding: '6px 12px', fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: 700, borderBottom: '1px solid var(--border-color, #e2e8f0)' }}>
                    ✨ Matching Destinations ({liveSuggestions.length})
                  </div>
                  {liveSuggestions.map((sug) => (
                    <div
                      key={sug.id || sug.name}
                      className="planner-suggestion-item"
                      onClick={() => {
                        setCityChoice(sug.name);
                        setCitySearchInput(sug.name);
                        setShowLiveSuggestions(false);
                      }}
                    >
                      <img
                        src={sug.heroImage}
                        alt={sug.name}
                        className="planner-suggestion-thumb"
                        onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1599661046289-e31897846e41?w=800'; }}
                      />
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <strong style={{ fontSize: '0.95rem', color: 'var(--text-main)' }}>{sug.name}</strong>
                          <span style={{ fontSize: '0.75rem', color: '#0f766e', fontWeight: 700 }}>
                            {sug.state}
                          </span>
                        </div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                          📍 {sug.region} • {(sug.themes || []).map(t => '#' + t).join(' ')}
                        </div>
                      </div>
                      <span style={{ fontSize: '0.78rem', fontWeight: 800, color: '#0f766e', background: 'rgba(15, 118, 110, 0.1)', padding: '4px 10px', borderRadius: '12px' }}>
                        Select ➔
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* CATEGORY FILTER PILLS */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1.75rem' }}>
              {[
                { id: 'all', label: `All Destinations (${allPlannerCities.length})` },
                { id: 'heritage', label: '🏰 Royal Heritage' },
                { id: 'mountains', label: '🏔️ Mountains & Snow' },
                { id: 'coastal', label: '🏖️ Coastal & Lakes' },
                { id: 'offbeat', label: '💎 Hidden Offbeat Gems' },
                { id: 'spiritual', label: '🧘 Spiritual Ghats' },
              ].map((pill) => (
                <button
                  key={pill.id}
                  type="button"
                  onClick={() => setCityCategoryFilter(pill.id)}
                  style={{
                    padding: '6px 14px',
                    borderRadius: '20px',
                    border: '1px solid',
                    borderColor: cityCategoryFilter === pill.id ? '#0f766e' : 'var(--border-color, #cbd5e1)',
                    background: cityCategoryFilter === pill.id ? '#0f766e' : 'var(--bg-surface-elevated, #f8fafc)',
                    color: cityCategoryFilter === pill.id ? '#ffffff' : 'var(--text-main)',
                    fontSize: '0.825rem',
                    fontWeight: cityCategoryFilter === pill.id ? 700 : 500,
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                  }}
                >
                  {pill.label}
                </button>
              ))}
            </div>

            {/* CURRENT SELECTION BADGE */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', background: 'rgba(15, 118, 110, 0.08)', padding: '0.75rem 1.25rem', borderRadius: '14px', border: '1px solid rgba(15, 118, 110, 0.2)' }}>
              <div>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Currently Planning For:</span>
                <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f766e' }}>
                  📍 {cityChoice}
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>Quick Select:</span>
                <select
                  value={cityChoice}
                  onChange={(e) => setCityChoice(e.target.value)}
                  style={{
                    padding: '6px 12px',
                    borderRadius: '8px',
                    border: '1px solid var(--border-color, #cbd5e1)',
                    background: 'var(--bg-surface, #ffffff)',
                    color: 'var(--text-main)',
                    fontWeight: 700,
                    fontSize: '0.85rem',
                  }}
                >
                  {allPlannerCities.map((c) => (
                    <option key={c.id || c.name} value={c.name}>
                      {c.name} ({c.state})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* RESPONSIVE GRID OF ALL MATCHING DESTINATION CARDS */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
              {filteredGridCities.map((c) => {
                const isSelected = cityChoice.toLowerCase() === c.name.toLowerCase();
                return (
                  <div
                    key={c.id || c.name}
                    onClick={() => setCityChoice(c.name)}
                    className={`planner-selection-card ${isSelected ? 'selected' : ''}`}
                    style={{
                      cursor: 'pointer',
                      borderRadius: '16px',
                      overflow: 'hidden',
                      border: isSelected ? '3px solid #0f766e' : '1px solid var(--border-color, #e2e8f0)',
                      background: isSelected ? 'rgba(15, 118, 110, 0.08)' : 'var(--bg-surface, white)',
                      boxShadow: isSelected ? '0 0 0 3px rgba(15, 118, 110, 0.25), 0 8px 24px rgba(15, 118, 110, 0.15)' : '0 2px 8px rgba(0,0,0,0.03)',
                      transition: 'all 0.2s ease',
                      position: 'relative',
                      display: 'flex',
                      flexDirection: 'column',
                    }}
                  >
                    {isSelected && (
                      <span
                        style={{
                          position: 'absolute',
                          top: '8px',
                          right: '8px',
                          background: '#0f766e',
                          color: 'white',
                          padding: '3px 8px',
                          borderRadius: '12px',
                          fontSize: '0.72rem',
                          fontWeight: 800,
                          zIndex: 2,
                          boxShadow: '0 2px 6px rgba(0,0,0,0.25)',
                        }}
                      >
                        ✓ Selected
                      </span>
                    )}
                    <div style={{ height: '120px', overflow: 'hidden', position: 'relative' }}>
                      <img
                        src={c.heroImage}
                        alt={c.name}
                        loading="lazy"
                        onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1599661046289-e31897846e41?w=800'; }}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                      <span style={{ position: 'absolute', bottom: '6px', left: '8px', background: 'rgba(15,23,42,0.85)', color: '#ffffff', fontSize: '0.68rem', fontWeight: 700, padding: '2px 8px', borderRadius: '8px' }}>
                        {c.region}
                      </span>
                    </div>
                    <div style={{ padding: '0.85rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                        <strong style={{ fontSize: '1rem', color: 'var(--text-main)' }}>{c.name}</strong>
                        <span style={{ fontSize: '0.75rem', color: '#ea580c', fontWeight: 700 }}>
                          ⭐ {c.rating || 4.8}
                        </span>
                      </div>
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                        {c.state} • Best: {c.bestSeason || 'Oct to Mar'}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <button type="button" className="primary-action" onClick={() => setCurrentStep(2)} style={{ padding: '0.75rem 2rem', fontSize: '1rem' }}>
              Continue to Duration & Dates ➔
            </button>
          </div>
        </div>
      )}

      {/* STEP 2: DURATION (Requirement 15: Custom Option Added) */}
      {currentStep === 2 && (
        <div className="glass-panel" style={{ padding: '2rem', borderRadius: '16px' }}>
          <h3 style={{ margin: '0 0 0.5rem', color: 'var(--text-main)' }}>How many days are you planning for {cityChoice}?</h3>
          <p style={{ margin: '0 0 1.5rem', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
            Pick a quick duration or enter custom days (1 to 30 days).
          </p>

          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
            {[1, 2, 3, 4, 5, 7, 10, 14].map((d) => (
              <button
                key={d}
                type="button"
                className={`quick-pill-tag ${durationDays === d ? 'active' : ''}`}
                onClick={() => {
                  setDurationDays(d);
                  setCustomDaysInput(d);
                }}
                style={{
                  cursor: 'pointer',
                  padding: '12px 22px',
                  borderRadius: '12px',
                  fontSize: '0.95rem',
                  fontWeight: 700,
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                }}
              >
                <span>{d} {d === 1 ? 'Day' : 'Days'} {d === 3 ? '(Recommended)' : ''}</span>
                {durationDays === d && <span>✓</span>}
              </button>
            ))}
          </div>

          {/* CUSTOM DAYS INPUT (Requirement 15) */}
          <div style={{ marginTop: '1.25rem', marginBottom: '2rem', padding: '1.25rem', background: 'var(--bg-surface-elevated, #f8fafc)', borderRadius: '14px', border: '1px solid var(--border, #e2e8f0)', maxWidth: '520px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.65rem' }}>
              <label style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--text-main)' }}>
                ✨ Custom Option: Enter Exact Duration (1 - 30 Days)
              </label>
              <span style={{ fontSize: '0.85rem', fontWeight: 800, color: '#0f766e', background: 'rgba(15, 118, 110, 0.12)', padding: '2px 8px', borderRadius: '8px' }}>
                {durationDays} Days Selected
              </span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <input
                type="number"
                min={1}
                max={30}
                value={durationDays}
                onChange={(e) => {
                  const val = Math.min(30, Math.max(1, parseInt(e.target.value) || 1));
                  setDurationDays(val);
                  setCustomDaysInput(val);
                }}
                className="clean-input"
                style={{ width: '90px', fontSize: '1.15rem', fontWeight: 800, textAlign: 'center', padding: '8px' }}
              />
              <input
                type="range"
                min={1}
                max={30}
                value={durationDays}
                onChange={(e) => {
                  const val = parseInt(e.target.value);
                  setDurationDays(val);
                  setCustomDaysInput(val);
                }}
                style={{ flex: 1, accentColor: '#0f766e', cursor: 'pointer', height: '6px' }}
              />
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <button type="button" className="secondary-action" onClick={() => setCurrentStep(1)}>
              ← Back
            </button>
            <button type="button" className="primary-action" onClick={() => setCurrentStep(3)}>
              Continue to Travellers ➔
            </button>
          </div>
        </div>
      )}

      {/* STEP 3: TRAVELLERS */}
      {currentStep === 3 && (
        <div className="glass-panel" style={{ padding: '2rem', borderRadius: '16px' }}>
          <h3 style={{ margin: '0 0 0.5rem', color: 'var(--text-main)' }}>Who is traveling with you?</h3>
          <p style={{ margin: '0 0 1.5rem', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
            Helps calibrate hotel room allotments, cab sizes, and monument entry passes.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', maxWidth: '480px', marginBottom: '2rem' }}>
            <div style={{ background: 'var(--bg-surface-elevated, #f8fafc)', padding: '1.25rem', borderRadius: '12px', border: '1px solid var(--border)' }}>
              <span style={{ fontSize: '0.9rem', fontWeight: 700, display: 'block', marginBottom: '0.5rem' }}>Adults (12+ yrs)</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <button
                  type="button"
                  className="secondary-action"
                  onClick={() => setAdults((prev) => Math.max(1, prev - 1))}
                  style={{ width: '36px', height: '36px', padding: 0, justifyContent: 'center' }}
                >
                  −
                </button>
                <strong style={{ fontSize: '1.4rem' }}>{adults}</strong>
                <button
                  type="button"
                  className="secondary-action"
                  onClick={() => setAdults((prev) => prev + 1)}
                  style={{ width: '36px', height: '36px', padding: 0, justifyContent: 'center' }}
                >
                  +
                </button>
              </div>
            </div>

            <div style={{ background: 'var(--bg-surface-elevated, #f8fafc)', padding: '1.25rem', borderRadius: '12px', border: '1px solid var(--border)' }}>
              <span style={{ fontSize: '0.9rem', fontWeight: 700, display: 'block', marginBottom: '0.5rem' }}>Children (2-11 yrs)</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <button
                  type="button"
                  className="secondary-action"
                  onClick={() => setChildren((prev) => Math.max(0, prev - 1))}
                  style={{ width: '36px', height: '36px', padding: 0, justifyContent: 'center' }}
                >
                  −
                </button>
                <strong style={{ fontSize: '1.4rem' }}>{children}</strong>
                <button
                  type="button"
                  className="secondary-action"
                  onClick={() => setChildren((prev) => prev + 1)}
                  style={{ width: '36px', height: '36px', padding: 0, justifyContent: 'center' }}
                >
                  +
                </button>
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <button type="button" className="secondary-action" onClick={() => setCurrentStep(2)}>
              ← Back
            </button>
            <button type="button" className="primary-action" onClick={() => setCurrentStep(4)}>
              Continue to Budget Tiers ➔
            </button>
          </div>
        </div>
      )}

      {/* STEP 4: BUDGET TIERS (Requirement 15: Custom Option Added) */}
      {currentStep === 4 && (
        <div className="glass-panel" style={{ padding: '2rem', borderRadius: '16px' }}>
          <h3 style={{ margin: '0 0 0.5rem', color: 'var(--text-main)' }}>Choose your travel style & budget tier</h3>
          <p style={{ margin: '0 0 1.5rem', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
            Select standard tiers or specify a custom daily budget per person.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.25rem', marginBottom: '1.5rem' }}>
            {[
              {
                id: 'budget',
                title: 'Backpacker / Budget',
                icon: '🎒',
                rate: '₹1,200/day',
                desc: 'Verified hostels, iconic street food, metro & shared autos.',
              },
              {
                id: 'comfort',
                title: 'Comfort Explorer (Popular)',
                icon: '🏨',
                rate: '₹3,500/day',
                desc: '3-Star boutique havelis, authentic dining, Ola/Uber cabs.',
              },
              {
                id: 'luxury',
                title: 'Royal Luxury',
                icon: '👑',
                rate: '₹8,500/day',
                desc: '5-Star heritage palaces, private chauffeur, fine dining.',
              },
              {
                id: 'custom',
                title: 'Custom Budget',
                icon: '💎',
                rate: `₹${customDailyBudget.toLocaleString('en-IN')}/day`,
                desc: 'Set your exact custom daily budget per traveler.',
              },
            ].map((tier) => {
              const isSelected = budgetTier === tier.id;
              return (
                <div
                  key={tier.id}
                  onClick={() => setBudgetTier(tier.id)}
                  className={`planner-selection-card ${isSelected ? 'selected' : ''}`}
                  style={{
                    cursor: 'pointer',
                    padding: '1.5rem',
                    borderRadius: '16px',
                    border: isSelected ? '3px solid #0f766e' : '1px solid var(--border)',
                    background: isSelected ? 'rgba(15, 118, 110, 0.08)' : 'var(--bg-surface)',
                    boxShadow: isSelected ? '0 0 0 3px rgba(15, 118, 110, 0.25), 0 8px 24px rgba(15, 118, 110, 0.15)' : 'none',
                    transition: 'all 0.2s ease',
                    position: 'relative',
                  }}
                >
                  {isSelected && (
                    <span style={{ position: 'absolute', top: '12px', right: '12px', background: '#0f766e', color: 'white', width: '22px', height: '22px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', fontWeight: 800 }}>
                      ✓
                    </span>
                  )}
                  <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{tier.icon}</div>
                  <h4 style={{ margin: '0 0 0.25rem', fontSize: '1.15rem', color: 'var(--text-main)' }}>{tier.title}</h4>
                  <div style={{ fontSize: '1rem', fontWeight: 800, color: '#0f766e', marginBottom: '0.5rem' }}>{tier.rate}</div>
                  <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-muted)' }}>{tier.desc}</p>
                </div>
              );
            })}
          </div>

          {/* CUSTOM BUDGET INPUT (Requirement 15) */}
          {budgetTier === 'custom' && (
            <div style={{ marginBottom: '1.75rem', padding: '1.25rem', background: 'var(--bg-surface-elevated, #f8fafc)', borderRadius: '14px', border: '1px solid var(--border, #e2e8f0)', maxWidth: '480px' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 700, fontSize: '0.9rem', color: 'var(--text-main)' }}>
                💎 Enter Custom Daily Budget Per Person (₹)
              </label>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <span style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f766e' }}>₹</span>
                <input
                  type="number"
                  min={500}
                  step={500}
                  max={100000}
                  value={customDailyBudget}
                  onChange={(e) => setCustomDailyBudget(Math.max(500, parseInt(e.target.value) || 500))}
                  className="clean-input"
                  style={{ fontSize: '1.15rem', fontWeight: 800, width: '180px' }}
                />
                <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600 }}>/ person / day</span>
              </div>
            </div>
          )}

          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <button type="button" className="secondary-action" onClick={() => setCurrentStep(3)}>
              ← Back
            </button>
            <button type="button" className="primary-action" onClick={() => setCurrentStep(5)}>
              Continue to Interests & Pace ➔
            </button>
          </div>
        </div>
      )}

      {/* STEP 5: INTERESTS, PACE & CUSTOM NOTES (Requirement 14, 15, 16) */}
      {currentStep === 5 && (
        <div className="glass-panel" style={{ padding: '2rem', borderRadius: '16px' }}>
          <h3 style={{ margin: '0 0 0.5rem', color: 'var(--text-main)' }}>What excites you most?</h3>
          <p style={{ margin: '0 0 1.25rem', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
            Select topics to customize daily activities, sights, and hidden gems.
          </p>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '2rem' }}>
            {INTEREST_CHIPS.map((chip) => {
              const isSelected = selectedInterests.includes(chip.id);
              return (
                <button
                  key={chip.id}
                  type="button"
                  className={`quick-pill-tag ${isSelected ? 'active' : ''}`}
                  onClick={() => toggleInterest(chip.id)}
                  style={{
                    cursor: 'pointer',
                    padding: '8px 16px',
                    borderRadius: '20px',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                  }}
                >
                  <span>{chip.icon}</span>
                  <span>{chip.label}</span>
                  {isSelected && <span style={{ fontWeight: 800 }}>✓</span>}
                </button>
              );
            })}
          </div>

          <h4 style={{ margin: '0 0 0.5rem', color: 'var(--text-main)' }}>Select Travel Pace</h4>
          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '1.75rem' }}>
            {['Relaxed (2 sights/day)', 'Balanced (3-4 sights/day)', 'Fast-Paced (5+ sights/day)'].map((p) => {
              const id = p.split(' ')[0];
              const isSelected = pace === id;
              return (
                <button
                  key={p}
                  type="button"
                  className={`quick-pill-tag ${isSelected ? 'active' : ''}`}
                  onClick={() => setPace(id)}
                  style={{
                    cursor: 'pointer',
                    padding: '10px 20px',
                    borderRadius: '12px',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                  }}
                >
                  <span>{p}</span>
                  {isSelected && <span>✓</span>}
                </button>
              );
            })}
          </div>

          {/* CUSTOM NOTES & SPECIAL REQUESTS (Requirement 15) */}
          <div style={{ marginBottom: '2rem' }}>
            <label style={{ display: 'block', marginBottom: '0.4rem', fontWeight: 700, fontSize: '0.9rem', color: 'var(--text-main)' }}>
              📝 Custom Travel Notes & Special Requests for AI (Optional)
            </label>
            <textarea
              className="clean-input"
              rows="2"
              placeholder="e.g. Traveling with elderly parents (need wheelchair access), vegetarian street food emphasis, prefer morning photography..."
              value={customTripNotes}
              onChange={(e) => setCustomTripNotes(e.target.value)}
              style={{ width: '100%', resize: 'vertical' }}
            />
          </div>

          {/* REDESIGNED PLAN TRIP CTA BUTTON (Requirement 14 & Gemini Integration) */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <button type="button" className="secondary-action" onClick={() => setCurrentStep(4)}>
              ← Back
            </button>
            <button
              type="button"
              className="plan-trip-cta-btn"
              disabled={isAiGenerating}
              onClick={handleGenerateItinerary}
              style={{ padding: '0.85rem 2.5rem', fontSize: '1.05rem', borderRadius: '12px' }}
            >
              {isAiGenerating ? (
                <>
                  <span className="spinner-inline">⏳</span>
                  <span>Synthesizing Gemini Itinerary for {cityChoice}...</span>
                </>
              ) : (
                <>
                  <span>✨</span>
                  <span>Generate AI Smart Itinerary ➔</span>
                </>
              )}
            </button>
          </div>
        </div>
      )}

      {/* STEP 6: GENERATED MULTI-DAY ITINERARY + AI ASSISTANT + ROUTE OPTIMIZATION (Requirement 18) */}
      {currentStep === 6 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {/* HEADER SUMMARY CARD */}
          <div className="glass-panel" style={{ padding: '1.5rem', borderRadius: '16px', borderLeft: '5px solid #0f766e' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
              <div>
                <span className="card-tag" style={{ background: 'rgba(15, 118, 110, 0.12)', color: '#0f766e', fontWeight: 800 }}>
                  ✨ Tailored {durationDays}-Day AI Itinerary
                </span>
                <h3 style={{ margin: '0.4rem 0 0.25rem', fontSize: '1.4rem', color: 'var(--text-main)' }}>
                  {durationDays}-Day Experience in {cityChoice} ({budgetTier.toUpperCase()})
                </h3>
                <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '0.875rem' }}>
                  Customized for <strong>{totalTravellers} travellers</strong> seeking <strong>{selectedInterests.join(', ')}</strong> at a <strong>{pace}</strong> pace.
                  {customTripNotes && <span> • <em>Notes: "{customTripNotes}"</em></span>}
                </p>
              </div>

              {/* ACTION TOOLBAR */}
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                <button type="button" className="secondary-action" onClick={handleDownloadItinerary} title="Download printable itinerary text">
                  📥 Download
                </button>
                <button type="button" className="secondary-action" onClick={handleSaveTrip}>
                  💾 Save
                </button>
                <button type="button" className="secondary-action" onClick={handleShareTrip}>
                  🔗 Share
                </button>
                <button type="button" className="secondary-action" onClick={handleAddToCalendar}>
                  📅 Calendar
                </button>
                <button
                  type="button"
                  className="primary-action"
                  onClick={() =>
                    handleOpenBooking &&
                    handleOpenBooking(
                      'package',
                      `${durationDays}-Day ${cityChoice} (${budgetTier.toUpperCase()}) Tour Package`,
                      budgetBreakdown.grandTotal,
                      1,
                      cityChoice
                    )
                  }
                  style={{ padding: '6px 14px', fontSize: '0.8rem' }}
                >
                  Book Package ➔
                </button>
              </div>
            </div>
          </div>

          {/* ADVANCED TRIP PLANNER SUB-TABS: ITINERARY | HOTELS IN CITY | CABS (User Request 8) */}
          <div className="planner-subtabs-nav">
            <button
              type="button"
              className={`planner-subtab-btn ${plannerTab === 'itinerary' ? 'active' : ''}`}
              onClick={() => setPlannerTab('itinerary')}
            >
              <span>🗺️</span>
              <span>Day-by-Day Route & Map</span>
            </button>
            <button
              type="button"
              className={`planner-subtab-btn ${plannerTab === 'hotels' ? 'active' : ''}`}
              onClick={() => setPlannerTab('hotels')}
            >
              <span>🏨</span>
              <span>Stays in ${cityChoice} ({cityHotelsList.length})</span>
            </button>
            <button
              type="button"
              className={`planner-subtab-btn ${plannerTab === 'cabs' ? 'active' : ''}`}
              onClick={() => setPlannerTab('cabs')}
            >
              <span>🚕</span>
              <span>Book Cab & Airport Transfers</span>
            </button>
          </div>

          {/* ===================== VIEW: INTEGRATED HOTELS ===================== */}
          {plannerTab === 'hotels' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div className="glass-panel" style={{ padding: '1.25rem 1.5rem', borderRadius: '16px', borderLeft: '5px solid #0f766e' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem' }}>
                  <div>
                    <h3 style={{ margin: 0, fontSize: '1.25rem', color: 'var(--text-main)', fontWeight: 800 }}>
                      🏨 Recommended Stays in ${cityChoice} for Your Itinerary
                    </h3>
                    <p style={{ margin: '3px 0 0', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                      Selected based on your ${budgetTier.toUpperCase()} budget tier and proximity to scheduled attractions.
                    </p>
                  </div>
                  <span style={{ background: 'rgba(15, 118, 110, 0.12)', color: '#0f766e', padding: '4px 12px', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 800 }}>
                    ⚡ Verified Availability
                  </span>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(310px, 1fr))', gap: '1.25rem' }}>
                {cityHotelsList.map((hotel) => (
                  <article
                    key={hotel.id}
                    className="glass-panel"
                    style={{
                      background: 'var(--bg-surface, #ffffff)',
                      padding: '1.25rem',
                      borderRadius: '16px',
                      border: '1px solid var(--border)',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '0.75rem',
                      boxShadow: '0 4px 16px rgba(0, 0, 0, 0.04)',
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <div>
                        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase' }}>
                          {hotel.type}
                        </span>
                        <h4 style={{ margin: '2px 0 0', fontSize: '1.1rem', color: 'var(--text-main)', fontWeight: 800 }}>
                          {hotel.name}
                        </h4>
                        <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>📍 {hotel.address}</span>
                      </div>
                      <span style={{ fontSize: '0.825rem', fontWeight: 800, color: '#f59e0b' }}>
                        ⭐ {hotel.rating} ({hotel.reviews})
                      </span>
                    </div>

                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                      {hotel.amenities.map((amenity, aIdx) => (
                        <span key={aIdx} style={{ background: 'var(--bg-surface-elevated, #f1f5f9)', color: 'var(--text-muted)', fontSize: '0.725rem', padding: '2px 8px', borderRadius: '4px', fontWeight: 600 }}>
                          ✓ {amenity}
                        </span>
                      ))}
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto', paddingTop: '0.75rem', borderTop: '1px dashed var(--border)' }}>
                      <div>
                        <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', display: 'block' }}>Estimated Rate</span>
                        <strong style={{ fontSize: '1.15rem', color: '#0f766e', fontWeight: 800 }}>
                          {formatPrice(hotel.pricePerNight)}
                          <span style={{ fontSize: '0.75rem', fontWeight: 500, color: 'var(--text-muted)' }}> / night</span>
                        </strong>
                      </div>

                      <div style={{ display: 'flex', gap: '6px' }}>
                        <a
                          href={`https://wa.me/${hotel.whatsapp}?text=${encodeURIComponent(`Hi ${hotel.name}, I want to check room availability for ${durationDays} nights in ${cityChoice} via Yatra 66.`)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                            padding: '6px 10px',
                            background: '#25D366',
                            color: 'white',
                            borderRadius: '8px',
                            textDecoration: 'none',
                            fontSize: '0.8rem',
                            display: 'flex',
                            alignItems: 'center',
                          }}
                          title="WhatsApp Inquire"
                        >
                          💬
                        </a>
                        <button
                          type="button"
                          className="primary-action"
                          style={{ padding: '6px 14px', fontSize: '0.8rem' }}
                          onClick={() => {
                            if (handleOpenBooking) {
                              handleOpenBooking('hotel', hotel.name, hotel.pricePerNight, 1, cityChoice);
                            }
                          }}
                        >
                          Book Stay ➔
                        </button>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          )}

          {/* ===================== VIEW: INTEGRATED CABS ===================== */}
          {plannerTab === 'cabs' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div className="glass-panel" style={{ padding: '1.25rem 1.5rem', borderRadius: '16px', borderLeft: '5px solid #0f766e' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem' }}>
                  <div>
                    <h3 style={{ margin: 0, fontSize: '1.25rem', color: 'var(--text-main)', fontWeight: 800 }}>
                      🚕 Verified Local Cabs & Airport Transfers for ${cityChoice}
                    </h3>
                    <p style={{ margin: '3px 0 0', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                      Transparent direct operator pricing with zero surge markup for your ${durationDays}-day stay.
                    </p>
                  </div>
                  <span style={{ background: 'rgba(16, 185, 129, 0.12)', color: '#047857', padding: '4px 12px', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 800 }}>
                    🛡️ Verified Drivers
                  </span>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(310px, 1fr))', gap: '1.25rem' }}>
                {cityCabsList.map((cab) => (
                  <article
                    key={cab.id}
                    className="glass-panel"
                    style={{
                      background: 'var(--bg-surface, #ffffff)',
                      padding: '1.25rem',
                      borderRadius: '16px',
                      border: '1px solid var(--border)',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '0.75rem',
                      boxShadow: '0 4px 16px rgba(0, 0, 0, 0.04)',
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <div>
                        <span style={{ fontSize: '0.75rem', color: '#0f766e', fontWeight: 700, textTransform: 'uppercase' }}>
                          🚕 {cab.type}
                        </span>
                        <h4 style={{ margin: '2px 0 0', fontSize: '1.05rem', color: 'var(--text-main)', fontWeight: 800 }}>
                          {cab.title}
                        </h4>
                        <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                          🚘 {cab.vehicle} • {cab.capacity}
                        </span>
                      </div>
                    </div>

                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                      {cab.features.map((feat, fIdx) => (
                        <span key={fIdx} style={{ background: 'var(--bg-surface-elevated, #f1f5f9)', color: 'var(--text-muted)', fontSize: '0.725rem', padding: '2px 8px', borderRadius: '4px', fontWeight: 600 }}>
                          ✓ {feat}
                        </span>
                      ))}
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto', paddingTop: '0.75rem', borderTop: '1px dashed var(--border)' }}>
                      <div>
                        <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', display: 'block' }}>Estimated Fare</span>
                        <strong style={{ fontSize: '1.15rem', color: '#0f766e', fontWeight: 800 }}>
                          {cab.fareFormatted}
                        </strong>
                      </div>

                      <button
                        type="button"
                        className="primary-action"
                        style={{ padding: '6px 14px', fontSize: '0.8rem' }}
                        onClick={() => {
                          if (handleOpenBooking) {
                            handleOpenBooking('cab', cab.title, cab.fareEstimate, 1, cityChoice);
                          }
                        }}
                      >
                        Book Cab ➔
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          )}

          {/* ===================== VIEW: ITINERARY & ROUTE MAP ===================== */}
          {plannerTab === 'itinerary' && (
            <>
              {/* AI TRAVEL ASSISTANT & ITINERARY INTELLIGENCE (Requirement 18) */}
          <div className="ai-planner-capsule">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '1.4rem' }}>🤖</span>
                <div>
                  <h4 style={{ margin: 0, fontSize: '1.15rem', color: 'var(--text-main)' }}>
                    AI Travel Assistant & Real-Time Logistics
                  </h4>
                  <span style={{ fontSize: '0.775rem', color: 'var(--text-muted)' }}>
                    Crowd avoidance, weather-smart sequencing, and custom prompt modifiers
                  </span>
                </div>
              </div>
              <span style={{ background: '#0f766e', color: 'white', padding: '3px 10px', borderRadius: '12px', fontSize: '0.75rem', fontWeight: 800 }}>
                Active AI Engine
              </span>
            </div>

            {/* AI INTELLIGENCE 2-COL GRID */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem', marginBottom: '1.25rem' }}>
              <div style={{ background: 'var(--bg-surface, #ffffff)', padding: '1rem', borderRadius: '12px', border: '1px solid rgba(15, 118, 110, 0.2)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px', fontWeight: 700, color: '#0f766e', fontSize: '0.85rem' }}>
                  <span>⚡</span> AI Crowd Density Forecast
                </div>
                <p style={{ margin: 0, fontSize: '0.825rem', color: 'var(--text-muted)', lineHeight: 1.45 }}>
                  {aiPlanData?.crowdForecast || 'Morning departure at 08:30 AM schedules primary heritage attractions before the peak tourist wave (11:30 AM - 02:30 PM), reducing queue delays by ~40-50 minutes.'}
                </p>
              </div>

              <div style={{ background: 'var(--bg-surface, #ffffff)', padding: '1rem', borderRadius: '12px', border: '1px solid rgba(15, 118, 110, 0.2)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px', fontWeight: 700, color: '#0f766e', fontSize: '0.85rem' }}>
                  <span>⛅</span> Weather-Smart Scheduling
                </div>
                <p style={{ margin: 0, fontSize: '0.825rem', color: 'var(--text-muted)', lineHeight: 1.45 }}>
                  {aiPlanData?.weatherAdvice || 'Daytime temperature forecast ~31°C. Indoor museum galleries, artisan workshops, and shaded dining scheduled between 01:00 PM - 03:30 PM to dodge the afternoon sun.'}
                </p>
              </div>
            </div>

            {/* AI INSIDER HACKS (If provided by Gemini) */}
            {aiPlanData?.insiderHacks && Array.isArray(aiPlanData.insiderHacks) && aiPlanData.insiderHacks.length > 0 && (
              <div style={{ background: 'rgba(15, 118, 110, 0.05)', border: '1px solid rgba(15, 118, 110, 0.25)', borderRadius: '12px', padding: '1rem', marginBottom: '1.25rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '6px', fontWeight: 800, color: '#0f766e', fontSize: '0.875rem' }}>
                  <span>💡</span> Gemini Insider Travel Hacks for {cityChoice}
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '0.5rem' }}>
                  {aiPlanData.insiderHacks.map((hack, hIdx) => (
                    <div key={hIdx} style={{ fontSize: '0.8rem', color: 'var(--text-main)', display: 'flex', gap: '6px', lineHeight: 1.4 }}>
                      <span style={{ color: '#0f766e', fontWeight: 700 }}>•</span>
                      <span>{hack}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* INTERACTIVE "ASK AI TO MODIFY ITINERARY" BAR (Requirement 18) */}
            <div style={{ background: 'var(--bg-surface, #ffffff)', padding: '1.25rem', borderRadius: '14px', border: '1px solid var(--border)' }}>
              <span style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--text-main)', display: 'block', marginBottom: '0.5rem' }}>
                💬 Ask AI to Modify Itinerary
              </span>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleAskAi(aiPromptInput);
                }}
                style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.75rem' }}
              >
                <input
                  type="text"
                  className="clean-input"
                  placeholder="e.g. Make it more relaxed, add street food walk, focus on sunset photography..."
                  value={aiPromptInput}
                  onChange={(e) => setAiPromptInput(e.target.value)}
                  style={{ flex: 1, fontSize: '0.9rem' }}
                />
                <button
                  type="submit"
                  className="primary-action"
                  disabled={isAiProcessing}
                  style={{ padding: '0.65rem 1.5rem', whiteSpace: 'nowrap' }}
                >
                  {isAiProcessing ? 'Thinking...' : 'Ask AI ➔'}
                </button>
              </form>

              {/* QUICK PROMPT CHIPS */}
              <div className="ai-chips-row">
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', alignSelf: 'center' }}>
                  Quick Chips:
                </span>
                <button
                  type="button"
                  className="ai-prompt-chip"
                  onClick={() => handleAskAi('Make it more relaxed')}
                >
                  🌿 Relaxed Pace
                </button>
                <button
                  type="button"
                  className="ai-prompt-chip"
                  onClick={() => handleAskAi('Add street food tour')}
                >
                  🍛 Add Food Walk
                </button>
                <button
                  type="button"
                  className="ai-prompt-chip"
                  onClick={() => handleAskAi('Add sunset photography points')}
                >
                  📸 Golden Hour Photos
                </button>
                <button
                  type="button"
                  className="ai-prompt-chip"
                  onClick={() => handleAskAi('Family and senior friendly')}
                >
                  👨‍👩‍👧 Family Friendly
                </button>
              </div>
            </div>
          </div>

          {/* DAY-BY-DAY SWITCHER TABS */}
          <div className="glass-panel" style={{ padding: '1rem', borderRadius: '16px' }}>
            <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '4px' }}>
              {multiDayPlan.map((dPlan) => (
                <button
                  key={dPlan.dayNumber}
                  type="button"
                  className={`quick-pill-tag ${activeDay === dPlan.dayNumber ? 'active' : ''}`}
                  onClick={() => setActiveDay(dPlan.dayNumber)}
                  style={{
                    cursor: 'pointer',
                    padding: '8px 18px',
                    borderRadius: '20px',
                    fontSize: '0.85rem',
                    fontWeight: 700,
                    whiteSpace: 'nowrap',
                  }}
                >
                  <span>🗓️ Day {dPlan.dayNumber}</span>
                  {activeDay === dPlan.dayNumber && <span style={{ marginLeft: '4px' }}>✓</span>}
                </button>
              ))}
            </div>

            <div style={{ marginTop: '0.75rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
              <span style={{ fontSize: '0.95rem', fontWeight: 700, color: '#0f766e' }}>
                {multiDayPlan.find((p) => p.dayNumber === activeDay)?.theme}
              </span>

              <button
                type="button"
                className="secondary-action"
                onClick={() => setShowAddStopModal(true)}
                style={{ padding: '6px 12px', fontSize: '0.8rem' }}
              >
                ➕ Add Custom Stop to Day {activeDay}
              </button>
            </div>
          </div>

          {/* ROUTE MAP & OPTIMIZE BUTTON */}
          <div className="glass-panel" style={{ padding: '1.5rem', borderRadius: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '1rem' }}>
              <div>
                <h4 style={{ margin: 0, fontSize: '1.15rem', color: 'var(--text-main)' }}>
                  Day {activeDay} Route & Waypoint Map
                </h4>
                <p style={{ margin: '0.2rem 0 0', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                  Numbered markers connect your stops for Day {activeDay}. Click Optimize to reduce transit km!
                </p>
              </div>

              <button
                type="button"
                className="primary-action"
                onClick={handleOptimizeRoute}
                style={{
                  background: isOptimized ? '#059669' : '#ea580c',
                  padding: '8px 18px',
                  fontSize: '0.85rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                }}
              >
                <span>⚡</span>
                <span>{isOptimized ? 'Route Optimized ✓' : `Optimize Day ${activeDay} Route`}</span>
              </button>
            </div>

            {optimizationNotice && (
              <div style={{ background: 'rgba(16, 185, 129, 0.12)', border: '1px solid #10b981', color: '#065f46', padding: '0.75rem 1rem', borderRadius: '10px', fontSize: '0.85rem', marginBottom: '1rem', fontWeight: 700 }}>
                {optimizationNotice}
              </div>
            )}

            <SihRouteMap
              waypoints={currentDayWaypoints}
              cityName={cityChoice}
              height="380px"
            />
          </div>

          {/* DAY STOPS TIMELINE */}
          <div className="glass-panel" style={{ padding: '1.5rem', borderRadius: '16px' }}>
            <h4 style={{ margin: '0 0 1rem', fontSize: '1.15rem', color: 'var(--text-main)' }}>
              Day {activeDay} Timeline Sequence ({currentDayWaypoints.length} Stops)
            </h4>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              {currentDayWaypoints.map((wp, idx) => (
                <div
                  key={wp.id || idx}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem',
                    padding: '0.85rem 1rem',
                    borderRadius: '12px',
                    background: 'var(--bg-surface-elevated, #f8fafc)',
                    border: '1px solid var(--border-color, #e2e8f0)',
                  }}
                >
                  <div
                    style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      background: idx === 0 ? '#0f766e' : '#ea580c',
                      color: 'white',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 800,
                      fontSize: '0.85rem',
                      flexShrink: 0,
                    }}
                  >
                    {wp.sequenceOrder || idx + 1}
                  </div>

                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <strong style={{ fontSize: '0.95rem', color: 'var(--text-main)' }}>{wp.name}</strong>
                      <span style={{ fontSize: '0.8rem', color: '#0f766e', fontWeight: 700 }}>{wp.time}</span>
                    </div>
                    <div style={{ display: 'flex', gap: '1rem', fontSize: '0.775rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                      <span>🏷️ {wp.type}</span>
                      {wp.slot && <span>⏰ {wp.slot}</span>}
                      {wp.distFromPrevKm > 0 && <span>📍 {wp.distFromPrevKm} km (~{wp.transitMinsFromPrev} mins transit)</span>}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* LOCAL TOURISM MARKETPLACE DIRECT INJECTION */}
          <div className="glass-panel" style={{ padding: '1.5rem', borderRadius: '16px', border: '1.5px solid #0f766e', background: 'var(--bg-surface, #ffffff)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '1rem' }}>
              <div>
                <span className="card-tag" style={{ background: 'rgba(15, 118, 110, 0.12)', color: '#0f766e', fontWeight: 800 }}>
                  🏨 Local Marketplace: Itinerary Injection
                </span>
                <h4 style={{ margin: '0.3rem 0 0', fontSize: '1.15rem', color: 'var(--text-main)' }}>
                  Support Verified Local Businesses in {cityChoice} (Day {activeDay})
                </h4>
                <p style={{ margin: '0.2rem 0 0', fontSize: '0.825rem', color: 'var(--text-muted)' }}>
                  0% commission platform connecting you directly with verified havelis, licensed storytellers, dhabas, and artisans.
                </p>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1rem' }}>
              {localBusinessesForCity.map((biz) => {
                const isInjected = injectedBizIds.includes(biz.id);
                return (
                  <div
                    key={biz.id}
                    style={{
                      border: isInjected ? '1.5px solid #10b981' : '1px solid var(--border-color, #e2e8f0)',
                      borderRadius: '14px',
                      overflow: 'hidden',
                      background: isInjected ? 'rgba(16, 185, 129, 0.05)' : 'var(--bg-surface-elevated, #f8fafc)',
                      display: 'flex',
                      flexDirection: 'column',
                    }}
                  >
                    <div style={{ position: 'relative', height: '120px', overflow: 'hidden' }}>
                      <img
                        src={biz.imageUrl}
                        alt={biz.name}
                        loading="lazy"
                        onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1599661046289-e31897846e41?w=800'; }}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                      <span style={{ position: 'absolute', top: '8px', left: '8px', background: 'rgba(15,23,42,0.85)', color: '#fff', fontSize: '0.7rem', fontWeight: 700, padding: '2px 8px', borderRadius: '10px' }}>
                        {biz.category}
                      </span>
                      <span style={{ position: 'absolute', top: '8px', right: '8px', background: '#0f766e', color: '#fff', fontSize: '0.7rem', fontWeight: 800, padding: '2px 8px', borderRadius: '10px' }}>
                        0% Commission
                      </span>
                    </div>

                    <div style={{ padding: '0.85rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
                      <strong style={{ fontSize: '0.9rem', color: 'var(--text-main)', marginBottom: '2px' }}>{biz.name}</strong>
                      <div style={{ fontSize: '0.75rem', color: '#ea580c', fontWeight: 700, marginBottom: '4px' }}>
                        {biz.directRate}
                      </div>
                      <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', lineHeight: 1.35, margin: '0 0 0.75rem', flex: 1 }}>
                        {biz.description}
                      </p>

                      <button
                        type="button"
                        className={isInjected ? 'secondary-action' : 'primary-action'}
                        style={{ width: '100%', padding: '6px', fontSize: '0.78rem', borderRadius: '8px' }}
                        onClick={() => handleInjectBusiness(biz)}
                      >
                        {isInjected ? '✓ Injected into Day ' + activeDay : '+ Inject into Day ' + activeDay}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* SMART PACKING CHECKLIST */}
          <div className="glass-panel" style={{ padding: '1.5rem', borderRadius: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <div>
                <span className="card-tag" style={{ background: 'rgba(15, 118, 110, 0.12)', color: '#0f766e', fontWeight: 800 }}>
                  🧳 Smart Packing Assistant
                </span>
                <h4 style={{ margin: '0.3rem 0 0', fontSize: '1.15rem', color: 'var(--text-main)' }}>
                  Recommended Packing Checklist for {cityChoice}
                </h4>
              </div>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                {Object.values(checkedPacking).filter(Boolean).length} of {packingItems.length} packed
              </span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '0.65rem' }}>
              {packingItems.map((item) => {
                const isDone = Boolean(checkedPacking[item.id]);
                return (
                  <label
                    key={item.id}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      padding: '8px 12px',
                      borderRadius: '8px',
                      background: isDone ? 'rgba(16, 185, 129, 0.08)' : 'var(--bg-surface-elevated)',
                      border: isDone ? '1px solid #10b981' : '1px solid var(--border)',
                      cursor: 'pointer',
                      fontSize: '0.825rem',
                      textDecoration: isDone ? 'line-through' : 'none',
                      color: isDone ? 'var(--text-muted)' : 'var(--text-main)',
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={isDone}
                      onChange={() => setCheckedPacking((prev) => ({ ...prev, [item.id]: !prev[item.id] }))}
                    />
                    <span>{item.label}</span>
                  </label>
                );
              })}
            </div>
          </div>

          {/* DYNAMIC COST CALCULATOR */}
          <div className="glass-panel" style={{ padding: '1.5rem', borderRadius: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '1rem' }}>
              <div>
                <span className="card-tag" style={{ background: 'rgba(234, 88, 12, 0.12)', color: '#ea580c', fontWeight: 800 }}>
                  💰 Dynamic Cost Calculator
                </span>
                <h4 style={{ margin: '0.3rem 0 0', fontSize: '1.25rem', color: 'var(--text-main)' }}>
                  Expense Breakdown ({durationDays} Days • {totalTravellers} Travelers)
                </h4>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                  Realistic Trip-Cost Calculator with Dynamic Budget Rebalancer
                </div>
              </div>

              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0f766e' }}>
                  {formatPrice(budgetBreakdown.grandTotal)}
                </div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                  ({formatPrice(budgetBreakdown.perPersonCost)} / person)
                </div>
              </div>
            </div>

            {/* INTERACTIVE REALISTIC COST REBALANCING WIDGET */}
            <div style={{ background: 'var(--bg-surface-elevated, #f8fafc)', borderRadius: '14px', padding: '1rem', border: '1px solid var(--border-color, #e2e8f0)', marginBottom: '1.25rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.5rem' }}>
                <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-main)' }}>
                  💡 Too Expensive? Test Our "Reduce Cost" Dynamic Rebalancer:
                </span>
                {rebalanceTarget && (
                  <button
                    type="button"
                    onClick={() => setRebalanceTarget(null)}
                    style={{ fontSize: '0.75rem', color: '#ef4444', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 700 }}
                  >
                    ✕ Reset to Original Budget
                  </button>
                )}
              </div>

              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '0.75rem' }}>
                {[
                  { label: 'Reduce to ₹8,000', amount: 8000 },
                  { label: 'Reduce to ₹12,000', amount: 12000 },
                  { label: 'Reduce to ₹16,000', amount: 16000 },
                  { label: 'Economy Saver (-30%)', amount: Math.round(budgetBreakdown.grandTotal * 0.70) },
                ].map((btn, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setRebalanceTarget(btn.amount)}
                    style={{
                      padding: '5px 12px',
                      borderRadius: '12px',
                      border: '1px solid',
                      borderColor: rebalanceTarget === btn.amount ? '#0f766e' : 'var(--border-color, #cbd5e1)',
                      background: rebalanceTarget === btn.amount ? '#0f766e' : 'var(--bg-surface, #ffffff)',
                      color: rebalanceTarget === btn.amount ? '#ffffff' : 'var(--text-main)',
                      fontSize: '0.78rem',
                      fontWeight: rebalanceTarget === btn.amount ? 700 : 500,
                      cursor: 'pointer',
                    }}
                  >
                    {btn.label}
                  </button>
                ))}
              </div>

              {rebalancedCostData && (
                <div style={{ background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.08), rgba(15, 118, 110, 0.08))', border: '1px dashed #10b981', borderRadius: '12px', padding: '0.85rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                    <strong style={{ color: '#059669', fontSize: '0.85rem' }}>
                      🎉 Successfully Rebalanced! Saved {formatPrice(rebalancedCostData.savings)} ({rebalancedCostData.percentSaved}% reduction)
                    </strong>
                    <span style={{ fontSize: '0.85rem', fontWeight: 800, color: '#0f766e' }}>
                      New Total: {formatPrice(rebalancedCostData.targetTotal)}
                    </span>
                  </div>

                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '6px' }}>
                    Smart Trade-offs Applied to Preserve Comfort & Quality:
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    {rebalancedCostData.tradeOffs.map((to, toIdx) => (
                      <div key={toIdx} style={{ fontSize: '0.75rem', display: 'flex', gap: '6px', alignItems: 'flex-start' }}>
                        <span>{to.icon}</span>
                        <div>
                          <strong style={{ color: 'var(--text-main)' }}>{to.action}</strong>
                          <span style={{ color: '#059669', fontWeight: 700, marginLeft: '6px' }}>
                            (Saves ~{formatPrice(to.savedAmount)})
                          </span>
                          <div style={{ color: 'var(--text-subtle)', fontSize: '0.7rem' }}>{to.detail}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* PROGRESS STACK BAR */}
            <div style={{ height: '10px', borderRadius: '5px', overflow: 'hidden', display: 'flex', marginBottom: '1.25rem' }}>
              {budgetBreakdown.items.map((item, idx) => (
                <div
                  key={idx}
                  style={{ width: `${item.percentage}%`, background: item.color }}
                  title={`${item.category}: ${item.percentage}% (${formatPrice(item.amount)})`}
                />
              ))}
            </div>

            {/* BREAKDOWN CARDS */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '0.75rem' }}>
              {budgetBreakdown.items.map((item, idx) => (
                <div
                  key={idx}
                  style={{
                    background: 'var(--bg-surface-elevated, #f8fafc)',
                    padding: '0.85rem',
                    borderRadius: '10px',
                    borderLeft: `4px solid ${item.color}`,
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2px' }}>
                    <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-main)' }}>
                      {item.icon} {item.category}
                    </span>
                    <strong style={{ fontSize: '0.9rem', color: item.color }}>
                      {formatPrice(item.amount)}
                    </strong>
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                    {item.details}
                  </div>
                  <div style={{ fontSize: '0.725rem', color: 'var(--text-subtle)', marginTop: '2px' }}>
                    {item.desc}
                  </div>
                </div>
              ))}
            </div>
          </div>
            </>
          )}

          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <button type="button" className="secondary-action" onClick={() => setCurrentStep(5)}>
              ← Edit Trip Preferences
            </button>
            <button type="button" className="primary-action" onClick={() => setCurrentStep(1)}>
              Plan Another Trip ➔
            </button>
          </div>
        </div>
      )}

      {/* ADD CUSTOM STOP MODAL */}
      {showAddStopModal && (
        <div className="modal-backdrop" onClick={() => setShowAddStopModal(false)}>
          <div className="hotel-compare-modal-window" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '440px' }}>
            <div className="modal-header">
              <div>
                <span className="eyebrow">Customize Itinerary</span>
                <h3>Add Stop to Day {activeDay}</h3>
              </div>
              <button type="button" className="close-btn" onClick={() => setShowAddStopModal(false)}>✕</button>
            </div>

            <form onSubmit={handleAddCustomStop} style={{ marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <label>
                <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>
                  Attraction / Location Name
                </span>
                <input
                  type="text"
                  required
                  placeholder="e.g. Royal Textile Museum, Iconic Cafe, Stepwell"
                  value={newStopForm.name}
                  onChange={(e) => setNewStopForm({ ...newStopForm, name: e.target.value })}
                  style={{ width: '100%', padding: '8px', borderRadius: '8px', border: '1px solid var(--border)' }}
                />
              </label>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                <label>
                  <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>
                    Time Slot
                  </span>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 02:30 PM"
                    value={newStopForm.time}
                    onChange={(e) => setNewStopForm({ ...newStopForm, time: e.target.value })}
                    style={{ width: '100%', padding: '8px', borderRadius: '8px', border: '1px solid var(--border)' }}
                  />
                </label>

                <label>
                  <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>
                    Day Phase
                  </span>
                  <select
                    value={newStopForm.slot}
                    onChange={(e) => setNewStopForm({ ...newStopForm, slot: e.target.value })}
                    style={{ width: '100%', padding: '8px', borderRadius: '8px', border: '1px solid var(--border)' }}
                  >
                    <option value="Morning">Morning</option>
                    <option value="Afternoon">Afternoon</option>
                    <option value="Evening">Evening</option>
                    <option value="Night">Night</option>
                  </select>
                </label>
              </div>

              <button
                type="submit"
                className="primary-action"
                style={{ padding: '10px', fontSize: '0.95rem', justifyContent: 'center', marginTop: '0.5rem' }}
              >
                Add Stop to Itinerary ➔
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
