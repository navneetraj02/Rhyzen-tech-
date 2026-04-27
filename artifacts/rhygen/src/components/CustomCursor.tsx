import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [hovering, setHovering] = useState(false);
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    // Disable on touch devices
    if ("ontouchstart" in window || navigator.maxTouchPoints > 0) {
      setIsTouch(true);
      return;
    }

    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const updateHoverState = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isClickable = 
        target.tagName.toLowerCase() === "button" ||
        target.tagName.toLowerCase() === "a" ||
        target.closest("button") ||
        target.closest("a") ||
        target.classList.contains("clickable");
      
      setHovering(!!isClickable);
    };

    window.addEventListener("mousemove", updatePosition);
    window.addEventListener("mouseover", updateHoverState);

    return () => {
      window.removeEventListener("mousemove", updatePosition);
      window.removeEventListener("mouseover", updateHoverState);
    };
  }, []);

  if (isTouch) return null;

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full mix-blend-screen"
      animate={{
        x: position.x - (hovering ? 16 : 5),
        y: position.y - (hovering ? 16 : 5),
        width: hovering ? 32 : 10,
        height: hovering ? 32 : 10,
        backgroundColor: hovering ? "rgba(91, 78, 232, 0.3)" : "rgba(255, 255, 255, 1)",
        border: hovering ? "1px solid rgba(91, 78, 232, 0.8)" : "none",
      }}
      transition={{
        type: "spring",
        stiffness: 500,
        damping: 28,
        mass: 2
      }}
    />
  );
}
