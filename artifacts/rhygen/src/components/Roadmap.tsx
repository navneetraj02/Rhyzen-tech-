import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";

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
    title: "Architecture 2.0 & IP Progress",
    text: "Dual power-split refinement, control system development, IP advancement, Pune shift",
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

function MilestoneCard({ milestone, index }: { milestone: typeof milestones[0], index: number }) {
  const isEven = index % 2 === 0;
  
  return (
    <div className={`relative w-full flex items-center justify-center mb-40 last:mb-0`}>
      {/* Central Connector Node */}
      <div className="absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-black border-2 border-white/20 z-10 flex items-center justify-center">
        <motion.div 
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          className="w-2 h-2 rounded-full"
          style={{ backgroundColor: milestone.color, boxShadow: `0 0 15px ${milestone.color}` }}
        />
      </div>

      <div className={`flex w-full max-w-[1200px] items-center ${isEven ? "flex-row" : "flex-row-reverse"}`}>
        {/* Content Card */}
        <div className="w-[45%]">
          <motion.div 
            initial={{ opacity: 0, x: isEven ? -50 : 50, scale: 0.95 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className="glass-ui p-10 group hover:border-white/20 transition-all duration-500 relative overflow-hidden"
          >
            {/* Number Watermark */}
            <span className="absolute -top-6 -right-6 text-9xl font-black text-white/[0.03] select-none group-hover:text-white/[0.06] transition-colors pointer-events-none">
              {milestone.number}
            </span>

            {/* Status Tag */}
            <div 
              className="absolute top-0 left-0 px-4 py-1.5 rounded-br-xl text-[9px] font-black tracking-widest text-black"
              style={{ backgroundColor: milestone.color }}
            >
              {milestone.status}
            </div>

            {/* Background Glow */}
            <div 
              className="absolute -right-20 -top-20 w-40 h-40 rounded-full blur-[80px] opacity-10 transition-opacity group-hover:opacity-20"
              style={{ backgroundColor: milestone.color }}
            />
            
            <h4 className="text-2xl font-bold text-white mb-4 group-hover:text-cyan transition-colors">{milestone.title}</h4>
            <div className="w-12 h-[2px] bg-white/20 mb-6 group-hover:w-full transition-all duration-700" style={{ backgroundColor: `${milestone.color}44` }} />
            <p className="text-[#A0A8C0] font-light leading-relaxed text-base">
              {milestone.text}
            </p>

            {/* Corner Bracket */}
            <div className="absolute bottom-8 right-8 w-8 h-8 border-b border-r border-white/5 group-hover:border-white/20 transition-colors" />
          </motion.div>
        </div>

        {/* Empty space for the other side */}
        <div className="w-[10%]" />
        <div className="w-[45%]" />
      </div>
    </div>
  );
}

export function Roadmap() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const pathProgress = useSpring(scrollYProgress, { stiffness: 40, damping: 20 });
  const pathLength = useTransform(pathProgress, [0.1, 0.9], [0, 1]);

  return (
    <section id="roadmap" ref={containerRef} className="relative py-40 bg-transparent">
      <div className="max-w-[1440px] mx-auto px-6">
        
        {/* Header */}
        <div className="text-center mb-40">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="label-caps text-cyan mb-4"
          >
            The Strategic Journey
          </motion.div>
          <h2 className="text-[clamp(40px,6vw,80px)] font-bold text-white uppercase tracking-tighter">
            THE <span className="text-violet">ROADMAP.</span>
          </h2>
        </div>

        {/* Timeline Container */}
        <div className="relative">
          
          {/* Central Path Line */}
          <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-[2px] bg-white/5 overflow-hidden">
            <motion.div 
              style={{ scaleY: pathLength, originY: 0 }}
              className="w-full h-full bg-gradient-to-b from-cyan via-violet to-cyan shadow-[0_0_15px_rgba(0,229,255,0.5)]"
            />
          </div>

          {/* Milestones */}
          <div className="relative z-10">
            {milestones.map((milestone, i) => (
              <MilestoneCard key={i} milestone={milestone} index={i} />
            ))}
          </div>
        </div>

        {/* Bottom Call to Action */}
        <div className="mt-40 text-center">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="inline-block glass-ui px-12 py-6 border-violet/30"
          >
            <span className="text-white/40 text-xs tracking-[4px] uppercase font-bold">Engineering the Future of Logistics</span>
          </motion.div>
        </div>

      </div>
    </section>
  );
}