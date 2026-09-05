import { useState, useMemo } from 'react';
import { DESTINATION_OPPORTUNITY_DATA, HIDDEN_GEMS_DATA } from '../services/sihData';

export default function DiscoverIndiaAiEngine({ onSelectDestination, onPlanTrip }) {
  // Input State
  const [budget, setBudget] = useState(15000);
  const [days, setDays] = useState(5);
  const [startCity, setStartCity] = useState('Delhi');
  const [travelCompanion, setTravelCompanion] = useState('Couple');
  const [selectedInterests, setSelectedInterests] = useState(['History', 'Food', 'Nature']);
  const [hasSearched, setHasSearched] = useState(true);

  const interestOptions = [
    { id: 'History', label: 'History & Forts', icon: '🏛️' },
    { id: 'Food', label: 'Food & Street Thalis', icon: '🍛' },
    { id: 'Nature', label: 'Nature & Lakes', icon: '🌿' },
    { id: 'Spiritual', label: 'Spiritual Ghats', icon: '🧘' },
    { id: 'Offbeat', label: 'Offbeat & Hidden', icon: '💎' },
    { id: 'Crafts', label: 'Handicrafts & Artisans', icon: '🧵' },
    { id: 'Architecture', label: 'Stepwells & Havelis', icon: '🏰' },
  ];

  const companionOptions = [
    { id: 'Solo', label: 'Solo Wanderer', icon: '🎒' },
    { id: 'Couple', label: 'Couple / Romantic', icon: '💑' },
    { id: 'Family', label: 'Family with Kids', icon: '👨‍👩‍👧' },
    { id: 'Friends', label: 'Friends Group', icon: '👥' },
  ];

  const toggleInterest = (id) => {
    setSelectedInterests((prev) => {
      if (prev.includes(id)) {
        if (prev.length === 1) return prev; // Keep at least one
        return prev.filter((item) => item !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  // Curated database for AI matching
  const ALL_CANDIDATES = [
    {
      name: 'Bundi',
      state: 'Rajasthan',
      tagline: 'City of Stepwells & Painted Havelis',
      heroImage: 'https://images.unsplash.com/photo-1477587458883-47145ed94245?w=800',
      baseCostPerDay: 2200,
      transitCostFromDelhi: 1800,
      transitCostFromMumbai: 2600,
      transitCostFromOther: 2800,
      suitableFor: ['Solo', 'Couple', 'Friends'],
      tags: ['History', 'Architecture', 'Offbeat', 'Food'],
      matchScore: 98,
      whyRecommended: 'Far quieter than Jaipur, with 50+ intricate stepwells, medieval Taragarh Fort, and world-class Chitrashala palace frescoes.',
      transitTip: 'Comfortable overnight train or express Shatabdi via Kota Junction (35 mins away).',
      economicImpact: 'Directly enriches family-run havelis and stepwell rainwater restoration guilds.',
    },
    {
      name: 'Orchha',
      state: 'Madhya Pradesh',
      tagline: 'Medieval Riverfront Cenotaphs & Palaces',
      heroImage: 'https://images.unsplash.com/photo-1608958435020-e8a7109ba809?w=800',
      baseCostPerDay: 2000,
      transitCostFromDelhi: 1600,
      transitCostFromMumbai: 2900,
      transitCostFromOther: 2500,
      suitableFor: ['Couple', 'Solo', 'Family'],
      tags: ['History', 'Nature', 'Spiritual', 'Offbeat'],
      matchScore: 95,
      whyRecommended: 'A fairytale medieval capital along the calm Betwa River with soaring stone chhatris and zero traffic noise.',
      transitTip: 'Vande Bharat / Bhopal Shatabdi from Delhi to Jhansi (4.5 hrs) + 20 min local auto to Orchha.',
      economicImpact: 'Sustains local Betwa river boatmen and 30+ verified Bundelkhand homestays.',
    },
    {
      name: 'Udaipur',
      state: 'Rajasthan',
      tagline: 'City of Lakes & Royal Rajput Romance',
      heroImage: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?w=800',
      baseCostPerDay: 2800,
      transitCostFromDelhi: 2400,
      transitCostFromMumbai: 2200,
      transitCostFromOther: 3000,
      suitableFor: ['Couple', 'Family', 'Friends'],
      tags: ['History', 'Food', 'Nature', 'Architecture'],
      matchScore: 93,
      whyRecommended: 'Majestic City Palace overlooking Lake Pichola, rooftop candlelight dining, and traditional bagore-ki-haveli folk performances.',
      transitTip: 'Direct flights or daily Mewar Express train from Delhi & Mumbai.',
      economicImpact: 'Empowers traditional silver miniature painters and lakeside boatmen cooperatives.',
    },
    {
      name: 'Pushkar',
      state: 'Rajasthan',
      tagline: 'Sacred Lake, Rose Valleys & Desert Dunes',
      heroImage: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?w=800',
      baseCostPerDay: 1800,
      transitCostFromDelhi: 1500,
      transitCostFromMumbai: 2400,
      transitCostFromOther: 2600,
      suitableFor: ['Solo', 'Couple', 'Friends'],
      tags: ['Spiritual', 'Food', 'Offbeat', 'Crafts'],
      matchScore: 91,
      whyRecommended: 'Sacred holy lake surrounded by 52 bathing ghats, famous rose water halwa & malpua trails, and sunset camel desert walks.',
      transitTip: 'Ajmer Shatabdi (6 hrs from Delhi) + 25 min scenic mountain pass drive to Pushkar.',
      economicImpact: 'Supports indigenous flower farm cooperatives and rural camel safari owners.',
    },
    {
      name: 'Mandu',
      state: 'Madhya Pradesh',
      tagline: 'Floating Palaces & Afghan Stone Poetry',
      heroImage: 'https://images.unsplash.com/photo-1585135497273-1a86b09fe70e?w=800',
      baseCostPerDay: 2100,
      transitCostFromDelhi: 2600,
      transitCostFromMumbai: 1900,
      transitCostFromOther: 2800,
      suitableFor: ['Couple', 'History', 'Nature'],
      tags: ['History', 'Architecture', 'Nature', 'Offbeat'],
      matchScore: 89,
      whyRecommended: 'Perched high on the Vindhya plateau, marvel at Jahaz Mahal floating between lakes and the romance of Baz Bahadur.',
      transitTip: '2 hrs scenic highway drive from Indore Airport / Railway Station.',
      economicImpact: 'Directly aids indigenous Bhil tribal craft makers and historical reservoir conservation.',
    },
    {
      name: 'Samode',
      state: 'Rajasthan',
      tagline: 'Royal Haveli Miracles & Village Weavers',
      heroImage: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?w=800',
      baseCostPerDay: 2300,
      transitCostFromDelhi: 1400,
      transitCostFromMumbai: 2800,
      transitCostFromOther: 2600,
      suitableFor: ['Couple', 'Family', 'Solo'],
      tags: ['History', 'Crafts', 'Architecture', 'Food'],
      matchScore: 88,
      whyRecommended: 'Just 42km from Jaipur, escape to 400-year-old painted mirror durbar halls and rural handloom carpet weaver courtyards.',
      transitTip: 'Direct 4-hr drive from Delhi via Delhi-Jaipur Expressway (NH48).',
      economicImpact: 'Directly funds rural hand-knotted carpet cooperatives with zero middleman commissions.',
    },
  ];

  // Dynamic ranking algorithm
  const recommendations = useMemo(() => {
    return ALL_CANDIDATES.map((cand) => {
      // Transit cost based on start city
      const transitCost =
        startCity === 'Delhi'
          ? cand.transitCostFromDelhi
          : startCity === 'Mumbai'
          ? cand.transitCostFromMumbai
          : cand.transitCostFromOther;

      // Estimated total for selected days & travel group
      const peopleMultiplier = travelCompanion === 'Solo' ? 1 : travelCompanion === 'Couple' ? 1.75 : 2.5;
      const stayFoodDaily = cand.baseCostPerDay * days * (travelCompanion === 'Solo' ? 1 : 1.5);
      const calculatedCost = Math.round(stayFoodDaily + transitCost * (travelCompanion === 'Solo' ? 1 : 2));

      // Match score calculation
      let score = cand.matchScore;
      const matchedInterests = cand.tags.filter((t) => selectedInterests.includes(t));
      score += matchedInterests.length * 4;
      if (cand.suitableFor.includes(travelCompanion)) score += 5;
      if (calculatedCost <= budget) score += 6;
      else if (calculatedCost <= budget * 1.25) score += 1;
      else score -= 8;

      return {
        ...cand,
        calculatedCost,
        computedScore: Math.min(99, Math.max(72, score)),
        matchedInterests,
      };
    })
      .sort((a, b) => b.computedScore - a.computedScore)
      .slice(0, 5);
  }, [budget, days, startCity, travelCompanion, selectedInterests]);

  return (
    <div
      className="discover-india-ai-engine glass-panel"
      style={{
        borderRadius: '24px',
        padding: '2rem',
        background: 'var(--bg-surface, #ffffff)',
        border: '1px solid var(--border-color, #e2e8f0)',
        boxShadow: '0 12px 36px rgba(0,0,0,0.06)',
        marginBottom: '2rem',
      }}
    >
      {/* HEADER */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', marginBottom: '1.5rem' }}>
        <div
          style={{
            width: '50px',
            height: '50px',
            borderRadius: '14px',
            background: 'linear-gradient(135deg, #0f766e, #0d9488)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.75rem',
            boxShadow: '0 6px 16px rgba(15, 118, 110, 0.3)',
          }}
        >
          🤖
        </div>
        <div>
          <span
            style={{
              fontSize: '0.75rem',
              fontWeight: 800,
              textTransform: 'uppercase',
              letterSpacing: '1px',
              color: '#0f766e',
            }}
          >
            Yatra 66 AI Intelligence
          </span>
          <h2 style={{ margin: '0.15rem 0 0', fontSize: '1.6rem', fontWeight: 800, color: 'var(--text-main)' }}>
            AI “Discover India” Recommendation Engine
          </h2>
          <p style={{ margin: '0.2rem 0 0', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
            Tell us your budget, departure city, and vibe. We recommend offbeat destinations you may have never considered instead of defaulting to overcrowded hotspots.
          </p>
        </div>
      </div>

      {/* INPUT FORM CONTROLS */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))',
          gap: '1.25rem',
          background: 'var(--bg-surface-elevated, #f8fafc)',
          borderRadius: '18px',
          padding: '1.5rem',
          border: '1px solid var(--border-color, #e2e8f0)',
          marginBottom: '2rem',
        }}
      >
        {/* 1. BUDGET */}
        <div>
          <label style={{ display: 'block', fontSize: '0.825rem', fontWeight: 700, marginBottom: '0.5rem' }}>
            💰 Total Budget: <strong style={{ color: '#0f766e' }}>₹{budget.toLocaleString('en-IN')}</strong>
          </label>
          <input
            type="range"
            min="6000"
            max="45000"
            step="1000"
            value={budget}
            onChange={(e) => setBudget(Number(e.target.value))}
            style={{ width: '100%', cursor: 'pointer', accentColor: '#0f766e' }}
          />
          <div style={{ display: 'flex', gap: '0.35rem', marginTop: '0.4rem', flexWrap: 'wrap' }}>
            {[8000, 15000, 25000, 40000].map((b) => (
              <button
                key={b}
                type="button"
                onClick={() => setBudget(b)}
                style={{
                  fontSize: '0.72rem',
                  padding: '2px 8px',
                  borderRadius: '10px',
                  border: 'none',
                  background: budget === b ? '#0f766e' : '#e2e8f0',
                  color: budget === b ? '#ffffff' : 'var(--text-main)',
                  cursor: 'pointer',
                  fontWeight: 600,
                }}
              >
                ₹{(b / 1000)}k
              </button>
            ))}
          </div>
        </div>

        {/* 2. DURATION */}
        <div>
          <label style={{ display: 'block', fontSize: '0.825rem', fontWeight: 700, marginBottom: '0.5rem' }}>
            🗓️ Trip Duration: <strong style={{ color: '#ea580c' }}>{days} Days</strong>
          </label>
          <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
            {[2, 3, 5, 7, 10].map((d) => (
              <button
                key={d}
                type="button"
                onClick={() => setDays(d)}
                style={{
                  padding: '5px 12px',
                  borderRadius: '12px',
                  border: 'none',
                  background: days === d ? '#ea580c' : '#e2e8f0',
                  color: days === d ? '#ffffff' : 'var(--text-main)',
                  fontWeight: 700,
                  fontSize: '0.8rem',
                  cursor: 'pointer',
                }}
              >
                {d} Days
              </button>
            ))}
          </div>
        </div>

        {/* 3. STARTING CITY */}
        <div>
          <label style={{ display: 'block', fontSize: '0.825rem', fontWeight: 700, marginBottom: '0.5rem' }}>
            📍 Starting City
          </label>
          <select
            value={startCity}
            onChange={(e) => setStartCity(e.target.value)}
            style={{
              width: '100%',
              padding: '8px 12px',
              borderRadius: '10px',
              border: '1px solid var(--border-color, #cbd5e1)',
              background: 'var(--bg-surface, #ffffff)',
              color: 'var(--text-main)',
              fontSize: '0.85rem',
              fontWeight: 600,
            }}
          >
            {['Delhi', 'Mumbai', 'Bengaluru', 'Kolkata', 'Jaipur', 'Chennai', 'Hyderabad', 'Ahmedabad', 'Pune'].map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        {/* 4. TRAVELLING WITH */}
        <div>
          <label style={{ display: 'block', fontSize: '0.825rem', fontWeight: 700, marginBottom: '0.5rem' }}>
            👥 Travelling As
          </label>
          <div style={{ display: 'flex', gap: '0.35rem', flexWrap: 'wrap' }}>
            {companionOptions.map((comp) => (
              <button
                key={comp.id}
                type="button"
                onClick={() => setTravelCompanion(comp.id)}
                style={{
                  padding: '5px 10px',
                  borderRadius: '10px',
                  border: 'none',
                  background: travelCompanion === comp.id ? '#3b82f6' : '#e2e8f0',
                  color: travelCompanion === comp.id ? '#ffffff' : 'var(--text-main)',
                  fontSize: '0.78rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                }}
              >
                {comp.icon} {comp.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 5. INTERESTS MULTI-SELECT */}
      <div style={{ marginBottom: '2rem' }}>
        <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '0.65rem' }}>
          🎯 Your Core Travel Interests:
        </label>
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          {interestOptions.map((opt) => {
            const isSelected = selectedInterests.includes(opt.id);
            return (
              <button
                key={opt.id}
                type="button"
                onClick={() => toggleInterest(opt.id)}
                style={{
                  background: isSelected ? 'var(--brand-primary, #0f766e)' : 'var(--bg-surface-elevated, #f1f5f9)',
                  color: isSelected ? '#ffffff' : 'var(--text-main)',
                  border: isSelected ? '1px solid #0f766e' : '1px solid var(--border-color, #e2e8f0)',
                  padding: '6px 14px',
                  borderRadius: '18px',
                  fontSize: '0.825rem',
                  fontWeight: isSelected ? 700 : 500,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}
              >
                {opt.icon} {opt.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* RESULTS TITLE */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'baseline',
          marginBottom: '1.25rem',
          borderBottom: '1px solid var(--border-color, #e2e8f0)',
          paddingBottom: '0.75rem',
        }}
      >
        <div>
          <h3 style={{ margin: 0, fontSize: '1.25rem', color: 'var(--text-main)' }}>
            ✨ Top 5 Curated Destinations For You
          </h3>
          <span style={{ fontSize: '0.825rem', color: 'var(--text-muted)' }}>
            Calculated for ₹{budget.toLocaleString('en-IN')} • {days} Days • Leaving from {startCity} • {travelCompanion}
          </span>
        </div>
        <span
          style={{
            background: 'rgba(16, 185, 129, 0.12)',
            color: '#059669',
            fontSize: '0.75rem',
            fontWeight: 800,
            padding: '4px 10px',
            borderRadius: '12px',
          }}
        >
          🌱 100% Decongested & Local Focus
        </span>
      </div>

      {/* RECOMMENDATION CARDS LIST */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
        {recommendations.map((dest, idx) => (
          <article
            key={dest.name}
            className="glass-panel"
            style={{
              borderRadius: '18px',
              overflow: 'hidden',
              border: '1px solid var(--border-color, #e2e8f0)',
              display: 'flex',
              flexDirection: 'column',
              background: 'var(--bg-surface-elevated, #ffffff)',
              boxShadow: '0 8px 24px rgba(0,0,0,0.04)',
              position: 'relative',
            }}
          >
            {/* PHOTO BANNER */}
            <div style={{ position: 'relative', height: '175px', overflow: 'hidden' }}>
              <img
                src={dest.heroImage}
                alt={dest.name}
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
                  left: '12px',
                  background: 'rgba(15, 23, 42, 0.85)',
                  color: '#ffffff',
                  fontWeight: 800,
                  fontSize: '0.8rem',
                  padding: '4px 10px',
                  borderRadius: '12px',
                }}
              >
                #{idx + 1} Best Match • {dest.computedScore}%
              </div>
              <div
                style={{
                  position: 'absolute',
                  bottom: '10px',
                  right: '12px',
                  background: 'rgba(15, 118, 110, 0.95)',
                  color: '#ffffff',
                  fontWeight: 800,
                  fontSize: '0.9rem',
                  padding: '5px 12px',
                  borderRadius: '12px',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
                }}
              >
                Est. ₹{dest.calculatedCost.toLocaleString('en-IN')}
              </div>
            </div>

            {/* CARD BODY */}
            <div style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '0.25rem' }}>
                <h4 style={{ margin: 0, fontSize: '1.25rem', color: 'var(--text-main)' }}>
                  {dest.name}, <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>{dest.state}</span>
                </h4>
              </div>
              <div style={{ fontSize: '0.8rem', color: '#ea580c', fontWeight: 600, marginBottom: '0.65rem' }}>
                {dest.tagline}
              </div>

              <p style={{ fontSize: '0.825rem', color: 'var(--text-muted)', lineHeight: 1.45, margin: '0 0 0.85rem' }}>
                {dest.whyRecommended}
              </p>

              <div
                style={{
                  background: 'var(--bg-surface, #f8fafc)',
                  padding: '0.65rem 0.85rem',
                  borderRadius: '10px',
                  fontSize: '0.75rem',
                  marginBottom: '0.85rem',
                  border: '1px solid var(--border-color, #e2e8f0)',
                }}
              >
                <div style={{ fontWeight: 700, color: 'var(--text-main)', marginBottom: '3px' }}>
                  🚆 From {startCity}:
                </div>
                <span style={{ color: 'var(--text-muted)' }}>{dest.transitTip}</span>
              </div>

              <div
                style={{
                  fontSize: '0.72rem',
                  color: '#059669',
                  fontWeight: 700,
                  marginBottom: '1rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                }}
              >
                <span>🌱 Economic Impact:</span>
                <span style={{ fontWeight: 500, color: 'var(--text-muted)' }}>{dest.economicImpact}</span>
              </div>

              <button
                type="button"
                className="primary-action"
                style={{
                  marginTop: 'auto',
                  width: '100%',
                  padding: '9px',
                  borderRadius: '10px',
                  fontSize: '0.85rem',
                  fontWeight: 700,
                }}
                onClick={() => {
                  if (onPlanTrip) onPlanTrip(dest.name);
                }}
              >
                ✨ Plan Trip to {dest.name} ➔
              </button>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
