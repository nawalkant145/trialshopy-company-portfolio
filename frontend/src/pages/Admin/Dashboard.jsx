import React from 'react';
import { useNavigate } from 'react-router-dom';
import SEO from '../../components/SEO';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';

export default function Dashboard() {
  const { isDark } = useTheme();
  const { logout, adminUser } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/admin');
  };

  return (
    <>
      <SEO title="Admin Dashboard — TrialShopy" description="Admin Dashboard Stub" />
      <div className={`min-h-screen ${isDark ? 'bg-[#0a0a0f] text-white' : 'bg-slate-50 text-slate-900'}`}>
        {/* Navigation header */}
        <header className={`border-b px-6 py-4 flex items-center justify-between ${isDark ? 'bg-[#0f0f1a] border-white/5' : 'bg-white border-slate-200'}`}>
          <div className="flex items-center gap-3">
            <span className="text-xl font-display font-black gradient-text">TrialShopy</span>
            <span className="text-xs bg-orange-500/10 text-orange-500 font-bold px-2 py-0.5 rounded">Admin Dashboard</span>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate('/admin/manage')}
              className="px-4 py-2 bg-purple-600 text-white rounded-lg text-sm font-semibold hover:bg-purple-700 transition-colors cursor-pointer"
            >
              Manage Content
            </button>
            <button
              onClick={handleLogout}
              className="px-4 py-2 border border-slate-300 dark:border-white/10 rounded-lg text-sm font-semibold hover:bg-red-500 hover:text-white transition-colors cursor-pointer"
            >
              Logout
            </button>
          </div>
        </header>

        {/* Dashboard content */}
        <main className="container py-12">
          <h1 className="text-3xl font-display font-black mb-2">Welcome Back, Admin</h1>
          <p className="text-muted text-sm mb-8">Management portal overview and statistics.</p>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {[
              { label: 'Total Visitors', val: 'Loading...', icon: '📊' },
              { label: 'Job Applications', val: 'Loading...', icon: '📁' },
              { label: 'Contact Requests', val: 'Loading...', icon: '✉️' }
            ].map((card, idx) => (
              <div key={idx} className={`card p-6 border ${isDark ? 'bg-[#16213e] border-white/5' : 'bg-white border-slate-100'}`}>
                <div className="text-3xl mb-3">{card.icon}</div>
                <div className="text-xs font-bold text-muted uppercase tracking-wider mb-1">{card.label}</div>
                <div className="text-2xl font-black gradient-text">{card.val}</div>
              </div>
            ))}
          </div>

          <div className={`card p-8 border text-center ${isDark ? 'bg-[#16213e] border-white/5' : 'bg-white border-slate-100'}`}>
            <h2 className="text-xl font-bold mb-2">Charts & Analytics Coming Soon</h2>
            <p className="text-muted text-sm max-w-md mx-auto mb-6">
              In Day 3, we will integrate Chart.js to visualize visitor traffic, career applications, and contact requests in real-time.
            </p>
            <div className="flex gap-4 justify-center">
              <button onClick={() => navigate('/admin/manage')} className="btn-primary cursor-pointer">
                Go to Content Manager
              </button>
              <a href="/" className="btn-secondary cursor-pointer">
                Go to Homepage
              </a>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
