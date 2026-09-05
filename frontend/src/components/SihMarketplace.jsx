import { useState, useMemo } from 'react';
import { LOCAL_BUSINESSES_DATA, registerLocalBusiness, getCustomLocalBusinesses, getStoredBusinessEnquiries } from '../services/sihData';

const ALL_24_CITIES = [
  'Jaipur', 'Agra', 'Delhi', 'Mumbai', 'Udaipur', 'Varanasi', 'Goa', 'Kochi',
  'Amritsar', 'Manali', 'Rishikesh', 'Bengaluru', 'Hampi', 'Darjeeling', 'Shimla',
  'Leh Ladakh', 'Mysore', 'Srinagar', 'Pondicherry', 'Hyderabad', 'Kolkata',
  'Jodhpur', 'Ooty', 'Shillong'
];

const CATEGORY_DEFAULT_PHOTOS = {
  'Homestay & Havelis': 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800',
  'Heritage Walking Guide': 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800',
  'Verified Local Transport': 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800',
  'Handicraft & Textile Cooperative': 'https://images.unsplash.com/photo-1600100397608-f010f443a9fb?w=800',
  'Culinary Walking Host': 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=800',
};

export default function SihMarketplace({ onEnquire }) {
  const [activeTab, setActiveTab] = useState('browse'); // 'browse' | 'register' | 'enquiries'
  const [activeCategory, setActiveCategory] = useState('all');
  const [filterCity, setFilterCity] = useState('all');

  // Business registration form state (Requirement 19)
  const [regForm, setRegForm] = useState({
    name: '',
    category: 'Homestay & Havelis',
    city: 'Jaipur',
    description: '',
    directRate: '',
    contactPhone: '',
    contactEmail: '',
    heroImage: '',
  });
  const [regSuccess, setRegSuccess] = useState(false);

  // Combine default dataset with user-registered custom businesses
  const allBusinesses = useMemo(() => {
    const custom = getCustomLocalBusinesses();
    return [...custom, ...LOCAL_BUSINESSES_DATA];
  }, [regSuccess]);

  const enquiries = useMemo(() => {
    return getStoredBusinessEnquiries();
  }, [activeTab]);

  const filteredBusinesses = useMemo(() => {
    return allBusinesses.filter((b) => {
      const matchCat = activeCategory === 'all' || b.category === activeCategory;
      const matchCity = filterCity === 'all' || (b.city && b.city.toLowerCase() === filterCity.toLowerCase());
      return matchCat && matchCity;
    });
  }, [allBusinesses, activeCategory, filterCity]);

  const categories = [
    { id: 'all', label: 'All Providers', icon: '✨' },
    { id: 'Homestay & Havelis', label: 'Homestays & Havelis', icon: '🏡' },
    { id: 'Heritage Walking Guide', label: 'Licensed Guides', icon: '🧭' },
    { id: 'Verified Local Transport', label: 'Local Drivers', icon: '🚕' },
    { id: 'Handicraft & Textile Cooperative', label: 'Artisans & Crafts', icon: '🧵' },
    { id: 'Culinary Walking Host', label: 'Food & Culinary', icon: '🍲' },
  ];

  // Dynamic unique cities currently in businesses
  const availableCities = useMemo(() => {
    const set = new Set();
    allBusinesses.forEach((b) => {
      if (b.city) set.add(b.city);
    });
    return Array.from(set);
  }, [allBusinesses]);

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    const finalPhoto = regForm.heroImage?.trim() || CATEGORY_DEFAULT_PHOTOS[regForm.category] || 'https://images.unsplash.com/photo-1599661046289-e31897846e41?w=800';
    registerLocalBusiness({
      ...regForm,
      heroImage: finalPhoto,
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
      heroImage: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800',
    });
  };

  // Preview card image calculation
  const previewImage = regForm.heroImage?.trim() || CATEGORY_DEFAULT_PHOTOS[regForm.category] || 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800';

  return (
    <div className="sih-marketplace-section">
      <div className="section-header-row" style={{ marginBottom: '1.5rem' }}>
        <div>
          <span className="card-tag" style={{ background: 'rgba(15, 118, 110, 0.12)', color: '#0f766e', fontWeight: 800 }}>
            🤝 Direct Local Empowerment: 0% Platform Commission
          </span>
          <h2 style={{ fontSize: '1.85rem', margin: '0.4rem 0 0.25rem', color: 'var(--text-main)' }}>
            Support Local Tourism
          </h2>
          <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '0.95rem', maxWidth: '720px' }}>
            Bridging the digital gap: Connecting travelers directly with family homestays, licensed government guides, and village artisans with <strong>0% predatory commission</strong>.
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
          {/* CATEGORY & CITY FILTERS */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.5rem' }}>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              {categories.map((cat) => (
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

            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', alignItems: 'center' }}>
              <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)' }}>
                Filter City:
              </span>
              <button
                type="button"
                className={`quick-pill-tag ${filterCity === 'all' ? 'active' : ''}`}
                onClick={() => setFilterCity('all')}
                style={{ cursor: 'pointer', padding: '4px 10px', borderRadius: '14px', fontSize: '0.75rem' }}
              >
                All Cities ({allBusinesses.length})
              </button>
              {availableCities.map((city) => (
                <button
                  key={city}
                  type="button"
                  className={`quick-pill-tag ${filterCity === city.toLowerCase() ? 'active' : ''}`}
                  onClick={() => setFilterCity(city.toLowerCase())}
                  style={{ cursor: 'pointer', padding: '4px 10px', borderRadius: '14px', fontSize: '0.75rem' }}
                >
                  {city}
                </button>
              ))}
            </div>
          </div>

          {/* BUSINESS CARDS GRID */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.5rem' }}>
            {filteredBusinesses.map((biz) => (
              <article
                key={biz.id}
                className="glass-panel"
                style={{
                  borderRadius: '16px',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'transform 0.25s ease, box-shadow 0.25s ease',
                }}
              >
                <div style={{ position: 'relative', height: '180px', overflow: 'hidden' }}>
                  <img
                    src={biz.heroImage}
                    alt={biz.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    onError={(e) => {
                      e.target.src = 'https://images.unsplash.com/photo-1599661046289-e31897846e41?w=800';
                    }}
                  />
                  <div style={{ position: 'absolute', top: '12px', left: '12px' }}>
                    <span style={{ background: '#0f766e', color: 'white', fontSize: '0.75rem', fontWeight: 800, padding: '4px 10px', borderRadius: '20px' }}>
                      🛡️ Verified 0% Commission
                    </span>
                  </div>
                  <div style={{ position: 'absolute', bottom: '8px', left: '12px' }}>
                    <span style={{ background: 'rgba(15, 23, 42, 0.85)', color: 'white', fontSize: '0.75rem', fontWeight: 700, padding: '3px 8px', borderRadius: '6px' }}>
                      📍 {biz.city} • {biz.category}
                    </span>
                  </div>
                </div>

                <div style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.35rem' }}>
                    <h3 style={{ margin: 0, fontSize: '1.15rem', color: 'var(--text-main)' }}>
                      {biz.name}
                    </h3>
                    <span style={{ fontSize: '0.825rem', fontWeight: 800, color: '#f59e0b', flexShrink: 0, marginLeft: '6px' }}>
                      ⭐ {biz.rating || 5.0}
                    </span>
                  </div>

                  <p style={{ margin: '0 0 0.85rem', fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.45, flex: 1 }}>
                    {biz.description}
                  </p>

                  <div style={{ background: 'var(--bg-surface-elevated, #f8fafc)', padding: '0.65rem 0.85rem', borderRadius: '10px', fontSize: '0.8rem', marginBottom: '0.85rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2px' }}>
                      <span style={{ color: 'var(--text-muted)' }}>Direct Host Pricing:</span>
                      <strong style={{ color: '#0f766e' }}>{biz.directRate}</strong>
                    </div>
                    {biz.contactPhone && (
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                        <span>Direct WhatsApp:</span>
                        <span>{biz.contactPhone}</span>
                      </div>
                    )}
                  </div>

                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button
                      type="button"
                      className="primary-action"
                      onClick={() => onEnquire && onEnquire(biz)}
                      style={{ flex: 1, padding: '8px', fontSize: '0.825rem', justifyContent: 'center' }}
                    >
                      <span>💬 Direct Host Enquiry</span>
                    </button>
                    {biz.contactPhone && (
                      <a
                        href={`https://wa.me/${biz.contactPhone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`Hello ${biz.name}, I found your listing on Yatra 66 and would like to inquire about availability.`)}`}
                        target="_blank"
                        rel="noreferrer"
                        className="secondary-action"
                        style={{ padding: '8px 12px', fontSize: '0.825rem', textDecoration: 'none', display: 'flex', alignItems: 'center' }}
                        title="Chat on WhatsApp"
                      >
                        📱
                      </a>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </>
      )}

      {/* VIEW: REGISTER LOCAL BUSINESS (Requirement 19: Elevated Local Add Feature) */}
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
                  List with 0% platform commission & reach verified travelers.
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

                  {/* 24-CITY SELECTOR DROPDOWN */}
                  <label>
                    <span style={{ fontSize: '0.825rem', fontWeight: 700, display: 'block', marginBottom: '0.3rem' }}>
                      Operating City *
                    </span>
                    <select
                      className="clean-input"
                      value={regForm.city}
                      onChange={(e) => setRegForm({ ...regForm, city: e.target.value })}
                    >
                      {ALL_24_CITIES.map((c) => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
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
                    Contact Email
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
                    Custom Cover Photo URL (Optional)
                  </span>
                  <input
                    type="url"
                    className="clean-input"
                    placeholder="https://images.unsplash.com/... (or leave blank for category default)"
                    value={regForm.heroImage}
                    onChange={(e) => setRegForm({ ...regForm, heroImage: e.target.value })}
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

          {/* LIVE CARD PREVIEW (Requirement 19) */}
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
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                border: '2px dashed var(--border-color, #cbd5e1)',
                boxShadow: '0 8px 24px rgba(0,0,0,0.06)',
              }}
            >
              <div style={{ position: 'relative', height: '200px', overflow: 'hidden' }}>
                <img
                  src={previewImage}
                  alt={regForm.name || 'Preview'}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  onError={(e) => {
                    e.target.src = 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800';
                  }}
                />
                <div style={{ position: 'absolute', top: '12px', left: '12px' }}>
                  <span style={{ background: '#0f766e', color: 'white', fontSize: '0.75rem', fontWeight: 800, padding: '4px 10px', borderRadius: '20px' }}>
                    🛡️ Verified 0% Commission
                  </span>
                </div>
                <div style={{ position: 'absolute', bottom: '8px', left: '12px' }}>
                  <span style={{ background: 'rgba(15, 23, 42, 0.85)', color: 'white', fontSize: '0.75rem', fontWeight: 700, padding: '3px 8px', borderRadius: '6px' }}>
                    📍 {regForm.city || 'Jaipur'} • {regForm.category}
                  </span>
                </div>
              </div>

              <div style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.35rem' }}>
                  <h3 style={{ margin: 0, fontSize: '1.15rem', color: 'var(--text-main)' }}>
                    {regForm.name || 'Your Business Name'}
                  </h3>
                  <span style={{ fontSize: '0.825rem', fontWeight: 800, color: '#f59e0b', flexShrink: 0, marginLeft: '6px' }}>
                    ⭐ 5.0 (New)
                  </span>
                </div>

                <p style={{ margin: '0 0 0.85rem', fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.45 }}>
                  {regForm.description || 'Your authentic offering description will be displayed here for travelers across India to read.'}
                </p>

                <div style={{ background: 'var(--bg-surface-elevated, #f8fafc)', padding: '0.65rem 0.85rem', borderRadius: '10px', fontSize: '0.8rem', marginBottom: '0.85rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2px' }}>
                    <span style={{ color: 'var(--text-muted)' }}>Direct Host Pricing:</span>
                    <strong style={{ color: '#0f766e' }}>{regForm.directRate || '₹2,400 / night'}</strong>
                  </div>
                  {regForm.contactPhone && (
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                      <span>Direct WhatsApp:</span>
                      <span>{regForm.contactPhone}</span>
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
              </div>
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
