import { Linkedin, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="h-[80px] bg-[#070710] border-t border-transparent relative flex items-center">
      {/* Top Gradient Line */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#5B4EE8] to-transparent opacity-50" />
      
      <div className="container mx-auto px-6 max-w-[1440px] flex flex-col md:flex-row items-center justify-between gap-4 md:gap-0">
        
        <div className="text-[13px] text-[#A0A8C0] font-medium">
          © 2026 Rhygen. Pre-incubated at SINE, IIT Bombay.
        </div>

        <div className="text-[20px] font-[700] text-[#5B4EE8]">
          R
        </div>

        <div className="flex items-center gap-4">
          <a href="#" className="text-[#A0A8C0] hover:text-[#5B4EE8] transition-colors">
            <Linkedin className="w-5 h-5" />
          </a>
          <a href="mailto:hello@rhygen.com" className="text-[#A0A8C0] hover:text-[#5B4EE8] transition-colors">
            <Mail className="w-5 h-5" />
          </a>
        </div>

      </div>
    </footer>
  );
}
