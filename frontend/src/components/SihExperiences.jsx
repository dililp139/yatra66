import { useState } from 'react';
import { LOCAL_EXPERIENCES_DATA } from '../services/sihData';

export default function SihExperiences({ onEnquire }) {
  const [filterCity, setFilterCity] = useState('all');

  const filtered = filterCity === 'all'
    ? LOCAL_EXPERIENCES_DATA
    : LOCAL_EXPERIENCES_DATA.filter((exp) => exp.city.toLowerCase() === filterCity.toLowerCase());

  return (
    <div className="sih-experiences-section">
      <div className="section-header-row" style={{ marginBottom: '1.5rem' }}>
        <div>
          <span className="card-tag" style={{ background: 'rgba(234, 88, 12, 0.12)', color: '#ea580c', fontWeight: 800 }}>
            🎨 100% Artisan-Hosted Cultural Immersion
          </span>
          <h2 style={{ fontSize: '1.85rem', margin: '0.4rem 0 0.25rem', color: 'var(--text-main)' }}>
            Experience Real India.
          </h2>
          <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '0.95rem', maxWidth: '680px' }}>
            Hands-on traditional workshops, culinary walks, and village craft masterclasses hosted directly by 5th-generation master artisans with zero middleman markup.
          </p>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
        <button
          type="button"
          className={`quick-pill-tag ${filterCity === 'all' ? 'active' : ''}`}
          onClick={() => setFilterCity('all')}
          style={{ cursor: 'pointer', padding: '6px 14px', borderRadius: '20px' }}
        >
          All Experiences
        </button>
        {['Jaipur', 'Agra', 'Delhi', 'Mumbai', 'Goa'].map((c) => (
          <button
            key={c}
            type="button"
            className={`quick-pill-tag ${filterCity === c.toLowerCase() ? 'active' : ''}`}
            onClick={() => setFilterCity(c.toLowerCase())}
            style={{ cursor: 'pointer', padding: '6px 14px', borderRadius: '20px' }}
          >
            {c}
          </button>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.5rem' }}>
        {filtered.map((exp) => (
          <article
            key={exp.id}
            className="glass-panel"
            style={{
              borderRadius: '16px',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              transition: 'transform 0.25s ease, box-shadow 0.25s ease',
            }}
          >
            <div style={{ position: 'relative', height: '190px', overflow: 'hidden' }}>
              <img
                src={exp.heroImage}
                alt={exp.title}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                onError={(e) => {
                  e.target.src = 'https://images.unsplash.com/photo-1599661046289-e31897846e41?w=800';
                }}
              />
              <div style={{ position: 'absolute', top: '12px', left: '12px' }}>
                <span style={{ background: 'rgba(15, 23, 42, 0.8)', color: 'white', fontSize: '0.75rem', fontWeight: 700, padding: '4px 10px', borderRadius: '20px' }}>
                  📍 {exp.city}
                </span>
              </div>
              <div style={{ position: 'absolute', top: '12px', right: '12px' }}>
                <span style={{ background: '#0f766e', color: 'white', fontSize: '0.8rem', fontWeight: 800, padding: '4px 10px', borderRadius: '20px' }}>
                  ₹{exp.priceInr} / person
                </span>
              </div>
              <div style={{ position: 'absolute', bottom: '8px', left: '12px' }}>
                <span style={{ background: 'rgba(255, 255, 255, 0.92)', color: '#0f172a', fontSize: '0.75rem', fontWeight: 700, padding: '3px 8px', borderRadius: '6px' }}>
                  ⏳ {exp.duration}
                </span>
              </div>
            </div>

            <div style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
              <h3 style={{ margin: '0 0 0.35rem', fontSize: '1.15rem', color: 'var(--text-main)' }}>
                {exp.title}
              </h3>
              <p style={{ margin: '0 0 0.75rem', fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.45, flex: 1 }}>
                {exp.description}
              </p>

              <div style={{ background: 'var(--bg-surface-elevated, #f8fafc)', padding: '0.65rem 0.85rem', borderRadius: '10px', fontSize: '0.8rem', marginBottom: '0.85rem' }}>
                <div style={{ fontWeight: 700, color: 'var(--text-main)', marginBottom: '2px' }}>
                  👤 Host: {exp.hostName} ({exp.hostBadge})
                </div>
                <div style={{ color: '#059669', fontSize: '0.75rem', fontWeight: 600 }}>
                  🎁 Includes: {exp.inclusions}
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto', paddingTop: '0.5rem', borderTop: '1px solid var(--border-color, #e2e8f0)' }}>
                <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#f59e0b' }}>
                  ⭐ {exp.rating} ({exp.reviewsCount} reviews)
                </span>
                <button
                  type="button"
                  className="primary-action"
                  style={{ padding: '6px 14px', fontSize: '0.8rem' }}
                  onClick={() => {
                    if (onEnquire) {
                      onEnquire({
                        id: exp.id,
                        name: exp.title,
                        category: 'Cultural Experience',
                        city: exp.city,
                        directRate: `₹${exp.priceInr} / person`,
                        contactEmail: 'host@yatra66.in',
                      });
                    }
                  }}
                >
                  Book Direct ➔
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
