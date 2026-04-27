import { useMemo, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { Float, ContactShadows, Html } from "@react-three/drei";

// ───────────────────────── Procedural Wear Textures ─────────────────────────
function makeWearTexture(
  size = 512,
  scratchCount = 220,
  dirtCount = 60,
  scratchAlpha = 0.35
) {
  if (typeof document === "undefined") return null;
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = size;
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;

  // Base = white (full reflectivity / clean)
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, size, size);

  // Subtle noise pass
  const img = ctx.getImageData(0, 0, size, size);
  for (let i = 0; i < img.data.length; i += 4) {
    const n = (Math.random() - 0.5) * 18;
    img.data[i] = Math.max(0, Math.min(255, img.data[i] + n));
    img.data[i + 1] = Math.max(0, Math.min(255, img.data[i + 1] + n));
    img.data[i + 2] = Math.max(0, Math.min(255, img.data[i + 2] + n));
  }
  ctx.putImageData(img, 0, 0);

  // Fine scratches
  for (let i = 0; i < scratchCount; i++) {
    ctx.strokeStyle = `rgba(60,60,60,${Math.random() * scratchAlpha})`;
    ctx.lineWidth = Math.random() * 1.2 + 0.2;
    ctx.beginPath();
    const x = Math.random() * size;
    const y = Math.random() * size;
    const len = Math.random() * 60 + 4;
    const a = Math.random() * Math.PI * 2;
    ctx.moveTo(x, y);
    ctx.lineTo(x + Math.cos(a) * len, y + Math.sin(a) * len);
    ctx.stroke();
  }

  // Dirt blotches
  for (let i = 0; i < dirtCount; i++) {
    const x = Math.random() * size;
    const y = Math.random() * size;
    const r = Math.random() * 50 + 12;
    const grad = ctx.createRadialGradient(x, y, 0, x, y, r);
    grad.addColorStop(0, `rgba(70,55,40,${Math.random() * 0.45 + 0.1})`);
    grad.addColorStop(1, "rgba(70,55,40,0)");
    ctx.fillStyle = grad;
    ctx.fillRect(x - r, y - r, r * 2, r * 2);
  }

  const tex = new THREE.CanvasTexture(canvas);
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 8;
  return tex;
}

function makeRoughnessMap(size = 512) {
  if (typeof document === "undefined") return null;
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = size;
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;

  // Base = mid-roughness
  ctx.fillStyle = "#888";
  ctx.fillRect(0, 0, size, size);

  // Add noise
  const img = ctx.getImageData(0, 0, size, size);
  for (let i = 0; i < img.data.length; i += 4) {
    const n = (Math.random() - 0.5) * 80;
    const v = Math.max(0, Math.min(255, img.data[i] + n));
    img.data[i] = v;
    img.data[i + 1] = v;
    img.data[i + 2] = v;
  }
  ctx.putImageData(img, 0, 0);

  // Add bright streaks (rougher zones = scuffs)
  for (let i = 0; i < 180; i++) {
    ctx.strokeStyle = `rgba(255,255,255,${Math.random() * 0.5})`;
    ctx.lineWidth = Math.random() * 2 + 0.3;
    ctx.beginPath();
    const x = Math.random() * size;
    const y = Math.random() * size;
    const len = Math.random() * 80 + 8;
    const a = Math.random() * Math.PI * 2;
    ctx.moveTo(x, y);
    ctx.lineTo(x + Math.cos(a) * len, y + Math.sin(a) * len);
    ctx.stroke();
  }

  const tex = new THREE.CanvasTexture(canvas);
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  tex.anisotropy = 8;
  return tex;
}

// ───────────────────────── Materials ─────────────────────────
function useMaterials() {
  return useMemo(() => {
    const wearMap = makeWearTexture(512, 240, 70, 0.4);
    const wearMapHeavy = makeWearTexture(512, 360, 110, 0.55);
    const roughMap = makeRoughnessMap(512);

    const cabPaint = new THREE.MeshPhysicalMaterial({
      color: "#e8ecf4",
      map: wearMap ?? undefined,
      roughnessMap: roughMap ?? undefined,
      metalness: 0.55,
      roughness: 0.42,
      clearcoat: 0.95,
      clearcoatRoughness: 0.18,
      envMapIntensity: 1.3,
    });
    const accentPaint = new THREE.MeshPhysicalMaterial({
      color: "#5B4EE8",
      map: wearMap ?? undefined,
      metalness: 0.5,
      roughness: 0.35,
      clearcoat: 0.9,
    });
    const chrome = new THREE.MeshPhysicalMaterial({
      color: "#f5f5f5",
      metalness: 1.0,
      roughness: 0.08,
      clearcoat: 1.0,
    });
    const darkChassis = new THREE.MeshPhysicalMaterial({
      color: "#15181f",
      map: wearMapHeavy ?? undefined,
      roughnessMap: roughMap ?? undefined,
      metalness: 0.85,
      roughness: 0.65,
    });
    const matteBlack = new THREE.MeshStandardMaterial({
      color: "#0b0b0d",
      map: wearMapHeavy ?? undefined,
      metalness: 0.2,
      roughness: 0.95,
    });
    const tire = new THREE.MeshStandardMaterial({
      color: "#0a0a0c",
      map: wearMapHeavy ?? undefined,
      roughness: 0.95,
      metalness: 0.0,
    });
    const tireWall = new THREE.MeshStandardMaterial({
      color: "#1a1a1d",
      map: wearMapHeavy ?? undefined,
      roughness: 0.92,
    });
    const glass = new THREE.MeshPhysicalMaterial({
      color: "#0a0e1a",
      metalness: 0.0,
      roughness: 0.05,
      transmission: 0.85,
      thickness: 0.3,
      transparent: true,
      opacity: 0.6,
      ior: 1.5,
    });
    const headlight = new THREE.MeshPhysicalMaterial({
      color: "#ffffff",
      emissive: "#ffffe0",
      emissiveIntensity: 1.5,
      metalness: 0.0,
      roughness: 0.05,
      clearcoat: 1.0,
    });
    const taillight = new THREE.MeshStandardMaterial({
      color: "#ff3030",
      emissive: "#ff2020",
      emissiveIntensity: 0.9,
    });
    const fuelTank = new THREE.MeshPhysicalMaterial({
      color: "#c8ccd4",
      map: wearMap ?? undefined,
      metalness: 0.95,
      roughness: 0.22,
      clearcoat: 0.6,
    });
    const aluminum = new THREE.MeshPhysicalMaterial({
      color: "#9aa0a8",
      map: wearMap ?? undefined,
      metalness: 0.9,
      roughness: 0.4,
    });
    const cyanGlow = new THREE.MeshStandardMaterial({
      color: "#00E5FF",
      emissive: "#00E5FF",
      emissiveIntensity: 0.6,
      metalness: 0.6,
      roughness: 0.25,
    });
    const violetGlow = new THREE.MeshStandardMaterial({
      color: "#5B4EE8",
      emissive: "#5B4EE8",
      emissiveIntensity: 0.5,
      metalness: 0.6,
      roughness: 0.3,
    });
    const orangeCable = new THREE.MeshStandardMaterial({
      color: "#ff7a1a",
      roughness: 0.7,
    });
    const copper = new THREE.MeshPhysicalMaterial({
      color: "#b87333",
      metalness: 0.95,
      roughness: 0.35,
    });
    const pcb = new THREE.MeshStandardMaterial({
      color: "#0a3a1f",
      roughness: 0.7,
      metalness: 0.0,
    });
    const led = new THREE.MeshStandardMaterial({
      color: "#ffffff",
      emissive: "#00E5FF",
      emissiveIntensity: 2.0,
    });
    return {
      cabPaint,
      accentPaint,
      chrome,
      darkChassis,
      matteBlack,
      tire,
      tireWall,
      glass,
      headlight,
      taillight,
      fuelTank,
      aluminum,
      cyanGlow,
      violetGlow,
      orangeCable,
      copper,
      pcb,
      led,
    };
  }, []);
}

type Mats = ReturnType<typeof useMaterials>;

// ───────────────────────── Wheel ─────────────────────────
function Wheel({
  position,
  mats,
  dual = false,
}: {
  position: [number, number, number];
  mats: Mats;
  dual?: boolean;
}) {
  const tireR = 0.55;
  const tireW = 0.32;

  const Single = ({ x }: { x: number }) => (
    <group position={[x, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
      <mesh castShadow material={mats.tire}>
        <torusGeometry args={[tireR, tireW * 0.55, 16, 40]} />
      </mesh>
      <mesh castShadow material={mats.tireWall}>
        <cylinderGeometry args={[tireR, tireR, tireW, 40]} />
      </mesh>
      <mesh castShadow material={mats.aluminum}>
        <cylinderGeometry args={[0.32, 0.32, tireW + 0.02, 32]} />
      </mesh>
      {[...Array(8)].map((_, i) => {
        const a = (i / 8) * Math.PI * 2;
        return (
          <mesh
            key={i}
            position={[
              Math.cos(a) * 0.22,
              0,
              Math.sin(a) * 0.22,
            ]}
            material={mats.chrome}
          >
            <cylinderGeometry args={[0.035, 0.035, tireW + 0.04, 12]} />
          </mesh>
        );
      })}
      <mesh material={mats.chrome}>
        <cylinderGeometry args={[0.1, 0.1, tireW + 0.04, 24]} />
      </mesh>
    </group>
  );

  return (
    <group position={position}>
      <Single x={0} />
      {dual && <Single x={tireW + 0.05} />}
      {dual && <Single x={-tireW - 0.05} />}
    </group>
  );
}

// ───────────────────────── Hotspot ─────────────────────────
export type PartId = "engine" | "battery" | "motor" | "hcu";

function Hotspot({
  position,
  color,
  label,
  partId,
  onClick,
}: {
  position: [number, number, number];
  color: string;
  label: string;
  partId: PartId;
  onClick?: (id: PartId) => void;
}) {
  const [hovered, setHovered] = useState(false);
  const ringRef = useRef<THREE.Mesh>(null);
  const dotRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (ringRef.current) {
      const s = 1 + (Math.sin(t * 3) + 1) * 0.3;
      ringRef.current.scale.setScalar(hovered ? 1.7 : s);
      const m = ringRef.current.material as THREE.MeshBasicMaterial;
      m.opacity = hovered ? 0.9 : 0.55 - (Math.sin(t * 3) + 1) * 0.18;
    }
    if (dotRef.current) {
      dotRef.current.scale.setScalar(hovered ? 1.4 : 1);
    }
  });

  return (
    <group position={position}>
      {/* Pulsing outer ring */}
      <mesh ref={ringRef}>
        <ringGeometry args={[0.11, 0.16, 32]} />
        <meshBasicMaterial
          color={color}
          transparent
          opacity={0.55}
          side={THREE.DoubleSide}
          depthWrite={false}
        />
      </mesh>
      {/* Solid dot (clickable) */}
      <mesh
        ref={dotRef}
        onPointerOver={(e) => {
          e.stopPropagation();
          setHovered(true);
          if (typeof document !== "undefined")
            document.body.style.cursor = "pointer";
        }}
        onPointerOut={() => {
          setHovered(false);
          if (typeof document !== "undefined")
            document.body.style.cursor = "auto";
        }}
        onClick={(e) => {
          e.stopPropagation();
          onClick?.(partId);
        }}
      >
        <sphereGeometry args={[0.09, 16, 16]} />
        <meshBasicMaterial color={color} />
      </mesh>
      {/* Inner glow */}
      <mesh>
        <sphereGeometry args={[0.05, 16, 16]} />
        <meshBasicMaterial color="#ffffff" />
      </mesh>
      {hovered && (
        <Html center distanceFactor={9} position={[0, 0.35, 0]}>
          <div
            className="px-3 py-1.5 rounded-md text-[11px] font-bold whitespace-nowrap backdrop-blur-md border pointer-events-none"
            style={{
              background: "rgba(15,16,32,0.92)",
              borderColor: color,
              color,
              boxShadow: `0 0 14px ${color}88`,
            }}
          >
            {label} · click to learn
          </div>
        </Html>
      )}
    </group>
  );
}

// ───────────────────────── Heavy Truck ─────────────────────────
function HeavyTruck({
  mats,
  interactive,
  onPartClick,
}: {
  mats: Mats;
  interactive?: boolean;
  onPartClick?: (id: PartId) => void;
}) {
  return (
    <group>
      {/* CHASSIS */}
      <mesh position={[0.7, -0.55, 0]} material={mats.darkChassis} castShadow>
        <boxGeometry args={[0.18, 0.24, 5.6]} />
      </mesh>
      <mesh position={[-0.7, -0.55, 0]} material={mats.darkChassis} castShadow>
        <boxGeometry args={[0.18, 0.24, 5.6]} />
      </mesh>
      {[-2.4, -1.2, 0, 1.2, 2.4].map((z) => (
        <mesh key={z} position={[0, -0.55, z]} material={mats.darkChassis}>
          <boxGeometry args={[1.5, 0.1, 0.15]} />
        </mesh>
      ))}

      {/* HOOD */}
      <group position={[0, 0.05, 2.05]}>
        <mesh material={mats.cabPaint} castShadow>
          <boxGeometry args={[1.85, 0.7, 1.4]} />
        </mesh>
        <mesh
          position={[0, -0.05, 0.72]}
          rotation={[-0.2, 0, 0]}
          material={mats.cabPaint}
          castShadow
        >
          <boxGeometry args={[1.85, 0.45, 0.4]} />
        </mesh>
        <mesh position={[0, 0.36, 0]} material={mats.chrome}>
          <boxGeometry args={[0.1, 0.04, 1.4]} />
        </mesh>
      </group>

      {/* GRILLE */}
      <group position={[0, -0.15, 2.78]}>
        <mesh material={mats.chrome} castShadow>
          <boxGeometry args={[1.7, 0.85, 0.08]} />
        </mesh>
        {[...Array(11)].map((_, i) => (
          <mesh
            key={i}
            position={[-0.75 + i * 0.15, 0, 0.06]}
            material={mats.darkChassis}
          >
            <boxGeometry args={[0.06, 0.78, 0.04]} />
          </mesh>
        ))}
        <mesh position={[0, 0.5, 0.07]} material={mats.accentPaint}>
          <boxGeometry args={[0.55, 0.15, 0.04]} />
        </mesh>
      </group>

      {/* BUMPER */}
      <mesh position={[0, -0.55, 2.95]} material={mats.darkChassis} castShadow>
        <boxGeometry args={[2.1, 0.35, 0.18]} />
      </mesh>
      <mesh position={[0, -0.55, 2.95]} material={mats.chrome}>
        <boxGeometry args={[2.12, 0.08, 0.2]} />
      </mesh>

      {/* HEADLIGHTS */}
      {[-0.7, 0.7].map((x) => (
        <group key={x} position={[x, -0.05, 2.82]}>
          <mesh material={mats.chrome}>
            <cylinderGeometry args={[0.18, 0.18, 0.08, 24]} />
          </mesh>
          <mesh position={[0, 0, 0.05]} material={mats.headlight}>
            <cylinderGeometry args={[0.14, 0.14, 0.05, 24]} />
          </mesh>
        </group>
      ))}

      {/* FRONT FENDERS */}
      {[-1.0, 1.0].map((x) => (
        <mesh key={x} position={[x, -0.2, 2.05]} material={mats.cabPaint}>
          <boxGeometry args={[0.18, 0.7, 1.4]} />
        </mesh>
      ))}

      {/* CABIN */}
      <group position={[0, 0.55, 1.05]}>
        <mesh material={mats.cabPaint} castShadow>
          <boxGeometry args={[2.1, 1.6, 1.5]} />
        </mesh>
        <mesh position={[0, 0.85, 0]} material={mats.cabPaint} castShadow>
          <boxGeometry args={[2.0, 0.15, 1.45]} />
        </mesh>
        <mesh position={[0, 0.4, 0.76]} rotation={[-0.18, 0, 0]} material={mats.glass}>
          <planeGeometry args={[1.85, 0.95]} />
        </mesh>
        <mesh position={[1.06, 0.35, 0]} rotation={[0, Math.PI / 2, 0]} material={mats.glass}>
          <planeGeometry args={[1.2, 0.7]} />
        </mesh>
        <mesh position={[-1.06, 0.35, 0]} rotation={[0, -Math.PI / 2, 0]} material={mats.glass}>
          <planeGeometry args={[1.2, 0.7]} />
        </mesh>
        {[-1.045, 1.045].map((x) => (
          <mesh key={x} position={[x, -0.15, 0]} material={mats.darkChassis}>
            <boxGeometry args={[0.005, 1.3, 0.01]} />
          </mesh>
        ))}
        {[-1.06, 1.06].map((x) => (
          <mesh key={x} position={[x, -0.1, -0.4]} material={mats.chrome}>
            <boxGeometry args={[0.02, 0.06, 0.18]} />
          </mesh>
        ))}
        {[-1.16, 1.16].map((x) => (
          <group key={x} position={[x, 0.45, 0.6]}>
            <mesh material={mats.chrome}>
              <cylinderGeometry args={[0.02, 0.02, 0.4, 8]} />
            </mesh>
            <mesh position={[Math.sign(x) * 0.16, 0.1, 0]} material={mats.cabPaint}>
              <boxGeometry args={[0.08, 0.36, 0.18]} />
            </mesh>
          </group>
        ))}
        {[-1.07, 1.07].map((x) => (
          <mesh key={x} position={[x, -1.0, -0.2]} material={mats.darkChassis}>
            <boxGeometry args={[0.12, 0.05, 0.45]} />
          </mesh>
        ))}
      </group>

      {/* SLEEPER */}
      <group position={[0, 0.7, 0.0]}>
        <mesh material={mats.cabPaint} castShadow>
          <boxGeometry args={[2.1, 1.85, 0.6]} />
        </mesh>
        <mesh position={[0, 0.35, -0.31]} material={mats.glass}>
          <planeGeometry args={[1.4, 0.4]} />
        </mesh>
      </group>

      {/* EXHAUST STACK */}
      <group position={[1.05, 0.95, -0.45]}>
        <mesh material={mats.chrome} castShadow>
          <cylinderGeometry args={[0.085, 0.085, 2.4, 20]} />
        </mesh>
        <mesh position={[0, 0, 0.08]} material={mats.darkChassis}>
          <boxGeometry args={[0.05, 1.6, 0.05]} />
        </mesh>
        <mesh position={[0, 1.2, 0]} material={mats.darkChassis}>
          <cylinderGeometry args={[0.1, 0.1, 0.06, 16]} />
        </mesh>
      </group>

      {/* FUEL TANKS */}
      {[-0.95, 0.95].map((x) => (
        <group key={x} position={[x, -0.55, -0.6]}>
          <mesh rotation={[0, 0, Math.PI / 2]} material={mats.fuelTank} castShadow>
            <cylinderGeometry args={[0.32, 0.32, 1.4, 28]} />
          </mesh>
          {[-0.45, 0.45].map((bz) => (
            <mesh key={bz} position={[0, 0, bz]} material={mats.darkChassis}>
              <torusGeometry args={[0.33, 0.02, 8, 24]} />
            </mesh>
          ))}
          <mesh position={[0, 0.32, 0]} material={mats.chrome}>
            <cylinderGeometry args={[0.06, 0.06, 0.05, 16]} />
          </mesh>
        </group>
      ))}

      {/* CARGO */}
      <group position={[0, 0.35, -2.1]}>
        <mesh material={mats.cabPaint} castShadow>
          <boxGeometry args={[2.4, 2.6, 3.2]} />
        </mesh>
        {[...Array(12)].map((_, i) => (
          <mesh
            key={i}
            position={[1.21, 0, -1.4 + i * 0.26]}
            material={mats.darkChassis}
          >
            <boxGeometry args={[0.02, 2.5, 0.04]} />
          </mesh>
        ))}
        {[...Array(12)].map((_, i) => (
          <mesh
            key={`l${i}`}
            position={[-1.21, 0, -1.4 + i * 0.26]}
            material={mats.darkChassis}
          >
            <boxGeometry args={[0.02, 2.5, 0.04]} />
          </mesh>
        ))}
        <mesh position={[0, 1.1, 0]} material={mats.accentPaint}>
          <boxGeometry args={[2.42, 0.12, 3.22]} />
        </mesh>
        <mesh position={[0, 0, -1.61]} material={mats.cabPaint}>
          <boxGeometry args={[2.4, 2.6, 0.02]} />
        </mesh>
        <mesh position={[0, 0, -1.62]} material={mats.darkChassis}>
          <boxGeometry args={[0.04, 2.55, 0.005]} />
        </mesh>
        {[-0.8, 0.8].map((x) => (
          <mesh key={x} position={[x, -0.2, -1.63]} material={mats.chrome}>
            <boxGeometry args={[0.06, 1.2, 0.06]} />
          </mesh>
        ))}
        {[-0.95, 0.95].map((x) => (
          <mesh key={x} position={[x, -1.05, -1.62]} material={mats.taillight}>
            <boxGeometry args={[0.4, 0.18, 0.02]} />
          </mesh>
        ))}
      </group>

      {/* MUDFLAPS */}
      {[
        [-1.05, -0.85, 1.55],
        [1.05, -0.85, 1.55],
        [-1.05, -0.85, -0.95],
        [1.05, -0.85, -0.95],
        [-1.05, -0.85, -1.75],
        [1.05, -0.85, -1.75],
      ].map(([x, y, z], i) => (
        <mesh key={i} position={[x, y, z]} material={mats.matteBlack}>
          <boxGeometry args={[0.06, 0.6, 0.5]} />
        </mesh>
      ))}

      {/* WHEELS */}
      <Wheel position={[1.1, -0.7, 1.85]} mats={mats} />
      <Wheel position={[-1.1, -0.7, 1.85]} mats={mats} />
      <Wheel position={[1.05, -0.7, -1.25]} mats={mats} dual />
      <Wheel position={[-1.05, -0.7, -1.25]} mats={mats} dual />
      <Wheel position={[1.05, -0.7, -2.05]} mats={mats} dual />
      <Wheel position={[-1.05, -0.7, -2.05]} mats={mats} dual />

      {/* ───── Interactive Hotspots ───── */}
      {interactive && (
        <>
          <Hotspot
            position={[0, 0.5, 2.05]}
            color="#A0A8C0"
            label="Diesel Engine"
            partId="engine"
            onClick={onPartClick}
          />
          <Hotspot
            position={[0, -0.05, -1.0]}
            color="#00E5FF"
            label="Battery Pack"
            partId="battery"
            onClick={onPartClick}
          />
          <Hotspot
            position={[0, -0.4, -2.0]}
            color="#5B4EE8"
            label="Electric Motor"
            partId="motor"
            onClick={onPartClick}
          />
          <Hotspot
            position={[0, 1.6, 1.05]}
            color="#ffffff"
            label="AI Brain (HCU)"
            partId="hcu"
            onClick={onPartClick}
          />
        </>
      )}
    </group>
  );
}

// ───────────────────────── Realistic Powertrain Parts ─────────────────────────
function DieselEngine({ mats }: { mats: Mats }) {
  return (
    <group>
      <mesh material={mats.aluminum} castShadow>
        <boxGeometry args={[1.6, 0.7, 0.85]} />
      </mesh>
      <mesh position={[0, -0.45, 0]} material={mats.darkChassis} castShadow>
        <boxGeometry args={[1.4, 0.22, 0.7]} />
      </mesh>
      <mesh position={[0, 0.45, 0]} material={mats.aluminum} castShadow>
        <boxGeometry args={[1.55, 0.22, 0.78]} />
      </mesh>
      <mesh position={[0, 0.62, 0]} material={mats.accentPaint} castShadow>
        <boxGeometry args={[1.45, 0.14, 0.65]} />
      </mesh>
      {[...Array(6)].map((_, i) => (
        <mesh key={i} position={[-0.6 + i * 0.24, 0.7, 0.32]} material={mats.chrome}>
          <cylinderGeometry args={[0.025, 0.025, 0.04, 8]} />
        </mesh>
      ))}
      {[...Array(6)].map((_, i) => (
        <mesh
          key={`ex${i}`}
          position={[-0.6 + i * 0.24, 0.32, 0.48]}
          rotation={[Math.PI / 2, 0, 0]}
          material={mats.darkChassis}
        >
          <cylinderGeometry args={[0.06, 0.06, 0.18, 12]} />
        </mesh>
      ))}
      <mesh position={[0, 0.22, 0.62]} material={mats.darkChassis}>
        <boxGeometry args={[1.55, 0.16, 0.12]} />
      </mesh>
      <mesh position={[0.7, 0.15, 0.78]} material={mats.chrome} castShadow>
        <cylinderGeometry args={[0.18, 0.22, 0.22, 24]} />
      </mesh>
      <mesh position={[0.7, 0.45, 0.78]} material={mats.darkChassis}>
        <cylinderGeometry args={[0.08, 0.08, 0.4, 16]} />
      </mesh>
      <mesh position={[0, 0.32, -0.5]} material={mats.aluminum}>
        <boxGeometry args={[1.4, 0.18, 0.18]} />
      </mesh>
      {[...Array(6)].map((_, i) => (
        <mesh key={`in${i}`} position={[-0.6 + i * 0.24, 0.4, -0.36]} material={mats.aluminum}>
          <cylinderGeometry args={[0.05, 0.05, 0.18, 10]} />
        </mesh>
      ))}
      <mesh position={[-0.85, 0.05, 0.4]} material={mats.aluminum} castShadow>
        <cylinderGeometry args={[0.16, 0.16, 0.18, 20]} />
      </mesh>
      <mesh position={[-0.85, 0.05, 0.5]} material={mats.matteBlack}>
        <cylinderGeometry args={[0.18, 0.18, 0.04, 20]} />
      </mesh>
      <mesh position={[0, 0.05, 0.55]} material={mats.matteBlack}>
        <cylinderGeometry args={[0.32, 0.32, 0.04, 6]} />
      </mesh>
    </group>
  );
}

function BatteryPack({ mats }: { mats: Mats }) {
  const cellsX = 5;
  const cellsZ = 3;
  return (
    <group>
      <mesh material={mats.aluminum} castShadow>
        <boxGeometry args={[2.8, 0.35, 1.8]} />
      </mesh>
      <mesh position={[0, 0.18, 0]} material={mats.darkChassis}>
        <boxGeometry args={[2.78, 0.04, 1.78]} />
      </mesh>
      {[...Array(cellsX)].map((_, ix) =>
        [...Array(cellsZ)].map((_, iz) => {
          const x = -1.1 + ix * 0.55;
          const z = -0.55 + iz * 0.55;
          return (
            <group key={`${ix}-${iz}`} position={[x, 0.21, z]}>
              <mesh material={mats.cyanGlow}>
                <boxGeometry args={[0.45, 0.06, 0.45]} />
              </mesh>
              <mesh position={[-0.12, 0.05, 0]} material={mats.copper}>
                <cylinderGeometry args={[0.025, 0.025, 0.05, 8]} />
              </mesh>
              <mesh position={[0.12, 0.05, 0]} material={mats.copper}>
                <cylinderGeometry args={[0.025, 0.025, 0.05, 8]} />
              </mesh>
            </group>
          );
        })
      )}
      <mesh position={[1.5, 0.05, 0]} material={mats.orangeCable} castShadow>
        <boxGeometry args={[0.25, 0.25, 0.35]} />
      </mesh>
      {[...Array(8)].map((_, i) => (
        <mesh key={i} position={[-1.4 + i * 0.4, 0, 0.92]} material={mats.aluminum}>
          <boxGeometry args={[0.04, 0.32, 0.06]} />
        </mesh>
      ))}
      {[-1.3, 1.3].map((x) => (
        <mesh key={x} position={[x, -0.2, 0]} material={mats.darkChassis}>
          <boxGeometry args={[0.12, 0.08, 1.6]} />
        </mesh>
      ))}
    </group>
  );
}

function ElectricMotor({ mats }: { mats: Mats }) {
  return (
    <group rotation={[0, 0, Math.PI / 2]}>
      <mesh material={mats.violetGlow} castShadow>
        <cylinderGeometry args={[0.42, 0.42, 1.0, 32]} />
      </mesh>
      {[...Array(20)].map((_, i) => {
        const a = (i / 20) * Math.PI * 2;
        return (
          <mesh
            key={i}
            position={[Math.cos(a) * 0.45, 0, Math.sin(a) * 0.45]}
            rotation={[0, -a, 0]}
            material={mats.aluminum}
          >
            <boxGeometry args={[0.04, 0.85, 0.08]} />
          </mesh>
        );
      })}
      <mesh position={[0, 0.55, 0]} material={mats.aluminum}>
        <cylinderGeometry args={[0.46, 0.46, 0.12, 32]} />
      </mesh>
      <mesh position={[0, -0.55, 0]} material={mats.aluminum}>
        <cylinderGeometry args={[0.46, 0.46, 0.12, 32]} />
      </mesh>
      {[...Array(8)].map((_, i) => {
        const a = (i / 8) * Math.PI * 2;
        return (
          <mesh
            key={i}
            position={[Math.cos(a) * 0.4, 0.62, Math.sin(a) * 0.4]}
            material={mats.chrome}
          >
            <cylinderGeometry args={[0.03, 0.03, 0.04, 8]} />
          </mesh>
        );
      })}
      <mesh position={[0, 0.78, 0]} material={mats.chrome}>
        <cylinderGeometry args={[0.1, 0.1, 0.4, 20]} />
      </mesh>
      <mesh position={[0, 0.96, 0]} material={mats.darkChassis}>
        <cylinderGeometry args={[0.11, 0.11, 0.06, 12]} />
      </mesh>
      <mesh position={[0.42, 0, 0]} material={mats.orangeCable} castShadow>
        <boxGeometry args={[0.18, 0.4, 0.18]} />
      </mesh>
      {[-0.1, 0, 0.1].map((y, i) => (
        <mesh key={i} position={[0.6, y, 0]} material={mats.orangeCable}>
          <cylinderGeometry args={[0.025, 0.025, 0.4, 12]} />
        </mesh>
      ))}
    </group>
  );
}

function HCUUnit({ mats }: { mats: Mats }) {
  return (
    <group>
      <mesh material={mats.aluminum} castShadow>
        <boxGeometry args={[0.85, 0.4, 0.6]} />
      </mesh>
      {[...Array(14)].map((_, i) => (
        <mesh key={i} position={[-0.38 + i * 0.058, 0.27, 0]} material={mats.aluminum}>
          <boxGeometry args={[0.025, 0.14, 0.55]} />
        </mesh>
      ))}
      <mesh position={[0, -0.22, 0]} material={mats.darkChassis}>
        <boxGeometry args={[1.0, 0.04, 0.7]} />
      </mesh>
      {[-0.25, 0, 0.25].map((x) => (
        <mesh key={x} position={[x, 0, 0.32]} material={mats.matteBlack}>
          <cylinderGeometry args={[0.06, 0.06, 0.04, 16]} />
        </mesh>
      ))}
      <mesh position={[0, 0.05, 0.31]} material={mats.led}>
        <boxGeometry args={[0.5, 0.025, 0.01]} />
      </mesh>
      <mesh position={[0, 0.08, -0.31]} material={mats.accentPaint}>
        <boxGeometry args={[0.6, 0.18, 0.005]} />
      </mesh>
      <mesh position={[0.3, 0, -0.31]} material={mats.pcb}>
        <boxGeometry args={[0.2, 0.18, 0.005]} />
      </mesh>
    </group>
  );
}

function PartGroup({
  visible,
  position,
  label,
  labelColor,
  children,
}: {
  visible: boolean;
  position: [number, number, number];
  label: string;
  labelColor: string;
  children: React.ReactNode;
}) {
  const ref = useRef<THREE.Group>(null);
  const target = visible ? 1 : 0.001;

  useFrame((_, delta) => {
    if (ref.current) {
      const s = THREE.MathUtils.lerp(
        ref.current.scale.x,
        target,
        Math.min(1, delta * 6)
      );
      ref.current.scale.setScalar(s);
    }
  });

  return (
    <group ref={ref} position={position} scale={0.001}>
      {children}
      {visible && (
        <Html center position={[0, 1.0, 0]} distanceFactor={9}>
          <div
            className="px-3 py-1.5 rounded-md text-[11px] font-semibold whitespace-nowrap backdrop-blur-md border"
            style={{
              background: "rgba(15,16,32,0.9)",
              borderColor: labelColor,
              color: labelColor,
              boxShadow: `0 0 14px ${labelColor}66`,
            }}
          >
            {label}
          </div>
        </Html>
      )}
    </group>
  );
}

// ───────────────────────── Main ─────────────────────────
export function TruckModel({
  exploded = false,
  interactive = false,
  onPartClick,
}: {
  exploded?: boolean;
  interactive?: boolean;
  onPartClick?: (id: PartId) => void;
}) {
  const mats = useMaterials();
  const group = useRef<THREE.Group>(null);
  const truckRef = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (group.current && !exploded) {
      group.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.18) * 0.35;
    }
    if (truckRef.current) {
      truckRef.current.position.y = THREE.MathUtils.lerp(
        truckRef.current.position.y,
        exploded ? 1.9 : 0,
        Math.min(1, delta * 4)
      );
    }
  });

  return (
    <Float speed={1.0} rotationIntensity={0.1} floatIntensity={exploded ? 0 : 0.35}>
      <group ref={group} scale={0.7}>
        <group ref={truckRef}>
          <HeavyTruck
            mats={mats}
            interactive={interactive}
            onPartClick={onPartClick}
          />
        </group>

        <PartGroup
          visible={exploded}
          position={[0, -0.35, 1.1]}
          label="Inline-6 Diesel Engine"
          labelColor="#A0A8C0"
        >
          <DieselEngine mats={mats} />
        </PartGroup>
        <PartGroup
          visible={exploded}
          position={[0, -1.1, -0.6]}
          label="Lithium-Ion Battery Pack"
          labelColor="#00E5FF"
        >
          <BatteryPack mats={mats} />
        </PartGroup>
        <PartGroup
          visible={exploded}
          position={[0, -0.4, -1.9]}
          label="Permanent-Magnet Electric Motor"
          labelColor="#5B4EE8"
        >
          <ElectricMotor mats={mats} />
        </PartGroup>
        <PartGroup
          visible={exploded}
          position={[0, 0.6, 0.4]}
          label="AI Hybrid Control Unit (HCU)"
          labelColor="#ffffff"
        >
          <HCUUnit mats={mats} />
        </PartGroup>
      </group>
      <ContactShadows
        position={[0, -1.5, 0]}
        opacity={0.6}
        scale={14}
        blur={2.6}
        far={5}
        color="#000000"
      />
    </Float>
  );
}
