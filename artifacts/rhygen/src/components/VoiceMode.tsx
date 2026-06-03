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

const SCRIPT = "This is Rhygen. We aren't building a concept; we are building the bridge. India's freight economy runs on diesel—sacrificing our air quality and crippling fleet margins. Pure electric is a decades-away illusion for heavy freight. So we built an intelligent hybrid powertrain. Electric drive. AI-managed combustion. No massive batteries. No charging infrastructure. Just thirty percent fewer emissions and triple the profit margins, starting today. Welcome to the new standard.";

interface VoiceModeProps {
  isOpen: boolean;
  onClose: () => void;
}

export function VoiceMode({ isOpen, onClose }: VoiceModeProps) {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(35.9); // Pre-measured duration of the generated audio file
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Instantiate high-quality pre-rendered neural voice file
    const audio = new Audio("/rhygen_voice.mp3");
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
      setCurrentTime(audio.duration || 35.9);
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
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#070710]/98 backdrop-blur-3xl"
        >
          <button onClick={handleClose} className="absolute top-12 right-12 text-white/50 hover:text-white transition-colors z-[200] cursor-pointer pointer-events-auto">
            <X size={40} />
          </button>

          {/* Rotating orb canvas container with compressed height to prevent overlapping */}
          <div className="w-full h-[260px] md:h-[320px] relative mb-6">
            <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
              <ambientLight intensity={0.5} />
              <pointLight position={[10, 10, 10]} intensity={2} />
              <RotatingOrb isSpeaking={isSpeaking} />
              <Environment preset="night" />
            </Canvas>
            
            {/* Waveform Bars Overlay */}
            <div className="absolute inset-0 flex items-center justify-center gap-2 pointer-events-none">
              {[...Array(20)].map((_, i) => (
                <motion.div
                  key={i}
                  animate={{ 
                    height: isSpeaking ? [10, Math.random() * 60 + 20, 10] : 4,
                    opacity: isSpeaking ? [0.4, 1, 0.4] : 0.2
                  }}
                  transition={{ duration: 0.2, repeat: Infinity, delay: i * 0.05 }}
                  className="w-1 bg-cyan rounded-full"
                />
              ))}
            </div>
          </div>

          {/* Dialogue block max-width and font clamped sizes for perfect overlay and humanized presentation */}
          <div className="max-w-4xl px-6 md:px-12 text-center z-20">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-[clamp(18px,2.2vw,28px)] text-white font-medium leading-relaxed tracking-tight max-w-3xl mx-auto"
            >
              {isSpeaking || currentIndex > 0 ? (
                <>
                  <span className="text-white transition-colors duration-300 drop-shadow-[0_0_8px_rgba(255,255,255,0.4)]">
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
            
            <div className="mt-8 flex items-center justify-center gap-4 text-cyan/50 uppercase tracking-[6px] text-xs font-bold">
              <span className="w-12 h-[1px] bg-cyan/20" />
              Rhygen Intelligence Core (Ultra-Realistic Neural Audio)
              <span className="w-12 h-[1px] bg-cyan/20" />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
