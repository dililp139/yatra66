import { useState } from 'react';
import { submitBusinessEnquiry } from '../services/sihData';

export default function SihEnquiryModal({ business, onClose, onSuccess }) {
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [date, setDate] = useState('');
  const [groupSize, setGroupSize] = useState('2');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  if (!business) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const enquiry = submitBusinessEnquiry({
      businessId: business.id,
      businessName: business.name,
      category: business.category,
      city: business.city,
      travelerName: name,
      contact: contact,
      travelDate: date || 'Flexible / Upcoming',
      groupSize: Number(groupSize) || 2,
      notes: message || 'Interested in booking directly with 0% platform commission.'
    });

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      if (onSuccess) onSuccess(enquiry);
    }, 600);
  };

  return (
    <div className="auth-modal-backdrop" onClick={onClose}>
      <div
        className="auth-modal-card glass-panel"
        style={{ maxWidth: '520px', width: '90%' }}
        onClick={(e) => e.stopPropagation()}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
          <div>
            <span className="card-tag" style={{ background: 'rgba(15, 118, 110, 0.12)', color: '#0f766e', fontWeight: 800 }}>
              🛡️ Verified 0% Commission Direct Connect
            </span>
            <h3 style={{ margin: '0.4rem 0 0.2rem', fontSize: '1.25rem', color: 'var(--text-main)' }}>
              {business.name}
            </h3>
            <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              📍 {business.city} • 🏷️ {business.category}
            </p>
          </div>
          <button
            type="button"
            className="auth-modal-close"
            onClick={onClose}
            aria-label="Close modal"
            style={{ background: 'var(--bg-surface-elevated, #f1f5f9)', border: 'none', width: '32px', height: '32px', borderRadius: '50%', fontSize: '1rem', cursor: 'pointer', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            ✕
          </button>
        </div>

        {submitted ? (
          <div style={{ textAlign: 'center', padding: '1.5rem 0' }}>
            <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>🎉</div>
            <h4 style={{ margin: '0 0 0.5rem', color: '#0f766e' }}>Direct Enquiry Sent Successfully!</h4>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: 1.5, margin: '0 0 1.25rem' }}>
              Your inquiry has been directly dispatched to <strong>{business.name}</strong>. The host will contact you directly via your phone/WhatsApp/email.
            </p>
            <div style={{ background: 'var(--bg-surface-elevated, #f8fafc)', padding: '0.85rem', borderRadius: '10px', fontSize: '0.825rem', color: 'var(--text-main)', marginBottom: '1.5rem', textAlign: 'left' }}>
              <div><strong>Host Direct Contact:</strong> {business.contactPhone || business.contactEmail || '+91 98290 12345'}</div>
              <div><strong>Direct Rate:</strong> {business.directRate || 'Transparent local pricing'}</div>
              <div style={{ color: '#0f766e', fontWeight: 700, marginTop: '4px' }}>✨ Zero middleman fees — 100% of payment goes to the local host!</div>
            </div>
            <button type="button" className="primary-action" onClick={onClose} style={{ width: '100%', padding: '0.75rem' }}>
              Done
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.9rem' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
              <label>
                <span style={{ fontSize: '0.825rem', fontWeight: 700, display: 'block', marginBottom: '0.25rem' }}>
                  Your Full Name *
                </span>
                <input
                  type="text"
                  className="clean-input"
                  placeholder="e.g. Rahul Sharma"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </label>

              <label>
                <span style={{ fontSize: '0.825rem', fontWeight: 700, display: 'block', marginBottom: '0.25rem' }}>
                  Phone / WhatsApp *
                </span>
                <input
                  type="text"
                  className="clean-input"
                  placeholder="+91 98765 43210"
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                  required
                />
              </label>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
              <label>
                <span style={{ fontSize: '0.825rem', fontWeight: 700, display: 'block', marginBottom: '0.25rem' }}>
                  Travel Date
                </span>
                <input
                  type="date"
                  className="clean-input"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
              </label>

              <label>
                <span style={{ fontSize: '0.825rem', fontWeight: 700, display: 'block', marginBottom: '0.25rem' }}>
                  Group Size
                </span>
                <select
                  className="clean-input"
                  value={groupSize}
                  onChange={(e) => setGroupSize(e.target.value)}
                >
                  <option value="1">1 Person (Solo)</option>
                  <option value="2">2 Persons (Couple/Friends)</option>
                  <option value="4">3 - 4 Persons (Family)</option>
                  <option value="8">5+ Persons (Group)</option>
                </select>
              </label>
            </div>

            <label>
              <span style={{ fontSize: '0.825rem', fontWeight: 700, display: 'block', marginBottom: '0.25rem' }}>
                Requirements / Special Request
              </span>
              <textarea
                className="clean-input"
                rows="3"
                placeholder="Ask about availability, custom itinerary, special dietary needs, or vehicle type..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </label>

            <div className="sih-enquiry-guarantee">
              <span className="guarantee-icon">🛡️</span>
              <span><strong>Direct Booking Guarantee:</strong> Yatra 66 charges 0% commission. 100% of your payment goes directly to the local host.</span>
            </div>

            <button
              type="submit"
              className="primary-action"
              disabled={isSubmitting}
              style={{ width: '100%', padding: '0.85rem', marginTop: '0.25rem' }}
            >
              {isSubmitting ? 'Sending Directly to Host...' : 'Send Direct Enquiry ➔'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
