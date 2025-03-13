// app/components/timeline.tsx
"use client"; // Mark this as a Client Component
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { HistoricalEvent } from "./types"; // Import the HistoricalEvent interface

const AlternateHistoryTimeline: React.FC<{ events?: HistoricalEvent[] }> = ({ events = [] }) => {
  const [selectedEvent, setSelectedEvent] = useState<number | null>(null);

  // Close the expanded box when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!(event.target as HTMLElement).closest(".timeline-event")) {
        setSelectedEvent(null);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <div className="relative w-full overflow-x-auto py-12 px-6">
      {/* Timeline Line */}
      <div className="absolute top-1/2 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-purple-700"></div>

      <div className="flex items-center justify-center w-full relative space-x-24">
        {events.slice(0, 6).map((event, index) => (
          <motion.div
            key={index}
            className="relative flex flex-col items-center timeline-event"
          >
            {/* Timeline Event Box */}
            <motion.div
              className={`relative bg-gray-800 text-white px-6 py-4 rounded-xl shadow-lg cursor-pointer
                         transition-all duration-300 hover:bg-purple-600 hover:scale-110 
                         ${selectedEvent === index ? "bg-purple-700 scale-110" : ""}`}
              onClick={(e) => {
                e.stopPropagation(); // Prevent closing when clicking the box
                setSelectedEvent(selectedEvent === index ? null : index);
              }}
              animate={selectedEvent === index ? { scale: 1.1 } : { scale: 1 }}
            >
              <h3 className="text-lg font-bold text-center">{event.year}</h3>
              <p className="text-sm text-center">{event.shortDescription}</p>
            </motion.div>

            {/* Expanded Event Details */}
            {selectedEvent === index && (
              <motion.div
                className="absolute top-24 w-80 bg-gray-900 text-white p-4 rounded-xl shadow-lg z-10 border border-purple-500"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                <h3 className="text-lg font-bold">{event.year}</h3>
                <p className="text-sm">{event.longDescription}</p>
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default AlternateHistoryTimeline;
