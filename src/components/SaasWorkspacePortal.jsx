import React, { useState } from 'react';
import { Building2, Plus, Users, Shield, CreditCard, Sparkles, CheckCircle, Globe, Settings, UserPlus, FileText, ArrowUpRight, Lock, Palette } from 'lucide-react';
import { SAAS_PLANS } from '../data/mockSaasData';

export default function SaasWorkspacePortal({ workspaces, setWorkspaces, activeWorkspace, setActiveWorkspace, teamMembers, setTeamMembers }) {
  const [activeTab, setActiveTab] = useState('workspaces'); // workspaces | team | billing | branding
  const [showAddWsModal, setShowAddWsModal] = useState(false);
  const [showInviteModal, setShowInviteModal] = useState(false);

  // New Workspace form state
  const [newWsName, setNewWsName] = useState('');
  const [newWsPlan, setNewWsPlan] = useState('Floorline Pro');

  // New Member form state
  const [memName, setMemName] = useState('');
  const [memEmail, setMemEmail] = useState('');
  const [memRole, setMemRole] = useState('Floor Manager');

  // Create new workspace
  const handleCreateWorkspace = () => {
    if (!newWsName) return;
    const newWs = {
      id: `ws-${Date.now()}`,
      name: newWsName,
      slug: newWsName.toLowerCase().replace(/\s+/g, '-'),
      plan: newWsPlan,
      planBadge: '🚀 Pro Active',
      outletsLimit: 3,
      ordersUsed: 0,
      ordersLimit: 5000,
      membersCount: 1,
      owner: 'Current User',
      logo: '🏨',
      branches: [
        { id: `br-${Date.now()}`, name: `${newWsName} Main Outlet`, city: 'Jaipur', tables: 8, posTerminals: 1, monthlySales: 0 }
      ]
    };
    setWorkspaces(prev => [...prev, newWs]);
    setActiveWorkspace(newWs);
    setShowAddWsModal(false);
    setNewWsName('');
  };

  // Invite member
  const handleInviteMember = () => {
    if (!memName || !memEmail) return;
    const newMem = {
      id: `mem-${Date.now()}`,
      name: memName,
      email: memEmail,
      role: memRole,
      branchAccess: 'All Branches',
      status: 'Invited',
      avatar: memName.slice(0, 2).toUpperCase()
    };
    setTeamMembers(prev => [...prev, newMem]);
    setShowInviteModal(false);
    setMemName('');
    setMemEmail('');
  };

  return (
    <div style={{ maxWidth: '1300px', margin: '0 auto', padding: '0 1rem 5rem 1rem' }}>
      
      {/* Header Banner */}
      <div className="glass-card" style={{ padding: '1.2rem 1.5rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <div style={{ fontSize: '0.8rem', textTransform: 'uppercase', color: 'var(--primary)', fontWeight: '700', letterSpacing: '0.05em', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <Building2 size={16} /> Multi-Tenant SaaS Workspace & Franchise Manager
          </div>
          <h2 style={{ fontSize: '1.5rem', color: '#fff', margin: '0.2rem 0' }}>
            Organization Workspaces & Subscriptions
          </h2>
          <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            Switch organizations, add franchise outlets, manage team access controls & SaaS subscription plans.
          </div>
        </div>

        {/* Tab Selector */}
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          {[
            { id: 'workspaces', label: '🏢 Workspaces & Outlets' },
            { id: 'team', label: '👥 Team Access (RBAC)' },
            { id: 'billing', label: '💳 Subscription & Billing' },
            { id: 'branding', label: '🎨 QR & Custom Branding' }
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

      {/* TAB 1: Workspaces & Branches Overview */}
      {activeTab === 'workspaces' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3 style={{ fontSize: '1.2rem', color: '#fff' }}>Your Organization Workspaces ({workspaces.length})</h3>
            <button onClick={() => setShowAddWsModal(true)} className="btn btn-primary">
              <Plus size={16} /> Create New Workspace
            </button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '1.25rem' }}>
            {workspaces.map(ws => {
              const isSelected = activeWorkspace && activeWorkspace.id === ws.id;
              return (
                <div
                  key={ws.id}
                  className="glass-card"
                  style={{
                    padding: '1.3rem',
                    border: isSelected ? '1px solid var(--primary)' : '1px solid rgba(255,255,255,0.08)',
                    background: isSelected ? 'linear-gradient(135deg, rgba(245, 158, 11, 0.1) 0%, rgba(18, 24, 38, 0.8) 100%)' : 'rgba(18, 24, 38, 0.7)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between'
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.8rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <div style={{ fontSize: '1.8rem', background: 'rgba(255,255,255,0.05)', padding: '0.4rem', borderRadius: '12px' }}>
                          {ws.logo}
                        </div>
                        <div>
                          <h4 style={{ fontSize: '1.2rem', color: '#fff', margin: 0 }}>{ws.name}</h4>
                          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Owner: {ws.owner}</div>
                        </div>
                      </div>

                      <span className="badge badge-amber">{ws.planBadge}</span>
                    </div>

                    {/* Usage Progress */}
                    <div style={{ background: 'rgba(0,0,0,0.3)', padding: '0.8rem', borderRadius: '10px', fontSize: '0.82rem', marginBottom: '1rem' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)', marginBottom: '0.4rem' }}>
                        <span>Outlets Count:</span>
                        <strong style={{ color: '#fff' }}>{ws.branches.length} / {ws.outletsLimit} Outlets</strong>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)' }}>
                        <span>Monthly QR Orders:</span>
                        <strong style={{ color: 'var(--accent-emerald)' }}>{ws.ordersUsed} / {ws.ordersLimit}</strong>
                      </div>
                    </div>

                    {/* Branch List */}
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.8rem' }}>
                      <strong>Active Branches:</strong> {ws.branches.map(b => b.name).join(', ')}
                    </div>
                  </div>

                  <button
                    onClick={() => setActiveWorkspace(ws)}
                    className={`btn ${isSelected ? 'btn-emerald' : 'btn-secondary'}`}
                    style={{ width: '100%' }}
                  >
                    {isSelected ? '✓ Currently Active Workspace' : 'Switch To Workspace →'}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 2: Team Members & RBAC */}
      {activeTab === 'team' && (
        <div className="glass-card" style={{ padding: '1.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.2rem' }}>
            <div>
              <h3 style={{ fontSize: '1.3rem', color: '#fff' }}>Team Members & Access Control (RBAC)</h3>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                Assign granular roles (Owner, Manager, Cashier, Waiter, Kitchen Head) for workspace access.
              </p>
            </div>

            <button onClick={() => setShowInviteModal(true)} className="btn btn-primary">
              <UserPlus size={16} /> Invite Team Member
            </button>
          </div>

          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.88rem' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', color: 'var(--text-muted)' }}>
                  <th style={{ padding: '0.75rem' }}>User</th>
                  <th style={{ padding: '0.75rem' }}>Workspace Role</th>
                  <th style={{ padding: '0.75rem' }}>Branch Access</th>
                  <th style={{ padding: '0.75rem' }}>Status</th>
                  <th style={{ padding: '0.75rem' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {teamMembers.map(mem => (
                  <tr key={mem.id} style={{ borderBottom: '1px dashed rgba(255,255,255,0.06)' }}>
                    <td style={{ padding: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <div style={{ width: 34, height: 34, borderRadius: '50%', background: 'var(--primary)', color: '#000', fontWeight: '800', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.85rem' }}>
                        {mem.avatar}
                      </div>
                      <div>
                        <strong style={{ color: '#fff' }}>{mem.name}</strong>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{mem.email}</div>
                      </div>
                    </td>
                    <td style={{ padding: '0.75rem' }}>
                      <span className="badge badge-indigo">{mem.role}</span>
                    </td>
                    <td style={{ padding: '0.75rem', color: 'var(--text-muted)' }}>{mem.branchAccess}</td>
                    <td style={{ padding: '0.75rem' }}>
                      <span className={`badge ${mem.status === 'Active' ? 'badge-emerald' : 'badge-amber'}`}>
                        {mem.status}
                      </span>
                    </td>
                    <td style={{ padding: '0.75rem' }}>
                      <button className="btn btn-secondary btn-sm" style={{ padding: '0.2rem 0.6rem', fontSize: '0.75rem' }}>
                        Edit Permissions
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: Subscription & Billing */}
      {activeTab === 'billing' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          
          {/* Active Plan Card */}
          <div className="glass-card" style={{ padding: '1.5rem', background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.15) 0%, rgba(18, 24, 38, 0.8) 100%)', border: '1px solid var(--primary)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
              <div>
                <span className="badge badge-amber">ACTIVE WORKSPACE SUBSCRIPTION</span>
                <h3 style={{ fontSize: '1.6rem', color: '#fff', margin: '0.3rem 0' }}>
                  {activeWorkspace ? activeWorkspace.plan : 'Enterprise Estateline'} Plan
                </h3>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                  Renews on 01 Nov 2026 • Auto-billing active
                </div>
              </div>

              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '2rem', fontWeight: '900', color: 'var(--primary)' }}>
                  ₹4,999 <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: '400' }}>/ month</span>
                </div>
                <button onClick={() => alert('Billing portal opened!')} className="btn btn-primary btn-sm" style={{ marginTop: '0.4rem' }}>
                  Manage Billing Invoices
                </button>
              </div>
            </div>
          </div>

          {/* SaaS Tiers Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.25rem' }}>
            {SAAS_PLANS.map(plan => (
              <div
                key={plan.id}
                className="glass-card"
                style={{
                  padding: '1.5rem',
                  border: plan.bestseller ? '1px solid var(--primary)' : '1px solid rgba(255,255,255,0.08)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  position: 'relative'
                }}
              >
                {plan.bestseller && (
                  <span className="badge badge-amber" style={{ position: 'absolute', top: '1rem', right: '1rem' }}>
                    Most Popular
                  </span>
                )}

                <div>
                  <h4 style={{ fontSize: '1.3rem', color: '#fff', marginBottom: '0.3rem' }}>{plan.name}</h4>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', minHeight: '40px' }}>{plan.description}</p>
                  
                  <div style={{ fontSize: '1.8rem', fontWeight: '800', color: 'var(--accent-emerald)', margin: '1rem 0' }}>
                    ₹{plan.price.toLocaleString('en-IN')} <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: '400' }}>/{plan.period}</span>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1.5rem' }}>
                    {plan.features.map((feat, idx) => (
                      <div key={idx} style={{ fontSize: '0.82rem', color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <CheckCircle size={14} color="var(--accent-emerald)" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => alert(`Upgraded workspace to ${plan.name}!`)}
                  className={`btn ${plan.bestseller ? 'btn-primary' : 'btn-secondary'}`}
                  style={{ width: '100%' }}
                >
                  Select {plan.name} Plan
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: QR & Custom Branding */}
      {activeTab === 'branding' && (
        <div className="glass-card" style={{ padding: '1.5rem', maxWidth: '680px' }}>
          <h3 style={{ fontSize: '1.3rem', color: '#fff', marginBottom: '0.4rem' }}>Custom QR Branding & Domain Settings</h3>
          <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '1.2rem' }}>
            White-label your guest phone menu with custom logo, domain, and primary color palette.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.5rem' }}>
            <div>
              <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Custom White-label Domain</label>
              <input type="text" defaultValue="qr.ambercafe.com" className="glass-input" style={{ width: '100%', marginTop: '0.2rem' }} />
            </div>
            <div>
              <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Cafe Receipt Header Title</label>
              <input type="text" defaultValue="AMBER CAFE & BISTRO - JAIPUR MAIN" className="glass-input" style={{ width: '100%', marginTop: '0.2rem' }} />
            </div>
            <div>
              <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Primary Accent Theme Color</label>
              <input type="color" defaultValue="#f59e0b" style={{ width: '100%', height: '40px', background: 'none', border: 'none', cursor: 'pointer', marginTop: '0.2rem' }} />
            </div>
          </div>

          <button onClick={() => alert('Branding settings saved successfully!')} className="btn btn-primary btn-lg" style={{ width: '100%' }}>
            Save Custom Branding
          </button>
        </div>
      )}

      {/* Modal: Create Workspace */}
      {showAddWsModal && (
        <div className="modal-overlay" onClick={() => setShowAddWsModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ padding: '1.5rem', maxWidth: '460px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h3 style={{ fontSize: '1.3rem', color: '#fff' }}>Create SaaS Workspace</h3>
              <button onClick={() => setShowAddWsModal(false)} className="btn btn-secondary btn-sm">✕</button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', marginBottom: '1.2rem' }}>
              <div>
                <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Workspace / Business Name</label>
                <input type="text" placeholder="e.g. Royal Heritage Foods" value={newWsName} onChange={(e) => setNewWsName(e.target.value)} className="glass-input" style={{ width: '100%', marginTop: '0.2rem' }} />
              </div>
              <div>
                <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Initial SaaS Plan</label>
                <select value={newWsPlan} onChange={(e) => setNewWsPlan(e.target.value)} className="glass-input" style={{ width: '100%', marginTop: '0.2rem' }}>
                  <option value="Tableline Starter" style={{ background: '#0f1523' }}>Tableline Starter (₹1,499/mo)</option>
                  <option value="Floorline Pro" style={{ background: '#0f1523' }}>Floorline Pro (₹2,999/mo)</option>
                  <option value="Enterprise Estateline" style={{ background: '#0f1523' }}>Enterprise Estateline (₹4,999/mo)</option>
                </select>
              </div>
            </div>

            <button onClick={handleCreateWorkspace} className="btn btn-primary btn-lg" style={{ width: '100%' }}>
              Create Workspace & Initialize Outlets
            </button>
          </div>
        </div>
      )}

      {/* Modal: Invite Member */}
      {showInviteModal && (
        <div className="modal-overlay" onClick={() => setShowInviteModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ padding: '1.5rem', maxWidth: '460px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h3 style={{ fontSize: '1.3rem', color: '#fff' }}>Invite Team Member</h3>
              <button onClick={() => setShowInviteModal(false)} className="btn btn-secondary btn-sm">✕</button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', marginBottom: '1.2rem' }}>
              <div>
                <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Member Name</label>
                <input type="text" placeholder="e.g. Vikas Sharma" value={memName} onChange={(e) => setMemName(e.target.value)} className="glass-input" style={{ width: '100%', marginTop: '0.2rem' }} />
              </div>
              <div>
                <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Email Address</label>
                <input type="email" placeholder="e.g. vikas@ambercafe.com" value={memEmail} onChange={(e) => setMemEmail(e.target.value)} className="glass-input" style={{ width: '100%', marginTop: '0.2rem' }} />
              </div>
              <div>
                <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Workspace Role</label>
                <select value={memRole} onChange={(e) => setMemRole(e.target.value)} className="glass-input" style={{ width: '100%', marginTop: '0.2rem' }}>
                  <option value="Floor Manager" style={{ background: '#0f1523' }}>Floor Manager</option>
                  <option value="Head Cashier" style={{ background: '#0f1523' }}>Head Cashier</option>
                  <option value="Kitchen Head Chef" style={{ background: '#0f1523' }}>Kitchen Head Chef</option>
                  <option value="Waiter Staff" style={{ background: '#0f1523' }}>Waiter Staff</option>
                </select>
              </div>
            </div>

            <button onClick={handleInviteMember} className="btn btn-emerald btn-lg" style={{ width: '100%' }}>
              Send Workspace Invite Email
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
