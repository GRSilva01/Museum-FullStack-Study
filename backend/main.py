from flask import Flask, jsonify
import json, os
from flask_cors import CORS


BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DATA_PATH = os.path.join(BASE_DIR, "dados", "artes.json")

main = Flask(__name__)
CORS(main)

@main.route("/api/artes", methods=["GET"])
def get_artes():
    with open(DATA_PATH, "r", encoding="utf=8") as file:
        artes = json.load(file)
    return jsonify(artes)

if __name__ == "__main__":
    main.run(debug=True)