import React, { useEffect, useState, useRef } from 'react';
import { MapPin, Search, Zap, Phone, Clock, Shield } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Emergency from '../assets/cross.png';

/* ─── Hooks (identical to site) ─── */
function useInView(threshold = 0.12) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setInView(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

interface RevealProps {
  children: React.ReactNode;
  delay?: number;
  direction?: 'up' | 'left' | 'right' | 'fade';
  className?: string;
}
const Reveal: React.FC<RevealProps> = ({ children, delay = 0, direction = 'up', className = '' }) => {
  const { ref, inView } = useInView();
  const hidden: Record<string, string> = {
    up: 'opacity-0 translate-y-10', left: 'opacity-0 -translate-x-10',
    right: 'opacity-0 translate-x-10', fade: 'opacity-0',
  };
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${inView ? 'opacity-100 translate-y-0 translate-x-0' : hidden[direction]} ${className}`}
      style={{ transitionDelay: inView ? `${delay}ms` : '0ms' }}
    >
      {children}
    </div>
  );
};

/* ─── Phone Mockups ─── */
function PhoneMap() {
  return (
    <div className="w-[200px] lg:w-[220px] rounded-[36px] overflow-hidden shadow-2xl bg-gradient-to-br from-blue-900 via-blue-700 to-blue-600"
         style={{ height: 400 }}>
      {/* notch */}
      <div className="w-20 h-5 bg-black/30 rounded-b-2xl mx-auto" />
      {/* grid overlay */}
      <div className="relative flex-1 flex items-center justify-center" style={{ height: 'calc(100% - 20px)' }}>
        <div className="absolute inset-0 opacity-[0.07]"
          style={{ backgroundImage: 'linear-gradient(white 1px,transparent 1px),linear-gradient(90deg,white 1px,transparent 1px)', backgroundSize: '28px 28px' }} />
        {/* ping animation */}
        <div className="relative flex items-center justify-center">
          <div className="absolute w-16 h-16 rounded-full border-2 border-white/40 animate-ping" />
          <div className="absolute w-24 h-24 rounded-full border border-white/20 animate-ping" style={{ animationDelay: '0.5s' }} />
          <div className="w-5 h-5 rounded-full bg-orange-500 border-3 border-white shadow-lg shadow-orange-500/60" />
        </div>
      </div>
    </div>
  );
}

function PhoneSearch() {
  return (
    <div className="w-[200px] lg:w-[220px] rounded-[36px] overflow-hidden shadow-2xl bg-[#0B1829]"
         style={{ height: 400 }}>
      <div className="w-20 h-5 bg-black rounded-b-2xl mx-auto" />
      <div className="px-5 py-4 space-y-3">
        {/* search bar */}
        <div className="bg-white/10 rounded-xl h-10 flex items-center px-3 gap-2">
          <div className="w-3.5 h-3.5 rounded-full border border-white/40" />
          <div className="w-2/5 h-1.5 rounded bg-white/20" />
        </div>
        {/* results */}
        {[['bg-red-500/40', '68%'], ['bg-green-500/30', '75%'], ['bg-blue-500/30', '60%']].map(([cls, w], i) => (
          <div key={i} className="bg-white/5 rounded-xl p-2.5 flex items-center gap-2.5">
            <div className={`w-8 h-8 rounded-lg flex-shrink-0 ${cls}`} />
            <div className="flex-1 space-y-1.5">
              <div className="h-1.5 rounded bg-white/40" style={{ width: w }} />
              <div className="h-1 rounded bg-white/15 w-1/2" />
            </div>
          </div>
        ))}
        <div className="bg-green-700/60 rounded-xl p-3 text-center">
          <span className="text-white text-xs font-bold">Search Nearest Centre</span>
        </div>
      </div>
    </div>
  );
}

function PhoneAmbulance() {
  return (
    <div className="w-[200px] lg:w-[220px] rounded-[36px] overflow-hidden shadow-2xl bg-[#0B1829]"
         style={{ height: 400 }}>
      <div className="w-20 h-5 bg-black rounded-b-2xl mx-auto" />
      <div className="flex flex-col items-center justify-center gap-6" style={{ height: 'calc(100% - 20px)' }}>
        {/* cross icon */}
        <div className="relative w-20 h-20 flex items-center justify-center">
          <div className="absolute w-20 h-3.5 bg-white/10 rounded" />
          <div className="absolute w-3.5 h-20 bg-white/10 rounded" />
          <div className="absolute -right-1 bottom-1 w-4 h-4 rounded-full bg-orange-500 shadow-lg shadow-orange-500/60 animate-pulse" />
        </div>
        {/* taxi badge */}
        <div className="bg-green-900/50 border border-green-500/30 rounded-xl px-4 py-2.5 flex items-center gap-3">
          <div className="w-8 h-8 bg-green-700 rounded-lg flex items-center justify-center text-base">🚖</div>
          <div className="space-y-1.5">
            <div className="w-14 h-1.5 rounded bg-white/35" />
            <div className="w-10 h-1 rounded bg-white/20" />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════
   PAGE
═══════════════════════════════════════ */
const EmergencyResponse: React.FC = () => {
  const [heroVisible, setHeroVisible] = useState(false);
  const [heroScrollY, setHeroScrollY] = useState(0);

  useEffect(() => {
    const onScroll = () => setHeroScrollY(window.scrollY);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const t = setTimeout(() => setHeroVisible(true), 80);
    return () => clearTimeout(t);
  }, []);

  const steps = [
    {
      n: '01', label: 'First Step', Icon: MapPin,
      title: 'Identify Accident Location',
      desc: 'Use your live location on the app to pinpoint exactly where the accident has occurred before requesting emergency support.',
      visual: <PhoneMap />,
      gradient: 'from-blue-600 to-blue-400',
    },
    {
      n: '02', label: 'Second Step', Icon: Search,
      title: 'Search the Nearest Emergency Centre',
      desc: 'Search for the closest accident & emergency centre so help can reach you as quickly as possible.',
      visual: <PhoneSearch />,
      gradient: 'from-blue-600 to-cyan-500',
    },
    {
      n: '03', label: 'Third Step', Icon: Zap,
      title: 'Request a Taxi Ambulance or Drive to Hospital',
      desc: 'Call a taxi ambulance to transfer the pet, or drive directly to the Hospital. Immediate response guaranteed island-wide.',
      visual: <PhoneAmbulance />,
      gradient: 'from-blue-700 to-blue-500',
    },
  ];

  const cards = [
    {
      icon: '🏥', pill: '24 / 7 Open',
      stat: { n: '80+', l: 'Hospitals & Vets' },
      title: 'Vets & Hospitals',
      desc: 'We reach all possible hospitals, emergency centres and vets. Even on-call vets available around the clock.',
      gradient: 'from-blue-900 via-blue-800 to-blue-700',
      glow: 'bg-blue-500/20',
    },
    {
      icon: '🚖', pill: 'Island-wide',
      stat: { n: '3 min', l: 'Avg Response' },
      title: 'Powered by Taxi®',
      desc: 'Dedicated and immediate. Island-wide to serve you. Our trained drivers handle pet transport with care.',
      gradient: 'from-[#0B1829] via-[#12243D] to-[#1B3A5A]',
      glow: 'bg-orange-500/15',
    },
  ];

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <Navbar />

      {/* ══ HERO ══════════════════════════════════════════════════════════ */}
      <header className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url(${Emergency})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            transform: `scale(1.12) translateY(${heroScrollY * 0.3}px)`,
            filter: 'saturate(0.9) contrast(1.05) brightness(0.6)',
            willChange: 'transform',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/50 to-black/90" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
        {/* grid overlay */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{ backgroundImage: 'linear-gradient(white 1px,transparent 1px),linear-gradient(90deg,white 1px,transparent 1px)', backgroundSize: '60px 60px' }} />
        {/* orange glow */}
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 text-center px-4 lg:px-8 max-w-5xl mx-auto">
          {/* alert badge */}
          <div
            className={`mb-6 transition-all duration-500 ease-out ${heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-3'}`}
            style={{ transitionDelay: '100ms' }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-widest
                             bg-orange-500/15 border border-orange-500/30 text-orange-400">
              <span className="w-1.5 h-1.5 rounded-full bg-orange-400 animate-pulse" />
              Emergency Response
            </span>
          </div>

          <h1
            className={`text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-black text-white mb-6 leading-tight
                        transition-all duration-700 ease-out ${heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
            style={{ transitionDelay: '200ms' }}
          >
            Accident &amp;{' '}
            <span className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
              Emergency
            </span>
          </h1>


        </div>
      </header>

      {/* ══ STATS BAR ═════════════════════════════════════════════════════ */}
      <section className="py-14 lg:py-16 bg-white border-b border-gray-100">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { n: '80+',   l: 'Hospitals & Vets' },
              { n: '3 min', l: 'Avg Response Time' },
              { n: '24/7',  l: 'Always Available' },
              { n: '100%',  l: 'Island-wide Coverage' },
            ].map((s, i) => (
              <Reveal key={i} direction="up" delay={i * 80}>
                <div className="text-center lg:text-left">
                  <div className="text-4xl lg:text-5xl font-black text-gray-900 mb-1">{s.n}</div>
                  <div className="text-sm text-gray-400 font-medium uppercase tracking-wider">{s.l}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══ STEPS — dark section ══════════════════════════════════════════ */}
      <section id="steps" className="py-16 lg:py-20 bg-[#0f172a]">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <Reveal direction="up">
              <div className="mb-12 lg:mb-16">
                <span className="text-blue-400 font-black text-sm tracking-widest uppercase block mb-3">Step-by-Step Guide</span>
                <h2 className="text-4xl lg:text-5xl font-black text-white mb-3">Instructions</h2>
                <p className="text-white/50 text-lg max-w-xl">Follow these steps to get the fastest emergency response.</p>
              </div>
            </Reveal>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6">
              {steps.map((step, i) => {
                const { ref, inView } = useInView(0.08);
                const [hovered, setHovered] = useState(false);
                return (
                  <div key={i} ref={ref}
                    className={`transition-all duration-700 ease-out ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                    style={{ transitionDelay: inView ? `${i * 120}ms` : '0ms' }}>
                    <div
                      className={`rounded-2xl bg-white/5 border border-white/10 overflow-hidden h-full transition-all duration-500
                                  ${hovered ? 'bg-white/10 border-blue-500/40 -translate-y-1 shadow-2xl' : ''}`}
                      onMouseEnter={() => setHovered(true)}
                      onMouseLeave={() => setHovered(false)}
                    >
                      {/* phone mockup panel */}
                      <div className="flex justify-center items-center py-8 px-4 bg-white/[0.03]">
                        <div className={`transition-all duration-500 ${hovered ? '-translate-y-1 scale-[1.02]' : ''}`}>
                          {step.visual}
                        </div>
                      </div>

                      {/* text body */}
                      <div className="p-6">
                        {/* step number + label */}
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center text-white font-black text-sm flex-shrink-0">
                            {step.n}
                          </div>
                          <span className="text-white/30 text-[10px] font-bold uppercase tracking-widest">{step.label}</span>
                        </div>
                        {/* gradient bar */}
                        <div className={`h-[2px] rounded-full bg-gradient-to-r ${step.gradient} transition-all duration-500 mb-4 ${hovered ? 'w-12' : 'w-5'}`} />
                        {/* icon */}
                        <div className={`w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center mb-3 transition-all duration-300 ${hovered ? 'bg-blue-500/30 scale-110' : ''}`}>
                          <step.Icon size={18} className="text-blue-400" />
                        </div>
                        <h3 className="text-xl font-black text-white mb-2 leading-tight">{step.title}</h3>
                        <p className="text-white/40 text-sm leading-relaxed">{step.desc}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ══ SERVICE CARDS ══════════════════════════════════════════════════ */}
      <section className="py-16 lg:py-20 bg-gray-50">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <Reveal direction="up">
              <div className="mb-10 lg:mb-12">
                <h2 className="text-4xl lg:text-5xl font-black text-gray-900 mb-3">Our Services</h2>
                <p className="text-gray-500 text-lg">Everything you need when every second counts.</p>
              </div>
            </Reveal>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-6">
              {cards.map((card, i) => {
                const { ref, inView } = useInView(0.08);
                const [hovered, setHovered] = useState(false);
                return (
                  <div key={i} ref={ref}
                    className={`transition-all duration-700 ease-out ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                    style={{ transitionDelay: inView ? `${i * 120}ms` : '0ms' }}>
                    <div
                      className={`rounded-2xl overflow-hidden transition-all duration-500 cursor-pointer
                                  ${hovered ? 'shadow-2xl -translate-y-1' : 'shadow-md'}`}
                      onMouseEnter={() => setHovered(true)}
                      onMouseLeave={() => setHovered(false)}
                    >
                      {/* visual panel */}
                      <div className={`relative h-56 bg-gradient-to-br ${card.gradient} overflow-hidden`}>
                        {/* glow */}
                        <div className={`absolute w-64 h-64 rounded-full ${card.glow} blur-3xl -top-10 -right-10`} />
                        {/* decorative rings */}
                        <div className="absolute w-48 h-48 rounded-full border border-white/5 -bottom-10 -left-10" />
                        <div className="absolute w-32 h-32 rounded-full border border-white/5 top-4 right-4" />
                        {/* icon */}
                        <div className="absolute top-7 left-7">
                          <div className="w-16 h-16 rounded-2xl bg-white/10 border border-white/15 flex items-center justify-center text-3xl
                                          transition-all duration-500"
                               style={{ transform: hovered ? 'scale(1.1) rotate(-5deg)' : 'scale(1)' }}>
                            {card.icon}
                          </div>
                        </div>
                        {/* pill */}
                        <div className="absolute top-7 right-7">
                          <span className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider
                                           bg-white/10 border border-white/20 text-white/80 rounded-full backdrop-blur-md">
                            {card.pill}
                          </span>
                        </div>
                        {/* stat */}
                        <div className="absolute bottom-5 right-5 bg-black/40 border border-white/10 backdrop-blur-md rounded-xl px-4 py-2.5 text-right">
                          <div className="text-2xl font-black text-white">{card.stat.n}</div>
                          <div className="text-[10px] text-white/40 font-semibold uppercase tracking-wider mt-0.5">{card.stat.l}</div>
                        </div>
                      </div>

                      {/* body */}
                      <div className="bg-[#0f172a] p-6 lg:p-8">
                        <div className={`h-[2px] rounded-full bg-gradient-to-r from-blue-500 to-blue-300 transition-all duration-500 mb-4 ${hovered ? 'w-12' : 'w-5'}`} />
                        <h3 className="text-2xl font-black text-white mb-2">{card.title}</h3>
                        <p className="text-white/40 text-sm leading-relaxed">{card.desc}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ══ CTA ═══════════════════════════════════════════════════════════ */}
      <section className="py-20 lg:py-28 bg-[#0f172a]">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <Reveal direction="fade">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-widest
                             bg-orange-500/15 border border-orange-500/30 text-orange-400 mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-orange-400 animate-pulse" />
              Always Ready
            </span>
          </Reveal>
          <Reveal direction="up" delay={100}>
            <h2 className="text-4xl lg:text-6xl font-black text-white mb-4 leading-tight">
              Every second{' '}
              <span className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
                counts
              </span>
            </h2>
          </Reveal>
          <Reveal direction="up" delay={200}>
            <p className="text-white/50 text-lg max-w-lg mx-auto mb-10 leading-relaxed">
              Don't wait. Get help for your pet immediately — island-wide, around the clock.
            </p>
          </Reveal>
          <Reveal direction="up" delay={300}>
            <div className="flex flex-wrap gap-4 justify-center mb-14">
              <a href="tel:+94771234567"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-blue-600 text-white text-sm font-black uppercase tracking-widest
                           hover:bg-blue-500 transition-colors duration-300 shadow-lg shadow-blue-500/30">
                <Phone size={15} /> +94 77 123 4567
              </a>
              <a href="#steps"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-white/10 border border-white/20 text-white text-sm font-black uppercase tracking-widest
                           hover:bg-white/20 transition-colors duration-300">
                View Instructions
              </a>
            </div>
          </Reveal>
          <Reveal direction="fade" delay={400}>
            <div className="flex flex-wrap justify-center gap-8 text-white/30 text-sm">
              <div className="flex items-center gap-2"><MapPin size={15} /><span>Colombo, Sri Lanka</span></div>
              <div className="flex items-center gap-2"><Clock size={15} /><span>24/7 Emergency Support</span></div>
              <div className="flex items-center gap-2"><Shield size={15} /><span>Island-wide Coverage</span></div>
            </div>
          </Reveal>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default EmergencyResponse;