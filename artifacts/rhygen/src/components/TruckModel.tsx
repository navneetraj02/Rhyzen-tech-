import { useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { Float, ContactShadows, useGLTF, Html } from "@react-three/drei";

const TRUCK_URL = `${import.meta.env.BASE_URL}models/truck.glb`;

useGLTF.preload(TRUCK_URL);

function RealTruck({ liftY = 0 }: { liftY?: number }) {
  const { scene } = useGLTF(TRUCK_URL);

  const cloned = useMemo(() => {
    const s = scene.clone(true);
    s.traverse((obj) => {
      if ((obj as THREE.Mesh).isMesh) {
        const mesh = obj as THREE.Mesh;
        mesh.castShadow = true;
        mesh.receiveShadow = true;
        const mat = mesh.material as THREE.MeshStandardMaterial;
        if (mat && "metalness" in mat) {
          const upgraded = new THREE.MeshPhysicalMaterial({
            map: mat.map ?? null,
            normalMap: mat.normalMap ?? null,
            color: mat.color ?? new THREE.Color("#ffffff"),
            metalness: 0.45,
            roughness: 0.45,
            clearcoat: 0.4,
            clearcoatRoughness: 0.25,
            envMapIntensity: 1.1,
          });
          mesh.material = upgraded;
        }
      }
    });

    // Center and scale to match scene
    const box = new THREE.Box3().setFromObject(s);
    const size = box.getSize(new THREE.Vector3());
    const center = box.getCenter(new THREE.Vector3());
    s.position.sub(center);
    const targetSize = 5;
    const maxDim = Math.max(size.x, size.y, size.z);
    const scale = targetSize / maxDim;
    s.scale.setScalar(scale);
    // Sit on the ground
    s.position.y += (size.y * scale) / 2 - 0.6;

    return s;
  }, [scene]);

  const ref = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.position.y = THREE.MathUtils.lerp(
        ref.current.position.y,
        liftY,
        Math.min(1, delta * 4)
      );
    }
  });

  return (
    <group ref={ref}>
      <primitive object={cloned} />
    </group>
  );
}

function PowertrainPart({
  position,
  visible,
  color,
  emissive,
  size,
  label,
  shape = "box",
}: {
  position: [number, number, number];
  visible: boolean;
  color: string;
  emissive: string;
  size: [number, number, number];
  label: string;
  shape?: "box" | "cylinder";
}) {
  const ref = useRef<THREE.Group>(null);
  const targetScale = visible ? 1 : 0.001;

  useFrame((_, delta) => {
    if (ref.current) {
      const s = THREE.MathUtils.lerp(
        ref.current.scale.x,
        targetScale,
        Math.min(1, delta * 6)
      );
      ref.current.scale.setScalar(s);
    }
  });

  return (
    <group ref={ref} position={position} scale={0.001}>
      <mesh castShadow>
        {shape === "box" ? (
          <boxGeometry args={size} />
        ) : (
          <cylinderGeometry args={[size[0], size[0], size[1], 32]} />
        )}
        <meshPhysicalMaterial
          color={color}
          emissive={emissive}
          emissiveIntensity={0.5}
          metalness={0.85}
          roughness={0.2}
          clearcoat={0.5}
        />
      </mesh>
      {visible && (
        <Html center position={[0, size[1] / 2 + 0.6, 0]} distanceFactor={8}>
          <div
            className="px-3 py-1 rounded text-xs font-semibold whitespace-nowrap backdrop-blur-md border"
            style={{
              background: "rgba(15,16,32,0.85)",
              borderColor: emissive,
              color: emissive,
              boxShadow: `0 0 12px ${emissive}55`,
            }}
          >
            {label}
          </div>
        </Html>
      )}
    </group>
  );
}

export function TruckModel({ exploded = false }: { exploded?: boolean }) {
  const group = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (group.current && !exploded) {
      group.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.2) * 0.3;
    }
  });

  // When exploded, lift truck so powertrain components show beneath it
  const truckLift = exploded ? 1.8 : 0;

  return (
    <Float speed={1.2} rotationIntensity={0.15} floatIntensity={exploded ? 0 : 0.4}>
      <group ref={group} scale={0.85}>
        <RealTruck liftY={truckLift} />

        {/* Powertrain components, only visible in exploded mode */}
        <PowertrainPart
          visible={exploded}
          position={[0, -0.6, 1.0]}
          size={[1.4, 0.9, 1.2]}
          color="#888888"
          emissive="#A0A8C0"
          label="ICE Engine"
        />
        <PowertrainPart
          visible={exploded}
          position={[0, -1.2, -0.4]}
          size={[2.4, 0.4, 2.2]}
          color="#00E5FF"
          emissive="#00E5FF"
          label="Battery Pack"
        />
        <PowertrainPart
          visible={exploded}
          position={[0, -0.6, -1.6]}
          size={[0.5, 1.4, 0]}
          color="#5B4EE8"
          emissive="#5B4EE8"
          label="Electric Motor"
          shape="cylinder"
        />
        <PowertrainPart
          visible={exploded}
          position={[0, 0.4, 0]}
          size={[0.7, 0.3, 0.7]}
          color="#ffffff"
          emissive="#ffffff"
          label="AI Brain (HCU)"
        />
      </group>
      <ContactShadows
        position={[0, -2, 0]}
        opacity={0.55}
        scale={12}
        blur={2.4}
        far={4}
        color="#000000"
      />
    </Float>
  );
}
