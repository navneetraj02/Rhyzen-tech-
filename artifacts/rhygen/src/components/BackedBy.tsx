import { motion } from "framer-motion";

export function BackedBy() {
  const logos = [
    { name: "IIT Bombay", src: "/logo_iitb.svg" },
    { name: "SINE", src: "/logo_sine.png" },
    { name: "Emergent Ventures", src: "/logo_emergent.png" },
    { name: "gradCapital", src: "/logo_gradcapital.png" },
  ];

  // Quadruple the array for smooth looping marquee
  const tickerLogos = [...logos, ...logos, ...logos, ...logos];

  const recognitions = [
    { title: "gradCapital Atomic Grant", value: "$4,000", desc: "Selected for early-stage deep-tech backing.", color: "text-cyan border-cyan/30" },
    { title: "SINE IoE Grant", value: "INR 6 Lakhs", desc: "Development grant from IIT Bombay's premier incubator.", color: "text-violet border-violet/30" },
    { title: "Emergent Ventures Grant", value: "$17,000", desc: "Backed by the global philanthropic fund for hard tech.", color: "text-cyan border-cyan/30" },
    { title: "Project Titanium", value: "SINE IIT Bombay", desc: "Inducted into the elite hardware scale-up program.", color: "text-violet border-violet/30" },
    { title: "AWS Campus Fund", value: "3rd Place", desc: "Grand Challenge 2025 winner (3rd among 1,700 startups).", color: "text-cyan border-cyan/30" },
    { title: "SIAT (ARAI) 2026", value: "1st Prize", desc: "First prize winners at the prestigious ARAI automotive summit.", color: "text-violet border-violet/30" },
    { title: "India Ascends 2026", value: "Top 12", desc: "Selected by Lightspeed among the top startups in India.", color: "text-cyan border-cyan/30" },
  ];

  return (
    <section className="py-24 bg-transparent relative overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-6 relative z-10">
        
        {/* Minimal Centered Header */}
        <div className="flex flex-col items-center mb-16">
          <span className="text-[10px] font-black tracking-[8px] text-cyan/40 uppercase">Backed By & Recognized</span>
          <div className="w-10 h-[1px] bg-cyan/20 mt-3" />
        </div>

        {/* Continuous Horizontal Slideshow of Logos */}
        <div 
          className="w-full overflow-hidden relative py-12 mb-20 border-y border-white/5"
          style={{
            maskImage: 'linear-gradient(to right, transparent, white 15%, white 85%, transparent)',
            WebkitMaskImage: 'linear-gradient(to right, transparent, white 15%, white 85%, transparent)',
          }}
        >
          <motion.div 
            animate={{ x: ["0%", "-25%"] }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            className="flex gap-20 items-center whitespace-nowrap w-max"
          >
            {tickerLogos.map((logo, i) => (
              <div key={i} className="flex items-center justify-center h-16 w-36 shrink-0 relative group px-4">
                <img 
                  src={logo.src} 
                  alt={logo.name} 
                  className="max-h-full max-w-full object-contain grayscale brightness-200 contrast-125 opacity-40 group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-500 filter drop-shadow-[0_0_8px_rgba(0,229,255,0.1)] group-hover:drop-shadow-[0_0_15px_rgba(0,229,255,0.6)]"
                />
              </div>
            ))}
          </motion.div>
        </div>

        {/* Grid of Key Grants & Recognitions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recognitions.map((item, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.8 }}
              className={`glass-ui p-8 rounded-2xl flex flex-col justify-between border-l-4 ${item.color} hover:bg-white/[0.01] transition-colors group`}
            >
              <div>
                <span className="text-[10px] font-mono text-white/30 tracking-[2px] uppercase block mb-3">{item.title}</span>
                <h3 className="text-3xl font-black text-white group-hover:text-cyan transition-colors duration-300 leading-none mb-4">
                  {item.value}
                </h3>
              </div>
              <p className="text-[#A0A8C0] text-sm font-light leading-relaxed mt-2">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
