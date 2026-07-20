import React, { useState, useEffect, useRef } from 'react';
import {
  Compass, Users, Lightbulb, Zap, Heart, Globe,
  MapPin, Clock, ArrowRight, Code, Palette, Briefcase, Megaphone, Search
} from 'lucide-react';
import lifeAtArtecXImg1 from "../assets/careerPage/lifeAtArtecx/careeer1.jpeg";
import lifeAtArtecXImg2 from "../assets/careerPage/lifeAtArtecx/career2.jpeg";
import lifeAtArtecXImg3 from "../assets/careerPage/lifeAtArtecx/career3.jpg";
import lifeAtArtecXImg4 from "../assets/careerPage/lifeAtArtecx/career4.jpeg";
import Navbar from '../components/Navbar';
import { NavHashLink } from 'react-router-hash-link';
import Footer from '../components/Footer';

/* ─── Hooks (identical to HomePage) ─── */
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

interface Role {
  title: string;
  category: string;
  location: string;
  type: string;
}

/* ═══════════════════════════════════════
   PAGE
═══════════════════════════════════════ */
const CareersPage: React.FC = () => {
  const [heroVisible, setHeroVisible] = useState(false);
  const [activeFilter, setActiveFilter] = useState('All');
  const [rolesKey, setRolesKey] = useState(0);

  useEffect(() => {
    const t = setTimeout(() => setHeroVisible(true), 80);
    return () => clearTimeout(t);
  }, []);

  const handleFilter = (cat: string) => {
    setActiveFilter(cat);
    setRolesKey(k => k + 1);
  };

  const values = [
    { Icon: Compass,   title: 'Craft over shortcuts', desc: 'We take the time to do things right. Quality is non-negotiable in everything we ship.',             gradient: 'from-blue-600 to-blue-400' },
    { Icon: Users,     title: 'People first',          desc: 'We believe great work comes from teams that feel safe, heard and empowered.',                      gradient: 'from-blue-600 to-cyan-500' },
    { Icon: Lightbulb, title: 'Stay curious',          desc: 'We question assumptions, explore new tools, and never stop learning from the world around us.',    gradient: 'from-blue-500 to-blue-300' },
    { Icon: Zap,       title: 'Bias toward action',    desc: "We ship, learn, iterate. Progress beats perfection when you're building for real people.",          gradient: 'from-blue-700 to-blue-500' },
    { Icon: Heart,     title: 'Empathy is design',     desc: 'Every pixel, every line of code — built with the end user\'s feelings and needs in mind.',         gradient: 'from-blue-500 to-cyan-400' },
    { Icon: Globe,     title: 'Think global',          desc: 'We design for scale, accessibility, and inclusion from day one, not as an afterthought.',           gradient: 'from-blue-600 to-blue-400' },
  ];

  const benefits = [
    { icon: '🏡', title: 'Remote-first',    desc: 'Work from anywhere. We trust you to do great work on your terms.' },
    { icon: '💰', title: 'Competitive pay', desc: 'Top-of-market salaries with transparent compensation bands.' },
    { icon: '📈', title: 'Equity',          desc: 'Meaningful stock options so you share in what we build.' },
    { icon: '✈️', title: 'Team retreats',   desc: 'Twice a year we get together somewhere amazing to connect IRL.' },
  ];

  const roles: Role[] = [];
  const categories = ['All', 'Design', 'Engineering', 'Product', 'Marketing'];
  const filteredRoles = activeFilter === 'All' ? roles : roles.filter(r => r.category === activeFilter);

  const getCategoryIcon = (cat: string) => {
    if (cat === 'Design')      return <Palette size={14} />;
    if (cat === 'Engineering') return <Code size={14} />;
    if (cat === 'Product')     return <Briefcase size={14} />;
    return <Megaphone size={14} />;
  };

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <Navbar />

      {/* ══ HERO ══════════════════════════════════════════════════════════ */}
      <header className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0f172a]">
        {/* decorative rings */}
        <div className="absolute top-0 right-0 w-[700px] h-[700px] rounded-full border border-white/5 -translate-y-1/3 translate-x-1/3 pointer-events-none" />
        <div className="absolute top-0 right-0 w-[450px] h-[450px] rounded-full border border-white/5 -translate-y-1/4 translate-x-1/4 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2 pointer-events-none" />
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '40px 40px' }}
        />

        <div className="relative z-10 text-center px-4 lg:px-8 max-w-5xl mx-auto">
          <div
            className={`mb-6 transition-all duration-500 ease-out ${heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-3'}`}
            style={{ transitionDelay: '100ms' }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-widest
                             bg-white/10 backdrop-blur-md border border-white/20 text-white/80">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
              We're Hiring
            </span>
          </div>

          <h1
            className={`text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-black text-white mb-6 leading-tight
                        transition-all duration-700 ease-out ${heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
            style={{ transitionDelay: '200ms' }}
          >
            Build the{' '}
            <span className="bg-gradient-to-r from-blue-400 to-purple-300 bg-clip-text text-transparent">
              future
            </span>{' '}
            with us
          </h1>

          <p
            className={`text-lg lg:text-xl text-white/50 max-w-2xl mx-auto mb-10 leading-relaxed
                        transition-all duration-700 ease-out ${heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
            style={{ transitionDelay: '340ms' }}
          >
            Join a team of designers, engineers, and strategists who care deeply about craft, impact, and each other.
          </p>

          <div
            className={`flex flex-wrap gap-4 justify-center transition-all duration-700 ease-out ${heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
            style={{ transitionDelay: '460ms' }}
          >
            <a href="#openRoles"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-white text-gray-900 text-sm font-black uppercase tracking-widest
                         hover:bg-gray-100 transition-colors duration-300 shadow-lg">
              View open roles <ArrowRight size={14} />
            </a>
            <a href="#values"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-white/10 border border-white/20 text-white text-sm font-black uppercase tracking-widest
                         hover:bg-white/20 transition-colors duration-300">
              Our values
            </a>
          </div>
        </div>
      </header>

      {/* ══ STATS BAR ═════════════════════════════════════════════════════ */}
      <section className="py-14 lg:py-16 bg-white border-b border-gray-100">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { n: '30+',    l: 'Team Members' },
              { n: '15',     l: 'Countries' },
              { n: 'Remote', l: 'First Culture' },
              { n: '100%',   l: 'Ownership Mindset' },
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

      {/* ══ VALUES — dark section ══════════════════════════════════════════ */}
      <section id="values" className="py-16 lg:py-20 bg-[#0f172a]">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <Reveal direction="up">
              <div className="mb-10 lg:mb-12">
                <span className="text-blue-400 font-black text-sm tracking-widest uppercase block mb-3">Who we are</span>
                <h2 className="text-4xl lg:text-5xl font-black text-white mb-3">What we believe in</h2>
                <p className="text-white/50 text-lg max-w-2xl">Our values shape how we work, build, and grow together.</p>
              </div>
            </Reveal>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
              {values.map((v, i) => {
                const { ref, inView } = useInView(0.08);
                const [hovered, setHovered] = useState(false);
                return (
                  <div key={v.title} ref={ref}
                    className={`transition-all duration-700 ease-out ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                    style={{ transitionDelay: inView ? `${i * 110}ms` : '0ms' }}>
                    <div
                      className={`rounded-2xl bg-white/5 border border-white/10 p-6 lg:p-7 h-full transition-all duration-500 cursor-default
                                  ${hovered ? 'bg-white/10 border-blue-500/40 -translate-y-1 shadow-2xl' : ''}`}
                      onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
                      <div className={`w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center mb-4 transition-all duration-300 ${hovered ? 'scale-110 bg-blue-500/30' : ''}`}>
                        <v.Icon size={22} className="text-blue-400" strokeWidth={2.5} />
                      </div>
                      <div className={`h-[2px] rounded-full bg-gradient-to-r ${v.gradient} transition-all duration-500 mb-4 ${hovered ? 'w-12' : 'w-5'}`} />
                      <h3 className="text-xl font-black text-white mb-2">{v.title}</h3>
                      <p className="text-white/40 text-sm leading-relaxed">{v.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ══ BENEFITS ══════════════════════════════════════════════════════ */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <Reveal direction="up">
              <div className="mb-10 lg:mb-12">
                <h2 className="text-4xl lg:text-5xl font-black text-gray-900 mb-3">Why you'll love it here</h2>
                <p className="text-gray-500 text-lg max-w-2xl">Benefits that actually matter to your life and career.</p>
              </div>
            </Reveal>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
              {benefits.map((b, i) => {
                const { ref, inView } = useInView(0.08);
                const [hovered, setHovered] = useState(false);
                return (
                  <div key={b.title} ref={ref}
                    className={`transition-all duration-700 ease-out ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                    style={{ transitionDelay: inView ? `${i * 110}ms` : '0ms' }}>
                    <div
                      className={`rounded-2xl bg-gray-50 p-6 lg:p-7 h-full transition-all duration-500 cursor-default
                                  ${hovered ? 'shadow-2xl -translate-y-1' : 'shadow-sm'}`}
                      onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
                      <div className="text-4xl mb-5">{b.icon}</div>
                      <div className={`h-[2px] rounded-full bg-gradient-to-r from-blue-600 to-blue-400 transition-all duration-500 mb-4 ${hovered ? 'w-12' : 'w-5'}`} />
                      <h3 className="text-xl font-black text-gray-900 mb-2">{b.title}</h3>
                      <p className="text-gray-400 text-sm leading-relaxed">{b.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ══ OPEN ROLES ════════════════════════════════════════════════════ */}
      <section id="openRoles" className="py-16 lg:py-20 bg-gray-50">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <Reveal direction="up">
              <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-10 gap-6">
                <div>
                  <h2 className="text-4xl lg:text-5xl font-black text-gray-900 mb-2">Open roles</h2>
                  <p className="text-gray-500 text-lg">Find your fit. Apply in under 5 minutes.</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {categories.map(cat => (
                    <button key={cat} onClick={() => handleFilter(cat)}
                      className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 border ${
                        activeFilter === cat
                          ? 'bg-blue-600 text-white border-blue-600 scale-105'
                          : 'bg-white text-gray-500 border-gray-200 hover:border-blue-300 hover:text-blue-600'
                      }`}>
                      {cat}
                    </button>
                  ))}
                </div>
              </div>
            </Reveal>

            <div key={rolesKey} className="space-y-4">
              {filteredRoles.length > 0 ? (
                filteredRoles.map((role, idx) => {
                  const { ref, inView } = useInView(0.05);
                  return (
                    <div key={idx} ref={ref}
                      className={`transition-all duration-700 ease-out ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                      style={{ transitionDelay: inView ? `${idx * 80}ms` : '0ms' }}>
                      <div className="group flex items-center justify-between p-5 lg:p-6 bg-white rounded-2xl border border-gray-100 shadow-sm
                                      hover:shadow-lg hover:-translate-y-0.5 hover:border-blue-100 transition-all duration-300 cursor-pointer">
                        <div className="space-y-2 pr-4">
                          <h3 className="text-lg lg:text-xl font-black text-gray-900 leading-tight group-hover:text-blue-600 transition-colors duration-300">
                            {role.title}
                          </h3>
                          <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-gray-400 text-xs">
                            <span className="flex items-center gap-1.5">{getCategoryIcon(role.category)} {role.category}</span>
                            <span className="flex items-center gap-1.5"><MapPin size={12} /> {role.location}</span>
                            <span className="flex items-center gap-1.5"><Clock size={12} /> {role.type}</span>
                          </div>
                        </div>
                        <div className="shrink-0 w-10 h-10 lg:w-12 lg:h-12 rounded-full border border-gray-200 flex items-center justify-center
                                        group-hover:bg-blue-600 group-hover:border-blue-600 group-hover:shadow-lg group-hover:shadow-blue-500/30 transition-all duration-300">
                          <ArrowRight size={16} className="text-gray-400 group-hover:text-white group-hover:translate-x-0.5 transition-all duration-300" />
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <Reveal direction="fade">
                  <div className="py-16 px-6 text-center border-2 border-dashed border-gray-200 rounded-3xl bg-white">
                    <div className="w-14 h-14 rounded-2xl bg-gray-100 flex items-center justify-center mx-auto mb-4">
                      <Search size={24} className="text-gray-400" />
                    </div>
                    <div className="w-10 h-[2px] rounded-full bg-gradient-to-r from-blue-600 to-blue-400 mx-auto mb-4" />
                    <h3 className="text-xl font-black text-gray-900 mb-2">
                      No active openings in {activeFilter === 'All' ? 'any category' : activeFilter}
                    </h3>
                    <p className="text-gray-400 max-w-sm mx-auto text-sm leading-relaxed">
                      Our team is currently at full capacity, but we're always looking for exceptional talent. Check back soon or follow us for updates.
                    </p>
                  </div>
                </Reveal>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ══ LIFE AT ARTECX — mosaic grid ══════════════════════════════════ */}
      <section className="pt-14 lg:pt-20 pb-20 lg:pb-28 bg-white">
        <div className="container mx-auto px-4 lg:px-8">
          <Reveal direction="up">
            <div className="mb-10 lg:mb-14">
              <h2 className="text-4xl lg:text-5xl font-black text-gray-900 mb-4">Life at ARTecX</h2>
              <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-blue-400 rounded-full" />
            </div>
          </Reveal>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 lg:gap-6 auto-rows-[200px] lg:auto-rows-[240px]">
            <Reveal direction="up" delay={0} className="lg:row-span-2">
              <div className="relative w-full h-full rounded-2xl lg:rounded-3xl overflow-hidden group cursor-default">
                <img src={lifeAtArtecXImg1} alt="Life at Artecx"
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent group-hover:from-black/80 transition-all duration-500" />
                <div className="absolute inset-0 p-6 lg:p-8 flex flex-col justify-end">
                  <span className="text-white/60 text-xs font-semibold uppercase tracking-widest mb-2">Culture · Team</span>
                  <h3 className="text-white font-black text-xl lg:text-2xl">A glimpse into how we work, connect, and create together</h3>
                </div>
              </div>
            </Reveal>

            <Reveal direction="up" delay={100}>
              <div className="relative w-full h-full rounded-2xl lg:rounded-3xl overflow-hidden group cursor-default">
                <img src={lifeAtArtecXImg2} alt="Life at Artecx"
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent group-hover:from-black/80 transition-all duration-500" />
                <div className="absolute inset-0 p-6 lg:p-8 flex flex-col justify-end">
                  <span className="text-white/60 text-xs font-semibold uppercase tracking-widest mb-1">Remote · Global</span>
                  <h3 className="text-white font-black text-lg">Built across 15 countries, united by one mission</h3>
                </div>
              </div>
            </Reveal>

            <Reveal direction="up" delay={200}>
              <div className="relative w-full h-full rounded-2xl lg:rounded-3xl overflow-hidden group cursor-default">
                <img src={lifeAtArtecXImg4} alt="Life at Artecx"
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent group-hover:from-black/80 transition-all duration-500" />
                <div className="absolute inset-0 p-6 lg:p-8 flex flex-col justify-end">
                  <span className="text-white/60 text-xs font-semibold uppercase tracking-widest mb-1">People · Energy</span>
                  <h3 className="text-white font-black text-lg">Every person brings something different. That's the point.</h3>
                </div>
              </div>
            </Reveal>

            <Reveal direction="up" delay={300} className="lg:col-span-2">
              <div className="relative w-full h-full rounded-2xl lg:rounded-3xl overflow-hidden group cursor-default">
                <img src={lifeAtArtecXImg3} alt="Life at Artecx"
                  className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-[1.03] transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent group-hover:from-black/80 transition-all duration-500" />
                <div className="absolute inset-0 p-6 lg:p-8 flex flex-col justify-end">
                  <span className="text-white/60 text-xs font-semibold uppercase tracking-widest mb-1">Retreats · IRL</span>
                  <h3 className="text-white font-black text-xl lg:text-2xl">Twice a year, we get together somewhere amazing</h3>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ══ CTA ═══════════════════════════════════════════════════════════ */}
      <section className="py-20 lg:py-28 bg-[#0f172a]">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <Reveal direction="fade">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-widest
                             bg-white/10 border border-white/20 text-white/70 mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
              Join Us
            </span>
          </Reveal>
          <Reveal direction="up" delay={100}>
            <h2 className="text-4xl lg:text-6xl font-black text-white mb-4 leading-tight">
              Don't see a{' '}
              <span className="bg-gradient-to-r from-blue-400 to-purple-300 bg-clip-text text-transparent">
                perfect fit?
              </span>
            </h2>
          </Reveal>
          <Reveal direction="up" delay={200}>
            <p className="text-white/50 text-lg max-w-lg mx-auto mb-10 leading-relaxed">
              We're always looking for exceptional people.
            </p>
          </Reveal>
          <Reveal direction="up" delay={300}>
            <NavHashLink smooth to="/#contact"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-white text-gray-900 text-sm font-black uppercase tracking-widest
                         hover:bg-blue-600 hover:text-white transition-all duration-300 shadow-lg">
              Get in touch <ArrowRight size={14} />
            </NavHashLink>
          </Reveal>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default CareersPage;