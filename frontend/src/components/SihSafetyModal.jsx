import { useState } from 'react';
import { TOURIST_EMERGENCY_DATA } from '../services/sihData';

export default function SihSafetyModal({ onClose, defaultCity = 'Jaipur' }) {
  const [selectedCity, setSelectedCity] = useState(defaultCity);
  const cities = Object.keys(TOURIST_EMERGENCY_DATA.cities);
  const currentCityData = TOURIST_EMERGENCY_DATA.cities[selectedCity] || TOURIST_EMERGENCY_DATA.cities.Jaipur;

  return (
    <div className="auth-modal-backdrop" onClick={onClose}>
      <div
        className="auth-modal-card glass-panel"
        style={{ maxWidth: '640px', width: '92%', maxHeight: '90vh', overflowY: 'auto' }}
        onClick={(e) => e.stopPropagation()}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '1.5rem' }}>🛡️</span>
              <h3 style={{ margin: 0, fontSize: '1.3rem', color: 'var(--text-main)' }}>
                Tourist Safety & Emergency Hub
              </h3>
            </div>
            <p style={{ margin: '0.25rem 0 0', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              Official government verified 24/7 helplines, tourist police stations & emergency hospitals.
            </p>
          </div>
          <button
            type="button"
            className="auth-modal-close"
            onClick={onClose}
            aria-label="Close safety hub"
            style={{ background: 'var(--bg-surface-elevated, #f1f5f9)', border: 'none', width: '32px', height: '32px', borderRadius: '50%', fontSize: '1rem', cursor: 'pointer', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}
          >
            ✕
          </button>
        </div>

        {/* NATIONAL EMERGENCY HELPLINES */}
        <div style={{ marginBottom: '1.5rem' }}>
          <span style={{ fontSize: '0.85rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.5px', color: '#0f766e', display: 'block', marginBottom: '0.6rem' }}>
            🇮🇳 All-India 24/7 Verified Helplines
          </span>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '0.6rem' }}>
            {TOURIST_EMERGENCY_DATA.national.map((item) => (
              <a
                key={item.number}
                href={`tel:${item.number}`}
                className="safety-helpline-card"
                style={{
                  textDecoration: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '0.75rem 1rem',
                  borderRadius: '10px',
                  background: 'var(--bg-surface-elevated, #f8fafc)',
                  border: '1px solid var(--border-color, #e2e8f0)',
                  transition: 'all 0.2s ease',
                }}
              >
                <div>
                  <div style={{ fontWeight: 700, fontSize: '0.85rem', color: 'var(--text-main)' }}>{item.title}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{item.desc}</div>
                </div>
                <div style={{ background: '#e11d48', color: 'white', fontWeight: 800, padding: '4px 10px', borderRadius: '20px', fontSize: '0.9rem', flexShrink: 0, marginLeft: '8px' }}>
                  📞 {item.number}
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* CITY-LEVEL TOURIST POLICE & HOSPITALS */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.6rem' }}>
            <span style={{ fontSize: '0.85rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.5px', color: '#ea580c' }}>
              📍 City-Specific Emergency Facilities
            </span>
            <div style={{ display: 'flex', gap: '6px' }}>
              {cities.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setSelectedCity(c)}
                  style={{
                    padding: '3px 9px',
                    borderRadius: '14px',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    border: 'none',
                    background: selectedCity === c ? '#ea580c' : 'var(--bg-surface-elevated, #f1f5f9)',
                    color: selectedCity === c ? 'white' : 'var(--text-muted)',
                  }}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          <div style={{ background: 'var(--bg-surface-elevated, #f8fafc)', border: '1px solid var(--border-color, #e2e8f0)', borderRadius: '12px', padding: '1rem' }}>
            <div style={{ marginBottom: '0.85rem' }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                👮 Dedicated Tourist Police Unit
              </div>
              <div style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--text-main)', marginTop: '2px' }}>
                {currentCityData.policeStation}
              </div>
              <div style={{ fontSize: '0.85rem', color: '#0f766e', fontWeight: 700, marginTop: '2px' }}>
                📞 Call: {currentCityData.phone}
              </div>
            </div>

            <div style={{ marginBottom: '0.85rem' }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                🏥 24/7 Super-Specialty Hospital & Trauma Center
              </div>
              <div style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--text-main)', marginTop: '2px' }}>
                {currentCityData.hospital}
              </div>
              <div style={{ fontSize: '0.85rem', color: '#e11d48', fontWeight: 700, marginTop: '2px' }}>
                📞 Emergency: {currentCityData.hospitalPhone}
              </div>
            </div>

            <div style={{ marginBottom: '0.85rem' }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                🏛️ Official Tourist Reception & Facilitation Centre
              </div>
              <div style={{ fontSize: '0.875rem', color: 'var(--text-main)', marginTop: '2px' }}>
                {currentCityData.touristOffice}
              </div>
            </div>

            <div style={{ background: 'rgba(234, 88, 12, 0.08)', padding: '0.65rem 0.85rem', borderRadius: '8px', fontSize: '0.8rem', color: '#c2410c' }}>
              💡 <strong>Traveler Advisory:</strong> {currentCityData.tips}
            </div>
          </div>
        </div>

        <button
          type="button"
          className="secondary-action"
          onClick={onClose}
          style={{ width: '100%', marginTop: '1.25rem', padding: '0.75rem' }}
        >
          Close Safety Hub
        </button>
      </div>
    </div>
  );
}
