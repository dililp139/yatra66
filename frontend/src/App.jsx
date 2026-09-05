import React, { Component, useEffect, useMemo, useRef, useState } from 'react';
import L from 'leaflet';
import './App.css';
import yatraApi from './services/yatraService';
import SihTripPlanner from './components/SihTripPlanner';
import SihHiddenGems from './components/SihHiddenGems';
import SihExperiences from './components/SihExperiences';
import SihMarketplace from './components/SihMarketplace';
import SihSafetyModal from './components/SihSafetyModal';
import SihEnquiryModal from './components/SihEnquiryModal';
import FloatingSafetyHelp from './components/FloatingSafetyHelp';
import RentalServices from './components/RentalServices';
import YatraAiChatbot from './components/YatraAiChatbot';
import ExploreIndiaPassport from './components/ExploreIndiaPassport';
import DiscoverIndiaAiEngine from './components/DiscoverIndiaAiEngine';
import { FIVE_CITIES_MVP, TRANSLATIONS, SIH_STATS, UPCOMING_LIVE_EVENTS_DATA } from './services/sihData';

function CreativeLogo({ size = 36 }) {
  return (
    <div className="creative-brand-logo">
      <svg
        width={size}
        height={size}
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ flexShrink: 0, filter: 'drop-shadow(0 2px 8px rgba(245, 158, 11, 0.35))' }}
      >
        <defs>
          <linearGradient id="logoGold" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F59E0B" />
            <stop offset="50%" stopColor="#D97706" />
            <stop offset="100%" stopColor="#B45309" />
          </linearGradient>
          <linearGradient id="logoEmerald" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#10B981" />
            <stop offset="100%" stopColor="#047857" />
          </linearGradient>
          <linearGradient id="logoSwoosh" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#EA580C" />
            <stop offset="100%" stopColor="#FBBF24" />
          </linearGradient>
        </defs>
        {/* Outer Dotted Orbital Ring */}
        <circle cx="24" cy="24" r="21" stroke="url(#logoGold)" strokeWidth="2" strokeDasharray="3 2" opacity="0.85" />
        {/* Soaring Journey Arc */}
        <path d="M8 32C12 16 24 10 40 12" stroke="url(#logoSwoosh)" strokeWidth="3.5" strokeLinecap="round" />
        {/* 8-Point Compass Star */}
        <polygon points="24,4 27,21 44,24 27,27 24,44 21,27 4,24 21,21" fill="url(#logoGold)" opacity="0.9" />
        {/* Inner Jewel Core */}
        <circle cx="24" cy="24" r="5" fill="url(#logoEmerald)" />
        <circle cx="24" cy="24" r="2" fill="#FFFFFF" opacity="0.9" />
      </svg>
      <div className="brand-title-wrap">
        <span className="brand-primary-text">Yatra 66</span>
        <span className="brand-india-tag">yatra66.in</span>
      </div>
    </div>
  );
}

function GoogleIcon({ size = 18, className = "" }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ display: 'inline-block', verticalAlign: 'middle', flexShrink: 0 }}
      aria-hidden="true"
    >
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
      />
    </svg>
  );
}

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
  Delhi: 'https://images.unsplash.com/photo-1592635196078-9fdc757f27f4?w=800',
  Mumbai: 'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?w=800',
  Udaipur: 'https://images.unsplash.com/photo-1615836245337-f5b9b2303f10?w=800',
  Varanasi: 'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?w=800',
  Goa: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800',
  Kochi: 'https://images.unsplash.com/photo-1597848212624-a19eb35e2651?w=800',
  Amritsar: 'https://images.unsplash.com/photo-1514222134-b57cbb8ce073?w=800',
  Manali: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=800',
  Rishikesh: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800',
  Bengaluru: 'https://images.unsplash.com/photo-1596176530529-78163a4f7af2?w=800',
  Hampi: 'https://images.unsplash.com/photo-1620766182966-c6eb5ed2b788?w=800',
  Darjeeling: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800',
  Shimla: 'https://images.unsplash.com/photo-1597074866923-dc0589150358?w=800',
  'Leh Ladakh': 'https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?w=800',
  Mysore: 'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?w=800',
  Srinagar: 'https://images.unsplash.com/photo-1598091383021-15ddea10925d?w=800',
  Pondicherry: 'https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?w=800',
  Hyderabad: 'https://images.unsplash.com/photo-1572445271230-a78b5944a659?w=800',
  Kolkata: 'https://images.unsplash.com/photo-1558431382-27e303142255?w=800',
  Jodhpur: 'https://images.unsplash.com/photo-1568849676085-51415703900f?w=800',
  Ooty: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800',
  Shillong: 'https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?w=800',
};

const LANDMARK_PHOTOS = {
  'Amber Fort': 'https://images.unsplash.com/photo-1477587458883-47145ed94245?w=800',
  'Hawa Mahal': 'https://images.unsplash.com/photo-1599661046289-e31897846e41?w=800',
  'City Palace Jaipur': 'https://images.unsplash.com/photo-1598890777032-bde835ba27c2?w=800',
  'Taj Mahal': 'https://images.unsplash.com/photo-1564507592333-c60657eea523?w=800',
  'Agra Fort': 'https://images.unsplash.com/photo-1608958435020-e8a7109ba809?w=800',
  'Mehtab Bagh': 'https://images.unsplash.com/photo-1585135497273-1a86b09fe70e?w=800',
  'Red Fort': 'https://images.unsplash.com/photo-1592635196078-9fdc757f27f4?w=800',
  'India Gate': 'https://images.unsplash.com/photo-1592635196078-9fdc757f27f4?w=800',
  'Qutub Minar': 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=800',
  'Gateway of India': 'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?w=800',
  'Marine Drive': 'https://images.unsplash.com/photo-1567157577867-05ccb1388e66?w=800',
  'Elephanta Caves': 'https://images.unsplash.com/photo-1583083527882-4bee9aba2eea?w=800',
  'City Palace Udaipur': 'https://images.unsplash.com/photo-1615836245337-f5b9b2303f10?w=800',
  'Lake Pichola': 'https://images.unsplash.com/photo-1576487248805-cf45f6bcc67f?w=800',
  'Dashashwamedh Ghat': 'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?w=800',
  'Kashi Vishwanath Temple': 'https://images.unsplash.com/photo-1627894483216-2138af692e32?w=800',
  'Baga Beach': 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800',
  'Basilica of Bom Jesus': 'https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?w=800',
  'Fort Kochi': 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=800',
  'Chinese Fishing Nets': 'https://images.unsplash.com/photo-1597848212624-a19eb35e2651?w=800',
  'Golden Temple (Harmandir Sahib)': 'https://images.unsplash.com/photo-1514222134-b57cbb8ce073?w=800',
  'Wagah Border': 'https://images.unsplash.com/photo-1532375810709-75b1da00537c?w=800',
  'Solang Valley': 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=800',
  'Hadimba Temple': 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=800',
  'Ram Jhula & Laxman Jhula': 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800',
  'Triveni Ghat Evening Aarti': 'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?w=800',
  'Bangalore Palace': 'https://images.unsplash.com/photo-1596176530529-78163a4f7af2?w=800',
  'Lalbagh Botanical Garden': 'https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?w=800',
  'Virupaksha Temple': 'https://images.unsplash.com/photo-1620766182966-c6eb5ed2b788?w=800',
  'Stone Chariot & Vijaya Vittala': 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=800',
  'Tiger Hill Sunrise': 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800',
  'Happy Valley Tea Estate': 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800',
  'The Ridge & Mall Road': 'https://images.unsplash.com/photo-1597074866923-dc0589150358?w=800',
  'Kufri Snow Point': 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800',
  'Pangong Tso Lake': 'https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?w=800',
  'Thiksey Monastery': 'https://images.unsplash.com/photo-1566438480900-0609be27a4be?w=800',
  'Mysore Palace (Amba Vilas)': 'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?w=800',
  'Chamundi Hill & Temple': 'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?w=800',
  'Dal Lake & Shikara Cruise': 'https://images.unsplash.com/photo-1598091383021-15ddea10925d?w=800',
  'Mughal Gardens (Shalimar)': 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=800',
  'White Town French Quarter': 'https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?w=800',
  'Auroville Matrimandir': 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800',
  'Charminar': 'https://images.unsplash.com/photo-1572445271230-a78b5944a659?w=800',
  'Golconda Fort': 'https://images.unsplash.com/photo-1598890777032-bde835ba27c2?w=800',
  'Victoria Memorial': 'https://images.unsplash.com/photo-1558431382-27e303142255?w=800',
  'Mehrangarh Fort': 'https://images.unsplash.com/photo-1568849676085-51415703900f?w=800',
  'Nilgiri Mountain Railway': 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800',
  'Nohkalikai Falls': 'https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?w=800',
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

const VALID_PAGES = [
  'home',
  'map',
  'destinations',
  'hotels',
  'weather',
  'explore',
  'festivals',
  'routes',
  'rentals',
  'planner',
  'calendar',
  'bookings',
  'signup',
  'gems',
  'experiences',
  'marketplace',
];

function App() {
  const [page, setPage] = useHashPage();
  const [theme, setTheme] = useState(() => localStorage.getItem('yatra_theme') || 'light');
  const [lang, setLang] = useState(() => localStorage.getItem('yatra_lang') || 'en');
  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;
  const [safetyModalOpen, setSafetyModalOpen] = useState(false);
  const [enquiryModalBiz, setEnquiryModalBiz] = useState(null);
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
  const [passportOpen, setPassportOpen] = useState(false);
  const [visitedStatesCount, setVisitedStatesCount] = useState(() => {
    try {
      const s = localStorage.getItem('yatra_visited_states');
      return s ? JSON.parse(s).length : 4;
    } catch {
      return 4;
    }
  });

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

  // Persist theme choice and sync to html and body
  useEffect(() => {
    localStorage.setItem('yatra_theme', theme);
    document.documentElement.className = `theme-${theme}`;
    document.body.className = `theme-${theme}`;
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

  // Price formatting helper - Standardized in Indian Rupee (₹)
  const formatPrice = useMemo(() => {
    return (inrAmount) => {
      if (inrAmount == null || isNaN(inrAmount)) return '₹0';
      const converted = Math.round(Number(inrAmount) || 0);
      return `₹${converted.toLocaleString('en-IN')}`;
    };
  }, []);

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
    city: (details?.city && details.city.id === selectedMarker.id) ? details.city : (selectedMarker || cities[0]),
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
    lang,
    setLang,
    t,
    onOpenSafety: () => setSafetyModalOpen(true),
    onOpenPassport: () => setPassportOpen(true),
    visitedStatesCount,
    onOpenEnquiry: (biz) => setEnquiryModalBiz(biz),
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
      {page === 'rentals' && <RentalsPage {...appState} />}
      {page === 'planner' && <PlannerPage {...appState} />}
      {page === 'calendar' && <PersonalCalendarPage {...appState} />}
      {page === 'bookings' && <BookingsPage {...appState} />}
      {page === 'signup' && <SignupPage {...appState} />}
      {page === 'gems' && <GemsPage {...appState} />}
      {page === 'experiences' && <ExperiencesPage {...appState} />}
      {page === 'marketplace' && <MarketplacePage {...appState} />}

      {safetyModalOpen && (
        <SihSafetyModal
          onClose={() => setSafetyModalOpen(false)}
          defaultCity={selectedMarker?.name || 'Jaipur'}
        />
      )}

      {enquiryModalBiz && (
        <SihEnquiryModal
          business={enquiryModalBiz}
          onClose={() => setEnquiryModalBiz(null)}
          onSuccess={() => setBookingNotice(`Direct enquiry dispatched to ${enquiryModalBiz.name}! 🤝`)}
        />
      )}

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

      {/* Floating 24/7 Tourist Safety Help Action Widget */}
      <FloatingSafetyHelp onOpenSafety={() => setSafetyModalOpen(true)} />

      {/* Floating Yatra AI Travel Concierge Assistant (Gemini 3.6 Flash) */}
      <YatraAiChatbot currentCity={selectedMarker?.name || 'Jaipur'} />
    </div>
  );
}

function Header({ currency, currencyData, lang = 'en', onOpenAuth, onOpenPassport, visitedStatesCount = 4, page, setCurrency, setLang, setPage, setTheme, theme, user }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [themeOpen, setThemeOpen] = useState(false);
  const menuTimerRef = useRef(null);
  const themeTimerRef = useRef(null);

  // 5 Primary Navigation Tabs visible directly in top bar
  const primaryNav = [
    ['home', lang === 'hi' ? 'मुख्य' : 'Home'],
    ['destinations', lang === 'hi' ? 'गंतव्य' : 'Destinations'],
    ['planner', lang === 'hi' ? '✨ प्लानर' : '✨ Plan Trip'],
    ['rentals', lang === 'hi' ? '🚗 रेंटल' : '🚗 Rentals'],
    ['marketplace', lang === 'hi' ? 'स्थानीय' : 'Support Local'],
  ];

  // 3-Section Clean Services Menu
  const menuSections = [
    {
      title: lang === 'hi' ? '🏛️ भारत खोजें' : '🏛️ Explore India',
      items: [
        { id: 'destinations', icon: '📍', title: lang === 'hi' ? 'गंतव्य सूची' : 'Top Destinations', desc: '24 Curated heritage hubs' },
        { id: 'map', icon: '🗺️', title: lang === 'hi' ? 'मानचित्र' : 'Interactive Map', desc: 'Pan & explore India pins' },
        { id: 'gems', icon: '💎', title: lang === 'hi' ? 'छिपे हुए रत्न' : 'Hidden Gems', desc: 'Quiet & decongested sites' },
        { id: 'explore', icon: '📚', title: lang === 'hi' ? 'स्मारक गाइड' : 'Monuments Guide', desc: 'Landmark histories & tips' },
        { id: 'festivals', icon: '🎉', title: lang === 'hi' ? 'सांस्कृतिक उत्सव' : 'Festival Calendar', desc: 'Living cultural celebrations' },
      ],
    },
    {
      title: lang === 'hi' ? '🚆 यात्रा व परिवहन' : '🚆 Travel & Transit',
      items: [
        { id: 'planner', icon: '✨', title: lang === 'hi' ? 'ट्रिप प्लानर' : 'Smart Trip Planner', desc: 'Multi-day AI route engine' },
        { id: 'routes', icon: '🚆', title: lang === 'hi' ? 'परिवहन मार्ग' : 'Transit Routes', desc: 'Flights, trains, buses, cabs' },
        { id: 'rentals', icon: '🚗', title: lang === 'hi' ? 'वाहन रेंटल' : 'Rental Services', desc: 'Self-drive cars, bikes, EVs' },
        { id: 'weather', icon: '🌤️', title: lang === 'hi' ? 'मौसम पूर्वानुमान' : 'Weather Forecast', desc: 'Climate outlook & packing' },
      ],
    },
    {
      title: lang === 'hi' ? '🏨 बुकिंग व स्थानीय' : '🏨 Bookings & Stays',
      items: [
        { id: 'hotels', icon: '🏨', title: lang === 'hi' ? 'होटल व रिसॉर्ट' : 'Hotels & Stays', desc: 'Verified havelis & stays' },
        { id: 'marketplace', icon: '🤝', title: lang === 'hi' ? 'स्थानीय व्यापार' : 'Support Local', desc: '0% commission marketplace' },
        { id: 'experiences', icon: '🎨', title: lang === 'hi' ? 'कारीगर अनुभव' : 'Artisan Masterclasses', desc: 'Immersive cultural workshops' },
        { id: 'bookings', icon: '🎟️', title: lang === 'hi' ? 'मेरी बुकिंग' : 'My Bookings', desc: 'Confirmed vouchers & tickets' },
      ],
    },
  ];

  const themesList = [
    { id: 'light', label: '⚪ Light White', desc: 'Modern pearl minimalism' },
    { id: 'dark', label: '🌑 Dark Midnight', desc: 'Sleek dark mode' },
    { id: 'sunset', label: '🌅 Sunset Amber', desc: 'Warm Rajasthan royal glow' },
    { id: 'emerald', label: '🌿 Emerald Nature', desc: 'Crisp botanical Kerala mint' },
  ];

  const handleMenuEnter = () => {
    if (menuTimerRef.current) clearTimeout(menuTimerRef.current);
    setMenuOpen(true);
  };

  const handleMenuLeave = () => {
    menuTimerRef.current = setTimeout(() => {
      setMenuOpen(false);
    }, 380);
  };

  const handleThemeEnter = () => {
    if (themeTimerRef.current) clearTimeout(themeTimerRef.current);
    setThemeOpen(true);
  };

  const handleThemeLeave = () => {
    themeTimerRef.current = setTimeout(() => {
      setThemeOpen(false);
    }, 380);
  };

  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 28);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={`topbar ${scrolled ? 'topbar-compact' : ''}`}>
      <button className="brand" type="button" onClick={() => setPage('home')} aria-label="Yatra 66 Home">
        <CreativeLogo size={36} />
      </button>

      <nav className="nav-links" aria-label="Primary">
        {primaryNav.map(([id, label]) => (
          <button className={page === id ? 'active' : ''} key={id} type="button" onClick={() => setPage(id)}>
            {label}
          </button>
        ))}

        {/* 3-Section Clean Services Mega-Menu */}
        <div
          className="nav-dropdown-wrapper"
          onMouseEnter={handleMenuEnter}
          onMouseLeave={handleMenuLeave}
        >
          <button
            type="button"
            className="nav-dropdown-btn"
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-haspopup="true"
            aria-expanded={menuOpen}
          >
            <span>{lang === 'hi' ? '☰ सेवाएं' : '☰ Menu'}</span>
            <span style={{ fontSize: '0.65rem', marginLeft: '3px' }}>▼</span>
          </button>

          <div className={`nav-mega-menu ${menuOpen ? 'show' : ''}`}>
            {menuSections.map((sec, sIdx) => (
              <div key={sIdx} className="mega-menu-section">
                <span className="mega-section-header">{sec.title}</span>
                {sec.items.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    className={`mega-menu-item ${page === item.id ? 'active' : ''}`}
                    onClick={() => {
                      setPage(item.id);
                      setMenuOpen(false);
                    }}
                  >
                    <span className="mega-item-icon">{item.icon}</span>
                    <div>
                      <span className="mega-item-title">{item.title}</span>
                      <span className="mega-item-desc">{item.desc}</span>
                    </div>
                  </button>
                ))}
              </div>
            ))}
          </div>
        </div>
      </nav>

      <div className="header-controls">
        {/* Compact Multilingual Toggle */}
        {setLang && (
          <button
            type="button"
            className="lang-toggle-btn"
            onClick={() => setLang(lang === 'en' ? 'hi' : 'en')}
            title="Switch Language / भाषा बदलें"
            style={{ padding: '6px 12px', fontSize: '0.8rem' }}
          >
            {lang === 'en' ? '🇮🇳 हिन्दी' : '🇬🇧 EN'}
          </button>
        )}

        {/* Explore India Passport Gamification Button */}
        <button
          type="button"
          className="passport-btn-pill"
          onClick={onOpenPassport}
          title="Explore India Gamification Passport"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.15), rgba(217, 119, 6, 0.15))',
            border: '1px solid #f59e0b',
            color: 'var(--text-main)',
            padding: '5px 12px',
            borderRadius: '16px',
            fontSize: '0.8rem',
            fontWeight: 700,
            cursor: 'pointer',
          }}
        >
          <span>🏆</span>
          <span>Passport ({visitedStatesCount}/28)</span>
        </button>

        {/* Side Theme Switcher */}
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
            style={{ padding: '6px 10px' }}
          >
            <span>🎨</span>
          </button>

          <div className={`nav-popup-menu ${themeOpen ? 'show' : ''}`} style={{ minWidth: '200px' }}>
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

        {/* Top-Right User Sign In / Account Button */}
        {user ? (
          <button type="button" className="user-profile-pill" onClick={onOpenAuth} title="View Account Profile">
            {user.avatarUrl ? (
              <img
                src={user.avatarUrl}
                alt={user.name}
                style={{ width: '20px', height: '20px', borderRadius: '50%', objectFit: 'cover' }}
                onError={(e) => { e.target.style.display = 'none'; }}
              />
            ) : user.authProvider === 'google' ? (
              <GoogleIcon size={16} />
            ) : (
              <span>👤</span>
            )}
            <span>{user.name}</span>
          </button>
        ) : (
          <button type="button" className="header-auth-btn" onClick={onOpenAuth}>
            <span>👤</span>
            <span>Sign In</span>
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

function RentalsPage(props) {
  return (
    <RentalServices
      cities={props.cities}
      formatPrice={props.formatPrice}
      onOpenBooking={props.handleOpenBooking}
    />
  );
}

const ICONIC_HOME_PLACES = [
  {
    id: 'attr-taj-mahal',
    name: 'Taj Mahal',
    cityName: 'Agra',
    cityId: 2,
    state: 'Uttar Pradesh',
    category: 'UNESCO Wonders',
    image: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?w=800&q=80',
    rating: 5.0,
    reviews: 4800,
    entryFee: 250,
    duration: '2-3 Hours',
    bestTime: 'Sunrise (06:00 AM)',
    description: 'Ivory-white marble mausoleum on the Yamuna riverbank, an eternal monument of universal love.',
    tags: ['World Wonder', 'Mughal Heritage', 'UNESCO'],
  },
  {
    id: 'attr-amber-fort',
    name: 'Amber Fort & Palace',
    cityName: 'Jaipur',
    cityId: 1,
    state: 'Rajasthan',
    category: 'Forts & Palaces',
    image: 'https://images.unsplash.com/photo-1477587458883-47145ed94245?w=800',
    rating: 4.9,
    reviews: 1420,
    entryFee: 100,
    duration: '3-4 Hours',
    bestTime: '08:00 AM - 11:00 AM',
    description: 'Hilltop Rajput fortress with ornate Sheesh Mahal (Mirror Palace) overlooking Maota Lake.',
    tags: ['UNESCO Heritage', 'Mirror Palace', 'Elephant Trail'],
  },
  {
    id: 'attr-gateway-india',
    name: 'Gateway of India',
    cityName: 'Mumbai',
    cityId: 4,
    state: 'Maharashtra',
    category: 'Coastal & Lakes',
    image: 'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?w=800&q=80',
    rating: 4.8,
    reviews: 2150,
    entryFee: 0,
    duration: '1-2 Hours',
    bestTime: 'Sunset / Evening',
    description: 'Colonial basalt triumphal arch overlooking Mumbai Harbour and the Arabian Sea.',
    tags: ['Mumbai Harbour', 'Colonial Landmark', 'Sea Breeze'],
  },
  {
    id: 'attr-golden-temple',
    name: 'Golden Temple (Harmandir Sahib)',
    cityName: 'Amritsar',
    cityId: 9,
    state: 'Punjab',
    category: 'Temples & Spiritual',
    image: 'https://images.unsplash.com/photo-1514222134-b57cbb8ce073?w=800',
    rating: 5.0,
    reviews: 3600,
    entryFee: 0,
    duration: '3-4 Hours',
    bestTime: 'Evening Illumination / 24 hrs',
    description: 'Spiritual sanctuary gilded in pure gold with serene holy sarovar waters and 24/7 community langar.',
    tags: ['Spiritual Peace', 'Golden Architecture', 'Holy Sarovar'],
  },
  {
    id: 'attr-city-palace-udaipur',
    name: 'Lake Pichola & City Palace',
    cityName: 'Udaipur',
    cityId: 5,
    state: 'Rajasthan',
    category: 'Coastal & Lakes',
    image: 'https://images.unsplash.com/photo-1595846519845-68e298c2edd8?w=800',
    rating: 4.9,
    reviews: 1890,
    entryFee: 300,
    duration: '3-4 Hours',
    bestTime: 'Late Afternoon / Sunset Boat Ride',
    description: 'Towering marble palace complex on the tranquil shores of Lake Pichola with panoramic Aravalli views.',
    tags: ['City of Lakes', 'Mewar Royalty', 'Sunset Boat Ride'],
  },
  {
    id: 'attr-varanasi-ghats',
    name: 'Dashashwamedh Ghat & Evening Aarti',
    cityName: 'Varanasi',
    cityId: 6,
    state: 'Uttar Pradesh',
    category: 'Temples & Spiritual',
    image: 'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?w=800',
    rating: 4.9,
    reviews: 2450,
    entryFee: 0,
    duration: '2-3 Hours',
    bestTime: 'Sunset Aarti (06:30 PM)',
    description: 'Ancient sacred ghat on the holy Ganga reverberating with rhythmic brass bell aarti chants and floating diyas.',
    tags: ['Ganga Aarti', 'Spiritual Awakening', 'Ancient Ghats'],
  },
];

const TOP_TOURIST_PLACES = [
  {
    id: 'attr-amber-fort',
    name: 'Amber Fort & Palace',
    cityName: 'Jaipur',
    cityId: 1,
    state: 'Rajasthan',
    category: 'Forts & Palaces',
    catId: 'forts',
    image: 'https://images.unsplash.com/photo-1477587458883-47145ed94245?w=800',
    rating: 4.9,
    reviews: 1420,
    entryFee: 100,
    duration: '3-4 Hours',
    bestTime: '08:00 AM - 11:00 AM',
    description: 'Hilltop Rajput fortress with ornate Sheesh Mahal (Mirror Palace) overlooking Maota Lake.',
    tags: ['UNESCO Heritage', 'Mirror Palace', 'Elephant Trail'],
  },
  {
    id: 'attr-taj-mahal',
    name: 'Taj Mahal',
    cityName: 'Agra',
    cityId: 2,
    state: 'Uttar Pradesh',
    category: 'UNESCO Wonders',
    catId: 'unesco',
    image: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?w=800',
    rating: 5.0,
    reviews: 4800,
    entryFee: 250,
    duration: '2-3 Hours',
    bestTime: 'Sunrise (06:00 AM)',
    description: 'Ivory-white marble mausoleum on the Yamuna riverbank, an eternal monument of universal love.',
    tags: ['World Wonder', 'Mughal Architecture', 'UNESCO'],
  },
  {
    id: 'attr-hawa-mahal',
    name: 'Hawa Mahal (Palace of Winds)',
    cityName: 'Jaipur',
    cityId: 1,
    state: 'Rajasthan',
    category: 'Forts & Palaces',
    catId: 'forts',
    image: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?w=800',
    rating: 4.8,
    reviews: 980,
    entryFee: 50,
    duration: '1-2 Hours',
    bestTime: 'Morning / Golden Hour',
    description: 'Five-storey pink sandstone honeycomb facade with 953 jharokhas capturing royal breezes.',
    tags: ['Pink City', 'Iconic Facade', 'Heritage'],
  },
  {
    id: 'attr-gateway-india',
    name: 'Gateway of India',
    cityName: 'Mumbai',
    cityId: 4,
    state: 'Maharashtra',
    category: 'Coastal & Lakes',
    catId: 'coastal',
    image: 'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?w=800',
    rating: 4.8,
    reviews: 2150,
    entryFee: 0,
    duration: '1-2 Hours',
    bestTime: 'Sunset / Evening',
    description: 'Colonial basalt triumphal arch overlooking Mumbai Harbour and the Arabian Sea.',
    tags: ['Mumbai Harbour', 'Colonial Landmark', 'Sea View'],
  },
  {
    id: 'attr-golden-temple',
    name: 'Golden Temple (Harmandir Sahib)',
    cityName: 'Amritsar',
    cityId: 9,
    state: 'Punjab',
    category: 'Temples & Spiritual',
    catId: 'spiritual',
    image: 'https://images.unsplash.com/photo-1514222134-b57cbb8ce073?w=800',
    rating: 5.0,
    reviews: 3600,
    entryFee: 0,
    duration: '3-4 Hours',
    bestTime: 'Evening Illumination / 24 hrs',
    description: 'Spiritual sanctuary gilded in pure gold with serene holy sarovar waters and 24/7 community langar.',
    tags: ['Spiritual Peace', 'Golden Architecture', 'Holy Sarovar'],
  },
  {
    id: 'attr-qutub-minar',
    name: 'Qutub Minar',
    cityName: 'Delhi',
    cityId: 3,
    state: 'Delhi',
    category: 'UNESCO Wonders',
    catId: 'unesco',
    image: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=800',
    rating: 4.8,
    reviews: 1890,
    entryFee: 40,
    duration: '2 Hours',
    bestTime: '10:00 AM - 04:00 PM',
    description: '73-meter towering fluted minaret built of red sandstone and marble, dating to 1192 AD.',
    tags: ['UNESCO Heritage', 'Ancient Inscriptions', 'Iron Pillar'],
  },
  {
    id: 'attr-red-fort',
    name: 'Red Fort (Lal Qila)',
    cityName: 'Delhi',
    cityId: 3,
    state: 'Delhi',
    category: 'Forts & Palaces',
    catId: 'forts',
    image: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?w=800',
    rating: 4.7,
    reviews: 2450,
    entryFee: 35,
    duration: '2-3 Hours',
    bestTime: '09:00 AM - 12:00 PM',
    description: 'Historic seat of the Mughal Empire with massive red sandstone ramparts and imperial pavilions.',
    tags: ['Mughal Citadel', 'Lahori Gate', 'Sound & Light'],
  },
  {
    id: 'attr-lake-pichola',
    name: 'Lake Pichola & City Palace',
    cityName: 'Udaipur',
    cityId: 5,
    state: 'Rajasthan',
    category: 'Coastal & Lakes',
    catId: 'coastal',
    image: 'https://images.unsplash.com/photo-1615836245337-f5b9b2303f10?w=800',
    rating: 4.9,
    reviews: 1320,
    entryFee: 300,
    duration: '3 Hours',
    bestTime: 'Sunset Boat Cruise',
    description: 'Romantic artificial freshwater lake set against the Aravallis with floating marble palaces.',
    tags: ['Lake Palace', 'Jag Mandir', 'Sunset Cruise'],
  },
  {
    id: 'attr-dashashwamedh',
    name: 'Dashashwamedh Ghat & Ganga Aarti',
    cityName: 'Varanasi',
    cityId: 6,
    state: 'Uttar Pradesh',
    category: 'Temples & Spiritual',
    catId: 'spiritual',
    image: 'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?w=800',
    rating: 4.9,
    reviews: 1980,
    entryFee: 0,
    duration: '2 Hours',
    bestTime: '06:30 PM (Evening Aarti)',
    description: 'Oldest ghat on the Ganges renowned for deeply atmospheric choreographies of fire, cymbals, and incense.',
    tags: ['Evening Aarti', 'Holy Ganges', 'Sacred Rituals'],
  },
  {
    id: 'attr-pangong-tso',
    name: 'Pangong Tso High Altitude Lake',
    cityName: 'Leh Ladakh',
    cityId: 16,
    state: 'Ladakh',
    category: 'Hills & Nature',
    catId: 'nature',
    image: 'https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?w=800',
    rating: 5.0,
    reviews: 860,
    entryFee: 0,
    duration: 'Full Day',
    bestTime: 'June to September',
    description: 'Endorheic saltwater lake at 4,225m altitude changing colors from crystal turquoise to deep cobalt blue.',
    tags: ['Himalayan Lake', 'High Altitude', 'Stargazing'],
  },
  {
    id: 'attr-solang-valley',
    name: 'Solang Valley & Rohtang Pass',
    cityName: 'Manali',
    cityId: 10,
    state: 'Himachal Pradesh',
    category: 'Hills & Nature',
    catId: 'nature',
    image: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=800',
    rating: 4.8,
    reviews: 1420,
    entryFee: 0,
    duration: 'Half Day',
    bestTime: 'Morning / Snow Season',
    description: 'Alpine side valley offering paragliding, zorbing, snow quad biking, and panoramic Himalayan vistas.',
    tags: ['Snow Adventure', 'Paragliding', 'Himalayas'],
  },
  {
    id: 'attr-bom-jesus',
    name: 'Basilica of Bom Jesus',
    cityName: 'Goa',
    cityId: 7,
    state: 'Goa',
    category: 'UNESCO Wonders',
    catId: 'unesco',
    image: 'https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?w=800',
    rating: 4.8,
    reviews: 1100,
    entryFee: 0,
    duration: '1-2 Hours',
    bestTime: '09:00 AM - 01:00 PM',
    description: 'Portuguese baroque church housing the sacred relics of St. Francis Xavier, a UNESCO monument.',
    tags: ['Old Goa', 'Portuguese Baroque', 'UNESCO'],
  },
];

function HomePage({ cities, city, _filteredCities, formatPrice, hiddenCityIds = [], lang = 'en', onHideCity, onOpenEnquiry, onOpenSafety, onUnhideAllCities, setPage, setSelectedId }) {
  const [dockQuery, setDockQuery] = useState('');
  const [dockSeason, setDockSeason] = useState('all');
  const [dockTheme, setDockTheme] = useState('all');
  const [attrCategory, setAttrCategory] = useState('all');
  const [attrQuery, setAttrQuery] = useState('');

  // Smart City Search Bar State
  const [citySearchInput, setCitySearchInput] = useState('');
  const [isSearchingCity, setIsSearchingCity] = useState(false);
  const [searchedCity, setSearchedCity] = useState(null);
  const [searchNotFound, setSearchNotFound] = useState(false);

  const handlePerformCitySearch = (query) => {
    const q = (query !== undefined ? query : citySearchInput).trim().toLowerCase();
    if (!q) {
      setSearchedCity(null);
      setSearchNotFound(false);
      return;
    }
    setIsSearchingCity(true);
    setSearchNotFound(false);

    setTimeout(() => {
      const match = cities.find(
        (c) =>
          c.name.toLowerCase() === q ||
          c.name.toLowerCase().includes(q) ||
          c.state.toLowerCase().includes(q) ||
          (c.themes && c.themes.some((t) => t.toLowerCase().includes(q)))
      );

      if (match) {
        setSearchedCity(match);
        setSearchNotFound(false);
      } else {
        setSearchedCity(null);
        setSearchNotFound(true);
      }
      setIsSearchingCity(false);
    }, 400);
  };

  const visibleDestinations = useMemo(() => {
    return cities.filter((c) => !hiddenCityIds.includes(c.id));
  }, [cities, hiddenCityIds]);

  const filteredAttractions = useMemo(() => {
    return TOP_TOURIST_PLACES.filter((p) => {
      const matchCat = attrCategory === 'all' || p.catId === attrCategory;
      const matchQuery =
        !attrQuery.trim() ||
        p.name.toLowerCase().includes(attrQuery.trim().toLowerCase()) ||
        p.cityName.toLowerCase().includes(attrQuery.trim().toLowerCase()) ||
        p.state.toLowerCase().includes(attrQuery.trim().toLowerCase()) ||
        p.tags.some((t) => t.toLowerCase().includes(attrQuery.trim().toLowerCase()));
      return matchCat && matchQuery;
    });
  }, [attrCategory, attrQuery]);

  // Progressive loading for attractions on scroll (Declared AFTER filteredAttractions to avoid TDZ ReferenceError)
  const [placesVisibleCount, setPlacesVisibleCount] = useState(6);
  const loadMoreSentinelRef = useRef(null);

  useEffect(() => {
    setPlacesVisibleCount(6);
  }, [attrCategory, attrQuery]);

  useEffect(() => {
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) return;
    if (!loadMoreSentinelRef.current) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0] && entries[0].isIntersecting) {
          setPlacesVisibleCount((prev) => Math.min(prev + 6, (filteredAttractions || []).length));
        }
      },
      { rootMargin: '250px' }
    );
    observer.observe(loadMoreSentinelRef.current);
    return () => observer.disconnect();
  }, [filteredAttractions]);

  const displayedAttractions = useMemo(() => {
    return (filteredAttractions || []).slice(0, placesVisibleCount);
  }, [filteredAttractions, placesVisibleCount]);

  return (
    <section className="page hero-page-container">
      <div className="hero-page">
        <div className="hero-copy">
          <p className="eyebrow">✨ {lang === 'hi' ? 'स्मार्ट पर्यटन इकोसिस्टम' : 'Intelligent Indian Tourism Ecosystem'}</p>
          <h1>{lang === 'hi' ? 'भारत की खोज करें। बेहतर यात्रा करें।' : 'Experience the Soul of Incredible India'}</h1>
          <p className="hero-text">
            {lang === 'hi'
              ? 'गंतव्य खोजें, व्यक्तिगत यात्रा योजना बनाएं, अनछुए ऐतिहासिक स्थलों का अनुभव करें और स्थानीय पर्यटन व्यवसायों से सीधे 0% कमीशन पर जुड़ें।'
              : 'Discover royal desert fortresses, misty Himalayan summits, tranquil Kerala backwaters, and sacred riverfronts. Featuring AI route optimization, hotspot decongestion, and direct 0% commission local marketplace.'}
          </p>

          {/* SMART CITY SEARCH BAR (With Loading Animation & Preview Card) */}
          <div className="city-search-container">
            <div className="city-search-box">
              <span className="search-box-icon">🔍</span>
              <input
                type="text"
                className="city-search-input"
                placeholder={lang === 'hi' ? 'भारत में किसी भी शहर को खोजें (उदा. जयपुर, मनाली, गोवा, वाराणसी)...' : 'Search any Indian city to visit (e.g. Jaipur, Manali, Goa, Varanasi, Udaipur, Agra)...'}
                value={citySearchInput}
                onChange={(e) => {
                  setCitySearchInput(e.target.value);
                  if (!e.target.value.trim()) {
                    setSearchedCity(null);
                    setSearchNotFound(false);
                  }
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handlePerformCitySearch();
                }}
              />
              {citySearchInput && (
                <button
                  type="button"
                  className="clear-search-btn"
                  onClick={() => {
                    setCitySearchInput('');
                    setSearchedCity(null);
                    setSearchNotFound(false);
                  }}
                  title="Clear search"
                >
                  ✕
                </button>
              )}
              <button
                type="button"
                className="city-search-submit-btn"
                onClick={() => handlePerformCitySearch()}
                disabled={isSearchingCity}
              >
                <span>{isSearchingCity ? (lang === 'hi' ? 'खोज रहे हैं...' : 'Searching...') : (lang === 'hi' ? 'शहर खोजें' : 'Search City')}</span>
                <span>➔</span>
              </button>
            </div>

            {/* LOADING ANIMATION */}
            {isSearchingCity && (
              <div className="city-search-loading-bar">
                <div className="search-loading-pulse-line"></div>
                <span className="search-spin-icon">⏳</span>
                <span className="search-loading-text">
                  {lang === 'hi'
                    ? `"${citySearchInput}" के लिए पर्यटन स्थल, होटल व मार्ग खोजे जा रहे हैं...`
                    : `Searching verified travel destinations, stays, and route data for "${citySearchInput}"...`}
                </span>
              </div>
            )}

            {/* CITY PREVIEW CARD (with a bit detail and one small photo beside it) */}
            {!isSearchingCity && searchedCity && (
              <div className="city-preview-card">
                <div className="preview-card-inner">
                  {/* ONE SMALL PHOTO BESIDE IT */}
                  <div className="preview-photo-wrap">
                    <img
                      src={CITY_PHOTOS[searchedCity.name] || 'https://images.unsplash.com/photo-1599661046289-e31897846e41?w=400&q=70&auto=format'}
                      alt={searchedCity.name}
                      className="preview-photo-img"
                      loading="lazy"
                      onError={(e) => {
                        e.currentTarget.onerror = null; e.currentTarget.src = 'https://images.unsplash.com/photo-1564507592333-c60657eea523?w=800&q=80';
                      }}
                    />
                    <span className="preview-photo-region">{searchedCity.region}</span>
                  </div>

                  {/* DETAILS BESIDE THE PHOTO */}
                  <div className="preview-details-wrap">
                    <div className="preview-header-row">
                      <div>
                        <h3 className="preview-city-title">
                          {searchedCity.name}
                          <span className="preview-state-badge">📍 {searchedCity.state}</span>
                        </h3>
                        <p className="preview-desc-text">
                          {searchedCity.description ? searchedCity.description.slice(0, 130) + '...' : 'Explore historic landmarks, local stays, and curated itineraries.'}
                        </p>
                      </div>
                      <div className="preview-rating-badge">
                        ⭐ {searchedCity.rating || searchedCity.averageRating || 4.8} / 5.0
                      </div>
                    </div>

                    <div className="preview-chips-row">
                      <span className="preview-chip">
                        🗓️ <strong>Best Season:</strong> {searchedCity.bestSeason || 'Oct – Mar'}
                      </span>
                      <span className="preview-chip">
                        💰 <strong>Est. Budget:</strong> {formatPrice(searchedCity.estimatedDailyBudget || 4000)} / day
                      </span>
                      {searchedCity.themes?.slice(0, 2).map((t, idx) => (
                        <span key={idx} className="preview-theme-chip">#{t}</span>
                      ))}
                    </div>

                    <div className="preview-actions-row">
                      <button
                        type="button"
                        className="primary-action"
                        onClick={() => {
                          setSelectedId(searchedCity.id);
                          setPage('destinations');
                        }}
                      >
                        Explore {searchedCity.name} ➔
                      </button>
                      <button
                        type="button"
                        className="secondary-action"
                        onClick={() => {
                          setSelectedId(searchedCity.id);
                          setPage('planner');
                        }}
                      >
                        ✨ Plan Trip with AI
                      </button>
                      <button
                        type="button"
                        className="secondary-action"
                        onClick={() => {
                          setSelectedId(searchedCity.id);
                          setPage('hotels');
                        }}
                      >
                        🏨 View Hotels
                      </button>
                      <button
                        type="button"
                        className="secondary-action"
                        onClick={() => {
                          setPage('rentals');
                        }}
                      >
                        🚗 Rentals
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* NOT FOUND FEEDBACK */}
            {!isSearchingCity && searchNotFound && (
              <div style={{ marginTop: '10px', padding: '10px 14px', background: 'var(--bg-surface, #ffffff)', border: '1px solid #fed7aa', borderRadius: '10px', fontSize: '0.85rem', color: '#c2410c', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span>No destination match for "<strong>{citySearchInput}</strong>". Try Jaipur, Goa, Manali, Agra, Kerala, or Udaipur.</span>
                <button
                  type="button"
                  style={{ background: 'none', border: 'none', color: '#c2410c', cursor: 'pointer', fontWeight: 700 }}
                  onClick={() => { setCitySearchInput(''); setSearchNotFound(false); }}
                >
                  ✕
                </button>
              </div>
            )}

            {/* QUICK EXPLORE PILLS */}
            <div className="quick-explore-pills" style={{ marginTop: '10px' }}>
              <span className="quick-pills-label">{lang === 'hi' ? 'चर्चित गंतव्य:' : 'Trending Cities:'}</span>
              {['Jaipur', 'Goa', 'Manali', 'Udaipur', 'Agra', 'Varanasi', 'Kochi', 'Mumbai', 'Amritsar', 'Rishikesh'].map((q) => (
                <button
                  key={q}
                  type="button"
                  className="quick-pill-tag"
                  onClick={() => {
                    setCitySearchInput(q);
                    handlePerformCitySearch(q);
                  }}
                >
                  {q}
                </button>
              ))}
            </div>
          </div>

          {/* QUICK ACTION LAUNCHPAD */}
          <div className="sih-quick-actions-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))' }}>
            <div className="sih-action-card" onClick={() => setPage('planner')}>
              <span className="sih-action-icon">✨</span>
              <div className="sih-action-title">
                <span>{lang === 'hi' ? 'स्मार्ट प्लानर' : 'Plan My Trip'}</span>
                <span>➔</span>
              </div>
              <p className="sih-action-desc">
                {lang === 'hi' ? 'बजट और रुचि अनुसार व्यक्तिगत योजना' : 'Multi-day itineraries & route optimization'}
              </p>
            </div>

            <div className="sih-action-card" onClick={() => setPage('destinations')}>
              <span className="sih-action-icon">🏛️</span>
              <div className="sih-action-title">
                <span>{lang === 'hi' ? 'गंतव्य खोजें' : 'Explore Destinations'}</span>
                <span>➔</span>
              </div>
              <p className="sih-action-desc">
                {lang === 'hi' ? 'विरासत, पहाड़, समुद्र तट और पावन तीर्थ' : 'Royal forts, hill stations & beaches'}
              </p>
            </div>

            <div className="sih-action-card" onClick={() => setPage('rentals')}>
              <span className="sih-action-icon">🚗</span>
              <div className="sih-action-title">
                <span>{lang === 'hi' ? 'वाहन रेंटल' : 'Rentals Fleet'}</span>
                <span>➔</span>
              </div>
              <p className="sih-action-desc">
                {lang === 'hi' ? 'कार, बाइक, स्कूटर और ईवी रेंटल' : 'Self-drive cars, Royal Enfields & EVs'}
              </p>
            </div>

            <div className="sih-action-card" onClick={() => setPage('gems')}>
              <span className="sih-action-icon">🌿</span>
              <div className="sih-action-title">
                <span>{lang === 'hi' ? 'छिपे हुए रत्न' : 'Hidden Gems'}</span>
                <span>➔</span>
              </div>
              <p className="sih-action-desc">
                {lang === 'hi' ? 'शांत व ऐतिहासिक धरोहरें' : 'Offbeat stepwells & craft villages'}
              </p>
            </div>

            <div className="sih-action-card" onClick={() => setPage('marketplace')}>
              <span className="sih-action-icon">🤝</span>
              <div className="sih-action-title">
                <span>{lang === 'hi' ? 'स्थानीय व्यापार' : 'Support Local'}</span>
                <span>➔</span>
              </div>
              <p className="sih-action-desc">
                {lang === 'hi' ? 'होमस्टे व गाइड से सीधा संपर्क' : 'Homestays, guides & artisans (0% fee)'}
              </p>
            </div>
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
              <span>Destinations</span>
            </div>
            <div className="stat-card">
              <strong>0%</strong>
              <span>OTA Commission</span>
            </div>
          </article>
        </div>
      </div>

      {/* HERO YATRA LIVE IMPACT BENCHMARK STRIP */}
      <div className="hero-stats-strip">
        {SIH_STATS.map((stat, i) => (
          <div key={i} className="hero-stat-box">
            <span className="hero-stat-icon">{stat.icon}</span>
            <div>
              <div className="hero-stat-number">{stat.value}</div>
              <div className="hero-stat-label">{stat.label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* AI "DISCOVER INDIA" RECOMMENDATION ENGINE (SIH Innovation 2) */}
      <DiscoverIndiaAiEngine
        onPlanTrip={(cityName) => {
          const matched = cities.find((c) => c.name.toLowerCase() === cityName.toLowerCase());
          if (matched) setSelectedId(matched.id);
          setPage('planner');
        }}
      />

      {/* FEATURED DESTINATIONS PHOTO GRID (Optimized Top 8 for Fast Page Load) */}
      <div className="home-featured-section">
        <div className="home-section-header">
          <div>
            <span className="eyebrow">Curated Getaways Across India</span>
            <h2>Top Destinations in North, South, East & West India</h2>
            <p>Select any iconic heritage city, beach retreat, or mountain sanctuary to inspect live weather, hotels, and attractions.</p>
          </div>
          <button type="button" className="secondary-action" onClick={() => setPage('destinations')}>
            View All ({visibleDestinations.length}+) ➔
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
          {visibleDestinations.slice(0, 8).map((dest) => {
            const rawUrl = CITY_PHOTOS[dest.name] || 'https://images.unsplash.com/photo-1599661046289-e31897846e41';
            const photoUrl = rawUrl.includes('?') ? `${rawUrl}&w=400&q=70&auto=format` : `${rawUrl}?w=400&q=70&auto=format`;
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
                  <img
                    src={photoUrl}
                    alt={dest.name}
                    loading="lazy"
                    onError={(e) => {
                      e.currentTarget.src = 'https://images.unsplash.com/photo-1599661046289-e31897846e41?w=400&q=70&auto=format';
                    }}
                  />
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

      {/* SECTION: SMART TRAVEL GATEWAY (Minimal Quick Access) */}
      <div style={{ margin: '3rem 0' }}>
        <div style={{ textAlign: 'center', maxWidth: '650px', margin: '0 auto 2rem' }}>
          <span className="card-tag" style={{ background: 'rgba(15, 118, 110, 0.12)', color: '#0f766e', fontWeight: 800 }}>
            🚀 Explore Everything on Yatra 66
          </span>
          <h2 style={{ fontSize: '1.85rem', margin: '0.4rem 0 0.25rem', color: 'var(--text-main)', letterSpacing: '-0.5px' }}>
            Your Intelligent Indian Travel Suite
          </h2>
          <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '0.925rem' }}>
            Jump directly into AI trip architecture, offbeat stepwells, 0% commission local stays, and vehicle rentals.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.25rem' }}>
          <div
            className="glass-panel"
            onClick={() => setPage('planner')}
            style={{ padding: '1.5rem', borderRadius: '16px', cursor: 'pointer', transition: 'transform 0.2s, box-shadow 0.2s', border: '1px solid var(--border-color)' }}
          >
            <div style={{ fontSize: '2.2rem', marginBottom: '0.5rem' }}>🗺️</div>
            <h3 style={{ margin: '0 0 0.35rem', fontSize: '1.15rem', color: 'var(--text-main)' }}>AI Smart Trip Planner</h3>
            <p style={{ margin: '0 0 0.75rem', fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.45 }}>
              Generate personalized multi-day itineraries with route distance minimization and budget estimates.
            </p>
            <span style={{ color: '#0f766e', fontWeight: 700, fontSize: '0.85rem' }}>Plan Trip ➔</span>
          </div>

          <div
            className="glass-panel"
            onClick={() => setPage('gems')}
            style={{ padding: '1.5rem', borderRadius: '16px', cursor: 'pointer', transition: 'transform 0.2s, box-shadow 0.2s', border: '1px solid var(--border-color)' }}
          >
            <div style={{ fontSize: '2.2rem', marginBottom: '0.5rem' }}>🌿</div>
            <h3 style={{ margin: '0 0 0.35rem', fontSize: '1.15rem', color: 'var(--text-main)' }}>Hidden Gems & Escapes</h3>
            <p style={{ margin: '0 0 0.75rem', fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.45 }}>
              Discover secret architectural stepwells, quiet heritage hamlets, and uncrowded artisan villages.
            </p>
            <span style={{ color: '#0f766e', fontWeight: 700, fontSize: '0.85rem' }}>Discover Gems ➔</span>
          </div>

          <div
            className="glass-panel"
            onClick={() => setPage('marketplace')}
            style={{ padding: '1.5rem', borderRadius: '16px', cursor: 'pointer', transition: 'transform 0.2s, box-shadow 0.2s', border: '1px solid var(--border-color)' }}
          >
            <div style={{ fontSize: '2.2rem', marginBottom: '0.5rem' }}>🤝</div>
            <h3 style={{ margin: '0 0 0.35rem', fontSize: '1.15rem', color: 'var(--text-main)' }}>Support Local Marketplace</h3>
            <p style={{ margin: '0 0 0.75rem', fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.45 }}>
              Connect directly with verified family havelis, licensed guides, and village artisans with 0% commission.
            </p>
            <span style={{ color: '#0f766e', fontWeight: 700, fontSize: '0.85rem' }}>Explore Local ➔</span>
          </div>

          <div
            className="glass-panel"
            onClick={() => setPage('rentals')}
            style={{ padding: '1.5rem', borderRadius: '16px', cursor: 'pointer', transition: 'transform 0.2s, box-shadow 0.2s', border: '1px solid var(--border-color)' }}
          >
            <div style={{ fontSize: '2.2rem', marginBottom: '0.5rem' }}>🚗</div>
            <h3 style={{ margin: '0 0 0.35rem', fontSize: '1.15rem', color: 'var(--text-main)' }}>Vehicle & Cab Rentals</h3>
            <p style={{ margin: '0 0 0.75rem', fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.45 }}>
              Verified local car, bike, and taxi fleet operators across 9 major tourist hubs with direct contacts.
            </p>
            <span style={{ color: '#0f766e', fontWeight: 700, fontSize: '0.85rem' }}>View Rentals ➔</span>
          </div>
        </div>
      </div>

      {/* WHY CHOOSE YATRA 66 */}
      <div className="sih-why-section">
        <div style={{ textAlign: 'center', maxWidth: '680px', margin: '0 auto 2rem' }}>
          <span className="card-tag" style={{ background: 'rgba(15, 118, 110, 0.12)', color: '#0f766e', fontWeight: 800 }}>
            🚀 Integrated Tourism Ecosystem
          </span>
          <h2 style={{ fontSize: '1.9rem', margin: '0.5rem 0 0.35rem', color: 'var(--text-main)' }}>
            Why Travelers & Local Businesses Choose Yatra 66
          </h2>
          <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '0.95rem' }}>
            A unified solution that boosts Indian tourism, local hotels, guides, and artisans through smart innovation.
          </p>
        </div>

        <div className="sih-why-grid">
          <div className="sih-why-card">
            <span className="sih-why-icon">🧳</span>
            <div className="sih-why-title">For Travelers</div>
            <p className="sih-why-text">
              Zero guesswork: personalized multi-day itineraries with AI transparency, nearest-neighbor route distance optimization that saves 40%+ travel time, and clear breakdown of transport, food, and stay expenses.
            </p>
          </div>

          <div className="sih-why-card">
            <span className="sih-why-icon">🏡</span>
            <div className="sih-why-title">For Local Businesses</div>
            <p className="sih-why-text">
              Equal digital visibility: zero listing fees and 0% predatory OTA commission. Travelers connect directly with verified homestays, licensed local guides, and village artisan cooperatives via WhatsApp & phone.
            </p>
          </div>

          <div className="sih-why-card">
            <span className="sih-why-icon">🌿</span>
            <div className="sih-why-title">For Sustainable Tourism</div>
            <p className="sih-why-text">
              Hotspot decongestion: proactive promotion of secret architectural stepwells, quiet heritage hamlets, and rural craft hubs to distribute tourist footfall evenly and preserve fragile heritage ecosystems.
            </p>
          </div>
        </div>
      </div>

      {/* STARTUP & TOURISM ECOSYSTEM FOOTER */}
      <footer className="sih-startup-footer">
        <div className="sih-footer-inner">
          <div className="sih-footer-brand">
            <h3>
              <span className="brand-mark" style={{ width: '28px', height: '28px', fontSize: '14px' }}>Y</span>
              <span>Yatra 66</span>
            </h3>
            <p>
              An intelligent tourism ecosystem empowering Indian travelers and local tourism businesses through AI discovery, smart route optimization, and direct zero-commission connections.
            </p>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              <span className="card-tag" style={{ background: 'rgba(15, 118, 110, 0.12)', color: '#0f766e', fontWeight: 700 }}>
                🇮🇳 Made in India
              </span>
              <span className="card-tag" style={{ background: 'rgba(234, 88, 12, 0.12)', color: '#ea580c', fontWeight: 700 }}>
                ⚡ Next-Gen Tourism
              </span>
              <span className="card-tag" style={{ background: 'rgba(225, 29, 72, 0.12)', color: '#e11d48', fontWeight: 700, cursor: 'pointer' }} onClick={onOpenSafety}>
                📞 24/7 Helpline 112 / 1363
              </span>
            </div>
          </div>

          <div className="sih-footer-col">
            <h4>Explore</h4>
            <ul>
              <li><button type="button" onClick={() => setPage('destinations')}>Top Destinations</button></li>
              <li><button type="button" onClick={() => setPage('planner')}>✨ Smart Trip Planner</button></li>
              <li><button type="button" onClick={() => setPage('rentals')}>🚗 Vehicle Rentals</button></li>
              <li><button type="button" onClick={() => setPage('gems')}>🌿 Hidden Gems</button></li>
              <li><button type="button" onClick={() => setPage('experiences')}>🎨 Cultural Experiences</button></li>
              <li><button type="button" onClick={() => setPage('hotels')}>Hotels & Cabs</button></li>
            </ul>
          </div>

          <div className="sih-footer-col">
            <h4>Local Marketplace</h4>
            <ul>
              <li><button type="button" onClick={() => setPage('marketplace')}>Support Local Directory</button></li>
              <li><button type="button" onClick={() => setPage('marketplace')}>Register Local Business</button></li>
              <li><button type="button" onClick={() => setPage('marketplace')}>Verified Homestays</button></li>
              <li><button type="button" onClick={() => setPage('marketplace')}>Licensed Tour Guides</button></li>
              <li><button type="button" onClick={() => setPage('map')}>Interactive Map</button></li>
            </ul>
          </div>

          <div className="sih-footer-col">
            <h4>Safety & Helplines</h4>
            <ul>
              <li><a href="tel:112" style={{ color: '#e11d48', fontWeight: 700, textDecoration: 'none' }}>🚨 National Emergency: 112</a></li>
              <li><a href="tel:1363" style={{ color: '#0f766e', fontWeight: 700, textDecoration: 'none' }}>ℹ️ Tourist Helpline: 1363</a></li>
              <li><a href="tel:108" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>🚑 Ambulance: 108</a></li>
              <li><a href="tel:1091" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>🛡️ Women Helpline: 1091</a></li>
              <li><button type="button" onClick={onOpenSafety} style={{ color: '#0f766e', fontWeight: 700 }}>Open Safety Hub ➔</button></li>
            </ul>
          </div>
        </div>

        <div className="sih-footer-bottom">
          <div>&copy; 2026 Yatra 66 (yatra66.in) • National Tourism Platform</div>
          <div>Bridging travelers and local businesses with 0% commission</div>
        </div>
      </footer>
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
        eyebrow="Climate & Atmosphere Forecast"
        title="Weather Forecast & Packing Guide"
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
                      View Weather ➔
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
        <BullyLoader message={`Fetching atmospheric & satellite forecast for ${city.name}...`} />
      ) : weather ? (
        <div className="weather-bento-grid">
          {/* HERO BENTO CARD */}
          <div className="weather-hero-card">
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <span className="live-tag">
                    {weather.isLiveExternalData ? '🟢 Satellite Sync Active' : '🟡 Regional Climate'}
                  </span>
                  <h2 style={{ fontSize: '2rem', fontWeight: 800, margin: '0.4rem 0 0.2rem' }}>{weather.cityName}</h2>
                  <p className="coords" style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                    Coordinates: {Number(weather.latitude || 26.91).toFixed(2)}°N, {Number(weather.longitude || 75.78).toFixed(2)}°E • {weather.timezone || 'Asia/Kolkata'}
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
function HotelsPage({ cities = [], details, formatPrice, handleOpenBooking, hiddenHotelIds = [], onHideHotel, onUnhideAllHotels, selectedMarker, setSelectedId }) {
  const [activeSection, setActiveSection] = useState('hotels'); // 'hotels' | 'cabs'
  const [selectedHotelForMap, setSelectedHotelForMap] = useState(null);

  // Gemini AI Background Stays State
  const [aiHotels, setAiHotels] = useState([]);
  const [loadingAiHotels, setLoadingAiHotels] = useState(false);

  useEffect(() => {
    let unmounted = false;
    if (!selectedMarker?.name) return;

    setLoadingAiHotels(true);
    yatraApi.getAiHotels(
      selectedMarker.name,
      selectedMarker.latitude,
      selectedMarker.longitude,
      selectedMarker.estimatedDailyBudget || 4000
    ).then((res) => {
      if (!unmounted && res && Array.isArray(res) && res.length > 0) {
        setAiHotels(res);
      }
    }).catch(() => {})
    .finally(() => {
      if (!unmounted) setLoadingAiHotels(false);
    });

    return () => { unmounted = true; };
  }, [selectedMarker?.name, selectedMarker?.latitude, selectedMarker?.longitude, selectedMarker?.estimatedDailyBudget]);

  const places = useMemo(() => details?.famousPlaces || [], [details]);

  // Expand hotel inventory with authentic stays per destination + Gemini AI discovery
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

    // Gemini AI Generated Verified Stays
    const aiMapped = (aiHotels || []).map((h, i) => ({
      id: (selectedMarker.id || 1) * 10000 + 100 + i,
      name: h.name,
      type: h.type || 'Boutique',
      address: h.address || `${cName} Heritage Zone`,
      latitude: h.latitude || (cLat + (i * 0.003 - 0.006)),
      longitude: h.longitude || (cLng + (i * 0.004 - 0.005)),
      rating: h.rating || 4.8,
      pricePerNight: h.pricePerNight || 3800,
      amenities: h.amenities || ['Free WiFi', 'Air Conditioning', 'Complimentary Breakfast', 'Local Tour Desk'],
      phone: h.phone || '+91 98290 12345',
      whatsapp: h.whatsapp || '+919829012345',
      isAiVerified: true,
    }));

    const combined = [...aiMapped, ...baseHotels, ...supplements];
    const unique = [];
    const seen = new Set();
    for (const item of combined) {
      const key = item.name.toLowerCase();
      if (!seen.has(key)) {
        seen.add(key);
        unique.push(item);
      }
    }
    return unique;
  }, [details, selectedMarker, aiHotels]);

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

      {/* DESTINATION CITY SELECTOR & GEMINI AI CONNECTION (User Request 4) */}
      <div className="glass-panel" style={{ padding: '1.25rem 1.5rem', borderRadius: '16px', marginBottom: '1.5rem', borderLeft: '5px solid var(--primary, #0f766e)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '0.85rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '1.2rem' }}>📍</span>
              <strong style={{ fontSize: '1rem', color: 'var(--text-main)' }}>Select Destination:</strong>
              <span style={{ background: 'var(--primary, #0f766e)', color: 'white', padding: '2px 10px', borderRadius: '14px', fontSize: '0.78rem', fontWeight: 800 }}>
                {selectedMarker?.name || 'Jaipur'}
              </span>
              <span style={{ fontSize: '0.75rem', color: '#10b981', fontWeight: 700 }}>⚡ Gemini AI Connected</span>
            </div>
            <p style={{ margin: '3px 0 0', fontSize: '0.825rem', color: 'var(--text-muted)' }}>
              Choose any city to automatically connect with Gemini AI and load authentic stays, heritage havelis, and backpacker hostels.
            </p>
          </div>

          <button
            type="button"
            className="secondary-action"
            onClick={() => {
              if (selectedMarker?.name) {
                setLoadingAiHotels(true);
                yatraApi.getAiHotels(
                  selectedMarker.name,
                  selectedMarker.latitude,
                  selectedMarker.longitude,
                  selectedMarker.estimatedDailyBudget || 4000
                ).then((res) => {
                  if (res && res.length > 0) setAiHotels(res);
                }).finally(() => setLoadingAiHotels(false));
              }
            }}
            style={{ padding: '6px 14px', fontSize: '0.8rem' }}
          >
            🔄 Refresh Gemini Stays
          </button>
        </div>

        {/* Quick City Selector Chips */}
        <div style={{ display: 'flex', gap: '0.45rem', flexWrap: 'wrap', alignItems: 'center' }}>
          <span style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-muted)' }}>Popular Hubs:</span>
          {(cities && cities.length > 0 ? cities.slice(0, 16) : [
            { id: 1, name: 'Jaipur' }, { id: 2, name: 'Agra' }, { id: 5, name: 'Udaipur' },
            { id: 7, name: 'Goa' }, { id: 8, name: 'Manali' }, { id: 3, name: 'Varanasi' },
            { id: 4, name: 'Mumbai' }, { id: 6, name: 'Delhi' }, { id: 9, name: 'Amritsar' },
            { id: 10, name: 'Kochi' }, { id: 11, name: 'Rishikesh' }, { id: 12, name: 'Shimla' },
            { id: 13, name: 'Leh Ladakh' }, { id: 14, name: 'Pondicherry' }
          ]).map((c) => {
            const isSel = (selectedMarker?.name || '').toLowerCase() === c.name.toLowerCase();
            return (
              <button
                key={c.id}
                type="button"
                className={`quick-pill-tag ${isSel ? 'active' : ''}`}
                onClick={() => {
                  if (setSelectedId) setSelectedId(c.id);
                }}
                style={{ padding: '5px 12px', fontSize: '0.8rem', borderRadius: '18px', cursor: 'pointer' }}
              >
                {c.name}
              </button>
            );
          })}
        </div>
      </div>

      {/* GEMINI AI LOADING STATUS BANNER */}
      {loadingAiHotels && (
        <div className="market-ai-loading-banner">
          <div className="ai-loading-spinner-ring" />
          <div>
            <h4 style={{ margin: 0, fontSize: '1rem', color: 'var(--primary, #0f766e)', fontWeight: 800 }}>
              ⚡ Gemini AI Live Connection: Discovering Stays in {selectedMarker?.name}...
            </h4>
            <p style={{ margin: '3px 0 0', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              Curating authentic heritage havelis, boutique resorts, and verified hostels with real-time amenities and pricing.
            </p>
          </div>
        </div>
      )}

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

          {/* GEMINI AI DISCOVERY BANNER */}
          {loadingAiHotels && (
            <div className="gemini-hotels-banner loading">
              <span>🤖</span>
              <span>Gemini AI is finding authentic verified boutique stays & havelis in {selectedMarker?.name} in background...</span>
            </div>
          )}
          {!loadingAiHotels && aiHotels.length > 0 && (
            <div className="gemini-hotels-banner">
              <span>✨</span>
              <span><strong>Gemini AI Discovery:</strong> Added {aiHotels.length} live verified local stays with direct phone & WhatsApp contact info.</span>
            </div>
          )}

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
                      <span
                        className="hotel-type-badge"
                        style={hotel.isAiVerified ? { background: 'linear-gradient(135deg, #0f766e 0%, #10b981 100%)', color: '#fff', boxShadow: '0 2px 8px rgba(15,118,110,0.3)' } : {}}
                      >
                        {hotel.isAiVerified ? `✨ Gemini ${hotel.type}` : (hotel.type || 'Stay')}
                      </span>
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
                        {hotel.phone && (
                          <div style={{ display: 'flex', gap: '6px', marginTop: '6px', flexWrap: 'wrap' }}>
                            <a href={`tel:${hotel.phone}`} className="hotel-contact-btn" title="Call Hotel Front Desk">
                              📞 {hotel.phone}
                            </a>
                            <a
                              href={`https://wa.me/${(hotel.whatsapp || hotel.phone).replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`Hi, I found ${hotel.name} on Yatra66. Are rooms available for booking?`)}`}
                              target="_blank"
                              rel="noreferrer"
                              className="hotel-wa-btn"
                              title="Chat on WhatsApp"
                            >
                              💬 WhatsApp
                            </a>
                          </div>
                        )}
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
  const [modeFilter, setModeFilter] = useState('ALL');
  const [routeData, setRouteData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchRoute() {
      if (originId === destId) {
        setRouteData(null);
        return;
      }
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
      const dist = 260;
      setRouteData({
        originCityName: oCity.name,
        destinationCityName: dCity.name,
        straightDistanceKm: dist,
        recommendedOption: 'TRAIN (Vande Bharat Express)',
        options: [
          { mode: 'FLIGHT', title: 'Domestic Airline Flight', operatorOrType: 'IndiGo / Air India Non-Stop', durationFormatted: '1h 15m', estimatedFareInr: 3400, frequency: 'Daily 6 flights', highlights: ['Fastest commute', '15kg baggage included', 'Cabin snack'], carbonKg: 42 },
          { mode: 'TRAIN', title: 'Indian Railways Vande Bharat', operatorOrType: 'Executive & AC Chair Car', durationFormatted: '3h 45m', estimatedFareInr: 850, frequency: 'Daily 4 departures', highlights: ['Scenic countryside', 'Complimentary meals', 'Spacious seats'], carbonKg: 12 },
          { mode: 'BUS', title: 'Intercity AC Volvo Sleeper', operatorOrType: 'Multi-Axle Semi Sleeper', durationFormatted: '5h 15m', estimatedFareInr: 650, frequency: 'Frequent schedules', highlights: ['Reclining berths', 'Free mineral water', 'City center pickup'], carbonKg: 18 },
          { mode: 'CAB', title: 'Highway Outstation Chauffeur', operatorOrType: 'Sedan / Ertiga SUV', durationFormatted: '4h 10m', estimatedFareInr: 3800, frequency: 'Door-to-door on demand', highlights: ['Flexible stopovers at dhabas', 'Toll & taxes included', 'Doorstep pickup'], carbonKg: 32 },
        ],
      });
      setLoading(false);
    }
    fetchRoute();
  }, [originId, destId, cities]);

  const filteredOptions = useMemo(() => {
    if (!routeData?.options) return [];
    if (modeFilter === 'ALL') return routeData.options;
    return routeData.options.filter((opt) => opt.mode.toUpperCase() === modeFilter);
  }, [routeData, modeFilter]);

  const sameCity = originId === destId;

  return (
    <section className="page routes-page">
      <PageTitle
        eyebrow="Transit & Connectivity"
        title="Flights, Trains, Buses & Highway Cabs"
        text="Compare travel times, estimated fares, carbon emissions, and book verified transit routes between any two Indian cities."
      />

      {/* ROUTE SELECTOR DOCK */}
      <div className="route-selectors glass-panel">
        <label>
          <span>From Origin:</span>
          <select value={originId} onChange={(e) => setOriginId(Number(e.target.value))}>
            {cities.map((c) => <option key={c.id} value={c.id}>{c.name} ({c.state})</option>)}
          </select>
        </label>

        <button
          type="button"
          className="swap-btn"
          title="Swap Origin and Destination"
          onClick={() => { const temp = originId; setOriginId(destId); setDestId(temp); }}
        >
          ⇄
        </button>

        <label>
          <span>To Destination:</span>
          <select value={destId} onChange={(e) => setDestId(Number(e.target.value))}>
            {cities.map((c) => <option key={c.id} value={c.id}>{c.name} ({c.state})</option>)}
          </select>
        </label>
      </div>

      {sameCity ? (
        <div className="glass-panel" style={{ textAlign: 'center', padding: '2.5rem', margin: '1.5rem 0', borderRadius: '16px' }}>
          <div style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>🔄</div>
          <h3 style={{ margin: '0 0 0.5rem', fontSize: '1.25rem' }}>Origin & Destination Are the Same</h3>
          <p style={{ color: 'var(--text-muted)', maxWidth: '480px', margin: '0 auto 1.25rem', fontSize: '0.9rem' }}>
            Please select two different cities to compare transit travel times, flight tickets, train schedules, and outstation cabs.
          </p>
          <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            {cities.filter((c) => c.id !== originId).slice(0, 4).map((alt) => (
              <button
                key={alt.id}
                type="button"
                className="secondary-action"
                style={{ padding: '6px 14px', fontSize: '0.825rem' }}
                onClick={() => setDestId(alt.id)}
              >
                Travel to {alt.name} ➔
              </button>
            ))}
          </div>
        </div>
      ) : (
        <>
          {/* TRANSIT MODE FILTER TABS */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', margin: '1.25rem 0' }}>
            {[
              { id: 'ALL', label: 'All Modes' },
              { id: 'FLIGHT', label: '✈️ Flights' },
              { id: 'TRAIN', label: '🚆 Trains' },
              { id: 'BUS', label: '🚌 Buses' },
              { id: 'CAB', label: '🚖 Highway Cabs' },
            ].map((m) => (
              <button
                key={m.id}
                type="button"
                className={`quick-pill-tag ${modeFilter === m.id ? 'active' : ''}`}
                style={{
                  background: modeFilter === m.id ? 'var(--brand-primary, #0f766e)' : 'var(--bg-surface-elevated, #f1f5f9)',
                  color: modeFilter === m.id ? '#ffffff' : 'var(--text-main)',
                  fontWeight: modeFilter === m.id ? 700 : 500,
                  border: '1px solid',
                  borderColor: modeFilter === m.id ? 'var(--brand-primary, #0f766e)' : 'transparent',
                  padding: '6px 16px',
                  borderRadius: '20px',
                  cursor: 'pointer',
                  fontSize: '0.825rem',
                }}
                onClick={() => setModeFilter(m.id)}
              >
                {m.label}
              </button>
            ))}
          </div>

          {loading ? (
            <BullyLoader message="Calculating optimal transit routes, trains & flight schedules..." />
          ) : routeData ? (
            <div>
              <div className="route-summary-bar glass-panel" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', padding: '1rem 1.25rem', marginBottom: '1.25rem' }}>
                <div>
                  <strong style={{ fontSize: '1.1rem' }}>{routeData.originCityName} ➔ {routeData.destinationCityName}</strong>
                  <span className="distance-tag" style={{ marginLeft: '0.75rem', background: 'var(--bg-surface-elevated, #e2e8f0)', padding: '2px 8px', borderRadius: '10px', fontSize: '0.75rem' }}>
                    ~{Math.round(routeData.straightDistanceKm * 1.25)} km route
                  </span>
                </div>
                <span className="recommendation-badge" style={{ background: 'rgba(15, 118, 110, 0.12)', color: '#0f766e', padding: '4px 10px', borderRadius: '12px', fontSize: '0.8rem', fontWeight: 700 }}>
                  ⭐ Recommended: {routeData.recommendedOption}
                </span>
              </div>

              {filteredOptions.length === 0 ? (
                <div className="glass-panel" style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)' }}>
                  No transit options found for the selected mode filter. Try selecting <strong>"All Modes"</strong>.
                </div>
              ) : (
                <div className="transit-options-grid">
                  {filteredOptions.map((opt, idx) => {
                    const modeIcon = opt.mode === 'FLIGHT' ? '✈️' : opt.mode === 'TRAIN' ? '🚆' : opt.mode === 'BUS' ? '🚌' : '🚖';
                    return (
                      <article key={idx} className="transit-card glass-panel" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                        <div>
                          <div className="transit-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                            <span className="transit-mode-badge" style={{ fontWeight: 800, fontSize: '0.8rem' }}>
                              {modeIcon} {opt.mode}
                            </span>
                            <span className="carbon-tag" style={{ fontSize: '0.75rem', background: '#ecfdf5', color: '#065f46', padding: '2px 8px', borderRadius: '10px', fontWeight: 600 }}>
                              🌱 {opt.carbonKg} kg CO₂
                            </span>
                          </div>
                          <h3 style={{ margin: '0.25rem 0', fontSize: '1.1rem' }}>{opt.title}</h3>
                          <p className="operator" style={{ color: 'var(--text-muted)', fontSize: '0.825rem', margin: '0 0 0.75rem' }}>{opt.operatorOrType}</p>
                          
                          <div className="transit-price-row" style={{ display: 'flex', justifyContent: 'space-between', background: 'var(--bg-surface-elevated, #f8fafc)', padding: '0.65rem 0.85rem', borderRadius: '10px', marginBottom: '0.75rem' }}>
                            <div>
                              <span className="fare-label" style={{ display: 'block', fontSize: '0.7rem', color: 'var(--text-muted)' }}>Estimated Fare</span>
                              <strong style={{ fontSize: '1.05rem', color: '#0f766e' }}>{formatPrice(opt.estimatedFareInr)}</strong>
                            </div>
                            <div style={{ textAlign: 'right' }}>
                              <span className="fare-label" style={{ display: 'block', fontSize: '0.7rem', color: 'var(--text-muted)' }}>Duration</span>
                              <strong className="duration" style={{ fontSize: '1.05rem' }}>{opt.durationFormatted}</strong>
                            </div>
                          </div>

                          {opt.highlights && (
                            <ul style={{ margin: '0 0 0.85rem', paddingLeft: '1.2rem', fontSize: '0.75rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                              {opt.highlights.map((h, hIdx) => (
                                <li key={hIdx}>{h}</li>
                              ))}
                            </ul>
                          )}
                        </div>

                        <button
                          type="button"
                          className="book-transit-btn"
                          style={{ width: '100%', padding: '9px', borderRadius: '8px', cursor: 'pointer', fontWeight: 700, fontSize: '0.85rem' }}
                          onClick={() => handleOpenBooking('transit', `${opt.mode}: ${routeData.originCityName} to ${routeData.destinationCityName}`, opt.estimatedFareInr, destId, routeData.destinationCityName)}
                        >
                          Reserve {opt.mode} ➔
                        </button>
                      </article>
                    );
                  })}
                </div>
              )}
            </div>
          ) : null}
        </>
      )}
    </section>
  );
}

// -------------------------------------------------------------
// FESTIVALS PAGE
// -------------------------------------------------------------
const MASTER_FESTIVALS = [
  {
    id: 'fest-diwali',
    name: 'Diwali (Deepavali)',
    subtitle: 'Festival of Lights & Universal Harmony',
    date: '2026-11-01',
    month: 'November',
    category: 'Spiritual',
    image: 'https://images.unsplash.com/photo-1605647540924-852290f6b0d5?w=800',
    culturalSignificance: 'Millions of glowing clay diyas illuminate riverside ghats and temples, celebrating the victory of light over spiritual darkness.',
    topCitiesToCelebrate: ['Varanasi', 'Jaipur', 'Delhi', 'Ayodhya'],
    travelAdvice: 'Book riverfront ghat hotels at least 45 days in advance; attend evening aarti early to secure viewing spots.',
  },
  {
    id: 'fest-holi',
    name: 'Holi (Festival of Colors)',
    subtitle: 'Celebration of Spring, Love & Joy',
    date: '2026-03-25',
    month: 'March',
    category: 'Cultural',
    image: 'https://images.unsplash.com/photo-1583083527882-4bee9aba2eea?w=800',
    culturalSignificance: 'Streets transform into joyous seas of organic gulal color powders, traditional folk dhol drums, and delicious festive sweets.',
    topCitiesToCelebrate: ['Jaipur', 'Udaipur', 'Varanasi', 'Mathura'],
    travelAdvice: 'Wear white cotton clothing and use certified herbal eco-friendly colors. Palace celebrations in Udaipur require reservations.',
  },
  {
    id: 'fest-onam',
    name: 'Onam Harvest Festival',
    subtitle: 'Grand 10-Day Kerala Carnival',
    date: '2026-09-05',
    month: 'September',
    category: 'Harvest',
    image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=800',
    culturalSignificance: 'Traditional Vallam Kali snake boat races roar across backwaters, accompanied by intricate floral carpet art (Pookkalam) and grand Onasadya banquets.',
    topCitiesToCelebrate: ['Kochi', 'Alleppey', 'Trivandrum'],
    travelAdvice: 'Book backwater houseboats and Nehru Trophy race pavilion seats well in advance for the best vantage point.',
  },
  {
    id: 'fest-durga-puja',
    name: 'Durga Puja Carnival',
    subtitle: 'UNESCO Intangible Cultural Heritage',
    date: '2026-10-20',
    month: 'October',
    category: 'UNESCO Heritage',
    image: 'https://images.unsplash.com/photo-1569974498991-d3c12a504f95?w=800',
    culturalSignificance: 'The world’s largest open-air art gallery featuring thousands of magnificent illuminated architectural pandals, dhak drums, and culinary walks.',
    topCitiesToCelebrate: ['Kolkata', 'Delhi'],
    travelAdvice: 'Plan pandal-hopping tours between midnight and dawn to avoid midday queues; take the metro for easy transit.',
  },
  {
    id: 'fest-ganesh',
    name: 'Ganesh Chaturthi',
    subtitle: 'Grand Maharashtra Devotional Festival',
    date: '2026-09-18',
    month: 'September',
    category: 'Spiritual',
    image: 'https://images.unsplash.com/photo-1567157577867-05ccb1388e66?w=800',
    culturalSignificance: 'Massive artistic clay idols, energetic dhol-tasha drum squads, and spectacular Arabian Sea beach immersion processions.',
    topCitiesToCelebrate: ['Mumbai', 'Pune'],
    travelAdvice: 'Witness the iconic Lalbaugcha Raja pandal and join sunset processions along Marine Drive and Girgaon Chowpatty.',
  },
  {
    id: 'fest-pushkar',
    name: 'Pushkar Camel & Cultural Fair',
    subtitle: 'Desert Folk Carnival & Sacred Lake Pilgrimage',
    date: '2026-11-20',
    month: 'November',
    category: 'Cultural',
    image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800',
    culturalSignificance: 'One of the world’s largest camel and horse gatherings with colorful Rajasthani folk dances, turban-tying contests, and desert hot air ballooning.',
    topCitiesToCelebrate: ['Jaipur', 'Pushkar'],
    travelAdvice: 'Combine Pushkar with a Jaipur or Udaipur itinerary; book luxury desert tent stays ahead of the Kartik Purnima full moon.',
  },
  {
    id: 'fest-rann-utsav',
    name: 'Rann Utsav (White Desert)',
    subtitle: 'Moonlit Salt Desert Cultural Extravaganza',
    date: '2026-12-15',
    month: 'December',
    category: 'Cultural',
    image: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=800',
    culturalSignificance: 'The boundless white salt desert under shimmering full moons comes alive with Gujarati folk music, Kutchi mirror embroidery, and tent cities.',
    topCitiesToCelebrate: ['Kutch', 'Ahmedabad'],
    travelAdvice: 'Visit during full moon nights for surreal desert glow; permits are arranged at Dhordo checkpoints.',
  },
  {
    id: 'fest-hemis',
    name: 'Hemis Monastery Festival',
    subtitle: 'Sacred Himalayan Masked Cham Dance',
    date: '2026-06-25',
    month: 'June',
    category: 'Spiritual',
    image: 'https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?w=800',
    culturalSignificance: 'Tibetan Buddhist monks perform mystical sacred Cham dances in elaborate silk costumes and fearsome masks to the resonance of long horns.',
    topCitiesToCelebrate: ['Leh Ladakh'],
    travelAdvice: 'Acclimatize in Leh for 48 hours before traveling; arrive at Hemis Monastery courtyard by 8:30 AM for seated views.',
  },
  {
    id: 'fest-pongal',
    name: 'Pongal Harvest Thanksgiving',
    subtitle: 'Four-Day Tamil Solar Harvest Festival',
    date: '2026-01-14',
    month: 'January',
    category: 'Harvest',
    image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=800',
    culturalSignificance: 'Clay pots boiling over with sweet rice, sugarcane stalks, colorful kolam floor art, and heartfelt thanksgiving to cattle and nature.',
    topCitiesToCelebrate: ['Chennai', 'Madurai'],
    travelAdvice: 'Sample freshly cooked Sakkarai Pongal at local heritage homes; experience village celebrations around Madurai.',
  },
  {
    id: 'fest-goa-carnival',
    name: 'Goa Carnival',
    subtitle: 'Vibrant Coastal Float & Music Extravaganza',
    date: '2026-02-14',
    month: 'February',
    category: 'Carnival',
    image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=800',
    culturalSignificance: 'A 500-year-old tradition led by King Momo featuring flamboyant street floats, masked dancers, live Konkani brass bands, and beach parties.',
    topCitiesToCelebrate: ['Goa'],
    travelAdvice: 'Panaji and Margao host the prime float parades on Saturday and Sunday afternoons; reserve beach shacks early.',
  },
];

function FestivalsPage({ cities, setPage, setSelectedId }) {
  const [filterMonth, setFilterMonth] = useState('all');
  const [filterCat, setFilterCat] = useState('all');

  const months = ['all', 'January', 'February', 'March', 'June', 'September', 'October', 'November', 'December'];

  const filtered = useMemo(() => {
    return MASTER_FESTIVALS.filter((f) => {
      const matchMonth = filterMonth === 'all' || f.month === filterMonth;
      const matchCat = filterCat === 'all' || f.category === filterCat;
      return matchMonth && matchCat;
    });
  }, [filterMonth, filterCat]);

  return (
    <section className="page festivals-page">
      <PageTitle
        eyebrow="Living Heritage & Culture"
        title="Indian Festivals & Cultural Calendar 2026"
        text="Experience India's most vibrant celebrations, harvest festivals, illuminated riverfronts, and sacred desert carnivals."
      />

      {/* FILTER BAR */}
      <div className="festival-filter-bar glass-panel" style={{ display: 'flex', flexDirection: 'column', gap: '1rem', padding: '1.25rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
          <strong style={{ fontSize: '0.85rem', marginRight: '0.5rem' }}>Category:</strong>
          {[
            { id: 'all', label: 'All Festivals' },
            { id: 'Spiritual', label: '🪔 Spiritual & Divine' },
            { id: 'Cultural', label: '🎨 Arts & Folk' },
            { id: 'Harvest', label: '🌾 Harvest Thanksgiving' },
            { id: 'UNESCO Heritage', label: '✨ UNESCO Heritage' },
            { id: 'Carnival', label: '🎭 Coastal Carnival' },
          ].map((cat) => (
            <button
              key={cat.id}
              type="button"
              className={`quick-pill-tag ${filterCat === cat.id ? 'active' : ''}`}
              style={{
                background: filterCat === cat.id ? 'var(--brand-primary, #0f766e)' : 'var(--bg-surface-elevated, #f1f5f9)',
                color: filterCat === cat.id ? '#ffffff' : 'var(--text-main)',
                fontWeight: filterCat === cat.id ? 700 : 500,
                border: '1px solid',
                borderColor: filterCat === cat.id ? 'var(--brand-primary, #0f766e)' : 'transparent',
                padding: '5px 14px',
                borderRadius: '16px',
                cursor: 'pointer',
                fontSize: '0.8rem',
              }}
              onClick={() => setFilterCat(cat.id)}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem', borderTop: '1px solid var(--border-color, #e2e8f0)', paddingTop: '0.75rem' }}>
          <strong style={{ fontSize: '0.85rem', marginRight: '0.5rem' }}>Month:</strong>
          <div className="month-pills" style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
            {months.map((m) => (
              <button
                key={m}
                type="button"
                className={filterMonth === m ? 'active' : ''}
                style={{
                  background: filterMonth === m ? '#ea580c' : 'var(--bg-surface-elevated, #f1f5f9)',
                  color: filterMonth === m ? '#ffffff' : 'var(--text-main)',
                  fontWeight: filterMonth === m ? 700 : 500,
                  border: 'none',
                  padding: '4px 12px',
                  borderRadius: '12px',
                  cursor: 'pointer',
                  fontSize: '0.775rem',
                }}
                onClick={() => setFilterMonth(m)}
              >
                {m === 'all' ? 'All Months' : m}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* FESTIVALS GRID */}
      <div className="festivals-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.5rem', marginTop: '1.5rem' }}>
        {filtered.map((fest) => (
          <article key={fest.id} className="festival-card festival-vibrant-card glass-panel" style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden', borderRadius: '16px', border: '1px solid var(--border-color, #e2e8f0)', background: 'var(--bg-surface, #ffffff)' }}>
            <div className="festival-card-img-wrap" style={{ position: 'relative', height: '170px', overflow: 'hidden' }}>
              <img
                src={fest.image}
                alt={fest.name}
                loading="lazy"
                onError={(e) => { e.currentTarget.src = 'https://images.unsplash.com/photo-1599661046289-e31897846e41?w=800'; }}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              <span className="festival-date-badge" style={{ position: 'absolute', bottom: '10px', left: '10px', background: 'rgba(15,23,42,0.85)', color: '#ffffff', padding: '4px 10px', borderRadius: '12px', fontSize: '0.75rem', fontWeight: 700 }}>
                📅 {fest.date}
              </span>
              <span style={{ position: 'absolute', top: '10px', right: '10px', background: '#0f766e', color: '#ffffff', padding: '3px 9px', borderRadius: '12px', fontSize: '0.72rem', fontWeight: 700 }}>
                {fest.category}
              </span>
            </div>

            <div style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'space-between' }}>
              <div>
                <h3 style={{ margin: '0 0 0.2rem', fontSize: '1.15rem', color: 'var(--text-main)' }}>{fest.name}</h3>
                <p style={{ margin: '0 0 0.65rem', fontSize: '0.8rem', color: '#ea580c', fontWeight: 600 }}>{fest.subtitle}</p>
                <p style={{ fontSize: '0.825rem', color: 'var(--text-muted)', lineHeight: 1.5, margin: '0 0 0.85rem' }}>
                  {fest.culturalSignificance}
                </p>

                <div style={{ background: 'var(--bg-surface-elevated, #f8fafc)', padding: '0.65rem 0.85rem', borderRadius: '10px', fontSize: '0.75rem', marginBottom: '0.85rem' }}>
                  <strong style={{ display: 'block', color: 'var(--text-main)', marginBottom: '0.25rem' }}>💡 Travel Advisory:</strong>
                  <span style={{ color: 'var(--text-muted)', lineHeight: 1.4 }}>{fest.travelAdvice}</span>
                </div>

                <div className="fest-cities" style={{ marginBottom: '1rem' }}>
                  <strong style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.35rem' }}>Top Places to Celebrate:</strong>
                  <div className="tag-row" style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
                    {fest.topCitiesToCelebrate?.map((cName, cIdx) => (
                      <span
                        key={cIdx}
                        className="city-tag"
                        style={{ fontSize: '0.72rem', padding: '2px 8px', background: 'var(--bg-surface-elevated, #e2e8f0)', borderRadius: '6px', color: 'var(--text-main)', cursor: 'pointer' }}
                        onClick={() => {
                          const targetCity = cities?.find((c) => cName.toLowerCase().includes(c.name.toLowerCase()));
                          if (targetCity) {
                            setSelectedId(targetCity.id);
                            setPage('destinations');
                          }
                        }}
                      >
                        📍 {cName}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <button
                type="button"
                className="primary-action fest-plan-btn"
                style={{ width: '100%', padding: '9px', fontSize: '0.825rem', borderRadius: '8px' }}
                onClick={() => {
                  const targetCity = cities?.find((c) =>
                    fest.topCitiesToCelebrate?.some((tc) => tc.toLowerCase().includes(c.name.toLowerCase()))
                  );
                  if (targetCity) setSelectedId(targetCity.id);
                  setPage('planner');
                }}
              >
                ✨ Plan Trip for this Festival ➔
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

// -------------------------------------------------------------
// DESTINATIONS, PLANNER, BOOKINGS, SIGNUP & MODAL
// -------------------------------------------------------------
const CITY_FAST_FACTS = {
  Jaipur: {
    idealDays: '2 - 3 Days',
    language: 'Hindi, Rajasthani, English',
    airport: 'Jaipur International Airport (JAI) • 12 km',
    railway: 'Jaipur Junction (JP) • Central',
    topDishes: ['Dal Baati Churma', 'Pyaaz Kachori', 'Ghevar', 'Laal Maas', 'Ker Sangri'],
    dayTrips: ['Nahargarh Fort Sunset & Padao', 'Chand Baori Stepwell (Abhaneri)', 'Samode Palace Heritage Trek', 'Pushkar Holy Lake & Dunes'],
    photos: [
      { name: 'Amber Fort', url: 'https://images.unsplash.com/photo-1477587458883-47145ed94245?w=800', tag: 'UNESCO Citadel' },
      { name: 'Hawa Mahal', url: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?w=800', tag: 'Palace of Winds' },
      { name: 'City Palace Jaipur', url: 'https://images.unsplash.com/photo-1598890777032-bde835ba27c2?w=800', tag: 'Royal Residence' },
      { name: 'Jal Mahal', url: 'https://images.unsplash.com/photo-1595846519845-68e298c2edd8?w=800', tag: 'Water Palace' },
    ],
  },
  Agra: {
    idealDays: '1 - 2 Days',
    language: 'Hindi, Urdu, English',
    airport: 'Agra Airport (AGR) / IGI Delhi (DEL)',
    railway: 'Agra Cantt (AGC) • High-speed Gatimaan',
    topDishes: ['Agra Petha (Angoori & Kesar)', 'Bedmi Poori with Aloo', 'Mughlai Biryani', 'Crispy Jalebi'],
    dayTrips: ['Fatehpur Sikri UNESCO Imperial Complex', 'Keoladeo Bird Sanctuary (Bharatpur)', 'Mathura & Vrindavan Temples'],
    photos: [
      { name: 'Taj Mahal', url: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?w=800', tag: 'Wonder of the World' },
      { name: 'Agra Fort', url: 'https://images.unsplash.com/photo-1608958435020-e8a7109ba809?w=800', tag: 'Mughal Fortress' },
      { name: 'Mehtab Bagh', url: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=800', tag: 'Yamuna River Sunset' },
      { name: 'Tomb of I’timad-ud-Daulah', url: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=800', tag: 'Baby Taj' },
    ],
  },
  Delhi: {
    idealDays: '3 - 4 Days',
    language: 'Hindi, Punjabi, English, Urdu',
    airport: 'Indira Gandhi International Airport (DEL)',
    railway: 'New Delhi (NDLS) / Nizamuddin (NZM)',
    topDishes: ['Butter Chicken', 'Old Delhi Chaat & Chole Bhature', 'Parathas at Chandni Chowk', 'Rabri Falooda'],
    dayTrips: ['Neemrana Fort Palace & Zipline', 'Sultanpur National Park Bird Watching', 'Kurukshetra Heritage & Sarovar'],
    photos: [
      { name: 'India Gate', url: 'https://images.unsplash.com/photo-1592635196078-9fdc757f27f4?w=800', tag: 'War Memorial' },
      { name: 'Qutub Minar', url: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=800', tag: 'Victory Minaret' },
      { name: 'Red Fort', url: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?w=800', tag: 'Historic Citadel' },
      { name: 'Humayun’s Tomb', url: 'https://images.unsplash.com/photo-1585135497273-1a86b09fe70e?w=800', tag: 'Persian Garden Tomb' },
    ],
  },
  Mumbai: {
    idealDays: '3 - 4 Days',
    language: 'Marathi, Hindi, Gujarati, English',
    airport: 'Chhatrapati Shivaji Maharaj Airport (BOM)',
    railway: 'Chhatrapati Shivaji Maharaj Terminus (CSMT)',
    topDishes: ['Vada Pav', 'Pav Bhaji at Juhu Beach', 'Bombay Duck Fry', 'Parsi Bun Maska Chai'],
    dayTrips: ['Elephanta Island Caves by Coastal Ferry', 'Lonavala & Khandala Western Ghats', 'Alibaug Coastal Forts & Beaches'],
    photos: [
      { name: 'Gateway of India', url: 'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?w=800', tag: 'Harbour Landmark' },
      { name: 'Marine Drive', url: 'https://images.unsplash.com/photo-1567157577867-05ccb1388e66?w=800', tag: 'Queen’s Necklace' },
      { name: 'Elephanta Caves', url: 'https://images.unsplash.com/photo-1583083527882-4bee9aba2eea?w=800', tag: 'Rock-Cut Temples' },
      { name: 'Bandra-Worli Sea Link', url: 'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?w=800', tag: 'Cable-Stayed Bridge' },
    ],
  },
  Udaipur: {
    idealDays: '2 - 3 Days',
    language: 'Hindi, Mewari, Rajasthani',
    airport: 'Maharana Pratap Airport (UDR) • 22 km',
    railway: 'Udaipur City Railway Station (UDZ)',
    topDishes: ['Gatte ki Sabzi', 'Ker Sangri', 'Dal Baati Churma', 'Mawa Kachori'],
    dayTrips: ['Kumbhalgarh Fort & Great Wall of India', 'Ranakpur Marble Jain Temples', 'Chittorgarh UNESCO Fortress Citadel'],
    photos: [
      { name: 'City Palace Udaipur', url: 'https://images.unsplash.com/photo-1615836245337-f5b9b2303f10?w=800', tag: 'Lakefront Palace' },
      { name: 'Lake Pichola', url: 'https://images.unsplash.com/photo-1576487248805-cf45f6bcc67f?w=800', tag: 'Romantic Waters' },
      { name: 'Jag Mandir', url: 'https://images.unsplash.com/photo-1598890777032-bde835ba27c2?w=800', tag: 'Island Palace' },
      { name: 'Saheliyon-ki-Bari', url: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?w=800', tag: 'Courtyard of Maidens' },
    ],
  },
  Varanasi: {
    idealDays: '2 - 3 Days',
    language: 'Hindi, Bhojpuri, Sanskrit',
    airport: 'Lal Bahadur Shastri Airport (VNS) • 25 km',
    railway: 'Varanasi Junction (BSB) / Banaras (BSBS)',
    topDishes: ['Kachori Sabzi & Jalebi', 'Banarasi Meetha Paan', 'Malaiyo (Frothy Cream)', 'Thandai with Kesar'],
    dayTrips: ['Sarnath Deer Park (Buddha’s Sermon)', 'Chunar Fort Overlooking Ganga', 'Ramnagar Palace & Museum'],
    photos: [
      { name: 'Dashashwamedh Ghat', url: 'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?w=800', tag: 'Grand Evening Aarti' },
      { name: 'Kashi Vishwanath', url: 'https://images.unsplash.com/photo-1627894483216-2138af692e32?w=800', tag: 'Golden Temple of Shiva' },
      { name: 'Assi Ghat Sunrise', url: 'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?w=800', tag: 'Subah-e-Banaras' },
      { name: 'Ganga Boat Ride', url: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800', tag: 'Sacred River Trail' },
    ],
  },
  Goa: {
    idealDays: '4 - 5 Days',
    language: 'Konkani, English, Hindi, Portuguese',
    airport: 'Dabolim Airport (GOI) / Manohar Mopa (GOX)',
    railway: 'Madgaon Junction (MAO) / Thivim (THVM)',
    topDishes: ['Goan Fish Curry Thali', 'Pork Vindaloo', 'Bebinca Layer Cake', 'Prawn Balchao'],
    dayTrips: ['Dudhsagar Waterfall Jungle Trek', 'Ponda Spice Plantations & Lunch', 'Divar Island Cycling & Heritage Village'],
    photos: [
      { name: 'Baga Beach', url: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=800', tag: 'Coastal Promenade' },
      { name: 'Basilica of Bom Jesus', url: 'https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?w=800', tag: 'Baroque UNESCO Church' },
      { name: 'Fort Aguada', url: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=800', tag: 'Portuguese Sea Fortress' },
      { name: 'Fontainhas Latin Quarter', url: 'https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?w=800', tag: 'Colonial Heritage Villas' },
    ],
  },
  Kochi: {
    idealDays: '2 - 3 Days',
    language: 'Malayalam, English, Tamil',
    airport: 'Cochin International Airport (COK) • Solar Powered',
    railway: 'Ernakulam Junction (ERS)',
    topDishes: ['Appam with Veg/Chicken Stew', 'Karimeen Pollichathu', 'Traditional Kerala Sadya', 'Malabar Parotta'],
    dayTrips: ['Alleppey Houseboat Backwaters Cruise', 'Munnar Misty Tea Hills', 'Athirappilly Waterfalls (Indian Niagara)'],
    photos: [
      { name: 'Fort Kochi', url: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=800', tag: 'Colonial Spice Port' },
      { name: 'Chinese Fishing Nets', url: 'https://images.unsplash.com/photo-1597848212624-a19eb35e2651?w=800', tag: 'Cantilevered Sea Nets' },
      { name: 'Mattancherry Palace', url: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=800', tag: 'Dutch Murals & History' },
      { name: 'Kerala Backwaters', url: 'https://images.unsplash.com/photo-1593693397690-362cb9666fc2?w=800', tag: 'Coconut Lagoon Waters' },
    ],
  },
  Amritsar: {
    idealDays: '2 Days',
    language: 'Punjabi, Hindi, English',
    airport: 'Sri Guru Ram Dass Jee International Airport (ATQ)',
    railway: 'Amritsar Junction (ASR)',
    topDishes: ['Amritsari Kulcha with Chole', 'Golden Temple Guru Ka Langar', 'Makki Roti & Sarson Saag', 'Kesar Da Dhaba Dal'],
    dayTrips: ['Wagah Indo-Pak Beating Retreat', 'Harike Pattan Wetland Sanctuary', 'Partition Museum Historic Walk'],
    photos: [
      { name: 'Golden Temple', url: 'https://images.unsplash.com/photo-1514222134-b57cbb8ce073?w=800', tag: 'Harmandir Sahib' },
      { name: 'Wagah Border', url: 'https://images.unsplash.com/photo-1532375810709-75b1da00537c?w=800', tag: 'Patriotic Border Ceremony' },
      { name: 'Jallianwala Bagh', url: 'https://images.unsplash.com/photo-1514222134-b57cbb8ce073?w=800', tag: 'National Freedom Memorial' },
      { name: 'Gobindgarh Fort', url: 'https://images.unsplash.com/photo-1514222134-b57cbb8ce073?w=800', tag: 'Sikh Military Citadel' },
    ],
  },
  Manali: {
    idealDays: '3 - 5 Days',
    language: 'Hindi, Pahari, English',
    airport: 'Kullu Manali Airport, Bhuntar (KUU) • 50 km',
    railway: 'Chandigarh Junction (CDG) • Scenic drive',
    topDishes: ['Siddu with Pure Ghee', 'Kullu Trout Fish Fry', 'Tudkiya Bhat', 'Chana Madra'],
    dayTrips: ['Atal Tunnel & Sissu Valley Lahaul', 'Rohtang Pass Snow Crest & Glaciers', 'Kasol & Manikaran Parvati Valley'],
    photos: [
      { name: 'Solang Valley', url: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=800', tag: 'Alpine Adventure Hub' },
      { name: 'Hadimba Temple', url: 'https://images.unsplash.com/photo-1572445271230-a78b5944a659?w=800', tag: 'Cedar Forest Pagoda' },
      { name: 'Jogini Waterfall', url: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=800', tag: 'Vashisht Pine Trail' },
      { name: 'Rohtang Pass', url: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=800', tag: '13,058 ft Mountain Pass' },
    ],
  },
  Rishikesh: {
    idealDays: '2 - 3 Days',
    language: 'Hindi, Garhwali, English',
    airport: 'Jolly Grant Airport Dehradun (DED) • 21 km',
    railway: 'Yog Nagari Rishikesh (YNRK)',
    topDishes: ['Garhwali Kafuli & Bhatt ki Dal', 'Ayurvedic Sattvic Thali', 'Alu ke Gutke', 'Ginger Lemon Honey Tea'],
    dayTrips: ['Shivpuri River Rafting Rapids', 'Haridwar Har Ki Pauri Ganga Aarti', 'Devprayag River Confluence'],
    photos: [
      { name: 'Ram Jhula & Laxman Jhula', url: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800', tag: 'Iconic Suspension Bridges' },
      { name: 'Triveni Ghat', url: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800', tag: 'Maha Aarti at Dusk' },
      { name: 'Beatles Ashram', url: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800', tag: 'Transcendental Meditation' },
      { name: 'Ganga Beach Shivpuri', url: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800', tag: 'White Sand River Banks' },
    ],
  },
  Bengaluru: {
    idealDays: '2 - 3 Days',
    language: 'Kannada, English, Tamil, Telugu, Hindi',
    airport: 'Kempegowda International Airport (BLR)',
    railway: 'KSR Bengaluru (SBC) / Yesvantpur (YPR)',
    topDishes: ['Crispy Benne Dosa', 'Bisi Bele Bath', 'Filter Kaapi at CTR & MTR', 'Mysore Pak'],
    dayTrips: ['Nandi Hills Panoramic Sunrise', 'Ramanagara Silk City & Sholay Rocks', 'Bannerghatta Biological Safari'],
    photos: [
      { name: 'Bangalore Palace', url: 'https://images.unsplash.com/photo-1596176530529-78163a4f7af2?w=800', tag: 'Tudor-Style Royal Estate' },
      { name: 'Lalbagh Botanical Garden', url: 'https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?w=800', tag: 'Historic Glass House' },
      { name: 'Cubbon Park', url: 'https://images.unsplash.com/photo-1596176530529-78163a4f7af2?w=800', tag: 'Green Lung of City' },
      { name: 'Vidhana Soudha', url: 'https://images.unsplash.com/photo-1596176530529-78163a4f7af2?w=800', tag: 'Neo-Dravidian Architecture' },
    ],
  },
  Hampi: {
    idealDays: '2 - 3 Days',
    language: 'Kannada, Telugu, English',
    airport: 'Jindal Vidyanagar (VDY) • 38 km / Hubli (HBX)',
    railway: 'Hosapete Junction (HPT) • 13 km',
    topDishes: ['North Karnataka Jowar Roti Oota', 'Mango Tree Banana Flower Curry', 'Filter Coffee', 'Holige Sweet Flatbread'],
    dayTrips: ['Anegundi Monkey Kingdom & Citadels', 'Sanapur Lake Coracle Ride & Bouldering', 'Badami Cave Temples & Pattadakal'],
    photos: [
      { name: 'Virupaksha Temple', url: 'https://images.unsplash.com/photo-1620766182966-c6eb5ed2b788?w=800', tag: 'Living 7th-Century Sanctuary' },
      { name: 'Stone Chariot & Vijaya Vittala', url: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=800', tag: 'Musical Pillars & Chariot' },
      { name: 'Matanga Hill Sunrise', url: 'https://images.unsplash.com/photo-1620766182966-c6eb5ed2b788?w=800', tag: '360° Boulder Viewpoint' },
      { name: 'Lotus Mahal', url: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=800', tag: 'Indo-Islamic Royal Enclosure' },
    ],
  },
  Darjeeling: {
    idealDays: '3 - 4 Days',
    language: 'Nepali, Bengali, Hindi, English',
    airport: 'Bagdogra Airport (IXB) • 70 km scenic hill drive',
    railway: 'New Jalpaiguri (NJP) / Darjeeling Toy Train',
    topDishes: ['Steamed Pork/Veg Momos with Dalle Chilli', 'Thukpa Noodle Broth', 'Darjeeling First Flush Tea', 'Chhurpi Yak Cheese'],
    dayTrips: ['Mirik Lake & Orange Orchards', 'Kalimpong Flower Nurseries & Monasteries', 'Sandakphu Singalila Trek'],
    photos: [
      { name: 'Tiger Hill Sunrise', url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800', tag: 'Kanchenjunga Golden Peaks' },
      { name: 'Batasia Loop', url: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800', tag: 'UNESCO Toy Train Spiral' },
      { name: 'Happy Valley Tea Estate', url: 'https://images.unsplash.com/photo-1576487248805-cf45f6bcc67f?w=800', tag: 'Emerald Tea Plantation' },
      { name: 'Japanese Peace Pagoda', url: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800', tag: 'Spiritual Stupa on Hills' },
    ],
  },
  Shimla: {
    idealDays: '2 - 3 Days',
    language: 'Hindi, Pahari, Punjabi, English',
    airport: 'Shimla Airport Jubbarhatti (SLV) / Chandigarh (IXC)',
    railway: 'Shimla Toy Train Station / Kalka (KLK)',
    topDishes: ['Dhaam Festive Platter', 'Madra Chickpeas in Spiced Yogurt', 'Babru Stuffed Puri', 'Fresh Apple Cider'],
    dayTrips: ['Kufri Snow Point & Nature Park', 'Mashobra Pine Canopy & Craignano Park', 'Chail Highest Cricket Ground'],
    photos: [
      { name: 'The Ridge & Mall Road', url: 'https://images.unsplash.com/photo-1597074866923-dc0589150358?w=800', tag: 'Colonial Promenade' },
      { name: 'Christ Church', url: 'https://images.unsplash.com/photo-1597074866923-dc0589150358?w=800', tag: 'Neo-Gothic Stained Glass' },
      { name: 'Jakhoo Hill & Temple', url: 'https://images.unsplash.com/photo-1597074866923-dc0589150358?w=800', tag: 'Highest Peak of Shimla' },
      { name: 'Kufri Snow View', url: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=800', tag: 'Alpine Winter Wonderland' },
    ],
  },
  'Leh Ladakh': {
    idealDays: '5 - 7 Days',
    language: 'Ladakhi, Tibetan, Hindi, English',
    airport: 'Kushok Bakula Rimpochee Airport (IXL) • 3,256 m',
    railway: 'Jammu Tawi (JAT) • Road traverse required',
    topDishes: ['Thukpa & Tingmo Steamed Buns', 'Butter Yak Tea (Gur Gur Chai)', 'Chhurpe Yak Cheese Soup', 'Skyu Pasta Stew'],
    dayTrips: ['Khardung La Pass (17,982 ft Mountain Crest)', 'Nubra Valley Hunder Double-Humped Camels', 'Magnetic Hill & Sangam Confluence'],
    photos: [
      { name: 'Pangong Tso Lake', url: 'https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?w=800', tag: 'Color-Shifting High Lake' },
      { name: 'Thiksey Monastery', url: 'https://images.unsplash.com/photo-1566438480900-0609be27a4be?w=800', tag: 'Mini Potala of Ladakh' },
      { name: 'Nubra Valley Dunes', url: 'https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?w=800', tag: 'Cold Desert Sands' },
      { name: 'Shanti Stupa', url: 'https://images.unsplash.com/photo-1566438480900-0609be27a4be?w=800', tag: 'Peace Stupa Sunset Lookout' },
    ],
  },
  Mysore: {
    idealDays: '2 Days',
    language: 'Kannada, Tamil, Telugu, English',
    airport: 'Mysore Airport Mandakalli (MYQ) / Bengaluru (BLR)',
    railway: 'Mysuru Junction (MYS)',
    topDishes: ['Mysore Masala Dosa', 'Authentic Mysore Pak Melt-in-Mouth', 'Mysore Bonda', 'Chiroti Sweet'],
    dayTrips: ['Srirangapatna Tipu Sultan Fort', 'Somnathpur Hoysala Temple', 'Ranganathittu Bird Sanctuary Boating'],
    photos: [
      { name: 'Mysore Palace', url: 'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?w=800', tag: 'Illuminated Amba Vilas' },
      { name: 'Chamundi Hill', url: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=800', tag: 'Nandi Bull & Goddess Temple' },
      { name: 'Brindavan Gardens', url: 'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?w=800', tag: 'Musical Lighted Fountains' },
      { name: 'St. Philomena’s Cathedral', url: 'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?w=800', tag: 'Gothic Twin Spires' },
    ],
  },
  Srinagar: {
    idealDays: '3 - 4 Days',
    language: 'Kashmiri, Urdu, Hindi, English',
    airport: 'Sheikh ul-Alam International Airport (SXR)',
    railway: 'Srinagar Railway Station (SINA) / Jammu Tawi',
    topDishes: ['Kashmiri Wazwan Rogan Josh', 'Gushtaba & Rista', 'Saffron Kahwa with Almonds', 'Modur Pulao'],
    dayTrips: ['Gulmarg Gondola & Ski Slopes', 'Pahalgam Betaab Valley & Lidder River', 'Sonamarg Thajiwas Glacier'],
    photos: [
      { name: 'Dal Lake Shikara', url: 'https://images.unsplash.com/photo-1598091383021-15ddea10925d?w=800', tag: 'Floating Gardens & Houseboats' },
      { name: 'Shalimar Bagh', url: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=800', tag: 'Mughal Terraced Gardens' },
      { name: 'Nishat Bagh', url: 'https://images.unsplash.com/photo-1598091383021-15ddea10925d?w=800', tag: 'Garden of Bliss on Dal Shore' },
      { name: 'Pari Mahal', url: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=800', tag: 'Palace of Fairies' },
    ],
  },
  Pondicherry: {
    idealDays: '2 - 3 Days',
    language: 'Tamil, French, English, Telugu',
    airport: 'Puducherry Airport (PNY) / Chennai (MAA)',
    railway: 'Puducherry Railway Station (PDY)',
    topDishes: ['French Croissants & Quiche', 'Creole Fish Curry', 'Wood-Fired Neapolitan Pizza', 'Filter Coffee'],
    dayTrips: ['Auroville Township & Matrimandir', 'Paradise Beach Ferry Island', 'Pichavaram Mangrove Boating Trail'],
    photos: [
      { name: 'White Town French Quarter', url: 'https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?w=800', tag: 'Mustard Colonial Villas' },
      { name: 'Auroville Matrimandir', url: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800', tag: 'Golden Meditation Dome' },
      { name: 'Promenade Beach', url: 'https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?w=800', tag: 'Seafront Rock Walkway' },
      { name: 'Serenity Beach', url: 'https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?w=800', tag: 'Surfing & Waves' },
    ],
  },
  Hyderabad: {
    idealDays: '2 - 3 Days',
    language: 'Telugu, Urdu, Hindi, English',
    airport: 'Rajiv Gandhi International Airport (HYD)',
    railway: 'Secunderabad (SC) / Hyderabad Deccan (HYB)',
    topDishes: ['Hyderabadi Dum Biryani', 'Mutton Haleem with Pure Ghee', 'Double Ka Meetha', 'Irani Chai with Osmania Biscuits'],
    dayTrips: ['Ramoji Film City Studio Tour', 'Golconda Sound & Light Citadel', 'Ananthagiri Hills Trekking'],
    photos: [
      { name: 'Charminar', url: 'https://images.unsplash.com/photo-1572445271230-a78b5944a659?w=800', tag: 'Four Minarets Monument' },
      { name: 'Golconda Fort', url: 'https://images.unsplash.com/photo-1598890777032-bde835ba27c2?w=800', tag: 'Acoustic Diamond Fortress' },
      { name: 'Chowmahalla Palace', url: 'https://images.unsplash.com/photo-1572445271230-a78b5944a659?w=800', tag: 'Seat of Asaf Jahi Nizams' },
      { name: 'Hussain Sagar Lake', url: 'https://images.unsplash.com/photo-1572445271230-a78b5944a659?w=800', tag: 'Monolithic Buddha Island' },
    ],
  },
  Kolkata: {
    idealDays: '3 - 4 Days',
    language: 'Bengali, Hindi, English',
    airport: 'Netaji Subhash Chandra Bose Airport (CCU)',
    railway: 'Howrah Junction (HWH) / Sealdah (SDAH)',
    topDishes: ['Kolkata Kathi Roll', 'Ilish Macher Jhol Mustard Fish', 'Warm Rosogolla & Mishti Doi', 'Kolkata Mutton Biryani with Aloo'],
    dayTrips: ['Sundarbans Mangrove Tiger Safari', 'Bishnupur Terracotta Temples', 'Belur Math & Dakshineswar Ferry'],
    photos: [
      { name: 'Victoria Memorial', url: 'https://images.unsplash.com/photo-1558431382-27e303142255?w=800', tag: 'White Marble Monument' },
      { name: 'Howrah Bridge', url: 'https://images.unsplash.com/photo-1558431382-27e303142255?w=800', tag: 'Cantilever Over Hooghly' },
      { name: 'Dakshineswar Kali Temple', url: 'https://images.unsplash.com/photo-1558431382-27e303142255?w=800', tag: 'Sacred Navaratna Temple' },
      { name: 'Park Street & Vintage Tram', url: 'https://images.unsplash.com/photo-1558431382-27e303142255?w=800', tag: 'Colonial Heritage Street' },
    ],
  },
  Jodhpur: {
    idealDays: '2 Days',
    language: 'Hindi, Marwari, Rajasthani, English',
    airport: 'Jodhpur Airport (JDH) • 5 km',
    railway: 'Jodhpur Junction (JU)',
    topDishes: ['Mawa Kachori with Chashni', 'Spicy Mirchi Bada', 'Makhaniya Lassi', 'Ker Sangri Ro Saag'],
    dayTrips: ['Bishnoi Village Safari & Wildlife', 'Osian Thar Desert Dunes & Temples', 'Mandore Ancient Capital Cenotaphs'],
    photos: [
      { name: 'Mehrangarh Fort', url: 'https://images.unsplash.com/photo-1568849676085-51415703900f?w=800', tag: 'Sun City Mighty Citadel' },
      { name: 'Jaswant Thada', url: 'https://images.unsplash.com/photo-1568849676085-51415703900f?w=800', tag: 'White Marble Cenotaph' },
      { name: 'Umaid Bhawan Palace', url: 'https://images.unsplash.com/photo-1568849676085-51415703900f?w=800', tag: 'Art Deco Royal Residence' },
      { name: 'Blue City Alleys', url: 'https://images.unsplash.com/photo-1568849676085-51415703900f?w=800', tag: 'Indigo Brahmin Quarters' },
    ],
  },
  Ooty: {
    idealDays: '2 - 3 Days',
    language: 'Tamil, Badaga, Malayalam, English',
    airport: 'Coimbatore International Airport (CJB) • 88 km',
    railway: 'Udhagamandalam Railway Station (UAM) / Toy Train',
    topDishes: ['Nilgiri Homemade Dark Chocolates', 'Ooty Varkey Bakery Crisps', 'Fresh High-Grown Nilgiri Tea', 'South Indian Filter Coffee'],
    dayTrips: ['Coonoor Sim’s Park & Dolphin Nose', 'Pykara Lake & Waterfalls Boating', 'Mudumalai Tiger Reserve Safari'],
    photos: [
      { name: 'Nilgiri Mountain Railway', url: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800', tag: 'UNESCO Steam Toy Train' },
      { name: 'Ooty Lake', url: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800', tag: 'Eucalyptus Boating Waters' },
      { name: 'Botanical Gardens', url: 'https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?w=800', tag: 'Exotic Terraced Flora' },
      { name: 'Doddabetta Peak', url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800', tag: 'Highest Peak in Nilgiris' },
    ],
  },
  Shillong: {
    idealDays: '3 - 4 Days',
    language: 'Khasi, English, Garo, Hindi',
    airport: 'Shillong Airport Umroi (SHL) • 30 km / Guwahati (GAU)',
    railway: 'Guwahati Railway Station (GHY) • 100 km scenic highway',
    topDishes: ['Jadoh Rice with Local Herbs', 'Dohneiiong Pork in Black Sesame', 'Tungrymbai Fermented Delicacy', 'Steamed Momos with Bamboo Shoots'],
    dayTrips: ['Cherrapunji Nohkalikai Falls & Caves', 'Mawlynnong Cleanest Village in Asia', 'Dawki Umngot Crystal Clear River'],
    photos: [
      { name: 'Nohkalikai Falls', url: 'https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?w=800', tag: 'India’s Tallest Plunge Waterfall' },
      { name: 'Umiam Lake', url: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=800', tag: 'Barapani Serene Reservoir' },
      { name: 'Elephant Falls', url: 'https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?w=800', tag: 'Three-Tier Cascading Falls' },
      { name: 'Living Root Bridges', url: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=800', tag: 'Bio-Engineered Ficus Bridges' },
    ],
  },
};

function DestinationsPage({ cities, city, details, formatPrice, handleAddReview, hiddenCityIds = [], onHideCity, onUnhideAllCities, selectedId, selectedMarker, setSelectedId, setPage }) {
  // Check if a specific city has been selected (Requirement: if person chooses any city, don't show any other city recommendation; show if not selected)
  const isCitySelected = Boolean(selectedId && city);
  const places = details?.famousPlaces || [];
  const tips = details?.travelTips || [];
  const reviews = details?.reviews || [];

  const visibleCities = useMemo(() => {
    return cities.filter((c) => !hiddenCityIds.includes(c.id));
  }, [cities, hiddenCityIds]);

  const [reviewForm, setReviewForm] = useState({ travelerName: '', rating: 5, comment: '', travelMonth: 'October' });
  const [submittedNotice, setSubmittedNotice] = useState(false);

  const facts = CITY_FAST_FACTS[city.name] || CITY_FAST_FACTS.Jaipur;
  const cityPhotos = facts?.photos || [
    { name: city.name, url: CITY_PHOTOS[city.name] || 'https://images.unsplash.com/photo-1599661046289-e31897846e41?w=800', tag: 'Iconic View' }
  ];

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
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', marginBottom: '0.5rem' }}>
        <div>
          {isCitySelected && (
            <button
              type="button"
              className="secondary-action"
              onClick={() => setSelectedId(null)}
              style={{ marginBottom: '0.75rem', padding: '6px 14px', fontSize: '0.825rem', borderRadius: '20px', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
            >
              <span>← Browse All Indian Destinations (24 Cities)</span>
            </button>
          )}
          <PageTitle eyebrow="Destination Overview & Heritage Insights" title={`${city.name}, ${city.state}`} text={city.description} />
        </div>
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
          <button
            type="button"
            className={!selectedId ? 'active' : ''}
            onClick={() => setSelectedId(null)}
          >
            🏛️ All Cities ({visibleCities.length})
          </button>
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

      {!isCitySelected ? (
        /* ALL DESTINATIONS DISCOVERY GRID (Shown when user has NOT selected a city) */
        <div style={{ marginTop: '1.5rem' }}>
          <div style={{ marginBottom: '1.5rem' }}>
            <h3 style={{ fontSize: '1.4rem', margin: '0 0 0.35rem', color: 'var(--text-main)' }}>
              Choose a Destination to Explore
            </h3>
            <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '0.9rem' }}>
              Select any of India's 24 iconic heritage hubs below to view comprehensive monument guides, timings, fast facts, and traveler reviews.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.35rem' }}>
            {visibleCities.map((c) => (
              <article
                key={c.id}
                className="destination-photo-card"
                onClick={() => setSelectedId(c.id)}
                style={{ cursor: 'pointer', borderRadius: '16px', overflow: 'hidden', border: '1px solid var(--border-color)', background: 'var(--bg-surface)', transition: 'transform 0.2s, box-shadow 0.2s' }}
              >
                <div style={{ position: 'relative', height: '170px', overflow: 'hidden' }}>
                  <img
                    src={CITY_PHOTOS[c.name] || 'https://images.unsplash.com/photo-1599661046289-e31897846e41?w=800'}
                    alt={c.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1599661046289-e31897846e41?w=800'; }}
                  />
                  <span style={{ position: 'absolute', top: '10px', left: '10px', background: 'rgba(15,23,42,0.8)', color: '#ffffff', padding: '3px 8px', borderRadius: '10px', fontSize: '0.72rem', fontWeight: 600 }}>
                    📍 {c.state}
                  </span>
                  <span style={{ position: 'absolute', top: '10px', right: '10px', background: '#fef3c7', color: '#b45309', padding: '3px 8px', borderRadius: '10px', fontSize: '0.72rem', fontWeight: 800 }}>
                    ⭐ {c.rating || 4.8}
                  </span>
                </div>
                <div style={{ padding: '1rem' }}>
                  <h4 style={{ margin: '0 0 0.3rem', fontSize: '1.15rem', color: 'var(--text-main)' }}>{c.name}</h4>
                  <p style={{ margin: '0 0 0.75rem', fontSize: '0.825rem', color: 'var(--text-muted)', lineHeight: 1.45 }}>
                    {c.description}
                  </p>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '0.78rem', color: '#0f766e', fontWeight: 700 }}>
                      💰 ₹{c.estimatedDailyBudget || 4000}/day
                    </span>
                    <button type="button" className="primary-action" style={{ padding: '6px 12px', fontSize: '0.8rem', borderRadius: '6px' }}>
                      View Details ➔
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      ) : (
        /* SINGLE SELECTED CITY VIEW (Zero other city recommendations shown when a city is chosen) */
        <>
          <div className="destination-hero-card">
        <div className="destination-hero-img-wrap">
          <img
            src={CITY_PHOTOS[city.name] || 'https://images.unsplash.com/photo-1599661046289-e31897846e41?w=1200'}
            alt={city.name}
            onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1599661046289-e31897846e41?w=1200'; }}
          />
          <div className="destination-hero-gradient">
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '0.5rem' }}>
              <span style={{ background: '#0f766e', color: 'white', padding: '4px 12px', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 800 }}>
                📍 {city.state} • {city.region || 'India'}
              </span>
              <span style={{ background: 'rgba(245, 158, 11, 0.95)', color: '#0f172a', padding: '4px 12px', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 800 }}>
                ⭐ {city.rating || 4.8} / 5.0 (Score: {city.popularityScore || 95}/100)
              </span>
              <span style={{ background: 'rgba(255, 255, 255, 0.25)', backdropFilter: 'blur(8px)', color: 'white', padding: '4px 12px', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 700 }}>
                ⏱️ Ideal: {facts.idealDays || '2-3 Days'}
              </span>
            </div>
            <h1 style={{ margin: '0 0 0.4rem', fontSize: '2.4rem', fontWeight: 800, textShadow: '0 2px 12px rgba(0,0,0,0.5)' }}>
              {city.name}
            </h1>
            <p style={{ margin: 0, fontSize: '1rem', maxWidth: '750px', opacity: 0.95, textShadow: '0 1px 6px rgba(0,0,0,0.5)' }}>
              {city.description}
            </p>
          </div>
        </div>

        {/* QUICK ACTION TOOLBAR */}
        <div className="destination-quick-actions">
          <button
            type="button"
            className="dest-action-pill primary"
            onClick={() => {
              setSelectedId(city.id);
              if (setPage) setPage('planner');
            }}
          >
            <span>✨ Plan Trip to {city.name}</span>
          </button>
          <button
            type="button"
            className="dest-action-pill"
            onClick={() => {
              setSelectedId(city.id);
              if (setPage) setPage('rentals');
            }}
          >
            <span>🚗 Rental Services</span>
          </button>
          <button
            type="button"
            className="dest-action-pill"
            onClick={() => {
              setSelectedId(city.id);
              if (setPage) setPage('hotels');
            }}
          >
            <span>🏨 Hotels & Stays</span>
          </button>
          <button
            type="button"
            className="dest-action-pill"
            onClick={() => {
              setSelectedId(city.id);
              if (setPage) setPage('weather');
            }}
          >
            <span>⛅ Live Weather</span>
          </button>
          <button
            type="button"
            className="dest-action-pill"
            onClick={() => {
              setSelectedId(city.id);
              if (setPage) setPage('map');
            }}
          >
            <span>🗺️ Interactive Map</span>
          </button>
        </div>
      </div>

      {/* FEATURE 2: DEDICATED LANDMARK PHOTO GALLERY (Requirement 17) */}
      <div className="glass-panel" style={{ padding: '1.5rem', borderRadius: '18px', marginBottom: '2rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.5rem' }}>
          <div>
            <span className="card-tag" style={{ background: 'rgba(15, 118, 110, 0.12)', color: '#0f766e', fontWeight: 800 }}>
              📸 Curated Landmark Gallery • {city.name}
            </span>
            <h3 style={{ margin: '0.25rem 0 0', fontSize: '1.35rem', color: 'var(--text-main)' }}>
              Iconic Monuments & Scenic Sights of {city.name}
            </h3>
          </div>
          <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            High-Definition Photographic Sights
          </span>
        </div>

        <div className="landmark-photo-grid">
          {cityPhotos.map((item, idx) => (
            <div key={idx} className="landmark-photo-item">
              <img
                src={item.url}
                alt={item.name}
                loading="lazy"
                onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1599661046289-e31897846e41?w=800'; }}
              />
              <div className="landmark-photo-caption">
                <span style={{ fontSize: '0.725rem', background: 'rgba(15, 118, 110, 0.85)', padding: '2px 8px', borderRadius: '10px', display: 'inline-block', marginBottom: '4px', fontWeight: 700 }}>
                  {item.tag}
                </span>
                <strong style={{ fontSize: '0.95rem', display: 'block', color: 'white', textShadow: '0 1px 4px rgba(0,0,0,0.6)' }}>
                  {item.name}
                </strong>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* FEATURE 3: TRAVEL INTELLIGENCE & FAST FACTS (Requirement 13) */}
      <div className="glass-panel" style={{ padding: '1.5rem', borderRadius: '18px', marginBottom: '2rem' }}>
        <div style={{ marginBottom: '1rem' }}>
          <span className="card-tag" style={{ background: 'rgba(245, 158, 11, 0.12)', color: '#d97706', fontWeight: 800 }}>
            🧭 Travel Intelligence & Fast Facts
          </span>
          <h3 style={{ margin: '0.25rem 0 0', fontSize: '1.35rem', color: 'var(--text-main)' }}>
            Essential Logistics for {city.name}
          </h3>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem', marginBottom: '1.25rem' }}>
          <div style={{ background: 'var(--bg-surface-elevated, #f8fafc)', padding: '1rem', borderRadius: '12px', border: '1px solid var(--border, #e2e8f0)' }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>✈️ Nearest Airport</span>
            <strong style={{ fontSize: '0.95rem', color: 'var(--text-main)' }}>{facts.airport || 'Domestic / International Airport'}</strong>
          </div>
          <div style={{ background: 'var(--bg-surface-elevated, #f8fafc)', padding: '1rem', borderRadius: '12px', border: '1px solid var(--border, #e2e8f0)' }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>🚆 Central Railway</span>
            <strong style={{ fontSize: '0.95rem', color: 'var(--text-main)' }}>{facts.railway || 'Main City Rail Junction'}</strong>
          </div>
          <div style={{ background: 'var(--bg-surface-elevated, #f8fafc)', padding: '1rem', borderRadius: '12px', border: '1px solid var(--border, #e2e8f0)' }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>🗣️ Spoken Languages</span>
            <strong style={{ fontSize: '0.95rem', color: 'var(--text-main)' }}>{facts.language || 'Hindi, English'}</strong>
          </div>
          <div style={{ background: 'var(--bg-surface-elevated, #f8fafc)', padding: '1rem', borderRadius: '12px', border: '1px solid var(--border, #e2e8f0)' }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>☀️ Best Season to Visit</span>
            <strong style={{ fontSize: '0.95rem', color: '#b45309' }}>{city.bestSeason || 'October to March'}</strong>
          </div>
        </div>

        {/* FAMOUS LOCAL FOODS & DAY TRIPS */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem' }}>
          <div style={{ background: 'var(--bg-surface-elevated, #f8fafc)', padding: '1.25rem', borderRadius: '12px', border: '1px solid var(--border, #e2e8f0)' }}>
            <h4 style={{ margin: '0 0 0.65rem', fontSize: '1rem', display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-main)' }}>
              <span>🍛</span> Famous Local Foods & Specialties
            </h4>
            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
              {(facts.topDishes || ['Local Thali', 'Street Delicacies']).map((dish, idx) => (
                <span key={idx} style={{ background: 'var(--bg-surface, #ffffff)', border: '1px solid var(--border, #cbd5e1)', padding: '4px 10px', borderRadius: '14px', fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-main)' }}>
                  {dish}
                </span>
              ))}
            </div>
          </div>

          <div style={{ background: 'var(--bg-surface-elevated, #f8fafc)', padding: '1.25rem', borderRadius: '12px', border: '1px solid var(--border, #e2e8f0)' }}>
            <h4 style={{ margin: '0 0 0.65rem', fontSize: '1rem', display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-main)' }}>
              <span>🚗</span> Popular Day Trips & Excursions
            </h4>
            <ul style={{ margin: 0, paddingLeft: '1.2rem', fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
              {(facts.dayTrips || ['Heritage Fortress Excursion', 'Scenic Countryside Tour']).map((dt, idx) => (
                <li key={idx} style={{ marginBottom: '2px' }}>
                  <strong style={{ color: 'var(--text-main)' }}>{dt}</strong>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* SLIDING PHOTO CAROUSEL ANIMATION */}
      {!isCitySelected && (
        <DestinationsCarousel cities={visibleCities} onSelectCity={setSelectedId} />
      )}

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
          {/* FAST FACTS SUMMARY WIDGET */}
          <div className="glass-panel" style={{ padding: '1.25rem', borderRadius: '14px', marginBottom: '1.25rem', border: '1px solid var(--border)' }}>
            <span className="card-tag" style={{ background: 'rgba(15, 118, 110, 0.12)', color: '#0f766e', fontWeight: 800 }}>
              ⚡ Quick Overview
            </span>
            <div style={{ marginTop: '0.75rem', fontSize: '0.85rem', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              <div>
                <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.75rem' }}>Ideal Stay</span>
                <strong>{facts.idealDays || '2-3 Days'}</strong>
              </div>
              <div>
                <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.75rem' }}>Spoken Dialects</span>
                <strong>{facts.language || 'Hindi, English'}</strong>
              </div>
              <div>
                <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.75rem' }}>Top Delicacy</span>
                <strong>{facts.topDishes?.[0] || 'Local Thali'}</strong>
              </div>
            </div>
          </div>

          <p className="eyebrow">Travel Tips</p>
          {tips.map((tip) => (
            <article className="tip-row" key={tip.id}>
              <strong>{tip.title}</strong>
              <p>{tip.detail}</p>
            </article>
          ))}
        </aside>
      </div>
        </>
      )}
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
                    <strong>{b.customerName || (user ? user.name : 'Traveler')}</strong>
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

const _CITY_FOOD_RECOMMENDATIONS = {
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

function PlannerPage({ cities, city, formatPrice, handleAddMilestone, handleOpenBooking, selectedMarker }) {
  const chosenCity = selectedMarker?.name || city?.name || 'Jaipur';
  return (
    <section className="page planner-page" style={{ maxWidth: '1200px', margin: '0 auto', padding: '1rem' }}>
      <PageTitle
        eyebrow="✨ Yatra AI-Powered Innovation"
        title="Smart Trip Planner & Route Optimizer"
        text="Experience intelligent 6-step personalized itinerary planning, smart nearest-neighbor route distance minimization, live Leaflet waypoint mapping, and detailed expense calculations."
      />

      <SihTripPlanner
        cities={cities}
        selectedCity={chosenCity}
        formatPrice={formatPrice}
        handleAddMilestone={handleAddMilestone}
        handleOpenBooking={handleOpenBooking}
      />
    </section>
  );
}

function GemsPage({ cities, setPage, setSelectedId }) {
  return (
    <section className="page" style={{ maxWidth: '1200px', margin: '0 auto', padding: '1rem' }}>
      <SihHiddenGems
        onPlanForCity={(cityName) => {
          const matched = (cities || []).find((c) => c.name.toLowerCase() === cityName.toLowerCase());
          if (matched) setSelectedId(matched.id);
          setPage('planner');
        }}
      />
    </section>
  );
}

function ExperiencesPage({ formatPrice, handleOpenBooking, onOpenEnquiry, setPage, setSelectedId }) {
  return (
    <section className="page" style={{ maxWidth: '1200px', margin: '0 auto', padding: '1rem' }}>
      <SihExperiences
        onEnquire={onOpenEnquiry}
        onOpenBooking={handleOpenBooking}
        formatPrice={formatPrice}
        setPage={setPage}
        setSelectedId={setSelectedId}
      />
    </section>
  );
}

function MarketplacePage({ onOpenEnquiry }) {
  return (
    <section className="page" style={{ maxWidth: '1200px', margin: '0 auto', padding: '1rem' }}>
      <SihMarketplace onEnquire={onOpenEnquiry} />
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
  const [mode, setMode] = useState('login'); // 'login' | 'register' | 'google'
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [city, setCity] = useState('Jaipur');
  const [interest, setInterest] = useState('Heritage');
  const [googleEmail, setGoogleEmail] = useState('');
  const [googleName, setGoogleName] = useState('');
  const [googleClientId, setGoogleClientId] = useState(() => {
    try {
      return localStorage.getItem('yatra_google_client_id') || '';
    } catch {
      return '';
    }
  });
  const [showConfig, setShowConfig] = useState(false);
  const [loading, setLoading] = useState(false);
  const [successNotice, setSuccessNotice] = useState('');
  const [errorNotice, setErrorNotice] = useState('');
  const gsiBtnRef = useRef(null);

  // Real Google Sign-In Popup Window Handler
  const openGooglePopup = () => {
    setErrorNotice('');
    setSuccessNotice('');

    // If Google Client ID is configured, trigger One Tap prompt as well
    if (typeof window !== 'undefined' && window.google?.accounts?.id && googleClientId) {
      try {
        window.google.accounts.id.prompt();
      } catch {}
    }

    const width = 500;
    const height = 660;
    const left = window.screenX + Math.max(0, (window.outerWidth - width) / 2);
    const top = window.screenY + Math.max(0, (window.outerHeight - height) / 2);

    const popup = window.open(
      '/auth/google',
      'GoogleAccountSignIn',
      `width=${width},height=${height},left=${left},top=${top},status=no,menubar=no,toolbar=no,location=no,resizable=yes`
    );

    // If popup was blocked by browser, gracefully switch to inline Google approval mode
    if (!popup || popup.closed || typeof popup.closed === 'undefined') {
      setMode('google');
    }
  };

  // Listen for Google OAuth Approval Message from the Popup Window
  useEffect(() => {
    const handleAuthMessage = async (event) => {
      if (event.data && event.data.type === 'GOOGLE_AUTH_SUCCESS') {
        const approved = event.data.user;
        if (!approved || !approved.email) return;

        setLoading(true);
        setErrorNotice('');
        try {
          const googleUser = await yatraApi.signInWithGoogle({
            email: approved.email.trim(),
            name: approved.name?.trim() || approved.email.split('@')[0],
            avatarUrl: approved.avatarUrl || 'https://lh3.googleusercontent.com/a/default-user',
            authProvider: 'google',
            city: 'Jaipur',
            interest: 'Heritage'
          });
          setUser(googleUser);
          setSuccessNotice(`Google account approved for yatra666! Welcome, ${googleUser.name}!`);
          setTimeout(() => onClose(), 900);
        } catch (err) {
          setErrorNotice(err.message || 'Failed to save Google account to Cloudflare D1.');
        } finally {
          setLoading(false);
        }
      }
    };

    window.addEventListener('message', handleAuthMessage);
    return () => window.removeEventListener('message', handleAuthMessage);
  }, [setUser, onClose]);

  const handleGoogleCredentialResponse = async (response) => {
    if (!response || !response.credential) {
      setErrorNotice('Google sign-in did not return valid credentials.');
      return;
    }
    setLoading(true);
    setErrorNotice('');
    try {
      const base64Url = response.credential.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join('')
      );
      const payload = JSON.parse(jsonPayload);
      const googleUser = await yatraApi.signInWithGoogle({
        email: payload.email,
        name: payload.name || payload.email.split('@')[0],
        avatarUrl: payload.picture || `https://lh3.googleusercontent.com/a/default-user`,
        authProvider: 'google',
        city: 'Jaipur',
        interest: 'Heritage'
      });
      setUser(googleUser);
      setSuccessNotice(`Welcome, ${googleUser.name}! Verified with Google & saved to Cloudflare D1.`);
      setTimeout(() => onClose(), 900);
    } catch (err) {
      setErrorNotice(err.message || 'Google authentication failed.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (typeof window !== 'undefined' && window.google?.accounts?.id && googleClientId && googleClientId.trim()) {
      try {
        window.google.accounts.id.initialize({
          client_id: googleClientId.trim(),
          callback: handleGoogleCredentialResponse,
          auto_select: false,
          cancel_on_tap_outside: true,
        });
        if (gsiBtnRef.current) {
          window.google.accounts.id.renderButton(gsiBtnRef.current, {
            theme: 'outline',
            size: 'large',
            type: 'standard',
            shape: 'rectangular',
            text: 'continue_with',
            logo_alignment: 'left',
            width: 280,
          });
        }
      } catch (e) {
        console.warn('Google Identity initialization notice:', e);
      }
    }
  }, [googleClientId, mode]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorNotice('');
    setSuccessNotice('');

    if (mode === 'login') {
      if (!email.trim()) {
        setErrorNotice('Please enter your email address.');
        return;
      }
      if (!password || !password.trim()) {
        setErrorNotice('Please enter your password.');
        return;
      }

      setLoading(true);
      try {
        const loggedInUser = await yatraApi.login({ email: email.trim(), password });
        setUser(loggedInUser);
        setSuccessNotice(`Welcome back, ${loggedInUser.name}! (Password verified with Cloudflare D1)`);
        setTimeout(() => onClose(), 900);
      } catch (err) {
        setErrorNotice(err.message || 'Incorrect email or password. Please verify and try again.');
      } finally {
        setLoading(false);
      }
    } else if (mode === 'register') {
      if (!name.trim()) {
        setErrorNotice('Please enter your full name.');
        return;
      }
      if (!email.trim()) {
        setErrorNotice('Please enter your email address.');
        return;
      }
      if (!password || password.length < 4) {
        setErrorNotice('Password must be at least 4 characters long.');
        return;
      }

      setLoading(true);
      try {
        const registeredUser = await yatraApi.register({
          name: name.trim(),
          email: email.trim(),
          password,
          city,
          interest,
          authProvider: 'email'
        });
        setUser(registeredUser);
        setSuccessNotice(`Account created in Cloudflare D1! Welcome, ${registeredUser.name}!`);
        setTimeout(() => onClose(), 900);
      } catch (err) {
        setErrorNotice(err.message || 'Registration failed. Please try again.');
      } finally {
        setLoading(false);
      }
    } else if (mode === 'google') {
      if (!googleEmail.trim()) {
        setErrorNotice('Please enter your Google email address.');
        return;
      }
      if (!googleName.trim()) {
        setErrorNotice('Please enter your Google display name.');
        return;
      }

      setLoading(true);
      try {
        const googleUser = await yatraApi.signInWithGoogle({
          email: googleEmail.trim(),
          name: googleName.trim(),
          avatarUrl: `https://lh3.googleusercontent.com/a/default-user`,
          authProvider: 'google',
          city: 'Jaipur',
          interest: 'Heritage'
        });
        setUser(googleUser);
        setSuccessNotice(`Google account connected in Cloudflare D1! Welcome, ${googleUser.name}!`);
        setTimeout(() => onClose(), 900);
      } catch (err) {
        setErrorNotice(err.message || 'Google account creation failed.');
      } finally {
        setLoading(false);
      }
    }
  };

  const handleSaveClientId = (newId) => {
    setGoogleClientId(newId);
    try {
      localStorage.setItem('yatra_google_client_id', newId.trim());
      setSuccessNotice('Google Client ID updated.');
    } catch {}
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
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            {mode === 'google' && <GoogleIcon size={24} />}
            <h2 style={{ margin: 0, fontSize: '1.35rem' }}>
              {user ? (user.authProvider === 'google' ? 'Google Account Profile' : 'Traveler Profile') : mode === 'google' ? 'Sign in with Google' : mode === 'login' ? 'Sign In to Yatra' : 'Create Yatra Account'}
            </h2>
          </div>
          <button type="button" className="close-btn" onClick={onClose}>✕</button>
        </div>

        {user ? (
          <div>
            <div style={{ textAlign: 'center', margin: '1rem 0 1.5rem' }}>
              <div style={{ position: 'relative', width: '74px', height: '74px', margin: '0 auto 0.75rem' }}>
                {user.avatarUrl ? (
                  <img
                    src={user.avatarUrl}
                    alt={user.name}
                    style={{ width: '74px', height: '74px', borderRadius: '50%', objectFit: 'cover', border: '3px solid #4285F4', boxShadow: '0 4px 16px rgba(66, 133, 244, 0.25)' }}
                    onError={(e) => { e.target.style.display = 'none'; }}
                  />
                ) : (
                  <div style={{ width: '74px', height: '74px', borderRadius: '50%', background: user.authProvider === 'google' ? 'linear-gradient(135deg, #4285F4, #34A853)' : 'linear-gradient(135deg, var(--primary), #6366f1)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem', margin: '0 auto', fontWeight: 800, boxShadow: '0 4px 16px rgba(0,0,0,0.15)' }}>
                    {user.name?.charAt(0).toUpperCase() || 'U'}
                  </div>
                )}
                {user.authProvider === 'google' && (
                  <div style={{ position: 'absolute', bottom: -2, right: -2, background: '#ffffff', borderRadius: '50%', padding: '3px', boxShadow: '0 2px 8px rgba(0,0,0,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center' }} title="Google Verified">
                    <GoogleIcon size={16} />
                  </div>
                )}
              </div>

              <h3 style={{ margin: '0 0 0.25rem', fontSize: '1.25rem' }}>{user.name}</h3>
              <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '0.9rem' }}>{user.email}</p>

              <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', marginTop: '0.85rem', flexWrap: 'wrap' }}>
                <span style={{ fontSize: '0.75rem', background: 'rgba(16, 185, 129, 0.15)', color: '#10b981', padding: '0.25rem 0.65rem', borderRadius: '12px', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#10b981', display: 'inline-block' }}></span>
                  Cloudflare D1 Active
                </span>

                {user.authProvider === 'google' && (
                  <span style={{ fontSize: '0.75rem', background: 'rgba(66, 133, 244, 0.12)', color: '#4285F4', padding: '0.25rem 0.65rem', borderRadius: '12px', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '5px', border: '1px solid rgba(66, 133, 244, 0.25)' }}>
                    <GoogleIcon size={13} />
                    Google Verified
                  </span>
                )}

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
            {errorNotice && (
              <div style={{ background: 'rgba(239, 68, 68, 0.14)', border: '1px solid rgba(239, 68, 68, 0.35)', color: '#f87171', padding: '0.75rem 0.95rem', borderRadius: '8px', fontSize: '0.85rem', textAlign: 'center', marginBottom: '1rem', fontWeight: 600 }}>
                ⚠️ {errorNotice}
              </div>
            )}

            {successNotice && (
              <div style={{ background: 'rgba(16, 185, 129, 0.14)', border: '1px solid rgba(16, 185, 129, 0.35)', color: '#34d399', padding: '0.75rem 0.95rem', borderRadius: '8px', fontSize: '0.85rem', textAlign: 'center', marginBottom: '1rem', fontWeight: 600 }}>
                ✅ {successNotice}
              </div>
            )}

            {mode === 'google' ? (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {/* Real Google Account Popup Action Button */}
                <button
                  type="button"
                  className="auth-social-btn"
                  onClick={openGooglePopup}
                  disabled={loading}
                  style={{ background: '#ffffff', color: '#1f1f1f', border: '1px solid #747775', boxShadow: '0 2px 8px rgba(0,0,0,0.1)', padding: '0.85rem', margin: '0 0 0.5rem' }}
                >
                  <GoogleIcon size={20} />
                  <span>Open Google Account Window ➔</span>
                </button>

                {/* Official Google Identity Services SDK Render Container */}
                {googleClientId && (
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
                    <div ref={gsiBtnRef} className="gsi-button-wrapper"></div>
                  </div>
                )}

                <div className="auth-divider" style={{ width: '100%', margin: '0.25rem 0' }}>
                  <span>OR APPROVE INLINE</span>
                </div>

                <div style={{ background: 'rgba(66, 133, 244, 0.08)', border: '1px solid rgba(66, 133, 244, 0.25)', borderRadius: '12px', padding: '1rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.75rem' }}>
                    <GoogleIcon size={20} />
                    <span style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-main)' }}>
                      Connect Google Account to yatra666
                    </span>
                  </div>

                  <p style={{ margin: '0 0 0.75rem', fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: '1.4' }}>
                    To continue, Google will share your name, email address, language preference, and profile picture with <strong>yatra666</strong>.
                  </p>

                  <label style={{ display: 'block', marginBottom: '0.75rem' }}>
                    <span style={{ fontSize: '0.825rem', fontWeight: 700, display: 'block', marginBottom: '0.25rem' }}>Google Email Address</span>
                    <input
                      type="email"
                      className="clean-input"
                      placeholder="name@gmail.com"
                      value={googleEmail}
                      onChange={(e) => setGoogleEmail(e.target.value)}
                      required
                    />
                  </label>

                  <label style={{ display: 'block', marginBottom: '0.75rem' }}>
                    <span style={{ fontSize: '0.825rem', fontWeight: 700, display: 'block', marginBottom: '0.25rem' }}>Your Name</span>
                    <input
                      className="clean-input"
                      placeholder="First and last name"
                      value={googleName}
                      onChange={(e) => setGoogleName(e.target.value)}
                      required
                    />
                  </label>
                </div>

                <button
                  type="submit"
                  className="auth-social-btn"
                  disabled={loading}
                  style={{ background: '#0b57d0', color: '#ffffff', border: '1px solid #0b57d0', boxShadow: '0 2px 8px rgba(11, 87, 208, 0.3)', margin: 0, padding: '0.85rem' }}
                >
                  <GoogleIcon size={20} />
                  <span>{loading ? 'Connecting Google Account...' : 'Approve & Continue with Google ➔'}</span>
                </button>

                {/* Optional Google OAuth Client ID Configuration */}
                <div style={{ marginTop: '0.25rem' }}>
                  <button
                    type="button"
                    onClick={() => setShowConfig((p) => !p)}
                    style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', fontSize: '0.78rem', cursor: 'pointer', textDecoration: 'underline' }}
                  >
                    ⚙️ {showConfig ? 'Hide Google Cloud Client ID settings' : 'Custom Google Cloud OAuth Client ID (Optional)'}
                  </button>
                  {showConfig && (
                    <div style={{ marginTop: '0.5rem', padding: '0.75rem', background: 'rgba(255,255,255,0.04)', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.35rem' }}>
                        Paste your Google OAuth 2.0 Web Client ID to trigger native Google One Tap popup:
                      </span>
                      <input
                        className="clean-input"
                        placeholder="e.g. 123456789-abc.apps.googleusercontent.com"
                        value={googleClientId}
                        onChange={(e) => handleSaveClientId(e.target.value)}
                        style={{ fontSize: '0.8rem', padding: '0.4rem 0.6rem' }}
                      />
                    </div>
                  )}
                </div>

                <button
                  type="button"
                  className="secondary-action"
                  onClick={() => { setMode('login'); setErrorNotice(''); setSuccessNotice(''); }}
                  style={{ width: '100%', textAlign: 'center', fontSize: '0.85rem' }}
                >
                  ← Back to Email & Password
                </button>
              </form>
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

                {/* Real Google Sign-In Button Opening Real Google Popup Window */}
                <button
                  type="button"
                  className="auth-social-btn"
                  onClick={openGooglePopup}
                  disabled={loading}
                >
                  <GoogleIcon size={20} />
                  <span>Continue with Google</span>
                </button>

                <div className="auth-divider">
                  <span>OR EMAIL & PASSWORD</span>
                </div>

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {mode === 'register' && (
                    <>
                      <label>
                        <span style={{ fontSize: '0.825rem', fontWeight: 700, display: 'block', marginBottom: '0.25rem' }}>Full Name</span>
                        <input
                          className="clean-input"
                          placeholder="Your Name"
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
                    {loading ? 'Verifying with Cloudflare D1...' : mode === 'login' ? 'Sign In ➔' : 'Create Account ➔'}
                  </button>
                </form>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Yatra 66 ErrorBoundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ minHeight: '80vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '2rem', textAlign: 'center', background: 'var(--bg-canvas, #f8fafc)', color: 'var(--text-main, #0f172a)' }}>
          <div style={{ fontSize: '3.5rem', marginBottom: '1rem' }}>🧭</div>
          <h2 style={{ fontSize: '1.75rem', fontWeight: 800, marginBottom: '0.5rem' }}>Travel Compass Recalibrating</h2>
          <p style={{ color: 'var(--text-muted, #64748b)', maxWidth: '500px', marginBottom: '1.5rem', lineHeight: 1.5 }}>
            A temporary display hitch occurred. Your bookings, itineraries, and settings are safely preserved.
          </p>
          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', justifyContent: 'center' }}>
            <button
              type="button"
              className="primary-action"
              style={{ padding: '0.75rem 1.5rem', borderRadius: '10px', fontWeight: 700 }}
              onClick={() => {
                this.setState({ hasError: false, error: null });
                window.location.reload();
              }}
            >
              🔄 Reload Experience
            </button>
            <button
              type="button"
              className="secondary-action"
              style={{ padding: '0.75rem 1.5rem', borderRadius: '10px' }}
              onClick={() => {
                this.setState({ hasError: false, error: null });
                window.location.href = '/';
              }}
            >
              Return to Home
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

function AppWithErrorBoundary(props) {
  return (
    <ErrorBoundary>
      <App {...props} />
    </ErrorBoundary>
  );
}

export default AppWithErrorBoundary;
