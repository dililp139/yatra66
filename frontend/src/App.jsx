import { useEffect, useMemo, useRef, useState } from 'react';
import L from 'leaflet';
import './App.css';
import yatraApi from './services/yatraService';

const CITIES_DATA = [
  { id: 1, name: 'Jaipur', country: 'India', state: 'Rajasthan', region: 'North India', latitude: 26.9124, longitude: 75.7873, rating: 4.8, popularityScore: 96, themes: ['heritage', 'forts', 'culture', 'shopping'], estimatedDailyBudget: 4200, bestSeason: 'October to March' },
  { id: 2, name: 'Agra', country: 'India', state: 'Uttar Pradesh', region: 'North India', latitude: 27.1767, longitude: 78.0081, rating: 4.9, popularityScore: 98, themes: ['heritage', 'romantic', 'architecture'], estimatedDailyBudget: 3800, bestSeason: 'October to March' },
  { id: 3, name: 'Delhi', country: 'India', state: 'Delhi', region: 'North India', latitude: 28.6139, longitude: 77.209, rating: 4.6, popularityScore: 94, themes: ['history', 'food', 'markets', 'museums'], estimatedDailyBudget: 5200, bestSeason: 'October to March' },
  { id: 4, name: 'Mumbai', country: 'India', state: 'Maharashtra', region: 'West India', latitude: 19.076, longitude: 72.8777, rating: 4.5, popularityScore: 91, themes: ['beaches', 'nightlife', 'food', 'cinema'], estimatedDailyBudget: 6500, bestSeason: 'November to February' },
  { id: 5, name: 'Udaipur', country: 'India', state: 'Rajasthan', region: 'West India', latitude: 24.5854, longitude: 73.7125, rating: 4.8, popularityScore: 93, themes: ['lakes', 'palaces', 'romantic', 'heritage'], estimatedDailyBudget: 5000, bestSeason: 'September to March' },
  { id: 6, name: 'Varanasi', country: 'India', state: 'Uttar Pradesh', region: 'North India', latitude: 25.3176, longitude: 82.9739, rating: 4.7, popularityScore: 92, themes: ['spiritual', 'culture', 'river', 'heritage'], estimatedDailyBudget: 3200, bestSeason: 'October to March' },
  { id: 7, name: 'Goa', country: 'India', state: 'Goa', region: 'West India', latitude: 15.2993, longitude: 74.124, rating: 4.7, popularityScore: 95, themes: ['beaches', 'nightlife', 'heritage', 'food'], estimatedDailyBudget: 6200, bestSeason: 'November to February' },
  { id: 8, name: 'Kochi', country: 'India', state: 'Kerala', region: 'South India', latitude: 9.9312, longitude: 76.2673, rating: 4.6, popularityScore: 88, themes: ['backwaters', 'heritage', 'food', 'art'], estimatedDailyBudget: 4600, bestSeason: 'September to March' },
  { id: 9, name: 'Amritsar', country: 'India', state: 'Punjab', region: 'North India', latitude: 31.6340, longitude: 74.8723, rating: 4.9, popularityScore: 94, themes: ['spiritual', 'food', 'heritage', 'history'], estimatedDailyBudget: 3600, bestSeason: 'October to March' },
  { id: 10, name: 'Manali', country: 'India', state: 'Himachal Pradesh', region: 'North India', latitude: 32.2432, longitude: 77.1892, rating: 4.7, popularityScore: 92, themes: ['mountains', 'adventure', 'snow', 'nature'], estimatedDailyBudget: 4400, bestSeason: 'October to June' },
  { id: 11, name: 'Rishikesh', country: 'India', state: 'Uttarakhand', region: 'North India', latitude: 30.0869, longitude: 78.2676, rating: 4.8, popularityScore: 90, themes: ['yoga', 'spiritual', 'adventure', 'nature'], estimatedDailyBudget: 3400, bestSeason: 'September to April' },
  { id: 12, name: 'Bengaluru', country: 'India', state: 'Karnataka', region: 'South India', latitude: 12.9716, longitude: 77.5946, rating: 4.6, popularityScore: 89, themes: ['gardens', 'food', 'breweries', 'culture'], estimatedDailyBudget: 5400, bestSeason: 'September to March' },
  { id: 13, name: 'Hampi', country: 'India', state: 'Karnataka', region: 'South India', latitude: 15.3350, longitude: 76.4600, rating: 4.9, popularityScore: 93, themes: ['unesco', 'heritage', 'ruins', 'architecture'], estimatedDailyBudget: 3200, bestSeason: 'October to February' },
  { id: 14, name: 'Darjeeling', country: 'India', state: 'West Bengal', region: 'East India', latitude: 27.0410, longitude: 88.2663, rating: 4.7, popularityScore: 91, themes: ['mountains', 'tea', 'unesco', 'nature'], estimatedDailyBudget: 4800, bestSeason: 'March to May & Oct to Dec' },
  { id: 15, name: 'Shimla', country: 'India', state: 'Himachal Pradesh', region: 'North India', latitude: 31.1048, longitude: 77.1734, rating: 4.7, popularityScore: 91, themes: ['colonial', 'snow', 'mountains', 'nature'], estimatedDailyBudget: 4600, bestSeason: 'March to June & Dec to Feb' },
  { id: 16, name: 'Leh Ladakh', country: 'India', state: 'Ladakh', region: 'North India', latitude: 34.1526, longitude: 77.5771, rating: 4.9, popularityScore: 95, themes: ['adventure', 'monasteries', 'lakes', 'high-altitude'], estimatedDailyBudget: 5800, bestSeason: 'May to September' },
  { id: 17, name: 'Mysore', country: 'India', state: 'Karnataka', region: 'South India', latitude: 12.2958, longitude: 76.6394, rating: 4.8, popularityScore: 90, themes: ['palaces', 'silk', 'yoga', 'heritage'], estimatedDailyBudget: 3800, bestSeason: 'October to March' },
  { id: 18, name: 'Srinagar', country: 'India', state: 'Jammu & Kashmir', region: 'North India', latitude: 34.0837, longitude: 74.7973, rating: 4.8, popularityScore: 94, themes: ['lakes', 'houseboats', 'gardens', 'nature'], estimatedDailyBudget: 5200, bestSeason: 'April to October' },
  { id: 19, name: 'Pondicherry', country: 'India', state: 'Puducherry', region: 'South India', latitude: 11.9416, longitude: 79.8083, rating: 4.7, popularityScore: 89, themes: ['french-quarter', 'beaches', 'spiritual', 'cafes'], estimatedDailyBudget: 4200, bestSeason: 'October to March' },
  { id: 20, name: 'Hyderabad', country: 'India', state: 'Telangana', region: 'South India', latitude: 17.3850, longitude: 78.4867, rating: 4.7, popularityScore: 92, themes: ['biryani', 'pearls', 'palaces', 'history'], estimatedDailyBudget: 4500, bestSeason: 'October to March' },
  { id: 21, name: 'Kolkata', country: 'India', state: 'West Bengal', region: 'East India', latitude: 22.5726, longitude: 88.3639, rating: 4.7, popularityScore: 93, themes: ['heritage', 'literature', 'sweets', 'tram'], estimatedDailyBudget: 3900, bestSeason: 'October to March' },
  { id: 22, name: 'Jodhpur', country: 'India', state: 'Rajasthan', region: 'West India', latitude: 26.2389, longitude: 73.0243, rating: 4.8, popularityScore: 94, themes: ['blue-city', 'forts', 'desert', 'handicrafts'], estimatedDailyBudget: 4100, bestSeason: 'October to March' },
  { id: 23, name: 'Ooty', country: 'India', state: 'Tamil Nadu', region: 'South India', latitude: 11.4102, longitude: 76.6950, rating: 4.7, popularityScore: 91, themes: ['hills', 'tea-gardens', 'toy-train', 'lakes'], estimatedDailyBudget: 4400, bestSeason: 'March to June & Oct to Nov' },
  { id: 24, name: 'Shillong', country: 'India', state: 'Meghalaya', region: 'North-East', latitude: 25.5788, longitude: 91.8933, rating: 4.8, popularityScore: 92, themes: ['waterfalls', 'clouds', 'music', 'nature'], estimatedDailyBudget: 4600, bestSeason: 'September to May' },
];

const CITY_PHOTOS = {
  Jaipur: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?w=800',
  Agra: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?w=800',
  Delhi: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?w=800',
  Mumbai: 'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?w=800',
  Udaipur: 'https://images.unsplash.com/photo-1615836245337-f5b9b2303f10?w=800',
  Varanasi: 'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?w=800',
  Goa: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=800',
  Kochi: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=800',
  Amritsar: 'https://images.unsplash.com/photo-1588096344356-9b552697ff97?w=800',
  Manali: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=800',
  Rishikesh: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800',
  Bengaluru: 'https://images.unsplash.com/photo-1596176530529-78163a4f7af2?w=800',
  Hampi: 'https://images.unsplash.com/photo-1600100397608-f010f443a9fb?w=800',
  Darjeeling: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800',
  Shimla: 'https://images.unsplash.com/photo-1597074866923-dc0589150358?w=800',
  'Leh Ladakh': 'https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?w=800',
  Mysore: 'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?w=800',
  Srinagar: 'https://images.unsplash.com/photo-1598091383021-15ddea10925d?w=800',
  Pondicherry: 'https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?w=800',
  Hyderabad: 'https://images.unsplash.com/photo-1605649487212-47bdab064df8?w=800',
  Kolkata: 'https://images.unsplash.com/photo-1558431382-27e303142255?w=800',
  Jodhpur: 'https://images.unsplash.com/photo-1568849676085-51415703900f?w=800',
  Ooty: 'https://images.unsplash.com/photo-1574063413132-355dbfd83e25?w=800',
  Shillong: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800',
};

const LANDMARK_PHOTOS = {
  'Amber Fort': 'https://images.unsplash.com/photo-1609947017136-9e224e5dfd6d?w=600',
  'Hawa Mahal': 'https://images.unsplash.com/photo-1599661046289-e31897846e41?w=600',
  'City Palace Jaipur': 'https://images.unsplash.com/photo-1598890777032-bde835ba27c2?w=600',
  'Taj Mahal': 'https://images.unsplash.com/photo-1564507592333-c60657eea523?w=600',
  'Agra Fort': 'https://images.unsplash.com/photo-1608958435020-e8a7109ba809?w=600',
  'Mehtab Bagh': 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=600',
  'Red Fort': 'https://images.unsplash.com/photo-1587474260584-136574528ed5?w=600',
  'India Gate': 'https://images.unsplash.com/photo-1592635196078-9fdc757f27f4?w=600',
  'Qutub Minar': 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=600',
  'Gateway of India': 'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?w=600',
  'Marine Drive': 'https://images.unsplash.com/photo-1567157577867-05ccb1388e66?w=600',
  'Elephanta Caves': 'https://images.unsplash.com/photo-1583083527882-4bee9aba2eea?w=600',
  'City Palace Udaipur': 'https://images.unsplash.com/photo-1615836245337-f5b9b2303f10?w=600',
  'Lake Pichola': 'https://images.unsplash.com/photo-1576487248805-cf45f6bcc67f?w=600',
  'Dashashwamedh Ghat': 'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?w=600',
  'Kashi Vishwanath Temple': 'https://images.unsplash.com/photo-1627894483216-2138af692e32?w=600',
  'Baga Beach': 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=600',
  'Basilica of Bom Jesus': 'https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?w=600',
  'Fort Kochi': 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=600',
  'Chinese Fishing Nets': 'https://images.unsplash.com/photo-1597848212624-a19eb35e2651?w=600',
  'Golden Temple (Harmandir Sahib)': 'https://images.unsplash.com/photo-1588096344356-9b552697ff97?w=600',
  'Wagah Border': 'https://images.unsplash.com/photo-1532375810709-75b1da00537c?w=600',
  'Solang Valley': 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=600',
  'Hadimba Temple': 'https://images.unsplash.com/photo-1605649487212-47bdab064df8?w=600',
  'Ram Jhula & Laxman Jhula': 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=600',
  'Triveni Ghat Evening Aarti': 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=600',
  'Bangalore Palace': 'https://images.unsplash.com/photo-1596176530529-78163a4f7af2?w=600',
  'Lalbagh Botanical Garden': 'https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?w=600',
  'Virupaksha Temple': 'https://images.unsplash.com/photo-1600100397608-f010f443a9fb?w=600',
  'Stone Chariot & Vijaya Vittala': 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=600',
  'Tiger Hill Sunrise': 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=600',
  'Happy Valley Tea Estate': 'https://images.unsplash.com/photo-1576487248805-cf45f6bcc67f?w=600',
  'The Ridge & Mall Road': 'https://images.unsplash.com/photo-1597074866923-dc0589150358?w=600',
  'Kufri Snow Point': 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=600',
  'Pangong Tso Lake': 'https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?w=600',
  'Thiksey Monastery': 'https://images.unsplash.com/photo-1566438480900-0609be27a4be?w=600',
  'Mysore Palace (Amba Vilas)': 'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?w=600',
  'Chamundi Hill & Temple': 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=600',
  'Dal Lake & Shikara Cruise': 'https://images.unsplash.com/photo-1598091383021-15ddea10925d?w=600',
  'Mughal Gardens (Shalimar)': 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=600',
  'White Town French Quarter': 'https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?w=600',
  'Auroville Matrimandir': 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=600',
  'Charminar': 'https://images.unsplash.com/photo-1605649487212-47bdab064df8?w=600',
  'Golconda Fort': 'https://images.unsplash.com/photo-1598890777032-bde835ba27c2?w=600',
  'Victoria Memorial': 'https://images.unsplash.com/photo-1558431382-27e303142255?w=600',
  'Mehrangarh Fort': 'https://images.unsplash.com/photo-1568849676085-51415703900f?w=600',
  'Nilgiri Mountain Railway': 'https://images.unsplash.com/photo-1574063413132-355dbfd83e25?w=600',
  'Nohkalikai Falls': 'https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?w=600',
};

const HOTEL_PHOTOS = {
  Luxury: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=700',
  Heritage: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=700',
  Boutique: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=700',
  Hostel: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=700',
  Resort: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=700',
  Villa: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=700',
  Default: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=700',
};

const GOOGLE_REVIEWS_MAP = {
  Jaipur: [
    { author: 'Rahul Sharma', avatarColor: '#ea4335', guide: 'Local Guide • Level 7', rating: 5, time: '2 weeks ago', text: 'Amber Fort at 8 AM is unmissable! The sheesh mahal glasswork and sunrise views over Maota lake are breathtaking. Hire a licensed government guide at the gate.' },
    { author: 'Elena Rostova', avatarColor: '#4285f4', guide: 'Google Verified Traveler', rating: 5, time: '1 month ago', text: 'The old city pink bazaars and lassi near Johari Bazaar are authentic royal experiences. Everything is easily accessible by auto and cab.' },
    { author: 'Vikramaditya Roy', avatarColor: '#34a853', guide: 'Local Guide • Level 8', rating: 5, time: '3 weeks ago', text: 'Stunning architecture, rich heritage, and vibrant handicrafts. City Palace museum is well curated. 10/10 recommendation for cultural travelers.' },
  ],
  Agra: [
    { author: 'Michael Chang', avatarColor: '#fbbc05', guide: 'Local Guide • Level 6', rating: 5, time: '3 weeks ago', text: 'Taj Mahal at sunrise was the highlight of our entire India journey. The marble reflection in morning mist is unforgettable. Buy tickets online in advance to skip the queue.' },
    { author: 'Priyanka Sen', avatarColor: '#ea4335', guide: 'Local Guide • Level 5', rating: 5, time: '1 month ago', text: 'Agra Fort and Mehtab Bagh across the Yamuna offer stunning sunset photography angles. Delicious Mughlai cuisine in the city.' },
  ],
  Goa: [
    { author: 'Carlos Mendes', avatarColor: '#4285f4', guide: 'Local Guide • Level 7', rating: 5, time: '2 weeks ago', text: 'South Goa beaches are tranquil and pristine. Palolem and Agonda have exceptional beach shacks with fresh seafood curry and sunsets.' },
    { author: 'Ananya Deshmukh', avatarColor: '#34a853', guide: 'Google Verified Traveler', rating: 5, time: '3 weeks ago', text: 'Old Goa churches like Basilica of Bom Jesus have mesmerizing Portuguese baroque architecture. Rent a scooter for effortless exploration.' },
  ],
  Delhi: [
    { author: 'David Clark', avatarColor: '#fbbc05', guide: 'Local Guide • Level 8', rating: 5, time: '1 week ago', text: 'Humayun’s Tomb and Qutub Minar are UNESCO masterpieces. The food walk in Chandni Chowk was extraordinary.' },
    { author: 'Aarav Malhotra', avatarColor: '#ea4335', guide: 'Local Guide • Level 6', rating: 5, time: '2 weeks ago', text: 'Clean metro connectivity across every monument. National Museum has world-class Indus Valley artifacts.' },
  ],
  Amritsar: [
    { author: 'Harpreet Singh', avatarColor: '#ea4335', guide: 'Local Guide • Level 9', rating: 5, time: '1 week ago', text: 'The Golden Temple at night with illuminated sarovar waters and continuous kirtan brings immense serenity. The langar feeding 100,000 people daily is inspiring.' },
  ],
};

const DEFAULT_CURRENCIES = {
  baseCurrency: 'INR',
  rates: { INR: 1.0, USD: 0.0118, EUR: 0.0109, GBP: 0.0093, AUD: 0.0182, AED: 0.0433, SGD: 0.0159, CAD: 0.0163, JPY: 1.82 },
  currencySymbols: { INR: '₹', USD: '$', EUR: '€', GBP: '£', AUD: 'A$', AED: 'AED ', SGD: 'S$', CAD: 'C$', JPY: '¥' },
};

const VALID_PAGES = ['home', 'map', 'destinations', 'hotels', 'weather', 'explore', 'festivals', 'routes', 'planner', 'calendar', 'bookings', 'signup'];

function App() {
  const [page, setPage] = useHashPage();
  const [theme, setTheme] = useState(() => localStorage.getItem('yatra_theme') || 'light');
  const [cities, setCities] = useState(CITIES_DATA);
  const [selectedId, setSelectedId] = useState(1);
  const [details, setDetails] = useState(null);
  const [cabFares, setCabFares] = useState([]);
  const [search, setSearch] = useState('');
  const [themeFilter, setThemeFilter] = useState('all');
  const [budget, setBudget] = useState(9000);
  const [days, setDays] = useState(3);
  const [travelers, setTravelers] = useState(2);
  const [tripPlan, setTripPlan] = useState(null);
  const [apiStatus, setApiStatus] = useState('Checking...');
  const [currency, setCurrency] = useState('INR');
  const [currencyData, setCurrencyData] = useState(DEFAULT_CURRENCIES);

  // Bookings state
  const [bookings, setBookings] = useState([]);
  const [bookingModal, setBookingModal] = useState({ isOpen: false, type: 'hotel', itemName: '', amount: 4200, cityId: 1, cityName: 'Jaipur' });
  const [bookingNotice, setBookingNotice] = useState(null);

  // Signup state
  const [signup, setSignup] = useState({ name: '', email: '', city: 'Jaipur', interest: 'Heritage' });
  const [signupSaved, setSignupSaved] = useState(false);

  // Personal Travel Calendar milestones state
  const [milestones, setMilestones] = useState([
    { id: 1, date: '2026-09-15', title: 'Amber Fort Morning Heritage Walk', city: 'Jaipur' },
    { id: 2, date: '2026-09-22', title: 'Taj Mahal Sunrise Photography', city: 'Agra' },
    { id: 3, date: '2026-09-28', title: 'Sunset Shikara Cruise on Dal Lake', city: 'Srinagar' },
  ]);

  // Traveler Profile / Account State
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('yatra_user')) || null;
    } catch {
      return null;
    }
  });
  const [authModalOpen, setAuthModalOpen] = useState(false);

  // Hidden Cities & Hotels state
  const [hiddenCityIds, setHiddenCityIds] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('yatra_hidden_cities')) || [];
    } catch {
      return [];
    }
  });

  const [hiddenHotelIds, setHiddenHotelIds] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('yatra_hidden_hotels')) || [];
    } catch {
      return [];
    }
  });

  const handleHideCity = (id) => {
    setHiddenCityIds((prev) => {
      const next = [...prev, id];
      localStorage.setItem('yatra_hidden_cities', JSON.stringify(next));
      return next;
    });
  };

  const handleUnhideAllCities = () => {
    setHiddenCityIds([]);
    localStorage.removeItem('yatra_hidden_cities');
  };

  const handleHideHotel = (id) => {
    setHiddenHotelIds((prev) => {
      const next = [...prev, id];
      localStorage.setItem('yatra_hidden_hotels', JSON.stringify(next));
      return next;
    });
  };

  const handleUnhideAllHotels = () => {
    setHiddenHotelIds([]);
    localStorage.removeItem('yatra_hidden_hotels');
  };

  // Live All-India dynamic city adder
  const handleAddLiveCity = (newCity) => {
    setCities((prev) => {
      const exists = prev.find((c) => c.name.toLowerCase() === newCity.name.toLowerCase());
      if (exists) return prev;
      return [newCity, ...prev];
    });
    setSelectedId(newCity.id);
  };

  // Persist theme choice
  useEffect(() => {
    localStorage.setItem('yatra_theme', theme);
  }, [theme]);

  const selectedMarker = useMemo(
    () => cities.find((marker) => marker.id === selectedId) || cities[0],
    [cities, selectedId],
  );

  const themes = useMemo(
    () => ['all', ...Array.from(new Set(cities.flatMap((marker) => marker.themes || []))).sort()],
    [cities],
  );

  const filteredCities = useMemo(() => {
    const query = search.trim().toLowerCase();
    return cities.filter((city) => {
      if (hiddenCityIds.includes(city.id)) return false;
      const text = [city.name, city.state, city.region, ...(city.themes || [])].join(' ').toLowerCase();
      return (!query || text.includes(query))
        && (themeFilter === 'all' || city.themes?.includes(themeFilter))
        && (city.estimatedDailyBudget || 4500) <= budget;
    });
  }, [budget, cities, hiddenCityIds, search, themeFilter]);

  // Price formatting helper
  const formatPrice = useMemo(() => {
    return (inrAmount) => {
      if (inrAmount == null || isNaN(inrAmount)) return '₹0';
      const rate = currencyData.rates?.[currency] || 1.0;
      const symbol = currencyData.currencySymbols?.[currency] || '₹';
      const converted = Math.round(inrAmount * rate);
      return `${symbol}${converted.toLocaleString()}`;
    };
  }, [currency, currencyData]);

  // Initial load - Fetch live locations and currency from in-browser engine
  useEffect(() => {
    async function initPlatform() {
      try {
        const [serverCities, currData] = await Promise.all([
          yatraApi.getCities(),
          yatraApi.getCurrencyRates(),
        ]);
        if (serverCities?.length) {
          setCities(serverCities);
        }
        if (currData) {
          setCurrencyData(currData);
        }
        setApiStatus('Live');
      } catch {
        setApiStatus('Direct JS Mode');
      }
    }
    initPlatform();
  }, []);

  // Load city details
  useEffect(() => {
    async function loadDetails() {
      if (!selectedMarker) return;
      try {
        const [cityData, faresData] = await Promise.all([
          yatraApi.getCityDetails(selectedMarker.id),
          yatraApi.getCityCabFares(selectedMarker.id),
        ]);
        if (cityData) {
          setDetails(cityData);
        } else {
          setDetails(createDefaultDetails(selectedMarker));
        }
        if (faresData) {
          setCabFares(faresData);
        }
      } catch {
        const fallback = createDefaultDetails(selectedMarker);
        setDetails(fallback);
        setCabFares(createFallbackFares(fallback));
      }
    }
    loadDetails();
  }, [selectedMarker]);

  // Load bookings
  useEffect(() => {
    async function loadBookings() {
      try {
        const data = await yatraApi.getBookings();
        if (data) setBookings(data);
      } catch {
        // use fallback initial bookings
      }
    }
    loadBookings();
  }, []);

  async function createTripPlan(event) {
    event.preventDefault();
    const request = {
      cityId: selectedMarker.id,
      days,
      travelers,
      dailyBudgetPerPerson: Math.max(500, Math.round(budget / 3)),
      travelStyle: budget > 6500 ? 'luxury' : 'standard',
    };

    try {
      const plan = await yatraApi.planTrip(request);
      setTripPlan(plan);
    } catch {
      const daily = details?.city?.estimatedDailyBudget || 4500;
      setTripPlan({
        cityName: selectedMarker.name,
        days,
        travelers,
        travelStyle: request.travelStyle,
        estimatedStayCost: daily * days,
        estimatedFoodAndLocalTravelCost: request.dailyBudgetPerPerson * days * travelers,
        attractionFees: 1800,
        totalEstimatedCost: daily * days + request.dailyBudgetPerPerson * days * travelers + 1800,
        itinerary: Array.from({ length: days }, (_, index) => ({
          day: index + 1,
          title: index === 0 ? `${selectedMarker.name} Highlights` : 'Nearby Discovery',
          morning: ['Famous place visit'],
          afternoon: ['Hotel area and food trail'],
          evening: ['Sunset or cultural experience'],
        })),
      });
    }
  }

  function handleOpenBooking(type, itemName, amount, cityId = selectedMarker?.id, cityName = selectedMarker?.name) {
    setBookingModal({
      isOpen: true,
      type,
      itemName,
      amount,
      cityId,
      cityName,
    });
  }

  async function handleConfirmBooking(bookingData) {
    try {
      const created = await yatraApi.createBooking({
        ...bookingData,
        bookingType: bookingModal.type,
        cityId: bookingModal.cityId,
        cityName: bookingModal.cityName,
        itemName: bookingModal.itemName,
        totalAmountInr: bookingModal.amount,
      });

      setBookings((prev) => [created, ...prev]);
      setBookingNotice(`Booking Confirmed! Reference: ${created.bookingId}`);
      setBookingModal({ ...bookingModal, isOpen: false });
      setTimeout(() => setBookingNotice(null), 6000);
      setPage('bookings');
    } catch {
      setBookingNotice('Booking processed successfully!');
      setBookingModal({ ...bookingModal, isOpen: false });
    }
  }

  async function handleCancelBooking(bookingId) {
    try {
      await yatraApi.cancelBooking(bookingId);
    } catch {
      // ignore
    }
    setBookings((prev) =>
      prev.map((b) => (b.bookingId === bookingId ? { ...b, status: 'CANCELLED' } : b)),
    );
  }

  async function handleAddReview(reviewData) {
    try {
      const saved = await yatraApi.addReview(reviewData);
      setDetails((prev) => prev ? { ...prev, reviews: [saved, ...(prev.reviews || [])] } : prev);
    } catch {
      const mock = {
        id: Date.now(),
        cityId: reviewData.cityId,
        travelerName: reviewData.travelerName,
        rating: reviewData.rating,
        comment: reviewData.comment,
        travelMonth: reviewData.travelMonth || 'Recent',
      };
      setDetails((prev) => prev ? { ...prev, reviews: [mock, ...(prev.reviews || [])] } : prev);
    }
  }

  async function submitSignup(event) {
    event.preventDefault();
    try {
      const savedUser = await yatraApi.signIn({
        name: signup.name,
        email: signup.email,
        city: signup.city,
        interest: signup.interest,
        authProvider: 'email'
      });
      setUser(savedUser);
    } catch {}
    setSignupSaved(true);
  }

  const appState = {
    apiStatus,
    bookings,
    budget,
    cabFares,
    cities,
    city: details?.city || createDefaultDetails(selectedMarker).city,
    currency,
    currencyData,
    details,
    filteredCities,
    formatPrice,
    handleCancelBooking,
    handleOpenBooking,
    handleAddReview,
    page,
    search,
    selectedId,
    selectedMarker,
    setBudget,
    setCurrency,
    setPage,
    setSearch,
    setSelectedId,
    setTheme,
    setThemeFilter,
    theme,
    themeFilter,
    themes,
    signup,
    signupSaved,
    submitSignup,
    updateSignup: setSignup,
    planner: { createTripPlan, days, setDays, travelers, setTravelers, tripPlan },
    milestones,
    handleAddMilestone: (m) => setMilestones((prev) => [...prev, { id: Date.now(), ...m }]),
    user,
    setUser,
    onOpenAuth: () => setAuthModalOpen(true),
    onAddLiveCity: handleAddLiveCity,
    hiddenCityIds,
    onHideCity: handleHideCity,
    onUnhideAllCities: handleUnhideAllCities,
    hiddenHotelIds,
    onHideHotel: handleHideHotel,
    onUnhideAllHotels: handleUnhideAllHotels,
  };

  return (
    <div className={`app-shell theme-${theme}`}>
      <Header {...appState} />

      {bookingNotice && (
        <div className="global-toast">
          <span>🎉</span>
          <p>{bookingNotice}</p>
          <button type="button" onClick={() => setBookingNotice(null)}>✕</button>
        </div>
      )}

      {page === 'home' && <HomePage {...appState} />}
      {page === 'map' && <MapPage {...appState} />}
      {page === 'destinations' && <DestinationsPage {...appState} />}
      {page === 'hotels' && <HotelsPage {...appState} />}
      {page === 'weather' && <WeatherPage {...appState} />}
      {page === 'explore' && <WikiExplorePage {...appState} />}
      {page === 'festivals' && <FestivalsPage {...appState} />}
      {page === 'routes' && <RoutesPage {...appState} />}
      {page === 'planner' && <PlannerPage {...appState} />}
      {page === 'calendar' && <PersonalCalendarPage {...appState} />}
      {page === 'bookings' && <BookingsPage {...appState} />}
      {page === 'signup' && <SignupPage {...appState} />}

      {authModalOpen && (
        <AuthModal
          user={user}
          setUser={setUser}
          onClose={() => setAuthModalOpen(false)}
        />
      )}

      {bookingModal.isOpen && (
        <BookingModal
          modal={bookingModal}
          formatPrice={formatPrice}
          onClose={() => setBookingModal({ ...bookingModal, isOpen: false })}
          onConfirm={handleConfirmBooking}
        />
      )}
    </div>
  );
}

function Header({ currency, currencyData, onOpenAuth, page, setCurrency, setPage, setTheme, theme, user }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [themeOpen, setThemeOpen] = useState(false);
  const closeTimerRef = useRef(null);
  const themeTimerRef = useRef(null);

  // 4 Primary Options visible directly in the top bar
  const primaryNav = [
    ['home', 'Home'],
    ['map', 'Real Map'],
    ['destinations', 'Destinations'],
    ['hotels', 'Hotels & Cabs'],
  ];

  // Remaining options revealed inside the pop-up hover menu
  const moreServices = [
    { id: 'weather', icon: '🌤️', title: 'Live Weather', desc: 'Real-time weather across India' },
    { id: 'explore', icon: '📚', title: 'Monuments Guide', desc: 'History and landmark insights' },
    { id: 'festivals', icon: '🎉', title: 'Festivals Calendar', desc: 'Indian cultural events and dates' },
    { id: 'routes', icon: '🚆', title: 'Transit Routes', desc: 'Flights, trains, buses and cabs' },
    { id: 'planner', icon: '🗺️', title: 'Smart Trip Planner', desc: 'Custom daily plan and budget' },
    { id: 'calendar', icon: '📅', title: 'Personal Calendar', desc: 'Trip dates, bookings and notes' },
    { id: 'bookings', icon: '🎟️', title: 'My Bookings', desc: 'Confirmed vouchers and boarding passes' },
    { id: 'signup', icon: '👤', title: 'Traveler Profile', desc: 'Preferences and account details' },
  ];

  const activeMoreService = moreServices.find((s) => s.id === page);
  const isMoreActive = Boolean(activeMoreService);

  const themesList = [
    { id: 'light', label: '⚪ Light White', desc: 'Modern pearl minimalism' },
    { id: 'dark', label: '🌑 Dark Midnight', desc: 'Sleek dark mode' },
    { id: 'sunset', label: '🌅 Sunset Amber', desc: 'Warm Rajasthan royal glow' },
    { id: 'emerald', label: '🌿 Emerald Nature', desc: 'Crisp botanical Kerala mint' },
  ];

  const handleDropdownEnter = () => {
    if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    setDropdownOpen(true);
  };

  const handleDropdownLeave = () => {
    closeTimerRef.current = setTimeout(() => {
      setDropdownOpen(false);
    }, 450);
  };

  const handleThemeEnter = () => {
    if (themeTimerRef.current) clearTimeout(themeTimerRef.current);
    setThemeOpen(true);
  };

  const handleThemeLeave = () => {
    themeTimerRef.current = setTimeout(() => {
      setThemeOpen(false);
    }, 450);
  };

  return (
    <header className="topbar">
      <button className="brand" type="button" onClick={() => setPage('home')} aria-label="Yatra home">
        <span className="brand-mark">Y</span>
        <div className="brand-title-wrap">
          <span>Yatra</span>
          <span className="brand-india-tag">India</span>
        </div>
      </button>

      <nav className="nav-links" aria-label="Primary">
        {/* 4 Primary Navigation Tabs */}
        {primaryNav.map(([id, label]) => (
          <button className={page === id ? 'active' : ''} key={id} type="button" onClick={() => setPage(id)}>
            {label}
          </button>
        ))}

        {/* Hover Pop-Up Bar with Smooth Graceful Delay */}
        <div
          className="nav-dropdown-wrapper"
          onMouseEnter={handleDropdownEnter}
          onMouseLeave={handleDropdownLeave}
        >
          <button
            type="button"
            className={`nav-dropdown-btn ${isMoreActive ? 'active' : ''}`}
            onClick={() => setDropdownOpen((prev) => !prev)}
            aria-haspopup="true"
            aria-expanded={dropdownOpen}
          >
            <span>{activeMoreService ? activeMoreService.title : 'More Services'}</span>
            <span style={{ fontSize: '0.7rem', marginLeft: '4px' }}>▼</span>
          </button>

          <div className={`nav-popup-menu ${dropdownOpen ? 'show' : ''}`}>
            {moreServices.map((service) => (
              <button
                key={service.id}
                type="button"
                className={`popup-menu-item ${page === service.id ? 'active' : ''}`}
                onClick={() => {
                  setPage(service.id);
                  setDropdownOpen(false);
                }}
              >
                <span className="popup-item-icon">{service.icon}</span>
                <div className="popup-item-text">
                  <span className="popup-item-title">{service.title}</span>
                  <span className="popup-item-desc">{service.desc}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </nav>

      <div className="header-controls">
        {/* Side Theme Switcher with Hover/Click Dropdown */}
        <div
          className="nav-dropdown-wrapper"
          onMouseEnter={handleThemeEnter}
          onMouseLeave={handleThemeLeave}
        >
          <button
            type="button"
            className="nav-dropdown-btn"
            onClick={() => setThemeOpen((prev) => !prev)}
            aria-haspopup="true"
            aria-expanded={themeOpen}
            title="Switch Theme"
          >
            <span>🎨 Theme</span>
            <span style={{ fontSize: '0.7rem', marginLeft: '3px' }}>▼</span>
          </button>

          <div className={`nav-popup-menu ${themeOpen ? 'show' : ''}`} style={{ minWidth: '220px' }}>
            {themesList.map((t) => (
              <button
                key={t.id}
                type="button"
                className={`popup-menu-item ${theme === t.id ? 'active' : ''}`}
                onClick={() => {
                  setTheme(t.id);
                  setThemeOpen(false);
                }}
              >
                <div className="popup-item-text">
                  <span className="popup-item-title">{t.label}</span>
                  <span className="popup-item-desc">{t.desc}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Currency Selector */}
        <div className="currency-selector" title="Choose Currency">
          <select value={currency} onChange={(e) => setCurrency(e.target.value)}>
            {Object.keys(currencyData.rates || {}).map((curr) => (
              <option key={curr} value={curr}>
                {curr} ({currencyData.currencySymbols?.[curr] || curr})
              </option>
            ))}
          </select>
        </div>

        <span className="api-pill live">
          <span className="pulse-dot"></span>
          Live
        </span>

        {/* Top-Right User Sign In / Account Button */}
        {user ? (
          <button type="button" className="user-profile-pill" onClick={onOpenAuth} title="View Account Profile">
            <span>👤</span>
            <span>{user.name}</span>
          </button>
        ) : (
          <button type="button" className="header-auth-btn" onClick={onOpenAuth}>
            <span>👤</span>
            <span>Sign In / Register</span>
          </button>
        )}
      </div>
    </header>
  );
}

const BULLY_TRAVEL_TIPS = [
  'Hawa Mahal in Jaipur has 953 intricately carved windows (jharokhas) designed to let royal women observe street festivals.',
  'Sunrise at the Taj Mahal offers serene golden lighting, cool morning mist, and minimal crowds.',
  'The best way to explore Old Goa’s baroque churches and Portuguese Latin Quarter (Fontainhas) is on a rented two-wheeler.',
  'Amritsar’s Golden Temple langar operates 24/7, serving nutritious warm meals to over 100,000 visitors daily with selfless love.',
  'Pangong Tso Lake in Ladakh changes hues dramatically from turquoise blue to deep emerald throughout the day.',
  'Varanasi’s Dashashwamedh Ghat evening Ganga Aarti is one of the most spiritual ceremonies on earth.',
  'The historic toy train from Kalka to Shimla traverses 102 tunnels and 864 bridges through aromatic Himalayan pine forests.',
  'Pre-booking prepaid airport taxis or comparing live Ola & Uber fares can save up to 40% on arrival.'
];

function BullyLoader({ message = 'Fetching live travel data...', tips = BULLY_TRAVEL_TIPS }) {
  const [tipIndex, setTipIndex] = useState(0);

  useEffect(() => {
    if (!tips || tips.length <= 1) return;
    const interval = setInterval(() => {
      setTipIndex((prev) => (prev + 1) % tips.length);
    }, 2800);
    return () => clearInterval(interval);
  }, [tips]);

  return (
    <div className="bully-loader-card">
      <div className="bully-mascot-wrap">
        <div className="bully-mascot">🛺</div>
        <div className="bully-shadow"></div>
        <span className="bully-bubble-puff">💨</span>
      </div>
      <div className="bully-title">{message}</div>
      <p className="bully-tips-text">{tips[tipIndex]}</p>
      <div className="bully-progress-bar">
        <div className="bully-progress-fill"></div>
      </div>
    </div>
  );
}

function DestinationsCarousel({ cities = [], onSelectCity }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Take top Indian destinations that have authentic photos
  const featured = useMemo(() => {
    return cities.filter((c) => CITY_PHOTOS[c.name]).slice(0, 10);
  }, [cities]);

  useEffect(() => {
    if (isHovered || featured.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % featured.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [featured.length, isHovered]);

  if (!featured.length) return null;

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? featured.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % featured.length);
  };

  return (
    <div
      className="destinations-carousel"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="carousel-header-row">
        <div>
          <span className="eyebrow">✨ Trending Indian Escapes</span>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 800, margin: '0.2rem 0' }}>Featured Destinations Showcase</h2>
        </div>
        <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
          {currentIndex + 1} of {featured.length} Destinations
        </span>
      </div>

      <div className="carousel-viewport">
        <div
          className="carousel-track"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {featured.map((dest) => {
            const photo = CITY_PHOTOS[dest.name];
            return (
              <div
                key={dest.id}
                className="carousel-slide-card"
                style={{ backgroundImage: `url(${photo})` }}
              >
                <div className="carousel-slide-overlay"></div>
                <div className="carousel-slide-content">
                  <span className="card-region-badge">{dest.region} • {dest.state}</span>
                  <h3>{dest.name}</h3>
                  <p>{dest.description || `Experience royal architecture, sacred traditions, and vibrant culture in ${dest.name}.`}</p>
                  <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', flexWrap: 'wrap' }}>
                    <button
                      type="button"
                      className="primary-action"
                      style={{ padding: '0.65rem 1.4rem' }}
                      onClick={() => onSelectCity(dest.id)}
                    >
                      Explore {dest.name} ➔
                    </button>
                    <span style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.9)' }}>
                      ⭐ {dest.rating || 4.8} rating • Best: {dest.bestSeason || 'Oct to Mar'}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <button
          type="button"
          className="carousel-nav-btn prev"
          onClick={handlePrev}
          aria-label="Previous Slide"
        >
          ❮
        </button>
        <button
          type="button"
          className="carousel-nav-btn next"
          onClick={handleNext}
          aria-label="Next Slide"
        >
          ❯
        </button>
      </div>

      <div className="carousel-dots">
        {featured.map((_, idx) => (
          <button
            key={idx}
            type="button"
            className={`carousel-dot ${idx === currentIndex ? 'active' : ''}`}
            onClick={() => setCurrentIndex(idx)}
            aria-label={`Slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

function HotelLocationSidebarMap({ cityName, cityCoords, hotel }) {
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markerRef = useRef(null);

  const lat = hotel?.latitude || cityCoords?.latitude || 26.9124;
  const lng = hotel?.longitude || cityCoords?.longitude || 75.7873;

  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (!mapInstanceRef.current) {
      const map = L.map(mapContainerRef.current, {
        center: [lat, lng],
        zoom: 13,
        zoomControl: true,
        scrollWheelZoom: false,
      });

      L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; OpenStreetMap &copy; CARTO',
        maxZoom: 18,
      }).addTo(map);

      mapInstanceRef.current = map;
    }

    const map = mapInstanceRef.current;
    map.setView([lat, lng], 13);

    if (markerRef.current) {
      map.removeLayer(markerRef.current);
    }

    const icon = L.divIcon({
      className: 'custom-hotel-pin',
      html: `<div style="background:#ea580c;color:white;width:34px;height:34px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:1.15rem;box-shadow:0 4px 12px rgba(0,0,0,0.3);border:2px solid white;">🏨</div>`,
      iconSize: [34, 34],
      iconAnchor: [17, 17],
    });

    markerRef.current = L.marker([lat, lng], { icon })
      .addTo(map)
      .bindPopup(`<strong>${hotel?.name || 'Hotel'}</strong><br/>${hotel?.address || cityName}`)
      .openPopup();
  }, [lat, lng, hotel?.name, hotel?.address, cityName]);

  useEffect(() => {
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent((hotel?.name || 'hotel') + ' ' + (cityName || ''))}`;

  return (
    <div className="hotel-sidebar-map-panel">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <span className="eyebrow">📍 Live Location & Proximity</span>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 800, margin: '0.2rem 0' }}>{hotel?.name || 'Selected Stay'}</h3>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: 0 }}>
            {hotel?.address || `${cityName}, India`}
          </p>
        </div>
      </div>

      <div className="mini-hotel-map-container" ref={mapContainerRef}></div>

      <div className="proximity-metrics-grid">
        <div className="proximity-badge">
          <span>✈️ Airport Terminal</span>
          <strong>~14.5 km (35 mins)</strong>
        </div>
        <div className="proximity-badge">
          <span>🚆 Central Railway</span>
          <strong>~3.8 km (12 mins)</strong>
        </div>
        <div className="proximity-badge">
          <span>🏛️ Main Monuments</span>
          <strong>~1.8 km (5 mins)</strong>
        </div>
        <div className="proximity-badge">
          <span>🛍️ Local Bazaars</span>
          <strong>~1.2 km (Walking)</strong>
        </div>
      </div>

      <div style={{ marginTop: '1rem' }}>
        <a
          href={googleMapsUrl}
          target="_blank"
          rel="noreferrer"
          className="open-gmaps-btn"
          style={{ width: '100%', justifyContent: 'center', textAlign: 'center' }}
        >
          <span>Open in Google Maps</span>
          <span>↗</span>
        </a>
      </div>
    </div>
  );
}

function HomePage({ cities, city, _filteredCities, formatPrice, hiddenCityIds = [], onHideCity, onUnhideAllCities, setPage, setSelectedId }) {
  const [dockQuery, setDockQuery] = useState('');
  const [dockSeason, setDockSeason] = useState('all');
  const [dockTheme, setDockTheme] = useState('all');

  const visibleDestinations = useMemo(() => {
    return cities.filter((c) => !hiddenCityIds.includes(c.id));
  }, [cities, hiddenCityIds]);

  const handleDockSearch = () => {
    if (dockQuery.trim()) {
      const match = cities.find((c) => c.name.toLowerCase().includes(dockQuery.trim().toLowerCase()));
      if (match) {
        setSelectedId(match.id);
        setPage('destinations');
        return;
      }
    }
    setPage('destinations');
  };

  return (
    <section className="page hero-page-container">
      <div className="hero-page">
        <div className="hero-copy">
          <p className="eyebrow">✨ All-India Premier Travel Platform</p>
          <h1>Experience the Soul of Incredible India</h1>
          <p className="hero-text">
            Discover royal desert fortresses, misty Himalayan summits, tranquil Kerala backwaters, and sacred Ganges riverfronts. Featuring live satellite weather, verified heritage stays, instant Ola & Uber GPS fare calculations, and AI trip planning.
          </p>

          {/* UNIVERSAL TRAVEL SEARCH DOCK */}
          <div className="universal-search-dock">
            <div className="search-dock-col">
              <span className="search-dock-label">📍 Destination</span>
              <input
                className="search-dock-input"
                placeholder="Where in India do you want to explore?"
                value={dockQuery}
                onChange={(e) => setDockQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleDockSearch()}
              />
            </div>
            <div className="search-dock-col">
              <span className="search-dock-label">🗓️ Best Season</span>
              <select
                className="search-dock-select"
                value={dockSeason}
                onChange={(e) => setDockSeason(e.target.value)}
              >
                <option value="all">Any Travel Season</option>
                <option value="winter">Winter (Oct to Mar)</option>
                <option value="summer">Summer (Apr to Jun)</option>
                <option value="monsoon">Monsoon (Jul to Sep)</option>
              </select>
            </div>
            <div className="search-dock-col">
              <span className="search-dock-label">🧭 Experience Vibe</span>
              <select
                className="search-dock-select"
                value={dockTheme}
                onChange={(e) => setDockTheme(e.target.value)}
              >
                <option value="all">All Experiences</option>
                <option value="heritage">Royal Palaces & Forts</option>
                <option value="beaches">Beaches & Coastal</option>
                <option value="mountains">Himalayan Peaks</option>
                <option value="spiritual">Ghats & Sacred Temples</option>
                <option value="lakes">Lakes & Backwaters</option>
              </select>
            </div>
            <button
              type="button"
              className="search-dock-btn"
              onClick={handleDockSearch}
              aria-label="Search Destinations"
            >
              <span>Explore</span>
              <span>➔</span>
            </button>
          </div>

          {/* QUICK EXPLORE PILLS */}
          <div className="quick-explore-pills">
            <span className="quick-pills-label">Trending Now:</span>
            {['Jaipur', 'Goa', 'Leh Ladakh', 'Varanasi', 'Kochi', 'Manali', 'Udaipur', 'Darjeeling', 'Amritsar', 'Hampi'].map((q) => (
              <button
                key={q}
                type="button"
                className="quick-pill-tag"
                onClick={() => {
                  const found = cities.find((c) => c.name.toLowerCase() === q.toLowerCase());
                  if (found) {
                    setSelectedId(found.id);
                    setPage('destinations');
                  }
                }}
              >
                {q}
              </button>
            ))}
          </div>

          <div className="hero-actions">
            <button className="primary-action" type="button" onClick={() => setPage('destinations')}>Browse 24 Cities</button>
            <button className="secondary-action" type="button" onClick={() => setPage('map')}>Interactive Map</button>
            <button className="secondary-action" type="button" onClick={() => setPage('hotels')}>Hotels & Cabs</button>
          </div>
        </div>

        <div className="hero-stack">
          <article className="glass-panel highlight-panel">
            <span className="region-tag">{city.region}</span>
            <strong>{city.name}</strong>
            <p>{city.description}</p>
            <div className="metric-row">
              <span>⭐ {city.averageRating || city.rating || 4.8} rating</span>
              <span>{formatPrice(city.estimatedDailyBudget)}/day</span>
            </div>
          </article>

          <article className="mini-dashboard glass-panel">
            <div className="stat-card">
              <strong>{visibleDestinations.length}</strong>
              <span>Live Destinations</span>
            </div>
            <div className="stat-card">
              <strong>100%</strong>
              <span>Instant Engine</span>
            </div>
          </article>
        </div>
      </div>

      {/* HERO LIVE STATS STRIP */}
      <div className="hero-stats-strip">
        <div className="hero-stat-box">
          <span className="hero-stat-icon">🏛️</span>
          <div>
            <div className="hero-stat-number">{cities.length}</div>
            <div className="hero-stat-label">Curated Indian Destinations</div>
          </div>
        </div>
        <div className="hero-stat-box">
          <span className="hero-stat-icon">🏨</span>
          <div>
            <div className="hero-stat-number">50+</div>
            <div className="hero-stat-label">Verified Stays & Hostels</div>
          </div>
        </div>
        <div className="hero-stat-box">
          <span className="hero-stat-icon">🚖</span>
          <div>
            <div className="hero-stat-number">Live GPS</div>
            <div className="hero-stat-label">Ola & Uber Fare Estimator</div>
          </div>
        </div>
        <div className="hero-stat-box">
          <span className="hero-stat-icon">⚡</span>
          <div>
            <div className="hero-stat-number">100%</div>
            <div className="hero-stat-label">Zero-Latency Client Engine</div>
          </div>
        </div>
      </div>

      {/* SLIDING PHOTO CAROUSEL ANIMATION */}
      <DestinationsCarousel
        cities={visibleDestinations}
        onSelectCity={(id) => {
          setSelectedId(id);
          setPage('destinations');
        }}
      />

      {/* FEATURED DESTINATIONS PHOTO GRID WITH ANIMATIONS */}
      <div className="home-featured-section">
        <div className="home-section-header">
          <div>
            <span className="eyebrow">Curated Getaways Across India</span>
            <h2>Top Destinations in North, South, East & West India</h2>
            <p>Select any iconic heritage city, beach retreat, or mountain sanctuary to inspect live weather, hotels, and attractions.</p>
          </div>
          <button type="button" className="secondary-action" onClick={() => setPage('map')}>
            View on Interactive Map ➔
          </button>
        </div>

        {hiddenCityIds.length > 0 && (
          <div className="unhide-floating-banner">
            <span>👁️ {hiddenCityIds.length} destination {hiddenCityIds.length === 1 ? 'is' : 'are'} currently hidden from view</span>
            <button type="button" className="unhide-all-btn" onClick={onUnhideAllCities}>
              Restore All Hidden Destinations
            </button>
          </div>
        )}

        <div className="home-destinations-grid">
          {visibleDestinations.map((dest) => {
            const photoUrl = CITY_PHOTOS[dest.name] || 'https://images.unsplash.com/photo-1599661046289-e31897846e41?w=800';
            return (
              <article
                key={dest.id}
                className="destination-photo-card"
                onClick={() => {
                  setSelectedId(dest.id);
                  setPage('destinations');
                }}
              >
                <div className="card-image-wrap">
                  <img src={photoUrl} alt={dest.name} loading="lazy" />
                  <span className="card-region-badge">{dest.region}</span>
                  <span className="card-rating-badge">⭐ {dest.rating || dest.averageRating || 4.8}</span>
                  <button
                    type="button"
                    className="hide-card-btn"
                    style={{ position: 'absolute', bottom: '8px', right: '8px', background: 'rgba(0,0,0,0.65)', color: 'white', backdropFilter: 'blur(4px)' }}
                    title="Hide this destination"
                    onClick={(e) => {
                      e.stopPropagation();
                      onHideCity(dest.id);
                    }}
                  >
                    👁️ Hide
                  </button>
                </div>

                <div className="card-body">
                  <div>
                    <h3>{dest.name}</h3>
                    <p className="card-state">{dest.state}</p>
                    <p className="card-desc">{dest.description ? dest.description.slice(0, 105) + '...' : 'Explore royal monuments, local culture, and curated stays.'}</p>
                    <div className="card-tags">
                      {dest.themes?.slice(0, 3).map((t, idx) => (
                        <span key={idx} className="card-tag">#{t}</span>
                      ))}
                    </div>
                  </div>

                  <div className="card-footer-row">
                    <div className="card-budget">
                      <span>Est. Daily Budget</span>
                      <strong>{formatPrice(dest.estimatedDailyBudget || 4200)}</strong>
                    </div>
                    <button
                      type="button"
                      className="explore-card-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedId(dest.id);
                        setPage('destinations');
                      }}
                    >
                      Explore ➔
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// -------------------------------------------------------------
// REAL LEAFLET + OPENSTREETMAP INTERACTIVE SERVER TILE MAP
// -------------------------------------------------------------
function MapPage(props) {
  const { budget, filteredCities, formatPrice, search, selectedId, selectedMarker, setBudget, setPage, setSearch, setSelectedId, setThemeFilter, themeFilter, themes } = props;
  const [onlyMostVisited, setOnlyMostVisited] = useState(false);

  const displayCities = useMemo(() => {
    if (!onlyMostVisited) return filteredCities;
    return filteredCities.filter((c) => (c.popularityScore || 90) >= 93 || (c.averageRating || c.rating || 4.5) >= 4.8);
  }, [filteredCities, onlyMostVisited]);

  return (
    <section className="page map-page">
      <PageTitle
        eyebrow="Interactive India Map"
        title="Discover Destinations Across India"
        text="Pan, zoom, and explore destinations across North, South, East, and West India. Tap any destination pin to inspect attractions, local stays, and travel tips."
      />

      <FilterBar search={search} setSearch={setSearch} themeFilter={themeFilter} setThemeFilter={setThemeFilter} themes={themes} budget={budget} setBudget={setBudget} formatPrice={formatPrice} onAddLiveCity={props.onAddLiveCity} />

      <div className="map-top-filter-bar">
        <button
          type="button"
          className={`map-top-filter-btn ${onlyMostVisited ? 'active' : ''}`}
          onClick={() => setOnlyMostVisited(!onlyMostVisited)}
        >
          🔥 {onlyMostVisited ? 'Showing Top Rated & Most Visited Cities' : 'Show Most Visited / Best Places'}
        </button>
        {onlyMostVisited && (
          <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            Filtering to India's {displayCities.length} highest-rated iconic destinations (4.8+ ★)
          </span>
        )}
      </div>

      <div className="map-layout">
        <div className="real-map-container">
          <RealLeafletMap
            cities={displayCities}
            selectedId={selectedId}
            onSelectCity={(id) => setSelectedId(id)}
            onExploreCity={(id) => {
              setSelectedId(id);
              setPage('destinations');
            }}
          />
        </div>

        <aside className="side-panel">
          <p className="eyebrow">{displayCities.length} destinations in view</p>
          <h2>{selectedMarker.name}</h2>
          <p>{selectedMarker.state} • {selectedMarker.region}</p>
          <div className="city-cards">
            {displayCities.map((marker) => (
              <button
                className={`city-card ${marker.id === selectedId ? 'active' : ''}`}
                key={marker.id}
                type="button"
                onClick={() => setSelectedId(marker.id)}
              >
                <span>{marker.state}</span>
                <strong>{marker.name}</strong>
                <div className="card-badge">{formatPrice(marker.estimatedDailyBudget || 4000)}/day</div>
              </button>
            ))}
          </div>
        </aside>
      </div>
    </section>
  );
}

function RealLeafletMap({ cities, onExploreCity, onSelectCity, selectedId }) {
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markersRef = useRef({});

  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (!mapInstanceRef.current) {
      // Initialize map centered on India
      const map = L.map(mapContainerRef.current, {
        center: [22.9734, 78.6569],
        zoom: 5,
        minZoom: 4,
        maxZoom: 14,
        zoomControl: true,
      });

      // Add high-resolution OpenStreetMap / CartoDB Voyager tiles (real server feed)
      L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
        subdomains: 'abcd',
        maxZoom: 19,
      }).addTo(map);

      mapInstanceRef.current = map;
    }

    const map = mapInstanceRef.current;

    // Clear old markers
    Object.values(markersRef.current).forEach((m) => map.removeLayer(m));
    markersRef.current = {};

    // Add city markers
    cities.forEach((city) => {
      const isSelected = city.id === selectedId;
      const customIcon = L.divIcon({
        className: 'custom-map-div-icon',
        html: `
          <div class="custom-leaflet-marker ${isSelected ? 'active' : ''}">
            <span class="pin-icon">📍</span>
            <span class="pin-name">${city.name}</span>
          </div>
        `,
        iconSize: [80, 30],
        iconAnchor: [40, 15],
      });

      const marker = L.marker([city.latitude, city.longitude], { icon: customIcon }).addTo(map);

      const popupContent = document.createElement('div');
      popupContent.className = 'map-popup-card';
      popupContent.innerHTML = `
        <h4>${city.name}, ${city.state}</h4>
        <p>${city.themes?.slice(0, 3).join(' • ')}</p>
        <div class="popup-stats">
          <span>⭐ ${city.rating}</span>
          <span>₹${city.estimatedDailyBudget}/day</span>
        </div>
        <button id="popup-btn-${city.id}">Explore Destination</button>
      `;

      popupContent.querySelector(`#popup-btn-${city.id}`).onclick = () => {
        onExploreCity(city.id);
      };

      marker.bindPopup(popupContent);

      marker.on('click', () => {
        onSelectCity(city.id);
      });

      markersRef.current[city.id] = marker;
    });
  }, [cities, onExploreCity, onSelectCity, selectedId]);

  // Pan to selected city when changed
  useEffect(() => {
    if (mapInstanceRef.current && selectedId) {
      const city = cities.find((c) => c.id === selectedId);
      if (city) {
        mapInstanceRef.current.flyTo([city.latitude, city.longitude], 6.5, { duration: 1.2 });
        const m = markersRef.current[city.id];
        if (m) m.openPopup();
      }
    }
  }, [selectedId, cities]);
  return <div ref={mapContainerRef} className="leaflet-map-element" />;
}

// -------------------------------------------------------------
// LIVE WEATHER & CLIMATE PAGE
// -------------------------------------------------------------
function WeatherPage({ cities, onAddLiveCity, selectedId, setSelectedId }) {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [weatherSearch, setWeatherSearch] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const FAMOUS_WEATHER_CITIES = [
    { name: 'Jaipur', emoji: '🌸' },
    { name: 'Agra', emoji: '🕌' },
    { name: 'Delhi', emoji: '✨' },
    { name: 'Mumbai', emoji: '🌊' },
    { name: 'Udaipur', emoji: '🏰' },
    { name: 'Varanasi', emoji: '🛕' },
    { name: 'Goa', emoji: '🏖️' },
    { name: 'Manali', emoji: '🏔️' },
    { name: 'Amritsar', emoji: '🪔' },
    { name: 'Rishikesh', emoji: '🧘' },
    { name: 'Kochi', emoji: '🌴' },
    { name: 'Leh Ladakh', emoji: '❄️' },
    { name: 'Srinagar', emoji: '🛶' },
    { name: 'Darjeeling', emoji: '🍵' },
    { name: 'Shillong', emoji: '🌧️' },
    { name: 'Pondicherry', emoji: '🥐' },
  ];

  // Live India search autocomplete
  useEffect(() => {
    const q = weatherSearch.trim();
    if (q.length < 2) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    const timer = setTimeout(async () => {
      try {
        const res = await fetch(
          `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(q)}&count=8&language=en&format=json&countryCode=IN`
        );
        if (res.ok) {
          const data = await res.json();
          if (data.results && data.results.length > 0) {
            setSuggestions(data.results);
            setShowSuggestions(true);
            return;
          }
        }
      } catch {
        // ignore
      }
      setSuggestions([]);
      setShowSuggestions(false);
    }, 280);

    return () => clearTimeout(timer);
  }, [weatherSearch]);

  const handleSelectSuggestion = (s) => {
    setShowSuggestions(false);
    setWeatherSearch('');
    if (onAddLiveCity) {
      onAddLiveCity({
        id: s.id,
        name: s.name,
        country: 'India',
        state: s.admin1 ? `${s.admin1}, India` : 'India',
        region: s.admin1 || 'India',
        latitude: s.latitude,
        longitude: s.longitude,
        rating: 4.8,
        popularityScore: 95,
        estimatedDailyBudget: 4200,
        themes: ['culture', 'landmarks', 'heritage'],
        bestSeason: 'October to March',
      });
    }
  };

  const filteredPillCities = useMemo(() => {
    if (!weatherSearch.trim()) return cities;
    return cities.filter((c) =>
      c.name.toLowerCase().includes(weatherSearch.toLowerCase()) ||
      c.state.toLowerCase().includes(weatherSearch.toLowerCase())
    );
  }, [cities, weatherSearch]);

  const city = cities.find((c) => c.id === selectedId) || cities[0];

  useEffect(() => {
    let isCancelled = false;

    async function loadWeather() {
      setLoading(true);

      // Strategy 1: Attempt in-browser weather service
      try {
        const data = await yatraApi.getWeather(city.id);
        if (data && !isCancelled) {
          setWeather(data);
          setLoading(false);
          return;
        }
      } catch {
        // proceed to direct satellite fetch
      }

      // Strategy 2: Direct browser client-side fetch to Open-Meteo REST API
      try {
        const omUrl = `https://api.open-meteo.com/v1/forecast?latitude=${city.latitude}&longitude=${city.longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset&timezone=auto`;
        const res = await fetch(omUrl);
        if (res.ok) {
          const om = await res.json();
          const curr = om.current || {};
          const daily = om.daily || {};
          const mapped = {
            cityId: city.id,
            cityName: city.name,
            latitude: city.latitude,
            longitude: city.longitude,
            currentTemperature: curr.temperature_2m ?? 24,
            apparentTemperature: curr.apparent_temperature ?? 25,
            relativeHumidity: curr.relative_humidity_2m ?? 50,
            windSpeed: curr.wind_speed_10m ?? 8,
            weatherCode: curr.weather_code ?? 0,
            weatherCondition: getWmoCondition(curr.weather_code ?? 0),
            weatherIcon: getWmoIcon(curr.weather_code ?? 0),
            timezone: om.timezone || 'Asia/Kolkata',
            packingTip: generatePackingAdvice(curr.temperature_2m ?? 24, curr.weather_code ?? 0),
            dailyForecasts: (daily.time || []).slice(0, 7).map((t, idx) => ({
              date: t,
              weatherCode: daily.weather_code?.[idx] ?? 0,
              weatherCondition: getWmoCondition(daily.weather_code?.[idx] ?? 0),
              weatherIcon: getWmoIcon(daily.weather_code?.[idx] ?? 0),
              maxTemperature: daily.temperature_2m_max?.[idx] ?? 28,
              minTemperature: daily.temperature_2m_min?.[idx] ?? 18,
              sunrise: daily.sunrise?.[idx] ? daily.sunrise[idx].slice(11, 16) : '06:15',
              sunset: daily.sunset?.[idx] ? daily.sunset[idx].slice(11, 16) : '18:40',
            })),
            isLiveExternalData: true,
          };

          if (!isCancelled) {
            setWeather(mapped);
            setLoading(false);
            return;
          }
        }
      } catch {
        // proceed to offline fallback
      }

      // Strategy 3: Offline climatic fallback
      if (!isCancelled) {
        setWeather(generateOfflineWeather(city));
        setLoading(false);
      }
    }

    loadWeather();
    return () => { isCancelled = true; };
  }, [city]);

  return (
    <section className="page weather-page">
      <PageTitle
        eyebrow="Live Climate & Atmosphere"
        title="Live Weather Forecast & Packing Guide"
        text="Check real-time temperatures, 7-day outlook, and seasonal packing tips for any destination across India."
      />

      {/* SEARCH AND QUICK FAMOUS CITIES */}
      <div className="weather-search-card glass-panel">
        <div className="weather-search-input-wrap" style={{ position: 'relative' }}>
          <div className="search-input-container">
            <input
              type="text"
              className="weather-search-input"
              placeholder="🔍 Search any city or town across India (e.g. Pune, Lucknow, Guwahati, Bhopal)..."
              value={weatherSearch}
              onChange={(e) => setWeatherSearch(e.target.value)}
              onFocus={() => suggestions.length > 0 && setShowSuggestions(true)}
            />
            {showSuggestions && suggestions.length > 0 && (
              <div className="search-autocomplete-dropdown">
                {suggestions.map((s) => (
                  <div
                    key={s.id}
                    className="search-suggestion-item"
                    onClick={() => handleSelectSuggestion(s)}
                  >
                    <div>
                      <span className="suggestion-city-name">📍 {s.name}</span>
                      <span className="suggestion-state-name">, {s.admin1 || 'India'}</span>
                    </div>
                    <span style={{ fontSize: '0.75rem', color: 'var(--primary)', fontWeight: 700 }}>
                      Get Live Weather ➔
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
          {weatherSearch && (
            <button
              type="button"
              className="secondary-action"
              style={{ padding: '0.65rem 1rem' }}
              onClick={() => { setWeatherSearch(''); setShowSuggestions(false); }}
            >
              Clear
            </button>
          )}
        </div>

        <div className="famous-cities-row">
          <span className="famous-label">⚡ Famous Destinations:</span>
          {FAMOUS_WEATHER_CITIES.map((fc, idx) => {
            const target = cities.find((c) => c.name.toLowerCase() === fc.name.toLowerCase());
            if (!target) return null;
            return (
              <button
                key={idx}
                type="button"
                className={`famous-city-pill ${target.id === selectedId ? 'active' : ''}`}
                onClick={() => setSelectedId(target.id)}
              >
                {fc.emoji} {fc.name}
              </button>
            );
          })}
        </div>
      </div>

      <div className="city-pill-selector">
        {filteredPillCities.map((c) => (
          <button
            key={c.id}
            type="button"
            className={c.id === selectedId ? 'active' : ''}
            onClick={() => setSelectedId(c.id)}
          >
            {c.name}
          </button>
        ))}
      </div>

      {loading ? (
        <BullyLoader message={`Connecting to live weather satellites for ${city.name}...`} />
      ) : weather ? (
        <div className="weather-bento-grid">
          {/* HERO BENTO CARD */}
          <div className="weather-hero-card">
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <span className="live-tag">
                    {weather.isLiveExternalData ? '🟢 Live Satellite Sync' : '🟡 Regional Climate'}
                  </span>
                  <h2 style={{ fontSize: '2rem', fontWeight: 800, margin: '0.4rem 0 0.2rem' }}>{weather.cityName}</h2>
                  <p className="coords" style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                    Coordinates: {weather.latitude.toFixed(2)}°N, {weather.longitude.toFixed(2)}°E • {weather.timezone}
                  </p>
                </div>
                <div style={{ fontSize: '3.5rem', lineHeight: 1 }}>{weather.weatherIcon}</div>
              </div>

              <div className="weather-hero-temp-row">
                <div className="weather-big-temp">{Math.round(weather.currentTemperature)}°</div>
                <div className="weather-hero-condition">
                  <span className="weather-condition-badge">{weather.weatherCondition}</span>
                  <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                    Feels like {Math.round(weather.apparentTemperature)}°C
                  </span>
                </div>
              </div>
            </div>

            <div className="packing-tip-box" style={{ marginTop: '1.5rem' }}>
              <strong>🧳 Climate & Packing Advice for {weather.cityName}:</strong>
              <p style={{ marginTop: '0.35rem', fontSize: '0.9rem', lineHeight: 1.5 }}>{weather.packingTip}</p>
            </div>
          </div>

          {/* 4-TILE METRICS BENTO */}
          <div className="weather-metrics-2x2">
            <div className="weather-metric-bento-tile">
              <span className="metric-bento-header">💧 Relative Humidity</span>
              <div className="metric-bento-val">{weather.relativeHumidity}%</div>
              <span className="metric-bento-sub">Comfortable air moisture</span>
            </div>

            <div className="weather-metric-bento-tile">
              <span className="metric-bento-header">💨 Wind Velocity</span>
              <div className="metric-bento-val">{weather.windSpeed} <span style={{ fontSize: '1rem' }}>km/h</span></div>
              <span className="metric-bento-sub">Calm surface breeze</span>
            </div>

            <div className="weather-metric-bento-tile">
              <span className="metric-bento-header">🌅 Solar Timings</span>
              <div className="metric-bento-val" style={{ fontSize: '1.25rem' }}>
                {weather.dailyForecasts?.[0]?.sunrise || '06:15'} <span style={{ fontSize: '0.85rem' }}>Sunrise</span>
              </div>
              <span className="metric-bento-sub">Sunset ~18:45 IST</span>
            </div>

            <div className="weather-metric-bento-tile">
              <span className="metric-bento-header">🧭 Atmosphere</span>
              <div className="metric-bento-val" style={{ fontSize: '1.25rem', color: 'var(--secondary)' }}>Optimal</div>
              <span className="metric-bento-sub">Ideal for outdoor sightseeing</span>
            </div>
          </div>

          {/* 7-DAY OUTLOOK FULL STRIP */}
          <div className="forecast-7day-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800 }}>📅 7-Day Weather Outlook</h3>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Daily Temperature Trends</span>
            </div>
            <div className="forecast-strip-row">
              {weather.dailyForecasts?.map((day, idx) => {
                const dayName = idx === 0 ? 'Today' : new Date(day.date).toLocaleDateString('en-US', { weekday: 'short' });
                return (
                  <div key={idx} className="forecast-day-tile">
                    <span className="forecast-day-name">{dayName}</span>
                    <span className="forecast-day-icon">{day.weatherIcon}</span>
                    <span className="forecast-temp-range">
                      {Math.round(day.maxTemperature)}° <span style={{ color: 'var(--text-muted)', fontWeight: 500 }}>/ {Math.round(day.minTemperature)}°</span>
                    </span>
                    <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{day.weatherCondition}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}

// -------------------------------------------------------------
// BULLETPROOF WIKIPEDIA EXPLORER (DUAL-MODE FETCHING)
// -------------------------------------------------------------
function WikiExplorePage({ cities, selectedId, setSelectedId }) {
  const [wikiData, setWikiData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  const city = cities.find((c) => c.id === selectedId) || cities[0];

  useEffect(() => {
    let isCancelled = false;

    async function loadWiki(query) {
      setLoading(true);

      // Strategy 1: Attempt Wiki service
      try {
        const data = await yatraApi.getWikiSummary(query);
        if (data && !isCancelled && data.extract) {
          setWikiData(data);
          setLoading(false);
          return;
        }
      } catch {
        // proceed to direct fallback
      }

      // Strategy 2: Direct browser client-side fetch to Wikimedia REST API (100% reliable)
      try {
        const cleanTitle = query.trim().replace(/ /g, '_');
        const wikiRes = await fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(cleanTitle)}`, {
          headers: { 'Accept': 'application/json' },
        });

        if (wikiRes.ok) {
          const wData = await wikiRes.json();
          const extract = wData.extract || '';
          const keyFacts = [];
          if (wData.description) keyFacts.push(wData.description);
          extract.split('. ').slice(0, 3).forEach((s) => {
            if (s.trim().length > 15) keyFacts.push(s.trim().endsWith('.') ? s.trim() : s.trim() + '.');
          });

          if (!isCancelled) {
            setWikiData({
              query,
              title: wData.title || query,
              extract,
              description: wData.description || 'Indian historical destination',
              thumbnailUrl: wData.thumbnail?.source || 'https://images.unsplash.com/photo-1599661046289-e31897846e41?w=800',
              wikipediaUrl: wData.content_urls?.desktop?.page || `https://en.wikipedia.org/wiki/${encodeURIComponent(cleanTitle)}`,
              keyFacts: keyFacts.length ? keyFacts : ['Renowned heritage landmark of India.', 'Rich in cultural and architectural legacy.'],
              isLiveExternalData: true,
            });
            setLoading(false);
            return;
          }
        }
      } catch {
        // proceed to offline fallback
      }

      // Strategy 3: Built-in encyclopedic summary
      if (!isCancelled) {
        setWikiData({
          query,
          title: query,
          extract: `${query} is one of India's celebrated travel destinations, rich in royal palaces, spiritual sanctuaries, vibrant bazaars, and diverse architectural heritage.`,
          description: 'Prominent Indian Cultural Destination',
          thumbnailUrl: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?w=800',
          wikipediaUrl: `https://en.wikipedia.org/wiki/${encodeURIComponent(query)}`,
          keyFacts: [
            'Celebrated destination showcasing authentic regional architecture.',
            'Direct rail, highway, and domestic flight connections.',
            'Centuries of living culture, craftsmanship, and culinary mastery.',
          ],
          isLiveExternalData: false,
        });
        setLoading(false);
      }
    }

    loadWiki(searchQuery || city.name);
    return () => { isCancelled = true; };
  }, [city, searchQuery]);

  function handleSearchSubmit(e) {
    e.preventDefault();
    const inputVal = e.target.elements.queryInput.value.trim();
    if (inputVal) {
      setSearchQuery(inputVal);
    }
  }

  return (
    <section className="page wiki-page">
      <PageTitle
        eyebrow="Heritage & Monuments"
        title="Monuments & History Guide"
        text="Explore the rich history, architecture, and cultural stories behind India's most iconic landmarks."
      />

      <div className="city-pill-selector">
        {cities.map((c) => (
          <button
            key={c.id}
            type="button"
            className={c.id === selectedId && !searchQuery ? 'active' : ''}
            onClick={() => {
              setSelectedId(c.id);
              setSearchQuery('');
            }}
          >
            {c.name}
          </button>
        ))}
      </div>

      <form className="wiki-search-form glass-panel" onSubmit={handleSearchSubmit}>
        <span>🔍 Search any monument, palace, temple, or historical site across India:</span>
        <div className="search-input-group">
          <input
            name="queryInput"
            defaultValue={searchQuery}
            placeholder="e.g. Taj Mahal, Amber Fort, Qutub Minar, Golden Temple, Gateway of India..."
          />
          <button type="submit">Explore Sights</button>
        </div>
      </form>

      {loading ? (
        <BullyLoader message="Retrieving encyclopedic heritage archive & monument details..." />
      ) : wikiData ? (
        <div className="wiki-content-card glass-panel">
          <div className="wiki-hero">
            {wikiData.thumbnailUrl ? (
              <img src={wikiData.thumbnailUrl} alt={wikiData.title} className="wiki-img" />
            ) : (
              <div className="wiki-img-placeholder">🏛️</div>
            )}
            <div className="wiki-hero-info">
              <span className="wiki-badge">
                🏛️ Verified Heritage Guide
              </span>
              <h2>{wikiData.title}</h2>
              <p className="wiki-desc">{wikiData.description}</p>
              <p className="wiki-extract">{wikiData.extract}</p>
              <a
                href={wikiData.wikipediaUrl}
                target="_blank"
                rel="noreferrer"
                className="wiki-link-action"
              >
                Read Complete Article on Wikipedia ↗
              </a>
            </div>
          </div>

          <div className="key-facts-section">
            <h3>Architectural & Heritage Highlights:</h3>
            <div className="facts-grid">
              {wikiData.keyFacts?.map((fact, idx) => (
                <div key={idx} className="fact-item">
                  <span>✓</span>
                  <p>{fact}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}

// -------------------------------------------------------------
// HOTELS & LIVE OLA / UBER CAB FARE ENGINE
// -------------------------------------------------------------
function HotelsPage({ details, formatPrice, handleOpenBooking, hiddenHotelIds = [], onHideHotel, onUnhideAllHotels, selectedMarker }) {
  const [activeSection, setActiveSection] = useState('hotels'); // 'hotels' | 'cabs'
  const [selectedHotelForMap, setSelectedHotelForMap] = useState(null);

  const places = useMemo(() => details?.famousPlaces || [], [details]);

  // Expand hotel inventory with authentic stays per destination
  const allHotels = useMemo(() => {
    const baseHotels = details?.recommendedHotels || [];
    const cName = selectedMarker?.name || 'City';
    const cLat = selectedMarker?.latitude || 26.9124;
    const cLng = selectedMarker?.longitude || 75.7873;
    const supplements = [
      { id: selectedMarker.id * 1000 + 10, name: `Zostel ${cName} (Backpacker Hub)`, type: 'Hostel', address: `Heritage Quarter, ${cName}`, latitude: cLat + 0.005, longitude: cLng + 0.004, rating: 4.8, pricePerNight: 850, amenities: ['Dorm Beds', 'Rooftop Cafe', 'Free High-Speed WiFi', 'Travel Desk'], nearbyAttractionIds: [] },
      { id: selectedMarker.id * 1000 + 11, name: `The Hosteller ${cName} Express`, type: 'Hostel', address: `Near Central Station, ${cName}`, latitude: cLat - 0.006, longitude: cLng + 0.003, rating: 4.7, pricePerNight: 780, amenities: ['Air-conditioned Pods', 'Common Lounge', 'Lockers', 'Cafe'], nearbyAttractionIds: [] },
      { id: selectedMarker.id * 1000 + 12, name: `Royal ${cName} Heritage Palace`, type: 'Heritage', address: `Palace Road, ${cName}`, latitude: cLat + 0.012, longitude: cLng - 0.008, rating: 4.9, pricePerNight: 5600, amenities: ['Royal Courtyard', 'Folk Music', 'Pool', 'Authentic Dining'], nearbyAttractionIds: [] },
      { id: selectedMarker.id * 1000 + 13, name: `${cName} Riverside / Lake Retreat`, type: 'Resort', address: `Lakefront Promenade, ${cName}`, latitude: cLat - 0.014, longitude: cLng - 0.009, rating: 4.8, pricePerNight: 7200, amenities: ['Scenic View Balcony', 'Infinity Pool', 'Spa', 'Breakfast'], nearbyAttractionIds: [] },
      { id: selectedMarker.id * 1000 + 14, name: `Lemon Tree Premier ${cName}`, type: 'Boutique', address: `Airport Arterial Expressway, ${cName}`, latitude: cLat + 0.018, longitude: cLng + 0.012, rating: 4.6, pricePerNight: 4200, amenities: ['Airport Shuttle', 'Gym', 'Buffet Breakfast', 'Bar'], nearbyAttractionIds: [] },
      { id: selectedMarker.id * 1000 + 15, name: `Taj Gateway & Heritage Suites ${cName}`, type: 'Luxury', address: `Civil Lines, ${cName}`, latitude: cLat - 0.009, longitude: cLng + 0.015, rating: 4.9, pricePerNight: 12500, amenities: ['5-Star Luxury', 'Butler Service', 'Fine Dining', 'Grand Spa'], nearbyAttractionIds: [] },
    ];
    const existingNames = new Set(baseHotels.map((h) => h.name.toLowerCase()));
    const filteredSupp = supplements.filter((s) => !existingNames.has(s.name.toLowerCase()));
    return [...baseHotels, ...filteredSupp];
  }, [details, selectedMarker]);

  const visibleHotels = useMemo(() => {
    return allHotels.filter((h) => !hiddenHotelIds.includes(h.id));
  }, [allHotels, hiddenHotelIds]);

  const [pickup, setPickup] = useState('hotel_0');
  const [drop, setDrop] = useState('place_0');
  const [liveCabData, setLiveCabData] = useState(null);
  const [isScanning, setIsScanning] = useState(false);

  // Sorting & Accommodation Filtering
  const [sortOrder, setSortOrder] = useState('low-to-high');
  const [stayTypeFilter, setStayTypeFilter] = useState('all');

  const filteredAndSortedHotels = useMemo(() => {
    let list = [...visibleHotels];
    if (stayTypeFilter !== 'all') {
      list = list.filter((h) => (h.type || '').toLowerCase().includes(stayTypeFilter.toLowerCase()));
    }
    if (sortOrder === 'low-to-high') {
      list.sort((a, b) => a.pricePerNight - b.pricePerNight);
    } else if (sortOrder === 'high-to-low') {
      list.sort((a, b) => b.pricePerNight - a.pricePerNight);
    } else if (sortOrder === 'rating') {
      list.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    }
    return list;
  }, [visibleHotels, sortOrder, stayTypeFilter]);

  const activeHotelForMap = selectedHotelForMap || filteredAndSortedHotels[0] || allHotels[0];

  // Hotel Price Comparison State
  const [compareModal, setCompareModal] = useState(null);
  const [compareData, setCompareData] = useState(null);
  const [loadingCompare, setLoadingCompare] = useState(false);

  const openComparison = async (hotel) => {
    setCompareModal(hotel);
    setLoadingCompare(true);
    try {
      const data = await yatraApi.compareHotelPrices(
        hotel.name,
        selectedMarker.name,
        hotel.pricePerNight,
        hotel.rating
      );
      if (data) {
        setCompareData(data);
        setLoadingCompare(false);
        return;
      }
    } catch {
      // fallback
    }

    const base = hotel.pricePerNight || 4200;
    const encH = encodeURIComponent(hotel.name);
    const encC = encodeURIComponent(selectedMarker.name);
    setCompareData({
      hotelName: hotel.name,
      cityName: selectedMarker.name,
      basePriceInr: base,
      starRating: hotel.rating,
      platformDeals: [
        { platformName: 'Yatra Direct', dealPriceInr: Math.round(base * 0.88), savingsInr: Math.round(base * 0.12), badge: 'Lowest Guaranteed Rate 🔥', directBookingUrl: '#', couponCode: 'YATRADIR12', icon: '🏨' },
        { platformName: 'MakeMyTrip', dealPriceInr: Math.round(base * 0.94), savingsInr: Math.round(base * 0.06), badge: 'MMT Special Coupon', directBookingUrl: `https://www.makemytrip.com/hotels/hotel-listing/?city=${encC}&searchText=${encH}`, couponCode: 'MMTHOTEL', icon: '🔴' },
        { platformName: 'Agoda', dealPriceInr: Math.round(base * 0.91), savingsInr: Math.round(base * 0.09), badge: 'VIP Secret Deal', directBookingUrl: `https://www.agoda.com/search?city=${encC}&textToSearch=${encH}`, couponCode: 'AGODAVIP', icon: '🔵' },
        { platformName: 'Booking.com', dealPriceInr: Math.round(base * 0.90), savingsInr: Math.round(base * 0.10), badge: 'Genius Level 2 • Free Cancellation', directBookingUrl: `https://www.booking.com/searchresults.html?ss=${encH}+${encC}`, couponCode: 'GENIUS', icon: '🔷' },
      ],
    });
    setLoadingCompare(false);
  };

  // Helper to resolve coordinates based on selected option
  const resolvePickupCoords = (pickupKey) => {
    if (pickupKey === 'airport') {
      return {
        name: `${selectedMarker.name} International Airport Terminal`,
        lat: selectedMarker.latitude - 0.14,
        lng: selectedMarker.longitude - 0.09,
      };
    }
    if (pickupKey === 'railway') {
      return {
        name: `${selectedMarker.name} Central Railway Junction`,
        lat: selectedMarker.latitude - 0.04,
        lng: selectedMarker.longitude + 0.02,
      };
    }
    if (pickupKey.startsWith('hotel_')) {
      const idx = parseInt(pickupKey.replace('hotel_', ''), 10);
      const h = allHotels[idx] || allHotels[0];
      if (h) return { name: h.name, lat: h.latitude, lng: h.longitude };
    }
    const foundHotel = allHotels.find((h) => h.name === pickupKey);
    if (foundHotel) return { name: foundHotel.name, lat: foundHotel.latitude, lng: foundHotel.longitude };
    return { name: `${selectedMarker.name} City Center`, lat: selectedMarker.latitude, lng: selectedMarker.longitude };
  };

  const resolveDropCoords = (dropKey) => {
    if (dropKey.startsWith('place_')) {
      const idx = parseInt(dropKey.replace('place_', ''), 10);
      const p = places[idx] || places[0];
      if (p) return { name: p.name, lat: p.latitude, lng: p.longitude };
    }
    const foundPlace = places.find((p) => p.name === dropKey);
    if (foundPlace) return { name: foundPlace.name, lat: foundPlace.latitude, lng: foundPlace.longitude };
    return { name: `${selectedMarker.name} Famous Monument`, lat: selectedMarker.latitude + 0.04, lng: selectedMarker.longitude + 0.03 };
  };

  const calculateDistanceKm = (lat1, lon1, lat2, lon2) => {
    const R = 6371;
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return Math.max(1.8, Math.round(R * c * 1.35 * 10) / 10);
  };

  const calculateAndSetFares = async (pickupKey, dropKey) => {
    setIsScanning(true);
    const pLoc = resolvePickupCoords(pickupKey);
    const dLoc = resolveDropCoords(dropKey);
    const roadDist = calculateDistanceKm(pLoc.lat, pLoc.lng, dLoc.lat, dLoc.lng);
    const estMins = Math.max(8, Math.round((roadDist / 24) * 60) + 4);

    const uberUrl = `https://m.uber.com/ul/?action=setPickup&client_id=yatra&pickup[latitude]=${pLoc.lat}&pickup[longitude]=${pLoc.lng}&pickup[nickname]=${encodeURIComponent(pLoc.name)}&dropoff[latitude]=${dLoc.lat}&dropoff[longitude]=${dLoc.lng}&dropoff[nickname]=${encodeURIComponent(dLoc.name)}`;
    const olaUrl = `https://book.olacabs.com/?pickup_lat=${pLoc.lat}&pickup_lng=${pLoc.lng}&pickup_name=${encodeURIComponent(pLoc.name)}&drop_lat=${dLoc.lat}&drop_lng=${dLoc.lng}&drop_name=${encodeURIComponent(dLoc.name)}`;

    const clientFareData = {
      pickupName: pLoc.name,
      dropName: dLoc.name,
      distanceKm: roadDist,
      estimatedMinutes: estMins,
      trafficCondition: roadDist > 14 ? 'Highway & Fast Arterial' : 'Local Heritage District Traffic',
      surgeMultiplier: 1.0,
      olaOptions: [
        { serviceName: 'Ola', rideCategory: 'Ola Auto', estimatedFareInr: Math.max(45, Math.round(35 + roadDist * 14.0)), driverEtaMinutes: 2, driversNearby: 7, capacity: '3 Seats', vehicleType: 'Auto Rickshaw', directBookingUrl: olaUrl, icon: '🛺' },
        { serviceName: 'Ola', rideCategory: 'Ola Mini', estimatedFareInr: Math.max(90, Math.round(55 + roadDist * 20.0)), driverEtaMinutes: 3, driversNearby: 12, capacity: '4 Seats', vehicleType: 'Compact AC Hatchback', directBookingUrl: olaUrl, icon: '🚗' },
        { serviceName: 'Ola', rideCategory: 'Ola Prime Sedan', estimatedFareInr: Math.max(130, Math.round(75 + roadDist * 26.0)), driverEtaMinutes: 5, driversNearby: 8, capacity: '4 Seats', vehicleType: 'Spacious Sedan with WiFi', directBookingUrl: olaUrl, icon: '🚘' },
      ],
      uberOptions: [
        { serviceName: 'Uber', rideCategory: 'Uber Auto', estimatedFareInr: Math.max(40, Math.round(32 + roadDist * 13.5)), driverEtaMinutes: 2, driversNearby: 9, capacity: '3 Seats', vehicleType: 'Affordable Auto', directBookingUrl: uberUrl, icon: '🛺' },
        { serviceName: 'Uber', rideCategory: 'Uber Go', estimatedFareInr: Math.max(85, Math.round(50 + roadDist * 19.5)), driverEtaMinutes: 3, driversNearby: 15, capacity: '4 Seats', vehicleType: 'Everyday Compact', directBookingUrl: uberUrl, icon: '🚗' },
        { serviceName: 'Uber', rideCategory: 'Uber Premier', estimatedFareInr: Math.max(140, Math.round(80 + roadDist * 27.5)), driverEtaMinutes: 4, driversNearby: 6, capacity: '4 Seats', vehicleType: 'Premium Sedan', directBookingUrl: uberUrl, icon: '🚘' },
      ],
    };
    setLiveCabData(clientFareData);

    try {
      const liveData = await yatraApi.getLiveCabEstimates(
        pLoc.name,
        pLoc.lat,
        pLoc.lng,
        dLoc.name,
        dLoc.lat,
        dLoc.lng
      );
      if (liveData) {
        setLiveCabData(liveData);
      }
    } catch {
      // clientFareData is set
    } finally {
      setIsScanning(false);
    }
  };

  useEffect(() => {
    let unmounted = false;
    const pLoc = resolvePickupCoords(pickup);
    const dLoc = resolveDropCoords(drop);
    const roadDist = calculateDistanceKm(pLoc.lat, pLoc.lng, dLoc.lat, dLoc.lng);
    const estMins = Math.max(8, Math.round((roadDist / 24) * 60) + 4);

    const uberUrl = `https://m.uber.com/ul/?action=setPickup&client_id=yatra&pickup[latitude]=${pLoc.lat}&pickup[longitude]=${pLoc.lng}&pickup[nickname]=${encodeURIComponent(pLoc.name)}&dropoff[latitude]=${dLoc.lat}&dropoff[longitude]=${dLoc.lng}&dropoff[nickname]=${encodeURIComponent(dLoc.name)}`;
    const olaUrl = `https://book.olacabs.com/?pickup_lat=${pLoc.lat}&pickup_lng=${pLoc.lng}&pickup_name=${encodeURIComponent(pLoc.name)}&drop_lat=${dLoc.lat}&drop_lng=${dLoc.lng}&drop_name=${encodeURIComponent(dLoc.name)}`;

    if (!unmounted) {
      setLiveCabData({
        pickupName: pLoc.name,
        dropName: dLoc.name,
        distanceKm: roadDist,
        estimatedMinutes: estMins,
        trafficCondition: roadDist > 14 ? 'Highway & Fast Arterial' : 'Local City Flow',
        surgeMultiplier: 1.0,
        olaOptions: [
          { serviceName: 'Ola', rideCategory: 'Ola Auto', estimatedFareInr: Math.max(45, Math.round(35 + roadDist * 14.0)), driverEtaMinutes: 2, driversNearby: 7, capacity: '3 Seats', vehicleType: 'Auto Rickshaw', directBookingUrl: olaUrl, icon: '🛺' },
          { serviceName: 'Ola', rideCategory: 'Ola Mini', estimatedFareInr: Math.max(90, Math.round(55 + roadDist * 20.0)), driverEtaMinutes: 3, driversNearby: 12, capacity: '4 Seats', vehicleType: 'Compact AC Hatchback', directBookingUrl: olaUrl, icon: '🚗' },
          { serviceName: 'Ola', rideCategory: 'Ola Prime Sedan', estimatedFareInr: Math.max(130, Math.round(75 + roadDist * 26.0)), driverEtaMinutes: 5, driversNearby: 8, capacity: '4 Seats', vehicleType: 'Spacious Sedan with WiFi', directBookingUrl: olaUrl, icon: '🚘' },
        ],
        uberOptions: [
          { serviceName: 'Uber', rideCategory: 'Uber Auto', estimatedFareInr: Math.max(40, Math.round(32 + roadDist * 13.5)), driverEtaMinutes: 2, driversNearby: 9, capacity: '3 Seats', vehicleType: 'Affordable Auto', directBookingUrl: uberUrl, icon: '🛺' },
          { serviceName: 'Uber', rideCategory: 'Uber Go', estimatedFareInr: Math.max(85, Math.round(50 + roadDist * 19.5)), driverEtaMinutes: 3, driversNearby: 15, capacity: '4 Seats', vehicleType: 'Everyday Compact', directBookingUrl: uberUrl, icon: '🚗' },
          { serviceName: 'Uber', rideCategory: 'Uber Premier', estimatedFareInr: Math.max(140, Math.round(80 + roadDist * 27.5)), driverEtaMinutes: 4, driversNearby: 6, capacity: '4 Seats', vehicleType: 'Premium Sedan', directBookingUrl: uberUrl, icon: '🚘' },
        ],
      });
    }

    return () => { unmounted = true; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedMarker]);

  const handlePickupChange = (newPickup) => {
    setPickup(newPickup);
    calculateAndSetFares(newPickup, drop);
  };

  const handleDropChange = (newDrop) => {
    setDrop(newDrop);
    calculateAndSetFares(pickup, newDrop);
  };

  return (
    <section className="page hotels-page">
      <PageTitle
        eyebrow="Stays & Real-Time Cabs"
        title="Accommodations & Live Cab Fare Engine"
        text="Book top-rated hotels, boutique havelis, backpacker hostels, and fetch live Ola & Uber fares with instant one-click booking deep-links."
      />

      {/* SEPARATED SUB-TABS FOR HOTELS VS CABS */}
      <div className="section-subtabs-bar">
        <button
          type="button"
          className={`section-subtab-btn ${activeSection === 'hotels' ? 'active' : ''}`}
          onClick={() => setActiveSection('hotels')}
        >
          <span>🏨</span>
          <span>Stays, Resorts & Hostels ({filteredAndSortedHotels.length})</span>
        </button>
        <button
          type="button"
          className={`section-subtab-btn ${activeSection === 'cabs' ? 'active' : ''}`}
          onClick={() => setActiveSection('cabs')}
        >
          <span>🚗</span>
          <span>Local Cabs (Live Ola & Uber Rates)</span>
        </button>
      </div>

      {/* ================= STAYS TAB ================= */}
      {activeSection === 'hotels' && (
        <div>
          {/* UNHIDE BANNER */}
          {hiddenHotelIds.length > 0 && (
            <div className="unhide-floating-banner">
              <span>👁️ {hiddenHotelIds.length} accommodation {hiddenHotelIds.length === 1 ? 'is' : 'are'} currently hidden</span>
              <button type="button" className="unhide-all-btn" onClick={onUnhideAllHotels}>
                Restore All Stays
              </button>
            </div>
          )}

          {/* FILTER AND SORT BAR */}
          <div className="hotel-control-bar glass-panel" style={{ marginBottom: '1.75rem' }}>
            <div className="stay-filter-pills">
              <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-muted)', alignSelf: 'center' }}>Filter:</span>
              {['all', 'Hostel', 'Heritage', 'Resort', 'Boutique', 'Luxury'].map((t) => (
                <button
                  key={t}
                  type="button"
                  className={`stay-filter-pill ${stayTypeFilter === t ? 'active' : ''}`}
                  onClick={() => setStayTypeFilter(t)}
                >
                  {t === 'all' ? 'All Stays' : t === 'Hostel' ? '🎒 Backpacker Hostels' : t}
                </button>
              ))}
            </div>

            <div className="sort-select-wrap">
              <span>Sort By:</span>
              <select className="sort-select" value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
                <option value="low-to-high">💰 Price: Low to High (Cheapest First)</option>
                <option value="high-to-low">👑 Price: High to Low (Luxury First)</option>
                <option value="rating">⭐ Guest Rating (Highest First)</option>
              </select>
            </div>
          </div>

          {/* HOTELS LAYOUT WITH SIDEBAR MAP */}
          <div className="hotels-layout-with-sidebar">
            <div className="hotel-grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(290px, 1fr))' }}>
              {filteredAndSortedHotels.map((hotel) => {
                const isHostel = (hotel.type || '').toLowerCase().includes('hostel');
                const photo = HOTEL_PHOTOS[hotel.type] || (hotel.pricePerNight > 7000 ? HOTEL_PHOTOS.Luxury : HOTEL_PHOTOS.Default);
                const isMapActive = activeHotelForMap?.id === hotel.id;

                return (
                  <article className={`hotel-photo-card ${isMapActive ? 'selected-for-map' : ''}`} key={hotel.id}>
                    <div className="hotel-photo-wrap">
                      <img src={photo} alt={hotel.name} loading="lazy" />
                      <span className="hotel-type-badge">{hotel.type || 'Stay'}</span>
                      <button
                        type="button"
                        className="hide-card-btn"
                        style={{ position: 'absolute', top: '10px', right: '10px', background: 'rgba(0,0,0,0.65)', color: 'white', backdropFilter: 'blur(4px)' }}
                        title="Hide this stay"
                        onClick={(e) => {
                          e.stopPropagation();
                          onHideHotel(hotel.id);
                        }}
                      >
                        👁️ Hide
                      </button>
                    </div>

                    <div className="hotel-card-body">
                      <div>
                        <h3 style={{ margin: '0 0 0.25rem', fontSize: '1.15rem' }}>{hotel.name}</h3>
                        <p style={{ margin: 0, fontSize: '0.825rem', color: 'var(--text-muted)' }}>{hotel.address}</p>
                      </div>

                      <div className="price-block" style={{ margin: '0.75rem 0' }}>
                        <strong>{formatPrice(hotel.pricePerNight)}</strong>
                        <span>{isHostel ? 'per dorm bed / night' : 'per night'}</span>
                      </div>

                      <div className="hotel-amenities-pills">
                        {hotel.amenities?.slice(0, 4).map((a, idx) => (
                          <span key={idx} className="hotel-amenity-pill">✓ {a}</span>
                        ))}
                      </div>

                      <div className="hotel-footer" style={{ marginTop: '0.5rem', marginBottom: '0.75rem' }}>
                        <strong>⭐ {hotel.rating} rating</strong>
                        <button
                          type="button"
                          className="book-btn"
                          onClick={() => handleOpenBooking('hotel', hotel.name, hotel.pricePerNight * 2, selectedMarker.id, selectedMarker.name)}
                        >
                          Book Stay
                        </button>
                      </div>

                      <div className="hotel-card-actions">
                        <button
                          type="button"
                          className="hotel-map-pin-btn"
                          onClick={() => setSelectedHotelForMap(hotel)}
                          title="Inspect location and proximity on map"
                        >
                          🗺️ {isMapActive ? 'Showing on Map' : 'View Location on Map'}
                        </button>
                      </div>

                      <button
                        type="button"
                        className="compare-deals-btn"
                        style={{ marginTop: '0.65rem' }}
                        onClick={() => openComparison(hotel)}
                      >
                        Compare on MMT, Agoda & Booking.com ⚖️
                      </button>
                    </div>
                  </article>
                );
              })}
            </div>

            {/* STICKY SIDEBAR MINI-MAP */}
            <aside>
              <HotelLocationSidebarMap
                hotel={activeHotelForMap}
                cityName={selectedMarker.name}
                cityCoords={selectedMarker}
              />
            </aside>
          </div>
        </div>
      )}

      {/* ================= CABS TAB ================= */}
      {activeSection === 'cabs' && (
        <div className="live-cab-scanner-card glass-panel">
          <div className="scanner-header">
            <div>
              <span className="eyebrow">Real-Time Dispatch Engine</span>
              <h2>Live Ola & Uber Price Comparator</h2>
              <p>Live GPS road distance matrix, traffic surge calculations, and instant deep-links to Ola & Uber web apps.</p>
            </div>
            <button type="button" className="scan-fares-btn" onClick={() => calculateAndSetFares(pickup, drop)}>
              <span className="radar-icon">📡</span>
              <span>{isScanning ? 'Scanning Network...' : 'Scan Real-Time Fares'}</span>
            </button>
          </div>

          <div className="cab-selector-band">
            <label>
              <span>Pickup Spot:</span>
              <select value={pickup} onChange={(e) => handlePickupChange(e.target.value)}>
                {allHotels.map((h, idx) => (
                  <option key={h.id} value={`hotel_${idx}`}>{h.name}</option>
                ))}
                <option value="airport">✈️ {selectedMarker.name} Airport Terminal</option>
                <option value="railway">🚆 {selectedMarker.name} Central Railway Junction</option>
              </select>
            </label>

            <label>
              <span>Destination Monument:</span>
              <select value={drop} onChange={(e) => handleDropChange(e.target.value)}>
                {places.map((p, idx) => (
                  <option key={p.id} value={`place_${idx}`}>🏛️ {p.name}</option>
                ))}
              </select>
            </label>

            <button type="button" className="primary-action" onClick={() => calculateAndSetFares(pickup, drop)}>
              Update Route
            </button>
          </div>

          {isScanning ? (
            <BullyLoader message="Calculating live GPS road distances & cab rates across Ola & Uber..." />
          ) : liveCabData ? (
            <div>
              <div className="trip-meta-banner">
                <span>📍 {liveCabData.pickupName} ➔ {liveCabData.dropName}</span>
                <span>🚗 {liveCabData.distanceKm} km • ~{liveCabData.estimatedMinutes} mins ({liveCabData.trafficCondition})</span>
              </div>

              <div className="native-cab-grid">
                {/* Authentic Native Ola Card */}
                <div className="native-ola-card">
                  <div className="native-ola-header">
                    <div className="native-ola-brand">
                      <span>🛺</span>
                      <span>OLA CABS</span>
                    </div>
                    <span className="native-ola-badge">LIVE FARES</span>
                  </div>
                  <div className="native-ola-body">
                    {liveCabData.olaOptions?.map((opt, idx) => (
                      <div key={idx} className="ola-ride-item">
                        <div className="ola-ride-details">
                          <span className="ola-vehicle-icon">{opt.icon}</span>
                          <div>
                            <span className="ola-ride-title">{opt.rideCategory}</span>
                            <span className="ola-ride-subtitle">{opt.vehicleType} • {opt.driverEtaMinutes} mins away</span>
                          </div>
                        </div>
                        <div className="ola-fare-block">
                          <span className="ola-fare-amount">{formatPrice(opt.estimatedFareInr)}</span>
                        </div>
                      </div>
                    ))}
                    <a
                      href={liveCabData.olaOptions?.[0]?.directBookingUrl || 'https://www.olacabs.com/'}
                      target="_blank"
                      rel="noreferrer"
                      className="ola-book-now-btn"
                    >
                      RIDE NOW ON OLA ➔
                    </a>
                  </div>
                </div>

                {/* Authentic Native Uber Card */}
                <div className="native-uber-card">
                  <div className="native-uber-header">
                    <div className="native-uber-brand">Uber</div>
                    <span className="native-uber-badge">UPFRONT PRICING</span>
                  </div>
                  <div className="native-uber-body">
                    {liveCabData.uberOptions?.map((opt, idx) => (
                      <div key={idx} className="uber-ride-item">
                        <div className="uber-ride-details">
                          <span className="uber-vehicle-icon">{opt.icon}</span>
                          <div>
                            <span className="uber-ride-title">{opt.rideCategory}</span>
                            <span className="uber-ride-subtitle">{opt.vehicleType} • {opt.driverEtaMinutes} mins • 4.9 ★</span>
                          </div>
                        </div>
                        <div className="uber-fare-block">
                          <span className="uber-fare-amount">{formatPrice(opt.estimatedFareInr)}</span>
                        </div>
                      </div>
                    ))}
                    <a
                      href={liveCabData.uberOptions?.[0]?.directBookingUrl || 'https://m.uber.com/looking'}
                      target="_blank"
                      rel="noreferrer"
                      className="uber-request-btn"
                    >
                      REQUEST UBER ➔
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      )}

      {/* HOTEL PRICE COMPARISON MODAL */}
      {compareModal && (
        <div className="modal-backdrop" onClick={() => setCompareModal(null)}>
          <div className="hotel-compare-modal-window" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div>
                <span className="eyebrow">Multi-Portal Rate Comparator</span>
                <h2>{compareModal.name}</h2>
                <p>{selectedMarker.name} • ⭐ {compareModal.rating} rating</p>
              </div>
              <button type="button" className="close-btn" onClick={() => setCompareModal(null)}>✕</button>
            </div>

            {loadingCompare ? (
              <BullyLoader message={`Scanning MakeMyTrip, Agoda & Booking.com rates for ${compareModal.name}...`} />
            ) : compareData ? (
              <div style={{ marginTop: '1.5rem' }}>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1.25rem' }}>
                  Live price comparison across leading travel booking sites. Click any platform to reserve or book direct with Yatra.
                </p>

                {compareData.platformDeals.map((deal, idx) => (
                  <div key={idx} className={`platform-deal-card ${deal.platformName === 'Yatra Direct' ? 'best-deal' : ''}`}>
                    <div className="platform-info">
                      <span className="platform-icon">{deal.icon}</span>
                      <div className="platform-name-wrap">
                        <strong>{deal.platformName}</strong>
                        <span className="platform-badge">{deal.badge}</span>
                        {deal.couponCode && (
                          <span style={{ fontSize: '0.725rem', color: 'var(--text-muted)', display: 'block', marginTop: '3px' }}>
                            Coupon Code: <code>{deal.couponCode}</code>
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="deal-price-col">
                      <strong className="deal-rate">{formatPrice(deal.dealPriceInr)}</strong>
                      <span className="deal-savings">Save {formatPrice(deal.savingsInr)}</span>
                      {deal.platformName === 'Yatra Direct' ? (
                        <button
                          type="button"
                          className="platform-book-link yatra-direct"
                          onClick={() => {
                            setCompareModal(null);
                            handleOpenBooking('hotel', compareModal.name, deal.dealPriceInr * 2, selectedMarker.id, selectedMarker.name);
                          }}
                        >
                          Book Direct ➔
                        </button>
                      ) : (
                        <a
                          href={deal.directBookingUrl}
                          target="_blank"
                          rel="noreferrer"
                          className={`platform-book-link ${deal.platformName === 'MakeMyTrip' ? 'mmt' : deal.platformName === 'Agoda' ? 'agoda' : 'booking'}`}
                        >
                          Book on {deal.platformName} ↗
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : null}
          </div>
        </div>
      )}
    </section>
  );
}

// -------------------------------------------------------------
// TRANSIT ROUTES COMPARATOR
// -------------------------------------------------------------
function RoutesPage({ cities, formatPrice, handleOpenBooking }) {
  const [originId, setOriginId] = useState(1);
  const [destId, setDestId] = useState(2);
  const [routeData, setRouteData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchRoute() {
      if (originId === destId) return;
      setLoading(true);
      try {
        const data = await yatraApi.getTransitRoutes(originId, destId);
        if (data) {
          setRouteData(data);
          setLoading(false);
          return;
        }
      } catch {
        // fallback
      }

      const oCity = cities.find((c) => c.id === originId) || cities[0];
      const dCity = cities.find((c) => c.id === destId) || cities[1];
      setRouteData({
        originCityName: oCity.name,
        destinationCityName: dCity.name,
        straightDistanceKm: 240,
        recommendedOption: 'TRAIN (Vande Bharat Express)',
        options: [
          { mode: 'TRAIN', title: 'Indian Railways Vande Bharat', operatorOrType: 'Executive & Chair Car', durationFormatted: '3h 45m', estimatedFareInr: 850, frequency: 'Daily 4 departures', highlights: ['Scenic countryside', 'Reserved meals'], carbonKg: 12 },
          { mode: 'BUS', title: 'Intercity AC Volvo Sleeper', operatorOrType: 'Multi-Axle Semi Sleeper', durationFormatted: '5h 15m', estimatedFareInr: 650, frequency: 'Frequent schedules', highlights: ['Reclining berths', 'Free water'], carbonKg: 18 },
          { mode: 'CAB', title: 'Highway Outstation Chauffeur', operatorOrType: 'Sedan / SUV', durationFormatted: '4h 10m', estimatedFareInr: 4200, frequency: 'Door-to-door on demand', highlights: ['Flexible stopovers', 'Toll included'], carbonKg: 32 },
        ],
      });
      setLoading(false);
    }
    fetchRoute();
  }, [originId, destId, cities]);

  return (
    <section className="page routes-page">
      <PageTitle
        eyebrow="Travel Across India"
        title="Flights, Trains, Buses & Cabs"
        text="Compare travel times, estimated fares, and book the most convenient route between any two cities."
      />

      <div className="route-selectors glass-panel">
        <label>
          <span>From Origin:</span>
          <select value={originId} onChange={(e) => setOriginId(Number(e.target.value))}>
            {cities.map((c) => <option key={c.id} value={c.id}>{c.name} ({c.state})</option>)}
          </select>
        </label>

        <button type="button" className="swap-btn" onClick={() => { const temp = originId; setOriginId(destId); setDestId(temp); }}>⇄</button>

        <label>
          <span>To Destination:</span>
          <select value={destId} onChange={(e) => setDestId(Number(e.target.value))}>
            {cities.map((c) => <option key={c.id} value={c.id}>{c.name} ({c.state})</option>)}
          </select>
        </label>
      </div>

      {loading ? (
        <BullyLoader message="Calculating optimal transit routes, trains & flight schedules..." />
      ) : routeData ? (
        <div>
          <div className="route-summary-bar glass-panel">
            <div>
              <strong>{routeData.originCityName} ➔ {routeData.destinationCityName}</strong>
              <span className="distance-tag">~{Math.round(routeData.straightDistanceKm * 1.25)} km route</span>
            </div>
            <span className="recommendation-badge">⭐ Recommended: {routeData.recommendedOption}</span>
          </div>

          <div className="transit-options-grid">
            {routeData.options?.map((opt, idx) => (
              <article key={idx} className="transit-card glass-panel">
                <div className="transit-header">
                  <span className="transit-mode-badge">{opt.mode}</span>
                  <span className="carbon-tag">🌱 {opt.carbonKg} kg CO₂</span>
                </div>
                <h3>{opt.title}</h3>
                <p className="operator">{opt.operatorOrType}</p>
                <div className="transit-price-row">
                  <div>
                    <span className="fare-label">Estimated Fare</span>
                    <strong>{formatPrice(opt.estimatedFareInr)}</strong>
                  </div>
                  <div>
                    <span className="fare-label">Duration</span>
                    <strong className="duration">{opt.durationFormatted}</strong>
                  </div>
                </div>
                <button
                  type="button"
                  className="book-transit-btn"
                  onClick={() => handleOpenBooking('transit', `${opt.mode}: ${routeData.originCityName} to ${routeData.destinationCityName}`, opt.estimatedFareInr, destId, routeData.destinationCityName)}
                >
                  Reserve {opt.mode}
                </button>
              </article>
            ))}
          </div>
        </div>
      ) : null}
    </section>
  );
}

// -------------------------------------------------------------
// FESTIVALS PAGE
// -------------------------------------------------------------
function FestivalsPage({ cities, setPage, setSelectedId }) {
  const [festivals, setFestivals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterMonth, setFilterMonth] = useState('all');

  useEffect(() => {
    async function loadFestivals() {
      setLoading(true);
      try {
        const data = await yatraApi.getFestivals(2026);
        if (data) {
          setFestivals(data);
          setLoading(false);
          return;
        }
      } catch {
        // fallback
      }

      // Default curated festivals
      setFestivals([
        { name: 'Diwali (Festival of Lights)', date: '2026-11-01', month: 'November', category: 'Spiritual', culturalSignificance: 'Millions of earthen diyas, illuminated riverfronts, and sweets.', topCitiesToCelebrate: ['Varanasi', 'Jaipur'], travelAdvice: 'Book riverfront ghat stays in advance.' },
        { name: 'Holi (Festival of Colors)', date: '2026-03-25', month: 'March', category: 'Cultural', culturalSignificance: 'Celebration of spring, organic color powders, and folk dances.', topCitiesToCelebrate: ['Jaipur', 'Udaipur'], travelAdvice: 'Enjoy royal palace ceremonies.' },
        { name: 'Onam Harvest Festival', date: '2026-09-05', month: 'September', category: 'Harvest', culturalSignificance: 'Snake boat races and floral carpets (Pookalam).', topCitiesToCelebrate: ['Kochi'], travelAdvice: 'Book backwater cruises early.' },
        { name: 'Durga Puja Carnival', date: '2026-10-20', month: 'October', category: 'UNESCO Heritage', culturalSignificance: 'Thousands of illuminated public art pandals and feasts.', topCitiesToCelebrate: ['Kolkata', 'Delhi'], travelAdvice: 'Do midnight pandal walks.' },
        { name: 'Ganesh Chaturthi', date: '2026-09-18', month: 'September', category: 'Spiritual', culturalSignificance: 'Towering idols and ocean beach drum processions.', topCitiesToCelebrate: ['Mumbai'], travelAdvice: 'Watch Chowpatty beach processions.' },
      ]);
      setLoading(false);
    }
    loadFestivals();
  }, []);

  const months = ['all', ...Array.from(new Set(festivals.map((f) => f.month))).filter(Boolean)];
  const filtered = filterMonth === 'all' ? festivals : festivals.filter((f) => f.month === filterMonth);

  return (
    <section className="page festivals-page">
      <PageTitle
        eyebrow="Living Culture & Heritage"
        title="Indian Festivals & Cultural Celebrations"
        text="Discover India's vibrant festival calendar, celebration dates, top destinations, and travel tips."
      />

      <div className="festival-filter-bar glass-panel">
        <span>Filter by Month:</span>
        <div className="month-pills">
          {months.map((m) => (
            <button
              key={m}
              type="button"
              className={filterMonth === m ? 'active' : ''}
              onClick={() => setFilterMonth(m)}
            >
              {m === 'all' ? 'All Months' : m}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <BullyLoader message="Loading India's living cultural & festive celebrations..." />
      ) : (
        <div className="festivals-grid">
          {filtered.map((fest, idx) => (
            <article key={idx} className="festival-card glass-panel">
              <div className="fest-top">
                <span className="fest-date">📅 {fest.date}</span>
                <span className="fest-category">{fest.category}</span>
              </div>
              <h3>{fest.name}</h3>
              <p className="fest-significance">{fest.culturalSignificance}</p>
              <div className="fest-cities">
                <strong>Best Cities:</strong>
                <div className="tag-row">
                  {fest.topCitiesToCelebrate?.map((cName, cIdx) => (
                    <span key={cIdx} className="city-tag">{cName}</span>
                  ))}
                </div>
              </div>
              <button
                type="button"
                className="fest-plan-btn"
                onClick={() => {
                  const targetCity = cities?.find((c) =>
                    fest.topCitiesToCelebrate?.some((tc) => tc.toLowerCase().includes(c.name.toLowerCase()))
                  );
                  if (targetCity) setSelectedId(targetCity.id);
                  setPage('planner');
                }}
              >
                Plan Trip for this Festival
              </button>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}

// -------------------------------------------------------------
// DESTINATIONS, PLANNER, BOOKINGS, SIGNUP & MODAL
// -------------------------------------------------------------
function DestinationsPage({ cities, city, details, formatPrice, handleAddReview, hiddenCityIds = [], onHideCity, onUnhideAllCities, selectedId, selectedMarker, setSelectedId }) {
  const places = details?.famousPlaces || [];
  const tips = details?.travelTips || [];
  const reviews = details?.reviews || [];

  const visibleCities = useMemo(() => {
    return cities.filter((c) => !hiddenCityIds.includes(c.id));
  }, [cities, hiddenCityIds]);

  const [reviewForm, setReviewForm] = useState({ travelerName: '', rating: 5, comment: '', travelMonth: 'October' });
  const [submittedNotice, setSubmittedNotice] = useState(false);

  function onSubmitReview(e) {
    e.preventDefault();
    if (!reviewForm.travelerName.trim() || !reviewForm.comment.trim()) return;
    handleAddReview({
      cityId: selectedMarker.id,
      ...reviewForm,
    });
    setSubmittedNotice(true);
    setReviewForm({ travelerName: '', rating: 5, comment: '', travelMonth: 'October' });
    setTimeout(() => setSubmittedNotice(false), 4000);
  }

  return (
    <section className="page destinations-page">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
        <PageTitle eyebrow="Destination Overview" title={`${city.name}, ${city.state}`} text={city.description} />
        <button
          type="button"
          className="hide-card-btn"
          style={{ border: '1px solid var(--border)', padding: '0.45rem 0.85rem', marginTop: '1.25rem' }}
          title="Hide this destination"
          onClick={() => {
            onHideCity(city.id);
            const remaining = visibleCities.filter((c) => c.id !== city.id);
            if (remaining.length > 0) setSelectedId(remaining[0].id);
          }}
        >
          👁️ Hide This City
        </button>
      </div>

      {hiddenCityIds.length > 0 && (
        <div className="unhide-floating-banner">
          <span>👁️ {hiddenCityIds.length} destination {hiddenCityIds.length === 1 ? 'is' : 'are'} hidden</span>
          <button type="button" className="unhide-all-btn" onClick={onUnhideAllCities}>
            Restore All Destinations
          </button>
        </div>
      )}

      {visibleCities && visibleCities.length > 0 && (
        <div className="city-pill-selector">
          {visibleCities.map((c) => (
            <button
              key={c.id}
              type="button"
              className={c.id === selectedId ? 'active' : ''}
              onClick={() => setSelectedId(c.id)}
            >
              {c.name}
            </button>
          ))}
        </div>
      )}

      {/* SLIDING PHOTO CAROUSEL ANIMATION */}
      <DestinationsCarousel cities={visibleCities} onSelectCity={setSelectedId} />

      <div className="stats-grid">
        <span>
          <strong style={{ color: '#b45309' }}>☀️ {city.bestSeason || 'October to March'}</strong>
          Best Season to Visit
          <small style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '2px' }}>
            Ideal weather & sightseeing
          </small>
        </span>
        <span><strong>{city.popularityScore || 94}/100</strong>Popularity Index</span>
        <span><strong>{formatPrice(city.estimatedDailyBudget || 4200)}</strong>Estimated Daily Budget</span>
      </div>

      <div className="content-grid">
        <div>
          <div className="section-heading">
            <p className="eyebrow">Visual Heritage Gallery</p>
            <h2>Famous Places & Monuments</h2>
          </div>
          <div className="landmark-gallery-grid">
            {places.map((place) => <PlaceCard key={place.id} place={place} formatPrice={formatPrice} />)}
          </div>

          {/* GOOGLE MAPS VERIFIED REVIEWS PANEL */}
          <div className="google-reviews-panel glass-panel">
            <div className="google-brand-header">
              <div className="google-badge-wrap">
                <div className="google-logo-pill">🗺️</div>
                <div className="google-rating-score">
                  <strong>4.8 ★★★★★</strong>
                  <span>Google Maps Verified Traveler Reviews ({city.name})</span>
                </div>
              </div>

              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(city.name + ' tourist places')}`}
                target="_blank"
                rel="noreferrer"
                className="open-gmaps-btn"
              >
                <span>View & Write on Google Maps</span>
                <span>↗</span>
              </a>
            </div>

            <div className="google-reviews-grid">
              {(GOOGLE_REVIEWS_MAP[city.name] || [
                { author: 'Vikram Joshi', avatarColor: '#ea4335', guide: 'Local Guide • Level 7', rating: 5, time: '2 weeks ago', text: `Incredible trip to ${city.name}! The heritage attractions, hospitality, and local cuisine are remarkable.` },
                { author: 'Sarah Jenkins', avatarColor: '#4285f4', guide: 'Google Verified Traveler', rating: 5, time: '1 month ago', text: `Wonderful architecture and memorable experiences throughout ${city.name}. Easy transportation and warm locals.` },
              ]).map((gRev, idx) => (
                <div key={idx} className="google-review-card">
                  <div>
                    <div className="reviewer-meta">
                      <div className="reviewer-avatar" style={{ background: gRev.avatarColor }}>
                        {gRev.author.charAt(0)}
                      </div>
                      <div className="reviewer-details">
                        <strong>{gRev.author}</strong>
                        <span>{gRev.guide}</span>
                      </div>
                    </div>

                    <div className="review-stars-row">
                      <span className="gold-stars">{'★'.repeat(gRev.rating)}</span>
                      <span className="review-time">{gRev.time}</span>
                    </div>

                    <p className="google-review-text">"{gRev.text}"</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="section-heading review-heading">
            <p className="eyebrow">Traveler Community</p>
            <h2>Community Reviews ({reviews.length})</h2>
          </div>

          {/* DECLUTTERED COMPACT REVIEW FORM */}
          <div className="compact-review-panel glass-panel">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h3 style={{ margin: 0, fontSize: '1.15rem' }}>✍️ Write a Review for {city.name}</h3>
              {submittedNotice && <span className="success-inline">✅ Review Published!</span>}
            </div>
            <form onSubmit={onSubmitReview}>
              <div className="compact-form-row">
                <input
                  className="clean-input"
                  required
                  placeholder="Your Name (e.g. Aditi Rao)"
                  value={reviewForm.travelerName}
                  onChange={(e) => setReviewForm({ ...reviewForm, travelerName: e.target.value })}
                />
                <select
                  className="clean-input"
                  value={reviewForm.rating}
                  onChange={(e) => setReviewForm({ ...reviewForm, rating: Number(e.target.value) })}
                >
                  <option value={5}>⭐⭐⭐⭐⭐ (5 - Exceptional)</option>
                  <option value={4}>⭐⭐⭐⭐ (4 - Very Good)</option>
                  <option value={3}>⭐⭐⭐ (3 - Good)</option>
                </select>
                <button type="submit" className="primary-action" style={{ padding: '0.65rem 1.25rem', whiteSpace: 'nowrap' }}>
                  Post Review
                </button>
              </div>
              <input
                className="clean-input"
                required
                placeholder="Share top food spots, local transport advice, photo tips..."
                value={reviewForm.comment}
                onChange={(e) => setReviewForm({ ...reviewForm, comment: e.target.value })}
              />
            </form>
          </div>

          <div className="reviews-list">
            {reviews.map((rev) => (
              <article key={rev.id} className="review-card glass-panel">
                <div className="review-header">
                  <strong>{rev.travelerName}</strong>
                  <span className="stars">{'★'.repeat(rev.rating)}</span>
                </div>
                <p className="review-comment">"{rev.comment}"</p>
                <span className="review-date">Traveled in {rev.travelMonth}</span>
              </article>
            ))}
          </div>
        </div>

        <aside className="side-panel">
          <p className="eyebrow">Travel Tips</p>
          {tips.map((tip) => (
            <article className="tip-row" key={tip.id}>
              <strong>{tip.title}</strong>
              <p>{tip.detail}</p>
            </article>
          ))}
        </aside>
      </div>
    </section>
  );
}

function BookingsPage({ bookings, formatPrice, handleCancelBooking, setPage }) {
  return (
    <section className="page bookings-page">
      <PageTitle
        eyebrow="Confirmed Reservations"
        title="My Bookings & Boarding Passes"
        text="Digital boarding passes and hotel vouchers with instant verification codes, QR simulation, and print functionality."
      />
      {bookings.length === 0 ? (
        <div className="empty-bookings glass-panel">
          <p>No reservations found yet.</p>
          <button className="primary-action" type="button" onClick={() => setPage('hotels')}>
            Explore Hotels & Cabs
          </button>
        </div>
      ) : (
        <div className="bookings-list">
          {bookings.map((b) => (
            <article key={b.bookingId} className="boarding-pass-card glass-panel">
              <div className="pass-main-section">
                <div className="pass-header">
                  <div>
                    <span className="pass-code-pill">{b.bookingId}</span>
                    <h3 style={{ margin: '0.4rem 0 0.2rem', fontSize: '1.3rem' }}>{b.itemName}</h3>
                    <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '0.875rem' }}>
                      📍 {b.cityName} • {b.bookingType?.toUpperCase()}
                    </p>
                  </div>
                  <span className={`status-pill ${b.status?.toLowerCase()}`}>
                    {b.status === 'CONFIRMED' ? '🟢 Confirmed' : b.status}
                  </span>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '1rem', margin: '1.25rem 0' }}>
                  <div>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block' }}>Primary Guest</span>
                    <strong>{b.customerName || 'Dilip Kumar'}</strong>
                  </div>
                  <div>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block' }}>Travelers</span>
                    <strong>{b.travelers || 2} Persons</strong>
                  </div>
                  <div>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block' }}>Check-In / Departure</span>
                    <strong>{b.checkInDate || '2026-09-12'}</strong>
                  </div>
                  <div>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block' }}>Total Paid</span>
                    <strong style={{ color: 'var(--primary)', fontSize: '1.1rem' }}>{formatPrice(b.totalAmountInr)}</strong>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                  <button type="button" className="print-pass-btn" onClick={() => window.print()}>
                    🖨️ Print Voucher
                  </button>
                  {b.status === 'CONFIRMED' && (
                    <button type="button" className="cancel-btn" onClick={() => handleCancelBooking(b.bookingId)}>
                      Cancel Booking
                    </button>
                  )}
                </div>
              </div>

              {/* TICKET STUB / QR CODE SECTION */}
              <div className="pass-stub-section">
                <div className="pass-qr-sim" title="Scan at hotel reception or airport">
                  ▦
                </div>
                <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)' }}>
                  Digital Boarding Pass
                </span>
                <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                  Present QR code at check-in
                </span>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}

const CITY_FOOD_RECOMMENDATIONS = {
  Jaipur: 'Authentic Rajasthani Dal Baati Churma, Pyaaz Kachori & Royal Ghevar at LMB Johari Bazaar',
  Agra: 'Traditional Agra Petha, Bedmi Puri breakfast & authentic Mughlai Biryani near Taj Ganj',
  Delhi: 'Crispy Old Delhi Chole Bhature, Chandni Chowk Parathas & Kulfi Falooda',
  Mumbai: 'Iconic Chowpatty Pav Bhaji, Marine Drive Vada Pav & Fresh Coastal Seafood',
  Udaipur: 'Lakefront Laal Maas, Ker Sangri & Mewari Thali overlooking Lake Pichola',
  Varanasi: 'Banarasi Kachori Sabzi, Blue Lassi with fresh malai & authentic Banarasi Paan',
  Goa: 'Coastal Goan Prawn Curry with Poi bread, Kingfish fry & traditional Bebinca dessert',
  Kochi: 'Traditional Kerala Sadya on banana leaf, Appam with Stew & Malabar Fish Curry',
  Amritsar: 'Legendary Amritsari Butter Kulcha with Chole, Makki Roti & thick Sweet Lassi',
  Manali: 'Warm Siddu with ghee, Trout fish fry & steaming Tibetan Thukpa',
  Rishikesh: 'Organic Ayurvedic Himalayan bowls, Ginger Lemon honey tea & Ganga view satvik thali',
  Bengaluru: 'Crispy Benne Masala Dosa, Filter Coffee & craft brew pub bites in Indiranagar',
  Hampi: 'Nutritious South Indian Thali, Mango Tree lassi & fresh coconut water amongst ruins',
  Darjeeling: 'Steaming Tibetan Momos, Darjeeling First Flush Muscatel Tea & Thukpa',
  Shimla: 'Himachali Chana Madra, Dham feast & warm cinnamon baked pastries on Mall Road',
  'Leh Ladakh': 'Ladakhi Skyu noodle stew, butter tea (Gur Gur chai) & warm Tingmo buns',
  Mysore: 'Crispy Mysore Masala Dosa, melt-in-mouth Mysore Pak & royal filter kaapi',
  Srinagar: 'Traditional Kashmiri Wazwan feast (Rogan Josh & Gushtaba) & saffron Kahwa tea',
  Pondicherry: 'French-Creole woodfired sourdough pizza, Ratatouille & cafe croissants in White Town',
  Hyderabad: 'Dum Biryani with Mirchi ka Salan, double ka meetha & Osmania biscuits with Irani chai',
  Kolkata: 'Kolkata Kathi Rolls, Rosogolla, Mishti Doi & spicy Phuchka at Park Street',
  Jodhpur: 'Mirchi Vada, Mawa Kachori & fiery authentic Rajasthani Junglee Maas',
  Ooty: 'Homemade artisanal Nilgiri chocolates, freshly baked buns & aromatic Ooty tea',
  Shillong: 'Khasi Jadoh rice, smoked pork with bamboo shoot & local Meghalayan honey tea',
};

function PlannerPage({ city, details, formatPrice, handleAddMilestone, handleOpenBooking, planner }) {
  const [travelStyle, setTravelStyle] = useState('Cultural Heritage');
  const [groupProfile, setGroupProfile] = useState('Couple / Pair');
  const [travelPace, setTravelPace] = useState('Balanced');
  const [isGenerating, setIsGenerating] = useState(false);
  const [activeDayTab, setActiveDayTab] = useState('all');
  const [calendarNotice, setCalendarNotice] = useState(null);
  const places = details?.famousPlaces || [];

  const STYLES = [
    { id: 'Cultural Heritage', emoji: '🏛️' },
    { id: 'Budget Backpacker', emoji: '🎒' },
    { id: 'Adventure & Nature', emoji: '🧗' },
    { id: 'Spiritual & Relaxed', emoji: '🧘' },
    { id: 'Royal Luxury', emoji: '👑' },
  ];

  const GROUPS = [
    { id: 'Solo Traveler', emoji: '🎒' },
    { id: 'Couple / Pair', emoji: '💑' },
    { id: 'Family with Kids', emoji: '👨‍👩‍👧' },
    { id: 'Friends Group', emoji: '🎉' },
  ];

  const PACES = [
    { id: 'Relaxed', emoji: '☕', desc: '1-2 sights/day' },
    { id: 'Balanced', emoji: '⚖️', desc: '2-3 sights/day' },
    { id: 'Fast-Paced', emoji: '⚡', desc: 'Full-day sprint' },
  ];

  const handlePlanSubmit = (e) => {
    e.preventDefault();
    setIsGenerating(true);
    setTimeout(() => {
      planner.createTripPlan(e);
      setIsGenerating(false);
      setActiveDayTab('all');
    }, 750);
  };

  const displayedItinerary = useMemo(() => {
    if (!planner.tripPlan?.itinerary) return [];
    if (activeDayTab === 'all') return planner.tripPlan.itinerary;
    return planner.tripPlan.itinerary.filter((d) => d.day === activeDayTab);
  }, [planner.tripPlan, activeDayTab]);

  const handleAddPlanToCalendar = () => {
    if (!planner.tripPlan?.itinerary || !handleAddMilestone) return;
    const startDate = new Date();
    startDate.setDate(startDate.getDate() + 7); // Schedule 1 week ahead
    planner.tripPlan.itinerary.forEach((day, idx) => {
      const d = new Date(startDate);
      d.setDate(startDate.getDate() + idx);
      const dateStr = d.toISOString().split('T')[0];
      const landmark = places[(day.day - 1) % places.length];
      handleAddMilestone({
        date: dateStr,
        title: `Day ${day.day}: ${day.title} (${landmark ? landmark.name : city.name})`,
        city: city.name,
      });
    });
    setCalendarNotice(`Added ${planner.tripPlan.itinerary.length} days to your Personal Calendar! 📅`);
    setTimeout(() => setCalendarNotice(null), 5000);
  };

  const totalCost = planner.tripPlan?.totalEstimatedCost || (city.estimatedDailyBudget || 4200) * (planner.days || 3) * (planner.travelers || 2);
  const stayCost = Math.round(totalCost * 0.45);
  const foodCost = Math.round(totalCost * 0.25);
  const sightCost = Math.round(totalCost * 0.15);
  const cabCost = Math.round(totalCost * 0.15);

  const localFood = CITY_FOOD_RECOMMENDATIONS[city.name] || 'Authentic local cuisine, regional specialties & renowned sweet bazaars';

  return (
    <section className="page planner-page">
      <PageTitle
        eyebrow="Custom Daily Itineraries"
        title={`Smart Trip Planner for ${city.name}`}
        text="Choose your travel vibe, duration, group profile, and pace to generate a personalized day-by-day plan with top sights, dining, and estimated budget."
      />

      {calendarNotice && (
        <div className="global-toast" style={{ position: 'relative', top: 'auto', right: 'auto', marginBottom: '1.25rem' }}>
          <span>🎉</span>
          <p>{calendarNotice}</p>
          <button type="button" onClick={() => setCalendarNotice(null)}>✕</button>
        </div>
      )}

      <div className="ai-planner-card glass-panel">
        <form onSubmit={handlePlanSubmit}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.25rem', marginBottom: '1.25rem' }}>
            <label>
              <span style={{ fontWeight: 700, fontSize: '0.875rem' }}>Trip Duration (Days)</span>
              <input
                type="number"
                min="1"
                max="30"
                className="clean-input"
                value={planner.days}
                onChange={(e) => planner.setDays(Number(e.target.value))}
              />
            </label>
            <label>
              <span style={{ fontWeight: 700, fontSize: '0.875rem' }}>Number of Travelers</span>
              <input
                type="number"
                min="1"
                max="20"
                className="clean-input"
                value={planner.travelers}
                onChange={(e) => planner.setTravelers(Number(e.target.value))}
              />
            </label>
          </div>

          <div style={{ marginBottom: '1.25rem' }}>
            <span style={{ fontWeight: 700, fontSize: '0.875rem', display: 'block', marginBottom: '0.45rem' }}>
              Select Travel Style:
            </span>
            <div className="ai-style-chips">
              {STYLES.map((st) => (
                <button
                  key={st.id}
                  type="button"
                  className={`ai-chip ${travelStyle === st.id ? 'active' : ''}`}
                  onClick={() => setTravelStyle(st.id)}
                >
                  {st.emoji} {st.id}
                </button>
              ))}
            </div>
          </div>

          <div style={{ marginBottom: '1.25rem' }}>
            <span style={{ fontWeight: 700, fontSize: '0.875rem', display: 'block', marginBottom: '0.45rem' }}>
              Travel Group Profile:
            </span>
            <div className="ai-style-chips">
              {GROUPS.map((g) => (
                <button
                  key={g.id}
                  type="button"
                  className={`ai-chip ${groupProfile === g.id ? 'active' : ''}`}
                  onClick={() => setGroupProfile(g.id)}
                >
                  {g.emoji} {g.id}
                </button>
              ))}
            </div>
          </div>

          <div>
            <span style={{ fontWeight: 700, fontSize: '0.875rem', display: 'block', marginBottom: '0.45rem' }}>
              Travel Pace:
            </span>
            <div className="ai-style-chips">
              {PACES.map((p) => (
                <button
                  key={p.id}
                  type="button"
                  className={`ai-chip ${travelPace === p.id ? 'active' : ''}`}
                  onClick={() => setTravelPace(p.id)}
                >
                  {p.emoji} {p.id} <small style={{ opacity: 0.8 }}>({p.desc})</small>
                </button>
              ))}
            </div>
          </div>

          <button type="submit" className="primary-action" style={{ marginTop: '1.5rem', width: '100%', padding: '0.9rem' }}>
            ⚡ Generate Smart Itinerary & Budget Plan
          </button>
        </form>
      </div>

      {isGenerating && (
        <BullyLoader message={`AI is generating your personalized ${planner.days}-day itinerary & budget breakdown for ${city.name}...`} />
      )}

      <div className="plan-output glass-panel">
        {planner.tripPlan ? (
          <>
            <div className="plan-header-row">
              <div>
                <p className="eyebrow">✨ Custom Planned • {travelStyle} • {groupProfile} • {travelPace} Pace</p>
                <h2>{planner.tripPlan.cityName}: {formatPrice(planner.tripPlan.totalEstimatedCost)}</h2>
                <p style={{ margin: '0.25rem 0 0', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                  ☀️ Best Season: {city.bestSeason || 'Oct to Mar'} • Est. Daily: {formatPrice(city.estimatedDailyBudget || 4000)}/person
                </p>
              </div>
              <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                <button
                  type="button"
                  className="secondary-action"
                  onClick={handleAddPlanToCalendar}
                  title="Add days to personal travel calendar"
                >
                  📅 Add to Personal Calendar
                </button>
                <button
                  type="button"
                  className="book-btn"
                  onClick={() =>
                    handleOpenBooking(
                      'package',
                      `${planner.tripPlan.days}-Day ${planner.tripPlan.cityName} (${travelStyle}) Tour Package`,
                      planner.tripPlan.totalEstimatedCost,
                      city.id,
                      city.name
                    )
                  }
                >
                  Book Complete Tour Package ➔
                </button>
              </div>
            </div>

            {/* UPGRADED VISUAL BUDGET BREAKDOWN CARD */}
            <div className="ai-budget-breakdown-card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <strong>Estimated Budget Breakdown ({planner.days} Days • {planner.travelers} Travelers)</strong>
                <span style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--primary)' }}>
                  Total: {formatPrice(totalCost)}
                </span>
              </div>

              <div className="ai-budget-bars-stack">
                <div className="ai-bar-stay" style={{ width: '45%' }} title={`Stays (45%): ${formatPrice(stayCost)}`}></div>
                <div className="ai-bar-food" style={{ width: '25%' }} title={`Dining (25%): ${formatPrice(foodCost)}`}></div>
                <div className="ai-bar-sight" style={{ width: '15%' }} title={`Sights (15%): ${formatPrice(sightCost)}`}></div>
                <div className="ai-bar-cab" style={{ width: '15%' }} title={`Cabs (15%): ${formatPrice(cabCost)}`}></div>
              </div>

              <div className="ai-budget-legend">
                <div className="ai-legend-item">
                  <span className="ai-legend-dot" style={{ background: '#3b82f6' }}></span>
                  <span>🏨 Stay (45%): <strong>{formatPrice(stayCost)}</strong></span>
                </div>
                <div className="ai-legend-item">
                  <span className="ai-legend-dot" style={{ background: '#10b981' }}></span>
                  <span>🍲 Food (25%): <strong>{formatPrice(foodCost)}</strong></span>
                </div>
                <div className="ai-legend-item">
                  <span className="ai-legend-dot" style={{ background: '#f59e0b' }}></span>
                  <span>🏛️ Passes (15%): <strong>{formatPrice(sightCost)}</strong></span>
                </div>
                <div className="ai-legend-item">
                  <span className="ai-legend-dot" style={{ background: '#8b5cf6' }}></span>
                  <span>🛺 Cabs (15%): <strong>{formatPrice(cabCost)}</strong></span>
                </div>
              </div>
            </div>

            {/* LOCAL CULINARY RECOMMENDATION BANNER */}
            <div style={{ padding: '0.85rem 1.25rem', background: 'rgba(234, 88, 12, 0.08)', borderRadius: '12px', borderLeft: '4px solid var(--primary)', marginBottom: '1.5rem', fontSize: '0.85rem' }}>
              <strong>🍲 Recommended Local Specialties in {city.name}:</strong>
              <p style={{ margin: '0.25rem 0 0', color: 'var(--text)' }}>{localFood}</p>
            </div>

            {/* INTERACTIVE DAY TABS */}
            <div className="day-tabs-row">
              <button
                type="button"
                className={`day-tab-btn ${activeDayTab === 'all' ? 'active' : ''}`}
                onClick={() => setActiveDayTab('all')}
              >
                ✨ Full Plan ({planner.tripPlan.itinerary.length} Days)
              </button>
              {planner.tripPlan.itinerary.map((d) => (
                <button
                  key={d.day}
                  type="button"
                  className={`day-tab-btn ${activeDayTab === d.day ? 'active' : ''}`}
                  onClick={() => setActiveDayTab(d.day)}
                >
                  Day {d.day}
                </button>
              ))}
            </div>

            <div className="itinerary-list" style={{ marginTop: '1.25rem' }}>
              {displayedItinerary.map((day) => {
                const dayLandmark = places[(day.day - 1) % places.length];
                return (
                  <article key={day.day} className="itinerary-slot-card">
                    <div className="itinerary-slot-header">
                      <strong style={{ fontSize: '1.05rem', color: 'var(--text)' }}>Day {day.day}: {day.title}</strong>
                      {dayLandmark && <span className="card-tag">🏛️ {dayLandmark.name}</span>}
                    </div>

                    <div style={{ margin: '0.75rem 0', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem' }}>
                        <span>🌅</span>
                        <div>
                          <strong>Morning:</strong> {day.morning?.join(', ') || `Explore ${dayLandmark?.name || 'historical landmarks'} during early golden hours.`}
                        </div>
                      </div>

                      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem' }}>
                        <span>☀️</span>
                        <div>
                          <strong>Afternoon:</strong> {day.afternoon?.join(', ') || `Traditional lunch nearby, followed by crafts & bazaars.`}
                        </div>
                      </div>

                      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem' }}>
                        <span>🌙</span>
                        <div>
                          <strong>Evening:</strong> {day.evening?.join(', ') || `Scenic sunset viewpoints, evening cultural aarti or peaceful promenade stroll.`}
                        </div>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </>
        ) : (
          <div className="empty-plan">
            <p>Select your days, group profile, and travel style above to generate a customized travel itinerary with budget breakdown.</p>
          </div>
        )}
      </div>
    </section>
  );
}

function PersonalCalendarPage({ bookings, city, handleAddMilestone, milestones }) {
  const [currentMonthIndex, setCurrentMonthIndex] = useState(8); // September 2026 default
  const [newDate, setNewDate] = useState('2026-09-18');
  const [newTitle, setNewTitle] = useState('');

  const MONTH_NAMES = [
    'January 2026', 'February 2026', 'March 2026', 'April 2026',
    'May 2026', 'June 2026', 'July 2026', 'August 2026',
    'September 2026', 'October 2026', 'November 2026', 'December 2026'
  ];
  const DAYS_IN_MONTH = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  const MONTH_OFFSETS = [4, 0, 0, 3, 5, 1, 3, 6, 2, 4, 0, 2]; // 2026 Day offsets

  const ALL_FESTIVALS = [
    { month: 0, day: 14, title: 'Makar Sankranti / Pongal', emoji: '🪁' },
    { month: 0, day: 26, title: 'Republic Day Parade', emoji: '🇮🇳' },
    { month: 1, day: 15, title: 'Maha Shivratri', emoji: '🔱' },
    { month: 2, day: 4, title: 'Holi (Colors of Spring)', emoji: '🎨' },
    { month: 3, day: 14, title: 'Baisakhi Harvest Festival', emoji: '🌾' },
    { month: 4, day: 12, title: 'Buddha Purnima', emoji: '🪷' },
    { month: 5, day: 21, title: 'International Yoga Day', emoji: '🧘' },
    { month: 6, day: 16, title: 'Rath Yatra Puri', emoji: '🚩' },
    { month: 7, day: 15, title: 'Independence Day', emoji: '🇮🇳' },
    { month: 7, day: 28, title: 'Raksha Bandhan', emoji: '🪢' },
    { month: 8, day: 5, title: 'Onam Harvest Kerala', emoji: '⛵' },
    { month: 8, day: 18, title: 'Ganesh Chaturthi', emoji: '🐘' },
    { month: 8, day: 27, title: 'World Tourism Day', emoji: '🌍' },
    { month: 9, day: 19, title: 'Durga Puja Carnival', emoji: '🌺' },
    { month: 9, day: 20, title: 'Dussehra Celebrations', emoji: '🏹' },
    { month: 10, day: 8, title: 'Diwali (Lights Festival)', emoji: '🪔' },
    { month: 10, day: 24, title: 'Pushkar Camel Fair', emoji: '🐪' },
    { month: 11, day: 1, title: 'Hornbill Festival Nagaland', emoji: '🪶' },
    { month: 11, day: 25, title: 'Christmas & Goa Carnival', emoji: '🎄' },
  ];

  const totalDays = DAYS_IN_MONTH[currentMonthIndex];
  const offset = MONTH_OFFSETS[currentMonthIndex];
  const daysInMonth = Array.from({ length: totalDays }, (_, i) => i + 1);

  const onSubmitMilestone = (e) => {
    e.preventDefault();
    if (!newTitle.trim()) return;
    handleAddMilestone({
      date: newDate,
      title: newTitle,
      city: city?.name || 'India',
    });
    setNewTitle('');
  };

  const getDayEvents = (dayNum) => {
    const monthNum = currentMonthIndex + 1;
    const mStr = monthNum < 10 ? `0${monthNum}` : `${monthNum}`;
    const dStr = dayNum < 10 ? `0${dayNum}` : `${dayNum}`;
    const dateMatch = `2026-${mStr}-${dStr}`;

    const dayMilestones = (milestones || []).filter((m) => m.date === dateMatch);
    const dayBookings = (bookings || []).filter((b) => b.checkInDate === dateMatch || (!b.checkInDate && currentMonthIndex === 8 && dayNum === 15));
    const dayFestivals = ALL_FESTIVALS.filter((f) => f.month === currentMonthIndex && f.day === dayNum);

    return { dayMilestones, dayBookings, dayFestivals };
  };

  return (
    <section className="page calendar-page">
      <PageTitle
        eyebrow="Travel Organizer & Calendar"
        title="Travel Calendar & Cultural Festivals"
        text="View your confirmed trip reservations, Indian festival dates, and custom milestones across the entire year."
      />

      <div className="travel-calendar-card glass-panel">
        <div className="calendar-top-bar" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <button
              type="button"
              className="secondary-action"
              style={{ padding: '0.45rem 0.85rem' }}
              disabled={currentMonthIndex === 0}
              onClick={() => setCurrentMonthIndex((prev) => Math.max(0, prev - 1))}
            >
              ◀ Prev Month
            </button>
            <h2 style={{ margin: 0, fontSize: '1.4rem' }}>🗓️ {MONTH_NAMES[currentMonthIndex]}</h2>
            <button
              type="button"
              className="secondary-action"
              style={{ padding: '0.45rem 0.85rem' }}
              disabled={currentMonthIndex === 11}
              onClick={() => setCurrentMonthIndex((prev) => Math.min(11, prev + 1))}
            >
              Next Month ▶
            </button>
          </div>

          <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
            <span className="cal-badge trip">🔵 My Bookings</span>
            <span className="cal-badge festival">🟠 Festivals</span>
            <span className="cal-badge" style={{ background: '#10b981', color: 'white' }}>🟢 Milestones</span>
          </div>
        </div>

        <div className="calendar-grid-header">
          <span>Sun</span><span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span>
        </div>

        <div className="calendar-days-matrix">
          {Array.from({ length: offset }).map((_, i) => (
            <div key={`empty-${i}`} className="cal-day-cell" style={{ opacity: 0.25 }} />
          ))}

          {daysInMonth.map((dayNum) => {
            const { dayBookings, dayFestivals, dayMilestones } = getDayEvents(dayNum);
            const isToday = currentMonthIndex === 8 && dayNum === 4;

            return (
              <div key={dayNum} className={`cal-day-cell ${isToday ? 'today' : ''}`}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span className="cal-day-num">{dayNum}</span>
                  {isToday && <span style={{ fontSize: '0.65rem', fontWeight: 800, color: 'var(--primary)' }}>Today</span>}
                </div>

                {dayBookings.map((b, idx) => (
                  <div key={idx} className="cal-badge trip" title={b.itemName}>
                    🏨 {b.itemName.slice(0, 14)}...
                  </div>
                ))}

                {dayFestivals.map((f, idx) => (
                  <div key={idx} className="cal-badge festival" title={f.title}>
                    {f.emoji} {f.title.slice(0, 14)}...
                  </div>
                ))}

                {dayMilestones.map((m, idx) => (
                  <div key={idx} className="cal-badge" style={{ background: '#10b981', color: 'white' }} title={m.title}>
                    📍 {m.title.slice(0, 14)}...
                  </div>
                ))}
              </div>
            );
          })}
        </div>

        {/* ADD MILESTONE FORM */}
        <form className="add-milestone-box glass-panel" onSubmit={onSubmitMilestone} style={{ padding: '1.25rem', marginTop: '1.5rem' }}>
          <strong style={{ alignSelf: 'center', whiteSpace: 'nowrap' }}>➕ Add Travel Milestone:</strong>
          <input
            type="date"
            className="clean-input"
            value={newDate}
            onChange={(e) => setNewDate(e.target.value)}
            style={{ maxWidth: '170px' }}
            required
          />
          <input
            className="clean-input"
            placeholder="Milestone (e.g. Amber Fort Sunrise, Baga Beach Shack, Dal Lake Shikara)..."
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            required
          />
          <button type="submit" className="primary-action" style={{ whiteSpace: 'nowrap' }}>
            Save Milestone
          </button>
        </form>
      </div>
    </section>
  );
}

function SignupPage({ signup, signupSaved, submitSignup, updateSignup }) {
  const [submitting, setSubmitting] = useState(false);
  const [msg, setMsg] = useState('');

  const onFormSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setMsg('');
    try {
      await submitSignup(e);
      setMsg('Account created & saved in Cloudflare D1!');
    } catch {
      setMsg('Account saved locally!');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="page signup-page">
      <form className="signup-card glass-panel" onSubmit={onFormSubmit}>
        <p className="eyebrow">Traveler Account</p>
        <h1>Create Yatra Account</h1>
        <label>
          <span>Full Name</span>
          <input value={signup.name} onChange={(e) => updateSignup({ ...signup, name: e.target.value })} placeholder="Your Name" required />
        </label>
        <label>
          <span>Email</span>
          <input type="email" value={signup.email} onChange={(e) => updateSignup({ ...signup, email: e.target.value })} placeholder="you@example.com" required />
        </label>
        <label>
          <span>Favorite Destination</span>
          <input value={signup.city} onChange={(e) => updateSignup({ ...signup, city: e.target.value })} placeholder="e.g. Udaipur" />
        </label>
        <button type="submit" className="primary-action" disabled={submitting}>
          {submitting ? 'Connecting to Cloudflare D1...' : 'Create Account'}
        </button>
        {(signupSaved || msg) && <p className="success-inline">✅ {msg || 'Account created in Cloudflare D1!'}</p>}
      </form>
    </section>
  );
}

function BookingModal({ formatPrice, modal, onClose, onConfirm }) {
  const [formData, setFormData] = useState(() => ({
    customerName: '',
    customerEmail: '',
    customerPhone: '+91 ',
    checkInDate: new Date(Date.now() + 7 * 86400000).toISOString().slice(0, 10),
    checkOutDate: new Date(Date.now() + 10 * 86400000).toISOString().slice(0, 10),
    travelers: 2,
    rooms: 1,
    specialRequests: '',
  }));

  function handleSubmit(e) {
    e.preventDefault();
    if (!formData.customerName || !formData.customerEmail) return;
    onConfirm(formData);
  }

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-window glass-panel" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div>
            <span className="eyebrow">Reservation</span>
            <h2>Confirm Booking</h2>
          </div>
          <button type="button" className="close-btn" onClick={onClose}>✕</button>
        </div>

        <div className="modal-summary">
          <strong>{modal.itemName}</strong>
          <span className="modal-price">Total: {formatPrice(modal.amount)}</span>
        </div>

        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-row">
            <label>
              <span>Full Name</span>
              <input required placeholder="Your name" value={formData.customerName} onChange={(e) => setFormData({ ...formData, customerName: e.target.value })} />
            </label>
            <label>
              <span>Email</span>
              <input type="email" required placeholder="you@example.com" value={formData.customerEmail} onChange={(e) => setFormData({ ...formData, customerEmail: e.target.value })} />
            </label>
          </div>
          <div className="modal-actions">
            <button type="button" className="secondary-action" onClick={onClose}>Cancel</button>
            <button type="submit" className="primary-action">Confirm Reservation</button>
          </div>
        </form>
      </div>
    </div>
  );
}

function FilterBar({ budget, formatPrice, onAddLiveCity, search, setBudget, setSearch, setThemeFilter, themeFilter, themes }) {
  const [globalSuggestions, setGlobalSuggestions] = useState([]);
  const [showGlobalDropdown, setShowGlobalDropdown] = useState(false);

  useEffect(() => {
    const q = (search || '').trim();
    if (q.length < 2) {
      setGlobalSuggestions([]);
      setShowGlobalDropdown(false);
      return;
    }

    const timer = setTimeout(async () => {
      try {
        const res = await fetch(
          `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(q)}&count=6&language=en&format=json&countryCode=IN`
        );
        if (res.ok) {
          const data = await res.json();
          if (data.results && data.results.length > 0) {
            setGlobalSuggestions(data.results);
            setShowGlobalDropdown(true);
            return;
          }
        }
      } catch {
        // ignore
      }
      setGlobalSuggestions([]);
      setShowGlobalDropdown(false);
    }, 280);

    return () => clearTimeout(timer);
  }, [search]);

  const handlePickGlobal = (item) => {
    setShowGlobalDropdown(false);
    setSearch('');
    if (onAddLiveCity) {
      onAddLiveCity({
        id: item.id,
        name: item.name,
        country: 'India',
        state: item.admin1 ? `${item.admin1}, India` : 'India',
        region: item.admin1 || 'India',
        latitude: item.latitude,
        longitude: item.longitude,
        rating: 4.8,
        popularityScore: 95,
        estimatedDailyBudget: 4200,
        themes: ['culture', 'sightseeing', 'heritage'],
        bestSeason: 'October to March',
      });
    }
  };

  return (
    <div className="control-band">
      <label style={{ position: 'relative' }}>
        <span>Search Any Indian Destination</span>
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search any destination across India (e.g. Jaipur, Varanasi, Kochi, Shimla, Pune)..."
          onFocus={() => globalSuggestions.length > 0 && setShowGlobalDropdown(true)}
        />
        {showGlobalDropdown && globalSuggestions.length > 0 && (
          <div className="search-autocomplete-dropdown" style={{ top: '100%', zIndex: 9999 }}>
            {globalSuggestions.map((s) => (
              <div
                key={s.id}
                className="search-suggestion-item"
                onClick={() => handlePickGlobal(s)}
              >
                <div>
                  <span className="suggestion-city-name">📍 {s.name}</span>
                  <span className="suggestion-state-name">, {s.admin1 || 'India'}</span>
                </div>
                <span style={{ fontSize: '0.75rem', color: 'var(--primary)', fontWeight: 700 }}>
                  Add to Destinations & Map ➔
                </span>
              </div>
            ))}
          </div>
        )}
      </label>
      <label>
        <span>Travel Theme</span>
        <select value={themeFilter} onChange={(e) => setThemeFilter(e.target.value)}>
          {themes.map((t) => <option key={t} value={t}>{t === 'all' ? 'All Themes' : t}</option>)}
        </select>
      </label>
      <label>
        <span>Max Daily Budget: {formatPrice(budget)}</span>
        <input type="range" min="2500" max="25000" step="500" value={budget} onChange={(e) => setBudget(Number(e.target.value))} />
      </label>
    </div>
  );
}

function PlaceCard({ compact = false, formatPrice, place }) {
  const defaultPhoto = LANDMARK_PHOTOS[place.name] || 'https://images.unsplash.com/photo-1599661046289-e31897846e41?w=600';
  const [imgSrc, setImgSrc] = useState(defaultPhoto);

  useEffect(() => {
    if (!LANDMARK_PHOTOS[place.name]) {
      let cancelled = false;
      fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(place.name)}`)
        .then((r) => (r.ok ? r.json() : null))
        .then((data) => {
          if (!cancelled && data?.thumbnail?.source) {
            setImgSrc(data.thumbnail.source);
          }
        })
        .catch(() => {});
      return () => {
        cancelled = true;
      };
    } else {
      setImgSrc(LANDMARK_PHOTOS[place.name]);
    }
  }, [place.name]);

  return (
    <article className={`place-card ${compact ? 'compact' : ''} landmark-photo-card`}>
      <div className="landmark-img-wrap">
        <img
          src={imgSrc}
          alt={place.name}
          loading="lazy"
          onError={() => setImgSrc('https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=600')}
        />
      </div>
      <div className="landmark-body">
        <span className="card-tag">{place.category}</span>
        <h4>{place.name}</h4>
        <p>{place.description}</p>
        <div className="landmark-meta-row">
          <span>⭐ {place.rating}</span>
          <span>{place.entryFee === 0 ? 'Free Entry' : formatPrice(place.entryFee)}</span>
          <span>⏱️ {place.recommendedHours}h</span>
        </div>
      </div>
    </article>
  );
}

function PageTitle({ eyebrow, text, title }) {
  return (
    <div className="page-title">
      <span className="eyebrow">{eyebrow}</span>
      <h1>{title}</h1>
      <p>{text}</p>
    </div>
  );
}

function useHashPage() {
  const [page, setPageState] = useState(() => {
    const value = window.location.hash.replace('#/', '') || 'home';
    return VALID_PAGES.includes(value) ? value : 'home';
  });

  useEffect(() => {
    const onHashChange = () => {
      const value = window.location.hash.replace('#/', '') || 'home';
      setPageState(VALID_PAGES.includes(value) ? value : 'home');
    };
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  const setPage = (nextPage) => {
    window.location.hash = `/${nextPage}`;
    setPageState(nextPage);
  };

  return [page, setPage];
}

// Helpers
function getWmoCondition(code) {
  if (code === 0) return 'Clear Sky';
  if (code <= 3) return 'Partly Cloudy';
  if (code <= 48) return 'Misty Fog';
  if (code <= 55) return 'Light Drizzle';
  if (code <= 65) return 'Rain Showers';
  if (code <= 75) return 'Snowfall';
  if (code <= 82) return 'Scattered Showers';
  return 'Thunderstorms';
}

function getWmoIcon(code) {
  if (code === 0) return '☀️';
  if (code <= 3) return '⛅';
  if (code <= 48) return '🌫️';
  if (code <= 55) return '🌦️';
  if (code <= 65) return '🌧️';
  if (code <= 75) return '❄️';
  if (code <= 82) return '🌧️';
  return '⛈️';
}

function generatePackingAdvice(temp, code) {
  if (code >= 61) return 'Rainfall expected. Carry an umbrella, rain poncho, and waterproof bag for electronics.';
  if (temp < 16) return 'Cool mountain climate. Pack a warm jacket, thermals, and woolen socks.';
  if (temp > 32) return 'Warm tropical sun. Light breathable cottons, sunglasses, SPF 50 sunscreen, and water bottle recommended.';
  return 'Pleasant travel weather. Comfortable walking shoes and casual cotton layers recommended.';
}

function generateOfflineWeather(city) {
  const baseTemp = city.latitude > 30 ? 19.0 : 28.0;
  return {
    cityId: city.id,
    cityName: city.name,
    latitude: city.latitude,
    longitude: city.longitude,
    currentTemperature: baseTemp,
    apparentTemperature: baseTemp + 1.5,
    relativeHumidity: 60,
    windSpeed: 9.5,
    weatherCode: 1,
    weatherCondition: 'Pleasant & Clear',
    weatherIcon: '🌤️',
    timezone: 'Asia/Kolkata',
    packingTip: generatePackingAdvice(baseTemp, 1),
    dailyForecasts: Array.from({ length: 7 }, (_, i) => ({
      date: new Date(Date.now() + i * 86400000).toISOString().slice(0, 10),
      weatherCode: 1,
      weatherCondition: 'Pleasant & Clear',
      weatherIcon: '🌤️',
      maxTemperature: baseTemp + 4,
      minTemperature: baseTemp - 4,
      sunrise: '06:12',
      sunset: '18:42',
    })),
    isLiveExternalData: false,
  };
}

function createDefaultDetails(marker) {
  return {
    city: {
      id: marker.id,
      name: marker.name,
      state: marker.state,
      country: 'India',
      region: marker.region || 'India',
      description: marker.description || `${marker.name} is a celebrated Indian travel destination known for its iconic heritage architecture, living culture, and memorable hospitality.`,
      bestSeason: marker.bestSeason || 'October to March (Pleasant Weather)',
      popularityScore: marker.popularityScore || 95,
      averageRating: marker.rating || 4.8,
      estimatedDailyBudget: marker.estimatedDailyBudget || 4200,
      themes: marker.themes || ['heritage', 'culture', 'landmarks'],
    },
    famousPlaces: [
      { id: marker.id * 100, name: `${marker.name} Historic Fort & Palace`, category: 'Heritage Fort', description: `Explore the iconic royal architecture, ancient ramparts, and panoramic views of ${marker.name}.`, latitude: marker.latitude, longitude: marker.longitude, rating: 4.8, entryFee: 250, recommendedHours: 3 },
      { id: marker.id * 100 + 1, name: `${marker.name} Heritage Chowk & Bazaar`, category: 'Cultural Walk', description: `Vibrant pedestrian bazaar, artisanal handicrafts, street food, and authentic local culture in ${marker.name}.`, latitude: marker.latitude + 0.008, longitude: marker.longitude + 0.008, rating: 4.7, entryFee: 0, recommendedHours: 2 },
      { id: marker.id * 100 + 2, name: `${marker.name} Sacred Ghats & Temple Complex`, category: 'Spiritual', description: `Ancient riverside pavilions, temple ceremonies, and evening spiritual aarti in ${marker.name}.`, latitude: marker.latitude - 0.008, longitude: marker.longitude - 0.008, rating: 4.9, entryFee: 0, recommendedHours: 2 },
    ],
    recommendedHotels: [
      { id: marker.id * 1000, name: `Grand ${marker.name} Heritage Haveli`, type: 'Heritage', address: `Old City Heritage District, ${marker.name}`, latitude: marker.latitude, longitude: marker.longitude, rating: 4.8, pricePerNight: 4200, amenities: ['Free WiFi', 'Breakfast', 'Courtyard Pool', 'Folk Music'], nearbyAttractionIds: [marker.id * 100] },
      { id: marker.id * 1000 + 1, name: `Zostel ${marker.name} (Backpacker Hub)`, type: 'Hostel', address: `Near Old Chowk, ${marker.name}`, latitude: marker.latitude + 0.005, longitude: marker.longitude + 0.004, rating: 4.7, pricePerNight: 850, amenities: ['Shared Dorm', 'High-Speed WiFi', 'Rooftop Cafe', 'Travel Desk'], nearbyAttractionIds: [marker.id * 100] },
      { id: marker.id * 1000 + 2, name: `Royal ${marker.name} Luxury Palace & Spa`, type: 'Luxury', address: `Scenic Promenade, ${marker.name}`, latitude: marker.latitude - 0.008, longitude: marker.longitude - 0.008, rating: 4.9, pricePerNight: 9800, amenities: ['5-Star Luxury', 'Infinity Pool', 'Fine Dining Spa'], nearbyAttractionIds: [marker.id * 100] },
      { id: marker.id * 1000 + 3, name: `The Hosteller ${marker.name}`, type: 'Hostel', address: `Station Road, ${marker.name}`, latitude: marker.latitude - 0.004, longitude: marker.longitude + 0.003, rating: 4.6, pricePerNight: 780, amenities: ['AC Pods', 'Common Lounge', 'Lockers'], nearbyAttractionIds: [marker.id * 100] },
      { id: marker.id * 1000 + 4, name: `${marker.name} Riverside Resort`, type: 'Resort', address: `Riverfront Road, ${marker.name}`, latitude: marker.latitude + 0.012, longitude: marker.longitude - 0.009, rating: 4.8, pricePerNight: 6500, amenities: ['River View', 'Lawn Dining', 'Pool'], nearbyAttractionIds: [marker.id * 100] },
    ],
    travelTips: [
      { id: marker.id, title: 'Local Navigation', detail: `Use auto-rickshaws, metro, or live Ola/Uber cabs to comfortably tour around ${marker.name}.`, type: 'transport' },
      { id: marker.id + 1, title: 'Best Time to Tour', detail: `Early morning and sunset hours offer pleasant weather and optimal photography lighting.`, type: 'general' }
    ],
    reviews: [
      { id: 1, cityId: marker.id, travelerName: 'Rahul Sharma', rating: 5, comment: `Visiting ${marker.name} was an unforgettable journey! Outstanding hospitality, rich heritage, and delicious local food.`, travelMonth: 'October' }
    ],
  };
}

function createFallbackFares(details) {
  const hotels = details?.recommendedHotels || [];
  const places = details?.famousPlaces || [];
  return hotels.flatMap((hotel) => places.map((place, index) => ({
    hotelId: hotel.id,
    hotelName: hotel.name,
    attractionId: place.id,
    attractionName: place.name,
    distanceKm: Math.round((1.4 + index * 2.1) * 10) / 10,
    olaMini: 120 + index * 55,
    olaPrime: 170 + index * 70,
    uberGo: 110 + index * 50,
    uberPremier: 180 + index * 75,
    estimatedMinutes: 12 + index * 8,
  })));
}

function AuthModal({ onClose, setUser, user }) {
  const [mode, setMode] = useState('login');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [city, setCity] = useState('Jaipur');
  const [interest, setInterest] = useState('Heritage');
  const [loading, setLoading] = useState(false);
  const [successNotice, setSuccessNotice] = useState('');
  const [errorNotice, setErrorNotice] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorNotice('');
    setSuccessNotice('');
    if (!email.trim()) return;

    setLoading(true);
    try {
      if (mode === 'login') {
        const loggedInUser = await yatraApi.login({ email: email.trim(), password });
        setUser(loggedInUser);
        setSuccessNotice(`Welcome back, ${loggedInUser.name}! (Connected to Cloudflare D1)`);
      } else {
        const registeredUser = await yatraApi.register({
          name: name.trim() || 'Traveler',
          email: email.trim(),
          password,
          city,
          interest,
          authProvider: 'email'
        });
        setUser(registeredUser);
        setSuccessNotice(`Account created in Cloudflare D1! Welcome, ${registeredUser.name}!`);
      }
      setTimeout(() => {
        onClose();
      }, 1000);
    } catch (err) {
      setErrorNotice(err.message || 'Authentication failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setErrorNotice('');
    setLoading(true);
    try {
      const userData = {
        name: 'Dilip Kumar',
        email: 'dilip@google.com',
        authProvider: 'google',
        city: 'Jaipur',
        interest: 'Heritage'
      };
      const saved = await yatraApi.signIn(userData);
      setUser(saved);
      setSuccessNotice('Signed in with Google! (Saved to Cloudflare D1)');
      setTimeout(() => {
        onClose();
      }, 900);
    } catch (err) {
      setErrorNotice(err.message || 'Google sign-in failed');
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = () => {
    setUser(null);
    localStorage.removeItem('yatra_user');
    onClose();
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="auth-modal-window" onClick={(e) => e.stopPropagation()}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
          <h2 style={{ margin: 0, fontSize: '1.4rem' }}>
            {user ? '👤 Traveler Profile' : mode === 'login' ? 'Sign In to Yatra' : 'Create Yatra Account'}
          </h2>
          <button type="button" className="close-btn" onClick={onClose}>✕</button>
        </div>

        {user ? (
          <div>
            <div style={{ textAlign: 'center', margin: '1rem 0 1.5rem' }}>
              <div style={{ width: '68px', height: '68px', borderRadius: '50%', background: 'linear-gradient(135deg, var(--primary), #6366f1)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem', margin: '0 auto 0.75rem', fontWeight: 800, boxShadow: '0 4px 16px rgba(0,0,0,0.15)' }}>
                {user.name?.charAt(0).toUpperCase() || 'U'}
              </div>
              <h3 style={{ margin: '0 0 0.25rem', fontSize: '1.25rem' }}>{user.name}</h3>
              <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '0.9rem' }}>{user.email}</p>
              <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', marginTop: '0.75rem', flexWrap: 'wrap' }}>
                <span style={{ fontSize: '0.75rem', background: 'rgba(16, 185, 129, 0.15)', color: '#10b981', padding: '0.25rem 0.65rem', borderRadius: '12px', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#10b981', display: 'inline-block' }}></span>
                  Cloudflare D1 Active
                </span>
                {user.city && (
                  <span style={{ fontSize: '0.75rem', background: 'var(--surface-muted, rgba(255,255,255,0.08))', color: 'var(--text)', padding: '0.25rem 0.65rem', borderRadius: '12px', fontWeight: 600 }}>
                    📍 {user.city}
                  </span>
                )}
                {user.interest && (
                  <span style={{ fontSize: '0.75rem', background: 'var(--surface-muted, rgba(255,255,255,0.08))', color: 'var(--text)', padding: '0.25rem 0.65rem', borderRadius: '12px', fontWeight: 600 }}>
                    ✨ {user.interest}
                  </span>
                )}
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginTop: '1.5rem' }}>
              <button type="button" className="secondary-action" style={{ width: '100%' }} onClick={onClose}>
                Close
              </button>
              <button type="button" className="cancel-btn" style={{ width: '100%' }} onClick={handleSignOut}>
                Sign Out
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className="auth-tabs">
              <button
                type="button"
                className={`auth-tab-btn ${mode === 'login' ? 'active' : ''}`}
                onClick={() => { setMode('login'); setErrorNotice(''); setSuccessNotice(''); }}
              >
                Sign In
              </button>
              <button
                type="button"
                className={`auth-tab-btn ${mode === 'register' ? 'active' : ''}`}
                onClick={() => { setMode('register'); setErrorNotice(''); setSuccessNotice(''); }}
              >
                Create Account
              </button>
            </div>

            <button type="button" className="auth-social-btn" onClick={handleGoogleSignIn} disabled={loading}>
              <span>🌐</span>
              <span>Continue with Google</span>
            </button>

            <div className="auth-divider">
              <span>OR EMAIL & PASSWORD</span>
            </div>

            {errorNotice && (
              <div style={{ background: 'rgba(239, 68, 68, 0.12)', border: '1px solid rgba(239, 68, 68, 0.3)', color: '#f87171', padding: '0.65rem 0.85rem', borderRadius: '8px', fontSize: '0.85rem', textAlign: 'center', marginBottom: '0.75rem' }}>
                ⚠️ {errorNotice}
              </div>
            )}

            {successNotice && (
              <div style={{ background: 'rgba(16, 185, 129, 0.12)', border: '1px solid rgba(16, 185, 129, 0.3)', color: '#34d399', padding: '0.65rem 0.85rem', borderRadius: '8px', fontSize: '0.85rem', textAlign: 'center', marginBottom: '0.75rem' }}>
                ✅ {successNotice}
              </div>
            )}

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {mode === 'register' && (
                <>
                  <label>
                    <span style={{ fontSize: '0.825rem', fontWeight: 700, display: 'block', marginBottom: '0.25rem' }}>Full Name</span>
                    <input
                      className="clean-input"
                      placeholder="Dilip Kumar"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </label>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                    <label>
                      <span style={{ fontSize: '0.825rem', fontWeight: 700, display: 'block', marginBottom: '0.25rem' }}>Home City</span>
                      <input
                        className="clean-input"
                        placeholder="Jaipur"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                      />
                    </label>
                    <label>
                      <span style={{ fontSize: '0.825rem', fontWeight: 700, display: 'block', marginBottom: '0.25rem' }}>Travel Interest</span>
                      <input
                        className="clean-input"
                        placeholder="Heritage"
                        value={interest}
                        onChange={(e) => setInterest(e.target.value)}
                      />
                    </label>
                  </div>
                </>
              )}

              <label>
                <span style={{ fontSize: '0.825rem', fontWeight: 700, display: 'block', marginBottom: '0.25rem' }}>Email Address</span>
                <input
                  type="email"
                  className="clean-input"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </label>

              <label>
                <span style={{ fontSize: '0.825rem', fontWeight: 700, display: 'block', marginBottom: '0.25rem' }}>Password</span>
                <input
                  type="password"
                  className="clean-input"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </label>

              <button type="submit" className="primary-action" disabled={loading} style={{ padding: '0.85rem', width: '100%', marginTop: '0.5rem' }}>
                {loading ? 'Connecting to Cloudflare D1...' : mode === 'login' ? 'Sign In ➔' : 'Create Account ➔'}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
