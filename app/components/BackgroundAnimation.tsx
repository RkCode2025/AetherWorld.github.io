"use client";

import { motion } from "framer-motion";

export default function BackgroundAnimation() {
  return (
    <div className="absolute inset-0 bg-black overflow-hidden">
      {/* Dynamic Gradient Background */}
      <motion.div
        animate={{
          background: [
            "linear-gradient(45deg, rgba(16, 16, 16, 1) 0%, rgba(32, 32, 32, 1) 50%, rgba(16, 16, 16, 1) 100%)",
            "linear-gradient(135deg, rgba(16, 16, 16, 1) 0%, rgba(32, 32, 32, 1) 50%, rgba(16, 16, 16, 1) 100%)",
            "linear-gradient(225deg, rgba(16, 16, 16, 1) 0%, rgba(32, 32, 32, 1) 50%, rgba(16, 16, 16, 1) 100%)",
            "linear-gradient(315deg, rgba(16, 16, 16, 1) 0%, rgba(32, 32, 32, 1) 50%, rgba(16, 16, 16, 1) 100%)",
          ],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute inset-0"
      />

      {/* Subtle Particle Effects */}
      {Array.from({ length: 50 }).map((_, index) => (
        <motion.div
          key={index}
          initial={{
            opacity: 0,
            scale: 0,
            x: Math.random() * 100 - 50,
            y: Math.random() * 100 - 50,
          }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0, 1, 0],
            x: Math.random() * 100 - 50,
            y: Math.random() * 100 - 50,
          }}
          transition={{
            duration: Math.random() * 4 + 2,
            repeat: Infinity,
            delay: Math.random() * 2,
            ease: "easeInOut",
          }}
          className="absolute w-1 h-1 bg-white rounded-full"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
          }}
        />
      ))}

      {/* Glowing Grid Lines */}
      <motion.div
        animate={{
          opacity: [0.8, 1, 0.8],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute inset-0 bg-grid-white/[0.05]"
      />

      {/* Moving Light Spots */}
      {[
        { x: "10%", y: "20%", size: 200, color: "rgba(168, 85, 247, 0.2)" },
        { x: "80%", y: "50%", size: 150, color: "rgba(255, 105, 180, 0.2)" },
        { x: "30%", y: "70%", size: 250, color: "rgba(0, 255, 255, 0.2)" },
      ].map((spot, index) => (
        <motion.div
          key={index}
          animate={{
            x: [spot.x, `${Math.random() * 100}%`, spot.x],
            y: [spot.y, `${Math.random() * 100}%`, spot.y],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: Math.random() * 10 + 5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute rounded-full blur-2xl"
          style={{
            width: `${spot.size}px`,
            height: `${spot.size}px`,
            backgroundColor: spot.color,
          }}
        />
      ))}
    </div>
  );
}