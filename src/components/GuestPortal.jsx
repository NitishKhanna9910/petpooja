import React, { useState, useRef, useEffect } from 'react';
import { Search, ShoppingBag, Plus, Minus, Check, Star, ShieldCheck, Sparkles, QrCode, ArrowRight, Utensils, RefreshCw, Gift, FileText } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function GuestPortal({ dishes, orders, setOrders, selectedTable, setSelectedTable, onOpenReceipt }) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [vegOnly, setVegOnly] = useState(false);

  // Cart state
  const [cart, setCart] = useState([]);
  const [customizingDish, setCustomizingDish] = useState(null);
  const [selectedExtras, setSelectedExtras] = useState([]);
  const [specialNotes, setSpecialNotes] = useState('');
  const [itemQuantity, setItemQuantity] = useState(1);

  // Checkout & Payment Modals
  const [showCartDrawer, setShowCartDrawer] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('UPI');
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [paymentSuccessOrder, setPaymentSuccessOrder] = useState(null);

  // Scratch Card state
  const [rating, setRating] = useState(5);
  const [scratchRevealed, setScratchRevealed] = useState(false);
  const canvasRef = useRef(null);

  // Sequential Food Menu Categories Order (Starters -> Beverages -> Mains -> Desserts)
  const categories = ['All', 'Royal Snacks & Starters', 'Artisanal Chai & Coffee', 'Mains & Curries', 'Desserts & Sweets'];

  // Filtered dishes
  const filteredDishes = dishes.filter(d => {
    const matchesCat = selectedCategory === 'All' || d.category === selectedCategory;
    const matchesSearch = d.name.toLowerCase().includes(searchQuery.toLowerCase()) || d.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesVeg = !vegOnly || d.isVeg;
    return matchesCat && matchesSearch && matchesVeg;
  });

  // Calculate cart totals
  const cartSubtotal = cart.reduce((sum, item) => {
    const extrasTotal = item.selectedExtras.reduce((es, e) => es + e.price, 0);
    return sum + (item.price + extrasTotal) * item.quantity;
  }, 0);
  const cartGst = +(cartSubtotal * 0.05).toFixed(2);
  const cartTotal = +(cartSubtotal + cartGst).toFixed(2);

  // Add item to cart customization modal handler
  const handleOpenCustomization = (dish) => {
    if (dish.isFinished || dish.stock <= 0) return;
    setCustomizingDish(dish);
    setSelectedExtras([]);
    setSpecialNotes('');
    setItemQuantity(1);
  };

  const handleAddToCart = () => {
    if (!customizingDish) return;
    const cartItem = {
      id: `${customizingDish.id}-${Date.now()}`,
      dishId: customizingDish.id,
      dishName: customizingDish.name,
      price: customizingDish.price,
      quantity: itemQuantity,
      selectedExtras: selectedExtras,
      notes: specialNotes
    };
    setCart(prev => [...prev, cartItem]);
    setCustomizingDish(null);
  };

  const handleUpdateCartQty = (id, delta) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = item.quantity + delta;
        return newQty > 0 ? { ...item, quantity: newQty } : null;
      }
      return item;
    }).filter(Boolean));
  };

  // Submit order & payment simulation
  const handleProcessPayment = () => {
    setIsProcessingPayment(true);
    setTimeout(() => {
      const newOrderId = `ORD-${Math.floor(1000 + Math.random() * 9000)}`;
      const newOrder = {
        id: newOrderId,
        tableId: selectedTable,
        tableName: selectedTable,
        outlet: 'Amber Cafe & Bistro (Jaipur Main)',
        orderType: 'Dine-In (QR Code)',
        timestamp: new Date().toISOString(),
        status: 'Preparing',
        stationStatus: {
          'Chai & Beverage Bar': 'Preparing',
          'Grill & Snack Station': 'Preparing'
        },
        items: cart,
        subtotal: cartSubtotal,
        taxGst: cartGst,
        netTotal: cartTotal,
        discountAmount: 0,
        discountReason: '',
        refundAmount: 0,
        refundReason: '',
        paymentStatus: 'Paid',
        paymentMethod: paymentMethod,
        rating: 5,
        reviewText: '',
        googleReviewRedirected: false,
        scratchCardClaimed: false,
        scratchReward: '🎉 15% OFF On Your Next Visit! (Code: GS15)'
      };

      setOrders(prev => [newOrder, ...prev]);
      setPaymentSuccessOrder(newOrder);
      setCart([]);
      setIsProcessingPayment(false);
      setShowCartDrawer(false);
    }, 1500);
  };

  // Active table order tracker
  const activeOrder = orders.find(o => o.tableId === selectedTable && o.status !== 'Paid' && o.status !== 'Served') 
    || paymentSuccessOrder 
    || orders.find(o => o.tableId === selectedTable);

  // Scratch card canvas setup
  useEffect(() => {
    if (activeOrder && canvasRef.current && !scratchRevealed) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      canvas.width = 320;
      canvas.height = 180;

      // Draw metallic silver scratch layer
      const grad = ctx.createLinearGradient(0, 0, 320, 180);
      grad.addColorStop(0, '#94a3b8');
      grad.addColorStop(0.5, '#cbd5e1');
      grad.addColorStop(1, '#64748b');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 320, 180);

      // Add text on scratch layer
      ctx.fillStyle = '#1e293b';
      ctx.font = 'bold 16px Outfit, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('✨ SCRATCH WITH MOUSE / FINGER ✨', 160, 85);
      ctx.font = '12px Inter, sans-serif';
      ctx.fillText('Scratch to unlock your Google Review Gift Card', 160, 110);

      // Scratching handler
      let isDrawing = false;
      const scratch = (x, y) => {
        ctx.globalCompositeOperation = 'destination-out';
        ctx.beginPath();
        ctx.arc(x, y, 22, 0, Math.PI * 2);
        ctx.fill();

        // Calculate revealed area percentage
        const imgData = ctx.getImageData(0, 0, 320, 180);
        let clearedPixels = 0;
        for (let i = 3; i < imgData.data.length; i += 4) {
          if (imgData.data[i] === 0) clearedPixels++;
        }
        if (clearedPixels / (320 * 180) > 0.45 && !scratchRevealed) {
          setScratchRevealed(true);
          confetti({ particleCount: 70, spread: 60, origin: { y: 0.7 } });
        }
      };

      const getCoords = (e) => {
        const rect = canvas.getBoundingClientRect();
        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        const clientY = e.touches ? e.touches[0].clientY : e.clientY;
        return { x: clientX - rect.left, y: clientY - rect.top };
      };

      const handleMouseDown = (e) => { isDrawing = true; const { x, y } = getCoords(e); scratch(x, y); };
      const handleMouseMove = (e) => { if (isDrawing) { const { x, y } = getCoords(e); scratch(x, y); } };
      const handleMouseUp = () => { isDrawing = false; };

      canvas.addEventListener('mousedown', handleMouseDown);
      canvas.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      canvas.addEventListener('touchstart', handleMouseDown);
      canvas.addEventListener('touchmove', handleMouseMove);
      window.addEventListener('touchend', handleMouseUp);

      return () => {
        canvas.removeEventListener('mousedown', handleMouseDown);
        canvas.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', handleMouseUp);
        canvas.removeEventListener('touchstart', handleMouseDown);
        canvas.removeEventListener('touchmove', handleMouseMove);
        window.removeEventListener('touchend', handleMouseUp);
      };
    }
  }, [activeOrder, scratchRevealed]);

  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 1rem 6rem 1rem' }}>
      
      {/* Tableline Mobile Header Card */}
      <div className="glass-card" style={{ padding: '1.2rem 1.5rem', marginBottom: '1.5rem', background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.8) 0%, rgba(15, 23, 42, 0.9) 100%)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{
              background: 'rgba(245, 158, 11, 0.15)',
              border: '1px solid var(--primary)',
              padding: '0.8rem',
              borderRadius: '16px',
              color: 'var(--primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <QrCode size={28} />
            </div>
            <div>
              <div style={{ fontSize: '0.8rem', textTransform: 'uppercase', color: 'var(--primary)', fontWeight: '700', letterSpacing: '0.05em' }}>
                Tableline QR Experience
              </div>
              <h2 style={{ fontSize: '1.4rem', color: '#fff', margin: '0.1rem 0' }}>
                Amber Cafe & Bistro
              </h2>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span>Scanned Seat:</span>
                <strong style={{ color: '#fff', background: 'rgba(255,255,255,0.1)', padding: '0.15rem 0.6rem', borderRadius: '6px' }}>
                  {selectedTable}
                </strong>
              </div>
            </div>
          </div>

          {/* Quick Table Selector Simulator */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Simulate QR Scan:</span>
            <select
              value={selectedTable}
              onChange={(e) => setSelectedTable(e.target.value)}
              className="glass-input"
              style={{ padding: '0.4rem 0.8rem', fontSize: '0.85rem', width: '130px' }}
            >
              {['Table 01', 'Table 02', 'Table 03', 'Table 04', 'Table 05', 'Table 06'].map(t => (
                <option key={t} value={t} style={{ background: '#0f1523' }}>{t}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Double tap protection notice banner */}
        <div style={{
          marginTop: '1rem',
          padding: '0.5rem 0.8rem',
          background: 'rgba(16, 185, 129, 0.08)',
          border: '1px solid rgba(16, 185, 129, 0.2)',
          borderRadius: '10px',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          fontSize: '0.78rem',
          color: '#34d399'
        }}>
          <ShieldCheck size={16} />
          <span><strong>Tableline Safe-Order:</strong> Double-tap protection active. Direct table kitchen sync & auto billing.</span>
        </div>
      </div>

      {/* Active Order Live Tracker Banner (If table has order) */}
      {activeOrder && (
        <div className="glass-card" style={{ padding: '1.2rem 1.5rem', marginBottom: '1.5rem', border: '1px solid rgba(99, 102, 241, 0.4)', background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(30, 27, 75, 0.2) 100%)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span className="badge badge-indigo">Live Order #{activeOrder.id}</span>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{new Date(activeOrder.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
              </div>
              <h3 style={{ fontSize: '1.1rem', color: '#fff', marginTop: '0.3rem' }}>
                Kitchen Order Status for {activeOrder.tableName}
              </h3>
            </div>
            <button onClick={() => onOpenReceipt(activeOrder)} className="btn btn-secondary btn-sm">
              <FileText size={14} /> View Digital Bill
            </button>
          </div>

          {/* Progress Timeline */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.5rem', textAlign: 'center', position: 'relative' }}>
            {[
              { label: 'Received', done: true },
              { label: 'Preparing', done: activeOrder.status === 'Preparing' || activeOrder.status === 'Served' || activeOrder.status === 'Paid' },
              { label: 'Served', done: activeOrder.status === 'Served' || activeOrder.status === 'Paid' },
              { label: 'Paid & Reviewed', done: activeOrder.paymentStatus === 'Paid' }
            ].map((step, idx) => (
              <div key={idx} style={{ position: 'relative', zIndex: 1 }}>
                <div style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  margin: '0 auto 0.4rem auto',
                  background: step.done ? 'var(--accent-emerald)' : 'rgba(255,255,255,0.1)',
                  color: step.done ? '#fff' : 'var(--text-muted)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.85rem',
                  fontWeight: '700',
                  boxShadow: step.done ? '0 0 10px var(--accent-emerald-glow)' : 'none'
                }}>
                  {step.done ? <Check size={16} /> : idx + 1}
                </div>
                <div style={{ fontSize: '0.75rem', color: step.done ? '#fff' : 'var(--text-muted)', fontWeight: step.done ? '600' : '400' }}>
                  {step.label}
                </div>
              </div>
            ))}
          </div>

          {/* Post-Payment Scratch Card Reveal Section */}
          {activeOrder.paymentStatus === 'Paid' && (
            <div style={{ marginTop: '1.5rem', paddingTop: '1.2rem', borderTop: '1px dashed rgba(255,255,255,0.15)' }}>
              <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: '#fbbf24', fontSize: '0.9rem', fontWeight: '700' }}>
                  <Star size={16} fill="#fbbf24" /> 5-Star Feedback & Scratch Card Reward
                </div>
                <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
                  Rate your meal to unlock your exclusive gift scratch voucher!
                </p>
              </div>

              {/* Star Rating Selector */}
              <div style={{ display: 'flex', justifyContent: 'center', gap: '0.4rem', marginBottom: '1.2rem' }}>
                {[1, 2, 3, 4, 5].map(star => (
                  <button
                    key={star}
                    onClick={() => setRating(star)}
                    style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '0.2rem' }}
                  >
                    <Star size={28} color="#fbbf24" fill={star <= rating ? '#fbbf24' : 'transparent'} />
                  </button>
                ))}
              </div>

              {/* Google Review Prompt */}
              {rating === 5 && (
                <div style={{ textAlign: 'center', marginBottom: '1.2rem' }}>
                  <a
                    href="https://maps.google.com"
                    target="_blank"
                    rel="noreferrer"
                    className="btn btn-emerald btn-sm"
                    style={{ gap: '0.4rem' }}
                  >
                    <Star size={14} fill="#fff" /> Share 5 Stars on Google Reviews
                  </a>
                </div>
              )}

              {/* Interactive Canvas Scratch Card */}
              <div style={{ textAlign: 'center' }}>
                <div className="scratch-card-container">
                  <div className="scratch-card-underlay">
                    <Sparkles size={28} color="var(--primary)" style={{ marginBottom: '0.3rem' }} />
                    <div style={{ fontSize: '0.75rem', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>YOUR REWARD UNLOCKED</div>
                    <div style={{ fontSize: '1rem', color: '#fff', fontWeight: '800', margin: '0.3rem 0' }}>
                      {activeOrder.scratchReward}
                    </div>
                    <div style={{ fontSize: '0.7rem', color: 'var(--primary)' }}>Show to manager on next visit!</div>
                  </div>
                  {!scratchRevealed && <canvas ref={canvasRef} className="scratch-card-canvas" />}
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Menu Filter Controls */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
          {/* Search Box */}
          <div style={{ flex: 1, minWidth: '220px', position: 'relative' }}>
            <Search size={18} color="var(--text-muted)" style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)' }} />
            <input
              type="text"
              placeholder="Search chai, samosa, paneer tikka..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="glass-input"
              style={{ width: '100%', paddingLeft: '2.8rem' }}
            />
          </div>

          {/* Veg Only Toggle */}
          <button
            onClick={() => setVegOnly(!vegOnly)}
            className={`btn ${vegOnly ? 'btn-emerald' : 'btn-secondary'}`}
            style={{ fontSize: '0.85rem' }}
          >
            <span style={{ width: 10, height: 10, borderRadius: '2px', border: '1px solid #10b981', background: '#10b981', display: 'inline-block' }}></span>
            100% Pure Veg
          </button>
        </div>

        {/* Category Scroll Pills */}
        <div style={{ display: 'flex', gap: '0.5rem', overflowX: 'auto', paddingBottom: '0.4rem' }}>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`btn ${selectedCategory === cat ? 'btn-primary' : 'btn-secondary'}`}
              style={{ padding: '0.45rem 1rem', fontSize: '0.85rem', borderRadius: 'var(--radius-full)', whitespace: 'nowrap' }}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Dishes Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.25rem' }}>
        {filteredDishes.map(dish => {
          const isOut = dish.isFinished || dish.stock <= 0;
          return (
            <div key={dish.id} className="glass-card" style={{ opacity: isOut ? 0.65 : 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
              {/* Dish Image */}
              <div style={{ position: 'relative', height: '160px', overflow: 'hidden', background: '#121826' }}>
                <img
                  src={dish.image}
                  alt={dish.name}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.3s ease' }}
                />
                {dish.bestseller && (
                  <span className="badge badge-amber" style={{ position: 'absolute', top: '0.6rem', left: '0.6rem' }}>
                    ★ Bestseller
                  </span>
                )}
                {dish.chefSpecial && (
                  <span className="badge badge-purple" style={{ position: 'absolute', top: '0.6rem', right: '0.6rem' }}>
                    Chef's Choice
                  </span>
                )}
                {isOut && (
                  <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <span className="badge badge-rose" style={{ fontSize: '0.85rem', padding: '0.4rem 0.8rem' }}>
                      Sold Out / Finished
                    </span>
                  </div>
                )}
              </div>

              {/* Dish Details */}
              <div style={{ padding: '1rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '0.5rem', marginBottom: '0.4rem' }}>
                  <h3 style={{ fontSize: '1.05rem', color: '#fff', fontWeight: '700' }}>
                    {dish.name}
                  </h3>
                  <div style={{ fontSize: '1.1rem', fontWeight: '800', color: 'var(--primary)', whitespace: 'nowrap' }}>
                    ₹{dish.price}
                  </div>
                </div>

                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: '1.4', flex: 1, marginBottom: '0.8rem' }}>
                  {dish.description}
                </p>

                {/* Extras preview badge */}
                {dish.extras && dish.extras.length > 0 && (
                  <div style={{ fontSize: '0.72rem', color: 'var(--primary)', marginBottom: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                    <Sparkles size={12} /> Customizable with {dish.extras.length} extras (+16% upsell)
                  </div>
                )}

                {/* Action button */}
                <button
                  onClick={() => handleOpenCustomization(dish)}
                  disabled={isOut}
                  className={`btn ${isOut ? 'btn-secondary' : 'btn-primary'}`}
                  style={{ width: '100%', padding: '0.6rem', fontSize: '0.9rem' }}
                >
                  {isOut ? 'Finished Today' : <><Plus size={16} /> Add to Order</>}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Floating Bottom Cart Bar (If items in cart) */}
      {cart.length > 0 && (
        <div style={{
          position: 'fixed',
          bottom: '1.5rem',
          left: '50%',
          transform: 'translateX(-50%)',
          width: 'calc(100% - 2rem)',
          maxWidth: '600px',
          zIndex: 600
        }}>
          <div className="glass-card" style={{
            background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
            padding: '0.85rem 1.4rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            boxShadow: '0 12px 30px rgba(16, 185, 129, 0.4)',
            border: 'none',
            borderRadius: 'var(--radius-xl)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
              <div style={{ background: 'rgba(0,0,0,0.2)', padding: '0.5rem', borderRadius: '10px', color: '#fff' }}>
                <ShoppingBag size={20} />
              </div>
              <div>
                <div style={{ color: '#fff', fontSize: '0.8rem', fontWeight: '600' }}>
                  {cart.reduce((s, i) => s + i.quantity, 0)} Items Added
                </div>
                <div style={{ color: '#fff', fontSize: '1.1rem', fontWeight: '800' }}>
                  Total: ₹{cartTotal} <span style={{ fontSize: '0.72rem', opacity: 0.8 }}>(incl. GST)</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => setShowCartDrawer(true)}
              className="btn"
              style={{ background: '#fff', color: '#000', padding: '0.6rem 1.2rem', fontSize: '0.95rem' }}
            >
              View Cart & Pay <ArrowRight size={16} />
            </button>
          </div>
        </div>
      )}

      {/* Dish Customization Modal */}
      {customizingDish && (
        <div className="modal-overlay" onClick={() => setCustomizingDish(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ padding: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
              <div>
                <span className="badge badge-amber">{customizingDish.category}</span>
                <h3 style={{ fontSize: '1.3rem', color: '#fff', margin: '0.3rem 0 0.1rem 0' }}>
                  {customizingDish.name}
                </h3>
                <div style={{ color: 'var(--primary)', fontWeight: '800', fontSize: '1.2rem' }}>
                  ₹{customizingDish.price}
                </div>
              </div>
              <button onClick={() => setCustomizingDish(null)} className="btn btn-secondary btn-sm">✕</button>
            </div>

            {/* Extras Section */}
            {customizingDish.extras && customizingDish.extras.length > 0 && (
              <div style={{ marginBottom: '1.2rem' }}>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.6rem', fontWeight: '600' }}>
                  Popular Extras & Add-ons:
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  {customizingDish.extras.map(ext => {
                    const isSelected = selectedExtras.some(e => e.name === ext.name);
                    return (
                      <div
                        key={ext.id}
                        onClick={() => {
                          if (isSelected) {
                            setSelectedExtras(prev => prev.filter(e => e.name !== ext.name));
                          } else {
                            setSelectedExtras(prev => [...prev, ext]);
                          }
                        }}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          padding: '0.65rem 0.9rem',
                          borderRadius: '10px',
                          background: isSelected ? 'rgba(245, 158, 11, 0.15)' : 'rgba(255,255,255,0.04)',
                          border: isSelected ? '1px solid var(--primary)' : '1px solid rgba(255,255,255,0.08)',
                          cursor: 'pointer',
                          transition: 'all 0.2s ease'
                        }}
                      >
                        <span style={{ fontSize: '0.9rem', color: isSelected ? '#fff' : 'var(--text-muted)' }}>
                          {ext.name}
                        </span>
                        <span style={{ fontSize: '0.9rem', fontWeight: '700', color: 'var(--primary)' }}>
                          +₹{ext.price}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Cooking Notes */}
            <div style={{ marginBottom: '1.2rem' }}>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.4rem', fontWeight: '600' }}>
                Chef Cooking Instructions / Notes:
              </div>
              <input
                type="text"
                placeholder="e.g. Extra hot, less sugar, no onion..."
                value={specialNotes}
                onChange={(e) => setSpecialNotes(e.target.value)}
                className="glass-input"
                style={{ width: '100%' }}
              />
            </div>

            {/* Quantity Selector & Add Button */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '1rem', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', background: 'rgba(0,0,0,0.3)', padding: '0.3rem 0.8rem', borderRadius: '12px' }}>
                <button
                  onClick={() => setItemQuantity(Math.max(1, itemQuantity - 1))}
                  className="btn btn-secondary btn-sm"
                  style={{ padding: '0.2rem 0.5rem' }}
                >
                  <Minus size={14} />
                </button>
                <span style={{ fontSize: '1.1rem', fontWeight: '700', color: '#fff', minWidth: '20px', textAlign: 'center' }}>
                  {itemQuantity}
                </span>
                <button
                  onClick={() => setItemQuantity(itemQuantity + 1)}
                  className="btn btn-secondary btn-sm"
                  style={{ padding: '0.2rem 0.5rem' }}
                >
                  <Plus size={14} />
                </button>
              </div>

              <button onClick={handleAddToCart} className="btn btn-primary btn-lg">
                Add To Cart (₹{(customizingDish.price + selectedExtras.reduce((s, e) => s + e.price, 0)) * itemQuantity})
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Cart & Payment Drawer */}
      {showCartDrawer && (
        <div className="modal-overlay" onClick={() => setShowCartDrawer(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ padding: '1.5rem', maxWidth: '560px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.2rem' }}>
              <div>
                <span className="badge badge-emerald">Tableline Direct Checkout</span>
                <h3 style={{ fontSize: '1.4rem', color: '#fff', margin: '0.2rem 0 0 0' }}>
                  Your Order ({selectedTable})
                </h3>
              </div>
              <button onClick={() => setShowCartDrawer(false)} className="btn btn-secondary btn-sm">✕</button>
            </div>

            {/* Cart Items List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', maxHeight: '220px', overflowY: 'auto', marginBottom: '1.2rem' }}>
              {cart.map(item => (
                <div key={item.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'rgba(255,255,255,0.03)', padding: '0.8rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.06)' }}>
                  <div>
                    <div style={{ fontWeight: '700', color: '#fff', fontSize: '0.95rem' }}>
                      {item.dishName} x{item.quantity}
                    </div>
                    {item.selectedExtras.length > 0 && (
                      <div style={{ fontSize: '0.75rem', color: 'var(--primary)' }}>
                        Extras: {item.selectedExtras.map(e => e.name).join(', ')}
                      </div>
                    )}
                    {item.notes && (
                      <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                        Note: {item.notes}
                      </div>
                    )}
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                    <div style={{ fontWeight: '800', color: '#fff' }}>
                      ₹{(item.price + item.selectedExtras.reduce((s, e) => s + e.price, 0)) * item.quantity}
                    </div>
                    <button onClick={() => handleUpdateCartQty(item.id, -1)} className="btn btn-danger btn-sm" style={{ padding: '0.2rem 0.5rem' }}>✕</button>
                  </div>
                </div>
              ))}
            </div>

            {/* Bill Summary */}
            <div style={{ background: 'rgba(0,0,0,0.3)', padding: '1rem', borderRadius: '14px', marginBottom: '1.2rem', fontSize: '0.88rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)', marginBottom: '0.4rem' }}>
                <span>Subtotal</span>
                <span>₹{cartSubtotal}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)', marginBottom: '0.4rem' }}>
                <span>GST Tax (5%)</span>
                <span>₹{cartGst}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#fff', fontWeight: '800', fontSize: '1.1rem', paddingTop: '0.5rem', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                <span>Grand Total</span>
                <span style={{ color: 'var(--accent-emerald)' }}>₹{cartTotal}</span>
              </div>
            </div>

            {/* Payment Method Selector */}
            <div style={{ marginBottom: '1.5rem' }}>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.6rem', fontWeight: '600' }}>
                Select Instant Payment Mode:
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.6rem' }}>
                {[
                  { id: 'UPI', label: 'UPI / PhonePe' },
                  { id: 'Card', label: 'Credit/Debit Card' },
                  { id: 'Cash', label: 'Pay at Counter' }
                ].map(pm => (
                  <button
                    key={pm.id}
                    onClick={() => setPaymentMethod(pm.id)}
                    className={`btn ${paymentMethod === pm.id ? 'btn-primary' : 'btn-secondary'}`}
                    style={{ fontSize: '0.8rem', padding: '0.6rem 0.3rem', textAlign: 'center' }}
                  >
                    {pm.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Non-stored card safety info */}
            <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textAlign: 'center', marginBottom: '1.2rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem' }}>
              <ShieldCheck size={14} color="var(--accent-emerald)" />
              Safe payment processing. We do not store card numbers.
            </div>

            {/* Pay Button */}
            <button
              onClick={handleProcessPayment}
              disabled={isProcessingPayment}
              className="btn btn-emerald btn-lg"
              style={{ width: '100%' }}
            >
              {isProcessingPayment ? (
                <><RefreshCw size={18} className="pulse-glow" /> Contacting Payment Gateway...</>
              ) : (
                <>Pay ₹{cartTotal} & Send Order To Kitchen →</>
              )}
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
