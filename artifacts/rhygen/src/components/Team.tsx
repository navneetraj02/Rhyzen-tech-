import { motion } from "framer-motion";
import { Linkedin } from "lucide-react";

export function Team() {
  const founders = [
    {
      initials: "AA",
      name: "Aditya Anand",
      role: "Co-Founder · Electrical Systems & Business",
      degree: "DD EE, IIT Bombay '26",
      bio: "Spearheading power electronics and business strategy. Built complex electrical drivetrains for student racing teams.",
      link: "#"
    },
    {
      initials: "SD",
      name: "Sajal Deolikar",
      role: "Co-Founder · Embedded Systems & Algorithms",
      degree: "B.Tech EE, IIT Bombay '25",
      bio: "Architecting the AI Hybrid Control Unit. Deep expertise in ML, edge computing, and real-time predictive control.",
      link: "#"
    },
    {
      initials: "SK",
      name: "Sannidhya Kaushal",
      role: "Co-Founder · Mechanical Design & Vehicle Integration",
      degree: "B.Tech EE, IIT Bombay '25",
      bio: "Leading planetary gear design and mechanical integration. Expert in thermal modeling and CAD kinematics.",
      link: "#"
    },
    {
      initials: "AG",
      name: "Adi Gupta",
      role: "Team Member · Electrical Engineering",
      degree: "DD EE, IIT Bombay '28",
      bio: "Focusing on battery management systems and high-voltage safety architecture for heavy payload applications.",
      link: "#"
    }
  ];

  return (
    <section id="team" className="py-24 bg-[#070710]">
      <div className="container mx-auto px-6 max-w-[1440px]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <span className="text-[12px] font-bold tracking-[3px] text-[#A0A8C0] mb-4 block">FOUNDING TEAM</span>
          <h2 className="text-[40px] md:text-[48px] font-bold text-white mb-6">
            Four IIT Bombay engineers. One obsession.
          </h2>
          <p className="text-[18px] text-[#A0A8C0] max-w-[680px] mx-auto">
            We spent our college years building racing cars and rovers. Now we're applying that intensity to the heaviest emitters on the road.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {founders.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-[#0F1020] border border-[rgba(91,78,232,0.2)] rounded-2xl p-8 hover:-translate-y-1.5 hover:border-[rgba(91,78,232,0.7)] transition-all duration-300 flex flex-col h-full"
            >
              <div className="w-[100px] h-[100px] rounded-full bg-gradient-to-tr from-[#5B4EE8] to-[#00E5FF] mb-6 flex items-center justify-center mx-auto shadow-[0_0_20px_rgba(91,78,232,0.3)]">
                <span className="text-[32px] font-bold text-white tracking-wider">{f.initials}</span>
              </div>
              
              <h3 className="text-[20px] font-[600] text-white text-center mb-1">{f.name}</h3>
              <p className="text-[14px] font-medium gradient-text text-center mb-2">{f.role}</p>
              <p className="text-[13px] text-[#A0A8C0] text-center mb-6">{f.degree}</p>
              
              <p className="text-[13px] text-[#A0A8C0] leading-relaxed text-center flex-1 mb-6">
                {f.bio}
              </p>
              
              <div className="mt-auto flex justify-center">
                <a href={f.link} className="text-[#A0A8C0] hover:text-[#5B4EE8] transition-colors">
                  <Linkedin className="w-5 h-5" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row items-center justify-center gap-6 py-6 border-t border-white/5"
        >
          <span className="text-[14px] text-[#A0A8C0] font-medium">
            Pre-incubated at SINE, IIT Bombay · Know-How IP filed with IRCC, IIT Bombay
          </span>
          <div className="flex gap-4">
            <div className="h-10 px-4 bg-white/5 rounded flex items-center justify-center border border-white/10 text-white/50 text-xs font-bold">
              SINE Logo
            </div>
            <div className="h-10 px-4 bg-white/5 rounded flex items-center justify-center border border-white/10 text-white/50 text-xs font-bold">
              IITB Logo
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
