import { motion, useScroll, useTransform } from "framer-motion";
import { Canvas } from "@react-three/fiber";
import { TruckModel } from "./TruckModel";
import { ParticleField } from "./ParticleField";
import { SafeCanvas } from "./SafeCanvas";

export function Hero() {
  const { scrollY } = useScroll();
  const yBg = useTransform(scrollY, [0, 1000], [0, 200]);

  return (
    <section className="relative min-h-[100dvh] w-full flex items-center pt-20 overflow-hidden bg-[#070710]">
      {/* Background gradients and grid */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_50%,rgba(91,78,232,0.12),transparent_60%)]" />
        
        {/* Animated Perspective Grid */}
        <div className="absolute bottom-0 left-0 right-0 h-[40vh] perspective-[1000px] overflow-hidden opacity-30">
          <motion.div 
            className="w-full h-[200%] border-t border-[#5B4EE8]/20 bg-[linear-gradient(transparent_95%,rgba(91,78,232,0.2)_100%),linear-gradient(90deg,transparent_95%,rgba(91,78,232,0.2)_100%)] bg-[length:50px_50px]"
            style={{ transformOrigin: "bottom center", rotateX: "70deg", y: yBg }}
            animate={{
              backgroundPosition: ["0px 0px", "0px 50px"]
            }}
            transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
          />
        </div>
      </div>

      <div className="container mx-auto px-6 max-w-[1440px] relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Text Content (55%) */}
        <div className="lg:col-span-7 flex flex-col pt-12 lg:pt-0">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-6"
          >
            <span className="text-[12px] font-bold tracking-[3px] text-[#5B4EE8] bg-[#5B4EE8]/10 py-1.5 px-3 rounded-full border border-[#5B4EE8]/20">
              HULT PRIZE 2025 · IIT BOMBAY
            </span>
          </motion.div>

          <h1 className="text-[clamp(48px,6vw,80px)] font-[800] leading-[1.1] tracking-tight mb-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-white"
            >
              Smart Hybrid
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.65 }}
              className="gradient-text pb-2"
            >
              Powertrains
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.9 }}
              className="text-white"
            >
              for India's Trucks.
            </motion.div>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.1 }}
            className="text-[18px] md:text-[20px] text-[#A0A8C0] max-w-[480px] mb-10 leading-relaxed"
          >
            Cleaner air for our cities. More money for our drivers. A greener planet for our children. <span className="text-white">Built for the people who keep India moving.</span>
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.3 }}
            className="flex flex-wrap gap-4 mb-16"
          >
            <button className="bg-[#5B4EE8] text-white font-semibold py-3 px-8 rounded-lg hover:scale-104 hover:shadow-[0_0_20px_rgba(91,78,232,0.4)] transition-all duration-300">
              Watch Demo
            </button>
            <button className="border border-[#5B4EE8] text-[#5B4EE8] hover:bg-[#5B4EE8]/10 font-semibold py-3 px-8 rounded-lg hover:scale-104 transition-all duration-300">
              Our Technology
            </button>
          </motion.div>

          {/* Stats Row */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.6 }}
            className="grid grid-cols-3 gap-6 border-t border-white/10 pt-8 max-w-[600px]"
          >
            <div className="flex flex-col">
              <span className="text-[40px] md:text-[48px] font-bold gradient-text leading-none mb-1">~3×</span>
              <span className="text-[13px] text-[#A0A8C0] font-medium">Mileage Improvement</span>
            </div>
            <div className="flex flex-col border-l border-white/10 pl-6">
              <span className="text-[40px] md:text-[48px] font-bold gradient-text leading-none mb-1">20–30%</span>
              <span className="text-[13px] text-[#A0A8C0] font-medium">Emission Reduction</span>
            </div>
            <div className="flex flex-col border-l border-white/10 pl-6">
              <span className="text-[40px] md:text-[48px] font-bold gradient-text leading-none mb-1">300%</span>
              <span className="text-[13px] text-[#A0A8C0] font-medium">Fleet Profit Increase</span>
            </div>
          </motion.div>
        </div>

        {/* Right Column (3D Model) */}
        <div className="lg:col-span-5 h-[50vh] lg:h-[80vh] relative mt-10 lg:mt-0">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, delay: 1 }}
            className="w-full h-full absolute inset-0 cursor-grab active:cursor-grabbing"
          >
            <SafeCanvas fallback={
              <div className="w-full h-full flex items-center justify-center">
                <div className="w-[80%] h-[60%] rounded-2xl border border-[#5B4EE8]/30 bg-gradient-to-br from-[#5B4EE8]/10 to-[#00E5FF]/10 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-[#5B4EE8] text-6xl font-black mb-2">R</div>
                    <div className="text-white/60 text-sm tracking-widest">HYBRID POWERTRAIN</div>
                  </div>
                </div>
              </div>
            }>
              <Canvas camera={{ position: [5, 3, 10], fov: 45 }} gl={{ failIfMajorPerformanceCaveat: false, antialias: true }}>
                <ambientLight intensity={0.5} />
                <directionalLight position={[10, 10, 5]} intensity={1.5} color="#ffffff" />
                <pointLight position={[-10, -10, -5]} intensity={2} color="#00E5FF" />
                <pointLight position={[10, 0, 0]} intensity={2} color="#5B4EE8" />
                
                <ParticleField count={200} speed={0.3} radius={6} />
                
                <TruckModel />
              </Canvas>
            </SafeCanvas>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
