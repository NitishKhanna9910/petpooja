import React, { useState } from 'react';
import { Plus, Upload, Trash2, Edit3, Image as ImageIcon, Sparkles, CheckCircle, Tag, DollarSign, Utensils, AlertCircle } from 'lucide-react';

export default function AddDishPortal({ dishes, setDishes }) {
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingDish, setEditingDish] = useState(null);

  // Form State
  const [name, setName] = useState('');
  const [category, setCategory] = useState('Royal Snacks & Starters');
  const [price, setPrice] = useState(120);
  const [description, setDescription] = useState('');
  const [station, setStation] = useState('Grill & Snack Station');
  const [stock, setStock] = useState(30);
  const [isVeg, setIsVeg] = useState(true);
  const [bestseller, setBestseller] = useState(false);
  const [chefSpecial, setChefSpecial] = useState(false);

  // Image Upload State
  const [imagePreview, setImagePreview] = useState('/images/samosa.jpg');

  // Custom Extras State
  const [extrasList, setExtrasList] = useState([
    { id: 'ext-new-1', name: 'Extra Sauce / Dip', price: 15 }
  ]);
  const [newExtraName, setNewExtraName] = useState('');
  const [newExtraPrice, setNewExtraPrice] = useState(15);

  // Sample preset images for quick selection
  const presetImages = [
    { label: 'Samosa Platter', url: '/images/samosa.jpg' },
    { label: 'Paneer Tikka', url: '/images/paneer.jpg' },
    { label: 'Kulhad Chai', url: '/images/chai.jpg' }
  ];

  const handleAddExtraItem = () => {
    if (!newExtraName) return;
    setExtrasList(prev => [...prev, { id: `ext-${Date.now()}`, name: newExtraName, price: +newExtraPrice }]);
    setNewExtraName('');
    setNewExtraPrice(15);
  };

  const handleRemoveExtraItem = (extId) => {
    setExtrasList(prev => prev.filter(e => e.id !== extId));
  };

  const handleImageFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveDish = () => {
    if (!name) return;

    if (editingDish) {
      // Update existing dish
      setDishes(prev => prev.map(d => {
        if (d.id === editingDish.id) {
          return {
            ...d,
            name,
            category,
            price: +price,
            description,
            station,
            stock: +stock,
            isVeg,
            bestseller,
            chefSpecial,
            image: imagePreview,
            extras: extrasList
          };
        }
        return d;
      }));
      setEditingDish(null);
    } else {
      // Create new dish
      const newDishObj = {
        id: `dish-${Date.now()}`,
        name,
        category,
        price: +price,
        isVeg,
        bestseller,
        chefSpecial,
        image: imagePreview,
        description: description || 'Freshly prepared specialty dish cooked to perfection.',
        station,
        stock: +stock,
        isFinished: false,
        extras: extrasList
      };
      setDishes(prev => [newDishObj, ...prev]);
    }

    resetForm();
    setShowAddForm(false);
  };

  const resetForm = () => {
    setName('');
    setCategory('Royal Snacks & Starters');
    setPrice(120);
    setDescription('');
    setStation('Grill & Snack Station');
    setStock(30);
    setIsVeg(true);
    setBestseller(false);
    setChefSpecial(false);
    setImagePreview('/images/samosa.jpg');
    setExtrasList([{ id: 'ext-new-1', name: 'Extra Sauce / Dip', price: 15 }]);
  };

  const handleStartEdit = (dish) => {
    setEditingDish(dish);
    setName(dish.name);
    setCategory(dish.category);
    setPrice(dish.price);
    setDescription(dish.description);
    setStation(dish.station);
    setStock(dish.stock);
    setIsVeg(dish.isVeg);
    setBestseller(dish.bestseller);
    setChefSpecial(dish.chefSpecial);
    setImagePreview(dish.image);
    setExtrasList(dish.extras || []);
    setShowAddForm(true);
  };

  const handleDeleteDish = (dishId) => {
    if (confirm('Are you sure you want to delete this menu dish?')) {
      setDishes(prev => prev.filter(d => d.id !== dishId));
    }
  };

  return (
    <div style={{ maxWidth: '1300px', margin: '0 auto', padding: '0 1rem 5rem 1rem' }}>
      
      {/* Header Banner */}
      <div className="glass-card" style={{ padding: '1.2rem 1.5rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <div style={{ fontSize: '0.8rem', textTransform: 'uppercase', color: 'var(--primary)', fontWeight: '700', letterSpacing: '0.05em', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <Utensils size={16} /> Petpooja Style Menu & Dish Management
          </div>
          <h2 style={{ fontSize: '1.5rem', color: '#fff', margin: '0.2rem 0' }}>
            Add Dishes, Image Uploads & Pricing Editor
          </h2>
          <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            Create new menu items, upload photos, set custom add-ons & assign kitchen cooking stations.
          </div>
        </div>

        <button onClick={() => { resetForm(); setEditingDish(null); setShowAddForm(true); }} className="btn btn-primary">
          <Plus size={16} /> Add New Dish To Menu
        </button>
      </div>

      {/* Dishes Management Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.25rem' }}>
        {dishes.map(dish => (
          <div key={dish.id} className="glass-card" style={{ padding: '1.2rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div style={{ position: 'relative', height: '140px', borderRadius: '12px', overflow: 'hidden', marginBottom: '0.8rem' }}>
                <img src={dish.image} alt={dish.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <span className="badge badge-amber" style={{ position: 'absolute', top: '0.5rem', left: '0.5rem' }}>
                  {dish.category}
                </span>
                <span style={{ position: 'absolute', bottom: '0.5rem', right: '0.5rem', background: 'rgba(0,0,0,0.8)', color: 'var(--primary)', padding: '0.2rem 0.6rem', borderRadius: '8px', fontWeight: '800', fontSize: '1rem' }}>
                  ₹{dish.price}
                </span>
              </div>

              <h3 style={{ fontSize: '1.15rem', color: '#fff', fontWeight: '700', marginBottom: '0.2rem' }}>{dish.name}</h3>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.6rem', lineHeight: '1.4' }}>{dish.description}</p>

              <div style={{ background: 'rgba(0,0,0,0.25)', padding: '0.6rem', borderRadius: '8px', fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '0.8rem' }}>
                <div>Station: <strong style={{ color: '#fff' }}>{dish.station}</strong></div>
                <div>Stock: <strong style={{ color: 'var(--accent-emerald)' }}>{dish.stock} portions</strong></div>
                <div>Extras: <strong style={{ color: 'var(--primary)' }}>{dish.extras ? dish.extras.length : 0} add-ons</strong></div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '0.5rem', borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '0.6rem' }}>
              <button onClick={() => handleStartEdit(dish)} className="btn btn-secondary btn-sm" style={{ flex: 1 }}>
                <Edit3 size={14} /> Edit Pricing & Photos
              </button>
              <button onClick={() => handleDeleteDish(dish.id)} className="btn btn-danger btn-sm" style={{ padding: '0.4rem 0.6rem' }}>
                <Trash2 size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add / Edit Dish Modal */}
      {showAddForm && (
        <div className="modal-overlay" onClick={() => setShowAddForm(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ padding: '1.5rem', maxWidth: '640px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.2rem' }}>
              <div>
                <span className="badge badge-amber">{editingDish ? 'Edit Dish' : 'New Dish Creator'}</span>
                <h3 style={{ fontSize: '1.4rem', color: '#fff', marginTop: '0.2rem' }}>
                  {editingDish ? `Edit ${editingDish.name}` : 'Add New Menu Item'}
                </h3>
              </div>
              <button onClick={() => setShowAddForm(false)} className="btn btn-secondary btn-sm">✕</button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.2rem' }}>
              
              {/* Dish Name */}
              <div style={{ gridColumn: 'span 2' }}>
                <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Dish Name</label>
                <input
                  type="text"
                  placeholder="e.g. Royal Raj कचोरी Chaat"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="glass-input"
                  style={{ width: '100%', marginTop: '0.2rem' }}
                />
              </div>

              {/* Category */}
              <div>
                <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Menu Category</label>
                <select value={category} onChange={(e) => setCategory(e.target.value)} className="glass-input" style={{ width: '100%', marginTop: '0.2rem' }}>
                  <option value="Artisanal Chai & Coffee" style={{ background: '#0f1523' }}>Artisanal Chai & Coffee</option>
                  <option value="Royal Snacks & Starters" style={{ background: '#0f1523' }}>Royal Snacks & Starters</option>
                  <option value="Mains & Curries" style={{ background: '#0f1523' }}>Mains & Curries</option>
                  <option value="Desserts & Sweets" style={{ background: '#0f1523' }}>Desserts & Sweets</option>
                </select>
              </div>

              {/* Price */}
              <div>
                <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Dish Price (₹)</label>
                <input
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="glass-input"
                  style={{ width: '100%', marginTop: '0.2rem' }}
                />
              </div>

              {/* Kitchen Station */}
              <div>
                <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Kitchen Station Assignment</label>
                <select value={station} onChange={(e) => setStation(e.target.value)} className="glass-input" style={{ width: '100%', marginTop: '0.2rem' }}>
                  <option value="Chai & Beverage Bar" style={{ background: '#0f1523' }}>Chai & Beverage Bar</option>
                  <option value="Grill & Snack Station" style={{ background: '#0f1523' }}>Grill & Snack Station</option>
                  <option value="Main Kitchen" style={{ background: '#0f1523' }}>Main Kitchen</option>
                  <option value="Desserts & Pantry" style={{ background: '#0f1523' }}>Desserts & Pantry</option>
                </select>
              </div>

              {/* Initial Stock */}
              <div>
                <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Stock Quantity</label>
                <input
                  type="number"
                  value={stock}
                  onChange={(e) => setStock(e.target.value)}
                  className="glass-input"
                  style={{ width: '100%', marginTop: '0.2rem' }}
                />
              </div>

              {/* Description */}
              <div style={{ gridColumn: 'span 2' }}>
                <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Dish Description</label>
                <input
                  type="text"
                  placeholder="Freshly prepared with authentic Rajasthani spices..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="glass-input"
                  style={{ width: '100%', marginTop: '0.2rem' }}
                />
              </div>
            </div>

            {/* Image Upload Simulator */}
            <div style={{ background: 'rgba(0,0,0,0.3)', padding: '1rem', borderRadius: '14px', marginBottom: '1.2rem' }}>
              <div style={{ fontSize: '0.85rem', color: '#fff', fontWeight: '700', marginBottom: '0.6rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <ImageIcon size={16} color="var(--primary)" /> Dish Food Photo Upload
              </div>

              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
                <div style={{ width: 80, height: 80, borderRadius: 12, overflow: 'hidden', background: '#121826', border: '1px solid rgba(255,255,255,0.1)' }}>
                  <img src={imagePreview} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>

                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                  <label className="btn btn-secondary btn-sm" style={{ cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '0.4rem', width: 'fit-content' }}>
                    <Upload size={14} /> Upload Custom Photo File
                    <input type="file" accept="image/*" onChange={handleImageFileChange} style={{ display: 'none' }} />
                  </label>

                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                    Or select preset image:
                  </div>

                  <div style={{ display: 'flex', gap: '0.4rem' }}>
                    {presetImages.map((p, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setImagePreview(p.url)}
                        className="btn btn-secondary btn-sm"
                        style={{ fontSize: '0.72rem', padding: '0.25rem 0.5rem' }}
                      >
                        {p.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Custom Extras & Add-ons Builder (+16% upsell) */}
            <div style={{ background: 'rgba(0,0,0,0.3)', padding: '1rem', borderRadius: '14px', marginBottom: '1.5rem' }}>
              <div style={{ fontSize: '0.85rem', color: 'var(--primary)', fontWeight: '700', marginBottom: '0.6rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <Sparkles size={16} /> Add-ons & Extras Builder (+16% Phone Upsell)
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '0.8rem' }}>
                {extrasList.map(ext => (
                  <div key={ext.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(255,255,255,0.04)', padding: '0.4rem 0.8rem', borderRadius: '8px', fontSize: '0.85rem' }}>
                    <span style={{ color: '#fff' }}>{ext.name}</span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                      <strong style={{ color: 'var(--primary)' }}>+₹{ext.price}</strong>
                      <button onClick={() => handleRemoveExtraItem(ext.id)} className="btn btn-danger btn-sm" style={{ padding: '0.15rem 0.4rem', fontSize: '0.7rem' }}>✕</button>
                    </div>
                  </div>
                ))}
              </div>

              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <input
                  type="text"
                  placeholder="Extra item name (e.g. Extra Cheese)"
                  value={newExtraName}
                  onChange={(e) => setNewExtraName(e.target.value)}
                  className="glass-input"
                  style={{ flex: 1, padding: '0.4rem 0.7rem', fontSize: '0.82rem' }}
                />
                <input
                  type="number"
                  placeholder="Price ₹"
                  value={newExtraPrice}
                  onChange={(e) => setNewExtraPrice(e.target.value)}
                  className="glass-input"
                  style={{ width: '80px', padding: '0.4rem 0.7rem', fontSize: '0.82rem' }}
                />
                <button type="button" onClick={handleAddExtraItem} className="btn btn-secondary btn-sm">
                  <Plus size={14} /> Add
                </button>
              </div>
            </div>

            {/* Save Button */}
            <button onClick={handleSaveDish} className="btn btn-primary btn-lg" style={{ width: '100%' }}>
              {editingDish ? 'Save Dish Changes' : 'Publish Dish To Menu & Sync POS →'}
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
