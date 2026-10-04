import React, { useState } from 'react';
import { QrCode, Printer, X, Sparkles, Star, ShieldCheck } from 'lucide-react';

export default function QrFlyerModal({ selectedTable, onClose }) {
  const [tableNumber, setTableNumber] = useState(selectedTable || 'Table 04');

  const handlePrintFlyer = () => {
    window.print();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ padding: '1.5rem', maxWidth: '440px', background: '#0f172a' }}>
        
        {/* Actions Bar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Table Tent Card QR Flyer Generator</span>
          <div style={{ display: 'flex', gap: '0.4rem' }}>
            <button onClick={handlePrintFlyer} className="btn btn-primary btn-sm">
              <Printer size={14} /> Print Tent Card
            </button>
            <button onClick={onClose} className="btn btn-secondary btn-sm">
              <X size={14} />
            </button>
          </div>
        </div>

        {/* Printable Table Tent Card Design */}
        <div className="printable-receipt" style={{
          background: 'linear-gradient(135deg, #1e1b4b 0%, #0f172a 100%)',
          color: '#fff',
          padding: '1.8rem',
          borderRadius: '16px',
          border: '2px dashed var(--primary)',
          textAlign: 'center',
          boxShadow: '0 15px 35px rgba(0,0,0,0.6)'
        }}>
          
          <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--primary)', fontWeight: '800', letterSpacing: '0.1em' }}>
            AMBER CAFE & BISTRO
          </div>
          <h2 style={{ fontSize: '1.6rem', margin: '0.2rem 0 1rem 0', fontWeight: '900', color: '#fff' }}>
            SCAN TO ORDER & PAY
          </h2>

          {/* QR Code Placeholder Graphic */}
          <div style={{
            background: '#fff',
            padding: '1.2rem',
            borderRadius: '16px',
            display: 'inline-block',
            boxShadow: '0 10px 25px rgba(0,0,0,0.3)',
            marginBottom: '1rem'
          }}>
            <QrCode size={160} color="#0f172a" />
          </div>

          <div style={{ background: 'rgba(245, 158, 11, 0.15)', border: '1px solid var(--primary)', padding: '0.4rem 1rem', borderRadius: '20px', display: 'inline-block', marginBottom: '1rem' }}>
            <strong style={{ fontSize: '1.1rem', color: 'var(--primary)' }}>{tableNumber}</strong>
          </div>

          <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: '1.4', marginBottom: '1rem' }}>
            Point your phone camera to open menu.<br />Order extras, pay with UPI, and scratch for gift rewards!
          </div>

          <div style={{ borderTop: '1px dashed rgba(255,255,255,0.2)', paddingTop: '0.8rem', fontSize: '0.72rem', color: '#fbbf24', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.3rem' }}>
            <Star size={12} fill="#fbbf24" /> Leave 5 Stars on Google & Win Instant Gift Scratch Cards
          </div>
        </div>

      </div>
    </div>
  );
}
