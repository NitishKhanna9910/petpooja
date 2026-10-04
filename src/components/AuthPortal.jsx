import React, { useState } from 'react';
import { LogIn, UserPlus, Shield, UserCheck, UtensilsCrossed, CreditCard, Smartphone, LayoutGrid, BarChart3, Lock, CheckCircle, Store, ArrowRight, Building, Mail, Phone, Key, User } from 'lucide-react';

export default function AuthPortal({ onLoginSuccess, onGuestSelect }) {
  const [authMode, setAuthMode] = useState('signin'); // 'signin' | 'signup'
  
  // Sign In Form State
  const [email, setEmail] = useState('admin@gssoftwares.com');
  const [password, setPassword] = useState('••••••••');
  const [selectedRole, setSelectedRole] = useState('admin');

  // Sign Up Form State
  const [signUpName, setSignUpName] = useState('');
  const [signUpCafeName, setSignUpCafeName] = useState('');
  const [signUpEmail, setSignUpEmail] = useState('');
  const [signUpPhone, setSignUpPhone] = useState('');
  const [signUpPlan, setSignUpPlan] = useState('Floorline Pro');
  const [signUpPassword, setSignUpPassword] = useState('');

  // Quick Demo Logins
  const demoAccounts = [
    { role: 'super_admin', title: '🌐 Multi-Tenant Super Admin', email: 'superadmin@gssoftwares.com', desc: 'Multi-outlet franchise management, SaaS workspaces & store onboarding wizard', icon: Building, view: 'workspace_saas' },
    { role: 'admin', title: '👑 Cafe / Hotel Manager', email: 'admin@ambercafe.com', desc: 'Full access to CRM Dashboard, Menu Editor & 2D Floorplan Builder', icon: BarChart3, view: 'admin' },
    { role: 'manager', title: '👥 Guest CRM Manager', email: 'crm@ambercafe.com', desc: 'Manage Guest Directory, Loyalty points & TableTrack Reservations', icon: UserCheck, view: 'customers' },
    { role: 'counter', title: '💳 Cashier POS Desk', email: 'cashier@ambercafe.com', desc: 'Dine-In & Takeaway billing, discounts & thermal receipts', icon: CreditCard, view: 'counter' },
    { role: 'kitchen', title: '🍳 Kitchen Chef (KDS)', email: 'kitchen@ambercafe.com', desc: 'Station split tickets (Grill, Chai Bar, Main Kitchen)', icon: UtensilsCrossed, view: 'kitchen' },
    { role: 'waiter', title: '🛎️ Waiter & Floor Staff', email: 'waiter@ambercafe.com', desc: '12-table floor plan grid with live table status indicators', icon: LayoutGrid, view: 'waiter' },
    { role: 'guest', title: '📱 Guest Mobile QR View', email: 'guest-table-04', desc: 'Simulate guest table QR scan, menu browser & scratch card', icon: Smartphone, view: 'guest' }
  ];

  const handleSelectDemoAccount = (acc) => {
    setSelectedRole(acc.role);
    setEmail(acc.email);
    if (acc.role === 'guest') {
      onGuestSelect('Table 04');
    } else {
      onLoginSuccess({
        id: `user-${acc.role}`,
        name: acc.title.split(' ')[1] + ' User',
        email: acc.email,
        role: acc.role,
        initialView: acc.view
      });
    }
  };

  const handleSignInSubmit = (e) => {
    e.preventDefault();
    const acc = demoAccounts.find(a => a.role === selectedRole) || demoAccounts[0];
    onLoginSuccess({
      id: `user-${acc.role}`,
      name: acc.title.split(' ')[1] + ' User',
      email: email,
      role: selectedRole,
      initialView: acc.view
    });
  };

  const handleSignUpSubmit = (e) => {
    e.preventDefault();
    if (!signUpName || !signUpEmail || !signUpCafeName) return;

    onLoginSuccess({
      id: `user-${Date.now()}`,
      name: `${signUpName} (${signUpCafeName})`,
      email: signUpEmail,
      role: 'admin',
      initialView: 'workspace_saas',
      cafeName: signUpCafeName,
      plan: signUpPlan
    });
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'var(--bg-dark)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem 1rem',
      position: 'relative'
    }}>
      <div style={{ width: '100%', maxWidth: '960px' }}>
        
        {/* Brand Header */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{
            width: '56px',
            height: '56px',
            borderRadius: '16px',
            background: 'linear-gradient(135deg, var(--primary) 0%, #d97706 100%)',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#000',
            fontWeight: '900',
            fontSize: '1.7rem',
            boxShadow: '0 6px 20px var(--primary-glow)',
            marginBottom: '0.8rem'
          }}>
            GS
          </div>
          <h1 style={{ fontSize: '2.2rem', color: '#fff', fontWeight: '800' }}>
            Floorline SaaS Platform Authentication
          </h1>
          <p style={{ fontSize: '0.92rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
            Sign in to your cafe workspace or create a new multi-tenant organization account.
          </p>

          {/* Sign In vs Sign Up Toggle Pills */}
          <div style={{ display: 'inline-flex', gap: '0.4rem', background: 'rgba(255,255,255,0.05)', padding: '0.35rem', borderRadius: 'var(--radius-full)', marginTop: '1.2rem', border: '1px solid rgba(255,255,255,0.08)' }}>
            <button
              onClick={() => setAuthMode('signin')}
              className={`btn ${authMode === 'signin' ? 'btn-primary' : 'btn-secondary'}`}
              style={{ padding: '0.45rem 1.4rem', fontSize: '0.88rem', borderRadius: 'var(--radius-full)' }}
            >
              <LogIn size={16} /> Sign In To Account
            </button>
            <button
              onClick={() => setAuthMode('signup')}
              className={`btn ${authMode === 'signup' ? 'btn-primary' : 'btn-secondary'}`}
              style={{ padding: '0.45rem 1.4rem', fontSize: '0.88rem', borderRadius: 'var(--radius-full)' }}
            >
              <UserPlus size={16} /> Create New SaaS Account
            </button>
          </div>
        </div>

        {/* AUTH MODE 1: SIGN IN */}
        {authMode === 'signin' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'minmax(300px, 380px) 1fr', gap: '1.5rem', alignItems: 'start' }}>
            
            {/* Left: Credentials Sign In */}
            <div className="glass-card" style={{ padding: '1.8rem' }}>
              <h3 style={{ fontSize: '1.2rem', color: '#fff', marginBottom: '1.2rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Lock size={18} color="var(--primary)" /> Sign In Credentials
              </h3>

              <form onSubmit={handleSignInSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div>
                  <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Work Email / User ID</label>
                  <input
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="glass-input"
                    style={{ width: '100%', marginTop: '0.2rem' }}
                    required
                  />
                </div>

                <div>
                  <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Password / PIN</label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="glass-input"
                    style={{ width: '100%', marginTop: '0.2rem' }}
                    required
                  />
                </div>

                <button type="submit" className="btn btn-primary btn-lg" style={{ marginTop: '0.5rem', width: '100%' }}>
                  <LogIn size={18} /> Sign In To Workspace →
                </button>
              </form>

              <div style={{ marginTop: '1.5rem', paddingTop: '1rem', borderTop: '1px solid rgba(255,255,255,0.08)', fontSize: '0.75rem', color: 'var(--text-muted)', textAlign: 'center' }}>
                <Shield size={14} color="var(--accent-emerald)" style={{ verticalAlign: 'middle', marginRight: '0.3rem' }} />
                256-Bit Encrypted Multi-Tenant Session
              </div>
            </div>

            {/* Right: Quick Demo Accounts */}
            <div className="glass-card" style={{ padding: '1.8rem' }}>
              <div style={{ marginBottom: '1.2rem' }}>
                <span className="badge badge-amber">ONE-CLICK DEMO ACCESS</span>
                <h3 style={{ fontSize: '1.3rem', color: '#fff', marginTop: '0.2rem' }}>
                  Select Persona Role Portal
                </h3>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {demoAccounts.map(acc => {
                  const Icon = acc.icon;
                  return (
                    <div
                      key={acc.role}
                      onClick={() => handleSelectDemoAccount(acc)}
                      style={{
                        padding: '0.85rem 1.1rem',
                        borderRadius: '14px',
                        background: 'rgba(255,255,255,0.03)',
                        border: '1px solid rgba(255,255,255,0.08)',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        transition: 'all 0.2s ease'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                        <div style={{
                          width: 38,
                          height: 38,
                          borderRadius: 10,
                          background: 'rgba(245, 158, 11, 0.15)',
                          color: 'var(--primary)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}>
                          <Icon size={20} />
                        </div>
                        <div>
                          <strong style={{ color: '#fff', fontSize: '0.95rem' }}>{acc.title}</strong>
                          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{acc.desc}</div>
                        </div>
                      </div>

                      <ArrowRight size={16} color="var(--primary)" />
                    </div>
                  );
                })}
              </div>
            </div>

          </div>
        )}

        {/* AUTH MODE 2: SIGN UP */}
        {authMode === 'signup' && (
          <div className="glass-card" style={{ padding: '2rem', maxWidth: '640px', margin: '0 auto' }}>
            <div style={{ marginBottom: '1.5rem', textAlign: 'center' }}>
              <span className="badge badge-emerald">14-DAY FREE TRIAL</span>
              <h3 style={{ fontSize: '1.5rem', color: '#fff', marginTop: '0.3rem' }}>
                Register Your Cafe Workspace
              </h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                No credit card required. Full access to Tableline, Floorline & Estateline modules.
              </p>
            </div>

            <form onSubmit={handleSignUpSubmit} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div>
                <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Your Full Name</label>
                <input
                  type="text"
                  placeholder="e.g. Vikramaditya Singh"
                  value={signUpName}
                  onChange={(e) => setSignUpName(e.target.value)}
                  className="glass-input"
                  style={{ width: '100%', marginTop: '0.2rem' }}
                  required
                />
              </div>

              <div>
                <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Cafe / Business Name</label>
                <input
                  type="text"
                  placeholder="e.g. Royal Brews Cafe"
                  value={signUpCafeName}
                  onChange={(e) => setSignUpCafeName(e.target.value)}
                  className="glass-input"
                  style={{ width: '100%', marginTop: '0.2rem' }}
                  required
                />
              </div>

              <div>
                <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Work Email Address</label>
                <input
                  type="email"
                  placeholder="vikram@royalbrews.com"
                  value={signUpEmail}
                  onChange={(e) => setSignUpEmail(e.target.value)}
                  className="glass-input"
                  style={{ width: '100%', marginTop: '0.2rem' }}
                  required
                />
              </div>

              <div>
                <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Phone Number</label>
                <input
                  type="text"
                  placeholder="+91 98290 12345"
                  value={signUpPhone}
                  onChange={(e) => setSignUpPhone(e.target.value)}
                  className="glass-input"
                  style={{ width: '100%', marginTop: '0.2rem' }}
                  required
                />
              </div>

              <div style={{ gridColumn: 'span 2' }}>
                <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Select Initial Plan</label>
                <select value={signUpPlan} onChange={(e) => setSignUpPlan(e.target.value)} className="glass-input" style={{ width: '100%', marginTop: '0.2rem' }}>
                  <option value="Tableline Starter" style={{ background: '#0f1523' }}>Tableline Starter (₹1,499/mo - Single Outlet)</option>
                  <option value="Floorline Pro" style={{ background: '#0f1523' }}>Floorline Pro (₹2,999/mo - Counter POS & KDS)</option>
                  <option value="Enterprise Estateline" style={{ background: '#0f1523' }}>Enterprise Estateline (₹4,999/mo - Multi-Outlet & Stock)</option>
                </select>
              </div>

              <div style={{ gridColumn: 'span 2' }}>
                <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Create Account Password</label>
                <input
                  type="password"
                  placeholder="Minimum 8 characters"
                  value={signUpPassword}
                  onChange={(e) => setSignUpPassword(e.target.value)}
                  className="glass-input"
                  style={{ width: '100%', marginTop: '0.2rem' }}
                  required
                />
              </div>

              <div style={{ gridColumn: 'span 2', marginTop: '0.5rem' }}>
                <button type="submit" className="btn btn-emerald btn-lg" style={{ width: '100%' }}>
                  Create Cafe Workspace & Launch Platform →
                </button>
              </div>
            </form>
          </div>
        )}

      </div>
    </div>
  );
}
