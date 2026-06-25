import React, { useState, useEffect } from 'react';
import SEO from '../components/SEO';
import { useTheme } from '../context/ThemeContext';
import API from '../utils/api';

function JobSkeleton() {
  return (
    <div className="card animate-pulse p-6 bg-slate-200 dark:bg-slate-800 rounded-2xl flex flex-col gap-4">
      <div className="h-4 bg-slate-300 dark:bg-slate-700 rounded w-1/4" />
      <div className="h-6 bg-slate-300 dark:bg-slate-700 rounded w-2/3" />
      <div className="h-4 bg-slate-300 dark:bg-slate-700 rounded w-1/3" />
      <div className="h-4 bg-slate-300 dark:bg-slate-700 rounded w-full" />
      <div className="flex gap-2">
        <div className="h-6 bg-slate-300 dark:bg-slate-700 rounded-full w-16" />
        <div className="h-6 bg-slate-300 dark:bg-slate-700 rounded-full w-16" />
      </div>
    </div>
  );
}

export default function Careers() {
  const { isDark } = useTheme();
  const [careers, setCareers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Apply Form Modal states
  const [selectedJob, setSelectedJob] = useState(null);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [resume, setResume] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  // Job Details Accordion state
  const [expandedJobId, setExpandedJobId] = useState(null);

  useEffect(() => {
    const fetchCareers = async () => {
      try {
        setLoading(true);
        const res = await API.get('/careers');
        setCareers(res.data?.data || res.data || []);
      } catch (err) {
        console.error('Error fetching careers:', err);
        setError('Failed to fetch career openings. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    fetchCareers();
  }, []);

  const handleApplyClick = (job) => {
    setSelectedJob(job);
    setFullName('');
    setEmail('');
    setResume(null);
    setSubmitSuccess(false);
    setSubmitError(null);
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setResume(e.target.files[0]);
    }
  };

  const handleSubmitApplication = async (e) => {
    e.preventDefault();
    if (!fullName || !email || !resume) {
      setSubmitError('All fields are required, including your resume.');
      return;
    }

    try {
      setSubmitting(true);
      setSubmitError(null);

      const formData = new FormData();
      formData.append('name', fullName);
      formData.append('email', email);
      formData.append('careerId', selectedJob._id);
      formData.append('resume', resume);

      await API.post('/careers/apply', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setSubmitSuccess(true);
    } catch (err) {
      console.error('Error applying for job:', err);
      setSubmitError(err.response?.data?.message || 'Failed to submit application. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <SEO
        title="Careers — TrialShopy | Join Our Startup Team"
        description="Join TrialShopy's mission to transform retail fashion. View our open startup roles and apply online today."
      />

      {/* ─── Hero ─── */}
      <section className={`relative overflow-hidden pt-44 pb-16 text-center ${isDark ? 'bg-[#0a0a0f]' : 'bg-slate-50'}`}>
        <div className="orb orb-orange w-96 h-96 -top-32 -left-32 opacity-25" />
        <div className="orb orb-purple w-80 h-80 top-10 right-0 opacity-20" />
        <div className="container relative z-10">
          <span className="badge">✦ Join Our Journey</span>
          <h1 className={`section-title font-display ${isDark ? 'text-white' : 'text-slate-900'}`}>
            Build the Future of <span className="gradient-text">Retail AR</span>
          </h1>
          <p className="section-subtitle mx-auto">
            We are a fast-growing team of developers, designers, and visionaries. Explore our open positions and make an impact.
          </p>
        </div>
      </section>

      {/* ─── Culture Values ─── */}
      <section className={`py-12 ${isDark ? 'bg-[#0f0f1a]' : 'bg-white'}`}>
        <div className="container">
          <div className="text-center mb-10">
            <span className="badge">🌱 Culture & Perks</span>
            <h2 className={`font-display font-bold text-2xl mb-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
              Why You'll Love working at <span className="gradient-text">TrialShopy</span>
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: '🏠', title: 'Remote Friendly', desc: 'Work from where you are most productive. We believe in trust, flexible hours, and output.' },
              { icon: '📈', title: 'Equity Included', desc: 'Every employee gets a piece of the pie. We share our growth and success with stock options.' },
              { icon: '🚀', title: 'Learn & Grow', desc: 'Get a learning budget, attend conferences, and work with state-of-the-art AI/AR tech.' }
            ].map(( perk, idx ) => (
              <div
                key={idx}
                className={`card p-6 text-center border ${isDark ? 'bg-[#16213e] border-white/5' : 'bg-white border-slate-100'}`}
              >
                <div className="text-4xl mb-4">{perk.icon}</div>
                <h3 className={`font-display font-bold text-lg mb-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>{perk.title}</h3>
                <p className={`text-sm leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>{perk.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Open Positions ─── */}
      <section className={`py-16 ${isDark ? 'bg-[#0a0a0f]' : 'bg-slate-50'}`}>
        <div className="container max-w-4xl">
          <div className="text-center mb-10">
            <span className="badge">💼 Openings</span>
            <h2 className={`font-display font-bold text-2xl ${isDark ? 'text-white' : 'text-slate-900'}`}>
              Current <span className="gradient-text">Opportunities</span>
            </h2>
          </div>

          {loading ? (
            <div className="space-y-6">
              {[...Array(3)].map((_, idx) => (
                <JobSkeleton key={idx} />
              ))}
            </div>
          ) : error ? (
            <div className="text-center py-10">
              <p className="text-rose-500 font-semibold">{error}</p>
            </div>
          ) : careers.length === 0 ? (
            <div className="text-center py-16 card bg-white dark:bg-[#16213e] border dark:border-white/5">
              <span className="text-4xl mb-3 block">🎒</span>
              <h3 className={`text-xl font-bold mb-1 ${isDark ? 'text-white' : 'text-slate-900'}`}>No Active Openings</h3>
              <p className="text-muted text-sm">We don't have any open roles right now, but check back soon!</p>
            </div>
          ) : (
            <div className="space-y-4">
              {careers.map((job) => {
                const isExpanded = expandedJobId === job._id;
                return (
                  <div
                    key={job._id}
                    className={`card overflow-hidden border transition-all duration-300 ${
                      isDark ? 'bg-[#16213e] border-white/5' : 'bg-white border-slate-100'
                    }`}
                  >
                    {/* Header */}
                    <div className="p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                      <div>
                        <div className="flex flex-wrap gap-2 mb-2">
                          <span className="bg-orange-500/10 text-orange-500 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                            {job.department}
                          </span>
                          <span className="bg-purple-500/10 text-purple-600 dark:text-purple-400 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                            📍 {job.location}
                          </span>
                        </div>
                        <h3 className={`font-display font-bold text-lg md:text-xl ${isDark ? 'text-white' : 'text-slate-900'}`}>
                          {job.title}
                        </h3>
                      </div>
                      <div className="flex gap-2 w-full sm:w-auto">
                        <button
                          onClick={() => setExpandedJobId(isExpanded ? null : job._id)}
                          className="btn-secondary py-2 px-4 text-xs font-semibold rounded-lg flex-1 sm:flex-none text-center cursor-pointer"
                        >
                          {isExpanded ? 'Hide Details' : 'View Details'}
                        </button>
                        <button
                          onClick={() => handleApplyClick(job)}
                          className="btn-primary py-2 px-4 text-xs font-semibold rounded-lg flex-1 sm:flex-none text-center cursor-pointer"
                        >
                          Apply Now
                        </button>
                      </div>
                    </div>

                    {/* Expandable Details */}
                    {isExpanded && (
                      <div className={`p-6 border-t ${isDark ? 'border-white/5 bg-[#0f0f1a]/40' : 'border-slate-100 bg-slate-50/50'} animate-fade-in-up`}>
                        <div className="mb-4">
                          <h4 className={`text-sm font-bold mb-2 uppercase tracking-wide ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                            Description
                          </h4>
                          <p className={`text-sm leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                            {job.description}
                          </p>
                        </div>
                        {job.requirements && job.requirements.length > 0 && (
                          <div>
                            <h4 className={`text-sm font-bold mb-2 uppercase tracking-wide ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                              Requirements & Qualifications
                            </h4>
                            <ul className="list-disc pl-5 space-y-1.5">
                              {job.requirements.map((req, index) => (
                                <li key={index} className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                                  {req}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* ─── Apply Form Modal ─── */}
      {selectedJob && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in-up">
          <div
            className={`relative w-full max-w-lg rounded-3xl p-8 border shadow-2xl ${
              isDark ? 'bg-[#0f0f1a] border-white/10' : 'bg-white border-slate-100'
            }`}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedJob(null)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black/80 transition-colors cursor-pointer font-bold text-sm"
            >
              ✕
            </button>

            <span className="badge mb-2">Apply for Role</span>
            <h3 className={`font-display font-black text-xl md:text-2xl mb-1 ${isDark ? 'text-white' : 'text-slate-900'}`}>
              {selectedJob.title}
            </h3>
            <p className="text-xs text-muted mb-6">Department: {selectedJob.department} | Location: {selectedJob.location}</p>

            {submitSuccess ? (
              <div className="text-center py-6">
                <span className="text-5xl mb-4 block">🎉</span>
                <h4 className={`text-lg font-bold mb-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>Application Submitted!</h4>
                <p className="text-sm text-muted mb-6">
                  Thank you for applying. Our hiring team will review your application and resume and reach out to you soon.
                </p>
                <button onClick={() => setSelectedJob(null)} className="btn-primary w-full cursor-pointer">
                  Close Window
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmitApplication} className="space-y-4">
                {submitError && (
                  <div className="p-3 bg-rose-500/10 border border-rose-500/30 text-rose-500 rounded-xl text-xs font-semibold">
                    ⚠️ {submitError}
                  </div>
                )}

                <div>
                  <label className={`block text-xs font-bold uppercase tracking-wider mb-2 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                    Full Name
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={e => setFullName(e.target.value)}
                    placeholder="Enter your full name"
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
                    placeholder="name@example.com"
                    className="form-input"
                  />
                </div>

                <div>
                  <label className={`block text-xs font-bold uppercase tracking-wider mb-2 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                    Resume / CV (PDF or Word, max 10MB)
                  </label>
                  <div
                    className={`relative border-2 border-dashed rounded-2xl p-6 text-center cursor-pointer transition-colors ${
                      resume
                        ? 'border-emerald-500/50 bg-emerald-500/5'
                        : isDark
                          ? 'border-white/10 hover:border-orange-500/50 bg-white/2 hover:bg-white/5'
                          : 'border-slate-200 hover:border-orange-500/50 bg-slate-50 hover:bg-slate-100'
                    }`}
                  >
                    <input
                      type="file"
                      required
                      accept=".pdf,.doc,.docx"
                      onChange={handleFileChange}
                      className="absolute inset-0 opacity-0 cursor-pointer"
                    />
                    <div className="text-3xl mb-2">{resume ? '📄' : '📁'}</div>
                    <p className={`text-sm font-semibold mb-1 ${isDark ? 'text-slate-200' : 'text-slate-700'}`}>
                      {resume ? resume.name : 'Select or drop your file'}
                    </p>
                    <p className="text-xs text-muted">
                      {resume ? `${(resume.size / (1024 * 1024)).toFixed(2)} MB` : 'PDF, DOC, DOCX up to 10MB'}
                    </p>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="btn-primary w-full py-3.5 rounded-xl flex items-center justify-center gap-2 cursor-pointer shadow-lg mt-6"
                >
                  {submitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Submitting Application...
                    </>
                  ) : (
                    'Submit Application'
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
}
