import React, { useState } from 'react';
import { LayoutGrid, QrCode, Move, Plus, Trash2, CheckCircle, Save, Sparkles, Printer, Eye } from 'lucide-react';
import QrFlyerModal from './QrFlyerModal';

export default function DragDropFloorplanBuilder({ tables, setTables }) {
  const [selectedTableForQr, setSelectedTableForQr] = useState(null);
  const [draggedTableId, setDraggedTableId] = useState(null);
  const [tableCountInput, setTableCountInput] = useState(tables.length);

  // Handle Drag Start
  const handleDragStart = (e, id) => {
    setDraggedTableId(id);
    e.dataTransfer.setData('text/plain', id);
  };

  // Handle Drag Over
  const handleDragOver = (e) => {
    e.preventDefault();
  };

  // Handle Drop & Re-sequence
  const handleDrop = (e, targetId) => {
    e.preventDefault();
    if (!draggedTableId || draggedTableId === targetId) return;

    const sourceIdx = tables.findIndex(t => t.id === draggedTableId);
    const targetIdx = tables.findIndex(t => t.id === targetId);

    if (sourceIdx !== -1 && targetIdx !== -1) {
      const updated = [...tables];
      const [movedItem] = updated.splice(sourceIdx, 1);
      updated.splice(targetIdx, 0, movedItem);
      setTables(updated);
    }
    setDraggedTableId(null);
  };

  // Update Table Capacities
  const handleCapacityChange = (id, newCap) => {
    setTables(prev => prev.map(t => t.id === id ? { ...t, capacity: +newCap } : t));
  };

  // Resize Tables Count
  const handleApplyTableCount = () => {
    const targetCount = Math.max(1, Math.min(50, +tableCountInput));
    if (targetCount === tables.length) return;

    if (targetCount > tables.length) {
      const newTables = [];
      for (let i = tables.length + 1; i <= targetCount; i++) {
        const tableNum = i < 10 ? `0${i}` : `${i}`;
        newTables.push({
          id: `T-${tableNum}`,
          name: `Table ${tableNum}`,
          capacity: 4,
          status: 'empty',
          activeOrderId: null
        });
      }
      setTables(prev => [...prev, ...newTables]);
    } else {
      setTables(prev => prev.slice(0, targetCount));
    }
  };

  return (
    <div style={{ maxWidth: '1300px', margin: '0 auto', padding: '0 1rem 5rem 1rem' }}>
      
      {/* Header Banner */}
      <div className="glass-card" style={{ padding: '1.2rem 1.5rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <div style={{ fontSize: '0.8rem', textTransform: 'uppercase', color: 'var(--primary)', fontWeight: '700', letterSpacing: '0.05em', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <Move size={16} /> Interactive Drag & Drop Cafe Floorplan Alignment Builder
          </div>
          <h2 style={{ fontSize: '1.5rem', color: '#fff', margin: '0.2rem 0' }}>
            Configure Cafe Tables, Drag Alignment & Unique QR Codes
          </h2>
          <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            Ask Admin table count ➔ drag and drop table sequence ➔ each table gets its unique QR code flyer.
          </div>
        </div>

        {/* Adjust Table Count Input */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(255,255,255,0.04)', padding: '0.4rem 0.8rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.08)' }}>
          <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>Total Tables:</span>
          <input
            type="number"
            min="1"
            max="50"
            value={tableCountInput}
            onChange={(e) => setTableCountInput(e.target.value)}
            className="glass-input"
            style={{ width: '64px', padding: '0.3rem', textAlign: 'center', fontSize: '0.9rem' }}
          />
          <button onClick={handleApplyTableCount} className="btn btn-primary btn-sm">
            Apply Count
          </button>
        </div>
      </div>

      {/* Drag Instruction Banner */}
      <div style={{
        background: 'rgba(16, 185, 129, 0.1)',
        border: '1px solid var(--accent-emerald)',
        padding: '0.75rem 1rem',
        borderRadius: '12px',
        marginBottom: '1.5rem',
        display: 'flex',
        alignItems: 'center',
        gap: '0.6rem',
        fontSize: '0.85rem',
        color: '#34d399'
      }}>
        <Sparkles size={18} />
        <span><strong>Drag & Drop Enabled:</strong> Click and drag any table card to re-sequence table alignment on your cafe floor. Click "Print Unique QR" on any table for its individual guest QR tent flyer.</span>
      </div>

      {/* Drag & Drop Tables Alignment Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '1.25rem' }}>
        {tables.map((table, index) => (
          <div
            key={table.id}
            draggable
            onDragStart={(e) => handleDragStart(e, table.id)}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, table.id)}
            className="glass-card"
            style={{
              padding: '1.2rem',
              cursor: 'grab',
              background: 'rgba(18, 24, 38, 0.85)',
              border: draggedTableId === table.id ? '2px dashed var(--primary)' : '1px solid rgba(255,255,255,0.08)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              position: 'relative'
            }}
          >
            {/* Top Table Info */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.8rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <div style={{
                  width: '34px',
                  height: '34px',
                  borderRadius: '10px',
                  background: 'rgba(245, 158, 11, 0.15)',
                  color: 'var(--primary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: '800',
                  fontSize: '0.9rem'
                }}>
                  #{index + 1}
                </div>
                <div>
                  <h3 style={{ fontSize: '1.15rem', color: '#fff', fontWeight: '800', margin: 0 }}>
                    {table.name}
                  </h3>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Unique Seat Code: {table.id}</div>
                </div>
              </div>

              <Move size={16} color="var(--text-muted)" title="Drag to re-align table position" />
            </div>

            {/* Capacity Input Selector */}
            <div style={{ background: 'rgba(0,0,0,0.3)', padding: '0.75rem', borderRadius: '10px', fontSize: '0.82rem', marginBottom: '1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ color: 'var(--text-muted)' }}>Seating Capacity:</span>
                <select
                  value={table.capacity}
                  onChange={(e) => handleCapacityChange(table.id, e.target.value)}
                  className="glass-input"
                  style={{ padding: '0.2rem 0.5rem', fontSize: '0.82rem' }}
                >
                  <option value={2} style={{ background: '#0f1523' }}>2 Guests</option>
                  <option value={4} style={{ background: '#0f1523' }}>4 Guests</option>
                  <option value={6} style={{ background: '#0f1523' }}>6 Guests</option>
                  <option value={8} style={{ background: '#0f1523' }}>8 Guests (VIP)</option>
                </select>
              </div>
            </div>

            {/* Unique QR Flyer Trigger */}
            <button
              onClick={() => setSelectedTableForQr(table.name)}
              className="btn btn-primary btn-sm"
              style={{ width: '100%' }}
            >
              <QrCode size={14} /> Print Unique Table QR Flyer
            </button>
          </div>
        ))}
      </div>

      {/* Printable QR Tent Flyer Modal */}
      {selectedTableForQr && (
        <QrFlyerModal
          selectedTable={selectedTableForQr}
          onClose={() => setSelectedTableForQr(null)}
        />
      )}

    </div>
  );
}
