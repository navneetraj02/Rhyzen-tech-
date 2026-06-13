import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { SectionReveal, SlideReveal } from "./Reveal";

export function Problem() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.8, 1.2]);

  const stats = [
    { label: "EMISSIONS", value: "~50%", sub: "Of road transport carbon emissions in India come from commercial trucks." },
    { label: "FUEL COST", value: "~45%", sub: "Of a fleet operator's monthly budget is spent purely on diesel." },
    { label: "MARGINS", value: "~5%", sub: "Is the thin operating profit margin typical for logistics operators." },
  ];

  return (
    <section id="problem" ref={containerRef} className="min-h-screen py-32 flex flex-col items-center justify-center pointer-events-none">
      <motion.div 
        style={{ opacity, scale }}
        className="max-w-[1200px] w-full px-6 flex flex-col items-center relative z-10 py-16 rounded-3xl bg-black/40 backdrop-blur-[2px] border border-white/5"
      >
        <SlideReveal direction="left">
          <motion.div className="label-caps text-violet mb-8">The systemic challenge</motion.div>
        </SlideReveal>
        
        <SlideReveal direction="left" delay={0.2} className="text-[clamp(40px,6vw,80px)] font-bold text-center text-white mb-24 leading-tight justify-center">
          Current alternatives fail in practice. Commercial trucking needs a realistic transition.
        </SlideReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 w-full">
          {stats.map((stat, i) => (
            <SectionReveal key={i} delay={i * 0.2}>
              <div className="flex flex-col items-center md:items-start">
                <motion.div 
                  initial={{ filter: "blur(10px)", scale: 0.5 }}
                  whileInView={{ filter: "blur(0px)", scale: 1 }}
                  transition={{ duration: 1, delay: i * 0.2 + 0.5 }}
                  className="text-[clamp(60px,8vw,100px)] font-black text-white leading-none mb-4"
                >
                  {stat.value}
                </motion.div>
                <div className="label-caps text-cyan mb-4">{stat.label}</div>
                <p className="text-[#A0A8C0] text-lg font-light text-center md:text-left">
                  {stat.sub}
                </p>
              </div>
            </SectionReveal>
          ))}
        </div>

        {/* Ambient Moving Haze Cues Removed for performance */}
      </motion.div>
    </section>
  );
}
