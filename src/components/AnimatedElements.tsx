import React, { useEffect, useRef, useState } from "react";
import { cn } from "../lib/utils";

// Floating animation for elements
interface FloatingProps {
  children: React.ReactNode;
  className?: string;
  duration?: number;
  delay?: number;
}

export function FloatingElement({
  children,
  className,
  duration = 3,
  delay = 0,
}: FloatingProps) {
  return (
    <div
      className={cn("animate-floating", className)}
      style={{
        animationDuration: `${duration}s`,
        animationDelay: `${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

// Fade in animation with intersection observer
interface FadeInProps {
  children: React.ReactNode;
  className?: string;
  direction?: "up" | "down" | "left" | "right";
  delay?: number;
  threshold?: number;
}

export function FadeInWhenVisible({
  children,
  className,
  direction = "up",
  delay = 0,
  threshold = 0.1,
}: FadeInProps) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold },
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [threshold]);

  const directionClasses = {
    up: isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0",
    down: isVisible ? "translate-y-0 opacity-100" : "-translate-y-8 opacity-0",
    left: isVisible ? "translate-x-0 opacity-100" : "translate-x-8 opacity-0",
    right: isVisible ? "translate-x-0 opacity-100" : "-translate-x-8 opacity-0",
  };

  return (
    <div
      ref={ref}
      className={cn(
        "transition-all duration-700 ease-out",
        directionClasses[direction],
        className,
      )}
      style={{
        transitionDelay: `${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

// Typewriter animation
interface TypewriterProps {
  text: string;
  className?: string;
  speed?: number;
  delay?: number;
}

export function TypewriterText({
  text,
  className,
  speed = 50,
  delay = 0,
}: TypewriterProps) {
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setTimeout(
      () => {
        if (currentIndex < text.length) {
          setDisplayText((prev) => prev + text[currentIndex]);
          setCurrentIndex((prev) => prev + 1);
        }
      },
      currentIndex === 0 ? delay : speed,
    );

    return () => clearTimeout(timer);
  }, [currentIndex, text, speed, delay]);

  return (
    <span className={cn("inline-block", className)}>
      {displayText}
      <span className="animate-pulse">|</span>
    </span>
  );
}

// Parallax scroll effect
interface ParallaxProps {
  children: React.ReactNode;
  className?: string;
  speed?: number;
}

export function ParallaxElement({
  children,
  className,
  speed = 0.5,
}: ParallaxProps) {
  const [offsetY, setOffsetY] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect();
        const scrolled = window.pageYOffset;
        const rate = scrolled * speed;
        setOffsetY(rate);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [speed]);

  return (
    <div
      ref={ref}
      className={cn("transform-gpu", className)}
      style={{
        transform: `translateY(${offsetY}px)`,
      }}
    >
      {children}
    </div>
  );
}

// Magnetic hover effect
interface MagneticProps {
  children: React.ReactNode;
  className?: string;
  strength?: number;
}

export function MagneticElement({
  children,
  className,
  strength = 0.3,
}: MagneticProps) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const ref = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const deltaX = (e.clientX - centerX) * strength;
      const deltaY = (e.clientY - centerY) * strength;

      setPosition({ x: deltaX, y: deltaY });
    }
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <div
      ref={ref}
      className={cn("transition-transform duration-300 ease-out", className)}
      style={{
        transform: `translate(${position.x}px, ${position.y}px)`,
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </div>
  );
}

// Glowing border effect
interface GlowProps {
  children: React.ReactNode;
  className?: string;
  color?: string;
  intensity?: number;
}

export function GlowingBorder({
  children,
  className,
  color = "blue",
  intensity = 1,
}: GlowProps) {
  const glowColors = {
    blue: "shadow-blue-500/50",
    purple: "shadow-purple-500/50",
    pink: "shadow-pink-500/50",
    green: "shadow-green-500/50",
    yellow: "shadow-yellow-500/50",
    red: "shadow-red-500/50",
  };

  return (
    <div
      className={cn(
        "relative rounded-lg transition-all duration-300",
        "hover:shadow-2xl",
        glowColors[color as keyof typeof glowColors],
        className,
      )}
      style={{
        filter: `brightness(${1 + intensity * 0.1})`,
      }}
    >
      {children}
    </div>
  );
}

// Pulse animation
interface PulseProps {
  children: React.ReactNode;
  className?: string;
  color?: string;
  duration?: number;
}

export function PulseElement({
  children,
  className,
  color = "blue",
  duration = 2,
}: PulseProps) {
  return (
    <div className={cn("relative", className)}>
      {children}
      <div
        className={cn(
          "absolute inset-0 rounded-full animate-ping",
          `bg-${color}-400 opacity-20`,
        )}
        style={{
          animationDuration: `${duration}s`,
        }}
      />
    </div>
  );
}

// Stagger animation for lists
interface StaggerProps {
  children: React.ReactNode[];
  className?: string;
  delay?: number;
}

export function StaggeredList({
  children,
  className,
  delay = 100,
}: StaggerProps) {
  return (
    <div className={cn("space-y-4", className)}>
      {children.map((child, index) => (
        <FadeInWhenVisible key={index} delay={index * delay} direction="up">
          {child}
        </FadeInWhenVisible>
      ))}
    </div>
  );
}

// Morphing shapes
export function MorphingShape({ className }: { className?: string }) {
  return (
    <div className={cn("relative", className)}>
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full animate-morph" />
      <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full animate-morph-reverse opacity-70" />
    </div>
  );
}

// Text reveal animation
interface TextRevealProps {
  text: string;
  className?: string;
  delay?: number;
}

export function TextReveal({ text, className, delay = 0 }: TextRevealProps) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 },
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [delay]);

  return (
    <div ref={ref} className={cn("overflow-hidden", className)}>
      <div
        className={cn(
          "transition-transform duration-1000 ease-out",
          isVisible ? "translate-y-0" : "translate-y-full",
        )}
      >
        {text}
      </div>
    </div>
  );
}
