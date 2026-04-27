import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { Float, ContactShadows, Html } from "@react-three/drei";

// ───────────────────────── Materials ─────────────────────────
function useMaterials() {
  return useMemo(() => {
    const cabPaint = new THREE.MeshPhysicalMaterial({
      color: "#e8ecf4",
      metalness: 0.55,
      roughness: 0.32,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1,
      envMapIntensity: 1.2,
    });
    const accentPaint = new THREE.MeshPhysicalMaterial({
      color: "#5B4EE8",
      metalness: 0.5,
      roughness: 0.3,
      clearcoat: 1.0,
    });
    const chrome = new THREE.MeshPhysicalMaterial({
      color: "#f5f5f5",
      metalness: 1.0,
      roughness: 0.06,
      clearcoat: 1.0,
    });
    const darkChassis = new THREE.MeshPhysicalMaterial({
      color: "#15181f",
      metalness: 0.85,
      roughness: 0.55,
    });
    const matteBlack = new THREE.MeshStandardMaterial({
      color: "#0b0b0d",
      metalness: 0.2,
      roughness: 0.95,
    });
    const tire = new THREE.MeshStandardMaterial({
      color: "#0a0a0c",
      roughness: 0.95,
      metalness: 0.0,
    });
    const tireWall = new THREE.MeshStandardMaterial({
      color: "#1a1a1d",
      roughness: 0.9,
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
      emissiveIntensity: 1.4,
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
      metalness: 0.95,
      roughness: 0.18,
      clearcoat: 0.6,
    });
    const aluminum = new THREE.MeshPhysicalMaterial({
      color: "#9aa0a8",
      metalness: 0.9,
      roughness: 0.35,
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
      {/* Tire */}
      <mesh castShadow material={mats.tire}>
        <torusGeometry args={[tireR, tireW * 0.55, 16, 40]} />
      </mesh>
      <mesh castShadow material={mats.tireWall}>
        <cylinderGeometry args={[tireR, tireR, tireW, 40]} />
      </mesh>
      {/* Hub */}
      <mesh castShadow material={mats.aluminum}>
        <cylinderGeometry args={[0.32, 0.32, tireW + 0.02, 32]} />
      </mesh>
      {/* Bolt circle */}
      {[...Array(8)].map((_, i) => {
        const a = (i / 8) * Math.PI * 2;
        return (
          <mesh
            key={i}
            position={[0, tireW / 2 + 0.005, 0]}
            rotation={[Math.PI / 2, 0, 0]}
          >
            <cylinderGeometry args={[0.035, 0.035, 0.04, 12]} />
            <primitive object={mats.chrome} attach="material" />
            {/* relocate bolt around hub */}
            <group position={[Math.cos(a) * 0.22, Math.sin(a) * 0.22, 0]} />
          </mesh>
        );
      })}
      {/* Center cap */}
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

// ───────────────────────── Heavy Truck (Long-nose Indian style) ─────────────────────────
function HeavyTruck({ mats }: { mats: Mats }) {
  return (
    <group>
      {/* === CHASSIS LADDER FRAME === */}
      <mesh position={[0.7, -0.55, 0]} material={mats.darkChassis} castShadow>
        <boxGeometry args={[0.18, 0.24, 5.6]} />
      </mesh>
      <mesh position={[-0.7, -0.55, 0]} material={mats.darkChassis} castShadow>
        <boxGeometry args={[0.18, 0.24, 5.6]} />
      </mesh>
      {/* Cross members */}
      {[-2.4, -1.2, 0, 1.2, 2.4].map((z) => (
        <mesh key={z} position={[0, -0.55, z]} material={mats.darkChassis}>
          <boxGeometry args={[1.5, 0.1, 0.15]} />
        </mesh>
      ))}

      {/* === HOOD / BONNET === */}
      <group position={[0, 0.05, 2.05]}>
        {/* Hood top */}
        <mesh material={mats.cabPaint} castShadow>
          <boxGeometry args={[1.85, 0.7, 1.4]} />
        </mesh>
        {/* Hood front slope */}
        <mesh
          position={[0, -0.05, 0.72]}
          rotation={[-0.2, 0, 0]}
          material={mats.cabPaint}
          castShadow
        >
          <boxGeometry args={[1.85, 0.45, 0.4]} />
        </mesh>
        {/* Hood ornament strip */}
        <mesh position={[0, 0.36, 0]} material={mats.chrome}>
          <boxGeometry args={[0.1, 0.04, 1.4]} />
        </mesh>
      </group>

      {/* === GRILLE === */}
      <group position={[0, -0.15, 2.78]}>
        <mesh material={mats.chrome} castShadow>
          <boxGeometry args={[1.7, 0.85, 0.08]} />
        </mesh>
        {/* Vertical bars */}
        {[...Array(11)].map((_, i) => (
          <mesh
            key={i}
            position={[-0.75 + i * 0.15, 0, 0.06]}
            material={mats.darkChassis}
          >
            <boxGeometry args={[0.06, 0.78, 0.04]} />
          </mesh>
        ))}
        {/* Brand plate */}
        <mesh position={[0, 0.5, 0.07]} material={mats.accentPaint}>
          <boxGeometry args={[0.55, 0.15, 0.04]} />
        </mesh>
      </group>

      {/* === BUMPER === */}
      <mesh
        position={[0, -0.55, 2.95]}
        material={mats.darkChassis}
        castShadow
      >
        <boxGeometry args={[2.1, 0.35, 0.18]} />
      </mesh>
      <mesh
        position={[0, -0.55, 2.95]}
        material={mats.chrome}
      >
        <boxGeometry args={[2.12, 0.08, 0.2]} />
      </mesh>

      {/* === HEADLIGHTS === */}
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

      {/* === FRONT FENDERS === */}
      {[-1.0, 1.0].map((x) => (
        <mesh key={x} position={[x, -0.2, 2.05]} material={mats.cabPaint}>
          <boxGeometry args={[0.18, 0.7, 1.4]} />
        </mesh>
      ))}

      {/* === CABIN === */}
      <group position={[0, 0.55, 1.05]}>
        {/* Lower cab */}
        <mesh material={mats.cabPaint} castShadow>
          <boxGeometry args={[2.1, 1.6, 1.5]} />
        </mesh>
        {/* Upper roof (slightly narrower) */}
        <mesh
          position={[0, 0.85, 0]}
          material={mats.cabPaint}
          castShadow
        >
          <boxGeometry args={[2.0, 0.15, 1.45]} />
        </mesh>
        {/* Windshield */}
        <mesh position={[0, 0.4, 0.76]} rotation={[-0.18, 0, 0]} material={mats.glass}>
          <planeGeometry args={[1.85, 0.95]} />
        </mesh>
        {/* Side windows */}
        <mesh position={[1.06, 0.35, 0]} rotation={[0, Math.PI / 2, 0]} material={mats.glass}>
          <planeGeometry args={[1.2, 0.7]} />
        </mesh>
        <mesh position={[-1.06, 0.35, 0]} rotation={[0, -Math.PI / 2, 0]} material={mats.glass}>
          <planeGeometry args={[1.2, 0.7]} />
        </mesh>
        {/* Door lines */}
        {[-1.045, 1.045].map((x) => (
          <mesh key={x} position={[x, -0.15, 0]} material={mats.darkChassis}>
            <boxGeometry args={[0.005, 1.3, 0.01]} />
          </mesh>
        ))}
        {/* Door handles */}
        {[-1.06, 1.06].map((x) => (
          <mesh key={x} position={[x, -0.1, -0.4]} material={mats.chrome}>
            <boxGeometry args={[0.02, 0.06, 0.18]} />
          </mesh>
        ))}
        {/* Side mirrors on stalks */}
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
        {/* Cab steps */}
        {[-1.07, 1.07].map((x) => (
          <mesh key={x} position={[x, -1.0, -0.2]} material={mats.darkChassis}>
            <boxGeometry args={[0.12, 0.05, 0.45]} />
          </mesh>
        ))}
      </group>

      {/* === SLEEPER EXTENSION === */}
      <group position={[0, 0.7, 0.0]}>
        <mesh material={mats.cabPaint} castShadow>
          <boxGeometry args={[2.1, 1.85, 0.6]} />
        </mesh>
        {/* Rear sleeper window */}
        <mesh position={[0, 0.35, -0.31]} material={mats.glass}>
          <planeGeometry args={[1.4, 0.4]} />
        </mesh>
      </group>

      {/* === EXHAUST STACK (vertical, behind cab) === */}
      <group position={[1.05, 0.95, -0.45]}>
        <mesh material={mats.chrome} castShadow>
          <cylinderGeometry args={[0.085, 0.085, 2.4, 20]} />
        </mesh>
        {/* Heat shield */}
        <mesh position={[0, 0, 0.08]} material={mats.darkChassis}>
          <boxGeometry args={[0.05, 1.6, 0.05]} />
        </mesh>
        {/* Top cap */}
        <mesh position={[0, 1.2, 0]} material={mats.darkChassis}>
          <cylinderGeometry args={[0.1, 0.1, 0.06, 16]} />
        </mesh>
      </group>

      {/* === FUEL TANKS (cylindrical, side mounted) === */}
      {[-0.95, 0.95].map((x) => (
        <group key={x} position={[x, -0.55, -0.6]}>
          <mesh rotation={[0, 0, Math.PI / 2]} material={mats.fuelTank} castShadow>
            <cylinderGeometry args={[0.32, 0.32, 1.4, 28]} />
          </mesh>
          {/* Strap bands */}
          {[-0.45, 0.45].map((bz) => (
            <mesh key={bz} position={[0, 0, bz]} material={mats.darkChassis}>
              <torusGeometry args={[0.33, 0.02, 8, 24]} />
            </mesh>
          ))}
          {/* Filler cap */}
          <mesh position={[0, 0.32, 0]} material={mats.chrome}>
            <cylinderGeometry args={[0.06, 0.06, 0.05, 16]} />
          </mesh>
        </group>
      ))}

      {/* === CARGO CONTAINER BODY === */}
      <group position={[0, 0.35, -2.1]}>
        {/* Main box */}
        <mesh material={mats.cabPaint} castShadow>
          <boxGeometry args={[2.4, 2.6, 3.2]} />
        </mesh>
        {/* Corrugation strips on sides */}
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
        {/* Top accent stripe */}
        <mesh position={[0, 1.1, 0]} material={mats.accentPaint}>
          <boxGeometry args={[2.42, 0.12, 3.22]} />
        </mesh>
        {/* Rear doors with handles */}
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
        {/* Tail lights */}
        {[-0.95, 0.95].map((x) => (
          <mesh key={x} position={[x, -1.05, -1.62]} material={mats.taillight}>
            <boxGeometry args={[0.4, 0.18, 0.02]} />
          </mesh>
        ))}
      </group>

      {/* === MUDFLAPS === */}
      {[
        [-1.05, -0.85, 1.55],
        [1.05, -0.85, 1.55],
        [-1.05, -0.85, -0.95],
        [1.05, -0.85, -0.95],
        [-1.05, -0.85, -1.75],
        [1.05, -0.85, -1.75],
      ].map(([x, y, z], i) => (
        <mesh
          key={i}
          position={[x, y, z]}
          material={mats.matteBlack}
        >
          <boxGeometry args={[0.06, 0.6, 0.5]} />
        </mesh>
      ))}

      {/* === WHEELS (2 front + 4 rear duals = 6 wheels visible) === */}
      <Wheel position={[1.1, -0.7, 1.85]} mats={mats} />
      <Wheel position={[-1.1, -0.7, 1.85]} mats={mats} />
      {/* Rear tandem axle (dual) */}
      <Wheel position={[1.05, -0.7, -1.25]} mats={mats} dual />
      <Wheel position={[-1.05, -0.7, -1.25]} mats={mats} dual />
      <Wheel position={[1.05, -0.7, -2.05]} mats={mats} dual />
      <Wheel position={[-1.05, -0.7, -2.05]} mats={mats} dual />
    </group>
  );
}

// ───────────────────────── Realistic Powertrain Parts ─────────────────────────

function DieselEngine({ mats }: { mats: Mats }) {
  return (
    <group>
      {/* Crankcase / block */}
      <mesh material={mats.aluminum} castShadow>
        <boxGeometry args={[1.6, 0.7, 0.85]} />
      </mesh>
      {/* Oil pan */}
      <mesh position={[0, -0.45, 0]} material={mats.darkChassis} castShadow>
        <boxGeometry args={[1.4, 0.22, 0.7]} />
      </mesh>
      {/* Cylinder head */}
      <mesh position={[0, 0.45, 0]} material={mats.aluminum} castShadow>
        <boxGeometry args={[1.55, 0.22, 0.78]} />
      </mesh>
      {/* Valve cover */}
      <mesh position={[0, 0.62, 0]} material={mats.accentPaint} castShadow>
        <boxGeometry args={[1.45, 0.14, 0.65]} />
      </mesh>
      {/* Cylinder bolts on valve cover */}
      {[...Array(6)].map((_, i) => (
        <mesh
          key={i}
          position={[-0.6 + i * 0.24, 0.7, 0.32]}
          material={mats.chrome}
        >
          <cylinderGeometry args={[0.025, 0.025, 0.04, 8]} />
        </mesh>
      ))}
      {/* 6 exhaust runners */}
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
      {/* Exhaust manifold collector */}
      <mesh position={[0, 0.22, 0.62]} material={mats.darkChassis}>
        <boxGeometry args={[1.55, 0.16, 0.12]} />
      </mesh>
      {/* Turbo */}
      <mesh position={[0.7, 0.15, 0.78]} material={mats.chrome} castShadow>
        <cylinderGeometry args={[0.18, 0.22, 0.22, 24]} />
      </mesh>
      <mesh position={[0.7, 0.45, 0.78]} material={mats.darkChassis}>
        <cylinderGeometry args={[0.08, 0.08, 0.4, 16]} />
      </mesh>
      {/* Intake manifold */}
      <mesh position={[0, 0.32, -0.5]} material={mats.aluminum}>
        <boxGeometry args={[1.4, 0.18, 0.18]} />
      </mesh>
      {[...Array(6)].map((_, i) => (
        <mesh
          key={`in${i}`}
          position={[-0.6 + i * 0.24, 0.4, -0.36]}
          material={mats.aluminum}
        >
          <cylinderGeometry args={[0.05, 0.05, 0.18, 10]} />
        </mesh>
      ))}
      {/* Alternator + pulley */}
      <mesh position={[-0.85, 0.05, 0.4]} material={mats.aluminum} castShadow>
        <cylinderGeometry args={[0.16, 0.16, 0.18, 20]} />
      </mesh>
      <mesh position={[-0.85, 0.05, 0.5]} material={mats.matteBlack}>
        <cylinderGeometry args={[0.18, 0.18, 0.04, 20]} />
      </mesh>
      {/* Fan */}
      <mesh position={[0, 0.05, 0.55]} material={mats.matteBlack}>
        <cylinderGeometry args={[0.32, 0.32, 0.04, 6]} />
      </mesh>
      {/* Belt */}
      <mesh position={[-0.43, 0.05, 0.5]} rotation={[0, 0, 0.4]} material={mats.matteBlack}>
        <torusGeometry args={[0.3, 0.015, 8, 24]} />
      </mesh>
    </group>
  );
}

function BatteryPack({ mats }: { mats: Mats }) {
  const cellsX = 5;
  const cellsZ = 3;
  return (
    <group>
      {/* Outer aluminum housing */}
      <mesh material={mats.aluminum} castShadow>
        <boxGeometry args={[2.8, 0.35, 1.8]} />
      </mesh>
      {/* Top cover */}
      <mesh position={[0, 0.18, 0]} material={mats.darkChassis}>
        <boxGeometry args={[2.78, 0.04, 1.78]} />
      </mesh>
      {/* Cell modules grid (visible from top) */}
      {[...Array(cellsX)].map((_, ix) =>
        [...Array(cellsZ)].map((_, iz) => {
          const x = -1.1 + ix * 0.55;
          const z = -0.55 + iz * 0.55;
          return (
            <group key={`${ix}-${iz}`} position={[x, 0.21, z]}>
              <mesh material={mats.cyanGlow}>
                <boxGeometry args={[0.45, 0.06, 0.45]} />
              </mesh>
              {/* Terminal posts */}
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
      {/* HV connector box */}
      <mesh position={[1.5, 0.05, 0]} material={mats.orangeCable} castShadow>
        <boxGeometry args={[0.25, 0.25, 0.35]} />
      </mesh>
      {/* Cooling fins on the side */}
      {[...Array(8)].map((_, i) => (
        <mesh
          key={i}
          position={[-1.4 + i * 0.4, 0, 0.92]}
          material={mats.aluminum}
        >
          <boxGeometry args={[0.04, 0.32, 0.06]} />
        </mesh>
      ))}
      {/* Mounting brackets */}
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
      {/* Main motor body */}
      <mesh material={mats.violetGlow} castShadow>
        <cylinderGeometry args={[0.42, 0.42, 1.0, 32]} />
      </mesh>
      {/* Cooling fins around body */}
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
      {/* End bells */}
      <mesh position={[0, 0.55, 0]} material={mats.aluminum}>
        <cylinderGeometry args={[0.46, 0.46, 0.12, 32]} />
      </mesh>
      <mesh position={[0, -0.55, 0]} material={mats.aluminum}>
        <cylinderGeometry args={[0.46, 0.46, 0.12, 32]} />
      </mesh>
      {/* End-bell bolt circle */}
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
      {/* Output shaft */}
      <mesh position={[0, 0.78, 0]} material={mats.chrome}>
        <cylinderGeometry args={[0.1, 0.1, 0.4, 20]} />
      </mesh>
      {/* Spline detail at shaft tip */}
      <mesh position={[0, 0.96, 0]} material={mats.darkChassis}>
        <cylinderGeometry args={[0.11, 0.11, 0.06, 12]} />
      </mesh>
      {/* Phase cable junction */}
      <mesh position={[0.42, 0, 0]} material={mats.orangeCable} castShadow>
        <boxGeometry args={[0.18, 0.4, 0.18]} />
      </mesh>
      {/* Three orange phase cables */}
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
      {/* Aluminum case */}
      <mesh material={mats.aluminum} castShadow>
        <boxGeometry args={[0.85, 0.4, 0.6]} />
      </mesh>
      {/* Heat sink fins on top */}
      {[...Array(14)].map((_, i) => (
        <mesh
          key={i}
          position={[-0.38 + i * 0.058, 0.27, 0]}
          material={mats.aluminum}
        >
          <boxGeometry args={[0.025, 0.14, 0.55]} />
        </mesh>
      ))}
      {/* Mounting flange */}
      <mesh position={[0, -0.22, 0]} material={mats.darkChassis}>
        <boxGeometry args={[1.0, 0.04, 0.7]} />
      </mesh>
      {/* Connector ports on front */}
      {[-0.25, 0, 0.25].map((x) => (
        <mesh key={x} position={[x, 0, 0.32]} material={mats.matteBlack}>
          <cylinderGeometry args={[0.06, 0.06, 0.04, 16]} />
        </mesh>
      ))}
      {/* Status LED strip */}
      <mesh position={[0, 0.05, 0.31]} material={mats.led}>
        <boxGeometry args={[0.5, 0.025, 0.01]} />
      </mesh>
      {/* Side label plate */}
      <mesh position={[0, 0.08, -0.31]} material={mats.accentPaint}>
        <boxGeometry args={[0.6, 0.18, 0.005]} />
      </mesh>
      {/* Brand chip */}
      <mesh position={[0.3, 0, -0.31]} material={mats.pcb}>
        <boxGeometry args={[0.2, 0.18, 0.005]} />
      </mesh>
    </group>
  );
}

// ───────────────────────── Animated wrappers w/ labels ─────────────────────────
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

// ───────────────────────── Main exported component ─────────────────────────
export function TruckModel({ exploded = false }: { exploded?: boolean }) {
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
          <HeavyTruck mats={mats} />
        </group>

        {/* Powertrain parts beneath the lifted truck */}
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
