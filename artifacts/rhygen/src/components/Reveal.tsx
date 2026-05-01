import { motion, Variants } from "framer-motion";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: "left" | "right" | "up" | "down";
}

// Section-level zoom/fade reveal
export function SectionReveal({ children, className, delay = 0 }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 50 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: false, margin: "-100px" }}
      transition={{ 
        duration: 1.2, 
        delay, 
        ease: [0.16, 1, 0.3, 1] 
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Slide in from direction
export function SlideReveal({ children, className, delay = 0, direction = "left" }: Props) {
  const xValue = direction === "left" ? -100 : direction === "right" ? 100 : 0;
  const yValue = direction === "up" ? 100 : direction === "down" ? -100 : 0;

  return (
    <motion.div
      initial={{ opacity: 0, x: xValue, y: yValue, filter: "blur(10px)" }}
      whileInView={{ opacity: 1, x: 0, y: 0, filter: "blur(0px)" }}
      viewport={{ once: false }}
      transition={{ 
        duration: 1.5, 
        delay, 
        ease: [0.16, 1, 0.3, 1] 
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Text "falling" from top word by word
export function WordReveal({ children, className, delay = 0 }: Props) {
  const words = (children as string).split(" ");

  const container: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: delay },
    },
  };

  const child: Variants = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
    hidden: {
      opacity: 0,
      y: -50,
    },
  };

  return (
    <motion.div
      style={{ display: "flex", flexWrap: "wrap" }}
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false }}
      className={className}
    >
      {words.map((word, index) => (
        <motion.span
          variants={child}
          style={{ marginRight: "0.25em" }}
          key={index}
        >
          {word}
        </motion.span>
      ))}
    </motion.div>
  );
}

// Individual character falling and "forming"
export function CharReveal({ children, className, delay = 0 }: Props) {
  const text = children as string;
  const characters = Array.from(text);

  const container: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.05, delayChildren: delay },
    },
  };

  const child: Variants = {
    visible: {
      opacity: 1,
      y: 0,
      rotate: 0,
      filter: "blur(0px)",
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 120,
      },
    },
    hidden: (custom: number) => ({
      opacity: 0,
      y: -150,
      rotate: custom,
      filter: "blur(15px)",
    }),
  };

  return (
    <motion.div
      style={{ display: "flex", overflow: "visible" }}
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false }}
      className={className}
    >
      {characters.map((char, index) => (
        <motion.span
          variants={child}
          custom={Math.random() * 40 - 20}
          key={index}
          style={{ display: "inline-block" }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </motion.div>
  );
}
