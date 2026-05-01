import { motion } from "framer-motion";
import { SectionReveal } from "./Reveal";

export function Pledge() {
  return (
    <section className="min-h-screen flex items-center justify-center py-40 px-6 relative overflow-hidden bg-black">
      
      {/* Cinematic Background Atmosphere */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-blue-500/5 rounded-full blur-[160px]" />
        {/* Slow floating particles */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              y: [0, -100, 0],
              opacity: [0, 0.4, 0],
              scale: [0.5, 1, 0.5]
            }}
            transition={{
              duration: 10 + i * 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 1.5
            }}
            className="absolute w-1 h-1 bg-cyan rounded-full blur-[2px]"
            style={{
              top: `${20 + i * 15}%`,
              left: `${15 + i * 12}%`,
            }}
          />
        ))}
      </div>

      <SectionReveal className="max-w-[1000px] w-full">
        <div className="relative p-[1px] rounded-[40px] overflow-hidden group">
          {/* THE ROTATING GLOW BORDER */}
          <div className="absolute inset-[-20%] bg-[conic-gradient(from_0deg,transparent,transparent,rgba(0,229,255,0.4),transparent,transparent)] animate-[spin_6s_linear_infinite] group-hover:animate-[spin_3s_linear_infinite] group-hover:bg-[conic-gradient(from_0deg,transparent,transparent,rgba(0,229,255,1),transparent,transparent)] transition-all duration-1000" />
          
          {/* MAIN CARD CONTENT */}
          <div className="glass-ui p-12 md:p-24 relative rounded-[39px] overflow-hidden border-white/[0.05] bg-[#0A0B14]/90 backdrop-blur-3xl">
            
            {/* Internal Geometric Glows */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-cyan/10 rounded-full blur-[100px] opacity-50 group-hover:opacity-100 transition-opacity duration-1000" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-violet/10 rounded-full blur-[100px] opacity-50 group-hover:opacity-100 transition-opacity duration-1000" />

            <div className="relative z-10">
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                className="flex items-center gap-6 mb-16"
              >
                <div className="w-12 h-[1px] bg-cyan" />
                <span className="text-[11px] font-black text-cyan tracking-[8px] uppercase drop-shadow-[0_0_8px_rgba(0,229,255,0.5)]">The Rhygen Pledge</span>
              </motion.div>

              <h3 className="text-[clamp(28px,4.5vw,56px)] font-bold text-white leading-[1.15] mb-20 tracking-tighter">
                For every truck we ship, we commit to one promise:{" "}
                <span className="relative inline-block mt-4 group">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00E5FF] via-[#7C6CFF] to-[#00E5FF] bg-[length:200%_auto] animate-gradient-x font-black italic">
                    a cleaner breath, a kinder climate, and a better tomorrow
                  </span>
                  {/* Neon Underline Pulse */}
                  <motion.div 
                    animate={{ opacity: [0.3, 0.8, 0.3], width: ["0%", "100%", "0%"] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute -bottom-4 left-0 h-[2px] bg-gradient-to-r from-cyan to-violet shadow-[0_0_20px_rgba(0,229,255,0.8)]" 
                  />
                </span>
                <br />
                for the people who keep India moving.
              </h3>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-6">
                  <div className="w-16 h-16 rounded-2xl border border-white/10 flex items-center justify-center bg-white/5 backdrop-blur-sm group-hover:border-cyan/30 transition-colors duration-500">
                    <span className="text-cyan text-[10px] font-black tracking-widest rotate-[-90deg]">IITB</span>
                  </div>
                  <motion.div 
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                    className="flex flex-col"
                  >
                    <span className="text-white font-bold text-xl tracking-wide">— The Rhygen Team</span>
                    <span className="text-white/40 text-sm font-light">Excellence in Mobility</span>
                  </motion.div>
                </div>

                {/* Technical HUD element */}
                <div className="hidden md:flex flex-col items-end opacity-20 text-[10px] font-mono tracking-tighter text-white">
                  <span>SECURED PLEDGE</span>
                  <span>VERIFIED: 2026</span>
                  <div className="flex gap-1 mt-2">
                    <div className="w-1 h-1 bg-cyan rounded-full animate-pulse" />
                    <div className="w-1 h-1 bg-white rounded-full opacity-50" />
                    <div className="w-1 h-1 bg-white rounded-full opacity-50" />
                  </div>
                </div>
              </div>
            </div>

            {/* Scanning Laser Line */}
            <motion.div 
              animate={{ top: ['-10%', '110%'] }}
              transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
              className="absolute left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyan/20 to-transparent z-0"
            />
          </div>
        </div>
      </SectionReveal>
    </section>
  );
}
