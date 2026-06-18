import { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { Plus, Edit2, Trash2, Search, X, Star } from 'lucide-react';

const CATEGORIES = ['Temple', 'Nature', 'Palace', 'Beach', 'Gallery', 'Culinary'];

const emptyForm = {
  name: '', location: '', category: 'Temple', price: '', rating: '', reviews: 0,
  distance: '', image: '', description: '', audioDuration: '', highlights: '',
};

export default function AdminDestinations() {
  const { destinations, addDestination, updateDestination, deleteDestination } = useContext(AppContext);
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState(null);
  const [formData, setFormData] = useState(emptyForm);
  const [activeCategory, setActiveCategory] = useState('All');

  const filtered = destinations.filter(d => {
    const matchSearch = d.name.toLowerCase().includes(search.toLowerCase()) || d.location?.toLowerCase().includes(search.toLowerCase());
    const matchCat = activeCategory === 'All' || d.category === activeCategory;
    return matchSearch && matchCat;
  });

  const openAdd = () => {
    setEditId(null);
    setFormData(emptyForm);
    setShowModal(true);
  };

  const openEdit = (dest) => {
    setEditId(dest.id);
    setFormData({
      ...dest,
      highlights: Array.isArray(dest.highlights) ? dest.highlights.join(', ') : (dest.highlights || ''),
    });
    setShowModal(true);
  };

  const handleDelete = (id, name) => {
    if (window.confirm(`Delete "${name}"? This cannot be undone.`)) {
      deleteDestination(id);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      ...formData,
      price: parseInt(formData.price) || 0,
      rating: parseFloat(formData.rating) || 0,
      highlights: typeof formData.highlights === 'string' ? formData.highlights.split(',').map(h => h.trim()).filter(Boolean) : formData.highlights,
    };
    if (editId) {
      updateDestination(editId, payload);
    } else {
      addDestination(payload);
    }
    setShowModal(false);
  };

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <div style={{ padding: '24px 24px 0' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <div>
            <h1 style={{ fontSize: '20px', fontWeight: '800' }}>Manage Destinations</h1>
            <p style={{ fontSize: '12px', color: 'var(--text-gray)', marginTop: '2px' }}>{destinations.length} total destinations</p>
          </div>
          <button className="btn btn-primary" onClick={openAdd}
            style={{ width: 'auto', padding: '10px 16px', borderRadius: '12px', fontSize: '13px', gap: '6px' }}>
            <Plus size={16} /> Add New
          </button>
        </div>

        {/* Search */}
        <div style={{ position: 'relative', marginBottom: '14px' }}>
          <Search size={16} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-gray)' }} />
          <input type="text" placeholder="Search destinations or location..."
            value={search} onChange={(e) => setSearch(e.target.value)}
            style={{ width: '100%', padding: '12px 16px 12px 40px', borderRadius: '12px', border: '1px solid var(--border-color)', outline: 'none', fontSize: '13px', background: 'var(--white)' }} />
        </div>

        {/* Category Filter */}
        <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '4px', marginBottom: '16px' }}>
          {['All', ...CATEGORIES].map(cat => (
            <button key={cat} onClick={() => setActiveCategory(cat)}
              style={{ padding: '6px 14px', borderRadius: '20px', border: activeCategory === cat ? '2px solid var(--primary)' : '1px solid var(--border-color)', background: activeCategory === cat ? 'var(--primary)' : 'white', color: activeCategory === cat ? 'white' : 'var(--text-gray)', fontWeight: activeCategory === cat ? '700' : '400', fontSize: '12px', whiteSpace: 'nowrap', cursor: 'pointer' }}>
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* List */}
      <div className="scrollable" style={{ flex: 1, padding: '0 24px 24px' }}>
        {filtered.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '48px 0', color: 'var(--text-gray)' }}>
            <div style={{ fontSize: '40px', marginBottom: '12px' }}>🔍</div>
            <p>No destinations found.</p>
          </div>
        ) : (
          filtered.map(dest => (
            <div key={dest.id} className="card" style={{ display: 'flex', gap: '12px', padding: '12px', marginBottom: '12px' }}>
              <img src={dest.image} alt={dest.name} onError={(e) => { e.target.src = 'https://via.placeholder.com/64'; }}
                style={{ width: '64px', height: '64px', borderRadius: '10px', objectFit: 'cover', flexShrink: 0 }} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <h4 style={{ fontSize: '14px', fontWeight: '700', marginBottom: '2px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{dest.name}</h4>
                <p style={{ fontSize: '11px', color: 'var(--text-gray)', marginBottom: '4px' }}>{dest.category} • {dest.location}</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
                    <Star size={11} color="#FFD700" fill="#FFD700" />
                    <span style={{ fontSize: '11px', fontWeight: '600' }}>{dest.rating}</span>
                  </div>
                  <span style={{ fontSize: '12px', fontWeight: '700', color: 'var(--primary)' }}>
                    {dest.price === 0 ? 'Free' : `Rp ${Number(dest.price).toLocaleString()}`}
                  </span>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '6px', alignItems: 'flex-start', flexShrink: 0 }}>
                <button onClick={() => openEdit(dest)}
                  style={{ background: '#EFF6FF', color: 'var(--primary)', border: 'none', padding: '8px', borderRadius: '8px', cursor: 'pointer', display: 'flex' }}>
                  <Edit2 size={15} />
                </button>
                <button onClick={() => handleDelete(dest.id, dest.name)}
                  style={{ background: '#FEF2F2', color: 'var(--danger)', border: 'none', padding: '8px', borderRadius: '8px', cursor: 'pointer', display: 'flex' }}>
                  <Trash2 size={15} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Add/Edit Modal */}
      {showModal && (
        <div style={{ position: 'absolute', inset: 0, zIndex: 100, display: 'flex', flexDirection: 'column', background: 'var(--bg-color)' }}>
          <div className="app-header white-header" style={{ justifyContent: 'space-between' }}>
            <button onClick={() => setShowModal(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', padding: 0 }}>
              <X size={22} color="var(--text-dark)" />
            </button>
            <span style={{ fontSize: '16px', fontWeight: '700', flex: 1, textAlign: 'center' }}>
              {editId ? 'Edit Destination' : 'Add New Destination'}
            </span>
            <div style={{ width: 22 }} />
          </div>
          <div className="scrollable" style={{ padding: '24px' }}>
            <form onSubmit={handleSubmit}>
              <div className="input-group">
                <label>Destination Name *</label>
                <input type="text" className="input-field" placeholder="e.g., Mount Bromo" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required />
              </div>
              <div style={{ display: 'flex', gap: '12px' }}>
                <div className="input-group" style={{ flex: 1 }}>
                  <label>Category</label>
                  <select className="input-field" value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })}>
                    {CATEGORIES.map(c => <option key={c}>{c}</option>)}
                  </select>
                </div>
                <div className="input-group" style={{ flex: 1 }}>
                  <label>Rating (0-5)</label>
                  <input type="number" step="0.1" min="0" max="5" className="input-field" placeholder="4.5" value={formData.rating} onChange={(e) => setFormData({ ...formData, rating: e.target.value })} required />
                </div>
              </div>
              <div style={{ display: 'flex', gap: '12px' }}>
                <div className="input-group" style={{ flex: 1 }}>
                  <label>Price (Rp)</label>
                  <input type="number" min="0" className="input-field" placeholder="50000" value={formData.price} onChange={(e) => setFormData({ ...formData, price: e.target.value })} required />
                </div>
                <div className="input-group" style={{ flex: 1 }}>
                  <label>Audio Duration</label>
                  <input type="text" className="input-field" placeholder="e.g. 30 min" value={formData.audioDuration} onChange={(e) => setFormData({ ...formData, audioDuration: e.target.value })} />
                </div>
              </div>
              <div style={{ display: 'flex', gap: '12px' }}>
                <div className="input-group" style={{ flex: 2 }}>
                  <label>Location / City</label>
                  <input type="text" className="input-field" placeholder="e.g. Probolinggo, Jawa Timur" value={formData.location} onChange={(e) => setFormData({ ...formData, location: e.target.value })} required />
                </div>
                <div className="input-group" style={{ flex: 1 }}>
                  <label>Distance</label>
                  <input type="text" className="input-field" placeholder="e.g. 5 km" value={formData.distance} onChange={(e) => setFormData({ ...formData, distance: e.target.value })} />
                </div>
              </div>
              <div className="input-group">
                <label>Image URL *</label>
                <input type="url" className="input-field" placeholder="https://..." value={formData.image} onChange={(e) => setFormData({ ...formData, image: e.target.value })} required />
              </div>
              {formData.image && (
                <div style={{ marginBottom: '16px' }}>
                  <img src={formData.image} alt="Preview" onError={(e) => e.target.style.display = 'none'} style={{ width: '100%', height: '130px', objectFit: 'cover', borderRadius: '12px' }} />
                </div>
              )}
              <div className="input-group">
                <label>Description *</label>
                <textarea className="input-field" rows="4" placeholder="Describe this destination..." value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} style={{ resize: 'vertical' }} required />
              </div>
              <div className="input-group">
                <label>Highlights (comma-separated)</label>
                <input type="text" className="input-field" placeholder="UNESCO Site, Sunrise View, ..." value={formData.highlights} onChange={(e) => setFormData({ ...formData, highlights: e.target.value })} />
              </div>
              <button type="submit" className="btn btn-primary" style={{ marginTop: '8px', borderRadius: '14px' }}>
                {editId ? 'Save Changes' : 'Add Destination'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
