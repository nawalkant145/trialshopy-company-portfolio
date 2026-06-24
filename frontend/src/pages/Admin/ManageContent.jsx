import React from 'react';
import { useNavigate } from 'react-router-dom';
import SEO from '../../components/SEO';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';

export default function ManageContent() {
  const { isDark } = useTheme();
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/admin');
  };

  return (
    <>
      <SEO title="Manage Content — TrialShopy Admin" description="Manage Content Stub" />
      <div className={`min-h-screen ${isDark ? 'bg-[#0a0a0f] text-white' : 'bg-slate-50 text-slate-900'}`}>
        {/* Navigation header */}
        <header className={`border-b px-6 py-4 flex items-center justify-between ${isDark ? 'bg-[#0f0f1a] border-white/5' : 'bg-white border-slate-200'}`}>
          <div className="flex items-center gap-3">
            <span className="text-xl font-display font-black gradient-text">TrialShopy</span>
            <span className="text-xs bg-orange-500/10 text-orange-500 font-bold px-2 py-0.5 rounded">Content Manager</span>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate('/admin/dashboard')}
              className="px-4 py-2 bg-orange-500 text-white rounded-lg text-sm font-semibold hover:bg-orange-600 transition-colors cursor-pointer"
            >
              Analytics Dashboard
            </button>
            <button
              onClick={handleLogout}
              className="px-4 py-2 border border-slate-300 dark:border-white/10 rounded-lg text-sm font-semibold hover:bg-red-500 hover:text-white transition-colors cursor-pointer"
            >
              Logout
            </button>
          </div>
        </header>

        {/* Content body */}
        <main className="container py-12">
          <h1 className="text-3xl font-display font-black mb-2">Content Management</h1>
          <p className="text-muted text-sm mb-8">Add, edit, or delete items from the database collections.</p>

          <div className="grid md:grid-cols-4 gap-6 mb-12">
            {[
              { label: 'Products', count: '10 Items', icon: '🛍️' },
              { label: 'Careers', count: '4 Roles', icon: '💼' },
              { label: 'Team Members', count: '5 People', icon: '👥' },
              { label: 'Testimonials', count: '3 Reviews', icon: '⭐' }
            ].map((section, idx) => (
              <div key={idx} className={`card p-6 border flex flex-col justify-between ${isDark ? 'bg-[#16213e] border-white/5' : 'bg-white border-slate-100'}`}>
                <div>
                  <div className="text-3xl mb-3">{section.icon}</div>
                  <h3 className={`font-display font-bold text-lg mb-1 ${isDark ? 'text-white' : 'text-slate-900'}`}>{section.label}</h3>
                  <p className="text-xs text-muted mb-4">Currently tracking {section.count}.</p>
                </div>
                <button
                  onClick={() => alert(`${section.label} CRUD implementation will be completed in Day 3!`)}
                  className="w-full text-center py-2 bg-white/5 dark:bg-white/5 hover:bg-orange-500 hover:text-white dark:hover:bg-orange-500 transition-all rounded-lg text-xs font-semibold border border-subtle cursor-pointer"
                >
                  Manage {section.label}
                </button>
              </div>
            ))}
          </div>

          <div className={`card p-8 border text-center ${isDark ? 'bg-[#16213e] border-white/5' : 'bg-white border-slate-100'}`}>
            <h2 className="text-xl font-bold mb-2">CRUD Operations Coming in Day 3</h2>
            <p className="text-muted text-sm max-w-md mx-auto">
              In Day 3, we will add full MERN stack CRUD interfaces here with modals and forms to update Products, Careers, Team Members, and Testimonials database records live.
            </p>
          </div>
        </main>
      </div>
    </>
  );
}
