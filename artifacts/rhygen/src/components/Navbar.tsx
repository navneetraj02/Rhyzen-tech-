import { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface NavbarProps {
  onVoiceClick: () => void;
}

export function Navbar({ onVoiceClick }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToContact = () => {
    const element = document.querySelector("#contact");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-700 ${
        scrolled ? "glass-header py-3" : "bg-transparent py-8"
      }`}
    >
      <div className="container mx-auto px-10 max-w-[1440px] flex items-center justify-between">
        
        {/* Logo */}
        <div 
          className="flex items-center cursor-pointer group" 
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          <div className="text-[clamp(32px,4vw,38px)] font-black tracking-tighter relative">
            <span className="text-cyan transition-all duration-500 group-hover:text-violet drop-shadow-[0_0_12px_rgba(0,229,255,0.6)] group-hover:drop-shadow-[0_0_15px_rgba(124,108,255,0.6)]">R</span>
            <span className="text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.2)]">HYGEN</span>
            <div className="absolute -inset-2 bg-cyan/5 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
          </div>
        </div>

        {/* Right Side Actions */}
        <div className="flex items-center space-x-12">
          {/* Single Contact Link */}
          <button 
            onClick={scrollToContact}
            className="text-[11px] font-black uppercase tracking-[4px] text-white/60 hover:text-cyan transition-all relative group"
          >
            Contact
            <span className="absolute -bottom-2 left-0 w-0 h-[1px] bg-cyan transition-all duration-300 group-hover:w-full" />
          </button>

          {/* Voice Button Orb - With Voice Wave Icon */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={onVoiceClick}
            className="relative w-12 h-12 rounded-full flex items-center justify-center group pointer-events-auto overflow-hidden"
            title="Activate Rhygen AI"
          >
            <div className="absolute inset-0 rounded-full bg-violet/20 blur-md group-hover:bg-cyan/30 transition-all duration-500" />
            <div className="absolute inset-0 rounded-full border border-violet/30 group-hover:border-cyan/50 transition-all duration-500" />
            
            {/* Animated Voice Wave Icon */}
            <div className="relative flex items-end gap-[3px] h-3">
              {[0.4, 1, 0.6, 0.8, 0.5].map((height, i) => (
                <motion.div
                  key={i}
                  animate={{ 
                    height: ["30%", "100%", "30%"],
                    opacity: [0.4, 1, 0.4]
                  }}
                  transition={{ 
                    duration: 1 + i * 0.2, 
                    repeat: Infinity, 
                    ease: "easeInOut",
                    delay: i * 0.1
                  }}
                  className="w-[2px] bg-white group-hover:bg-cyan rounded-full"
                  style={{ height: `${height * 100}%` }}
                />
              ))}
            </div>

            <div className="absolute inset-[-4px] rounded-full border border-cyan/0 group-hover:border-cyan/20 animate-pulse transition-all duration-500" />
          </motion.button>
        </div>
      </div>
    </motion.nav>
  );
}
