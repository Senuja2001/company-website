import React, { useEffect, useState, useRef } from 'react';
import { ArrowRight, ArrowUpRight, Clock, Tag, Search, TrendingUp, Cpu, Lightbulb, Globe, Users, Zap } from 'lucide-react';
import Navbar from '../components/Navbar';
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

/* ─── Data ─── */
interface Post {
  id: number;
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  date: string;
  featured?: boolean;
  gradient: string;
  Icon: React.FC<{ size?: number; className?: string }>;
}

const allPosts: Post[] = [
  {
    id: 1,
    title: 'How we built a real-time bus tracking system for 500+ routes',
    excerpt: 'A deep dive into the engineering challenges of building live GPS tracking at scale — from WebSocket architecture to handling millions of concurrent riders.',
    category: 'Engineering',
    readTime: '8 min read',
    date: 'Jan 15, 2026',
    featured: true,
    gradient: 'from-blue-600 to-cyan-500',
    Icon: Cpu,
  },
  {
    id: 2,
    title: 'Designing for empathy: the UX behind Pet Care',
    excerpt: 'When someone\'s pet is sick at 3 AM, every second of friction costs trust. Here\'s how we approached designing for high-stress, high-stakes moments.',
    category: 'Design',
    readTime: '6 min read',
    date: 'Jan 8, 2026',
    gradient: 'from-blue-500 to-blue-300',
    Icon: Lightbulb,
  },
  {
    id: 3,
    title: 'From 0 to 1 million users: lessons from our first year',
    excerpt: 'We didn\'t spend a single rupee on advertising. Here\'s the honest story of how City Bus grew entirely through word of mouth — and what we learned.',
    category: 'Growth',
    readTime: '5 min read',
    date: 'Dec 22, 2025',
    gradient: 'from-blue-700 to-blue-500',
    Icon: TrendingUp,
  },
  {
    id: 4,
    title: 'Building for Sri Lanka: why local context changes everything',
    excerpt: 'Software built for Silicon Valley often fails in Colombo. We\'ve learned to design for unreliable networks, multilingual users, and real local infrastructure.',
    category: 'Product',
    readTime: '7 min read',
    date: 'Dec 10, 2025',
    gradient: 'from-blue-600 to-blue-400',
    Icon: Globe,
  },
  {
    id: 5,
    title: 'Our approach to hiring: why we look for curiosity over credentials',
    excerpt: 'We\'ve hired people with no degree who outperformed senior engineers. We\'ve also made the classic mistake of hiring for pedigree. Here\'s what we actually look for now.',
    category: 'Culture',
    readTime: '4 min read',
    date: 'Nov 28, 2025',
    gradient: 'from-blue-500 to-cyan-400',
    Icon: Users,
  },
  {
    id: 6,
    title: 'The decision to go mobile-first (and nearly derail our launch)',
    excerpt: 'We pivoted to mobile-only three weeks before launch. It was the right call — but the chaos it caused nearly broke the team. A story about conviction and cost.',
    category: 'Engineering',
    readTime: '9 min read',
    date: 'Nov 14, 2025',
    gradient: 'from-blue-700 to-cyan-500',
    Icon: Zap,
  },
];

const categories = ['All', 'Engineering', 'Design', 'Product', 'Growth', 'Culture'];

/* ─── Post Card ─── */
const PostCard: React.FC<{ post: Post; index: number; featured?: boolean }> = ({ post, index, featured }) => {
  const { ref, inView } = useInView(0.08);
  const [hovered, setHovered] = useState(false);
  const lit = hovered;

  if (featured) {
    return (
      <div
        ref={ref}
        className={`transition-all duration-700 ease-out ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
      >
        <div
          className={`group cursor-pointer rounded-3xl overflow-hidden bg-gray-50 transition-all duration-500
                      ${hovered ? 'shadow-2xl -translate-y-1' : 'shadow-sm'}`}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          <div className="lg:grid lg:grid-cols-2">
            {/* Left — gradient icon panel */}
            <div className={`relative h-64 lg:h-auto bg-gradient-to-br ${post.gradient} flex items-center justify-center overflow-hidden`}>
              <div className="absolute w-80 h-80 rounded-full border border-white/10" />
              <div className="absolute w-52 h-52 rounded-full border border-white/10" />
              <div className="absolute w-32 h-32 rounded-full border border-white/15" />
              <post.Icon size={100} className="absolute opacity-[0.06] text-white" />
              <div className={`relative z-10 w-20 h-20 rounded-2xl bg-white/15 backdrop-blur-sm flex items-center justify-center
                               transition-all duration-500 ${hovered ? 'scale-110 bg-white/25' : ''}`}>
                <post.Icon size={38} className="text-white" />
              </div>
              {/* featured badge */}
              <div className="absolute top-5 left-5 px-3 py-1.5 rounded-full bg-white/15 backdrop-blur-md border border-white/20 text-white text-[10px] font-bold uppercase tracking-widest">
                Featured
              </div>
            </div>

            {/* Right — content */}
            <div className="p-8 lg:p-10 flex flex-col justify-between">
              <div>
                <div className={`h-[2px] rounded-full bg-gradient-to-r ${post.gradient} transition-all duration-500 mb-4 ${hovered ? 'w-16' : 'w-6'}`} />
                <div className="flex items-center gap-3 mb-4">
                  <span className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider bg-blue-50 text-blue-600 rounded-full border border-blue-100">
                    {post.category}
                  </span>
                  <span className="flex items-center gap-1 text-xs text-gray-400">
                    <Clock size={11} /> {post.readTime}
                  </span>
                  <span className="text-xs text-gray-300">{post.date}</span>
                </div>
                <h2 className="text-2xl lg:text-3xl font-black text-gray-900 mb-4 leading-tight">{post.title}</h2>
                <p className="text-gray-500 leading-relaxed">{post.excerpt}</p>
              </div>
              <div className={`inline-flex items-center gap-2 text-sm font-black uppercase tracking-widest mt-8
                              transition-all duration-300 ${hovered ? 'text-blue-600 gap-3' : 'text-gray-300'}`}>
                Read article
                <ArrowRight size={14} className={`transition-transform duration-300 ${hovered ? 'translate-x-1' : ''}`} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
      style={{ transitionDelay: inView ? `${index * 110}ms` : '0ms' }}
    >
      <div
        className={`group cursor-pointer rounded-2xl overflow-hidden bg-gray-50 h-full transition-all duration-500
                    ${lit ? 'shadow-2xl -translate-y-1' : 'shadow-sm'}`}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* icon header */}
        <div className={`relative h-44 bg-gradient-to-br ${post.gradient} flex items-center justify-center overflow-hidden`}>
          <div className="absolute w-56 h-56 rounded-full border border-white/10" />
          <div className="absolute w-36 h-36 rounded-full border border-white/10" />
          <post.Icon size={72} className="absolute opacity-[0.06] text-white" />
          <div className={`relative z-10 w-14 h-14 rounded-xl bg-white/15 backdrop-blur-sm flex items-center justify-center
                           transition-all duration-500 ${lit ? 'scale-110 bg-white/25' : ''}`}>
            <post.Icon size={26} className="text-white" />
          </div>
          {/* arrow */}
          <div className={`absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300
                          ${lit ? 'bg-white shadow-lg scale-110' : 'bg-white/15 backdrop-blur-md border border-white/20'}`}>
            <ArrowUpRight size={14} className={lit ? 'text-gray-900' : 'text-white'} />
          </div>
        </div>

        {/* body */}
        <div className="p-5 lg:p-6">
          <div className={`h-[2px] rounded-full bg-gradient-to-r ${post.gradient} transition-all duration-500 mb-3 ${lit ? 'w-12' : 'w-5'}`} />
          <div className="flex items-center gap-2 mb-3">
            <span className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider bg-blue-50 text-blue-600 rounded-full border border-blue-100">
              {post.category}
            </span>
            <span className="flex items-center gap-1 text-xs text-gray-400">
              <Clock size={10} /> {post.readTime}
            </span>
          </div>
          <h3 className="text-lg font-black text-gray-900 mb-2 leading-tight">{post.title}</h3>
          <p className="text-gray-400 text-sm leading-relaxed mb-4 line-clamp-3">{post.excerpt}</p>
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-300">{post.date}</span>
            <div className={`inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-widest
                            transition-all duration-300 ${lit ? 'text-blue-600 gap-2.5' : 'text-gray-300'}`}>
              Read <ArrowRight size={11} className={`transition-transform duration-300 ${lit ? 'translate-x-0.5' : ''}`} />
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
const BlogPage: React.FC = () => {
  const [heroVisible, setHeroVisible] = useState(false);
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const t = setTimeout(() => setHeroVisible(true), 80);
    return () => clearTimeout(t);
  }, []);

  const featuredPost = allPosts.find(p => p.featured)!;
  const filteredPosts = allPosts.filter(p => {
    const matchCat = activeCategory === 'All' || p.category === activeCategory;
    const matchSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        p.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchSearch && !p.featured;
  });

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <Navbar />

      {/* ══ HERO ══════════════════════════════════════════════════════════ */}
      <header className="relative pt-32 pb-16 lg:pt-40 lg:pb-20 bg-[#0f172a] overflow-hidden">
        {/* decorative rings */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full border border-white/5 -translate-y-1/2 translate-x-1/4" />
        <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full border border-white/5 -translate-y-1/3 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2" />

        <div className="container mx-auto px-4 lg:px-8 max-w-7xl relative z-10">
          <div className="max-w-3xl">
            <div
              className={`mb-6 transition-all duration-500 ease-out ${heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-3'}`}
              style={{ transitionDelay: '100ms' }}
            >
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-widest
                               bg-white/10 border border-white/20 text-white/80">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
                Artecx Blog
              </span>
            </div>

            <h1
              className={`text-5xl lg:text-7xl font-black text-white leading-tight mb-6
                          transition-all duration-700 ease-out ${heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              style={{ transitionDelay: '200ms' }}
            >
              Ideas, stories &{' '}
              <span className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
                lessons learned
              </span>
            </h1>

            <p
              className={`text-lg text-white/50 max-w-xl leading-relaxed mb-10
                          transition-all duration-700 ease-out ${heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
              style={{ transitionDelay: '320ms' }}
            >
              Behind-the-scenes engineering, design thinking, product decisions, and the honest lessons from building software in Sri Lanka.
            </p>

            {/* Search */}
            <div
              className={`transition-all duration-700 ease-out ${heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
              style={{ transitionDelay: '440ms' }}
            >
              <div className="relative max-w-md">
                <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />
                <input
                  type="text"
                  placeholder="Search articles..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="w-full bg-white/10 border border-white/20 rounded-full pl-11 pr-5 py-3 text-sm text-white
                             placeholder-white/30 focus:outline-none focus:border-blue-400 focus:bg-white/15 transition-all duration-300"
                />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* ══ STATS BAR ═════════════════════════════════════════════════════ */}
      <section className="py-10 bg-white border-b border-gray-100">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { n: '6',     l: 'Articles' },
              { n: '4',     l: 'Topics Covered' },
              { n: 'Weekly', l: 'New Posts' },
              { n: '100%',  l: 'From the Team' },
            ].map((s, i) => (
              <Reveal key={i} direction="up" delay={i * 80}>
                <div className="text-center lg:text-left">
                  <div className="text-3xl lg:text-4xl font-black text-gray-900 mb-1">{s.n}</div>
                  <div className="text-sm text-gray-400 font-medium uppercase tracking-wider">{s.l}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══ FEATURED POST ═════════════════════════════════════════════════ */}
      <section className="py-14 lg:py-20 bg-white">
        <div className="container mx-auto px-4 lg:px-8 max-w-7xl">
          <Reveal direction="up">
            <div className="mb-8">
              <h2 className="text-3xl lg:text-4xl font-black text-gray-900 mb-2">Latest from us</h2>
              <div className="w-16 h-[2px] rounded-full bg-gradient-to-r from-blue-600 to-blue-400" />
            </div>
          </Reveal>
          <Reveal direction="up" delay={100}>
            <PostCard post={featuredPost} index={0} featured />
          </Reveal>
        </div>
      </section>

      {/* ══ CATEGORY FILTER + GRID ════════════════════════════════════════ */}
      <section className="py-14 lg:py-20 bg-gray-50">
        <div className="container mx-auto px-4 lg:px-8 max-w-7xl">
          <Reveal direction="up">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-10">
              <div>
                <h2 className="text-3xl lg:text-4xl font-black text-gray-900 mb-1">All articles</h2>
                <p className="text-gray-500">
                  {filteredPosts.length} {filteredPosts.length === 1 ? 'article' : 'articles'}
                  {activeCategory !== 'All' ? ` in ${activeCategory}` : ''}
                </p>
              </div>
              {/* category filters */}
              <div className="flex flex-wrap gap-2">
                {categories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider
                                transition-all duration-300 border ${
                      activeCategory === cat
                        ? 'bg-blue-600 text-white border-blue-600 scale-105'
                        : 'bg-white text-gray-500 border-gray-200 hover:border-blue-300 hover:text-blue-600'
                    }`}
                  >
                    <Tag size={10} /> {cat}
                  </button>
                ))}
              </div>
            </div>
          </Reveal>

          {filteredPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
              {filteredPosts.map((post, i) => (
                <PostCard key={post.id} post={post} index={i} />
              ))}
            </div>
          ) : (
            <Reveal direction="fade">
              <div className="py-20 text-center border-2 border-dashed border-gray-200 rounded-3xl">
                <Search size={32} className="text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-black text-gray-900 mb-2">No articles found</h3>
                <p className="text-gray-400">Try a different category or search term.</p>
              </div>
            </Reveal>
          )}
        </div>
      </section>

      {/* ══ TOPICS — dark section ═════════════════════════════════════════ */}
      <section className="py-16 lg:py-20 bg-[#0f172a]">
        <div className="container mx-auto px-4 lg:px-8 max-w-7xl">
          <Reveal direction="up">
            <div className="mb-10">
              <span className="text-blue-400 font-black text-sm tracking-widest uppercase block mb-3">What we write about</span>
              <h2 className="text-4xl lg:text-5xl font-black text-white mb-3">Topics we cover</h2>
              <p className="text-white/50 max-w-xl">Real stories from building products people use every day.</p>
            </div>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { Icon: Cpu,       label: 'Engineering',  desc: 'Architecture decisions, scaling challenges, and the messy reality of building production systems.',    tag: 'Technical' },
              { Icon: Lightbulb, label: 'Design',       desc: 'UX thinking, design systems, and how we approach building products for real humans in real contexts.', tag: 'Creative' },
              { Icon: TrendingUp,label: 'Growth',       desc: 'How our products grew, what we tried, what failed spectacularly, and what actually moved the needle.', tag: 'Business' },
              { Icon: Globe,     label: 'Product',      desc: 'Decisions behind features, roadmap thinking, and what it means to build for a local market.',         tag: 'Strategy' },
              { Icon: Users,     label: 'Culture',      desc: 'How we hire, how we work, how we stay sane while building multiple products simultaneously.',         tag: 'People' },
              { Icon: Zap,       label: 'Lessons',      desc: 'Honest retrospectives on launches, pivots, mistakes we made, and what we\'d do differently.',         tag: 'Insights' },
            ].map((topic, i) => {
              const { ref, inView } = useInView(0.08);
              const [hovered, setHovered] = useState(false);
              return (
                <div
                  key={i} ref={ref}
                  className={`transition-all duration-700 ease-out ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                  style={{ transitionDelay: inView ? `${i * 110}ms` : '0ms' }}
                >
                  <div
                    className={`rounded-2xl bg-white/5 border border-white/10 p-6 transition-all duration-500 cursor-default
                                ${hovered ? 'bg-white/10 border-blue-500/40 -translate-y-1 shadow-2xl' : ''}`}
                    onMouseEnter={() => setHovered(true)}
                    onMouseLeave={() => setHovered(false)}
                  >
                    <div className={`w-11 h-11 rounded-xl bg-blue-500/20 flex items-center justify-center mb-4 transition-all duration-300 ${hovered ? 'scale-110 bg-blue-500/30' : ''}`}>
                      <topic.Icon size={20} className="text-blue-400" />
                    </div>
                    <div className={`h-[2px] rounded-full bg-gradient-to-r from-blue-500 to-blue-300 transition-all duration-500 mb-4 ${hovered ? 'w-12' : 'w-5'}`} />
                    <span className="inline-block px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider bg-blue-500/20 text-blue-300 rounded-full border border-blue-500/30 mb-3">
                      {topic.tag}
                    </span>
                    <h3 className="text-xl font-black text-white mb-2">{topic.label}</h3>
                    <p className="text-white/40 text-sm leading-relaxed">{topic.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══ NEWSLETTER CTA ════════════════════════════════════════════════ */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="container mx-auto px-4 lg:px-8 max-w-3xl text-center">
          <Reveal direction="fade">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-widest
                             bg-blue-50 border border-blue-100 text-blue-600 mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
              Stay in the loop
            </span>
          </Reveal>
          <Reveal direction="up" delay={100}>
            <h2 className="text-4xl lg:text-5xl font-black text-gray-900 mb-4 leading-tight">
              Never miss a{' '}
              <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                new post
              </span>
            </h2>
          </Reveal>
          <Reveal direction="up" delay={200}>
            <p className="text-gray-500 text-lg max-w-lg mx-auto mb-10 leading-relaxed">
              We write about engineering, design, and building products that matter. No spam — just the good stuff, when we publish it.
            </p>
          </Reveal>
          <Reveal direction="up" delay={300}>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="your@email.com"
                className="flex-1 px-5 py-3 rounded-full border border-gray-200 text-sm focus:outline-none focus:border-blue-400
                           focus:ring-2 focus:ring-blue-100 transition-all duration-300"
              />
              <button className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-blue-600 text-white text-sm font-black uppercase tracking-widest
                                 hover:bg-blue-700 transition-colors duration-300 shadow-lg shadow-blue-500/30 whitespace-nowrap">
                Subscribe <ArrowRight size={13} />
              </button>
            </div>
            <p className="text-gray-400 text-xs mt-4">No spam. Unsubscribe anytime.</p>
          </Reveal>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default BlogPage;