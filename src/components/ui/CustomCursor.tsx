"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";

export default function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [isPointer, setIsPointer] = useState(false);
  const [cursorText, setCursorText] = useState("");

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 300, mass: 0.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    const handleHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const clickable = target.closest("a, button, input, select, textarea, [data-cursor]");
      
      if (clickable) {
        setIsPointer(true);
        const text = clickable.getAttribute("data-cursor-text");
        setCursorText(text || "");
      } else {
        setIsPointer(false);
        setCursorText("");
      }
    };

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mousemove", handleHover);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mousemove", handleHover);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [cursorX, cursorY, isVisible]);

  return (
    <motion.div
      className={cn(
        "fixed top-0 left-0 z-50 pointer-events-none flex items-center justify-center rounded-full mix-blend-difference transition-all duration-200",
        isVisible ? "opacity-100" : "opacity-0",
        isPointer ? "bg-highlight" : "bg-white border border-white/20 backdrop-blur-sm"
      )}
      style={{
        x: cursorXSpring,
        y: cursorYSpring,
        translateX: "-50%",
        translateY: "-50%",
        width: isPointer ? (cursorText ? 80 : 40) : 20,
        height: isPointer ? (cursorText ? 80 : 40) : 20,
      }}
    >
      {cursorText && (
        <span className="text-background text-xs font-medium tracking-wider pointer-events-none text-center leading-tight">
          {cursorText}
        </span>
      )}
    </motion.div>
  );
}
