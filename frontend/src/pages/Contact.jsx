import React, { useState } from 'react';
import SEO from '../components/SEO';
import { useTheme } from '../context/ThemeContext';
import API from '../utils/api';

export default function Contact() {
  const { isDark } = useTheme();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);
  const [emailPreviewUrl, setEmailPreviewUrl] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email || !message) {
      setError('All fields are required.');
      return;
    }

    try {
      setLoading(true);
      setError(null);
      setEmailPreviewUrl(null);

      const res = await API.post('/contacts', { name, email, message });

      setSuccess(true);
      setName('');
      setEmail('');
      setMessage('');

      // Nodemailer Ethereal preview link returned from backend
      if (res.data?.emailPreviewUrl) {
        setEmailPreviewUrl(res.data.emailPreviewUrl);
      }
    } catch (err) {
      console.error('Error sending message:', err);
      setError(err.response?.data?.message || 'Failed to send message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <SEO
        title="Contact Us — TrialShopy | Get In Touch"
        description="Have questions about our Smart AR displays or partnership programs? Contact the TrialShopy team in Bengaluru today."
      />

      {/* ─── Hero ─── */}
      <section className={`relative overflow-hidden pt-32 pb-16 text-center ${isDark ? 'bg-[#0a0a0f]' : 'bg-slate-50'}`}>
        <div className="orb orb-orange w-96 h-96 -top-32 -left-32 opacity-25" />
        <div className="orb orb-purple w-80 h-80 top-10 right-0 opacity-20" />
        <div className="container relative z-10">
          <span className="badge">✦ Contact Us</span>
          <h1 className={`section-title font-display ${isDark ? 'text-white' : 'text-slate-900'}`}>
            Get In <span className="gradient-text">Touch</span>
          </h1>
          <p className="section-subtitle mx-auto">
            Have questions about virtual try-ons or want to partner with us? Drop us a line.
          </p>
        </div>
      </section>

      {/* ─── Contact Body ─── */}
      <section className={`py-16 ${isDark ? 'bg-[#0f0f1a]' : 'bg-white'}`}>
        <div className="container">
          <div className="grid lg:grid-cols-12 gap-12 items-start">
            {/* Left - Contact Info cards */}
            <div className="lg:col-span-5 space-y-6">
              {[
                { icon: '✉️', label: 'Email Us', val: 'dev@trialshopy.com', desc: 'Get support or query partnerships' },
                { icon: '📞', label: 'Call Us', val: '+91 98765 43210', desc: 'Monday to Friday, 9am to 6pm IST' },
                { icon: '📍', label: 'Our Head Office', val: 'Bengaluru, India', desc: 'Koramangala, Bengaluru, Karnataka 560034' }
              ].map((card, idx) => (
                <div
                  key={idx}
                  className={`card p-6 border flex gap-4 items-start ${
                    isDark ? 'bg-[#16213e] border-white/5' : 'bg-white border-slate-100'
                  }`}
                >
                  <div className="text-3xl p-3 rounded-2xl bg-orange-500/10 text-orange-500">{card.icon}</div>
                  <div>
                    <h3 className={`font-display font-bold text-base mb-1 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                      {card.label}
                    </h3>
                    <div className="gradient-text font-black text-sm mb-1">{card.val}</div>
                    <p className="text-xs text-muted">{card.desc}</p>
                  </div>
                </div>
              ))}

              {/* Socials Card */}
              <div className={`card p-6 border ${isDark ? 'bg-[#16213e] border-white/5' : 'bg-white border-slate-100'}`}>
                <h3 className={`font-display font-bold text-base mb-4 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  Follow Our Socials
                </h3>
                <div className="flex gap-4">
                  {[
                    { name: 'LinkedIn', icon: '💼', url: 'https://linkedin.com' },
                    { name: 'Twitter', icon: '🐦', url: 'https://twitter.com' },
                    { name: 'Instagram', icon: '📸', url: 'https://instagram.com' }
                  ].map((soc, idx) => (
                    <a
                      key={idx}
                      href={soc.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`px-4 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all hover:scale-105 ${
                        isDark ? 'bg-white/5 hover:bg-white/10 text-slate-300' : 'bg-slate-50 hover:bg-slate-100 text-slate-700'
                      }`}
                    >
                      <span>{soc.icon}</span> {soc.name}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Right - Contact form */}
            <div className="lg:col-span-7">
              <div
                className={`card p-8 border ${
                  isDark ? 'bg-[#16213e] border-white/5' : 'bg-white border-slate-100'
                }`}
              >
                <h3 className={`font-display font-bold text-xl mb-6 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  Send Us a Message
                </h3>

                {success ? (
                  <div className="text-center py-8 space-y-4">
                    <span className="text-5xl block">📬</span>
                    <h4 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>Message Sent Successfully!</h4>
                    <p className="text-sm text-muted">
                      Thank you for contacting us. We've received your request and will respond within 24 hours.
                    </p>

                    {emailPreviewUrl && (
                      <div className="p-4 bg-orange-500/10 border border-orange-500/30 rounded-2xl inline-block mt-4">
                        <p className={`text-xs font-bold mb-2 uppercase tracking-wide ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                          📬 Evaluation Email Preview (Ethereal)
                        </p>
                        <a
                          href={emailPreviewUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn-primary py-2 px-4 text-xs font-semibold rounded-lg inline-flex items-center gap-1.5 cursor-pointer"
                        >
                          View Simulated Email Preview ↗
                        </a>
                      </div>
                    )}

                    <div className="pt-4">
                      <button onClick={() => setSuccess(false)} className="btn-secondary py-2.5 px-6 text-sm cursor-pointer">
                        Send Another Message
                      </button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    {error && (
                      <div className="p-3 bg-rose-500/10 border border-rose-500/30 text-rose-500 rounded-xl text-xs font-semibold">
                        ⚠️ {error}
                      </div>
                    )}

                    <div>
                      <label className={`block text-xs font-bold uppercase tracking-wider mb-2 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                        Your Name
                      </label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={e => setName(e.target.value)}
                        placeholder="John Doe"
                        className="form-input"
                      />
                    </div>

                    <div>
                      <label className={`block text-xs font-bold uppercase tracking-wider mb-2 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                        Email Address
                      </label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        placeholder="john@example.com"
                        className="form-input"
                      />
                    </div>

                    <div>
                      <label className={`block text-xs font-bold uppercase tracking-wider mb-2 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                        Your Message
                      </label>
                      <textarea
                        required
                        rows="5"
                        value={message}
                        onChange={e => setMessage(e.target.value)}
                        placeholder="Tell us what you are looking for..."
                        className="form-input resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="btn-primary w-full py-3.5 rounded-xl flex items-center justify-center gap-2 cursor-pointer shadow-lg"
                    >
                      {loading ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          Sending Message...
                        </>
                      ) : (
                        'Send Message'
                      )}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Google Maps embed ─── */}
      <section className="px-6 pb-16">
        <div className="container">
          <div className="rounded-3xl overflow-hidden border border-subtle shadow-xl h-[400px]">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d248849.88655148564!2d77.4908568!3d12.9540328!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae1670c9b44e6d%3A0xf8dfc3e8517e4fe0!2sBengaluru%2C+Karnataka!5e0!3m2!1sen!2sin!4v1!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="TrialShopy Head Office location map"
            />
          </div>
        </div>
      </section>
    </>
  );
}
