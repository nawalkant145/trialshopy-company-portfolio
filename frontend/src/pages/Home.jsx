import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import SEO from '../components/SEO';
import API from '../utils/api';

const stats = [
  { value: '50+', label: 'AR Display Locations' },
  { value: '10K+', label: 'Happy Customers' },
  { value: '500+', label: 'Brand Partners' },
  { value: '98%', label: 'Try-on Accuracy' },
];

function CountUp({ target, suffix = '' }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true;
        const num = parseInt(target.replace(/\D/g, ''));
        const duration = 1500;
        const step = Math.ceil(num / (duration / 16));
        let current = 0;
        const timer = setInterval(() => {
          current = Math.min(current + step, num);
          setCount(current);
          if (current >= num) clearInterval(timer);
        }, 16);
      }
    }, { threshold: 0.5 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return <span ref={ref}>{count}{suffix}</span>;
}

export default function Home() {
  const { isDark } = useTheme();

  useEffect(() => {
    if (!sessionStorage.getItem('visitorCounted')) {
      API.post('/stats/increment-visitors').catch(() => {});
      sessionStorage.setItem('visitorCounted', 'true');
    }
  }, []);

  return (
    <>
      <SEO
        title="Home"
        description="TrialShopy - AI-powered Smart AR Shopping Platform. Try on clothes virtually via AR Displays in colleges, offices, and public spaces."
        keywords="AR shopping, virtual try-on, smart display, AI fashion, TrialShopy"
      />

      {/* Hero Section */}
      <section className={`relative min-h-screen flex items-center overflow-hidden ${isDark ? 'bg-[#0a0a0f]' : 'bg-gradient-to-br from-orange-50 via-white to-purple-50'}`}>
        {/* Orbs */}
        <div className="orb orb-orange w-[600px] h-[600px] -top-48 -right-48 opacity-30" />
        <div className="orb orb-purple w-[400px] h-[400px] -bottom-32 -left-32 opacity-20" />

        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-[0.03]"
          style={{ backgroundImage: 'linear-gradient(rgba(249,115,22,1) 1px, transparent 1px), linear-gradient(90deg, rgba(249,115,22,1) 1px, transparent 1px)', backgroundSize: '50px 50px' }}
        />

        <div className="container relative z-10 pt-28 pb-16">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Content */}
            <div className="animate-fade-in-up">
              <div className="badge mb-6">
                <span>🚀</span>
                <span>Smart AR Shopping Revolution</span>
              </div>

              <h1 className="font-display font-black text-5xl md:text-6xl xl:text-7xl leading-[1.1] mb-6">
                <span className={isDark ? 'text-white' : 'text-slate-900'}>Try Before</span>
                <br />
                <span className="gradient-text">You Buy</span>
                <br />
                <span className={isDark ? 'text-white' : 'text-slate-900'}>Anywhere.</span>
              </h1>

              <p className={`text-lg md:text-xl leading-relaxed mb-8 max-w-lg ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                Experience fashion like never before. Our AI-powered Smart AR Displays let you virtually try on clothes in seconds — in your college, office, or favourite mall.
              </p>

              <div className="flex flex-wrap gap-4">
                <Link to="/products" className="btn-primary text-base px-7 py-3.5">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Try Now
                </Link>
                <Link to="/how-it-works" className="btn-secondary text-base px-7 py-3.5">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  See How It Works
                </Link>
              </div>

              {/* Trust Indicators */}
              <div className={`flex items-center gap-6 mt-10 pt-8 border-t ${isDark ? 'border-white/10' : 'border-slate-200'}`}>
                <div className="flex -space-x-2">
                  {['https://i.pravatar.cc/32?img=1', 'https://i.pravatar.cc/32?img=2', 'https://i.pravatar.cc/32?img=3', 'https://i.pravatar.cc/32?img=4'].map((src, i) => (
                    <img key={i} src={src} alt="" className="w-8 h-8 rounded-full border-2 border-orange-500" />
                  ))}
                </div>
                <div>
                  <div className="flex text-orange-400 text-sm">{'★★★★★'}</div>
                  <p className={`text-xs mt-0.5 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>10,000+ satisfied customers</p>
                </div>
              </div>
            </div>

            {/* Right - AR Showcase Mockup */}
            <div className="relative hidden lg:flex items-center justify-center">
              <div className="animate-float relative">
                {/* Glow ring */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-orange-500/30 to-purple-600/30 blur-2xl scale-110 animate-pulse-glow" />

                {/* Main card */}
                <div className={`relative glass-card rounded-3xl p-8 w-80 ${isDark ? 'bg-[#16213e]/80' : 'bg-white/80'}`}>
                  {/* AR Screen Mockup */}
                  <div className="rounded-2xl overflow-hidden bg-gradient-to-br from-slate-900 to-slate-800 aspect-[3/4] mb-4 relative">
                    <img
                      src="https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=400&q=80"
                      alt="Virtual try-on AR display"
                      className="w-full h-full object-cover opacity-80"
                    />
                    {/* AR overlay elements */}
                    <div className="absolute inset-0 flex items-end p-4">
                      <div className="w-full">
                        <div className="glass-card rounded-xl p-3 bg-black/40">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                            <span className="text-white text-xs font-medium">AR Try-On Active</span>
                          </div>
                          <div className="w-full bg-white/20 rounded-full h-1.5">
                            <div className="bg-orange-500 h-1.5 rounded-full w-3/4 animate-pulse" />
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* AR corner markers */}
                    {[
                      { pos: 'top-3 left-3', border: 'border-t-2 border-l-2 rounded-tl-md' },
                      { pos: 'top-3 right-3', border: 'border-t-2 border-r-2 rounded-tr-md' },
                      { pos: 'bottom-3 left-3', border: 'border-b-2 border-l-2 rounded-bl-md' },
                      { pos: 'bottom-3 right-3', border: 'border-b-2 border-r-2 rounded-br-md' }
                    ].map(({ pos, border }, i) => (
                      <div key={i} className={`absolute ${pos} ${border} w-6 h-6 border-orange-400`} />
                    ))}
                  </div>

                  <div className={`text-center`}>
                    <p className={`font-semibold text-sm ${isDark ? 'text-white' : 'text-slate-800'}`}>Smart AR Display v3.0</p>
                    <p className={`text-xs mt-1 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>AI-powered fit analysis</p>
                  </div>
                </div>

                {/* Floating badge top */}
                <div className={`absolute -top-4 -right-4 glass-card rounded-2xl px-4 py-2.5 shadow-xl ${isDark ? 'bg-[#16213e]' : 'bg-white'} border border-orange-500/30 z-10 whitespace-nowrap`}>
                  <p className="text-orange-500 font-bold text-sm">98% Fit</p>
                  <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Accuracy</p>
                </div>

                {/* Floating badge bottom */}
                <div className={`absolute -bottom-4 -left-4 glass-card rounded-2xl px-4 py-2.5 shadow-xl ${isDark ? 'bg-[#16213e]' : 'bg-white'} border border-purple-500/30 z-10 whitespace-nowrap`}>
                  <p className="text-purple-500 font-bold text-sm">2s</p>
                  <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Try-on Time</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className={`py-16 ${isDark ? 'bg-[#0f0f1a]' : 'bg-white'}`}>
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map(({ value, label }) => (
              <div key={label} className="text-center">
                <div className="gradient-text font-display font-black text-4xl md:text-5xl mb-2">
                  <CountUp target={value} suffix={value.replace(/[0-9]/g, '')} />
                </div>
                <p className={`text-sm font-medium ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Company Introduction */}
      <section className={`section-padding ${isDark ? 'bg-[#0a0a0f]' : 'bg-slate-50'}`}>
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="badge">About TrialShopy</div>
              <h2 className={`section-title ${isDark ? 'text-white' : 'text-slate-900'}`}>
                Bridging the Gap Between
                <span className="gradient-text"> Digital & Physical</span> Retail
              </h2>
              <p className={`text-lg leading-relaxed mb-6 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                Founded in 2024 by Nikhil Choudhary, TrialShopy was built on one simple truth — online fashion shopping is broken. With 40% of online clothes returned because of poor fit, we decided to change the game.
              </p>
              <p className={`text-base leading-relaxed mb-8 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                Our Smart AR Display kiosks, powered by cutting-edge computer vision and body tracking AI, let shoppers virtually try on thousands of clothing items in under 2 seconds — with 98% fit accuracy.
              </p>
              <Link to="/about" className="btn-primary">
                Our Story →
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: '🧠', title: 'AI-Powered', desc: 'Real-time body tracking and clothing simulation' },
                { icon: '🎯', title: '98% Accuracy', desc: 'Precision fit analysis for every body type' },
                { icon: '⚡', title: '2 Second Try-On', desc: 'Fastest virtual fitting room experience' },
                { icon: '🌍', title: '50+ Locations', desc: 'Deployed across colleges and offices' },
              ].map(({ icon, title, desc }) => (
                <div key={title} className={`card p-6 flex flex-col gap-3 h-full border ${isDark ? 'bg-[#16213e] border-white/5' : 'bg-white border-slate-100'}`}>
                  <div className="text-3xl">{icon}</div>
                  <div className="flex flex-col flex-1">
                    <h3 className={`font-display font-bold text-base mb-1.5 ${isDark ? 'text-white' : 'text-slate-900'}`}>{title}</h3>
                    <p className={`text-xs md:text-sm leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className={`section-padding ${isDark ? 'bg-[#0f0f1a]' : 'bg-white'}`}>
        <div className="container text-center">
          <div className="badge">Our Purpose</div>
          <h2 className={`section-title mb-4 ${isDark ? 'text-white' : 'text-slate-900'}`}>Mission & Vision</h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mt-12">
            <div className={`card p-8 text-left ${isDark ? 'bg-[#16213e]' : 'bg-white'} border-l-4 border-orange-500`}>
              <div className="w-12 h-12 rounded-xl bg-orange-500/20 flex items-center justify-center mb-4">
                <span className="text-2xl">🚀</span>
              </div>
              <h3 className={`font-display font-bold text-xl mb-3 ${isDark ? 'text-white' : 'text-slate-900'}`}>Our Mission</h3>
              <p className={`leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                To eliminate fashion returns and empower every shopper with a seamless, immersive AR try-on experience — making confident purchase decisions effortless and fun.
              </p>
            </div>
            <div className={`card p-8 text-left ${isDark ? 'bg-[#16213e]' : 'bg-white'} border-l-4 border-purple-500`}>
              <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center mb-4">
                <span className="text-2xl">🔮</span>
              </div>
              <h3 className={`font-display font-bold text-xl mb-3 ${isDark ? 'text-white' : 'text-slate-900'}`}>Our Vision</h3>
              <p className={`leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                A world where every public space — from college campuses to corporate offices — has an intelligent AR display, enabling everyone to discover and wear fashion that truly fits their personality.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding relative overflow-hidden bg-gradient-to-br from-orange-600 via-orange-500 to-purple-600">
        <div className="orb orb-orange w-96 h-96 -top-24 -left-24 opacity-30" />
        <div className="orb orb-purple w-80 h-80 -bottom-16 -right-16 opacity-30" />
        <div className="container relative z-10 text-center">
          <h2 className="font-display font-black text-4xl md:text-5xl text-white mb-4">
            Ready to Transform Your Shopping?
          </h2>
          <p className="text-orange-100 text-lg mb-8 max-w-xl mx-auto">
            Find a TrialShopy Smart AR Display near you or bring one to your space. Experience the future of fashion today.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/products" className="btn-primary bg-white text-orange-600 hover:bg-orange-50 hover:shadow-white/30">
              Browse Products
            </Link>
            <Link to="/contact" className="btn-secondary border-white text-white hover:bg-white hover:text-orange-600">
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
