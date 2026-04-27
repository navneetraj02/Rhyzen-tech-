import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

export function PowertrainDiagram() {
  return (
    <div className="relative w-full aspect-square md:aspect-[4/3] bg-[#0F1020] rounded-2xl border border-[#5B4EE8]/20 p-8 overflow-hidden flex items-center justify-center">
      {/* Abstract Diagram Representation */}
      <svg viewBox="0 0 400 300" className="w-full h-full max-w-[500px]">
        {/* Paths */}
        <motion.path 
          d="M 80 80 L 150 150 L 320 150" 
          fill="none" 
          stroke="rgba(91,78,232,0.3)" 
          strokeWidth="2" 
          strokeDasharray="4 4"
        />
        <motion.path 
          d="M 80 220 L 150 150" 
          fill="none" 
          stroke="rgba(0,229,255,0.3)" 
          strokeWidth="2" 
          strokeDasharray="4 4"
        />
        <motion.path 
          d="M 200 60 L 200 150" 
          fill="none" 
          stroke="rgba(255,255,255,0.2)" 
          strokeWidth="2" 
        />

        {/* Animated flow dots */}
        <motion.circle r="3" fill="#5B4EE8" filter="blur(1px)">
          <animateMotion dur="2s" repeatCount="indefinite" path="M 80 80 L 150 150 L 320 150" />
        </motion.circle>
        <motion.circle r="3" fill="#00E5FF" filter="blur(1px)">
          <animateMotion dur="1.5s" repeatCount="indefinite" path="M 80 220 L 150 150 L 320 150" />
        </motion.circle>

        {/* Nodes */}
        {/* ICE */}
        <g transform="translate(80, 80)">
          <rect x="-25" y="-20" width="50" height="40" rx="4" fill="#1A1A2E" stroke="#FFB020" strokeWidth="2" />
          <text x="0" y="4" fontSize="10" fill="white" textAnchor="middle" fontWeight="bold">ICE</text>
        </g>
        
        {/* Battery */}
        <g transform="translate(80, 220)">
          <rect x="-30" y="-15" width="60" height="30" rx="4" fill="#1A1A2E" stroke="#00E5FF" strokeWidth="2" />
          <text x="0" y="4" fontSize="10" fill="white" textAnchor="middle" fontWeight="bold">BATTERY</text>
        </g>

        {/* Power Split */}
        <g transform="translate(150, 150)">
          <circle r="25" fill="#1A1A2E" stroke="#5B4EE8" strokeWidth="2" />
          <text x="0" y="0" fontSize="8" fill="white" textAnchor="middle">POWER</text>
          <text x="0" y="10" fontSize="8" fill="white" textAnchor="middle">SPLIT</text>
        </g>

        {/* Motor */}
        <g transform="translate(230, 150)">
          <rect x="-25" y="-20" width="50" height="40" rx="4" fill="#1A1A2E" stroke="#00E5FF" strokeWidth="2" />
          <text x="0" y="4" fontSize="10" fill="white" textAnchor="middle" fontWeight="bold">MOTOR</text>
        </g>

        {/* Wheels */}
        <g transform="translate(320, 150)">
          <circle r="15" fill="#333" stroke="#888" strokeWidth="2" />
          <circle r="5" fill="#555" />
          <text x="0" y="28" fontSize="10" fill="#A0A8C0" textAnchor="middle">WHEELS</text>
        </g>

        {/* AI Brain */}
        <g transform="translate(200, 60)">
          <motion.circle 
            r="18" 
            fill="#ffffff" 
            animate={{ scale: [1, 1.1, 1], opacity: [0.8, 1, 0.8] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <circle r="22" fill="none" stroke="#5B4EE8" strokeWidth="1" strokeDasharray="2 2">
            <animateTransform attributeName="transform" type="rotate" from="0" to="360" dur="4s" repeatCount="indefinite" />
          </circle>
          <text x="0" y="4" fontSize="12" fill="#070710" textAnchor="middle" fontWeight="bold">AI</text>
        </g>
      </svg>
    </div>
  );
}

export function Solution() {
  const features = [
    "Operates on existing fuel infrastructure from day one.",
    "Small battery pack — no payload compromise.",
    "Regenerative braking captures energy usually lost.",
    "AI dynamically switches power sources for peak efficiency.",
    "Lower operating temps extend engine life.",
    "Can be retrofitted onto existing chassis.",
    "Zero range anxiety. Ever."
  ];

  return (
    <section id="solution" className="py-24 bg-[#0A0A18]">
      <div className="container mx-auto px-6 max-w-[1440px]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          <div className="flex flex-col">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="mb-8"
            >
              <span className="text-[12px] font-bold tracking-[3px] text-[#A0A8C0] mb-4 block">OUR SOLUTION</span>
              <h2 className="text-[40px] md:text-[52px] font-bold text-white leading-[1.1] mb-4">
                Smart Hybrid Powertrains.<br/>No compromises.
              </h2>
              <h3 className="text-[20px] md:text-[24px] font-semibold gradient-text mb-6">
                Electric drivetrain. Efficient combustion. AI brain.
              </h3>
              <p className="text-[16px] text-[#A0A8C0] leading-relaxed mb-8">
                We combine a downsized, hyper-efficient internal combustion engine with an electric motor and battery. Our proprietary AI Hybrid Control Unit (HCU) acts as the brain, analyzing load, terrain, and speed in real-time to route power perfectly.
              </p>
            </motion.div>

            <div className="flex flex-col gap-4">
              {features.map((feature, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-start gap-3"
                >
                  <CheckCircle2 className="w-6 h-6 text-[#5B4EE8] shrink-0 mt-0.5" />
                  <span className="text-[16px] text-white font-medium">{feature}</span>
                </motion.div>
              ))}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <PowertrainDiagram />
          </motion.div>

        </div>
      </div>
    </section>
  );
}
