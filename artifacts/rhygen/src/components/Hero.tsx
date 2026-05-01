import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { CharReveal, WordReveal, SectionReveal } from "./Reveal";

export function Hero() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.5], [0, -100]);

  return (
    <section id="hero" ref={containerRef} className="h-screen flex flex-col items-center justify-center text-center pointer-events-none">
      <motion.div 
        style={{ opacity, y }}
        className="max-w-[1440px] w-full px-6 flex flex-col items-center"
      >
        <SectionReveal delay={0.2}>
          <motion.div className="label-caps text-cyan mb-12">
            Intelligence in Motion
          </motion.div>
        </SectionReveal>

        <div className="flex flex-col items-center mb-12">
          <CharReveal className="heading-massive text-white" delay={0.5}>
            INTELLIGENT
          </CharReveal>
          <CharReveal className="heading-massive text-violet" delay={1.2}>
            HYBRID.
          </CharReveal>
        </div>

        <WordReveal 
          className="text-[clamp(18px,2vw,24px)] text-[#A0A8C0] font-light max-w-2xl leading-relaxed mb-16 justify-center"
          delay={2.5}
        >
          Built for India's freight future. We are building the bridge between diesel dependence and sustainable freight.
        </WordReveal>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, delay: 3.5, ease: [0.16, 1, 0.3, 1] }}
          className="flex gap-8 pointer-events-auto"
        >
          <button className="px-10 py-5 rounded-full bg-white text-black font-bold uppercase tracking-[4px] text-[12px] hover:bg-cyan transition-all hover:scale-110 active:scale-95 shadow-[0_0_20px_rgba(255,255,255,0.2)]">
            Explore Technology
          </button>
        </motion.div>
      </motion.div>
    </section>
  );
}
