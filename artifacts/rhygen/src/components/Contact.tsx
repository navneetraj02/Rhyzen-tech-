import { motion } from "framer-motion";
import { Mail, Phone, MapPin, ArrowUpRight } from "lucide-react";

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
              
              <div className="flex flex-col gap-6 mt-4">
                <div className="flex items-start gap-4 group">
                  <div className="p-3 bg-white/5 rounded-xl border border-white/10 text-cyan group-hover:border-cyan/30 group-hover:bg-white/[0.03] transition-all duration-300">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block text-[10px] uppercase tracking-wider text-white/40 mb-1">Email</span>
                    <a href="mailto:rhygentech@gmail.com" className="text-white hover:text-cyan transition-colors font-medium text-lg">
                      rhygentech@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4 group">
                  <div className="p-3 bg-white/5 rounded-xl border border-white/10 text-violet group-hover:border-violet/30 group-hover:bg-white/[0.03] transition-all duration-300">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block text-[10px] uppercase tracking-wider text-white/40 mb-1">Contact Info</span>
                    <a href="tel:+917488107947" className="text-white hover:text-violet transition-colors font-medium text-lg">
                      7488107947
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4 group">
                  <div className="p-3 bg-white/5 rounded-xl border border-white/10 text-cyan group-hover:border-cyan/30 group-hover:bg-white/[0.03] transition-all duration-300">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block text-[10px] uppercase tracking-wider text-white/40 mb-1">Address</span>
                    <p className="text-white font-medium text-sm md:text-base leading-relaxed max-w-xs">
                      504 Shivansh residency kiwale Pune 412101 Maharashtra.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <form action="https://api.web3forms.com/submit" method="POST" className="flex flex-col gap-8">
              {/* Replace 'YOUR_ACCESS_KEY_HERE' with your actual key from web3forms.com */}
              <input type="hidden" name="access_key" value="YOUR_ACCESS_KEY_HERE" />
              <div className="flex flex-col gap-2">
                <label className="label-caps text-[10px] text-white/40 ml-4">Inquiry Type</label>
                <select name="inquiry_type" required className="bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-violet transition-colors appearance-none">
                  <option className="bg-[#070710]" value="Fleet Partnership">Fleet Partnership</option>
                  <option className="bg-[#070710]" value="OEM Integration">OEM Integration</option>
                  <option className="bg-[#070710]" value="Investment">Investment</option>
                  <option className="bg-[#070710]" value="Media Inquiry">Media Inquiry</option>
                </select>
              </div>

              <div className="flex flex-col gap-2">
                <label className="label-caps text-[10px] text-white/40 ml-4">Full Name</label>
                <input type="text" name="name" required className="bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-violet transition-colors" placeholder="John Doe" />
              </div>

              <div className="flex flex-col gap-2">
                <label className="label-caps text-[10px] text-white/40 ml-4">Work Email</label>
                <input type="email" name="email" required className="bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-violet transition-colors" placeholder="john@company.com" />
              </div>

              <button type="submit" className="w-full bg-white text-black font-bold uppercase tracking-[4px] py-6 rounded-2xl hover:bg-violet hover:text-white transition-all transform hover:scale-[1.02] active:scale-[0.98]">
                Submit Inquiry
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
