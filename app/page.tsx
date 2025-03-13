"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface Tool {
  name: string;
  description: string;
  link: string;
  color: string;
  comingSoon?: boolean;
}

const tools: Tool[] = [
  { name: "Timeline", description: "Generate your alternate worlds", link: "/tool-a", color: "bg-purple-500" },
  { name: "Unsummary Ai", description: "Generate AI-based text", link: "/tool-b", color: "bg-green-500" },
  { name: "Excuse-O-Matic", description: "Generate any excuse", link: "/tool-c", color: "bg-yellow-400" },
  { name: "Reverse Cancel AI", description: "Defend ANY of your Opinions", link: "/tool-d", color: "bg-red-500" },
  { name: "Coming Soon", description: "There's more to come...", link: "#", color: "bg-gray-500", comingSoon: true },
];

function BackgroundAnimation() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null; // Render nothing during SSR
  }

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

export default function Home() {
  const [search, setSearch] = useState<string>("");

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const filteredTools = tools.filter((tool) =>
    tool.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center p-6 bg-gray-900 text-white overflow-hidden">
      <BackgroundAnimation />

      {/* Title Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center relative z-10"
      >
        <h1 className="text-6xl font-extrabold bg-gradient-to-r from-purple-400 via-pink-500 to-blue-500 text-transparent bg-clip-text drop-shadow-lg animate-gradient">
          AetherWorld
        </h1>
        <p className="text-lg text-purple-300 mt-2">
          Explore AI-powered tools to boost productivity.
        </p>
      </motion.div>

      {/* Search Bar */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md mt-6 relative z-10"
      >
        <input
          type="text"
          placeholder="Search tools..."
          className="w-full p-3 rounded-lg bg-gray-800 text-white outline-none placeholder-gray-400 focus:ring-2 focus:ring-purple-500 transition"
          value={search}
          onChange={handleSearchChange}
        />
        {search && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={() => setSearch("")}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-purple-500 transition"
          >
            ✕
          </motion.button>
        )}
      </motion.div>

      {/* Tools Grid */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0, y: 20 },
          visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.2 } },
        }}
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full max-w-6xl mt-8 relative z-10"
      >
        {filteredTools.length > 0 ? (
          filteredTools.map((tool) => (
            <motion.div
              key={tool.name}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="relative"
            >
              <Link
                href={tool.comingSoon ? "#" : tool.link}
                className={`p-6 ${tool.comingSoon ? "bg-gray-500 cursor-not-allowed" : tool.color} text-white rounded-xl shadow-lg text-center flex flex-col items-center justify-center transition-transform transform hover:shadow-2xl relative overflow-hidden`}
              >
                {/* Subtle hover overlay */}
                <div className="absolute inset-0 bg-white opacity-0 hover:opacity-10 transition-opacity duration-300" />
                <h2 className="text-2xl font-bold">{tool.name}</h2>
                <p className="text-gray-200 mt-2">{tool.description}</p>
                {tool.comingSoon && (
                  <p className="mt-2 text-yellow-200 text-sm">Coming Soon</p>
                )}
              </Link>
            </motion.div>
          ))
        ) : (
          <p className="text-gray-400 text-center w-full col-span-full">No tools found.</p>
        )}
      </motion.div>

      {/* Footer */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="mt-12 text-center text-gray-400 relative z-10"
      >
        <p>© 2023 AetherWorld. All rights reserved.</p>
      </motion.div>
    </div>
  );
}