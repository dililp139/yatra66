import { useState, useRef, useEffect } from 'react';

const SUGGESTED_QUESTIONS = [
  'Top 5 things to do in Jaipur?',
  'Best street food spots in Old Delhi?',
  'How to book IRCTC Tatkal tickets?',
  'Is solo female travel safe in India?',
  'Best season to visit Varanasi & Ghats?',
  'Taj Mahal sunrise photography tips?'
];

// Simple markdown formatter for chat text
function FormattedMessage({ text }) {
  if (!text) return null;

  // Split by line
  const lines = text.split('\n');

  return (
    <div className="yatra-chat-text-content">
      {lines.map((line, lIdx) => {
        const trimmed = line.trim();
        if (!trimmed) {
          return <div key={lIdx} style={{ height: '6px' }} />;
        }

        // Heading ##
        if (trimmed.startsWith('### ')) {
          return (
            <h5 key={lIdx} className="chat-h5">
              {trimmed.replace(/^###\s+/, '')}
            </h5>
          );
        }
        if (trimmed.startsWith('## ')) {
          return (
            <h4 key={lIdx} className="chat-h4">
              {trimmed.replace(/^##\s+/, '')}
            </h4>
          );
        }

        // Bullet point * or -
        if (trimmed.startsWith('* ') || trimmed.startsWith('- ')) {
          const bulletContent = trimmed.replace(/^[\*\-]\s+/, '');
          return (
            <div key={lIdx} className="chat-bullet-row">
              <span className="chat-bullet-dot">•</span>
              <span>{renderInlineFormatting(bulletContent)}</span>
            </div>
          );
        }

        // Numbered list
        const numMatch = trimmed.match(/^(\d+)\.\s+(.*)/);
        if (numMatch) {
          return (
            <div key={lIdx} className="chat-numbered-row">
              <span className="chat-num-badge">{numMatch[1]}.</span>
              <span>{renderInlineFormatting(numMatch[2])}</span>
            </div>
          );
        }

        return (
          <p key={lIdx} className="chat-paragraph">
            {renderInlineFormatting(trimmed)}
          </p>
        );
      })}
    </div>
  );
}

function renderInlineFormatting(str) {
  // Bold **word**
  const parts = str.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, idx) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return (
        <strong key={idx} style={{ color: '#0f766e', fontWeight: 700 }}>
          {part.slice(2, -2)}
        </strong>
      );
    }
    return part;
  });
}

export default function YatraAiChatbot({ currentCity = 'Jaipur' }) {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 'welcome',
      role: 'assistant',
      text: `Namaste! 🙏 I am **Yatra AI**, your 24/7 India Travel Concierge powered by **Gemini 3.6**.\n\nI can help you with:\n* 🏛️ **Monuments & Sightseeing** (Timings, tickets & photography)\n* 🍛 **Authentic Gastronomy** (Legendary street food & thalis)\n* 🚂 **Transport & Trains** (IRCTC routes, Vande Bharat & local cabs)\n* 🛡️ **Safety & Helplines** (112, 1363 tourist police & safe zones)\n* 🧭 **Day Itineraries** for ${currentCity} or any Indian city\n\nHow can I help you plan your journey today?`,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);

  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [isOpen, messages, loading]);

  const handleSendMessage = async (textToSend) => {
    const query = (textToSend || input).trim();
    if (!query || loading) return;

    const userMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      text: query,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    const newHistory = [...messages, userMessage];
    setMessages(newHistory);
    setInput('');
    setLoading(true);

    try {
      // Call Cloudflare Worker endpoint /api/ai/chat
      const response = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: newHistory.map((m) => ({ role: m.role, text: m.text })),
          currentCity,
        }),
      });

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        throw new Error(errData.error || `Server responded with ${response.status}`);
      }

      const data = await response.json();
      const botReply = {
        id: `bot-${Date.now()}`,
        role: 'assistant',
        text: data.reply || 'Apologies, I could not generate a response. Please try asking again.',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, botReply]);
    } catch (err) {
      console.error('Yatra AI Chat Error:', err);
      // Helpful fallback response
      const fallbackReply = {
        id: `bot-fallback-${Date.now()}`,
        role: 'assistant',
        text: `⚠️ **Network Notice**: I encountered a temporary connection glitch (${err.message}).\n\nFor **${currentCity}**, remember you can:\n* Visit historic monuments early between 8:30 AM – 10:00 AM to avoid crowds.\n* For immediate travel assistance or emergencies, call National Helpline **112** or Tourist Police **1363**.\n* Feel free to ask me again!`,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, fallbackReply]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleClearChat = () => {
    setMessages([
      {
        id: 'reset',
        role: 'assistant',
        text: `Conversation cleared. Namaste! What travel questions can I answer for ${currentCity} or across India? 🇮🇳`,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ]);
  };

  return (
    <aside aria-label="Yatra AI Travel Assistant" className="yatra-ai-chatbot-root">
      {/* Floating Trigger Launcher Button */}
      {!isOpen && (
        <button
          type="button"
          className="yatra-chat-trigger-btn"
          onClick={() => setIsOpen(true)}
          title="Open Yatra AI Travel Concierge (Gemini 3.6)"
          aria-label="Open Yatra AI Travel Concierge"
        >
          <div className="chat-btn-sparkle-ring"></div>
          <div className="chat-btn-avatar">
            <span className="chat-btn-sparkle">✨</span>
            <span className="chat-btn-bot">🤖</span>
          </div>
          <div className="chat-btn-label">
            <span className="chat-btn-title">Ask Yatra AI</span>
            <span className="chat-btn-subtitle">Gemini 3.6 Flash</span>
          </div>
          <span className="chat-live-badge">Live</span>
        </button>
      )}

      {/* Floating Chat Window Modal */}
      {isOpen && (
        <div className="yatra-chat-window animate-chat-in">
          {/* Header */}
          <div className="yatra-chat-header">
            <div className="yatra-chat-header-info">
              <div className="yatra-avatar-container">
                <span className="yatra-avatar-icon">🧭</span>
                <span className="yatra-online-beacon"></span>
              </div>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <h4 className="yatra-chat-title">Yatra AI Travel Guide</h4>
                  <span className="gemini-tag">Gemini 3.6</span>
                </div>
                <p className="yatra-chat-sub">
                  Online • Exploring {currentCity} & All India
                </p>
              </div>
            </div>

            <div className="yatra-chat-header-actions">
              <button
                type="button"
                className="chat-action-icon-btn"
                onClick={handleClearChat}
                title="Clear conversation"
              >
                🗑️
              </button>
              <button
                type="button"
                className="chat-action-icon-btn"
                onClick={() => setIsOpen(false)}
                title="Minimize chat"
                aria-label="Minimize chat"
              >
                ✕
              </button>
            </div>
          </div>

          {/* Quick Questions Carousel */}
          <div className="yatra-chat-quick-bar">
            <span className="quick-label">⚡ Suggestions:</span>
            <div className="quick-scroll">
              {SUGGESTED_QUESTIONS.map((q, idx) => (
                <button
                  key={idx}
                  type="button"
                  className="quick-chip-btn"
                  onClick={() => handleSendMessage(q)}
                  disabled={loading}
                >
                  {q}
                </button>
              ))}
            </div>
          </div>

          {/* Messages Container */}
          <div className="yatra-chat-messages-container">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`yatra-msg-row ${msg.role === 'user' ? 'msg-user' : 'msg-bot'}`}
              >
                {msg.role !== 'user' && (
                  <div className="yatra-msg-avatar" title="Yatra AI">
                    <span>✨</span>
                  </div>
                )}
                <div className="yatra-msg-bubble">
                  <FormattedMessage text={msg.text} />
                  <span className="yatra-msg-time">{msg.time}</span>
                </div>
              </div>
            ))}

            {loading && (
              <div className="yatra-msg-row msg-bot">
                <div className="yatra-msg-avatar">
                  <span>✨</span>
                </div>
                <div className="yatra-msg-bubble yatra-typing-bubble">
                  <span className="typing-dot"></span>
                  <span className="typing-dot"></span>
                  <span className="typing-dot"></span>
                  <span style={{ fontSize: '0.8rem', color: '#64748b', marginLeft: '6px' }}>
                    Gemini synthesizing travel tips...
                  </span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Footer */}
          <form
            className="yatra-chat-footer"
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
          >
            <div className="yatra-input-wrapper">
              <input
                ref={inputRef}
                type="text"
                className="yatra-chat-input"
                placeholder={`Ask about sights, trains, street food, ${currentCity}...`}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                disabled={loading}
              />
              <button
                type="submit"
                className="yatra-chat-send-btn"
                disabled={!input.trim() || loading}
                title="Send message"
                aria-label="Send message"
              >
                {loading ? '⏳' : '➔'}
              </button>
            </div>
            <div className="yatra-chat-disclaimer">
              Powered by Google Gemini 3.6 Flash on Cloudflare • Verify official timings & IRCTC PNRs
            </div>
          </form>
        </div>
      )}
    </aside>
  );
}
