import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/AdminDashboard.css';

/* avatar colour from name initial */
const avatarColor = (name = '') => {
  const colors = ['#C8A97E','#7E9CC8','#9CC87E','#C87E9C','#7EC8C0','#C8BC7E','#A07EC8'];
  const idx = (name.charCodeAt(0) || 0) % colors.length;
  return colors[idx];
};

const initials = (name = '') =>
  name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2);

const AdminDashboard = () => {
  const [activeTab, setActiveTab]   = useState('bookings');
  const [bookings,  setBookings]    = useState([]);
  const [expanded,  setExpanded]    = useState(null);   // id of expanded booking
  const [services,  setServices]    = useState([]);

  const [newName,  setNewName]  = useState('');
  const [newPrice, setNewPrice] = useState('');
  const [svcError,   setSvcError]   = useState('');
  const [svcSuccess, setSvcSuccess] = useState('');

  const [editingId,  setEditingId]  = useState(null);
  const [editName,   setEditName]   = useState('');
  const [editPrice,  setEditPrice]  = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem('isAdminAuthenticated')) navigate('/admin-login');
    const saved = JSON.parse(localStorage.getItem('bookings') || '[]');
    setBookings(saved.sort((a, b) => b.id - a.id));
    const savedSvc = localStorage.getItem('adminServices');
    setServices(savedSvc ? JSON.parse(savedSvc) : []);
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('isAdminAuthenticated');
    navigate('/admin-login');
  };

  const flash = (msg, isError = false) => {
    isError ? setSvcError(msg) : setSvcSuccess(msg);
    setTimeout(() => { setSvcError(''); setSvcSuccess(''); }, 3000);
  };
  const persist = (list) => {
    setServices(list);
    localStorage.setItem('adminServices', JSON.stringify(list));
  };

  const deleteBooking = (id) => {
    const updated = bookings.filter(b => b.id !== id);
    setBookings(updated);
    localStorage.setItem('bookings', JSON.stringify(updated));
    if (expanded === id) setExpanded(null);
  };

  const rawPrice = (val) => String(val).replace(/^₵/, '').trim();

  const handleAdd = () => {
    const name  = newName.trim();
    const price = rawPrice(newPrice);
    if (!name) { flash('Service name is required.', true); return; }
    if (services.some(s => s.name.toLowerCase() === name.toLowerCase())) {
      flash('A service with that name already exists.', true); return;
    }
    persist([...services, { id: Date.now(), name, price }]);
    setNewName(''); setNewPrice('');
    flash('Service added!');
  };

  const handleDelete = (id) => {
    persist(services.filter(s => s.id !== id));
    flash('Service removed.');
  };

  const startEdit = (svc) => { setEditingId(svc.id); setEditName(svc.name); setEditPrice(svc.price); };
  const saveEdit  = (id) => {
    const name  = editName.trim();
    const price = rawPrice(editPrice);
    if (!name) { flash('Name cannot be empty.', true); return; }
    if (services.some(s => s.id !== id && s.name.toLowerCase() === name.toLowerCase())) {
      flash('Another service already has that name.', true); return;
    }
    persist(services.map(s => s.id === id ? { ...s, name, price } : s));
    setEditingId(null); flash('Service updated!');
  };
  const cancelEdit = () => setEditingId(null);

  const toggleExpand = (id) => setExpanded(prev => prev === id ? null : id);

  return (
    <div className="admin-dashboard">

      {/* ── sticky sub-header ── */}
      <div className="admin-header">
        <div className="admin-header-inner">
          <h1 className="admin-title">Admin Dashboard</h1>
          <div className="admin-nav">
            <button className={`tab-btn ${activeTab === 'bookings'  ? 'active' : ''}`} onClick={() => setActiveTab('bookings')}>
              Bookings {bookings.length > 0 && <span className="tab-badge">{bookings.length}</span>}
            </button>
            <button className={`tab-btn ${activeTab === 'services'  ? 'active' : ''}`} onClick={() => setActiveTab('services')}>
              Manage Services
            </button>
            <button className="logout-btn" onClick={handleLogout}>Logout</button>
          </div>
        </div>
      </div>

      <div className="admin-body">

        {/* ══════════ BOOKINGS TAB ══════════ */}
        {activeTab === 'bookings' && (
          <div className="section-card">
            <div className="bookings-header-row">
              <h2 className="section-heading">Placed Bookings</h2>
              <span className="bookings-count">{bookings.length} total</span>
            </div>

            {bookings.length === 0 ? (
              <div className="empty-state">
                <div className="empty-icon">📋</div>
                <p>No bookings yet</p>
              </div>
            ) : (
              <div className="bookings-list">
                {/* column headers */}
                <div className="bk-row bk-row--header">
                  <span />
                  <span>Client</span>
                  <span className="hide-xs">Service</span>
                  <span className="hide-sm">Date &amp; Time</span>
                  <span>Status</span>
                  <span />
                </div>

                {bookings.map((b) => {
                  const isOpen = expanded === b.id;
                  const color  = avatarColor(b.name);
                  return (
                    <React.Fragment key={b.id}>
                      <div
                        className={`bk-row bk-row--data ${isOpen ? 'bk-row--open' : ''}`}
                        onClick={() => toggleExpand(b.id)}
                      >
                        {/* avatar */}
                        <div className="bk-avatar" style={{ background: color }}>
                          {initials(b.name)}
                        </div>

                        {/* client */}
                        <div className="bk-client">
                          <span className="bk-name">{b.name}</span>
                          <span className="bk-sub">{b.phone}</span>
                        </div>

                        {/* service chip */}
                        <div className="bk-service hide-xs">
                          <span className="service-chip">{b.service}</span>
                        </div>

                        {/* date/time */}
                        <div className="bk-datetime hide-sm">
                          <span className="bk-date">{b.date}</span>
                          <span className="bk-time">{b.time}</span>
                        </div>

                        {/* status */}
                        <span className={`status-badge status-${(b.status || 'pending').toLowerCase()}`}>
                          {b.status}
                        </span>

                        {/* chevron */}
                        <span className={`bk-chevron ${isOpen ? 'bk-chevron--open' : ''}`}>›</span>
                      </div>

                      {/* expanded drawer */}
                      {isOpen && (
                        <div className="bk-drawer">
                          <div className="bk-drawer-grid">
                            <div className="drawer-field">
                              <span className="drawer-label">Email</span>
                              <span className="drawer-value">{b.email}</span>
                            </div>
                            <div className="drawer-field show-xs">
                              <span className="drawer-label">Service</span>
                              <span className="drawer-value">{b.service}</span>
                            </div>
                            <div className="drawer-field show-sm">
                              <span className="drawer-label">Appointment</span>
                              <span className="drawer-value">{b.date} at {b.time}</span>
                            </div>
                            <div className="drawer-field">
                              <span className="drawer-label">Booked on</span>
                              <span className="drawer-value">{b.createdAt}</span>
                            </div>
                            {b.message && (
                              <div className="drawer-field drawer-field--full">
                                <span className="drawer-label">Message</span>
                                <span className="drawer-value drawer-message">{b.message}</span>
                              </div>
                            )}
                          </div>
                          <div className="bk-drawer-actions">
                            <button className="bk-delete-btn" onClick={(e) => { e.stopPropagation(); deleteBooking(b.id); }}>
                              Delete Booking
                            </button>
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

        {/* ══════════ SERVICES TAB ══════════ */}
        {activeTab === 'services' && (
          <div className="services-section">
            <h2 className="section-heading">Manage Booking Services</h2>
            <p className="section-hint">
              Services you add here appear in the <strong>Select Service</strong> dropdown on the Booking page.
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
                <button className="add-btn" onClick={handleAdd}>+ Add Service</button>
              </div>
            </div>

            <div className="section-card">
              <h3 className="card-heading">
                Current Services <span className="svc-count">({services.length})</span>
              </h3>

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
      </div>
    </div>
  );
};

export default AdminDashboard;
