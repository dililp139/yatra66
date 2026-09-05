// ============================================================================
// YATRA 66 — SMART INDIA HACKATHON (SIH) INTELLIGENT TOURISM DATASET
// Solving: Tourist Discovery, Local Business Visibility & Destination Decongestion
// ============================================================================

export const FIVE_CITIES_MVP = [
  {
    id: 1,
    name: 'Jaipur',
    state: 'Rajasthan',
    region: 'North India',
    tagline: 'The Royal Pink City & UNESCO World Heritage Gem',
    description: 'Famed for towering hilltop forts, ornate royal palaces, gemstone bazaars, and vibrant Rajasthani culture.',
    bestSeason: 'October to March',
    recommendedDuration: '3-4 Days',
    startingBudgetInr: 3800,
    rating: 4.8,
    popularityScore: 97,
    sustainabilityScore: 88,
    latitude: 26.9124,
    longitude: 75.7873,
    heroImage: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?w=1200&q=80',
    themes: ['heritage', 'forts', 'culture', 'shopping', 'food'],
    airport: 'Jaipur International Airport (JAI)',
    railway: 'Jaipur Junction (JP)',
    metroAvailable: true,
  },
  {
    id: 2,
    name: 'Agra',
    state: 'Uttar Pradesh',
    region: 'North India',
    tagline: 'Timeless Mughal Architecture & Wonder of the World',
    description: 'Home to the iconic Taj Mahal, majestic Agra Fort, and historic marble inlay artisanal traditions.',
    bestSeason: 'October to March',
    recommendedDuration: '2 Days',
    startingBudgetInr: 3200,
    rating: 4.9,
    popularityScore: 99,
    sustainabilityScore: 82,
    latitude: 27.1767,
    longitude: 78.0081,
    heroImage: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?w=1200&q=80',
    themes: ['unesco', 'heritage', 'romantic', 'architecture'],
    airport: 'Agra Airport (AGR) / Delhi IGI',
    railway: 'Agra Cantt (AGC)',
    metroAvailable: true,
  },
  {
    id: 3,
    name: 'Delhi',
    state: 'Delhi NCR',
    region: 'North India',
    tagline: 'Ancient Heritage Meets Modern Global Metropolis',
    description: 'An ancient capital layered across seven historical eras, world-class museums, street gastronomy, and bustling bazaars.',
    bestSeason: 'October to March',
    recommendedDuration: '3-5 Days',
    startingBudgetInr: 4500,
    rating: 4.7,
    popularityScore: 95,
    sustainabilityScore: 85,
    latitude: 28.6139,
    longitude: 77.2090,
    heroImage: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?w=1200&q=80',
    themes: ['history', 'food', 'markets', 'museums', 'architecture'],
    airport: 'Indira Gandhi International Airport (DEL)',
    railway: 'New Delhi Railway Station (NDLS)',
    metroAvailable: true,
  },
  {
    id: 4,
    name: 'Mumbai',
    state: 'Maharashtra',
    region: 'West India',
    tagline: 'City of Dreams, Victorian Gothic Splendor & Coastal Energy',
    description: 'A coastal megacity celebrating Art Deco promenades, Bollywood heritage, bustling street culture, and historic island caves.',
    bestSeason: 'November to February',
    recommendedDuration: '3-4 Days',
    startingBudgetInr: 5800,
    rating: 4.6,
    popularityScore: 93,
    sustainabilityScore: 84,
    latitude: 19.0760,
    longitude: 72.8777,
    heroImage: 'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?w=1200&q=80',
    themes: ['beaches', 'colonial', 'nightlife', 'food', 'cinema'],
    airport: 'Chhatrapati Shivaji Maharaj Airport (BOM)',
    railway: 'CSMT Mumbai / Mumbai Central (BCT)',
    metroAvailable: true,
  },
  {
    id: 7,
    name: 'Goa',
    state: 'Goa',
    region: 'West India',
    tagline: 'Sun-Drenched Coastlines, Baroque Churches & Spice Plantations',
    description: 'A tranquil tropical haven blending Portuguese colonial architecture, serene backwaters, fresh Konkan seafood, and golden beaches.',
    bestSeason: 'November to March',
    recommendedDuration: '4-6 Days',
    startingBudgetInr: 4800,
    rating: 4.8,
    popularityScore: 98,
    sustainabilityScore: 91,
    latitude: 15.2993,
    longitude: 74.1240,
    heroImage: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=1200&q=80',
    themes: ['beaches', 'nature', 'portuguese', 'nightlife', 'spiritual'],
    airport: 'Dabolim (GOI) / Manohar Mopa (GOX)',
    railway: 'Madgaon Junction (MAO)',
    metroAvailable: false,
  }
];

// ============================================================================
// HIDDEN GEMS: "Go Beyond the Famous" (Decongesting Hotspots)
// ============================================================================
export const HIDDEN_GEMS_DATA = [
  {
    id: 'gem-bundi',
    name: 'Bundi Stepwells & Taragarh Fort',
    cityId: 1,
    cityName: 'Bundi',
    nearCity: 'Jaipur',
    category: 'Architecture & Stepwells',
    distanceFromCenterKm: 210,
    distanceFromHub: '3.5 hrs from Jaipur',
    tag: 'City of 50+ Baoris & Murals',
    whyVisit: 'Mesmerizing multi-tiered stepwells (Raniji ki Baori) and 16th-century Rajput palace frescoes.',
    shortDesc: 'A captivating blue-painted oasis boasting 50+ intricately carved stepwells, ruined hilltop fortress, and world-famous Chitrashala miniature frescoes.',
    fullDesc: 'Bundi is an untouched medieval jewel where narrow cobalt-blue alleys wind beneath the majestic Taragarh Fort. Far from commercial tourist crowds, marvel at the 46-meter deep Raniji ki Baori stepwell and Sukh Mahal where Rudyard Kipling penned Kim.',
    description: 'A captivating blue-painted oasis boasting 50+ intricately carved stepwells, ruined hilltop fortress, and world-famous Chitrashala miniature frescoes.',
    bestTime: 'October to March',
    bestTimeToVisit: 'October to March',
    estimatedCostInr: 350,
    decongestionScore: 92,
    decongestionFactor: 'Extreme (92% less crowded than Jaipur Forts)',
    imageUrl: 'https://images.unsplash.com/photo-1477587458883-47145ed94245?w=800',
    heroImage: 'https://images.unsplash.com/photo-1477587458883-47145ed94245?w=800',
    verified: true,
    themes: ['heritage', 'stepwells', 'art', 'offbeat', 'forts'],
    sustainabilityImpact: 'Directly supports local haveli conservation, rainwater stepwell revival, and Bundi school miniature painters.',
    howToReach: 'Direct express train from Kota Junction (35 km) or 3.5 hr scenic cab from Jaipur.',
    nearbyStay: 'Bundi Vilas Heritage Haveli (₹2,200/night)',
    nearbyFood: 'Bundi Laddoo, Dal Baati & Traditional Chai',
    latitude: 25.4414,
    longitude: 75.6454
  },
  {
    id: 'gem-samode',
    name: 'Samode Palace & Heritage Artisan Village',
    cityId: 1,
    cityName: 'Samode',
    nearCity: 'Jaipur',
    category: 'Heritage & Rural Crafts',
    distanceFromCenterKm: 42,
    distanceFromHub: '45 mins from Jaipur',
    tag: 'Royal Durbar & Village Weavers',
    whyVisit: '400-year-old Shekhawati mirror hall (Sheesh Mahal) and authentic carpet weaving workshops.',
    shortDesc: 'A quiet aristocratic village nestled in an Aravalli valley, famed for opulent royal frescoes, Sheesh Mahal mirror work, and rural handloom weavers.',
    fullDesc: 'Located just 42 km north of Jaipur, Samode is a serene contrast to Amber Fort. Stroll through cobblestone village trails where carpet knotters, bangle makers, and leather mojari artisans practice ancestral crafts.',
    description: 'A quiet aristocratic village nestled in an Aravalli valley, famed for opulent royal frescoes, Sheesh Mahal mirror work, and rural handloom weavers.',
    bestTime: 'October to March',
    bestTimeToVisit: 'October to March',
    estimatedCostInr: 500,
    decongestionScore: 90,
    decongestionFactor: 'High (90% peaceful compared to Amber Fort)',
    imageUrl: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?w=800',
    heroImage: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?w=800',
    verified: true,
    themes: ['heritage', 'art', 'offbeat', 'textiles'],
    sustainabilityImpact: 'Keeps 100% of tourism spend inside rural artisan cooperatives and village schools.',
    howToReach: '45 min cab or state bus north of Jaipur via NH48.',
    nearbyStay: 'Samode Bagh Garden Farmstay (₹2,800/night)',
    nearbyFood: 'Village Bajra Roti with Lasun Chutney & Fresh Buttermilk',
    latitude: 27.2144,
    longitude: 75.8157
  },
  {
    id: 'gem-gaitore',
    name: 'Royal Gaitore Cenotaphs (Gaitor Ki Chhatriyan)',
    cityId: 1,
    cityName: 'Jaipur',
    nearCity: 'Jaipur',
    category: 'Architecture & Serenity',
    distanceFromCenterKm: 6,
    distanceFromHub: '15 mins from City Center',
    tag: 'Peaceful Marble Cenotaphs',
    whyVisit: 'Intricately sculpted marble domes and peacocks in a secluded Aravalli gorge.',
    shortDesc: 'A tranquil royal cremation memorial of Kachwaha Rajput kings featuring breathtaking white marble chhatris with zero crowd commotion.',
    fullDesc: 'Nestled in the shadows of Nahargarh Fort, Gaitore houses the grand marble cenotaph of Maharaja Sawai Jai Singh II. Each dome features intricate carvings of war elephants, battle scenes, and dancing peacocks.',
    description: 'A tranquil royal cremation memorial of Kachwaha Rajput kings featuring breathtaking white marble chhatris with zero crowd commotion.',
    bestTime: 'Early Morning (8:00 AM - 10:30 AM)',
    bestTimeToVisit: 'Early Morning',
    estimatedCostInr: 100,
    decongestionScore: 94,
    decongestionFactor: 'Extreme (94% fewer crowds than City Palace)',
    imageUrl: 'https://images.unsplash.com/photo-1477587458883-47145ed94245?w=800',
    heroImage: 'https://images.unsplash.com/photo-1477587458883-47145ed94245?w=800',
    verified: true,
    themes: ['heritage', 'architecture', 'spiritual', 'offbeat'],
    sustainabilityImpact: 'Preserves delicate marble craftsmanship and quiet historic conservation buffer zone.',
    howToReach: '15 min e-rickshaw or auto from Hawa Mahal.',
    nearbyStay: 'Khandela Haveli Heritage Stay',
    nearbyFood: 'Traditional Poha & Masala Chai at Jorawar Singh Gate',
    latitude: 26.9388,
    longitude: 75.8286
  },
  {
    id: 'gem-chandlai',
    name: 'Chandlai Lake Bird Sanctuary',
    cityId: 1,
    cityName: 'Jaipur',
    nearCity: 'Jaipur',
    category: 'Nature & Wildlife',
    distanceFromCenterKm: 30,
    distanceFromHub: '30 mins south of Jaipur',
    tag: 'Pink Flamingo Wetland',
    whyVisit: '10,000+ migratory pink flamingos and peaceful nature sunsets.',
    shortDesc: 'A pristine 140-year-old freshwater lake welcoming thousands of migratory flamingos, pelicans, and waders every winter.',
    fullDesc: 'A hidden ecotourism paradise away from the city noise. Enjoy serene morning photography with flocks of Greater Flamingos gracefully wading across shimmering waters during golden hour.',
    description: 'A pristine 140-year-old freshwater lake welcoming thousands of migratory flamingos, pelicans, and waders every winter.',
    bestTime: 'Sunrise or Sunset (Nov - March)',
    bestTimeToVisit: 'Sunrise or Sunset (Nov - March)',
    estimatedCostInr: 0,
    decongestionScore: 97,
    decongestionFactor: 'Pristine (97% quiet nature atmosphere)',
    imageUrl: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=800',
    heroImage: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=800',
    verified: true,
    themes: ['nature', 'wildlife', 'offbeat', 'photography'],
    sustainabilityImpact: 'Zero ticket commercialization; supports rural wetland ecology and local biodiversity monitoring.',
    howToReach: '30 min drive south on Kota-Jaipur Road (NH52).',
    nearbyStay: 'Umaid Farm Resort (Sanganer)',
    nearbyFood: 'Sanganeri Poha & Masala Buttermilk',
    latitude: 26.6853,
    longitude: 75.8711
  },
  {
    id: 'gem-chandbaori',
    name: 'Chand Baori Stepwell (Abhaneri)',
    cityId: 1,
    cityName: 'Jaipur',
    nearCity: 'Jaipur',
    category: 'Architecture & Heritage',
    distanceFromCenterKm: 88,
    distanceFromHub: '1.5 hrs from Jaipur',
    tag: 'Ancient Stepwell Wonder',
    whyVisit: '3,500 geometric steps arranged in hypnotic symmetry down 13 storeys.',
    shortDesc: 'One of the deepest and most geometrically mesmerizing stepwells in the world, built in the 9th century.',
    fullDesc: 'Built in the 9th century by King Chanda of the Nikumbha Dynasty, Chand Baori is an ancient rainwater harvesting marvel featuring 13 tiered storeys in perfect symmetry.',
    description: 'One of the deepest and most geometrically mesmerizing stepwells in the world, built in the 9th century.',
    bestTime: 'Early Morning (8:00 AM - 11:00 AM)',
    bestTimeToVisit: 'Early Morning',
    estimatedCostInr: 250,
    decongestionScore: 86,
    decongestionFactor: 'High (86% fewer crowds than Amber Fort)',
    imageUrl: 'https://images.unsplash.com/photo-1477587458883-47145ed94245?w=800',
    heroImage: 'https://images.unsplash.com/photo-1477587458883-47145ed94245?w=800',
    verified: true,
    themes: ['heritage', 'stepwells', 'architecture', 'offbeat'],
    sustainabilityImpact: 'Directly supports Abhaneri artisan village cooperatives and local terracotta potters.',
    howToReach: '1.5 hr drive from Jaipur via Agra-Jaipur Highway (NH21).',
    nearbyStay: 'Umaid Lake Palace (Eco-Heritage Farmstay)',
    nearbyFood: 'Abhaneri Village Heritage Thali',
    latitude: 27.0072,
    longitude: 76.6064
  },
  {
    id: 'gem-orchha',
    name: 'Orchha Medieval Riverfront Palaces',
    cityId: 2,
    cityName: 'Orchha',
    nearCity: 'Agra',
    category: 'Heritage & Riverfront',
    distanceFromCenterKm: 230,
    distanceFromHub: '3 hrs express train from Agra',
    tag: 'Betwa River Cenotaphs',
    whyVisit: 'Soaring 16th-century stone palaces and peaceful riverside chhatris.',
    shortDesc: 'A sleepy medieval capital frozen in time on the banks of the Betwa River, showcasing the grand Jahangir Mahal and Chaturbhuj Temple.',
    fullDesc: 'Orchha was founded in 1501 by the Bundela chief Rudra Pratap Singh. With no high-rise developments or traffic jams, travelers can explore riverside cenotaphs, ancient murals, and river rafting in peaceful isolation.',
    description: 'A sleepy medieval capital frozen in time on the banks of the Betwa River, showcasing the grand Jahangir Mahal and Chaturbhuj Temple.',
    bestTime: 'October to March',
    bestTimeToVisit: 'October to March',
    estimatedCostInr: 300,
    decongestionScore: 91,
    decongestionFactor: 'Extreme (91% calmer than Agra Fort)',
    imageUrl: 'https://images.unsplash.com/photo-1608958435020-e8a7109ba809?w=800',
    heroImage: 'https://images.unsplash.com/photo-1608958435020-e8a7109ba809?w=800',
    verified: true,
    themes: ['heritage', 'spiritual', 'offbeat', 'architecture'],
    sustainabilityImpact: 'Promotes Betwa river ecology and supports 30+ rural Bundelkhand homestays.',
    howToReach: 'Vande Bharat / Shatabdi to Jhansi Junction (15 km away) + 20 min auto to Orchha.',
    nearbyStay: 'Orchha Palace & Retreat (₹2,100/night)',
    nearbyFood: 'Bundelkhandi Thali & Fresh Mawa Jalebi',
    latitude: 25.3508,
    longitude: 78.6433
  },
  {
    id: 'gem-mandu',
    name: 'Mandu Floating Palaces & Afghan Architecture',
    cityId: 4,
    cityName: 'Mandu',
    nearCity: 'Mumbai',
    category: 'Fortress & Water Palaces',
    distanceFromCenterKm: 550,
    distanceFromHub: '2 hrs from Indore Airport',
    tag: 'Jahaz Mahal & Vindhya Cliffs',
    whyVisit: 'Jahaz Mahal floating between two artificial lakes and poignant romantic legend of Baz Bahadur.',
    shortDesc: 'Perched high on the rugged Vindhya range, Mandu features monumental Afghan architecture, ship palaces, and ancient baobab trees.',
    fullDesc: 'Mandu (Shadiabad - City of Joy) is home to Jahaz Mahal, designed to look like a colossal ship floating on water. Marvel at the acoustically engineered Hindola Mahal and panoramic viewpoints at Rani Roopmati Pavilion.',
    description: 'Perched high on the rugged Vindhya range, Mandu features monumental Afghan architecture, ship palaces, and ancient baobab trees.',
    bestTime: 'July to March (Magical in Monsoons)',
    bestTimeToVisit: 'July to March',
    estimatedCostInr: 250,
    decongestionScore: 89,
    decongestionFactor: 'High (89% fewer crowds than coastal resorts)',
    imageUrl: 'https://images.unsplash.com/photo-1585135497273-1a86b09fe70e?w=800',
    heroImage: 'https://images.unsplash.com/photo-1585135497273-1a86b09fe70e?w=800',
    verified: true,
    themes: ['heritage', 'architecture', 'nature', 'offbeat'],
    sustainabilityImpact: 'Protects 60+ medieval water reservoirs and supports local Bhil tribal craft makers.',
    howToReach: '2 hr scenic road drive from Indore Airport / Railway Station.',
    nearbyStay: 'Malwa Resort MP Tourism (₹1,900/night)',
    nearbyFood: 'Baobab Tamarind Drink & Malwi Dal Bafla',
    latitude: 22.3664,
    longitude: 75.4042
  },
  {
    id: 'gem-mawlynnong',
    name: 'Mawlynnong Living Root Bridges',
    cityId: 10,
    cityName: 'Mawlynnong',
    nearCity: 'Shillong',
    category: 'Ecotourism & Bio-Engineering',
    distanceFromCenterKm: 78,
    distanceFromHub: '2.5 hrs from Shillong',
    tag: 'Asia\'s Cleanest Village',
    whyVisit: 'Living Ficus root bridges bio-engineered over centuries and 100% community cleanliness.',
    shortDesc: 'A pristine Khasi hamlet crowned Asia\'s cleanest village, celebrated for living root bridges, balancing boulders, and organic flower pathways.',
    fullDesc: 'Mawlynnong showcases traditional Khasi community harmony with nature. Walk across suspension bridges woven over centuries from living rubber tree roots across sparkling jungle streams.',
    description: 'A pristine Khasi hamlet crowned Asia\'s cleanest village, celebrated for living root bridges, balancing boulders, and organic flower pathways.',
    bestTime: 'September to May',
    bestTimeToVisit: 'September to May',
    estimatedCostInr: 150,
    decongestionScore: 88,
    decongestionFactor: 'High (Clean organic community sanctuary)',
    imageUrl: 'https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?w=800',
    heroImage: 'https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?w=800',
    verified: true,
    themes: ['nature', 'offbeat', 'ecotourism', 'tribal'],
    sustainabilityImpact: '100% community-owned ecotourism with zero plastic and indigenous bio-engineering.',
    howToReach: '2.5 hr scenic taxi drive from Shillong via Dawki road.',
    nearbyStay: 'Village Bamboo Hut Homestay (₹1,400/night)',
    nearbyFood: 'Khasi Organic Jadoh Rice & Steamed Bamboo Shoot Curry',
    latitude: 25.2016,
    longitude: 91.9056
  },
  {
    id: 'gem-ziro',
    name: 'Ziro Valley & Apatani Plateau',
    cityId: 10,
    cityName: 'Ziro',
    nearCity: 'Shillong',
    category: 'Tribal Culture & Landscapes',
    distanceFromCenterKm: 420,
    distanceFromHub: '4 hrs from Tezpur/Guwahati',
    tag: 'Pine Hills & Apatani Villages',
    whyVisit: 'Ancient wet-rice agro-ecology, bamboo architecture, and unique Apatani facial tattoos.',
    shortDesc: 'A tranquil high-altitude valley surrounded by pine hills, famous for sustainable rice-fish farming and friendly Apatani tribal villages.',
    fullDesc: 'Ziro is a UNESCO tentative world heritage site where the Apatani community has lived in balance with nature for centuries. Experience wooden stilt houses, community pine groves, and gentle hill hiking trails.',
    description: 'A tranquil high-altitude valley surrounded by pine hills, famous for sustainable rice-fish farming and friendly Apatani tribal villages.',
    bestTime: 'March to October',
    bestTimeToVisit: 'March to October',
    estimatedCostInr: 200,
    decongestionScore: 93,
    decongestionFactor: 'Extreme (Pure wilderness isolation)',
    imageUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800',
    heroImage: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800',
    verified: true,
    themes: ['nature', 'tribal', 'offbeat', 'culture'],
    sustainabilityImpact: 'Directly benefits Apatani tribal cooperatives and preserves endangered ancestral rituals.',
    howToReach: 'Overnight train from Guwahati to Naharlagun + 3 hr shared sumo taxi.',
    nearbyStay: 'Apatani Village Eco-Homestay (₹1,500/night)',
    nearbyFood: 'Fresh Bamboo Shoot Herb Stew & Sticky Rice',
    latitude: 27.5960,
    longitude: 93.8385
  },
  {
    id: 'gem-chettinad',
    name: 'Chettinad Heritage Mansions & Tile Guilds',
    cityId: 8,
    cityName: 'Chettinad',
    nearCity: 'Kochi',
    category: 'Palatial Mansions & Gastronomy',
    distanceFromCenterKm: 280,
    distanceFromHub: '2 hrs from Madurai Airport',
    tag: 'Athangudi Tiles & Burmese Teak',
    whyVisit: '18th-century palatial merchant mansions and fiery aromatic Chettinad culinary masterclasses.',
    shortDesc: 'A region of 75 heritage villages filled with sprawling mansions adorned with Belgian mirrors, Italian marble, and handmade Athangudi floor tiles.',
    fullDesc: 'Walk through quiet, sunny village streets lined with grand mansions built by maritime Chettiar traders. Watch artisans cast colorful mineral-patterned Athangudi tiles by hand without electricity.',
    description: 'A region of 75 heritage villages filled with sprawling mansions adorned with Belgian mirrors, Italian marble, and handmade Athangudi floor tiles.',
    bestTime: 'November to March',
    bestTimeToVisit: 'November to March',
    estimatedCostInr: 250,
    decongestionScore: 90,
    decongestionFactor: 'High (Quiet aristocratic village life)',
    imageUrl: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=800',
    heroImage: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=800',
    verified: true,
    themes: ['heritage', 'architecture', 'food', 'art', 'offbeat'],
    sustainabilityImpact: 'Prevents dismantling of historic mansions and sustains handmade Athangudi tile craft guilds.',
    howToReach: '2 hr drive from Madurai or Tiruchirappalli International Airports.',
    nearbyStay: 'The Bangala Heritage Homestay (₹2,500/night)',
    nearbyFood: 'Authentic 18-Dish Banana Leaf Chettinad Feast',
    latitude: 10.0760,
    longitude: 78.7845
  },
  {
    id: 'gem-spiti',
    name: 'Spiti Valley & Key Cliffside Monastery',
    cityId: 6,
    cityName: 'Spiti Valley',
    nearCity: 'Manali',
    category: 'High Altitude & Monasteries',
    distanceFromCenterKm: 195,
    distanceFromHub: '6 hrs drive from Manali via Atal Tunnel',
    tag: 'Middle Land of Monasteries',
    whyVisit: '1000-year-old Key Monastery perched at 4,166m and lunar mountain desert valleys.',
    shortDesc: 'A breathtaking high-altitude cold desert valley dotted with whitewashed Tibetan Buddhist monasteries, high passes, and fossil villages.',
    fullDesc: 'Spiti offers raw Himalayan drama far away from crowded tourist resorts. Visit Dhankar Gompa hanging precariously over a sheer cliff, send a postcard from Hikkim (world\'s highest post office), and stargaze under zero-light-pollution skies.',
    description: 'A breathtaking high-altitude cold desert valley dotted with whitewashed Tibetan Buddhist monasteries, high passes, and fossil villages.',
    bestTime: 'June to October',
    bestTimeToVisit: 'June to October',
    estimatedCostInr: 400,
    decongestionScore: 95,
    decongestionFactor: 'Extreme (Pure remote mountain isolation)',
    imageUrl: 'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?w=800',
    heroImage: 'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?w=800',
    verified: true,
    themes: ['nature', 'spiritual', 'offbeat', 'adventure'],
    sustainabilityImpact: 'Empowers remote local Spitian homestay networks and eco-waste mountain cleanups.',
    howToReach: 'Drive from Manali via Rohtang / Atal Tunnel and Kunzum Pass.',
    nearbyStay: 'Kaza Monastery View Homestay (₹1,600/night)',
    nearbyFood: 'Spitian Seabuckthorn Tea, Steamed Tingmo & Yak Cheese',
    latitude: 32.2276,
    longitude: 78.0710
  },
  {
    id: 'gem-bateshwar',
    name: 'Bateshwar 101 Yamuna Temples',
    cityId: 2,
    cityName: 'Agra',
    nearCity: 'Agra',
    category: 'Spiritual Heritage',
    distanceFromCenterKm: 70,
    distanceFromHub: '1 hr from Agra',
    tag: 'Yamuna River Heritage',
    whyVisit: 'A crescent-shaped bank of 101 white-domed Shiva shrines with peaceful boatmen.',
    shortDesc: 'A crescent-shaped bank of 101 white-domed Shiva shrines on the peaceful bend of the Yamuna River.',
    fullDesc: 'An ancient spiritual pilgrimage site known as the mini-Varanasi of Uttar Pradesh, celebrated for peaceful river ghat aartis and unbroken rows of carved stone temples.',
    description: 'A crescent-shaped bank of 101 white-domed Shiva shrines on the peaceful bend of the Yamuna River.',
    bestTime: 'October to February',
    bestTimeToVisit: 'October to February',
    estimatedCostInr: 150,
    decongestionScore: 95,
    decongestionFactor: 'Very High (95% tranquil compared to Taj Mahal)',
    imageUrl: 'https://images.unsplash.com/photo-1608958435020-e8a7109ba809?w=800',
    heroImage: 'https://images.unsplash.com/photo-1608958435020-e8a7109ba809?w=800',
    verified: true,
    themes: ['spiritual', 'heritage', 'offbeat'],
    sustainabilityImpact: 'Promotes rural religious tourism and Chambal Valley boatmen livelihoods.',
    howToReach: '1 hr scenic drive south-east of Agra.',
    nearbyStay: 'Chambal Safari Heritage Lodge',
    nearbyFood: 'Bateshwar Peda & Fresh Yamuna Lassi',
    latitude: 26.9365,
    longitude: 78.5366
  },
  {
    id: 'gem-mehtab',
    name: 'Mehtab Bagh Secret Sunset Ghat',
    cityId: 2,
    cityName: 'Agra',
    nearCity: 'Agra',
    category: 'Photography & Sunset',
    distanceFromCenterKm: 5,
    distanceFromHub: '15 mins from Taj East Gate',
    tag: 'Unobstructed Taj Reflection',
    whyVisit: 'Crowd-free charbagh garden providing breathtaking golden-hour reflection views.',
    shortDesc: 'Tranquil charbagh garden across the river providing breathtaking crowd-free views of the Taj Mahal.',
    fullDesc: 'Originally planned by Emperor Babur as a moonlight pleasure garden, this vantage point offers an unobstructed golden-hour panorama of the Taj Mahal without the crowds.',
    description: 'Tranquil charbagh garden across the river providing breathtaking crowd-free views of the Taj Mahal.',
    bestTime: '4:30 PM - 6:00 PM (Sunset)',
    bestTimeToVisit: 'Sunset',
    estimatedCostInr: 300,
    decongestionScore: 88,
    decongestionFactor: 'High (Calm and meditative atmosphere)',
    imageUrl: 'https://images.unsplash.com/photo-1585135497273-1a86b09fe70e?w=800',
    heroImage: 'https://images.unsplash.com/photo-1585135497273-1a86b09fe70e?w=800',
    verified: true,
    themes: ['heritage', 'photography', 'nature'],
    sustainabilityImpact: 'Supports Yamuna riverside clean-up initiatives and local certified e-rickshaw drivers.',
    howToReach: '15 min e-rickshaw from Agra Cantt across Ambedkar bridge.',
    nearbyStay: 'Radisson Taj East Gate',
    nearbyFood: 'Petha Sweets & Mughlai Kebab stalls',
    latitude: 27.1802,
    longitude: 78.0421
  },
  {
    id: 'gem-divar',
    name: 'Divar Island & Chorão Mangrove Sanctuary',
    cityId: 7,
    cityName: 'Goa',
    nearCity: 'Goa',
    category: 'Island Ecology & Heritage',
    distanceFromCenterKm: 12,
    distanceFromHub: '20 mins from Panaji',
    tag: 'River Island Village Escape',
    whyVisit: 'Untouched island accessible only by government river ferry, with vintage Portuguese mansions and paddy fields.',
    shortDesc: 'An untouched island accessible only by government river ferry, with vintage Portuguese mansions and paddy fields.',
    fullDesc: 'Stepping onto Divar Island feels like traveling 100 years back in time. Cycle through quiet bougainvillea-lined pathways, ancient hilltop churches, and migratory bird wetlands.',
    description: 'An untouched island accessible only by government river ferry, with vintage Portuguese mansions and paddy fields.',
    bestTime: '7:00 AM - 11:00 AM or 4:00 PM - 7:00 PM',
    bestTimeToVisit: 'Morning or Sunset',
    estimatedCostInr: 150,
    decongestionScore: 96,
    decongestionFactor: 'Extreme (Zero commercial crowds)',
    imageUrl: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=800',
    heroImage: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=800',
    verified: true,
    themes: ['nature', 'offbeat', 'heritage', 'island'],
    sustainabilityImpact: '100% community-based ecotourism preserving Mandovi River mangrove biodiversity.',
    howToReach: 'Free government vehicle ferry from Ribandar (Old Goa).',
    nearbyStay: 'Casa Divar Boutique Homestay',
    nearbyFood: 'Island Tavern Fresh Prawn Balchão & Poi',
    latitude: 15.5186,
    longitude: 73.9168
  }
];

// ============================================================================
// LOCAL EXPERIENCES: "Experience India" (Handicrafts, Culinary, Heritage)
// ============================================================================
export const LOCAL_EXPERIENCES_DATA = [
  {
    id: 'exp-1',
    title: 'Bagru Natural Dyes & Hand Block Printing Workshop',
    cityId: 1,
    cityName: 'Jaipur',
    category: 'Handicrafts & Art',
    durationHours: 3.5,
    priceInr: 1450,
    rating: 4.9,
    reviewsCount: 128,
    host: 'Chippa Family Artisan Collective',
    verified: true,
    shortDesc: 'Carve and stamp your own organic cotton scarf using natural indigo, turmeric, and clay resist blocks.',
    included: ['Hands-on woodblock stamping', 'Organic fabric scarf to take home', 'Chai & local snacks', 'Artisan village walk'],
    sustainabilityBadge: 'Direct Artisan Support (Zero Middlemen)',
    imageUrl: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=800',
  },
  {
    id: 'exp-2',
    title: 'Royal Rajasthani Culinary Masterclass & Haveli Dinner',
    cityId: 1,
    cityName: 'Jaipur',
    category: 'Food & Cooking',
    durationHours: 3.0,
    priceInr: 1200,
    rating: 4.9,
    reviewsCount: 94,
    host: 'Chef Sunita Rathore',
    verified: true,
    shortDesc: 'Cook Dal Baati Churma, Ker Sangri, and saffron Ghewar inside a 90-year-old family heritage courtyard.',
    included: ['Hands-on 4-course royal cooking', 'Multi-course dinner in courtyard', 'Printed family secret recipe booklet', 'Rajasthani spiced chai'],
    sustainabilityBadge: 'Zero Food Waste & Local Farm Produce',
    imageUrl: 'https://images.unsplash.com/photo-1610057099443-fde8c4d50f91?w=800',
  },
  {
    id: 'exp-3',
    title: 'Pietra Dura Marble Inlay Master Craftsman Experience',
    cityId: 2,
    cityName: 'Agra',
    category: 'Handicrafts & Art',
    durationHours: 2.5,
    priceInr: 950,
    rating: 5.0,
    reviewsCount: 76,
    host: 'Ustad Rashid & Sons (6th Gen Mughal Inlayers)',
    verified: true,
    shortDesc: 'Learn the ancient semi-precious stone inlay technique (Parchin Kari) from descendants of Taj Mahal artisans.',
    included: ['Hand-chiseling Makrana marble', 'Lapis lazuli & malachite stone fitting', 'Mini souvenir marble coaster to keep', 'Artisan history discussion'],
    sustainabilityBadge: 'UNESCO Recognized Heritage Skill Protection',
    imageUrl: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?w=800',
  },
  {
    id: 'exp-4',
    title: 'Old Delhi Midnight Culinary & Sufi Heritage Walk',
    cityId: 3,
    cityName: 'Delhi',
    category: 'Heritage & Food',
    durationHours: 4.0,
    priceInr: 1100,
    rating: 4.8,
    reviewsCount: 215,
    host: 'Purani Dilli Dastarkhwan Guides',
    verified: true,
    shortDesc: 'Navigate labyrinthine spice bazaars tasting slow-cooked nihari, jalebis, and listening to qawwalis.',
    included: ['Tasting at 7 legendary century-old street vendors', 'Evening qawwali session at Hazrat Nizamuddin', 'Certified female-led local guide'],
    sustainabilityBadge: 'Supports 100% Micro Vendor Economy',
    imageUrl: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?w=800',
  },
  {
    id: 'exp-5',
    title: 'Dharavi Micro-Enterprise & Master Pottery Trail',
    cityId: 4,
    cityName: 'Mumbai',
    category: 'Living Culture & Social',
    durationHours: 3.0,
    priceInr: 850,
    rating: 4.9,
    reviewsCount: 310,
    host: 'Kumbharwada Resident Guild',
    verified: true,
    shortDesc: 'A community-led ethical walk through the bustling pottery village of Kumbharwada and leather cooperatives.',
    included: ['Kumbharwada pottery wheel lesson', 'Recycling & textile innovation tour', 'Contribution to local school fund'],
    sustainabilityBadge: '80% Fee Returned to Slum Education Programs',
    imageUrl: 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=800',
  },
  {
    id: 'exp-6',
    title: 'Organic Konkan Spice Trail & Traditional Feni Tasting',
    cityId: 7,
    cityName: 'Goa',
    category: 'Nature & Agriculture',
    durationHours: 3.5,
    priceInr: 1100,
    rating: 4.8,
    reviewsCount: 180,
    host: 'Ponda Organic Planters Guild',
    verified: true,
    shortDesc: 'Walk through lush vanilla, cardamom, and cinnamon canopies followed by authentic banana-leaf Saraswat lunch.',
    included: ['Botanical spice walk', 'Pure copper-pot feni distillation demo', 'Traditional buffet on eco-leaf plates'],
    sustainabilityBadge: 'Zero Chemical Organic Farm Practice',
    imageUrl: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=800',
  }
];

// ============================================================================
// LOCAL TOURISM MARKETPLACE ("Support Local"): SIH Core Value
// ============================================================================
export const LOCAL_BUSINESSES_DATA = [
  {
    "id": "biz-jaipur-1",
    "name": "Kalyan Heritage Homestay & Haveli",
    "category": "Homestay & Havelis",
    "city": "Jaipur",
    "cityName": "Jaipur",
    "ownerName": "Manoj & Meenakshi Shekhawat",
    "experienceYears": 14,
    "rating": 4.9,
    "reviewsCount": 182,
    "startingPriceInr": 2200,
    "priceUnit": "per night",
    "directRate": "₹2,200 / night",
    "address": "59 Hathroi Fort, Ajmer Road, Jaipur",
    "phone": "+91 98290 14829",
    "contactPhone": "+91 98290 14829",
    "verifiedStatus": "Rajasthan Tourism Dept Verified",
    "description": "A warm multi-generational family haveli with hand-painted fresco walls, homemade organic breakfast, and rooftop fort views.",
    "tags": [
      "Family Run",
      "Eco Homestay",
      "Free High-Speed WiFi",
      "Home Cooked Meals"
    ],
    "imageUrl": "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800",
    "verifiedBadge": true
  },
  {
    "id": "biz-jaipur-2",
    "name": "Heritage Explorer: Mahendra Singh (Govt Licensed Guide)",
    "category": "Heritage Walking Guide",
    "city": "Jaipur",
    "cityName": "Jaipur",
    "ownerName": "Mahendra Singh (Ministry of Tourism ID: 4128)",
    "experienceYears": 18,
    "rating": 5,
    "reviewsCount": 290,
    "startingPriceInr": 1800,
    "priceUnit": "per full day",
    "directRate": "₹1,800 / day",
    "address": "Johari Bazaar Heritage Hub, Jaipur",
    "phone": "+91 94140 52319",
    "contactPhone": "+91 94140 52319",
    "verifiedStatus": "Ministry of Tourism Certified Guide",
    "description": "Expert historian specializing in Rajput astronomical instruments, Amber Fort military architecture, and secret photography angles.",
    "tags": [
      "English & Hindi",
      "Historical Architecture",
      "Licensed & Certified"
    ],
    "imageUrl": "https://images.unsplash.com/photo-1532375810709-75b1da00537c?w=800",
    "verifiedBadge": true
  },
  {
    "id": "biz-jaipur-3",
    "name": "Bagru Hand Block Print Guild & Natural Indigo Dyes",
    "category": "Handicraft & Textile Cooperative",
    "city": "Jaipur",
    "cityName": "Jaipur",
    "ownerName": "Chippa Ramkishan & Family",
    "experienceYears": 28,
    "rating": 4.9,
    "reviewsCount": 145,
    "startingPriceInr": 750,
    "priceUnit": "per artisan scarf",
    "directRate": "₹750 / piece",
    "address": "Bagru Artisan Colony, Ajmer Road, Jaipur",
    "phone": "+91 98291 33419",
    "contactPhone": "+91 98291 33419",
    "verifiedStatus": "Handloom Mark India Certified",
    "description": "Direct cooperative of 35 heritage families stamping organic mulmul cotton with vegetable natural dyes and wooden hand-carved blocks.",
    "tags": [
      "Fair Trade",
      "Handmade Indigo",
      "Direct Artisan Price"
    ],
    "imageUrl": "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=800",
    "verifiedBadge": true
  },
  {
    "id": "biz-agra-1",
    "name": "Yamuna Eco-Cabs & Green Drivers Cooperative",
    "category": "Verified Local Transport",
    "city": "Agra",
    "cityName": "Agra",
    "ownerName": "Devendra Kumar (Driver Union Lead)",
    "experienceYears": 12,
    "rating": 4.8,
    "reviewsCount": 165,
    "startingPriceInr": 1400,
    "priceUnit": "per 8hr city tour",
    "directRate": "₹1,400 / 8hr tour",
    "address": "Agra Cantt Railway Station Stand, Agra",
    "phone": "+91 97580 32188",
    "contactPhone": "+91 97580 32188",
    "verifiedStatus": "Clean Fleet Verified Driver",
    "description": "Reliable CNG and electric AC fleet covering Taj Mahal, Fatehpur Sikri, and Bateshwar with polite, background-verified drivers.",
    "tags": [
      "CNG Eco-Vehicle",
      "Zero Commission",
      "Fixed Rates"
    ],
    "imageUrl": "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=800",
    "verifiedBadge": true
  },
  {
    "id": "biz-agra-2",
    "name": "Zari-Zardozi & Silver Thread Artisan Guild",
    "category": "Handicraft & Textile Cooperative",
    "city": "Agra",
    "cityName": "Agra",
    "ownerName": "Begum Naseem Akhtar",
    "experienceYears": 25,
    "rating": 4.9,
    "reviewsCount": 114,
    "startingPriceInr": 650,
    "priceUnit": "per handcrafted piece",
    "directRate": "₹650 / piece",
    "address": "Near Jama Masjid, Kinari Bazaar, Agra",
    "phone": "+91 98370 66142",
    "contactPhone": "+91 98370 66142",
    "verifiedStatus": "ODOP UP Govt Recognized Artisan",
    "description": "Empowering 40 local women artisans weaving traditional Mughal metallic thread embroidery into clutches, wall tapestries, and silk stoles.",
    "tags": [
      "Women-Led",
      "Fair Trade",
      "Authentic Zardozi"
    ],
    "imageUrl": "https://images.unsplash.com/photo-1598890777032-bde835ba27c2?w=800",
    "verifiedBadge": true
  },
  {
    "id": "biz-delhi-1",
    "name": "Purani Dilli Dastarkhwan Heritage Food Trails",
    "category": "Culinary Walking Host",
    "city": "Delhi",
    "cityName": "Delhi",
    "ownerName": "Haji Mohammad Rizwan",
    "experienceYears": 32,
    "rating": 4.8,
    "reviewsCount": 420,
    "startingPriceInr": 500,
    "priceUnit": "meal for two",
    "directRate": "₹500 / meal",
    "address": "Matia Mahal, Opp Gate 1 Jama Masjid, Delhi",
    "phone": "+91 98110 44291",
    "contactPhone": "+91 98110 44291",
    "verifiedStatus": "FSSAI Grade-A Certified",
    "description": "Slow-cooked authentic Nihari, sheermal, seekh kebabs, and shahi tukda prepared from generational recipes dating back to the Mughal era.",
    "tags": [
      "Authentic Recipe",
      "Pure Desi Ghee",
      "Old Delhi Legend"
    ],
    "imageUrl": "https://images.unsplash.com/photo-1587474260584-136574528ed5?w=800",
    "verifiedBadge": true
  },
  {
    "id": "biz-mumbai-1",
    "name": "Kumbharwada Clay Potter Guild & Terracotta Studios",
    "category": "Handicraft & Textile Cooperative",
    "city": "Mumbai",
    "cityName": "Mumbai",
    "ownerName": "Ramesh Chauhan & Sons",
    "experienceYears": 22,
    "rating": 4.9,
    "reviewsCount": 178,
    "startingPriceInr": 450,
    "priceUnit": "per earthen set",
    "directRate": "₹450 / set",
    "address": "90 Feet Road, Kumbharwada, Dharavi, Mumbai",
    "phone": "+91 98201 54722",
    "contactPhone": "+91 98201 54722",
    "verifiedStatus": "Maharashtra Khadi Board Verified",
    "description": "Generational Gujarati potters hand-throwing terracotta chai cups, ornate planters, and decorative clay lanterns using traditional kilns.",
    "tags": [
      "100% Terracotta",
      "Direct Kiln Price",
      "Master Potter"
    ],
    "imageUrl": "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=800",
    "verifiedBadge": true
  },
  {
    "id": "biz-goa-1",
    "name": "Fontainhas Heritage Quarters Walking Tours",
    "category": "Heritage Walking Guide",
    "city": "Goa",
    "cityName": "Goa",
    "ownerName": "Maria D’Souza & Carlos Fernandes",
    "experienceYears": 9,
    "rating": 5,
    "reviewsCount": 275,
    "startingPriceInr": 750,
    "priceUnit": "per person",
    "directRate": "₹750 / person",
    "address": "31st January Road, Fontainhas, Panaji, Goa",
    "phone": "+91 98221 73299",
    "contactPhone": "+91 98221 73299",
    "verifiedStatus": "Goa Tourism Guild Certified",
    "description": "Intimate walking tour through bright yellow and indigo heritage villas, tile painting ateliers, century-old bakeries, and traditional fado musicians.",
    "tags": [
      "Heritage Walk",
      "Small Group",
      "Portuguese Architecture"
    ],
    "imageUrl": "https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?w=800",
    "verifiedBadge": true
  },
  {
    "id": "biz-goa-2",
    "name": "Ponda Organic Spice Plantation & Homestay",
    "category": "Homestay & Havelis",
    "city": "Goa",
    "cityName": "Goa",
    "ownerName": "Dr. Vivek Sawant",
    "experienceYears": 16,
    "rating": 4.8,
    "reviewsCount": 195,
    "startingPriceInr": 2800,
    "priceUnit": "per night with breakfast",
    "directRate": "₹2,800 / night",
    "address": "Curti, Ponda, Central Goa",
    "phone": "+91 98230 44192",
    "contactPhone": "+91 98230 44192",
    "verifiedStatus": "Eco Tourism Certified",
    "description": "Eco-lodging set amid lush cardamom, nutmeg, and black pepper vines with homemade Saraswat Goan meals served on fresh banana leaves.",
    "tags": [
      "Organic Estate",
      "Farm to Table",
      "River Views"
    ],
    "imageUrl": "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=800",
    "verifiedBadge": true
  },
  {
    "id": "biz-varanasi-1",
    "name": "Kashi Moksha Ganga Boatmen Collective",
    "category": "Verified Local Transport",
    "city": "Varanasi",
    "cityName": "Varanasi",
    "ownerName": "Ramu Majhi (Ghat Sailors Union)",
    "experienceYears": 20,
    "rating": 4.9,
    "reviewsCount": 310,
    "startingPriceInr": 800,
    "priceUnit": "per 2hr morning sunrise boat",
    "directRate": "₹800 / boat ride",
    "address": "Dashashwamedh Ghat Steps, Varanasi",
    "phone": "+91 98390 12844",
    "contactPhone": "+91 98390 12844",
    "verifiedStatus": "Varanasi Municipal Water Board Verified",
    "description": "Generational wooden rowing and silent solar-powered boats for sunrise Ganga darshan from Assi Ghat to Manikarnika Ghat without broker commissions.",
    "tags": [
      "Zero Broker Fee",
      "Life Jackets Provided",
      "Sunrise & Aarti"
    ],
    "imageUrl": "https://images.unsplash.com/photo-1561361513-2d000a50f0dc?w=800",
    "verifiedBadge": true
  },
  {
    "id": "biz-varanasi-2",
    "name": "Madanpura Pure Katan Silk & Zari Weavers Guild",
    "category": "Handicraft & Textile Cooperative",
    "city": "Varanasi",
    "cityName": "Varanasi",
    "ownerName": "Ustad Tariq Ansari",
    "experienceYears": 35,
    "rating": 5,
    "reviewsCount": 185,
    "startingPriceInr": 3200,
    "priceUnit": "per handwoven Banarasi saree",
    "directRate": "₹3,200 / saree",
    "address": "D-22 Madanpura Weaver Lane, Varanasi",
    "phone": "+91 94500 77312",
    "contactPhone": "+91 94500 77312",
    "verifiedStatus": "Silk Mark India & GI Certified",
    "description": "Direct pit-loom weaver families weaving gold and silver zari brocades on mulberry silk directly from the looms to travelers.",
    "tags": [
      "Pure Silk Mark",
      "GI Tagged",
      "Direct Loom Price"
    ],
    "imageUrl": "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=800",
    "verifiedBadge": true
  },
  {
    "id": "biz-udaipur-1",
    "name": "Lake Pichola Heritage Haveli Homestay",
    "category": "Homestay & Havelis",
    "city": "Udaipur",
    "cityName": "Udaipur",
    "ownerName": "Rana Bhupendra Singh",
    "experienceYears": 19,
    "rating": 4.9,
    "reviewsCount": 220,
    "startingPriceInr": 3400,
    "priceUnit": "per night lake view",
    "directRate": "₹3,400 / night",
    "address": "Near Lal Ghat, Old City, Udaipur",
    "phone": "+91 98292 45188",
    "contactPhone": "+91 98292 45188",
    "verifiedStatus": "Heritage Hotel Association Member",
    "description": "18th-century Rajput lakefront haveli with intricately carved jharokhas, rooftop sunset dining overlooking Jag Mandir, and royal warmth.",
    "tags": [
      "Lake View",
      "Rooftop Dining",
      "Royal Heritage"
    ],
    "imageUrl": "https://images.unsplash.com/photo-1615836245337-f5b9b2303f10?w=800",
    "verifiedBadge": true
  },
  {
    "id": "biz-udaipur-2",
    "name": "Mewar Miniature Painting Atelier & Silk Guild",
    "category": "Handicraft & Textile Cooperative",
    "city": "Udaipur",
    "cityName": "Udaipur",
    "ownerName": "Pt. Devendra Sharma (State Awardee)",
    "experienceYears": 30,
    "rating": 4.9,
    "reviewsCount": 140,
    "startingPriceInr": 850,
    "priceUnit": "per silk miniature artwork",
    "directRate": "₹850 / artwork",
    "address": "Near Jagdish Temple Gate, Udaipur",
    "phone": "+91 94141 88320",
    "contactPhone": "+91 94141 88320",
    "verifiedStatus": "Rajasthan Lalit Kala Akademi Recognized",
    "description": "Fine squirrel-hair brush miniature paintings on antique silk and handmade paper using natural stone pigments and 24K gold leaf.",
    "tags": [
      "Natural Stone Colors",
      "Master Artisan",
      "Certificate of Authenticity"
    ],
    "imageUrl": "https://images.unsplash.com/photo-1598890777032-bde835ba27c2?w=800",
    "verifiedBadge": true
  },
  {
    "id": "biz-manali-1",
    "name": "Solang Valley Pine & Cedar Alpine Homestay",
    "category": "Homestay & Havelis",
    "city": "Manali",
    "cityName": "Manali",
    "ownerName": "Karmesh Thakur & Family",
    "experienceYears": 11,
    "rating": 4.9,
    "reviewsCount": 165,
    "startingPriceInr": 2100,
    "priceUnit": "per night with mountain bonfire",
    "directRate": "₹2,100 / night",
    "address": "Old Manali Village Trail, Manali",
    "phone": "+91 98160 55421",
    "contactPhone": "+91 98160 55421",
    "verifiedStatus": "Himachal Tourism Verified",
    "description": "Traditional Himachali kath-kuni wooden architecture with apple orchard surroundings, wood stoves (tandoor), and unobstructed snow peak views.",
    "tags": [
      "Snow Views",
      "Apple Orchard",
      "Tandoor Warmth"
    ],
    "imageUrl": "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=800",
    "verifiedBadge": true
  },
  {
    "id": "biz-manali-2",
    "name": "Rohtang & Spiti Mountain 4x4 Driver Guild",
    "category": "Verified Local Transport",
    "city": "Manali",
    "cityName": "Manali",
    "ownerName": "Suraj Negi",
    "experienceYears": 15,
    "rating": 4.9,
    "reviewsCount": 240,
    "startingPriceInr": 3200,
    "priceUnit": "per day 4x4 SUV",
    "directRate": "₹3,200 / day",
    "address": "Mall Road Taxi Stand, Manali",
    "phone": "+91 98050 88219",
    "contactPhone": "+91 98050 88219",
    "verifiedStatus": "Himachal Snow Transport Union Certified",
    "description": "Experienced high-altitude snow terrain drivers equipped with snow chains, oxygen canisters, and valid NGT permits for Rohtang and Atal Tunnel.",
    "tags": [
      "4x4 AWD",
      "Snow Chain Trained",
      "NGT Permit Ready"
    ],
    "imageUrl": "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800",
    "verifiedBadge": true
  },
  {
    "id": "biz-rishikesh-1",
    "name": "Ganges White Water & Eco Rafting Guild",
    "category": "Verified Local Transport",
    "city": "Rishikesh",
    "cityName": "Rishikesh",
    "ownerName": "Virendra Rawat (IRF Level 4 Instructor)",
    "experienceYears": 17,
    "rating": 5,
    "reviewsCount": 380,
    "startingPriceInr": 900,
    "priceUnit": "per person 16km Shivpuri rafting",
    "directRate": "₹900 / person",
    "address": "Badrinath Road, Tapovan, Rishikesh",
    "phone": "+91 98970 33118",
    "contactPhone": "+91 98970 33118",
    "verifiedStatus": "Uttarakhand Tourism Rafting License #142",
    "description": "Certified river guides with international rescue certification providing safe white water rafting, cliff jumping, and beach camping.",
    "tags": [
      "IRF Certified",
      "Safety Kayak Escort",
      "Zero Plastic"
    ],
    "imageUrl": "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800",
    "verifiedBadge": true
  },
  {
    "id": "biz-amritsar-1",
    "name": "Heritage Golden Temple View Guesthouse",
    "category": "Homestay & Havelis",
    "city": "Amritsar",
    "cityName": "Amritsar",
    "ownerName": "Sardar Gurpreet Singh Dhillon",
    "experienceYears": 13,
    "rating": 4.9,
    "reviewsCount": 310,
    "startingPriceInr": 1800,
    "priceUnit": "per night",
    "directRate": "₹1,800 / night",
    "address": "Near Guru Bazaar & Clock Tower, Amritsar",
    "phone": "+91 98760 11984",
    "contactPhone": "+91 98760 11984",
    "verifiedStatus": "Punjab Heritage Board Verified",
    "description": "Warm Sikh hospitality just 200 meters from the Golden Temple parikrama with traditional Amritsari breakfast and 24/7 luggage lockers.",
    "tags": [
      "Walking to Temple",
      "Family Friendly",
      "Clean & Peaceful"
    ],
    "imageUrl": "https://images.unsplash.com/photo-1514222134-b57cbb8ce073?w=800",
    "verifiedBadge": true
  },
  {
    "id": "biz-amritsar-2",
    "name": "Amritsari Kulcha & Heritage Food Walking Host",
    "category": "Culinary Walking Host",
    "city": "Amritsar",
    "cityName": "Amritsar",
    "ownerName": "Manjit Singh",
    "experienceYears": 10,
    "rating": 5,
    "reviewsCount": 225,
    "startingPriceInr": 400,
    "priceUnit": "food walk per person",
    "directRate": "₹400 / person",
    "address": "Town Hall, Katra Ahluwalia, Amritsar",
    "phone": "+91 98140 77391",
    "contactPhone": "+91 98140 77391",
    "verifiedStatus": "Certified Culinary Host",
    "description": "Taste slow-baked tandoori kulchas, creamy makkhan lassi, and legendary jalebis at hidden alley shops operating since 1912.",
    "tags": [
      "Street Gastronomy",
      "Generational Flavors",
      "Pure Vegetarian"
    ],
    "imageUrl": "https://images.unsplash.com/photo-1610057099443-fde8c4d50f91?w=800",
    "verifiedBadge": true
  },
  {
    "id": "biz-kochi-1",
    "name": "Vembanad Lake Heritage Boatmen Cooperative",
    "category": "Verified Local Transport",
    "city": "Kochi",
    "cityName": "Kochi",
    "ownerName": "Suresh Kumar & Boat Guild",
    "experienceYears": 21,
    "rating": 4.8,
    "reviewsCount": 190,
    "startingPriceInr": 1600,
    "priceUnit": "per 3hr backwater cruise",
    "directRate": "₹1,600 / cruise",
    "address": "Marine Drive Boat Jetty, Kochi",
    "phone": "+91 94470 66288",
    "contactPhone": "+91 94470 66288",
    "verifiedStatus": "Kerala Water Transport Dept Licensed",
    "description": "Traditional thatched kettuvallam boats and eco-catamarans meandering through tranquil palm-fringed canals, prawn farms, and bird lagoons.",
    "tags": [
      "Eco Boat",
      "No Middlemen",
      "Village Life"
    ],
    "imageUrl": "https://images.unsplash.com/photo-1597848212624-a19eb35e2651?w=800",
    "verifiedBadge": true
  },
  {
    "id": "biz-ladakh-1",
    "name": "Changpa Nomadic Pashmina Wool & Craft Cooperative",
    "category": "Handicraft & Textile Cooperative",
    "city": "Leh Ladakh",
    "cityName": "Leh Ladakh",
    "ownerName": "Stanzin Dorje",
    "experienceYears": 18,
    "rating": 5,
    "reviewsCount": 160,
    "startingPriceInr": 3500,
    "priceUnit": "per pure Pashmina shawl",
    "directRate": "₹3,500 / shawl",
    "address": "Main Bazaar Artisan Arcade, Leh",
    "phone": "+91 94191 88402",
    "contactPhone": "+91 94191 88402",
    "verifiedStatus": "Ladakh Autonomous Hill Development Council Certified",
    "description": "Direct cooperative of Changthang nomad pastoralists spinning raw Cashmere goat fleece into ultra-soft, warm authentic Pashmina.",
    "tags": [
      "100% Pure Pashmina",
      "Nomadic Community",
      "Fair Trade"
    ],
    "imageUrl": "https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?w=800",
    "verifiedBadge": true
  },
  {
    "id": "biz-shimla-1",
    "name": "The Mall & Ridge Heritage Walking Guides",
    "category": "Heritage Walking Guide",
    "city": "Shimla",
    "cityName": "Shimla",
    "ownerName": "Raunak Verma (Shimla Heritage Society)",
    "experienceYears": 14,
    "rating": 4.9,
    "reviewsCount": 175,
    "startingPriceInr": 950,
    "priceUnit": "per heritage walking tour",
    "directRate": "₹950 / tour",
    "address": "Scandal Point, The Mall, Shimla",
    "phone": "+91 98161 33902",
    "contactPhone": "+91 98161 33902",
    "verifiedStatus": "Himachal Tourism Certified Historian",
    "description": "Uncover the colonial summer capital secrets, Viceregal Lodge treaty rooms, Christ Church stained glass, and Gaiety Theatre archives.",
    "tags": [
      "Architectural Walk",
      "Colonial History",
      "Top Rated"
    ],
    "imageUrl": "https://images.unsplash.com/photo-1597074866923-dc0589150358?w=800",
    "verifiedBadge": true
  },
  {
    "id": "biz-mysore-1",
    "name": "Mysore Silk & Sandalwood Master Woodcarvers",
    "category": "Handicraft & Textile Cooperative",
    "city": "Mysore",
    "cityName": "Mysore",
    "ownerName": "V. Krishna Murthy",
    "experienceYears": 27,
    "rating": 4.9,
    "reviewsCount": 205,
    "startingPriceInr": 800,
    "priceUnit": "per sandalwood handcrafted item",
    "directRate": "₹800 / piece",
    "address": "Near Devaraja Market, Sayyaji Rao Road, Mysore",
    "phone": "+91 98450 12799",
    "contactPhone": "+91 98450 12799",
    "verifiedStatus": "Karnataka State Handicrafts Certified",
    "description": "Centuries-old sandalwood carving and pure gold zari silk weaving from artisan families preserving royal Wodeyar patronage arts.",
    "tags": [
      "GI Certified Silk",
      "Natural Sandalwood",
      "Artisan Direct"
    ],
    "imageUrl": "https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?w=800",
    "verifiedBadge": true
  },
  {
    "id": "biz-pondy-1",
    "name": "White Town Heritage Villa Homestay & Cycles",
    "category": "Homestay & Havelis",
    "city": "Pondicherry",
    "cityName": "Pondicherry",
    "ownerName": "Francoise & Ananya Roy",
    "experienceYears": 12,
    "rating": 4.8,
    "reviewsCount": 160,
    "startingPriceInr": 2600,
    "priceUnit": "per night with vintage cycles",
    "directRate": "₹2,600 / night",
    "address": "Rue Suffren, French Quarter, Pondicherry",
    "phone": "+91 98430 88219",
    "contactPhone": "+91 98430 88219",
    "verifiedStatus": "Puducherry Tourism Heritage Guesthouse",
    "description": "Colonial mustard-yellow villa with French louvered windows, bougainvillea courtyard, complimentary vintage bicycles, and beachside serenity.",
    "tags": [
      "French Quarter",
      "Free Cycles",
      "Beach 200m"
    ],
    "imageUrl": "https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?w=800",
    "verifiedBadge": true
  },
  {
    "id": "biz-hyd-1",
    "name": "Laad Bazaar Lacquer Bangle & Pearl Artisans",
    "category": "Handicraft & Textile Cooperative",
    "city": "Hyderabad",
    "cityName": "Hyderabad",
    "ownerName": "Mirza Baig & Daughters",
    "experienceYears": 31,
    "rating": 4.9,
    "reviewsCount": 280,
    "startingPriceInr": 350,
    "priceUnit": "per studded bangle set",
    "directRate": "₹350 / set",
    "address": "Laad Bazaar, Charminar West Gate, Hyderabad",
    "phone": "+91 98490 66318",
    "contactPhone": "+91 98490 66318",
    "verifiedStatus": "Telangana Handcraft Council Certified",
    "description": "Hand-molding resin lacquer and embedded rhinestones into vibrant wedding bangles right in front of visitors beside the iconic Charminar.",
    "tags": [
      "Handmade Lac",
      "Zero Middlemen",
      "Historic Bazaar"
    ],
    "imageUrl": "https://images.unsplash.com/photo-1572445271230-a78b5944a659?w=800",
    "verifiedBadge": true
  },
  {
    "id": "biz-kolkata-1",
    "name": "Kumartuli Heritage Clay Sculptors Guild",
    "category": "Handicraft & Textile Cooperative",
    "city": "Kolkata",
    "cityName": "Kolkata",
    "ownerName": "Prabir Pal (Kumartuli Mritshilpi Samiti)",
    "experienceYears": 29,
    "rating": 5,
    "reviewsCount": 340,
    "startingPriceInr": 600,
    "priceUnit": "per handcrafted terracotta artwork",
    "directRate": "₹600 / piece",
    "address": "Kumartuli Lane, Bagbazar, Kolkata",
    "phone": "+91 98300 44821",
    "contactPhone": "+91 98300 44821",
    "verifiedStatus": "West Bengal Handicrafts Certified",
    "description": "Centuries-old potters sculpting sacred Ganges clay over straw armatures into world-famous idols, terracotta plaques, and clay souvenirs.",
    "tags": [
      "Holy River Clay",
      "Master Sculptor",
      "UNESCO Craft"
    ],
    "imageUrl": "https://images.unsplash.com/photo-1558431382-27e303142255?w=800",
    "verifiedBadge": true
  },
  {
    "id": "biz-jodhpur-1",
    "name": "Blue City Brahmin Haveli Homestay",
    "category": "Homestay & Havelis",
    "city": "Jodhpur",
    "cityName": "Jodhpur",
    "ownerName": "Gopal Joshi & Family",
    "experienceYears": 15,
    "rating": 4.9,
    "reviewsCount": 230,
    "startingPriceInr": 1900,
    "priceUnit": "per night with fortress view",
    "directRate": "₹1,900 / night",
    "address": "Navchokiya Blue Alleys, Jodhpur",
    "phone": "+91 98280 55198",
    "contactPhone": "+91 98280 55198",
    "verifiedStatus": "Rajasthan Ecotourism Member",
    "description": "Authentic indigo-blue sandstone haveli nestled beneath the Mehrangarh fortress cliffs with panoramic rooftop terrace views.",
    "tags": [
      "Blue City View",
      "Home Cooked Ker Sangri",
      "Quiet Alleys"
    ],
    "imageUrl": "https://images.unsplash.com/photo-1568849676085-51415703900f?w=800",
    "verifiedBadge": true
  },
  {
    "id": "biz-ooty-1",
    "name": "Nilgiri Heritage Tea Planters Guesthouse",
    "category": "Homestay & Havelis",
    "city": "Ooty",
    "cityName": "Ooty",
    "ownerName": "Muthusamy & Sons",
    "experienceYears": 18,
    "rating": 4.9,
    "reviewsCount": 215,
    "startingPriceInr": 2400,
    "priceUnit": "per night",
    "directRate": "₹2,400 / night",
    "address": "Coonoor Road, Nilgiris, Ooty",
    "phone": "+91 94430 77192",
    "contactPhone": "+91 94430 77192",
    "verifiedStatus": "Nilgiri Planters Association Verified",
    "description": "British colonial bungalow surrounded by manicured organic tea bushes, eucalyptus forests, and homemade Nilgiri hill cuisine.",
    "tags": [
      "Tea Estate View",
      "Misty Hills",
      "Fresh Mountain Air"
    ],
    "imageUrl": "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800",
    "verifiedBadge": true
  },
  {
    "id": "biz-shillong-1",
    "name": "Khasi Hills Bamboo & Cane Craft Cooperative",
    "category": "Handicraft & Textile Cooperative",
    "city": "Shillong",
    "cityName": "Shillong",
    "ownerName": "Wansuk Marbaniang",
    "experienceYears": 16,
    "rating": 5,
    "reviewsCount": 145,
    "startingPriceInr": 500,
    "priceUnit": "per handwoven bamboo craft",
    "directRate": "₹500 / craft",
    "address": "Police Bazar Handicraft Corner, Shillong",
    "phone": "+91 98630 22187",
    "contactPhone": "+91 98630 22187",
    "verifiedStatus": "Meghalaya Handloom Board Certified",
    "description": "Eco-conscious Khasi tribal artisans weaving durable bamboo rain shields (knup), fruit baskets, and intricate lampshades.",
    "tags": [
      "100% Bamboo",
      "Indigenous Khasi Art",
      "Zero Plastic"
    ],
    "imageUrl": "https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?w=800",
    "verifiedBadge": true
  }
];

// ============================================================================
// TOURIST SAFETY, EMERGENCY & VERIFIED HELPLINES
// ============================================================================
export const TOURIST_EMERGENCY_DATA = {
  national: [
    { title: 'National Emergency Helpline', number: '112', desc: 'Police, Fire, and Medical emergencies 24/7 across India' },
    { title: 'Incredible India Tourist Helpline (Govt of India)', number: '1363', desc: 'Toll-free 24/7 multilingual tourist support (12 languages)' },
    { title: 'Medical Ambulance Services', number: '108', desc: 'Emergency medical transit with GPS tracking' },
    { title: 'Women in Distress Helpline', number: '1091', desc: 'Immediate assistance and rapid protection response' },
    { title: 'Indian Railways Security Helpline', number: '139', desc: 'Security, medical, and assistance on moving trains and stations' }
  ],
  cities: {
    Jaipur: {
      policeStation: 'Jaipur Tourist Police Thana (Amber & City Palace)',
      phone: '0141-2603410 / 112',
      hospital: 'Sawai Man Singh (SMS) Government Super Specialty Hospital, JLN Marg',
      hospitalPhone: '0141-2560291',
      touristOffice: 'Rajasthan Tourism Tourist Reception Centre, Railway Station & Amber',
      tips: 'Always use pre-paid government auto counters at Jaipur Junction or book live verified Ola/Uber.'
    },
    Agra: {
      policeStation: 'Agra Tourist Police Station, Near Taj Mahal Eastern Gate',
      phone: '0562-2230005 / 112',
      hospital: 'S.N. Medical College & Emergency Trauma Centre, Agra',
      hospitalPhone: '0562-2260353',
      touristOffice: 'UP Tourism Information Bureau, 64 Taj Road, Agra',
      tips: 'Only buy Taj Mahal tickets through the official ASI ASI-Pay portal or verified government ticket windows.'
    },
    Delhi: {
      policeStation: 'Delhi Tourist Police Control Room, Connaught Place & Paharganj',
      phone: '011-23363381 / 112',
      hospital: 'All India Institute of Medical Sciences (AIIMS) Trauma Centre, Ansari Nagar',
      hospitalPhone: '011-26588500',
      touristOffice: 'Delhi Tourism DTTDC Head Office, Coffee Home, Connaught Place',
      tips: 'Delhi Metro Smart Card is the safest and fastest way to navigate all major historic monuments.'
    },
    Mumbai: {
      policeStation: 'Mumbai Tourist Facilitation Unit, Azad Maidan & Colaba',
      phone: '022-22620111 / 112',
      hospital: 'Lilavati Hospital & KEM Government Medical Centre',
      hospitalPhone: '022-26751000',
      touristOffice: 'MTDC Tourism Directorate, Nariman Point, Mumbai',
      tips: 'Pre-paid taxi kiosks at Mumbai Airport (Kalina & Sahar) eliminate haggling.'
    },
    Goa: {
      policeStation: 'Goa Coastal & Tourist Police Station, Calangute & Panaji',
      phone: '0832-2415112 / 112',
      hospital: 'Goa Medical College (GMC), Bambolim',
      hospitalPhone: '0832-2458700',
      touristOffice: 'Goa Tourism Development Corporation (GTDC) Head Office, Panaji',
      tips: 'Rent two-wheelers only with yellow commercial registration plates and wear an ISI-approved helmet.'
    }
  }
};

// ============================================================================
// SIH IMPACT METRICS & BENCHMARKS
// ============================================================================
export const SIH_STATS = [
  { value: '24+', label: 'Heritage & Cultural Cities', icon: '🏛️' },
  { value: '0%', label: 'Commission on Local Stays', icon: '🤝' },
  { value: '42%', label: 'Average Travel Time Saved', icon: '⚡' },
  { value: '85%', label: 'Decongestion Impact Score', icon: '🌿' },
  { value: '100%', label: 'Verified Local Guides & Drivers', icon: '🛡️' }
];

// ============================================================================
// MULTILINGUAL DICTIONARY (English & Hindi)
// ============================================================================
export const TRANSLATIONS = {
  en: {
    brandTag: 'Intelligent Tourism Ecosystem',
    navExplore: 'Explore',
    navDestinations: 'Destinations',
    navPlanner: 'Smart Trip Planner',
    navHotels: 'Hotels & Stays',
    navExperiences: 'Experiences',
    navGems: 'Hidden Gems',
    navEvents: 'Events & Fairs',
    navSupportLocal: 'Support Local',
    navBusinessPortal: 'For Businesses',
    navAdmin: 'Tourism Analytics',
    ctaPlanTrip: '✨ Plan My Trip',
    heroTitle: 'Discover India.',
    heroSubtitle: 'Plan smarter. Travel better.',
    heroDesc: 'Explore destinations, create personalized trips, discover hidden gems, and connect with verified local tourism businesses — all in one unified platform.',
    searchPlaceholder: 'Search destinations, forts, homestays, local food & experiences...',
    searchBtn: 'Search',
    quickPlanTrip: 'Plan My Trip',
    quickPlanTripDesc: 'AI-tailored itineraries by budget, pace & vibe',
    quickExplore: 'Explore Destinations',
    quickExploreDesc: 'Heritage, mountains, beaches & sacred cities',
    quickCostCalc: 'Calculate Trip Cost',
    quickCostCalcDesc: 'Interactive stay, food & transport breakdown',
    quickHiddenGems: 'Discover Hidden Gems',
    quickHiddenGemsDesc: 'Offbeat sights and rural artisan hubs',
    popularDestinations: 'Top Destinations in India',
    hiddenGemsTitle: 'Go Beyond the Famous.',
    hiddenGemsSubtitle: 'Decongesting crowded tourist spots by spotlighting secret architectural marvels, tranquil eco-villages, and historic sanctuaries.',
    experiencesTitle: 'Experience Real India',
    experiencesSubtitle: 'Immersive cultural workshops, culinary masterclasses, and artisan heritage walks hosted directly by local craftspeople.',
    marketplaceTitle: 'Support Local Tourism',
    marketplaceSubtitle: 'Bridging the digital gap: Connecting travelers directly with family homestays, licensed local guides, and village artisans with 0% predatory commission.',
    whyYatraTitle: 'Why Travelers & Local Businesses Choose Yatra 66',
    step1Title: 'Select Destination',
    step2Title: 'Travel Dates',
    step3Title: 'Travellers',
    step4Title: 'Budget & Style',
    step5Title: 'Interests & Pace',
    step6Title: 'Generated Itinerary',
    btnOptimizeRoute: '⚡ Optimize My Route',
    btnSaveTrip: '💾 Save Trip',
    btnShareTrip: '🔗 Share Trip',
    btnRecalculate: '🔄 Recalculate',
    safetyTitle: 'Tourist Safety & Emergency Help',
  },
  hi: {
    brandTag: 'स्मार्ट पर्यटन इकोसिस्टम',
    navExplore: 'खोजें',
    navDestinations: 'गंतव्य',
    navPlanner: 'स्मार्ट ट्रिप प्लानर',
    navHotels: 'होटल और होमस्टे',
    navExperiences: 'अनुभव',
    navGems: 'छिपे हुए रत्न',
    navEvents: 'उत्सव और मेले',
    navSupportLocal: 'स्थानीय व्यापार',
    navBusinessPortal: 'व्यवसायियों के लिए',
    navAdmin: 'पर्यटन एनालिटिक्स',
    ctaPlanTrip: '✨ यात्रा प्लान करें',
    heroTitle: 'भारत की खोज करें।',
    heroSubtitle: 'स्मार्ट योजना बनाएं। बेहतर यात्रा करें।',
    heroDesc: 'गंतव्य खोजें, व्यक्तिगत यात्रा योजना बनाएं, अनछुए ऐतिहासिक स्थलों का अनुभव करें और स्थानीय पर्यटन व्यवसायों से सीधे जुड़ें — सब कुछ एक ही मंच पर।',
    searchPlaceholder: 'शहर, किले, मंदिर, होटल, स्थानीय व्यंजन और अनुभव खोजें...',
    searchBtn: 'खोजें',
    quickPlanTrip: 'यात्रा प्लान करें',
    quickPlanTripDesc: 'बजट और रुचि अनुसार व्यक्तिगत दैनिक योजना',
    quickExplore: 'गंतव्य देखें',
    quickExploreDesc: 'विरासत, पहाड़, समुद्र तट और पावन तीर्थ',
    quickCostCalc: 'लागत का हिसाब',
    quickCostCalcDesc: 'होटल, भोजन और आवागमन का सटीक खर्च',
    quickHiddenGems: 'छिपे हुए रत्न',
    quickHiddenGemsDesc: 'भीड़भाड़ से दूर शांत व ऐतिहासिक स्थल',
    popularDestinations: 'भारत के प्रमुख गंतव्य',
    hiddenGemsTitle: 'प्रसिद्धि से परे — अनदेखा भारत।',
    hiddenGemsSubtitle: 'भीड़भाड़ कम करने और ग्रामीण कारीगरों को सशक्त बनाने के लिए अप्रतिम ऐतिहासिक और प्राकृतिक धरोहरें।',
    experiencesTitle: 'जीवंत भारत का अनुभव लें',
    experiencesSubtitle: 'पारंपरिक हस्तशिल्प, पाक कला और विरासत पदयात्राएं सीधे स्थानीय कारीगरों के साथ।',
    marketplaceTitle: 'स्थानीय पर्यटन को समर्थन दें',
    marketplaceSubtitle: 'स्थानीय होमस्टे, प्रमाणित गाइड और शिल्पकारों को डिजिटल पहचान देकर पर्यटकों से सीधा संपर्क।',
    whyYatraTitle: 'यात्री और स्थानीय व्यवसाय यात्रा 66 क्यों चुनते हैं',
    step1Title: 'गंतव्य चुनें',
    step2Title: 'यात्रा तिथियां',
    step3Title: 'यात्रियों की संख्या',
    step4Title: 'बजट और शैली',
    step5Title: 'रुचियां और गति',
    step6Title: 'तैयार यात्रा योजना',
    btnOptimizeRoute: '⚡ मार्ग अनुकूलित करें',
    btnSaveTrip: '💾 यात्रा सहेजें',
    btnShareTrip: '🔗 शेयर करें',
    btnRecalculate: '🔄 पुनर्गणना करें',
    safetyTitle: 'पर्यटक सुरक्षा व आपातकालीन सहायता',
  }
};

// ============================================================================
// HELPER ALGORITHMS: ROUTE OPTIMIZATION, COST CALCULATOR & MARKETPLACE
// ============================================================================

export function getHaversineDistanceKm(lat1, lon1, lat2, lon2) {
  if (lat1 === undefined || lon1 === undefined || lat2 === undefined || lon2 === undefined) return 0;
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

export function optimizeRouteWaypoints(waypoints = []) {
  if (!waypoints || waypoints.length <= 1) {
    return {
      orderedWaypoints: waypoints,
      totalDistanceKm: 0,
      totalDurationMinutes: 0,
      polylineCoords: waypoints.map((w) => [w.lat, w.lng]),
      savedKm: 0,
      savedMinutes: 0,
      isOptimized: true
    };
  }

  let unoptKm = 0;
  for (let i = 0; i < waypoints.length - 1; i++) {
    unoptKm += getHaversineDistanceKm(
      waypoints[i].lat, waypoints[i].lng,
      waypoints[i + 1].lat, waypoints[i + 1].lng
    );
  }

  const unvisited = [...waypoints.slice(1)];
  const ordered = [waypoints[0]];
  let curr = waypoints[0];

  while (unvisited.length > 0) {
    let nearestIdx = 0;
    let minD = Infinity;
    for (let i = 0; i < unvisited.length; i++) {
      const d = getHaversineDistanceKm(curr.lat, curr.lng, unvisited[i].lat, unvisited[i].lng);
      if (d < minD) {
        minD = d;
        nearestIdx = i;
      }
    }
    const [nextPt] = unvisited.splice(nearestIdx, 1);
    ordered.push(nextPt);
    curr = nextPt;
  }

  let totalKm = 0;
  let totalMinutes = 0;
  const enriched = ordered.map((pt, idx) => {
    let distFromPrev = 0;
    let minsFromPrev = 0;
    if (idx > 0) {
      distFromPrev = getHaversineDistanceKm(
        ordered[idx - 1].lat, ordered[idx - 1].lng,
        pt.lat, pt.lng
      );
      minsFromPrev = Math.round((distFromPrev / 25) * 60 + (distFromPrev > 0 ? 8 : 0));
      totalKm += distFromPrev;
      totalMinutes += minsFromPrev;
    }
    return {
      ...pt,
      sequenceOrder: idx + 1,
      distFromPrevKm: distFromPrev,
      transitMinsFromPrev: minsFromPrev
    };
  });

  totalKm = Math.round(totalKm * 10) / 10;
  const savedKm = Math.max(0, Math.round((unoptKm - totalKm) * 10) / 10);
  const savedMinutes = Math.max(0, Math.round(savedKm * 3.2));

  return {
    orderedWaypoints: enriched,
    totalDistanceKm: totalKm,
    totalDurationMinutes: totalMinutes,
    polylineCoords: enriched.map((w) => [w.lat, w.lng]),
    savedKm,
    savedMinutes,
    isOptimized: true
  };
}

export function calculateDetailedBudget({
  travellers = 2,
  days = 3,
  budgetLevel = 'comfort',
  city = 'Jaipur',
  activitiesCount = 2,
  customModifiers = {}
}) {
  const tCount = Math.max(1, Number(travellers) || 2);
  const dCount = Math.max(1, Number(days) || 3);
  const roomsNeeded = Math.ceil(tCount / 2);

  const TIER_RATES = {
    budget: {
      stayPerRoomNight: 1200,
      foodPerPersonDay: 500,
      transitPerDay: 400,
      sightseeingPerPersonDay: 250,
      activityPerPerson: 400,
      miscRatio: 0.08,
      label: 'Backpacker Budget',
      stayDesc: 'Hostels, verified local guesthouses & boutique dorms',
      transitDesc: 'Metro, shared autos, e-rickshaws & local city buses',
      diningDesc: 'Iconic street food hubs, dhabas & authentic local eateries'
    },
    comfort: {
      stayPerRoomNight: 3400,
      foodPerPersonDay: 1200,
      transitPerDay: 1100,
      sightseeingPerPersonDay: 550,
      activityPerPerson: 850,
      miscRatio: 0.10,
      label: 'Comfort Explorer',
      stayDesc: '3-Star boutique hotels & heritage homestays',
      transitDesc: 'Prepaid app cabs (Ola/Uber) & AC local transfers',
      diningDesc: 'Renowned heritage restaurants, cafes & thali houses'
    },
    premium: {
      stayPerRoomNight: 8500,
      foodPerPersonDay: 2800,
      transitPerDay: 2500,
      sightseeingPerPersonDay: 1200,
      activityPerPerson: 1800,
      miscRatio: 0.12,
      label: 'Royal Luxury & Heritage',
      stayDesc: '5-Star palaces, luxury havelis & 4-star heritage resorts',
      transitDesc: 'Dedicated private AC chauffeur sedan / SUV',
      diningDesc: 'Fine-dining royal cuisine, rooftop lounges & private tastings'
    }
  };

  const rate = TIER_RATES[budgetLevel] || TIER_RATES.comfort;
  const cityMultiplier = ['Mumbai', 'Delhi'].includes(city) ? 1.15 : (city === 'Agra' ? 0.92 : 1.0);

  const stayCost = Math.round((customModifiers.stayRate || rate.stayPerRoomNight * cityMultiplier) * roomsNeeded * dCount);
  const foodCost = Math.round((customModifiers.foodRate || rate.foodPerPersonDay * cityMultiplier) * tCount * dCount);
  const transitCost = Math.round((customModifiers.transitRate || rate.transitPerDay) * dCount);
  const sightCost = Math.round((customModifiers.sightRate || rate.sightseeingPerPersonDay) * tCount * dCount);
  const activityCost = Math.round((customModifiers.actRate || rate.activityPerPerson) * activitiesCount * tCount);

  const subtotal = stayCost + foodCost + transitCost + sightCost + activityCost;
  const miscCost = Math.round(subtotal * rate.miscRatio);
  const grandTotal = subtotal + miscCost;
  const perPersonCost = Math.round(grandTotal / tCount);

  return {
    budgetLevel,
    label: rate.label,
    roomsNeeded,
    days: dCount,
    travellers: tCount,
    grandTotal,
    perPersonCost,
    items: [
      {
        category: 'Accommodation',
        icon: '🏨',
        amount: stayCost,
        percentage: Math.round((stayCost / grandTotal) * 100),
        details: `${roomsNeeded} room(s) × ${dCount} nights`,
        desc: rate.stayDesc,
        color: '#3b82f6'
      },
      {
        category: 'Food & Dining',
        icon: '🍲',
        amount: foodCost,
        percentage: Math.round((foodCost / grandTotal) * 100),
        details: `${tCount} travelers × ${dCount} days`,
        desc: rate.diningDesc,
        color: '#10b981'
      },
      {
        category: 'Local Transport',
        icon: '🚕',
        amount: transitCost,
        percentage: Math.round((transitCost / grandTotal) * 100),
        details: `${dCount} days of daily transit`,
        desc: rate.transitDesc,
        color: '#8b5cf6'
      },
      {
        category: 'Sightseeing & Entry',
        icon: '🏛️',
        amount: sightCost,
        percentage: Math.round((sightCost / grandTotal) * 100),
        details: 'ASI passes & monument entry tickets',
        desc: 'Includes ASI heritage monument tickets and museum passes',
        color: '#f59e0b'
      },
      {
        category: 'Experiences & Activities',
        icon: '🎨',
        amount: activityCost,
        percentage: Math.round((activityCost / grandTotal) * 100),
        details: `${activitiesCount} guided cultural experience(s)`,
        desc: 'Artisan workshops, walking tours & heritage guides',
        color: '#ec4899'
      },
      {
        category: 'Shopping & Miscellaneous',
        icon: '🛍️',
        amount: miscCost,
        percentage: Math.round((miscCost / grandTotal) * 100),
        details: 'Handicrafts buffer, tips & emergency fund',
        desc: 'Souvenirs, artisan textiles, emergency reserves and tips',
        color: '#06b6d4'
      }
    ],
    savingsTips: [
      'Book ASI monuments directly via ASI-Pay online to save 10% on entry fees.',
      'Use metro rail corridors in Delhi, Jaipur and Mumbai to avoid rush-hour traffic jams.',
      'Purchase handicrafts directly from artisan workshops (e.g. Bagru or Agra inlay) to support local makers and get 30-40% better pricing.'
    ]
  };
}

export function submitBusinessEnquiry(enquiry) {
  const newEnquiry = {
    id: 'ENQ-' + Date.now().toString(36).toUpperCase(),
    timestamp: new Date().toISOString(),
    status: 'Pending Response',
    ...enquiry
  };

  try {
    const existing = JSON.parse(localStorage.getItem('yatra_business_enquiries') || '[]');
    existing.unshift(newEnquiry);
    localStorage.setItem('yatra_business_enquiries', JSON.stringify(existing));
  } catch (err) {
    console.error('Failed to save enquiry locally', err);
  }

  fetch('/api/business/enquiry', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newEnquiry)
  }).catch(() => {});

  return newEnquiry;
}

export function getStoredBusinessEnquiries() {
  try {
    return JSON.parse(localStorage.getItem('yatra_business_enquiries') || '[]');
  } catch {
    return [];
  }
}

export function registerLocalBusiness(business) {
  const newBiz = {
    id: Date.now(),
    verified: true,
    rating: 4.8,
    reviewsCount: 1,
    commissionRate: '0%',
    ...business
  };

  try {
    const existing = JSON.parse(localStorage.getItem('yatra_custom_businesses') || '[]');
    existing.unshift(newBiz);
    localStorage.setItem('yatra_custom_businesses', JSON.stringify(existing));
  } catch (err) {
    console.error('Failed to register business locally', err);
  }

  return newBiz;
}

export function getCustomLocalBusinesses() {
  try {
    return JSON.parse(localStorage.getItem('yatra_custom_businesses') || '[]');
  } catch {
    return [];
  }
}

// ============================================================================
// "BOOST THIS DESTINATION" OPPORTUNITY SCORE ALGORITHM DATA
// Scoring algorithm based on: Search growth, Infrastructure, Richness, Low Crowding, Local Biz
// ============================================================================
export const DESTINATION_OPPORTUNITY_DATA = [
  {
    id: 'opp-bundi',
    name: 'Bundi',
    state: 'Rajasthan',
    opportunityScore: 91,
    tier: 'High Opportunity',
    badge: '👑 Offbeat Heritage Star',
    searchGrowthMoM: '+48%',
    crowdIndex: 'Low (12% capacity)',
    crowdStatus: 'low',
    attractionsScore: 94,
    infraScore: 82,
    economicMultiplier: '3.6x Local Yield',
    localBizCount: 42,
    highlights: ['Taragarh Fort', '50+ Ornate Stepwells (Raniji ki Baori)', 'Chitrashala Miniature Paintings', 'Nawal Sagar Lake'],
    famousAlternativeTo: 'Jaipur Forts (Amber Fort & Nahargarh)',
    whyBoost: 'Bundi preserves genuine 16th-century Rajput palace frescoes and colossal stepwells without tourist traps. Direct traveler spending supports family havelis, stepwell water conservation, and miniature painting guilds.',
    estimatedTripCost: 9800,
    heroImage: 'https://images.unsplash.com/photo-1477587458883-47145ed94245?w=800'
  },
  {
    id: 'opp-orchha',
    name: 'Orchha',
    state: 'Madhya Pradesh',
    opportunityScore: 88,
    tier: 'High Opportunity',
    badge: '🏰 Riverfront Citadel',
    searchGrowthMoM: '+41%',
    crowdIndex: 'Very Low (15% capacity)',
    crowdStatus: 'low',
    attractionsScore: 92,
    infraScore: 80,
    economicMultiplier: '3.2x Local Yield',
    localBizCount: 36,
    highlights: ['Jahangir Mahal', 'Betwa River Chhatris (Cenotaphs)', 'Chaturbhuj Temple', 'Raja Mahal Murals'],
    famousAlternativeTo: 'Varanasi Ghats & Agra Citadels',
    whyBoost: 'A quiet riverside medieval capital with soaring stone palaces. Promotes local homestays and river conservation along the pristine Betwa riverfront.',
    estimatedTripCost: 8900,
    heroImage: 'https://images.unsplash.com/photo-1608958435020-e8a7109ba809?w=800'
  },
  {
    id: 'opp-mandu',
    name: 'Mandu',
    state: 'Madhya Pradesh',
    opportunityScore: 82,
    tier: 'Emerging Gem',
    badge: '✨ Floating Palaces',
    searchGrowthMoM: '+34%',
    crowdIndex: 'Tranquil (9% capacity)',
    crowdStatus: 'low',
    attractionsScore: 89,
    infraScore: 78,
    economicMultiplier: '2.9x Local Yield',
    localBizCount: 28,
    highlights: ['Jahaz Mahal (Ship Palace)', 'Rani Roopmati Pavilion', 'Hindola Mahal (Swinging Palace)', 'Baobab Tree Groves'],
    famousAlternativeTo: 'Udaipur Palaces',
    whyBoost: 'Perched on the Vindhya plateau, Mandu displays ethereal Afghan stone masonry and ancient monsoon rainwater palaces.',
    estimatedTripCost: 9200,
    heroImage: 'https://images.unsplash.com/photo-1585135497273-1a86b09fe70e?w=800'
  },
  {
    id: 'opp-samode',
    name: 'Samode',
    state: 'Rajasthan',
    opportunityScore: 89,
    tier: 'High Opportunity',
    badge: '🎨 Artisan & Haveli Haven',
    searchGrowthMoM: '+37%',
    crowdIndex: 'Exclusive (10% capacity)',
    crowdStatus: 'low',
    attractionsScore: 90,
    infraScore: 85,
    economicMultiplier: '3.4x Local Yield',
    localBizCount: 31,
    highlights: ['Samode Palace Sheesh Mahal', 'Handicraft Carpet Weavers', 'Samode Bagh Mughal Gardens', 'Rural Camel Cart Trails'],
    famousAlternativeTo: 'Amber Fort & Jaipur Walled City',
    whyBoost: 'Located just 40km from Jaipur, Samode distributes tourist revenue into rural hand-weaving cooperatives and preserves 400-year-old royal mirror artwork.',
    estimatedTripCost: 8400,
    heroImage: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?w=800'
  },
  {
    id: 'opp-mawlynnong',
    name: 'Mawlynnong',
    state: 'Meghalaya',
    opportunityScore: 85,
    tier: 'High Opportunity',
    badge: '🌿 Eco-Clean Model',
    searchGrowthMoM: '+39%',
    crowdIndex: 'Managed (22% capacity)',
    crowdStatus: 'low',
    attractionsScore: 91,
    infraScore: 76,
    economicMultiplier: '3.8x Local Yield',
    localBizCount: 24,
    highlights: ['Living Root Bridges (Jingkieng)', 'Asia\'s Cleanest Village Walk', 'Balancing Rock', 'Bamboo Sky Walk'],
    famousAlternativeTo: 'Crowded Hill Stations',
    whyBoost: 'A global benchmark for indigenous Khasi community cleanliness, 100% organic waste upcycling, and sustainable bio-engineering.',
    estimatedTripCost: 11500,
    heroImage: 'https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?w=800'
  },
  {
    id: 'opp-ziro',
    name: 'Ziro Valley',
    state: 'Arunachal Pradesh',
    opportunityScore: 83,
    tier: 'Emerging Gem',
    badge: '🌲 Tribal Pine Paradise',
    searchGrowthMoM: '+46%',
    crowdIndex: 'Serene (14% capacity)',
    crowdStatus: 'low',
    attractionsScore: 93,
    infraScore: 71,
    economicMultiplier: '3.5x Local Yield',
    localBizCount: 22,
    highlights: ['Apatani Cultural Landscape', 'Pine-Clad Hills & Paddy Terraces', 'Bamboo Crafts & Rice Beer', 'Ziro Music Festival Grounds'],
    famousAlternativeTo: 'Commercial Himalayan Resorts',
    whyBoost: 'UNESCO-tentative landscape preserving unique sustainable Apatani wet-rice & fish farming traditions.',
    estimatedTripCost: 13800,
    heroImage: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800'
  },
  {
    id: 'opp-chettinad',
    name: 'Chettinad',
    state: 'Tamil Nadu',
    opportunityScore: 86,
    tier: 'High Opportunity',
    badge: '🏛️ Palatial Heritage',
    searchGrowthMoM: '+36%',
    crowdIndex: 'Peaceful (11% capacity)',
    crowdStatus: 'low',
    attractionsScore: 90,
    infraScore: 83,
    economicMultiplier: '3.1x Local Yield',
    localBizCount: 35,
    highlights: ['18th-Century Chettiar Mansions', 'Athangudi Handmade Tile Workshops', 'Kandangi Cotton Weaving', 'Signature Chettinad Spiced Gastronomy'],
    famousAlternativeTo: 'Overcrowded Coastal Resorts',
    whyBoost: 'Features palatial mansions built with Burmese teak and Belgian glass; direct income empowers traditional tile craftsmen and master weavers.',
    estimatedTripCost: 10400,
    heroImage: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=800'
  },
  {
    id: 'opp-spiti',
    name: 'Spiti Valley',
    state: 'Himachal Pradesh',
    opportunityScore: 87,
    tier: 'High Opportunity',
    badge: '🏔️ High Himalayan Sanctuary',
    searchGrowthMoM: '+52%',
    crowdIndex: 'Vast & Quiet (18% capacity)',
    crowdStatus: 'low',
    attractionsScore: 96,
    infraScore: 74,
    economicMultiplier: '3.3x Local Yield',
    localBizCount: 29,
    highlights: ['Key Gompa Cliffside Monastery', 'Chandratal Moon Lake', 'Dhankar Fortress', 'Fossil Village of Langza'],
    famousAlternativeTo: 'Crowded Manali & Shimla',
    whyBoost: 'Distributes Himalayan travelers away from saturated hill highways into remote Tibetan Buddhist villages needing community-based homestay income.',
    estimatedTripCost: 14200,
    heroImage: 'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?w=800'
  }
];

// ============================================================================
// CROWD-BALANCING & DECONGESTION ROUTING DATA
// High-crowd bottlenecks paired with quiet, high-value alternative heritage sites
// ============================================================================
export const CROWD_DECONGESTION_DATA = [
  {
    city: 'Jaipur',
    hotspot: {
      name: 'Amber Fort & Palace',
      crowdPercent: 94,
      status: 'high',
      waitTime: '45-60 min entry queue',
      peakHours: '10:30 AM - 3:30 PM',
      note: 'Extremely crowded with tour buses, lengthy vehicle queues at uphill ramp.'
    },
    alternatives: [
      {
        name: 'Royal Gaitore (Gaitor Ki Chhatriyan)',
        distance: '15 mins away (in Jaipur)',
        crowdPercent: 12,
        status: 'low',
        tag: 'Peaceful Marble Cenotaphs',
        desc: 'Serene royal cenotaphs carved in pristine white marble, set against the tranquil cliffs of Nahargarh.',
        transitTip: '15 min cab from Hawa Mahal',
        imageUrl: 'https://images.unsplash.com/photo-1477587458883-47145ed94245?w=800'
      },
      {
        name: 'Samode Palace & Heritage Village',
        distance: '42 mins drive from Jaipur',
        crowdPercent: 9,
        status: 'low',
        tag: 'Royal Rajput Splendor',
        desc: '400-year-old painted haveli palace with exquisite Sheesh Mahal mirror work and quiet artisan village lanes.',
        transitTip: 'Direct 40 km drive via NH48',
        imageUrl: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?w=800'
      },
      {
        name: 'Chandlai Lake Bird Sanctuary',
        distance: '30 mins drive from Jaipur',
        crowdPercent: 5,
        status: 'low',
        tag: 'Pink Flamingo Wetland',
        desc: 'Pristine 140-year-old freshwater lake welcoming 10,000+ migratory pink flamingos and peaceful nature sunsets.',
        transitTip: '30 min auto/cab south of Jaipur',
        imageUrl: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=800'
      }
    ]
  },
  {
    city: 'Agra',
    hotspot: {
      name: 'Taj Mahal (Main Gates)',
      crowdPercent: 96,
      status: 'high',
      waitTime: '60-90 min entry queue',
      peakHours: '9:00 AM - 4:00 PM',
      note: 'Heavy weekend tourist bottlenecks at West Gate and crowded interior mausoleum.'
    },
    alternatives: [
      {
        name: 'Bateshwar 101 Yamuna Temples',
        distance: '65 mins from Agra',
        crowdPercent: 8,
        status: 'low',
        tag: 'Ancient River Ghats',
        desc: 'Unbroken curve of 101 white domed Shiva shrines lining the serene Yamuna River with calm boatmen.',
        transitTip: '1 hr scenic drive towards Chambal',
        imageUrl: 'https://images.unsplash.com/photo-1608958435020-e8a7109ba809?w=800'
      },
      {
        name: 'Mehtab Bagh Secret Sunset Viewpoint',
        distance: '15 mins from Taj East Gate',
        crowdPercent: 22,
        status: 'low',
        tag: 'Uncrowded Reflection View',
        desc: 'Mughal riverfront pleasure garden offering panoramic sunset views of the Taj Mahal across the river with zero crowding.',
        transitTip: 'Short e-rickshaw ride across Ambedkar bridge',
        imageUrl: 'https://images.unsplash.com/photo-1585135497273-1a86b09fe70e?w=800'
      },
      {
        name: 'Sikandra (Akbar\'s Red Ochre Tomb)',
        distance: '20 mins from City Center',
        crowdPercent: 18,
        status: 'low',
        tag: 'Peaceful Imperial Gardens',
        desc: 'Sprawling 119-acre walled park where wild deer and blackbucks graze among monumental geometric Mughal gateways.',
        transitTip: '15 min cab on NH19',
        imageUrl: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?w=800'
      }
    ]
  },
  {
    city: 'Goa',
    hotspot: {
      name: 'Baga & Calangute Beaches',
      crowdPercent: 95,
      status: 'high',
      waitTime: 'Severe traffic & parking jam',
      peakHours: '4:00 PM - 10:00 PM',
      note: 'Commercial noise, saturated beach shacks, jet ski queues, and gridlocked coastal roads.'
    },
    alternatives: [
      {
        name: 'Divar Island Village Sanctuary',
        distance: '20 mins via Old Goa Ferry',
        crowdPercent: 6,
        status: 'low',
        tag: 'Timeless Island Escape',
        desc: 'Cycle through quiet emerald paddy fields, historic baroque churches, and traditional Goan-Portuguese taverns.',
        transitTip: 'Free government vehicle ferry from Ribandar',
        imageUrl: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=800'
      },
      {
        name: 'Chorão Bird Sanctuary & Mangroves',
        distance: '25 mins from Panaji',
        crowdPercent: 10,
        status: 'low',
        tag: 'Dr. Salim Ali Nature Reserve',
        desc: 'Quiet wooden canoes gliding silently through dense mangrove canals teeming with kingfishers and otters.',
        transitTip: 'Short river ferry from Raibandar',
        imageUrl: 'https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?w=800'
      },
      {
        name: 'Galgibaga Turtle Nesting Beach',
        distance: 'South Goa (Canacona)',
        crowdPercent: 12,
        status: 'low',
        tag: 'Pristine Olive Ridley Haven',
        desc: 'One of the cleanest, quietest beaches in India, bordered by whispering casuarina pine trees and zero commercial shacks.',
        transitTip: 'South Goa coastal road near Palolem',
        imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800'
      }
    ]
  },
  {
    city: 'Manali',
    hotspot: {
      name: 'Mall Road & Solang Valley',
      crowdPercent: 92,
      status: 'high',
      waitTime: '2-hour vehicle crawl at Atal Tunnel',
      peakHours: '11:00 AM - 5:00 PM',
      note: 'Gridlocked tourist vehicles, loud street commerce, long cable car queues.'
    },
    alternatives: [
      {
        name: 'Naggar Castle & Roerich Estate',
        distance: '35 mins from Manali',
        crowdPercent: 14,
        status: 'low',
        tag: 'Medieval Wooden Fortress',
        desc: '500-year-old Kathkuni wood-and-stone castle overlooking the snow-draped Beas River valley and Himalayan cedar forests.',
        transitTip: 'Quiet left-bank road along the Beas',
        imageUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800'
      },
      {
        name: 'Sethan Valley & Buddhist Hamlets',
        distance: '45 mins 4x4 drive',
        crowdPercent: 8,
        status: 'low',
        tag: 'Igloo & Boulder Sanctuary',
        desc: 'A tiny horse-breeding Khampa hamlet situated at 2,600m altitude with breathtaking silence and star-filled skies.',
        transitTip: 'Short switchback ascent past Prini',
        imageUrl: 'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?w=800'
      }
    ]
  }
];

// ============================================================================
// LIVE UPCOMING CULTURAL EVENTS & FESTIVALS ("What's happening in India?")
// ============================================================================
export const UPCOMING_LIVE_EVENTS_DATA = [
  {
    id: 'pushkar-fair',
    name: 'Pushkar International Camel & Cultural Fair',
    state: 'Rajasthan',
    dates: 'Nov 18 – Nov 26, 2026',
    month: 'November',
    season: 'Autumn / Post-Monsoon',
    expectedVisitors: '250,000+ Cultural Travelers & Nomads',
    atmosphere: 'Vibrant Desert Carnival with folk music, decorated camels & sacred lake aarti',
    heroImage: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?w=800',
    nearbyHomestays: 'Pushkar Desert Camp & Savitri Heritage Haveli (₹1,800/night)',
    localFoodToTry: 'Pushkar Rabdi Malpua, Dal Baati Churma, Rose Gulkand Lassi',
    transportOptions: 'Ajmer Junction Railway Station (14 km) | Jaipur Airport (145 km)',
    whySpecial: 'One of the world\'s largest camel festivals combining ancient religious ceremonies at Pushkar Brahma Lake with desert athletics and Rajasthani kalbelia dance.',
    itineraryCity: 'Jaipur'
  },
  {
    id: 'hornbill-festival',
    name: 'Hornbill Festival (Festival of Festivals)',
    state: 'Nagaland',
    dates: 'Dec 1 – Dec 10, 2026',
    month: 'December',
    season: 'Winter',
    expectedVisitors: '120,000+ Explorers & Ethno-Culture Enthusiasts',
    atmosphere: 'Grand tribal congregation of 17 indigenous Naga tribes in traditional regalia',
    heroImage: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=800',
    nearbyHomestays: 'Kisama Village Homestay & Kigwema Heritage Lodge (₹2,200/night)',
    localFoodToTry: 'Smoked Pork with Bamboo Shoots, Axone Curry, Sticky Rice Cakes',
    transportOptions: 'Dimapur Airport & Railway Station (74 km) with shared sumo taxis',
    whySpecial: 'Celebrates rich warrior songs, traditional archery, indigenous stone-pulling, and authentic Morung tribal architecture in Kisama Heritage Village.',
    itineraryCity: 'Shillong'
  },
  {
    id: 'rann-utsav',
    name: 'Rann Utsav (White Desert Festival)',
    state: 'Gujarat',
    dates: 'Nov 1, 2026 – Feb 28, 2027',
    month: 'November to February',
    season: 'Winter',
    expectedVisitors: '500,000+ Travelers over 4 months',
    atmosphere: 'Ethereal glowing white salt desert under full-moon skies with Kutchi craft bazaars',
    heroImage: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800',
    nearbyHomestays: 'Dhordo Traditional Bhunga Mud Cottages (₹3,200/night)',
    localFoodToTry: 'Kutchi Dabeli, Bajra no Rotlo with Ringna no Olo, Fresh Mawa',
    transportOptions: 'Bhuj Railway Station & Airport (82 km) with AC festival coaches',
    whySpecial: 'The world\'s largest salt desert comes alive with Kutchi embroidery, Rogan painting masterclasses, camel safaris, and stargazing.',
    itineraryCity: 'Ahmedabad'
  },
  {
    id: 'ziro-festival',
    name: 'Ziro Festival of Music',
    state: 'Arunachal Pradesh',
    dates: 'Sep 24 – Sep 27, 2026',
    month: 'September',
    season: 'Autumn',
    expectedVisitors: '15,000+ Indie Music & Nature Lovers',
    atmosphere: 'Eco-friendly bamboo stages in emerald paddy valleys surrounded by pine hills',
    heroImage: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800',
    nearbyHomestays: 'Apatani Tribal Bamboo Homestays & Hapoli Campgrounds (₹1,500/night)',
    localFoodToTry: 'Pikey Pila (Bamboo shoot dish), Fresh Apong (Fermented Rice Brew), Smoked Fish',
    transportOptions: 'Naharlagun / Guwahati Railway + Shared Sumo up through scenic hills',
    whySpecial: 'India\'s most picturesque and zero-plastic eco-music festival supporting indigenous Apatani youth cooperatives and bamboo craftsmen.',
    itineraryCity: 'Shillong'
  },
  {
    id: 'hemis-festival',
    name: 'Hemis Monastery Mask Festival',
    state: 'Ladakh',
    dates: 'Jul 15 – Jul 16, 2026',
    month: 'July',
    season: 'Summer',
    expectedVisitors: '40,000+ High Altitude Explorers & Pilgrims',
    atmosphere: 'Sacred Cham masked dance rituals in a 300-year-old Himalayan monastery courtyard',
    heroImage: 'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?w=800',
    nearbyHomestays: 'Hemis Village Monastery Homestay & Karu Guest House (₹1,600/night)',
    localFoodToTry: 'Ladakhi Thukpa, Steamed Tingmo with Apricot Jam, Butter Tea (Gur Gur Chai)',
    transportOptions: 'Kushok Bakula Rimpochee Airport (Leh, 45 km) via Manali-Leh Highway',
    whySpecial: 'Commemorates Guru Padmasambhava with vibrant silk thangkas, long copper horns, and sacred monastic masked performances.',
    itineraryCity: 'Leh Ladakh'
  },
  {
    id: 'kite-festival',
    name: 'International Kite Festival (Uttarayan)',
    state: 'Gujarat',
    dates: 'Jan 8 – Jan 15, 2026',
    month: 'January',
    season: 'Winter',
    expectedVisitors: '1,000,000+ Enthusiasts across Ahmedabad Sabarmati Riverfront',
    atmosphere: 'Skies filled with hundreds of thousands of dazzling kites, night fireworks & terrace feasts',
    heroImage: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?w=800',
    nearbyHomestays: 'Old Ahmedabad Heritage Pol Haveli (₹2,100/night)',
    localFoodToTry: 'Undhiyu, Jalebi, Til Ladoo, Chikki, Khichu with groundnut oil',
    transportOptions: 'Ahmedabad Kalupur Railway Station (5 km) | Sardar Vallabhbhai Patel Airport (10 km)',
    whySpecial: 'A UNESCO-recognized harvest celebration transforming terrace rooftops into communal music, festive dining, and aerial kite duels.',
    itineraryCity: 'Ahmedabad'
  }
];

// ============================================================================
// GAMIFICATION: EXPLORE INDIA PASSPORT (28 States Tracker & Badges)
// ============================================================================
export const GAMIFICATION_DATA = {
  totalStatesAndUts: 36,
  states: [
    { id: 'RJ', name: 'Rajasthan', region: 'North', icon: '🏰', famousFor: 'Forts, Palaces & Desert Havelis', capital: 'Jaipur' },
    { id: 'HP', name: 'Himachal Pradesh', region: 'North', icon: '🏔️', famousFor: 'Himalayan Valleys & Pine Forests', capital: 'Shimla' },
    { id: 'KL', name: 'Kerala', region: 'South', icon: '🌴', famousFor: 'Backwaters, Ayurvedic Spices & Kathakali', capital: 'Thiruvananthapuram' },
    { id: 'DL', name: 'Delhi', region: 'North', icon: '🏛️', famousFor: 'Mughal Citadels & Street Food Bazaars', capital: 'New Delhi' },
    { id: 'UP', name: 'Uttar Pradesh', region: 'North', icon: '🪔', famousFor: 'Taj Mahal & Holy Ganges Ghats', capital: 'Lucknow' },
    { id: 'MH', name: 'Maharashtra', region: 'West', icon: '🌊', famousFor: 'Western Ghats, Caves & Marine Promenades', capital: 'Mumbai' },
    { id: 'GA', name: 'Goa', region: 'West', icon: '🏖️', famousFor: 'Sun-Drenched Beaches & Portuguese Churches', capital: 'Panaji' },
    { id: 'MP', name: 'Madhya Pradesh', region: 'Central', icon: '🐅', famousFor: 'Heart of India, Khajuraho & Mandu', capital: 'Bhopal' },
    { id: 'TN', name: 'Tamil Nadu', region: 'South', icon: '🛕', famousFor: 'Dravidian Temples & Chettinad Mansions', capital: 'Chennai' },
    { id: 'KA', name: 'Karnataka', region: 'South', icon: '🐘', famousFor: 'Hampi Ruins & Mysore Palace', capital: 'Bengaluru' },
    { id: 'WB', name: 'West Bengal', region: 'East', icon: '🎨', famousFor: 'Durga Puja, Victoria Memorial & Tea Hills', capital: 'Kolkata' },
    { id: 'ML', name: 'Meghalaya', region: 'North-East', icon: '🌧️', famousFor: 'Living Root Bridges & Cloud Waterfalls', capital: 'Shillong' },
    { id: 'AS', name: 'Assam', region: 'North-East', icon: '🦏', famousFor: 'Kaziranga Rhinos & Majuli River Island', capital: 'Dispur' },
    { id: 'AR', name: 'Arunachal Pradesh', region: 'North-East', icon: '🎋', famousFor: 'Ziro Valley & Tawang Monastery', capital: 'Itanagar' },
    { id: 'UT', name: 'Uttarakhand', region: 'North', icon: '🕉️', famousFor: 'Yoga Capital Rishikesh & Valley of Flowers', capital: 'Dehradun' },
    { id: 'PB', name: 'Punjab', region: 'North', icon: '🌾', famousFor: 'Golden Temple & Langar Hospitality', capital: 'Chandigarh' },
    { id: 'GJ', name: 'Gujarat', region: 'West', icon: '🦁', famousFor: 'Gir Lions, White Rann & Stepwells', capital: 'Gandhinagar' },
    { id: 'LA', name: 'Ladakh', region: 'North', icon: '☸️', famousFor: 'Pangong Tso & High Mountain Passes', capital: 'Leh' },
    { id: 'JK', name: 'Jammu & Kashmir', region: 'North', icon: '🛶', famousFor: 'Dal Lake Shikaras & Meadow of Gold', capital: 'Srinagar' },
    { id: 'OR', name: 'Odisha', region: 'East', icon: '☀️', famousFor: 'Konark Sun Temple & Raghurajpur Crafts', capital: 'Bhubaneswar' },
    { id: 'TG', name: 'Telangana', region: 'South', icon: '💎', famousFor: 'Charminar & Golconda Diamonds', capital: 'Hyderabad' },
    { id: 'AP', name: 'Andhra Pradesh', region: 'South', icon: '🌶️', famousFor: 'Tirupati & Araku Coffee Hills', capital: 'Amaravati' },
    { id: 'SK', name: 'Sikkim', region: 'North-East', icon: '❄️', famousFor: 'Kanchenjunga Views & Organic Farming', capital: 'Gangtok' },
    { id: 'CH', name: 'Chhattisgarh', region: 'Central', icon: '🍃', famousFor: 'Chitrakote Falls & Tribal Bell Metal Art', capital: 'Raipur' },
    { id: 'BR', name: 'Bihar', region: 'East', icon: '🧘‍♂️', famousFor: 'Bodh Gaya & Ancient Nalanda Ruins', capital: 'Patna' },
    { id: 'JH', name: 'Jharkhand', region: 'East', icon: '🌲', famousFor: 'Betla Forests & Tribal Sohrai Paintings', capital: 'Ranchi' },
    { id: 'TR', name: 'Tripura', region: 'North-East', icon: '🏛️', famousFor: 'Ujjayanta Floating Lake Palace', capital: 'Agartala' },
    { id: 'MN', name: 'Manipur', region: 'North-East', icon: '🌸', famousFor: 'Loktak Floating Phumdis Lake', capital: 'Imphal' },
  ],
  badges: [
    {
      id: 'badge-heritage',
      title: 'Heritage Explorer',
      icon: '🏛️',
      color: '#d97706',
      description: 'Explored 3+ UNESCO World Heritage Forts or Palaces',
      criteria: 'Visit historical monuments in Jaipur, Agra, or Hampi',
      unlockedDefault: true
    },
    {
      id: 'badge-himalayan',
      title: 'Himalayan Nomad',
      icon: '🏔️',
      color: '#0284c7',
      description: 'Journeyed into high-altitude valleys or mountain passes',
      criteria: 'Explore Himachal, Ladakh, Uttarakhand, or Sikkim',
      unlockedDefault: true
    },
    {
      id: 'badge-coastal',
      title: 'Coastal Wanderer',
      icon: '🌊',
      color: '#0f766e',
      description: 'Navigated Arabian Sea or Bay of Bengal shorelines',
      criteria: 'Explore beaches and backwaters in Goa, Kerala, or Mumbai',
      unlockedDefault: true
    },
    {
      id: 'badge-hidden',
      title: 'Hidden India Pioneer',
      icon: '🧭',
      color: '#16a34a',
      description: 'Decongested tourism by visiting at least 2 offbeat gems',
      criteria: 'Visit Bundi, Orchha, Mandu, Samode, or Mawlynnong',
      unlockedDefault: true
    },
    {
      id: 'badge-foodie',
      title: 'Street Food Connoisseur',
      icon: '🍲',
      color: '#ea580c',
      description: 'Tasted 5+ verified indigenous regional delicacies',
      criteria: 'Experience local food walks and authentic thalis',
      unlockedDefault: false
    },
    {
      id: 'badge-storyteller',
      title: 'Cultural Storyteller',
      icon: '🎭',
      color: '#9333ea',
      description: 'Booked directly with an artisan, guide, or rural homestay',
      criteria: 'Participate in 0% commission local marketplace experiences',
      unlockedDefault: false
    }
  ]
};

// ============================================================================
// REALISTIC TRIP-COST REBALANCER ALGORITHM
// Dynamically adjusts hotel tier, train vs cab, street food & free heritage walks
// ============================================================================
export function rebalanceTripBudget({
  originalTotal = 18000,
  targetTotal = 10000,
  days = 3,
  travellers = 2,
  city = 'Jaipur'
}) {
  const orig = Math.max(1000, Number(originalTotal) || 18000);
  const target = Math.min(orig, Math.max(3000, Number(targetTotal) || 10000));
  const savings = Math.max(0, orig - target);
  const percentSaved = Math.round((savings / orig) * 100);

  const stayCost = Math.round(target * 0.40);
  const transitCost = Math.round(target * 0.20);
  const foodCost = Math.round(target * 0.25);
  const activitiesCost = Math.round(target * 0.15);

  const tradeOffs = [];
  if (percentSaved >= 30) {
    tradeOffs.push({
      category: 'Accommodation',
      icon: '🏨',
      action: 'Switched Stay to Verified Boutique Homestay / Haveli Dorm',
      savedAmount: Math.round(savings * 0.45),
      detail: 'Opted for authentic family-run homestay instead of high-tariff commercial hotel. Zero loss of hygiene or local warmth.'
    });
    tradeOffs.push({
      category: 'Transit',
      icon: '🚆',
      action: 'Switched Private Cab to Vande Bharat / Superfast Express Train',
      savedAmount: Math.round(savings * 0.25),
      detail: 'Fast, comfortable AC train travel + local e-rickshaws instead of dedicated intercity cabs.'
    });
    tradeOffs.push({
      category: 'Food & Dining',
      icon: '🍲',
      action: 'Switched Fine-Dining to Curated Heritage Street Food & Local Thalis',
      savedAmount: Math.round(savings * 0.20),
      detail: 'Enjoying multi-generational sweetshops, iconic kachori points, and traditional unlimited thalis.'
    });
    tradeOffs.push({
      category: 'Sightseeing',
      icon: '🏛️',
      action: 'Replaced Expensive Commercial Tours with Free Heritage Walks & Stepwells',
      savedAmount: Math.round(savings * 0.10),
      detail: 'Enjoying public architectural wonders, peaceful river ghats, and hill sunset viewpoints at zero ticket markup.'
    });
  } else if (percentSaved > 0) {
    tradeOffs.push({
      category: 'Accommodation',
      icon: '🏨',
      action: 'Selected Verified Comfort Homestay Tier',
      savedAmount: Math.round(savings * 0.50),
      detail: 'Clean, verified 3-star local stay offering home-cooked breakfast.'
    });
    tradeOffs.push({
      category: 'Transit',
      icon: '🚕',
      action: 'Optimized Shared Airport/Station Transfers & Metro Cards',
      savedAmount: Math.round(savings * 0.30),
      detail: 'Using convenient metro corridors and prepaid app autos.'
    });
    tradeOffs.push({
      category: 'Dining',
      icon: '🍛',
      action: 'Balanced Mix of Cafes & Popular Local Eateries',
      savedAmount: Math.round(savings * 0.20),
      detail: 'Authentic regional dishes at trusted neighborhood restaurants.'
    });
  }

  return {
    originalTotal: orig,
    targetTotal: target,
    savings,
    percentSaved,
    rebalancedItems: [
      { category: 'Accommodation', icon: '🏨', amount: stayCost, desc: 'Verified local boutique homestay' },
      { category: 'Transit & Local Travel', icon: '🚆', amount: transitCost, desc: 'Express rail + local autos/metro' },
      { category: 'Food & Dining', icon: '🍲', amount: foodCost, desc: 'Heritage street food & regional thalis' },
      { category: 'Attractions & Activities', icon: '🎨', amount: activitiesCost, desc: 'Free heritage trails & artisan workshops' }
    ],
    tradeOffs
  };
}
