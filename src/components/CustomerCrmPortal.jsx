import React, { useState } from 'react';
import { Users, UserPlus, Gift, Send, Star, Phone, Mail, Calendar, Award, Search, Sparkles, Filter } from 'lucide-react';

export default function CustomerCrmPortal({ customers, setCustomers }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [tierFilter, setTierFilter] = useState('All');
  const [selectedCustomer, setSelectedCustomer] = useState(customers[0] || null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showCampaignModal, setShowCampaignModal] = useState(false);

  // New Customer Form State
  const [newName, setNewName] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newTier, setNewTier] = useState('Silver Member');

  // Campaign State
  const [campaignMessage, setCampaignMessage] = useState('🎉 Special Weekend Offer! Get 15% OFF on Kulhad Chai & Samosa Platter at Amber Cafe!');
  const [campaignTarget, setCampaignTarget] = useState('VIP Gold');

  const filteredCustomers = customers.filter(c => {
    const matchesSearch = c.name.toLowerCase().includes(searchQuery.toLowerCase()) || c.phone.includes(searchQuery);
    const matchesTier = tierFilter === 'All' || c.tier === tierFilter;
    return matchesSearch && matchesTier;
  });

  const handleAddCustomer = () => {
    if (!newName || !newPhone) return;
    const newCust = {
      id: `CUST-${Math.floor(800 + Math.random() * 200)}`,
      name: newName,
      phone: newPhone,
      email: newEmail || `${newName.toLowerCase().replace(/\s+/g, '.')}@example.com`,
      tier: newTier,
      totalVisits: 1,
      totalSpent: 0,
      loyaltyPoints: 50, // Welcome points
      favoriteDish: 'Artisanal Kulhad Masala Chai',
      lastVisit: new Date().toISOString().split('T')[0],
      birthday: 'Not Set',
      notes: 'New guest registered via CRM desk.'
    };
    setCustomers(prev => [newCust, ...prev]);
    setSelectedCustomer(newCust);
    setShowAddModal(false);
    setNewName('');
    setNewPhone('');
  };

  const handleSendCampaign = () => {
    alert(`🚀 Broadcast Campaign Sent to all ${campaignTarget} guests via SMS & WhatsApp!`);
    setShowCampaignModal(false);
  };

  return (
    <div style={{ maxWidth: '1300px', margin: '0 auto', padding: '0 1rem 5rem 1rem' }}>
      
      {/* CRM Header Banner */}
      <div className="glass-card" style={{ padding: '1.2rem 1.5rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <div style={{ fontSize: '0.8rem', textTransform: 'uppercase', color: 'var(--primary)', fontWeight: '700', letterSpacing: '0.05em', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <Users size={16} /> Hotel & Cafe Guest CRM Suite
          </div>
          <h2 style={{ fontSize: '1.5rem', color: '#fff', margin: '0.2rem 0' }}>
            Customer Directory, Loyalty Points & Marketing
          </h2>
          <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            Track guest visit frequency, favorite dishes, loyalty rewards & launch targeted WhatsApp campaigns.
          </div>
        </div>

        {/* Top Action Buttons */}
        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
          <button onClick={() => setShowCampaignModal(true)} className="btn btn-emerald btn-sm">
            <Send size={14} /> Send WhatsApp Offer Campaign
          </button>
          <button onClick={() => setShowAddModal(true)} className="btn btn-primary btn-sm">
            <UserPlus size={14} /> Register New Guest
          </button>
        </div>
      </div>

      {/* Main CRM Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(300px, 380px) 1fr', gap: '1.5rem' }}>
        
        {/* Left Column: Guest Directory List */}
        <div className="glass-card" style={{ padding: '1.2rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          
          {/* Search & Filter */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
            <div style={{ position: 'relative' }}>
              <Search size={16} color="var(--text-muted)" style={{ position: 'absolute', left: '0.8rem', top: '50%', transform: 'translateY(-50%)' }} />
              <input
                type="text"
                placeholder="Search guest by name or phone..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="glass-input"
                style={{ width: '100%', paddingLeft: '2.5rem', fontSize: '0.85rem' }}
              />
            </div>

            <div style={{ display: 'flex', gap: '0.4rem', overflowX: 'auto' }}>
              {['All', 'VIP Gold', 'Platinum Club', 'Silver Member'].map(tier => (
                <button
                  key={tier}
                  onClick={() => setTierFilter(tier)}
                  className={`btn ${tierFilter === tier ? 'btn-primary' : 'btn-secondary'}`}
                  style={{ padding: '0.3rem 0.6rem', fontSize: '0.75rem', whitespace: 'nowrap' }}
                >
                  {tier}
                </button>
              ))}
            </div>
          </div>

          {/* Customer Cards List */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', maxHeight: '520px', overflowY: 'auto' }}>
            {filteredCustomers.map(cust => {
              const isSelected = selectedCustomer && selectedCustomer.id === cust.id;
              return (
                <div
                  key={cust.id}
                  onClick={() => setSelectedCustomer(cust)}
                  style={{
                    padding: '0.9rem',
                    borderRadius: '12px',
                    background: isSelected ? 'rgba(245, 158, 11, 0.15)' : 'rgba(255,255,255,0.03)',
                    border: isSelected ? '1px solid var(--primary)' : '1px solid rgba(255,255,255,0.06)',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.3rem' }}>
                    <strong style={{ color: '#fff', fontSize: '0.95rem' }}>{cust.name}</strong>
                    <span className="badge badge-amber" style={{ fontSize: '0.68rem' }}>{cust.tier}</span>
                  </div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'flex', justifyContent: 'space-between' }}>
                    <span>{cust.phone}</span>
                    <span style={{ color: 'var(--accent-emerald)', fontWeight: '700' }}>₹{cust.totalSpent}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Customer Deep Profile */}
        {selectedCustomer ? (
          <div className="glass-card" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            
            {/* Header Profile Info */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{
                  width: '54px',
                  height: '54px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, var(--primary) 0%, #d97706 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#000',
                  fontSize: '1.4rem',
                  fontWeight: '800'
                }}>
                  {selectedCustomer.name.charAt(0)}
                </div>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                    <h3 style={{ fontSize: '1.4rem', color: '#fff', margin: 0 }}>{selectedCustomer.name}</h3>
                    <span className="badge badge-amber">{selectedCustomer.tier}</span>
                  </div>
                  <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginTop: '0.2rem', display: 'flex', gap: '1rem' }}>
                    <span>📞 {selectedCustomer.phone}</span>
                    <span>✉️ {selectedCustomer.email}</span>
                  </div>
                </div>
              </div>

              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Loyalty Points</div>
                <div style={{ fontSize: '1.6rem', fontWeight: '800', color: 'var(--accent-emerald)' }}>
                  {selectedCustomer.loyaltyPoints} PTS
                </div>
              </div>
            </div>

            {/* Metrics Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
              <div style={{ background: 'rgba(0,0,0,0.3)', padding: '0.9rem', borderRadius: '12px' }}>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Total Visits</div>
                <div style={{ fontSize: '1.3rem', fontWeight: '800', color: '#fff' }}>{selectedCustomer.totalVisits} Times</div>
              </div>
              <div style={{ background: 'rgba(0,0,0,0.3)', padding: '0.9rem', borderRadius: '12px' }}>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Lifetime Spent</div>
                <div style={{ fontSize: '1.3rem', fontWeight: '800', color: 'var(--primary)' }}>₹{selectedCustomer.totalSpent}</div>
              </div>
              <div style={{ background: 'rgba(0,0,0,0.3)', padding: '0.9rem', borderRadius: '12px' }}>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Birthday</div>
                <div style={{ fontSize: '1.3rem', fontWeight: '800', color: '#fff' }}>{selectedCustomer.birthday}</div>
              </div>
            </div>

            {/* Favorite Dish & Preferences */}
            <div style={{ background: 'rgba(255,255,255,0.03)', padding: '1.2rem', borderRadius: '14px', border: '1px solid rgba(255,255,255,0.06)' }}>
              <h4 style={{ fontSize: '1rem', color: '#fff', marginBottom: '0.6rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <Sparkles size={16} color="var(--primary)" /> Guest Preferences & CRM Notes
              </h4>
              <div style={{ fontSize: '0.88rem', color: 'var(--text-main)', marginBottom: '0.4rem' }}>
                <strong>Favorite Item:</strong> {selectedCustomer.favoriteDish}
              </div>
              <div style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>
                <strong>Staff Notes:</strong> {selectedCustomer.notes}
              </div>
            </div>

            {/* Loyalty Gift Action */}
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <button onClick={() => alert(`Gift voucher code GS-FREE-CHAI issued to ${selectedCustomer.name} via SMS!`)} className="btn btn-primary" style={{ flex: 1 }}>
                <Gift size={16} /> Issue Special Loyalty Reward Voucher
              </button>
            </div>

          </div>
        ) : (
          <div className="glass-card" style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-muted)' }}>
            Select a guest profile from the directory to view CRM analytics.
          </div>
        )}
      </div>

      {/* Register Customer Modal */}
      {showAddModal && (
        <div className="modal-overlay" onClick={() => setShowAddModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ padding: '1.5rem', maxWidth: '460px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h3 style={{ fontSize: '1.3rem', color: '#fff' }}>Register New Guest Profile</h3>
              <button onClick={() => setShowAddModal(false)} className="btn btn-secondary btn-sm">✕</button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', marginBottom: '1.2rem' }}>
              <div>
                <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Full Name</label>
                <input type="text" placeholder="e.g. Ramesh Kumar" value={newName} onChange={(e) => setNewName(e.target.value)} className="glass-input" style={{ width: '100%', marginTop: '0.2rem' }} />
              </div>
              <div>
                <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Phone Number</label>
                <input type="text" placeholder="e.g. +91 98290 12345" value={newPhone} onChange={(e) => setNewPhone(e.target.value)} className="glass-input" style={{ width: '100%', marginTop: '0.2rem' }} />
              </div>
              <div>
                <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Membership Tier</label>
                <select value={newTier} onChange={(e) => setNewTier(e.target.value)} className="glass-input" style={{ width: '100%', marginTop: '0.2rem' }}>
                  <option value="Silver Member" style={{ background: '#0f1523' }}>Silver Member</option>
                  <option value="VIP Gold" style={{ background: '#0f1523' }}>VIP Gold</option>
                  <option value="Platinum Club" style={{ background: '#0f1523' }}>Platinum Club</option>
                </select>
              </div>
            </div>

            <button onClick={handleAddCustomer} className="btn btn-primary btn-lg" style={{ width: '100%' }}>
              Save Guest Profile
            </button>
          </div>
        </div>
      )}

      {/* Broadcast WhatsApp Campaign Modal */}
      {showCampaignModal && (
        <div className="modal-overlay" onClick={() => setShowCampaignModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ padding: '1.5rem', maxWidth: '480px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h3 style={{ fontSize: '1.3rem', color: '#fff' }}>Launch WhatsApp Promo Campaign</h3>
              <button onClick={() => setShowCampaignModal(false)} className="btn btn-secondary btn-sm">✕</button>
            </div>

            <div style={{ marginBottom: '1rem' }}>
              <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Target Segment</label>
              <select value={campaignTarget} onChange={(e) => setCampaignTarget(e.target.value)} className="glass-input" style={{ width: '100%', marginTop: '0.2rem' }}>
                <option value="VIP Gold" style={{ background: '#0f1523' }}>VIP Gold Guests</option>
                <option value="Platinum Club" style={{ background: '#0f1523' }}>Platinum Members</option>
                <option value="All" style={{ background: '#0f1523' }}>All Directory Guests</option>
              </select>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Message Text</label>
              <textarea value={campaignMessage} onChange={(e) => setCampaignMessage(e.target.value)} className="glass-input" style={{ width: '100%', height: '90px', marginTop: '0.2rem' }} />
            </div>

            <button onClick={handleSendCampaign} className="btn btn-emerald btn-lg" style={{ width: '100%' }}>
              Broadcast Campaign Now
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
