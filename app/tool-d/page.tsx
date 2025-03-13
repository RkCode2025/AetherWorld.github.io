"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function ReverseCancelAI() {
  const [topic, setTopic] = useState("");
  const [style, setStyle] = useState("Serious Defense");
  const [wordCount, setWordCount] = useState(200);
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const styles = [
    "Serious Defense",
    "Humorous Reversal",
    "Historical Context",
    "Devil's Advocate",
  ];

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setResponse("");

    try {
      const res = await fetch("http://127.0.0.1:5000/reverse-cancel", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic, style, wordCount }),
      });

      const data = await res.json();

      if (res.ok && data.defense) {
        setResponse(data.defense);
      } else {
        setError(data.error || "❌ Failed to generate a defense.");
      }
    } catch (err) {
      setError("❌ Server error. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-950 text-white px-6">
      <motion.h1
        className="text-5xl font-extrabold mb-6 text-red-500"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        🛡️ Reverse Cancel AI
      </motion.h1>
      <p className="text-lg text-gray-400 text-center mb-6">
        Generate a strong defense against cancelation!
      </p>

      <form onSubmit={handleSubmit} className="w-full max-w-2xl bg-gray-900 p-6 rounded-2xl shadow-xl">
        {/* Topic Input */}
        <label className="block text-lg mb-2" htmlFor="topic">Topic:</label>
        <input
          id="topic"
          type="text"
          className="w-full p-4 rounded-lg bg-gray-800 border border-gray-700 text-white focus:ring-2 focus:ring-red-500 outline-none"
          placeholder="E.g., Pineapple on pizza is good"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          required
          aria-label="Topic"
        />

        {/* Defense Style Selection */}
        <label className="block text-lg mt-6 mb-2">Defense Style:</label>
        <div className="grid grid-cols-2 gap-4">
          {styles.map((s) => (
            <motion.div
              key={s}
              className={`p-4 rounded-lg cursor-pointer text-center font-semibold transition-all ${
                style === s
                  ? "bg-red-500 text-white border border-red-700 shadow-md"
                  : "bg-gray-800 text-gray-300 border border-gray-700 hover:bg-gray-700"
              }`}
              onClick={() => setStyle(s)}
              whileTap={{ scale: 0.95 }}
              role="button"
              aria-pressed={style === s}
            >
              {s}
            </motion.div>
          ))}
        </div>

        {/* Word Count Slider */}
        <label className="block text-lg mt-6 mb-2">Word Count: {wordCount}</label>
        <input
          type="range"
          min="50"
          max="1000"
          value={wordCount}
          onChange={(e) => setWordCount(Number(e.target.value))}
          className="w-full cursor-pointer"
          aria-label="Word Count"
        />

        {/* Submit Button */}
        <motion.button
          whileHover={!loading ? { scale: 1.05 } : {}}
          whileTap={!loading ? { scale: 0.95 } : {}}
          className={`w-full mt-6 px-6 py-3 rounded-lg font-semibold text-lg shadow-md transition-all ${
            loading
              ? "bg-gray-600 cursor-not-allowed"
              : "bg-red-600 hover:bg-red-700 text-white"
          }`}
          type="submit"
          disabled={loading}
        >
          {loading ? "Generating..." : "Defend This!"}
        </motion.button>
      </form>

      {/* Error Message */}
      {error && <p className="mt-4 text-red-400">{error}</p>}

      {/* Response Output */}
      {response && (
        <motion.div
          className="mt-6 w-full max-w-2xl p-6 bg-gray-900 border border-red-600 rounded-2xl shadow-lg"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-red-400 font-bold">Your Defense:</p>
          <p className="text-white mt-2">{response}</p>
        </motion.div>
      )}
    </div>
  );
}
