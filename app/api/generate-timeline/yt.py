from flask import Flask, request, jsonify
from flask_cors import CORS  
import google.generativeai as genai
import os
from dotenv import load_dotenv  # Import dotenv

# Specify the full path to .env.local
DOTENV_PATH = r"C:\Users\pc\Documents\python projects\my-next-app\.env.local"

# Load environment variables from .env.local
load_dotenv(dotenv_path=DOTENV_PATH)

# Get API Key from environment
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY2")

# Ensure API key is set
if not GEMINI_API_KEY:
    raise ValueError("⚠️ GEMINI_API_KEY is missing! Check .env.local.")

# Configure Gemini API
genai.configure(api_key=GEMINI_API_KEY)
model = genai.GenerativeModel("gemini-1.5-flash")

app = Flask(__name__)
CORS(app)

style_prompts = 'Give a very realistic and believable excuse for this situation:'

@app.route("/generate-excuse", methods=["POST"])
def make_excuse():
    try:
        data = request.json
        prompt = data.get("situation")

        if not prompt:
            return jsonify({"error": "Missing required field: 'situation'"}), 400

        ai_prompt = f"{style_prompts} {prompt} (Make it absurd but very realistic.)"

        # Generate response using Gemini
        response = model.generate_content(ai_prompt)

        # Handle response errors
        if not response.candidates:
            return jsonify({"error": "Invalid API response structure."}), 500

        # Extract the generated excuse
        generated_excuse = response.candidates[0].content.parts[0].text
        return jsonify({"excuse": generated_excuse})

    except Exception as e:
        return jsonify({"error": f"An error occurred: {str(e)}"}), 500

if __name__ == "__main__":
    print("🚀 Starting Flask server at http://127.0.0.1:5000/")
    app.run(debug=True)
