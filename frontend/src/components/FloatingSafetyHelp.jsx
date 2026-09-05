import { useState, useRef, useEffect } from 'react';

export default function FloatingSafetyHelp({ onOpenSafety }) {
  const [collapsed, setCollapsed] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const dragStartRef = useRef({ startX: 0, startY: 0, posX: 0, posY: 0 });
  const hasMovedRef = useRef(false);

  const handlePointerDown = (e) => {
    // Only allow left click
    if (e.button !== 0) return;
    setIsDragging(true);
    hasMovedRef.current = false;
    dragStartRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      posX: position.x,
      posY: position.y,
    };
  };

  useEffect(() => {
    const handlePointerMove = (e) => {
      if (!isDragging) return;
      const dx = e.clientX - dragStartRef.current.startX;
      const dy = e.clientY - dragStartRef.current.startY;
      if (Math.abs(dx) > 4 || Math.abs(dy) > 4) {
        hasMovedRef.current = true;
      }
      setPosition({
        x: dragStartRef.current.posX + dx,
        y: dragStartRef.current.posY + dy,
      });
    };

    const handlePointerUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      window.addEventListener('pointermove', handlePointerMove);
      window.addEventListener('pointerup', handlePointerUp);
    }
    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
    };
  }, [isDragging]);

  const handleClick = (e) => {
    if (hasMovedRef.current) {
      e.stopPropagation();
      return;
    }
    if (onOpenSafety) onOpenSafety();
  };

  return (
    <aside
      aria-label="Tourist safety and emergency assistance"
      className={`floating-safety-pill ${collapsed ? 'collapsed' : ''} ${isDragging ? 'dragging' : ''}`}
      style={{
        transform: `translate(${position.x}px, ${position.y}px)`,
        touchAction: 'none',
      }}
      onPointerDown={handlePointerDown}
      onClick={handleClick}
      title="Tourist Safety & Helplines (112, 1363) — Click to open, drag to reposition"
    >
      <div className="safety-pulse-beacon">
        <span className="beacon-ring"></span>
        <span className="beacon-core">🛡️</span>
      </div>

      {!collapsed && (
        <div className="safety-text-group">
          <div className="safety-title-row">
            <span className="safety-title">Tourist Safety Help</span>
            <span className="safety-badge">24/7</span>
          </div>
          <span className="safety-subtitle">Dial 112 • 1363 (Tourist Police)</span>
        </div>
      )}

      <button
        type="button"
        className="safety-collapse-toggle"
        title={collapsed ? 'Expand safety widget' : 'Minimize to shield icon'}
        onClick={(e) => {
          e.stopPropagation();
          setCollapsed((prev) => !prev);
        }}
        aria-label={collapsed ? 'Expand safety widget' : 'Minimize safety widget'}
      >
        {collapsed ? '➕' : '−'}
      </button>
    </aside>
  );
}
