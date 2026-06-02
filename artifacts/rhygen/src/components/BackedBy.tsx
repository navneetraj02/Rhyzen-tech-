import { motion } from "framer-motion";

export function BackedBy() {
  const partners = [
    {
      name: "gradCapital",
      logo: "/logo_gradcapital.png",
      title: "gradCapital Atomic Grant",
      value: "$4,000",
      desc: "Selected for early-stage deep-tech backing."
    },
    {
      name: "SINE",
      logo: "/logo_sine.png",
      title: "SINE IoE Grant",
      value: "INR 6 Lakhs",
      desc: "Development grant from IIT Bombay's premier incubator."
    },
    {
      name: "Emergent Ventures",
      logo: "/logo_emergent.png",
      title: "Emergent Ventures Grant",
      value: "$17,000",
      desc: "Backed by the global philanthropic fund for hard tech."
    },
    {
      name: "IIT Bombay",
      logo: "/logo_iitb.svg",
      title: "Project Titanium",
      value: "SINE IIT Bombay",
      desc: "Inducted into the elite hardware scale-up program."
    },
    {
      name: "AWS",
      logo: "/logo_aws.png",
      title: "AWS Campus Fund",
      value: "3rd Place",
      desc: "Grand Challenge 2025 winner (3rd among 1,700 startups)."
    },
    {
      name: "ARAI",
      logo: "/logo_arai.png",
      title: "SIAT (ARAI) 2026",
      value: "1st Prize",
      desc: "First prize winners at the prestigious ARAI automotive summit."
    },
    {
      name: "Lightspeed",
      logo: "/logo_lightspeed.svg",
      title: "India Ascends 2026",
      value: "Top 12 Startup",
      desc: "Selected by Lightspeed among the top startups in India."
    }
  ];

  // Double the array for smooth looping marquee
  const tickerItems = [...partners, ...partners];

  return (
    <section className="py-24 bg-transparent relative overflow-hidden">
      {/* Header */}
      <div className="max-w-[1200px] mx-auto px-6 relative z-10">
        <div className="flex flex-col items-center mb-16">
          <h2 className="text-[clamp(32px,5vw,64px)] font-black text-center text-white tracking-tight uppercase">
            Backed by
          </h2>
          <div className="w-16 h-[2px] bg-cyan mt-4" />
        </div>
      </div>

      {/* Continuous Horizontal Slideshow of Cards */}
      <div 
        className="w-full overflow-hidden relative py-8 border-y border-white/5"
        style={{
          maskImage: 'linear-gradient(to right, transparent, white 15%, white 85%, transparent)',
          WebkitMaskImage: 'linear-gradient(to right, transparent, white 15%, white 85%, transparent)',
        }}
      >
        <motion.div 
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="flex gap-6 items-stretch whitespace-nowrap w-max px-6"
        >
          {tickerItems.map((item, i) => (
            <div 
              key={i} 
              className="w-[280px] md:w-[320px] shrink-0 glass-ui p-6 rounded-2xl border border-white/10 flex flex-col justify-between hover:border-cyan/30 transition-all duration-500 group"
            >
              <div className="flex items-center justify-center h-16 w-full mb-6">
                <img 
                  src={item.logo} 
                  alt={item.name} 
                  className="max-h-full max-w-full object-contain grayscale brightness-200 contrast-125 opacity-70 group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-500"
                />
              </div>
              <div className="border-t border-white/5 pt-4">
                <span className="text-[10px] font-mono text-cyan/70 tracking-[2px] uppercase block mb-1">
                  {item.title}
                </span>
                <h4 className="text-lg font-black text-white leading-tight mb-2">
                  {item.value}
                </h4>
                <p className="text-[#A0A8C0] text-xs font-light leading-relaxed whitespace-normal">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
