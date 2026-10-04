import React, { useState } from 'react';
import { Store, CheckCircle, ArrowRight, ArrowLeft, QrCode, UtensilsCrossed, ShieldCheck, CreditCard, Sparkles, Building2, MapPin, Phone, User } from 'lucide-react';

export default function StoreOnboardingPortal({ onCompleteOnboarding, outlets, setOutlets }) {
  const [currentStep, setCurrentStep] = useState(1);

  // Step 1 State: Basic Details
  const [storeName, setStoreName] = useState('');
  const [city, setCity] = useState('Jaipur');
  const [phone, setPhone] = useState('+91 98290 ');
  const [managerName, setManagerName] = useState('');
  const [cafeType, setCafeType] = useState('Artisanal Cafe & Bakery');

  // Step 2 State: Tables & Floorplan
  const [tablesCount, setTablesCount] = useState(12);
  const [posTerminals, setPosTerminals] = useState(2);

  // Step 3 State: Kitchen Stations & Menu
  const [menuTemplate, setMenuTemplate] = useState('Rajasthani Cafe & Artisanal Chai');
  const [stations, setStations] = useState(['Chai & Beverage Bar', 'Grill & Snack Station', 'Main Kitchen']);

  // Step 4 State: GST & Billing
  const [gstin, setGstin] = useState('08AAACG1234F1Z5');
  const [taxIncluded, setTaxIncluded] = useState(false);

  const handleNextStep = () => {
    if (currentStep === 1 && (!storeName || !managerName)) {
      alert('Please fill in Store Name and Manager Name.');
      return;
    }
    setCurrentStep(prev => Math.min(prev + 1, 5));
  };

  const handlePrevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleFinishOnboarding = () => {
    const newStoreObj = {
      id: `out-${Date.now()}`,
      name: storeName,
      city: city,
      tablesCount: +tablesCount,
      phone: phone,
      manager: managerName,
      monthlySales: 0,
      gstin: gstin,
      posTerminals: +posTerminals
    };

    setOutlets(prev => [...prev, newStoreObj]);
    onCompleteOnboarding(newStoreObj);
  };

  return (
    <div style={{ maxWidth: '900px', margin: '2rem auto 5rem auto', padding: '0 1rem' }}>
      
      {/* Wizard Header Banner */}
      <div className="glass-card" style={{ padding: '1.8rem', textAlign: 'center', marginBottom: '2rem' }}>
        <span className="badge badge-amber" style={{ padding: '0.4rem 1rem', fontSize: '0.8rem', marginBottom: '0.8rem' }}>
          ★ ESTATELINE STORE ONBOARDING WIZARD
        </span>
        <h1 style={{ fontSize: '2.2rem', color: '#fff', fontWeight: '800', margin: '0.2rem 0' }}>
          Onboard Your New Cafe Outlet
        </h1>
        <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
          Set up floorplan tables, kitchen station routing, menu dishes & GST tax billing in 4 easy steps.
        </p>

        {/* Progress Tracker Bar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1.8rem', position: 'relative', maxWidth: '600px', margin: '1.8rem auto 0 auto' }}>
          {[
            { step: 1, label: 'Store Details' },
            { step: 2, label: 'Floorplan Tables' },
            { step: 3, label: 'Kitchen & Menu' },
            { step: 4, label: 'GST Billing' },
            { step: 5, label: 'Launch' }
          ].map(s => (
            <div key={s.step} style={{ textAlign: 'center', zIndex: 1 }}>
              <div style={{
                width: 36,
                height: 36,
                borderRadius: '50%',
                background: currentStep >= s.step ? 'var(--primary)' : 'rgba(255,255,255,0.1)',
                color: currentStep >= s.step ? '#000' : 'var(--text-muted)',
                fontWeight: '800',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 0.4rem auto',
                boxShadow: currentStep >= s.step ? '0 0 12px var(--primary-glow)' : 'none'
              }}>
                {currentStep > s.step ? <CheckCircle size={18} /> : s.step}
              </div>
              <div style={{ fontSize: '0.72rem', color: currentStep >= s.step ? '#fff' : 'var(--text-muted)', fontWeight: currentStep >= s.step ? '700' : '400' }}>
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* STEP 1: BASIC DETAILS */}
      {currentStep === 1 && (
        <div className="glass-card" style={{ padding: '2rem' }}>
          <h3 style={{ fontSize: '1.3rem', color: '#fff', marginBottom: '1.2rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Store size={20} color="var(--primary)" /> Step 1: Store & Manager Information
          </h3>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.2rem', marginBottom: '1.8rem' }}>
            <div style={{ gridColumn: 'span 2' }}>
              <label style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>Cafe / Restaurant Store Name</label>
              <input type="text" placeholder="e.g. Royal Heritage Chai & Bistro" value={storeName} onChange={(e) => setStoreName(e.target.value)} className="glass-input" style={{ width: '100%', marginTop: '0.3rem' }} required />
            </div>

            <div>
              <label style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>City / Branch Location</label>
              <input type="text" placeholder="e.g. Jaipur" value={city} onChange={(e) => setCity(e.target.value)} className="glass-input" style={{ width: '100%', marginTop: '0.3rem' }} />
            </div>

            <div>
              <label style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>Store Manager Name</label>
              <input type="text" placeholder="e.g. Rajesh Sharma" value={managerName} onChange={(e) => setManagerName(e.target.value)} className="glass-input" style={{ width: '100%', marginTop: '0.3rem' }} required />
            </div>

            <div>
              <label style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>Store Contact Phone</label>
              <input type="text" placeholder="+91 98290 12345" value={phone} onChange={(e) => setPhone(e.target.value)} className="glass-input" style={{ width: '100%', marginTop: '0.3rem' }} />
            </div>

            <div>
              <label style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>Cafe Outlet Type</label>
              <select value={cafeType} onChange={(e) => setCafeType(e.target.value)} className="glass-input" style={{ width: '100%', marginTop: '0.3rem' }}>
                <option value="Artisanal Cafe & Bakery" style={{ background: '#0f1523' }}>Artisanal Cafe & Bakery</option>
                <option value="Quick Service Restaurant (QSR)" style={{ background: '#0f1523' }}>Quick Service Restaurant (QSR)</option>
                <option value="Fine Dining Bistro" style={{ background: '#0f1523' }}>Fine Dining Bistro</option>
                <option value="Food Court Counter" style={{ background: '#0f1523' }}>Food Court Counter</option>
              </select>
            </div>
          </div>

          <button onClick={handleNextStep} className="btn btn-primary btn-lg" style={{ width: '100%' }}>
            Continue To Step 2: Floorplan Setup →
          </button>
        </div>
      )}

      {/* STEP 2: FLOORPLAN TABLES */}
      {currentStep === 2 && (
        <div className="glass-card" style={{ padding: '2rem' }}>
          <h3 style={{ fontSize: '1.3rem', color: '#fff', marginBottom: '1.2rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <QrCode size={20} color="var(--primary)" /> Step 2: Floorplan Tables & POS Terminals
          </h3>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.2rem', marginBottom: '1.8rem' }}>
            <div>
              <label style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>Total Cafe Tables Count</label>
              <input type="number" min="4" max="50" value={tablesCount} onChange={(e) => setTablesCount(+e.target.value)} className="glass-input" style={{ width: '100%', marginTop: '0.3rem' }} />
            </div>

            <div>
              <label style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>Active POS Billing Terminals</label>
              <input type="number" min="1" max="10" value={posTerminals} onChange={(e) => setPosTerminals(+e.target.value)} className="glass-input" style={{ width: '100%', marginTop: '0.3rem' }} />
            </div>
          </div>

          <div style={{ background: 'rgba(0,0,0,0.3)', padding: '1rem', borderRadius: '14px', marginBottom: '1.5rem' }}>
            <div style={{ fontSize: '0.85rem', color: 'var(--accent-emerald)', fontWeight: '700', marginBottom: '0.4rem' }}>
              ✓ Automated QR Tent Cards Provisioning:
            </div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              Onboarding will automatically provision <strong>Tables 01 to Table {tablesCount}</strong> with unique QR code tent cards and double-tap order protection.
            </div>
          </div>

          <div style={{ display: 'flex', gap: '1rem' }}>
            <button onClick={handlePrevStep} className="btn btn-secondary btn-lg" style={{ flex: 1 }}>← Back</button>
            <button onClick={handleNextStep} className="btn btn-primary btn-lg" style={{ flex: 2 }}>Continue To Kitchen Routing →</button>
          </div>
        </div>
      )}

      {/* STEP 3: KITCHEN STATIONS & MENU */}
      {currentStep === 3 && (
        <div className="glass-card" style={{ padding: '2rem' }}>
          <h3 style={{ fontSize: '1.3rem', color: '#fff', marginBottom: '1.2rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <UtensilsCrossed size={20} color="var(--primary)" /> Step 3: Kitchen Station Routing & Menu Template
          </h3>

          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>Initial Menu Template Preset</label>
            <select value={menuTemplate} onChange={(e) => setMenuTemplate(e.target.value)} className="glass-input" style={{ width: '100%', marginTop: '0.3rem' }}>
              <option value="Rajasthani Cafe & Artisanal Chai" style={{ background: '#0f1523' }}>Rajasthani Cafe & Artisanal Chai (Chai, Samosa, Paneer Tikka)</option>
              <option value="South Indian Tiffin & Coffee" style={{ background: '#0f1523' }}>South Indian Tiffin & Coffee (Filter Coffee, Dosa, Idli)</option>
              <option value="Continental Bakery & Cold Brews" style={{ background: '#0f1523' }}>Continental Bakery & Cold Brews (Espresso, Croissants, Pasta)</option>
            </select>
          </div>

          <div style={{ background: 'rgba(0,0,0,0.3)', padding: '1rem', borderRadius: '14px', marginBottom: '1.5rem' }}>
            <div style={{ fontSize: '0.85rem', color: 'var(--primary)', fontWeight: '700', marginBottom: '0.4rem' }}>
              Kitchen Ticket KDS Routing Stations:
            </div>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              <span className="badge badge-amber">Chai & Beverage Bar</span>
              <span className="badge badge-emerald">Grill & Snack Station</span>
              <span className="badge badge-indigo">Main Kitchen</span>
              <span className="badge badge-purple">Desserts & Pantry</span>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '1rem' }}>
            <button onClick={handlePrevStep} className="btn btn-secondary btn-lg" style={{ flex: 1 }}>← Back</button>
            <button onClick={handleNextStep} className="btn btn-primary btn-lg" style={{ flex: 2 }}>Continue To GST Setup →</button>
          </div>
        </div>
      )}

      {/* STEP 4: GST & TAX BILLING */}
      {currentStep === 4 && (
        <div className="glass-card" style={{ padding: '2rem' }}>
          <h3 style={{ fontSize: '1.3rem', color: '#fff', marginBottom: '1.2rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <CreditCard size={20} color="var(--primary)" /> Step 4: Indian GST Tax & Billing Setup
          </h3>

          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>Store GSTIN Number</label>
            <input type="text" value={gstin} onChange={(e) => setGstin(e.target.value)} className="glass-input" style={{ width: '100%', marginTop: '0.3rem' }} />
          </div>

          <div style={{ background: 'rgba(0,0,0,0.3)', padding: '1rem', borderRadius: '14px', marginBottom: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <strong style={{ color: '#fff', fontSize: '0.95rem' }}>GST 5% Tax Calculation Scheme</strong>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>CGST 2.5% + SGST 2.5% added at bill settlement</div>
              </div>
              <span className="badge badge-emerald">GST Audit Ready</span>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '1rem' }}>
            <button onClick={handlePrevStep} className="btn btn-secondary btn-lg" style={{ flex: 1 }}>← Back</button>
            <button onClick={handleNextStep} className="btn btn-emerald btn-lg" style={{ flex: 2 }}>Review & Launch Store →</button>
          </div>
        </div>
      )}

      {/* STEP 5: REVIEW & LAUNCH STORE */}
      {currentStep === 5 && (
        <div className="glass-card" style={{ padding: '2rem', textAlign: 'center' }}>
          <Sparkles size={48} color="var(--primary)" style={{ marginBottom: '0.8rem' }} />
          <span className="badge badge-emerald" style={{ marginBottom: '0.4rem' }}>ONBOARDING COMPLETE</span>
          <h2 style={{ fontSize: '2rem', color: '#fff', margin: '0.2rem 0 0.8rem 0' }}>
            {storeName} is Ready to Launch!
          </h2>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', maxWidth: '540px', margin: '0 auto 1.5rem auto' }}>
            {tablesCount} Tables, {posTerminals} POS Terminals & {menuTemplate} menu preset have been initialized for {city} branch under Manager {managerName}.
          </p>

          <button onClick={handleFinishOnboarding} className="btn btn-emerald btn-lg" style={{ padding: '1rem 2.5rem', fontSize: '1.1rem' }}>
            🚀 Open {storeName} Dashboard Now
          </button>
        </div>
      )}

    </div>
  );
}
