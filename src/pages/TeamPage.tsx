import React, { useState, useEffect, useRef } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import bgVideo from "../assets/Video/bg-video.mp4";
import teamHero from "../assets/team-hero.png";

// Leadership images
import tharinduImg       from "../assets/tharindu.jpg";
import sahanImg          from "../assets/Sahan.jpg";

// Team Lead images
import hasiniImg       from "../assets/QA-Lead.jpeg";
import aiLeadImg         from "../assets/AI-Lead.jpeg";
import backendLeadImg    from "../assets/Backend-Lead.jpeg";
import frontendWebImg    from "../assets/Frontend-Web.jpg";
import frontendMobileImg from "../assets/Frontend-Mobile.jpeg";
const marketingLeadImg = "https://randomuser.me/api/portraits/women/45.jpg";
import rdLeadImg         from "../assets/R&D-Lead.jpeg";

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

const FadeUp: React.FC<{ children: React.ReactNode; delay?: number; className?: string }> = ({
  children, delay = 0, className = ""
}) => {
  const { ref, inView } = useInView();
  return (
    <div
      ref={ref}
      className={`transition-all duration-600 ease-out
        ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}
        ${className}`}
      style={{ transitionDelay: inView ? `${delay}ms` : "0ms" }}
    >
      {children}
    </div>
  );
};

type Member = {
  id: number;
  name: string;
  role: string;
  image: string;
  category: string;
};

const members: Member[] = [
  { 
    id: 1, 
    name: "Tharindu De Zoysa",    
    role: "Founder & CEO",   
    image: tharinduImg,
    category: "Leadership" 
  },
  { 
    id: 2, 
    name: "Sahan Abeysinghe",     
    role: "Chief Technical Officer (CTO)",             
    image: sahanImg,
    category: "Leadership" 
  },
  { 
    id: 4, 
    name: "Dinithi Gamage",       
    role: "UI/UX",           
    image: "https://randomuser.me/api/portraits/women/44.jpg", 
    category: "Team Leads" 
  },
  { 
    id: 5, 
    name: "Natasha Fernando",     
    role: "Frontend Mobile", 
    image: frontendMobileImg,
    category: "Team Leads" 
  },
  { 
    id: 6, 
    name: "Supuni Madushani",       
    role: "Frontend Web",    
    image: frontendWebImg,
    category: "Team Leads" 
  },
  { 
    id: 7, 
    name: "Pathum Sankalpa",      
    role: "Backend",         
    image: backendLeadImg,
    category: "Team Leads" 
  },
  { 
    id: 8, 
    name: "Chathurika Ariyasena", 
    role: "Marketing",       
    image: marketingLeadImg,           
    category: "Team Leads" 
  },
  { 
    id: 9, 
    name: "Sunera Hettiarachchi", 
    role: "R&D",             
    image: rdLeadImg,                  
    category: "Team Leads" 
  },
  { 
    id: 10, 
    name: "Hasini Kavindi",     
    role: "QA",              
    image: hasiniImg,                 
    category: "Team Leads" 
  },
  { 
    id: 11, 
    name: "Damean Chamod",              
    role: "AI & ML",              
    image: aiLeadImg,                  
    category: "Team Leads" 
  },
];

const tabs = ["Leadership", "Team Leads", "Employee Of The Month"];

const TeamPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("Leadership");
  const [heroVisible, setHeroVisible] = useState(false);

  const filtered = members.filter((m) => m.category === activeTab);

  useEffect(() => {
    const t = setTimeout(() => setHeroVisible(true), 80);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="w-full min-h-screen bg-white">
      <Navbar />

      <div className="relative w-full min-h-[60vh] sm:min-h-[80vh] md:min-h-screen lg:min-h-[120vh] overflow-hidden">
        <img
          src={teamHero}
          alt="Team"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/30" />
        <div className="absolute inset-0 flex flex-col items-center justify-center px-4">
          <h1
            className={`text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-center drop-shadow-lg
                        transition-all duration-700 ease-out
                        ${heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
            style={{ transitionDelay: "150ms" }}
          >
            Our Team
          </h1>
          <p
            className={`text-white/80 mt-4 text-base sm:text-lg md:text-xl lg:text-2xl text-center max-w-2xl drop-shadow-md
                        transition-all duration-700 ease-out
                        ${heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
            style={{ transitionDelay: "320ms" }}
          >
            The engineers and designers behind every product
          </p>
        </div>
      </div>

      <div className="w-full bg-white">
        <div className="max-w-6xl mx-auto px-6 pt-10 pb-16">

          <FadeUp>
            <h2 className="text-5xl lg:text-6xl font-black text-gray-900 mb-3">Meet our team</h2>
            <p className="text-gray-500 text-lg max-w-3xl mb-6">
              The Team behind every product
            </p>
          </FadeUp>

          <FadeUp delay={100}>
            <div className="flex flex-wrap gap-5 border-b border-gray-200">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`text-base pb-2 transition-colors duration-200 ${
                    activeTab === tab
                      ? "border-b-2 border-blue-600 text-blue-600 font-medium"
                      : "text-gray-400 hover:text-gray-700"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </FadeUp>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-10">
            {filtered.map((member, i) => (
              <FadeUp key={member.id} delay={i * 60}>
                <div className="text-center group">
                  <div
                    className={`mx-auto rounded-full overflow-hidden shadow-md
                                group-hover:shadow-xl group-hover:scale-105 transition-all duration-300
                                ${member.category === "Leadership" ? "w-32 h-32" : "w-24 h-24"}`}
                  >
                    <img
                      src={member.image}
                      alt={member.name || member.role}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <h3
                    className={`mt-4 font-semibold text-gray-800 group-hover:text-blue-600 transition-colors duration-200
                                ${member.category === "Leadership" ? "text-lg" : "text-base"}`}
                  >
                    {member.name || "Team Member"}
                  </h3>
                  <p className="text-sm text-gray-400 mt-1">{member.role}</p>
                  <div className="mx-auto mt-2 h-px bg-blue-500 w-0 group-hover:w-10 transition-all duration-300 rounded-full" />
                </div>
              </FadeUp>
            ))}
            {filtered.length === 0 && (
              <p className="text-gray-400 col-span-full text-center">No members in this category.</p>
            )}
          </div>
        </div>

        <section className="relative w-full h-100 md:h-107.5 overflow-hidden">
          <video
            autoPlay muted loop playsInline
            className="absolute inset-0 w-full h-full object-cover"
          >
            <source src={bgVideo} type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-black/50" />
          <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
            <FadeUp>
              <h2 className="text-white text-2xl md:text-3xl font-semibold mb-2">
                Have a project in mind?
              </h2>
              <p className="text-white/80 mb-6">Our Team, Your Success</p>
              <button
                onClick={() => (window.location.href = "/contact")}
                className="bg-white text-gray-800 px-6 py-2 rounded-lg font-semibold
                           hover:bg-white/80 hover:scale-105 active:scale-95
                           transition-all duration-200"
              >
                Contact Us
              </button>
            </FadeUp>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
};

export default TeamPage;
