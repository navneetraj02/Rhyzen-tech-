import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { Canvas } from "@react-three/fiber";
import { ParticleField } from "./ParticleField";
import { SafeCanvas } from "./SafeCanvas";

interface VoiceModeProps {
  isOpen: boolean;
  onClose: () => void;
}

const SCRIPT = "Welcome to Rhygen. We're building the future of sustainable transportation. India's trucks carry the nation's economy — but they account for fifty percent of vehicular emissions while being just four percent of vehicles on the road. Diesel costs eat forty-five to fifty percent of every fleet operator's budget, leaving profit margins of just three to five percent. Electric trucks don't work for this — the batteries are too expensive and heavy, charging takes too long, and India's power grid cannot support the load. Hydrogen is decades away from being practical. We built a smarter solution. An AI-powered hybrid powertrain that combines electric drive with a small, efficient combustion engine — cutting emissions by twenty to thirty percent, improving mileage by up to three times, and increasing fleet profits by three hundred to four hundred percent. No charging infrastructure needed. Works on existing roads, with existing fuel, from day one. We are Rhygen — reliable, efficient, revolutionary, and necessary.";

export function VoiceMode({ isOpen, onClose }: VoiceModeProps) {
  const [displayedText, setDisplayedText] = useState("Listening...");
  const [isSpeaking, setIsSpeaking] = useState(false);
  const synthRef = useRef<SpeechSynthesisUtterance | null>(null);

  useEffect(() => {
    if (isOpen) {
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        window.speechSynthesis.cancel();
        setIsSpeaking(true);
        setDisplayedText("");
        
        const utterance = new SpeechSynthesisUtterance(SCRIPT);
        synthRef.current = utterance;
        
        utterance.rate = 0.95;
        
        // Very basic word sync approximation
        const words = SCRIPT.split(" ");
        let wordIndex = 0;
        
        utterance.onboundary = (event) => {
          if (event.name === 'word') {
            const currentText = SCRIPT.substring(0, event.charIndex + event.charLength);
            setDisplayedText(currentText);
          }
        };

        utterance.onend = () => {
          setIsSpeaking(false);
          setDisplayedText(SCRIPT);
        };

        // Fallback if onboundary doesn't fire well
        const durationApprox = words.length * 400; // ~400ms per word
        let manualSync: NodeJS.Timeout;
        if (!('onboundary' in utterance)) {
           manualSync = setInterval(() => {
             if (wordIndex < words.length) {
               setDisplayedText(words.slice(0, wordIndex + 1).join(" "));
               wordIndex++;
             } else {
               clearInterval(manualSync);
             }
           }, durationApprox / words.length);
        }

        window.speechSynthesis.speak(utterance);
        
        return () => {
          window.speechSynthesis.cancel();
          if (manualSync) clearInterval(manualSync);
        };
      } else {
        // Fallback for no speech synthesis
        setIsSpeaking(true);
        let i = 0;
        const words = SCRIPT.split(" ");
        const int = setInterval(() => {
          setDisplayedText(words.slice(0, i + 1).join(" "));
          i++;
          if (i >= words.length) {
            clearInterval(int);
            setIsSpeaking(false);
          }
        }, 300);
        return () => clearInterval(int);
      }
    }
    return undefined;
  }, [isOpen]);

  const closeAndStop = () => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(7,7,16,0.97)]"
        >
          {/* Close Button */}
          <button 
            onClick={closeAndStop}
            className="absolute top-8 right-8 text-white hover:text-[#5B4EE8] transition-colors z-20"
          >
            <X size={32} />
          </button>

          {/* Background Particles */}
          <div className="absolute inset-0 z-0">
            <SafeCanvas>
              <Canvas camera={{ position: [0, 0, 5] }} gl={{ failIfMajorPerformanceCaveat: false }}>
                <ParticleField count={200} speed={0.2} radius={8} color="#ffffff" />
              </Canvas>
            </SafeCanvas>
          </div>

          <div className="relative z-10 flex flex-col items-center">
            {/* Visualizer Rings */}
            <div className="relative flex items-center justify-center mb-12">
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute w-[340px] h-[340px] rounded-full border border-[rgba(0,229,255,0.3)] border-dashed"
              />
              <motion.div 
                animate={{ rotate: -360 }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                className="absolute w-[280px] h-[280px] rounded-full border border-[rgba(0,229,255,0.3)]"
              />
              
              {/* Core Circle */}
              <div className="relative w-[220px] h-[220px] rounded-full border-2 border-[rgba(91,78,232,0.6)] bg-[radial-gradient(circle_at_center,rgba(91,78,232,0.15),transparent)] flex items-center justify-center gap-2">
                {/* Waveform Bars */}
                {[0, 1, 2, 3, 4].map((i) => (
                  <motion.div
                    key={i}
                    animate={{
                      height: isSpeaking ? [20, 80 + Math.random() * 40, 20] : 20
                    }}
                    transition={{
                      duration: isSpeaking ? 0.4 + Math.random() * 0.3 : 1.5,
                      repeat: Infinity,
                      repeatType: "reverse",
                      ease: "easeInOut",
                      delay: i * 0.1
                    }}
                    className="w-3 rounded-full bg-gradient-to-t from-[#5B4EE8] to-[#00E5FF]"
                  />
                ))}
              </div>
            </div>

            {/* Subtitles */}
            <div className="max-w-[700px] px-6 text-center h-[120px]">
              {displayedText === "Listening..." ? (
                <motion.p 
                  animate={{ opacity: [0.4, 1, 0.4] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="text-[18px] text-[#A0A8C0]"
                >
                  Listening...
                </motion.p>
              ) : (
                <p className="text-[20px] md:text-[24px] text-white leading-relaxed font-medium">
                  {displayedText}
                </p>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
