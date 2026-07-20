import React from "react";
import { 
  Phone, 
  Mail, 
  MapPin, 
  Linkedin, 
  Twitter, 
  Facebook, 
  Globe 
} from "lucide-react";

const Footer: React.FC = () => {
  return (
    <footer 
      className="
        relative bg-gradient-to-b from-[#0a1a3a] to-[#001233] 
        text-gray-300 pt-10 pb-6 overflow-hidden
      "
    >
      {/* Subtle wave background */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute bottom-0 left-0 right-0 h-64 bg-[radial-gradient(circle_at_30%_70%,rgba(59,130,246,0.15),transparent_50%)]" />
        <div className="absolute -bottom-20 left-1/2 -translate-x-1/2 w-[120%] h-96 bg-[radial-gradient(ellipse_at_top,rgba(59,130,246,0.08),transparent_60%)] rotate-3" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 z-10">
        <div className="grid md:grid-cols-4 gap-8 lg:gap-12">
          
          {/* Brand & Contact */}
          <div className="md:col-span-1 space-y-4">
            <div>
              <h3 className="text-3xl font-bold tracking-tight">
                <span className="text-3xl font-black text-white">
                  artecx
                  <sup style={{ fontSize: "0.45rem", verticalAlign: "super", lineHeight: 0, position: "relative", top: "-0.3em" }}>®</sup>
                  <span className="text-blue-400">.</span>
                </span>
              </h3>
              <p className="mt-2 text-xs text-gray-400 leading-relaxed">
                We build digital products that make everyday workflows simpler, smarter,
                and more human — for teams that refuse to settle.
              </p>
            </div>

            {/* Contact info */}
            <div className="flex flex-col space-y-2 text-sm">
              {/* Phone 1 */}
              <div className="flex items-center gap-2">
                <Phone size={14} className="text-blue-400 shrink-0" />
                <span>+44 735 6200 686</span>
              </div>
              {/* Phone 2 */}
              <div className="flex items-center gap-2">
                <Phone size={14} className="text-blue-400 shrink-0" />
                <span>+94 719 620 413</span>
              </div>
              {/* Email */}
              <div className="flex items-center gap-2">
                <Mail size={14} className="text-blue-400 shrink-0" />
                <a href="mailto:info@artecx-solutions.com" className="hover:text-white transition">
                  info@artecx-solutions.com
                </a>
              </div>
              {/* Location */}
              <div className="flex items-center gap-2">
                <MapPin size={14} className="text-blue-400 shrink-0" />
                <span>Colombo, Sri Lanka</span>
              </div>
            </div>

            {/* Social Icons */}
            <div className="flex gap-4">
              <a href="#" className="text-gray-400 hover:text-white transition">
                <Linkedin size={18} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition">
                <Twitter size={18} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition">
                <Facebook size={18} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition">
                <Globe size={18} />
              </a>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 md:contents">

            {/* COMPANY */}
            <div>
              <h4 className="text-white font-semibold tracking-wide mb-3 uppercase text-xs">
                Company
              </h4>
              <ul className="space-y-2 text-xs md:text-sm">
                <li><a href="/about" className="hover:text-white transition block">About Us</a></li>
                <li><a href="/team" className="hover:text-white transition block">Our Team</a></li>
                <li><a href="/careers" className="hover:text-white transition block">Careers</a></li>
                <li><a href="/blog" className="hover:text-white transition block">News & Blog</a></li>
              </ul>
            </div>

            {/* PROJECTS */}
            <div>
              <h4 className="text-white font-semibold tracking-wide mb-3 uppercase text-xs">
                Projects
              </h4>
              <ul className="space-y-2 text-xs md:text-sm">
                <li><a href="/citybus" className="hover:text-white transition block">City Bus</a></li>
                <li><a href="/petcare" className="hover:text-white transition block">Pet Care</a></li>
                <li><a href="/pos-system" className="hover:text-white transition block">POS System</a></li>
              </ul>
            </div>

            {/* RESOURCES */}
            <div>
              <h4 className="text-white font-semibold tracking-wide mb-3 uppercase text-xs">
                Resources
              </h4>
              <ul className="space-y-2 text-xs md:text-sm">
                <li><a href="/documentation" className="hover:text-white transition block">Docs</a></li>
                <li><a href="/api-reference" className="hover:text-white transition block">API Ref</a></li>
                <li><a href="/support" className="hover:text-white transition block">Support</a></li>
                <li><a href="https://status.yourdomain.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition block">Status</a></li>
              </ul>
            </div>

          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="relative border-t border-blue-900/30 mt-8 pt-5">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500 gap-3">
          <div>© 2026 ArtecX Pvt Ltd. All rights reserved.</div>
          <div className="flex gap-4">
            <a href="/privacy-policy" className="hover:text-gray-300 transition">Privacy Policy</a>
            <a href="/terms-of-use" className="hover:text-gray-300 transition">Terms of Use</a>
            <a href="/cookies" className="hover:text-gray-300 transition">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;