import { motion } from "framer-motion";
import { Mail, ArrowUpRight } from "lucide-react";

export function Contact() {
  return (
    <section id="contact" className="py-20 flex flex-col items-center justify-center">
      <div className="max-w-[1440px] w-full px-6 flex flex-col items-center">
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="label-caps text-violet mb-12"
        >
          Join the mission
        </motion.div>
        
        <div className="glass-ui w-full max-w-[1000px] p-12 md:p-24 rounded-[60px] relative overflow-hidden group">
          {/* Background effects */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-violet/10 blur-[100px] group-hover:bg-violet/20 transition-all duration-700" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan/10 blur-[100px] group-hover:bg-cyan/20 transition-all duration-700" />

          <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
            <div className="flex flex-col gap-12">
              <h2 className="text-[clamp(40px,5vw,72px)] font-bold text-white leading-[0.9]">
                SCALE <br/> <span className="text-violet">TOGETHER.</span>
              </h2>
              <p className="text-xl text-[#A0A8C0] font-light leading-relaxed">
                Rhygen is actively engaging with fleet operators, CV manufacturers, and strategic partners to redefine freight economics.
              </p>
              
              <div className="flex flex-col gap-6">
                <a href="mailto:partners@rhygen.com" className="flex items-center gap-4 text-white text-2xl font-bold group/link">
                  partners@rhygen.com
                  <ArrowUpRight className="group-hover/link:translate-x-1 group-hover/link:-translate-y-1 transition-transform text-violet" />
                </a>
              </div>
            </div>

            <form className="flex flex-col gap-8">
              <div className="flex flex-col gap-2">
                <label className="label-caps text-[10px] text-white/40 ml-4">Inquiry Type</label>
                <select className="bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-violet transition-colors appearance-none">
                  <option className="bg-[#070710]">Fleet Partnership</option>
                  <option className="bg-[#070710]">OEM Integration</option>
                  <option className="bg-[#070710]">Investment</option>
                  <option className="bg-[#070710]">Media Inquiry</option>
                </select>
              </div>

              <div className="flex flex-col gap-2">
                <label className="label-caps text-[10px] text-white/40 ml-4">Full Name</label>
                <input type="text" className="bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-violet transition-colors" placeholder="John Doe" />
              </div>

              <div className="flex flex-col gap-2">
                <label className="label-caps text-[10px] text-white/40 ml-4">Work Email</label>
                <input type="email" className="bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-violet transition-colors" placeholder="john@company.com" />
              </div>

              <button className="w-full bg-white text-black font-bold uppercase tracking-[4px] py-6 rounded-2xl hover:bg-violet hover:text-white transition-all transform hover:scale-[1.02] active:scale-[0.98]">
                Submit Inquiry
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
