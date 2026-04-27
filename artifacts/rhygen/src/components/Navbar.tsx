import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mic, Menu, X } from "lucide-react";

interface NavbarProps {
  onVoiceClick: () => void;
}

export function Navbar({ onVoiceClick }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Problem", href: "#problem" },
    { name: "Solution", href: "#solution" },
    { name: "Technology", href: "#technology" },
    { name: "Market", href: "#market" },
    { name: "Roadmap", href: "#roadmap" },
    { name: "Team", href: "#team" },
    { name: "Contact", href: "#contact" },
  ];

  const scrollTo = (href: string) => {
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled ? "bg-[#070710]/85 backdrop-blur-[20px] shadow-sm shadow-[#5B4EE8]/10 py-3" : "bg-transparent py-5"
        }`}
      >
        <div className="container mx-auto px-6 max-w-[1440px] flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center cursor-pointer overflow-hidden" onClick={() => window.scrollTo(0, 0)}>
            <motion.div 
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="text-[28px] font-bold tracking-tight"
            >
              <span className="text-[#5B4EE8]">R</span>
              <span className="text-white">hygen</span>
            </motion.div>
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link, i) => (
              <motion.a
                key={link.name}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.1, duration: 0.4 }}
                href={link.href}
                onClick={(e) => { e.preventDefault(); scrollTo(link.href); }}
                className="text-[14px] font-medium text-[#A0A8C0] hover:text-[#5B4EE8] transition-colors relative group"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-[#5B4EE8] transition-all duration-300 group-hover:w-full" />
              </motion.a>
            ))}
          </div>

          {/* Voice Button & Mobile Toggle */}
          <div className="flex items-center space-x-4">
            <motion.button
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 1, type: "spring" }}
              onClick={onVoiceClick}
              className="relative group w-12 h-12 rounded-full flex items-center justify-center bg-gradient-to-tr from-[#5B4EE8] to-[#00E5FF] hover:shadow-[0_0_20px_rgba(91,78,232,0.6)] transition-all z-50"
              title="Ask Rhygen"
            >
              <div className="absolute inset-0 rounded-full animate-ping opacity-0 group-hover:opacity-30 bg-[#00E5FF]"></div>
              <Mic className="text-white w-5 h-5 relative z-10" />
            </motion.button>

            <button 
              className="md:hidden text-white p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="fixed top-[70px] left-0 right-0 bg-[#070710]/95 backdrop-blur-xl z-30 md:hidden border-b border-[#5B4EE8]/20 overflow-hidden"
          >
            <div className="flex flex-col py-4 px-6 space-y-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => { e.preventDefault(); scrollTo(link.href); }}
                  className="text-[16px] font-medium text-white hover:text-[#5B4EE8] py-2 border-b border-white/5"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
