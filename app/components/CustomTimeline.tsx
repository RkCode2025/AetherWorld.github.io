"use client";
import React, { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { HistoricalEvent } from "./types";

const Timeline: React.FC<{ events?: HistoricalEvent[] }> = ({ events = [] }) => {
  const [selectedEvent, setSelectedEvent] = useState<number | null>(null);

  // Close the expanded box when clicking outside
  const handleClickOutside = useCallback((event: MouseEvent) => {
    if (!(event.target as HTMLElement).closest(".timeline-event")) {
      setSelectedEvent(null);
    }
  }, []);

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [handleClickOutside]);

  // Reusable styles
  const eventBoxStyles = `
    bg-gray-800 text-white px-6 py-4 rounded-xl shadow-lg cursor-pointer
    transition-all duration-300 hover:bg-purple-600 hover:scale-110
  `;

  const expandedBoxStyles = `
    absolute bg-gray-900 text-white p-6 rounded-xl shadow-lg z-10 border border-purple-500 w-96 max-w-lg
  `;

  return (
    <div className="relative w-full overflow-x-auto py-12 px-0 overflow-visible">
      {/* Timeline Line - Fixed to extend fully */}
      <div className="absolute top-1/2 left-0 right-0 h-1 bg-purple-600 transform -translate-y-1/2"></div>

      {/* Masking elements to hide the purple line on both ends */}
      <div className="absolute top-0 left-0 w-16 h-full bg-gradient-to-r from-gray-950 to-transparent z-10"></div>
      <div className="absolute top-0 right-0 w-16 h-full bg-gradient-to-l from-gray-950 to-transparent z-10"></div>

      {/* Timeline Events */}
      <div className="flex items-center justify-start w-full relative space-x-8 pl-16 min-w-max">
        {events.slice(0, 6).map((event, index) => (
          <motion.div
            key={index}
            className="relative flex flex-col items-center timeline-event"
            aria-expanded={selectedEvent === index}
          >
            {/* Timeline Event Box */}
            <motion.div
              className={`${eventBoxStyles} ${
                selectedEvent === index ? "bg-purple-700 scale-110" : ""
              }`}
              onClick={(e) => {
                e.stopPropagation();
                setSelectedEvent(selectedEvent === index ? null : index);
              }}
              animate={selectedEvent === index ? { scale: 1.1 } : { scale: 1 }}
              aria-label={`Event: ${event.year}, ${event.shortDescription}`}
            >
              <h3 className="text-lg font-bold text-center">{event.year}</h3>
              <p className="text-sm text-center">{event.shortDescription}</p>
            </motion.div>

            {/* Expanded Event Details */}
            {selectedEvent === index && (
              <motion.div
                className={expandedBoxStyles}
                style={{ top: "100%", left: "50%", transform: "translateX(-50%)" }}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                role="tooltip"
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

export default Timeline;

