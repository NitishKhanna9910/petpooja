import React from 'react';
import {
  Building2,
  BarChart3,
  Smartphone,
  Users,
  Calendar,
  LayoutGrid,
  UtensilsCrossed,
  CreditCard,
  Package,
  ShieldCheck,
  Store,
  Sparkles,
  TrendingUp,
  Award,
  LogOut,
  UserCheck,
  Truck,
  FileText
} from 'lucide-react';

export default function SidebarNav({ activeView, setActiveView, activeOutlet, setActiveOutlet, outlets, orders, currentUser, onLogout }) {
  const totalSales = orders.reduce((sum, o) => sum + (o.paymentStatus === 'Paid' ? o.netTotal : 0), 0);
  const activeOrdersCount = orders.filter(o => o.status !== 'Paid' && o.status !== 'Served').length;

  const role = currentUser ? currentUser.role : 'admin';

  // 100% Pure Isolated Navigation Config per Role
  const getRoleNavItems = () => {
    switch (role) {
      case 'kitchen':
        return [
          {
            section: 'KITCHEN CHEF DESK', items: [
              { id: 'kitchen', label: '🍳 Kitchen Station Tickets', icon: UtensilsCrossed, count: activeOrdersCount }
            ]
          }
        ];

      case 'counter':
        return [
          {
            section: 'CASHIER POS DESK', items: [
              { id: 'counter', label: '💳 Cashier POS & Billing Desk', icon: CreditCard }
            ]
          }
        ];

      case 'waiter':
        return [
          {
            section: 'WAITER FLOOR DESK', items: [
              { id: 'waiter', label: '🛎️ Waiter Table Floorplan', icon: LayoutGrid }
            ]
          }
        ];

      case 'manager':
        return [
          {
            section: 'GUEST CRM DESK', items: [
              { id: 'customers', label: '👥 Guest Directory & Loyalty', icon: Users },
              { id: 'reservations', label: '📅 Table Bookings (TableTrack)', icon: Calendar }
            ]
          }
        ];

      case 'guest':
        return [
          {
            section: 'GUEST PHONE MENU', items: [
              { id: 'guest', label: '📱 Tableline QR Phone Menu', icon: Smartphone }
            ]
          }
        ];

      case 'super_admin':
        return [
          {
            section: 'SAAS MULTI-TENANT WORKSPACE', items: [
              { id: 'workspace_saas', label: '🏢 Workspaces & Outlets', icon: Building2, badge: 'SaaS' },
              { id: 'store_onboard', label: '🚀 Onboard New Store', icon: Store, badge: 'Wizard' }
            ]
          },
          {
            section: 'CRM & MANAGEMENT', items: [
              { id: 'admin', label: '📊 CRM Dashboard & ROI', icon: BarChart3 },
              { id: 'floor_builder', label: '📐 Drag & Drop Floorplan', icon: LayoutGrid, badge: 'Builder' },
              { id: 'customers', label: '👥 Guest Directory & Loyalty', icon: Users },
              { id: 'reservations', label: '📅 Table Bookings (TableTrack)', icon: Calendar },
              { id: 'menu_manage', label: '🍕 Menu & Dish Manager', icon: UtensilsCrossed, badge: 'Add/Edit' }
            ]
          }
        ];

      case 'admin':
      default:
        return [
          {
            section: 'CRM & MANAGEMENT', items: [
              { id: 'admin', label: '📊 CRM Dashboard & ROI', icon: BarChart3 },
              { id: 'floor_builder', label: '📐 Drag & Drop Floorplan', icon: LayoutGrid, badge: 'Builder' },
              { id: 'customers', label: '👥 Guest Directory & Loyalty', icon: Users },
              { id: 'reservations', label: '📅 Table Bookings (TableTrack)', icon: Calendar },
              { id: 'menu_manage', label: '🍕 Menu & Dish Manager', icon: UtensilsCrossed, badge: 'Add/Edit' }
            ]
          },
          {
            section: 'ESTATELINE INVENTORY & REPORTS', items: [
              { id: 'suppliers', label: '🚚 Suppliers & Vendor Bills', icon: Truck, badge: 'Bills' },
              { id: 'reports', label: '📄 GST Tax & Sales Reports', icon: FileText, badge: 'GST' }
            ]
          },
          {
            section: 'CAFE OPERATIONS', items: [
              { id: 'counter', label: '💳 Cashier POS & Billing Desk', icon: CreditCard },
              { id: 'kitchen', label: '🍳 Kitchen Display (KDS)', icon: UtensilsCrossed, count: activeOrdersCount },
              { id: 'waiter', label: '🛎️ Waiters & Floorplan', icon: LayoutGrid },
              { id: 'guest', label: '📱 Guest Mobile QR View', icon: Smartphone }
            ]
          }
        ];
    }
  };

  const navItems = getRoleNavItems();

  return (
    <aside style={{
      width: '270px',
      background: 'rgba(12, 16, 26, 0.98)',
      backdropFilter: 'blur(20px)',
      borderRight: '1px solid rgba(255, 255, 255, 0.08)',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      padding: '1.25rem 1rem',
      height: '100vh',
      overflowY: 'auto',
      position: 'sticky',
      top: 0,
      zIndex: 400
    }}>
      <div>
        {/* CRM Brand Header */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          paddingBottom: '1rem',
          marginBottom: '1rem',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)'
        }}>
          <div style={{
            width: '38px',
            height: '38px',
            borderRadius: '12px',
            background: 'linear-gradient(135deg, var(--primary) 0%, #d97706 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#000',
            fontWeight: '900',
            fontSize: '1.15rem',
            boxShadow: '0 4px 14px var(--primary-glow)'
          }}>
            GS
          </div>
          <div>
            <div style={{ fontFamily: 'var(--font-heading)', fontWeight: '800', fontSize: '1.1rem', color: '#fff', lineHeight: 1.1 }}>
              Floorline <span style={{ color: 'var(--primary)', fontSize: '0.7rem' }}>POS</span>
            </div>
            <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
              Global Scale Softwares
            </div>
          </div>
        </div>

        {/* Logged-In User Card */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.04)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          padding: '0.7rem 0.8rem',
          borderRadius: '12px',
          marginBottom: '1.2rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <div style={{
              width: 32,
              height: 32,
              borderRadius: '50%',
              background: 'var(--primary)',
              color: '#000',
              fontWeight: '800',
              fontSize: '0.8rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              {currentUser ? currentUser.name.slice(0, 2).toUpperCase() : 'US'}
            </div>
            <div>
              <div style={{ fontSize: '0.82rem', fontWeight: '800', color: '#fff', lineHeight: 1.1 }}>
                {currentUser ? currentUser.name : 'Active User'}
              </div>
              <span className="badge badge-amber" style={{ fontSize: '0.62rem', padding: '0.1rem 0.4rem', marginTop: '0.2rem' }}>
                {role.toUpperCase()} DESK
              </span>
            </div>
          </div>
        </div>

        {/* Outlet Switcher (Only visible for Super Admin) */}
        {role === 'super_admin' && (
          <div style={{
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(255,255,255,0.06)',
            padding: '0.6rem 0.8rem',
            borderRadius: '12px',
            marginBottom: '1.2rem'
          }}>
            <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: '700', marginBottom: '0.2rem' }}>
              Active Franchise Outlet
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <Store size={14} color="var(--primary)" />
              <select
                value={activeOutlet}
                onChange={(e) => setActiveOutlet(e.target.value)}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: '#fff',
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.82rem',
                  fontWeight: '700',
                  outline: 'none',
                  width: '100%',
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
        )}

        {/* Dynamic Navigation Options */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
          {navItems.map((group, idx) => (
            <div key={idx}>
              <div style={{ fontSize: '0.68rem', textTransform: 'uppercase', color: 'var(--text-dim)', fontWeight: '800', letterSpacing: '0.08em', marginBottom: '0.4rem', paddingLeft: '0.5rem' }}>
                {group.section}
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
                {group.items.map(item => {
                  const Icon = item.icon;
                  const isActive = activeView === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setActiveView(item.id)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '0.65rem 0.85rem',
                        borderRadius: '10px',
                        background: isActive ? 'rgba(245, 158, 11, 0.15)' : 'transparent',
                        border: isActive ? '1px solid var(--primary)' : '1px solid transparent',
                        color: isActive ? '#fff' : 'var(--text-muted)',
                        fontFamily: 'var(--font-body)',
                        fontSize: '0.88rem',
                        fontWeight: isActive ? '700' : '500',
                        cursor: 'pointer',
                        transition: 'all 0.18s ease'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                        <Icon size={17} color={isActive ? 'var(--primary)' : 'var(--text-muted)'} />
                        <span>{item.label}</span>
                      </div>

                      {item.badge && (
                        <span className="badge badge-amber" style={{ fontSize: '0.65rem', padding: '0.1rem 0.4rem' }}>
                          {item.badge}
                        </span>
                      )}

                      {item.count > 0 && (
                        <span className="badge badge-rose" style={{ fontSize: '0.65rem', padding: '0.1rem 0.4rem' }}>
                          {item.count}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Sign Out Button */}
      <div>
        <button
          onClick={onLogout}
          className="btn btn-secondary"
          style={{ width: '100%', padding: '0.65rem', fontSize: '0.85rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem', borderColor: 'rgba(244,63,94,0.4)', color: '#fda4af' }}
        >
          <LogOut size={16} /> Sign Out ({role.toUpperCase()})
        </button>
      </div>
    </aside>
  );
}
