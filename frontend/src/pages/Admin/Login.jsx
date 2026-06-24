import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SEO from '../../components/SEO';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';
import API from '../../utils/api';

export default function Login() {
  const { isDark } = useTheme();
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please fill in all fields.');
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const res = await API.post('/auth/login', { email, password });
      
      if (res.data?.token) {
        login(res.data.token, res.data.user);
        navigate('/admin/dashboard');
      } else {
        setError('Login failed: Token not found in response.');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError(err.response?.data?.message || 'Invalid credentials or server error.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <SEO
        title="Admin Login — TrialShopy"
        description="Access the TrialShopy administration dashboard."
      />

      <div className={`min-h-screen flex items-center justify-center relative overflow-hidden px-4 ${isDark ? 'bg-[#0a0a0f]' : 'bg-slate-50'}`}>
        <div className="orb orb-orange w-96 h-96 -top-32 -left-32 opacity-25 animate-float" />
        <div className="orb orb-purple w-96 h-96 -bottom-32 -right-32 opacity-25 animate-float" style={{ animationDelay: '2s' }} />

        <div className="w-full max-w-md relative z-10">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-display font-black gradient-text">TrialShopy</h1>
            <p className="text-sm text-muted mt-1">Management Portal Login</p>
          </div>

          <div className={`card p-8 border ${isDark ? 'bg-[#16213e] border-white/5 shadow-2xl' : 'bg-white border-slate-100 shadow-xl'}`}>
            <h2 className={`font-display font-bold text-xl mb-6 text-center ${isDark ? 'text-white' : 'text-slate-900'}`}>
              Administrator Login
            </h2>

            {error && (
              <div className="mb-4 p-3 bg-rose-500/10 border border-rose-500/30 text-rose-500 rounded-xl text-xs font-semibold">
                ⚠️ {error}
              </div>
            )}

            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div>
                <label className={`block text-xs font-bold uppercase tracking-wider mb-2 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                  Admin Email
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="admin@trialshopy.com"
                  className="form-input"
                />
              </div>

              <div>
                <label className={`block text-xs font-bold uppercase tracking-wider mb-2 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                  Password
                </label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="form-input"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn-primary w-full py-3.5 rounded-xl flex items-center justify-center gap-2 cursor-pointer shadow-lg mt-6"
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Authenticating...
                  </>
                ) : (
                  'Login'
                )}
              </button>
            </form>

            <div className="mt-8 pt-6 border-t border-subtle text-center text-xs text-muted">
              <p>Default credentials (auto-seeded):</p>
              <p className="font-mono mt-1 text-orange-500">admin@trialshopy.com / Admin@123</p>
            </div>
          </div>

          <div className="text-center mt-6">
            <a href="/" className="text-sm font-semibold text-orange-500 hover:underline">
              ← Back to Homepage
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
