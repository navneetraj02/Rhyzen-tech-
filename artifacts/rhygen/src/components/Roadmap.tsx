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
  const [activeIndex, setActiveIndex] = useState(0);

  // Custom high-performance motion values for scroll observer
  const scrollProgress = useMotionValue(0);
  const smoothProgress = useSpring(scrollProgress, { 
    stiffness: 90, 
    damping: 26, 
    restDelta: 0.001 
  });

  // Sync scroll animation value with React state active index
  useMotionValueEvent(smoothProgress, "change", (latest) => {
    const idx = Math.min(
      milestones.length - 1,
      Math.floor(latest * milestones.length)
    );
    setActiveIndex(idx);
  });

  // DOM scroll event listener to track top bounding rect in real time
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      
      const rect = containerRef.current.getBoundingClientRect();
      const scrolled = -rect.top;
      const totalPinDistance = rect.height - window.innerHeight;
      
      let progress = 0;
      if (totalPinDistance > 0) {
        progress = Math.max(0, Math.min(1, scrolled / totalPinDistance));
      }
      
      scrollProgress.set(progress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);
    
    // Calibrate initially
    handleScroll();
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [scrollProgress]);

  // Transform progress into vertical timeline fill percentage
  const fillHeight = useTransform(smoothProgress, [0, 1], ["0%", "100%"], { clamp: true });

  return (
    <section id="roadmap" ref={containerRef} className="relative h-[600vh] bg-transparent">
      {/* Sticky viewport container */}
      <div className="sticky top-0 h-screen overflow-hidden flex flex-col justify-between py-10 z-10 bg-[#070710]">
        
        {/* Header */}
        <div className="max-w-[1440px] mx-auto px-6 w-full text-center mb-6 shrink-0 relative z-20">
          <div className="label-caps text-cyan mb-2">The Strategic Journey</div>
          <h2 className="text-[clamp(32px,5vw,64px)] font-black text-white uppercase tracking-tighter">
            THE <span className="text-violet">ROADMAP.</span>
          </h2>
        </div>

        {/* --- DESKTOP VIEWPORT --- */}
        <div className="hidden md:flex flex-1 items-center max-w-[1200px] w-full mx-auto px-6 relative gap-12 my-4">
          
          {/* Left Column: Vertical Timeline */}
          <div className="w-[40%] shrink-0 relative h-[420px] flex flex-col justify-between py-4">
            
            {/* Rhygen Starting Logo Emblem */}
            <div className="absolute left-[24px] -top-12 -translate-x-1/2 w-10 h-10 bg-[#0c0d1b] border border-white/10 rounded-full flex items-center justify-center z-30 shadow-[0_0_15px_rgba(0,229,255,0.15)]">
              <img 
                src="/logo_square.png" 
                alt="Rhygen" 
                className="w-6 h-6 object-contain mix-blend-screen"
              />
            </div>

            {/* Timeline Tracks */}
            <div className="absolute left-[24px] top-0 bottom-0 w-[3px] bg-white/5 z-0 -translate-x-1/2" />
            <motion.div 
              style={{ height: fillHeight }}
              className="absolute left-[24px] top-0 w-[3px] bg-gradient-to-b from-cyan via-violet to-cyan z-10 -translate-x-1/2 shadow-[0_0_15px_rgba(0,229,255,0.3)]"
            />

            {/* Milestones Vertical Nodes */}
            {milestones.map((milestone, i) => {
              const isActive = i === activeIndex;
              const isCompleted = i < activeIndex;
              
              return (
                <div 
                  key={i} 
                  style={{ top: `${(i / (milestones.length - 1)) * 100}%` }}
                  className="absolute left-[24px] -translate-y-1/2 w-full flex items-center z-20"
                >
                  {/* Node Circle */}
                  <motion.div 
                    animate={{ 
                      scale: isActive ? 1.25 : 1,
                      opacity: isActive ? 1 : isCompleted ? 0.7 : 0.35 
                    }}
                    transition={{ duration: 0.3 }}
                    className="absolute left-0 -translate-x-1/2 w-10 h-10 rounded-full bg-[#070710] border-2 flex items-center justify-center transition-all duration-300"
                    style={{ 
                      borderColor: isActive ? milestone.color : isCompleted ? "#00E5FF" : "rgba(255,255,255,0.15)",
                      backgroundColor: isCompleted ? "#00E5FF" : "#070710",
                      boxShadow: isActive ? `0 0 15px ${milestone.color}55` : "none"
                    }}
                  >
                    {isCompleted ? (
                      <Check className="w-5 h-5 text-black" strokeWidth={3} />
                    ) : (
                      <span className={`text-xs font-bold ${isActive ? "text-white" : "text-white/40"}`}>
                        {milestone.number}
                      </span>
                    )}
                  </motion.div>

                  {/* Horizontal Connect Node label */}
                  <span 
                    className={`absolute left-8 text-xs font-bold uppercase tracking-wider transition-colors duration-300 whitespace-nowrap ${
                      isActive ? "text-white" : isCompleted ? "text-cyan/70" : "text-white/20"
                    }`}
                  >
                    {milestone.shortTitle}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Right Column: Premium HUD Storytelling Content Card */}
          <div className="flex-1 relative h-[450px] flex items-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, y: 30, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -30, scale: 0.98 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="glass-ui w-full p-8 md:p-10 rounded-[32px] border-l-4 relative overflow-hidden bg-[#0c0d1b]/70 backdrop-blur-xl h-full flex flex-col justify-between"
                style={{ 
                  borderLeftColor: milestones[activeIndex].color,
                  boxShadow: `0 20px 40px rgba(0,0,0,0.4), inset 0 0 40px rgba(255,255,255,0.01)`
                }}
              >
                {/* HUD Grid Overlay */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

                <div className="grid grid-cols-1 md:grid-cols-5 gap-8 h-full relative z-10">
                  {/* Left Col (Col Span 3): Text Content & Highlights */}
                  <div className="md:col-span-3 flex flex-col justify-between h-full">
                    <div>
                      {/* Badge and Tag */}
                      <div className="flex items-center gap-4">
                        <span 
                          className="px-3.5 py-1 rounded-full text-[9px] font-black tracking-widest text-black uppercase"
                          style={{ backgroundColor: milestones[activeIndex].color }}
                        >
                          {milestones[activeIndex].status}
                        </span>
                        <span className="text-[9px] font-mono text-white/30 tracking-[3px] uppercase">
                          MISSION STEP // 0{activeIndex + 1}
                        </span>
                      </div>
                      
                      <h3 className="text-3xl md:text-4xl font-black text-white mt-6 mb-4 tracking-tight leading-none uppercase">
                        {milestones[activeIndex].title}
                      </h3>
                      
                      <p className="text-[#A0A8C0] font-light leading-relaxed text-sm md:text-base">
                        {milestones[activeIndex].text}
                      </p>
                    </div>

                    {/* Milestone Highlight Statistics */}
                    <div className="grid grid-cols-2 gap-4 border-t border-white/5 pt-6 mt-4">
                      {milestones[activeIndex].highlights.map((highlight, idx) => (
                        <div key={idx} className="flex flex-col">
                          <span className="text-[10px] uppercase tracking-wider text-white/40 mb-1">{highlight.label}</span>
                          <span 
                            className="text-xl md:text-2xl font-black text-white"
                            style={{ color: milestones[activeIndex].color }}
                          >
                            {highlight.value}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Right Col (Col Span 2): Systems Telemetry HUD Illustration */}
                  <div className="md:col-span-2 hidden md:flex flex-col justify-center items-center p-6 bg-white/[0.01] rounded-2xl border border-white/5 relative overflow-hidden group/hud h-full select-none">
                    <div 
                      className="absolute inset-0 pointer-events-none opacity-5 transition-opacity duration-700" 
                      style={{ 
                        backgroundImage: `radial-gradient(circle at center, ${milestones[activeIndex].color} 0%, transparent 70%)` 
                      }}
                    />
                    
                    {/* Animated HUD Rotator */}
                    <motion.div 
                      animate={{ rotate: 360 }}
                      transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                      className="w-28 h-28 rounded-full border border-dashed flex items-center justify-center relative mb-4"
                      style={{ borderColor: `${milestones[activeIndex].color}33` }}
                    >
                      <div className="w-20 h-20 rounded-full border border-white/10 flex items-center justify-center" />
                      <div className="w-12 h-12 rounded-full border border-dashed border-white/5 flex items-center justify-center" />
                      <div 
                        className="w-2.5 h-2.5 rounded-full absolute" 
                        style={{ 
                          backgroundColor: milestones[activeIndex].color,
                          boxShadow: `0 0 10px ${milestones[activeIndex].color}`,
                          top: '-5px',
                          left: 'calc(50% - 5px)'
                        }} 
                      />
                    </motion.div>

                    <span className="text-[9px] font-mono text-white/30 uppercase tracking-[2px]">TELEMETRY LOCKED</span>
                    <span 
                      className="text-xs font-black mt-1 uppercase tracking-widest"
                      style={{ color: milestones[activeIndex].color }}
                    >
                      {milestones[activeIndex].status}
                    </span>
                    <span className="text-[8px] font-mono text-white/20 mt-3 max-w-[140px] text-center leading-normal">
                      {milestones[activeIndex].details}
                    </span>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* --- MOBILE VIEWPORT --- */}
        <div className="flex-1 md:hidden overflow-y-auto px-6 py-2 relative flex flex-col justify-center">
          <div className="absolute left-[38px] top-6 bottom-6 w-[2px] bg-white/5 z-0" />
          <motion.div 
            className="absolute left-[38px] top-6 w-[2px] bg-gradient-to-b from-cyan via-violet to-cyan z-0"
            style={{ height: fillHeight }}
          />

          <div className="relative z-10 flex flex-col justify-between h-[80%] gap-3">
            {milestones.map((milestone, i) => {
              const isActive = i === activeIndex;
              const isCompleted = i < activeIndex;
              
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
                      <div className="w-4 h-4 rounded-full border border-white/20 bg-[#070710] opacity-40" />
                    )}
                  </div>

                  {/* Accordion Text Content */}
                  <div className="flex-1 flex flex-col justify-center min-h-[40px]">
                    <div className="flex items-center justify-between">
                      <h4 className={`text-sm font-bold tracking-tight transition-all duration-300 ${isActive ? "text-white font-black text-base" : "text-white/30"}`}>
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