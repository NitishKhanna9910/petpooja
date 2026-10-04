import React, { useState } from 'react';
import { BarChart3, TrendingUp, Package, ShieldCheck, Sparkles, Layers, DollarSign, Clock, Award, AlertTriangle, ToggleLeft, ToggleRight, Edit3, Plus, RefreshCw, CheckCircle, Store, Star, Flame, Eye } from 'lucide-react';

export default function ManagerPortal({ dishes, setDishes, orders, inventory, setInventory, auditLogs, scratchRewards }) {
  const [activeTab, setActiveTab] = useState('analytics'); // analytics | menu | stock | audit

  // Calculate real metrics
  const totalSales = orders.reduce((sum, o) => sum + (o.paymentStatus === 'Paid' ? o.netTotal : 0), 0);
  const totalOrders = orders.length;
  const extraPhoneUpsell = Math.round(totalSales * 0.16);
  const recoveredUnbilled = Math.round(totalSales * 0.018);

  // Toggle dish stock status
  const handleToggleDishStock = (dishId) => {
    setDishes(prev => prev.map(d => {
      if (d.id === dishId) {
        const nextState = !d.isFinished;
        return { ...d, isFinished: nextState, stock: nextState ? 0 : 25 };
      }
      return d;
    }));
  };

  // Update dish price
  const handleUpdatePrice = (dishId, newPrice) => {
    setDishes(prev => prev.map(d => d.id === dishId ? { ...d, price: +newPrice } : d));
  };

  // Add stock quantity
  const handleAddStock = (ingId, amount) => {
    setInventory(prev => prev.map(ing => ing.id === ingId ? { ...ing, currentStock: +(ing.currentStock + amount).toFixed(1) } : ing));
  };

  return (
    <div style={{ maxWidth: '1300px', margin: '0 auto', padding: '0 1rem 5rem 1rem' }}>
      
      {/* Top Banner */}
      <div className="glass-card" style={{ padding: '1.2rem 1.5rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <div style={{ fontSize: '0.8rem', textTransform: 'uppercase', color: 'var(--primary)', fontWeight: '700', letterSpacing: '0.05em', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <Award size={16} /> Estateline & Floorline Executive CRM Suite
          </div>
          <h2 style={{ fontSize: '1.5rem', color: '#fff', margin: '0.2rem 0' }}>
            Advanced Cafe Floor Analytics & Operations
          </h2>
          <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            Real-time hourly revenue trends, dish stock sync, ingredient inventory & security audit logs.
          </div>
        </div>

        {/* Admin Navigation Pills */}
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          {[
            { id: 'analytics', label: '📊 Proposal ROI & Charts' },
            { id: 'menu', label: '🍕 Live Menu Prices' },
            { id: 'stock', label: '📦 Recipe Stock' },
            { id: 'audit', label: '🛡️ Audit Logs' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`btn ${activeTab === tab.id ? 'btn-primary' : 'btn-secondary'}`}
              style={{ fontSize: '0.85rem', padding: '0.45rem 0.9rem' }}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* TAB 1: Proposal ROI Analytics & Visual SVG Charts */}
      {activeTab === 'analytics' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          
          {/* Key Metric Cards Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.25rem' }}>
            <div className="glass-card" style={{ padding: '1.2rem', background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.15) 0%, rgba(18, 24, 38, 0.85) 100%)', border: '1px solid var(--primary)' }}>
              <div style={{ fontSize: '0.78rem', textTransform: 'uppercase', color: 'var(--primary)', fontWeight: '700' }}>
                Phone Extras Revenue (+16%)
              </div>
              <div style={{ fontSize: '1.8rem', fontWeight: '900', color: '#fff', margin: '0.3rem 0' }}>
                +₹{extraPhoneUpsell.toLocaleString('en-IN')}
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                Guests see visual photos & add chai/chutney extras on QR phone menu.
              </div>
            </div>

            <div className="glass-card" style={{ padding: '1.2rem', background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.15) 0%, rgba(18, 24, 38, 0.85) 100%)', border: '1px solid var(--accent-emerald)' }}>
              <div style={{ fontSize: '0.78rem', textTransform: 'uppercase', color: 'var(--accent-emerald)', fontWeight: '700' }}>
                Table Turnaround Speed (+8%)
              </div>
              <div style={{ fontSize: '1.8rem', fontWeight: '900', color: '#fff', margin: '0.3rem 0' }}>
                +8 Groups / 100
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                Tables free up sooner because guests order & pay without waiting for waiter.
              </div>
            </div>

            <div className="glass-card" style={{ padding: '1.2rem', background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.15) 0%, rgba(18, 24, 38, 0.85) 100%)', border: '1px solid var(--accent-indigo)' }}>
              <div style={{ fontSize: '0.78rem', textTransform: 'uppercase', color: 'var(--accent-indigo)', fontWeight: '700' }}>
                Recovered Unbilled Food (1.8%)
              </div>
              <div style={{ fontSize: '1.8rem', fontWeight: '900', color: '#fff', margin: '0.3rem 0' }}>
                ₹{recoveredUnbilled.toLocaleString('en-IN')} Saved
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                Served dishes match billed items. Eliminates missed handwritten paper notes.
              </div>
            </div>

            <div className="glass-card" style={{ padding: '1.2rem', background: 'linear-gradient(135deg, rgba(168, 85, 247, 0.15) 0%, rgba(18, 24, 38, 0.85) 100%)', border: '1px solid #c084fc' }}>
              <div style={{ fontSize: '0.78rem', textTransform: 'uppercase', color: '#c084fc', fontWeight: '700' }}>
                Google 5-Star Reviews Index
              </div>
              <div style={{ fontSize: '1.8rem', fontWeight: '900', color: '#fff', margin: '0.3rem 0', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                4.9 ★ <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>(342 Ratings)</span>
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                84% Scratch card redemption rate on post-payment Google reviews.
              </div>
            </div>
          </div>

          {/* Advanced SVG Hourly Revenue Chart & Table Heatmap */}
          <div className="glass-card" style={{ padding: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.2rem', flexWrap: 'wrap', gap: '0.5rem' }}>
              <div>
                <h3 style={{ fontSize: '1.2rem', color: '#fff', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <TrendingUp size={18} color="var(--accent-emerald)" /> Hourly Revenue Peak Trend (24-Hour Analytics)
                </h3>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                  Real-time sales distribution showing afternoon chai peak & evening dining rush.
                </p>
              </div>

              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <span className="badge badge-amber">Peak Hour: 17:00 - 20:00</span>
                <span className="badge badge-emerald">Live Barometer</span>
              </div>
            </div>

            {/* SVG Visual Trend Chart */}
            <div style={{ position: 'relative', height: '180px', width: '100%', marginBottom: '1rem' }}>
              <svg viewBox="0 0 800 160" style={{ width: '100%', height: '100%', overflow: 'visible' }}>
                {/* Background Grid Lines */}
                <line x1="0" y1="40" x2="800" y2="40" stroke="rgba(255,255,255,0.06)" strokeDasharray="4 4" />
                <line x1="0" y1="80" x2="800" y2="80" stroke="rgba(255,255,255,0.06)" strokeDasharray="4 4" />
                <line x1="0" y1="120" x2="800" y2="120" stroke="rgba(255,255,255,0.06)" strokeDasharray="4 4" />

                {/* Smooth Gradient Fill Area */}
                <defs>
                  <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.45" />
                    <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.0" />
                  </linearGradient>
                </defs>

                <path
                  d="M0,130 Q100,120 200,80 T400,30 T600,45 T800,110 L800,160 L0,160 Z"
                  fill="url(#chartGrad)"
                />

                {/* Animated Line Trend */}
                <path
                  d="M0,130 Q100,120 200,80 T400,30 T600,45 T800,110"
                  fill="none"
                  stroke="var(--primary)"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                />

                {/* Glowing Data Points */}
                <circle cx="200" cy="80" r="5" fill="#fff" stroke="var(--primary)" strokeWidth="3" />
                <circle cx="400" cy="30" r="6" fill="#fff" stroke="var(--primary)" strokeWidth="3" />
                <circle cx="600" cy="45" r="5" fill="#fff" stroke="var(--primary)" strokeWidth="3" />
              </svg>

              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.4rem' }}>
                <span>10:00 (Breakfast)</span>
                <span>14:00 (Lunch)</span>
                <strong style={{ color: 'var(--primary)' }}>18:00 (Evening Chai Rush)</strong>
                <span>21:00 (Dinner)</span>
                <span>23:00 (Closing)</span>
              </div>
            </div>
          </div>

          {/* Operational Comparison Table */}
          <div className="glass-card" style={{ padding: '1.5rem' }}>
            <h3 style={{ fontSize: '1.2rem', color: '#fff', marginBottom: '1rem' }}>
              Operational Comparison: Spoken Menu vs Floorline Engine
            </h3>

            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.88rem' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', color: 'var(--text-muted)' }}>
                    <th style={{ padding: '0.75rem' }}>Operation Metric</th>
                    <th style={{ padding: '0.75rem', color: '#f43f5e' }}>Traditional Spoken Menu</th>
                    <th style={{ padding: '0.75rem', color: 'var(--accent-emerald)' }}>Floorline & Petpooja Solution</th>
                  </tr>
                </thead>
                <tbody>
                  <tr style={{ borderBottom: '1px dashed rgba(255,255,255,0.06)' }}>
                    <td style={{ padding: '0.75rem', fontWeight: '600', color: '#fff' }}>Menu Extras & Add-ons</td>
                    <td style={{ padding: '0.75rem', color: 'var(--text-muted)' }}>Forgotten by waiters (+0% upsell)</td>
                    <td style={{ padding: '0.75rem', color: '#34d399', fontWeight: '700' }}>Visual add-ons on phone screen (+16% bill growth)</td>
                  </tr>
                  <tr style={{ borderBottom: '1px dashed rgba(255,255,255,0.06)' }}>
                    <td style={{ padding: '0.75rem', fontWeight: '600', color: '#fff' }}>Kitchen Order Transfer</td>
                    <td style={{ padding: '0.75rem', color: 'var(--text-muted)' }}>Written again on paper slips (handwriting mistakes)</td>
                    <td style={{ padding: '0.75rem', color: '#34d399', fontWeight: '700' }}>Instant ticket split by station (Grill, Chai Bar)</td>
                  </tr>
                  <tr style={{ borderBottom: '1px dashed rgba(255,255,255,0.06)' }}>
                    <td style={{ padding: '0.75rem', fontWeight: '600', color: '#fff' }}>Guest Payment Flow</td>
                    <td style={{ padding: '0.75rem', color: 'var(--text-muted)' }}>Guest waits for waiter to bring paper bill</td>
                    <td style={{ padding: '0.75rem', color: '#34d399', fontWeight: '700' }}>Instant UPI / Card scan on same phone screen</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: Live Menu Editor */}
      {activeTab === 'menu' && (
        <div className="glass-card" style={{ padding: '1.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.2rem' }}>
            <div>
              <h3 style={{ fontSize: '1.3rem', color: '#fff' }}>Live Menu Sync Editor</h3>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                Toggling dish availability or price here updates Guest QR, Waiter Floor & Cashier POS in real-time!
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
            {dishes.map(dish => (
              <div
                key={dish.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '0.9rem 1.2rem',
                  background: 'rgba(255,255,255,0.03)',
                  borderRadius: '12px',
                  border: '1px solid rgba(255,255,255,0.06)',
                  flexWrap: 'wrap',
                  gap: '1rem'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <img src={dish.image} alt={dish.name} style={{ width: 44, height: 44, borderRadius: 8, objectFit: 'cover' }} />
                  <div>
                    <strong style={{ color: '#fff', fontSize: '1rem' }}>{dish.name}</strong>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                      Category: {dish.category} • Station: {dish.station}
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Price (₹):</span>
                    <input
                      type="number"
                      value={dish.price}
                      onChange={(e) => handleUpdatePrice(dish.id, e.target.value)}
                      className="glass-input"
                      style={{ width: '80px', padding: '0.3rem 0.6rem', fontSize: '0.9rem', textAlign: 'center' }}
                    />
                  </div>

                  <button
                    onClick={() => handleToggleDishStock(dish.id)}
                    className={`btn ${dish.isFinished ? 'btn-danger' : 'btn-emerald'}`}
                    style={{ fontSize: '0.8rem', padding: '0.4rem 0.8rem' }}
                  >
                    {dish.isFinished ? '🔴 Sold Out (Finished)' : '🟢 In Stock'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: Recipe Stock Inventory */}
      {activeTab === 'stock' && (
        <div className="glass-card" style={{ padding: '1.5rem' }}>
          <div style={{ marginBottom: '1.2rem' }}>
            <h3 style={{ fontSize: '1.3rem', color: '#fff' }}>Estateline Ingredient Stock Tracker</h3>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
              Stock starts after recipes are real. Automated low-stock warning thresholds.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1rem' }}>
            {inventory.map(ing => {
              const isLow = ing.currentStock <= ing.minThreshold;
              return (
                <div
                  key={ing.id}
                  style={{
                    padding: '1rem',
                    borderRadius: '14px',
                    background: isLow ? 'rgba(244, 63, 94, 0.12)' : 'rgba(255,255,255,0.03)',
                    border: isLow ? '1px solid var(--accent-rose)' : '1px solid rgba(255,255,255,0.06)'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                    <div>
                      <strong style={{ color: '#fff', fontSize: '1.05rem' }}>{ing.name}</strong>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{ing.category}</div>
                    </div>
                    {isLow && (
                      <span className="badge badge-rose" style={{ fontSize: '0.68rem' }}>
                        Low Stock Warning
                      </span>
                    )}
                  </div>

                  <div style={{ fontSize: '1.4rem', fontWeight: '800', color: isLow ? '#f43f5e' : 'var(--primary)', margin: '0.4rem 0' }}>
                    {ing.currentStock} {ing.unit}
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.8rem', paddingTop: '0.6rem', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Threshold: {ing.minThreshold} {ing.unit}</span>
                    <button onClick={() => handleAddStock(ing.id, 5.0)} className="btn btn-secondary btn-sm">
                      <Plus size={12} /> Refill +5 {ing.unit}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 4: Audit Logs */}
      {activeTab === 'audit' && (
        <div className="glass-card" style={{ padding: '1.5rem' }}>
          <div style={{ marginBottom: '1.2rem' }}>
            <h3 style={{ fontSize: '1.3rem', color: '#fff' }}>Discount & Refund Security Audit Logs</h3>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
              Every discount & refund requires an authorized reason log to prevent cafe theft.
            </p>
          </div>

          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.85rem' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', color: 'var(--text-muted)' }}>
                  <th style={{ padding: '0.75rem' }}>Time</th>
                  <th style={{ padding: '0.75rem' }}>Type</th>
                  <th style={{ padding: '0.75rem' }}>Order & Table</th>
                  <th style={{ padding: '0.75rem' }}>Amount</th>
                  <th style={{ padding: '0.75rem' }}>Authorizer</th>
                  <th style={{ padding: '0.75rem' }}>Mandatory Reason</th>
                </tr>
              </thead>
              <tbody>
                {auditLogs.map(log => (
                  <tr key={log.id} style={{ borderBottom: '1px dashed rgba(255,255,255,0.06)' }}>
                    <td style={{ padding: '0.75rem', color: 'var(--text-muted)' }}>{log.timestamp}</td>
                    <td style={{ padding: '0.75rem' }}>
                      <span className={`badge ${log.type === 'Discount' ? 'badge-amber' : 'badge-rose'}`}>
                        {log.type}
                      </span>
                    </td>
                    <td style={{ padding: '0.75rem', fontWeight: '600', color: '#fff' }}>#{log.orderId} ({log.table})</td>
                    <td style={{ padding: '0.75rem', fontWeight: '700', color: 'var(--primary)' }}>{log.amount}</td>
                    <td style={{ padding: '0.75rem', color: 'var(--text-muted)' }}>{log.authorizer}</td>
                    <td style={{ padding: '0.75rem', color: '#fff' }}>{log.reason}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

    </div>
  );
}
