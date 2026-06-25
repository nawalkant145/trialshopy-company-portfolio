import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SEO from '../../components/SEO';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';
import API from '../../utils/api';

export default function ManageContent() {
  const { isDark } = useTheme();
  const { logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState('products'); // 'products', 'careers', 'team', 'testimonials'
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Form modal states
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState('add'); // 'add' or 'edit'
  const [editId, setEditId] = useState(null);

  // Form fields states
  // -- Products
  const [prodName, setProdName] = useState('');
  const [prodDesc, setProdDesc] = useState('');
  const [prodCat, setProdCat] = useState('Shirts');
  const [prodPrice, setProdPrice] = useState('');
  const [prodImage, setProdImage] = useState('');
  const [prodARLink, setProdARLink] = useState('');

  // -- Careers
  const [carTitle, setCarTitle] = useState('');
  const [carDept, setCarDept] = useState('');
  const [carLoc, setCarLoc] = useState('');
  const [carDesc, setCarDesc] = useState('');
  const [carReqs, setCarReqs] = useState(''); // Comma separated string

  // -- Team
  const [teamName, setTeamName] = useState('');
  const [teamRole, setTeamRole] = useState('');
  const [teamBio, setTeamBio] = useState('');
  const [teamImage, setTeamImage] = useState('');
  const [teamCat, setTeamCat] = useState('core'); // 'founder', 'core', 'advisor'

  // -- Testimonials
  const [testAuthor, setTestAuthor] = useState('');
  const [testDesig, setTestDesig] = useState('');
  const [testText, setTestText] = useState('');
  const [testRating, setTestRating] = useState(5);

  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/admin');
      return;
    }
    fetchTabItems();
  }, [isAuthenticated, activeTab, navigate]);

  const fetchTabItems = async () => {
    try {
      setLoading(true);
      setError(null);
      let endpoint = '';
      if (activeTab === 'products') endpoint = '/products';
      else if (activeTab === 'careers') endpoint = '/careers';
      else if (activeTab === 'team') endpoint = '/team';
      else if (activeTab === 'testimonials') endpoint = '/testimonials';

      const res = await API.get(endpoint);
      setItems(res.data?.data || []);
    } catch (err) {
      console.error(`Error fetching ${activeTab}:`, err);
      setError(err.response?.data?.message || `Failed to fetch ${activeTab} list.`);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/admin');
  };

  // Reset forms when opening/closing modal
  const openModal = (mode, item = null) => {
    setModalMode(mode);
    setEditId(item ? item._id : null);

    if (activeTab === 'products') {
      setProdName(item ? item.name : '');
      setProdDesc(item ? item.description : '');
      setProdCat(item ? item.category : 'Shirts');
      setProdPrice(item ? item.price : '');
      setProdImage(item ? item.imageUrl : '');
      setProdARLink(item ? item.tryOnLink : '');
    } else if (activeTab === 'careers') {
      setCarTitle(item ? item.title : '');
      setCarDept(item ? item.department : '');
      setCarLoc(item ? item.location : '');
      setCarDesc(item ? item.description : '');
      setCarReqs(item ? item.requirements.join(', ') : '');
    } else if (activeTab === 'team') {
      setTeamName(item ? item.name : '');
      setTeamRole(item ? item.role : '');
      setTeamBio(item ? item.bio : '');
      setTeamImage(item ? item.imageUrl : '');
      setTeamCat(item ? item.category : 'core');
    } else if (activeTab === 'testimonials') {
      setTestAuthor(item ? item.author : '');
      setTestDesig(item ? item.designation : '');
      setTestText(item ? item.text : '');
      setTestRating(item ? item.rating : 5);
    }

    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditId(null);
  };

  const handleDelete = async (id) => {
    if (!window.confirm(`Are you sure you want to delete this ${activeTab.slice(0, -1)}?`)) return;

    try {
      let endpoint = '';
      if (activeTab === 'products') endpoint = `/products/${id}`;
      else if (activeTab === 'careers') endpoint = `/careers/${id}`;
      else if (activeTab === 'team') endpoint = `/team/${id}`;
      else if (activeTab === 'testimonials') endpoint = `/testimonials/${id}`;

      const res = await API.delete(endpoint);
      if (res.data?.success) {
        setItems(items.filter(item => item._id !== id));
      }
    } catch (err) {
      alert(`Delete failed: ` + (err.response?.data?.message || err.message));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setSubmitting(true);

      let payload = {};
      let endpoint = '';

      if (activeTab === 'products') {
        endpoint = modalMode === 'add' ? '/products' : `/products/${editId}`;
        payload = {
          name: prodName,
          description: prodDesc,
          category: prodCat,
          price: Number(prodPrice),
          imageUrl: prodImage,
          tryOnLink: prodARLink
        };
      } else if (activeTab === 'careers') {
        endpoint = modalMode === 'add' ? '/careers' : `/careers/${editId}`;
        payload = {
          title: carTitle,
          department: carDept,
          location: carLoc,
          description: carDesc,
          requirements: carReqs.split(',').map(r => r.trim()).filter(Boolean)
        };
      } else if (activeTab === 'team') {
        endpoint = modalMode === 'add' ? '/team' : `/team/${editId}`;
        payload = {
          name: teamName,
          role: teamRole,
          bio: teamBio,
          imageUrl: teamImage,
          category: teamCat
        };
      } else if (activeTab === 'testimonials') {
        // Testimonials only support POST / DELETE
        endpoint = '/testimonials';
        payload = {
          author: testAuthor,
          designation: testDesig,
          text: testText,
          rating: Number(testRating)
        };
      }

      let res;
      if (modalMode === 'add') {
        res = await API.post(endpoint, payload);
      } else {
        res = await API.put(endpoint, payload);
      }

      if (res.data?.success) {
        closeModal();
        fetchTabItems();
      }
    } catch (err) {
      alert(`Operation failed: ` + (err.response?.data?.message || err.message));
    } finally {
      setSubmitting(false);
    }
  };

  if (!isAuthenticated) return null;

  return (
    <>
      <SEO title="Content Manager — TrialShopy Admin" description="Create, edit, or delete portfolio entries." />

      <div className={`min-h-screen ${isDark ? 'bg-[#0a0a0f] text-white' : 'bg-slate-50 text-slate-900'}`}>
        {/* Navigation header */}
        <header className={`border-b px-6 py-4 flex items-center justify-between ${isDark ? 'bg-[#0f0f1a] border-white/5' : 'bg-white border-slate-200'}`}>
          <div className="flex items-center gap-3">
            <span className="text-xl font-display font-black gradient-text">TrialShopy</span>
            <span className="text-xs bg-orange-500/10 text-orange-500 font-bold px-2 py-0.5 rounded">Content Manager</span>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/admin/dashboard')}
              className="px-4 py-2 bg-gradient-to-r from-orange-500 to-purple-600 text-white rounded-lg text-sm font-semibold hover:opacity-90 transition-opacity cursor-pointer"
            >
              📊 Analytics Dashboard
            </button>
            <button
              onClick={handleLogout}
              className="px-4 py-2 border border-slate-300 dark:border-white/10 rounded-lg text-sm font-semibold hover:bg-red-500 hover:text-white transition-colors cursor-pointer"
            >
              Logout
            </button>
          </div>
        </header>

        {/* Manager Body */}
        <main className="container py-12">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-display font-black">Content Management</h1>
              <p className="text-muted text-sm">Add, modify, or remove documents directly from your database.</p>
            </div>
            <button
              onClick={() => openModal('add')}
              className="btn-primary py-2.5 px-5 text-sm font-semibold rounded-xl flex items-center gap-1.5 cursor-pointer shadow-lg"
            >
              ➕ Add New {activeTab.charAt(0).toUpperCase() + activeTab.slice(1, -1)}
            </button>
          </div>

          {/* Navigation Tabs */}
          <div className="flex flex-wrap gap-2 justify-center lg:justify-start mb-8">
            {[
              { id: 'products', name: '🛍️ Products', desc: 'Shop item grid' },
              { id: 'careers', name: '💼 Career Openings', desc: 'Job postings' },
              { id: 'team', name: '👥 Team Members', desc: 'Founder & staff' },
              { id: 'testimonials', name: '⭐ Testimonials', desc: 'Customer reviews' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-5 py-3 rounded-2xl text-left border transition-all duration-200 cursor-pointer w-48 ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-orange-500 to-purple-600 border-transparent text-white shadow-lg'
                    : isDark
                      ? 'bg-[#16213e] border-white/5 text-slate-300 hover:bg-white/10'
                      : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                }`}
              >
                <div className="font-bold text-sm">{tab.name}</div>
                <div className={`text-[10px] ${activeTab === tab.id ? 'text-white/80' : 'text-muted'}`}>{tab.desc}</div>
              </button>
            ))}
          </div>

          {/* Table display */}
          <div className={`card border overflow-hidden ${isDark ? 'bg-[#16213e] border-white/5' : 'bg-white border-slate-100'}`}>
            <div className="p-6">
              {loading ? (
                <div className="text-center py-16">
                  <div className="w-8 h-8 border-2 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                  <p className="text-sm text-muted">Fetching database items...</p>
                </div>
              ) : error ? (
                <div className="text-center py-16 text-rose-500 font-semibold">{error}</div>
              ) : items.length === 0 ? (
                <div className="text-center py-16 text-muted text-sm">
                  No {activeTab} records found in the database. Click "Add New" to insert one.
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm">
                    <thead>
                      <tr className={`border-b text-xs font-bold uppercase tracking-wider text-muted ${isDark ? 'border-white/5' : 'border-slate-100'}`}>
                        <th className="pb-3">Title / Details</th>
                        <th className="pb-3">Sub-details</th>
                        <th className="pb-3">Unique ID</th>
                        <th className="pb-3 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-subtle">
                      {items.map((item) => (
                        <tr key={item._id} className="hover:bg-slate-500/5 transition-colors">
                          <td className="py-4">
                            <div className="flex items-center gap-3">
                              {/* Thumbnail preview if imageUrl is present */}
                              {item.imageUrl && (
                                <img
                                  src={item.imageUrl}
                                  alt=""
                                  className="w-10 h-10 object-cover rounded-lg bg-slate-100 dark:bg-slate-900 border border-subtle"
                                  onError={e => { e.target.style.display = 'none'; }}
                                />
                              )}
                              <div>
                                <div className="font-semibold">{item.name || item.title || item.author}</div>
                                <div className="text-xs text-muted line-clamp-1 max-w-sm">{item.description || item.bio || item.text}</div>
                              </div>
                            </div>
                          </td>
                          <td className="py-4 text-xs">
                            {activeTab === 'products' && (
                              <div>
                                <div>Cat: {item.category}</div>
                                <div className="font-bold text-orange-500">₹{item.price?.toLocaleString()}</div>
                              </div>
                            )}
                            {activeTab === 'careers' && (
                              <div>
                                <div>Dept: {item.department}</div>
                                <div>Loc: {item.location}</div>
                              </div>
                            )}
                            {activeTab === 'team' && (
                              <div>
                                <div>Role: {item.role}</div>
                                <div className="font-bold capitalize">{item.category}</div>
                              </div>
                            )}
                            {activeTab === 'testimonials' && (
                              <div>
                                <div>{item.designation}</div>
                                <div className="text-amber-500">{'★'.repeat(item.rating)}</div>
                              </div>
                            )}
                          </td>
                          <td className="py-4 font-mono text-[10px] text-muted">{item._id}</td>
                          <td className="py-4 text-right space-x-2">
                            {/* Testimonials edit is not supported on backend schema, only post/delete */}
                            {activeTab !== 'testimonials' && (
                              <button
                                onClick={() => openModal('edit', item)}
                                className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold cursor-pointer border ${
                                  isDark ? 'bg-white/5 border-white/5 hover:bg-white/10' : 'bg-slate-100 border-slate-200 hover:bg-slate-200'
                                }`}
                              >
                                Edit
                              </button>
                            )}
                            <button
                              onClick={() => handleDelete(item._id)}
                              className="px-2.5 py-1.5 bg-rose-500/10 text-rose-500 font-semibold hover:bg-rose-500 hover:text-white rounded-lg text-xs cursor-pointer transition-colors"
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </main>

        {/* Form Overlay Modal */}
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in-up">
            <div
              className={`w-full max-w-lg rounded-3xl p-8 border shadow-2xl overflow-y-auto max-h-[90vh] ${
                isDark ? 'bg-[#0f0f1a] border-white/10' : 'bg-white border-slate-100'
              }`}
            >
              {/* Close Button */}
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black/80 transition-colors cursor-pointer font-bold text-sm"
              >
                ✕
              </button>

              <span className="badge mb-2">{modalMode.toUpperCase()} ENTRY</span>
              <h3 className={`font-display font-black text-xl md:text-2xl mb-6 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                {activeTab.charAt(0).toUpperCase() + activeTab.slice(1, -1)} Details
              </h3>

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* PRODUCTS FORM */}
                {activeTab === 'products' && (
                  <>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider mb-2 text-muted">Product Name</label>
                      <input type="text" required value={prodName} onChange={e => setProdName(e.target.value)} placeholder="Virtual Denim Jacket" className="form-input" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider mb-2 text-muted">Description</label>
                      <textarea required rows="3" value={prodDesc} onChange={e => setProdDesc(e.target.value)} placeholder="AI-fit denim wear description..." className="form-input" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider mb-2 text-muted">Category</label>
                        <select value={prodCat} onChange={e => setProdCat(e.target.value)} className="form-input">
                          <option value="Outerwear">Outerwear</option>
                          <option value="Shirts">Shirts</option>
                          <option value="Pants">Pants</option>
                          <option value="Footwear">Footwear</option>
                          <option value="Athletic">Athletic</option>
                          <option value="Dresses">Dresses</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider mb-2 text-muted">Price (₹)</label>
                        <input type="number" required value={prodPrice} onChange={e => setProdPrice(e.target.value)} placeholder="1999" className="form-input" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider mb-2 text-muted">Image URL</label>
                      <input type="text" required value={prodImage} onChange={e => setProdImage(e.target.value)} placeholder="https://images.unsplash.com/..." className="form-input" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider mb-2 text-muted">AR Try-on Link</label>
                      <input type="text" value={prodARLink} onChange={e => setProdARLink(e.target.value)} placeholder="https://demo-tryon.trialshopy.com" className="form-input" />
                    </div>
                  </>
                )}

                {/* CAREERS FORM */}
                {activeTab === 'careers' && (
                  <>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider mb-2 text-muted">Job Title</label>
                      <input type="text" required value={carTitle} onChange={e => setCarTitle(e.target.value)} placeholder="AI Engineering Intern" className="form-input" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider mb-2 text-muted">Department</label>
                        <input type="text" required value={carDept} onChange={e => setCarDept(e.target.value)} placeholder="Engineering" className="form-input" />
                      </div>
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider mb-2 text-muted">Location</label>
                        <input type="text" required value={carLoc} onChange={e => setCarLoc(e.target.value)} placeholder="Bengaluru (Hybrid)" className="form-input" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider mb-2 text-muted">Job Description</label>
                      <textarea required rows="4" value={carDesc} onChange={e => setCarDesc(e.target.value)} placeholder="Outline the job role and day-to-day responsibilities..." className="form-input" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider mb-2 text-muted">Requirements (comma-separated)</label>
                      <input type="text" required value={carReqs} onChange={e => setCarReqs(e.target.value)} placeholder="Node.js, React, Git, 3D Graphics" className="form-input" />
                    </div>
                  </>
                )}

                {/* TEAM MEMBERS FORM */}
                {activeTab === 'team' && (
                  <>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider mb-2 text-muted">Member Name</label>
                      <input type="text" required value={teamName} onChange={e => setTeamName(e.target.value)} placeholder="Nikhil Choudhary" className="form-input" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider mb-2 text-muted">Role / Title</label>
                        <input type="text" required value={teamRole} onChange={e => setTeamRole(e.target.value)} placeholder="Founder & CEO" className="form-input" />
                      </div>
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider mb-2 text-muted">Category</label>
                        <select value={teamCat} onChange={e => setTeamCat(e.target.value)} className="form-input">
                          <option value="founder">Founder</option>
                          <option value="core">Core Team</option>
                          <option value="advisor">Advisor</option>
                        </select>
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider mb-2 text-muted">Short Bio</label>
                      <textarea required rows="3" value={teamBio} onChange={e => setTeamBio(e.target.value)} placeholder="Write a short summary about this person..." className="form-input" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider mb-2 text-muted">Photo Image URL</label>
                      <input type="text" required value={teamImage} onChange={e => setTeamImage(e.target.value)} placeholder="https://images.unsplash.com/..." className="form-input" />
                    </div>
                  </>
                )}

                {/* TESTIMONIALS FORM */}
                {activeTab === 'testimonials' && (
                  <>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider mb-2 text-muted">Author Name</label>
                      <input type="text" required value={testAuthor} onChange={e => setTestAuthor(e.target.value)} placeholder="Sophia Martinez" className="form-input" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider mb-2 text-muted">Designation</label>
                      <input type="text" required value={testDesig} onChange={e => setTestDesig(e.target.value)} placeholder="Product Manager, Trendify" className="form-input" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider mb-2 text-muted">Rating (1-5)</label>
                      <input type="number" min="1" max="5" required value={testRating} onChange={e => setTestRating(e.target.value)} placeholder="5" className="form-input" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider mb-2 text-muted">Review Quote</label>
                      <textarea required rows="3" value={testText} onChange={e => setTestText(e.target.value)} placeholder="The virtual try-on reduced our retail customer returns by 60%..." className="form-input" />
                    </div>
                  </>
                )}

                <button
                  type="submit"
                  disabled={submitting}
                  className="btn-primary w-full py-3.5 rounded-xl flex items-center justify-center gap-2 cursor-pointer shadow-lg mt-6"
                >
                  {submitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Saving entry...
                    </>
                  ) : (
                    'Save Details'
                  )}
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
