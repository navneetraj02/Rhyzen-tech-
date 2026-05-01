import { motion } from "framer-motion";

export function BackedBy() {
  const backers = [
    { name: "gradCapital", type: "ATOMIC GRANT", logo: "/logo_gradcapital.png" },
    { name: "SINE IIT Bombay", type: "IoE GRANT", logo: "/logo_sine.png" },
    { name: "Emergent Ventures", type: "GRANT", logo: "/logo_emergent.png" },
    { name: "AWS Campus Fund", type: "GRAND CHALLENGE", logo: "/logo_aws.png" },
  ];

  return (
    <section className="py-12 bg-transparent">
      <div className="max-w-[1200px] mx-auto px-6">
        
        {/* Minimal Centered Header */}
        <div className="flex flex-col items-center mb-10">
          <span className="text-[10px] font-black tracking-[8px] text-cyan/40 uppercase">Backed By</span>
          <div className="w-10 h-[1px] bg-cyan/20 mt-3" />
        </div>

        {/* High-Fidelity Static Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 border border-white/5 rounded-3xl overflow-hidden bg-white/[0.01] backdrop-blur-sm shadow-[0_20px_50px_rgba(0,0,0,0.3)]">
          {backers.map((backer, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.8 }}
              className={`flex flex-col items-center justify-center p-8 md:p-12 relative group hover:bg-white/[0.02] transition-colors ${i !== backers.length - 1 ? 'border-b md:border-b-0 md:border-r border-white/5' : ''}`}
            >
              {/* Internal Accent Glow */}
              <div className="absolute inset-0 bg-cyan/0 group-hover:bg-cyan/[0.02] transition-colors duration-700" />
              
              {/* Logo with technical treatment */}
              <div className="relative z-10 mb-6 flex items-center justify-center h-12">
                <img 
                  src={backer.logo} 
                  alt={backer.name} 
                  className="max-h-full w-auto grayscale brightness-200 contrast-125 opacity-40 group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-700 transform group-hover:scale-110"
                />
              </div>

              {/* Labeling */}
              <div className="relative z-10 text-center">
                <div className="text-white font-bold text-xs tracking-wide group-hover:text-cyan transition-colors mb-1">
                  {backer.name}
                </div>
                <div className="text-[8px] font-mono text-white/30 tracking-[2px] uppercase">
                  {backer.type}
                </div>
              </div>

              {/* Technical Indicator */}
              <div className="absolute bottom-4 right-4 w-1 h-1 bg-white/10 rounded-full group-hover:bg-cyan group-hover:shadow-[0_0_8px_#00E5FF] transition-all" />
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
