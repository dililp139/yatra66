import { useState, useMemo } from 'react';

export default function TourismBusinessDashboard() {
  const [selectedVendorId, setSelectedVendorId] = useState('bundi-haveli');

  const VENDORS = [
    {
      id: 'bundi-haveli',
      name: 'Bundi Heritage Haveli & Stepwell Walks',
      city: 'Bundi',
      state: 'Rajasthan',
      category: 'Homestays & Heritage Storytellers',
      verifiedSince: '2024',
      viewsThisMonth: 14820,
      searchImpressions: 42100,
      inquiriesCount: 156,
      directBookings: 94,
      savedCommissionInr: 38400,
      monthlyGrowth: '+184%',
      visitorOrigins: [
        { city: 'Delhi NCR', percent: 36, count: '5,335 travelers' },
        { city: 'Mumbai', percent: 24, count: '3,556 travelers' },
        { city: 'Bengaluru', percent: 16, count: '2,371 travelers' },
        { city: 'Gujarat (Ahmedabad/Surat)', percent: 14, count: '2,074 travelers' },
        { city: 'International Explorers', percent: 10, count: '1,482 travelers' },
      ],
      touristInterests: [
        { interest: 'Stepwells & Baori Hydro-Engineering', percent: 46 },
        { interest: 'Chitrashala Miniature Paintings', percent: 28 },
        { interest: 'Authentic Local Thalis & Chai', percent: 16 },
        { interest: 'Rural Handicrafts & Pottery', percent: 10 },
      ],
      seasonalDemand: [
        { month: 'Jan', level: 'Peak', score: 95 },
        { month: 'Feb', level: 'Peak', score: 98 },
        { month: 'Mar', level: 'High', score: 82 },
        { month: 'Apr', level: 'Low', score: 35 },
        { month: 'May', level: 'Low', score: 25 },
        { month: 'Jun', level: 'Low', score: 30 },
        { month: 'Jul', level: 'Monsoon', score: 65 },
        { month: 'Aug', level: 'Monsoon', score: 78 },
        { month: 'Sep', level: 'High', score: 85 },
        { month: 'Oct', level: 'Peak', score: 96 },
        { month: 'Nov', level: 'Peak', score: 100 },
        { month: 'Dec', level: 'Peak', score: 99 },
      ],
      aiInsights: [
        '💡 Stepwell sunrise photography requests increased by +42% this week. Add a 6:30 AM sunrise photo tour option to capture early travelers.',
        '📈 Travelers from Delhi NCR are booking 4 nights on average instead of 2. Consider offering a 3+ night bundle discount.',
        '🤝 0% commission saved you ₹38,400 this quarter compared to OTAs (Online Travel Agencies) charging 18-22% fees.',
      ],
    },
    {
      id: 'bagru-textiles',
      name: 'Chippa Artisan Indigo & Block Print Guild',
      city: 'Jaipur',
      state: 'Rajasthan',
      category: 'Artisans & Handicraft Workshops',
      verifiedSince: '2023',
      viewsThisMonth: 18200,
      searchImpressions: 54900,
      inquiriesCount: 210,
      directBookings: 142,
      savedCommissionInr: 49800,
      monthlyGrowth: '+210%',
      visitorOrigins: [
        { city: 'Delhi NCR', percent: 32, count: '5,824 travelers' },
        { city: 'Mumbai', percent: 28, count: '5,096 travelers' },
        { city: 'Bengaluru', percent: 18, count: '3,276 travelers' },
        { city: 'Kolkata', percent: 12, count: '2,184 travelers' },
        { city: 'International Visitors', percent: 10, count: '1,820 travelers' },
      ],
      touristInterests: [
        { interest: 'Natural Indigo Dye Masterclasses', percent: 52 },
        { interest: 'Hand-carved Woodblock Purchases', percent: 24 },
        { interest: 'Organic Cotton Scarves & Yardage', percent: 14 },
        { interest: 'Village Artisan Courtyard Walks', percent: 10 },
      ],
      seasonalDemand: [
        { month: 'Jan', level: 'Peak', score: 94 },
        { month: 'Feb', level: 'Peak', score: 96 },
        { month: 'Mar', level: 'High', score: 88 },
        { month: 'Apr', level: 'Moderate', score: 60 },
        { month: 'May', level: 'Low', score: 40 },
        { month: 'Jun', level: 'Low', score: 38 },
        { month: 'Jul', level: 'Moderate', score: 55 },
        { month: 'Aug', level: 'High', score: 75 },
        { month: 'Sep', level: 'High', score: 85 },
        { month: 'Oct', level: 'Peak', score: 95 },
        { month: 'Nov', level: 'Peak', score: 98 },
        { month: 'Dec', level: 'Peak', score: 100 },
      ],
      aiInsights: [
        '💡 Tourists frequently ask for takeaway DIY mini-blocks. Create a pocket souvenir kit for ₹400 to increase on-site sales.',
        '📈 Couple bookings represent 62% of workshop attendees. Offer a dual scarf stamping experience.',
        '🤝 Verified Government Craft Mark increased direct trust inquiries by 3.2x.',
      ],
    },
    {
      id: 'varanasi-boat',
      name: 'Kashi Heritage Boatmen & Sunrise Aarti Guild',
      city: 'Varanasi',
      state: 'Uttar Pradesh',
      category: 'Licensed River Guides & Boats',
      verifiedSince: '2024',
      viewsThisMonth: 12400,
      searchImpressions: 39500,
      inquiriesCount: 184,
      directBookings: 128,
      savedCommissionInr: 32600,
      monthlyGrowth: '+165%',
      visitorOrigins: [
        { city: 'Delhi NCR', percent: 34, count: '4,216 travelers' },
        { city: 'Kolkata', percent: 26, count: '3,224 travelers' },
        { city: 'Mumbai', percent: 18, count: '2,232 travelers' },
        { city: 'South India (Chennai/Hyd)', percent: 14, count: '1,736 travelers' },
        { city: 'International Pilgrims', percent: 8, count: '992 travelers' },
      ],
      touristInterests: [
        { interest: 'Assi Ghat Subah-e-Banaras Dawn Cruise', percent: 48 },
        { interest: 'Ganga Aarti Evening Photography Boat', percent: 34 },
        { interest: 'Cremation Ghat Heritage Commentary', percent: 12 },
        { interest: 'Classical Shehnai on the River', percent: 6 },
      ],
      seasonalDemand: [
        { month: 'Jan', level: 'Peak', score: 92 },
        { month: 'Feb', level: 'Peak', score: 94 },
        { month: 'Mar', level: 'Peak', score: 96 },
        { month: 'Apr', level: 'Moderate', score: 55 },
        { month: 'May', level: 'Low', score: 40 },
        { month: 'Jun', level: 'Low', score: 45 },
        { month: 'Jul', level: 'Monsoon High Water', score: 30 },
        { month: 'Aug', level: 'Monsoon High Water', score: 25 },
        { month: 'Sep', level: 'Recovery', score: 65 },
        { month: 'Oct', level: 'Peak (Dev Deepawali)', score: 100 },
        { month: 'Nov', level: 'Peak', score: 100 },
        { month: 'Dec', level: 'Peak', score: 98 },
      ],
      aiInsights: [
        '💡 Dev Deepawali bookings start 90 days in advance. Enable advance reservation slots now.',
        '📈 Travellers are requesting quiet manual rowing wooden boats over loud diesel motor boats for dawn tranquility.',
        '🤝 Direct WhatsApp integration allows pilgrims to locate your boat captain at Dashashwamedh stairs with 0 delay.',
      ],
    },
  ];

  const currentVendor = useMemo(() => {
    return VENDORS.find((v) => v.id === selectedVendorId) || VENDORS[0];
  }, [selectedVendorId]);

  return (
    <div
      className="tourism-business-dashboard glass-panel"
      style={{
        borderRadius: '24px',
        padding: '2rem',
        background: 'var(--bg-surface, #ffffff)',
        border: '1px solid var(--border-color, #e2e8f0)',
        boxShadow: '0 12px 36px rgba(0,0,0,0.06)',
      }}
    >
      {/* DASHBOARD HEADER */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem',
          marginBottom: '1.5rem',
          borderBottom: '1px solid var(--border-color, #e2e8f0)',
          paddingBottom: '1.25rem',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
          <div
            style={{
              width: '48px',
              height: '48px',
              borderRadius: '14px',
              background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.6rem',
              color: '#ffffff',
            }}
          >
            📈
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <h2 style={{ margin: 0, fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-main)' }}>
                Tourism Business Analytics Dashboard
              </h2>
              <span
                style={{
                  background: 'rgba(59, 130, 246, 0.12)',
                  color: '#2563eb',
                  fontSize: '0.75rem',
                  fontWeight: 800,
                  padding: '2px 8px',
                  borderRadius: '10px',
                }}
              >
                Local Provider Intelligence
              </span>
            </div>
            <p style={{ margin: '0.2rem 0 0', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
              Real-time tourist inquiry traffic, tourist origins, search trends, and revenue insights for local registered vendors.
            </p>
          </div>
        </div>

        {/* VENDOR SELECTOR */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '0.825rem', fontWeight: 700, color: 'var(--text-muted)' }}>Select Business:</span>
          <select
            value={selectedVendorId}
            onChange={(e) => setSelectedVendorId(e.target.value)}
            style={{
              padding: '8px 14px',
              borderRadius: '12px',
              border: '1.5px solid var(--border-color, #cbd5e1)',
              background: 'var(--bg-surface-elevated, #f8fafc)',
              color: 'var(--text-main)',
              fontSize: '0.85rem',
              fontWeight: 700,
              cursor: 'pointer',
            }}
          >
            {VENDORS.map((v) => (
              <option key={v.id} value={v.id}>
                📍 {v.name} ({v.city})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* SELECTED VENDOR PROFILE BANNER */}
      <div
        style={{
          background: 'var(--bg-surface-elevated, #f8fafc)',
          borderRadius: '16px',
          padding: '1.25rem',
          border: '1px solid var(--border-color, #e2e8f0)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem',
          marginBottom: '1.5rem',
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <h3 style={{ margin: 0, fontSize: '1.15rem', color: 'var(--text-main)' }}>{currentVendor.name}</h3>
            <span
              style={{
                background: '#10b981',
                color: '#ffffff',
                fontSize: '0.72rem',
                fontWeight: 800,
                padding: '2px 8px',
                borderRadius: '8px',
              }}
            >
              ✓ Verified Partner
            </span>
          </div>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '4px' }}>
            📍 {currentVendor.city}, {currentVendor.state} • Category: <strong>{currentVendor.category}</strong> • Active on Yatra 66
          </div>
        </div>
        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <span
            style={{
              background: 'rgba(16, 185, 129, 0.15)',
              color: '#059669',
              fontWeight: 800,
              fontSize: '0.85rem',
              padding: '6px 12px',
              borderRadius: '10px',
            }}
          >
            ⚡ 0% Middleman Fees
          </span>
        </div>
      </div>

      {/* TOP 5 METRIC CARDS */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: '1rem',
          marginBottom: '2rem',
        }}
      >
        <div
          style={{
            background: 'var(--bg-surface, #ffffff)',
            border: '1px solid var(--border-color, #e2e8f0)',
            borderRadius: '14px',
            padding: '1.1rem',
            boxShadow: '0 4px 12px rgba(0,0,0,0.03)',
          }}
        >
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600 }}>Profile Views</div>
          <div style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--text-main)', marginTop: '2px' }}>
            {currentVendor.viewsThisMonth.toLocaleString('en-IN')}
          </div>
          <div style={{ fontSize: '0.72rem', color: '#10b981', fontWeight: 700, marginTop: '4px' }}>
            {currentVendor.monthlyGrowth} vs last month
          </div>
        </div>

        <div
          style={{
            background: 'var(--bg-surface, #ffffff)',
            border: '1px solid var(--border-color, #e2e8f0)',
            borderRadius: '14px',
            padding: '1.1rem',
            boxShadow: '0 4px 12px rgba(0,0,0,0.03)',
          }}
        >
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600 }}>Search Impressions</div>
          <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#3b82f6', marginTop: '2px' }}>
            {currentVendor.searchImpressions.toLocaleString('en-IN')}
          </div>
          <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '4px' }}>
            Shown in smart itineraries
          </div>
        </div>

        <div
          style={{
            background: 'var(--bg-surface, #ffffff)',
            border: '1px solid var(--border-color, #e2e8f0)',
            borderRadius: '14px',
            padding: '1.1rem',
            boxShadow: '0 4px 12px rgba(0,0,0,0.03)',
          }}
        >
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600 }}>Direct Inquiries</div>
          <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#f59e0b', marginTop: '2px' }}>
            {currentVendor.inquiriesCount}
          </div>
          <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '4px' }}>
            Via WhatsApp & Website
          </div>
        </div>

        <div
          style={{
            background: 'var(--bg-surface, #ffffff)',
            border: '1px solid var(--border-color, #e2e8f0)',
            borderRadius: '14px',
            padding: '1.1rem',
            boxShadow: '0 4px 12px rgba(0,0,0,0.03)',
          }}
        >
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600 }}>Confirmed Bookings</div>
          <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#10b981', marginTop: '2px' }}>
            {currentVendor.directBookings}
          </div>
          <div style={{ fontSize: '0.72rem', color: '#059669', fontWeight: 700, marginTop: '4px' }}>
            60.2% Conversion rate
          </div>
        </div>

        <div
          style={{
            background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.12), rgba(15, 118, 110, 0.08))',
            border: '1.5px solid #10b981',
            borderRadius: '14px',
            padding: '1.1rem',
          }}
        >
          <div style={{ fontSize: '0.75rem', color: '#047857', fontWeight: 700 }}>Commission Saved</div>
          <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#0f766e', marginTop: '2px' }}>
            ₹{currentVendor.savedCommissionInr.toLocaleString('en-IN')}
          </div>
          <div style={{ fontSize: '0.72rem', color: '#059669', fontWeight: 700, marginTop: '4px' }}>
            100% kept by your business
          </div>
        </div>
      </div>

      {/* 2-COLUMN SECTION: TOURIST DEMOGRAPHICS & INTERESTS */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '1.5rem',
          marginBottom: '2rem',
        }}
      >
        {/* TOURIST ORIGINS */}
        <div
          style={{
            background: 'var(--bg-surface-elevated, #f8fafc)',
            borderRadius: '16px',
            padding: '1.25rem',
            border: '1px solid var(--border-color, #e2e8f0)',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <h4 style={{ margin: 0, fontSize: '0.95rem', color: 'var(--text-main)' }}>
              🧭 Where Are Your Tourists Coming From?
            </h4>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Top Demographics</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {currentVendor.visitorOrigins.map((vo) => (
              <div key={vo.city}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', marginBottom: '4px' }}>
                  <span style={{ fontWeight: 600 }}>{vo.city}</span>
                  <span style={{ color: '#0f766e', fontWeight: 700 }}>
                    {vo.percent}% ({vo.count})
                  </span>
                </div>
                <div style={{ width: '100%', background: '#e2e8f0', height: '6px', borderRadius: '4px', overflow: 'hidden' }}>
                  <div style={{ width: `${vo.percent}%`, height: '100%', background: '#3b82f6', borderRadius: '4px' }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* TOURIST INTEREST BREAKDOWN */}
        <div
          style={{
            background: 'var(--bg-surface-elevated, #f8fafc)',
            borderRadius: '16px',
            padding: '1.25rem',
            border: '1px solid var(--border-color, #e2e8f0)',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <h4 style={{ margin: 0, fontSize: '0.95rem', color: 'var(--text-main)' }}>
              🎯 What Are Visitors Searching For?
            </h4>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Intent Analytics</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {currentVendor.touristInterests.map((ti) => (
              <div key={ti.interest}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', marginBottom: '4px' }}>
                  <span style={{ fontWeight: 600 }}>{ti.interest}</span>
                  <span style={{ color: '#ea580c', fontWeight: 700 }}>{ti.percent}%</span>
                </div>
                <div style={{ width: '100%', background: '#e2e8f0', height: '6px', borderRadius: '4px', overflow: 'hidden' }}>
                  <div style={{ width: `${ti.percent}%`, height: '100%', background: '#ea580c', borderRadius: '4px' }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* SEASONAL DEMAND HEATMAP */}
      <div
        style={{
          background: 'var(--bg-surface-elevated, #f8fafc)',
          borderRadius: '16px',
          padding: '1.25rem',
          border: '1px solid var(--border-color, #e2e8f0)',
          marginBottom: '2rem',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <div>
            <h4 style={{ margin: 0, fontSize: '0.95rem', color: 'var(--text-main)' }}>
              📅 12-Month Tourist Demand Heatmap ({currentVendor.city})
            </h4>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              High-demand months allow premium pricing; shoulder seasons benefit from special bundle packages.
            </span>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: '6px', textAlign: 'center' }}>
          {currentVendor.seasonalDemand.map((sd) => {
            const isHigh = sd.score >= 80;
            const isMid = sd.score >= 50 && sd.score < 80;
            const bg = isHigh ? '#059669' : isMid ? '#f59e0b' : '#94a3b8';

            return (
              <div
                key={sd.month}
                style={{
                  background: 'var(--bg-surface, #ffffff)',
                  borderRadius: '10px',
                  padding: '8px 4px',
                  border: '1px solid var(--border-color, #e2e8f0)',
                }}
              >
                <div style={{ fontSize: '0.75rem', fontWeight: 700 }}>{sd.month}</div>
                <div
                  style={{
                    height: '28px',
                    borderRadius: '6px',
                    background: bg,
                    color: '#ffffff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '0.75rem',
                    fontWeight: 800,
                    margin: '6px 0 4px',
                  }}
                >
                  {sd.score}
                </div>
                <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)', whiteSpace: 'nowrap', overflow: 'hidden' }}>
                  {sd.level}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* AI ACTIONABLE INSIGHTS */}
      <div
        style={{
          background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.06), rgba(16, 185, 129, 0.06))',
          borderRadius: '16px',
          padding: '1.25rem',
          border: '1px dashed #3b82f6',
        }}
      >
        <h4 style={{ margin: '0 0 0.65rem', fontSize: '0.95rem', color: 'var(--text-main)' }}>
          🤖 Yatra 66 AI Market Recommendations for {currentVendor.name}:
        </h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {currentVendor.aiInsights.map((insight, idx) => (
            <div
              key={idx}
              style={{
                fontSize: '0.85rem',
                color: 'var(--text-main)',
                lineHeight: 1.45,
                background: 'var(--bg-surface, #ffffff)',
                padding: '0.65rem 0.85rem',
                borderRadius: '8px',
                border: '1px solid var(--border-color, #e2e8f0)',
              }}
            >
              {insight}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
