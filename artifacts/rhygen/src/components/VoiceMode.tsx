import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Sphere, MeshDistortMaterial, Float, Environment } from "@react-three/drei";
import * as THREE from "three";

function RotatingOrb({ isSpeaking }: { isSpeaking: boolean }) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.01;
      meshRef.current.rotation.z += 0.005;
    }
  });

  return (
    <Float speed={5} rotationIntensity={2} floatIntensity={2}>
      <Sphere args={[1.2, 64, 64]} ref={meshRef}>
        <MeshDistortMaterial
          color={isSpeaking ? "#00E5FF" : "#5B4EE8"}
          speed={isSpeaking ? 5 : 2}
          distort={isSpeaking ? 0.4 : 0.2}
          radius={1}
          emissive={isSpeaking ? "#00E5FF" : "#5B4EE8"}
          emissiveIntensity={isSpeaking ? 2 : 1}
          metalness={0.9}
          roughness={0.1}
        />
      </Sphere>
      
      {/* Outer Pulse Rings */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.8, 0.01, 16, 100]} />
        <meshBasicMaterial color="#00E5FF" transparent opacity={0.3} />
      </mesh>
      <mesh rotation={[0, Math.PI / 2, 0]}>
        <torusGeometry args={[2.2, 0.005, 16, 100]} />
        <meshBasicMaterial color="#5B4EE8" transparent opacity={0.2} />
      </mesh>
    </Float>
  );
}

const SCRIPT = "This is Rhygen. We aren't building a concept; we are building the bridge. Today, commercial trucks contribute fifty percent of all road transport carbon emissions in India. Long-haul logistics runs on diesel, consuming forty-five percent of fleet budgets and leaving operators with thin five-percent profit margins. Pure electric is a decades-away illusion. Rhygen solves this today. Rather than replacing engines, we retrofit existing diesel trucks, making them smart, clean power sources. Our hybrid architecture combines this with a modular, thirty-two kilowatt-hour thermally safe battery, a permanent-magnet electric motor, and our AI Hybrid Control Unit brain. We require zero charging infrastructure, capture up to seventy percent of stopping energy through regenerative braking, and keep payload impact under four percent. The motor bolts directly to the transmission, providing sixty kilowatts of continuous power and two hundred and twenty Newton-meters of instant torque. On the road, this delivers a twenty-eight percent carbon dioxide reduction per kilometer, saves up to twenty percent fuel on highways through cylinder deactivation, and achieves up to a fifty percent overall emission reduction. This triples fleet profits. Backed by IIT Bombay's SINE incubator, gradCapital, Emergent Ventures, Lightspeed, and ARAI, Rhygen is the new standard.";

interface VoiceModeProps {
  isOpen: boolean;
  onClose: () => void;
}

export function VoiceMode({ isOpen, onClose }: VoiceModeProps) {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(83.424); // Pre-measured duration of the generated audio file
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Instantiate high-quality pre-rendered neural voice file
    const audio = new Audio("/rhygen_voice.mp3?v=3");
    audioRef.current = audio;

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };

    const handleDurationChange = () => {
      if (audio.duration) {
        setDuration(audio.duration);
      }
    };

    const handleEnded = () => {
      setIsSpeaking(false);
      setCurrentTime(audio.duration || 83.424);
    };

    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("durationchange", handleDurationChange);
    audio.addEventListener("ended", handleEnded);

    if (isOpen) {
      setIsSpeaking(true);
      setCurrentTime(0);
      audio.play().catch(err => {
        console.warn("Audio autoplay blocked by browser, waiting for interaction", err);
      });
    }

    return () => {
      audio.pause();
      audio.currentTime = 0;
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("durationchange", handleDurationChange);
      audio.removeEventListener("ended", handleEnded);
      audioRef.current = null;
    };
  }, [isOpen]);

  // Map audio timeline progress to character highlight boundaries in SCRIPT
  let progress = 0;
  if (currentTime > 0.5 && duration > 0.5) {
    progress = Math.min(1, (currentTime - 0.5) / (duration - 1.0));
  }
  const currentIndex = Math.floor(progress * SCRIPT.length);

  const handleClose = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    setIsSpeaking(false);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#070710]/98 backdrop-blur-3xl p-6"
        >
          <button onClick={handleClose} className="absolute top-6 right-6 md:top-12 md:right-12 text-white/50 hover:text-white transition-colors z-[200] cursor-pointer pointer-events-auto">
            <X size={36} />
          </button>

          {/* Rotating orb canvas container with compressed size and adjusted camera to prevent clipping */}
          <div className="w-[180px] h-[180px] md:w-[220px] md:h-[220px] relative mb-6 shrink-0">
            <Canvas camera={{ position: [0, 0, 6.5], fov: 45 }}>
              <ambientLight intensity={0.5} />
              <pointLight position={[10, 10, 10]} intensity={2} />
              <RotatingOrb isSpeaking={isSpeaking} />
              <Environment preset="night" />
            </Canvas>
            
            {/* Waveform Bars Overlay */}
            <div className="absolute inset-0 flex items-center justify-center gap-2 pointer-events-none">
              {[...Array(12)].map((_, i) => (
                <motion.div
                  key={i}
                  animate={{ 
                    height: isSpeaking ? [8, Math.random() * 40 + 15, 8] : 3,
                    opacity: isSpeaking ? [0.4, 1, 0.4] : 0.2
                  }}
                  transition={{ duration: 0.2, repeat: Infinity, delay: i * 0.05 }}
                  className="w-1 bg-cyan rounded-full"
                />
              ))}
            </div>
          </div>

          {/* Dialogue block max-width and font clamped sizes for perfect overlay and humanized presentation */}
          <div className="max-w-4xl px-6 md:px-12 text-center z-20 max-h-[45vh] overflow-y-auto">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-[clamp(14px,1.6vw,19px)] text-white/95 font-light leading-relaxed tracking-normal max-w-3xl mx-auto"
            >
              {isSpeaking || currentIndex > 0 ? (
                <>
                  <span className="text-white transition-colors duration-300 drop-shadow-[0_0_8px_rgba(255,255,255,0.4)] font-medium">
                    {SCRIPT.substring(0, currentIndex)}
                  </span>
                  <span className="text-white/20 transition-colors duration-300">
                    {SCRIPT.substring(currentIndex)}
                  </span>
                </>
              ) : (
                <span className="text-white/20">{SCRIPT}</span>
              )}
            </motion.div>
          </div>

          <div className="mt-8 flex items-center justify-center gap-4 text-cyan/50 uppercase tracking-[6px] text-xs font-bold shrink-0">
            <span className="w-12 h-[1px] bg-cyan/20" />
            Rhygen Intelligence Core (Ultra-Realistic Neural Audio)
            <span className="w-12 h-[1px] bg-cyan/20" />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
