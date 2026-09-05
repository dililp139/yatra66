import TourismBusinessDashboard from './TourismBusinessDashboard';
import { useState, useMemo } from 'react';
import { LOCAL_BUSINESSES_DATA, registerLocalBusiness, getCustomLocalBusinesses, getStoredBusinessEnquiries } from '../services/sihData';
import yatraApi from '../services/yatraService';
import SihRouteMap from './SihRouteMap';

const POPULAR_CITIES = [
  'Jaipur', 'Agra', 'Varanasi', 'Goa', 'Manali', 'Udaipur', 'Kochi', 'Rishikesh',
  'Amritsar', 'Delhi', 'Mumbai', 'Leh Ladakh', 'Shimla', 'Mysore', 'Pondicherry',
  'Hyderabad', 'Kolkata', 'Jodhpur', 'Ooty', 'Shillong'
];

const CATEGORY_ICONS = {
  'Homestay & Havelis': '🏡',
  'Heritage Walking Guide': '🧭',
  'Verified Local Transport': '🚕',
  'Handicraft & Textile Cooperative': '🧵',
  'Culinary Walking Host': '🍲',
};

const CATEGORIES = [
  { id: 'all', label: 'All Providers', icon: '✨' },
  { id: 'Homestay & Havelis', label: 'Homestays & Havelis', icon: '🏡' },
  { id: 'Heritage Walking Guide', label: 'Licensed Guides', icon: '🧭' },
  { id: 'Verified Local Transport', label: 'Local Drivers', icon: '🚕' },
  { id: 'Handicraft & Textile Cooperative', label: 'Artisans & Crafts', icon: '🧵' },
  { id: 'Culinary Walking Host', label: 'Food & Culinary', icon: '🍲' },
];

export default function SihMarketplace({ onEnquire }) {
  const [activeTab, setActiveTab] = useState('browse');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'map' // 'browse' | 'register' | 'enquiries'
  const [activeCategory, setActiveCategory] = useState('all');
  const [hubSection, setHubSection] = useState('all'); // 'all' | 'buy' | 'eat' | 'experience'
  const [filterCity, setFilterCity] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Custom City Search via Gemini AI
  const [customCitySearch, setCustomCitySearch] = useState('');
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [aiLoadedCity, setAiLoadedCity] = useState('');
  const [aiBusinesses, setAiBusinesses] = useState([]);

  // Business registration form state
  const [regForm, setRegForm] = useState({
    name: '',
    category: 'Homestay & Havelis',
    city: 'Jaipur',
    description: '',
    directRate: '',
    contactPhone: '',
    contactEmail: '',
  });
  const [regSuccess, setRegSuccess] = useState(false);

  // Combine default dataset, custom registered businesses, and Gemini AI fetched businesses
  const allBusinesses = useMemo(() => {
    const custom = getCustomLocalBusinesses();
    const seen = new Set();
    const list = [];

    [...aiBusinesses, ...custom, ...LOCAL_BUSINESSES_DATA].forEach((rawBiz) => {
      const city = rawBiz.city || rawBiz.cityName || 'Jaipur';
      const contactPhone = rawBiz.contactPhone || rawBiz.phone || '+91 98290 14829';
      const directRate = rawBiz.directRate || (rawBiz.startingPriceInr ? `₹${rawBiz.startingPriceInr.toLocaleString('en-IN')} ${rawBiz.priceUnit || ''}` : '₹1,500/day');
      
      let category = rawBiz.category || 'Homestay & Havelis';
      if (category === 'Homestay') category = 'Homestay & Havelis';
      else if (category === 'Guide' || category === 'Local Tours') category = 'Heritage Walking Guide';
      else if (category === 'Driver') category = 'Verified Local Transport';
      else if (category === 'Handicrafts') category = 'Handicraft & Textile Cooperative';
      else if (category === 'Restaurant') category = 'Culinary Walking Host';

      const biz = {
        ...rawBiz,
        city,
        cityName: city,
        contactPhone,
        phone: contactPhone,
        directRate,
        category,
        imageUrl: rawBiz.imageUrl || 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800',
      };

      const key = `${biz.name}-${biz.city}`.toLowerCase();
      if (!seen.has(key)) {
        seen.add(key);
        list.push(biz);
      }
    });

    return list;
  }, [regSuccess, aiBusinesses]);

  const enquiries = useMemo(() => {
    return getStoredBusinessEnquiries();
  }, [activeTab]);

  const handleFetchAiLocals = async (cityName) => {
    if (!cityName || cityName === 'all') return;
    setIsAiLoading(true);
    setAiLoadedCity(cityName);

    try {
      const results = await yatraApi.getAiLocals(cityName, activeCategory);
      if (results && results.length > 0) {
        setAiBusinesses((prev) => {
          const filtered = prev.filter((b) => b.city.toLowerCase() !== cityName.toLowerCase());
          return [...results, ...filtered];
        });
      }
    } catch (err) {
      console.warn('Could not fetch AI locals:', err);
    } finally {
      setIsAiLoading(false);
    }
  };

  const handleCitySelect = (city) => {
    setFilterCity(city);
    if (city !== 'all') {
      handleFetchAiLocals(city);
    }
  };

  const handleCustomCitySubmit = (e) => {
    e.preventDefault();
    if (!customCitySearch.trim()) return;
    const cleanCity = customCitySearch.trim();
    setFilterCity(cleanCity);
    handleFetchAiLocals(cleanCity);
  };

  // 1. filteredBusinesses declared FIRST to prevent TDZ ReferenceError!
  const filteredBusinesses = useMemo(() => {
    return allBusinesses.filter((b) => {
      const matchCat = activeCategory === 'all' || 
        b.category === activeCategory ||
        (activeCategory === 'Homestay & Havelis' && (b.category === 'Homestay' || b.category === 'Homestay & Havelis')) ||
        (activeCategory === 'Heritage Walking Guide' && (b.category === 'Guide' || b.category === 'Local Tours' || b.category === 'Heritage Walking Guide')) ||
        (activeCategory === 'Verified Local Transport' && (b.category === 'Driver' || b.category === 'Verified Local Transport')) ||
        (activeCategory === 'Handicraft & Textile Cooperative' && (b.category === 'Handicrafts' || b.category === 'Handicraft & Textile Cooperative')) ||
        (activeCategory === 'Culinary Walking Host' && (b.category === 'Restaurant' || b.category === 'Culinary Walking Host'));

      const matchCity = filterCity === 'all' || (b.city && b.city.toLowerCase() === filterCity.toLowerCase());
      
      const q = searchQuery.trim().toLowerCase();
      const matchSearch = !q || (
        (b.name && b.name.toLowerCase().includes(q)) ||
        (b.city && b.city.toLowerCase().includes(q)) ||
        (b.category && b.category.toLowerCase().includes(q)) ||
        (b.description && b.description.toLowerCase().includes(q)) ||
        (b.contactPhone && b.contactPhone.toLowerCase().includes(q))
      );

      return matchCat && matchCity && matchSearch;
    });
  }, [allBusinesses, activeCategory, filterCity, searchQuery]);

  // 2. Local Providers Interactive Map Coordinates (calculated AFTER filteredBusinesses)
  const mapWaypoints = useMemo(() => {
    const cityCenters = {
      jaipur: { lat: 26.9124, lng: 75.7873 },
      agra: { lat: 27.1767, lng: 78.0081 },
      delhi: { lat: 28.6139, lng: 77.2090 },
      mumbai: { lat: 18.9220, lng: 72.8347 },
      goa: { lat: 15.4989, lng: 73.8278 },
      varanasi: { lat: 25.3176, lng: 82.9739 },
      manali: { lat: 32.2396, lng: 77.1887 },
      udaipur: { lat: 24.5854, lng: 73.7125 },
      kochi: { lat: 9.9312, lng: 76.2673 },
      amritsar: { lat: 31.6340, lng: 74.8723 },
      rishikesh: { lat: 30.0869, lng: 78.2676 },
      'leh ladakh': { lat: 34.1526, lng: 77.5771 },
      shimla: { lat: 31.1048, lng: 77.1734 },
      mysore: { lat: 12.2958, lng: 76.6394 },
      pondicherry: { lat: 11.9416, lng: 79.8083 },
      hyderabad: { lat: 17.3850, lng: 78.4867 },
      kolkata: { lat: 22.5726, lng: 88.3639 },
      jodhpur: { lat: 26.2389, lng: 73.0243 },
      ooty: { lat: 11.4102, lng: 76.6950 },
      shillong: { lat: 25.5788, lng: 91.8933 },
    };

    return (filteredBusinesses || []).map((b, i) => {
      const cKey = (b.city || 'jaipur').toLowerCase();
      const center = cityCenters[cKey] || { lat: 26.9124, lng: 75.7873 };
      const angle = ((i * 47) % 360) * (Math.PI / 180);
      const rad = 0.008 + (i * 0.003);
      return {
        name: b.name,
        type: b.category,
        time: b.directRate || '0% Commission',
        lat: b.latitude || Number((center.lat + rad * Math.cos(angle)).toFixed(6)),
        lng: b.longitude || Number((center.lng + rad * Math.sin(angle)).toFixed(6)),
        sequenceOrder: i + 1,
      };
    });
  }, [filteredBusinesses]);

  const availableCities = useMemo(() => {
    const set = new Set(POPULAR_CITIES);
    allBusinesses.forEach((b) => {
      if (b.city) set.add(b.city);
    });
    return Array.from(set);
  }, [allBusinesses]);

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    registerLocalBusiness({
      ...regForm,
      isCustom: true,
      verified: true,
      rating: 5.0
    });
    setRegSuccess(true);
    setTimeout(() => {
      setRegSuccess(false);
      setActiveTab('browse');
    }, 1800);
  };

  const handleLoadSample = () => {
    setRegForm({
      name: 'Kalyan Heritage Haveli & Homestay',
      category: 'Homestay & Havelis',
      city: 'Jaipur',
      directRate: '₹2,400 / night',
      contactPhone: '+91 98290 88214',
      contactEmail: 'contact@kalyanhaveli.com',
      description: 'Centuries-old restored courtyard haveli offering rooftop sunrise yoga, authentic Mewari home-cooked thalis, and zero-commission direct host booking.',
    });
  };

  return (
    <div className="sih-marketplace-section">
      {/* HEADER ROW */}
      <div className="section-header-row" style={{ marginBottom: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <span className="card-tag market-badge-commission">
            🤝 Direct Local Empowerment: 0% Platform Commission
          </span>
          <h2 style={{ fontSize: '1.85rem', margin: '0.4rem 0 0.25rem', color: 'var(--text-main)' }}>
            Support Local Tourism
          </h2>
          <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '0.95rem', maxWidth: '720px' }}>
            Bridging the digital gap: Connecting travelers directly with family homestays, licensed government guides, village artisans, and local drivers with <strong>0% middleman fees</strong>.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          <button
            type="button"
            className={`secondary-action ${activeTab === 'browse' && viewMode === 'grid' ? 'active' : ''}`}
            onClick={() => { setActiveTab('browse'); setViewMode('grid'); }}
            style={{ padding: '8px 16px', fontSize: '0.85rem' }}
          >
            🔍 Browse Market
          </button>
          <button
            type="button"
            className={`secondary-action ${activeTab === 'browse' && viewMode === 'map' ? 'active' : ''}`}
            onClick={() => { setActiveTab('browse'); setViewMode('map'); }}
            style={{ padding: '8px 16px', fontSize: '0.85rem' }}
          >
            🗺️ Map View
          </button>
          <button
            type="button"
            className={`secondary-action ${activeTab === 'dashboard' ? 'active' : ''}`}
            onClick={() => setActiveTab('dashboard')}
            style={{ padding: '8px 16px', fontSize: '0.85rem' }}
          >
            📈 Business Dashboard
          </button>
          <button
            type="button"
            className={`secondary-action ${activeTab === 'register' ? 'active' : ''}`}
            onClick={() => setActiveTab('register')}
            style={{ padding: '8px 16px', fontSize: '0.85rem' }}
          >
            🏪 List Local Business
          </button>
          <button
            type="button"
            className={`secondary-action ${activeTab === 'enquiries' ? 'active' : ''}`}
            onClick={() => setActiveTab('enquiries')}
            style={{ padding: '8px 16px', fontSize: '0.85rem' }}
          >
            📩 Enquiries ({enquiries.length})
          </button>
        </div>
      </div>

      {/* VIEW: BROWSE MARKETPLACE */}
      {activeTab === 'browse' && (
        <>
          {/* TRIPARTITE "SUPPORT LOCAL" PARTICIPATION HUB */}
          <div
            style={{
              background: 'linear-gradient(135deg, rgba(15, 118, 110, 0.08), rgba(234, 88, 12, 0.08))',
              border: '1.5px solid #0f766e',
              borderRadius: '20px',
              padding: '1.25rem 1.5rem',
              marginBottom: '1.75rem',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '1rem' }}>
              <div>
                <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#0f766e', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  🛍️ Support Local Economic Participation Hub
                </span>
                <h3 style={{ margin: '0.15rem 0 0', fontSize: '1.2rem', color: 'var(--text-main)' }}>
                  Buy Local, Eat Local, Experience Local
                </h3>
              </div>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                100% of payment goes directly to families & craftsmen
              </span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '0.75rem' }}>
              {[
                { id: 'all', label: '✨ All Community Providers', count: allBusinesses.length, desc: 'Browse all local categories' },
                { id: 'buy', label: '🛒 Buy Local', count: allBusinesses.filter(b => b.category === 'Handicraft & Textile Cooperative').length, desc: 'Verified artisans, weavers & potters' },
                { id: 'eat', label: '🍲 Eat Local', count: allBusinesses.filter(b => b.category === 'Culinary Walking Host').length, desc: 'Family dhabas & authentic thali hosts' },
                { id: 'experience', label: '🎭 Experience Local', count: allBusinesses.filter(b => ['Heritage Walking Guide', 'Homestay & Havelis', 'Verified Local Transport'].includes(b.category)).length, desc: 'Village walks, storytellers & stays' },
              ].map((sec) => (
                <button
                  key={sec.id}
                  type="button"
                  onClick={() => {
                    setHubSection(sec.id);
                    if (sec.id !== 'all') setActiveCategory('all');
                  }}
                  style={{
                    background: hubSection === sec.id ? 'var(--brand-primary, #0f766e)' : 'var(--bg-surface, #ffffff)',
                    color: hubSection === sec.id ? '#ffffff' : 'var(--text-main)',
                    border: hubSection === sec.id ? '1.5px solid #0f766e' : '1px solid var(--border-color, #e2e8f0)',
                    borderRadius: '14px',
                    padding: '0.85rem 1rem',
                    textAlign: 'left',
                    cursor: 'pointer',
                    boxShadow: hubSection === sec.id ? '0 6px 18px rgba(15, 118, 110, 0.25)' : '0 2px 6px rgba(0,0,0,0.02)',
                    transition: 'all 0.2s ease',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2px' }}>
                    <strong style={{ fontSize: '0.92rem' }}>{sec.label}</strong>
                    <span style={{ fontSize: '0.75rem', fontWeight: 800, opacity: 0.85 }}>({sec.count})</span>
                  </div>
                  <div style={{ fontSize: '0.725rem', opacity: 0.85 }}>{sec.desc}</div>
                </button>
              ))}
            </div>
          </div>
          {/* SEARCH BAR & CITY CONTROLS */}
          <div className="market-filter-card">
            
            {/* Direct Keyword Search Bar */}
            <div style={{ position: 'relative', marginBottom: '1rem' }}>
              <input
                type="text"
                placeholder="🔍 Search by business name, specialty, guide language, driver, or city..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="market-search-input"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  style={{
                    position: 'absolute',
                    right: '12px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'none',
                    border: 'none',
                    color: 'var(--text-muted)',
                    cursor: 'pointer',
                    fontSize: '1rem',
                  }}
                >
                  ✕
                </button>
              )}
            </div>

            {/* CATEGORY SELECTOR PILLS */}
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  className={`quick-pill-tag ${activeCategory === cat.id ? 'active' : ''}`}
                  onClick={() => setActiveCategory(cat.id)}
                  style={{ cursor: 'pointer', padding: '6px 14px', borderRadius: '20px' }}
                >
                  {cat.icon} {cat.label}
                </button>
              ))}
            </div>

            {/* CITY SELECTOR & GEMINI AI SEARCH */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', alignItems: 'center' }}>
                <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)' }}>
                  Filter City:
                </span>
                <button
                  type="button"
                  className={`quick-pill-tag ${filterCity === 'all' ? 'active' : ''}`}
                  onClick={() => handleCitySelect('all')}
                  style={{ cursor: 'pointer', padding: '4px 10px', borderRadius: '14px', fontSize: '0.75rem' }}
                >
                  All Cities ({allBusinesses.length})
                </button>
                {availableCities.slice(0, 10).map((c) => (
                  <button
                    key={c}
                    type="button"
                    className={`quick-pill-tag ${filterCity.toLowerCase() === c.toLowerCase() ? 'active' : ''}`}
                    onClick={() => handleCitySelect(c)}
                    style={{ cursor: 'pointer', padding: '4px 10px', borderRadius: '14px', fontSize: '0.75rem' }}
                  >
                    {c}
                  </button>
                ))}
              </div>

              {/* Search any city in India via Gemini AI */}
              <form onSubmit={handleCustomCitySubmit} style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', marginTop: '4px', flexWrap: 'wrap' }}>
                <span className="market-gemini-tag" style={{ fontSize: '0.8rem', fontWeight: 700 }}>
                  ✨ Gemini AI City Search:
                </span>
                <input
                  type="text"
                  placeholder="Enter any Indian city (e.g. Varanasi, Hampi, Shillong)..."
                  value={customCitySearch}
                  onChange={(e) => setCustomCitySearch(e.target.value)}
                  className="market-city-input"
                />
                <button
                  type="submit"
                  className="primary-action"
                  disabled={isAiLoading}
                  style={{ padding: '6px 14px', fontSize: '0.8rem', borderRadius: '8px' }}
                >
                  {isAiLoading ? '⏳ Fetching...' : '✨ Find Verified Locals'}
                </button>
              </form>
            </div>

            {/* ENHANCED ANIMATED AI LOADING BANNER & SKELETON FEEDBACK */}
            {isAiLoading && (
              <div className="market-ai-loading-banner">
                <div className="ai-loading-spinner-ring" />
                <div>
                  <h4 style={{ margin: 0, fontSize: '1rem', color: 'var(--primary, #0f766e)', fontWeight: 800 }}>
                    ⚡ Gemini AI Live Discovery Active
                  </h4>
                  <p style={{ margin: '3px 0 0', fontSize: '0.875rem', color: 'var(--text-muted)' }}>
                    Searching and verifying authentic family homestays, licensed guides, and local cooperatives in <strong>{aiLoadedCity || filterCity}</strong>...
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* RESULTS COUNT */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)', fontWeight: 600 }}>
              Showing <strong>{filteredBusinesses.length}</strong> local providers
              {filterCity !== 'all' && <span> in <strong>{filterCity}</strong></span>}
            </span>
          </div>

          {/* CONDITIONAL LOADING SKELETON */}
          {isAiLoading ? (
            <div>
              <div style={{ marginBottom: '1rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                <em>Generating real-time verified local directory...</em>
              </div>
              <div className="market-skeleton-grid">
                {[1, 2, 3, 4, 5, 6].map((idx) => (
                  <div key={idx} className="market-skeleton-card">
                    <div className="skeleton-line skeleton-title" />
                    <div className="skeleton-line skeleton-tag" />
                    <div className="skeleton-line skeleton-desc" />
                    <div className="skeleton-line skeleton-desc short" />
                    <div className="skeleton-footer">
                      <div className="skeleton-pill" />
                      <div className="skeleton-btn" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : viewMode === 'map' ? (
            <div className="glass-panel" style={{ padding: '1.5rem', borderRadius: '18px', marginBottom: '2rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                <div>
                  <h3 style={{ margin: 0, fontSize: '1.25rem', color: 'var(--text-main)' }}>
                    🗺️ Local Providers Map ({filteredBusinesses.length} Pins)
                  </h3>
                  <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                    Showing verified homestays, licensed tour guides, and artisan workshops plotted across {filterCity === 'all' ? 'India' : filterCity}
                  </p>
                </div>
                <button
                  type="button"
                  className="secondary-action"
                  onClick={() => setViewMode('grid')}
                  style={{ padding: '6px 14px', fontSize: '0.825rem' }}
                >
                  Switch to Grid View ➔
                </button>
              </div>
              <SihRouteMap
                waypoints={mapWaypoints}
                cityName={filterCity === 'all' ? 'Jaipur' : filterCity}
                height="460px"
              />
            </div>
          ) : filteredBusinesses.length === 0 ? (
            <div className="glass-panel" style={{ textAlign: 'center', padding: '3rem 1rem', borderRadius: '16px' }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>🏡</div>
              <h3 style={{ margin: 0, color: 'var(--text-main)' }}>No Local Providers Found</h3>
              <p style={{ margin: '0.5rem 0 1.25rem', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                Try searching for another city, clearing your filter, or let Gemini AI discover providers for this location!
              </p>
              <button
                type="button"
                className="primary-action"
                onClick={() => {
                  setActiveCategory('all');
                  setFilterCity('all');
                  setSearchQuery('');
                }}
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(310px, 1fr))', gap: '1.25rem' }}>
              {filteredBusinesses.map((biz) => {
                const icon = CATEGORY_ICONS[biz.category] || '🏡';

                return (
                  <article
                    key={biz.id || `${biz.name}-${biz.city}`}
                    className="market-provider-card"
                  >
                    {/* AUTHENTIC VERIFIED PHOTO BANNER */}
                    <div
                      className="market-card-image-wrap"
                      style={{
                        position: 'relative',
                        height: '180px',
                        borderRadius: '12px',
                        overflow: 'hidden',
                        marginBottom: '0.85rem',
                        background: 'var(--bg-surface-elevated, #1e293b)'
                      }}
                    >
                      <img
                        src={biz.imageUrl || 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800'}
                        alt={biz.name}
                        loading="lazy"
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        onError={(e) => {
                          e.target.src = 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800';
                        }}
                      />
                      <span
                        style={{
                          position: 'absolute',
                          top: '10px',
                          left: '10px',
                          background: 'rgba(15,23,42,0.85)',
                          color: '#ffffff',
                          fontSize: '0.74rem',
                          fontWeight: 700,
                          padding: '3px 9px',
                          borderRadius: '12px',
                          backdropFilter: 'blur(4px)',
                          boxShadow: '0 2px 6px rgba(0,0,0,0.3)'
                        }}
                      >
                        📍 {biz.city}
                      </span>
                      <span
                        style={{
                          position: 'absolute',
                          top: '10px',
                          right: '10px',
                          background: 'linear-gradient(135deg, #0f766e 0%, #10b981 100%)',
                          color: '#ffffff',
                          fontSize: '0.72rem',
                          fontWeight: 700,
                          padding: '3px 8px',
                          borderRadius: '12px',
                          boxShadow: '0 2px 6px rgba(0,0,0,0.25)'
                        }}
                      >
                        0% Commission
                      </span>
                    </div>

                    <div>
                      {/* TOP BADGE & ICON ROW */}
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.85rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <div className="market-avatar-icon">
                            {icon}
                          </div>
                          <div>
                            <span className="market-verified-badge">
                              🛡️ Verified 0% Commission
                            </span>
                            <div className="market-meta-tag">
                              📍 {biz.city} • {biz.category}
                            </div>
                          </div>
                        </div>

                        <span className="market-rating-tag">
                          ⭐ {biz.rating || 5.0}
                        </span>
                      </div>

                      {/* TITLE & DESCRIPTION */}
                      <h3 className="market-provider-name">
                        {biz.name}
                      </h3>

                      <p className="market-provider-desc">
                        {biz.description}
                      </p>

                      {/* PRICING & DIRECT CONTACT HIGHLIGHT */}
                      <div className="market-pricing-box">
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: biz.contactPhone ? '4px' : '0' }}>
                          <span className="market-price-label">Direct Rate:</span>
                          <strong className="market-price-val">{biz.directRate}</strong>
                        </div>
                        {biz.contactPhone && (
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.78rem' }}>
                            <span className="market-price-label">Direct Contact:</span>
                            <span className="market-contact-val">{biz.contactPhone}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* ACTION BUTTONS */}
                    <div style={{ display: 'flex', gap: '0.5rem', paddingTop: '0.5rem', borderTop: '1px solid var(--border-color)' }}>
                      <button
                        type="button"
                        className="primary-action"
                        onClick={() => onEnquire && onEnquire(biz)}
                        style={{ flex: 1, padding: '8px 10px', fontSize: '0.825rem', justifyContent: 'center', borderRadius: '8px' }}
                      >
                        <span>💬 Direct Enquiry</span>
                      </button>
                      {biz.contactPhone && (
                        <a
                          href={`https://wa.me/${biz.contactPhone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`Hello ${biz.name}, I found your listing on Yatra 66 and would like to inquire directly about availability.`)}`}
                          target="_blank"
                          rel="noreferrer"
                          className="secondary-action"
                          style={{
                            padding: '8px 12px',
                            fontSize: '0.825rem',
                            textDecoration: 'none',
                            display: 'flex',
                            alignItems: 'center',
                            borderRadius: '8px',
                            background: '#25D366',
                            color: '#ffffff',
                            fontWeight: 700,
                            border: 'none'
                          }}
                          title="Chat on WhatsApp"
                        >
                          📱 WhatsApp
                        </a>
                      )}
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </>
      )}

      {/* VIEW: REGISTER LOCAL BUSINESS */}
      {activeTab === 'dashboard' && (
        <TourismBusinessDashboard />
      )}

      {activeTab === 'register' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem', maxWidth: '1000px', margin: '0 auto' }}>
          {/* REGISTRATION FORM */}
          <div className="glass-panel" style={{ padding: '2rem', borderRadius: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.25rem' }}>
              <div>
                <h3 style={{ fontSize: '1.35rem', margin: '0 0 0.25rem', color: 'var(--text-main)' }}>
                  Register Your Local Business
                </h3>
                <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                  List with 0% platform commission & connect with verified travelers across India.
                </p>
              </div>

              <button
                type="button"
                className="secondary-action"
                onClick={handleLoadSample}
                style={{ padding: '6px 12px', fontSize: '0.78rem', whiteSpace: 'nowrap' }}
                title="Populate form with sample data"
              >
                ⚡ Auto-Fill Sample
              </button>
            </div>

            {regSuccess ? (
              <div style={{ textAlign: 'center', padding: '3rem 0' }}>
                <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>🎉</div>
                <h4 style={{ color: '#0f766e', margin: '0 0 0.5rem', fontSize: '1.3rem' }}>Listing Published Live!</h4>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                  Your business is now live on Yatra 66 and visible to travelers across India.
                </p>
              </div>
            ) : (
              <form onSubmit={handleRegisterSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <label>
                  <span style={{ fontSize: '0.825rem', fontWeight: 700, display: 'block', marginBottom: '0.3rem', color: 'var(--text-main)' }}>
                    Business / Service Name *
                  </span>
                  <input
                    type="text"
                    className="clean-input"
                    placeholder="e.g. Amber Heritage Homestay & Haveli"
                    value={regForm.name}
                    onChange={(e) => setRegForm({ ...regForm, name: e.target.value })}
                    required
                  />
                </label>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <label>
                    <span style={{ fontSize: '0.825rem', fontWeight: 700, display: 'block', marginBottom: '0.3rem', color: 'var(--text-main)' }}>
                      Category *
                    </span>
                    <select
                      className="clean-input"
                      value={regForm.category}
                      onChange={(e) => setRegForm({ ...regForm, category: e.target.value })}
                    >
                      <option value="Homestay & Havelis">Homestay & Havelis</option>
                      <option value="Heritage Walking Guide">Heritage Walking Guide</option>
                      <option value="Verified Local Transport">Verified Local Transport</option>
                      <option value="Handicraft & Textile Cooperative">Handicraft & Textile Cooperative</option>
                      <option value="Culinary Walking Host">Culinary & Food Experience</option>
                    </select>
                  </label>

                  <label>
                    <span style={{ fontSize: '0.825rem', fontWeight: 700, display: 'block', marginBottom: '0.3rem', color: 'var(--text-main)' }}>
                      Operating City *
                    </span>
                    <input
                      type="text"
                      className="clean-input"
                      placeholder="e.g. Jaipur, Varanasi, Goa"
                      value={regForm.city}
                      onChange={(e) => setRegForm({ ...regForm, city: e.target.value })}
                      required
                    />
                  </label>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <label>
                    <span style={{ fontSize: '0.825rem', fontWeight: 700, display: 'block', marginBottom: '0.3rem', color: 'var(--text-main)' }}>
                      Direct Pricing Rate *
                    </span>
                    <input
                      type="text"
                      className="clean-input"
                      placeholder="e.g. ₹2,400 / night or ₹1,500 / day"
                      value={regForm.directRate}
                      onChange={(e) => setRegForm({ ...regForm, directRate: e.target.value })}
                      required
                    />
                  </label>

                  <label>
                    <span style={{ fontSize: '0.825rem', fontWeight: 700, display: 'block', marginBottom: '0.3rem', color: 'var(--text-main)' }}>
                      WhatsApp Number *
                    </span>
                    <input
                      type="text"
                      className="clean-input"
                      placeholder="+91 98290 12345"
                      value={regForm.contactPhone}
                      onChange={(e) => setRegForm({ ...regForm, contactPhone: e.target.value })}
                      required
                    />
                  </label>
                </div>

                <label>
                  <span style={{ fontSize: '0.825rem', fontWeight: 700, display: 'block', marginBottom: '0.3rem', color: 'var(--text-main)' }}>
                    Contact Email (Optional)
                  </span>
                  <input
                    type="email"
                    className="clean-input"
                    placeholder="host@business.com"
                    value={regForm.contactEmail}
                    onChange={(e) => setRegForm({ ...regForm, contactEmail: e.target.value })}
                  />
                </label>

                <label>
                  <span style={{ fontSize: '0.825rem', fontWeight: 700, display: 'block', marginBottom: '0.3rem', color: 'var(--text-main)' }}>
                    Description & Offerings *
                  </span>
                  <textarea
                    className="clean-input"
                    rows="3"
                    placeholder="Highlight your authentic hospitality, specialty services, local heritage roots, and what travelers will cherish..."
                    value={regForm.description}
                    onChange={(e) => setRegForm({ ...regForm, description: e.target.value })}
                    required
                  />
                </label>

                <div className="market-guarantee-note">
                  ✨ <strong>0% Commission Guarantee:</strong> Travelers contact you directly on WhatsApp or direct email without third-party deductions.
                </div>

                <button type="submit" className="primary-action" style={{ padding: '0.9rem', width: '100%', marginTop: '0.25rem' }}>
                  Publish Business Listing on Yatra 66 ➔
                </button>
              </form>
            )}
          </div>

          {/* LIVE CARD PREVIEW */}
          <div>
            <div style={{ marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--text-muted)' }}>
                👁️ Live Traveler Card Preview
              </span>
              <span className="card-tag market-badge-commission">
                Real-Time Updates
              </span>
            </div>

            <article className="market-provider-card" style={{ border: '2px dashed var(--border-color)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.85rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div className="market-avatar-icon">
                    {CATEGORY_ICONS[regForm.category] || '🏡'}
                  </div>
                  <div>
                    <span className="market-verified-badge">
                      🛡️ Verified 0% Commission
                    </span>
                    <div className="market-meta-tag">
                      📍 {regForm.city || 'Jaipur'} • {regForm.category}
                    </div>
                  </div>
                </div>

                <span className="market-rating-tag">
                  ⭐ 5.0 (New)
                </span>
              </div>

              <h3 className="market-provider-name">
                {regForm.name || 'Your Business Name'}
              </h3>

              <p className="market-provider-desc">
                {regForm.description || 'Your authentic offering description will be displayed here for travelers across India to read.'}
              </p>

              <div className="market-pricing-box">
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2px' }}>
                  <span className="market-price-label">Direct Rate:</span>
                  <strong className="market-price-val">{regForm.directRate || '₹2,400 / night'}</strong>
                </div>
                {regForm.contactPhone && (
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem' }}>
                    <span className="market-price-label">Direct WhatsApp:</span>
                    <span className="market-contact-val">{regForm.contactPhone}</span>
                  </div>
                )}
              </div>

              <button
                type="button"
                className="primary-action"
                disabled
                style={{ width: '100%', padding: '8px', fontSize: '0.825rem', justifyContent: 'center', opacity: 0.8 }}
              >
                <span>💬 Direct Host Enquiry</span>
              </button>
            </article>
          </div>
        </div>
      )}

      {/* VIEW: ENQUIRIES DASHBOARD */}
      {activeTab === 'enquiries' && (
        <div>
          {enquiries.length === 0 ? (
            <div className="glass-panel" style={{ textAlign: 'center', padding: '3rem 1rem', borderRadius: '16px' }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>📭</div>
              <h3 style={{ margin: 0, color: 'var(--text-main)' }}>No Enquiries Yet</h3>
              <p style={{ margin: '0.5rem 0 1rem', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                When travelers send inquiries to local homestays or guides, they will appear here in real-time.
              </p>
              <button type="button" className="secondary-action" onClick={() => setActiveTab('browse')}>
                Browse Marketplace
              </button>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {enquiries.map((enq) => (
                <div
                  key={enq.id}
                  className="glass-panel"
                  style={{ padding: '1.25rem', borderRadius: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}
                >
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                      <span className="card-tag market-badge-commission">
                        {enq.id}
                      </span>
                      <strong style={{ fontSize: '1rem', color: 'var(--text-main)' }}>{enq.businessName}</strong>
                      <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>• {enq.city}</span>
                    </div>
                    <div style={{ fontSize: '0.85rem', color: 'var(--text-main)', marginTop: '2px' }}>
                      Traveler: <strong>{enq.travelerName}</strong> ({enq.contact}) • Date: <strong>{enq.travelDate}</strong> • Group: {enq.groupSize}
                    </div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '4px', fontStyle: 'italic' }}>
                      &ldquo;{enq.notes}&rdquo;
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <span style={{ background: 'rgba(16, 185, 129, 0.15)', color: '#059669', padding: '4px 10px', borderRadius: '20px', fontSize: '0.75rem', fontWeight: 700 }}>
                      {enq.status || 'Dispatched Directly'}
                    </span>
                    <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                      {new Date(enq.timestamp).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
