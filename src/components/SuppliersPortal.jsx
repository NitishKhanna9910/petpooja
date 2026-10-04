import React, { useState } from 'react';
import { Package, Truck, FileText, Plus, AlertTriangle, CheckCircle, DollarSign, Search, Calendar, ShieldCheck } from 'lucide-react';

export default function SuppliersPortal({ inventory, setInventory }) {
  const [showAddBillModal, setShowAddBillModal] = useState(false);
  const [showWasteModal, setShowWasteModal] = useState(false);

  // Initial Suppliers & Vendor Bills
  const [suppliers, setSuppliers] = useState([
    { id: 'SUP-101', name: 'Amul Dairy Distributors', contact: 'Rajeev Mehta', phone: '+91 98290 55443', supplyItem: 'Fresh Whole Milk & Butter', pendingBill: 14500, status: 'Active', lastInvoice: 'INV-9081' },
    { id: 'SUP-102', name: 'Jaipur Spices & Tea Merchants', contact: 'Mahesh Sharma', phone: '+91 98290 66778', supplyItem: 'Assam Tea Leaves & Spices', pendingBill: 8200, status: 'Active', lastInvoice: 'INV-9082' },
    { id: 'SUP-103', name: 'Fresh Farms Vegetables', contact: 'Suresh Kumar', phone: '+91 98290 88990', supplyItem: 'Fresh Paneer & Vegetables', pendingBill: 6400, status: 'Active', lastInvoice: 'INV-9083' }
  ]);

  // Vendor Bills Ledger
  const [vendorBills, setVendorBills] = useState([
    { id: 'INV-9081', supplierName: 'Amul Dairy Distributors', date: '2026-10-01', amount: 14500, items: '100L Fresh Milk, 20kg Amul Butter', status: 'Unpaid', dueDate: '2026-10-15' },
    { id: 'INV-9082', supplierName: 'Jaipur Spices & Tea Merchants', date: '2026-09-28', amount: 8200, items: '15kg Assam Tea Leaves, Elaichi & Spices', status: 'Paid', dueDate: '2026-10-05' },
    { id: 'INV-9083', supplierName: 'Fresh Farms Vegetables', date: '2026-09-25', amount: 6400, items: '25kg Fresh Cottage Cheese Paneer', status: 'Unpaid', dueDate: '2026-10-10' }
  ]);

  // Waste & Variance Audit Log
  const [wasteLogs, setWasteLogs] = useState([
    { id: 'WST-01', date: '2026-10-02', item: 'Fresh Whole Milk', quantity: '1.5 Liters', reason: 'Boil spillover in Chai Station', approvedBy: 'Karan Mathur (Manager)', costImpact: '₹90.00' },
    { id: 'WST-02', date: '2026-09-30', item: 'Fresh Paneer', quantity: '0.4 kg', reason: 'Tandoori grill trimming variance', approvedBy: 'Karan Mathur (Manager)', costImpact: '₹136.00' }
  ]);

  // Form State
  const [billSupplier, setBillSupplier] = useState('Amul Dairy Distributors');
  const [billAmount, setBillAmount] = useState(5000);
  const [billItems, setBillItems] = useState('50L Fresh Whole Milk');

  // Waste Form State
  const [wasteItem, setWasteItem] = useState('Fresh Whole Milk');
  const [wasteQty, setWasteQty] = useState('1.0 Liters');
  const [wasteReason, setWasteReason] = useState('Spillover / Expiry');

  const handleAddVendorBill = () => {
    if (!billAmount || !billItems) return;
    const newBill = {
      id: `INV-${Math.floor(9000 + Math.random() * 999)}`,
      supplierName: billSupplier,
      date: new Date().toISOString().split('T')[0],
      amount: +billAmount,
      items: billItems,
      status: 'Unpaid',
      dueDate: new Date(Date.now() + 14 * 86400000).toISOString().split('T')[0]
    };
    setVendorBills(prev => [newBill, ...prev]);
    setShowAddBillModal(false);
  };

  const handleAddWasteLog = () => {
    if (!wasteItem || !wasteQty) return;
    const newWaste = {
      id: `WST-${Math.floor(10 + Math.random() * 90)}`,
      date: new Date().toISOString().split('T')[0],
      item: wasteItem,
      quantity: wasteQty,
      reason: wasteReason,
      approvedBy: 'Manager Authorized',
      costImpact: '₹120.00'
    };
    setWasteLogs(prev => [newWaste, ...prev]);
    setShowWasteModal(false);
  };

  return (
    <div style={{ maxWidth: '1300px', margin: '0 auto', padding: '0 1rem 5rem 1rem' }}>
      
      {/* Header Banner */}
      <div className="glass-card" style={{ padding: '1.2rem 1.5rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <div style={{ fontSize: '0.8rem', textTransform: 'uppercase', color: 'var(--primary)', fontWeight: '700', letterSpacing: '0.05em', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <Truck size={16} /> Estateline Supplier Bills & Waste Log Management
          </div>
          <h2 style={{ fontSize: '1.5rem', color: '#fff', margin: '0.2rem 0' }}>
            Suppliers, Vendor Bills & Stock Variance Audit
          </h2>
          <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            PDF Proposal Specification: Everything in Floorline plus suppliers, vendor bills, recipe usage, waste & approved gaps.
          </div>
        </div>

        <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap' }}>
          <button onClick={() => setShowWasteModal(true)} className="btn btn-danger btn-sm">
            <AlertTriangle size={14} /> Log Ingredient Waste / Gap
          </button>
          <button onClick={() => setShowAddBillModal(true)} className="btn btn-primary btn-sm">
            <Plus size={14} /> Add Supplier Vendor Bill
          </button>
        </div>
      </div>

      {/* Grid: Active Suppliers */}
      <div style={{ marginBottom: '2rem' }}>
        <h3 style={{ fontSize: '1.2rem', color: '#fff', marginBottom: '1rem' }}>Registered Raw Material Suppliers ({suppliers.length})</h3>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.25rem' }}>
          {suppliers.map(sup => (
            <div key={sup.id} className="glass-card" style={{ padding: '1.2rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                  <div>
                    <h4 style={{ fontSize: '1.15rem', color: '#fff', margin: 0 }}>{sup.name}</h4>
                    <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Contact: {sup.contact} ({sup.phone})</div>
                  </div>
                  <span className="badge badge-emerald">{sup.status}</span>
                </div>

                <div style={{ background: 'rgba(0,0,0,0.3)', padding: '0.8rem', borderRadius: '10px', fontSize: '0.82rem', margin: '0.8rem 0' }}>
                  <div style={{ color: 'var(--primary)', fontWeight: '700', marginBottom: '0.2rem' }}>Supply Item: {sup.supplyItem}</div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)' }}>
                    <span>Pending Payable:</span>
                    <strong style={{ color: '#f43f5e' }}>₹{sup.pendingBill.toLocaleString('en-IN')}</strong>
                  </div>
                </div>
              </div>

              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textAlign: 'right' }}>
                Last Invoice: #{sup.lastInvoice}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Vendor Bills Ledger Table */}
      <div className="glass-card" style={{ padding: '1.5rem', marginBottom: '2rem' }}>
        <h3 style={{ fontSize: '1.2rem', color: '#fff', marginBottom: '1rem' }}>Vendor Bills Ledger & Payables</h3>
        
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.85rem' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', color: 'var(--text-muted)' }}>
                <th style={{ padding: '0.75rem' }}>Invoice #</th>
                <th style={{ padding: '0.75rem' }}>Supplier Name</th>
                <th style={{ padding: '0.75rem' }}>Bill Date</th>
                <th style={{ padding: '0.75rem' }}>Supplied Raw Materials</th>
                <th style={{ padding: '0.75rem' }}>Total Amount</th>
                <th style={{ padding: '0.75rem' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {vendorBills.map(bill => (
                <tr key={bill.id} style={{ borderBottom: '1px dashed rgba(255,255,255,0.06)' }}>
                  <td style={{ padding: '0.75rem', fontWeight: '700', color: '#fff' }}>#{bill.id}</td>
                  <td style={{ padding: '0.75rem', color: 'var(--text-main)' }}>{bill.supplierName}</td>
                  <td style={{ padding: '0.75rem', color: 'var(--text-muted)' }}>{bill.date}</td>
                  <td style={{ padding: '0.75rem', color: 'var(--primary)' }}>{bill.items}</td>
                  <td style={{ padding: '0.75rem', fontWeight: '800', color: '#fff' }}>₹{bill.amount.toLocaleString('en-IN')}</td>
                  <td style={{ padding: '0.75rem' }}>
                    <span className={`badge ${bill.status === 'Paid' ? 'badge-emerald' : 'badge-rose'}`}>
                      {bill.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Waste & Variance Audit Logs */}
      <div className="glass-card" style={{ padding: '1.5rem' }}>
        <h3 style={{ fontSize: '1.2rem', color: '#fff', marginBottom: '1rem' }}>Approved Raw Material Waste & Stock Gap Log</h3>
        
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.85rem' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', color: 'var(--text-muted)' }}>
                <th style={{ padding: '0.75rem' }}>Log ID</th>
                <th style={{ padding: '0.75rem' }}>Date</th>
                <th style={{ padding: '0.75rem' }}>Raw Ingredient</th>
                <th style={{ padding: '0.75rem' }}>Wasted Quantity</th>
                <th style={{ padding: '0.75rem' }}>Reason & Variance</th>
                <th style={{ padding: '0.75rem' }}>Manager Approval</th>
              </tr>
            </thead>
            <tbody>
              {wasteLogs.map(w => (
                <tr key={w.id} style={{ borderBottom: '1px dashed rgba(255,255,255,0.06)' }}>
                  <td style={{ padding: '0.75rem', color: 'var(--text-muted)' }}>#{w.id}</td>
                  <td style={{ padding: '0.75rem', color: 'var(--text-muted)' }}>{w.date}</td>
                  <td style={{ padding: '0.75rem', fontWeight: '700', color: '#fff' }}>{w.item}</td>
                  <td style={{ padding: '0.75rem', color: '#f43f5e', fontWeight: '700' }}>{w.quantity}</td>
                  <td style={{ padding: '0.75rem', color: 'var(--text-muted)' }}>{w.reason}</td>
                  <td style={{ padding: '0.75rem', color: '#34d399', fontWeight: '600' }}>{w.approvedBy}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Supplier Bill Modal */}
      {showAddBillModal && (
        <div className="modal-overlay" onClick={() => setShowAddBillModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ padding: '1.5rem', maxWidth: '480px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h3 style={{ fontSize: '1.3rem', color: '#fff' }}>Record Supplier Vendor Bill</h3>
              <button onClick={() => setShowAddBillModal(false)} className="btn btn-secondary btn-sm">✕</button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', marginBottom: '1.2rem' }}>
              <div>
                <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Select Supplier</label>
                <select value={billSupplier} onChange={(e) => setBillSupplier(e.target.value)} className="glass-input" style={{ width: '100%', marginTop: '0.2rem' }}>
                  {suppliers.map(s => (
                    <option key={s.id} value={s.name} style={{ background: '#0f1523' }}>{s.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Supplied Items Description</label>
                <input type="text" placeholder="e.g. 50L Fresh Whole Milk" value={billItems} onChange={(e) => setBillItems(e.target.value)} className="glass-input" style={{ width: '100%', marginTop: '0.2rem' }} />
              </div>

              <div>
                <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Bill Amount (₹)</label>
                <input type="number" value={billAmount} onChange={(e) => setBillAmount(e.target.value)} className="glass-input" style={{ width: '100%', marginTop: '0.2rem' }} />
              </div>
            </div>

            <button onClick={handleAddVendorBill} className="btn btn-primary btn-lg" style={{ width: '100%' }}>
              Save Vendor Bill To Ledger
            </button>
          </div>
        </div>
      )}

      {/* Log Waste Modal */}
      {showWasteModal && (
        <div className="modal-overlay" onClick={() => setShowWasteModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ padding: '1.5rem', maxWidth: '480px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h3 style={{ fontSize: '1.3rem', color: '#fff' }}>Log Ingredient Waste / Gap</h3>
              <button onClick={() => setShowWasteModal(false)} className="btn btn-secondary btn-sm">✕</button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', marginBottom: '1.2rem' }}>
              <div>
                <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Wasted Ingredient</label>
                <input type="text" value={wasteItem} onChange={(e) => setWasteItem(e.target.value)} className="glass-input" style={{ width: '100%', marginTop: '0.2rem' }} />
              </div>

              <div>
                <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Wasted Quantity</label>
                <input type="text" value={wasteQty} onChange={(e) => setWasteQty(e.target.value)} className="glass-input" style={{ width: '100%', marginTop: '0.2rem' }} />
              </div>

              <div>
                <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Reason for Variance</label>
                <input type="text" value={wasteReason} onChange={(e) => setWasteReason(e.target.value)} className="glass-input" style={{ width: '100%', marginTop: '0.2rem' }} />
              </div>
            </div>

            <button onClick={handleAddWasteLog} className="btn btn-danger btn-lg" style={{ width: '100%' }}>
              Confirm Manager Approved Waste Log
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
