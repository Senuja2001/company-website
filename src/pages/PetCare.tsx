import React, { useEffect, useState, useRef } from 'react';
import {
  ArrowRight, CheckCircle, Star, Phone, Mail, MapPin, Clock, Shield,
  AlertCircle, Stethoscope, Pill, Scissors, ShieldCheck, Search,
  Zap
} from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

import dogHeroImg        from '../assets/dog-2.jpg';
import petMedicationImg  from '../assets/pet-medication.jpg';
import vetConsultationImg from '../assets/vetvisit img 2.jpg';
import petGroomingImg    from '../assets/grooming img.jpg';
import petInsuranceImg   from '../assets/pet-insurance.jpg';
import petLostImg        from '../assets/pet-lost.jpg';
import emergencyCareImg  from '../assets/emergency-care.jpg';
import communityImg      from '../assets/community-pets.jpg';
import Petcareimg1      from '../assets/Petcare Img1.png';
import Petcareimg2      from '../assets/Petcare Img2.png';



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

/* ─── Service data type ─── */
interface Service {
  id: string;
  title: string;
  Icon: React.FC<{ size?: number; className?: string }>;
  description: string;
  features: string[];
  tag: string;
  barClass: string;
  image: string;
}

/* ─── Service Card — icon + photo ─── */
const ServiceCard: React.FC<{ item: Service; cardIndex: number; onClick: () => void; active: boolean }> = ({ item, cardIndex, onClick, active }) => {
  const { ref, inView } = useInView(0.08);
  const [hovered, setHovered] = useState(false);
  const lit = hovered || active;
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
      style={{ transitionDelay: inView ? `${cardIndex * 110}ms` : '0ms' }}
    >
      <div
        className="group cursor-pointer"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={onClick}
      >
        <div className={`rounded-2xl overflow-hidden bg-gray-50 transition-all duration-500
                        ${lit ? 'shadow-2xl -translate-y-1' : 'shadow-sm'}
                        ${active ? 'ring-2 ring-blue-500 ring-offset-2' : ''}`}>

          {/* photo with icon overlay */}
          <div className="relative overflow-hidden" style={{ height: '160px' }}>
            <img
              src={item.image}
              alt={item.title}
              className={`w-full h-[130%] object-cover -mt-[10%] transition-transform duration-700
                          ${lit ? 'scale-[1.06]' : 'scale-100'}`}
            />
            {/* blue tint on hover */}
            <div className={`absolute inset-0 bg-blue-600 transition-opacity duration-500 ${lit ? 'opacity-20' : 'opacity-0'}`} />
            <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />

            {/* tag pill */}
            <div className="absolute bottom-3 left-3">
              <span className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider
                               bg-white/15 backdrop-blur-md text-white rounded-full border border-white/20">
                {item.tag}
              </span>
            </div>

            {/* icon badge top-left */}
            <div className={`absolute top-3 left-3 w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-300
                            bg-white/15 backdrop-blur-md border border-white/20 ${lit ? 'bg-blue-600 border-blue-600 scale-110' : ''}`}>
              <item.Icon size={16} className="text-white" />
            </div>


          </div>

          {/* body */}
          <div className="p-5 lg:p-6">
            <div className={`h-[2px] rounded-full bg-gradient-to-r ${item.barClass} transition-all duration-500 mb-3
                            ${lit ? 'w-12' : 'w-5'}`} />
            <h3 className="text-xl font-black text-gray-900 mb-2 leading-tight">{item.title}</h3>
            <p className="text-gray-400 text-sm leading-relaxed mb-4">{item.description}</p>
            <div className="space-y-1.5">
              {item.features.slice(0, 2).map((f, i) => (
                <div key={i} className="flex items-center gap-2 text-xs text-gray-500">
                  <CheckCircle size={13} className="text-blue-500 flex-shrink-0" />
                  {f}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ═══════════════════════════════════════
   PAGE
═══════════════════════════════════════ */
const PetCarePage: React.FC = () => {
  const [heroVisible, setHeroVisible] = useState(false);
  const [heroScrollY, setHeroScrollY] = useState(0);
  const [activeService, setActiveService] = useState('emergency');

  useEffect(() => {
    const onScroll = () => setHeroScrollY(window.scrollY);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const t = setTimeout(() => setHeroVisible(true), 80);
    return () => clearTimeout(t);
  }, []);

  const services: Service[] = [
    { id: 'emergency', title: 'Emergency Care',  tag: 'Urgent',    Icon: AlertCircle,  image: Petcareimg2,  description: 'Island-wide Accident & Emergency Response',                 features: ['Locate nearest pet hospital', 'Taxi ambulance service', 'Hospital pre-notification', 'Immediate treatment ready'], barClass: 'from-blue-600 to-blue-400' },
    { id: 'vet',       title: 'Call a Vet',      tag: 'Consult',   Icon: Stethoscope,  image: vetConsultationImg, description: 'Instant access to trusted vets whenever your pet needs help', features: ['24/7 vet consultation', 'Video call support', 'Quick calm guidance', 'Prescription services'],                    barClass: 'from-blue-600 to-cyan-500' },
    { id: 'medicine',  title: 'Get Medicines',   tag: 'Pharmacy',  Icon: Pill,         image: petMedicationImg,  description: 'Find nearby pharmacies with the right pet medications',        features: ['Location-based search', 'Fast & reliable delivery', 'Prescription management', 'Price comparison'],                  barClass: 'from-blue-500 to-blue-300' },
    { id: 'grooming',  title: 'Pet Grooming',    tag: 'Wellness',  Icon: Scissors,     image: petGroomingImg,    description: 'Premium grooming — comfort, hygiene, and luxury in one place', features: ['Professional grooming', 'Spa treatments', 'Hygiene packages', 'Luxury care options'],                              barClass: 'from-blue-600 to-blue-400' },
    { id: 'insurance', title: 'Pet Insurance',   tag: 'Insurance', Icon: ShieldCheck,  image: petInsuranceImg,   description: 'Simple, flexible insurance for every life stage',              features: ['Accident coverage', 'Illness protection', 'Wellness plans', 'Emergency care'],                                      barClass: 'from-blue-700 to-blue-500' },
    { id: 'find',      title: 'Find Your Pet',   tag: 'Search',    Icon: Search,       image: Petcareimg1,        description: 'Real-time guidance and community alerts for lost pets',         features: ['GPS tracking', 'Community alerts', 'Neighbourhood search', 'Reward system'],                                       barClass: 'from-blue-500 to-cyan-400' },
  ];

  const activeServiceData = services.find(s => s.id === activeService)!;

  const testimonials = [
    { name: 'Sarah J.',   pet: 'Golden Retriever Owner', text: "The emergency service saved my dog's life. The taxi ambulance arrived in 8 minutes!", rating: 5 },
    { name: 'Michael T.', pet: 'Cat Parent',             text: '24/7 vet consultation is a game-changer. Got immediate help at 2 AM.',               rating: 5 },
    { name: 'Priya K.',   pet: 'Multiple Pet Owner',     text: 'Medicine delivery is so convenient. Never have to worry about running out.',          rating: 4 },
  ];

  const emergencySteps = [
    { Icon: MapPin,      title: 'Locate nearest Hospital', desc: 'Find the nearest vet practice or pet hospital open immediately.',              tag: 'Step 1' },
    { Icon: Zap,         title: 'Taxi Ambulance',          desc: 'Urgent taxi response immediately to you. Powered by PickMe®.',                 tag: 'Step 2' },
    { Icon: ShieldCheck, title: 'Hospital on Standby',     desc: 'The hospital is notified and ready for your arrival and immediate treatment.', tag: 'Step 3' },
  ];

  const stories = [
    { title: "Late-night emergency — how we helped save a cat's life at 3 AM",      category: 'Emergency · 2023', image: emergencyCareImg, large: true },
    { title: 'Community alerts reunited a lost puppy with its family within 2 hours', category: 'Success Story',   image: petLostImg },
    { title: 'From puppy to senior — a 10-year journey of continuous care and trust', category: 'Long-term Care',  image: communityImg },
    { title: 'The people behind our pet care network',                               category: 'Meet the Team',    image: vetConsultationImg },
  ];

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <Navbar />

      {/* ══ HERO ══════════════════════════════════════════════════════════ */}
      <header className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url(${dogHeroImg})`,
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
            className={`text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-black text-white mt-16 mb-6 lg:mb-8 leading-tight
                        transition-all duration-700 ease-out ${heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
            style={{ transitionDelay: '160ms' }}
          >
            Our full attention{' '}
            <span className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
              is yours
            </span>
          </h1>
        </div>
      </header>

      {/* ══ STATS BAR ═════════════════════════════════════════════════════ */}
      <section className="py-14 lg:py-16 bg-white border-b border-gray-100">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { n: '99%',  l: 'Satisfaction Rate' },
              { n: '24/7', l: 'Support Available' },
              { n: '5min', l: 'Avg Response Time' },
              { n: '10k+', l: 'Pets Helped' },
            ].map((stat, i) => (
              <Reveal key={i} direction="up" delay={i * 80}>
                <div className="text-center lg:text-left">
                  <div className="text-4xl lg:text-5xl font-black text-gray-900 mb-1">{stat.n}</div>
                  <div className="text-sm text-gray-400 font-medium uppercase tracking-wider">{stat.l}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══ MISSION ═══════════════════════════════════════════════════════ */}
      <section className="py-14 lg:py-20 bg-white">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <Reveal direction="left">
              <div className="relative">
                <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                  <ParallaxImg src={vetConsultationImg} alt="Pet Care" strength={0.11}
                    wrapperClassName="aspect-[4/3] lg:h-[420px]"
                    imgClassName="w-full h-[120%] object-cover -mt-[10%]" />
                  <div className="absolute inset-0 bg-gradient-to-tr from-black/20 to-transparent" />
                </div>
                {/* floating stat badge */}
                <div className="absolute -bottom-5 right-4 lg:right-8 bg-white rounded-2xl shadow-xl p-5 border border-gray-100">
                  <div className="text-3xl font-black text-blue-600">10k+</div>
                  <div className="text-xs text-gray-400 font-semibold uppercase tracking-wider mt-0.5">Pets Helped</div>
                </div>
              </div>
            </Reveal>

            <Reveal direction="right" delay={220}>
              <div className="relative lg:-ml-32">
                <div className="bg-white rounded-3xl p-8 lg:p-12 shadow-2xl">
                  <span className="text-blue-600 font-black text-sm tracking-widest uppercase block mb-6">
                    Inspired &amp; Driven to Care
                  </span>
                  <h2 className="text-5xl lg:text-7xl font-black text-gray-900 mb-8 leading-tight">
                    Care is more than medicine
                  </h2>
                  <p className="text-lg lg:text-xl text-gray-600 mb-10 leading-relaxed">
                    It's the drive to notice, protect, and improve the lives of the pets and people we serve. Every feature, every response, every moment of care is built around one thing — your pet.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ══ SERVICES GRID ════════════════════════════════════════════════ */}
      <section id="services" className="py-16 lg:py-20 bg-white">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <Reveal direction="up">
              <div className="mb-10 lg:mb-12">
                <h2 className="text-5xl lg:text-6xl font-black text-gray-900 mb-3">Everything your pet needs</h2>
                <p className="text-gray-500 text-lg max-w-2xl">
                  Complete care solutions designed with love, expertise, and technology.
                </p>
              </div>
            </Reveal>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
              {services.map((item, i) => (
                <ServiceCard
                  key={item.id}
                  item={item}
                  cardIndex={i}
                  active={activeService === item.id}
                  onClick={() => setActiveService(item.id)}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══ ACTIVE SERVICE DETAIL ════════════════════════════════════════ */}
      <section className="py-14 lg:py-20 bg-gray-50">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center max-w-7xl mx-auto">
            <Reveal direction="left">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <ParallaxImg
                  src={activeServiceData.image}
                  alt={activeServiceData.title}
                  strength={0.1}
                  wrapperClassName="aspect-[4/3] lg:h-[380px]"
                  imgClassName="w-full h-[120%] object-cover -mt-[10%]"
                />
                {/* blue tint overlay */}
                <div className="absolute inset-0 bg-blue-600 opacity-10" />
                {/* icon badge on photo */}
                <div className="absolute top-5 left-5 w-12 h-12 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30">
                  <activeServiceData.Icon size={22} className="text-white" />
                </div>
              </div>
            </Reveal>

            <Reveal direction="right" delay={150}>
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">
                    <activeServiceData.Icon size={20} className="text-blue-600" />
                  </div>
                  <span className={`h-[3px] w-12 rounded-full bg-gradient-to-r ${activeServiceData.barClass}`} />
                </div>
                <span className="text-gray-400 font-black text-sm tracking-widest uppercase block mb-3">Selected Service</span>
                <h2 className="text-4xl lg:text-5xl font-black text-gray-900 mb-4 leading-tight">{activeServiceData.title}</h2>
                <p className="text-lg text-gray-500 leading-relaxed mb-8">{activeServiceData.description}</p>
                <div className="space-y-3 mb-10">
                  {activeServiceData.features.map((f, i) => (
                    <div key={i} className="flex items-center gap-3 text-gray-700">
                      <CheckCircle size={18} className="text-blue-500 flex-shrink-0" />
                      {f}
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ══ EMERGENCY  (dark section, 3 icon cards) ══════════════════════ */}
      <section className="py-16 lg:py-20 bg-[#0f172a]">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <Reveal direction="up">
              <div className="mb-10 lg:mb-12">
                <span className="text-blue-400 font-black text-sm tracking-widest uppercase block mb-4">Always Ready</span>
                <h2 className="text-4xl lg:text-5xl font-black text-white mb-3">Emergency Care</h2>
                <p className="text-white/50 text-lg max-w-2xl">Island-wide Accident &amp; Emergency Response — because every second counts.</p>
              </div>
            </Reveal>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6">
              {emergencySteps.map((item, i) => {
                const { ref, inView } = useInView(0.08);
                const [hovered, setHovered] = useState(false);
                return (
                  <div
                    key={i}
                    ref={ref}
                    className={`transition-all duration-700 ease-out ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                    style={{ transitionDelay: inView ? `${i * 110}ms` : '0ms' }}
                  >
                    <div
                      className={`rounded-2xl bg-white/5 border border-white/10 p-6 transition-all duration-500
                                  ${hovered ? 'bg-white/10 border-blue-500/40 -translate-y-1 shadow-2xl' : ''}`}
                      onMouseEnter={() => setHovered(true)}
                      onMouseLeave={() => setHovered(false)}
                    >
                      <div className={`w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center mb-4 transition-all duration-500
                                       ${hovered ? 'bg-blue-500/30 scale-110' : ''}`}>
                        <item.Icon size={22} className="text-blue-400" />
                      </div>
                      <div className={`h-[2px] rounded-full bg-gradient-to-r from-blue-500 to-blue-300 transition-all duration-500 mb-4
                                       ${hovered ? 'w-12' : 'w-5'}`} />
                      <span className="inline-block px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider
                                       bg-blue-500/20 text-blue-300 rounded-full border border-blue-500/30 mb-3">
                        {item.tag}
                      </span>
                      <h3 className="text-xl font-black text-white mt-2 mb-2">{item.title}</h3>
                      <p className="text-white/40 text-sm leading-relaxed mb-5">{item.desc}</p>
                      <a
                        href="/emergency"
                        className={`inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest
                                    transition-all duration-300 ${hovered ? 'text-blue-400 gap-3' : 'text-white/30'}`}
                      >
                        How it works <ArrowRight size={12} className={`transition-transform duration-300 ${hovered ? 'translate-x-1' : ''}`} />
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ══ COMMUNITY STORIES  (same mosaic as HomePage Stories) ═════════ */}
      <section className="pt-14 lg:pt-20 bg-gray-50">
        <div className="container mx-auto px-4 lg:px-8">
          <Reveal direction="up">
            <div className="mb-10 lg:mb-14">
              <h4 className="text-4xl lg:text-5xl font-black text-gray-900 mb-4">Stories from our community</h4>
              <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-blue-400 rounded-full" />
            </div>
          </Reveal>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 auto-rows-[220px] lg:auto-rows-[280px]">
            {stories.map((story, index) => (
              <Reveal key={index} direction="up" delay={index * 100}
                className={`${index === 0 ? 'lg:row-span-2' : ''} ${index === stories.length - 1 ? 'lg:col-span-2' : ''}`}>
                <div className="relative w-full h-full rounded-2xl lg:rounded-3xl overflow-hidden group cursor-default">
                  <div className="absolute inset-0 overflow-hidden">
                    <ParallaxImg src={story.image} alt={story.title} strength={0.07}
                      wrapperClassName="w-full h-full"
                      imgClassName="w-full h-[118%] object-cover -mt-[9%] group-hover:scale-[1.03] transition-transform duration-700" />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent group-hover:from-black/90 transition-all duration-500" />
                  <div className="absolute inset-0 p-6 lg:p-8 flex flex-col justify-end">
                    <span className="text-white/60 text-xs font-semibold uppercase tracking-widest mb-2">{story.category}</span>
                    <h3 className={`text-white font-semibold ${index === 0 ? 'text-xl lg:text-2xl' : index === stories.length - 1 ? 'text-2xl lg:text-3xl' : 'text-lg'}`}>
                      {story.title}
                    </h3>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══ TESTIMONIALS ══════════════════════════════════════════════════ */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <Reveal direction="up">
              <div className="mb-10 lg:mb-12">
                <h2 className="text-5xl lg:text-6xl font-black text-gray-900 mb-3">Trusted by pet parents</h2>
                <p className="text-gray-500 text-lg max-w-2xl">Real stories from the families we've helped.</p>
              </div>
            </Reveal>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6">
              {testimonials.map((t, i) => {
                const { ref, inView } = useInView(0.08);
                const [hovered, setHovered] = useState(false);
                return (
                  <div
                    key={i}
                    ref={ref}
                    className={`transition-all duration-700 ease-out ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                    style={{ transitionDelay: inView ? `${i * 110}ms` : '0ms' }}
                  >
                    <div
                      className={`rounded-2xl bg-gray-50 p-6 transition-all duration-500 h-full flex flex-col
                                  ${hovered ? 'shadow-2xl -translate-y-1' : 'shadow-sm'}`}
                      onMouseEnter={() => setHovered(true)}
                      onMouseLeave={() => setHovered(false)}
                    >
                      <div className="flex gap-1 mb-4">
                        {[...Array(t.rating)].map((_, j) => (
                          <Star key={j} size={16} className="fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                      <div className={`h-[2px] rounded-full bg-gradient-to-r from-blue-600 to-blue-400 transition-all duration-500 mb-4
                                       ${hovered ? 'w-12' : 'w-5'}`} />
                      <p className="text-gray-500 text-sm leading-relaxed italic flex-1 mb-5">"{t.text}"</p>
                      <div>
                        <div className="font-black text-gray-900">{t.name}</div>
                        <div className="text-gray-400 text-xs uppercase tracking-wider mt-0.5">{t.pet}</div>
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
      <section id="contact" className="py-20 lg:py-28 bg-[#0f172a]">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <Reveal direction="fade">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-widest
                             bg-white/10 border border-white/20 text-white/70 mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
              Your pet deserves the best
            </span>
          </Reveal>
          <Reveal direction="up" delay={100}>
            <h2 className="text-4xl lg:text-6xl font-black text-white mb-4 leading-tight">
              We're here{' '}
              <span className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
                whenever you need us
              </span>
            </h2>
          </Reveal>
          <Reveal direction="up" delay={200}>
            <p className="text-white/50 text-lg max-w-lg mx-auto mb-10 leading-relaxed">
              Join thousands of pet parents who trust us with their furry family members.
            </p>
          </Reveal>
          <Reveal direction="up" delay={300}>
            <div className="flex flex-wrap gap-4 justify-center mb-14">
              <a href="tel:+94771234567"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-blue-600 text-white text-sm font-black uppercase tracking-widest
                           hover:bg-blue-500 transition-colors duration-300 shadow-lg shadow-blue-500/30">
                <Phone size={15} /> +94 77 123 4567
              </a>
              <a href="mailto:hello@artecx.com"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-white/10 border border-white/20 text-white text-sm font-black uppercase tracking-widest
                           hover:bg-white/20 transition-colors duration-300">
                <Mail size={15} /> Email Us
              </a>
            </div>
          </Reveal>
          <Reveal direction="fade" delay={400}>
            <div className="flex flex-wrap justify-center gap-8 text-white/40 text-sm">
              <div className="flex items-center gap-2"><MapPin size={16} /><span>Colombo, Sri Lanka</span></div>
              <div className="flex items-center gap-2"><Clock size={16} /><span>24/7 Emergency Support</span></div>
              <div className="flex items-center gap-2"><Shield size={16} /><span>100% Secure &amp; Trusted</span></div>
            </div>
          </Reveal>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default PetCarePage;