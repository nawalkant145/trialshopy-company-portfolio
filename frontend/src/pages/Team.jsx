import React, { useState, useEffect } from 'react';
import SEO from '../components/SEO';
import { useTheme } from '../context/ThemeContext';
import API from '../utils/api';

/* ─── Skeleton Loader ─── */
function SkeletonCard({ className = '' }) {
  return (
    <div className={`animate-pulse rounded-2xl ${className}`}>
      <div className="bg-slate-200 dark:bg-slate-700 rounded-2xl h-full w-full min-h-[200px]" />
    </div>
  );
}

/* ─── Founder Card ─── */
function FounderCard({ member, isDark }) {
  return (
    <div className={`relative group rounded-3xl p-[2px] bg-gradient-to-br from-orange-500 via-purple-600 to-orange-400 shadow-2xl transition-all duration-500 hover:scale-[1.02] hover:shadow-orange-500/30`}>
      <div className={`relative rounded-3xl p-8 md:p-10 h-full ${isDark ? 'bg-[#0f0f1a]' : 'bg-white'}`}>
        {/* Founder badge */}
        <div className="absolute top-6 right-6 flex items-center gap-1.5 bg-gradient-to-r from-orange-500 to-purple-600 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
          <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
          Co-Founder
        </div>

        <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
          {/* Avatar */}
          <div className="relative flex-shrink-0">
            <div className="absolute -inset-1 rounded-full bg-gradient-to-br from-orange-500 to-purple-600 blur-sm opacity-60 group-hover:opacity-90 transition-opacity duration-300" />
            <img
              src={member.imageUrl || member.image || `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&background=f97316&color=fff&size=160`}
              alt={member.name}
              className="relative w-32 h-32 md:w-40 md:h-40 rounded-full object-cover border-4 border-white/20"
              onError={e => { e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&background=f97316&color=fff&size=160`; }}
            />
            <div className="absolute bottom-2 right-2 w-5 h-5 bg-green-400 rounded-full border-2 border-white" title="Active" />
          </div>

          {/* Info */}
          <div className="text-center md:text-left flex-1">
            <h3 className={`font-display font-black text-2xl md:text-3xl mb-1 ${isDark ? 'text-white' : 'text-slate-900'}`}>
              {member.name}
            </h3>
            <p className="gradient-text font-semibold text-lg mb-4">{member.role}</p>
            <p className={`leading-relaxed text-base mb-6 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              {member.bio}
            </p>

            {/* Social Links */}
            {member.socials && (
              <div className="flex gap-3 justify-center md:justify-start">
                {member.socials.linkedin && (
                  <a href={member.socials.linkedin} target="_blank" rel="noopener noreferrer"
                    className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-200 hover:scale-110 hover:bg-orange-500 hover:text-white ${isDark ? 'bg-white/10 text-slate-400' : 'bg-slate-100 text-slate-600'}`}>
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                  </a>
                )}
                {member.socials.twitter && (
                  <a href={member.socials.twitter} target="_blank" rel="noopener noreferrer"
                    className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-200 hover:scale-110 hover:bg-orange-500 hover:text-white ${isDark ? 'bg-white/10 text-slate-400' : 'bg-slate-100 text-slate-600'}`}>
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                  </a>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Core Team Card ─── */
function CoreTeamCard({ member, isDark }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className={`card group relative overflow-hidden ${isDark ? 'bg-[#16213e]' : 'bg-white'} p-6 flex flex-col items-center text-center cursor-default`}>
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-500 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <div className="relative mb-4">
        <div className="absolute -inset-1 rounded-full bg-gradient-to-br from-orange-500/40 to-purple-600/40 blur opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <img
          src={member.imageUrl || member.image || `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&background=8b5cf6&color=fff&size=120`}
          alt={member.name}
          className="relative w-24 h-24 rounded-full object-cover border-4 border-transparent group-hover:border-orange-500/50 transition-all duration-300"
          onError={e => { e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&background=8b5cf6&color=fff&size=120`; }}
        />
      </div>
      <h3 className={`font-display font-bold text-lg mb-1 ${isDark ? 'text-white' : 'text-slate-900'}`}>{member.name}</h3>
      <span className={`inline-flex items-center gap-1 text-xs font-semibold px-3 py-1 rounded-full mb-3 ${isDark ? 'bg-orange-500/15 text-orange-400' : 'bg-orange-50 text-orange-600'}`}>
        {member.role}
      </span>
      <p className={`text-sm leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'} ${expanded ? '' : 'line-clamp-3'}`}>
        {member.bio}
      </p>
      {member.bio && member.bio.length > 120 && (
        <button onClick={() => setExpanded(!expanded)} className="text-orange-500 text-xs font-semibold mt-2 hover:underline focus:outline-none">
          {expanded ? 'Show less' : 'Read more'}
        </button>
      )}
      {member.socials && (
        <div className="flex gap-2 mt-4 pt-4 border-t border-subtle w-full justify-center">
          {member.socials.linkedin && (
            <a href={member.socials.linkedin} target="_blank" rel="noopener noreferrer"
              className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold transition-all hover:scale-110 hover:bg-orange-500 hover:text-white ${isDark ? 'bg-white/10 text-slate-400' : 'bg-slate-100 text-slate-500'}`}>in</a>
          )}
          {member.socials.twitter && (
            <a href={member.socials.twitter} target="_blank" rel="noopener noreferrer"
              className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs transition-all hover:scale-110 hover:bg-orange-500 hover:text-white ${isDark ? 'bg-white/10 text-slate-400' : 'bg-slate-100 text-slate-500'}`}>X</a>
          )}
        </div>
      )}
    </div>
  );
}

/* ─── Advisor Card (horizontal) ─── */
function AdvisorCard({ member, isDark }) {
  return (
    <div className={`card group flex items-center gap-5 p-5 ${isDark ? 'bg-[#16213e]' : 'bg-white'}`}>
      <div className="relative flex-shrink-0">
        <img
          src={member.imageUrl || member.image || `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&background=1a1a2e&color=f97316&size=80`}
          alt={member.name}
          className="w-16 h-16 rounded-2xl object-cover group-hover:scale-105 transition-transform duration-300"
          onError={e => { e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&background=1a1a2e&color=f97316&size=80`; }}
        />
        <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-purple-500 flex items-center justify-center">
          <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
          </svg>
        </div>
      </div>
      <div className="flex-1 min-w-0">
        <h3 className={`font-display font-bold text-base mb-0.5 truncate ${isDark ? 'text-white' : 'text-slate-900'}`}>{member.name}</h3>
        <span className={`inline-flex text-xs font-semibold px-2.5 py-0.5 rounded-full mb-2 ${isDark ? 'bg-purple-500/15 text-purple-400' : 'bg-purple-50 text-purple-600'}`}>
          {member.role}
        </span>
        <p className={`text-sm leading-relaxed line-clamp-2 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>{member.bio}</p>
      </div>
    </div>
  );
}

/* ─── Main Page ─── */
export default function Team() {
  const { isDark } = useTheme();
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    API.get('/team')
      .then(res => setMembers(res.data?.data || res.data || []))
      .catch(() => setError('Failed to load team members.'))
      .finally(() => setLoading(false));
  }, []);

  const founders = members.filter(m => m.category === 'founder');
  const coreTeam = members.filter(m => m.category === 'core');
  const advisors = members.filter(m => m.category === 'advisor');

  const displayFounders = founders.length ? founders : [
    { _id: 'f1', name: 'Nikhil Choudhary', role: 'CEO & Co-Founder', category: 'founder', bio: 'Visionary entrepreneur with a passion for blending cutting-edge AR technology with everyday retail experiences. Nikhil founded TrialShopy with a mission to eliminate fashion returns and empower shoppers worldwide.', image: 'https://i.pravatar.cc/200?img=11', socials: { linkedin: '#', twitter: '#' } },
    { _id: 'f2', name: 'Priya Sharma', role: 'CTO & Co-Founder', category: 'founder', bio: "Full-stack engineer and computer vision expert with 8+ years in deep learning. Priya architected the AI body-tracking engine behind TrialShopy's 98% fit accuracy.", image: 'https://i.pravatar.cc/200?img=5', socials: { linkedin: '#', twitter: '#' } },
  ];

  const displayCore = coreTeam.length ? coreTeam : [
    { _id: 'c1', name: 'Arjun Mehta', role: 'Head of Product', category: 'core', bio: 'Product strategist with a knack for user-centric design. Arjun leads the AR display UX and manages partnerships with brand integrations.', image: 'https://i.pravatar.cc/150?img=15', socials: { linkedin: '#' } },
    { _id: 'c2', name: 'Sneha Iyer', role: 'Lead ML Engineer', category: 'core', bio: 'Specialises in real-time pose estimation and 3D garment simulation. Sneha holds a PhD in computer vision from IIT Bangalore.', image: 'https://i.pravatar.cc/150?img=9', socials: { linkedin: '#', twitter: '#' } },
    { _id: 'c3', name: 'Rohan Verma', role: 'Growth Lead', category: 'core', bio: 'Performance marketer who scaled TrialShopy from 5 to 50+ locations in under a year through data-driven campaigns and retail partnerships.', image: 'https://i.pravatar.cc/150?img=22', socials: { linkedin: '#' } },
    { _id: 'c4', name: 'Aisha Khan', role: 'UX Designer', category: 'core', bio: 'Crafts intuitive user journeys for AR interfaces. Aisha brings a background in industrial design and cognitive psychology to create seamless try-on experiences.', image: 'https://i.pravatar.cc/150?img=47', socials: { linkedin: '#', twitter: '#' } },
    { _id: 'c5', name: 'Dev Patel', role: 'Backend Engineer', category: 'core', bio: 'Builds the scalable API layer and real-time garment rendering pipeline. Dev has a passion for distributed systems and low-latency architectures.', image: 'https://i.pravatar.cc/150?img=32', socials: { linkedin: '#' } },
    { _id: 'c6', name: 'Kavya Reddy', role: 'Brand Partnerships', category: 'core', bio: "Manages relationships with 500+ fashion brand partners. Kavya's negotiation skills and industry network have been instrumental in TrialShopy's rapid expansion.", image: 'https://i.pravatar.cc/150?img=44', socials: { linkedin: '#' } },
  ];

  const displayAdvisors = advisors.length ? advisors : [
    { _id: 'a1', name: 'Dr. Rajesh Nair', role: 'Strategic Advisor', category: 'advisor', bio: 'Ex-VP at Myntra and Flipkart Fashion. Brings deep expertise in e-commerce scaling and supply chain optimisation.', image: 'https://i.pravatar.cc/100?img=67' },
    { _id: 'a2', name: 'Prof. Meera Joshi', role: 'AI Research Advisor', category: 'advisor', bio: 'Professor of Computer Vision at IISc, Bangalore. Author of 40+ papers on 3D human pose estimation and generative models.', image: 'https://i.pravatar.cc/100?img=49' },
    { _id: 'a3', name: 'Sameer Kapoor', role: 'Venture Advisor', category: 'advisor', bio: 'General Partner at Sequoia India Surge alumni. Mentors early-stage deep-tech startups across South East Asia.', image: 'https://i.pravatar.cc/100?img=60' },
    { _id: 'a4', name: 'Lisa Chen', role: 'Global Markets Advisor', category: 'advisor', bio: 'Former Head of Retail Innovation at Alibaba. Advises on international expansion strategy and retail tech adoption.', image: 'https://i.pravatar.cc/100?img=41' },
  ];

  return (
    <>
      <SEO
        title="Our Team"
        description="Meet the passionate people building TrialShopy — the team of engineers, designers, and visionaries transforming fashion retail with AR technology."
        keywords="TrialShopy team, founders, AR technology team, fashion tech startup team"
      />

      {/* Hero */}
      <section className={`relative min-h-[55vh] flex items-center overflow-hidden ${isDark ? 'bg-[#0a0a0f]' : 'bg-gradient-to-br from-orange-50 via-white to-purple-50'}`}>
        <div className="orb orb-orange w-[500px] h-[500px] -top-32 -right-32 opacity-25" />
        <div className="orb orb-purple w-[400px] h-[400px] -bottom-32 -left-32 opacity-20" />
        <div className="absolute inset-0 opacity-[0.03]"
          style={{ backgroundImage: 'linear-gradient(rgba(249,115,22,1) 1px, transparent 1px), linear-gradient(90deg, rgba(249,115,22,1) 1px, transparent 1px)', backgroundSize: '50px 50px' }} />
        <div className="container relative z-10 pt-44 pb-20 text-center">
          <div className="animate-fade-in-up">
            <div className="badge mb-6 mx-auto w-fit">
              <span>👥</span>
              <span>The Builders</span>
            </div>
            <h1 className="font-display font-black text-5xl md:text-7xl leading-tight mb-6">
              <span className={isDark ? 'text-white' : 'text-slate-900'}>Meet Our </span>
              <span className="gradient-text">Team</span>
            </h1>
            <p className={`text-lg md:text-xl max-w-2xl mx-auto leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              A diverse group of engineers, designers, and visionaries united by one goal — making fashion shopping smarter, faster, and more sustainable for everyone.
            </p>
            <div className="flex flex-wrap gap-4 justify-center mt-10">
              {[
                { label: `${displayFounders.length} Founders`, color: 'orange' },
                { label: `${displayCore.length} Core Members`, color: 'purple' },
                { label: `${displayAdvisors.length} Advisors`, color: 'orange' },
              ].map(({ label, color }) => (
                <div key={label} className={`px-4 py-2 rounded-full text-sm font-semibold border ${color === 'orange' ? (isDark ? 'border-orange-500/30 bg-orange-500/10 text-orange-400' : 'border-orange-200 bg-orange-50 text-orange-600') : (isDark ? 'border-purple-500/30 bg-purple-500/10 text-purple-400' : 'border-purple-200 bg-purple-50 text-purple-600')}`}>
                  {label}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Loading Skeletons */}
      {loading && (
        <section className={`section-padding ${isDark ? 'bg-[#0f0f1a]' : 'bg-white'}`}>
          <div className="container space-y-8">
            <div className="grid md:grid-cols-2 gap-6">
              <SkeletonCard className="h-64" />
              <SkeletonCard className="h-64" />
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => <SkeletonCard key={i} className="h-56" />)}
            </div>
          </div>
        </section>
      )}

      {/* Error */}
      {error && !loading && (
        <div className="container py-16 text-center">
          <div className={`inline-flex items-center gap-3 px-6 py-4 rounded-2xl ${isDark ? 'bg-red-500/10 border border-red-500/20 text-red-400' : 'bg-red-50 border border-red-200 text-red-600'}`}>
            <svg className="w-5 h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
            {error}
          </div>
        </div>
      )}

      {/* Founders Section */}
      {!loading && (
        <section className={`section-padding ${isDark ? 'bg-[#0f0f1a]' : 'bg-white'}`}>
          <div className="container">
            <div className="text-center mb-14">
              <div className="badge mx-auto w-fit mb-4">
                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
                Founders
              </div>
              <h2 className={`section-title ${isDark ? 'text-white' : 'text-slate-900'}`}>
                The <span className="gradient-text">Visionaries</span> Behind TrialShopy
              </h2>
              <p className={`section-subtitle ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                Two passionate individuals who dared to reimagine how the world shops for fashion.
              </p>
            </div>
            <div className={`grid gap-8 ${displayFounders.length === 1 ? 'max-w-3xl mx-auto' : 'md:grid-cols-2'}`}>
              {displayFounders.map(member => (
                <FounderCard key={member._id} member={member} isDark={isDark} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Core Team Section */}
      {!loading && (
        <section className={`section-padding relative overflow-hidden ${isDark ? 'bg-[#0a0a0f]' : 'bg-slate-50'}`}>
          <div className="orb orb-purple w-72 h-72 top-0 right-0 opacity-10" />
          <div className="container relative z-10">
            <div className="text-center mb-14">
              <div className="badge mx-auto w-fit mb-4">
                <span>⚡</span> Core Team
              </div>
              <h2 className={`section-title ${isDark ? 'text-white' : 'text-slate-900'}`}>
                The <span className="gradient-text">Builders</span>
              </h2>
              <p className={`section-subtitle ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                World-class engineers, designers, and strategists driving every pixel and every product decision.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {displayCore.map((member, i) => (
                <div key={member._id} className="animate-fade-in-up" style={{ animationDelay: `${i * 80}ms`, animationFillMode: 'both' }}>
                  <CoreTeamCard member={member} isDark={isDark} />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Advisors Section */}
      {!loading && displayAdvisors.length > 0 && (
        <section className={`section-padding ${isDark ? 'bg-[#0f0f1a]' : 'bg-white'}`}>
          <div className="container">
            <div className="text-center mb-14">
              <div className="badge mx-auto w-fit mb-4">
                <span>🎓</span> Advisors
              </div>
              <h2 className={`section-title ${isDark ? 'text-white' : 'text-slate-900'}`}>
                Guided by <span className="gradient-text">Experts</span>
              </h2>
              <p className={`section-subtitle ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                Industry veterans and academic leaders who help shape our strategy and accelerate our growth.
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-5 max-w-4xl mx-auto">
              {displayAdvisors.map((member, i) => (
                <div key={member._id} className="animate-fade-in-up" style={{ animationDelay: `${i * 80}ms`, animationFillMode: 'both' }}>
                  <AdvisorCard member={member} isDark={isDark} />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="section-padding relative overflow-hidden bg-gradient-to-br from-orange-600 via-orange-500 to-purple-600">
        <div className="orb orb-orange w-80 h-80 -top-20 -left-20 opacity-30" />
        <div className="orb orb-purple w-72 h-72 -bottom-16 -right-16 opacity-30" />
        <div className="container relative z-10 text-center">
          <h2 className="font-display font-black text-4xl md:text-5xl text-white mb-4">
            Want to Join This Team?
          </h2>
          <p className="text-orange-100 text-lg mb-8 max-w-xl mx-auto">
            We are always looking for passionate people who want to shape the future of fashion retail with technology.
          </p>
          <a href="/careers" className="btn-primary bg-white text-orange-600 hover:bg-orange-50 hover:shadow-white/30">
            View Open Positions
          </a>
        </div>
      </section>
    </>
  );
}
