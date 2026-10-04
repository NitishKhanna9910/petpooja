import React, { useState } from 'react';
import { CreditCard, DollarSign, Percent, RefreshCw, Printer, Share2, Plus, Minus, ShieldAlert, CheckCircle, Search, FileText } from 'lucide-react';

export default function CounterPortal({ dishes, orders, setOrders, auditLogs, setAuditLogs, onOpenReceipt }) {
  const [activeTab, setActiveTab] = useState('Dine-In'); // Dine-In vs Takeaway
  const [selectedOrder, setSelectedOrder] = useState(orders[0] || null);

  // Discount Modal State
  const [showDiscountModal, setShowDiscountModal] = useState(false);
  const [discountPercent, setDiscountPercent] = useState(10);
  const [discountReason, setDiscountReason] = useState('Happy Hour Special Promo');

  // Refund Modal State
  const [showRefundModal, setShowRefundModal] = useState(false);
  const [refundAmount, setRefundAmount] = useState(50);
  const [refundReason, setRefundReason] = useState('Guest requested dish modification');

  const discountReasonsList = [
    'Happy Hour Special Promo',
    'VIP / Owner Courtesy Discount',
    'Kitchen Preparation Delay Comp',
    'Manager Approved Special Offer'
  ];

  const refundReasonsList = [
    'Guest requested dish modification',
    'Wrong dish served by kitchen',
    'Customer departure before serving',
    'Quality feedback adjustment'
  ];

  // Apply Discount to Active Order
  const handleApplyDiscount = () => {
    if (!selectedOrder) return;
    const calcDiscount = +(selectedOrder.subtotal * (discountPercent / 100)).toFixed(2);
    const updatedNet = +(selectedOrder.subtotal - calcDiscount + selectedOrder.taxGst).toFixed(2);

    const updatedOrder = {
      ...selectedOrder,
      discountAmount: calcDiscount,
      discountReason: discountReason,
      netTotal: updatedNet
    };

    setOrders(prev => prev.map(o => o.id === selectedOrder.id ? updatedOrder : o));
    setSelectedOrder(updatedOrder);

    // Audit log record
    const newLog = {
      id: `log-${Date.now()}`,
      timestamp: new Date().toLocaleString(),
      type: 'Discount',
      orderId: selectedOrder.id,
      table: selectedOrder.tableName,
      amount: `₹${calcDiscount} (${discountPercent}%)`,
      authorizer: 'Cashier Desk (Authorized)',
      reason: discountReason
    };
    setAuditLogs(prev => [newLog, ...prev]);
    setShowDiscountModal(false);
  };

  // Issue Refund to Active Order
  const handleIssueRefund = () => {
    if (!selectedOrder) return;
    const updatedNet = Math.max(0, +(selectedOrder.netTotal - refundAmount).toFixed(2));

    const updatedOrder = {
      ...selectedOrder,
      refundAmount: refundAmount,
      refundReason: refundReason,
      netTotal: updatedNet
    };

    setOrders(prev => prev.map(o => o.id === selectedOrder.id ? updatedOrder : o));
    setSelectedOrder(updatedOrder);

    // Audit log record
    const newLog = {
      id: `log-${Date.now()}`,
      timestamp: new Date().toLocaleString(),
      type: 'Refund',
      orderId: selectedOrder.id,
      table: selectedOrder.tableName,
      amount: `₹${refundAmount}`,
      authorizer: 'Counter Cashier',
      reason: refundReason
    };
    setAuditLogs(prev => [newLog, ...prev]);
    setShowRefundModal(false);
  };

  // Settle Bill Payment
  const handleSettleBill = (method) => {
    if (!selectedOrder) return;
    const updatedOrder = {
      ...selectedOrder,
      status: 'Paid',
      paymentStatus: 'Paid',
      paymentMethod: method
    };
    setOrders(prev => prev.map(o => o.id === selectedOrder.id ? updatedOrder : o));
    setSelectedOrder(updatedOrder);
  };

  return (
    <div style={{ maxWidth: '1300px', margin: '0 auto', padding: '0 1rem 4rem 1rem' }}>
      
      {/* Header Banner */}
      <div className="glass-card" style={{ padding: '1.2rem 1.5rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <div style={{ fontSize: '0.8rem', textTransform: 'uppercase', color: 'var(--primary)', fontWeight: '700', letterSpacing: '0.05em' }}>
            Floorline Counter POS Desk
          </div>
          <h2 style={{ fontSize: '1.5rem', color: '#fff', margin: '0.2rem 0' }}>
            Billing, Discounts & Refund Management
          </h2>
          <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            proposal requirement: Counter & phone guests share exact same order & tax system. Discounts & refunds require mandatory logged reasons.
          </div>
        </div>

        {/* Dine-in / Takeaway Toggle */}
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          {['Dine-In', 'Takeaway'].map(t => (
            <button
              key={t}
              onClick={() => setActiveTab(t)}
              className={`btn ${activeTab === t ? 'btn-primary' : 'btn-secondary'}`}
            >
              {t} Orders
            </button>
          ))}
        </div>
      </div>

      {/* Main POS Split Layout */}
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(300px, 380px) 1fr', gap: '1.5rem' }}>
        
        {/* Left Column: Order Queue List */}
        <div className="glass-card" style={{ padding: '1.2rem', display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
          <h3 style={{ fontSize: '1.1rem', color: '#fff', fontWeight: '700', marginBottom: '0.4rem' }}>
            Active Orders ({orders.length})
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', maxHeight: '550px', overflowY: 'auto' }}>
            {orders.map(order => {
              const isSelected = selectedOrder && selectedOrder.id === order.id;
              return (
                <div
                  key={order.id}
                  onClick={() => setSelectedOrder(order)}
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
                    <strong style={{ color: '#fff', fontSize: '0.95rem' }}>{order.tableName}</strong>
                    <span className={`badge ${order.paymentStatus === 'Paid' ? 'badge-emerald' : 'badge-amber'}`}>
                      {order.paymentStatus === 'Paid' ? 'PAID' : 'PENDING'}
                    </span>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                    <span>Order #{order.id}</span>
                    <strong style={{ color: 'var(--primary)', fontSize: '0.9rem' }}>₹{order.netTotal}</strong>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Billing & Action Desk */}
        {selectedOrder ? (
          <div className="glass-card" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.2rem', paddingBottom: '1rem', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                <div>
                  <span className="badge badge-amber">{selectedOrder.tableName}</span>
                  <h3 style={{ fontSize: '1.4rem', color: '#fff', marginTop: '0.2rem' }}>
                    Bill Details: Order #{selectedOrder.id}
                  </h3>
                  <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                    Placed at {new Date(selectedOrder.timestamp).toLocaleTimeString()}
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button onClick={() => onOpenReceipt(selectedOrder)} className="btn btn-secondary btn-sm">
                    <Printer size={14} /> Thermal Print
                  </button>
                  <button onClick={() => alert(`Digital bill link copied for WhatsApp sharing!`)} className="btn btn-secondary btn-sm">
                    <Share2 size={14} /> WhatsApp Share
                  </button>
                </div>
              </div>

              {/* Dish Items Table */}
              <div style={{ marginBottom: '1.5rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', padding: '0.5rem', background: 'rgba(0,0,0,0.3)', borderRadius: '8px', fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: '700', marginBottom: '0.5rem' }}>
                  <span>Item Name</span>
                  <span style={{ textAlign: 'center' }}>Price</span>
                  <span style={{ textAlign: 'center' }}>Qty</span>
                  <span style={{ textAlign: 'right' }}>Total</span>
                </div>

                {selectedOrder.items.map((item, idx) => (
                  <div key={idx} style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', padding: '0.6rem 0.5rem', borderBottom: '1px dashed rgba(255,255,255,0.06)', fontSize: '0.88rem', color: 'var(--text-main)', alignItems: 'center' }}>
                    <div>
                      <strong style={{ color: '#fff' }}>{item.dishName}</strong>
                      {item.selectedExtras.length > 0 && (
                        <div style={{ fontSize: '0.72rem', color: 'var(--primary)' }}>
                          + {item.selectedExtras.map(e => e.name).join(', ')}
                        </div>
                      )}
                    </div>
                    <span style={{ textAlign: 'center' }}>₹{item.price}</span>
                    <span style={{ textAlign: 'center' }}>x{item.quantity}</span>
                    <span style={{ textAlign: 'right', fontWeight: '700' }}>
                      ₹{(item.price + item.selectedExtras.reduce((s,e)=>s+e.price,0))*item.quantity}
                    </span>
                  </div>
                ))}
              </div>

              {/* Bill Totals Breakdown */}
              <div style={{ background: 'rgba(0,0,0,0.3)', padding: '1.2rem', borderRadius: '14px', marginBottom: '1.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)', marginBottom: '0.4rem', fontSize: '0.88rem' }}>
                  <span>Subtotal:</span>
                  <span>₹{selectedOrder.subtotal}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)', marginBottom: '0.4rem', fontSize: '0.88rem' }}>
                  <span>GST Tax (5%):</span>
                  <span>₹{selectedOrder.taxGst}</span>
                </div>

                {/* Applied Discount Line */}
                {selectedOrder.discountAmount > 0 && (
                  <div style={{ display: 'flex', justifyContent: 'space-between', color: '#fbbf24', marginBottom: '0.4rem', fontSize: '0.88rem' }}>
                    <span>Discount Applied ({selectedOrder.discountReason}):</span>
                    <span>-₹{selectedOrder.discountAmount}</span>
                  </div>
                )}

                {/* Issued Refund Line */}
                {selectedOrder.refundAmount > 0 && (
                  <div style={{ display: 'flex', justifyContent: 'space-between', color: '#f43f5e', marginBottom: '0.4rem', fontSize: '0.88rem' }}>
                    <span>Refund Adjustment ({selectedOrder.refundReason}):</span>
                    <span>-₹{selectedOrder.refundAmount}</span>
                  </div>
                )}

                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#fff', fontWeight: '800', fontSize: '1.2rem', paddingTop: '0.6rem', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                  <span>Net Payable Amount:</span>
                  <span style={{ color: 'var(--accent-emerald)' }}>₹{selectedOrder.netTotal}</span>
                </div>
              </div>

              {/* Discount & Refund Control Buttons */}
              <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1.5rem' }}>
                <button onClick={() => setShowDiscountModal(true)} className="btn btn-secondary" style={{ flex: 1 }}>
                  <Percent size={16} color="var(--primary)" /> Apply Discount
                </button>
                <button onClick={() => setShowRefundModal(true)} className="btn btn-secondary" style={{ flex: 1 }}>
                  <ShieldAlert size={16} color="#f43f5e" /> Issue Refund
                </button>
              </div>
            </div>

            {/* Bottom Payment Settlement Bar */}
            <div style={{ paddingTop: '1rem', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
              {selectedOrder.paymentStatus === 'Paid' ? (
                <div style={{ background: 'rgba(16, 185, 129, 0.15)', border: '1px solid var(--accent-emerald)', padding: '0.8rem', borderRadius: '12px', textAlign: 'center', color: '#34d399', fontWeight: '700' }}>
                  ✓ BILL PAID via {selectedOrder.paymentMethod}
                </div>
              ) : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.75rem' }}>
                  <button onClick={() => handleSettleBill('Cash Desk')} className="btn btn-emerald" style={{ padding: '0.75rem 0.5rem', fontSize: '0.88rem' }}>
                    Settle Cash
                  </button>
                  <button onClick={() => handleSettleBill('UPI Counter QR')} className="btn btn-primary" style={{ padding: '0.75rem 0.5rem', fontSize: '0.88rem' }}>
                    Settle UPI QR
                  </button>
                  <button onClick={() => handleSettleBill('POS Card Machine')} className="btn btn-secondary" style={{ padding: '0.75rem 0.5rem', fontSize: '0.88rem' }}>
                    Settle Card
                  </button>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="glass-card" style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-muted)' }}>
            Select an order from the left list to view billing & discount controls.
          </div>
        )}
      </div>

      {/* Discount Authorize Modal */}
      {showDiscountModal && (
        <div className="modal-overlay" onClick={() => setShowDiscountModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ padding: '1.5rem', maxWidth: '480px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h3 style={{ fontSize: '1.3rem', color: '#fff' }}>Apply Authorized Discount</h3>
              <button onClick={() => setShowDiscountModal(false)} className="btn btn-secondary btn-sm">✕</button>
            </div>

            <div style={{ marginBottom: '1.2rem' }}>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.4rem' }}>
                Select Discount Percentage:
              </div>
              <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
                {[5, 10, 15, 20].map(pct => (
                  <button
                    key={pct}
                    onClick={() => setDiscountPercent(pct)}
                    className={`btn ${discountPercent === pct ? 'btn-primary' : 'btn-secondary'}`}
                    style={{ flex: 1 }}
                  >
                    {pct}%
                  </button>
                ))}
              </div>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.4rem', fontWeight: '600' }}>
                Mandatory Authorization Reason:
              </div>
              <select
                value={discountReason}
                onChange={(e) => setDiscountReason(e.target.value)}
                className="glass-input"
                style={{ width: '100%', marginBottom: '0.6rem' }}
              >
                {discountReasonsList.map(r => (
                  <option key={r} value={r} style={{ background: '#0f1523' }}>{r}</option>
                ))}
              </select>
            </div>

            <button onClick={handleApplyDiscount} className="btn btn-primary btn-lg" style={{ width: '100%' }}>
              Confirm Discount (-₹{selectedOrder ? (selectedOrder.subtotal * (discountPercent/100)).toFixed(2) : 0})
            </button>
          </div>
        </div>
      )}

      {/* Refund Modal */}
      {showRefundModal && (
        <div className="modal-overlay" onClick={() => setShowRefundModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ padding: '1.5rem', maxWidth: '480px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h3 style={{ fontSize: '1.3rem', color: '#fff' }}>Issue Refund Adjustment</h3>
              <button onClick={() => setShowRefundModal(false)} className="btn btn-secondary btn-sm">✕</button>
            </div>

            <div style={{ marginBottom: '1.2rem' }}>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.4rem' }}>
                Refund Amount (₹):
              </div>
              <input
                type="number"
                value={refundAmount}
                onChange={(e) => setRefundAmount(+e.target.value)}
                className="glass-input"
                style={{ width: '100%' }}
              />
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.4rem', fontWeight: '600' }}>
                Mandatory Refund Reason Log:
              </div>
              <select
                value={refundReason}
                onChange={(e) => setRefundReason(e.target.value)}
                className="glass-input"
                style={{ width: '100%' }}
              >
                {refundReasonsList.map(r => (
                  <option key={r} value={r} style={{ background: '#0f1523' }}>{r}</option>
                ))}
              </select>
            </div>

            <button onClick={handleIssueRefund} className="btn btn-danger btn-lg" style={{ width: '100%' }}>
              Confirm Refund Issue (-₹{refundAmount})
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
