import { motion, AnimatePresence } from "framer-motion";
import { X, Cpu, Zap, BatteryCharging, Wrench } from "lucide-react";
import type { ReactNode } from "react";
import type { PartId } from "./TruckModel";

interface PartInfo {
  id: PartId;
  name: string;
  tag: string;
  color: string;
  icon: ReactNode;
  intro: string;
  rhygenAdds: string[];
  specs: { label: string; value: string }[];
}

const PARTS: Record<PartId, PartInfo> = {
  engine: {
    id: "engine",
    name: "Inline-6 Diesel Engine",
    tag: "PRIMARY POWER",
    color: "#A0A8C0",
    icon: <Wrench className="w-5 h-5" />,
    intro:
      "We don't replace the engine our customers already trust. We make it smarter. Rhygen retrofits any modern Indian inline-6 diesel and turns it into a clean, AI-managed power source.",
    rhygenAdds: [
      "AI-controlled fuel injection that adapts in real time to load, slope, and traffic",
      "Engine load-shedding via the electric motor — no more idling at signals or low-RPM lugging",
      "Predictive turbo boost using the next 2 km of GPS road data",
      "Cylinder deactivation on light loads — up to 20% fuel saved on highways",
    ],
    specs: [
      { label: "Compatible engines", value: "5L–8L Inline-6 Diesel" },
      { label: "Emission improvement", value: "−28% CO₂ / km" },
      { label: "Operating mode", value: "AI-Optimized Hybrid Assist" },
    ],
  },
  battery: {
    id: "battery",
    name: "Modular Battery Pack",
    tag: "ENERGY STORAGE",
    color: "#00E5FF",
    icon: <BatteryCharging className="w-5 h-5" />,
    intro:
      "A right-sized, swappable battery designed specifically for Indian fleet operations. Big enough to do real work — small enough not to kill payload or cost.",
    rhygenAdds: [
      "Liquid-cooled lithium iron phosphate (LFP) cells — safe in 50°C heat",
      "Modular 5×3 architecture — replace one module on the road, not the whole pack",
      "Regenerative braking captures up to 70% of stopping energy back into the cells",
      "No charging infrastructure needed — the engine and brakes do the charging",
    ],
    specs: [
      { label: "Capacity", value: "32 kWh (modular)" },
      { label: "Chemistry", value: "LFP (thermally safe)" },
      { label: "Payload impact", value: "< 4% vs. baseline truck" },
    ],
  },
  motor: {
    id: "motor",
    name: "Permanent-Magnet Electric Motor",
    tag: "TORQUE ASSIST",
    color: "#5B4EE8",
    icon: <Zap className="w-5 h-5" />,
    intro:
      "Instant torque exactly when the truck needs it most — pulling away from a traffic light, climbing a ghat, or overtaking on a state highway. The motor is what turns a diesel truck into a hybrid one.",
    rhygenAdds: [
      "Peak 220 Nm of instant torque — fills the gap before the turbo spools",
      "Works as a generator under braking, recharging the battery automatically",
      "Three-phase oil-cooled design rated for 24/7 commercial duty",
      "Bolts onto the existing transmission — no chassis re-engineering required",
    ],
    specs: [
      { label: "Continuous power", value: "60 kW" },
      { label: "Peak torque", value: "220 Nm" },
      { label: "Cooling", value: "Liquid + finned jacket" },
    ],
  },
  hcu: {
    id: "hcu",
    name: "AI Hybrid Control Unit",
    tag: "THE BRAIN",
    color: "#ffffff",
    icon: <Cpu className="w-5 h-5" />,
    intro:
      "The heart of Rhygen. A small, ruggedized computer with our proprietary ML stack — it makes a thousand decisions a second so the driver never has to think about hybrid logic.",
    rhygenAdds: [
      "Learns each driver's habits over the first 1,000 km — and keeps improving",
      "Reads road topography from GPS to pre-plan power-split decisions",
      "Streams anonymized data to the Rhygen cloud — every truck makes the fleet smarter",
      "OTA firmware updates so the truck literally gets more efficient over time",
    ],
    specs: [
      { label: "Compute", value: "Quad-core ARM + NPU" },
      { label: "Decisions / sec", value: "1,000+" },
      { label: "Updates", value: "Over-the-air, monthly" },
    ],
  },
};

export function PartInfoModal({
  partId,
  onClose,
}: {
  partId: PartId | null;
  onClose: () => void;
}) {
  const part = partId ? PARTS[partId] : null;

  return (
    <AnimatePresence>
      {part && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ type: "spring", stiffness: 220, damping: 24 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-[600px] max-h-[85vh] overflow-y-auto bg-[#0F1020] border rounded-2xl"
            style={{
              borderColor: `${part.color}55`,
              boxShadow: `0 0 60px ${part.color}33`,
            }}
          >
            {/* Glow strip */}
            <div
              className="absolute top-0 left-0 right-0 h-[2px]"
              style={{
                background: `linear-gradient(90deg, transparent, ${part.color}, transparent)`,
              }}
            />

            {/* Close */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 text-[#A0A8C0] hover:text-white transition-colors"
              aria-label="Close"
            >
              <X size={20} />
            </button>

            {/* Header */}
            <div className="p-7 pb-5 border-b border-white/5">
              <div className="flex items-center gap-3 mb-3">
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center border"
                  style={{
                    background: `${part.color}15`,
                    borderColor: `${part.color}55`,
                    color: part.color,
                  }}
                >
                  {part.icon}
                </div>
                <span
                  className="text-[11px] font-bold tracking-[2px]"
                  style={{ color: part.color }}
                >
                  {part.tag}
                </span>
              </div>
              <h3 className="text-[26px] md:text-[30px] font-bold text-white leading-tight">
                {part.name}
              </h3>
            </div>

            {/* Body */}
            <div className="p-7 space-y-7">
              <p className="text-[15px] text-[#A0A8C0] leading-[1.7]">
                {part.intro}
              </p>

              <div>
                <h4 className="text-[12px] font-bold tracking-[2px] text-white mb-4">
                  WHAT RHYGEN ADDS
                </h4>
                <ul className="space-y-3">
                  {part.rhygenAdds.map((line, i) => (
                    <li key={i} className="flex gap-3">
                      <span
                        className="mt-2 w-1.5 h-1.5 rounded-full flex-shrink-0"
                        style={{
                          background: part.color,
                          boxShadow: `0 0 8px ${part.color}`,
                        }}
                      />
                      <span className="text-[14px] text-[#cfd4dd] leading-relaxed">
                        {line}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                {part.specs.map((s) => (
                  <div
                    key={s.label}
                    className="bg-[#070710] border border-white/5 rounded-lg p-3"
                  >
                    <div className="text-[10px] font-bold tracking-[1.5px] text-[#A0A8C0] mb-1.5">
                      {s.label.toUpperCase()}
                    </div>
                    <div className="text-[14px] font-semibold text-white leading-tight">
                      {s.value}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
