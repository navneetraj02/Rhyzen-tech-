import { motion } from "framer-motion";
import { Cpu, Cloud, Factory, ShieldAlert } from "lucide-react";

export function BusinessModel() {
  const cards = [
    {
      icon: <Cpu className="w-8 h-8 text-[#5B4EE8]" />,
      pill: "Primary Revenue",
      pillClass: "text-[#5B4EE8] bg-[#5B4EE8]/10 border-[#5B4EE8]/20",
      title: "Upfront Hardware",
      desc: "Direct sale of the physical hybrid powertrain system (motor, battery, ICE, HCU) to fleet operators for retrofitting existing trucks."
    },
    {
      icon: <Cloud className="w-8 h-8 text-[#00E5FF]" />,
      pill: "Recurring Revenue",
      pillClass: "text-[#00E5FF] bg-[#00E5FF]/10 border-[#00E5FF]/20",
      title: "AI SaaS Subscription",
      desc: "Monthly fee per truck for cloud telemetry, predictive maintenance, and continuous OTA efficiency updates from fleet-wide learning."
    },
    {
      icon: <Factory className="w-8 h-8 text-white" />,
      pill: "Scale Revenue",
      pillClass: "text-gray-300 bg-white/10 border-white/20",
      title: "OEM Powertrain Supply",
      desc: "Licensing the powertrain architecture to major OEMs as a Tier-1 supplier for integration into new vehicle assembly lines."
    }
  ];

  const funnel = [
    "Repossessed Vehicles (Entry Point)",
    "Fleet Pilot Validation",
    "Fleet Scale-Up",
    "OEM Integration"
  ];

  return (
    <section id="business" className="py-24 bg-[#070710]">
      <div className="container mx-auto px-6 max-w-[1440px]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <span className="text-[12px] font-bold tracking-[3px] text-[#A0A8C0] mb-4 block">BUSINESS MODEL</span>
          <h2 className="text-[40px] md:text-[52px] font-bold text-white mb-6">
            Built to scale. Revenue aligned with results.
          </h2>
          <p className="text-[18px] text-[#A0A8C0] max-w-[680px] mx-auto">
            Our business model transitions from high-margin hardware sales to high-volume OEM licensing, supported by sticky recurring software revenue.
          </p>
        </motion.div>

        {/* Revenue Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
          {cards.map((card, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-[#0F1020] border border-white/5 rounded-2xl p-8 hover:border-white/10 transition-colors"
            >
              <div className="flex justify-between items-start mb-8">
                <div className="bg-black/30 w-16 h-16 rounded-xl flex items-center justify-center border border-white/5">
                  {card.icon}
                </div>
                <span className={`px-3 py-1 rounded-full text-[11px] font-bold border ${card.pillClass}`}>
                  {card.pill}
                </span>
              </div>
              <h3 className="text-[22px] font-semibold text-white mb-3">{card.title}</h3>
              <p className="text-[15px] text-[#A0A8C0] leading-relaxed">{card.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* GTM Funnel */}
        <div className="max-w-[800px] mx-auto mb-20">
          <h3 className="text-[20px] font-bold text-white text-center mb-8">Go-To-Market Execution</h3>
          <div className="flex flex-col items-center gap-2">
            {funnel.map((step, i) => (
              <div key={i} className="flex flex-col items-center w-full">
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15 }}
                  className="bg-[#0F1020] border border-[#5B4EE8]/30 rounded-full py-4 flex items-center justify-center text-white font-semibold text-[15px] md:text-[16px] shadow-[0_4px_15px_rgba(0,0,0,0.5)]"
                  style={{ width: `${100 - i * 15}%` }} // Widens at top, narrows at bottom... actually the spec says "widening pills connected by downward arrows" so let's reverse that
                >
                  {step}
                </motion.div>
                {i < funnel.length - 1 && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    whileInView={{ height: 24, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.15 + 0.1 }}
                    className="w-[2px] bg-gradient-to-b from-[#5B4EE8] to-transparent my-1"
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Defence Callout */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-[800px] mx-auto bg-[#0F1020] border border-white/5 border-l-4 border-l-[#5B4EE8] rounded-r-xl p-6 md:p-8 flex gap-6 items-start"
        >
          <ShieldAlert className="w-8 h-8 text-[#5B4EE8] shrink-0 mt-1" />
          <div>
            <h4 className="text-[18px] font-bold text-white mb-2">Defence Sector Advantage</h4>
            <p className="text-[15px] text-[#A0A8C0] leading-relaxed">
              Our powertrain architecture offers extreme advantages for military applications: electric-only stealth modes for quiet movement, high-altitude torque preservation where standard diesel fails, and multi-fuel agnostic capabilities.
            </p>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
