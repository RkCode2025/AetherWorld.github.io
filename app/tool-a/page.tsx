"use client";
import React, { useState, useRef } from "react";
import Timeline from "../components/timeline";
import { HistoricalEvent } from "../components/types";
import { motion } from "framer-motion";
import html2canvas from "html2canvas";

export default function TimelinePage() {
  const [prompt, setPrompt] = useState<string>("");
  const [events, setEvents] = useState<HistoricalEvent[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const timelineRef = useRef<HTMLDivElement | null>(null);

  const handleGenerateTimeline = async () => {
    if (!prompt.trim()) {
      setError("Please enter a scenario.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/generate-timeline", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tool: "timeline-divergence", prompt }),
      });

      if (!response.ok) throw new Error("Failed to generate timeline.");

      const data = await response.json();
      setEvents(data.timeline);
    } catch (error) {
      console.error("❌ Error generating timeline:", error);
      setError("Failed to generate timeline. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const downloadTimeline = async () => {
    if (!timelineRef.current) return;

    setTimeout(async () => {
      const canvas = await html2canvas(timelineRef.current as HTMLElement, {
        scale: 2,
        useCORS: true,
      });
      const link = document.createElement("a");
      link.href = canvas.toDataURL("image/jpeg");
      link.download = "timeline.jpg";
      link.click();
    }, 500);
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white py-10 flex flex-col items-center px-6">
      {/* Title */}
      <motion.h1
        className="text-5xl font-extrabold text-purple-500 mb-6 text-center"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Timeline Divergence
      </motion.h1>
      <p className="text-lg text-gray-400 text-center mb-8">
        Explore alternate histories and discover what could have been.
      </p>

      {/* Input Section */}
      <div className="w-full max-w-2xl bg-gray-900 p-6 rounded-2xl shadow-lg border border-purple-600">
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Enter a scenario (e.g., What if Rome never fell?)"
          className="w-full px-6 py-4 rounded-lg bg-gray-800 text-white text-lg 
                     border border-gray-700 placeholder-gray-400
                     focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-all"
        />

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleGenerateTimeline}
          disabled={loading}
          className="w-full mt-5 bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg 
                     font-semibold text-lg shadow-md transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Generating..." : "Generate Timeline"}
        </motion.button>
      </div>

      {/* Error Message */}
      {error && (
        <motion.p
          className="text-red-500 text-center mt-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {error}
        </motion.p>
      )}

      {/* Timeline Display */}
      {events.length > 0 && (
        <motion.div
          className="mt-8 w-full"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="w-full overflow-x-auto" ref={timelineRef}>
            <div className="min-w-max flex justify-center">
              <Timeline events={events} />
            </div>
          </div>
        </motion.div>
      )}

      {/* Download Button */}
      {events.length > 0 && (
        <button
          onClick={downloadTimeline}
          className="mt-6 px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600"
        >
          Download Timeline
        </button>
      )}
    </div>
  );
}
