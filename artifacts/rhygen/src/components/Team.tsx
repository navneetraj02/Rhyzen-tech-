import { motion } from "framer-motion";

export function Team() {
  const members = [
    { 
      name: "Aditya Anand",
      role: "Co-Founder · Electrical Systems & Business", 
      background: "B.Tech EE, IIT Bombay '26", 
      tag: "HV ARCHITECTURE",
      image: "/aditya.png"
    },
    { 
      name: "Sajal Deolikar",
      role: "Co-Founder · Embedded Systems & Algorithms", 
      background: "B.Tech EE, IIT Bombay '25", 
      tag: "CONTROL LOGIC",
      image: "/sajal.png"
    },
    { 
      name: "Sannidhya Kaushal",
      role: "Co-Founder · Mechanical Design & Vehicle Integration", 
      background: "B.Tech EE, IIT Bombay '25", 
      tag: "DYNAMICS & CAD",
      image: "/sannidhya.jpg"
    },
  ];

  return (
    <section id="team" className="min-h-screen flex flex-col items-center justify-center py-40 bg-transparent">
      <div className="max-w-[1440px] w-full px-6 flex flex-col items-center">
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="label-caps text-violet mb-8"
        >
          The strike team
        </motion.div>
        
        <h2 className="text-[clamp(40px,6vw,100px)] font-black text-center text-white mb-32 tracking-tighter uppercase leading-[0.9]">
          TECHNICAL <br/>
          <span className="text-violet">FORMIDABLE.</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 w-full max-w-[1200px]">
          {members.map((member, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.15, duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="relative group cursor-pointer"
            >
              {/* Card Container */}
              <div className="glass-ui p-1 w-full aspect-[4/5] rounded-[32px] overflow-hidden group-hover:border-violet/50 transition-all duration-700 bg-white/[0.02] relative">
                
                {/* Member Image with Mask/Effect */}
                <div className="absolute inset-0 z-0">
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="w-full h-full object-cover grayscale brightness-75 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-1000 ease-out scale-110 group-hover:scale-100"
                  />
                  {/* Cinematic Overlays */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A0B14] via-[#0A0B14]/40 to-transparent opacity-90" />
                  <div className="absolute inset-0 bg-violet/5 group-hover:bg-transparent transition-colors duration-700" />
                </div>

                <div className="w-full h-full relative z-10 flex flex-col justify-end p-10">
                  
                  {/* Technical HUD Overlay */}
                  <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-20 group-hover:opacity-60 transition-all duration-700">
                    <div className="absolute top-8 right-8 w-12 h-12 border-t border-r border-cyan/40" />
                    <div className="absolute bottom-8 left-8 w-12 h-12 border-b border-l border-cyan/40" />
                    
                    {/* Scanning Line Animation on Hover */}
                    <motion.div 
                      initial={{ top: '0%' }}
                      whileHover={{ top: '100%' }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                      className="absolute left-0 w-full h-[1px] bg-cyan/20 hidden group-hover:block"
                    />
                  </div>

                  {/* Member Info */}
                  <div className="relative z-10">
                    <div className="label-caps text-cyan text-[9px] mb-4 opacity-100 tracking-[3px] font-black">{member.tag}</div>
                    <h3 className="text-3xl font-black text-white mb-3 group-hover:text-cyan transition-colors">{member.name}</h3>
                    <div className="w-8 h-[2px] bg-cyan mb-6 group-hover:w-24 transition-all duration-700" />
                    <p className="text-white font-bold text-sm mb-2 drop-shadow-md">{member.role}</p>
                    <p className="text-white/60 text-xs font-light font-mono">{member.background}</p>
                  </div>
                </div>
              </div>

              {/* Founder / IITB Badge */}
              <div className="absolute -top-3 -right-3 px-4 py-2 bg-cyan text-black text-[10px] font-black tracking-widest rounded-lg shadow-[0_0_20px_rgba(0,229,255,0.4)] z-20 transition-all duration-500 group-hover:bg-white group-hover:scale-110">
                IIT BOMBAY
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
