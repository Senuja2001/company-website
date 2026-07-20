import React, { useEffect, useState, useRef } from 'react';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import ArtEx01 from '../assets/ARTecx-04.jpg';
import ourmissionimg1 from '../assets/our-misson1.jpeg';
import ourmissionimg2 from '../assets/our-misson2.jpeg';
import ourmissionimg3 from '../assets/our-misson3.jpeg';
import ourmissionimg4 from '../assets/our-misson4.jpeg';
import ArtEx02 from '../assets/ARTecx-05.jpg';
import ArtEx03 from '../assets/ARTecx-06.jpg';
import ArtEx05 from '../assets/innovation.jpeg';
import ArtEx06 from '../assets/team-hero.jpeg';
import ArtEx07 from '../assets/culture.jpeg';
import ArtEx08 from '../assets/how-to-build-scalable.jpeg';
import CityBusImg from '../assets/citybus.jpg';
import PetCareImg from '../assets/petcare-01.jpeg';
import SOPImg from '../assets/Pos.jpeg';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ContactPage from './ContactPage';

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

/* ─── Project Card ─── */
interface FocusItem {
  title: string; description: string; tags: string[];
  image: string; gradient: string; index: number; pageRoute: string;
}

const ProjectCard: React.FC<{ item: FocusItem; cardIndex: number }> = ({ item, cardIndex }) => {
  const { ref, inView } = useInView(0.08);
  const [hovered, setHovered] = useState(false);

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
        onClick={() => window.location.href = item.pageRoute}
      >
        <div className={`rounded-2xl overflow-hidden bg-gray-50 transition-all duration-500
                        ${hovered ? 'shadow-2xl -translate-y-1' : 'shadow-sm'}`}>
          <div className="relative overflow-hidden" style={{ height: '260px' }}>
            <img
              src={item.image}
              alt={item.title}
              className={`w-full h-[130%] object-cover -mt-[10%] transition-transform duration-700
                          ${hovered ? 'scale-[1.06]' : 'scale-100'}`}
            />
            <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} transition-opacity duration-500
                            ${hovered ? 'opacity-20' : 'opacity-0'}`} />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
            <div className="absolute bottom-3 left-3 flex flex-wrap gap-1.5">
              {item.tags.map(tag => (
                <span key={tag} className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider
                                           bg-white/15 backdrop-blur-md text-white rounded-full border border-white/20">
                  {tag}
                </span>
              ))}
            </div>
            <div className={`absolute top-3 right-3 w-9 h-9 rounded-full flex items-center justify-center
                            transition-all duration-300
                            ${hovered ? 'bg-white shadow-lg scale-110' : 'bg-black/20 backdrop-blur-md border border-white/20'}`}>
              <ArrowUpRight size={15} className={`transition-colors duration-300 ${hovered ? 'text-gray-900' : 'text-white'}`} />
            </div>
          </div>
          <div className="p-5 lg:p-6">
            <div className={`h-[2px] rounded-full bg-gradient-to-r ${item.gradient} transition-all duration-500 mb-3
                            ${hovered ? 'w-12' : 'w-5'}`} />
            <h3 className="text-xl lg:text-2xl font-black text-gray-900 mb-2 leading-tight">
              {item.title}
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed mb-4">
              {item.description}
            </p>
            <div className={`inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest
                            transition-all duration-300 ${hovered ? 'text-gray-900 gap-3' : 'text-gray-300'}`}>
              Explore
              <ArrowRight size={13} className={`transition-transform duration-300 ${hovered ? 'translate-x-1' : ''}`} />
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
const ArtecXHomePage: React.FC = () => {
  const [currentBg, setCurrentBg] = useState(0);
  const [heroVisible, setHeroVisible] = useState(false);
  const [heroScrollY, setHeroScrollY] = useState(0);

  const backgroundImages = [ArtEx03, ArtEx01, ArtEx02];

  useEffect(() => {
    const onScroll = () => setHeroScrollY(window.scrollY);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const t = setTimeout(() => setHeroVisible(true), 80);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const id = setInterval(() => setCurrentBg(p => (p + 1) % backgroundImages.length), 2800);
    return () => clearInterval(id);
  }, []);

  const focusItems: FocusItem[] = [
    {
      title: 'City Bus',
      description: 'A modern mobility platform for riders, operators, and city-scale performance.',
      tags: ['Mobility', 'Product', 'UX/UX'],
      image: CityBusImg, gradient: 'from-blue-500 to-cyan-500',
      index: 1, pageRoute: '/citybus'
    },
    {
      title: 'Pet Care',
      description: 'Service booking and care plans designed to feel warm, safe, and effortless.',
      tags: ['Service', 'Branding', 'Web'],
      image: PetCareImg, gradient: 'from-purple-500 to-pink-500',
      index: 2, pageRoute: '/petcare'
    },
    {
      title: 'POS System',
      description: 'A fast, clear point-of-sale interface built for real-world retail workflows.',
      tags: ['Retail', 'Dashboard', 'System'],
      image: SOPImg, gradient: 'from-green-500 to-emerald-500',
      index: 3, pageRoute: '/pos-system'
    }
  ];

  interface Story {
    title: string; category: string; image: string; large?: boolean; teamStory?: boolean;
  }
  const stories: Story[] = [
    { title: 'How we built a scalable mobility platform for millions of users', category: 'Case Study', image: ArtEx08, large: true },
    { title: 'Designing systems that scale with your business', category: 'Innovation', image: ArtEx05 },
    { title: 'The engineers behind our platform', category: 'Culture', image: ArtEx07 },
    { title: 'The People Behind Artecx', category: 'Meet the Team', image: ArtEx06, teamStory: true }
  ];

  // Mission scroll panels
  const missionPanels = [
    { image: ourmissionimg1, quote: 'We believe amazing things happen when we move.' },
    { image: ourmissionimg2, quote: 'Whether that\'s breaking records on the track...' },
    { image: ourmissionimg3, quote: '...or developing new technology to make sport more sustainable.' },
    { image: ourmissionimg4, quote: 'We push boundaries every single day.' },
  ];

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <Navbar />

      {/* ══ HERO ══════════════════════════════════════════════════════════ */}
      <header className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
        {backgroundImages.map((img, index) => (
          <div key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentBg ? 'opacity-100' : 'opacity-0'}`}
            style={{
              backgroundImage: `url(${img})`, backgroundSize: 'cover', backgroundPosition: 'center',
              transform: `scale(1.12) translateY(${heroScrollY * 0.3}px)`,
              filter: 'saturate(1.05) contrast(1.02)', willChange: 'transform',
            }}
          />
        ))}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/40 to-black/80" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />

        <div className="relative z-10 text-center px-4 lg:px-8 max-w-6xl mx-auto">
          <div className={`mb-4 transition-all duration-500 ease-out ${heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-3'}`}
            style={{ transitionDelay: '100ms' }} />
          <h1 className={`text-6xl sm:text-5xl lg:text-6xl xl:text-6xl font-black text-white mt-24 mb-6 lg:mb-8 leading-tight
                          transition-all duration-700 ease-out ${heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
            style={{ transitionDelay: '260ms' }}>
            Coding for{' '}
            <span className="bg-gradient-to-r from-blue-400 to-purple-300 bg-clip-text text-transparent">Convenience</span>
          </h1>
        </div>

        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-3 z-10">
          {backgroundImages.map((_, index) => (
            <button key={index} onClick={() => setCurrentBg(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${index === currentBg ? 'bg-white scale-125' : 'bg-white/50 hover:bg-white/80'}`}
              aria-label={`Go to background ${index + 1}`} />
          ))}
        </div>
      </header>

      {/* ══ OUR FOCUS ═════════════════════════════════════════════════════ */}
      <section id="projects" className="py-16 lg:py-20 bg-white">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <Reveal direction="up">
              <div className="mb-10 lg:mb-12">
                <h2 className="text-5xl lg:text-6xl font-black text-gray-900 mb-3">Our Focus</h2>
                <p className="text-gray-500 text-lg max-w-2xl">
                  We specialize in creating impactful digital solutions across three key areas.
                </p>
              </div>
            </Reveal>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
              {focusItems.map((item, i) => (
                <ProjectCard key={item.title} item={item} cardIndex={i} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══ MISSION — horizontal scroll layout ═══════════════════════════ */}
      <section id="mission" className="py-14 lg:py-20 bg-white overflow-hidden">
        <div className="px-4 lg:px-8 mb-8 lg:mb-12">
          <Reveal direction="up">
            <div className="max-w-7xl mx-auto">
              <h2 className="text-5xl lg:text-6xl font-black text-gray-900 mb-3">Our mission</h2>
            </div>
          </Reveal>
        </div>

        {/* Scrollable row */}
        <div className="flex gap-4 overflow-x-auto pb-4 px-4 lg:px-8 snap-x snap-mandatory"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>

          {/* Text intro card — enlarged */}
          <Reveal direction="left">
            <div className="snap-start flex-shrink-0 w-[480px] lg:w-[560px] bg-gray-50 rounded-3xl p-10 lg:p-12 flex flex-col justify-between"
              style={{ minHeight: '480px' }}>
              <div>
                <span className="text-blue-600 font-black text-xs tracking-widest uppercase block mb-5">
                  Our Vision &amp; Values
                </span>
                <h3 className="text-2xl lg:text-3xl font-black text-gray-900 mb-5 leading-tight">
                  We create digital legacies
                </h3>
                <p className="text-gray-500 text-base leading-relaxed mb-8">
                  Ignite the human spirit through movement and purposeful design. We don't just build websites; we create digital legacies that move people.
                </p>
              </div>
              <a href="/about"
                className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-gray-900 hover:gap-3 transition-all duration-300">
                Read more <ArrowRight size={13} />
              </a>
            </div>
          </Reveal>

          {/* Image + quote panels */}
          {missionPanels.map((panel, i) => (
            <Reveal key={i} direction="up" delay={i * 80}>
              <div className="snap-start flex-shrink-0 relative rounded-3xl overflow-hidden"
                style={{ width: '260px', minHeight: '480px' }}>
                <img
                  src={panel.image}
                  alt={panel.quote}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <p className="text-white text-sm font-semibold leading-snug">
                    {panel.quote}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Hide scrollbar for webkit */}
        <style>{`
          #mission div::-webkit-scrollbar { display: none; }
        `}</style>
      </section>

      {/* ══ STORIES ═══════════════════════════════════════════════════════ */}
      <section id="stories" className="pt-14 lg:pt-20 bg-gray-50">
        <div className="container mx-auto px-4 lg:px-8">
          <Reveal direction="up">
            <div className="mb-10 lg:mb-14">
              <h4 className="text-4xl lg:text-5xl font-black text-gray-900 mb-4">Stories that move</h4>
              <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-blue-400 rounded-full" />
            </div>
          </Reveal>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 auto-rows-[300px] lg:auto-rows-[420px]">
            {stories.map((story, index) => (
              <Reveal key={index} direction="up" delay={index * 100}
                className={`${index === 0 ? 'lg:row-span-2' : ''} ${index === stories.length - 1 ? 'lg:col-span-2' : ''}`}>
                <div
                  onClick={() => { if (story.teamStory) window.location.href = '/team'; }}
                  className="relative w-full h-full rounded-2xl lg:rounded-3xl overflow-hidden group cursor-pointer"
                >
                  <div className="absolute inset-0 overflow-hidden">
                    <ParallaxImg src={story.image} alt={story.title} strength={0.07}
                      wrapperClassName="w-full h-full"
                      imgClassName="w-full h-[118%] object-cover -mt-[9%]" />
                  </div>
                  <div className={`absolute inset-0 transition-all duration-500 ${story.teamStory ? '' : 'bg-gradient-to-t from-black/80 via-black/20 to-transparent group-hover:from-black/90'}`} />
                  <div className="absolute inset-0 p-6 lg:p-8 flex flex-col justify-end">
                    <span className="text-white/60 text-xs font-semibold uppercase tracking-widest mb-2">{story.category}</span>
                    <h3 className={`text-white font-semibold ${story.teamStory ? 'text-3xl lg:text-4xl' : story.large ? 'text-xl lg:text-2xl' : 'text-lg'}`}>
                      {story.title}
                    </h3>
                    {story.teamStory && (
                      <p className="text-white/75 text-lg mt-3 max-w-2xl">Meet the passionate team behind our innovative solutions</p>
                    )}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══ CONTACT ═══════════════════════════════════════════════════════ */}
      <section id="contact" className="bg-[#0f172a]">
        <ContactPage />
      </section>

      <Footer />
    </div>
  );
};

export default ArtecXHomePage;