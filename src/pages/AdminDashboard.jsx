import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/AdminDashboard.css';

// ── same URL already in your Booking.jsx ──────────────────────────────────
const GAS_URL = 'https://script.google.com/macros/s/AKfycby2i5W-txKpETQEuu40VRfvNtJ8Z9F_1ZgRaDbWkNI1vyFeay1pxsVHyglrsKyysqrl/exec';

// ── helpers ────────────────────────────────────────────────────────────────
const avatarColor = (name = '') => {
  const colors = ['#C8A97E','#7E9CC8','#9CC87E','#C87E9C','#7EC8C0','#C8BC7E','#A07EC8'];
  return colors[(name.charCodeAt(0) || 0) % colors.length];
};
const initials = (name = '') =>
  name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2);

/** POST helper — uses text/plain to avoid CORS preflight (same as Booking.jsx) */
const gasPost = (payload) =>
  fetch(GAS_URL, {
    method : 'POST',
    mode   : 'no-cors',
    headers: { 'Content-Type': 'text/plain;charset=utf-8' },
    body   : JSON.stringify(payload),
  });

/** GET helper — reads from Apps Script */
const gasGet = (type) =>
  fetch(`${GAS_URL}?type=${type}`).then(r => r.json());

// ══════════════════════════════════════════════════════════════════════════
const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('bookings');

  // bookings (localStorage — per-device submissions, that's intentional)
  const [bookings, setBookings] = useState([]);
  const [expanded, setExpanded] = useState(null);

  // manage services (booking dropdown) — Google Sheet backed
  const [services,   setServices]   = useState([]);
  const [svcLoading, setSvcLoading] = useState(true);
  const [svcSaving,  setSvcSaving]  = useState(false);
  const [newName,    setNewName]    = useState('');
  const [newPrice,   setNewPrice]   = useState('');
  const [svcError,   setSvcError]   = useState('');
  const [svcSuccess, setSvcSuccess] = useState('');
  const [editingId,  setEditingId]  = useState(null);
  const [editName,   setEditName]   = useState('');
  const [editPrice,  setEditPrice]  = useState('');

  // section service cards — Google Sheet backed
  const [sectionCards, setSectionCards] = useState([]);
  const [secLoading,   setSecLoading]   = useState(true);
  const [secSaving,    setSecSaving]    = useState(false);
  const [secTitle,     setSecTitle]     = useState('');
  const [secImage,     setSecImage]     = useState(null);
  const [secImageName, setSecImageName] = useState('');
  const [secError,     setSecError]     = useState('');
  const [secSuccess,   setSecSuccess]   = useState('');
  const fileInputRef = useRef(null);

  const navigate = useNavigate();

  // ── init ──────────────────────────────────────────────────────────────
  useEffect(() => {
    if (!localStorage.getItem('isAdminAuthenticated')) navigate('/admin-login');
    const saved = JSON.parse(localStorage.getItem('bookings') || '[]');
    setBookings(saved.sort((a, b) => b.id - a.id));
    fetchServices();
    fetchSectionCards();
  }, [navigate]);

  const fetchServices = () => {
    setSvcLoading(true);
    gasGet('adminServices')
      .then(data => setServices(Array.isArray(data) ? data : []))
      .catch(() => setSvcError('Could not load services. Check your Apps Script URL.'))
      .finally(() => setSvcLoading(false));
  };

  const fetchSectionCards = () => {
    setSecLoading(true);
    gasGet('sectionServices')
      .then(data => setSectionCards(Array.isArray(data) ? data : []))
      .catch(() => setSecError('Could not load section cards. Check your Apps Script URL.'))
      .finally(() => setSecLoading(false));
  };

  // ── flash helpers ──────────────────────────────────────────────────────
  const flash = (msg, isError = false) => {
    isError ? setSvcError(msg) : setSvcSuccess(msg);
    setTimeout(() => { setSvcError(''); setSvcSuccess(''); }, 3500);
  };
  const flashSec = (msg, isError = false) => {
    isError ? setSecError(msg) : setSecSuccess(msg);
    setTimeout(() => { setSecError(''); setSecSuccess(''); }, 3500);
  };

  // ── bookings ───────────────────────────────────────────────────────────
  const deleteBooking = (id) => {
    const updated = bookings.filter(b => b.id !== id);
    setBookings(updated);
    localStorage.setItem('bookings', JSON.stringify(updated));
    if (expanded === id) setExpanded(null);
  };
  const toggleExpand = (id) => setExpanded(prev => prev === id ? null : id);

  // ── manage services (dropdown) ─────────────────────────────────────────
  const rawPrice = (val) => String(val).replace(/^₵/, '').trim();

  const handleAdd = async () => {
    const name = newName.trim(), price = rawPrice(newPrice);
    if (!name) { flash('Service name is required.', true); return; }
    if (services.some(s => String(s.name).toLowerCase() === name.toLowerCase())) {
      flash('A service with that name already exists.', true); return;
    }
    setSvcSaving(true);
    try {
      await gasPost({ action: 'addService', name, price });
      setNewName(''); setNewPrice('');
      flash('Service added! Refreshing…');
      setTimeout(fetchServices, 1500);
    } catch {
      flash('Save failed. Check your connection.', true);
    } finally { setSvcSaving(false); }
  };

  const handleDelete = async (id) => {
    setSvcSaving(true);
    try {
      await gasPost({ action: 'deleteService', id });
      flash('Service removed! Refreshing…');
      setTimeout(fetchServices, 1500);
    } catch {
      flash('Delete failed.', true);
    } finally { setSvcSaving(false); }
  };

  const startEdit  = (svc) => { setEditingId(svc.id); setEditName(svc.name); setEditPrice(svc.price); };
  const cancelEdit = () => setEditingId(null);
  const saveEdit   = async (id) => {
    const name = editName.trim(), price = rawPrice(editPrice);
    if (!name) { flash('Name cannot be empty.', true); return; }
    if (services.some(s => String(s.id) !== String(id) && String(s.name).toLowerCase() === name.toLowerCase())) {
      flash('Another service already has that name.', true); return;
    }
    setSvcSaving(true);
    try {
      await gasPost({ action: 'editService', id, name, price });
      setEditingId(null);
      flash('Service updated! Refreshing…');
      setTimeout(fetchServices, 1500);
    } catch {
      flash('Update failed.', true);
    } finally { setSvcSaving(false); }
  };

  // ── section service cards ──────────────────────────────────────────────
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
      await gasPost({ action: 'addSection', title, image: secImage });
      clearSecForm();
      flashSec('Card saved! Refreshing…');
      setTimeout(fetchSectionCards, 1500);
    } catch {
      flashSec('Save failed. Check your connection.', true);
    } finally { setSecSaving(false); }
  };

  const handleSecDelete = async (id) => {
    try {
      await gasPost({ action: 'deleteSection', id });
      flashSec('Card removed! Refreshing…');
      setTimeout(fetchSectionCards, 1500);
    } catch {
      flashSec('Delete failed.', true);
    }
  };

  // ══════════════════════════════════════════════════════════════════════
  //  RENDER
  // ══════════════════════════════════════════════════════════════════════
  return (
    <div className="admin-dashboard">
      <div className="admin-header">
        <div className="admin-header-inner">
          <h1 className="admin-title">Admin Dashboard</h1>
          <div className="admin-nav">
            <button className={`tab-btn ${activeTab === 'bookings' ? 'active' : ''}`} onClick={() => setActiveTab('bookings')}>
              Bookings {bookings.length > 0 && <span className="tab-badge">{bookings.length}</span>}
            </button>
            <button className={`tab-btn ${activeTab === 'services' ? 'active' : ''}`} onClick={() => setActiveTab('services')}>
              Manage Services {services.length > 0 && <span className="tab-badge">{services.length}</span>}
            </button>
            <button className={`tab-btn ${activeTab === 'section-services' ? 'active' : ''}`} onClick={() => setActiveTab('section-services')}>
              Services Section {sectionCards.length > 0 && <span className="tab-badge">{sectionCards.length}</span>}
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

        {/* ══════════ MANAGE SERVICES ══════════ */}
        {activeTab === 'services' && (
          <div className="services-section">
            <h2 className="section-heading">Manage Booking Services</h2>
            <p className="section-hint">
              Services added here appear in the <strong>Select Service</strong> dropdown on the Booking page —
              saved to Google Sheets and visible to all users on every device.
            </p>

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
                <button className="add-btn" onClick={handleAdd} disabled={svcSaving}>
                  {svcSaving ? 'Saving…' : '+ Add'}
                </button>
              </div>
            </div>

            <div className="section-card">
              <h3 className="card-heading">Current Services <span className="svc-count">({services.length})</span></h3>
              {svcLoading ? (
                <div className="empty-state"><div className="empty-icon sec-spin">⏳</div><p>Loading…</p></div>
              ) : services.length === 0 ? (
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
                      {String(editingId) === String(svc.id) ? (
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
                            <button className="action-save" onClick={() => saveEdit(svc.id)} disabled={svcSaving}>Save</button>
                            <button className="action-cancel" onClick={cancelEdit}>Cancel</button>
                          </div>
                        </>
                      ) : (
                        <>
                          <span className="col-name svc-name-text">{svc.name}</span>
                          <span className="col-price svc-price-text">{svc.price ? `₵${svc.price}` : '—'}</span>
                          <div className="col-actions">
                            <button className="action-edit"   onClick={() => startEdit(svc)} disabled={svcSaving}>Edit</button>
                            <button className="action-delete" onClick={() => handleDelete(svc.id)} disabled={svcSaving}>Delete</button>
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

        {/* ══════════ SECTION SERVICES CARDS ══════════ */}
        {activeTab === 'section-services' && (
          <div className="services-section">
            <h2 className="section-heading">Services Section Cards</h2>
            <p className="section-hint">
              Cards added here appear in the <strong>Services Section</strong> on the homepage —
              saved to Google Sheets and visible on every device.
            </p>

            {secError   && <p className="svc-msg error">{secError}</p>}
            {secSuccess && <p className="svc-msg success">{secSuccess}</p>}

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
                    <button className="sec-clear-btn" onClick={clearSecForm}>✕ Remove image</button>
                  )}
                </div>
                <button className="add-btn sec-submit-btn" onClick={handleSecAdd} disabled={secSaving}>
                  {secSaving ? 'Saving to Google Sheets…' : '+ Add Service Card'}
                </button>
              </div>
            </div>

            <div className="section-card">
              <h3 className="card-heading">Published Cards <span className="svc-count">({sectionCards.length})</span></h3>
              {secLoading ? (
                <div className="empty-state"><div className="empty-icon sec-spin">⏳</div><p>Loading from Google Sheets…</p></div>
              ) : sectionCards.length === 0 ? (
                <div className="empty-state"><div className="empty-icon">🖼️</div><p>No cards yet. Add your first one above.</p></div>
              ) : (
                <div className="sec-cards-grid">
                  {sectionCards.map((item) => (
                    <div className="sec-card-item" key={item.id}>
                      <div className="sec-card-img-wrap">
                        <img src={item.image} alt={item.title} className="sec-card-img" />
                      </div>
                      <div className="sec-card-footer">
                        <span className="sec-card-title">{item.title}</span>
                        <button className="action-delete sec-delete-btn" onClick={() => handleSecDelete(item.id)}>Delete</button>
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
