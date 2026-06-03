import { motion, useMotionValue, useSpring, useTransform, useMotionValueEvent, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Check } from "lucide-react";

const milestones = [
  {
    number: "01",
    shortTitle: "Prototype 1.0",
    title: "Prototype 1.0 Complete",
    text: "Tata Ace built, road tested, dyno tested, and baseline data captured. The prototype successfully validated our primary power-split efficiency loop under varying regional drive cycles.",
    status: "ACHIEVED",
    color: "#00E5FF",
    highlights: [
      { label: "Efficiency gain", value: "+50%" },
      { label: "Emission reduction", value: "~50%" }
    ],
    details: "Baseline testing completed on ARAI chassis dynamometers. Verified functional power split and battery management loops."
  },
  {
    number: "02",
    shortTitle: "Arch 2.0 Progress",
    title: "Architecture 2.0 Progress",
    text: "Dual power-split refinement, control system development, and shift to Pune's automotive hub. Refining control algorithm mapping in Simulink.",
    status: "IN PROGRESS",
    color: "#5B4EE8",
    highlights: [
      { label: "AI Control Loop", value: "Active" },
      { label: "HCU Response Time", value: "92%" }
    ],
    details: "Developing automated HCU safety systems. Relocating operations to integration centers in Pune."
  },
  {
    number: "03",
    shortTitle: "Automotive Prototype 2.0",
    title: "Automotive Prototype 2.0",
    text: "Improved HCU, structural packaging, vehicle integration, and validation preparation. Engineering enclosures for commercial-grade validation.",
    status: "Q3 2026",
    color: "#7C6CFF",
    highlights: [
      { label: "Battery size", value: "80% Smaller" },
      { label: "Case rating", value: "IP67 Hardened" }
    ],
    details: "Developing compact, durable high-voltage assemblies. Coordinating testing setups with ARAI technical advisors."
  },
  {
    number: "04",
    shortTitle: "Fleet Pilots",
    title: "Fleet Pilot Deployments",
    text: "Deploying prototype trucks to regional freight routes in Maharashtra. Partnering with major logistics operators for real-world pilot deployments.",
    status: "Q4 2026",
    color: "#00E5FF",
    highlights: [
      { label: "Test distance", value: "100k+ km" },
      { label: "Partner Fleets", value: "5 Operators" }
    ],
    details: "Capturing critical fuel economy records, engine cooling logs, and high-voltage system thermal data."
  },
  {
    number: "05",
    shortTitle: "OEM Engagement",
    title: "OEM Engagement",
    text: "Initiating co-development technical integration reviews for factory-fit designs. Presenting cost-benefit telemetry models to major CV manufacturers.",
    status: "2027 STRATEGY",
    color: "#5B4EE8",
    highlights: [
      { label: "Integration", value: "B2B Factory" },
      { label: "Connects", value: "Tier-1 Suppliers" }
    ],
    details: "Formulating custom assembly and licensing structures for manufacturing integrations."
  },
  {
    number: "06",
    shortTitle: "Certification",
    title: "Certification & Validation",
    text: "Undergoing formal certification and homologation safety testing. Completing structural safety and electromagnetic checks.",
    status: "Q1 2027",
    color: "#7C6CFF",
    highlights: [
      { label: "Certification", value: "ARAI Approvals" },
      { label: "Standards", value: "AIS-028" }
    ],
    details: "Completing AIS-028 compliance checks, vibration safety testing, and electrical battery isolation verification."
  },
  {
    number: "07",
    shortTitle: "Scale-Up",
    title: "Manufacturing Scale-Up",
    text: "Setting up local assembly footprint and localized supply chains. Securing seed round facility setup and supplier sourcing scaling.",
    status: "VISION 2027",
    color: "#00E5FF",
    highlights: [
      { label: "Assembly Capacity", value: "5k / Year" },
      { label: "Sourcing", value: "Localized" }
    ],
    details: "Establishing long-term component procurement contracts with localized tier-1 automotive partners."
  }
];

export function Roadmap() {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [scrollRange, setScrollRange] = useState(0);
  const [activeIndex, setActiveIndex] = useState(-1);

  // Path constants for curved timeline layout
  const startX = 100;
  const gap = 420;
  const centerY = 290;
  const amplitude = 80;
  const endExtension = 150;
  const totalWidth = startX + milestones.length * gap + endExtension;

  // Custom high-performance motion values for scroll observer
  const scrollProgress = useMotionValue(0);
  const smoothProgress = useSpring(scrollProgress, { 
    stiffness: 90, 
    damping: 26, 
    restDelta: 0.001 
  });

  // Sync scroll progress with active milestone index, including the 15% scroll delay buffer and 15% end buffer
  useMotionValueEvent(smoothProgress, "change", (latest) => {
    if (latest < 0.15) {
      setActiveIndex(-1); // Intro Phase (Rhygen logo is visible, drawing line at 0)
    } else if (latest >= 0.85) {
      setActiveIndex(-2); // Outro Phase (No milestones shown, line is fully drawn)
    } else {
      const journeyProgress = (latest - 0.15) / 0.70; // Journey Phase maps [0.15, 0.85] to [0, 1]
      const idx = Math.floor(journeyProgress * milestones.length);
      setActiveIndex(Math.min(milestones.length - 1, Math.max(0, idx)));
    }
  });

  // Generate smooth horizontal Bezier zigzag curve
  const generatePath = () => {
    let d = `M ${startX},${centerY}`;
    
    for (let i = 0; i < milestones.length; i++) {
      const x = startX + (i + 1) * gap;
      const y = centerY + (i % 2 === 0 ? -amplitude : amplitude);
      
      const prevX = startX + i * gap;
      const prevY = i === 0 ? centerY : centerY + ((i - 1) % 2 === 0 ? -amplitude : amplitude);
      
      const cp1x = prevX + gap / 2;
      const cp1y = prevY;
      const cp2x = prevX + gap / 2;
      const cp2y = y;
      
      d += ` C ${cp1x},${cp1y} ${cp2x},${cp2y} ${x},${y}`;
    }
    
    // Smooth curve back to the center Y axis at the end
    const lastX = startX + milestones.length * gap;
    const lastY = centerY + ((milestones.length - 1) % 2 === 0 ? -amplitude : amplitude);
    const endX = lastX + endExtension;
    
    d += ` C ${lastX + (endExtension / 2)},${lastY} ${lastX + (endExtension / 2)},${centerY} ${endX},${centerY}`;
    
    return d;
  };

  const pathD = generatePath();

  useEffect(() => {
    const calculateScrollRange = () => {
      if (scrollRef.current) {
        setScrollRange(scrollRef.current.scrollWidth - window.innerWidth);
      }
    };
    
    const timer = setTimeout(calculateScrollRange, 100);
    window.addEventListener("resize", calculateScrollRange);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", calculateScrollRange);
    };
  }, []);

  // Custom DOM-based Scroll event observer using getBoundingClientRect
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      
      const rect = containerRef.current.getBoundingClientRect();
      const scrolled = -rect.top;
      const totalPinDistance = rect.height - window.innerHeight;
      
      let progress = 0;
      if (rect.top <= 0 && totalPinDistance > 0) {
        progress = Math.max(0, Math.min(1, scrolled / totalPinDistance));
      }
      
      scrollProgress.set(progress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);
    
    // Calibrate position initially
    handleScroll();
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [scrollProgress]);

  // Map scroll progress to horizontal translation [0px to -scrollRange] with 15% start buffer and 15% end buffer
  const x = useTransform(smoothProgress, [0, 0.15, 0.85, 1.0], [0, 0, -scrollRange, -scrollRange], { clamp: true });

  // Map pathLength (drawing stroke progress) starting exactly at 15% scroll and completing at 85% scroll
  const pathLength = useTransform(smoothProgress, [0, 0.15, 0.85, 1.0], [0, 0, 1, 1], { clamp: true });

  return (
    <section id="roadmap" ref={containerRef} className="relative h-[700vh] bg-transparent block p-0">
      {/* Sticky viewport container */}
      <div className="sticky top-0 h-screen overflow-hidden flex flex-col justify-between py-10 z-10 bg-[#070710]">
        
        {/* Static Header */}
        <div className="max-w-[1440px] mx-auto px-6 w-full text-center mb-4 shrink-0 relative z-20">
          <div className="label-caps text-cyan mb-2">The Strategic Journey</div>
          <h2 className="text-[clamp(32px,5vw,64px)] font-black text-white uppercase tracking-tighter">
            THE <span className="text-violet">ROADMAP.</span>
          </h2>
        </div>

        {/* --- DESKTOP VIEWPORT --- */}
        <div className="hidden md:flex flex-1 items-center relative overflow-hidden my-2">
          <motion.div 
            ref={scrollRef}
            className="h-[580px] px-[20vw] relative z-10"
            style={{ x, width: `${totalWidth}px` }}
          >
            {/* SVG Canvas containing curved drawing path */}
            <svg 
              width={totalWidth} 
              height={580} 
              className="absolute inset-0 pointer-events-none z-0"
            >
              {/* Trace path (Faint background timeline line) */}
              <path 
                d={pathD} 
                fill="none" 
                stroke="rgba(255, 255, 255, 0.05)" 
                strokeWidth={3} 
              />
              {/* Dynamic scroll-drawn horizontal curved zigzag line */}
              <motion.path 
                d={pathD} 
                fill="none" 
                stroke="url(#roadmap-grad)" 
                strokeWidth={4} 
                style={{ pathLength }} 
                strokeLinecap="round"
              />
              <defs>
                <linearGradient id="roadmap-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#00E5FF" />
                  <stop offset="50%" stopColor="#5B4EE8" />
                  <stop offset="100%" stopColor="#00E5FF" />
                </linearGradient>
              </defs>
            </svg>

            {/* Starting Rhygen Logo Emblem (at X = 100, Y = 340) */}
            <div 
              style={{ left: `${startX}px`, top: `${centerY}px` }}
              className="absolute -translate-x-1/2 -translate-y-1/2 w-14 h-14 bg-[#0c0d1b] border-2 border-white/20 rounded-full flex items-center justify-center z-30 shadow-[0_0_20px_rgba(0,229,255,0.2)]"
            >
              <img 
                src="/logo_square.png" 
                alt="Rhygen Start" 
                className="w-9 h-9 object-contain mix-blend-screen"
              />
            </div>

            {/* Render Nodes and Milestones along the curved path */}
            {milestones.map((milestone, i) => {
              const nodeX = startX + (i + 1) * gap;
              const nodeY = centerY + (i % 2 === 0 ? -amplitude : amplitude);
              const isActive = i === activeIndex || (activeIndex === -1 && i === 0);
              const isCompleted = activeIndex === -2 || (activeIndex >= 0 && i < activeIndex);

              return (
                <div key={i} className="absolute inset-0 pointer-events-none">
                  {/* Dynamic circular glowing node popping on scroll contact */}
                  <motion.div
                    animate={{
                      scale: isActive ? 1.3 : isCompleted ? 1.0 : 0.8,
                      opacity: isActive ? 1.0 : isCompleted ? 0.75 : 0.0
                    }}
                    transition={{ duration: 0.4 }}
                    style={{
                      left: nodeX,
                      top: nodeY,
                      x: "-50%",
                      y: "-50%",
                      borderColor: isActive ? milestone.color : isCompleted ? "#00E5FF" : "rgba(255,255,255,0.15)",
                      backgroundColor: isCompleted ? "#00E5FF" : "#070710",
                      boxShadow: isActive ? `0 0 15px ${milestone.color}` : "none"
                    }}
                    className="absolute w-6 h-6 rounded-full border-2 z-20 flex items-center justify-center transition-all duration-300"
                  >
                    {isCompleted ? (
                      <Check className="w-3.5 h-3.5 text-black" strokeWidth={4} />
                    ) : isActive ? (
                      <div 
                        className="w-1.5 h-1.5 rounded-full" 
                        style={{ backgroundColor: milestone.color }}
                      />
                    ) : null}
                  </motion.div>

                  {/* Horizontal milestone card fading and sliding in based on scroll state */}
                  <motion.div
                    animate={{
                      scale: isActive ? 1.05 : isCompleted ? 0.95 : 0.85,
                      opacity: activeIndex === -2 ? 0.0 : (isActive ? 1.0 : isCompleted ? 0.4 : 0.0),
                      y: isActive ? 0 : i % 2 === 0 ? -12 : 12
                    }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    style={{
                      left: nodeX,
                      top: i % 2 === 0 ? nodeY - 190 : nodeY + 15,
                      x: "-50%"
                    }}
                    className="absolute w-[280px] md:w-[340px] z-10 pointer-events-auto"
                  >
                    <div 
                      className={`glass-ui p-4 md:p-5 rounded-2xl relative overflow-hidden group transition-all duration-500 border-l-4 ${
                        isActive ? "bg-[#0c0d1b]/95 border-l-cyan" : "bg-[#0c0d1b]/80 border-l-white/20"
                      }`}
                      style={{ 
                        borderLeftColor: (isActive || isCompleted) ? milestone.color : "rgba(255,255,255,0.1)",
                        boxShadow: isActive ? `0 15px 30px rgba(0,0,0,0.5), 0 0 20px ${milestone.color}15` : "none"
                      }}
                    >
                      {/* Number Watermark */}
                      <span className="absolute -top-4 -right-4 text-7xl font-black text-white/[0.01] group-hover:text-white/[0.04] transition-colors pointer-events-none">
                        {milestone.number}
                      </span>

                      {/* Status Tag */}
                      <div 
                        className="absolute top-0 left-0 px-3 py-1 rounded-br-lg text-[8px] font-black tracking-widest text-black uppercase"
                        style={{ 
                          backgroundColor: (isActive || isCompleted) ? milestone.color : "rgba(255,255,255,0.15)",
                          color: (isActive || isCompleted) ? "#000" : "#fff"
                        }}
                      >
                        {milestone.status}
                      </div>

                      {/* Highlight statistics grid inside active card */}
                      <h4 className="text-base md:text-lg font-bold text-white mb-2 group-hover:text-cyan transition-colors">{milestone.title}</h4>
                      <p className="text-[#A0A8C0] font-light leading-normal text-xs md:text-sm whitespace-normal">
                        {milestone.text}
                      </p>

                      {/* Expand details/highlights under active milestone */}
                      {isActive && (
                        <motion.div 
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          className="mt-3 pt-3 border-t border-white/5 grid grid-cols-2 gap-2"
                        >
                          {milestone.highlights.map((h, idx) => (
                            <div key={idx} className="flex flex-col">
                              <span className="text-[9px] uppercase tracking-wider text-white/40">{h.label}</span>
                              <span className="text-sm font-black text-white" style={{ color: milestone.color }}>
                                {h.value}
                              </span>
                            </div>
                          ))}
                        </motion.div>
                      )}
                    </div>
                  </motion.div>
                </div>
              );
            })}
          </motion.div>
        </div>

        {/* --- MOBILE VIEWPORT --- */}
        <div className="flex-1 md:hidden overflow-y-auto px-6 py-2 relative flex flex-col justify-center">
          {/* Vertical indicator line */}
          <div className="absolute left-[38px] top-6 bottom-6 w-[2px] bg-white/5 z-0" />
          <motion.div 
            className="absolute left-[38px] top-6 w-[2px] bg-gradient-to-b from-cyan via-violet to-cyan z-0"
            style={{ height: pathLength }}
          />

          <div className="relative z-10 flex flex-col justify-between h-[80%] gap-3">
            {milestones.map((milestone, i) => {
              const isActive = i === activeIndex || (activeIndex === -1 && i === 0);
              const isCompleted = activeIndex === -2 || (activeIndex >= 0 && i < activeIndex);
              
              return (
                <div key={i} className="flex gap-4 items-start py-1">
                  {/* Circle Indicator */}
                  <div className="w-10 h-10 shrink-0 flex items-center justify-center">
                    {isCompleted ? (
                      <div className="w-7 h-7 rounded-full bg-[#00E5FF] flex items-center justify-center text-black font-black text-xs shadow-[0_0_8px_rgba(0,229,255,0.3)]">
                        ✓
                      </div>
                    ) : isActive ? (
                      <motion.div 
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ repeat: Infinity, duration: 2 }}
                        className="w-8 h-8 rounded-full border-2 flex items-center justify-center text-white font-black text-xs bg-[#070710]"
                        style={{ borderColor: milestone.color, boxShadow: `0 0 10px ${milestone.color}66` }}
                      >
                        {milestone.number}
                      </motion.div>
                    ) : (
                      <div className="w-4 h-4 rounded-full border border-white/20 bg-[#070710] opacity-0 transition-opacity duration-300" />
                    )}
                  </div>

                  {/* Accordion Text Content */}
                  <div className="flex-1 flex flex-col justify-center min-h-[40px]">
                    <div className="flex items-center justify-between">
                      <h4 
                        className={`text-sm font-bold tracking-tight transition-all duration-300 ${isActive ? "text-white font-black text-base" : "text-white/30"}`}
                        style={{ opacity: activeIndex === -2 ? 0.3 : (isActive ? 1.0 : isCompleted ? 0.3 : 0.0) }}
                      >
                        {milestone.title}
                      </h4>
                      {isActive && (
                        <span 
                          className="px-2 py-0.5 rounded text-[8px] font-black uppercase text-black"
                          style={{ backgroundColor: milestone.color }}
                        >
                          {milestone.status}
                        </span>
                      )}
                    </div>

                    <AnimatePresence>
                      {isActive && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden mt-2 bg-white/[0.01] border border-white/5 p-4 rounded-xl relative"
                        >
                          <p className="text-white/60 text-xs font-light leading-relaxed mb-3">
                            {milestone.text}
                          </p>
                          <div className="grid grid-cols-2 gap-4 border-t border-white/5 pt-3">
                            {milestone.highlights.map((h, idx) => (
                              <div key={idx} className="flex flex-col">
                                <span className="text-[9px] uppercase tracking-wider text-white/40">{h.label}</span>
                                <span className="text-sm font-black text-white" style={{ color: milestone.color }}>
                                  {h.value}
                                </span>
                              </div>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom Call to Action */}
        <div className="text-center mt-4 shrink-0 relative z-20">
          <div className="inline-block glass-ui px-8 py-3 border-violet/30">
            <span className="text-white/40 text-[9px] tracking-[4px] uppercase font-bold">Engineering the Future of Logistics</span>
          </div>
        </div>

      </div>
    </section>
  );
}