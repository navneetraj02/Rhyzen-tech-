import { motion } from "framer-motion";

export function Market() {
  const bars = [
    { name: "India", value: "$15-20B", width: "100%", color: "from-[#5B4EE8] to-[#00E5FF]" },
    { name: "Indonesia", value: "$4.6B", width: "30%", color: "from-[#5B4EE8]/80 to-[#00E5FF]/80" },
    { name: "Africa", value: "$4B", width: "25%", color: "from-[#5B4EE8]/60 to-[#00E5FF]/60" },
    { name: "Brazil", value: "$3.6B", width: "22%", color: "from-[#5B4EE8]/40 to-[#00E5FF]/40" },
    { name: "Thailand", value: "$2B", width: "15%", color: "from-[#5B4EE8]/20 to-[#00E5FF]/20" }
  ];

  return (
    <section id="market" className="py-24 bg-[#0A0A18]">
      <div className="container mx-auto px-6 max-w-[1440px]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <span className="text-[12px] font-bold tracking-[3px] text-[#A0A8C0] mb-4 block">MARKET OPPORTUNITY</span>
          <h2 className="text-[40px] md:text-[52px] font-bold text-white max-w-[800px] leading-[1.1] mb-6">
            A $357 billion global market.<br/>We're starting where it matters most.
          </h2>
          <p className="text-[18px] text-[#A0A8C0] max-w-[680px]">
            India's commercial transport sector is growing at an unprecedented rate, yet remains completely unserved by electrification due to infrastructure constraints.
          </p>
        </motion.div>

        {/* Big Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col"
          >
            <span className="text-[56px] md:text-[72px] font-[800] gradient-text leading-none mb-2">$357B</span>
            <span className="text-[15px] font-semibold text-white">Global MHCV powertrain market (2025)</span>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="flex flex-col"
          >
            <span className="text-[56px] md:text-[72px] font-[800] gradient-text leading-none mb-2">$20B</span>
            <span className="text-[15px] font-semibold text-white">India annual MHCV opportunity</span>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex flex-col"
          >
            <span className="text-[56px] md:text-[72px] font-[800] gradient-text leading-none mb-2">400k</span>
            <span className="text-[15px] font-semibold text-white">New trucks sold in India annually</span>
          </motion.div>
        </div>

        {/* Panels */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Left Panel: Bar Chart */}
          <div className="bg-[#0F1020] border border-white/5 rounded-2xl p-8 flex flex-col justify-center">
            <h3 className="text-[18px] font-semibold text-white mb-8">Addressable Market by Geography</h3>
            <div className="flex flex-col gap-6">
              {bars.map((bar, i) => (
                <div key={i} className="flex items-center gap-4">
                  <div className="w-[100px] text-[14px] text-[#A0A8C0] font-medium">{bar.name}</div>
                  <div className="flex-1 h-8 bg-black/40 rounded-md overflow-hidden relative">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: bar.width }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1, duration: 1, ease: "easeOut" }}
                      className={`absolute top-0 left-0 h-full bg-gradient-to-r ${bar.color}`}
                    />
                  </div>
                  <div className="w-[60px] text-right text-[14px] font-bold text-white">{bar.value}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Panel: Bullseye Diagram */}
          <div className="bg-[#0F1020] border border-white/5 rounded-2xl p-8 flex flex-col justify-center items-center overflow-hidden">
            <h3 className="text-[18px] font-semibold text-white mb-8 self-start w-full">GTM Target Segments</h3>
            <div className="relative w-[300px] h-[300px] flex items-center justify-center">
              {/* Outer */}
              <motion.div 
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="absolute inset-0 rounded-full border-2 border-white/10 flex items-start justify-center pt-4"
              >
                <span className="text-[10px] text-[#A0A8C0] font-medium tracking-wide uppercase">Defence & Export Markets</span>
              </motion.div>
              {/* Middle */}
              <motion.div 
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.1 }}
                className="absolute w-[220px] h-[220px] rounded-full border-2 border-[#00E5FF]/40 flex items-start justify-center pt-4 bg-[#00E5FF]/5"
              >
                <span className="text-[10px] text-[#00E5FF] font-medium tracking-wide uppercase">Commercial OEMs</span>
              </motion.div>
              {/* Inner */}
              <motion.div 
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="absolute w-[140px] h-[140px] rounded-full border-2 border-[#5B4EE8] flex items-center justify-center bg-[#5B4EE8]/20 shadow-[0_0_30px_rgba(91,78,232,0.4)]"
              >
                <span className="text-[12px] text-white font-bold tracking-wide uppercase text-center px-4">Large Fleet<br/>Operators</span>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Callout Strips */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="w-full bg-[#16124B] rounded-xl p-6 md:p-8 text-center mb-4"
        >
          <p className="text-[18px] md:text-[20px] text-white font-medium">
            5 million+ trucks already running on Indian roads — every one of them is a retrofit opportunity.
          </p>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-center px-6"
        >
          <p className="text-[15px] md:text-[16px] text-[#A0A8C0]">
            Additionally, 50,000–60,000 repossessed trucks are sold annually in India — a $2 billion secondary market and our fastest entry point.
          </p>
        </motion.div>

      </div>
    </section>
  );
}
