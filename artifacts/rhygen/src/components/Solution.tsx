import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { SlideReveal, SectionReveal } from "./Reveal";

export function Solution() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.4, 0.6, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

  return (
    <section id="solution" ref={containerRef} className="min-h-screen py-32 flex flex-col items-center justify-center pointer-events-none">
      <motion.div 
        style={{ opacity, y }}
        className="max-w-[1440px] w-full px-6 flex flex-col items-center"
      >
        <SlideReveal direction="right">
          <motion.div className="label-caps text-cyan mb-12">The Rhygen Architecture</motion.div>
        </SlideReveal>
        
        <div className="flex flex-col items-center mb-16">
          <SlideReveal direction="right" delay={0.2} className="heading-massive text-white">LIVING</SlideReveal>
          <SlideReveal direction="right" delay={0.4} className="heading-massive text-violet">SYSTEMS.</SlideReveal>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl w-full">
          {[
            { title: "Electric Drive", desc: "High-torque electric motors for immediate response and regeneration." },
            { title: "Battery Buffer", desc: "Optimized energy storage. Lightweight, payload-friendly, charging-independent." },
            { title: "Combustion Generator", desc: "Downsized, constant-RPM engine for maximum fuel-to-energy conversion." },
            { title: "HCU Intelligence", desc: "Proprietary AI split logic adaptive to real-time Indian drive cycles." }
          ].map((item, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, x: i % 2 === 0 ? -100 : 100, filter: "blur(10px)" }}
              whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
              transition={{ duration: 1.2, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="glass-ui p-8 border-l-4 border-violet pointer-events-auto hover:bg-violet/10 transition-colors group"
            >
              <h3 className="text-xl font-bold text-white mb-4 group-hover:text-cyan transition-colors">{item.title}</h3>
              <p className="text-[#A0A8C0] font-light leading-relaxed">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
