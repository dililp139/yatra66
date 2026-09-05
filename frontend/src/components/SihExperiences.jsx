import { useState, useMemo } from 'react';
import { LOCAL_EXPERIENCES_DATA } from '../services/sihData';

const EXP_CATEGORIES = [
  { id: 'all', label: 'All Experiences', icon: '✨' },
  { id: 'Handicrafts & Art', label: 'Artisan Crafts & Textiles', icon: '🧵' },
  { id: 'Food & Cooking', label: 'Culinary Masterclasses', icon: '🍲' },
  { id: 'Heritage Craft', label: 'Historic Crafts', icon: '🏛️' },
  { id: 'Food & History', label: 'Night Walks & Food', icon: '🌙' },
  { id: 'Culture & Community', label: 'Community Trails', icon: '🤝' },
  { id: 'Nature & Agriculture', label: 'Spice Trails & Nature', icon: '🌿' },
];

export default function SihExperiences({
  onEnquire,
  onOpenBooking,
  formatPrice = (p) => `₹${Number(p).toLocaleString('en-IN')}`,
  setPage,
  setSelectedId,
}) {
  const [filterCity, setFilterCity] = useState('all');
  const [filterCategory, setFilterCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const availableCities = useMemo(() => {
    const list = ['all'];
    LOCAL_EXPERIENCES_DATA.forEach((exp) => {
      const c = exp.cityName || exp.city;
      if (c && !list.includes(c.toLowerCase())) list.push(c.toLowerCase());
    });
    return list;
  }, []);

  const filtered = useMemo(() => {
    return LOCAL_EXPERIENCES_DATA.filter((exp) => {
      const cName = (exp.cityName || exp.city || '').toLowerCase();
      const matchCity = filterCity === 'all' || cName === filterCity.toLowerCase();
      const matchCat = filterCategory === 'all' || exp.category === filterCategory;
      const q = searchQuery.trim().toLowerCase();
      const matchSearch = !q || (
        exp.title.toLowerCase().includes(q) ||
        (exp.shortDesc || exp.description || '').toLowerCase().includes(q) ||
        cName.includes(q) ||
        (exp.host || exp.hostName || '').toLowerCase().includes(q)
      );
      return matchCity && matchCat && matchSearch;
    });
  }, [filterCity, filterCategory, searchQuery]);

  return (
    <div className="sih-experiences-section" style={{ paddingBottom: '3rem' }}>
      {/* HEADER BANNER */}
      <div className="glass-panel" style={{ padding: '1.75rem', borderRadius: '18px', marginBottom: '1.75rem', borderLeft: '5px solid #ea580c' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <span className="card-tag" style={{ background: 'rgba(234, 88, 12, 0.12)', color: '#ea580c', fontWeight: 800 }}>
              🎨 100% Artisan-Hosted Cultural Immersion
            </span>
            <h2 style={{ fontSize: '1.9rem', margin: '0.4rem 0 0.25rem', color: 'var(--text-main)' }}>
              Experience Real India.
            </h2>
            <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '0.95rem', maxWidth: '720px' }}>
              Hands-on traditional workshops, culinary walks, and village craft masterclasses hosted directly by 5th-generation master artisans with <strong>zero middleman markup</strong>.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '1rem' }}>
            <div style={{ textAlign: 'center', background: 'var(--bg-surface, #ffffff)', padding: '8px 16px', borderRadius: '12px', border: '1px solid var(--border)' }}>
              <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#ea580c' }}>{LOCAL_EXPERIENCES_DATA.length}+</div>
              <div style={{ fontSize: '0.725rem', color: 'var(--text-muted)' }}>Curated Workshops</div>
            </div>
            <div style={{ textAlign: 'center', background: 'var(--bg-surface, #ffffff)', padding: '8px 16px', borderRadius: '12px', border: '1px solid var(--border)' }}>
              <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#10b981' }}>100%</div>
              <div style={{ fontSize: '0.725rem', color: 'var(--text-muted)' }}>Artisan Direct</div>
            </div>
          </div>
        </div>

        {/* SEARCH & FILTERS */}
        <div style={{ marginTop: '1.25rem', paddingTop: '1.25rem', borderTop: '1px solid var(--border)', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {/* Keyword Search */}
          <input
            type="text"
            className="market-search-input"
            placeholder="🔍 Search workshops (e.g. Block Printing, Cooking Thali, Marble Inlay, Pottery, Sufi Walk)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />

          {/* City Pills */}
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', alignItems: 'center' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)' }}>📍 City:</span>
            <button
              type="button"
              className={`quick-pill-tag ${filterCity === 'all' ? 'active' : ''}`}
              onClick={() => setFilterCity('all')}
              style={{ padding: '5px 12px', fontSize: '0.8rem', borderRadius: '20px' }}
            >
              All India
            </button>
            {['Jaipur', 'Agra', 'Delhi', 'Mumbai', 'Goa'].map((c) => (
              <button
                key={c}
                type="button"
                className={`quick-pill-tag ${filterCity === c.toLowerCase() ? 'active' : ''}`}
                onClick={() => setFilterCity(c.toLowerCase())}
                style={{ padding: '5px 12px', fontSize: '0.8rem', borderRadius: '20px' }}
              >
                {c}
              </button>
            ))}
          </div>

          {/* Category Pills */}
          <div style={{ display: 'flex', gap: '0.45rem', flexWrap: 'wrap', alignItems: 'center' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)' }}>🏷️ Theme:</span>
            {EXP_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                type="button"
                className={`quick-pill-tag ${filterCategory === cat.id ? 'active' : ''}`}
                onClick={() => setFilterCategory(cat.id)}
                style={{ padding: '4px 10px', fontSize: '0.75rem', borderRadius: '14px' }}
              >
                {cat.icon} {cat.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* EXPERIENCES GRID */}
      {filtered.length === 0 ? (
        <div className="glass-panel" style={{ padding: '3rem', textAlign: 'center', borderRadius: '16px' }}>
          <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>🎨</div>
          <h3 style={{ margin: 0, color: 'var(--text-main)' }}>No matching artisan experiences found</h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '0.5rem' }}>
            Try resetting your filters to explore all artisan masterclasses across India.
          </p>
          <button
            type="button"
            className="primary-action"
            onClick={() => { setFilterCity('all'); setFilterCategory('all'); setSearchQuery(''); }}
            style={{ marginTop: '1rem', padding: '8px 18px' }}
          >
            Reset All Filters
          </button>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(330px, 1fr))', gap: '1.5rem' }}>
          {filtered.map((exp) => {
            const cityName = exp.cityName || exp.city || 'India';
            const imageUrl = exp.imageUrl || exp.heroImage || 'https://images.unsplash.com/photo-1600100397608-f010f443a9fb?w=800&q=80';
            const shortDesc = exp.shortDesc || exp.description || 'Authentic artisan immersion session with verified local masters.';
            const duration = exp.durationHours ? `${exp.durationHours} Hours` : (exp.duration || '3 Hours');
            const hostName = exp.host || exp.hostName || 'Master Artisan Guild';
            const inclusions = Array.isArray(exp.included) ? exp.included : ['Materials Included', 'Hands-on Guidance', 'Refreshments'];
            const price = exp.priceInr || 1200;

            return (
              <article
                key={exp.id}
                className="glass-panel"
                style={{
                  borderRadius: '16px',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                  background: 'var(--bg-surface, #ffffff)',
                  border: '1px solid var(--border)',
                  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.04)',
                  transition: 'transform 0.25s ease, box-shadow 0.25s ease',
                }}
              >
                {/* Visual Header Banner */}
                <div style={{ position: 'relative', height: '195px', overflow: 'hidden' }}>
                  <img
                    src={imageUrl}
                    alt={exp.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    onError={(e) => {
                      e.target.src = 'https://images.unsplash.com/photo-1600100397608-f010f443a9fb?w=800&q=80';
                    }}
                  />
                  <div style={{ position: 'absolute', top: '12px', left: '12px' }}>
                    <span style={{ background: 'rgba(15, 23, 42, 0.85)', color: 'white', fontSize: '0.75rem', fontWeight: 700, padding: '4px 10px', borderRadius: '20px', backdropFilter: 'blur(4px)' }}>
                      📍 {cityName}
                    </span>
                  </div>
                  <div style={{ position: 'absolute', top: '12px', right: '12px' }}>
                    <span style={{ background: '#0f766e', color: 'white', fontSize: '0.825rem', fontWeight: 800, padding: '4px 11px', borderRadius: '20px', boxShadow: '0 2px 8px rgba(0,0,0,0.3)' }}>
                      {formatPrice(price)} / person
                    </span>
                  </div>
                  <div style={{ position: 'absolute', bottom: '8px', left: '12px' }}>
                    <span style={{ background: 'rgba(255, 255, 255, 0.95)', color: '#0f172a', fontSize: '0.75rem', fontWeight: 700, padding: '3px 8px', borderRadius: '6px' }}>
                      ⏳ {duration}
                    </span>
                  </div>
                  {exp.sustainabilityBadge && (
                    <div style={{ position: 'absolute', bottom: '8px', right: '12px' }}>
                      <span style={{ background: 'rgba(16, 185, 129, 0.95)', color: 'white', fontSize: '0.7rem', fontWeight: 700, padding: '3px 8px', borderRadius: '6px' }}>
                        🌱 Eco Verified
                      </span>
                    </div>
                  )}
                </div>

                {/* Card Content Body */}
                <div style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '8px', marginBottom: '0.35rem' }}>
                    <h3 style={{ margin: 0, fontSize: '1.125rem', color: 'var(--text-main)', fontWeight: 800, lineHeight: 1.3 }}>
                      {exp.title}
                    </h3>
                  </div>

                  <p style={{ margin: '0 0 0.75rem', fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.45, flex: 1 }}>
                    {shortDesc}
                  </p>

                  {/* Host & Inclusions Pill Box */}
                  <div style={{ background: 'var(--bg-surface-elevated, #f8fafc)', padding: '0.75rem', borderRadius: '10px', fontSize: '0.8rem', marginBottom: '0.85rem', border: '1px solid var(--border)' }}>
                    <div style={{ fontWeight: 700, color: 'var(--text-main)', marginBottom: '4px' }}>
                      👤 Host: {hostName}
                    </div>
                    <div style={{ color: 'var(--text-muted)', fontSize: '0.75rem', display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                      {inclusions.slice(0, 3).map((inc, iIdx) => (
                        <span key={iIdx} style={{ background: 'rgba(15, 118, 110, 0.08)', color: '#0f766e', padding: '1px 6px', borderRadius: '4px', fontWeight: 600 }}>
                          ✓ {inc}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Rating & Action Buttons */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto', paddingTop: '0.75rem', borderTop: '1px solid var(--border-color, #e2e8f0)', flexWrap: 'wrap', gap: '0.5rem' }}>
                    <span style={{ fontSize: '0.825rem', fontWeight: 800, color: '#f59e0b' }}>
                      ⭐ {exp.rating || 4.9} ({exp.reviewsCount || 120} reviews)
                    </span>

                    <div style={{ display: 'flex', gap: '0.4rem' }}>
                      {/* WhatsApp Host Direct Button */}
                      <a
                        href={`https://wa.me/919829014520?text=${encodeURIComponent(`Hello! I want to book the "${exp.title}" in ${cityName} on Yatra 66.`)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '4px',
                          padding: '6px 10px',
                          borderRadius: '8px',
                          background: '#25D366',
                          color: 'white',
                          textDecoration: 'none',
                          fontSize: '0.78rem',
                          fontWeight: 700,
                        }}
                        title="Chat with host on WhatsApp"
                      >
                        <span>💬</span>
                      </a>

                      {/* Working Book Direct Button */}
                      <button
                        type="button"
                        className="primary-action"
                        style={{ padding: '6px 14px', fontSize: '0.8rem' }}
                        onClick={() => {
                          if (onOpenBooking) {
                            onOpenBooking('experience', exp.title, price, exp.cityId || 1, cityName);
                          } else if (onEnquire) {
                            onEnquire({
                              id: exp.id,
                              name: exp.title,
                              category: 'Cultural Experience',
                              city: cityName,
                              directRate: `${formatPrice(price)} / person`,
                              contactEmail: 'artisan@yatra66.in',
                            });
                          }
                        }}
                      >
                        Book Direct ➔
                      </button>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}
