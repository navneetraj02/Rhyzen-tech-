import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { SectionReveal } from "./Reveal";

export function Impact() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
  const xLeft = useTransform(scrollYProgress, [0, 1], [-200, 200]);
  const xRight = useTransform(scrollYProgress, [0, 1], [200, -200]);

  return (
    <section id="impact" ref={containerRef} className="min-h-screen py-32 flex flex-col items-center justify-center pointer-events-none overflow-hidden">
      <motion.div style={{ opacity }} className="w-full flex flex-col gap-32">
        
        {/* Kinetic Typography Row 1 */}
        <div className="flex flex-col gap-4 overflow-hidden">
          <motion.div style={{ x: xLeft }} className="flex gap-12 whitespace-nowrap">
            {[...Array(4)].map((_, i) => (
              <span key={i} className="heading-massive text-white opacity-30">30% EMISSIONS REDUCTION</span>
            ))}
          </motion.div>
          <div className="flex justify-center px-6">
            <SectionReveal className="max-w-[1200px] w-full">
              <div className="glass-ui p-16 flex flex-col md:flex-row items-center justify-between gap-12 pointer-events-auto">
                <motion.div 
                  initial={{ scale: 0.5, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                  className="text-[clamp(80px,10vw,140px)] font-black text-cyan leading-none"
                >
                  3X
                </motion.div>
                <div className="flex flex-col items-center md:items-start text-center md:text-left max-w-xl">
                  <h3 className="text-3xl font-bold text-white mb-6">FLEET PROFITS</h3>
                  <p className="text-xl text-[#A0A8C0] font-light leading-relaxed">
                    Decoupling growth from fuel costs. Our system delivers three times the profitability for long-haul fleet operators.
                  </p>
                </div>
              </div>
            </SectionReveal>
          </div>
        </div>

        {/* Kinetic Typography Row 2 */}
        <div className="flex flex-col gap-4 overflow-hidden">
          <motion.div style={{ x: xRight }} className="flex gap-12 whitespace-nowrap">
            {[...Array(4)].map((_, i) => (
              <span key={i} className="heading-massive text-white opacity-30">ZERO CHARGING DEPENDENCY</span>
            ))}
          </motion.div>
          <div className="flex justify-center px-6">
            <SectionReveal className="max-w-[1200px] w-full" delay={0.2}>
              <div className="glass-ui p-16 flex flex-col md:flex-row-reverse items-center justify-between gap-12 border-r-4 border-violet pointer-events-auto">
                <motion.div 
                  initial={{ scale: 2, opacity: 0, filter: "blur(20px)" }}
                  whileInView={{ scale: 1, opacity: 1, filter: "blur(0px)" }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                  className="text-[clamp(80px,10vw,140px)] font-black text-violet leading-none"
                >
                  80%
                </motion.div>
                <div className="flex flex-col items-center md:items-end text-center md:text-right max-w-xl">
                  <h3 className="text-3xl font-bold text-white mb-6">SMALLER BATTERY</h3>
                  <p className="text-xl text-[#A0A8C0] font-light leading-relaxed">
                    Massive reduction in battery weight compared to full EVs. No payload sacrifice. No charging infrastructure required.
                  </p>
                </div>
              </div>
            </SectionReveal>
          </div>
        </div>

      </motion.div>
    </section>
  );
}
