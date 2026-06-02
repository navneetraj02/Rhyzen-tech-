import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
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

function ScrollMilestoneCard({ 
  milestone, 
  index, 
  scrollYProgress, 
  totalCount,
  xPosition,
  yPosition
}: { 
  milestone: typeof milestones[0];
  index: number;
  scrollYProgress: any;
  totalCount: number;
  xPosition: number;
  yPosition: number;
}) {
  // Compute individual threshold of arrival for each card
  const threshold = index / (totalCount - 1);
  
  // Card starts revealing slightly before the stroke reaches it and finishes exactly when the stroke hits the node
  const startAppear = Math.max(0, threshold - 0.08);
  const fullyAppear = threshold;
  
  const opacity = useTransform(
    scrollYProgress,
    [startAppear, fullyAppear],
    [0, 1],
    { clamp: true }
  );
  
  const scale = useTransform(
    scrollYProgress,
    [startAppear, fullyAppear],
    [0.75, 1],
    { clamp: true }
  );

  const yOffset = useTransform(
    scrollYProgress,
    [startAppear, fullyAppear],
    [index % 2 === 0 ? -15 : 15, 0],
    { clamp: true }
  );

  return (
    <motion.div
      style={{
        left: xPosition,
        // If index is even, the node is at yPosition=190, card goes above it.
        // If index is odd, the node is at yPosition=490, card goes below it.
        top: index % 2 === 0 ? yPosition - 230 : yPosition + 25,
        opacity,
        scale,
        y: yOffset,
        x: "-50%"
      }}
      className="absolute w-[280px] md:w-[330px] z-10"
    >
      <div 
        className="glass-ui p-6 rounded-2xl relative overflow-hidden group hover:border-white/25 transition-all duration-500 bg-[#0c0d1b]/90 border-l-4" 
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
    </motion.div>
  );
}

function ScrollMilestoneNode({
  index,
  scrollYProgress,
  totalCount,
  xPosition,
  yPosition,
  color
}: {
  index: number;
  scrollYProgress: any;
  totalCount: number;
  xPosition: number;
  yPosition: number;
  color: string;
}) {
  const threshold = index / (totalCount - 1);
  const startAppear = Math.max(0, threshold - 0.04);
  const fullyAppear = threshold;

  const opacity = useTransform(
    scrollYProgress,
    [startAppear, fullyAppear],
    [0, 1],
    { clamp: true }
  );
  
  const scale = useTransform(
    scrollYProgress,
    [startAppear, fullyAppear],
    [0, 1.2],
    { clamp: true }
  );

  return (
    <motion.div
      style={{
        left: xPosition,
        top: yPosition,
        opacity,
        scale,
        x: "-50%",
        y: "-50%"
      }}
      className="absolute w-5 h-5 rounded-full bg-[#070710] border-2 border-white/20 z-20 flex items-center justify-center pointer-events-none"
    >
      <div 
        className="w-2.5 h-2.5 rounded-full"
        style={{ 
          backgroundColor: color, 
          boxShadow: `0 0 12px ${color}` 
        }}
      />
    </motion.div>
  );
}

export function Roadmap() {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [scrollRange, setScrollRange] = useState(0);

  // Path constants
  const startX = 100;
  const gap = 420;
  const centerY = 340;
  const amplitude = 150;
  const endExtension = 150;
  const totalWidth = startX + milestones.length * gap + endExtension;

  // Custom high-performance motion value for robust scroll tracking
  const scrollProgress = useMotionValue(0);
  const smoothProgress = useSpring(scrollProgress, { 
    stiffness: 80, 
    damping: 24, 
    restDelta: 0.001 
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
      if (totalPinDistance > 0) {
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

  const x = useTransform(smoothProgress, [0, 1], [0, -scrollRange], { clamp: true });

  return (
    <section id="roadmap" ref={containerRef} className="relative h-[320vh] bg-transparent">
      {/* Sticky viewport wrapper */}
      <div className="sticky top-0 h-screen overflow-hidden flex flex-col justify-between py-12 md:py-16 z-10">
        
        {/* Static Header */}
        <div className="max-w-[1440px] mx-auto px-6 w-full text-center mb-4 shrink-0 relative z-20">
          <div className="label-caps text-cyan mb-2">The Strategic Journey</div>
          <h2 className="text-[clamp(32px,5vw,64px)] font-black text-white uppercase tracking-tighter">
            THE <span className="text-violet">ROADMAP.</span>
          </h2>
        </div>

        {/* Scroll timeline viewport container */}
        <div className="flex-1 flex items-center relative overflow-hidden my-4">
          
          <motion.div 
            ref={scrollRef}
            className="h-[680px] px-[20vw] relative z-10"
            style={{ x, width: `${totalWidth}px` }}
          >
            {/* SVG Canvas containing drawing path */}
            <svg 
              width={totalWidth} 
              height={680} 
              className="absolute inset-0 pointer-events-none z-0"
            >
              {/* Trace path (Faint background timeline line) */}
              <path 
                d={pathD} 
                fill="none" 
                stroke="rgba(255, 255, 255, 0.05)" 
                strokeWidth={3} 
              />
              {/* Dynamic scroll drawing line */}
              <motion.path 
                d={pathD} 
                fill="none" 
                stroke="url(#roadmap-grad)" 
                strokeWidth={4} 
                style={{ pathLength: smoothProgress }} 
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

            {/* Logo Emblem at the start of the line */}
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

              return (
                <div key={i} className="absolute inset-0 pointer-events-none">
                  {/* Dynamic circular glowing node popping on scroll contact */}
                  <ScrollMilestoneNode 
                    index={i}
                    scrollYProgress={smoothProgress}
                    totalCount={milestones.length}
                    xPosition={nodeX}
                    yPosition={nodeY}
                    color={milestone.color}
                  />

                  {/* Dynamic milestone card fading and sliding in on scroll contact */}
                  <ScrollMilestoneCard 
                    milestone={milestone}
                    index={i}
                    scrollYProgress={smoothProgress}
                    totalCount={milestones.length}
                    xPosition={nodeX}
                    yPosition={nodeY}
                  />
                </div>
              );
            })}
          </motion.div>
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