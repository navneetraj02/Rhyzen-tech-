import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { Float, ContactShadows } from "@react-three/drei";

export function TruckModel({ exploded = false }: { exploded?: boolean }) {
  const group = useRef<THREE.Group>(null);
  
  // Materials
  const bodyMaterial = new THREE.MeshPhysicalMaterial({
    color: "#e2e8f0",
    metalness: 0.6,
    roughness: 0.2,
    clearcoat: 0.3
  });
  
  const chassisMaterial = new THREE.MeshStandardMaterial({
    color: "#1e293b",
    metalness: 0.8,
    roughness: 0.5
  });

  const techMaterial = new THREE.MeshStandardMaterial({
    color: "#5B4EE8",
    metalness: 0.9,
    roughness: 0.1,
    emissive: "#5B4EE8",
    emissiveIntensity: 0.2
  });

  const cyanTechMaterial = new THREE.MeshStandardMaterial({
    color: "#00E5FF",
    metalness: 0.9,
    roughness: 0.1,
    emissive: "#00E5FF",
    emissiveIntensity: 0.4
  });

  const glassMaterial = new THREE.MeshPhysicalMaterial({
    color: "#000000",
    metalness: 0.9,
    roughness: 0.1,
    transmission: 0.9,
    transparent: true,
    opacity: 0.8
  });

  useFrame((state) => {
    if (group.current && !exploded) {
      // Slow rotation for normal view
      group.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.2) * 0.2;
      group.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.5) * 0.02;
    }
  });

  // Calculate target positions based on exploded state
  // We use lerp in useFrame for smooth transitions, but simplified here for direct positional changes
  
  const cabZ = exploded ? 3 : 2;
  const cargoZ = exploded ? -3 : -1;
  const engineY = exploded ? 2 : 0;
  const engineZ = exploded ? 2 : 1;
  const batteryY = exploded ? -2 : -0.5;
  const motorY = exploded ? 1 : 0;
  const motorZ = exploded ? 0 : 0;

  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
      <group ref={group} scale={0.7}>
        
        {/* Main Chassis Frame */}
        <mesh position={[0, -0.5, 0]} castShadow receiveShadow>
          <boxGeometry args={[1.5, 0.2, 7]} />
          <primitive object={chassisMaterial} attach="material" />
        </mesh>

        {/* Cabin */}
        <group position={[0, 1.2, cabZ]}>
          {/* Main Cab Box */}
          <mesh castShadow receiveShadow position={[0, 0, 0]}>
            <boxGeometry args={[2.2, 2.5, 2]} />
            <primitive object={bodyMaterial} attach="material" />
          </mesh>
          {/* Windshield */}
          <mesh position={[0, 0.5, 1.01]}>
            <planeGeometry args={[2, 1.2]} />
            <primitive object={glassMaterial} attach="material" />
          </mesh>
          {/* Grill */}
          <mesh position={[0, -0.6, 1.01]}>
            <boxGeometry args={[1.8, 0.8, 0.1]} />
            <primitive object={chassisMaterial} attach="material" />
          </mesh>
          {/* Headlights */}
          <mesh position={[-0.8, -0.6, 1.05]}>
            <boxGeometry args={[0.3, 0.2, 0.1]} />
            <meshBasicMaterial color="#ffffff" />
          </mesh>
          <mesh position={[0.8, -0.6, 1.05]}>
            <boxGeometry args={[0.3, 0.2, 0.1]} />
            <meshBasicMaterial color="#ffffff" />
          </mesh>
        </group>

        {/* Cargo Container */}
        <mesh position={[0, 1.5, cargoZ]} castShadow receiveShadow>
          <boxGeometry args={[2.4, 3, 5]} />
          <primitive object={bodyMaterial} attach="material" />
        </mesh>

        {/* Wheels */}
        {[[-1, -1, 2], [1, -1, 2], [-1, -1, -2.5], [1, -1, -2.5]].map((pos, i) => (
          <mesh key={i} position={pos as [number, number, number]} rotation={[0, 0, Math.PI / 2]} castShadow>
            <cylinderGeometry args={[0.6, 0.6, 0.4, 32]} />
            <meshStandardMaterial color="#111111" roughness={0.9} />
          </mesh>
        ))}

        {/* Powertrain Components (visible clearly in exploded view or underneath) */}
        
        {/* ICE Engine */}
        <group position={[0, engineY, engineZ]}>
          <mesh castShadow>
            <boxGeometry args={[0.8, 0.8, 1]} />
            <meshStandardMaterial color="#888888" metalness={0.8} />
          </mesh>
          {exploded && (
            <Html center position={[0, 1, 0]}>
              <div className="bg-[#0F1020]/90 border border-[#A0A8C0]/30 px-3 py-1 rounded text-white text-xs whitespace-nowrap backdrop-blur-md">
                ICE Engine
              </div>
            </Html>
          )}
        </group>

        {/* Battery Pack (Cyan) */}
        <group position={[0, batteryY, -0.5]}>
          <mesh castShadow>
            <boxGeometry args={[1.6, 0.3, 2.5]} />
            <primitive object={cyanTechMaterial} attach="material" />
          </mesh>
          {exploded && (
            <Html center position={[0, -0.5, 0]}>
              <div className="bg-[#0F1020]/90 border border-[#00E5FF]/50 px-3 py-1 rounded text-[#00E5FF] text-xs whitespace-nowrap backdrop-blur-md shadow-[0_0_10px_rgba(0,229,255,0.2)]">
                Battery Pack
              </div>
            </Html>
          )}
        </group>

        {/* Electric Motor (Violet) */}
        <group position={[0, motorY, motorZ]}>
          <mesh castShadow rotation={[0, 0, Math.PI/2]}>
            <cylinderGeometry args={[0.4, 0.4, 1.2, 32]} />
            <primitive object={techMaterial} attach="material" />
          </mesh>
          {exploded && (
            <Html center position={[0, 0.8, 0]}>
              <div className="bg-[#0F1020]/90 border border-[#5B4EE8]/50 px-3 py-1 rounded text-[#5B4EE8] text-xs whitespace-nowrap backdrop-blur-md shadow-[0_0_10px_rgba(91,78,232,0.2)]">
                Electric Motor
              </div>
            </Html>
          )}
        </group>

        {/* AI HCU Unit */}
        <group position={[0, exploded ? 3 : 0.5, 0.5]}>
          <mesh castShadow>
            <boxGeometry args={[0.5, 0.3, 0.5]} />
            <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={0.8} />
          </mesh>
          {exploded && (
            <Html center position={[0, 0.5, 0]}>
              <div className="bg-white text-black font-bold px-3 py-1 rounded text-xs whitespace-nowrap shadow-[0_0_15px_rgba(255,255,255,0.6)]">
                AI Brain (HCU)
              </div>
            </Html>
          )}
        </group>

      </group>
      <ContactShadows position={[0, -2, 0]} opacity={0.4} scale={10} blur={2} far={4} color="#000000" />
    </Float>
  );
}

// Minimal Html component fallback if we don't import from drei
import { Html } from "@react-three/drei";