import React, { useEffect, useState, useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import TeamHero    from '../assets/team-hero.jpeg';
import ArtEx04     from '../assets/ARTecx-06.jpeg';
import aboutimg01     from '../assets/about-img01.jpeg';
import aboutimg02     from '../assets/about-img02.jpeg';
import aboutimg03     from '../assets/about-img03.jpeg';

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

/* ─── Value Card ─── */
interface ValueItem {
  icon: string; title: string; desc: string; gradient: string; tag: string;
}
const ValueCard: React.FC<{ item: ValueItem; cardIndex: number }> = ({ item, cardIndex }) => {
  const { ref, inView } = useInView(0.08);
  const [hovered, setHovered] = useState(false);
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
      style={{ transitionDelay: inView ? `${cardIndex * 110}ms` : '0ms' }}
    >
      <div
        className="group cursor-default"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <div className={`rounded-2xl overflow-hidden bg-gray-50 transition-all duration-500
                        ${hovered ? 'shadow-2xl -translate-y-1' : 'shadow-sm'}`}>
          <div className={`relative h-28 bg-gradient-to-br ${item.gradient} flex items-center justify-center`}>
            <span className="text-5xl">{item.icon}</span>
            <div className="absolute bottom-3 left-3">
              <span className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider
                               bg-white/15 backdrop-blur-md text-white rounded-full border border-white/20">
                {item.tag}
              </span>
            </div>
          </div>
          <div className="p-5 lg:p-6">
            <div className={`h-[2px] rounded-full bg-gradient-to-r ${item.gradient} transition-all duration-500 mb-3
                            ${hovered ? 'w-12' : 'w-5'}`} />
            <h3 className="text-xl font-black text-gray-900 mb-2">{item.title}</h3>
            <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ═══════════════════════════════════════
   PAGE
═══════════════════════════════════════ */
const AboutPage: React.FC = () => {
  const [heroVisible, setHeroVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setHeroVisible(true), 80);
    return () => clearTimeout(t);
  }, []);

  const values: ValueItem[] = [
    { icon: '🧭', title: 'Customer First',  tag: 'Values', gradient: 'from-blue-500 to-cyan-500',     desc: "Everything we build starts with deep understanding of our customers' real needs. We obsessively listen, iterate, and ship." },
    { icon: '🚀', title: 'Innovation',      tag: 'Values', gradient: 'from-purple-500 to-pink-500',   desc: 'We push the frontier every day. Our teams ship bold experiments, learn fast, and turn breakthrough ideas into real products.' },
    { icon: '🤝', title: 'Integrity',       tag: 'Values', gradient: 'from-green-500 to-emerald-500', desc: "We do what's right — especially when no one is watching. Our promises to customers, partners, and teammates are never optional." },
    { icon: '❤️', title: 'Passion',         tag: 'Values', gradient: 'from-orange-500 to-red-500',   desc: 'Every product, pixel, and pull request is made with genuine care. When you love your work, it shows.' },
  ];

  interface TimelineStory {
    title: string; category: string; image: string; large?: boolean;
    stat?: string; statLabel?: string;
  }
  const timelineStories: TimelineStory[] = [
    { title: 'How it all started — a garage, three founders, one whiteboard',      category: '2020 · Origin',       image: aboutimg01, large: true },
    { title: 'City Bus platform deployed in 4 cities within 6 months',             category: '2021 · First Product', image: aboutimg02, stat: '4', statLabel: 'Cities' },
    { title: 'Crossed 1 million active users — fuelled entirely by word-of-mouth', category: '2022 · Growth',       image: aboutimg03 },
    { title: 'Named Best Startup of the Year & expanded to 8 product lines',       category: '2023 · Recognition',  image: TeamHero },
  ];

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <Navbar />

      {/* ══ HERO — dark gradient, no image ════════════════════════════════ */}
      <header className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0f172a]">
        {/* Bottom fade to white */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent" />

        <div className="relative z-10 text-center px-4 lg:px-8 max-w-5xl mx-auto">
          <h1
            className={`text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-black text-white leading-tight
                        transition-all duration-700 ease-out ${heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
            style={{ transitionDelay: '160ms' }}
          >
            We're building for{' '}
            <span className="bg-gradient-to-r from-blue-400 to-purple-300 bg-clip-text text-transparent">
              People
            </span>
          </h1>
        </div>
      </header>

      {/* ══ STATS BAR ═════════════════════════════════════════════════════ */}
      <section className="py-14 lg:py-16 bg-white border-b border-gray-100">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { n: '1M+', l: 'Active Users' },
              { n: '50+', l: 'Products Shipped' },
              { n: '15',  l: 'Countries' },
              { n: '98%', l: 'Satisfaction Score' },
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
                  <ParallaxImg src={ArtEx04} alt="About Artecx" strength={0.11}
                    wrapperClassName="aspect-[4/3] lg:h-[600px]"
                    imgClassName="w-full h-[120%] object-cover -mt-[10%]" />
                  <div className="absolute inset-0 bg-gradient-to-tr from-black/20 to-transparent" />
                </div>
              </div>
            </Reveal>

            <Reveal direction="right" delay={220}>
              <div className="relative lg:-ml-32">
                <div className="bg-white rounded-3xl p-8 lg:p-12 shadow-2xl">
                  <span className="text-blue-600 font-black text-sm tracking-widest uppercase block mb-6">
                    Who We Are
                  </span>
                  <h2 className="text-5xl lg:text-7xl font-black text-gray-900 mb-8 leading-tight">
                    Our story
                  </h2>
                  <p className="text-lg lg:text-xl text-gray-600 mb-10 leading-relaxed">
                    We started Artecx because the tools people use every day shouldn't feel like obstacles. Our team of 30+ engineers, designers, and thinkers work relentlessly to prove that powerful software and elegant simplicity can coexist.
                  </p>
                  <a
                    href="/careers"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white border border-gray-200 text-gray-900 text-sm font-black uppercase tracking-widest
                               hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all duration-300 shadow-sm"
                  >
                    Join our team <ArrowRight size={14} />
                  </a>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ══ VALUES ════════════════════════════════════════════════════════ */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <Reveal direction="up">
              <div className="mb-10 lg:mb-12">
                <h2 className="text-5xl lg:text-6xl font-black text-gray-900 mb-3">Core Values</h2>
                <p className="text-gray-500 text-lg max-w-2xl">
                  Four principles that shape every decision, every line of code, and every customer interaction.
                </p>
              </div>
            </Reveal>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
              {values.map((item, i) => (
                <ValueCard key={item.title} item={item} cardIndex={i} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══ JOURNEY ═══════════════════════════════════════════════════════ */}
      <section className="pt-14 lg:pt-20 pb-20 lg:pb-28 bg-gray-50">
        <div className="container mx-auto px-4 lg:px-8">
          <Reveal direction="up">
            <div className="mb-10 lg:mb-14">
              <h4 className="text-4xl lg:text-5xl font-black text-gray-900 mb-4">Our journey</h4>
              <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-blue-400 rounded-full" />
            </div>
          </Reveal>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 auto-rows-[300px] lg:auto-rows-[420px]">
            {timelineStories.map((story, index) => (
              <Reveal key={index} direction="up" delay={index * 100}
                className={`${index === 0 ? 'lg:row-span-2' : ''} ${index === timelineStories.length - 1 ? 'lg:col-span-2' : ''}`}>
                <div className="relative w-full h-full rounded-2xl lg:rounded-3xl overflow-hidden group cursor-default">
                  <div className="absolute inset-0 overflow-hidden">
                    <ParallaxImg src={story.image} alt={story.title} strength={0.07}
                      wrapperClassName="w-full h-full"
                      imgClassName="w-full h-[118%] object-cover -mt-[9%] group-hover:scale-[1.03] transition-transform duration-700" />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent group-hover:from-black/90 transition-all duration-500" />
                  <div className="absolute inset-0 p-6 lg:p-8 flex flex-col justify-end">
                    <span className="text-white/60 text-xs font-semibold uppercase tracking-widest mb-2">{story.category}</span>
                    <h3 className={`text-white font-semibold ${index === 0 ? 'text-xl lg:text-2xl' : index === timelineStories.length - 1 ? 'text-3xl lg:text-4xl' : 'text-lg'}`}>
                      {story.title}
                    </h3>
                    {story.stat && (
                      <p className="text-white/70 text-base mt-2">{story.stat} {story.statLabel}</p>
                    )}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══ CTA ═══════════════════════════════════════════════════════════ */}
      <section className="py-20 lg:py-28 bg-[#0f172a]">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <Reveal direction="fade">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-widest
                             bg-white/10 border border-white/20 text-white/70 mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
              Join Us
            </span>
          </Reveal>
          <Reveal direction="up" delay={100}>
            <h2 className="text-4xl lg:text-6xl font-black text-white mb-4 leading-tight">
              Ready to build something{' '}
              <span className="bg-gradient-to-r from-blue-400 to-purple-300 bg-clip-text text-transparent">
                extraordinary?
              </span>
            </h2>
          </Reveal>
          <Reveal direction="up" delay={200}>
            <p className="text-white/50 text-lg max-w-lg mx-auto mb-10 leading-relaxed">
              Whether you want to work with us or partner with us — great things start with a conversation.
            </p>
          </Reveal>
          <Reveal direction="up" delay={300}>
            <div className="flex flex-wrap gap-4 justify-center">
              <a href="/careers"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-blue-600 text-white text-sm font-black uppercase tracking-widest
                           hover:bg-blue-500 transition-colors duration-300 shadow-lg shadow-blue-500/30">
                View open roles <ArrowRight size={14} />
              </a>
              <a href="/#contact"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-white/10 border border-white/20 text-white text-sm font-black uppercase tracking-widest
                           hover:bg-white/20 transition-colors duration-300">
                Get in touch
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AboutPage;