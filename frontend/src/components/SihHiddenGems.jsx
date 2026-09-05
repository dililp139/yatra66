import { useState, useMemo } from 'react';
import {
  HIDDEN_GEMS_DATA,
  DESTINATION_OPPORTUNITY_DATA,
  CROWD_DECONGESTION_DATA,
} from '../services/sihData';

export default function SihHiddenGems({ onPlanForCity }) {
  const [activeTab, setActiveTab] = useState('gems'); // 'gems' | 'boost' | 'crowd'
  const [filterCity, setFilterCity] = useState('all');
  const [activeTheme, setActiveTheme] = useState('all');
  const [selectedCongestionCity, setSelectedCongestionCity] = useState('Jaipur');

  // Filtered gems
  const filteredGems = useMemo(() => {
    return HIDDEN_GEMS_DATA.filter((gem) => {
      const gCity = (gem.nearCity || gem.cityName || '').toLowerCase();
      const matchCity = filterCity === 'all' || gCity.includes(filterCity.toLowerCase());
      const gThemes = gem.themes || [];
      const matchTheme = activeTheme === 'all' || gThemes.includes(activeTheme.toLowerCase());
      return matchCity && matchTheme;
    });
  }, [filterCity, activeTheme]);

  // Selected congestion data
  const currentCongestion = useMemo(() => {
    return (
      CROWD_DECONGESTION_DATA.find(
        (c) => c.city.toLowerCase() === selectedCongestionCity.toLowerCase()
      ) || CROWD_DECONGESTION_DATA[0]
    );
  }, [selectedCongestionCity]);

  return (
    <div className="sih-hidden-gems-section">
      {/* SECTION BANNER */}
      <div className="section-header-row" style={{ marginBottom: '1.5rem' }}>
        <div>
          <span
            className="card-tag"
            style={{
              background: 'rgba(16, 185, 129, 0.12)',
              color: '#059669',
              fontWeight: 800,
              fontSize: '0.8rem',
              padding: '4px 12px',
              borderRadius: '12px',
            }}
          >
            🌿 Sustainable India: Tourist Decongestion & Economic Equity
          </span>
          <h2 style={{ fontSize: '2rem', margin: '0.4rem 0 0.25rem', color: 'var(--text-main)', fontWeight: 800 }}>
            “Hidden India” & Lesser-Known Destinations
          </h2>
          <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '0.95rem', maxWidth: '780px', lineHeight: 1.5 }}>
            Distribute tourist spending beyond saturated mega-monuments. Explore tranquil stepwells, medieval river citadels, living root bridges, and authentic artisan villages.
          </p>
        </div>
      </div>

      {/* TOP COMPARATIVE CALLOUT: Going to Jaipur? Amber Fort vs Gaitore / Samode */}
      <div
        style={{
          background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.1), rgba(16, 185, 129, 0.1))',
          border: '1.5px dashed #0f766e',
          borderRadius: '18px',
          padding: '1.25rem 1.5rem',
          marginBottom: '1.75rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1rem',
        }}
      >
        <div style={{ maxWidth: '640px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <span style={{ fontSize: '1.25rem' }}>💡</span>
            <strong style={{ color: 'var(--text-main)', fontSize: '1rem' }}>
              The SIH Tourism Multiplier Effect:
            </strong>
          </div>
          <p style={{ margin: 0, fontSize: '0.875rem', color: 'var(--text-muted)', lineHeight: 1.45 }}>
            Going to Jaipur? Instead of only waiting 60 minutes in line at Amber Fort, discover nearby <strong>Royal Gaitore</strong> (15 mins away, tranquil marble cenotaphs), <strong>Samode Palace & weavers</strong>, and <strong>Chandlai Lake flamingos</strong>. 
          </p>
        </div>
        <button
          type="button"
          className="primary-action"
          style={{ padding: '8px 18px', borderRadius: '10px', fontSize: '0.85rem' }}
          onClick={() => setActiveTab('crowd')}
        >
          🌱 View Live Crowd Routing ➔
        </button>
      </div>

      {/* 3 SUB-NAVIGATION TABS */}
      <div
        style={{
          display: 'flex',
          gap: '0.5rem',
          borderBottom: '1px solid var(--border-color, #e2e8f0)',
          paddingBottom: '0.75rem',
          marginBottom: '1.5rem',
          flexWrap: 'wrap',
        }}
      >
        {[
          { id: 'gems', label: '🗺️ Hidden India Destinations' },
          { id: 'boost', label: '🚀 “Boost This Destination” Opportunity Score' },
          { id: 'crowd', label: '🌱 Live Crowd-Balancing & Decongestion' },
        ].map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id)}
            style={{
              background: activeTab === tab.id ? 'var(--brand-primary, #0f766e)' : 'var(--bg-surface-elevated, #f1f5f9)',
              color: activeTab === tab.id ? '#ffffff' : 'var(--text-main, #0f172a)',
              fontWeight: activeTab === tab.id ? 700 : 500,
              border: 'none',
              padding: '8px 18px',
              borderRadius: '20px',
              cursor: 'pointer',
              fontSize: '0.875rem',
              transition: 'all 0.2s ease',
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* TAB 1: HIDDEN GEMS GALLERY */}
      {activeTab === 'gems' && (
        <div>
          {/* FILTER CONTROLS */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.5rem' }}>
            <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', alignItems: 'center' }}>
              <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)', marginRight: '4px' }}>
                Region / Hub:
              </span>
              {['all', 'Jaipur', 'Agra', 'Delhi', 'Goa', 'Shillong', 'Manali'].map((c) => (
                <button
                  key={c}
                  type="button"
                  className={`quick-pill-tag ${filterCity.toLowerCase() === c.toLowerCase() ? 'active' : ''}`}
                  onClick={() => setFilterCity(c.toLowerCase())}
                  style={{
                    cursor: 'pointer',
                    padding: '5px 14px',
                    borderRadius: '16px',
                    fontSize: '0.8rem',
                    border: 'none',
                    background: filterCity.toLowerCase() === c.toLowerCase() ? 'var(--text-main)' : 'var(--bg-surface-elevated, #f1f5f9)',
                    color: filterCity.toLowerCase() === c.toLowerCase() ? 'var(--bg-surface)' : 'var(--text-main)',
                    fontWeight: filterCity.toLowerCase() === c.toLowerCase() ? 700 : 500,
                  }}
                >
                  {c === 'all' ? 'All Locations' : `Near ${c}`}
                </button>
              ))}
            </div>

            <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', alignItems: 'center' }}>
              <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)', marginRight: '4px' }}>
                Theme:
              </span>
              {['all', 'heritage', 'nature', 'spiritual', 'art', 'stepwells', 'offbeat'].map((th) => (
                <button
                  key={th}
                  type="button"
                  className={`quick-pill-tag ${activeTheme === th ? 'active' : ''}`}
                  onClick={() => setActiveTheme(th)}
                  style={{
                    cursor: 'pointer',
                    padding: '4px 12px',
                    borderRadius: '14px',
                    fontSize: '0.75rem',
                    border: 'none',
                    background: activeTheme === th ? '#0f766e' : 'var(--bg-surface-elevated, #f1f5f9)',
                    color: activeTheme === th ? '#ffffff' : 'var(--text-main)',
                    fontWeight: activeTheme === th ? 700 : 500,
                  }}
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
                  borderRadius: '18px',
                  display: 'flex',
                  flexDirection: 'column',
                  border: '1px solid var(--border-color, #e2e8f0)',
                  background: 'var(--bg-surface, #ffffff)',
                  boxShadow: '0 8px 24px rgba(0,0,0,0.04)',
                }}
              >
                <div style={{ position: 'relative', height: '185px', overflow: 'hidden' }}>
                  <img
                    src={gem.heroImage || gem.imageUrl}
                    alt={gem.name}
                    loading="lazy"
                    onError={(e) => {
                      e.target.src = 'https://images.unsplash.com/photo-1477587458883-47145ed94245?w=800';
                    }}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  <div style={{ position: 'absolute', top: '12px', left: '12px', display: 'flex', gap: '6px' }}>
                    <span
                      style={{
                        background: 'rgba(15, 23, 42, 0.85)',
                        color: 'white',
                        fontSize: '0.75rem',
                        fontWeight: 700,
                        padding: '4px 10px',
                        borderRadius: '20px',
                      }}
                    >
                      📍 {gem.distanceFromHub || `${gem.distanceFromCenterKm || 15} km`}
                    </span>
                  </div>
                  <div style={{ position: 'absolute', top: '12px', right: '12px' }}>
                    <span
                      style={{
                        background: 'rgba(16, 185, 129, 0.95)',
                        color: 'white',
                        fontSize: '0.75rem',
                        fontWeight: 800,
                        padding: '4px 10px',
                        borderRadius: '20px',
                      }}
                    >
                      ⚡ {gem.decongestionScore || 90}% Decongestion
                    </span>
                  </div>
                  <div style={{ position: 'absolute', bottom: '8px', left: '12px' }}>
                    <span
                      style={{
                        background: 'rgba(234, 88, 12, 0.95)',
                        color: 'white',
                        fontSize: '0.72rem',
                        fontWeight: 800,
                        padding: '3px 8px',
                        borderRadius: '6px',
                        textTransform: 'uppercase',
                      }}
                    >
                      {gem.cityName || gem.nearCity}
                    </span>
                  </div>
                </div>

                <div style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
                  <h3 style={{ margin: '0 0 0.35rem', fontSize: '1.15rem', color: 'var(--text-main)', fontWeight: 700 }}>
                    {gem.name}
                  </h3>
                  <div style={{ fontSize: '0.8rem', color: '#0f766e', fontWeight: 600, marginBottom: '0.5rem' }}>
                    ✨ {gem.tag || gem.whyVisit}
                  </div>
                  <p style={{ margin: '0 0 0.75rem', fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.45, flex: 1 }}>
                    {gem.shortDesc || gem.description}
                  </p>

                  <div
                    style={{
                      background: 'var(--bg-surface-elevated, #f8fafc)',
                      padding: '0.65rem 0.85rem',
                      borderRadius: '10px',
                      fontSize: '0.775rem',
                      marginBottom: '0.85rem',
                      border: '1px solid var(--border-color, #e2e8f0)',
                    }}
                  >
                    <div style={{ color: 'var(--text-muted)', marginBottom: '3px' }}>
                      🚗 <strong>Transit:</strong> {gem.howToReach || 'Easily accessible via local transport or cab.'}
                    </div>
                    {gem.nearbyStay && (
                      <div style={{ color: '#059669', fontWeight: 600 }}>
                        🏡 <strong>Local Stay:</strong> {gem.nearbyStay}
                      </div>
                    )}
                  </div>

                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginTop: 'auto',
                      paddingTop: '0.5rem',
                      borderTop: '1px solid var(--border-color, #e2e8f0)',
                    }}
                  >
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                      🗓️ Best: <strong>{gem.bestTimeToVisit || gem.bestTime}</strong>
                    </span>
                    <button
                      type="button"
                      className="secondary-action"
                      style={{ padding: '6px 14px', fontSize: '0.8rem', borderRadius: '8px', fontWeight: 700 }}
                      onClick={() => {
                        if (onPlanForCity) onPlanForCity(gem.cityName || gem.nearCity);
                      }}
                    >
                      Plan Route ➔
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: "BOOST THIS DESTINATION" OPPORTUNITY SCORE */}
      {activeTab === 'boost' && (
        <div>
          <div style={{ marginBottom: '1.5rem' }}>
            <h3 style={{ fontSize: '1.25rem', margin: '0 0 0.4rem', color: 'var(--text-main)' }}>
              🚀 Destination Opportunity Score Algorithm
            </h3>
            <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '0.9rem', maxWidth: '750px' }}>
              Our proprietary SIH Opportunity Score identifies lesser-known heritage hubs with exceptional architectural richness, strong infrastructure, and low crowding that need tourism distribution.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '1.5rem' }}>
            {DESTINATION_OPPORTUNITY_DATA.map((opp) => (
              <article
                key={opp.id}
                className="glass-panel"
                style={{
                  borderRadius: '18px',
                  overflow: 'hidden',
                  border: '1px solid var(--border-color, #e2e8f0)',
                  background: 'var(--bg-surface, #ffffff)',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <div style={{ position: 'relative', height: '170px', overflow: 'hidden' }}>
                  <img
                    src={opp.heroImage}
                    alt={opp.name}
                    loading="lazy"
                    onError={(e) => {
                      e.target.src = 'https://images.unsplash.com/photo-1477587458883-47145ed94245?w=800';
                    }}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  <div
                    style={{
                      position: 'absolute',
                      top: '12px',
                      right: '12px',
                      background: 'rgba(15, 118, 110, 0.95)',
                      color: '#ffffff',
                      fontSize: '0.9rem',
                      fontWeight: 800,
                      padding: '4px 12px',
                      borderRadius: '14px',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
                    }}
                  >
                    Score: {opp.opportunityScore} / 100
                  </div>
                  <div style={{ position: 'absolute', bottom: '10px', left: '12px' }}>
                    <span
                      style={{
                        background: 'rgba(15, 23, 42, 0.85)',
                        color: '#ffffff',
                        fontSize: '0.75rem',
                        fontWeight: 700,
                        padding: '3px 10px',
                        borderRadius: '12px',
                      }}
                    >
                      {opp.badge}
                    </span>
                  </div>
                </div>

                <div style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '0.4rem' }}>
                    <h4 style={{ margin: 0, fontSize: '1.25rem', color: 'var(--text-main)' }}>
                      {opp.name}, <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>{opp.state}</span>
                    </h4>
                    <span style={{ fontSize: '0.8rem', color: '#10b981', fontWeight: 700 }}>
                      {opp.searchGrowthMoM} searches
                    </span>
                  </div>

                  <div
                    style={{
                      background: 'var(--bg-surface-elevated, #f8fafc)',
                      padding: '0.75rem',
                      borderRadius: '12px',
                      margin: '0.5rem 0 0.85rem',
                      border: '1px solid var(--border-color, #e2e8f0)',
                      fontSize: '0.775rem',
                      display: 'grid',
                      gridTemplateColumns: '1fr 1fr',
                      gap: '6px',
                    }}
                  >
                    <div>
                      🏛️ <strong>Attractions:</strong> {opp.attractionsScore}/100
                    </div>
                    <div>
                      🚆 <strong>Infrastructure:</strong> {opp.infraScore}/100
                    </div>
                    <div>
                      🌱 <strong>Crowding:</strong> {opp.crowdIndex}
                    </div>
                    <div>
                      💰 <strong>Local Yield:</strong> {opp.economicMultiplier}
                    </div>
                  </div>

                  <p style={{ fontSize: '0.825rem', color: 'var(--text-muted)', lineHeight: 1.45, margin: '0 0 0.85rem' }}>
                    {opp.whyBoost}
                  </p>

                  <div style={{ fontSize: '0.75rem', color: '#ea580c', fontWeight: 600, marginBottom: '1rem' }}>
                    🔄 Peaceful Alternative to: <strong>{opp.famousAlternativeTo}</strong>
                  </div>

                  <button
                    type="button"
                    className="primary-action"
                    style={{ marginTop: 'auto', width: '100%', padding: '9px', borderRadius: '10px', fontSize: '0.85rem' }}
                    onClick={() => {
                      if (onPlanForCity) onPlanForCity(opp.name);
                    }}
                  >
                    ✨ Boost & Plan Trip to {opp.name} ➔
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: LIVE CROWD-BALANCING & DECONGESTION ROUTER */}
      {activeTab === 'crowd' && (
        <div>
          {/* CITY PICKER */}
          <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem', flexWrap: 'wrap', alignItems: 'center' }}>
            <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-muted)' }}>Select Tourist Hub:</span>
            {CROWD_DECONGESTION_DATA.map((cd) => (
              <button
                key={cd.city}
                type="button"
                onClick={() => setSelectedCongestionCity(cd.city)}
                style={{
                  padding: '6px 14px',
                  borderRadius: '16px',
                  border: 'none',
                  background: selectedCongestionCity === cd.city ? 'var(--brand-primary, #0f766e)' : 'var(--bg-surface-elevated, #f1f5f9)',
                  color: selectedCongestionCity === cd.city ? '#ffffff' : 'var(--text-main)',
                  fontWeight: selectedCongestionCity === cd.city ? 700 : 500,
                  cursor: 'pointer',
                  fontSize: '0.85rem',
                }}
              >
                📍 {cd.city}
              </button>
            ))}
          </div>

          {/* HOTSPOT VS ALTERNATIVES COMPARISON CONTAINER */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '1.5rem',
            }}
          >
            {/* CONGESTED HOTSPOT (RED) */}
            <div
              className="glass-panel"
              style={{
                borderRadius: '20px',
                padding: '1.5rem',
                border: '2px solid #ef4444',
                background: 'rgba(239, 68, 68, 0.03)',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '0.75rem' }}>
                <span
                  style={{
                    width: '14px',
                    height: '14px',
                    borderRadius: '50%',
                    background: '#ef4444',
                    display: 'inline-block',
                    boxShadow: '0 0 10px #ef4444',
                  }}
                />
                <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#ef4444', textTransform: 'uppercase' }}>
                  🔴 High Congestion Warning ({currentCongestion.hotspot.crowdPercent}% Capacity)
                </span>
              </div>

              <h3 style={{ margin: '0 0 0.4rem', fontSize: '1.4rem', color: 'var(--text-main)' }}>
                {currentCongestion.hotspot.name}
              </h3>
              <div style={{ fontSize: '0.85rem', color: '#b91c1c', fontWeight: 600, marginBottom: '0.85rem' }}>
                ⏳ Queue Delay: {currentCongestion.hotspot.waitTime}
              </div>

              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.5, marginBottom: '1rem' }}>
                {currentCongestion.hotspot.note}
              </p>

              <div
                style={{
                  background: 'var(--bg-surface, #ffffff)',
                  padding: '0.85rem',
                  borderRadius: '12px',
                  border: '1px solid var(--border-color, #e2e8f0)',
                  fontSize: '0.8rem',
                  marginTop: 'auto',
                }}
              >
                ⚠️ <strong>Peak Traffic Hours:</strong> {currentCongestion.hotspot.peakHours}.
                <br />
                Consider rerouting to one of the decongested alternatives to save 2+ hours.
              </div>
            </div>

            {/* DECONGESTED ALTERNATIVES (GREEN) */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span
                  style={{
                    width: '14px',
                    height: '14px',
                    borderRadius: '50%',
                    background: '#10b981',
                    display: 'inline-block',
                    boxShadow: '0 0 10px #10b981',
                  }}
                />
                <h4 style={{ margin: 0, fontSize: '1rem', color: '#059669', fontWeight: 800 }}>
                  🟢 Recommended Peaceful Alternatives ({currentCongestion.city})
                </h4>
              </div>

              {currentCongestion.alternatives.map((alt) => (
                <div
                  key={alt.name}
                  className="glass-panel"
                  style={{
                    borderRadius: '16px',
                    padding: '1rem',
                    border: '1.5px solid #10b981',
                    background: 'var(--bg-surface, #ffffff)',
                    display: 'flex',
                    gap: '1rem',
                    alignItems: 'center',
                    boxShadow: '0 4px 14px rgba(16, 185, 129, 0.08)',
                  }}
                >
                  <img
                    src={alt.imageUrl}
                    alt={alt.name}
                    loading="lazy"
                    onError={(e) => {
                      e.target.src = 'https://images.unsplash.com/photo-1477587458883-47145ed94245?w=800';
                    }}
                    style={{ width: '80px', height: '80px', borderRadius: '12px', objectFit: 'cover', flexShrink: 0 }}
                  />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                      <strong style={{ fontSize: '0.95rem', color: 'var(--text-main)' }}>{alt.name}</strong>
                      <span style={{ fontSize: '0.72rem', fontWeight: 800, color: '#059669', background: 'rgba(16, 185, 129, 0.12)', padding: '2px 8px', borderRadius: '8px' }}>
                        {alt.crowdPercent}% crowd
                      </span>
                    </div>
                    <div style={{ fontSize: '0.75rem', color: '#ea580c', fontWeight: 600, margin: '2px 0' }}>
                      📍 {alt.distance} • {alt.tag}
                    </div>
                    <div style={{ fontSize: '0.775rem', color: 'var(--text-muted)', lineHeight: 1.35, marginBottom: '6px' }}>
                      {alt.desc}
                    </div>
                    <button
                      type="button"
                      className="secondary-action"
                      style={{ padding: '4px 10px', fontSize: '0.75rem', borderRadius: '6px' }}
                      onClick={() => {
                        if (onPlanForCity) onPlanForCity(currentCongestion.city);
                      }}
                    >
                      Swap & Add to Itinerary ➔
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
