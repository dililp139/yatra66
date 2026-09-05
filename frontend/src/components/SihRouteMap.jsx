import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

export default function SihRouteMap({
  waypoints = [],
  polylineCoords = [],
  cityName = 'Jaipur',
  center = null,
  zoom = 12,
  height = '360px',
}) {
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const layerGroupRef = useRef(null);

  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (!mapInstanceRef.current) {
      const initialCenter = center || (waypoints[0] ? [waypoints[0].lat, waypoints[0].lng] : [26.9124, 75.7873]);
      const map = L.map(mapContainerRef.current, {
        center: initialCenter,
        zoom: zoom,
        zoomControl: true,
        scrollWheelZoom: false,
      });

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors | Yatra 66',
        maxZoom: 19,
      }).addTo(map);

      layerGroupRef.current = L.layerGroup().addTo(map);
      mapInstanceRef.current = map;
    }

    const map = mapInstanceRef.current;
    const layerGroup = layerGroupRef.current;
    if (!map || !layerGroup) return;

    layerGroup.clearLayers();

    const bounds = [];

    waypoints.forEach((wp, idx) => {
      if (wp.lat === undefined || wp.lng === undefined) return;

      const orderNum = wp.sequenceOrder || idx + 1;
      const isStart = idx === 0;
      const bgCol = isStart ? '#0f766e' : '#ea580c';

      const customHtml = `
        <div style="
          background: ${bgCol};
          color: white;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 800;
          font-size: 13px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.35);
          border: 2.5px solid #ffffff;
        ">
          ${orderNum}
        </div>
      `;

      const markerIcon = L.divIcon({
        className: 'sih-route-marker',
        html: customHtml,
        iconSize: [32, 32],
        iconAnchor: [16, 16],
        popupAnchor: [0, -18],
      });

      const popupContent = `
        <div style="font-family: inherit; font-size: 13px; line-height: 1.4; min-width: 180px;">
          <div style="font-size: 11px; text-transform: uppercase; font-weight: 800; color: ${bgCol}; margin-bottom: 2px;">
            Stop #${orderNum} ${isStart ? '• Starting Point' : ''}
          </div>
          <strong style="font-size: 14px; color: #0f172a; display: block; margin-bottom: 4px;">${wp.name || 'Landmark'}</strong>
          ${wp.time ? `<div style="color: #64748b; font-size: 12px; margin-bottom: 2px;">⏰ ${wp.time}</div>` : ''}
          ${wp.distFromPrevKm ? `<div style="color: #0f766e; font-size: 11px; font-weight: 700;">📍 ${wp.distFromPrevKm} km from previous stop (~${wp.transitMinsFromPrev || 15} mins)</div>` : ''}
          ${wp.type ? `<div style="color: #64748b; font-size: 11px; margin-top: 4px;">🏷️ ${wp.type}</div>` : ''}
        </div>
      `;

      const marker = L.marker([wp.lat, wp.lng], { icon: markerIcon }).bindPopup(popupContent);
      layerGroup.addLayer(marker);
      bounds.push([wp.lat, wp.lng]);
    });

    const lineCoords = polylineCoords.length > 0 ? polylineCoords : waypoints.map((w) => [w.lat, w.lng]);
    if (lineCoords.length > 1) {
      const polyline = L.polyline(lineCoords, {
        color: '#0f766e',
        weight: 4,
        opacity: 0.85,
        dashArray: '6, 8',
        lineCap: 'round',
        lineJoin: 'round',
      });
      layerGroup.addLayer(polyline);
    }

    if (bounds.length > 1) {
      map.fitBounds(bounds, { padding: [40, 40], maxZoom: 14 });
    } else if (bounds.length === 1) {
      map.setView(bounds[0], 13);
    }
  }, [waypoints, polylineCoords, center, zoom]);

  useEffect(() => {
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  return (
    <div className="sih-route-map-wrapper" style={{ position: 'relative', width: '100%', borderRadius: '16px', overflow: 'hidden' }}>
      <div
        ref={mapContainerRef}
        style={{
          width: '100%',
          height: height,
          background: 'var(--bg-surface-elevated, #f1f5f9)',
          zIndex: 1,
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: '12px',
          left: '12px',
          zIndex: 10,
          background: 'rgba(255, 255, 255, 0.92)',
          backdropFilter: 'blur(8px)',
          padding: '6px 12px',
          borderRadius: '20px',
          fontSize: '11px',
          fontWeight: 700,
          color: '#0f172a',
          boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
        }}
      >
        <span style={{ display: 'inline-block', width: '8px', height: '8px', borderRadius: '50%', background: '#0f766e' }}></span>
        <span>{cityName} Optimized Day Route Map ({waypoints.length} Stops)</span>
      </div>
    </div>
  );
}
