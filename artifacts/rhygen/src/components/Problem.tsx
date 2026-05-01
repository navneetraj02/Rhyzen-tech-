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
    { label: "EMISSIONS", value: "34%", sub: "Trucks contribution to road CO2" },
    { label: "FUEL COST", value: "60%", sub: "Dominates fleet operating costs" },
    { label: "MARGINS", value: "05%", sub: "Thin industry profit buffers" },
  ];

  return (
    <section id="problem" ref={containerRef} className="min-h-screen py-32 flex flex-col items-center justify-center pointer-events-none">
      <motion.div 
        style={{ opacity, scale }}
        className="max-w-[1200px] w-full px-6 flex flex-col items-center"
      >
        <SlideReveal direction="left">
          <motion.div className="label-caps text-violet mb-8">The systemic challenge</motion.div>
        </SlideReveal>
        
        <SlideReveal direction="left" delay={0.2} className="text-[clamp(40px,6vw,80px)] font-bold text-center text-white mb-24 leading-tight justify-center">
          Current alternatives fail in practice. Freight needs a realistic bridge.
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

        {/* Ambient Moving Haze Cues */}
        <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              animate={{ 
                x: [Math.random() * 100, -Math.random() * 100],
                y: [Math.random() * 100, -Math.random() * 100],
              }}
              transition={{ duration: 10 + i * 5, repeat: Infinity, repeatType: "reverse" }}
              className="absolute w-96 h-96 bg-violet/20 blur-[120px] rounded-full"
              style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }}
            />
          ))}
        </div>
      </motion.div>
    </section>
  );
}
