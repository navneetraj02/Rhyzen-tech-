import { motion } from "framer-motion";

export function Footer() {
  return (
    <footer className="py-20 border-t border-white/5 bg-[#070710] relative z-10 overflow-hidden">
      
      {/* Massive Background Branding - Optimized for Visibility */}
      <div className="absolute inset-0 flex items-end justify-center pointer-events-none select-none overflow-hidden h-[500px]">
        <motion.span 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="text-[25vw] leading-none font-black text-white/[0.03] tracking-[-0.05em] uppercase whitespace-nowrap"
          style={{
            maskImage: 'linear-gradient(to top, white 0%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to top, white 0%, transparent 100%)',
          }}
        >
          RHYGEN
        </motion.span>
        
        {/* Blurry Duplicate for the "Half Blur" effect */}
        <motion.span 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 0.5, y: 0 }}
          transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
          className="absolute text-[25vw] leading-none font-black text-white/[0.02] tracking-[-0.05em] uppercase whitespace-nowrap blur-xl"
          style={{
            maskImage: 'linear-gradient(to bottom, white 0%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to bottom, white 0%, transparent 100%)',
          }}
        >
          RHYGEN
        </motion.span>
      </div>

      <div className="container mx-auto px-6 max-w-[1440px] relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12 pt-20">
          <div className="flex flex-col items-center md:items-start gap-4">
            <div className="text-3xl font-bold tracking-tighter">
              <span className="text-cyan">R</span><span className="text-white">hygen</span>
            </div>
            <p className="text-white/40 text-sm font-light tracking-widest uppercase">
              Intelligent Hybrid Powertrains
            </p>
          </div>

          <div className="flex gap-12 text-sm text-white/40 font-medium">
            <a href="#" className="hover:text-violet transition-colors">Privacy</a>
            <a href="#" className="hover:text-violet transition-colors">Terms</a>
            <a href="#" className="hover:text-violet transition-colors">LinkedIn</a>
            <a href="#" className="hover:text-violet transition-colors">Twitter</a>
          </div>

          <div className="text-white/20 text-xs font-mono text-center md:text-right">
            © 2026 RHYGEN TECHNOLOGIES PVT LTD. <br/>
            All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
