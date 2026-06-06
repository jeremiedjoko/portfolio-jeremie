'use client';
import React, { useRef, useState, useCallback, useEffect } from 'react';
import { motion, useSpring, useTransform } from 'framer-motion';

export function Spotlight({ size = 400 }) {
  const containerRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [parentElement, setParentElement] = useState(null);

  const mouseX = useSpring(0, { bounce: 0 });
  const mouseY = useSpring(0, { bounce: 0 });

  const spotlightLeft = useTransform(mouseX, (x) => `${x - size / 2}px`);
  const spotlightTop  = useTransform(mouseY, (y) => `${y - size / 2}px`);

  useEffect(() => {
    if (containerRef.current) {
      const parent = containerRef.current.parentElement;
      if (parent) {
        parent.style.position = 'relative';
        parent.style.overflow = 'hidden';
        setParentElement(parent);
      }
    }
  }, []);

  const handleMouseMove = useCallback((event) => {
    if (!parentElement) return;
    const { left, top } = parentElement.getBoundingClientRect();
    mouseX.set(event.clientX - left);
    mouseY.set(event.clientY - top);
  }, [mouseX, mouseY, parentElement]);

  useEffect(() => {
    if (!parentElement) return;
    parentElement.addEventListener('mousemove', handleMouseMove);
    parentElement.addEventListener('mouseenter', () => setIsHovered(true));
    parentElement.addEventListener('mouseleave', () => setIsHovered(false));
    return () => {
      parentElement.removeEventListener('mousemove', handleMouseMove);
      parentElement.removeEventListener('mouseenter', () => setIsHovered(true));
      parentElement.removeEventListener('mouseleave', () => setIsHovered(false));
    };
  }, [parentElement, handleMouseMove]);

  return (
    <motion.div
      ref={containerRef}
      style={{
        position: 'absolute',
        borderRadius: '50%',
        width: size,
        height: size,
        left: spotlightLeft,
        top: spotlightTop,
        background: 'radial-gradient(circle at center, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.06) 40%, transparent 70%)',
        filter: 'blur(40px)',
        pointerEvents: 'none',
        zIndex: 3,
        opacity: isHovered ? 1 : 0,
        transition: 'opacity 0.3s ease',
      }}
    />
  );
}
