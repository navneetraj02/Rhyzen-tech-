import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";

export function Contact() {
  const [interest, setInterest] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChipClick = (val: string) => {
    setInterest(val);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate network request
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 1000);
  };

  const chips = ["Fleet Pilot Enquiry", "Investment Enquiry", "OEM Partnership"];

  return (
    <section id="contact" className="py-24 bg-[#0A0A18]">
      <div className="container mx-auto px-6 max-w-[1440px]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center lg:text-left"
        >
          <span className="text-[12px] font-bold tracking-[3px] text-[#A0A8C0] mb-4 block">GET IN TOUCH</span>
          <h2 className="text-[40px] md:text-[48px] font-bold text-white leading-[1.1]">
            Partner with us. Invest in what works.
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex flex-col"
          >
            <p className="text-[18px] text-[#A0A8C0] leading-relaxed mb-10">
              We are actively seeking forward-thinking fleet operators for our upcoming pilot program, strategic OEM partners for early integration talks, and visionary deep-tech investors for our Seed round.
            </p>

            <div className="flex flex-wrap gap-3 mb-12">
              {chips.map((chip) => (
                <button
                  key={chip}
                  onClick={() => handleChipClick(chip)}
                  className={`px-5 py-2 rounded-full text-[14px] font-medium border transition-all duration-300 ${
                    interest === chip 
                      ? "bg-[#5B4EE8] text-white border-[#5B4EE8]" 
                      : "bg-transparent text-[#5B4EE8] border-[rgba(91,78,232,0.4)] hover:bg-[#5B4EE8]/10"
                  }`}
                >
                  {chip}
                </button>
              ))}
            </div>

            <div className="mt-auto">
              <p className="text-[14px] font-medium text-[#A0A8C0]">
                Pune, Maharashtra, India (operations hub)<br/>
                IIT Bombay, Mumbai (R&D)
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-[#0F1020] p-8 rounded-2xl border border-[rgba(91,78,232,0.2)]"
          >
            {isSuccess ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="h-full flex flex-col items-center justify-center min-h-[400px]"
              >
                <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mb-6">
                  <CheckCircle className="w-10 h-10 text-green-500" />
                </div>
                <h3 className="text-[20px] font-bold text-white mb-2">Thank you. We'll be in touch.</h3>
                <button 
                  onClick={() => { setIsSuccess(false); setInterest(""); }}
                  className="mt-6 text-[#A0A8C0] hover:text-white transition-colors underline text-sm"
                >
                  Send another message
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="flex flex-col gap-2">
                    <label className="text-[13px] text-[#A0A8C0] font-medium">Name</label>
                    <input 
                      required
                      type="text" 
                      className="bg-[rgba(255,255,255,0.04)] border border-[rgba(91,78,232,0.3)] rounded-lg px-4 py-3 text-white outline-none focus:border-[rgba(91,78,232,0.8)] focus:shadow-[0_0_0_3px_rgba(91,78,232,0.15)] transition-all" 
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-[13px] text-[#A0A8C0] font-medium">Email</label>
                    <input 
                      required
                      type="email" 
                      className="bg-[rgba(255,255,255,0.04)] border border-[rgba(91,78,232,0.3)] rounded-lg px-4 py-3 text-white outline-none focus:border-[rgba(91,78,232,0.8)] focus:shadow-[0_0_0_3px_rgba(91,78,232,0.15)] transition-all" 
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-[13px] text-[#A0A8C0] font-medium">Organisation</label>
                  <input 
                    required
                    type="text" 
                    className="bg-[rgba(255,255,255,0.04)] border border-[rgba(91,78,232,0.3)] rounded-lg px-4 py-3 text-white outline-none focus:border-[rgba(91,78,232,0.8)] focus:shadow-[0_0_0_3px_rgba(91,78,232,0.15)] transition-all" 
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-[13px] text-[#A0A8C0] font-medium">Interest</label>
                  <select 
                    value={interest}
                    onChange={(e) => setInterest(e.target.value)}
                    className="bg-[rgba(255,255,255,0.04)] border border-[rgba(91,78,232,0.3)] rounded-lg px-4 py-3 text-white outline-none focus:border-[rgba(91,78,232,0.8)] focus:shadow-[0_0_0_3px_rgba(91,78,232,0.15)] transition-all appearance-none cursor-pointer"
                  >
                    <option value="" disabled className="text-black">Select an option</option>
                    <option value="Fleet Pilot Enquiry" className="text-black">Fleet Pilot Enquiry</option>
                    <option value="OEM Partnership" className="text-black">OEM Partnership</option>
                    <option value="Investment Enquiry" className="text-black">Investment Enquiry</option>
                    <option value="Media / Press" className="text-black">Media / Press</option>
                    <option value="Other" className="text-black">Other</option>
                  </select>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-[13px] text-[#A0A8C0] font-medium">Message</label>
                  <textarea 
                    required
                    rows={6}
                    className="bg-[rgba(255,255,255,0.04)] border border-[rgba(91,78,232,0.3)] rounded-lg px-4 py-3 text-white outline-none focus:border-[rgba(91,78,232,0.8)] focus:shadow-[0_0_0_3px_rgba(91,78,232,0.15)] transition-all resize-none" 
                  />
                </div>

                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#5B4EE8] text-white font-[600] text-[16px] py-4 rounded-lg hover:bg-[#4A3ED1] transition-colors mt-2 flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    "Send Message →"
                  )}
                </button>
              </form>
            )}
          </motion.div>

        </div>
      </div>
    </section>
  );
}
