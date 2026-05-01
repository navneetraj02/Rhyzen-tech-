import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { SlideReveal, SectionReveal } from "./Reveal";

export function Technology() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.4, 0.6, 1], [0, 1, 1, 0]);
  
  return (
    <section id="technology" ref={containerRef} className="min-h-screen py-32 flex flex-col items-center justify-center pointer-events-none overflow-hidden">
      <motion.div 
        style={{ opacity }}
        className="max-w-[1440px] w-full px-6 relative z-10"
      >
        <div className="flex flex-col items-center text-center mb-32">
          <SectionReveal>
            <motion.div className="label-caps text-violet mb-8">Intelligence Layer</motion.div>
          </SectionReveal>
          
          <div className="flex flex-col items-center mb-12">
            <SlideReveal direction="left" className="heading-massive text-white">AI DRIVEN</SlideReveal>
            <SlideReveal direction="right" className="heading-massive text-cyan" delay={0.2}>CONTROL.</SlideReveal>
          </div>

          <SectionReveal delay={0.4} className="text-[24px] text-[#A0A8C0] font-light max-w-3xl leading-relaxed justify-center">
            Not just hardware. Rhygen is an intelligent machine learning from every kilometer on Indian roads.
          </SectionReveal>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {[
            { label: "Drive Cycle Awareness", desc: "Adaptive power management mapped to unique Indian operating conditions.", direction: "left" },
            { label: "Predictive Optimization", desc: "Real-time energy split adjustments based on terrain and load telemetry.", direction: "up" },
            { label: "Efficiency Loops", desc: "Continuous feedback system reducing fuel consumption by up to 30%.", direction: "right" }
          ].map((item, i) => (
            <SlideReveal 
              key={i}
              direction={item.direction as any}
              delay={i * 0.2}
              className="glass-ui p-12 relative overflow-hidden group pointer-events-auto"
            >
              <div className="absolute bottom-0 left-0 w-full h-[1px] bg-cyan/20 overflow-hidden">
                <motion.div 
                  animate={{ x: ["-100%", "100%"] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  className="w-full h-full bg-gradient-to-r from-transparent via-cyan to-transparent"
                />
              </div>

              <h3 className="text-2xl font-bold text-white mb-6 group-hover:text-cyan transition-colors">{item.label}</h3>
              <p className="text-[#A0A8C0] font-light leading-relaxed">
                {item.desc}
              </p>
            </SlideReveal>
          ))}
        </div>
      </motion.div>

      {/* Background data streams visualization */}
      <div className="absolute inset-0 z-0 pointer-events-none flex items-center justify-center">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            animate={{ 
              rotate: [0, 360],
              opacity: [0.1, 0.2, 0.1]
            }}
            transition={{ duration: 20 + i * 10, repeat: Infinity, ease: "linear" }}
            className="absolute rounded-full border border-violet/20"
            style={{ 
              width: `${(i + 1) * 30}vw`, 
              height: `${(i + 1) * 30}vw`,
            }}
          />
        ))}
      </div>
    </section>
  );
}
