import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { SlideReveal, SectionReveal } from "./Reveal";

export function Market() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

  return (
    <section id="market" ref={containerRef} className="min-h-screen py-24 flex flex-col items-center justify-center pointer-events-none">
      <motion.div 
        style={{ opacity }}
        className="max-w-[1440px] w-full px-6 flex flex-col items-center"
      >
        <SlideReveal direction="right">
          <motion.div className="label-caps text-violet mb-12">Infrastructure Scale</motion.div>
        </SlideReveal>
        
        <div className="flex flex-col items-center mb-20 text-center">
          <SlideReveal direction="left" className="heading-massive text-white">NATIONAL</SlideReveal>
          <SlideReveal direction="right" className="heading-massive text-cyan" delay={0.2}>RELEVANCE.</SlideReveal>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 w-full items-center">
          <div className="flex flex-col gap-12">
            {[
              { title: "India's Logistics Core", desc: "Starting with India's freight corridors. Our solution is designed for the high-intensity, payload-sensitive commercial transport reality." },
              { title: "OEM Integration", desc: "Built for integration. Rhygen works with manufacturers and fleet operators to transform the existing commercial vehicle fleet at scale.", border: "border-l-4 border-cyan" }
            ].map((item, i) => (
              <SlideReveal 
                key={i}
                direction="left"
                delay={i * 0.2}
                className={`glass-ui p-10 pointer-events-auto ${item.border || ""}`}
              >
                <h3 className="text-3xl font-bold text-white mb-6">{item.title}</h3>
                <p className="text-[#A0A8C0] text-xl font-light leading-relaxed">
                  {item.desc}
                </p>
              </SlideReveal>
            ))}
          </div>

          <SectionReveal delay={0.4} className="w-full h-full min-h-[400px] md:min-h-[550px] pointer-events-auto relative">
            <div className="glass-ui w-full h-full p-2 overflow-hidden border-white/5 relative group">
              {/* Cinematic Video Container */}
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors z-10" />
              <video 
                autoPlay 
                loop 
                muted 
                playsInline 
                className="w-full h-full object-cover rounded-2xl"
              >
                <source src="/truckvideo.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              
              {/* Decorative Corner Overlays */}
              <div className="absolute top-6 left-6 w-12 h-12 border-t-2 border-l-2 border-cyan/40 z-20" />
              <div className="absolute bottom-6 right-6 w-12 h-12 border-b-2 border-r-2 border-violet/40 z-20" />
            </div>
          </SectionReveal>
        </div>
      </motion.div>
    </section>
  );
}
