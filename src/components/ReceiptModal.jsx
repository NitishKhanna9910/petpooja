import React from 'react';
import { Printer, Share2, ShieldCheck, X } from 'lucide-react';

export default function ReceiptModal({ order, onClose }) {
  if (!order) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ padding: '1.5rem', maxWidth: '420px', background: '#0f172a' }}>
        
        {/* Top Actions */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Thermal Bill Simulator</span>
          <div style={{ display: 'flex', gap: '0.4rem' }}>
            <button onClick={handlePrint} className="btn btn-primary btn-sm">
              <Printer size={14} /> Print
            </button>
            <button onClick={onClose} className="btn btn-secondary btn-sm">
              <X size={14} />
            </button>
          </div>
        </div>

        {/* Printable Thermal Receipt Card */}
        <div className="printable-receipt" style={{
          background: '#fff',
          color: '#000',
          padding: '1.2rem',
          borderRadius: '8px',
          fontFamily: "'Courier New', Courier, monospace",
          fontSize: '0.82rem',
          lineHeight: '1.4',
          boxShadow: '0 10px 25px rgba(0,0,0,0.5)'
        }}>
          {/* Cafe Header */}
          <div style={{ textAlign: 'center', marginBottom: '0.8rem', borderBottom: '1px dashed #000', paddingBottom: '0.6rem' }}>
            <h3 style={{ fontSize: '1.1rem', margin: 0, fontWeight: 'bold' }}>AMBER CAFE & BISTRO</h3>
            <div>Jaipur Main Branch • GSTIN: 08AAACG1234F1Z5</div>
            <div>Phone: +91 98290 12345</div>
          </div>

          {/* Bill Meta */}
          <div style={{ marginBottom: '0.6rem', fontSize: '0.8rem' }}>
            <div>Receipt #: <strong>{order.id}</strong></div>
            <div>Table: <strong>{order.tableName}</strong></div>
            <div>Date: {new Date(order.timestamp).toLocaleString()}</div>
            <div>Type: {order.orderType}</div>
          </div>

          {/* Items Divider */}
          <div style={{ borderBottom: '1px dashed #000', margin: '0.5rem 0' }}></div>

          {/* Items Table */}
          <table style={{ width: '100%', fontSize: '0.8rem', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '1px dashed #000' }}>
                <th style={{ padding: '0.2rem 0' }}>Qty Item</th>
                <th style={{ textAlign: 'right', padding: '0.2rem 0' }}>Amt</th>
              </tr>
            </thead>
            <tbody>
              {order.items.map((item, idx) => (
                <tr key={idx}>
                  <td style={{ padding: '0.2rem 0' }}>
                    {item.quantity}x {item.dishName}
                    {item.selectedExtras.length > 0 && (
                      <div style={{ fontSize: '0.72rem', fontStyle: 'italic' }}>
                        + {item.selectedExtras.map(e => e.name).join(', ')}
                      </div>
                    )}
                  </td>
                  <td style={{ textAlign: 'right', padding: '0.2rem 0', fontWeight: 'bold' }}>
                    ₹{(item.price + item.selectedExtras.reduce((s,e)=>s+e.price,0))*item.quantity}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div style={{ borderBottom: '1px dashed #000', margin: '0.5rem 0' }}></div>

          {/* Totals */}
          <div style={{ fontSize: '0.82rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Subtotal:</span>
              <span>₹{order.subtotal}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>CGST (2.5%):</span>
              <span>₹{(order.taxGst / 2).toFixed(2)}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>SGST (2.5%):</span>
              <span>₹{(order.taxGst / 2).toFixed(2)}</span>
            </div>

            {order.discountAmount > 0 && (
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#000', fontStyle: 'italic' }}>
                <span>Discount ({order.discountReason}):</span>
                <span>-₹{order.discountAmount}</span>
              </div>
            )}

            {order.refundAmount > 0 && (
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#000', fontStyle: 'italic' }}>
                <span>Refund ({order.refundReason}):</span>
                <span>-₹{order.refundAmount}</span>
              </div>
            )}

            <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', fontSize: '1rem', marginTop: '0.4rem', paddingTop: '0.3rem', borderTop: '1px dashed #000' }}>
              <span>GRAND TOTAL:</span>
              <span>₹{order.netTotal}</span>
            </div>
          </div>

          <div style={{ borderBottom: '1px dashed #000', margin: '0.6rem 0' }}></div>

          {/* Payment Status & Footer */}
          <div style={{ textAlign: 'center', fontSize: '0.75rem' }}>
            <div>Payment: <strong>{order.paymentStatus === 'Paid' ? `PAID via ${order.paymentMethod}` : 'PENDING'}</strong></div>
            <div style={{ marginTop: '0.4rem', fontWeight: 'bold' }}>Thank You For Visiting!</div>
            <div>Powered by Global Scale Softwares Floorline</div>
          </div>
        </div>

      </div>
    </div>
  );
}
