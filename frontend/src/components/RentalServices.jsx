import { useState, useMemo } from 'react';

export const RENTAL_VEHICLES = [
  {
    id: 'car-swift',
    name: 'Maruti Suzuki Swift VXi',
    category: 'Cars',
    type: 'Self-Drive Hatchback',
    fuel: 'Petrol',
    transmission: 'Manual',
    seats: 5,
    mileage: 'Unlimited km',
    pricePerDay: 1450,
    deposit: 3000,
    rating: 4.8,
    reviewsCount: 184,
    image: 'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?w=700',
    features: ['Chilled AC', 'Bluetooth Audio', 'Airbags', 'Fastag Enabled'],
    availableCities: ['Jaipur', 'Goa', 'Delhi', 'Mumbai', 'Agra', 'Udaipur', 'Kochi', 'Bengaluru'],
  },
  {
    id: 'car-thar',
    name: 'Mahindra Thar 4x4 Hardtop',
    category: 'Cars',
    type: 'Self-Drive 4x4 SUV',
    fuel: 'Diesel',
    transmission: 'Automatic',
    seats: 4,
    mileage: '300 km/day',
    pricePerDay: 3800,
    deposit: 6000,
    rating: 4.9,
    reviewsCount: 220,
    image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=700',
    features: ['4x4 High/Low', 'Touchscreen Infotainment', 'Convertible / Hard Top', 'Off-road Tires'],
    availableCities: ['Goa', 'Manali', 'Leh Ladakh', 'Jaipur', 'Udaipur', 'Rishikesh'],
  },
  {
    id: 'car-creta',
    name: 'Hyundai Creta SX',
    category: 'Cars',
    type: 'Self-Drive Compact SUV',
    fuel: 'Diesel',
    transmission: 'Automatic',
    seats: 5,
    mileage: 'Unlimited km',
    pricePerDay: 2600,
    deposit: 4000,
    rating: 4.8,
    reviewsCount: 156,
    image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=700',
    features: ['Panoramic Sunroof', 'Ventilated Seats', 'Wireless Android Auto', 'Cruise Control'],
    availableCities: ['Delhi', 'Mumbai', 'Jaipur', 'Bengaluru', 'Goa', 'Kochi'],
  },
  {
    id: 'car-innova',
    name: 'Toyota Innova Crysta 2.4 VX',
    category: 'Cars',
    type: 'Self-Drive / Chauffeur MPV',
    fuel: 'Diesel',
    transmission: 'Manual',
    seats: 7,
    mileage: 'Unlimited km',
    pricePerDay: 3600,
    deposit: 5000,
    rating: 4.9,
    reviewsCount: 310,
    image: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=700',
    features: ['Spacious 7-Seater', 'Rear AC Vents', 'Generous Luggage Space', 'Captain Seats'],
    availableCities: ['Jaipur', 'Agra', 'Delhi', 'Mumbai', 'Goa', 'Varanasi', 'Kochi'],
  },
  {
    id: 'bike-enfield',
    name: 'Royal Enfield Classic 350 Reborn',
    category: 'Bikes',
    type: 'Cruiser Motorcycle',
    fuel: 'Petrol',
    transmission: 'Manual 5-Speed',
    seats: 2,
    mileage: 'Unlimited km',
    pricePerDay: 1100,
    deposit: 2000,
    rating: 4.9,
    reviewsCount: 298,
    image: 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=700',
    features: ['Dual Channel ABS', '2 Complimentary ISI Helmets', 'Luggage Carrier Rack', 'Tool Kit'],
    availableCities: ['Goa', 'Manali', 'Leh Ladakh', 'Rishikesh', 'Jaipur', 'Udaipur'],
  },
  {
    id: 'bike-himalayan',
    name: 'Royal Enfield Himalayan 450',
    category: 'Bikes',
    type: 'Adventure Tourer',
    fuel: 'Petrol',
    transmission: 'Manual 6-Speed',
    seats: 2,
    mileage: 'Unlimited km',
    pricePerDay: 1750,
    deposit: 3000,
    rating: 4.9,
    reviewsCount: 165,
    image: 'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=700',
    features: ['Liquid-Cooled Sherpa Engine', 'Google Maps TFT Display', 'High Ground Clearance', 'Tubeless Spoke Rims'],
    availableCities: ['Manali', 'Leh Ladakh', 'Rishikesh', 'Srinagar'],
  },
  {
    id: 'scooter-activa',
    name: 'Honda Activa 6G Premium',
    category: 'Bikes',
    type: 'Automatic Scooter',
    fuel: 'Petrol',
    transmission: 'CVT Automatic',
    seats: 2,
    mileage: 'Unlimited km',
    pricePerDay: 500,
    deposit: 1000,
    rating: 4.8,
    reviewsCount: 412,
    image: 'https://images.unsplash.com/photo-1520050206274-a1ae44613e6d?w=700',
    features: ['Telescopic Suspension', 'Combi Brake System', 'Large Boot Space', '2 Helmets Included'],
    availableCities: ['Goa', 'Jaipur', 'Udaipur', 'Kochi', 'Pondicherry', 'Varanasi'],
  },
  {
    id: 'ev-nexon',
    name: 'Tata Nexon.ev Long Range',
    category: 'EV',
    type: 'Electric SUV',
    fuel: 'Electric (465 km Range)',
    transmission: 'Automatic',
    seats: 5,
    mileage: '300 km/day',
    pricePerDay: 2800,
    deposit: 4000,
    rating: 4.8,
    reviewsCount: 94,
    image: 'https://images.unsplash.com/photo-1536700503339-1e4b06520771?w=700',
    features: ['Zero Emissions', 'Free Charging at Partner Hubs', 'Vehicle-to-Load Tech', 'Harman Audio'],
    availableCities: ['Delhi', 'Mumbai', 'Bengaluru', 'Goa', 'Jaipur'],
  },
  {
    id: 'chauffeur-etios',
    name: 'Toyota Etios / Dzire with Chauffeur',
    category: 'Chauffeur',
    type: 'Outstation & Airport Cab',
    fuel: 'CNG / Diesel',
    transmission: 'Chauffeur Driven',
    seats: 4,
    mileage: '250 km included',
    pricePerDay: 2900,
    deposit: 0,
    rating: 4.9,
    reviewsCount: 350,
    image: 'https://images.unsplash.com/photo-1550355291-bbee04a92027?w=700',
    features: ['Verified Police-Checked Driver', 'Toll & State Taxes Included', 'Door-to-Door Pickup', 'AC Sedan'],
    availableCities: ['Jaipur', 'Agra', 'Delhi', 'Mumbai', 'Goa', 'Varanasi', 'Amritsar'],
  },
  {
    id: 'chauffeur-tempo',
    name: 'Force Tempo Traveller 12-Seater',
    category: 'Chauffeur',
    type: 'Group Touring Van with Driver',
    fuel: 'Diesel',
    transmission: 'Chauffeur Driven',
    seats: 12,
    mileage: '300 km included',
    pricePerDay: 6200,
    deposit: 0,
    rating: 4.9,
    reviewsCount: 118,
    image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=700',
    features: ['Individual Pushback Seats', 'High Roof AC', 'Music System & Mic', 'Experienced Highway Driver'],
    availableCities: ['Jaipur', 'Agra', 'Delhi', 'Manali', 'Rishikesh', 'Mumbai'],
  },
];

export default function RentalServices({
  _cities = [],
  formatPrice = (p) => `₹${p.toLocaleString('en-IN')}`,
  onOpenBooking,
}) {
  const [selectedCity, setSelectedCity] = useState('All');
  const [activeCategory, setActiveCategory] = useState('All');
  const [sortOrder, setSortOrder] = useState('popular');
  const [bookingVehicle, setBookingVehicle] = useState(null);
  const [bookingForm, setBookingForm] = useState({
    pickupDate: '',
    durationDays: 2,
    pickupLocation: 'Airport Counter (Terminal Arrival)',
    customerName: '',
    customerPhone: '',
    hasLicense: true,
  });
  const [bookingSuccess, setBookingSuccess] = useState(null);

  const categories = [
    { id: 'All', label: 'All Vehicles', icon: '🚘' },
    { id: 'Cars', label: 'Self-Drive Cars', icon: '🚗' },
    { id: 'Bikes', label: 'Bikes & Scooters', icon: '🛵' },
    { id: 'EV', label: 'Electric Vehicles', icon: '⚡' },
    { id: 'Chauffeur', label: 'With Chauffeur', icon: '👨‍✈️' },
  ];

  const cityList = ['All', 'Jaipur', 'Goa', 'Delhi', 'Mumbai', 'Agra', 'Manali', 'Udaipur', 'Kochi', 'Bengaluru', 'Rishikesh'];

  const filteredVehicles = useMemo(() => {
    return RENTAL_VEHICLES.filter((v) => {
      const matchCat = activeCategory === 'All' || v.category === activeCategory;
      const matchCity = selectedCity === 'All' || v.availableCities.includes(selectedCity);
      return matchCat && matchCity;
    }).sort((a, b) => {
      if (sortOrder === 'price-low') return a.pricePerDay - b.pricePerDay;
      if (sortOrder === 'price-high') return b.pricePerDay - a.pricePerDay;
      if (sortOrder === 'rating') return b.rating - a.rating;
      return b.reviewsCount - a.reviewsCount;
    });
  }, [activeCategory, selectedCity, sortOrder]);

  const handleStartBooking = (vehicle) => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const dateStr = tomorrow.toISOString().split('T')[0];

    setBookingVehicle(vehicle);
    setBookingForm({
      pickupDate: dateStr,
      durationDays: 2,
      pickupLocation: `${selectedCity !== 'All' ? selectedCity : 'City'} Airport (Terminal Arrival)`,
      customerName: '',
      customerPhone: '',
      hasLicense: true,
    });
  };

  const handleConfirmRental = (e) => {
    e.preventDefault();
    if (!bookingVehicle) return;

    const totalAmount = bookingVehicle.pricePerDay * bookingForm.durationDays;
    const voucherCode = 'YTR-RENT-' + Math.floor(100000 + Math.random() * 900000);

    const bookingItem = {
      id: Date.now(),
      bookingId: voucherCode,
      type: 'rental',
      itemName: `${bookingVehicle.name} (${bookingForm.durationDays} Days)`,
      city: selectedCity !== 'All' ? selectedCity : 'India',
      pickupLocation: bookingForm.pickupLocation,
      pickupDate: bookingForm.pickupDate,
      durationDays: bookingForm.durationDays,
      totalAmount,
      customerName: bookingForm.customerName || 'Verified Traveler',
      status: 'CONFIRMED',
      dateCreated: new Date().toISOString(),
    };

    try {
      const existing = JSON.parse(localStorage.getItem('yatra_bookings') || '[]');
      existing.unshift(bookingItem);
      localStorage.setItem('yatra_bookings', JSON.stringify(existing));
    } catch {}

    if (onOpenBooking) {
      onOpenBooking('rental', bookingVehicle.name, totalAmount, 1, selectedCity);
    }

    setBookingSuccess({
      voucher: voucherCode,
      vehicle: bookingVehicle.name,
      amount: totalAmount,
      pickup: bookingForm.pickupLocation,
      date: bookingForm.pickupDate,
      days: bookingForm.durationDays,
    });

    setBookingVehicle(null);
  };

  return (
    <section className="page rental-page">
      {/* HEADER BANNER */}
      <div className="section-header-row" style={{ marginBottom: '1.5rem' }}>
        <div>
          <span className="card-tag" style={{ background: 'rgba(15, 118, 110, 0.12)', color: '#0f766e', fontWeight: 800 }}>
            🚗 Self-Drive & Chauffeur Fleet
          </span>
          <h2 style={{ fontSize: '1.9rem', margin: '0.4rem 0 0.25rem', color: 'var(--text-main)' }}>
            Vehicle Rental Services Across India
          </h2>
          <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '0.95rem' }}>
            Book clean, certified self-drive cars, iconic Royal Enfields, automatic scooters, and outstation chauffeur cabs with zero hidden charges.
          </p>
        </div>
      </div>

      {/* FILTER & CITY CONTROL BAR */}
      <div className="glass-panel" style={{ padding: '1rem 1.25rem', borderRadius: '16px', marginBottom: '1.75rem' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'space-between', alignItems: 'center' }}>
          {/* CATEGORY TABS */}
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {categories.map((c) => (
              <button
                key={c.id}
                type="button"
                className={`quick-pill-tag ${activeCategory === c.id ? 'active' : ''}`}
                onClick={() => setActiveCategory(c.id)}
                style={{ cursor: 'pointer', padding: '8px 16px', borderRadius: '20px', fontSize: '0.85rem' }}
              >
                <span>{c.icon}</span>
                <span>{c.label}</span>
              </button>
            ))}
          </div>

          {/* CITY & SORT CONTROLS */}
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              <span>📍 City:</span>
              <select
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                style={{ padding: '6px 12px', borderRadius: '8px', border: '1px solid var(--border)', background: 'var(--bg-surface)' }}
              >
                {cityList.map((cty) => (
                  <option key={cty} value={cty}>{cty === 'All' ? 'All Indian Hubs' : cty}</option>
                ))}
              </select>
            </label>

            <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              <span>Sort:</span>
              <select
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
                style={{ padding: '6px 12px', borderRadius: '8px', border: '1px solid var(--border)', background: 'var(--bg-surface)' }}
              >
                <option value="popular">Most Popular 🔥</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Top Rated ⭐</option>
              </select>
            </label>
          </div>
        </div>
      </div>

      {/* SUCCESS BANNER */}
      {bookingSuccess && (
        <div className="glass-panel" style={{ padding: '1.25rem', borderRadius: '12px', background: 'rgba(16, 185, 129, 0.1)', border: '1px solid #10b981', marginBottom: '1.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <strong style={{ color: '#065f46', fontSize: '1.05rem', display: 'block' }}>
                🎉 Rental Confirmed! Voucher Code: <code>{bookingSuccess.voucher}</code>
              </strong>
              <p style={{ margin: '4px 0 0', color: '#047857', fontSize: '0.85rem' }}>
                Vehicle: <strong>{bookingSuccess.vehicle}</strong> • {bookingSuccess.days} Days • Total: {formatPrice(bookingSuccess.amount)} • Pickup: {bookingSuccess.pickup}
              </p>
            </div>
            <button
              type="button"
              className="primary-action"
              onClick={() => setBookingSuccess(null)}
              style={{ padding: '6px 14px', fontSize: '0.8rem' }}
            >
              Done ✓
            </button>
          </div>
        </div>
      )}

      {/* VEHICLES GRID */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(310px, 1fr))', gap: '1.25rem' }}>
        {filteredVehicles.map((vehicle) => (
          <article
            key={vehicle.id}
            className="glass-panel"
            style={{
              borderRadius: '16px',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              transition: 'transform 0.2s ease, box-shadow 0.2s ease',
            }}
          >
            {/* PHOTO BANNER */}
            <div style={{ position: 'relative', height: '175px', overflow: 'hidden' }}>
              <img
                src={vehicle.image}
                alt={vehicle.name}
                loading="lazy"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              <span
                style={{
                  position: 'absolute',
                  top: '12px',
                  left: '12px',
                  background: 'rgba(15, 23, 42, 0.85)',
                  color: 'white',
                  padding: '4px 10px',
                  borderRadius: '20px',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  backdropFilter: 'blur(4px)',
                }}
              >
                {vehicle.type}
              </span>

              <span
                style={{
                  position: 'absolute',
                  top: '12px',
                  right: '12px',
                  background: 'rgba(255, 255, 255, 0.95)',
                  color: '#0f172a',
                  padding: '4px 8px',
                  borderRadius: '12px',
                  fontSize: '0.75rem',
                  fontWeight: 800,
                }}
              >
                ⭐ {vehicle.rating} ({vehicle.reviewsCount})
              </span>
            </div>

            {/* CARD CONTENT */}
            <div style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
              <h3 style={{ margin: '0 0 0.25rem', fontSize: '1.2rem', color: 'var(--text-main)' }}>
                {vehicle.name}
              </h3>

              {/* SPECS ROW */}
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', margin: '0.5rem 0' }}>
                <span className="card-tag" style={{ fontSize: '0.725rem' }}>⛽ {vehicle.fuel}</span>
                <span className="card-tag" style={{ fontSize: '0.725rem' }}>⚙️ {vehicle.transmission}</span>
                <span className="card-tag" style={{ fontSize: '0.725rem' }}>👥 {vehicle.seats} Seats</span>
                <span className="card-tag" style={{ fontSize: '0.725rem' }}>🛣️ {vehicle.mileage}</span>
              </div>

              {/* FEATURES LIST */}
              <ul style={{ margin: '0.5rem 0 1rem', paddingLeft: '1.2rem', fontSize: '0.8rem', color: 'var(--text-muted)', flex: 1 }}>
                {vehicle.features.map((feat, i) => (
                  <li key={i}>{feat}</li>
                ))}
              </ul>

              {/* FOOTER ROW */}
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-end',
                  paddingTop: '0.85rem',
                  borderTop: '1px solid var(--border)',
                }}
              >
                <div>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block' }}>Daily Rental Rate</span>
                  <strong style={{ fontSize: '1.25rem', color: '#0f766e' }}>{formatPrice(vehicle.pricePerDay)}</strong>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}> / 24 hrs</span>
                  {vehicle.deposit > 0 && (
                    <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', display: 'block' }}>
                      Deposit: {formatPrice(vehicle.deposit)} (Refundable)
                    </span>
                  )}
                </div>

                <button
                  type="button"
                  className="primary-action"
                  onClick={() => handleStartBooking(vehicle)}
                  style={{ padding: '8px 18px', fontSize: '0.85rem' }}
                >
                  Book Rental ➔
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* RENTAL BOOKING MODAL */}
      {bookingVehicle && (
        <div className="modal-backdrop" onClick={() => setBookingVehicle(null)}>
          <div className="hotel-compare-modal-window" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '520px' }}>
            <div className="modal-header">
              <div>
                <span className="eyebrow">Instant Rental Reservation</span>
                <h2>{bookingVehicle.name}</h2>
                <p>{bookingVehicle.type} • {bookingVehicle.fuel} • {bookingVehicle.transmission}</p>
              </div>
              <button type="button" className="close-btn" onClick={() => setBookingVehicle(null)}>✕</button>
            </div>

            <form onSubmit={handleConfirmRental} style={{ marginTop: '1.25rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                <label>
                  <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>
                    Pickup Date
                  </span>
                  <input
                    type="date"
                    required
                    value={bookingForm.pickupDate}
                    onChange={(e) => setBookingForm({ ...bookingForm, pickupDate: e.target.value })}
                    style={{ width: '100%', padding: '8px', borderRadius: '8px', border: '1px solid var(--border)' }}
                  />
                </label>

                <label>
                  <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>
                    Duration (Days)
                  </span>
                  <select
                    value={bookingForm.durationDays}
                    onChange={(e) => setBookingForm({ ...bookingForm, durationDays: Number(e.target.value) })}
                    style={{ width: '100%', padding: '8px', borderRadius: '8px', border: '1px solid var(--border)' }}
                  >
                    {[1, 2, 3, 4, 5, 7, 10, 14].map((d) => (
                      <option key={d} value={d}>{d} Day{d > 1 ? 's' : ''}</option>
                    ))}
                  </select>
                </label>
              </div>

              <label>
                <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>
                  Pickup & Drop Location
                </span>
                <input
                  type="text"
                  required
                  placeholder="e.g. Airport Arrival Terminal, Railway Station, or Hotel Name"
                  value={bookingForm.pickupLocation}
                  onChange={(e) => setBookingForm({ ...bookingForm, pickupLocation: e.target.value })}
                  style={{ width: '100%', padding: '8px', borderRadius: '8px', border: '1px solid var(--border)' }}
                />
              </label>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                <label>
                  <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>
                    Full Name
                  </span>
                  <input
                    type="text"
                    required
                    placeholder="Primary Driver"
                    value={bookingForm.customerName}
                    onChange={(e) => setBookingForm({ ...bookingForm, customerName: e.target.value })}
                    style={{ width: '100%', padding: '8px', borderRadius: '8px', border: '1px solid var(--border)' }}
                  />
                </label>

                <label>
                  <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>
                    Mobile Number
                  </span>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                    value={bookingForm.customerPhone}
                    onChange={(e) => setBookingForm({ ...bookingForm, customerPhone: e.target.value })}
                    style={{ width: '100%', padding: '8px', borderRadius: '8px', border: '1px solid var(--border)' }}
                  />
                </label>
              </div>

              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.825rem', color: 'var(--text-muted)' }}>
                <input
                  type="checkbox"
                  required
                  checked={bookingForm.hasLicense}
                  onChange={(e) => setBookingForm({ ...bookingForm, hasLicense: e.target.checked })}
                />
                <span>I confirm primary driver holds a valid Indian Driving License / International Driving Permit.</span>
              </label>

              {/* SUMMARY ROW */}
              <div style={{ background: 'var(--bg-surface-elevated)', padding: '0.85rem', borderRadius: '10px', marginTop: '0.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px', fontSize: '0.85rem' }}>
                  <span>Rental Total ({bookingForm.durationDays} days @ {formatPrice(bookingVehicle.pricePerDay)}/day):</span>
                  <strong>{formatPrice(bookingVehicle.pricePerDay * bookingForm.durationDays)}</strong>
                </div>
                {bookingVehicle.deposit > 0 && (
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                    <span>Refundable Security Deposit (Paid on handover):</span>
                    <span>{formatPrice(bookingVehicle.deposit)}</span>
                  </div>
                )}
              </div>

              <button
                type="submit"
                className="primary-action"
                style={{ padding: '10px', fontSize: '0.95rem', justifyContent: 'center' }}
              >
                Confirm Booking & Generate Voucher ➔
              </button>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}
