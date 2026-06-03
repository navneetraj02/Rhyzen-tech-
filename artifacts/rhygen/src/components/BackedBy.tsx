import { motion } from "framer-motion";

export function BackedBy() {
  const backers = [
    {
      name: "IIT Bombay",
      logo: "/logo_iitb.svg",
    },
    {
      name: "gradCapital",
      logo: "/logo_gradcapital.png",
    },
    {
      name: "Emergent",
      logo: "/logo_emergent.png",
    },
    {
      name: "SINE",
      logo: "/logo_sine.png",
    }
  ];

  return (
    <section className="py-24 bg-transparent relative overflow-hidden flex flex-col items-center justify-center min-h-[50vh]">
      {/* Header */}
      <div className="max-w-[1200px] mx-auto px-6 relative z-10 w-full mb-16">
        <div className="flex flex-col items-center">
          <h2 className="text-[clamp(32px,5vw,64px)] font-black text-center text-white tracking-tight uppercase">
            Backed by
          </h2>
          <div className="w-16 h-[2px] bg-cyan mt-4" />
        </div>
      </div>

      {/* Grid Layout of 4 Static Logo Cards */}
      <div className="max-w-[1200px] mx-auto px-6 relative z-10 w-full">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 justify-center items-stretch">
          {backers.map((backer, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.8, ease: "easeOut" }}
              whileHover={{ y: -8, borderColor: "rgba(0, 229, 255, 0.4)", boxShadow: "0 10px 25px rgba(0, 229, 255, 0.1)" }}
              className="glass-ui p-8 rounded-2xl border border-white/10 flex flex-col items-center justify-between transition-all duration-300 text-center"
            >
              {/* Logo container */}
              <div className="flex items-center justify-center h-20 w-full mb-6">
                <img 
                  src={backer.logo} 
                  alt={backer.name} 
                  className="max-h-full max-w-[85%] object-contain"
                />
              </div>
              
              {/* Monospaced Cap Text below logo */}
              <span className="text-xs font-mono text-cyan/90 tracking-[2px] uppercase block">
                {backer.name}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
