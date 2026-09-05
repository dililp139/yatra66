import { useState, useMemo, useEffect } from 'react';
import { GAMIFICATION_DATA } from '../services/sihData';

export default function ExploreIndiaPassport({ isOpen, onClose, onPlanForState }) {
  const [visitedStates, setVisitedStates] = useState(() => {
    try {
      const saved = localStorage.getItem('yatra_visited_states');
      return saved ? JSON.parse(saved) : ['RJ', 'HP', 'KL', 'DL'];
    } catch {
      return ['RJ', 'HP', 'KL', 'DL'];
    }
  });

  const [activeTab, setActiveTab] = useState('passport'); // 'passport' | 'states' | 'badges' | 'card'
  const [selectedRegion, setSelectedRegion] = useState('all');
  const [copiedNotification, setCopiedNotification] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem('yatra_visited_states', JSON.stringify(visitedStates));
    } catch (e) {
      console.warn('Unable to persist visited states', e);
    }
  }, [visitedStates]);

  const toggleState = (stateId) => {
    setVisitedStates((prev) => {
      if (prev.includes(stateId)) {
        return prev.filter((s) => s !== stateId);
      } else {
        return [...prev, stateId];
      }
    });
  };

  const totalStates = 28; // Standard 28 Indian states
  const visitedCount = visitedStates.length;
  const progressPercent = Math.min(100, Math.round((visitedCount / totalStates) * 100));

  // Regional breakdown
  const regionalStats = useMemo(() => {
    const counts = { North: 0, South: 0, West: 0, East: 0, 'North-East': 0, Central: 0 };
    const totals = { North: 0, South: 0, West: 0, East: 0, 'North-East': 0, Central: 0 };
    GAMIFICATION_DATA.states.forEach((st) => {
      if (totals[st.region] !== undefined) {
        totals[st.region]++;
        if (visitedStates.includes(st.id)) counts[st.region]++;
      }
    });
    return Object.keys(totals).map((reg) => ({
      region: reg,
      visited: counts[reg] || 0,
      total: totals[reg] || 1,
      percent: Math.round(((counts[reg] || 0) / (totals[reg] || 1)) * 100),
    }));
  }, [visitedStates]);

  // Dynamic Badge Unlocking Engine
  const badgeStatus = useMemo(() => {
    return GAMIFICATION_DATA.badges.map((b) => {
      let isUnlocked = false;
      let progressText = '';

      if (b.id === 'badge-heritage') {
        isUnlocked = visitedStates.some((s) => ['RJ', 'UP', 'KA', 'DL'].includes(s));
        progressText = isUnlocked ? 'Unlocked (Heritage Sites Visited)' : 'Explore Rajasthan, UP, or Karnataka';
      } else if (b.id === 'badge-himalayan') {
        isUnlocked = visitedStates.some((s) => ['HP', 'UT', 'LA', 'JK', 'SK'].includes(s));
        progressText = isUnlocked ? 'Unlocked (High Valley Trails)' : 'Explore Himachal, Ladakh, or Uttarakhand';
      } else if (b.id === 'badge-coastal') {
        isUnlocked = visitedStates.some((s) => ['GA', 'KL', 'MH', 'TN', 'OR', 'AP'].includes(s));
        progressText = isUnlocked ? 'Unlocked (Coastal & Ghats)' : 'Explore Goa, Kerala, or Maharashtra';
      } else if (b.id === 'badge-hidden') {
        isUnlocked = visitedStates.length >= 3;
        progressText = isUnlocked ? 'Unlocked (Offbeat Explorer)' : `${visitedStates.length}/3 states visited`;
      } else if (b.id === 'badge-foodie') {
        isUnlocked = visitedStates.some((s) => ['RJ', 'DL', 'WB', 'PB', 'TN'].includes(s));
        progressText = isUnlocked ? 'Unlocked (Regional Gastronomy)' : 'Explore Delhi, Punjab, or Bengal';
      } else if (b.id === 'badge-storyteller') {
        isUnlocked = visitedStates.length >= 4;
        progressText = isUnlocked ? 'Unlocked (Cultural Ambassador)' : `${visitedStates.length}/4 states visited`;
      }

      return {
        ...b,
        unlocked: isUnlocked,
        progressText,
      };
    });
  }, [visitedStates]);

  const unlockedBadgeCount = badgeStatus.filter((b) => b.unlocked).length;

  const filteredStates = useMemo(() => {
    if (selectedRegion === 'all') return GAMIFICATION_DATA.states;
    return GAMIFICATION_DATA.states.filter((st) => st.region === selectedRegion);
  }, [selectedRegion]);

  const handleShareCard = () => {
    const text = `🏆 My Yatra 66 Explorer Passport: I have explored ${visitedCount}/28 Indian States (${progressPercent}%) and unlocked ${unlockedBadgeCount}/6 Cultural Badges! Discover Incredible India on https://yatra66.in`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedNotification(true);
      setTimeout(() => setCopiedNotification(false), 3000);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="sih-modal-backdrop"
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(15, 23, 42, 0.75)',
        backdropFilter: 'blur(8px)',
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1rem',
      }}
      onClick={onClose}
    >
      <div
        className="glass-panel"
        style={{
          width: '100%',
          maxWidth: '850px',
          maxHeight: '90vh',
          overflowY: 'auto',
          borderRadius: '24px',
          padding: '2rem',
          background: 'var(--bg-surface, #ffffff)',
          color: 'var(--text-main, #0f172a)',
          boxShadow: '0 25px 60px rgba(0,0,0,0.3)',
          position: 'relative',
          border: '1px solid var(--border-color, #e2e8f0)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* CLOSE BUTTON */}
        <button
          type="button"
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '18px',
            right: '20px',
            background: 'var(--bg-surface-elevated, #f1f5f9)',
            border: 'none',
            fontSize: '1.25rem',
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--text-muted, #64748b)',
          }}
          aria-label="Close Passport"
        >
          ✕
        </button>

        {/* PASSPORT HEADER */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
          <div
            style={{
              width: '56px',
              height: '56px',
              borderRadius: '16px',
              background: 'linear-gradient(135deg, #f59e0b, #d97706)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '2rem',
              boxShadow: '0 8px 20px rgba(245, 158, 11, 0.35)',
            }}
          >
            🇮🇳
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <h2 style={{ margin: 0, fontSize: '1.6rem', fontWeight: 800 }}>Explore India Passport</h2>
              <span
                style={{
                  background: 'rgba(245, 158, 11, 0.15)',
                  color: '#b45309',
                  fontSize: '0.75rem',
                  fontWeight: 800,
                  padding: '2px 10px',
                  borderRadius: '12px',
                }}
              >
                Official SIH Edition
              </span>
            </div>
            <p style={{ margin: '0.25rem 0 0', color: 'var(--text-muted, #64748b)', fontSize: '0.9rem' }}>
              Track your journey across India's 28 states & union territories, unlock explorer badges, and celebrate regional heritage.
            </p>
          </div>
        </div>

        {/* TOP SUMMARY STATS BANNER */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))',
            gap: '1rem',
            marginBottom: '1.5rem',
          }}
        >
          <div
            style={{
              background: 'var(--bg-surface-elevated, #f8fafc)',
              border: '1px solid var(--border-color, #e2e8f0)',
              borderRadius: '14px',
              padding: '1rem',
              textAlign: 'center',
            }}
          >
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted, #64748b)', fontWeight: 600 }}>
              States & UTs Explored
            </div>
            <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#0f766e', marginTop: '2px' }}>
              {visitedCount} <span style={{ fontSize: '1rem', color: 'var(--text-muted)' }}>/ 28</span>
            </div>
            <div
              style={{
                width: '100%',
                background: '#e2e8f0',
                height: '6px',
                borderRadius: '6px',
                marginTop: '8px',
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  width: `${progressPercent}%`,
                  height: '100%',
                  background: 'linear-gradient(90deg, #0f766e, #10b981)',
                  borderRadius: '6px',
                  transition: 'width 0.4s ease',
                }}
              />
            </div>
          </div>

          <div
            style={{
              background: 'var(--bg-surface-elevated, #f8fafc)',
              border: '1px solid var(--border-color, #e2e8f0)',
              borderRadius: '14px',
              padding: '1rem',
              textAlign: 'center',
            }}
          >
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted, #64748b)', fontWeight: 600 }}>
              Explorer Badges
            </div>
            <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#ea580c', marginTop: '2px' }}>
              {unlockedBadgeCount} <span style={{ fontSize: '1rem', color: 'var(--text-muted)' }}>/ 6</span>
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '6px' }}>
              {6 - unlockedBadgeCount === 0 ? '🎉 All Badges Unlocked!' : `${6 - unlockedBadgeCount} more to master`}
            </div>
          </div>

          <div
            style={{
              background: 'var(--bg-surface-elevated, #f8fafc)',
              border: '1px solid var(--border-color, #e2e8f0)',
              borderRadius: '14px',
              padding: '1rem',
              textAlign: 'center',
            }}
          >
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted, #64748b)', fontWeight: 600 }}>
              National Coverage
            </div>
            <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#3b82f6', marginTop: '2px' }}>
              {progressPercent}%
            </div>
            <div style={{ fontSize: '0.75rem', color: '#059669', fontWeight: 700, marginTop: '6px' }}>
              {progressPercent >= 50 ? '🌟 National Voyager' : progressPercent >= 20 ? '🧭 Active Wanderer' : '🌱 Emerging Explorer'}
            </div>
          </div>
        </div>

        {/* NAVIGATION SUB-TABS */}
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
            { id: 'passport', label: '📖 Passport Overview' },
            { id: 'states', label: '🗺️ States Checklist' },
            { id: 'badges', label: '🏅 Badges & Honors' },
            { id: 'card', label: '🪪 My Traveler Card' },
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
                padding: '7px 16px',
                borderRadius: '20px',
                cursor: 'pointer',
                fontSize: '0.85rem',
                transition: 'all 0.2s ease',
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* TAB 1: PASSPORT OVERVIEW & REGIONAL METRICS */}
        {activeTab === 'passport' && (
          <div>
            <h3 style={{ fontSize: '1.1rem', margin: '0 0 1rem', color: 'var(--text-main)' }}>
              Regional Exploration Breakdown
            </h3>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                gap: '1rem',
                marginBottom: '1.5rem',
              }}
            >
              {regionalStats.map((reg) => (
                <div
                  key={reg.region}
                  style={{
                    background: 'var(--bg-surface-elevated, #f8fafc)',
                    borderRadius: '12px',
                    padding: '1rem',
                    border: '1px solid var(--border-color, #e2e8f0)',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                    <span style={{ fontWeight: 700, fontSize: '0.9rem' }}>{reg.region} India</span>
                    <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#0f766e' }}>
                      {reg.visited}/{reg.total} ({reg.percent}%)
                    </span>
                  </div>
                  <div style={{ width: '100%', background: '#e2e8f0', height: '6px', borderRadius: '6px', overflow: 'hidden' }}>
                    <div
                      style={{
                        width: `${reg.percent}%`,
                        height: '100%',
                        background: reg.percent >= 50 ? '#10b981' : '#f59e0b',
                        borderRadius: '6px',
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* UNLOCKED BADGES PREVIEW */}
            <div
              style={{
                background: 'linear-gradient(135deg, rgba(15, 118, 110, 0.08), rgba(245, 158, 11, 0.08))',
                borderRadius: '16px',
                padding: '1.25rem',
                border: '1px dashed #0f766e',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '1rem',
              }}
            >
              <div>
                <h4 style={{ margin: '0 0 0.25rem', fontSize: '1rem' }}>Active Explorer Level</h4>
                <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                  You have unlocked {unlockedBadgeCount} cultural achievement badges. Check off more destinations in the States Checklist to earn master traveler status.
                </p>
              </div>
              <button
                type="button"
                className="primary-action"
                style={{ padding: '8px 18px', fontSize: '0.85rem', borderRadius: '10px' }}
                onClick={() => setActiveTab('states')}
              >
                Mark States Visited ➔
              </button>
            </div>
          </div>
        )}

        {/* TAB 2: INTERACTIVE STATES CHECKLIST */}
        {activeTab === 'states' && (
          <div>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '0.75rem',
                marginBottom: '1rem',
              }}
            >
              <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                {['all', 'North', 'South', 'West', 'East', 'North-East', 'Central'].map((r) => (
                  <button
                    key={r}
                    type="button"
                    onClick={() => setSelectedRegion(r)}
                    style={{
                      background: selectedRegion === r ? 'var(--text-main)' : 'var(--bg-surface-elevated, #f1f5f9)',
                      color: selectedRegion === r ? 'var(--bg-surface)' : 'var(--text-muted)',
                      border: 'none',
                      padding: '4px 12px',
                      borderRadius: '12px',
                      fontSize: '0.75rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                    }}
                  >
                    {r === 'all' ? 'All Regions' : r}
                  </button>
                ))}
              </div>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                Click any card to toggle visited status
              </span>
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(230px, 1fr))',
                gap: '0.75rem',
                maxHeight: '420px',
                overflowY: 'auto',
                paddingRight: '4px',
              }}
            >
              {filteredStates.map((st) => {
                const isVisited = visitedStates.includes(st.id);
                return (
                  <div
                    key={st.id}
                    onClick={() => toggleState(st.id)}
                    style={{
                      background: isVisited ? 'rgba(16, 185, 129, 0.08)' : 'var(--bg-surface-elevated, #f8fafc)',
                      border: isVisited ? '1.5px solid #10b981' : '1px solid var(--border-color, #e2e8f0)',
                      borderRadius: '12px',
                      padding: '0.85rem',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.75rem',
                      transition: 'all 0.15s ease',
                      boxShadow: isVisited ? '0 4px 12px rgba(16, 185, 129, 0.15)' : 'none',
                    }}
                  >
                    <div
                      style={{
                        width: '28px',
                        height: '28px',
                        borderRadius: '6px',
                        background: isVisited ? '#10b981' : '#e2e8f0',
                        color: isVisited ? '#ffffff' : '#94a3b8',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: 800,
                        fontSize: '0.9rem',
                        flexShrink: 0,
                      }}
                    >
                      {isVisited ? '✓' : ''}
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <span style={{ fontSize: '1.1rem' }}>{st.icon}</span>
                        <strong style={{ fontSize: '0.85rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                          {st.name}
                        </strong>
                      </div>
                      <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '2px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {st.famousFor}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 3: BADGES & ACHIEVEMENTS */}
        {activeTab === 'badges' && (
          <div>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                gap: '1rem',
              }}
            >
              {badgeStatus.map((badge) => (
                <div
                  key={badge.id}
                  style={{
                    background: badge.unlocked ? 'var(--bg-surface-elevated, #f8fafc)' : 'rgba(0,0,0,0.02)',
                    border: badge.unlocked ? `1.5px solid ${badge.color}` : '1px dashed var(--border-color, #cbd5e1)',
                    borderRadius: '16px',
                    padding: '1.25rem',
                    display: 'flex',
                    flexDirection: 'column',
                    opacity: badge.unlocked ? 1 : 0.65,
                    boxShadow: badge.unlocked ? `0 8px 24px ${badge.color}20` : 'none',
                    position: 'relative',
                    overflow: 'hidden',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                    <div
                      style={{
                        width: '46px',
                        height: '46px',
                        borderRadius: '12px',
                        background: badge.unlocked ? `${badge.color}15` : '#e2e8f0',
                        fontSize: '1.75rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                      }}
                    >
                      {badge.icon}
                    </div>
                    <div>
                      <h4 style={{ margin: 0, fontSize: '1rem', color: 'var(--text-main)' }}>{badge.title}</h4>
                      <span
                        style={{
                          fontSize: '0.7rem',
                          fontWeight: 800,
                          color: badge.unlocked ? badge.color : '#64748b',
                          textTransform: 'uppercase',
                        }}
                      >
                        {badge.unlocked ? '✨ Unlocked' : '🔒 Locked'}
                      </span>
                    </div>
                  </div>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: 1.4, margin: '0 0 0.75rem', flex: 1 }}>
                    {badge.description}
                  </p>
                  <div
                    style={{
                      background: 'rgba(0,0,0,0.04)',
                      padding: '4px 10px',
                      borderRadius: '8px',
                      fontSize: '0.72rem',
                      color: 'var(--text-muted)',
                    }}
                  >
                    Criteria: {badge.criteria}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: MY TRAVELER CARD */}
        {activeTab === 'card' && (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div
              style={{
                width: '100%',
                maxWidth: '440px',
                borderRadius: '20px',
                background: 'linear-gradient(145deg, #0f172a, #1e293b)',
                color: '#ffffff',
                padding: '1.75rem',
                boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
                border: '1px solid rgba(255,255,255,0.15)',
                position: 'relative',
                overflow: 'hidden',
                marginBottom: '1.25rem',
              }}
            >
              {/* Card Holographic Watermark */}
              <div
                style={{
                  position: 'absolute',
                  right: '-20px',
                  bottom: '-20px',
                  fontSize: '8rem',
                  opacity: 0.08,
                  pointerEvents: 'none',
                }}
              >
                🇮🇳
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
                <div>
                  <span style={{ fontSize: '0.7rem', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '1px' }}>
                    Incredible India Official ID
                  </span>
                  <div style={{ fontSize: '1.3rem', fontWeight: 800, color: '#f59e0b' }}>Yatra 66 Explorer</div>
                </div>
                <div style={{ fontSize: '1.75rem' }}>🧭</div>
              </div>

              <div style={{ display: 'flex', gap: '1.5rem', marginBottom: '1.25rem' }}>
                <div>
                  <div style={{ fontSize: '0.7rem', color: '#94a3b8' }}>States Explored</div>
                  <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#38bdf8' }}>{visitedCount}/28</div>
                </div>
                <div>
                  <div style={{ fontSize: '0.7rem', color: '#94a3b8' }}>Rank</div>
                  <div style={{ fontSize: '1.1rem', fontWeight: 700, color: '#4ade80' }}>
                    {progressPercent >= 50 ? 'Master Voyager' : 'Pioneer'}
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: '0.7rem', color: '#94a3b8' }}>Badges</div>
                  <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#f59e0b' }}>{unlockedBadgeCount}</div>
                </div>
              </div>

              <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '0.85rem' }}>
                <div style={{ fontSize: '0.72rem', color: '#94a3b8', marginBottom: '6px' }}>Unlocked Achievements:</div>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  {badgeStatus
                    .filter((b) => b.unlocked)
                    .map((b) => (
                      <span
                        key={b.id}
                        style={{
                          background: 'rgba(255,255,255,0.12)',
                          padding: '3px 8px',
                          borderRadius: '8px',
                          fontSize: '0.75rem',
                        }}
                      >
                        {b.icon} {b.title}
                      </span>
                    ))}
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <button
                type="button"
                className="primary-action"
                onClick={handleShareCard}
                style={{ padding: '8px 20px', borderRadius: '10px', fontSize: '0.85rem' }}
              >
                {copiedNotification ? '✓ Passport Copied to Clipboard!' : '📋 Share Explorer Card'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
