import React, { useEffect, useState, useRef } from 'react';
import { ArrowRight, MapPin, Clock, Navigation, Wifi, Users, Zap } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Town1 from '../assets/town.jpg';
import townImg        from '../assets/Bus Img.png';
import catchingBusImg from '../assets/Bus stop1.png';
import workImg        from '../assets/work.jpg';
import cityImg        from '../assets/Bus stop2.png';
import GoogleMap1     from '../assets/Google-Map1.jpeg';
import GoogleMap2     from '../assets/Google-Map2.jpeg';

/* ─── Hooks ─── */
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

function useParallax(strength = 0.14) {
  const ref = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(0);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const calc = () => {
      const rect = el.getBoundingClientRect();
      setOffset((rect.top + rect.height / 2 - window.innerHeight / 2) * strength);
    };
    window.addEventListener('scroll', calc, { passive: true });
    calc();
    return () => window.removeEventListener('scroll', calc);
  }, [strength]);
  return { ref, offset };
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

interface ParallaxImgProps {
  src: string; alt: string; strength?: number;
  wrapperClassName?: string; imgClassName?: string;
}
const ParallaxImg: React.FC<ParallaxImgProps> = ({ src, alt, strength = 0.12, wrapperClassName = '', imgClassName = '' }) => {
  const { ref, offset } = useParallax(strength);
  return (
    <div ref={ref} className={`overflow-hidden ${wrapperClassName}`}>
      <img src={src} alt={alt} className={`will-change-transform ${imgClassName}`}
        style={{ transform: `translateY(${offset}px)` }} />
    </div>
  );
};

/* ─── Animated Bus Scene ─── */
const AnimatedBusScene: React.FC = () => {
  return (
    <div className="relative w-full h-full bg-gradient-to-b from-[#0f172a] via-[#1e3a5f] to-[#1a3a5c] overflow-hidden">

      {/* Stars */}
      {[...Array(18)].map((_, i) => (
        <div key={i} className="absolute rounded-full bg-white"
          style={{
            width: i % 3 === 0 ? '2px' : '1px',
            height: i % 3 === 0 ? '2px' : '1px',
            top: `${8 + (i * 17) % 45}%`,
            left: `${(i * 23) % 95}%`,
            opacity: 0.4 + (i % 4) * 0.15,
            animation: `starPulse ${2 + (i % 3)}s ease-in-out infinite`,
            animationDelay: `${(i * 0.3) % 2}s`,
          }} />
      ))}

      {/* Moon */}
      <div className="absolute top-4 right-8 w-8 h-8 rounded-full bg-blue-100"
        style={{ boxShadow: '0 0 16px 4px rgba(147,197,253,0.3)' }} />

      {/* City skyline */}
      <div className="absolute bottom-[52px] left-0 right-0 flex items-end gap-1 px-2">
        {[22,34,26,42,24,36,18,30,38,22,32].map((h, i) => (
          <div key={i} className="flex-1 rounded-t-sm"
            style={{
              height: `${h}px`,
              backgroundColor: i % 3 === 0 ? '#1e3a5f' : i % 3 === 1 ? '#1a3050' : '#172844',
            }}>
            <div className="grid grid-cols-2 gap-px p-px mt-1">
              {Array.from({ length: Math.max(2, Math.floor(h / 8)) }).map((_, wi) => (
                <div key={wi} className="h-1 rounded-sm"
                  style={{
                    backgroundColor: (i + wi) % 3 === 0 ? '#60a5fa' : (i + wi) % 3 === 1 ? '#fde68a' : 'transparent',
                    opacity: 0.7,
                  }} />
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Road */}
      <div className="absolute bottom-0 left-0 right-0 h-[52px] bg-[#0d1b2e]">
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: 'repeating-linear-gradient(90deg, transparent, transparent 8px, rgba(255,255,255,0.3) 8px, rgba(255,255,255,0.3) 9px)' }} />
        <div className="absolute top-1/2 left-0 right-0 h-[3px] -translate-y-1/2 overflow-hidden">
          <div className="h-full"
            style={{
              background: 'repeating-linear-gradient(90deg, #60a5fa 0px, #60a5fa 24px, transparent 24px, transparent 48px)',
              animation: 'roadDash 0.6s linear infinite',
            }} />
        </div>
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-blue-900/60" />
      </div>

      {/* Bus */}
      <div className="absolute"
        style={{ bottom: '16px', animation: 'busRide 4s linear infinite', willChange: 'transform' }}>
        <div className="relative" style={{ width: '88px', height: '44px' }}>
          <div className="absolute inset-0 rounded-lg bg-blue-600 shadow-xl" style={{ boxShadow: '0 0 20px 6px rgba(37,99,235,0.4)' }} />
          <div className="absolute top-0 left-3 right-3 h-2 rounded-t-md bg-blue-500" />
          <div className="absolute top-3 left-3 right-3 flex gap-1">
            {[1,2,3,4].map(w => (
              <div key={w} className="flex-1 h-6 rounded-sm bg-blue-200 border border-blue-400"
                style={{ boxShadow: 'inset 0 1px 2px rgba(255,255,255,0.5)' }} />
            ))}
          </div>
          <div className="absolute bottom-2 right-3 w-5 h-7 rounded-sm bg-blue-400 border border-blue-300" />
          <div className="absolute top-2 left-0 w-4 h-8 rounded-l-md bg-blue-500 flex flex-col items-center justify-between py-1">
            <div className="w-2.5 h-1.5 rounded-sm bg-yellow-300" />
            <div className="w-2.5 h-3 rounded-sm bg-blue-200 border border-blue-300" />
          </div>
          <div className="absolute bottom-0 left-2 right-2 h-2 bg-blue-900 rounded-b-md" />
          <div className="absolute -bottom-2 left-8 w-7 h-7 rounded-full bg-gray-900 border-2 border-blue-800 flex items-center justify-center"
            style={{ animation: 'spin 0.5s linear infinite' }}>
            <div className="w-2.5 h-2.5 rounded-full bg-blue-400" />
          </div>
          <div className="absolute -bottom-2 right-6 w-7 h-7 rounded-full bg-gray-900 border-2 border-blue-800 flex items-center justify-center"
            style={{ animation: 'spin 0.5s linear infinite' }}>
            <div className="w-2.5 h-2.5 rounded-full bg-blue-400" />
          </div>
          <div className="absolute top-4 -left-2 w-3 h-2 rounded-full bg-blue-200 opacity-90"
            style={{ boxShadow: '0 0 12px 5px rgba(147,197,253,0.7)', animation: 'headlightPulse 1.5s ease-in-out infinite' }} />
          <div className="absolute top-1 left-5 right-8 h-2 rounded-sm bg-blue-900 flex items-center justify-center overflow-hidden">
            <span className="text-blue-300 font-bold" style={{ fontSize: '5px', letterSpacing: '0.5px' }}>CITY CENTER</span>
          </div>
        </div>
      </div>

      {/* Trees */}
      <div className="absolute bottom-[52px] left-4"
        style={{ animation: 'treeScroll 3s linear infinite' }}>
        {[0, 120, 240, 360].map((offset, i) => (
          <div key={i} className="absolute flex flex-col items-center" style={{ left: `${offset}px`, bottom: 0 }}>
            <div className="w-5 h-7 rounded-full bg-blue-900 opacity-80" />
            <div className="w-1.5 h-3 bg-blue-950 opacity-80" />
          </div>
        ))}
      </div>

      <style>{`
        @keyframes busRide {
          0%   { transform: translateX(-110px); }
          100% { transform: translateX(420px); }
        }
        @keyframes roadDash {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-48px); }
        }
        @keyframes treeScroll {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-120px); }
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @keyframes headlightPulse {
          0%, 100% { opacity: 0.9; }
          50%       { opacity: 0.4; }
        }
        @keyframes starPulse {
          0%, 100% { opacity: 0.4; }
          50%       { opacity: 1; }
        }
      `}</style>
    </div>
  );
};

/* ─── Feature Card ─── */
interface Feature {
  title: string;
  desc: string;
  Icon: React.FC<{ size?: number; className?: string }>;
  tag: string;
  image?: string;
  animated?: boolean;
}

const FeatureCard: React.FC<{ item: Feature; index: number }> = ({ item, index }) => {
  const { ref, inView } = useInView(0.08);
  const [hovered, setHovered] = useState(false);
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
      style={{ transitionDelay: inView ? `${index * 110}ms` : '0ms' }}
    >
      <div
        className={`rounded-2xl overflow-hidden bg-gray-50 transition-all duration-500 cursor-default
                    ${hovered ? 'shadow-2xl -translate-y-1' : 'shadow-sm'}`}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <div className="relative overflow-hidden" style={{ height: '180px' }}>
          {item.animated ? (
            <AnimatedBusScene />
          ) : item.image ? (
            <img
              src={item.image}
              alt={item.title}
              className={`w-full h-full object-cover transition-transform duration-700 ${hovered ? 'scale-[1.06]' : 'scale-100'}`}
            />
          ) : null}
          <div className="absolute bottom-3 left-3 z-10">
            <span className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider
                             bg-white/20 backdrop-blur-md text-white rounded-full border border-white/30">
              {item.tag}
            </span>
          </div>
        </div>
        <div className="p-5 lg:p-6">
          <div className={`h-[2px] rounded-full bg-gradient-to-r from-blue-600 to-blue-400
                           transition-all duration-500 mb-3 ${hovered ? 'w-12' : 'w-5'}`} />
          <h3 className="text-xl font-black text-gray-900 mb-2">{item.title}</h3>
          <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
        </div>
      </div>
    </div>
  );
};

/* ═══════════════════════════════════════
   PAGE
═══════════════════════════════════════ */
const CityBusPage: React.FC = () => {
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

  const features: Feature[] = [
    {
      title: 'Reads Your Location',
      desc: 'The app securely reads your location and finds the nearest bus stop instantly.',
      Icon: MapPin, tag: 'Location', image: GoogleMap1,
    },
    {
      title: 'Locate Your Bus',
      desc: 'The app precisely maps the buses around you. Pick your route, get ready for the journey.',
      Icon: Navigation, tag: 'Navigate', image: GoogleMap2,
    },
    {
      title: 'On Time, Every Time',
      desc: 'Precisely know the arrival time, plan your journey ahead, and always travel safe.',
      Icon: Clock, tag: 'Timing', animated: true,
    },
  ];

  const stats = [
    { n: '2M+',  l: 'Daily Riders' },
    { n: '500+', l: 'Bus Routes' },
    { n: '24/7', l: 'Live Tracking' },
    { n: '99%',  l: 'On-Time Rate' },
  ];

  const networkFeatures = [
    { Icon: Wifi,  label: 'Live GPS Tracking' },
    { Icon: Zap,   label: 'Real-time Updates' },
    { Icon: Users, label: 'Millions of Riders' },
    { Icon: Clock, label: '24/7 Operations' },
  ];

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <Navbar />

      {/* ══ HERO ══════════════════════════════════════════════════════════ */}
      <header className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url(${Town1})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            transform: `scale(1.12) translateY(${heroScrollY * 0.3}px)`,
            filter: 'saturate(1.05) contrast(1.02)',
            willChange: 'transform',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/40 to-black/80" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />

        <div className="relative z-10 text-center px-4 lg:px-8 max-w-6xl mx-auto">
          <h1
            className={`text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-0 leading-tight
                        transition-all duration-700 ease-out ${heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
            style={{ transitionDelay: '220ms' }}
          >
            Travel on time.{' '}
            <span className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
              Travel safe.
            </span>
          </h1>
        </div>
      </header>

      {/* ══ STATS BAR ═════════════════════════════════════════════════════ */}
      <section className="py-14 lg:py-16 bg-white border-b border-gray-100">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((s, i) => (
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

      {/* ══ FEATURES GRID ═════════════════════════════════════════════════ */}
      <section id="features" className="py-16 lg:py-20 bg-white">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <Reveal direction="up">
              <div className="mb-10 lg:mb-12">
                <h2 className="text-5xl lg:text-6xl font-black text-gray-900 mb-3">How it works</h2>
                <p className="text-gray-500 text-lg max-w-2xl">
                  Three simple steps to get from where you are to where you need to be.
                </p>
              </div>
            </Reveal>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6">
              {features.map((item, i) => (
                <FeatureCard key={i} item={item} index={i} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══ NETWORK ═══════════════════════════════════════════════════════ */}
      <section className="py-14 lg:py-20 bg-white">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <Reveal direction="left">
              <div className="relative">
                <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                  <ParallaxImg src={townImg} alt="City network" strength={0.11}
                    wrapperClassName="aspect-[4/3] lg:h-[600px]"
                    imgClassName="w-full h-[120%] object-cover -mt-[10%]" />
                  <div className="absolute inset-0 bg-gradient-to-tr from-black/20 to-transparent" />
                </div>
                <div className="absolute -bottom-5 right-4 lg:right-8 bg-white rounded-2xl shadow-xl p-5 border border-gray-100">
                  <div className="text-3xl font-black text-blue-600">500+</div>
                  <div className="text-xs text-gray-400 font-semibold uppercase tracking-wider mt-0.5">Bus Routes</div>
                </div>
              </div>
            </Reveal>

            <Reveal direction="right" delay={220}>
              <div className="relative lg:-ml-32">
                <div className="bg-white rounded-3xl p-8 lg:p-12 shadow-2xl">
                  <span className="text-blue-600 font-black text-sm tracking-widest uppercase block mb-6">
                    Up &amp; Running
                  </span>
                  <h2 className="text-5xl lg:text-7xl font-black text-gray-900 mb-8 leading-tight">
                    The entire network
                  </h2>
                  <p className="text-lg lg:text-xl text-gray-600 mb-8 leading-relaxed">
                    The entire network serving you and millions more — day and night. Every route, every stop, every departure time available in real time.
                  </p>
                  <div className="grid grid-cols-2 gap-3 mb-10">
                    {networkFeatures.map((f, i) => (
                      <div key={i} className="flex items-center gap-2 text-sm text-gray-600 font-medium">
                        <div className="w-7 h-7 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center flex-shrink-0">
                          <f.Icon size={14} className="text-blue-600" />
                        </div>
                        {f.label}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ══ PASSION FOR ENGINEERING (horizontal scroll — same as Home mission) ══ */}
      <section id="engineering" className="py-14 lg:py-20 bg-white overflow-hidden">
        <div className="px-4 lg:px-8 mb-8 lg:mb-12">
          <Reveal direction="up">
            <div className="max-w-7xl mx-auto">
              <h2 className="text-5xl lg:text-6xl font-black text-gray-900 mb-3">Passion for engineering</h2>
            </div>
          </Reveal>
        </div>

        <div className="flex gap-4 overflow-x-auto pb-4 px-4 lg:px-8 snap-x snap-mandatory"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>

          {/* Text intro card */}
          <Reveal direction="left">
            <div className="snap-start flex-shrink-0 w-[480px] lg:w-[560px] bg-gray-50 rounded-3xl p-10 lg:p-12 flex flex-col justify-between"
              style={{ minHeight: '480px' }}>
              <div>
                <span className="text-blue-600 font-black text-xs tracking-widest uppercase block mb-5">
                  Our Philosophy
                </span>
                <h3 className="text-2xl lg:text-3xl font-black text-gray-900 mb-5 leading-tight">
                  Engineering that moves the world
                </h3>
                <p className="text-gray-500 text-base leading-relaxed mb-8">
                  Engineering is more than systems and code — it's the drive to build, solve, and create what moves the world forward. We obsess over every millisecond, every route, every rider.
                </p>
              </div>
              <a href="/about"
                className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-gray-900 hover:gap-3 transition-all duration-300">
                Read more <ArrowRight size={13} />
              </a>
            </div>
          </Reveal>

          {/* Stat panels */}
          {[
            { n: '2M+',   l: 'Daily Riders',  desc: 'Millions rely on our platform every single day across the island.' },
            { n: '< 2s',  l: 'Update Speed',  desc: 'Real-time data pushed to riders in under two seconds, always.' },
            { n: '500+',  l: 'Routes Mapped', desc: 'Every route, every stop — fully mapped and live.' },
            { n: '99.9%', l: 'Uptime',        desc: 'Built for reliability. Our infrastructure never sleeps.' },
          ].map((panel, i) => (
            <Reveal key={i} direction="up" delay={i * 80}>
              <div className="snap-start flex-shrink-0 rounded-3xl bg-[#0f172a] border border-white/5 flex flex-col justify-between p-8"
                style={{ width: '260px', minHeight: '480px' }}>
                <div>
                  <div className="text-5xl font-black text-white mb-2">{panel.n}</div>
                  <div className="text-xs font-black uppercase tracking-widest text-blue-400 mb-4">{panel.l}</div>
                  <div className="h-[2px] rounded-full bg-gradient-to-r from-blue-500 to-blue-300 w-8 mb-5" />
                  <p className="text-white/40 text-sm leading-relaxed">{panel.desc}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <style>{`
          #engineering div::-webkit-scrollbar { display: none; }
        `}</style>
      </section>

      {/* ══ STORIES ═══════════════════════════════════════════════════════ */}
      <section id="stories" className="pt-14 lg:pt-20 pb-20 lg:pb-28 bg-gray-50">
        <div className="container mx-auto px-4 lg:px-8">
          <Reveal direction="up">
            <div className="mb-10 lg:mb-14">
              <h4 className="text-4xl lg:text-5xl font-black text-gray-900 mb-4">Stories that tell the tale</h4>
              <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-blue-400 rounded-full" />
            </div>
          </Reveal>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 auto-rows-[220px] lg:auto-rows-[280px]">
            <Reveal direction="up" delay={0} className="lg:row-span-2">
              <div className="relative w-full h-full rounded-2xl lg:rounded-3xl overflow-hidden group cursor-default">
                <div className="absolute inset-0 overflow-hidden">
                  <ParallaxImg src={catchingBusImg} alt="Catching the last bus" strength={0.07}
                    wrapperClassName="w-full h-full"
                    imgClassName="w-full h-[118%] object-cover -mt-[9%] group-hover:scale-[1.03] transition-transform duration-700" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent group-hover:from-black/90 transition-all duration-500" />
                <div className="absolute inset-0 p-6 lg:p-8 flex flex-col justify-end">
                  <span className="text-white/60 text-xs font-semibold uppercase tracking-widest mb-2">Story · Late Night</span>
                  <h3 className="text-white font-semibold text-xl lg:text-2xl">
                    Catching the last bus home — how artecx helped a nurse still get home on time
                  </h3>
                </div>
              </div>
            </Reveal>

            <Reveal direction="up" delay={100}>
              <div className="relative w-full h-full rounded-2xl lg:rounded-3xl overflow-hidden group cursor-default">
                <div className="absolute inset-0 overflow-hidden">
                  <ParallaxImg src={workImg} alt="Travel to work" strength={0.07}
                    wrapperClassName="w-full h-full"
                    imgClassName="w-full h-[118%] object-cover -mt-[9%] group-hover:scale-[1.03] transition-transform duration-700" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent group-hover:from-black/90 transition-all duration-500" />
                <div className="absolute inset-0 p-6 lg:p-8 flex flex-col justify-end">
                  <span className="text-white/60 text-xs font-semibold uppercase tracking-widest mb-2">Commute</span>
                  <h3 className="text-white font-semibold text-lg">
                    From campus to city — knowing exactly when the next bus arrives
                  </h3>
                </div>
              </div>
            </Reveal>

            <Reveal direction="up" delay={200} className="lg:col-span-1">
              <div className="relative w-full h-full rounded-2xl lg:rounded-3xl overflow-hidden group cursor-default">
                <div className="absolute inset-0 overflow-hidden">
                  <ParallaxImg src={cityImg} alt="Weekend in the city" strength={0.07}
                    wrapperClassName="w-full h-full"
                    imgClassName="w-full h-[118%] object-cover -mt-[9%] group-hover:scale-[1.03] transition-transform duration-700" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent group-hover:from-black/90 transition-all duration-500" />
                <div className="absolute inset-0 p-6 lg:p-8 flex flex-col justify-end">
                  <span className="text-white/60 text-xs font-semibold uppercase tracking-widest mb-2">Explore</span>
                  <h3 className="text-white font-semibold text-lg">
                    Weekend in the city — exploring becomes easier when you see the whole network
                  </h3>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ══ CTA ═══════════════════════════════════════════════════════════ */}
      <section className="pt-28 lg:pt-36 pb-20 lg:pb-28 bg-[#0f172a]">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <Reveal direction="fade">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-widest
                             bg-white/10 border border-white/20 text-white/70 mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
              City Bus · Artecx
            </span>
          </Reveal>
          <Reveal direction="up" delay={100}>
            <h2 className="text-4xl lg:text-6xl font-black text-white mb-4 leading-tight">
              Ready to ride{' '}
              <span className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
                smarter?
              </span>
            </h2>
          </Reveal>
          <Reveal direction="up" delay={200}>
            <p className="text-white/50 text-lg max-w-lg mx-auto mb-10 leading-relaxed">
              Join millions of riders who never miss a bus. Real-time tracking, live routes, and a network that never sleeps.
            </p>
          </Reveal>
          <Reveal direction="up" delay={300}>
            <div className="flex flex-wrap gap-4 justify-center">
              <a href="/#contact"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-blue-600 text-white text-sm font-black uppercase tracking-widest
                           hover:bg-blue-500 transition-colors duration-300 shadow-lg shadow-blue-500/30">
                Get in touch <ArrowRight size={14} />
              </a>
              <a href="/about"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-white/10 border border-white/20 text-white text-sm font-black uppercase tracking-widest
                           hover:bg-white/20 transition-colors duration-300">
                Learn about us
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default CityBusPage;