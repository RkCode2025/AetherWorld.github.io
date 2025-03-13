from flask import Flask, request, jsonify
from flask_cors import CORS  
import os
import requests
from dotenv import load_dotenv  # Import dotenv

# Load environment variables from .env.local
DOTENV_PATH = r"C:\Users\pc\Documents\python projects\my-next-app\.env.local"
load_dotenv(dotenv_path=DOTENV_PATH)

# Get API key from environment
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY2")

if not GEMINI_API_KEY:
    raise ValueError("⚠️ GEMINI_API_KEY is missing! Check .env.local.")

GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent"

STYLE_PROMPTS = {
    "Default": "",
    "Shakespearean English": "Rewrite this text in the style of William Shakespeare:",
    "Cyberpunk/Futuristic Tone": "Write this in a cyberpunk futuristic tone:",
    "Old-School Medieval Speech": "Express this idea in medieval English:",
    "Meme or Gen-Z Lingo": "Convert this into meme-style Gen Z slang:",
    "Philosopher Style": "Rewrite this as if a deep philosopher were explaining it:",
}

app = Flask(__name__)
CORS(app)  

@app.route("/generate-unsummary", methods=["POST"])
def generate_unsummary():
    try:
        data = request.json
        prompt = data.get("prompt")
        style = data.get("style")
        word_count = data.get("wordCount")

        if not prompt or not style or not word_count:
            return jsonify({"error": "Missing required fields: 'prompt', 'style', and 'wordCount' are required."}), 400

        if word_count < 50 or word_count > 1000:
            return jsonify({"error": "Word count must be between 50 and 1000."}), 400

        style_prompt = STYLE_PROMPTS.get(style, "")
        ai_prompt = f"{style_prompt} {prompt} (Expand to {word_count} words.)"

        response = requests.post(
            f"{GEMINI_API_URL}?key={GEMINI_API_KEY}",
            headers={"Content-Type": "application/json"},
            json={"contents": [{"parts": [{"text": ai_prompt}]}]},
        )

        if response.status_code != 200:
            return jsonify({"error": f"API request failed with status {response.status_code}: {response.text}"}), 500

        response_data = response.json()
        candidates = response_data.get("candidates", [])
        
        if not candidates or not candidates[0].get("content", {}).get("parts"):
            return jsonify({"error": "Invalid API response structure."}), 500

        generated_text = candidates[0]["content"]["parts"][0]["text"]
        return jsonify({"result": generated_text})

    except Exception as e:
        return jsonify({"error": f"An error occurred: {str(e)}"}), 500

if __name__ == "__main__":
    print("🚀 Starting Flask server at http://127.0.0.1:5000/")
    app.run(debug=True)
