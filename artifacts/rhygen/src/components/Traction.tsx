import { motion } from "framer-motion";
import { CheckCircle, Shield, Award, Landmark } from "lucide-react";

export function Traction() {
  const achievements = [
    { icon: <CheckCircle className="text-emerald-400" />, title: "Working Prototype", desc: "Full-scale powertrain validation complete." },
    { icon: <Shield className="text-violet" />, title: "IIT Bombay / SINE", desc: "Incubated at India's premier deep-tech ecosystem." },
    { icon: <Award className="text-cyan" />, title: "IP Filed", desc: "Proprietary hybrid control logic and system architecture protected." },
    { icon: <Landmark className="text-amber-400" />, title: "Grant Winner", desc: "Recognized by national innovation bodies for technical depth." },
  ];

  return (
    <section id="traction" className="h-screen flex flex-col items-center justify-center pointer-events-none">
      <div className="max-w-[1440px] w-full px-6 flex flex-col items-center">
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="label-caps text-cyan mb-12"
        >
          Evidence of progress
        </motion.div>
        
        <h2 className="text-[clamp(40px,6vw,80px)] font-bold text-center text-white mb-24">
          Evidence emerging from <span className="text-violet">darkness.</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 w-full">
          {achievements.map((item, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, scale: 0.8, y: 50 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="glass-ui p-10 flex flex-col items-center text-center group hover:border-violet/50 transition-all pointer-events-auto"
            >
              <div className="mb-8 transform group-hover:scale-125 transition-transform duration-500">
                {item.icon}
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">{item.title}</h3>
              <p className="text-[#A0A8C0] font-light leading-relaxed">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Ticker for recognitions */}
        <div className="mt-32 w-full overflow-hidden mask-edges opacity-40">
          <motion.div 
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            className="flex gap-20 whitespace-nowrap text-white font-black text-2xl tracking-[10px] uppercase"
          >
            {[...Array(10)].map((_, i) => (
              <span key={i}>IIT BOMBAY • SINE • TATA ACE PROTOTYPE • IP PROTECTED • SEED GRANT • AUTOMOTIVE GRADE •</span>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
