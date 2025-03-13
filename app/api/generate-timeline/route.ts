import { NextRequest, NextResponse } from "next/server";
import { HistoricalEvent } from "../../components/types";

// Helper function to add delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// Function to generate event descriptions using Gemini API
const generateEventDescription = async (
  prompt: string,
  previousEvents: HistoricalEvent[] = []
): Promise<{ year: string; shortDescription: string; longDescription: string }> => {
  try {
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`;


    const fullPrompt = `Create an alternate historical event involving: ${prompt}. 
    The event should be unique and evolve over time and not similar to the following events: ${previousEvents.map(e => e.shortDescription).join(", ")}.
    Format: Return only JSON with year (a historically plausible year), shortDescription (one sentence, max 10 words), and longDescription (two sentences, max 20 words each).`;

    const response = await fetch(apiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: fullPrompt }] }],
      }),
    });

    console.log("API Response Status:", response.status);
    const eventResponseText = await response.text();
    console.log("API Response Text:", eventResponseText);

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error("API endpoint not found. Please check the URL.");
      } else if (response.status === 401) {
        throw new Error("Unauthorized. Please check your API key.");
      } else {
        throw new Error(`API request failed with status ${response.status}: ${eventResponseText}`);
      }
    }

    if (eventResponseText.trim().startsWith("<!DOCTYPE html>")) {
      throw new Error("API returned an HTML error page. Please check the API URL and key.");
    }

    const data = JSON.parse(eventResponseText);
    console.log("🔍 Timeline Divergence API Response:", data);

    if (!data.candidates || !data.candidates[0]?.content?.parts?.[0]?.text) {
      throw new Error("Invalid API response structure.");
    }

    const responseText = data.candidates[0].content.parts[0].text;
    const cleanedResponse = responseText.replace(/```json/g, "").replace(/```/g, "").trim();
    const eventData = JSON.parse(cleanedResponse);

    return {
      year: eventData.year,
      shortDescription: eventData.shortDescription,
      longDescription: eventData.longDescription,
    };
  } catch (error) {
    console.error("❌ Error generating event description:", error);
    throw new Error("Failed to generate event description.");
  }
};

// Function to generate a timeline with relevant years
const generateTimeline = async (prompt: string): Promise<HistoricalEvent[]> => {
  const events: HistoricalEvent[] = [];
  for (let i = 0; i < 6; i++) {
    try {
      await delay(1000); // Add delay to avoid rate limits
      const event = await generateEventDescription(prompt, events);
      events.push({
        year: event.year,
        shortDescription: event.shortDescription,
        longDescription: event.longDescription,
      });
    } catch (error) {
      console.error("❌ Error generating event:", error);
    }
  }
  events.sort((a, b) => parseInt(a.year) - parseInt(b.year));
  return events;
};

// API route handler
export async function POST(req: NextRequest) {
  try {
    const requestData = await req.json();
    console.log("📥 Received API request:", requestData);

    const { tool, prompt } = requestData;

    if (!tool || !prompt) {
      return NextResponse.json({ error: "❌ Missing required fields: 'tool' and 'prompt' are required." }, { status: 400 });
    }

    if (tool === "timeline-divergence") {
      const generatedTimeline = await generateTimeline(prompt);
      return NextResponse.json({ timeline: generatedTimeline });
    }

    return NextResponse.json({ error: "❌ Invalid tool specified." }, { status: 400 });
  } catch (error) {
    console.error("❌ API Error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}