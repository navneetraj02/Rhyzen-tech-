import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BrainCircuit, Activity, Settings2, Network } from "lucide-react";
import { Canvas } from "@react-three/fiber";
import { TruckModel } from "./TruckModel";
import { SafeCanvas } from "./SafeCanvas";

export function Technology() {
  const [explodedView, setExplodedView] = useState(false);

  const techCards = [
    {
      icon: <BrainCircuit className="w-8 h-8 text-[#5B4EE8]" />,
      title: "Adaptive AI Brain",
      desc: "Our Hybrid Control Unit (HCU) runs proprietary ML models that learn driver behavior and route topography to optimize power-split decisions dynamically."
    },
    {
      icon: <Activity className="w-8 h-8 text-[#00E5FF]" />,
      title: "India-Optimized Drive Cycles",
      desc: "Standard global powertrains fail in India. We built our algorithms specifically for Indian traffic patterns, overloading norms, and ghat (mountain) terrains."
    },
    {
      icon: <Settings2 className="w-8 h-8 text-[#5B4EE8]" />,
      title: "Dual Power-Split Architecture",
      desc: "A planetary gear set seamlessly blends mechanical torque from the engine and electrical torque from the motor without a traditional stepped transmission."
    },
    {
      icon: <Network className="w-8 h-8 text-[#00E5FF]" />,
      title: "Fleet-Level Learning",
      desc: "Every Rhygen truck acts as a node. Data is aggregated to the cloud, allowing OTA updates that improve fleet efficiency over time based on collective learning."
    }
  ];

  return (
    <section id="technology" className="py-24 bg-[#070710] border-t border-white/5">
      <div className="container mx-auto px-6 max-w-[1440px]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-[12px] font-bold tracking-[3px] text-[#A0A8C0] mb-4 block">TECHNOLOGY</span>
          <h2 className="text-[40px] md:text-[52px] font-bold text-white mb-4">
            Built on first principles.<br/>Optimized for Indian roads.
          </h2>
          <p className="text-[18px] text-[#A0A8C0] max-w-[600px] mx-auto">
            Not just hardware. We are building the operating system for commercial freight.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-20">
          {techCards.map((card, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-[#0F1020] border border-white/10 rounded-2xl p-8 hover:border-t-2 hover:border-t-[#5B4EE8] transition-all duration-300"
            >
              <div className="mb-6 bg-[#070710] w-16 h-16 rounded-xl flex items-center justify-center border border-white/5">
                {card.icon}
              </div>
              <h3 className="text-[22px] font-semibold text-white mb-3">{card.title}</h3>
              <p className="text-[15px] text-[#A0A8C0] leading-relaxed">{card.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* 3D Exploded View Toggle */}
        <div className="w-full flex flex-col items-center border border-[#5B4EE8]/20 bg-[#0F1020] rounded-3xl overflow-hidden relative">
          <div className="absolute top-8 z-10 flex flex-col items-center">
            <h3 className="text-white font-bold text-xl mb-4">Interactive Powertrain</h3>
            <button 
              onClick={() => setExplodedView(!explodedView)}
              className="bg-[#5B4EE8]/20 hover:bg-[#5B4EE8]/40 border border-[#5B4EE8] text-white px-6 py-2 rounded-full font-medium transition-all"
            >
              {explodedView ? "Reset View" : "Explore Internals"}
            </button>
          </div>
          
          <div className="w-full h-[500px] md:h-[600px] bg-[radial-gradient(ellipse_at_center,rgba(91,78,232,0.1),transparent_70%)]">
            <SafeCanvas fallback={
              <div className="w-full h-full flex items-center justify-center text-[#A0A8C0] text-sm">
                3D preview unavailable in this environment.
              </div>
            }>
              <Canvas camera={{ position: [0, 2, 8], fov: 45 }} gl={{ failIfMajorPerformanceCaveat: false }}>
                <ambientLight intensity={0.6} />
                <directionalLight position={[5, 10, 5]} intensity={1.5} />
                <pointLight position={[-5, -2, -5]} intensity={1} color="#00E5FF" />
                <TruckModel exploded={explodedView} />
              </Canvas>
            </SafeCanvas>
          </div>
        </div>

      </div>
    </section>
  );
}
