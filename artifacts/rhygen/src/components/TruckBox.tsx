import { Canvas } from "@react-three/fiber";
import { Environment, Float, ContactShadows, PresentationControls } from "@react-three/drei";
import { Suspense } from "react";
import { TruckModel } from "./TruckModel";

export function TruckBox() {
  return (
    <div className="w-full h-full min-h-[400px] relative rounded-[40px] overflow-hidden glass-ui border-white/10 group">
      <div className="absolute inset-0 bg-gradient-to-br from-violet/10 via-transparent to-cyan/10" />
      
      <Canvas dpr={[1, 2]} camera={{ position: [5, 2, 5], fov: 45 }}>
        <Suspense fallback={null}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1} color="#00E5FF" />
          
          <PresentationControls 
            global 
            zoom={0.8} 
            snap
            rotation={[0, -Math.PI / 4, 0]} 
            polar={[-Math.PI / 4, Math.PI / 4]} 
            azimuth={[-Math.PI / 2, Math.PI / 2]}
          >
            <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
              <group scale={0.6}>
                <TruckModel interactive />
              </group>
            </Float>
          </PresentationControls>
          
          <ContactShadows position={[0, -1.5, 0]} opacity={0.4} scale={10} blur={2} far={4} />
          <Environment preset="city" />
        </Suspense>
      </Canvas>

      {/* Interactive Hint */}
      <div className="absolute bottom-6 right-6 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <div className="w-2 h-2 rounded-full bg-cyan animate-pulse" />
        <span className="text-[10px] text-white/40 uppercase tracking-[2px]">Drag to Inspect</span>
      </div>
    </div>
  );
}
