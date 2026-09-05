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
    id: 'gem-1',
    name: 'Chand Baori Stepwell (Abhaneri)',
    cityId: 1,
    cityName: 'Jaipur',
    category: 'Architecture & Heritage',
    distanceFromCenterKm: 88,
    tag: 'Architectural Wonder',
    shortDesc: 'One of the deepest and most geometrically mesmerizing stepwells in the world with 3,500 narrow steps.',
    fullDesc: 'Built in the 9th century by King Chanda of the Nikumbha Dynasty, Chand Baori is an ancient rainwater harvesting marvel featuring 13 tiered storeys in perfect symmetry.',
    bestTime: 'Early Morning (8:00 AM - 11:00 AM)',
    estimatedCostInr: 250,
    decongestionFactor: 'High (85% fewer crowds than Amber Fort)',
    imageUrl: 'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?w=800&q=80',
    verified: true,
    sustainabilityImpact: 'Directly supports Abhaneri artisan village cooperatives and local terracotta potters.',
    nearbyStay: 'Umaid Lake Palace (Eco-Heritage Farmstay)',
    nearbyFood: 'Abhaneri Village Heritage Thali',
    latitude: 27.0072,
    longitude: 76.6064,
  },
  {
    id: 'gem-2',
    name: 'Galta Ji & Sun Temple (Monkey Valley)',
    cityId: 1,
    cityName: 'Jaipur',
    category: 'Spiritual & Sunset',
    distanceFromCenterKm: 10,
    tag: 'Sacred Hillside Springs',
    shortDesc: 'Historic pink sandstone temple pavilions nestled inside a mountain pass with natural mineral springs.',
    fullDesc: 'Dating back to the 18th century, Galta Ji features sacred natural water kunds (tanks) where holy spring water flows from Gaumukh into sacred tiered pools overlooking the Aravalli hills.',
    bestTime: 'Sunset (4:30 PM - 6:30 PM)',
    estimatedCostInr: 100,
    decongestionFactor: 'Moderate (Scenic and serene)',
    imageUrl: 'https://images.unsplash.com/photo-1598890777032-bde835ba27c2?w=800&q=80',
    verified: true,
    sustainabilityImpact: 'Preserves indigenous rhesus macaque wildlife habitat and ancient rainwater ecology.',
    nearbyStay: 'Sisodia Rani Palace Bagh Heritage Stay',
    nearbyFood: 'Galtaji Ghat Kadak Chai & Mirchi Vada',
    latitude: 26.9161,
    longitude: 75.8569,
  },
  {
    id: 'gem-3',
    name: 'Bateshwar 101 Temples Complex',
    cityId: 2,
    cityName: 'Agra',
    category: 'Spiritual Heritage',
    distanceFromCenterKm: 70,
    tag: 'Yamuna River Heritage',
    shortDesc: 'A crescent-shaped bank of 101 white-domed Shiva shrines on the peaceful bend of the Yamuna River.',
    fullDesc: 'An ancient spiritual pilgrimage site known as the mini-Varanasi of Uttar Pradesh, celebrated for peaceful river ghat aartis and unbroken rows of carved stone temples.',
    bestTime: 'October to February',
    estimatedCostInr: 150,
    decongestionFactor: 'Very High (95% tranquil compared to Taj Mahal)',
    imageUrl: 'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?w=800&q=80',
    verified: true,
    sustainabilityImpact: 'Promotes rural religious tourism and Chambal Valley boatmen livelihoods.',
    nearbyStay: 'Chambal Safari Heritage Lodge',
    nearbyFood: 'Bateshwar Peda & Fresh Yamuna Lassi',
    latitude: 26.9365,
    longitude: 78.5366,
  },
  {
    id: 'gem-4',
    name: 'Mehtab Bagh Secret Sunset Ghat',
    cityId: 2,
    cityName: 'Agra',
    category: 'Photography & Sunset',
    distanceFromCenterKm: 5,
    tag: 'Unobstructed Taj Reflection',
    shortDesc: 'Tranquil charbagh garden across the river providing breathtaking crowd-free views of the Taj Mahal.',
    fullDesc: 'Originally planned by Emperor Babur as a moonlight pleasure garden, this vantage point offers an unobstructed golden-hour panorama of the Taj Mahal without the crowds.',
    bestTime: '4:30 PM - 6:00 PM (Sunset)',
    estimatedCostInr: 300,
    decongestionFactor: 'High (Calm and meditative atmosphere)',
    imageUrl: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=800&q=80',
    verified: true,
    sustainabilityImpact: 'Supports Yamuna riverside clean-up initiatives and local certified e-rickshaw drivers.',
    nearbyStay: 'Radisson Taj East Gate',
    nearbyFood: 'Petha Sweets & Mughlai Kebab stalls',
    latitude: 27.1802,
    longitude: 78.0421,
  },
  {
    id: 'gem-5',
    name: 'Sanjay Van & Lal Kot Medieval Ruins',
    cityId: 3,
    cityName: 'Delhi',
    category: 'Nature & Ancient Ruins',
    distanceFromCenterKm: 14,
    tag: 'Secret Urban Forest',
    shortDesc: 'A dense 783-acre nature forest housing 12th-century stone ramparts and bird-watching lakes.',
    fullDesc: 'A pristine wilderness in South Delhi containing remains of Qila Rai Pithora, medieval Sufi shrines, and over 150 bird species including golden jackals and peacocks.',
    bestTime: '6:30 AM - 9:30 AM (Sunrise walk)',
    estimatedCostInr: 0,
    decongestionFactor: 'Very High (Pure nature silence)',
    imageUrl: 'https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?w=800&q=80',
    verified: true,
    sustainabilityImpact: 'Vital green lung of Delhi protected by local community forest rangers.',
    nearbyStay: 'Qutub Residency Boutique Hotel',
    nearbyFood: 'Mehrauli Organic Garden Cafe',
    latitude: 28.5284,
    longitude: 77.1725,
  },
  {
    id: 'gem-6',
    name: 'Khotachiwadi Heritage Artisan Village',
    cityId: 4,
    cityName: 'Mumbai',
    category: 'Living Culture & Architecture',
    distanceFromCenterKm: 4,
    tag: '19th Century Wooden Cottages',
    shortDesc: 'A charming 180-year-old Portuguese-Goan precinct hidden in the heart of South Mumbai.',
    fullDesc: 'Featuring narrow quiet lanes, colourful two-storey wooden verandahs, vintage street lamps, and home studios of legendary indigenous fashion and textile artisans.',
    bestTime: '10:00 AM - 4:00 PM',
    estimatedCostInr: 100,
    decongestionFactor: 'High (Quiet residential heritage haven)',
    imageUrl: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800&q=80',
    verified: true,
    sustainabilityImpact: 'Directly helps preserve endangered Mumbai wooden vernacular architecture from high-rise demolition.',
    nearbyStay: 'Abode Bombay Heritage Boutique',
    nearbyFood: 'Traditional East Indian Chonak Curry & Focaccia',
    latitude: 18.9565,
    longitude: 72.8228,
  },
  {
    id: 'gem-7',
    name: 'Divar Island & Chorão Mangrove Sanctuary',
    cityId: 7,
    cityName: 'Goa',
    category: 'Island Ecology & Heritage',
    distanceFromCenterKm: 12,
    tag: 'River Island Village Escape',
    shortDesc: 'An untouched island accessible only by government river ferry, with vintage Portuguese mansions and paddy fields.',
    fullDesc: 'Stepping onto Divar Island feels like traveling 100 years back in time. Cycle through quiet bougainvillea-lined pathways, ancient hilltop churches, and migratory bird wetlands.',
    bestTime: '7:00 AM - 11:00 AM or 4:00 PM - 7:00 PM',
    estimatedCostInr: 150,
    decongestionFactor: 'Extreme (Zero commercial crowds)',
    imageUrl: 'https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?w=800&q=80',
    verified: true,
    sustainabilityImpact: '100% community-based ecotourism preserving Mandovi River mangrove biodiversity.',
    nearbyStay: 'Casa Divar Boutique Homestay',
    nearbyFood: 'Island Tavern Fresh Prawn Balchão & Poi',
    latitude: 15.5186,
    longitude: 73.9168,
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
    imageUrl: 'https://images.unsplash.com/photo-1600100397608-f010f443a9fb?w=800&q=80',
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
    included: ['Recipe booklet', 'Spices tasting', '4-Course Courtyard Thali dinner', 'Heritage kitchen tour'],
    sustainabilityBadge: '100% Locally Sourced Organic Spices',
    imageUrl: 'https://images.unsplash.com/photo-1588096344356-9b552697ff97?w=800&q=80',
  },
  {
    id: 'exp-3',
    title: 'Pietra Dura Marble Inlay Master Craftsman Experience',
    cityId: 2,
    cityName: 'Agra',
    category: 'Heritage Craft',
    durationHours: 2.5,
    priceInr: 850,
    rating: 4.8,
    reviewsCount: 156,
    host: 'Ustad Irfan (Direct descendant of Taj Mahal craftsmen)',
    verified: true,
    shortDesc: 'Learn the rare 400-year-old Mughal art of cutting and embedding lapis lazuli and jasper into white makrana marble.',
    included: ['Custom inlaid marble coaster artifact', 'Master artisan storytelling', 'Raw gemstone identification guide'],
    sustainabilityBadge: 'Preserving Endangered UNESCO Craft',
    imageUrl: 'https://images.unsplash.com/photo-1608958435020-e8a7109ba809?w=800&q=80',
  },
  {
    id: 'exp-4',
    title: 'Old Delhi Midnight Culinary & Sufi Heritage Walk',
    cityId: 3,
    cityName: 'Delhi',
    category: 'Food & History',
    durationHours: 4.0,
    priceInr: 1600,
    rating: 4.9,
    reviewsCount: 210,
    host: 'Delhi Karavan Cultural Explorers',
    verified: true,
    shortDesc: 'Wander illuminated medieval alleyways of Chandni Chowk, sampling 10 legendary street eats and Sufi qawwali.',
    included: ['10+ Verified historic food tastings', 'Cycle rickshaw transit', 'Licensed government heritage historian', 'Purified water & hygiene kit'],
    sustainabilityBadge: 'Supports 8 Century-Old Micro-Vendors',
    imageUrl: 'https://images.unsplash.com/photo-1567157577867-05ccb1388e66?w=800&q=80',
  },
  {
    id: 'exp-5',
    title: 'Dharavi Micro-Enterprise & Master Pottery Trail',
    cityId: 4,
    cityName: 'Mumbai',
    category: 'Culture & Community',
    durationHours: 3.0,
    priceInr: 950,
    rating: 4.9,
    reviewsCount: 340,
    host: 'Kumbharwada Community Guides',
    verified: true,
    shortDesc: 'An inspiring ethical exploration of Mumbai’s entrepreneurial heart: terracotta pottery kilns, leather workshops, and recycling ingenuity.',
    included: ['Dignified ethical guide from the community', 'Pottery wheel session', '80% of tour fee donated to community schooling'],
    sustainabilityBadge: 'Responsible Community-Owned Tourism',
    imageUrl: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=800&q=80',
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
    imageUrl: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800&q=80',
  }
];

// ============================================================================
// LOCAL TOURISM MARKETPLACE ("Support Local"): SIH Core Value
// ============================================================================
export const LOCAL_BUSINESSES_DATA = [
  {
    id: 'biz-1',
    name: 'Kalyan Heritage Homestay & Haveli',
    category: 'Homestay',
    cityId: 1,
    cityName: 'Jaipur',
    ownerName: 'Manoj & Meenakshi Shekhawat',
    experienceYears: 14,
    rating: 4.9,
    reviewsCount: 182,
    startingPriceInr: 2200,
    priceUnit: 'per night',
    address: '59 Hathroi Fort, Ajmer Road, Jaipur',
    phone: '+91 98290 14829',
    verifiedStatus: 'Government Verified Homestay',
    description: 'A warm multi-generational family haveli with hand-painted fresco walls, homemade organic breakfast, and rooftop fort views.',
    tags: ['Family Run', 'Eco Homestay', 'Free High-Speed WiFi', 'Home Cooked Meals'],
    imageUrl: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800&q=80',
    verifiedBadge: true,
  },
  {
    id: 'biz-2',
    name: 'Heritage Explorer: Mahendra Singh (Govt Licensed Guide)',
    category: 'Guide',
    cityId: 1,
    cityName: 'Jaipur',
    ownerName: 'Mahendra Singh (Ministry of Tourism ID: 4128)',
    experienceYears: 18,
    rating: 5.0,
    reviewsCount: 290,
    startingPriceInr: 1800,
    priceUnit: 'per full day',
    address: 'Johari Bazaar Heritage Hub, Jaipur',
    phone: '+91 94140 52319',
    verifiedStatus: 'Ministry of Tourism Certified Guide',
    description: 'Expert historian and architectural guide specializing in Rajput astronomical instruments, Amber Fort military tactics, and secret photography angles.',
    tags: ['Fluent in English & Hindi', 'Historical Architecture Specialist', 'Licensed & Certified'],
    imageUrl: 'https://images.unsplash.com/photo-1532375810709-75b1da00537c?w=800&q=80',
    verifiedBadge: true,
  },
  {
    id: 'biz-3',
    name: 'Yamuna Eco-Cabs & Green Drivers Cooperative',
    category: 'Driver',
    cityId: 2,
    cityName: 'Agra',
    ownerName: 'Devendra Kumar (Driver Union Lead)',
    experienceYears: 12,
    rating: 4.8,
    reviewsCount: 165,
    startingPriceInr: 1400,
    priceUnit: 'per 8hr city tour',
    address: 'Agra Cantt Railway Station Stand, Agra',
    phone: '+91 97580 32188',
    verifiedStatus: 'Clean Fleet Verified Driver',
    description: 'Reliable CNG and electric air-conditioned fleet covering Taj Mahal, Fatehpur Sikri, and Bateshwar with polite, background-verified local drivers.',
    tags: ['CNG Eco-Vehicle', 'No Hidden Commissions', 'Fixed Govt Rates'],
    imageUrl: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=800&q=80',
    verifiedBadge: true,
  },
  {
    id: 'biz-4',
    name: 'Zari-Zardozi & Silver Thread Artisan Guild',
    category: 'Handicrafts',
    cityId: 2,
    cityName: 'Agra',
    ownerName: 'Begum Naseem Akhtar',
    experienceYears: 25,
    rating: 4.9,
    reviewsCount: 114,
    startingPriceInr: 650,
    priceUnit: 'per handcrafted piece',
    address: 'Near Jama Masjid, Kinari Bazaar, Agra',
    phone: '+91 98370 66142',
    verifiedStatus: 'ODOP UP Govt Recognized Artisan',
    description: 'Empowering 40 local women artisans weaving traditional Mughal metallic thread embroidery into clutches, wall tapestries, and silk stoles.',
    tags: ['Women-Led Cooperative', 'Fair Trade Certified', 'Custom Tailoring'],
    imageUrl: 'https://images.unsplash.com/photo-1598890777032-bde835ba27c2?w=800&q=80',
    verifiedBadge: true,
  },
  {
    id: 'biz-5',
    name: 'Purani Dilli Dastarkhwan Heritage Food Trails',
    category: 'Restaurant',
    cityId: 3,
    cityName: 'Delhi',
    ownerName: 'Haji Mohammad Rizwan',
    experienceYears: 32,
    rating: 4.8,
    reviewsCount: 420,
    startingPriceInr: 500,
    priceUnit: 'meal for two',
    address: 'Matia Mahal, Opp Gate 1 Jama Masjid, Delhi',
    phone: '+91 98110 44291',
    verifiedStatus: 'FSSAI Grade-A Certified',
    description: 'Slow-cooked authentic Nihari, sheermal, seekh kebabs, and shahi tukda prepared from generational recipes dating back to the late Mughal court.',
    tags: ['Authentic Recipe', 'Pure Ghee Preparation', 'Historic Kitchen'],
    imageUrl: 'https://images.unsplash.com/photo-1588096344356-9b552697ff97?w=800&q=80',
    verifiedBadge: true,
  },
  {
    id: 'biz-6',
    name: 'Fontainhas Heritage Quarters Walking Tours',
    category: 'Local Tours',
    cityId: 7,
    cityName: 'Goa',
    ownerName: 'Maria D’Souza & Carlos Fernandes',
    experienceYears: 9,
    rating: 5.0,
    reviewsCount: 275,
    startingPriceInr: 750,
    priceUnit: 'per person',
    address: '31st January Road, Fontainhas, Panaji, Goa',
    phone: '+91 98221 73299',
    verifiedStatus: 'Goa Tourism Guild Certified',
    description: 'Intimate walking tour through bright yellow and indigo heritage villas, tile painting ateliers, century-old bakeries, and traditional fado musicians.',
    tags: ['Heritage Walk', 'Tea & Pastel de Nata Included', 'Small Groups Max 10'],
    imageUrl: 'https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?w=800&q=80',
    verifiedBadge: true,
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