import { useState, useMemo } from 'react';

export const LOCAL_RENTAL_OPERATORS = [
  {
    id: 'rent-jpr-1',
    agencyName: 'Jaipur Royal Heritage Cabs & Rentals',
    city: 'Jaipur',
    state: 'Rajasthan',
    address: 'Near Station Road & Sindhi Camp Central Hub, Jaipur',
    phone: '+91 98290 14520',
    whatsapp: '919829014520',
    ownerName: 'Vikram Singh Shekhawat',
    rating: 4.9,
    reviewsCount: 380,
    establishedYear: 2012,
    serviceTypes: ['Self-Drive Cars', 'Chauffeur Cabs', 'Sightseeing Day Packages', 'Airport Transfers'],
    fleetsAvailable: [
      { category: 'Hatchback / Sedan', models: 'Swift, Dzire, Amaze', rateEstimate: '₹1,300 – ₹1,600 / day', deposit: '₹2,000' },
      { category: 'Family SUV & MPV', models: 'Ertiga, Innova Crysta', rateEstimate: '₹2,600 – ₹3,400 / day', deposit: '₹3,500' },
      { category: 'Bikes & Scooters', models: 'Honda Activa, Royal Enfield Classic 350', rateEstimate: '₹450 – ₹1,100 / day', deposit: '₹1,500' },
    ],
    features: ['24/7 Roadside Helpline', 'Zero Hidden Fees', 'Free Cancellation up to 6 hrs', 'Fastag Pre-installed'],
    verified: true,
  },
  {
    id: 'rent-jpr-2',
    agencyName: 'Pink City Self-Drive Wheels & Bikes',
    city: 'Jaipur',
    state: 'Rajasthan',
    address: 'MI Road, Opposite Raj Mandir Cinema, Jaipur',
    phone: '+91 94140 78210',
    whatsapp: '919414078210',
    ownerName: 'Rajesh Sharma',
    rating: 4.8,
    reviewsCount: 290,
    establishedYear: 2015,
    serviceTypes: ['Self-Drive Cars', 'Royal Enfield Rentals', 'Outstation Highway Cabs'],
    fleetsAvailable: [
      { category: 'Compact SUV', models: 'Hyundai Creta, Brezza', rateEstimate: '₹2,400 – ₹2,800 / day', deposit: '₹3,000' },
      { category: 'Adventure Cruiser', models: 'Royal Enfield Hunter 350 & Himalayan', rateEstimate: '₹1,000 – ₹1,600 / day', deposit: '₹2,000' },
    ],
    features: ['Unlimited km Option', 'Complimentary ISI Helmets', 'Instant Security Deposit Refund'],
    verified: true,
  },
  {
    id: 'rent-udr-1',
    agencyName: 'Udaipur Lakecity Tours & Car Rentals',
    city: 'Udaipur',
    state: 'Rajasthan',
    address: 'Hanuman Ghat Road, Near Ambrai Ghat, Udaipur',
    phone: '+91 97840 33412',
    whatsapp: '919784033412',
    ownerName: 'Mahendra Mewara',
    rating: 4.9,
    reviewsCount: 420,
    establishedYear: 2008,
    serviceTypes: ['Lakeside Cabs', 'Self-Drive Cars', 'Kumbhalgarh & Ranakpur Day Trips'],
    fleetsAvailable: [
      { category: 'Premium MPV', models: 'Innova Crysta (7-Seater)', rateEstimate: '₹3,200 – ₹3,800 / day', deposit: '₹4,000' },
      { category: 'City Sedan', models: 'Honda City, Dzire AC', rateEstimate: '₹1,500 – ₹1,800 / day', deposit: '₹2,500' },
      { category: 'Scooters', models: 'TVS Jupiter, Activa 6G', rateEstimate: '₹400 – ₹550 / day', deposit: '₹1,000' },
    ],
    features: ['Courteous English/Hindi Chauffeurs', 'Airport Pickup & Drop', 'Fuel Inclusive Plans Available'],
    verified: true,
  },
  {
    id: 'rent-goa-1',
    agencyName: 'Goa Coastal Riders & Self-Drive Fleet',
    city: 'Goa',
    state: 'Goa',
    address: 'Calangute - Baga Main Road, North Goa & Dabolim Airport',
    phone: '+91 98221 66734',
    whatsapp: '919822166734',
    ownerName: 'Anthony Fernandes',
    rating: 4.9,
    reviewsCount: 560,
    establishedYear: 2011,
    serviceTypes: ['Self-Drive Open Thar', 'Airport Transfers', 'Scooty & Vespa Rentals'],
    fleetsAvailable: [
      { category: '4x4 Open Top', models: 'Mahindra Thar 4x4 (Hard/Soft Top)', rateEstimate: '₹3,500 – ₹4,200 / day', deposit: '₹5,000' },
      { category: 'Hatchbacks', models: 'Swift, Baleno, i20', rateEstimate: '₹1,200 – ₹1,500 / day', deposit: '₹2,000' },
      { category: 'Scooters & Bikes', models: 'Activa 125, Yamaha Fascino, RE Bullet', rateEstimate: '₹400 – ₹900 / day', deposit: '₹1,000' },
    ],
    features: ['Dabolim / MOPA Airport Delivery', 'No Kilometre Limit', 'Spotless Condition & Documents'],
    verified: true,
  },
  {
    id: 'rent-del-1',
    agencyName: 'Delhi NCR Royal Wheels & Outstation Cabs',
    city: 'Delhi',
    state: 'Delhi',
    address: 'Connaught Place & IGI Airport Terminal 3 Hub, New Delhi',
    phone: '+91 98110 54321',
    whatsapp: '919811054321',
    ownerName: 'Harpreet Singh',
    rating: 4.8,
    reviewsCount: 640,
    establishedYear: 2006,
    serviceTypes: ['Delhi-Agra-Jaipur Golden Triangle Cabs', 'Corporate Self-Drive', 'Tempo Travellers'],
    fleetsAvailable: [
      { category: 'Executive Sedans', models: 'Skoda Slavia, Honda City, Ciaz', rateEstimate: '₹2,200 – ₹2,600 / day', deposit: '₹3,000' },
      { category: 'Luxury SUV', models: 'Fortuner, XUV700, Innova Hycross', rateEstimate: '₹4,500 – ₹6,000 / day', deposit: '₹6,000' },
      { category: 'Group Van', models: '12 / 17 Seater Force Tempo Traveller', rateEstimate: '₹24 – ₹28 / km', deposit: '₹5,000' },
    ],
    features: ['All India Tourist Permit', 'GPS Monitored Vehicles', 'Experienced Highway Drivers'],
    verified: true,
  },
  {
    id: 'rent-mnl-1',
    agencyName: 'Himalayan Highs 4x4 & Mountain Bike Rentals',
    city: 'Manali',
    state: 'Himachal Pradesh',
    address: 'The Mall Road & Old Manali Bridge, Manali',
    phone: '+91 98160 44321',
    whatsapp: '919816044321',
    ownerName: 'Tenzing Bodh',
    rating: 4.9,
    reviewsCount: 340,
    establishedYear: 2014,
    serviceTypes: ['Leh-Ladakh Expeditions', 'Atal Tunnel & Rohtang 4x4 Cabs', 'Mountain Bikes'],
    fleetsAvailable: [
      { category: 'High Mountain 4x4', models: 'Mahindra Thar, Scorpio 4WD, Isuzu V-Cross', rateEstimate: '₹4,000 – ₹5,500 / day', deposit: '₹8,000' },
      { category: 'Adventure Bikes', models: 'RE Himalayan 450, Scram 411, KTM 390 Adventure', rateEstimate: '₹1,500 – ₹2,200 / day', deposit: '₹3,000' },
    ],
    features: ['Rohtang Permit Assistance', 'Toolkits & Spare Tubes Included', 'Winter Snow Chain Assistance'],
    verified: true,
  },
  {
    id: 'rent-var-1',
    agencyName: 'Kashi Vishwanath Tourist Taxi & Auto Hub',
    city: 'Varanasi',
    state: 'Uttar Pradesh',
    address: 'Cantonment Station Approach & Godowlia Road, Varanasi',
    phone: '+91 94500 89123',
    whatsapp: '919450089123',
    ownerName: 'Santosh Kumar Mishra',
    rating: 4.8,
    reviewsCount: 310,
    establishedYear: 2010,
    serviceTypes: ['Airport to Ghats Transfers', 'Sarnath Day Tours', 'Prayagraj / Ayodhya Cabs'],
    fleetsAvailable: [
      { category: 'AC Cabs', models: 'Dzire, Etios, WagonR', rateEstimate: '₹1,400 – ₹1,800 / day', deposit: '₹1,500' },
      { category: 'Spacious MPV', models: 'Innova Crysta, Ertiga', rateEstimate: '₹2,800 – ₹3,500 / day', deposit: '₹3,000' },
    ],
    features: ['Fixed Official Rate Chart', 'Airport Meet & Greet', 'English & Hindi Speaking Drivers'],
    verified: true,
  },
  {
    id: 'rent-agr-1',
    agencyName: 'Taj Express Tour Cabs & Rentals',
    city: 'Agra',
    state: 'Uttar Pradesh',
    address: 'Fatehabad Road, Near Taj East Gate, Agra',
    phone: '+91 97580 66543',
    whatsapp: '919758066543',
    ownerName: 'Mohammad Nadeem',
    rating: 4.9,
    reviewsCount: 275,
    establishedYear: 2013,
    serviceTypes: ['Same-Day Taj & Agra Fort Cabs', 'Fatehpur Sikri Excursions', 'Delhi-Agra Transfers'],
    fleetsAvailable: [
      { category: 'Sedan Cabs', models: 'Swift Dzire AC, Toyota Etios', rateEstimate: '₹1,400 – ₹1,700 / day', deposit: '₹1,500' },
      { category: 'Group Travellers', models: 'Innova Crysta, Tempo Traveller', rateEstimate: '₹2,800 – ₹4,200 / day', deposit: '₹3,500' },
    ],
    features: ['Monuments Guided Transfers', 'Clean Mineral Water in Cabs', 'No Toll Surcharges on Yamuna Expressway'],
    verified: true,
  },
  {
    id: 'rent-mum-1',
    agencyName: 'Mumbai Coastal Wheels & Cabs',
    city: 'Mumbai',
    state: 'Maharashtra',
    address: 'Andheri East (Airport Hub) & Colaba Causeway, Mumbai',
    phone: '+91 98200 45678',
    whatsapp: '919820045678',
    ownerName: 'Nitin Kadam',
    rating: 4.8,
    reviewsCount: 490,
    establishedYear: 2009,
    serviceTypes: ['Mumbai-Pune Expressway Cabs', 'Alibaug & Lonavala Day Tours', 'Self-Drive Cars'],
    fleetsAvailable: [
      { category: 'Sedan & Hatchback', models: 'Honda City, Baleno, Dzire', rateEstimate: '₹1,600 – ₹2,200 / day', deposit: '₹3,000' },
      { category: 'Premium SUV', models: 'Innova Crysta, Fortuner', rateEstimate: '₹3,500 – ₹5,500 / day', deposit: '₹5,000' },
    ],
    features: ['Airport Terminal 1 & 2 Delivery', 'Sea Link Toll Fastag Enabled', 'Comprehensive Insurance'],
    verified: true,
  },
  {
    id: 'rent-koc-1',
    agencyName: 'Kerala Backwaters Car & Taxi Service',
    city: 'Kochi',
    state: 'Kerala',
    address: 'Fort Kochi Heritage Area & Nedumbassery Airport Hub',
    phone: '+91 94470 12345',
    whatsapp: '919447012345',
    ownerName: 'Kurian Thomas',
    rating: 4.9,
    reviewsCount: 390,
    establishedYear: 2011,
    serviceTypes: ['Kochi-Munnar-Alleppey Circuit Cabs', 'Self-Drive Cars', 'Airport Transfers'],
    fleetsAvailable: [
      { category: 'Comfort Sedan', models: 'Etios, Dzire, Verna', rateEstimate: '₹1,500 – ₹1,900 / day', deposit: '₹2,000' },
      { category: 'Hill & Ghat SUV', models: 'Innova Crysta, Ertiga, Thar', rateEstimate: '₹2,900 – ₹3,800 / day', deposit: '₹4,000' },
    ],
    features: ['Experienced Hill Station Chauffeurs', 'Houseboat Linkage Assistance', 'English Speaking Guides'],
    verified: true,
  },
];

export default function RentalServices({
  cities = [],
  selectedCity = 'All',
  formatPrice = (p) => `₹${Number(p).toLocaleString('en-IN')}`,
  onOpenBooking,
}) {
  const [filterCity, setFilterCity] = useState(selectedCity || 'All');
  const [serviceFilter, setServiceFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [enquirySuccessModal, setEnquirySuccessModal] = useState(null);

  const cityList = useMemo(() => {
    const list = ['All'];
    LOCAL_RENTAL_OPERATORS.forEach((op) => {
      if (!list.includes(op.city)) list.push(op.city);
    });
    return list;
  }, []);

  const filteredOperators = useMemo(() => {
    return LOCAL_RENTAL_OPERATORS.filter((op) => {
      const matchCity = filterCity === 'All' || op.city.toLowerCase() === filterCity.toLowerCase();
      const matchService =
        serviceFilter === 'All' ||
        op.serviceTypes.some((s) => s.toLowerCase().includes(serviceFilter.toLowerCase())) ||
        op.fleetsAvailable.some((f) => f.category.toLowerCase().includes(serviceFilter.toLowerCase()));
      const matchQuery =
        !searchQuery.trim() ||
        op.agencyName.toLowerCase().includes(searchQuery.trim().toLowerCase()) ||
        op.city.toLowerCase().includes(searchQuery.trim().toLowerCase()) ||
        op.ownerName.toLowerCase().includes(searchQuery.trim().toLowerCase()) ||
        op.fleetsAvailable.some((f) => f.models.toLowerCase().includes(searchQuery.trim().toLowerCase()));
      return matchCity && matchService && matchQuery;
    });
  }, [filterCity, serviceFilter, searchQuery]);

  const handleSendEnquiry = (op, fleet) => {
    setEnquirySuccessModal({
      agencyName: op.agencyName,
      phone: op.phone,
      whatsapp: op.whatsapp,
      city: op.city,
      fleet: fleet?.category || 'Rental Inquiry',
    });
  };

  return (
    <div className="rental-services-page" style={{ padding: '1rem 0 3rem' }}>
      {/* Header Banner */}
      <div className="glass-panel" style={{ padding: '1.75rem', borderRadius: '18px', marginBottom: '2rem', borderLeft: '5px solid #0f766e' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <span className="card-tag" style={{ background: 'rgba(15, 118, 110, 0.12)', color: '#0f766e', fontWeight: 800 }}>
              🛡️ Direct Local Operators • 0% Middleman Commission
            </span>
            <h2 style={{ fontSize: '1.85rem', margin: '0.4rem 0 0.25rem', color: 'var(--text-main)' }}>
              Verified Local Car, Cab & Bike Rental Directory
            </h2>
            <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '0.925rem', maxWidth: '750px' }}>
              Connect directly with authorized local transport providers across India. Call directly or chat on WhatsApp to negotiate fair rates, confirm airport pickups, and book self-drive cars, bikes, or chauffeur-driven vehicles.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <div style={{ textAlign: 'center', background: 'var(--bg-surface, #ffffff)', padding: '8px 16px', borderRadius: '12px', border: '1px solid var(--border)' }}>
              <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f766e' }}>{LOCAL_RENTAL_OPERATORS.length}+</div>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Verified Agencies</div>
            </div>
            <div style={{ textAlign: 'center', background: 'var(--bg-surface, #ffffff)', padding: '8px 16px', borderRadius: '12px', border: '1px solid var(--border)' }}>
              <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#10b981' }}>0%</div>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Platform Fee</div>
            </div>
          </div>
        </div>

        {/* QUICK CITY CHIPS & VEHICLE CATEGORY BAR */}
        <div style={{ marginTop: '1.25rem', paddingTop: '1.25rem', borderTop: '1px solid var(--border)', display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
          {/* Quick Search Input */}
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            <input
              type="text"
              className="market-search-input"
              placeholder="🔍 Search agency, city, or model (e.g. Innova Crysta, Thar 4x4, Swift, Activa, Royal Enfield)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ flex: 1, minWidth: '240px' }}
            />
            {(filterCity !== 'All' || serviceFilter !== 'All' || searchQuery) && (
              <button
                type="button"
                className="secondary-action"
                onClick={() => { setFilterCity('All'); setServiceFilter('All'); setSearchQuery(''); }}
                style={{ padding: '8px 16px', fontSize: '0.85rem' }}
              >
                Reset Filters
              </button>
            )}
          </div>

          {/* City Chips */}
          <div style={{ display: 'flex', gap: '0.45rem', flexWrap: 'wrap', alignItems: 'center' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)' }}>📍 City:</span>
            {['All', 'Jaipur', 'Udaipur', 'Goa', 'Delhi', 'Mumbai', 'Agra', 'Varanasi', 'Manali', 'Shimla', 'Kochi'].map((c) => (
              <button
                key={c}
                type="button"
                className={`quick-pill-tag ${filterCity.toLowerCase() === c.toLowerCase() ? 'active' : ''}`}
                onClick={() => setFilterCity(c)}
                style={{ padding: '5px 12px', fontSize: '0.78rem', borderRadius: '18px', cursor: 'pointer' }}
              >
                {c === 'All' ? 'All India' : c}
              </button>
            ))}
          </div>

          {/* Vehicle Category Tabs */}
          <div style={{ display: 'flex', gap: '0.45rem', flexWrap: 'wrap', alignItems: 'center' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)' }}>🚗 Vehicle Type:</span>
            {[
              { id: 'All', label: 'All Fleet Types' },
              { id: 'Self-Drive', label: '🚗 Self-Drive Cars' },
              { id: 'Chauffeur', label: '🚕 Chauffeur Cabs' },
              { id: 'SUV', label: '🚙 4x4 Thar & SUVs' },
              { id: 'Bike', label: '🛵 Bikes & Scooters' },
              { id: 'Airport', label: '✈️ Airport Transfers' },
            ].map((s) => (
              <button
                key={s.id}
                type="button"
                className={`quick-pill-tag ${serviceFilter === s.id ? 'active' : ''}`}
                onClick={() => setServiceFilter(s.id)}
                style={{ padding: '4px 11px', fontSize: '0.75rem', borderRadius: '14px', cursor: 'pointer' }}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Verified Local Operators Directory List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        {filteredOperators.length === 0 ? (
          <div className="glass-panel" style={{ padding: '3rem', textAlign: 'center', borderRadius: '16px' }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>🚕</div>
            <h3 style={{ margin: 0, color: 'var(--text-main)' }}>No matching rental providers found</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '0.5rem' }}>
              Try clearing filters to view all verified operators across India.
            </p>
            <button
              type="button"
              className="primary-action"
              onClick={() => { setFilterCity('All'); setServiceFilter('All'); setSearchQuery(''); }}
              style={{ marginTop: '1rem', padding: '8px 18px' }}
            >
              Show All Operators
            </button>
          </div>
        ) : (
          filteredOperators.map((op) => (
            <article
              key={op.id}
              className="glass-panel"
              style={{
                padding: '1.5rem',
                borderRadius: '16px',
                border: '1px solid var(--border)',
                background: 'var(--bg-surface, #ffffff)',
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.04)',
                transition: 'transform 0.2s ease, box-shadow 0.2s ease',
              }}
            >
              {/* Operator Header Row */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.75rem' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                    <h3 style={{ margin: 0, fontSize: '1.25rem', color: 'var(--text-main)', fontWeight: 800 }}>
                      {op.agencyName}
                    </h3>
                    <span style={{ background: 'rgba(16, 185, 129, 0.12)', color: '#047857', border: '1px solid #10b981', padding: '2px 8px', borderRadius: '6px', fontSize: '0.725rem', fontWeight: 800 }}>
                      ✓ Verified Local Vendor
                    </span>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                      Est. {op.establishedYear} • Managed by {op.ownerName}
                    </span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '4px', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                    <span>📍 {op.address}</span>
                    <span>•</span>
                    <span style={{ color: '#ea580c', fontWeight: 700 }}>⭐ {op.rating} ({op.reviewsCount} reviews)</span>
                  </div>
                </div>

                {/* Direct Contact Buttons (Requirement: Contact details over photos) */}
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                  <a
                    href={`tel:${op.phone.replace(/[^0-9+]/g, '')}`}
                    className="primary-action"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      padding: '8px 16px',
                      borderRadius: '10px',
                      textDecoration: 'none',
                      fontSize: '0.85rem',
                      fontWeight: 700,
                      background: '#0f766e',
                      color: '#ffffff',
                    }}
                    title={`Call ${op.agencyName}`}
                  >
                    <span>📞 Call:</span>
                    <span>{op.phone}</span>
                  </a>

                  <a
                    href={`https://wa.me/${op.whatsapp}?text=${encodeURIComponent(`Hi ${op.agencyName}, I found your listing on Yatra 66. I want to inquire about car/bike rentals in ${op.city}.`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      padding: '8px 16px',
                      borderRadius: '10px',
                      textDecoration: 'none',
                      fontSize: '0.85rem',
                      fontWeight: 700,
                      background: '#25D366',
                      color: '#ffffff',
                      boxShadow: '0 2px 10px rgba(37, 211, 102, 0.3)',
                    }}
                    title={`Chat on WhatsApp with ${op.agencyName}`}
                  >
                    <span>💬 WhatsApp</span>
                  </a>
                </div>
              </div>

              {/* Available Fleet & Transparent Pricing Table */}
              <div style={{ background: 'var(--bg-canvas, #f8fafc)', padding: '1rem', borderRadius: '12px', border: '1px solid var(--border)' }}>
                <span style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em', display: 'block', marginBottom: '0.6rem' }}>
                  📋 Available Fleet & Rates (Direct Operator Pricing)
                </span>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '0.75rem' }}>
                  {op.fleetsAvailable.map((f, fIdx) => (
                    <div
                      key={fIdx}
                      style={{
                        background: 'var(--bg-surface, #ffffff)',
                        padding: '0.75rem 1rem',
                        borderRadius: '10px',
                        border: '1px solid var(--border)',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        gap: '6px',
                      }}
                    >
                      <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <strong style={{ fontSize: '0.875rem', color: 'var(--text-main)' }}>{f.category}</strong>
                          <span style={{ color: '#0f766e', fontWeight: 800, fontSize: '0.875rem' }}>{f.rateEstimate}</span>
                        </div>
                        <div style={{ fontSize: '0.775rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                          Models: <em>{f.models}</em>
                        </div>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '6px', borderTop: '1px dashed var(--border)', fontSize: '0.75rem' }}>
                        <div>
                          <span style={{ color: 'var(--text-muted)' }}>Deposit: </span>
                          <span style={{ fontWeight: 700, color: 'var(--text-main)' }}>{f.deposit}</span>
                        </div>
                        <button
                          type="button"
                          className="primary-action"
                          style={{ padding: '4px 10px', fontSize: '0.75rem', borderRadius: '6px' }}
                          onClick={() => {
                            if (onOpenBooking) {
                              const est = parseInt((f.rateEstimate || '1800').replace(/[^0-9]/g, '')) || 1800;
                              onOpenBooking(
                                'rental',
                                `${op.agencyName} • ${f.category} (${f.models})`,
                                est,
                                1,
                                op.city
                              );
                            } else {
                              handleSendEnquiry(op, f);
                            }
                          }}
                        >
                          ⚡ Book Voucher
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Service Features & Direct Enquiry Bar */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem', paddingTop: '0.5rem' }}>
                <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                  {op.features.map((feat, ftIdx) => (
                    <span
                      key={ftIdx}
                      style={{
                        fontSize: '0.725rem',
                        padding: '3px 9px',
                        borderRadius: '20px',
                        background: 'var(--bg-surface-elevated, #f1f5f9)',
                        color: 'var(--text-muted)',
                        fontWeight: 600,
                      }}
                    >
                      ✓ {feat}
                    </span>
                  ))}
                </div>

                <button
                  type="button"
                  className="secondary-action"
                  onClick={() => handleSendEnquiry(op, op.fleetsAvailable[0])}
                  style={{ padding: '6px 14px', fontSize: '0.825rem', borderRadius: '8px' }}
                >
                  ✉️ Dispatch Direct Booking Request
                </button>
              </div>
            </article>
          ))
        )}
      </div>

      {/* Enquiry Success Modal */}
      {enquirySuccessModal && (
        <div className="sih-modal-backdrop" onClick={() => setEnquirySuccessModal(null)}>
          <div className="sih-modal-content animate-scale-up" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '440px' }}>
            <div style={{ textAlign: 'center', marginBottom: '1.25rem' }}>
              <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>📞</div>
              <h3 style={{ margin: '0 0 0.25rem', color: 'var(--text-main)' }}>Direct Contact Confirmed!</h3>
              <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '0.875rem' }}>
                Connect directly with <strong>{enquirySuccessModal.agencyName}</strong> in {enquirySuccessModal.city}.
              </p>
            </div>

            <div style={{ background: 'var(--bg-canvas, #f8fafc)', padding: '1rem', borderRadius: '12px', marginBottom: '1.25rem', border: '1px solid var(--border)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px', fontSize: '0.85rem' }}>
                <span style={{ color: 'var(--text-muted)' }}>Phone Call:</span>
                <strong>{enquirySuccessModal.phone}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px', fontSize: '0.85rem' }}>
                <span style={{ color: 'var(--text-muted)' }}>WhatsApp:</span>
                <strong>+{enquirySuccessModal.whatsapp}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
                <span style={{ color: 'var(--text-muted)' }}>Platform Commission:</span>
                <strong style={{ color: '#10b981' }}>₹0 (Direct Vendor Booking)</strong>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <a
                href={`tel:${enquirySuccessModal.phone.replace(/[^0-9+]/g, '')}`}
                className="primary-action"
                style={{ flex: 1, padding: '10px', borderRadius: '10px', textAlign: 'center', textDecoration: 'none' }}
              >
                📞 Call Now
              </a>
              <a
                href={`https://wa.me/${enquirySuccessModal.whatsapp}?text=${encodeURIComponent(`Hi ${enquirySuccessModal.agencyName}, I found your listing on Yatra 66 for ${enquirySuccessModal.fleet}. Please share availability and best price.`)}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{ flex: 1, padding: '10px', borderRadius: '10px', textAlign: 'center', textDecoration: 'none', background: '#25D366', color: '#ffffff' }}
              >
                💬 WhatsApp
              </a>
            </div>

            <button
              type="button"
              className="secondary-action"
              onClick={() => setEnquirySuccessModal(null)}
              style={{ width: '100%', marginTop: '0.75rem', padding: '8px' }}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
