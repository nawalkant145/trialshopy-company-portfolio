import React, { useState } from 'react';
import SEO from '../components/SEO';
import { useTheme } from '../context/ThemeContext';

const steps = [
  {
    num: '01',
    icon: '📍',
    title: 'Find a Display',
    desc: 'Locate the nearest TrialShopy Smart AR Display using our in-app map or look for the iconic orange-ring kiosk at participating malls and retail stores near you.',
    tip: '50+ locations across 8 cities',
  },
  {
    num: '02',
    icon: '🧍',
    title: 'Stand in Position',
    desc: 'Step into the illuminated scanning zone in front of the display. The AI instantly detects your body shape, height, and pose — no wristbands, no markers needed.',
    tip: 'Full scan in under 1 second',
  },
  {
    num: '03',
    icon: '👆',
    title: 'Browse & Select',
    desc: 'Use touchless mid-air gestures or the integrated touchscreen to swipe through thousands of clothing styles, filter by brand, size, or category.',
    tip: '2,000+ garments available',
  },
  {
    num: '04',
    icon: '✨',
    title: 'Watch the Magic',
    desc: 'Our DeepDrape™ AI instantly overlays selected clothing on your live body image with realistic fabric physics, lighting adaptation, and true-to-life sizing.',
    tip: '60 FPS real-time rendering',
  },
  {
    num: '05',
    icon: '📦',
    title: 'Order & Receive',
    desc: 'Love the look? Place your order directly from the kiosk using UPI, card, or TrialShopy Pay. We deliver same-day to metro cities — zero returns, guaranteed fit.',
    tip: 'Same-day delivery in metro cities',
  },
];

const techCards = [
  { icon: '👁️', name: 'Computer Vision', desc: 'Multi-angle 3D body reconstruction from a single RGB camera feed.' },
  { icon: '🤸', name: 'Body Tracking AI', desc: '512-point skeletal mesh that updates 60 times per second.' },
  { icon: '🖼️', name: '3D Rendering Engine', desc: 'Photorealistic fabric draping with physics simulation.' },
  { icon: '☁️', name: 'Cloud Sync', desc: 'Your wardrobe preferences synced securely across all devices.' },
];

const faqs = [
  {
    q: 'Is my body data stored or shared with anyone?',
    a: 'No. Your body scan is processed in real-time and immediately discarded. We do not store, sell, or share any biometric data. Our kiosks are SOC 2 Type II certified.',
  },
  {
    q: 'How accurate is the virtual try-on?',
    a: 'Our DeepDrape™ model achieves 98.4% accuracy in garment-to-body overlay, validated across 10M+ body types. Size recommendations have a 94% satisfaction rating among returning users.',
  },
  {
    q: 'What types of clothing are supported?',
    a: 'Currently: shirts, pants, outerwear, dresses, athleisure, footwear, and accessories. We add new categories quarterly. Undergarments and swimwear are not yet supported.',
  },
  {
    q: 'Do I need to download an app to use a kiosk?',
    a: 'No app required at any of our kiosk locations. Simply walk up, step into the zone, and start trying. Our mobile app (launching Phase 2) will extend the experience to your own phone.',
  },
  {
    q: 'What happens if the item doesn\'t fit after delivery?',
    a: 'We stand behind our AI. If your order doesn\'t match what you saw in the try-on, we offer free returns with zero questions asked within 7 days — though our 2.1% return rate speaks for itself.',
  },
];

export default function HowItWorks() {
  const { isDark } = useTheme();
  const [openFaq, setOpenFaq] = useState(null);

  return (
    <>
      <SEO
        title="How It Works — TrialShopy | Virtual AR Try-On Steps"
        description="Discover TrialShopy's 5-step AR try-on process: find a kiosk, scan in seconds, browse garments, see the magic, and order with same-day delivery."
      />

      {/* ─── Hero ─── */}
      <section className={`relative overflow-hidden pt-44 pb-24 text-center ${isDark ? 'bg-[#0a0a0f]' : 'bg-slate-50'}`}>
        <div className="orb orb-orange w-96 h-96 -top-32 -left-20 opacity-25" />
        <div className="orb orb-purple w-80 h-80 top-0 right-0 opacity-20" />
        <div className="container relative z-10">
          <div className="inline-flex items-center gap-2 badge mb-4">
            <span>5 Simple Steps</span>
          </div>
          <h1 className={`section-title font-display ${isDark ? 'text-white' : 'text-slate-900'}`}>
            How <span className="gradient-text">It Works</span>
          </h1>
          <p className="section-subtitle mx-auto">
            From discovering a kiosk to receiving your perfect-fit order — the entire TrialShopy experience in five magical moments.
          </p>
        </div>
      </section>

      {/* ─── Steps ─── */}
      <section className={`section-padding ${isDark ? 'bg-[#0f0f1a]' : 'bg-white'}`}>
        <div className="container max-w-3xl">
          <div className="relative">
            {/* Vertical connector line */}
            <div className={`absolute left-10 top-10 bottom-10 w-px ${isDark ? 'bg-gradient-to-b from-orange-500/40 via-purple-500/40 to-transparent' : 'bg-gradient-to-b from-orange-300 via-purple-300 to-transparent'} hidden md:block`} />

            <div className="space-y-10">
              {steps.map((s, i) => (
                <div
                  key={s.num}
                  className={`flex gap-6 group animate-fade-in-up`}
                  style={{ animationDelay: `${i * 0.12}s` }}
                >
                  {/* Step circle */}
                  <div className="flex-shrink-0 relative">
                    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-orange-500/40 to-purple-600/40 blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="relative w-20 h-20 rounded-full bg-gradient-to-br from-orange-500 to-purple-600 flex flex-col items-center justify-center text-white shadow-xl group-hover:scale-110 transition-transform duration-300 z-10">
                      <span className="text-2xl">{s.icon}</span>
                      <span className="text-xs font-bold opacity-80">{s.num}</span>
                    </div>
                  </div>

                  {/* Content card */}
                  <div className={`flex-1 card p-6 group-hover:shadow-orange-500/20 ${isDark ? 'bg-[#16213e]' : 'bg-white'}`}>
                    <h3 className={`font-display font-bold text-xl mb-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                      {s.title}
                    </h3>
                    <p className={`leading-relaxed mb-4 text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>{s.desc}</p>
                    <div className={`inline-flex items-center gap-2 text-xs font-semibold px-3 py-1.5 rounded-full ${isDark ? 'bg-orange-500/15 text-orange-400' : 'bg-orange-50 text-orange-600'}`}>
                      ✦ {s.tip}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── Technology Section ─── */}
      <section className={`section-padding relative overflow-hidden ${isDark ? 'bg-[#0a0a0f]' : 'bg-slate-50'}`}>
        <div className="orb orb-purple w-72 h-72 -right-20 top-0 opacity-20" />
        <div className="container relative z-10">
          <div className="text-center mb-12">
            <span className="badge">⚙️ Powered By</span>
            <h2 className={`section-title ${isDark ? 'text-white' : 'text-slate-900'}`}>
              The Tech <span className="gradient-text">Behind the Magic</span>
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {techCards.map((t, i) => (
              <div
                key={t.name}
                className={`card p-6 text-center group animate-fade-in-up ${isDark ? 'bg-[#16213e]' : 'bg-white'}`}
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform inline-block">{t.icon}</div>
                <h3 className={`font-display font-bold text-base mb-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>{t.name}</h3>
                <p className={`text-sm leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>{t.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FAQ ─── */}
      <section className={`section-padding ${isDark ? 'bg-[#0f0f1a]' : 'bg-white'}`}>
        <div className="container max-w-3xl">
          <div className="text-center mb-12">
            <span className="badge">❓ FAQ</span>
            <h2 className={`section-title ${isDark ? 'text-white' : 'text-slate-900'}`}>
              Frequently Asked <span className="gradient-text">Questions</span>
            </h2>
          </div>
          <div className="space-y-4">
            {faqs.map((f, i) => (
              <div
                key={i}
                className={`rounded-2xl border overflow-hidden transition-all duration-200 ${isDark ? 'border-white/8 bg-[#16213e]' : 'border-slate-200 bg-white'}`}
              >
                <button
                  className={`w-full flex items-center justify-between gap-4 p-5 text-left font-semibold transition-colors ${isDark ? 'text-white hover:text-orange-400' : 'text-slate-900 hover:text-orange-600'}`}
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  aria-expanded={openFaq === i}
                >
                  <span>{f.q}</span>
                  <span className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-lg font-bold transition-all duration-300 ${openFaq === i ? 'bg-orange-500 text-white rotate-45' : isDark ? 'bg-white/10 text-slate-400' : 'bg-slate-100 text-slate-600'}`}>
                    +
                  </span>
                </button>
                {openFaq === i && (
                  <div className={`px-5 pb-5 text-sm leading-relaxed animate-fade-in-up ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                    {f.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className={`section-padding relative overflow-hidden ${isDark ? 'bg-[#0a0a0f]' : 'bg-slate-50'}`}>
        <div className="orb orb-orange w-72 h-72 left-0 -bottom-20 opacity-20" />
        <div className="container text-center relative z-10">
          <h2 className={`section-title ${isDark ? 'text-white' : 'text-slate-900'}`}>
            Ready to Try It <span className="gradient-text">Yourself?</span>
          </h2>
          <p className="section-subtitle">Find a TrialShopy kiosk near you or explore our product catalogue online.</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a href="/products" className="btn-primary">Explore Products</a>
            <a href="/contact" className="btn-secondary">Find a Location</a>
          </div>
        </div>
      </section>
    </>
  );
}
