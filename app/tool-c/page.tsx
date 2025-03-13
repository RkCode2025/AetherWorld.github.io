"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function ExcuseOMatic() {
  const [situation, setSituation] = useState("");
  const [excuse, setExcuse] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleGenerateExcuse = async () => {
    if (!situation.trim()) {
      setError("⚠️ Please enter a situation.");
      return;
    }

    setLoading(true);
    setError("");
    setExcuse("");

    try {
      const response = await fetch("http://localhost:5000/generate-excuse", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ situation }),
      });

      const data = await response.json();

      if (data.excuse) {
        setExcuse(data.excuse);
      } else {
        setError("❌ Failed to generate an excuse.");
      }
    } catch (err) {
      setError("❌ Server error. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white px-6">
      <motion.h1
        className="text-5xl font-extrabold mb-6 text-yellow-400"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Excuse-o-Matic AI 🎭
      </motion.h1>
      <p className="text-lg text-gray-400 text-center mb-6">
        Get the most ridiculous and creative excuses for any situation!
      </p>

      <div className="w-full max-w-2xl bg-gray-800 p-6 rounded-2xl shadow-lg">
        <input
          type="text"
          placeholder="Enter your situation..."
          value={situation}
          onChange={(e) => setSituation(e.target.value)}
          className="w-full p-4 rounded-lg bg-gray-700 border border-gray-600 text-white
                     focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 outline-none"
        />

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-full mt-5 bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-3 rounded-lg
                     font-semibold text-lg shadow-md transition-all"
          onClick={handleGenerateExcuse}
          disabled={loading}
        >
          {loading ? "Thinking..." : "Generate Excuse"}
        </motion.button>
      </div>

      {error && <p className="mt-4 text-red-400">{error}</p>}

      {excuse && (
        <motion.div
          className="mt-6 w-full max-w-2xl p-6 bg-gray-800 border border-yellow-500 rounded-2xl shadow-lg"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-yellow-400 font-bold">Your Excuse:</p>
          <p className="text-white mt-2">{excuse}</p>
        </motion.div>
      )}
    </div>
  );
}
