import React, { useState } from 'react';
import { Smartphone, UtensilsCrossed, CreditCard, BarChart3, Award, Sparkles, CheckCircle, ArrowRight, Star, ShieldCheck, QrCode, Play, Users, DollarSign, Clock, Store, HelpCircle, Mail, Phone, MapPin, Building2, ChevronDown, ChevronUp, Globe } from 'lucide-react';
import { SAAS_PLANS } from '../data/mockSaasData';

export default function LandingPage({ onLaunchLogin, onLaunchGuestQr }) {
  // Multi-page Sub-navigation State: 'home' | 'tableline' | 'floorline' | 'estateline' | 'pricing' | 'contact'
  const [activeTab, setActiveTab] = useState('home');

  // ROI Calculator State
  const [dailyGuests, setDailyGuests] = useState(140);
  const [avgBill, setAvgBill] = useState(420);
  const [openDays, setOpenDays] = useState(26);

  // FAQ Accordion State
  const [openFaq, setOpenFaq] = useState(0);

  // Proposal Math Calculations
  const monthlyBaseSales = Math.round((dailyGuests * avgBill * openDays) / 100000);
  const monthlyExtraRevenue = Math.round(dailyGuests * avgBill * openDays * 0.104);
  const yearlyExtraSales = Math.round((monthlyExtraRevenue * 12) / 100000);

  const faqs = [
    {
      q: "Does the guest need to download an app to view the menu?",
      a: "No app download required! The guest simply points their phone camera at the square QR code on their table. It opens their table menu directly in their mobile browser with instant UPI payment support."
    },
    {
      q: "How does the +16% extra phone bill upsell work?",
      a: "When guests order on their phone, they see high-res dish photos and customized extras (like extra ginger spice, saffron, or chutney add-ons). Guests add more extras compared to spoken waiter orders, driving bill growth."
    },
    {
      q: "How are kitchen tickets handled for split stations?",
      a: "Orders are automatically split by where the dish is cooked. For example, chai and beverages route to the Chai Counter KDS, while tandoori tikka routes to the Grill Station KDS."
    },
    {
      q: "Can staff give unauthorized discounts or refunds?",
      a: "No. Every discount or refund requires manager authorization and a mandatory logged reason (e.g. Happy Hour Promo, Quality Adjustment) which is recorded in the security audit logs."
    },
    {
      q: "How does the Google Review scratch card work?",
      a: "After paying the bill on their phone, guests rate their meal. 5-star ratings prompt the guest to post on Google Reviews and unlock an interactive gift scratch card (e.g. 15% OFF next visit)."
    }
  ];

  return (
    <div style={{ background: 'var(--bg-dark)', color: 'var(--text-main)', minHeight: '100vh', fontFamily: 'var(--font-body)' }}>
      
      {/* Top Multi-Page Navigation Header */}
      <header style={{
        position: 'sticky',
        top: 0,
        zIndex: 500,
        background: 'rgba(10, 13, 20, 0.94)',
        backdropFilter: 'blur(16px)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
        padding: '0.85rem 1.5rem'
      }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
          
          {/* Logo & Brand */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer' }} onClick={() => setActiveTab('home')}>
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
              <div style={{ fontFamily: 'var(--font-heading)', fontWeight: '800', fontSize: '1.15rem', color: '#fff', lineHeight: 1.1 }}>
                Floorline <span style={{ color: 'var(--primary)', fontSize: '0.75rem' }}>Platform</span>
              </div>
              <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                Global Scale Softwares
              </div>
            </div>
          </div>

          {/* Multi-Page Navigation Tabs */}
          <nav style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
            {[
              { id: 'home', label: '🏠 Home' },
              { id: 'tableline', label: '📱 Tableline (Guest QR)' },
              { id: 'floorline', label: '🍳 Floorline (POS & KDS)' },
              { id: 'estateline', label: '📦 Estateline (Inventory)' },
              { id: 'pricing', label: '💰 Plans & Pricing' },
              { id: 'contact', label: '📞 Contact & Sales' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`btn ${activeTab === tab.id ? 'btn-primary' : 'btn-secondary'}`}
                style={{ padding: '0.4rem 0.85rem', fontSize: '0.82rem' }}
              >
                {tab.label}
              </button>
            ))}
          </nav>

          {/* Header Action CTAs */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <button onClick={() => onLaunchGuestQr('Table 04')} className="btn btn-outline btn-sm">
              <QrCode size={14} /> Demo Table QR
            </button>
            <button onClick={onLaunchLogin} className="btn btn-emerald btn-sm">
              Login To Workspace →
            </button>
          </div>
        </div>
      </header>

      {/* PAGE 1: HOME PAGE */}
      {activeTab === 'home' && (
        <div>
          {/* Hero Banner */}
          <section style={{ padding: '4.5rem 1.5rem 3.5rem 1.5rem', textAlign: 'center', position: 'relative' }}>
            <div style={{ maxWidth: '920px', margin: '0 auto' }}>
              <span className="badge badge-amber" style={{ padding: '0.5rem 1.2rem', fontSize: '0.85rem', marginBottom: '1.4rem', border: '1px solid var(--primary-glow)', boxShadow: '0 0 20px var(--primary-glow)' }}>
                ✨ TABLELINE & FLOORLINE • CAFÉ & HOTEL QR PLATFORM
              </span>
              <h1 style={{ fontSize: '3.5rem', fontWeight: '900', color: '#fff', lineHeight: '1.12', marginBottom: '1.4rem', background: 'linear-gradient(135deg, #ffffff 0%, #cbd5e1 50%, var(--primary-light) 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                One Menu, One Order & One Bill For Your Hotel & Cafe.
              </h1>
              <p style={{ fontSize: '1.2rem', color: 'var(--text-muted)', lineHeight: '1.6', marginBottom: '2.5rem', maxWidth: '800px', margin: '0 auto 2.5rem auto' }}>
                The guest scans the table QR code, orders, pays, and leaves a Google review. Your kitchen, waiters, and cashier operate in real-time from that single unified workspace.
              </p>

              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '3rem' }}>
                <button onClick={onLaunchLogin} className="btn btn-primary btn-lg" style={{ gap: '0.6rem' }}>
                  Start Free 14-Day Workspace Trial <ArrowRight size={20} />
                </button>
                <button onClick={() => onLaunchGuestQr('Table 04')} className="btn btn-secondary btn-lg" style={{ gap: '0.6rem' }}>
                  <QrCode size={20} color="var(--primary)" /> Try Live Table QR Demo
                </button>
              </div>

              {/* Feature Impact Highlights Grid */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginTop: '3.5rem' }}>
                <div className="glass-card" style={{ padding: '1.2rem', borderColor: 'var(--primary-glow)' }}>
                  <div style={{ fontSize: '2rem', fontWeight: '900', color: 'var(--primary)' }}>+16%</div>
                  <div style={{ fontSize: '0.85rem', color: '#fff', fontWeight: '700', marginTop: '0.2rem' }}>Higher Phone Bill Size</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>From visual dish extras & add-ons</div>
                </div>
                <div className="glass-card" style={{ padding: '1.2rem', borderColor: 'var(--accent-emerald-glow)' }}>
                  <div style={{ fontSize: '2rem', fontWeight: '900', color: 'var(--accent-emerald)' }}>+8%</div>
                  <div style={{ fontSize: '0.85rem', color: '#fff', fontWeight: '700', marginTop: '0.2rem' }}>Faster Table Turnaround</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Instant QR ordering & payment</div>
                </div>
                <div className="glass-card" style={{ padding: '1.2rem', borderColor: 'var(--accent-indigo-glow)' }}>
                  <div style={{ fontSize: '2rem', fontWeight: '900', color: 'var(--accent-indigo)' }}>1.8%</div>
                  <div style={{ fontSize: '0.85rem', color: '#fff', fontWeight: '700', marginTop: '0.2rem' }}>Recovered Unbilled Food</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Automatic station KDS sync</div>
                </div>
                <div className="glass-card" style={{ padding: '1.2rem', borderColor: 'rgba(192, 132, 252, 0.4)' }}>
                  <div style={{ fontSize: '2rem', fontWeight: '900', color: '#c084fc' }}>2.5 Hrs</div>
                  <div style={{ fontSize: '0.85rem', color: '#fff', fontWeight: '700', marginTop: '0.2rem' }}>Staff Hours Saved</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Daily waiter labor optimization</div>
                </div>
              </div>

              {/* Module Showcase Grid (Tableline, Floorline, Estateline) */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', marginTop: '3rem', textAlign: 'left' }}>
                <div className="glass-card" style={{ padding: '1.5rem', background: 'linear-gradient(135deg, rgba(251, 191, 36, 0.08) 0%, rgba(14, 20, 33, 0.95) 100%)' }}>
                  <span className="badge badge-amber" style={{ marginBottom: '0.8rem' }}>📱 TABLELINE</span>
                  <h3 style={{ fontSize: '1.25rem', color: '#fff', marginBottom: '0.4rem' }}>Interactive Guest QR Menu</h3>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.5, marginBottom: '1rem' }}>
                    Table-aware QR ordering with dish photos, customizable extras, instant UPI payment, and 5-star review scratch cards.
                  </p>
                  <button onClick={() => onLaunchGuestQr('Table 04')} className="btn btn-outline btn-sm">
                    Try Guest QR Menu →
                  </button>
                </div>

                <div className="glass-card" style={{ padding: '1.5rem', background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.08) 0%, rgba(14, 20, 33, 0.95) 100%)' }}>
                  <span className="badge badge-indigo" style={{ marginBottom: '0.8rem' }}>📐 FLOORLINE</span>
                  <h3 style={{ fontSize: '1.25rem', color: '#fff', marginBottom: '0.4rem' }}>2D Drag & Drop Floorplan</h3>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.5, marginBottom: '1rem' }}>
                    Design custom 2D mini-maps with round/square tables, VIP suites, right-click table spawners & assigned waiter staff.
                  </p>
                  <button onClick={onLaunchLogin} className="btn btn-secondary btn-sm">
                    Open Floorplan Canvas →
                  </button>
                </div>

                <div className="glass-card" style={{ padding: '1.5rem', background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.08) 0%, rgba(14, 20, 33, 0.95) 100%)' }}>
                  <span className="badge badge-emerald" style={{ marginBottom: '0.8rem' }}>📦 ESTATELINE</span>
                  <h3 style={{ fontSize: '1.25rem', color: '#fff', marginBottom: '0.4rem' }}>Inventory & GST Reports</h3>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.5, marginBottom: '1rem' }}>
                    Track vendor bills, stock depletion thresholds, manager discount logs, CGST/SGST tax audit ledgers & printable bills.
                  </p>
                  <button onClick={onLaunchLogin} className="btn btn-emerald btn-sm">
                    View GST Reports →
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* Interactive ROI Calculator */}
          <section style={{ padding: '3.5rem 1.5rem', background: 'rgba(18, 24, 38, 0.6)', borderTop: '1px solid rgba(255,255,255,0.08)', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
            <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
              <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                <span className="badge badge-emerald">PROPOSAL NUMBERS ENGINE</span>
                <h2 style={{ fontSize: '2rem', color: '#fff', marginTop: '0.4rem' }}>
                  Calculate Your Cafe's Revenue Increase
                </h2>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', alignItems: 'center' }}>
                <div className="glass-card" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                  <div>
                    <label style={{ fontSize: '0.85rem', color: 'var(--text-muted)', display: 'flex', justifyContent: 'space-between' }}>
                      <span>Daily Guests Count:</span>
                      <strong style={{ color: '#fff' }}>{dailyGuests} guests / day</strong>
                    </label>
                    <input type="range" min="50" max="500" step="10" value={dailyGuests} onChange={(e) => setDailyGuests(+e.target.value)} style={{ width: '100%', accentColor: 'var(--primary)', marginTop: '0.4rem' }} />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.85rem', color: 'var(--text-muted)', display: 'flex', justifyContent: 'space-between' }}>
                      <span>Usual Bill Amount (₹):</span>
                      <strong style={{ color: '#fff' }}>₹{avgBill} / table</strong>
                    </label>
                    <input type="range" min="150" max="1200" step="25" value={avgBill} onChange={(e) => setAvgBill(+e.target.value)} style={{ width: '100%', accentColor: 'var(--primary)', marginTop: '0.4rem' }} />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.85rem', color: 'var(--text-muted)', display: 'flex', justifyContent: 'space-between' }}>
                      <span>Working Days / Month:</span>
                      <strong style={{ color: '#fff' }}>{openDays} days</strong>
                    </label>
                    <input type="range" min="20" max="31" value={openDays} onChange={(e) => setOpenDays(+e.target.value)} style={{ width: '100%', accentColor: 'var(--primary)', marginTop: '0.4rem' }} />
                  </div>
                </div>

                <div className="glass-card" style={{ padding: '1.8rem', background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.15) 0%, rgba(18, 24, 38, 0.9) 100%)', border: '1px solid var(--accent-emerald)' }}>
                  <div style={{ fontSize: '0.8rem', textTransform: 'uppercase', color: 'var(--accent-emerald)', fontWeight: '800' }}>
                    ESTIMATED EXTRA SALES IN YEAR ONE
                  </div>
                  <div style={{ fontSize: '2.8rem', fontWeight: '900', color: '#fff', margin: '0.4rem 0' }}>
                    +₹{yearlyExtraSales} Lakhs <span style={{ fontSize: '1rem', color: 'var(--accent-emerald)' }}>/ year</span>
                  </div>
                  <button onClick={onLaunchLogin} className="btn btn-emerald btn-lg" style={{ width: '100%', marginTop: '1rem' }}>
                    Claim Your Extra Revenue & Launch Now →
                  </button>
                </div>
              </div>
            </div>
          </section>
        </div>
      )}

      {/* PAGE 2: TABLELINE PRODUCT PAGE */}
      {activeTab === 'tableline' && (
        <section style={{ padding: '4rem 1.5rem', maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <span className="badge badge-amber">PART 1 • THE GUEST'S PHONE</span>
            <h1 style={{ fontSize: '2.8rem', color: '#fff', marginTop: '0.4rem' }}>
              Tableline: Instant QR Mobile Ordering
            </h1>
            <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)', maxWidth: '700px', margin: '0.5rem auto' }}>
              Public menu page for each shop. A table code that knows the shop & seat. Dish add-ons, photos, instant UPI payment & review scratch cards.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
            <div className="glass-card" style={{ padding: '1.5rem' }}>
              <h3 style={{ fontSize: '1.2rem', color: 'var(--primary)', marginBottom: '0.5rem' }}>1. Table-Specific QR Scan</h3>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>
                The code opens that specific table, not a generic list of cafes. Guests see every dish, price, photo, extras, and finished dishes in real-time.
              </p>
            </div>
            <div className="glass-card" style={{ padding: '1.5rem' }}>
              <h3 style={{ fontSize: '1.2rem', color: 'var(--primary)', marginBottom: '0.5rem' }}>2. Bigger Bills from Extras</h3>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>
                The extra chai, saffron, and chutneys are visually presented on the screen, so more guests add them — giving a +16% increase on phone bills.
              </p>
            </div>
            <div className="glass-card" style={{ padding: '1.5rem' }}>
              <h3 style={{ fontSize: '1.2rem', color: 'var(--primary)', marginBottom: '0.5rem' }}>3. Google Review Scratch Card</h3>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>
                5-star ratings redirect guests to Google Reviews, unlocking an interactive gift scratch card for discounts on their next visit.
              </p>
            </div>
          </div>

          <div style={{ textAlign: 'center' }}>
            <button onClick={() => onLaunchGuestQr('Table 04')} className="btn btn-primary btn-lg">
              <QrCode size={20} /> Test Live Tableline Guest QR Phone Demo
            </button>
          </div>
        </section>
      )}

      {/* PAGE 3: FLOORLINE PRODUCT PAGE */}
      {activeTab === 'floorline' && (
        <section style={{ padding: '4rem 1.5rem', maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <span className="badge badge-emerald">PART 2 • START HERE</span>
            <h1 style={{ fontSize: '2.8rem', color: '#fff', marginTop: '0.4rem' }}>
              Floorline: Counter POS & Kitchen KDS
            </h1>
            <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)', maxWidth: '700px', margin: '0.5rem auto' }}>
              Billing at the counter for dine-in & takeaway. Kitchen tickets split by cooking station. Table status for waiters and logged discounts/refunds.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
            <div className="glass-card" style={{ padding: '1.5rem' }}>
              <h3 style={{ fontSize: '1.2rem', color: 'var(--accent-emerald)', marginBottom: '0.5rem' }}>Station Ticket Splitting</h3>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>
                Tickets route directly to the place that cooks it — such as the Grill Station or the Chai Counter KDS. Nobody types the order a second time.
              </p>
            </div>
            <div className="glass-card" style={{ padding: '1.5rem' }}>
              <h3 style={{ fontSize: '1.2rem', color: 'var(--accent-emerald)', marginBottom: '0.5rem' }}>Authorized Discounts & Refunds</h3>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>
                Choose who may give a discount or refund. Each action requires a mandatory reason log, protecting your cafe floor from theft.
              </p>
            </div>
            <div className="glass-card" style={{ padding: '1.5rem' }}>
              <h3 style={{ fontSize: '1.2rem', color: 'var(--accent-emerald)', marginBottom: '0.5rem' }}>Live Waiter Floor Status</h3>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>
                Waiters see real-time table statuses (Empty, Ordering, Cooking, Served, Needs Bill), saving 2.5 hours of walking per day.
              </p>
            </div>
          </div>

          <div style={{ textAlign: 'center' }}>
            <button onClick={onLaunchLogin} className="btn btn-emerald btn-lg">
              Launch Floorline Cashier POS & KDS Demo →
            </button>
          </div>
        </section>
      )}

      {/* PAGE 4: ESTATELINE PRODUCT PAGE */}
      {activeTab === 'estateline' && (
        <section style={{ padding: '4rem 1.5rem', maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <span className="badge badge-indigo">PART 3 • WHEN RECIPES ARE REAL</span>
            <h1 style={{ fontSize: '2.8rem', color: '#fff', marginTop: '0.4rem' }}>
              Estateline: Recipe Stock & Multi-Outlet
            </h1>
            <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)', maxWidth: '700px', margin: '0.5rem auto' }}>
              Suppliers and vendor bills. Recipe stock deductions, waste tracking, low-stock warnings, and multi-tenant workspace management.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
            <div className="glass-card" style={{ padding: '1.5rem' }}>
              <h3 style={{ fontSize: '1.2rem', color: '#818cf8', marginBottom: '0.5rem' }}>Recipe Ingredient Stock</h3>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>
                A sale uses the exact ingredient amounts in the recipe. Stock counts, waste, and approved gaps are tracked automatically.
              </p>
            </div>
            <div className="glass-card" style={{ padding: '1.5rem' }}>
              <h3 style={{ fontSize: '1.2rem', color: '#818cf8', marginBottom: '0.5rem' }}>Low Stock Auto Off-Menu</h3>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>
                Warnings trigger when raw stock is low, automatically marking dishes as finished across guest phones, floor waiters, and cashier POS.
              </p>
            </div>
            <div className="glass-card" style={{ padding: '1.5rem' }}>
              <h3 style={{ fontSize: '1.2rem', color: '#818cf8', marginBottom: '0.5rem' }}>Multi-Outlet Franchise Setup</h3>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>
                Run multiple cafes on the same system without separate account books. Switch between outlets with one click.
              </p>
            </div>
          </div>

          <div style={{ textAlign: 'center' }}>
            <button onClick={onLaunchLogin} className="btn btn-primary btn-lg">
              Launch Estateline Multi-Outlet Admin →
            </button>
          </div>
        </section>
      )}

      {/* PAGE 5: PRICING & PLANS */}
      {activeTab === 'pricing' && (
        <section style={{ padding: '4rem 1.5rem', maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <span className="badge badge-amber">TRANSPARENT SAAS PRICING</span>
            <h1 style={{ fontSize: '2.8rem', color: '#fff', marginTop: '0.4rem' }}>
              Simple Plans For Single Cafes & Multi-Outlet Chains
            </h1>
          </div>

          {/* SaaS Pricing Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem', marginBottom: '4rem' }}>
            {SAAS_PLANS.map(plan => (
              <div
                key={plan.id}
                className="glass-card"
                style={{
                  padding: '1.8rem',
                  border: plan.bestseller ? '1px solid var(--primary)' : '1px solid rgba(255,255,255,0.08)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between'
                }}
              >
                <div>
                  {plan.bestseller && <span className="badge badge-amber" style={{ marginBottom: '0.6rem' }}>Most Popular</span>}
                  <h3 style={{ fontSize: '1.4rem', color: '#fff' }}>{plan.name}</h3>
                  <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', minHeight: '40px' }}>{plan.description}</p>
                  
                  <div style={{ fontSize: '2.2rem', fontWeight: '900', color: 'var(--primary)', margin: '1rem 0' }}>
                    ₹{plan.price.toLocaleString('en-IN')} <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: '400' }}>/{plan.period}</span>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', marginBottom: '1.5rem' }}>
                    {plan.features.map((feat, idx) => (
                      <div key={idx} style={{ fontSize: '0.85rem', color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <CheckCircle size={15} color="var(--accent-emerald)" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <button onClick={onLaunchLogin} className={`btn ${plan.bestseller ? 'btn-primary' : 'btn-secondary'}`} style={{ width: '100%' }}>
                  Start 14-Day Free Trial
                </button>
              </div>
            ))}
          </div>

          {/* FAQ Accordion Section */}
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <h2 style={{ fontSize: '1.8rem', color: '#fff', textAlign: 'center', marginBottom: '1.5rem' }}>
              Frequently Asked Questions
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {faqs.map((faq, idx) => {
                const isOpen = openFaq === idx;
                return (
                  <div
                    key={idx}
                    className="glass-card"
                    style={{ padding: '1rem 1.2rem', cursor: 'pointer' }}
                    onClick={() => setOpenFaq(isOpen ? -1 : idx)}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontWeight: '700', color: '#fff', fontSize: '1rem' }}>
                      <span>{faq.q}</span>
                      {isOpen ? <ChevronUp size={18} color="var(--primary)" /> : <ChevronDown size={18} color="var(--text-muted)" />}
                    </div>
                    {isOpen && (
                      <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', marginTop: '0.6rem', lineHeight: '1.5' }}>
                        {faq.a}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* PAGE 6: CONTACT & SALES */}
      {activeTab === 'contact' && (
        <section style={{ padding: '4rem 1.5rem', maxWidth: '1000px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <span className="badge badge-amber">GLOBAL SCALE SOFTWARES</span>
            <h1 style={{ fontSize: '2.8rem', color: '#fff', marginTop: '0.4rem' }}>
              Get In Touch With Our Sales Team
            </h1>
            <p style={{ fontSize: '1rem', color: 'var(--text-muted)' }}>
              Proposals, custom multi-outlet enterprise setups, or fitted POS machine inquiries.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'minmax(300px, 380px) 1fr', gap: '2rem' }}>
            
            {/* Contact Details */}
            <div className="glass-card" style={{ padding: '1.8rem', display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
              <div>
                <strong style={{ color: '#fff', fontSize: '1.1rem' }}>Karan Mathur</strong>
                <div style={{ fontSize: '0.82rem', color: 'var(--primary)', fontWeight: '700' }}>Sales Director</div>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>GLOBAL SCALE SOFTWARES</div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', fontSize: '0.88rem', color: 'var(--text-muted)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                  <Mail size={16} color="var(--primary)" /> info@gssoftwares.com
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                  <Globe size={16} color="var(--primary)" /> gssoftwares.com
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                  <MapPin size={16} color="var(--primary)" /> Jaipur, Rajasthan, India (Sept 2026)
                </div>
              </div>

              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '0.8rem' }}>
                Tables, food orders, stock & payments software suite including TableTrack, MH Food, Made By Maa, and KS Mart.
              </div>
            </div>

            {/* Request Demo Form */}
            <div className="glass-card" style={{ padding: '1.8rem' }}>
              <h3 style={{ fontSize: '1.2rem', color: '#fff', marginBottom: '1rem' }}>Request On-Site Cafe Demo</h3>
              
              <form onSubmit={(e) => { e.preventDefault(); alert('Demo request submitted! Karan Mathur will contact you within 2 hours.'); }} style={{ display: 'flex', flexDirection: 'column', gap: '0.9rem' }}>
                <div>
                  <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Cafe / Restaurant Name</label>
                  <input type="text" placeholder="e.g. Amber Cafe & Bistro" className="glass-input" style={{ width: '100%', marginTop: '0.2rem' }} required />
                </div>
                <div>
                  <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Your Name & Role</label>
                  <input type="text" placeholder="e.g. Rajesh Sharma (Owner)" className="glass-input" style={{ width: '100%', marginTop: '0.2rem' }} required />
                </div>
                <div>
                  <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Phone Number</label>
                  <input type="text" placeholder="+91 98290 12345" className="glass-input" style={{ width: '100%', marginTop: '0.2rem' }} required />
                </div>
                <div>
                  <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Number of Tables & Outlets</label>
                  <input type="text" placeholder="e.g. 12 Tables, 1 Branch" className="glass-input" style={{ width: '100%', marginTop: '0.2rem' }} />
                </div>
                <button type="submit" className="btn btn-primary btn-lg" style={{ marginTop: '0.5rem', width: '100%' }}>
                  Submit On-Site Demo Request →
                </button>
              </form>
            </div>

          </div>
        </section>
      )}

      {/* Global Multi-Page Footer */}
      <footer style={{
        textAlign: 'center',
        padding: '2rem 1rem',
        background: 'rgba(10, 13, 20, 0.98)',
        borderTop: '1px solid rgba(255,255,255,0.08)',
        color: 'var(--text-muted)',
        fontSize: '0.82rem'
      }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto 1rem auto', display: 'flex', justifyContent: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
          <button onClick={() => setActiveTab('home')} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>Home</button>
          <button onClick={() => setActiveTab('tableline')} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>Tableline</button>
          <button onClick={() => setActiveTab('floorline')} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>Floorline POS</button>
          <button onClick={() => setActiveTab('estateline')} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>Estateline Stock</button>
          <button onClick={() => setActiveTab('pricing')} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>Pricing</button>
          <button onClick={() => setActiveTab('contact')} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>Contact</button>
        </div>
        <div>GLOBAL SCALE SOFTWARES • JAIPUR • SEPTEMBER 2026 • PROPOSAL DEMO</div>
      </footer>

    </div>
  );
}
