import { motion } from "framer-motion";
import { Truck, Bus, Car } from "lucide-react";
import { Canvas } from "@react-three/fiber";
import { ParticleField } from "./ParticleField";
import { SafeCanvas } from "./SafeCanvas";

export function Vision() {
  return (
    <section className="relative min-h-[100dvh] w-full flex items-center justify-center py-24 overflow-hidden bg-[#070710]">
      
      {/* Dense Space Background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(91,78,232,0.15),transparent_80%)] opacity-60" />
        <SafeCanvas>
          <Canvas camera={{ position: [0, 0, 5], fov: 60 }} gl={{ failIfMajorPerformanceCaveat: false }}>
            <ambientLight intensity={0.5} />
            {/* Denser, faster particles */}
            <ParticleField count={400} speed={1.5} radius={12} color="#ffffff" size={0.03} />
            <ParticleField count={100} speed={0.8} radius={10} color="#00E5FF" size={0.05} />
          </Canvas>
        </SafeCanvas>
      </div>

      <div className="container mx-auto px-6 max-w-[1440px] relative z-10 flex flex-col items-center text-center">
        
        <motion.h2
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="text-[clamp(48px,6vw,80px)] font-[800] text-white mb-10 leading-tight"
        >
          Hybrid is the future.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.5 }}
          className="text-[18px] md:text-[22px] text-[#A0A8C0] max-w-[720px] leading-[1.7] mb-12"
        >
          Full EV trucks require massive, payload-killing batteries and a grid overhaul that will take decades. Hydrogen remains economically unviable. Pure green fuels scale too slowly. We need a bridge technology that cuts emissions dramatically <em>today</em>, using the infrastructure we already have.
        </motion.p>

        <motion.h3
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 1 }}
          className="text-[32px] md:text-[38px] font-bold gradient-text mb-20"
        >
          Rhygen is that path.
        </motion.h3>

        {/* Orbit Diagram using pure CSS animation for reliability and exact specs */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, delay: 1.5 }}
          className="relative w-[300px] h-[300px] md:w-[500px] md:h-[500px] flex items-center justify-center"
        >
          {/* Central Node */}
          <div className="absolute z-20 w-20 h-20 bg-gradient-to-tr from-[#5B4EE8] to-[#00E5FF] rounded-full flex items-center justify-center shadow-[0_0_40px_rgba(91,78,232,0.6)]">
            <span className="text-white font-bold text-xl">R</span>
          </div>

          {/* Orbit Rings */}
          <div className="absolute inset-4 md:inset-10 border border-white/10 rounded-full border-dashed animate-[spin_40s_linear_infinite]" />
          <div className="absolute inset-0 border border-[#5B4EE8]/30 rounded-full animate-[spin_30s_linear_infinite_reverse]" />

          {/* Orbiting Icons */}
          <div className="absolute inset-0 animate-[spin_30s_linear_infinite_reverse]">
            
            <div className="absolute -top-6 left-1/2 -translate-x-1/2 flex flex-col items-center">
              <div className="w-12 h-12 bg-[#0F1020] border border-[#5B4EE8] rounded-full flex items-center justify-center animate-[spin_30s_linear_infinite] shadow-[0_0_15px_rgba(91,78,232,0.4)]">
                <Truck className="w-5 h-5 text-white" />
              </div>
              <span className="absolute top-14 text-[12px] font-semibold text-white whitespace-nowrap animate-[spin_30s_linear_infinite]">Commercial Trucks</span>
            </div>

            <div className="absolute bottom-6 -right-2 flex flex-col items-center">
              <div className="w-12 h-12 bg-[#0F1020] border border-[#00E5FF] rounded-full flex items-center justify-center animate-[spin_30s_linear_infinite] shadow-[0_0_15px_rgba(0,229,255,0.4)]">
                <Bus className="w-5 h-5 text-white" />
              </div>
              <span className="absolute top-14 text-[12px] font-semibold text-white whitespace-nowrap animate-[spin_30s_linear_infinite]">Public Transit</span>
            </div>

            <div className="absolute bottom-6 -left-2 flex flex-col items-center">
              <div className="w-12 h-12 bg-[#0F1020] border border-white/50 rounded-full flex items-center justify-center animate-[spin_30s_linear_infinite] shadow-[0_0_15px_rgba(255,255,255,0.2)]">
                <Car className="w-5 h-5 text-white" />
              </div>
              <span className="absolute top-14 text-[12px] font-semibold text-white whitespace-nowrap animate-[spin_30s_linear_infinite]">Passenger Fleet</span>
            </div>

          </div>
        </motion.div>

      </div>
    </section>
  );
}
