import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { CheckCircle } from "lucide-react";

export function Roadmap() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const pathLength = useTransform(scrollYProgress, [0, 1], [0, 1]);

  const milestones = [
    {
      side: "left",
      date: "Dec 2025–Feb 2026",
      status: "COMPLETED ✓",
      color: "text-green-400 bg-green-500/10 border-green-500/20",
      title: "Tata Ace Prototype 1.0",
      details: ["Bench scale validation", "Basic control architecture", "Initial road testing"],
      chip: "Powered by Grants",
      chipColor: "text-[#5B4EE8] bg-[#5B4EE8]/10"
    },
    {
      side: "right",
      date: "Mar 2026–May 2026",
      status: "IN PROGRESS",
      color: "text-amber-400 bg-amber-500/10 border-amber-500/20",
      title: "Architecture 2.0 + IP Filing",
      details: ["Refined planetary gear split", "Advanced ML models trained", "Comprehensive patent filings"],
      chip: null
    },
    {
      side: "left",
      date: "Jun–Sep 2026",
      status: "UPCOMING",
      color: "text-[#A0A8C0] bg-white/5 border-white/10",
      title: "Prototype 2.0 + ARAI Certification",
      details: ["Full-scale MHCV integration", "Thermal stress testing", "Official ARAI efficiency cert"],
      chip: null
    },
    {
      side: "right",
      date: "Oct–Nov 2026",
      status: "UPCOMING",
      color: "text-[#A0A8C0] bg-white/5 border-white/10",
      title: "OEM Presentations + Fleet Pilot Deployment",
      details: ["Deploying 5 retrofitted trucks", "Live telemetry dashboards", "OEM evaluation phase"],
      chip: "Seed Round — Nov 2026",
      chipColor: "text-[#00E5FF] bg-[#00E5FF]/10"
    }
  ];

  const grants = [
    { name: "gradCapital Atomic Grant", amount: "₹3.6L" },
    { name: "SINE IoE Grant", amount: "₹6L" },
    { name: "Emergent Ventures Grant", amount: "₹15.3L" },
    { name: "AWS Campus Fund Grand Challenge 2025", amount: "₹1.8L" },
    { name: "First Prize, SIAT (ARAI) 2026", amount: "—" }
  ];

  return (
    <section id="roadmap" className="py-24 bg-[#0A0A18] relative">
      <div className="container mx-auto px-6 max-w-[1440px]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20 text-center"
        >
          <span className="text-[12px] font-bold tracking-[3px] text-[#A0A8C0] mb-4 block">ROADMAP</span>
          <h2 className="text-[40px] md:text-[52px] font-bold text-white max-w-[800px] mx-auto leading-[1.1]">
            The path from prototype to Tier-1 supplier.
          </h2>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-16 relative" ref={containerRef}>
          
          {/* Left Sidebar: Grants */}
          <div className="lg:w-[320px] shrink-0">
            <div className="sticky top-32 bg-[#0F1020] border border-white/5 rounded-2xl p-6">
              <h3 className="text-[16px] font-bold text-white mb-6">Grants & Support</h3>
              <div className="flex flex-col gap-4">
                {grants.map((grant, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                    <div>
                      <div className="text-[14px] font-semibold text-white/90 leading-snug mb-1">{grant.name}</div>
                      <div className="text-[13px] text-[#5B4EE8] font-bold">{grant.amount}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Area: Zig-Zag Timeline */}
          <div className="flex-1 relative min-h-[800px] py-10">
            
            {/* SVG Road Path (Desktop only) */}
            <div className="hidden md:block absolute inset-0 z-0 pointer-events-none">
              <svg width="100%" height="100%" viewBox="0 0 100 1000" preserveAspectRatio="none" className="overflow-visible">
                {/* Base faded line */}
                <path 
                  d="M 50 0 L 50 150 L 30 250 L 30 400 L 70 500 L 70 650 L 50 750 L 50 1000" 
                  fill="none" 
                  stroke="rgba(255,255,255,0.05)" 
                  strokeWidth="1" 
                  strokeLinejoin="round"
                  vectorEffect="non-scaling-stroke"
                />
                {/* Animated glowing line */}
                <motion.path 
                  d="M 50 0 L 50 150 L 30 250 L 30 400 L 70 500 L 70 650 L 50 750 L 50 1000" 
                  fill="none" 
                  stroke="url(#gradient)" 
                  strokeWidth="2" 
                  strokeLinejoin="round"
                  vectorEffect="non-scaling-stroke"
                  style={{ pathLength }}
                />
                <defs>
                  <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#5B4EE8" />
                    <stop offset="100%" stopColor="#00E5FF" />
                  </linearGradient>
                </defs>
              </svg>
            </div>

            {/* Mobile straight line */}
            <div className="md:hidden absolute top-0 bottom-0 left-6 w-1 bg-white/5 rounded-full z-0" />
            <motion.div 
              className="md:hidden absolute top-0 bottom-0 left-6 w-1 bg-gradient-to-b from-[#5B4EE8] to-[#00E5FF] rounded-full z-0 origin-top"
              style={{ scaleY: pathLength }}
            />

            {/* Milestones */}
            <div className="relative z-10 flex flex-col gap-12 md:gap-32">
              {milestones.map((m, i) => (
                <div 
                  key={i} 
                  className={`flex w-full relative ${
                    m.side === "left" 
                      ? "md:justify-start md:pr-[55%] md:-mt-[5%]" 
                      : "md:justify-end md:pl-[55%] md:mt-[5%]"
                  } pl-16 md:pl-0`}
                >
                  <motion.div
                    initial={{ opacity: 0, x: m.side === "left" ? -30 : 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    className="bg-[#0F1020] border border-white/10 rounded-2xl p-6 w-full md:w-[420px] hover:border-[#5B4EE8]/40 transition-colors relative"
                  >
                    {/* Mobile Dot */}
                    <div className="md:hidden absolute top-8 -left-[46px] w-4 h-4 rounded-full bg-[#5B4EE8] border-4 border-[#0A0A18]" />

                    <div className="flex justify-between items-start mb-4">
                      <span className="text-[13px] font-semibold text-[#A0A8C0]">{m.date}</span>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${m.color}`}>
                        {m.status}
                      </span>
                    </div>
                    <h4 className="text-[20px] font-bold text-white mb-4">{m.title}</h4>
                    <ul className="flex flex-col gap-2 mb-6">
                      {m.details.map((detail, j) => (
                        <li key={j} className="text-[14px] text-[#A0A8C0] flex items-start gap-2">
                          <span className="text-[#5B4EE8] mt-1">•</span> {detail}
                        </li>
                      ))}
                    </ul>
                    {m.chip && (
                      <div className="inline-block">
                        <span className={`px-3 py-1 rounded-full text-[12px] font-bold ${m.chipColor}`}>
                          {m.chip}
                        </span>
                      </div>
                    )}
                  </motion.div>
                </div>
              ))}
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
