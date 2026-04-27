import { motion } from "framer-motion";

export function Traction() {
  const partners = [
    "Mahindra Commercial Vehicles",
    "Tata Motors",
    "Ashok Leyland",
    "IDEAL Movers",
    "JK Logistics",
    "VRL Logistics"
  ];

  return (
    <section id="traction" className="py-24 bg-[#070710]">
      <div className="container mx-auto px-6 max-w-[1440px]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <span className="text-[12px] font-bold tracking-[3px] text-[#A0A8C0] mb-4 block">TRACTION</span>
          <h2 className="text-[40px] md:text-[52px] font-bold text-white max-w-[800px] leading-[1.1] mb-6">
            From lab bench to the road.<br/>In 12 months.
          </h2>
          <p className="text-[18px] text-[#A0A8C0] max-w-[680px]">
            We are moving fast. Our core IP is validated, and we are currently transitioning from lab scale to full vehicle integration.
          </p>
        </motion.div>

        {/* Prototype Panels */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-[#0F1020] border-2 border-[#5B4EE8]/40 rounded-2xl overflow-hidden group"
          >
            <div className="h-[280px] w-full relative overflow-hidden bg-black/50">
              <img 
                src="/images/bench-prototype.png" 
                alt="Bench Prototype" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90"
              />
            </div>
            <div className="p-8">
              <span className="inline-block px-3 py-1 bg-green-500/10 text-green-400 border border-green-500/20 rounded-full text-[12px] font-bold tracking-wider mb-4">
                TRL 4 — VALIDATED
              </span>
              <h3 className="text-[24px] font-bold text-white mb-3">Bench Prototype</h3>
              <p className="text-[15px] text-[#A0A8C0] leading-relaxed">
                Fully functional laboratory setup integrating our proprietary motor, generator, and AI HCU with a scaled internal combustion engine. Demonstrated 28% efficiency gains under simulated Indian drive cycles.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="bg-[#0F1020] border-2 border-[#5B4EE8]/40 rounded-2xl overflow-hidden group"
          >
            <div className="h-[280px] w-full relative overflow-hidden bg-black/50">
              <img 
                src="/images/hev-prototype.png" 
                alt="HEV Prototype" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90"
              />
            </div>
            <div className="p-8">
              <span className="inline-block px-3 py-1 bg-[#5B4EE8]/20 text-[#5B4EE8] border border-[#5B4EE8]/30 rounded-full text-[12px] font-bold tracking-wider mb-4">
                TRL 6 — ROAD TESTED
              </span>
              <h3 className="text-[24px] font-bold text-white mb-3">HEV Prototype (Tata Ace)</h3>
              <p className="text-[15px] text-[#A0A8C0] leading-relaxed">
                Our first on-road integration in a small commercial vehicle format. Validating the mechanical packaging, thermal management, and real-world AI predictive power splitting.
              </p>
            </div>
          </motion.div>
        </div>

      </div>

      {/* Awards Ticker (Full Width) */}
      <div className="w-full bg-[#0F1020] border-y border-white/5 py-4 overflow-hidden relative flex items-center mb-20">
        <motion.div 
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 30, ease: "linear", repeat: Infinity }}
          className="flex whitespace-nowrap text-[15px] font-medium text-white tracking-wide min-w-max"
        >
          {Array(2).fill("🏆 1st Prize SIAT · 🚀 3rd of 1700 AWS · 💰 gradCapital · 🌍 Emergent Ventures · 🔬 SINE IoE · 🏢 Pre-Incubated SINE · 📜 IRCC IP · ⚡ Project Titanium · ").map((text, i) => (
            <span key={i} className="mx-4">{text}</span>
          ))}
        </motion.div>
      </div>

      {/* Partners */}
      <div className="container mx-auto px-6 max-w-[1440px]">
        <div className="flex flex-col items-center">
          <span className="text-[14px] text-[#A0A8C0] font-medium mb-8">In active discussions with</span>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 w-full">
            {partners.map((partner, i) => (
              <div 
                key={i}
                className="h-20 bg-[#0F1020] border border-white/5 rounded-xl flex items-center justify-center p-4 hover:border-white/20 hover:scale-[1.03] transition-all duration-300 cursor-default"
              >
                <span className="text-[14px] font-semibold text-white/70 text-center leading-tight">
                  {partner}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

    </section>
  );
}
