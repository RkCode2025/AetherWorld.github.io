"use client";
import { useState } from "react";
import { motion } from "framer-motion";

const styles: string[] = [
  "Default",
  "Shakespearean English",
  "Cyberpunk/Futuristic Tone",
  "Old-School Medieval Speech",
  "Meme or Gen-Z Lingo",
  "Philosopher Style",
];

export default function ToolB() {
  const [prompt, setPrompt] = useState<string>("");
  const [style, setStyle] = useState<string>(styles[0]);
  const [wordCount, setWordCount] = useState<number>(200);
  const [result, setResult] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const generateText = async () => {
    if (!prompt.trim()) {
      alert("⚠️ Please enter a prompt.");
      return;
    }

    if (wordCount < 50 || wordCount > 1000) {
      alert("⚠️ Word count must be between 50 and 1000.");
      return;
    }

    setLoading(true);
    setResult("");

    const requestBody = {
      prompt,
      style,
      wordCount,
    };

    console.log("📤 Sending API Request with Body:", requestBody);

    try {
      // Call the Flask backend
      const response = await fetch("http://127.0.0.1:5000/generate-unsummary", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestBody),
      });

      const data = await response.json();
      console.log("🔍 Full API Response:", data);

      if (!response.ok) throw new Error(data.error || "Unexpected API error.");

      setResult(data.result || "⚠️ No meaningful response from AI.");
    } catch (error) {
      setResult("❌ Error fetching AI response.");
      console.error(error);
    }

    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white px-6">
      <motion.h1
        className="text-5xl font-extrabold mb-6 text-green-400"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Unsummary AI
      </motion.h1>
      <p className="text-lg text-gray-400 text-center mb-6">
        Transform a short prompt into a long, detailed piece in your chosen style.
      </p>

      <div className="w-full max-w-2xl bg-gray-800 p-6 rounded-2xl shadow-lg">
        {/* Prompt Input */}
        <textarea
          className="w-full p-4 h-32 rounded-lg bg-gray-700 border border-gray-600 text-white
                     focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all"
          placeholder="Enter a short prompt..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />

        {/* Style & Word Count Container */}
        <div className="flex flex-col md:flex-row gap-4 mt-4">
          {/* Style Selection */}
          <select
            className="w-full md:w-1/2 p-3 rounded-lg bg-gray-700 border border-gray-600 text-white 
                       cursor-pointer focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
            value={style}
            onChange={(e) => setStyle(e.target.value)}
          >
            {styles.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>

          {/* Word Count */}
          <input
            type="number"
            className="w-full md:w-1/2 p-3 rounded-lg bg-gray-700 border border-gray-600 text-white 
                       focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
            value={wordCount}
            min={50}
            max={1000}
            onChange={(e) => setWordCount(Number(e.target.value))}
          />
        </div>

        {/* Generate Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-full mt-5 bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg 
                     font-semibold text-lg shadow-md transition-all"
          onClick={generateText}
          disabled={loading}
        >
          {loading ? "Generating..." : "Generate Text"}
        </motion.button>
      </div>

      {/* Result Display */}
      {result && (
        <motion.div
          className="mt-6 w-full max-w-2xl p-6 bg-gray-800 border border-green-500 rounded-2xl shadow-lg"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-lg">{result}</p>
        </motion.div>
      )}
    </div>
  );
}