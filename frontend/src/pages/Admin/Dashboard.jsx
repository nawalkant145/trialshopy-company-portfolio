import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import { Bar, Doughnut } from 'react-chartjs-2';
import SEO from '../../components/SEO';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';
import API from '../../utils/api';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

export default function Dashboard() {
  const { isDark } = useTheme();
  const { logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const [stats, setStats] = useState(null);
  const [applications, setApplications] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('applications'); // 'applications' or 'contacts'

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/admin');
      return;
    }

    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        setError(null);

        // FetchStats, Applications, Contacts in parallel
        const [statsRes, appsRes, contactsRes] = await Promise.all([
          API.get('/stats/dashboard'),
          API.get('/careers/applications'),
          API.get('/contacts')
        ]);

        setStats(statsRes.data?.data || null);
        setApplications(appsRes.data?.data || []);
        setContacts(contactsRes.data?.data || []);
      } catch (err) {
        console.error('Error fetching dashboard data:', err);
        setError(err.response?.data?.message || 'Failed to load dashboard metrics.');
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [isAuthenticated, navigate]);

  const handleLogout = () => {
    logout();
    navigate('/admin');
  };

  const handleResolveContact = async (id, currentStatus) => {
    try {
      const nextStatus = currentStatus === 'Pending' ? 'Resolved' : 'Pending';
      const res = await API.put(`/contacts/${id}`, { status: nextStatus });
      if (res.data?.success) {
        setContacts(contacts.map(c => c._id === id ? { ...c, status: nextStatus } : c));
        // Also update contact count in stats
        if (stats) {
          setStats({
            ...stats,
            contactsCount: contacts.filter(c => c._id !== id || nextStatus === 'Pending').length
          });
        }
      }
    } catch (err) {
      alert('Failed to update inquiry status: ' + (err.response?.data?.message || err.message));
    }
  };

  const getResumeUrl = (filePath) => {
    if (!filePath) return '#';
    // filePath contains "backend/uploads/filename" or similar. Extract the filename.
    const parts = filePath.split('/');
    const filename = parts[parts.length - 1];
    
    // Determine backend host from defaults or local env
    const apiBase = API.defaults.baseURL || '/api';
    const serverHost = apiBase.endsWith('/api') ? apiBase.slice(0, -4) : apiBase;
    return `${serverHost}/uploads/${filename}`;
  };

  // Setup Chart configs
  const barData = {
    labels: ['Visitors', 'Applications', 'Inquiries', 'Products'],
    datasets: [
      {
        label: 'Count',
        data: stats ? [stats.visitorsCount, stats.applicationsCount, stats.contactsCount, stats.productsCount] : [0, 0, 0, 0],
        backgroundColor: [
          'rgba(249, 115, 22, 0.65)',  // orange
          'rgba(139, 92, 246, 0.65)',  // purple
          'rgba(59, 130, 246, 0.65)',  // blue
          'rgba(16, 185, 129, 0.65)'   // emerald
        ],
        borderColor: [
          '#f97316',
          '#8b5cf6',
          '#3b82f6',
          '#10b981'
        ],
        borderWidth: 1.5,
        borderRadius: 8
      }
    ]
  };

  const doughnutData = {
    labels: ['Applications', 'Inquiries', 'Products'],
    datasets: [
      {
        data: stats ? [stats.applicationsCount, stats.contactsCount, stats.productsCount] : [0, 0, 0],
        backgroundColor: [
          'rgba(139, 92, 246, 0.7)',  // purple
          'rgba(59, 130, 246, 0.7)',  // blue
          'rgba(16, 185, 129, 0.7)'   // emerald
        ],
        hoverOffset: 4
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          color: isDark ? '#94a3b8' : '#64748b'
        },
        grid: {
          color: isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)'
        }
      },
      x: {
        ticks: {
          color: isDark ? '#94a3b8' : '#64748b'
        },
        grid: {
          display: false
        }
      }
    }
  };

  if (!isAuthenticated) return null;

  return (
    <>
      <SEO title="Admin Dashboard — TrialShopy" description="View TrialShopy analytics, contact forms, and applications." />
      
      <div className={`min-h-screen ${isDark ? 'bg-[#0a0a0f] text-white' : 'bg-slate-50 text-slate-900'}`}>
        {/* Navigation header */}
        <header className={`border-b px-6 py-4 flex items-center justify-between ${isDark ? 'bg-[#0f0f1a] border-white/5' : 'bg-white border-slate-200'}`}>
          <div className="flex items-center gap-3">
            <span className="text-xl font-display font-black gradient-text">TrialShopy</span>
            <span className="text-xs bg-orange-500/10 text-orange-500 font-bold px-2 py-0.5 rounded">Admin Dashboard</span>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/admin/manage')}
              className="px-4 py-2 bg-gradient-to-r from-orange-500 to-purple-600 text-white rounded-lg text-sm font-semibold hover:opacity-90 transition-opacity cursor-pointer"
            >
              ⚙️ Manage Content
            </button>
            <button
              onClick={handleLogout}
              className="px-4 py-2 border border-slate-300 dark:border-white/10 rounded-lg text-sm font-semibold hover:bg-red-500 hover:text-white transition-colors cursor-pointer"
            >
              Logout
            </button>
          </div>
        </header>

        {/* Dashboard Main View */}
        <main className="container py-12">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-display font-black">Dashboard Analytics</h1>
              <p className="text-muted text-sm">Real-time statistics of visitor traffic, recruitment, and catalog items.</p>
            </div>
            <button
              onClick={() => window.location.reload()}
              className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 border ${
                isDark ? 'bg-[#16213e] border-white/5 hover:bg-white/10' : 'bg-white border-slate-200 hover:bg-slate-50'
              }`}
            >
              🔄 Refresh Data
            </button>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-rose-500/10 border border-rose-500/30 text-rose-500 rounded-2xl text-sm font-semibold">
              ⚠️ {error}
            </div>
          )}

          {/* Metric cards */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12 animate-fade-in-up">
            {[
              { label: 'Total Visitors', val: stats?.visitorsCount ?? 0, icon: '📊', color: 'from-orange-500/10 to-orange-500/5', txt: 'text-orange-500' },
              { label: 'Job Applications', val: stats?.applicationsCount ?? 0, icon: '📁', color: 'from-purple-600/10 to-purple-600/5', txt: 'text-purple-500' },
              { label: 'Contact Requests', val: stats?.contactsCount ?? 0, icon: '✉️', color: 'from-blue-500/10 to-blue-500/5', txt: 'text-blue-500' },
              { label: 'Products In Catalog', val: stats?.productsCount ?? 0, icon: '🛍️', color: 'from-emerald-500/10 to-emerald-500/5', txt: 'text-emerald-500' }
            ].map((card, idx) => (
              <div
                key={idx}
                className={`card p-6 border flex items-center gap-5 ${
                  isDark ? 'bg-[#16213e] border-white/5 shadow-lg' : 'bg-white border-slate-100 shadow-sm'
                }`}
              >
                <div className={`text-3xl p-3.5 rounded-2xl bg-gradient-to-br ${card.color} ${card.txt}`}>
                  {card.icon}
                </div>
                <div>
                  <div className="text-xs font-bold text-muted uppercase tracking-wider mb-0.5">{card.label}</div>
                  <div className="text-2xl font-black font-display gradient-text">{loading ? '...' : card.val}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Charts Area */}
          {!loading && stats && (
            <div className="grid lg:grid-cols-3 gap-8 mb-12 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
              {/* Bar Chart */}
              <div className={`lg:col-span-2 card p-6 border ${isDark ? 'bg-[#16213e] border-white/5' : 'bg-white border-slate-100'}`}>
                <h3 className="font-display font-bold text-lg mb-6">Visitor & Platform Activity</h3>
                <div className="h-72">
                  <Bar data={barData} options={chartOptions} />
                </div>
              </div>

              {/* Doughnut Chart */}
              <div className={`card p-6 border flex flex-col justify-between ${isDark ? 'bg-[#16213e] border-white/5' : 'bg-white border-slate-100'}`}>
                <h3 className="font-display font-bold text-lg mb-6">Database Share Distribution</h3>
                <div className="h-56 relative flex items-center justify-center">
                  <Doughnut
                    data={doughnutData}
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      plugins: { legend: { position: 'bottom', labels: { color: isDark ? '#fff' : '#000' } } }
                    }}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Data list section */}
          <div className={`card border overflow-hidden ${isDark ? 'bg-[#16213e] border-white/5' : 'bg-white border-slate-100'} animate-fade-in-up`} style={{ animationDelay: '0.2s' }}>
            {/* Tabs */}
            <div className={`flex border-b ${isDark ? 'border-white/5 bg-[#0f0f1a]' : 'border-slate-100 bg-slate-50'}`}>
              <button
                onClick={() => setActiveTab('applications')}
                className={`px-6 py-4 font-semibold text-sm transition-colors border-b-2 cursor-pointer ${
                  activeTab === 'applications'
                    ? 'border-orange-500 text-orange-500'
                    : 'border-transparent text-muted hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                📁 Applications ({applications.length})
              </button>
              <button
                onClick={() => setActiveTab('contacts')}
                className={`px-6 py-4 font-semibold text-sm transition-colors border-b-2 cursor-pointer ${
                  activeTab === 'contacts'
                    ? 'border-orange-500 text-orange-500'
                    : 'border-transparent text-muted hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                ✉️ Inquiries ({contacts.length})
              </button>
            </div>

            {/* Tab content */}
            <div className="p-6">
              {loading ? (
                <div className="text-center py-12">
                  <div className="w-8 h-8 border-2 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                  <p className="text-sm text-muted">Loading list entries...</p>
                </div>
              ) : activeTab === 'applications' ? (
                /* Applications List */
                applications.length === 0 ? (
                  <div className="text-center py-12 text-muted text-sm">
                    No career applications have been submitted yet.
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                      <thead>
                        <tr className={`border-b text-xs font-bold uppercase tracking-wider text-muted ${isDark ? 'border-white/5' : 'border-slate-100'}`}>
                          <th className="pb-3">Candidate Name</th>
                          <th className="pb-3">Email Address</th>
                          <th className="pb-3">Position / Role</th>
                          <th className="pb-3">Submitted</th>
                          <th className="pb-3 text-right">Action</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-subtle">
                        {applications.map((app) => (
                          <tr key={app._id} className="hover:bg-slate-500/5 transition-colors">
                            <td className="py-4 font-semibold">{app.name}</td>
                            <td className="py-4 font-mono text-xs">{app.email}</td>
                            <td className="py-4">
                              {app.careerId ? (
                                <div>
                                  <div className="font-semibold">{app.careerId.title}</div>
                                  <div className="text-[10px] text-muted">{app.careerId.department} | {app.careerId.location}</div>
                                </div>
                              ) : (
                                <span className="text-rose-500 text-xs">Role deleted</span>
                              )}
                            </td>
                            <td className="py-4 text-xs text-muted">
                              {new Date(app.createdAt).toLocaleDateString('en-IN', {
                                day: 'numeric',
                                month: 'short',
                                year: 'numeric'
                              })}
                            </td>
                            <td className="py-4 text-right">
                              <a
                                href={getResumeUrl(app.resumePath)}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-3.5 py-1.5 bg-gradient-to-r from-orange-500 to-purple-600 text-white font-bold rounded-lg text-xs hover:opacity-90 inline-flex items-center gap-1 shadow cursor-pointer"
                              >
                                📄 View Resume
                              </a>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )
              ) : (
                /* Contacts List */
                contacts.length === 0 ? (
                  <div className="text-center py-12 text-muted text-sm">
                    No contact form submissions found.
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                      <thead>
                        <tr className={`border-b text-xs font-bold uppercase tracking-wider text-muted ${isDark ? 'border-white/5' : 'border-slate-100'}`}>
                          <th className="pb-3">User Details</th>
                          <th className="pb-3">Message Submission</th>
                          <th className="pb-3">Status</th>
                          <th className="pb-3">Received</th>
                          <th className="pb-3 text-right">Action</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-subtle">
                        {contacts.map((contact) => (
                          <tr key={contact._id} className="hover:bg-slate-500/5 transition-colors">
                            <td className="py-4">
                              <div className="font-semibold">{contact.name}</div>
                              <div className="text-xs font-mono text-muted">{contact.email}</div>
                            </td>
                            <td className="py-4 max-w-sm">
                              <p className="text-xs leading-relaxed line-clamp-2">{contact.message}</p>
                            </td>
                            <td className="py-4">
                              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${
                                contact.status === 'Resolved'
                                  ? 'bg-emerald-500/15 text-emerald-500'
                                  : 'bg-amber-500/15 text-amber-500'
                              }`}>
                                {contact.status}
                              </span>
                            </td>
                            <td className="py-4 text-xs text-muted">
                              {new Date(contact.createdAt).toLocaleDateString('en-IN', {
                                day: 'numeric',
                                month: 'short',
                                year: 'numeric'
                              })}
                            </td>
                            <td className="py-4 text-right">
                              <button
                                onClick={() => handleResolveContact(contact._id, contact.status)}
                                className={`px-3 py-1.5 rounded-lg text-xs font-bold cursor-pointer transition-colors ${
                                  contact.status === 'Resolved'
                                    ? 'bg-slate-500/10 text-slate-400 hover:bg-slate-500/20'
                                    : 'bg-emerald-500 text-white hover:bg-emerald-600'
                                }`}
                              >
                                {contact.status === 'Resolved' ? 'Reopen' : 'Resolve'}
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )
              )}
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
