import React from 'react';
import { Smartphone, LayoutGrid, UtensilsCrossed, CreditCard, BarChart3, Store, Sparkles, TrendingUp, Clock, CheckCircle } from 'lucide-react';

export default function HeaderNav({ activeRole, setActiveRole, activeOutlet, setActiveOutlet, outlets, orders }) {
  // Calculate quick stats from orders
  const totalSales = orders.reduce((sum, o) => sum + (o.paymentStatus === 'Paid' ? o.netTotal : 0), 0);
  const activeOrdersCount = orders.filter(o => o.status !== 'Paid' && o.status !== 'Served').length;
  // Proposal math: +16% upsell from phone extras
  const extraPhoneUpsellSales = Math.round(totalSales * 0.16);

  return (
    <header style={{
      position: 'sticky',
      top: 0,
      zIndex: 500,
      background: 'rgba(10, 13, 20, 0.92)',
      backdropFilter: 'blur(16px)',
      WebkitBackdropFilter: 'blur(16px)',
      borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
      padding: '0.75rem 1.5rem',
      marginBottom: '1.5rem'
    }}>
      {/* Top Banner Row */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '1rem',
        marginBottom: '0.75rem'
      }}>
        {/* Brand Logo & Outlet */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.6rem',
            background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.15) 0%, rgba(217, 119, 6, 0.05) 100%)',
            border: '1px solid rgba(245, 158, 11, 0.3)',
            padding: '0.4rem 0.9rem',
            borderRadius: '12px'
          }}>
            <div style={{
              width: '32px',
              height: '32px',
              borderRadius: '8px',
              background: 'var(--primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#000',
              fontWeight: '800'
            }}>
              GS
            </div>
            <div>
              <div style={{ fontFamily: 'var(--font-heading)', fontWeight: '700', fontSize: '1.1rem', color: '#fff', lineHeight: 1.1 }}>
                Floorline <span style={{ fontSize: '0.75rem', color: 'var(--primary)', fontWeight: '600' }}>QR POS</span>
              </div>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                Global Scale Softwares
              </div>
            </div>
          </div>

          {/* Outlet Switcher */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', background: 'rgba(255,255,255,0.05)', padding: '0.35rem 0.75rem', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.08)' }}>
            <Store size={14} color="var(--primary)" />
            <select
              value={activeOutlet}
              onChange={(e) => setActiveOutlet(e.target.value)}
              style={{
                background: 'transparent',
                border: 'none',
                color: 'var(--text-main)',
                fontFamily: 'var(--font-body)',
                fontSize: '0.85rem',
                fontWeight: '600',
                outline: 'none',
                cursor: 'pointer'
              }}
            >
              {outlets.map(o => (
                <option key={o.id} value={o.name} style={{ background: '#0f1523', color: '#fff' }}>
                  {o.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Live Metrics Ticker Bar */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '1.2rem',
          background: 'rgba(18, 24, 38, 0.8)',
          padding: '0.4rem 1rem',
          borderRadius: '20px',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          fontSize: '0.82rem'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--accent-emerald)', boxShadow: '0 0 8px var(--accent-emerald)' }}></span>
            <span style={{ color: 'var(--text-muted)' }}>Active Orders:</span>
            <strong style={{ color: '#fff' }}>{activeOrdersCount}</strong>
          </div>
          <div style={{ height: '14px', width: '1px', background: 'rgba(255,255,255,0.1)' }}></div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <TrendingUp size={14} color="var(--accent-emerald)" />
            <span style={{ color: 'var(--text-muted)' }}>Today's Sales:</span>
            <strong style={{ color: 'var(--accent-emerald)' }}>₹{totalSales.toLocaleString('en-IN')}</strong>
          </div>
          <div style={{ height: '14px', width: '1px', background: 'rgba(255,255,255,0.1)' }}></div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <Sparkles size={14} color="var(--primary)" />
            <span style={{ color: 'var(--text-muted)' }}>QR Extras Boost (+16%):</span>
            <strong style={{ color: 'var(--primary)' }}>+₹{extraPhoneUpsellSales}</strong>
          </div>
        </div>
      </div>

      {/* Role Switcher Tabs */}
      <nav style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        overflowX: 'auto',
        paddingBottom: '0.2rem'
      }}>
        <button
          onClick={() => setActiveRole('guest')}
          className={`btn ${activeRole === 'guest' ? 'btn-primary' : 'btn-secondary'}`}
          style={{ padding: '0.5rem 1rem', fontSize: '0.88rem' }}
        >
          <Smartphone size={16} />
          Guest QR Mobile (Tableline)
        </button>

        <button
          onClick={() => setActiveRole('waiter')}
          className={`btn ${activeRole === 'waiter' ? 'btn-primary' : 'btn-secondary'}`}
          style={{ padding: '0.5rem 1rem', fontSize: '0.88rem' }}
        >
          <LayoutGrid size={16} />
          Waiters & Floor (Floorline)
        </button>

        <button
          onClick={() => setActiveRole('kitchen')}
          className={`btn ${activeRole === 'kitchen' ? 'btn-primary' : 'btn-secondary'}`}
          style={{ padding: '0.5rem 1rem', fontSize: '0.88rem' }}
        >
          <UtensilsCrossed size={16} />
          Kitchen KDS
          {activeOrdersCount > 0 && (
            <span className="badge badge-rose" style={{ padding: '0.15rem 0.4rem', fontSize: '0.7rem' }}>
              {activeOrdersCount}
            </span>
          )}
        </button>

        <button
          onClick={() => setActiveRole('counter')}
          className={`btn ${activeRole === 'counter' ? 'btn-primary' : 'btn-secondary'}`}
          style={{ padding: '0.5rem 1rem', fontSize: '0.88rem' }}
        >
          <CreditCard size={16} />
          Counter POS & Billing
        </button>

        <button
          onClick={() => setActiveRole('admin')}
          className={`btn ${activeRole === 'admin' ? 'btn-primary' : 'btn-secondary'}`}
          style={{ padding: '0.5rem 1rem', fontSize: '0.88rem' }}
        >
          <BarChart3 size={16} />
          Manager & Stock Hub (Estateline)
        </button>
      </nav>
    </header>
  );
}
