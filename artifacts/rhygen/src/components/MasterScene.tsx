import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { 
  Environment, 
  Float, 
  Stars, 
  Sparkles, 
  ContactShadows, 
  MeshDistortMaterial
} from "@react-three/drei";
import { Suspense, useRef, useMemo } from "react";
import * as THREE from "three";
import { useScroll, MotionValue, useVelocity, useSpring } from "framer-motion";

// Optimized Speed Rays
function SpeedRays() {
  const { scrollYProgress } = useScroll();
  const velocity = useVelocity(scrollYProgress);
  const smoothVelocity = useSpring(velocity, { stiffness: 60, damping: 20 });
  const count = 100; // Reduced count for performance
  
  const meshRef = useRef<THREE.Points>(null);

  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 30;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 30;
      pos[i * 3 + 2] = Math.random() * -100;
      
      const c = new THREE.Color(Math.random() > 0.5 ? "#5B4EE8" : "#00E5FF");
      col[i * 3] = c.r;
      col[i * 3 + 1] = c.g;
      col[i * 3 + 2] = c.b;
    }
    return [pos, col];
  }, []);

  useFrame(() => {
    if (!meshRef.current) return;
    const v = Math.abs(smoothVelocity.get()) * 40;
    
    const positionsAttr = meshRef.current.geometry.attributes.position;
    const posArray = positionsAttr.array as Float32Array;
    for (let i = 0; i < count; i++) {
      posArray[i * 3 + 2] += (0.4 + v) * 2;
      if (posArray[i * 3 + 2] > 10) {
        posArray[i * 3 + 2] = -100;
      }
    }
    positionsAttr.needsUpdate = true;
    const mat = meshRef.current.material as THREE.PointsMaterial;
    mat.opacity = Math.min(0.6, v * 0.4);
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <primitive 
          object={new THREE.BufferAttribute(positions, 3)} 
          attach="attributes-position" 
        />
        <primitive 
          object={new THREE.BufferAttribute(colors, 3)} 
          attach="attributes-color" 
        />
      </bufferGeometry>
      <pointsMaterial 
        size={0.12} 
        vertexColors 
        transparent 
        blending={THREE.AdditiveBlending} 
        sizeAttenuation 
        depthWrite={false}
      />
    </points>
  );
}

// Abstract Hybrid Core
function HybridCore({ scrollProgress }: { scrollProgress: MotionValue<number> }) {
  const meshRef = useRef<THREE.Group>(null);
  
  useFrame(() => {
    if (meshRef.current) {
      const v = scrollProgress.get();
      let s = 0;
      if (v < 0.05) s = 1 + (v / 0.05) * 0.2;
      else if (v < 0.1) s = 1.2 * (1 - (v - 0.05) / 0.05);
      
      meshRef.current.scale.setScalar(s);
      meshRef.current.position.y = v < 0.05 ? (v / 0.05) * 2 : 2;
      meshRef.current.rotation.z += 0.005;
      meshRef.current.rotation.y += 0.002;
      meshRef.current.visible = s > 0.01;
    }
  });

  return (
    <group ref={meshRef}>
      <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
        <mesh>
          <icosahedronGeometry args={[1, 15]} />
          <MeshDistortMaterial 
            color="#5B4EE8" 
            speed={2} 
            distort={0.3} 
            emissive="#5B4EE8" 
            emissiveIntensity={0.5} 
            metalness={0.9}
            roughness={0.1}
          />
        </mesh>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[1.5, 0.01, 16, 100]} />
          <meshStandardMaterial color="#00E5FF" emissive="#00E5FF" emissiveIntensity={2} />
        </mesh>
      </Float>
    </group>
  );
}

// Problem World
function ProblemWorld({ scrollProgress }: { scrollProgress: MotionValue<number> }) {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame(() => {
    if (groupRef.current) {
      const v = scrollProgress.get();
      groupRef.current.visible = v > 0.05 && v < 0.3;
      const t = Math.max(0, Math.min(1, (v - 0.1) / 0.2));
      groupRef.current.position.z = 20 - t * 30;
    }
  });

  return (
    <group ref={groupRef}>
      <Sparkles count={50} scale={10} size={1.5} speed={0.3} color="#00E5FF" opacity={0.3} />
      {[...Array(10)].map((_, i) => (
        <mesh key={i} position={[Math.random() * 20 - 10, Math.random() * 10 - 5, -20]}>
          <boxGeometry args={[0.01, 0.01, 40]} />
          <meshStandardMaterial color="#5B4EE8" emissive="#5B4EE8" emissiveIntensity={2} opacity={0.05} transparent />
        </mesh>
      ))}
    </group>
  );
}

function CameraController({ scrollProgress }: { scrollProgress: MotionValue<number> }) {
  const { camera } = useThree();
  const velocity = useVelocity(scrollProgress);
  const smoothVelocity = useSpring(velocity, { stiffness: 60, damping: 20 });
  
  useFrame(() => {
    const v = scrollProgress.get();
    const vel = smoothVelocity.get();
    
    const pointsZ = [8, 15, 12, 10, 15, 20, 10];
    const stops = [0, 0.1, 0.2, 0.4, 0.6, 0.8, 1];
    
    let cz = 8;
    for (let i = 0; i < stops.length - 1; i++) {
      if (v >= stops[i] && v <= stops[i+1]) {
        const t = (v - stops[i]) / (stops[i+1] - stops[i]);
        cz = pointsZ[i] + t * (pointsZ[i+1] - pointsZ[i]);
        break;
      }
    }
    
    if ('fov' in camera) {
      (camera as THREE.PerspectiveCamera).fov = 45 + Math.abs(vel) * 60; // Reduced warp FOV
      (camera as THREE.PerspectiveCamera).updateProjectionMatrix();
    }

    camera.position.z = cz;
    camera.position.y = v * 5;
    camera.lookAt(0, 0, 0);
  });

  return null;
}

export function MasterScene() {
  const { scrollYProgress } = useScroll();

  return (
    <div className="canvas-layer">
      <Canvas dpr={[1, 1.5]} gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}>
        <Suspense fallback={null}>
          <CameraController scrollProgress={scrollYProgress} />
          
          <ambientLight intensity={0.2} />
          <pointLight position={[10, 10, 10]} intensity={3} color="#00E5FF" />
          <pointLight position={[-10, -10, -10]} intensity={3} color="#5B4EE8" />
          
          <HybridCore scrollProgress={scrollYProgress} />
          <ProblemWorld scrollProgress={scrollYProgress} />
          <SpeedRays />
          
          <Stars radius={80} depth={40} count={2000} factor={4} saturation={0} fade speed={1} />
          <Environment preset="night" />
          <ContactShadows opacity={0.3} scale={20} blur={2.5} far={4} />
        </Suspense>
      </Canvas>
    </div>
  );
}
