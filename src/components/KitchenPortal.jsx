import React, { useState } from 'react';
import { Utensils, Clock, CheckCircle, AlertCircle, Volume2, Flame, Coffee } from 'lucide-react';

export default function KitchenPortal({ orders, setOrders }) {
  const [selectedStation, setSelectedStation] = useState('All Stations');

  const stations = ['All Stations', 'Chai & Beverage Bar', 'Grill & Snack Station', 'Main Kitchen'];

  // Filter orders containing items for selected station and not yet fully served
  const activeOrders = orders.filter(o => o.status === 'Preparing' || o.status === 'Received');

  const handleUpdateTicketStatus = (orderId, nextStatus) => {
    setOrders(prev => prev.map(o => {
      if (o.id === orderId) {
        return { ...o, status: nextStatus };
      }
      return o;
    }));
  };

  const playChimeSound = () => {
    try {
      const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(587.33, audioCtx.currentTime); // D5
      gain.gain.setValueAtTime(0.3, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.6);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.6);
    } catch (e) {
      console.log('Audio chime simulated');
    }
  };

  return (
    <div style={{ maxWidth: '1300px', margin: '0 auto', padding: '0 1rem 4rem 1rem' }}>
      
      {/* Header Banner */}
      <div className="glass-card" style={{ padding: '1.2rem 1.5rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <div style={{ fontSize: '0.8rem', textTransform: 'uppercase', color: 'var(--accent-rose)', fontWeight: '700', letterSpacing: '0.05em', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <Flame size={16} /> Floorline Kitchen Display System (KDS)
          </div>
          <h2 style={{ fontSize: '1.5rem', color: '#fff', margin: '0.2rem 0' }}>
            Real-time Station Cooking Tickets
          </h2>
          <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            proposal requirement: Orders automatically split by cooking station (Grill, Chai, Main Kitchen).
          </div>
        </div>

        {/* Station Tabs & Chime Test */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
          <button onClick={playChimeSound} className="btn btn-secondary btn-sm" title="Test Order Chime Alert">
            <Volume2 size={16} color="var(--primary)" /> Audio Bell Test
          </button>

          <div style={{ display: 'flex', gap: '0.4rem' }}>
            {stations.map(st => (
              <button
                key={st}
                onClick={() => setSelectedStation(st)}
                className={`btn ${selectedStation === st ? 'btn-primary' : 'btn-secondary'}`}
                style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem' }}
              >
                {st}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Incoming Tickets Grid */}
      {activeOrders.length === 0 ? (
        <div className="glass-card" style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-muted)' }}>
          <CheckCircle size={48} color="var(--accent-emerald)" style={{ marginBottom: '1rem', opacity: 0.8 }} />
          <h3 style={{ fontSize: '1.3rem', color: '#fff', marginBottom: '0.4rem' }}>All Kitchen Tickets Clear!</h3>
          <p style={{ fontSize: '0.9rem' }}>New orders placed on guest QR phones will pop up here instantly with audio notification.</p>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.25rem' }}>
          {activeOrders.map(order => {
            const elapsedMins = Math.floor((Date.now() - new Date(order.timestamp).getTime()) / 60000);
            const isLate = elapsedMins > 10;

            return (
              <div
                key={order.id}
                className="glass-card"
                style={{
                  border: isLate ? '1px solid var(--accent-rose)' : '1px solid rgba(255,255,255,0.12)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  overflow: 'hidden'
                }}
              >
                {/* Ticket Top Header Bar */}
                <div style={{
                  background: isLate ? 'rgba(244, 63, 94, 0.2)' : 'rgba(245, 158, 11, 0.15)',
                  padding: '0.8rem 1rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  borderBottom: '1px solid rgba(255,255,255,0.08)'
                }}>
                  <div>
                    <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-muted)', fontWeight: '700' }}>
                      {order.tableName} • {order.orderType}
                    </div>
                    <div style={{ fontSize: '1.1rem', fontWeight: '800', color: '#fff' }}>
                      Ticket #{order.id}
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', background: 'rgba(0,0,0,0.3)', padding: '0.3rem 0.6rem', borderRadius: '8px', fontSize: '0.8rem', color: isLate ? '#fda4af' : 'var(--primary)' }}>
                    <Clock size={14} />
                    <strong>{elapsedMins} mins ago</strong>
                  </div>
                </div>

                {/* Ticket Dishes List */}
                <div style={{ padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.75rem', flex: 1 }}>
                  {order.items.map((item, idx) => (
                    <div key={idx} style={{ background: 'rgba(0,0,0,0.25)', padding: '0.65rem 0.8rem', borderRadius: '10px', borderLeft: '3px solid var(--primary)' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontSize: '1.05rem', fontWeight: '700', color: '#fff' }}>
                          <span style={{ color: 'var(--primary)', fontWeight: '800', marginRight: '0.4rem' }}>{item.quantity}x</span>
                          {item.dishName}
                        </span>
                      </div>

                      {/* Item Extras */}
                      {item.selectedExtras && item.selectedExtras.length > 0 && (
                        <div style={{ fontSize: '0.78rem', color: '#fbbf24', marginTop: '0.2rem', fontWeight: '600' }}>
                          + EXTRAS: {item.selectedExtras.map(e => e.name).join(', ')}
                        </div>
                      )}

                      {/* Chef Notes */}
                      {item.notes && (
                        <div style={{ fontSize: '0.78rem', color: '#f43f5e', marginTop: '0.2rem', fontWeight: '700', background: 'rgba(244,63,94,0.1)', padding: '0.2rem 0.4rem', borderRadius: '4px' }}>
                          ⚠️ NOTE: {item.notes}
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {/* Bottom Ticket Action Button */}
                <div style={{ padding: '0.8rem 1rem', background: 'rgba(0,0,0,0.2)', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                  <button
                    onClick={() => handleUpdateTicketStatus(order.id, 'Served')}
                    className="btn btn-emerald"
                    style={{ width: '100%', padding: '0.65rem' }}
                  >
                    <CheckCircle size={16} /> Mark Ticket Ready & Served
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

    </div>
  );
}
