// components/ParentComponent.tsx
"use client";
import React, { useEffect, useState } from "react";
import Timeline from "../../components/timeline";
import { HistoricalEvent } from "../../components/types";

const ParentComponent = () => {
  const [events, setEvents] = useState<HistoricalEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTimeline = async () => {
      try {
        const response = await fetch("/api/generate-timeline", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ prompt: "ancient civilizations" }),
        });

        if (!response.ok) {
          throw new Error("Failed to fetch timeline");
        }

        const data = await response.json();
        setEvents(data.timeline || []); // Fallback to empty array if timeline is undefined
      } catch (error) {
        console.error("Error fetching timeline:", error);
        setError("Failed to load timeline. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchTimeline();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return <Timeline events={events} />;
};

export default ParentComponent;