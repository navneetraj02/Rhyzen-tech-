import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { SlideReveal, SectionReveal } from "./Reveal";

export function Vision() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.4, 0.6, 1], [0, 1, 1, 0]);

  return (
    <section id="vision" ref={containerRef} className="py-20 flex flex-col items-center justify-center pointer-events-none">
      <motion.div 
        style={{ opacity }}
        className="max-w-[1200px] w-full px-6 flex flex-col items-center text-center"
      >
        <SlideReveal direction="up">
          <motion.div className="label-caps text-cyan mb-12">The transition platform</motion.div>
        </SlideReveal>
        
        <div className="flex flex-col items-center mb-16">
          <SlideReveal direction="up" delay={0.2} className="heading-massive text-white">FREIGHT</SlideReveal>
          <SlideReveal direction="up" delay={0.4} className="heading-massive text-violet">INEVITABLE.</SlideReveal>
        </div>

        <SectionReveal delay={0.8} className="text-[clamp(24px,3vw,40px)] text-[#A0A8C0] font-light leading-tight max-w-4xl justify-center">
          Hybridization is not just a technology. It is the practical, necessary bridge to India's clean energy independence.
        </SectionReveal>

        {/* Abstract Horizon Visual Cues */}
        <div className="absolute bottom-0 left-0 w-full h-[30vh] bg-gradient-to-t from-violet/20 to-transparent opacity-30 pointer-events-none" />
      </motion.div>
    </section>
  );
}
