import React, { useState, useEffect, useRef } from 'react';
import SEO from '../components/SEO';
import { useTheme } from '../context/ThemeContext';

const milestones = [
  { year: '2024 Q1', label: 'Founded', desc: 'TrialShopy was born from a vision to eliminate return rates in fashion e-commerce.' },
  { year: '2024 Q3', label: 'First AR Display Deployed', desc: 'Launched our first Smart AR kiosk at a Bengaluru mall — instant crowd favourite.' },
  { year: '2025 Q1', label: '50+ Locations', desc: 'Expanded to 50+ partner retail locations across 8 Indian metro cities.' },
  { year: '2025 Q2', label: '10K Customers', desc: 'Crossed 10,000 active users virtually trying on fashion before buying.' },
];

const roadmapPhases = [
  { phase: 'Phase 1', title: '100+ Locations', icon: '📍', desc: 'Scale our AR kiosk network to 100+ mall and retail locations across India.', color: 'from-orange-500 to-orange-400', active: true },
  { phase: 'Phase 2', title: 'Mobile App Launch', icon: '📱', desc: 'Bring AR try-on directly to your pocket — anytime, anywhere fashion preview.', color: 'from-purple-600 to-purple-400', active: false },
  { phase: 'Phase 3', title: 'International Expansion', icon: '🌍', desc: 'Take TrialShopy global — starting with Southeast Asia and the Middle East.', color: 'from-blue-500 to-blue-400', active: false },
  { phase: 'Phase 4', title: 'AI Wardrobe Assistant', icon: '🤖', desc: 'A personal AI stylist that learns your taste and curates complete outfits for you.', color: 'from-emerald-500 to-emerald-400', active: false },
];

function AnimatedCounter({ end, suffix = '' }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          let start = 0;
          const duration = 1500;
          const step = (end / duration) * 16;
          const timer = setInterval(() => {
            start += step;
            if (start >= end) { setCount(end); clearInterval(timer); }
            else setCount(Math.floor(start));
          }, 16);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [end]);
  return <span ref={ref}>{count}{suffix}</span>;
}

export default function About() {
  const { isDark } = useTheme();

  return (
    <>
      <SEO
        title="About Us — TrialShopy | AR Fashion Platform"
        description="Learn how Nikhil Choudhary founded TrialShopy to revolutionise fashion e-commerce with AI-powered AR try-on technology. Our story, mission, vision and roadmap."
      />

      {/* ─── Hero ─── */}
      <section className={`relative overflow-hidden pt-32 pb-24 ${isDark ? 'bg-[#0a0a0f]' : 'bg-slate-50'}`}>
        <div className="orb orb-orange w-96 h-96 -top-32 -left-32 opacity-30" />
        <div className="orb orb-purple w-80 h-80 top-10 right-0 opacity-20" />
        <div className="container relative z-10 text-center">
          <span className="badge">✦ Our Story</span>
          <h1 className={`section-title font-display mb-4 ${isDark ? 'text-white' : 'text-slate-900'}`}>
            Reimagining How the{' '}
            <span className="gradient-text">World Shops Fashion</span>
          </h1>
          <p className="section-subtitle mx-auto">
            Founded in 2024, TrialShopy is on a mission to eliminate the guesswork — and the returns — from online fashion shopping using augmented reality.
          </p>
        </div>
      </section>

      {/* ─── Stats Bar ─── */}
      <section className={`py-12 border-y ${isDark ? 'bg-[#0f0f1a] border-white/8' : 'bg-white border-slate-200'}`}>
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { label: 'Locations', value: 50, suffix: '+' },
              { label: 'Customers', value: 10000, suffix: '+' },
              { label: 'Cities', value: 8, suffix: '' },
              { label: 'Return Rate Reduction', value: 60, suffix: '%' },
            ].map((s) => (
              <div key={s.label}>
                <div className="text-4xl font-black gradient-text">
                  <AnimatedCounter end={s.value} suffix={s.suffix} />
                </div>
                <div className={`text-sm font-medium mt-1 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Company Story + Timeline ─── */}
      <section className={`section-padding ${isDark ? 'bg-[#0a0a0f]' : 'bg-slate-50'}`}>
        <div className="container">
          <div className="grid md:grid-cols-2 gap-16 items-start">
            {/* Left — narrative */}
            <div>
              <span className="badge">📖 The Beginning</span>
              <h2 className={`section-title text-left ${isDark ? 'text-white' : 'text-slate-900'}`}>
                How It All <span className="gradient-text">Began</span>
              </h2>
              <div className={`space-y-5 leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                <p>
                  In 2023, Nikhil Choudhary was working at a fashion e-commerce startup when he noticed a painful trend: <strong className={isDark ? 'text-white' : 'text-slate-900'}>40% of all orders were returned</strong>, and the top reason was simple — "It didn't look the same on me."
                </p>
                <p>
                  The problem wasn't the clothes. It was the experience. Customers had no way to genuinely see how a garment would fit them before clicking "Buy." Nikhil spent six months researching AR, computer vision, and body-mapping — then quit his job and started TrialShopy.
                </p>
                <p>
                  Today, TrialShopy's Smart AR Displays let shoppers virtually try on thousands of garments in seconds — at malls, high-streets, and soon right on their phones. We're not just a tech company. We're changing how fashion feels.
                </p>
              </div>
            </div>

            {/* Right — milestone timeline */}
            <div className="relative">
              {/* vertical line */}
              <div className="absolute left-5 top-0 bottom-0 w-px bg-gradient-to-b from-orange-500/60 via-purple-500/60 to-transparent hidden sm:block" />
              <div className="space-y-8">
                {milestones.map((m, i) => (
                  <div key={i} className="flex gap-6 group animate-fade-in-up" style={{ animationDelay: `${i * 0.15}s` }}>
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-orange-500 to-purple-600 flex items-center justify-center text-white text-xs font-bold shadow-lg z-10">
                      {i + 1}
                    </div>
                    <div className={`card p-5 flex-1 group-hover:scale-[1.02] transition-transform ${isDark ? 'bg-[#16213e]' : 'bg-white'}`}>
                      <div className="text-xs font-semibold text-orange-500 mb-1">{m.year}</div>
                      <div className={`font-bold text-base mb-1 ${isDark ? 'text-white' : 'text-slate-900'}`}>{m.label}</div>
                      <div className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>{m.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Founder Message ─── */}
      <section className={`section-padding ${isDark ? 'bg-[#0f0f1a]' : 'bg-white'}`}>
        <div className="container max-w-4xl">
          <div className="text-center mb-12">
            <span className="badge">👤 Founder's Message</span>
            <h2 className={`section-title ${isDark ? 'text-white' : 'text-slate-900'}`}>
              A Word From <span className="gradient-text">Our Founder</span>
            </h2>
          </div>

          <div className={`relative rounded-3xl p-[2px] bg-gradient-to-br from-orange-500 via-purple-600 to-orange-400 shadow-2xl`}>
            <div className={`rounded-3xl p-8 md:p-12 ${isDark ? 'bg-[#0f0f1a]' : 'bg-white'}`}>
              <div className="flex flex-col md:flex-row gap-8 items-center">
                <div className="flex-shrink-0 relative">
                  <div className="absolute -inset-2 rounded-full bg-gradient-to-br from-orange-500 to-purple-600 blur-md opacity-50" />
                  <img
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&h=200&q=80"
                    alt="Nikhil Choudhary, Founder & CEO"
                    className="relative w-32 h-32 md:w-40 md:h-40 rounded-full object-cover border-4 border-orange-500/30"
                    onError={(e) => { e.target.src = 'https://ui-avatars.com/api/?name=Nikhil+Choudhary&background=f97316&color=fff&size=160'; }}
                  />
                </div>
                <div className="text-center md:text-left">
                  <svg className="w-8 h-8 text-orange-400 mb-4 mx-auto md:mx-0 opacity-60" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                  </svg>
                  <p className={`text-lg md:text-xl leading-relaxed italic mb-6 ${isDark ? 'text-slate-200' : 'text-slate-700'}`}>
                    "We're at the beginning of a massive shift in how humans interact with fashion. AR is not a gimmick — it's the bridge between the physical feeling of trying on clothes and the convenience of shopping online. At TrialShopy, we're building that bridge, one display at a time."
                  </p>
                  <div>
                    <div className={`font-bold text-lg ${isDark ? 'text-white' : 'text-slate-900'}`}>Nikhil Choudhary</div>
                    <div className="gradient-text font-semibold">Founder & CEO, TrialShopy</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Mission & Vision ─── */}
      <section className={`section-padding ${isDark ? 'bg-[#0a0a0f]' : 'bg-slate-50'}`}>
        <div className="container">
          <div className="text-center mb-12">
            <span className="badge">🎯 Core Beliefs</span>
            <h2 className={`section-title ${isDark ? 'text-white' : 'text-slate-900'}`}>
              Our <span className="gradient-text">Mission & Vision</span>
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {/* Mission */}
            <div className={`relative card p-8 overflow-visible group ${isDark ? 'bg-[#16213e]' : 'bg-white'}`}>
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-500 to-orange-300 rounded-t-xl" />
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-orange-500/20 to-orange-400/10 flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition-transform">🎯</div>
              <h3 className={`font-display font-bold text-2xl mb-3 ${isDark ? 'text-white' : 'text-slate-900'}`}>Our Mission</h3>
              <p className={`leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                To eliminate fashion return rates by giving every shopper — online or offline — the ability to virtually try on any garment in seconds, with AI accuracy and zero friction.
              </p>
              <div className="mt-6 space-y-2">
                {['Reduce global fashion returns by 70%', 'Make AR try-on accessible to all income groups', 'Empower brands with real try-on data'].map((item) => (
                  <div key={item} className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-orange-500" />
                    <span className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Vision */}
            <div className={`relative card p-8 overflow-visible group ${isDark ? 'bg-[#16213e]' : 'bg-white'}`}>
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-600 to-purple-400 rounded-t-xl" />
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-600/20 to-purple-400/10 flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition-transform">🔭</div>
              <h3 className={`font-display font-bold text-2xl mb-3 ${isDark ? 'text-white' : 'text-slate-900'}`}>Our Vision</h3>
              <p className={`leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                A world where every person can walk into any store — physical or digital — and instantly see exactly how any product will look and feel on them. Fashion without regret.
              </p>
              <div className="mt-6 space-y-2">
                {['Global AR network spanning 100+ countries', 'AI personal stylist for every shopper', 'Zero-return future for the fashion industry'].map((item) => (
                  <div key={item} className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                    <span className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Roadmap ─── */}
      <section className={`section-padding ${isDark ? 'bg-[#0f0f1a]' : 'bg-white'}`}>
        <div className="container">
          <div className="text-center mb-16">
            <span className="badge">🗺️ Roadmap</span>
            <h2 className={`section-title ${isDark ? 'text-white' : 'text-slate-900'}`}>
              Where We're <span className="gradient-text">Headed</span>
            </h2>
            <p className="section-subtitle">Big ambitions, clear milestones. Here's the TrialShopy journey ahead.</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {roadmapPhases.map((p, i) => (
              <div
                key={p.phase}
                className={`relative card p-6 group cursor-default animate-fade-in-up ${isDark ? 'bg-[#16213e]' : 'bg-white'} ${p.active ? 'ring-2 ring-orange-500/60' : ''}`}
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                {p.active && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="text-xs font-bold px-3 py-1 bg-gradient-to-r from-orange-500 to-orange-400 text-white rounded-full shadow">In Progress</span>
                  </div>
                )}
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform inline-block">{p.icon}</div>
                <div className={`text-xs font-bold mb-1 ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>{p.phase}</div>
                <h3 className={`font-display font-bold text-lg mb-3 ${isDark ? 'text-white' : 'text-slate-900'}`}>{p.title}</h3>
                <p className={`text-sm leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>{p.desc}</p>
                <div className={`mt-4 h-1.5 rounded-full ${isDark ? 'bg-white/5' : 'bg-slate-100'}`}>
                  <div className={`h-full rounded-full bg-gradient-to-r ${p.color}`} style={{ width: p.active ? '55%' : i === 0 ? '100%' : '0%' }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className={`section-padding relative overflow-hidden ${isDark ? 'bg-[#0a0a0f]' : 'bg-slate-50'}`}>
        <div className="orb orb-orange w-72 h-72 -bottom-20 right-0 opacity-20" />
        <div className="container text-center relative z-10">
          <h2 className={`section-title ${isDark ? 'text-white' : 'text-slate-900'}`}>Join the <span className="gradient-text">AR Revolution</span></h2>
          <p className="section-subtitle">Want to be part of what we're building? Check out our open roles.</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a href="/careers" className="btn-primary">View Open Roles</a>
            <a href="/contact" className="btn-secondary">Get In Touch</a>
          </div>
        </div>
      </section>
    </>
  );
}
