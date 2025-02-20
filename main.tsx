"use client";
import { useState } from "react";
import { motion } from "framer-motion";

export default function Home() {
  const tools = ["A", "B", "C", "D", "E", "F", "G", "H"];
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-10">
      <h1 className="text-5xl font-bold mb-8">AetherMind</h1>
      <p className="text-lg text-gray-400 mb-10">
        Explore AI tools that push the boundaries of creativity.
      </p>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {tools.map((tool) => (
          <motion.button
            key={tool}
            onMouseEnter={() => setHovered(tool)}
            onMouseLeave={() => setHovered(null)}
            whileHover={{ scale: 1.1 }}
            className="w-32 h-32 bg-gray-800 text-3xl font-bold rounded-2xl flex items-center justify-center shadow-lg hover:bg-gray-700 transition"
          >
            {tool}
          </motion.button>
        ))}
      </div>
      {hovered && (
        <p className="mt-8 text-lg text-gray-400">
          AI Tool {hovered} - Coming Soon!
        </p>
      )}
    </main>
  );
}
