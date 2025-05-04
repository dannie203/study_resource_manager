"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function Splash() {
  const logoRef = useRef<SVGImageElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timeline = gsap.timeline();

    // Logo animation with bounce effect
    timeline.fromTo(
      logoRef.current,
      { opacity: 0, scale: 0.5 },
      { opacity: 1, scale: 1, duration: 1, ease: "bounce.out" }
    );

    // Text animation
    timeline.fromTo(
      textRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 1, ease: "power2.out" },
      "-=0.5" // Overlap with logo animation
    );

    return () => {
      timeline.kill(); // Cleanup animation on unmount
    };
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-white text-black">
      <div className="text-center">
        {/* SVG Logo */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-[600px] h-[600px] mx-auto mb-4" // Adjusted size for larger logo
        >
          <image
            ref={logoRef}
            href="/splash/logo.svg" // Path to the SVG file in the public folder
            width="600"
            height="600"
            aria-label="Logo"
          />
        </svg>
      </div>
    </div>
  );
}