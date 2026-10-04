import React, { useState, useRef } from 'react';
import { Move, QrCode, Plus, Trash2, CheckCircle, Sparkles, Printer, Layers, Compass, RotateCw } from 'lucide-react';
import QrFlyerModal from './QrFlyerModal';

export default function FreeCanvasFloorplanBuilder({ tables, setTables }) {
  const [activeZone, setActiveZone] = useState('Main AC Dining Hall');
  const [selectedTableForQr, setSelectedTableForQr] = useState(null);
  const [selectedTableId, setSelectedTableId] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [draggedId, setDraggedId] = useState(null);
  const canvasRef = useRef(null);

  // Available Dining Zones
  const zones = ['Main AC Dining Hall', 'Outdoor Terrace Garden', 'Window Side View', 'Private VIP Family Lounge'];

  // Table Shapes & Colors
  const shapeStyles = {
    round: { borderRadius: '50%', width: 90, height: 90, label: '⭕ Round' },
    square: { borderRadius: '14px', width: 100, height: 100, label: '🟧 Square' },
    rectangle: { borderRadius: '14px', width: 140, height: 90, label: '▭ Rectangle' },
    booth: { borderRadius: '18px', width: 160, height: 100, label: '🛋️ VIP Booth' },
    bar: { borderRadius: '50%', width: 65, height: 65, label: '🍺 Bar Stool' }
  };

  // Convert tables to 2D canvas coordinates if not already present
  const canvasTables = tables.map((t, idx) => ({
    ...t,
    x: t.x !== undefined ? t.x : (40 + (idx % 4) * 180),
    y: t.y !== undefined ? t.y : (40 + Math.floor(idx / 4) * 140),
    shape: t.shape || (t.capacity <= 2 ? 'round' : t.capacity >= 8 ? 'booth' : 'rectangle'),
    zone: t.zone || (idx % 2 === 0 ? 'Main AC Dining Hall' : 'Outdoor Terrace Garden')
  }));

  // Filter tables by active zone
  const visibleTables = canvasTables.filter(t => t.zone === activeZone);

  // Handle Dragging Table on 2D Canvas
  const handleMouseDown = (e, id) => {
    e.stopPropagation();
    setIsDragging(true);
    setDraggedId(id);
    setSelectedTableId(id);
  };

  const handleMouseMove = (e) => {
    if (!isDragging || !draggedId || !canvasRef.current) return;
    const canvasRect = canvasRef.current.getBoundingClientRect();
    const newX = Math.max(10, Math.min(canvasRect.width - 120, e.clientX - canvasRect.left - 45));
    const newY = Math.max(10, Math.min(canvasRect.height - 100, e.clientY - canvasRect.top - 45));

    setTables(prev => prev.map(t => {
      if (t.id === draggedId) {
        return { ...t, x: Math.round(newX), y: Math.round(newY) };
      }
      return t;
    }));
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setDraggedId(null);
  };

  // Update Table Shape
  const handleChangeShape = (id, newShape) => {
    setTables(prev => prev.map(t => t.id === id ? { ...t, shape: newShape } : t));
  };

  // Update Table Zone
  const handleChangeZone = (id, newZone) => {
    setTables(prev => prev.map(t => t.id === id ? { ...t, zone: newZone } : t));
  };

  const [contextMenu, setContextMenu] = useState(null); // { x, y, canvasX, canvasY }

  // Right Click Context Menu Handler
  const handleContextMenu = (e) => {
    e.preventDefault();
    if (!canvasRef.current) return;
    const canvasRect = canvasRef.current.getBoundingClientRect();
    const clickX = e.clientX - canvasRect.left;
    const clickY = e.clientY - canvasRect.top;

    setContextMenu({
      x: e.clientX,
      y: e.clientY,
      canvasX: Math.max(10, Math.min(canvasRect.width - 120, clickX)),
      canvasY: Math.max(10, Math.min(canvasRect.height - 100, clickY))
    });
  };

  const handleAddTableAtLocation = (shape = 'rectangle', capacity = 4) => {
    const nextNum = tables.length + 1;
    const numStr = nextNum < 10 ? `0${nextNum}` : `${nextNum}`;
    const newX = contextMenu ? contextMenu.canvasX : 100;
    const newY = contextMenu ? contextMenu.canvasY : 100;

    const newTable = {
      id: `T-${numStr}`,
      name: `Table ${numStr}`,
      capacity: capacity,
      status: 'empty',
      x: Math.round(newX),
      y: Math.round(newY),
      shape: shape,
      zone: activeZone
    };

    setTables(prev => [...prev, newTable]);
    setSelectedTableId(newTable.id);
    setContextMenu(null);
  };

  const selectedTableObj = canvasTables.find(t => t.id === selectedTableId);

  return (
    <div onClick={() => setContextMenu(null)} style={{ maxWidth: '1350px', margin: '0 auto', padding: '0 1rem 5rem 1rem' }}>
      
      {/* Header Banner */}
      <div className="glass-card" style={{ padding: '1.2rem 1.5rem', marginBottom: '1.2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <div style={{ fontSize: '0.8rem', textTransform: 'uppercase', color: 'var(--primary)', fontWeight: '700', letterSpacing: '0.05em', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <Compass size={16} /> 2D Architectural Dining Room Floorplan Blueprint
          </div>
          <h2 style={{ fontSize: '1.5rem', color: '#fff', margin: '0.2rem 0' }}>
            Free Drag & Drop 2D Seating Layout Canvas
          </h2>
          <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            Choose furniture elements from the palette bar or right-click anywhere on the grid canvas to place tables.
          </div>
        </div>
      </div>

      {/* SEPARATE ELEMENT PALETTE TOOLBAR (Dedicated Menu Options for Adding Elements) */}
      <div className="glass-card" style={{ padding: '1rem 1.2rem', marginBottom: '1.2rem', background: 'rgba(15, 21, 35, 0.95)' }}>
        <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--primary)', fontWeight: '800', letterSpacing: '0.06em', marginBottom: '0.6rem' }}>
          🧩 1-Click Furniture & Seating Palette Menu
        </div>
        <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap' }}>
          <button onClick={() => handleAddTableAtLocation('round', 2)} className="btn btn-secondary btn-sm" style={{ background: 'rgba(255,255,255,0.05)' }}>
            ⭕ + Round Table (2 Seats)
          </button>
          <button onClick={() => handleAddTableAtLocation('square', 4)} className="btn btn-secondary btn-sm" style={{ background: 'rgba(255,255,255,0.05)' }}>
            🟧 + Square Table (4 Seats)
          </button>
          <button onClick={() => handleAddTableAtLocation('rectangle', 6)} className="btn btn-secondary btn-sm" style={{ background: 'rgba(255,255,255,0.05)' }}>
            ▭ + Long Rectangle (6 Seats)
          </button>
          <button onClick={() => handleAddTableAtLocation('booth', 8)} className="btn btn-secondary btn-sm" style={{ background: 'rgba(255,255,255,0.05)' }}>
            🛋️ + VIP Booth Suite (8 Seats)
          </button>
          <button onClick={() => handleAddTableAtLocation('bar', 2)} className="btn btn-secondary btn-sm" style={{ background: 'rgba(255,255,255,0.05)' }}>
            🍺 + High-Top Bar Stool (2 Seats)
          </button>
        </div>
      </div>

      {/* Zone Selector Pills */}
      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.2rem', overflowX: 'auto' }}>
        {zones.map(z => (
          <button
            key={z}
            onClick={() => setActiveZone(z)}
            className={`btn ${activeZone === z ? 'btn-primary' : 'btn-secondary'}`}
            style={{ fontSize: '0.85rem', padding: '0.45rem 1rem' }}
          >
            📍 {z} ({canvasTables.filter(t => t.zone === z).length} Tables)
          </button>
        ))}
      </div>

      {/* Main 2D Canvas & Controls Split Layout */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr minmax(280px, 340px)', gap: '1.5rem' }}>
        
        {/* 2D Architectural Blueprint Canvas */}
        <div className="glass-card" style={{ padding: '1.2rem', background: '#0a0e19', border: '1px solid rgba(255,255,255,0.12)', position: 'relative' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.8rem', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            <span style={{ color: 'var(--primary)', fontWeight: '700' }}>Blueprint: {activeZone}</span>
            <span>💡 Right-Click on canvas to add tables at mouse location</span>
          </div>

          {/* Canvas Blueprint Grid Area */}
          <div
            ref={canvasRef}
            onContextMenu={handleContextMenu}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            style={{
              position: 'relative',
              width: '100%',
              height: '520px',
              background: '#070a12',
              backgroundImage: 'radial-gradient(rgba(255,255,255,0.08) 1px, transparent 1px)',
              backgroundSize: '24px 24px',
              borderRadius: '16px',
              border: '2px dashed rgba(255,255,255,0.12)',
              overflow: 'hidden',
              userSelect: 'none'
            }}
          >
            {visibleTables.length === 0 ? (
              <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                <Move size={36} color="var(--primary)" style={{ opacity: 0.5, marginBottom: '0.6rem' }} />
                <p>No tables placed in {activeZone} yet.</p>
                <p style={{ fontSize: '0.75rem', opacity: 0.7, marginTop: '0.2rem' }}>Right-click anywhere to spawn a table!</p>
                <button onClick={() => handleAddTableAtLocation('rectangle', 4)} className="btn btn-primary btn-sm" style={{ marginTop: '0.6rem' }}>
                  Place Table Here
                </button>
              </div>
            ) : (
              visibleTables.map(table => {
                const shapeConf = shapeStyles[table.shape] || shapeStyles.rectangle;
                const isSelected = selectedTableId === table.id;

                let statusColor = '#34d399'; // Green = Empty
                if (table.status === 'ordering') statusColor = '#fbbf24';
                if (table.status === 'cooking') statusColor = '#818cf8';
                if (table.status === 'served') statusColor = '#c084fc';

                return (
                  <div
                    key={table.id}
                    onMouseDown={(e) => handleMouseDown(e, table.id)}
                    style={{
                      position: 'absolute',
                      left: `${table.x}px`,
                      top: `${table.y}px`,
                      width: `${shapeConf.width}px`,
                      height: `${shapeConf.height}px`,
                      borderRadius: shapeConf.borderRadius,
                      background: isSelected ? 'linear-gradient(135deg, rgba(245, 158, 11, 0.25) 0%, rgba(18, 24, 38, 0.95) 100%)' : 'rgba(18, 24, 38, 0.9)',
                      border: isSelected ? '2px solid var(--primary)' : `2px solid ${statusColor}`,
                      boxShadow: isSelected ? '0 0 16px var(--primary-glow)' : '0 4px 14px rgba(0,0,0,0.4)',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'grab',
                      transition: isDragging && draggedId === table.id ? 'none' : 'all 0.15s ease',
                      zIndex: isSelected ? 10 : 2
                    }}
                  >
                    <div style={{ fontSize: '0.72rem', textTransform: 'uppercase', color: 'var(--text-muted)', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
                      {table.isVip && <span>👑</span>}
                      {table.name}
                    </div>
                    <div style={{ fontSize: '0.85rem', fontWeight: '800', color: '#fff' }}>
                      {table.capacity} Seats
                    </div>
                    {table.isVip && table.vipPrice && (
                      <div style={{ fontSize: '0.68rem', color: 'var(--primary)', fontWeight: '800' }}>
                        VIP Min ₹{table.vipPrice}
                      </div>
                    )}
                    <div style={{ fontSize: '0.65rem', color: statusColor, fontWeight: '700', marginTop: '0.1rem' }}>
                      ● {table.status.toUpperCase()}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Selected Table Inspector & Blueprint Controls */}
        <div className="glass-card" style={{ padding: '1.2rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          {selectedTableObj ? (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '0.6rem' }}>
                <div>
                  <span className="badge badge-amber">{selectedTableObj.name}</span>
                  <h3 style={{ fontSize: '1.2rem', color: '#fff', marginTop: '0.2rem' }}>Table Blueprint Config</h3>
                </div>
                <button onClick={() => setSelectedTableForQr(selectedTableObj.name)} className="btn btn-primary btn-sm">
                  <QrCode size={14} /> QR Flyer
                </button>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.9rem', marginBottom: '1.2rem' }}>
                <div>
                  <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Custom Table Number / Display Name</label>
                  <input
                    type="text"
                    value={selectedTableObj.name}
                    onChange={(e) => setTables(prev => prev.map(t => t.id === selectedTableObj.id ? { ...t, name: e.target.value } : t))}
                    className="glass-input"
                    style={{ width: '100%', marginTop: '0.2rem', fontWeight: '800' }}
                    placeholder="e.g. Table 01, VIP-01, Rooftop-05"
                  />
                </div>

                {/* VIP Pricing Configuration */}
                <div style={{ background: 'rgba(245, 158, 11, 0.1)', border: '1px solid var(--primary-glow)', padding: '0.8rem', borderRadius: '12px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
                    <label style={{ fontSize: '0.82rem', fontWeight: '800', color: 'var(--primary)' }}>👑 Designated VIP Table</label>
                    <input
                      type="checkbox"
                      checked={!!selectedTableObj.isVip}
                      onChange={(e) => setTables(prev => prev.map(t => t.id === selectedTableObj.id ? { ...t, isVip: e.target.checked } : t))}
                      style={{ width: 18, height: 18, accentColor: 'var(--primary)', cursor: 'pointer' }}
                    />
                  </div>
                  {selectedTableObj.isVip && (
                    <div style={{ marginTop: '0.4rem' }}>
                      <label style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>VIP Booking Fee / Minimum Spend (₹)</label>
                      <input
                        type="number"
                        value={selectedTableObj.vipPrice !== undefined ? selectedTableObj.vipPrice : 1500}
                        onChange={(e) => setTables(prev => prev.map(t => t.id === selectedTableObj.id ? { ...t, vipPrice: Math.max(0, +e.target.value) } : t))}
                        className="glass-input"
                        style={{ width: '100%', marginTop: '0.2rem', borderColor: 'var(--primary)' }}
                        placeholder="e.g. 1500"
                      />
                    </div>
                  )}
                </div>

                <div>
                  <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Table Shape on 2D Blueprint</label>
                  <select
                    value={selectedTableObj.shape}
                    onChange={(e) => handleChangeShape(selectedTableObj.id, e.target.value)}
                    className="glass-input"
                    style={{ width: '100%', marginTop: '0.2rem' }}
                  >
                    <option value="round" style={{ background: '#0f1523' }}>⭕ Round Table (2-4 guests)</option>
                    <option value="square" style={{ background: '#0f1523' }}>🟧 Square Table (4 guests)</option>
                    <option value="rectangle" style={{ background: '#0f1523' }}>▭ Rectangle Table (4-6 guests)</option>
                    <option value="booth" style={{ background: '#0f1523' }}>🛋️ VIP Booth / Sofa (6-8 guests)</option>
                    <option value="bar" style={{ background: '#0f1523' }}>🍺 High-Top Bar Stool (1-2 guests)</option>
                  </select>
                </div>

                <div>
                  <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Assigned Serving Staff (Waiter)</label>
                  <select
                    value={selectedTableObj.assignedStaff || 'Vikas Singh'}
                    onChange={(e) => setTables(prev => prev.map(t => t.id === selectedTableObj.id ? { ...t, assignedStaff: e.target.value } : t))}
                    className="glass-input"
                    style={{ width: '100%', marginTop: '0.2rem', fontWeight: '700', color: 'var(--primary)' }}
                  >
                    <option value="Vikas Singh" style={{ background: '#0f1523' }}>👤 Vikas Singh (Senior Waiter)</option>
                    <option value="Rohan Sharma" style={{ background: '#0f1523' }}>👤 Rohan Sharma (Captain)</option>
                    <option value="Priya Verma" style={{ background: '#0f1523' }}>👤 Priya Verma (Floor Staff)</option>
                    <option value="Suresh Kumar" style={{ background: '#0f1523' }}>👤 Suresh Kumar (VIP Lead)</option>
                  </select>
                </div>

                <div>
                  <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Assigned Dining Zone</label>
                  <select
                    value={selectedTableObj.zone}
                    onChange={(e) => handleChangeZone(selectedTableObj.id, e.target.value)}
                    className="glass-input"
                    style={{ width: '100%', marginTop: '0.2rem' }}
                  >
                    {zones.map(z => (
                      <option key={z} value={z} style={{ background: '#0f1523' }}>{z}</option>
                    ))}
                  </select>
                </div>

                <div style={{ background: 'rgba(0,0,0,0.3)', padding: '0.8rem', borderRadius: '10px', fontSize: '0.8rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)' }}>
                    <span>Canvas X Position:</span>
                    <strong style={{ color: 'var(--primary)' }}>{selectedTableObj.x} px</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)', marginTop: '0.3rem' }}>
                    <span>Canvas Y Position:</span>
                    <strong style={{ color: 'var(--primary)' }}>{selectedTableObj.y} px</strong>
                  </div>
                </div>

                <button
                  onClick={() => {
                    setTables(prev => prev.filter(t => t.id !== selectedTableObj.id));
                    setSelectedTableId(null);
                  }}
                  className="btn btn-secondary btn-sm"
                  style={{ borderColor: 'rgba(244,63,94,0.4)', color: '#fda4af', width: '100%' }}
                >
                  <Trash2 size={14} /> Remove Table From Map
                </button>
              </div>
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '2rem 1rem', color: 'var(--text-muted)' }}>
              Click any table on the 2D Blueprint Canvas to adjust shape, seating capacity & X/Y positions.
            </div>
          )}

          <button onClick={() => alert('2D Restaurant Blueprint saved to workspace successfully!')} className="btn btn-emerald btn-lg" style={{ width: '100%' }}>
            Save 2D Blueprint Layout
          </button>
        </div>

      </div>

      {/* Floating Right-Click Context Menu Popup */}
      {contextMenu && (
        <div
          onClick={(e) => e.stopPropagation()}
          style={{
            position: 'fixed',
            left: `${contextMenu.x}px`,
            top: `${contextMenu.y}px`,
            background: 'rgba(15, 21, 35, 0.98)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.18)',
            borderRadius: '14px',
            boxShadow: '0 10px 30px rgba(0,0,0,0.8), 0 0 20px rgba(245, 158, 11, 0.3)',
            padding: '0.5rem',
            zIndex: 1000,
            display: 'flex',
            flexDirection: 'column',
            gap: '0.3rem',
            minWidth: '210px'
          }}
        >
          <div style={{ fontSize: '0.68rem', textTransform: 'uppercase', color: 'var(--primary)', fontWeight: '800', padding: '0.3rem 0.6rem', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
            ➕ Add Table Here ({activeZone})
          </div>

          <button onClick={() => handleAddTableAtLocation('round', 2)} className="btn btn-secondary btn-sm" style={{ justifyContent: 'flex-start', fontSize: '0.8rem' }}>
            ⭕ Round Table (2 Seats)
          </button>
          <button onClick={() => handleAddTableAtLocation('square', 4)} className="btn btn-secondary btn-sm" style={{ justifyContent: 'flex-start', fontSize: '0.8rem' }}>
            🟧 Square Table (4 Seats)
          </button>
          <button onClick={() => handleAddTableAtLocation('rectangle', 6)} className="btn btn-secondary btn-sm" style={{ justifyContent: 'flex-start', fontSize: '0.8rem' }}>
            ▭ Long Rectangle (6 Seats)
          </button>
          <button onClick={() => handleAddTableAtLocation('booth', 8)} className="btn btn-secondary btn-sm" style={{ justifyContent: 'flex-start', fontSize: '0.8rem' }}>
            🛋️ VIP Booth Suite (8 Seats)
          </button>
          <button onClick={() => handleAddTableAtLocation('bar', 2)} className="btn btn-secondary btn-sm" style={{ justifyContent: 'flex-start', fontSize: '0.8rem' }}>
            🍺 High-Top Bar Stool (2 Seats)
          </button>
        </div>
      )}

      {/* Printable QR Flyer Modal */}
      {selectedTableForQr && (
        <QrFlyerModal
          selectedTable={selectedTableForQr}
          onClose={() => setSelectedTableForQr(null)}
        />
      )}

    </div>
  );
}
