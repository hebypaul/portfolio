"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";

export default function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [isPointer, setIsPointer] = useState(false);
  const [cursorText, setCursorText] = useState("");
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Balanced spring configuration: slightly more elastic than before, but snappier than the original
  const springConfig = { damping: 30, stiffness: 400, mass: 0.2 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);



  const isVisibleRef = useRef(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(pointer: coarse)");
    const updateTouch = (e: MediaQueryListEvent | MediaQueryList) => setIsTouchDevice(e.matches);
    updateTouch(mediaQuery);
    
    const handler = (e: MediaQueryListEvent) => updateTouch(e);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    if (isTouchDevice) return;

    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      
      if (!isVisibleRef.current) {
        isVisibleRef.current = true;
        setIsVisible(true);
      }

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

    const handleMouseLeave = () => {
      isVisibleRef.current = false;
      setIsVisible(false);
    };
    const handleMouseEnter = () => {
      isVisibleRef.current = true;
      setIsVisible(true);
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [cursorX, cursorY]);

  if (isTouchDevice) return null;

  return (
    <motion.div
      className={cn(
        "hidden md:flex fixed top-0 left-0 z-50 pointer-events-none items-center justify-center rounded-full mix-blend-difference transition-all duration-200",
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
