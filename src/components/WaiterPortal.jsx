import React, { useState } from 'react';
import { LayoutGrid, Clock, Utensils, CheckCircle, FileText, Bell, AlertTriangle, UserCheck } from 'lucide-react';

export default function WaiterPortal({ tables, orders, setOrders, onOpenReceipt }) {
  const [selectedTable, setSelectedTable] = useState(null);
  const [statusFilter, setStatusFilter] = useState('All');

  const getTableColor = (status) => {
    switch (status) {
      case 'empty': return { bg: 'rgba(16, 185, 129, 0.1)', border: 'rgba(16, 185, 129, 0.3)', text: '#34d399', label: 'Empty / Ready' };
      case 'ordering': return { bg: 'rgba(245, 158, 11, 0.15)', border: 'rgba(245, 158, 11, 0.4)', text: '#fbbf24', label: 'Guest Ordering' };
      case 'cooking': return { bg: 'rgba(99, 102, 241, 0.15)', border: 'rgba(99, 102, 241, 0.4)', text: '#818cf8', label: 'Kitchen Cooking' };
      case 'served': return { bg: 'rgba(168, 85, 247, 0.15)', border: 'rgba(168, 85, 247, 0.4)', text: '#c084fc', label: 'Food Served' };
      case 'paid': return { bg: 'rgba(148, 163, 184, 0.1)', border: 'rgba(148, 163, 184, 0.2)', text: '#94a3b8', label: 'Bill Closed' };
      default: return { bg: 'rgba(255,255,255,0.05)', border: 'rgba(255,255,255,0.1)', text: '#fff', label: 'Unknown' };
    }
  };

  const handleUpdateOrderStatus = (orderId, newStatus) => {
    setOrders(prev => prev.map(o => {
      if (o.id === orderId) {
        return { ...o, status: newStatus };
      }
      return o;
    }));
  };

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1rem 4rem 1rem' }}>
      
      {/* Header Banner */}
      <div className="glass-card" style={{ padding: '1.2rem 1.5rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <div style={{ fontSize: '0.8rem', textTransform: 'uppercase', color: 'var(--primary)', fontWeight: '700', letterSpacing: '0.05em' }}>
            Floorline Waiter Floor Engine
          </div>
          <h2 style={{ fontSize: '1.5rem', color: '#fff', margin: '0.2rem 0' }}>
            Live Cafe Table Status & Floor Plan
          </h2>
          <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            Waiters save 2.5 hours/day: guests scan QR to order, kitchen tickets sync instantly.
          </div>
        </div>

        {/* Filter Pills */}
        <div style={{ display: 'flex', gap: '0.4rem' }}>
          {['All', 'Occupied', 'Cooking', 'Served'].map(f => (
            <button
              key={f}
              onClick={() => setStatusFilter(f)}
              className={`btn ${statusFilter === f ? 'btn-primary' : 'btn-secondary'}`}
              style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem' }}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Table Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '1.2rem' }}>
        {tables.map(table => {
          const tableOrder = orders.find(o => o.tableId === table.id && o.status !== 'Paid');
          const effectiveStatus = tableOrder ? (tableOrder.status === 'Preparing' ? 'cooking' : tableOrder.status.toLowerCase()) : table.status;
          const colors = getTableColor(effectiveStatus);

          return (
            <div
              key={table.id}
              onClick={() => setSelectedTable({ table, order: tableOrder })}
              className="glass-card"
              style={{
                padding: '1.2rem',
                cursor: 'pointer',
                background: colors.bg,
                borderColor: colors.border,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                position: 'relative'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.8rem' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                    <h3 style={{ fontSize: '1.2rem', color: '#fff', fontWeight: '800' }}>
                      {table.name}
                    </h3>
                    {table.isVip && <span style={{ fontSize: '0.9rem' }}>👑</span>}
                  </div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                    Seats: {table.capacity} guests
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--primary)', fontWeight: '700', marginTop: '0.2rem' }}>
                    👤 Waiter: {table.assignedStaff || 'Vikas Singh'}
                  </div>
                </div>
                <span className="badge" style={{ background: colors.bg, color: colors.text, border: `1px solid ${colors.border}` }}>
                  {colors.label}
                </span>
              </div>

              {/* Order Info snippet */}
              {tableOrder ? (
                <div style={{ background: 'rgba(0,0,0,0.3)', padding: '0.75rem', borderRadius: '10px', fontSize: '0.82rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', color: '#fff', fontWeight: '700', marginBottom: '0.3rem' }}>
                    <span>Order #{tableOrder.id}</span>
                    <span style={{ color: 'var(--primary)' }}>₹{tableOrder.netTotal}</span>
                  </div>
                  <div style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>
                    {tableOrder.items.map(i => `${i.quantity}x ${i.dishName}`).join(', ')}
                  </div>
                </div>
              ) : (
                <div style={{ padding: '0.75rem', fontSize: '0.82rem', color: 'var(--text-muted)', textAlign: 'center', background: 'rgba(0,0,0,0.15)', borderRadius: '10px' }}>
                  No Active Order
                </div>
              )}

              {/* Bottom Quick Action */}
              <div style={{ marginTop: '0.8rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                <span>Tap to inspect</span>
                <span style={{ color: 'var(--primary)', fontWeight: '600' }}>Inspect Details →</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Table Details Modal */}
      {selectedTable && (
        <div className="modal-overlay" onClick={() => setSelectedTable(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ padding: '1.5rem', maxWidth: '520px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <div>
                <span className="badge badge-amber">{selectedTable.table.name}</span>
                <h3 style={{ fontSize: '1.4rem', color: '#fff', margin: '0.2rem 0 0 0' }}>
                  Table Inspection & Waiter Actions
                </h3>
              </div>
              <button onClick={() => setSelectedTable(null)} className="btn btn-secondary btn-sm">✕</button>
            </div>

            {selectedTable.order ? (
              <div>
                <div style={{ background: 'rgba(255,255,255,0.03)', padding: '1rem', borderRadius: '14px', marginBottom: '1.2rem', border: '1px solid rgba(255,255,255,0.08)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                    <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Order ID:</span>
                    <strong style={{ color: '#fff' }}>#{selectedTable.order.id}</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.8rem' }}>
                    <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Current Status:</span>
                    <span className="badge badge-indigo">{selectedTable.order.status}</span>
                  </div>

                  <div style={{ fontSize: '0.85rem', fontWeight: '700', color: '#fff', marginBottom: '0.4rem' }}>
                    Dishes Ordered:
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                    {selectedTable.order.items.map((item, idx) => (
                      <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: 'var(--text-main)', padding: '0.3rem 0', borderBottom: '1px dashed rgba(255,255,255,0.06)' }}>
                        <div>
                          <strong>{item.quantity}x</strong> {item.dishName}
                          {item.selectedExtras.length > 0 && (
                            <div style={{ fontSize: '0.72rem', color: 'var(--primary)' }}>
                              + {item.selectedExtras.map(e => e.name).join(', ')}
                            </div>
                          )}
                        </div>
                        <span style={{ fontWeight: '700' }}>₹{(item.price + item.selectedExtras.reduce((s,e)=>s+e.price,0))*item.quantity}</span>
                      </div>
                    ))}
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.8rem', paddingTop: '0.6rem', borderTop: '1px solid rgba(255,255,255,0.1)', fontWeight: '800', fontSize: '1.05rem', color: 'var(--accent-emerald)' }}>
                    <span>Total Amount</span>
                    <span>₹{selectedTable.order.netTotal}</span>
                  </div>
                </div>

                {/* Waiter Actions */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                  {selectedTable.order.status === 'Preparing' && (
                    <button
                      onClick={() => {
                        handleUpdateOrderStatus(selectedTable.order.id, 'Served');
                        setSelectedTable(null);
                      }}
                      className="btn btn-emerald btn-lg"
                      style={{ width: '100%' }}
                    >
                      <CheckCircle size={18} /> Mark Order As Served To Table
                    </button>
                  )}

                  <button
                    onClick={() => {
                      onOpenReceipt(selectedTable.order);
                      setSelectedTable(null);
                    }}
                    className="btn btn-secondary btn-lg"
                    style={{ width: '100%' }}
                  >
                    <FileText size={18} /> Print / Share Digital Bill
                  </button>
                </div>
              </div>
            ) : (
              <div style={{ textAlign: 'center', padding: '2rem 1rem', color: 'var(--text-muted)' }}>
                <Utensils size={36} color="var(--primary)" style={{ marginBottom: '0.8rem', opacity: 0.5 }} />
                <p>This table currently has no active orders.</p>
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
}
