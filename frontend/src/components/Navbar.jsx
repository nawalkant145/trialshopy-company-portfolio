import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/features', label: 'Features' },
  { to: '/how-it-works', label: 'How It Works' },
  { to: '/products', label: 'Products' },
  { to: '/team', label: 'Team' },
  { to: '/careers', label: 'Careers' },
  { to: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const { isDark, toggleTheme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  const navBg = isScrolled
    ? isDark
      ? 'bg-[#0f0f1a]/95 shadow-lg shadow-black/30'
      : 'bg-white/95 shadow-lg shadow-black/10'
    : 'bg-transparent';

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 backdrop-blur-md ${navBg}`}>
      <div className="container">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-orange-500 to-purple-600 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
              <span className="text-white font-bold text-sm">TS</span>
            </div>
            <div>
              <span className="font-display font-bold text-xl gradient-text">TrialShopy</span>
              <div className={`text-[10px] font-semibold tracking-wider uppercase ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                AR Shopping
              </div>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                end={to === '/'}
                className={({ isActive }) =>
                  `px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? 'text-orange-500 bg-orange-500/10'
                      : isDark
                      ? 'text-slate-300 hover:text-orange-400 hover:bg-orange-500/10'
                      : 'text-slate-700 hover:text-orange-500 hover:bg-orange-500/10'
                  }`
                }
              >
                {label}
              </NavLink>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className={`p-2 rounded-xl transition-all duration-300 ${
                isDark
                  ? 'bg-slate-800 text-yellow-400 hover:bg-slate-700'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {isDark ? (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                </svg>
              )}
            </button>

            {/* Admin Link */}
            <Link
              to="/admin"
              className="hidden md:flex btn-primary text-sm py-2 px-4"
            >
              Admin
            </Link>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
              className={`lg:hidden p-2 rounded-xl ${isDark ? 'text-slate-300' : 'text-slate-700'}`}
            >
              <div className="w-5 flex flex-col gap-1.5">
                <span className={`block h-0.5 rounded-full transition-all duration-300 ${isDark ? 'bg-slate-300' : 'bg-slate-700'} ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
                <span className={`block h-0.5 rounded-full transition-all duration-300 ${isDark ? 'bg-slate-300' : 'bg-slate-700'} ${menuOpen ? 'opacity-0' : ''}`} />
                <span className={`block h-0.5 rounded-full transition-all duration-300 ${isDark ? 'bg-slate-300' : 'bg-slate-700'} ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className={`lg:hidden pb-4 rounded-b-2xl ${isDark ? 'bg-[#0f0f1a]/95' : 'bg-white/95'}`}>
            <div className="flex flex-col gap-1 px-4">
              {navLinks.map(({ to, label }) => (
                <NavLink
                  key={to}
                  to={to}
                  end={to === '/'}
                  className={({ isActive }) =>
                    `px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                      isActive
                        ? 'text-orange-500 bg-orange-500/10'
                        : isDark
                        ? 'text-slate-300 hover:text-orange-400 hover:bg-orange-500/10'
                        : 'text-slate-700 hover:text-orange-500 hover:bg-orange-500/10'
                    }`
                  }
                >
                  {label}
                </NavLink>
              ))}
              <Link to="/admin" className="btn-primary text-center mt-2 text-sm py-2">
                Admin Panel
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
