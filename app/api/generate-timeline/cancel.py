from flask import Flask, jsonify, request
from flask_cors import CORS  
import os
import requests
from dotenv import load_dotenv  # Import dotenv

# Load environment variables from .env.local
DOTENV_PATH = r"C:\Users\pc\Documents\python projects\my-next-app\.env.local"
load_dotenv(dotenv_path=DOTENV_PATH)

# Get API key from environment
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

if not GEMINI_API_KEY:
    raise ValueError("⚠️ GEMINI_API_KEY is missing! Check .env.local.")

GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent"

DEFENSE_STYLES = {
    "Serious Defense": "Defend this topic with well-reasoned, logical arguments:",
    "Humorous Reversal": "Make a funny, satirical defense of this situation:",
    "Historical Context": "Compare this controversy with a similar event from history and explain the similarities:",
    "Devil's Advocate": "Play devil's advocate and provide a counterargument defending this issue:",
}

app = Flask(__name__)
CORS(app)  

@app.route("/reverse-cancel", methods=["POST"])
def reverse_cancel():
    try:
        data = request.json
        topic = data.get("topic")
        style = data.get("style")
        word_count = data.get("wordCount")

        if not topic or not style or not word_count:
            return jsonify({"error": "Missing required fields: 'topic', 'style', and 'wordCount' are required."}), 400

        if not isinstance(word_count, int) or word_count < 50 or word_count > 1000:
            return jsonify({"error": "Invalid word count. It must be between 50 and 1000 words."}), 400

        style_prompt = DEFENSE_STYLES.get(style, "Defend this controversial topic:")
        ai_prompt = (
            f"{style_prompt} {topic} (Make it persuasive and compelling.)\n\n"
            f"Ensure the response is approximately {word_count} words."
        )

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
        
        # Ensure the response length is within the specified word count range
        actual_word_count = len(generated_text.split())
        if actual_word_count < 0.8 * word_count or actual_word_count > 1.2 * word_count:
            return jsonify({"error": f"Response length ({actual_word_count} words) is outside the acceptable range."}), 400

        return jsonify({"defense": generated_text, "word_count": actual_word_count})

    except Exception as e:
        return jsonify({"error": f"An error occurred: {str(e)}"}), 500

if __name__ == "__main__":
    print("🚀 Reverse Cancel AI running at http://127.0.0.1:5000/")
    app.run(debug=True)