import { motion } from "framer-motion";

export function Traction() {
  const partners = [

    {
      name: "gradCapital",
      logo: "/logo_gradcapital.png",
      title: "",
      value: "gradCapital Atomic Grant Recipient",
      desc: "Selected for early-stage deep-tech backing."
    },
    {
      name: "SINE",
      logo: "/logo_sine.png",
      title: "",
      value: "SINE IoE Grant Recipient",
      desc: "Pre-incubated in SINE."
    },
    {
      name: "Emergent Ventures",
      logo: "/logo_mercatus.png",
      title: "",
      value: "Emergent Ventures Fellow",
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
      value: "2nd Runner-Up",
      desc: "Grand Challenge 2025 winner (3rd among 1,700 startups)."
    },
    {
      name: "ARAI",
      logo: "/logo_arai.png",
      title: "SIAT (ARAI) 2026",
      value: "Winner",
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
    <section id="traction" className="py-24 bg-transparent relative overflow-hidden flex flex-col items-center justify-center min-h-screen">
      <div className="max-w-[1440px] w-full px-6 flex flex-col items-center">
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="label-caps text-cyan mb-8"
        >
          Evidence of progress
        </motion.div>
        
        <h2 className="text-[clamp(32px,5vw,64px)] font-bold text-center text-white mb-16 tracking-tight">
          Evidence emerging from <span className="text-violet">darkness.</span>
        </h2>

        {/* Continuous Horizontal Slideshow of Cards */}
        <div 
          className="w-full overflow-hidden relative py-8 border-y border-white/5 pointer-events-auto"
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
                  {item.video ? (
                    <video 
                      src={item.video} 
                      autoPlay 
                      loop 
                      muted 
                      playsInline 
                      className="w-full h-full object-cover rounded-lg opacity-90 group-hover:opacity-100 transition-all duration-500"
                    />
                  ) : (
                    <img 
                      src={item.logo} 
                      alt={item.name} 
                      className="max-h-full max-w-full object-contain opacity-90 group-hover:opacity-100 transition-all duration-500"
                    />
                  )}
                </div>
                <div className="border-t border-white/5 pt-4 flex-1 flex flex-col justify-start gap-1">
                  <div>
                    {item.title && (
                      <span className="text-[10px] font-mono text-cyan/70 tracking-[2px] uppercase block mb-1">
                        {item.title}
                      </span>
                    )}
                    <h4 className="text-sm font-black text-white leading-tight mb-0 whitespace-normal break-words">
                      {item.value}
                    </h4>
                  </div>
                  <p className="text-[#A0A8C0] text-xs font-light leading-relaxed whitespace-normal mt-0">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Faint loop ticker at bottom */}
        <div className="mt-20 w-full overflow-hidden mask-edges opacity-20">
          <motion.div 
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
            className="flex gap-20 whitespace-nowrap text-white font-black text-xl tracking-[10px] uppercase"
          >
            {[...Array(10)].map((_, i) => (
              <span key={i}>IIT BOMBAY • SINE • TATA ACE PROTOTYPE • SEED GRANT • AUTOMOTIVE GRADE •</span>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
