import { useState, useMemo, useEffect } from 'react';
import { LOCAL_BUSINESSES_DATA, registerLocalBusiness, getCustomLocalBusinesses, getStoredBusinessEnquiries } from '../services/sihData';
import yatraApi from '../services/yatraService';

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
  const [activeTab, setActiveTab] = useState('browse'); // 'browse' | 'register' | 'enquiries'
  const [activeCategory, setActiveCategory] = useState('all');
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
    // Avoid duplicate IDs
    const seen = new Set();
    const list = [];

    // Prioritize AI businesses for the selected city if available
    [...aiBusinesses, ...custom, ...LOCAL_BUSINESSES_DATA].forEach((biz) => {
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

  // Fetch AI locals when user chooses a specific city
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

  // Filtered businesses based on category, city, and search query
  const filteredBusinesses = useMemo(() => {
    return allBusinesses.filter((b) => {
      const matchCat = activeCategory === 'all' || b.category === activeCategory;
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

  // Dynamic unique cities currently available
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
          <span className="card-tag" style={{ background: 'rgba(15, 118, 110, 0.12)', color: '#0f766e', fontWeight: 800 }}>
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
            className={`secondary-action ${activeTab === 'browse' ? 'active' : ''}`}
            onClick={() => setActiveTab('browse')}
            style={{ padding: '8px 16px', fontSize: '0.85rem' }}
          >
            🔍 Browse Marketplace
          </button>
          <button
            type="button"
            className={`primary-action ${activeTab === 'register' ? 'active' : ''}`}
            onClick={() => setActiveTab('register')}
            style={{ padding: '8px 16px', fontSize: '0.85rem' }}
          >
            🏪 List Local Business (Free)
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
          {/* SEARCH BAR & CITY CONTROLS */}
          <div style={{ background: 'var(--bg-surface-elevated, #f8fafc)', border: '1px solid var(--border-color, #e2e8f0)', borderRadius: '16px', padding: '1.25rem', marginBottom: '1.75rem' }}>
            
            {/* Direct Keyword Search Bar */}
            <div style={{ position: 'relative', marginBottom: '1rem' }}>
              <input
                type="text"
                placeholder="🔍 Search by business name, specialty, guide language, driver, or city..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px 40px 10px 16px',
                  borderRadius: '30px',
                  border: '1.5px solid var(--border-color, #cbd5e1)',
                  background: 'var(--bg-surface, #ffffff)',
                  color: 'var(--text-main)',
                  fontSize: '0.95rem',
                  outline: 'none',
                }}
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
                  style={{
                    cursor: 'pointer',
                    padding: '6px 14px',
                    borderRadius: '20px',
                    background: activeCategory === cat.id ? 'var(--primary, #0f766e)' : 'var(--bg-surface, #ffffff)',
                    color: activeCategory === cat.id ? '#ffffff' : 'var(--text-main)',
                    border: '1px solid var(--border-color, #cbd5e1)',
                    fontWeight: activeCategory === cat.id ? 700 : 500,
                    fontSize: '0.825rem'
                  }}
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
                  style={{
                    cursor: 'pointer',
                    padding: '4px 10px',
                    borderRadius: '14px',
                    fontSize: '0.75rem',
                    background: filterCity === 'all' ? 'var(--primary, #0f766e)' : 'var(--bg-surface, #ffffff)',
                    color: filterCity === 'all' ? '#ffffff' : 'var(--text-main)',
                    border: '1px solid var(--border-color, #cbd5e1)'
                  }}
                >
                  All Cities ({allBusinesses.length})
                </button>
                {availableCities.slice(0, 10).map((c) => (
                  <button
                    key={c}
                    type="button"
                    className={`quick-pill-tag ${filterCity.toLowerCase() === c.toLowerCase() ? 'active' : ''}`}
                    onClick={() => handleCitySelect(c)}
                    style={{
                      cursor: 'pointer',
                      padding: '4px 10px',
                      borderRadius: '14px',
                      fontSize: '0.75rem',
                      background: filterCity.toLowerCase() === c.toLowerCase() ? 'var(--primary, #0f766e)' : 'var(--bg-surface, #ffffff)',
                      color: filterCity.toLowerCase() === c.toLowerCase() ? '#ffffff' : 'var(--text-main)',
                      border: '1px solid var(--border-color, #cbd5e1)'
                    }}
                  >
                    {c}
                  </button>
                ))}
              </div>

              {/* Search any city in India via Gemini AI */}
              <form onSubmit={handleCustomCitySubmit} style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', marginTop: '4px', flexWrap: 'wrap' }}>
                <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#0f766e' }}>
                  ✨ Gemini AI City Search:
                </span>
                <input
                  type="text"
                  placeholder="Enter any Indian city (e.g. Varanasi, Hampi, Shillong)..."
                  value={customCitySearch}
                  onChange={(e) => setCustomCitySearch(e.target.value)}
                  style={{
                    padding: '6px 12px',
                    borderRadius: '8px',
                    border: '1px solid var(--border-color, #cbd5e1)',
                    background: 'var(--bg-surface, #ffffff)',
                    color: 'var(--text-main)',
                    fontSize: '0.8rem',
                    minWidth: '220px'
                  }}
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

            {/* AI LOADING STATUS BANNER */}
            {isAiLoading && (
              <div style={{
                marginTop: '0.85rem',
                padding: '8px 14px',
                borderRadius: '8px',
                background: 'rgba(15, 118, 110, 0.08)',
                border: '1px solid rgba(15, 118, 110, 0.25)',
                color: '#0f766e',
                fontSize: '0.85rem',
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                <span style={{ animation: 'spin 1s linear infinite' }}>✨</span>
                Gemini AI is discovering authentic homestays, licensed guides, and artisans for <strong>{aiLoadedCity}</strong>...
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

          {/* LIGHTWEIGHT IMAGE-FREE BUSINESS CARDS GRID */}
          {filteredBusinesses.length === 0 ? (
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
                const isGemini = biz.verified || biz.isCustom;

                return (
                  <article
                    key={biz.id || `${biz.name}-${biz.city}`}
                    className="glass-panel"
                    style={{
                      borderRadius: '16px',
                      padding: '1.35rem',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      border: '1px solid var(--border-color, #e2e8f0)',
                      background: 'var(--bg-surface, #ffffff)',
                      boxShadow: '0 4px 16px rgba(0,0,0,0.04)',
                      transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                    }}
                  >
                    <div>
                      {/* TOP BADGE & ICON ROW */}
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.85rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <div style={{
                            width: '44px',
                            height: '44px',
                            borderRadius: '12px',
                            background: 'rgba(15, 118, 110, 0.1)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '1.5rem',
                            flexShrink: 0
                          }}>
                            {icon}
                          </div>
                          <div>
                            <span style={{
                              display: 'inline-block',
                              background: '#0f766e',
                              color: '#ffffff',
                              fontSize: '0.7rem',
                              fontWeight: 800,
                              padding: '2px 8px',
                              borderRadius: '20px'
                            }}>
                              🛡️ Verified 0% Commission
                            </span>
                            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '2px', fontWeight: 600 }}>
                              📍 {biz.city} • {biz.category}
                            </div>
                          </div>
                        </div>

                        <span style={{
                          fontSize: '0.85rem',
                          fontWeight: 800,
                          color: '#f59e0b',
                          background: 'rgba(245, 158, 11, 0.12)',
                          padding: '3px 8px',
                          borderRadius: '8px',
                          whiteSpace: 'nowrap'
                        }}>
                          ⭐ {biz.rating || 5.0}
                        </span>
                      </div>

                      {/* TITLE & DESCRIPTION */}
                      <h3 style={{ margin: '0 0 0.4rem', fontSize: '1.15rem', color: 'var(--text-main)', fontWeight: 700, lineHeight: 1.3 }}>
                        {biz.name}
                      </h3>

                      <p style={{ margin: '0 0 1rem', fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                        {biz.description}
                      </p>

                      {/* PRICING & DIRECT CONTACT HIGHLIGHT */}
                      <div style={{
                        background: 'var(--bg-surface-elevated, #f8fafc)',
                        padding: '0.75rem 0.9rem',
                        borderRadius: '10px',
                        fontSize: '0.825rem',
                        marginBottom: '1rem',
                        border: '1px solid var(--border-color, #e2e8f0)'
                      }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: biz.contactPhone ? '4px' : '0' }}>
                          <span style={{ color: 'var(--text-muted)', fontWeight: 500 }}>Direct Rate:</span>
                          <strong style={{ color: '#0f766e', fontSize: '0.95rem' }}>{biz.directRate}</strong>
                        </div>
                        {biz.contactPhone && (
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                            <span>Direct Contact:</span>
                            <span style={{ fontWeight: 600, color: 'var(--text-main)' }}>{biz.contactPhone}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* ACTION BUTTONS */}
                    <div style={{ display: 'flex', gap: '0.5rem', paddingTop: '0.5rem', borderTop: '1px solid var(--border-color, #e2e8f0)' }}>
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
                  <span style={{ fontSize: '0.825rem', fontWeight: 700, display: 'block', marginBottom: '0.3rem' }}>
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
                    <span style={{ fontSize: '0.825rem', fontWeight: 700, display: 'block', marginBottom: '0.3rem' }}>
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
                    <span style={{ fontSize: '0.825rem', fontWeight: 700, display: 'block', marginBottom: '0.3rem' }}>
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
                    <span style={{ fontSize: '0.825rem', fontWeight: 700, display: 'block', marginBottom: '0.3rem' }}>
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
                    <span style={{ fontSize: '0.825rem', fontWeight: 700, display: 'block', marginBottom: '0.3rem' }}>
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
                  <span style={{ fontSize: '0.825rem', fontWeight: 700, display: 'block', marginBottom: '0.3rem' }}>
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
                  <span style={{ fontSize: '0.825rem', fontWeight: 700, display: 'block', marginBottom: '0.3rem' }}>
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

                <div style={{ background: 'rgba(15, 118, 110, 0.08)', padding: '0.85rem 1rem', borderRadius: '10px', fontSize: '0.8rem', color: '#0f766e' }}>
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
              <span style={{ fontSize: '0.75rem', background: 'rgba(15, 118, 110, 0.12)', color: '#0f766e', padding: '2px 8px', borderRadius: '8px', fontWeight: 700 }}>
                Real-Time Updates
              </span>
            </div>

            <article
              className="glass-panel"
              style={{
                borderRadius: '16px',
                padding: '1.5rem',
                display: 'flex',
                flexDirection: 'column',
                border: '2px dashed var(--border-color, #cbd5e1)',
                background: 'var(--bg-surface, #ffffff)',
                boxShadow: '0 8px 24px rgba(0,0,0,0.06)',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.85rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '12px',
                    background: 'rgba(15, 118, 110, 0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.5rem',
                    flexShrink: 0
                  }}>
                    {CATEGORY_ICONS[regForm.category] || '🏡'}
                  </div>
                  <div>
                    <span style={{ background: '#0f766e', color: 'white', fontSize: '0.7rem', fontWeight: 800, padding: '2px 8px', borderRadius: '20px' }}>
                      🛡️ Verified 0% Commission
                    </span>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '2px', fontWeight: 600 }}>
                      📍 {regForm.city || 'Jaipur'} • {regForm.category}
                    </div>
                  </div>
                </div>

                <span style={{ fontSize: '0.825rem', fontWeight: 800, color: '#f59e0b', background: 'rgba(245, 158, 11, 0.12)', padding: '3px 8px', borderRadius: '8px' }}>
                  ⭐ 5.0 (New)
                </span>
              </div>

              <h3 style={{ margin: '0 0 0.4rem', fontSize: '1.15rem', color: 'var(--text-main)', fontWeight: 700 }}>
                {regForm.name || 'Your Business Name'}
              </h3>

              <p style={{ margin: '0 0 1rem', fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                {regForm.description || 'Your authentic offering description will be displayed here for travelers across India to read.'}
              </p>

              <div style={{
                background: 'var(--bg-surface-elevated, #f8fafc)',
                padding: '0.75rem 0.9rem',
                borderRadius: '10px',
                fontSize: '0.825rem',
                marginBottom: '1rem',
                border: '1px solid var(--border-color, #e2e8f0)'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2px' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Direct Rate:</span>
                  <strong style={{ color: '#0f766e' }}>{regForm.directRate || '₹2,400 / night'}</strong>
                </div>
                {regForm.contactPhone && (
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                    <span>Direct WhatsApp:</span>
                    <span style={{ fontWeight: 600, color: 'var(--text-main)' }}>{regForm.contactPhone}</span>
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
                      <span className="card-tag" style={{ background: 'rgba(15, 118, 110, 0.12)', color: '#0f766e', fontWeight: 800 }}>
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
