import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { NavHashLink } from "react-router-hash-link";
import { useLocation } from "react-router-dom";

const headerLinks = [
  { name: "Home",    href: "/#top",    match: "/" },
  { name: "About",   href: "/about",   match: "/about" },
  { name: "Blog",    href: "/blog",    match: "/blog" },
  { name: "Careers", href: "/careers", match: "/careers" },
];

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActive = (match: string) => {
    if (match === "/") return location.pathname === "/";
    return location.pathname.startsWith(match);
  };

  return (
    <nav
      className={`fixed top-0 w-full z-50 py-4 px-4 lg:px-8 transition-all duration-300 ${
        isScrolled
          ? "bg-white/80 backdrop-blur-xl border-b border-gray-200/60 shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="flex justify-between items-center">

        {/* Brand text only — logo image removed */}
        <span className={`text-2xl font-black transition-colors duration-300 ${isScrolled ? "text-black" : "text-white"}`}>
          artecx
          <sup style={{ fontSize: "0.5rem", verticalAlign: "super", lineHeight: 0, position: "relative", top: "-0.3em" }}>®</sup>
          <span className="text-blue-400">.</span>
        </span>

        {/* Desktop Links — absolutely centered */}
        <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center gap-1 backdrop-blur-sm bg-black/10 border border-white/10 px-3 py-2 rounded-full">
          {headerLinks.map((link) => {
            const active = isActive(link.match);
            return (
              <NavHashLink
                smooth
                key={link.name}
                to={link.href}
                onClick={() => setIsMenuOpen(false)}
                className={`relative text-sm font-semibold px-3 py-1.5 rounded-full transition-all ${
                  isScrolled ? "text-black hover:text-gray-700" : "text-white/90 hover:text-white"
                }`}
              >
                {link.name}
                <span
                  className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-blue-400 transition-all duration-300 ${
                    active ? "opacity-100 translate-y-0" : "opacity-0 translate-y-1"
                  }`}
                />
              </NavHashLink>
            );
          })}
        </div>

        {/* Spacer */}
        <div className="hidden md:block w-[120px]" />

        {/* Mobile Button */}
        <button
          className={`md:hidden ${isScrolled ? "text-black" : "text-white"}`}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden mt-4 backdrop-blur-sm bg-black/20 border border-white/10 rounded-2xl p-4">
          {headerLinks.map((link) => {
            const active = isActive(link.match);
            return (
              <NavHashLink
                smooth
                key={link.name}
                to={link.href}
                onClick={() => setIsMenuOpen(false)}
                className={`flex items-center justify-between py-3 px-4 rounded-lg transition-colors ${
                  isScrolled
                    ? "text-black hover:bg-gray-100"
                    : "text-white/90 hover:text-white hover:bg-white/10"
                }`}
              >
                {link.name}
                {active && (
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                )}
              </NavHashLink>
            );
          })}
        </div>
      )}
    </nav>
  );
};

export default Navbar;