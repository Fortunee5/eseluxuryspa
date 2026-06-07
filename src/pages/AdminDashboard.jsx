import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/AdminDashboard.css';

const API = 'https://eseluxuryspa.co/';

/* ── helpers ── */
const avatarColor = (name = '') => {
  const colors = ['#C8A97E','#7E9CC8','#9CC87E','#C87E9C','#7EC8C0','#C8BC7E','#A07EC8'];
  return colors[(name.charCodeAt(0) || 0) % colors.length];
};
const initials = (name = '') =>
  name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2);

/* ════════════════════════════════════════════════════════ */

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('bookings');
  const [bookings,  setBookings]  = useState([]);
  const [expanded,  setExpanded]  = useState(null);

  /* Manage Services (booking dropdown) */
  const [services,   setServices]   = useState([]);
  const [newName,    setNewName]    = useState('');
  const [newPrice,   setNewPrice]   = useState('');
  const [svcError,   setSvcError]   = useState('');
  const [svcSuccess, setSvcSuccess] = useState('');
  const [editingId,  setEditingId]  = useState(null);
  const [editName,   setEditName]   = useState('');
  const [editPrice,  setEditPrice]  = useState('');

  /* Services Section cards — server-backed */
  const [sectionCards,   setSectionCards]   = useState([]);
  const [secLoading,     setSecLoading]     = useState(true);
  const [secSaving,      setSecSaving]      = useState(false);
  const [secTitle,       setSecTitle]       = useState('');
  const [secImage,       setSecImage]       = useState(null);   // base64 data-URL
  const [secImageName,   setSecImageName]   = useState('');
  const [secError,       setSecError]       = useState('');
  const [secSuccess,     setSecSuccess]     = useState('');
  const fileInputRef = useRef(null);

  const navigate = useNavigate();

  /* ── init ── */
  useEffect(() => {
    if (!localStorage.getItem('isAdminAuthenticated')) navigate('/admin-login');

    // bookings (still localStorage — they are per-device submissions, that's fine)
    const saved = JSON.parse(localStorage.getItem('bookings') || '[]');
    setBookings(saved.sort((a, b) => b.id - a.id));

    // booking-dropdown services (still localStorage)
    const savedSvc = localStorage.getItem('adminServices');
    setServices(savedSvc ? JSON.parse(savedSvc) : []);

    // section service cards — fetch from server
    fetchSectionCards();
  }, [navigate]);

  const fetchSectionCards = () => {
    setSecLoading(true);
    fetch(`${API}/api/section-services`)
      .then(r => r.json())
      .then(data => setSectionCards(Array.isArray(data) ? data : []))
      .catch(() => setSecError('Could not reach the server. Is server.js running?'))
      .finally(() => setSecLoading(false));
  };

  /* ── flash helpers ── */
  const flash = (msg, isError = false) => {
    isError ? setSvcError(msg) : setSvcSuccess(msg);
    setTimeout(() => { setSvcError(''); setSvcSuccess(''); }, 3500);
  };
  const flashSec = (msg, isError = false) => {
    isError ? setSecError(msg) : setSecSuccess(msg);
    setTimeout(() => { setSecError(''); setSecSuccess(''); }, 3500);
  };

  /* ── Manage Services (dropdown) ── */
  const persist = (list) => {
    setServices(list);
    localStorage.setItem('adminServices', JSON.stringify(list));
  };
  const rawPrice = (val) => String(val).replace(/^₵/, '').trim();

  const handleAdd = () => {
    const name = newName.trim(), price = rawPrice(newPrice);
    if (!name) { flash('Service name is required.', true); return; }
    if (services.some(s => s.name.toLowerCase() === name.toLowerCase())) {
      flash('A service with that name already exists.', true); return;
    }
    persist([...services, { id: Date.now(), name, price }]);
    setNewName(''); setNewPrice('');
    flash('Service added!');
  };
  const handleDelete = (id) => { persist(services.filter(s => s.id !== id)); flash('Service removed.'); };
  const startEdit  = (svc) => { setEditingId(svc.id); setEditName(svc.name); setEditPrice(svc.price); };
  const cancelEdit = () => setEditingId(null);
  const saveEdit   = (id) => {
    const name = editName.trim(), price = rawPrice(editPrice);
    if (!name) { flash('Name cannot be empty.', true); return; }
    if (services.some(s => s.id !== id && s.name.toLowerCase() === name.toLowerCase())) {
      flash('Another service already has that name.', true); return;
    }
    persist(services.map(s => s.id === id ? { ...s, name, price } : s));
    setEditingId(null); flash('Service updated!');
  };

  /* ── Bookings ── */
  const deleteBooking = (id) => {
    const updated = bookings.filter(b => b.id !== id);
    setBookings(updated);
    localStorage.setItem('bookings', JSON.stringify(updated));
    if (expanded === id) setExpanded(null);
  };
  const toggleExpand = (id) => setExpanded(prev => prev === id ? null : id);

  /* ── Section Services (server) ── */
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) { flashSec('Please select a valid image file.', true); return; }
    if (file.size > 5 * 1024 * 1024)    { flashSec('Image must be under 5 MB.', true); return; }
    const reader = new FileReader();
    reader.onload = (ev) => { setSecImage(ev.target.result); setSecImageName(file.name); };
    reader.readAsDataURL(file);
  };

  const clearSecForm = () => {
    setSecTitle(''); setSecImage(null); setSecImageName('');
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleSecAdd = async () => {
    const title = secTitle.trim();
    if (!title)    { flashSec('Title is required.', true); return; }
    if (!secImage) { flashSec('Please upload an image.', true); return; }

    setSecSaving(true);
    try {
      const res = await fetch(`${API}/api/section-services`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, imageData: secImage }),
      });
      if (!res.ok) throw new Error(await res.text());
      clearSecForm();
      flashSec('Service card saved and published!');
      fetchSectionCards();              // refresh list from server
    } catch (err) {
      flashSec(`Save failed: ${err.message}`, true);
    } finally {
      setSecSaving(false);
    }
  };

  const handleSecDelete = async (id) => {
    try {
      const res = await fetch(`${API}/api/section-services/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error(await res.text());
      flashSec('Card removed.');
      fetchSectionCards();
    } catch (err) {
      flashSec(`Delete failed: ${err.message}`, true);
    }
  };

  /* ════════════════ RENDER ════════════════ */
  return (
    <div className="admin-dashboard">

      {/* ── sticky sub-header ── */}
      <div className="admin-header">
        <div className="admin-header-inner">
          <h1 className="admin-title">Admin Dashboard</h1>
          <div className="admin-nav">
            <button className={`tab-btn ${activeTab === 'bookings' ? 'active' : ''}`} onClick={() => setActiveTab('bookings')}>
              Bookings {bookings.length > 0 && <span className="tab-badge">{bookings.length}</span>}
            </button>
            <button className={`tab-btn ${activeTab === 'services' ? 'active' : ''}`} onClick={() => setActiveTab('services')}>
              Manage Services
            </button>
            <button className={`tab-btn ${activeTab === 'section-services' ? 'active' : ''}`} onClick={() => setActiveTab('section-services')}>
              Services Section
              {sectionCards.length > 0 && <span className="tab-badge">{sectionCards.length}</span>}
            </button>
            <button className="logout-btn" onClick={() => { localStorage.removeItem('isAdminAuthenticated'); navigate('/admin-login'); }}>
              Logout
            </button>
          </div>
        </div>
      </div>

      <div className="admin-body">

        {/* ══════════ BOOKINGS ══════════ */}
        {activeTab === 'bookings' && (
          <div className="section-card">
            <div className="bookings-header-row">
              <h2 className="section-heading">Placed Bookings</h2>
              <span className="bookings-count">{bookings.length} total</span>
            </div>

            {bookings.length === 0 ? (
              <div className="empty-state"><div className="empty-icon">📋</div><p>No bookings yet</p></div>
            ) : (
              <div className="bookings-list">
                <div className="bk-row bk-row--header">
                  <span /><span>Client</span>
                  <span className="hide-xs">Service</span>
                  <span className="hide-sm">Date &amp; Time</span>
                  <span>Status</span><span />
                </div>

                {bookings.map((b) => {
                  const isOpen = expanded === b.id;
                  const color  = avatarColor(b.name);
                  return (
                    <React.Fragment key={b.id}>
                      <div className={`bk-row bk-row--data ${isOpen ? 'bk-row--open' : ''}`} onClick={() => toggleExpand(b.id)}>
                        <div className="bk-avatar" style={{ background: color }}>{initials(b.name)}</div>
                        <div className="bk-client">
                          <span className="bk-name">{b.name}</span>
                          <span className="bk-sub">{b.phone}</span>
                        </div>
                        <div className="bk-service hide-xs"><span className="service-chip">{b.service}</span></div>
                        <div className="bk-datetime hide-sm">
                          <span className="bk-date">{b.date}</span>
                          <span className="bk-time">{b.time}</span>
                        </div>
                        <span className={`status-badge status-${(b.status || 'pending').toLowerCase()}`}>{b.status}</span>
                        <span className={`bk-chevron ${isOpen ? 'bk-chevron--open' : ''}`}>›</span>
                      </div>

                      {isOpen && (
                        <div className="bk-drawer">
                          <div className="bk-drawer-grid">
                            <div className="drawer-field"><span className="drawer-label">Email</span><span className="drawer-value">{b.email}</span></div>
                            <div className="drawer-field show-xs"><span className="drawer-label">Service</span><span className="drawer-value">{b.service}</span></div>
                            <div className="drawer-field show-sm"><span className="drawer-label">Appointment</span><span className="drawer-value">{b.date} at {b.time}</span></div>
                            <div className="drawer-field"><span className="drawer-label">Booked on</span><span className="drawer-value">{b.createdAt}</span></div>
                            {b.message && (
                              <div className="drawer-field drawer-field--full">
                                <span className="drawer-label">Message</span>
                                <span className="drawer-value drawer-message">{b.message}</span>
                              </div>
                            )}
                          </div>
                          <div className="bk-drawer-actions">
                            <button className="bk-delete-btn" onClick={(e) => { e.stopPropagation(); deleteBooking(b.id); }}>Delete Booking</button>
                          </div>
                        </div>
                      )}
                    </React.Fragment>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* ══════════ MANAGE SERVICES (dropdown) ══════════ */}
        {activeTab === 'services' && (
          <div className="services-section">
            <h2 className="section-heading">Manage Booking Services</h2>
            <p className="section-hint">Services you add here appear in the <strong>Select Service</strong> dropdown on the Booking page.</p>

            {svcError   && <p className="svc-msg error">{svcError}</p>}
            {svcSuccess && <p className="svc-msg success">{svcSuccess}</p>}

            <div className="section-card add-card">
              <h3 className="card-heading">Add New Service</h3>
              <div className="add-row">
                <div className="input-wrap">
                  <input className="svc-input" type="text" placeholder="Service name (e.g. Lash Lift)"
                    value={newName} onChange={e => setNewName(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && handleAdd()} />
                </div>
                <div className="input-wrap price-wrap">
                  <span className="cedis-prefix">₵</span>
                  <input className="svc-input price-field" type="number" min="0" placeholder="0"
                    value={newPrice} onChange={e => setNewPrice(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && handleAdd()} />
                </div>
                <button className="add-btn" onClick={handleAdd}>+ Add Service</button>
              </div>
            </div>

            <div className="section-card">
              <h3 className="card-heading">Current Services <span className="svc-count">({services.length})</span></h3>
              {services.length === 0 ? (
                <p className="empty-state">No services yet. Add your first one above.</p>
              ) : (
                <div className="svc-list">
                  <div className="svc-row svc-row--header">
                    <span className="col-num">#</span>
                    <span className="col-name">Service</span>
                    <span className="col-price">Price</span>
                    <span className="col-actions">Actions</span>
                  </div>
                  {services.map((svc, i) => (
                    <div className="svc-row" key={svc.id}>
                      <span className="col-num">{i + 1}</span>
                      {editingId === svc.id ? (
                        <>
                          <div className="col-name">
                            <input className="svc-input inline-input" value={editName}
                              onChange={e => setEditName(e.target.value)}
                              onKeyDown={e => e.key === 'Enter' && saveEdit(svc.id)} autoFocus />
                          </div>
                          <div className="col-price">
                            <div className="input-wrap price-wrap inline-price-wrap">
                              <span className="cedis-prefix">₵</span>
                              <input className="svc-input price-field inline-input" type="number" min="0" placeholder="0"
                                value={editPrice} onChange={e => setEditPrice(e.target.value)}
                                onKeyDown={e => e.key === 'Enter' && saveEdit(svc.id)} />
                            </div>
                          </div>
                          <div className="col-actions">
                            <button className="action-save"   onClick={() => saveEdit(svc.id)}>Save</button>
                            <button className="action-cancel" onClick={cancelEdit}>Cancel</button>
                          </div>
                        </>
                      ) : (
                        <>
                          <span className="col-name svc-name-text">{svc.name}</span>
                          <span className="col-price svc-price-text">{svc.price ? `₵${svc.price}` : '—'}</span>
                          <div className="col-actions">
                            <button className="action-edit"   onClick={() => startEdit(svc)}>Edit</button>
                            <button className="action-delete" onClick={() => handleDelete(svc.id)}>Delete</button>
                          </div>
                        </>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* ══════════ SERVICES SECTION CARDS (server-backed) ══════════ */}
        {activeTab === 'section-services' && (
          <div className="services-section">
            <h2 className="section-heading">Services Section Cards</h2>
            <p className="section-hint">
              Cards added here are <strong>saved to the server</strong> and visible to all visitors on every device.
            </p>

            {secError   && <p className="svc-msg error">{secError}</p>}
            {secSuccess && <p className="svc-msg success">{secSuccess}</p>}

            {/* ── Add form ── */}
            <div className="section-card add-card">
              <h3 className="card-heading">Add New Service Card</h3>
              <div className="sec-add-form">

                <div className="sec-field">
                  <label className="sec-label">Service Title</label>
                  <input className="svc-input" type="text" placeholder="e.g. Eyebrow Threading"
                    value={secTitle} onChange={e => setSecTitle(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && handleSecAdd()} />
                </div>

                <div className="sec-field">
                  <label className="sec-label">Service Image</label>
                  <div className="sec-upload-area" onClick={() => fileInputRef.current && fileInputRef.current.click()}>
                    {secImage ? (
                      <div className="sec-preview-wrap">
                        <img src={secImage} alt="preview" className="sec-preview-img" />
                        <span className="sec-preview-name">{secImageName}</span>
                      </div>
                    ) : (
                      <div className="sec-upload-placeholder">
                        <span className="sec-upload-icon">🖼️</span>
                        <span className="sec-upload-text">Click to upload image</span>
                        <span className="sec-upload-hint">JPG, PNG, WEBP · max 5 MB</span>
                      </div>
                    )}
                  </div>
                  <input ref={fileInputRef} type="file" accept="image/*"
                    style={{ display: 'none' }} onChange={handleImageChange} />
                  {secImage && (
                    <button className="sec-clear-btn" onClick={clearSecForm}>
                      ✕ Remove image
                    </button>
                  )}
                </div>

                <button className="add-btn sec-submit-btn" onClick={handleSecAdd} disabled={secSaving}>
                  {secSaving ? 'Saving…' : '+ Add Service Card'}
                </button>
              </div>
            </div>

            {/* ── Card list ── */}
            <div className="section-card">
              <h3 className="card-heading">
                Published Cards <span className="svc-count">({sectionCards.length})</span>
              </h3>

              {secLoading ? (
                <div className="empty-state"><div className="empty-icon sec-spin">⏳</div><p>Loading from server…</p></div>
              ) : sectionCards.length === 0 ? (
                <div className="empty-state"><div className="empty-icon">🖼️</div><p>No cards yet. Add your first one above.</p></div>
              ) : (
                <div className="sec-cards-grid">
                  {sectionCards.map((item) => (
                    <div className="sec-card-item" key={item.id}>
                      <div className="sec-card-img-wrap">
                        <img src={`${API}${item.image}`} alt={item.title} className="sec-card-img" />
                      </div>
                      <div className="sec-card-footer">
                        <span className="sec-card-title">{item.title}</span>
                        <button className="action-delete sec-delete-btn" onClick={() => handleSecDelete(item.id)}>
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default AdminDashboard;
