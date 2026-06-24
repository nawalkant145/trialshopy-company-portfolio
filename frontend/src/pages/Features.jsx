import React, { useState } from 'react';
import SEO from '../components/SEO';
import { useTheme } from '../context/ThemeContext';

const features = [
  {
    icon: '🧠',
    title: 'AI-Powered Virtual Try-On',
    desc: 'Our computer vision engine maps your body in real-time with 512 landmark points, draping garments precisely over your silhouette — no hardware required.',
    color: 'from-orange-500/20 to-orange-400/10',
    accent: 'text-orange-500',
    border: 'border-orange-500/20',
  },
  {
    icon: '🖥️',
    title: 'Smart AR Display Network',
    desc: 'Strategically placed AR kiosks in malls, airports, and high-streets let you try on thousands of styles without ever opening an app.',
    color: 'from-purple-600/20 to-purple-400/10',
    accent: 'text-purple-500',
    border: 'border-purple-500/20',
  },
  {
    icon: '🎓',
    title: 'Student Discounts',
    desc: 'Verified students get 20% off every purchase, every time — because great style shouldn\'t be gated by a college budget.',
    color: 'from-blue-500/20 to-blue-400/10',
    accent: 'text-blue-500',
    border: 'border-blue-500/20',
  },
  {
    icon: '💼',
    title: 'Employee Benefits Program',
    desc: 'Corporate partnerships give employees of our partner companies exclusive discounts and early access to new collections.',
    color: 'from-emerald-500/20 to-emerald-400/10',
    accent: 'text-emerald-500',
    border: 'border-emerald-500/20',
  },
  {
    icon: '⭐',
    title: 'Reward Points System',
    desc: 'Earn points on every virtual try-on and real purchase. Redeem for discounts, free delivery, or exclusive style consultations.',
    color: 'from-amber-500/20 to-amber-400/10',
    accent: 'text-amber-500',
    border: 'border-amber-500/20',
  },
  {
    icon: '⚡',
    title: 'Same-Day Delivery',
    desc: 'Love what you tried? Order from the display and receive it at your door — same-day delivery available in all major metro cities.',
    color: 'from-rose-500/20 to-rose-400/10',
    accent: 'text-rose-500',
    border: 'border-rose-500/20',
  },
];

const techSpecs = [
  { label: 'Body Scan Accuracy', value: '98.4%', icon: '🎯' },
  { label: 'Supported Clothing Types', value: '2,000+', icon: '👗' },
  { label: 'Scan Duration', value: '< 1 sec', icon: '⚡' },
  { label: 'Supported Devices', value: 'Kiosk / Mobile / Web', icon: '📱' },
  { label: 'AI Model Size', value: '340M parameters', icon: '🧠' },
  { label: 'Frame Rate', value: '60 FPS', icon: '🎬' },
];

const comparisonRows = [
  { feature: 'Virtual Try-On', trialshopy: true, traditional: false, otherAR: 'partial' },
  { feature: 'No App Required', trialshopy: true, traditional: false, otherAR: false },
  { feature: 'Real-time Body Tracking', trialshopy: true, traditional: false, otherAR: 'partial' },
  { feature: 'Same-Day Delivery', trialshopy: true, traditional: true, otherAR: false },
  { feature: 'Student Discounts', trialshopy: true, traditional: false, otherAR: false },
  { feature: 'Reward Points', trialshopy: true, traditional: 'partial', otherAR: false },
  { feature: 'Works at Physical Kiosk', trialshopy: true, traditional: true, otherAR: false },
  { feature: 'Zero Return Guarantee', trialshopy: true, traditional: false, otherAR: false },
];

function StatusIcon({ val }) {
  if (val === true)
    return <span className="text-emerald-500 text-xl font-bold">✓</span>;
  if (val === false)
    return <span className="text-rose-500 text-xl font-bold">✗</span>;
  return <span className="text-amber-500 text-sm font-semibold">Partial</span>;
}

export default function Features() {
  const { isDark } = useTheme();
  const [activeSpec, setActiveSpec] = useState(null);

  return (
    <>
      <SEO
        title="Features — TrialShopy | AR Try-On Technology"
        description="Explore TrialShopy's AR try-on technology, student discounts, reward points, smart display network, and same-day delivery — fashion reinvented."
      />

      {/* ─── Hero ─── */}
      <section className={`relative overflow-hidden pt-32 pb-24 text-center ${isDark ? 'bg-[#0a0a0f]' : 'bg-slate-50'}`}>
        <div className="orb orb-orange w-96 h-96 -top-40 left-0 opacity-25" />
        <div className="orb orb-purple w-80 h-80 top-0 right-0 opacity-20" />
        <div className="container relative z-10">
          <span className="badge">✦ Platform Features</span>
          <h1 className={`section-title font-display ${isDark ? 'text-white' : 'text-slate-900'}`}>
            Why Choose <span className="gradient-text">TrialShopy?</span>
          </h1>
          <p className="section-subtitle mx-auto">
            We've packed years of AR research, fashion expertise, and customer obsession into one seamless experience.
          </p>
        </div>
      </section>

      {/* ─── Feature Grid ─── */}
      <section className={`section-padding ${isDark ? 'bg-[#0f0f1a]' : 'bg-white'}`}>
        <div className="container">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <div
                key={f.title}
                className={`card group p-7 border ${f.border} animate-fade-in-up ${isDark ? 'bg-[#16213e]' : 'bg-white'}`}
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${f.color} flex items-center justify-center text-3xl mb-5 group-hover:scale-110 transition-transform duration-300`}>
                  {f.icon}
                </div>
                <h3 className={`font-display font-bold text-xl mb-3 ${isDark ? 'text-white' : 'text-slate-900'}`}>{f.title}</h3>
                <p className={`leading-relaxed text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>{f.desc}</p>
                <div className={`mt-4 flex items-center gap-1 text-sm font-semibold ${f.accent}`}>
                  Learn More <span>→</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Tech Highlight ─── */}
      <section className={`section-padding relative overflow-hidden ${isDark ? 'bg-[#0a0a0f]' : 'bg-slate-50'}`}>
        <div className="orb orb-purple w-96 h-96 -right-40 top-0 opacity-20" />
        <div className="container relative z-10">
          <div className={`card grid md:grid-cols-2 gap-0 overflow-hidden ${isDark ? 'bg-[#16213e]' : 'bg-white'}`}>
            {/* Left */}
            <div className="p-8 md:p-12">
              <span className="badge">⚙️ Under the Hood</span>
              <h2 className={`section-title text-left text-3xl ${isDark ? 'text-white' : 'text-slate-900'}`}>
                AR Technology <span className="gradient-text">Deep Dive</span>
              </h2>
              <p className={`mb-8 leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                Our proprietary DeepDrape™ engine is built on a transformer-based pose-estimation model trained on 10M+ body scans. It understands fabric physics, lighting, and depth to produce photorealistic results.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {techSpecs.map((spec) => (
                  <div
                    key={spec.label}
                    className={`p-4 rounded-xl cursor-pointer transition-all duration-200 ${activeSpec === spec.label ? 'ring-2 ring-orange-500 bg-orange-500/10' : isDark ? 'bg-white/5 hover:bg-white/8' : 'bg-slate-50 hover:bg-orange-50'}`}
                    onClick={() => setActiveSpec(activeSpec === spec.label ? null : spec.label)}
                  >
                    <div className="text-xl mb-1">{spec.icon}</div>
                    <div className={`text-xs font-medium mb-1 ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>{spec.label}</div>
                    <div className={`font-bold text-sm gradient-text`}>{spec.value}</div>
                  </div>
                ))}
              </div>
            </div>
            {/* Right visual */}
            <div className={`relative flex items-center justify-center p-12 ${isDark ? 'bg-gradient-to-br from-orange-500/5 to-purple-600/10' : 'bg-gradient-to-br from-orange-50 to-purple-50'}`}>
              <div className="relative">
                <div className="w-48 h-48 rounded-full border-4 border-dashed border-orange-500/30 flex items-center justify-center animate-spin-slow" style={{ animation: 'spin-slow 15s linear infinite' }}>
                  <div className="w-36 h-36 rounded-full border-4 border-dashed border-purple-500/30 flex items-center justify-center" style={{ animation: 'spin-slow 10s linear infinite reverse' }}>
                    <div className="w-24 h-24 rounded-full bg-gradient-to-br from-orange-500 to-purple-600 flex items-center justify-center text-4xl shadow-2xl animate-pulse-glow">
                      🧠
                    </div>
                  </div>
                </div>
                <div className="absolute -top-6 -right-6 bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">98.4% Accuracy</div>
                <div className="absolute -bottom-4 -left-8 bg-purple-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">60 FPS Real-time</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Comparison Table ─── */}
      <section className={`section-padding ${isDark ? 'bg-[#0f0f1a]' : 'bg-white'}`}>
        <div className="container">
          <div className="text-center mb-12">
            <span className="badge">📊 Comparison</span>
            <h2 className={`section-title ${isDark ? 'text-white' : 'text-slate-900'}`}>
              How We <span className="gradient-text">Stack Up</span>
            </h2>
            <p className="section-subtitle">TrialShopy vs. the alternatives — the difference is clear.</p>
          </div>

          <div className={`rounded-2xl overflow-hidden border ${isDark ? 'border-white/8' : 'border-slate-200'} shadow-xl`}>
            {/* Header */}
            <div className={`grid grid-cols-4 ${isDark ? 'bg-[#16213e]' : 'bg-slate-50'}`}>
              <div className={`p-4 font-semibold text-sm ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Feature</div>
              <div className="p-4 text-center">
                <div className="gradient-text font-black text-sm">TrialShopy</div>
              </div>
              <div className="p-4 text-center">
                <div className={`font-semibold text-sm ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>Traditional</div>
              </div>
              <div className="p-4 text-center">
                <div className={`font-semibold text-sm ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>Other AR Apps</div>
              </div>
            </div>

            {comparisonRows.map((row, i) => (
              <div
                key={row.feature}
                className={`grid grid-cols-4 border-t transition-colors ${isDark ? 'border-white/5 hover:bg-white/2' : 'border-slate-100 hover:bg-slate-50'} ${i % 2 === 0 ? '' : isDark ? 'bg-white/2' : 'bg-slate-50/50'}`}
              >
                <div className={`p-4 text-sm font-medium ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>{row.feature}</div>
                <div className="p-4 text-center"><StatusIcon val={row.trialshopy} /></div>
                <div className="p-4 text-center"><StatusIcon val={row.traditional} /></div>
                <div className="p-4 text-center"><StatusIcon val={row.otherAR} /></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className={`section-padding relative overflow-hidden ${isDark ? 'bg-[#0a0a0f]' : 'bg-slate-50'}`}>
        <div className="orb orb-orange w-80 h-80 left-0 -bottom-20 opacity-20" />
        <div className="container text-center relative z-10">
          <h2 className={`section-title ${isDark ? 'text-white' : 'text-slate-900'}`}>
            Ready to Experience <span className="gradient-text">the Future?</span>
          </h2>
          <p className="section-subtitle">Find a TrialShopy display near you or explore our product catalogue.</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a href="/products" className="btn-primary">Browse Products</a>
            <a href="/how-it-works" className="btn-secondary">See How It Works</a>
          </div>
        </div>
      </section>
    </>
  );
}
