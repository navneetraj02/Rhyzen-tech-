import { motion } from "framer-motion";
import { CloudOff, Fuel, BatteryWarning } from "lucide-react";

export function Problem() {
  const cards = [
    {
      icon: <CloudOff className="w-8 h-8 text-[#5B4EE8]" />,
      stat: "50%",
      label: "of vehicular emissions",
      desc: "Despite making up just 4% of the vehicle fleet, medium and heavy commercial vehicles (MHCVs) account for half of all transport emissions in India."
    },
    {
      icon: <Fuel className="w-8 h-8 text-[#5B4EE8]" />,
      stat: "45–50%",
      label: "of fleet operating costs",
      desc: "Diesel expenses crush fleet margins. With diesel prices continually rising, operators are left with razor-thin 3–5% profit margins."
    },
    {
      icon: <BatteryWarning className="w-8 h-8 text-[#5B4EE8]" />,
      stat: "0",
      label: "viable large-scale alternatives today",
      desc: "EV batteries for heavy trucks weigh tons, slash payload capacity, and require non-existent megawatt charging infrastructure. Hydrogen is decades away."
    }
  ];

  return (
    <section id="problem" className="py-24 bg-[#070710] relative">
      <div className="container mx-auto px-6 max-w-[1440px]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="mb-16"
        >
          <span className="text-[12px] font-bold tracking-[3px] text-[#A0A8C0] mb-4 block">THE PROBLEM</span>
          <h2 className="text-[40px] md:text-[52px] font-bold text-white max-w-[720px] leading-[1.1] mb-6">
            Why trucks are the biggest climate problem nobody's solving.
          </h2>
          <p className="text-[18px] text-[#A0A8C0] max-w-[680px] leading-relaxed">
            We are trying to force passenger car solutions onto commercial trucks. It doesn't work. The physics and economics of moving 40 tons across India demand a different approach.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-24">
          {cards.map((card, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.15, duration: 0.6 }}
              className="bg-[#0F1020] border border-[#5B4EE8]/20 rounded-2xl p-9 hover:border-[#5B4EE8]/70 hover:-translate-y-1.5 transition-all duration-300 group"
            >
              <div className="bg-[#5B4EE8]/10 w-16 h-16 rounded-xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-300">
                {card.icon}
              </div>
              <div className="text-[56px] md:text-[64px] font-extrabold gradient-text leading-none mb-2">{card.stat}</div>
              <div className="text-[16px] font-semibold text-white mb-4">{card.label}</div>
              <p className="text-[15px] text-[#A0A8C0] leading-relaxed">{card.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Timeline Comparison */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="w-full relative py-8"
        >
          <div className="hidden md:block absolute top-1/2 left-0 right-0 h-1 bg-[#1A1A2E] -translate-y-1/2 rounded-full overflow-hidden">
            <motion.div 
              initial={{ width: "0%" }}
              whileInView={{ width: "100%" }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              className="h-full bg-gradient-to-r from-transparent via-[#5B4EE8] to-[#00E5FF]"
            />
          </div>
          
          <div className="flex flex-col md:flex-row justify-between items-center relative z-10 gap-8 md:gap-0">
            <div className="flex flex-col items-center text-center">
              <div className="w-4 h-4 rounded-full bg-[#333344] mb-3 md:mb-4 border-4 border-[#070710]" />
              <div className="text-[14px] font-semibold text-[#A0A8C0]">Full Diesel</div>
              <div className="text-[12px] text-[#A0A8C0]/60">(Status Quo)</div>
            </div>
            
            <div className="flex flex-col items-center text-center">
              <div className="w-6 h-6 rounded-full bg-[#5B4EE8] mb-2 md:mb-3 border-4 border-[#070710] shadow-[0_0_15px_rgba(91,78,232,0.8)]" />
              <div className="text-[16px] font-bold text-white">Smart Hybrid</div>
              <div className="text-[12px] text-[#5B4EE8] font-medium tracking-wide">(Rhygen Bridge)</div>
            </div>
            
            <div className="flex flex-col items-center text-center">
              <div className="w-4 h-4 rounded-full bg-[#00E5FF] mb-3 md:mb-4 border-4 border-[#070710] shadow-[0_0_10px_rgba(0,229,255,0.4)]" />
              <div className="text-[14px] font-semibold text-[#A0A8C0]">Green Fuel</div>
              <div className="text-[12px] text-[#A0A8C0]/60">(Future)</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
