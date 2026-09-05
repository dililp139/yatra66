import { useState, useMemo } from 'react';
import { HIDDEN_GEMS_DATA } from '../services/sihData';

export default function SihHiddenGems({ onPlanForCity }) {
  const [filterCity, setFilterCity] = useState('all');
  const [activeTheme, setActiveTheme] = useState('all');

  const filteredGems = useMemo(() => {
    return HIDDEN_GEMS_DATA.filter((gem) => {
      const matchCity = filterCity === 'all' || gem.nearCity.toLowerCase() === filterCity.toLowerCase();
      const matchTheme = activeTheme === 'all' || gem.themes.includes(activeTheme);
      return matchCity && matchTheme;
    });
  }, [filterCity, activeTheme]);

  return (
    <div className="sih-hidden-gems-section">
      <div className="section-header-row" style={{ marginBottom: '1.5rem' }}>
        <div>
          <span className="card-tag" style={{ background: 'rgba(16, 185, 129, 0.12)', color: '#059669', fontWeight: 800 }}>
            🌿 Eco-Smart Tourism: Hotspot Decongestion
          </span>
          <h2 style={{ fontSize: '1.85rem', margin: '0.4rem 0 0.25rem', color: 'var(--text-main)' }}>
            Go Beyond the Famous.
          </h2>
          <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '0.95rem', maxWidth: '680px' }}>
            Decongesting overcrowded tourist hubs by spotlighting secret architectural marvels, tranquil stepwells, and artisan villages within 2 hours of major cities.
          </p>
        </div>
      </div>

      {/* FILTER BUTTONS */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', marginBottom: '1.5rem' }}>
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          <button
            type="button"
            className={`quick-pill-tag ${filterCity === 'all' ? 'active' : ''}`}
            onClick={() => setFilterCity('all')}
            style={{ cursor: 'pointer', padding: '6px 14px', borderRadius: '20px' }}
          >
            All Locations
          </button>
          {['Jaipur', 'Agra', 'Delhi', 'Mumbai', 'Goa'].map((c) => (
            <button
              key={c}
              type="button"
              className={`quick-pill-tag ${filterCity === c.toLowerCase() ? 'active' : ''}`}
              onClick={() => setFilterCity(c.toLowerCase())}
              style={{ cursor: 'pointer', padding: '6px 14px', borderRadius: '20px' }}
            >
              Near {c}
            </button>
          ))}
        </div>

        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          <span style={{ fontSize: '0.8rem', fontWeight: 700, alignSelf: 'center', color: 'var(--text-muted)' }}>Theme:</span>
          {['all', 'heritage', 'nature', 'spiritual', 'art'].map((th) => (
            <button
              key={th}
              type="button"
              className={`quick-pill-tag ${activeTheme === th ? 'active' : ''}`}
              onClick={() => setActiveTheme(th)}
              style={{ cursor: 'pointer', padding: '4px 10px', borderRadius: '14px', fontSize: '0.75rem' }}
            >
              {th === 'all' ? 'All Themes' : '#' + th}
            </button>
          ))}
        </div>
      </div>

      {/* GEMS CARDS GRID */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.5rem' }}>
        {filteredGems.map((gem) => (
          <article
            key={gem.id}
            className="glass-panel"
            style={{
              overflow: 'hidden',
              borderRadius: '16px',
              display: 'flex',
              flexDirection: 'column',
              transition: 'transform 0.25s ease, box-shadow 0.25s ease',
            }}
          >
            <div style={{ position: 'relative', height: '180px', overflow: 'hidden' }}>
              <img
                src={gem.heroImage}
                alt={gem.name}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                onError={(e) => {
                  e.target.src = 'https://images.unsplash.com/photo-1599661046289-e31897846e41?w=800';
                }}
              />
              <div style={{ position: 'absolute', top: '12px', left: '12px', display: 'flex', gap: '6px' }}>
                <span style={{ background: 'rgba(15, 23, 42, 0.75)', backdropFilter: 'blur(6px)', color: 'white', fontSize: '0.75rem', fontWeight: 700, padding: '4px 10px', borderRadius: '20px' }}>
                  📍 {gem.distanceFromHub}
                </span>
              </div>
              <div style={{ position: 'absolute', top: '12px', right: '12px' }}>
                <span style={{ background: 'rgba(16, 185, 129, 0.9)', backdropFilter: 'blur(6px)', color: 'white', fontSize: '0.75rem', fontWeight: 800, padding: '4px 10px', borderRadius: '20px' }}>
                  ⚡ {gem.decongestionScore}% Decongestion
                </span>
              </div>
              <div style={{ position: 'absolute', bottom: '8px', left: '12px' }}>
                <span style={{ background: 'rgba(234, 88, 12, 0.9)', color: 'white', fontSize: '0.7rem', fontWeight: 800, padding: '3px 8px', borderRadius: '6px', textTransform: 'uppercase' }}>
                  Near {gem.nearCity}
                </span>
              </div>
            </div>

            <div style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
              <h3 style={{ margin: '0 0 0.35rem', fontSize: '1.15rem', color: 'var(--text-main)' }}>
                {gem.name}
              </h3>
              <p style={{ margin: '0 0 0.75rem', fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.45, flex: 1 }}>
                {gem.description}
              </p>

              <div style={{ background: 'var(--bg-surface-elevated, #f8fafc)', padding: '0.65rem 0.85rem', borderRadius: '10px', fontSize: '0.775rem', marginBottom: '0.85rem' }}>
                <div style={{ color: '#0f766e', fontWeight: 700, marginBottom: '2px' }}>
                  ✨ Why Visit: {gem.whyVisit}
                </div>
                <div style={{ color: 'var(--text-muted)' }}>
                  🚗 Transit: {gem.howToReach}
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto', paddingTop: '0.5rem', borderTop: '1px solid var(--border-color, #e2e8f0)' }}>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                  🗓️ Best: <strong>{gem.bestTimeToVisit}</strong>
                </span>
                <button
                  type="button"
                  className="secondary-action"
                  style={{ padding: '6px 12px', fontSize: '0.8rem' }}
                  onClick={() => {
                    if (onPlanForCity) onPlanForCity(gem.nearCity);
                  }}
                >
                  Plan Day Trip ➔
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
