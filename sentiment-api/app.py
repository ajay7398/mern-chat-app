from flask import Flask, request, jsonify
from flask_cors import CORS
from transformers import pipeline
import os

app = Flask(__name__)
CORS(app)

# Load model ONCE at startup (VERY IMPORTANT)
sentiment_pipeline = pipeline(
    "sentiment-analysis",
    model="distilbert-base-uncased-finetuned-sst-2-english"
)

@app.route("/health", methods=["GET"])
def health():
    return jsonify({"status": "ok"}), 200


@app.route("/predict", methods=["POST"])
def predict():
    data = request.get_json()

    if not data or "text" not in data:
        return jsonify({"error": "Text field is required"}), 400

    text = data["text"]

    if not isinstance(text, str) or len(text.strip()) == 0:
        return jsonify({"error": "Invalid text"}), 400

    try:
        result = sentiment_pipeline(text)[0]

        response = {
            "label": result["label"],
            "confidence": round(result["score"], 4)
        }

        return jsonify(response), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=int(os.environ.get("PORT", 10000)))

