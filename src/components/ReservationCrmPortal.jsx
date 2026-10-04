import React, { useState } from 'react';
import { Calendar, Clock, Users, Plus, CheckCircle, AlertCircle, Phone, User, BookmarkCheck, Crown, Sparkles, DollarSign } from 'lucide-react';

export default function ReservationCrmPortal({ reservations, setReservations, tables }) {
  const [showBookModal, setShowBookModal] = useState(false);
  const [isVipBooking, setIsVipBooking] = useState(false);
  const [guestName, setGuestName] = useState('');
  const [guestPhone, setGuestPhone] = useState('');
  const [partySize, setPartySize] = useState(4);
  const [resTable, setResTable] = useState('T-04');
  const [resTime, setResTime] = useState('20:30');
  const [occasion, setOccasion] = useState('General Dining');
  const [advanceDeposit, setAdvanceDeposit] = useState(0);
  const [resNotes, setResNotes] = useState('');

  const handleAddReservation = () => {
    if (!guestName || !guestPhone) return;
    const targetT = tables.find(t => t.id === resTable);
    const newRes = {
      id: `RES-${Math.floor(300 + Math.random() * 200)}`,
      customerName: guestName,
      phone: guestPhone,
      tableId: resTable,
      tableName: targetT ? targetT.name : resTable,
      partySize: partySize,
      date: 'Today',
      time: resTime,
      isVip: isVipBooking,
      occasion: occasion,
      advanceDeposit: +advanceDeposit,
      status: 'Confirmed',
      notes: resNotes
    };
    setReservations(prev => [newRes, ...prev]);
    setShowBookModal(false);
    setGuestName('');
    setGuestPhone('');
    setIsVipBooking(false);
    setAdvanceDeposit(0);
    setResNotes('');
  };

  const handleUpdateStatus = (resId, newStatus) => {
    setReservations(prev => prev.map(r => r.id === resId ? { ...r, status: newStatus } : r));
  };

  return (
    <div style={{ maxWidth: '1300px', margin: '0 auto', padding: '0 1rem 5rem 1rem' }}>
      
      {/* Header Banner */}
      <div className="glass-card" style={{ padding: '1.2rem 1.5rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <div style={{ fontSize: '0.8rem', textTransform: 'uppercase', color: 'var(--primary)', fontWeight: '700', letterSpacing: '0.05em', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <Calendar size={16} /> TableTrack VIP Reservations & Concierge CRM
          </div>
          <h2 style={{ fontSize: '1.5rem', color: '#fff', margin: '0.2rem 0' }}>
            VIP Table Booking & Reservation Queue
          </h2>
          <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            Reserve VIP lounge suites, manage advance deposits & assign special occasion concierges for guests.
          </div>
        </div>

        <button onClick={() => setShowBookModal(true)} className="btn btn-primary">
          <Crown size={16} /> Book VIP & Standard Table
        </button>
      </div>

      {/* Grid of Reservations */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '1.25rem' }}>
        {reservations.map(res => (
          <div key={res.id} className="glass-card" style={{ padding: '1.2rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', border: res.isVip ? '1px solid var(--primary)' : '1px solid rgba(255,255,255,0.08)' }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.6rem' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <span className="badge badge-indigo">{res.tableName}</span>
                    {res.isVip && (
                      <span className="badge badge-amber" style={{ display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
                        <Crown size={11} /> VIP RECEPTION
                      </span>
                    )}
                  </div>
                  <h3 style={{ fontSize: '1.2rem', color: '#fff', margin: '0.4rem 0 0.1rem 0' }}>{res.customerName}</h3>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>📞 {res.phone}</div>
                </div>
                <span className={`badge ${res.status === 'Seated' ? 'badge-emerald' : 'badge-amber'}`}>
                  {res.status}
                </span>
              </div>

              <div style={{ background: 'rgba(0,0,0,0.3)', padding: '0.8rem', borderRadius: '10px', fontSize: '0.85rem', margin: '0.8rem 0' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)', marginBottom: '0.3rem' }}>
                  <span>Time Slot:</span>
                  <strong style={{ color: '#fff' }}>{res.time} ({res.date})</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)', marginBottom: '0.3rem' }}>
                  <span>Party Size:</span>
                  <strong style={{ color: 'var(--primary)' }}>{res.partySize} Guests</strong>
                </div>
                {res.occasion && (
                  <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)', marginBottom: '0.3rem' }}>
                    <span>Occasion:</span>
                    <strong style={{ color: '#c084fc' }}>🎉 {res.occasion}</strong>
                  </div>
                )}
                {res.advanceDeposit > 0 && (
                  <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)' }}>
                    <span>Advance Deposit Paid:</span>
                    <strong style={{ color: '#34d399' }}>₹{res.advanceDeposit}.00</strong>
                  </div>
                )}
                {res.notes && (
                  <div style={{ fontSize: '0.78rem', color: '#fbbf24', marginTop: '0.5rem', borderTop: '1px dashed rgba(255,255,255,0.1)', paddingTop: '0.4rem' }}>
                    Note: {res.notes}
                  </div>
                )}
              </div>
            </div>

            <div style={{ display: 'flex', gap: '0.5rem', paddingTop: '0.6rem', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
              {res.status !== 'Seated' && (
                <button onClick={() => handleUpdateStatus(res.id, 'Seated')} className="btn btn-emerald btn-sm" style={{ flex: 1 }}>
                  Mark Guest Seated
                </button>
              )}
              <button onClick={() => handleUpdateStatus(res.id, 'Completed')} className="btn btn-secondary btn-sm" style={{ flex: 1 }}>
                Close Reservation
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Book VIP Reservation Modal */}
      {showBookModal && (
        <div className="modal-overlay" onClick={() => setShowBookModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ padding: '1.5rem', maxWidth: '520px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <Crown size={20} color="var(--primary)" />
                <h3 style={{ fontSize: '1.3rem', color: '#fff' }}>Create VIP / Standard Booking</h3>
              </div>
              <button onClick={() => setShowBookModal(false)} className="btn btn-secondary btn-sm">✕</button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', marginBottom: '1.2rem' }}>
              {/* VIP Toggle */}
              <div style={{ background: 'rgba(245,158,11,0.1)', border: '1px solid var(--primary-glow)', padding: '0.75rem', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ fontSize: '0.88rem', fontWeight: '800', color: 'var(--primary)' }}>👑 Tag as Priority VIP Reservation</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Alert waiter & kitchen staff for high-priority service</div>
                </div>
                <input
                  type="checkbox"
                  checked={isVipBooking}
                  onChange={(e) => setIsVipBooking(e.target.checked)}
                  style={{ width: 20, height: 20, accentColor: 'var(--primary)', cursor: 'pointer' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Guest Full Name</label>
                <input type="text" placeholder="e.g. Maharani Meera Deshmukh" value={guestName} onChange={(e) => setGuestName(e.target.value)} className="glass-input" style={{ width: '100%', marginTop: '0.2rem' }} />
              </div>

              <div>
                <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Phone Number</label>
                <input type="text" placeholder="e.g. +91 98290 12345" value={guestPhone} onChange={(e) => setGuestPhone(e.target.value)} className="glass-input" style={{ width: '100%', marginTop: '0.2rem' }} />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.6rem' }}>
                <div>
                  <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Select Table</label>
                  <select value={resTable} onChange={(e) => setResTable(e.target.value)} className="glass-input" style={{ width: '100%', marginTop: '0.2rem' }}>
                    {tables.map(t => (
                      <option key={t.id} value={t.id} style={{ background: '#0f1523' }}>{t.name} ({t.capacity} seats)</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Time Slot</label>
                  <input type="text" value={resTime} onChange={(e) => setResTime(e.target.value)} className="glass-input" style={{ width: '100%', marginTop: '0.2rem' }} />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.6rem' }}>
                <div>
                  <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Special Occasion</label>
                  <select value={occasion} onChange={(e) => setOccasion(e.target.value)} className="glass-input" style={{ width: '100%', marginTop: '0.2rem' }}>
                    <option value="General Dining" style={{ background: '#0f1523' }}>General Dining</option>
                    <option value="Birthday Party" style={{ background: '#0f1523' }}>🎉 Birthday Celebration</option>
                    <option value="Anniversary" style={{ background: '#0f1523' }}>💍 Anniversary Dinner</option>
                    <option value="Corporate / Business" style={{ background: '#0f1523' }}>💼 Corporate Meeting</option>
                  </select>
                </div>
                <div>
                  <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Advance Deposit (₹)</label>
                  <input type="number" placeholder="e.g. 500" value={advanceDeposit} onChange={(e) => setAdvanceDeposit(e.target.value)} className="glass-input" style={{ width: '100%', marginTop: '0.2rem' }} />
                </div>
              </div>

              <div>
                <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Concierge Notes & Requests</label>
                <input type="text" placeholder="e.g. Welcome sparkling drink on arrival..." value={resNotes} onChange={(e) => setResNotes(e.target.value)} className="glass-input" style={{ width: '100%', marginTop: '0.2rem' }} />
              </div>
            </div>

            <button onClick={handleAddReservation} className="btn btn-primary btn-lg" style={{ width: '100%' }}>
              Confirm Table Booking
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
