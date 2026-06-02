import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";

const milestones = [
  {
    number: "01",
    title: "Prototype 1.0 Complete",
    text: "Tata Ace built, road tested, dyno tested, baseline data captured",
    status: "ACHIEVED",
    color: "#00E5FF"
  },
  {
    number: "02",
    title: "Architecture 2.0 Progress",
    text: "Dual power-split refinement, control system development, Pune shift",
    status: "IN PROGRESS",
    color: "#5B4EE8"
  },
  {
    number: "03",
    title: "Automotive-Grade Prototype 2.0",
    text: "Improved HCU, packaging, integration, validation preparation",
    status: "Q3 2026",
    color: "#7C6CFF"
  },
  {
    number: "04",
    title: "Fleet Pilot Deployments",
    text: "Pilot vehicles with logistics operators in real operating conditions",
    status: "Q4 2026",
    color: "#00E5FF"
  },
  {
    number: "05",
    title: "OEM Engagement",
    text: "Presentations and technical discussions with commercial vehicle manufacturers",
    status: "2027 STRATEGY",
    color: "#5B4EE8"
  },
  {
    number: "06",
    title: "Certification & Validation",
    text: "Homologation and testing readiness",
    status: "Q1 2027",
    color: "#7C6CFF"
  },
  {
    number: "07",
    title: "Manufacturing Scale-Up",
    text: "Seed round facility setup, supply chain, deployment scaling",
    status: "VISION 2027",
    color: "#00E5FF"
  }
];

export function Roadmap() {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [scrollRange, setScrollRange] = useState(0);

  useEffect(() => {
    const calculateScrollRange = () => {
      if (scrollRef.current) {
        // total scrollable width minus window width
        setScrollRange(scrollRef.current.scrollWidth - window.innerWidth);
      }
    };
    
    // Run after component mount & paint to ensure DOM is ready
    const timer = setTimeout(calculateScrollRange, 100);
    
    window.addEventListener("resize", calculateScrollRange);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", calculateScrollRange);
    };
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const x = useTransform(scrollYProgress, [0, 1], [0, -scrollRange]);

  return (
    <section id="roadmap" ref={containerRef} className="relative h-[300vh] bg-transparent">
      {/* Sticky viewport container */}
      <div className="sticky top-0 h-screen overflow-hidden flex flex-col justify-between py-16 md:py-20 z-10">
        
        {/* Header (static within viewport) */}
        <div className="max-w-[1440px] mx-auto px-6 w-full text-center mb-6 shrink-0 relative z-20">
          <div className="label-caps text-cyan mb-2">The Strategic Journey</div>
          <h2 className="text-[clamp(32px,5vw,64px)] font-black text-white uppercase tracking-tighter">
            THE <span className="text-violet">ROADMAP.</span>
          </h2>
        </div>

        {/* Horizontal Marquee viewport wrapper */}
        <div className="flex-1 flex items-center relative overflow-hidden my-4">
          
          {/* Centered horizontal timeline path line */}
          <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-[2px] bg-gradient-to-r from-cyan/20 via-violet/30 to-cyan/20 z-0" />

          {/* Animating row of cards */}
          <motion.div 
            ref={scrollRef}
            style={{ x }} 
            className="flex gap-8 px-[15vw] md:px-[20vw] relative z-10 items-center h-full"
          >
            {milestones.map((milestone, i) => (
              <div 
                key={i} 
                className="w-[280px] md:w-[360px] shrink-0 relative flex flex-col items-center h-[460px] justify-center py-4"
              >
                {/* Connector dot exactly on center timeline path */}
                <div className="absolute top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-[#070710] border-2 border-white/20 z-20 flex items-center justify-center">
                  <div 
                    className="w-2 h-2 rounded-full"
                    style={{ 
                      backgroundColor: milestone.color, 
                      boxShadow: `0 0 10px ${milestone.color}` 
                    }}
                  />
                </div>

                {i % 2 === 0 ? (
                  // Card on top of line
                  <>
                    <div className="absolute top-4 left-0 right-0 z-10">
                      <div 
                        className="glass-ui p-6 rounded-2xl relative overflow-hidden group hover:border-white/25 transition-all duration-500 bg-white/[0.02] border-l-4" 
                        style={{ borderLeftColor: milestone.color }}
                      >
                        {/* Number Watermark */}
                        <span className="absolute -top-4 -right-4 text-7xl font-black text-white/[0.02] select-none group-hover:text-white/[0.05] transition-colors pointer-events-none">
                          {milestone.number}
                        </span>

                        {/* Status Tag */}
                        <div 
                          className="absolute top-0 left-0 px-3 py-1 rounded-br-lg text-[8px] font-black tracking-widest text-black"
                          style={{ backgroundColor: milestone.color }}
                        >
                          {milestone.status}
                        </div>

                        {/* Background Glow */}
                        <div 
                          className="absolute -right-12 -top-12 w-24 h-24 rounded-full blur-[40px] opacity-10 transition-opacity group-hover:opacity-20 pointer-events-none"
                          style={{ backgroundColor: milestone.color }}
                        />
                        
                        <h4 className="text-lg font-bold text-white mb-2 group-hover:text-cyan transition-colors">{milestone.title}</h4>
                        <div className="w-8 h-[2px] bg-white/10 mb-4" />
                        <p className="text-[#A0A8C0] font-light leading-relaxed text-xs md:text-sm whitespace-normal">
                          {milestone.text}
                        </p>
                      </div>
                    </div>
                    {/* Connector line */}
                    <div 
                      className="w-[1px] bg-white/20 absolute left-1/2 -translate-x-1/2 z-0" 
                      style={{ top: "210px", bottom: "230px" }} 
                    />
                  </>
                ) : (
                  // Card below line
                  <>
                    {/* Connector line */}
                    <div 
                      className="w-[1px] bg-white/20 absolute left-1/2 -translate-x-1/2 z-0" 
                      style={{ top: "230px", bottom: "210px" }} 
                    />
                    <div className="absolute bottom-4 left-0 right-0 z-10">
                      <div 
                        className="glass-ui p-6 rounded-2xl relative overflow-hidden group hover:border-white/25 transition-all duration-500 bg-white/[0.02] border-l-4" 
                        style={{ borderLeftColor: milestone.color }}
                      >
                        {/* Number Watermark */}
                        <span className="absolute -top-4 -right-4 text-7xl font-black text-white/[0.02] select-none group-hover:text-white/[0.05] transition-colors pointer-events-none">
                          {milestone.number}
                        </span>

                        {/* Status Tag */}
                        <div 
                          className="absolute top-0 left-0 px-3 py-1 rounded-br-lg text-[8px] font-black tracking-widest text-black"
                          style={{ backgroundColor: milestone.color }}
                        >
                          {milestone.status}
                        </div>

                        {/* Background Glow */}
                        <div 
                          className="absolute -right-12 -top-12 w-24 h-24 rounded-full blur-[40px] opacity-10 transition-opacity group-hover:opacity-20 pointer-events-none"
                          style={{ backgroundColor: milestone.color }}
                        />
                        
                        <h4 className="text-lg font-bold text-white mb-2 group-hover:text-cyan transition-colors">{milestone.title}</h4>
                        <div className="w-8 h-[2px] bg-white/10 mb-4" />
                        <p className="text-[#A0A8C0] font-light leading-relaxed text-xs md:text-sm whitespace-normal">
                          {milestone.text}
                        </p>
                      </div>
                    </div>
                  </>
                )}
              </div>
            ))}
          </motion.div>
        </div>

        {/* Bottom Call to Action */}
        <div className="text-center mt-6 shrink-0 relative z-20">
          <div className="inline-block glass-ui px-8 py-3 border-violet/30">
            <span className="text-white/40 text-[9px] tracking-[4px] uppercase font-bold">Engineering the Future of Logistics</span>
          </div>
        </div>

      </div>
    </section>
  );
}