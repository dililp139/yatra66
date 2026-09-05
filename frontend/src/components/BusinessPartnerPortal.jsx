import { useState, useEffect } from 'react';
import TourismBusinessDashboard from './TourismBusinessDashboard';
import { getStoredBusinessEnquiries, registerLocalBusiness } from '../services/sihData';

const DEMO_MERCHANTS = [
  {
    id: 'bundi-haveli',
    name: 'Bundi Heritage Haveli & Stepwell Walks',
    email: 'contact@bundihaveli.in',
    city: 'Bundi',
    state: 'Rajasthan',
    category: 'Homestay & Storytellers',
    views: '14.8K',
    inquiries: 156,
  },
  {
    id: 'bagru-textiles',
    name: 'Chippa Artisan Indigo & Block Print Guild',
    email: 'info@chippaprints.org',
    city: 'Jaipur',
    state: 'Rajasthan',
    category: 'Handicrafts & Artisans',
    views: '18.2K',
    inquiries: 184,
  },
  {
    id: 'kashi-boatmen',
    name: 'Kashi Traditional Dawn Boatmen Cooperative',
    email: 'ghats@kashiboats.in',
    city: 'Varanasi',
    state: 'Uttar Pradesh',
    category: 'River Guides & Heritage Walks',
    views: '22.4K',
    inquiries: 242,
  },
];

export default function BusinessPartnerPortal({ setPage }) {
  const [partnerSession, setPartnerSession] = useState(() => {
    try {
      const s = localStorage.getItem('yatra_business_session');
      return s ? JSON.parse(s) : null;
    } catch {
      return null;
    }
  });

  const [authMode, setAuthMode] = useState('login'); // 'login' | 'register'
  const [portalTab, setPortalTab] = useState('dashboard'); // 'dashboard' | 'inquiries'
  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [authError, setAuthError] = useState('');
  const [enquiries, setEnquiries] = useState([]);

  // New Business Registration Form
  const [newBiz, setNewBiz] = useState({
    businessName: '',
    ownerName: '',
    city: 'Jaipur',
    state: 'Rajasthan',
    category: 'Homestay & Heritage Stay',
    phone: '',
    email: '',
    description: '',
  });
  const [registerSuccess, setRegisterSuccess] = useState(false);

  useEffect(() => {
    if (partnerSession) {
      setEnquiries(getStoredBusinessEnquiries());
    }
  }, [partnerSession]);

  const handlePartnerLogin = (e) => {
    e.preventDefault();
    if (!emailInput.trim()) {
      setAuthError('Please enter your business email.');
      return;
    }

    const matched = DEMO_MERCHANTS.find(
      (m) => m.email.toLowerCase() === emailInput.trim().toLowerCase()
    );

    const sessionData = matched || {
      id: 'custom-partner-' + Date.now(),
      name: emailInput.split('@')[0].replace(/[._]/g, ' ').toUpperCase() + ' Hospitality',
      email: emailInput.trim(),
      city: 'Jaipur',
      state: 'Rajasthan',
      category: 'Verified Tourism Partner',
      views: '1.2K',
      inquiries: 12,
    };

    localStorage.setItem('yatra_business_session', JSON.stringify(sessionData));
    setPartnerSession(sessionData);
    setAuthError('');
  };

  const handleQuickLogin = (merchant) => {
    localStorage.setItem('yatra_business_session', JSON.stringify(merchant));
    setPartnerSession(merchant);
    setAuthError('');
  };

  const handlePartnerLogout = () => {
    localStorage.removeItem('yatra_business_session');
    setPartnerSession(null);
    setEmailInput('');
    setPasswordInput('');
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    if (!newBiz.businessName.trim() || !newBiz.phone.trim()) return;

    registerLocalBusiness({
      name: newBiz.businessName,
      owner: newBiz.ownerName || 'Verified Host',
      city: newBiz.city,
      state: newBiz.state,
      category: newBiz.category,
      phone: newBiz.phone,
      email: newBiz.email,
      description: newBiz.description,
    });

    const sessionData = {
      id: 'merchant-' + Date.now(),
      name: newBiz.businessName,
      email: newBiz.email || 'partner@yatra66.in',
      city: newBiz.city,
      state: newBiz.state,
      category: newBiz.category,
      views: '100',
      inquiries: 0,
    };

    localStorage.setItem('yatra_business_session', JSON.stringify(sessionData));
    setPartnerSession(sessionData);
    setRegisterSuccess(true);
  };

  // -------------------------------------------------------------
  // VIEW 1: AUTHENTICATED PARTNER DASHBOARD
  // -------------------------------------------------------------
  if (partnerSession) {
    return (
      <section className="page business-portal-page" style={{ maxWidth: '1200px', margin: '0 auto', padding: '1rem' }}>
        {/* MERCHANT HEADER BAR */}
        <div
          className="glass-panel"
          style={{
            padding: '1.25rem 1.75rem',
            borderRadius: '16px',
            marginBottom: '1.5rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '1rem',
            border: '1px solid var(--border-color)',
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
              <span style={{ fontSize: '0.75rem', background: '#0f766e', color: 'white', padding: '3px 10px', borderRadius: '12px', fontWeight: 800 }}>
                ✓ Verified Business Partner
              </span>
              <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                📍 {partnerSession.city}, {partnerSession.state}
              </span>
            </div>
            <h2 style={{ margin: 0, fontSize: '1.5rem', color: 'var(--text-main)', fontWeight: 800 }}>
              {partnerSession.name}
            </h2>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              {partnerSession.category} • {partnerSession.email}
            </span>
          </div>

          <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', flexWrap: 'wrap' }}>
            <button
              type="button"
              className={`secondary-action ${portalTab === 'dashboard' ? 'active' : ''}`}
              onClick={() => setPortalTab('dashboard')}
              style={{ padding: '8px 16px', fontSize: '0.85rem' }}
            >
              📈 Analytics & Performance
            </button>
            <button
              type="button"
              className={`secondary-action ${portalTab === 'inquiries' ? 'active' : ''}`}
              onClick={() => setPortalTab('inquiries')}
              style={{ padding: '8px 16px', fontSize: '0.85rem' }}
            >
              📩 Direct Inquiries ({enquiries.length})
            </button>
            <button
              type="button"
              className="cancel-btn"
              onClick={handlePartnerLogout}
              style={{ padding: '8px 16px', fontSize: '0.85rem' }}
            >
              Sign Out
            </button>
            <button
              type="button"
              className="primary-action"
              onClick={() => setPage && setPage('home')}
              style={{ padding: '8px 16px', fontSize: '0.85rem' }}
            >
              Traveler Site ➔
            </button>
          </div>
        </div>

        {/* TAB 1: BUSINESS ANALYTICS DASHBOARD */}
        {portalTab === 'dashboard' && (
          <div>
            <div style={{ marginBottom: '1.25rem' }}>
              <h3 style={{ margin: '0 0 0.25rem', fontSize: '1.25rem', color: 'var(--text-main)' }}>
                Real-Time Performance & Demand Intelligence
              </h3>
              <p style={{ margin: 0, fontSize: '0.875rem', color: 'var(--text-muted)' }}>
                Private analytics visible only to your business account. Track tourist origin cities, seasonal demand, and 0% OTA commission savings.
              </p>
            </div>
            <TourismBusinessDashboard />
          </div>
        )}

        {/* TAB 2: INCOMING TRAVELER INQUIRIES */}
        {portalTab === 'inquiries' && (
          <div className="glass-panel" style={{ padding: '2rem', borderRadius: '16px' }}>
            <div style={{ marginBottom: '1.5rem' }}>
              <h3 style={{ margin: '0 0 0.25rem', fontSize: '1.25rem', color: 'var(--text-main)' }}>
                Incoming Traveler Direct Inquiries ({enquiries.length})
              </h3>
              <p style={{ margin: 0, fontSize: '0.875rem', color: 'var(--text-muted)' }}>
                Direct booking inquiries and questions submitted by verified travelers. No middleman fees apply.
              </p>
            </div>

            {enquiries.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '3rem 1rem', color: 'var(--text-muted)' }}>
                <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>📭</div>
                <h4>No inquiries yet</h4>
                <p style={{ fontSize: '0.85rem', maxWidth: '400px', margin: '0 auto' }}>
                  When tourists contact your business through Yatra 66, their dates, travelers count, and WhatsApp messages will appear here.
                </p>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {enquiries.map((enq) => (
                  <div
                    key={enq.id}
                    style={{
                      padding: '1.25rem',
                      borderRadius: '12px',
                      background: 'var(--bg-surface-elevated, #f8fafc)',
                      border: '1px solid var(--border-color, #e2e8f0)',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'flex-start',
                      flexWrap: 'wrap',
                      gap: '1rem',
                    }}
                  >
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                        <strong style={{ fontSize: '1rem', color: 'var(--text-main)' }}>{enq.name}</strong>
                        <span style={{ fontSize: '0.75rem', background: 'rgba(15, 118, 110, 0.12)', color: '#0f766e', padding: '2px 8px', borderRadius: '10px', fontWeight: 700 }}>
                          For: {enq.businessName}
                        </span>
                      </div>
                      <p style={{ margin: '0.25rem 0', fontSize: '0.85rem', color: 'var(--text-main)' }}>
                        "{enq.message}"
                      </p>
                      <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', display: 'flex', gap: '12px', flexWrap: 'wrap', marginTop: '6px' }}>
                        <span>📅 Travel: {enq.travelDates || 'Flexible'}</span>
                        <span>👥 Guests: {enq.travellerCount || 2}</span>
                        <span>📱 {enq.phone}</span>
                        <span>✉️ {enq.email}</span>
                      </div>
                    </div>

                    <a
                      href={`https://wa.me/${enq.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`Hello ${enq.name}, thank you for your inquiry about ${enq.businessName} on Yatra 66.`)}`}
                      target="_blank"
                      rel="noreferrer"
                      className="primary-action"
                      style={{ padding: '6px 14px', fontSize: '0.825rem', borderRadius: '8px', textDecoration: 'none' }}
                    >
                      💬 Reply on WhatsApp
                    </a>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </section>
    );
  }

  // -------------------------------------------------------------
  // VIEW 2: UNREGISTERED / LOGGED OUT PARTNER LOGIN SCREEN
  // -------------------------------------------------------------
  return (
    <section className="page business-portal-page" style={{ maxWidth: '900px', margin: '0 auto', padding: '2rem 1rem' }}>
      <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
        <span className="card-tag" style={{ background: 'rgba(15, 118, 110, 0.12)', color: '#0f766e', fontWeight: 800 }}>
          🏢 Tourism Partner Portal
        </span>
        <h1 style={{ margin: '0.5rem 0 0.4rem', fontSize: '2.2rem', fontWeight: 800, color: 'var(--text-main)' }}>
          Business Holder Login & Analytics
        </h1>
        <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '0.95rem', maxWidth: '560px', margin: '0 auto' }}>
          This portal is reserved exclusively for registered homestay owners, tour guides, dhabas, and artisan cooperatives. Ordinary travelers cannot view this data.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
        {/* LEFT PANEL: AUTH FORM */}
        <div className="glass-panel" style={{ padding: '2rem', borderRadius: '20px', border: '1px solid var(--border-color)' }}>
          {/* TAB TOGGLE: LOGIN / REGISTER */}
          <div style={{ display: 'flex', borderBottom: '1px solid var(--border-color)', marginBottom: '1.5rem', gap: '1rem' }}>
            <button
              type="button"
              onClick={() => { setAuthMode('login'); setAuthError(''); }}
              style={{
                padding: '8px 12px',
                background: 'transparent',
                border: 'none',
                borderBottom: authMode === 'login' ? '3px solid #0f766e' : '3px solid transparent',
                color: authMode === 'login' ? '#0f766e' : 'var(--text-muted)',
                fontWeight: 700,
                fontSize: '0.95rem',
                cursor: 'pointer',
              }}
            >
              Sign In to Business Account
            </button>
            <button
              type="button"
              onClick={() => { setAuthMode('register'); setAuthError(''); }}
              style={{
                padding: '8px 12px',
                background: 'transparent',
                border: 'none',
                borderBottom: authMode === 'register' ? '3px solid #0f766e' : '3px solid transparent',
                color: authMode === 'register' ? '#0f766e' : 'var(--text-muted)',
                fontWeight: 700,
                fontSize: '0.95rem',
                cursor: 'pointer',
              }}
            >
              Register New Business
            </button>
          </div>

          {authError && (
            <div style={{ background: 'rgba(239, 68, 68, 0.12)', border: '1px solid rgba(239, 68, 68, 0.3)', color: '#ef4444', padding: '0.65rem 1rem', borderRadius: '8px', fontSize: '0.85rem', marginBottom: '1rem' }}>
              ⚠️ {authError}
            </div>
          )}

          {authMode === 'login' ? (
            <form onSubmit={handlePartnerLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <label>
                <span style={{ fontSize: '0.825rem', fontWeight: 700, color: 'var(--text-main)', display: 'block', marginBottom: '4px' }}>
                  Registered Business Email
                </span>
                <input
                  type="email"
                  required
                  className="clean-input"
                  placeholder="e.g. contact@bundihaveli.in"
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                />
              </label>

              <label>
                <span style={{ fontSize: '0.825rem', fontWeight: 700, color: 'var(--text-main)', display: 'block', marginBottom: '4px' }}>
                  Password / Access PIN
                </span>
                <input
                  type="password"
                  required
                  className="clean-input"
                  placeholder="Enter business access code"
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                />
              </label>

              <button
                type="submit"
                className="primary-action"
                style={{ padding: '0.75rem', justifyContent: 'center', fontSize: '0.95rem', marginTop: '0.5rem' }}
              >
                Access Business Analytics ➔
              </button>

              <div style={{ textAlign: 'center', marginTop: '0.5rem' }}>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                  Not a business?{' '}
                  <a
                    href="#/"
                    onClick={(e) => { e.preventDefault(); setPage && setPage('home'); }}
                    style={{ color: '#0f766e', fontWeight: 700, textDecoration: 'none' }}
                  >
                    Return to Traveler Home
                  </a>
                </span>
              </div>
            </form>
          ) : (
            <form onSubmit={handleRegisterSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              <label>
                <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-main)', display: 'block', marginBottom: '2px' }}>
                  Business / Property Name
                </span>
                <input
                  type="text"
                  required
                  className="clean-input"
                  placeholder="e.g. Shekhawati Heritage Homestay"
                  value={newBiz.businessName}
                  onChange={(e) => setNewBiz({ ...newBiz, businessName: e.target.value })}
                />
              </label>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                <label>
                  <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-main)', display: 'block', marginBottom: '2px' }}>
                    City
                  </span>
                  <input
                    type="text"
                    required
                    className="clean-input"
                    value={newBiz.city}
                    onChange={(e) => setNewBiz({ ...newBiz, city: e.target.value })}
                  />
                </label>
                <label>
                  <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-main)', display: 'block', marginBottom: '2px' }}>
                    Category
                  </span>
                  <select
                    className="clean-input"
                    value={newBiz.category}
                    onChange={(e) => setNewBiz({ ...newBiz, category: e.target.value })}
                  >
                    <option value="Homestay & Heritage Stay">Homestay / Haveli</option>
                    <option value="Licensed Tour Guide">Licensed Tour Guide</option>
                    <option value="Artisan Cooperative">Artisan & Craft Guild</option>
                    <option value="Traditional Dhaba / Eatery">Local Dhaba / Food</option>
                  </select>
                </label>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                <label>
                  <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-main)', display: 'block', marginBottom: '2px' }}>
                    Phone (WhatsApp)
                  </span>
                  <input
                    type="tel"
                    required
                    className="clean-input"
                    placeholder="+91 98765 43210"
                    value={newBiz.phone}
                    onChange={(e) => setNewBiz({ ...newBiz, phone: e.target.value })}
                  />
                </label>
                <label>
                  <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-main)', display: 'block', marginBottom: '2px' }}>
                    Business Email
                  </span>
                  <input
                    type="email"
                    required
                    className="clean-input"
                    placeholder="contact@business.in"
                    value={newBiz.email}
                    onChange={(e) => setNewBiz({ ...newBiz, email: e.target.value })}
                  />
                </label>
              </div>

              <button
                type="submit"
                className="primary-action"
                style={{ padding: '0.75rem', justifyContent: 'center', fontSize: '0.95rem', marginTop: '0.5rem' }}
              >
                Create Free Partner Account ➔
              </button>
            </form>
          )}
        </div>

        {/* RIGHT PANEL: 1-CLICK DEMO TEST MERCHANTS & BENEFITS */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div className="glass-panel" style={{ padding: '1.5rem', borderRadius: '20px', border: '1px solid var(--border-color)' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#0f766e', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              ⚡ Fast Testing Credentials
            </span>
            <h3 style={{ margin: '0.25rem 0 0.5rem', fontSize: '1.15rem', color: 'var(--text-main)' }}>
              1-Click Verified Partner Login
            </h3>
            <p style={{ margin: '0 0 1rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              Click any verified partner profile below to inspect their private analytics dashboard:
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {DEMO_MERCHANTS.map((m) => (
                <div
                  key={m.id}
                  onClick={() => handleQuickLogin(m)}
                  style={{
                    padding: '12px 14px',
                    borderRadius: '12px',
                    background: 'var(--bg-surface-elevated, #f8fafc)',
                    border: '1px solid var(--border-color, #e2e8f0)',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#0f766e'; e.currentTarget.style.transform = 'translateY(-1px)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--border-color, #e2e8f0)'; e.currentTarget.style.transform = 'none'; }}
                >
                  <div>
                    <strong style={{ fontSize: '0.925rem', color: 'var(--text-main)', display: 'block' }}>
                      {m.name}
                    </strong>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                      📍 {m.city}, {m.state} • {m.category}
                    </span>
                  </div>
                  <span style={{ fontSize: '0.78rem', color: '#0f766e', fontWeight: 700, padding: '4px 10px', borderRadius: '12px', background: 'rgba(15, 118, 110, 0.1)' }}>
                    Login ➔
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="glass-panel" style={{ padding: '1.25rem 1.5rem', borderRadius: '18px', border: '1px solid var(--border-color)' }}>
            <h4 style={{ margin: '0 0 0.4rem', fontSize: '0.95rem', color: 'var(--text-main)' }}>
              🛡️ Business Partner Privacy Policy
            </h4>
            <ul style={{ margin: 0, paddingLeft: '1.2rem', fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: '1.5' }}>
              <li>Analytics, customer origins, and inquiries are visible only to verified business holders.</li>
              <li>0% listing fee and 0% booking commission guaranteed.</li>
              <li>Direct customer connection through verified phone and WhatsApp.</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
