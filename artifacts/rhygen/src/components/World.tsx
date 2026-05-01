import { Canvas, useFrame } from "@react-three/fiber";
import { PerspectiveCamera, Float, MeshDistortMaterial, Environment, ContactShadows, Stars, Sparkles, MeshWobbleMaterial } from "@react-three/drei";
import { Suspense, useRef, useMemo } from "react";
import * as THREE from "three";
import { useScroll, useTransform } from "framer-motion";

function HybridDrivetrain() {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (groupRef.current) {
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, (state.mouse.x * Math.PI) / 6, 0.1);
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, (state.mouse.y * Math.PI) / 10, 0.1);
      groupRef.current.position.y = Math.sin(time) * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
        {/* Main Chassis / Drivetrain Wireframe */}
        <mesh>
          <boxGeometry args={[4, 0.5, 2]} />
          <meshStandardMaterial color="#5B4EE8" wireframe opacity={0.3} transparent />
        </mesh>

        {/* Engine / Generator Node */}
        <mesh position={[-1.5, 0.5, 0]}>
          <boxGeometry args={[1, 0.8, 0.8]} />
          <MeshWobbleMaterial color="#00E5FF" speed={1} factor={0.2} emissive="#00E5FF" emissiveIntensity={0.5} />
        </mesh>

        {/* Battery Buffer Node */}
        <mesh position={[0, 0.5, 0]}>
          <boxGeometry args={[0.8, 0.4, 1.2]} />
          <meshStandardMaterial color="#5B4EE8" emissive="#5B4EE8" emissiveIntensity={1} />
        </mesh>

        {/* Electric Drive Node */}
        <mesh position={[1.5, 0.5, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.4, 0.4, 0.8, 32]} />
          <MeshDistortMaterial color="#00E5FF" speed={2} distort={0.2} emissive="#00E5FF" emissiveIntensity={1} />
        </mesh>

        {/* Wheels */}
        {[[-1.5, -0.25, 1], [1.5, -0.25, 1], [-1.5, -0.25, -1], [1.5, -0.25, -1]].map((pos, i) => (
          <mesh key={i} position={pos as [number, number, number]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.4, 0.4, 0.2, 32]} />
            <meshStandardMaterial color="#111" metalness={1} roughness={0} />
          </mesh>
        ))}

        {/* Energy Lines (Particles) */}
        <Sparkles count={40} scale={4} size={3} speed={0.5} color="#00E5FF" />
      </Float>
    </group>
  );
}

function Scene1() {
  return (
    <group position={[0, 0, 0]}>
      <HybridDrivetrain />
      <Stars radius={100} depth={50} count={3000} factor={4} saturation={0} fade speed={1} />
      
      {/* Reflective Ground */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -4, 0]}>
        <planeGeometry args={[100, 100]} />
        <MeshDistortMaterial
          color="#070710"
          speed={0.5}
          distort={0.01}
          radius={1}
          roughness={0.1}
          metalness={0.9}
        />
      </mesh>
      <gridHelper args={[100, 50, "#5B4EE8", "#070710"]} position={[0, -3.99, 0]} />
    </group>
  );
}

export function World() {
  return (
    <div className="fixed inset-0 w-full h-full bg-[#070710] -z-10">
      <Canvas dpr={[1, 1.5]} gl={{ antialias: true, powerPreference: "high-performance" }}>
        <Suspense fallback={null}>
          <PerspectiveCamera makeDefault position={[0, 1, 8]} fov={50} />
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1.5} color="#00E5FF" />
          <pointLight position={[-10, -10, -10]} intensity={1.5} color="#5B4EE8" />
          
          <Scene1 />
          
          <Environment preset="night" />
          <ContactShadows opacity={0.4} scale={15} blur={2} far={4.5} />
        </Suspense>
      </Canvas>
    </div>
  );
}
