from flask import Flask, jsonify, request
import json, os
from flask_cors import CORS


BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DATA_PATH = os.path.join(BASE_DIR, "dados", "artes.json")

main = Flask(__name__)
CORS(main)

@main.route("/api/register", methods=["POST"])
def register():
    data = request.get_json()
    email = data.get("email", "").strip().lower()
    senha = data.get("senha", "")
    USERS_PATH = os.path.join(BASE_DIR, "dados", "users.json")
    with open(USERS_PATH, "r", encoding="utf-8") as f:
        users = json.load(f)
    for user in users:
        if user["email"] == email:
            return jsonify({"erro": "email já cadastrado"}), 400
    novo_user = {
        "id": len(users) +1,
        "email": email,
        "senha": senha
    }
    users.append(novo_user)

    with open(USERS_PATH, "w", encoding="utf-8") as f:
        json.dump(users, f, ensure_ascii=False, indent=2)
    return jsonify({"sucesso": True})

@main.route("/api/login", methods=["POST"])
def login():
    data = request.get_json()
    email = data.get("email", "").strip().lower()
    senha = data.get("senha", "")
    USERS_PATH = os.path.join(BASE_DIR, "dados", "users.json")
    with open(USERS_PATH, "r", encoding="utf-8") as f:
        users = json.load(f)
    user = next((u for u in users if u["email"] == email), None)
    if not user:
        return jsonify({"erro": "email não cadastrado"}), 404
    if user["senha"] != senha:
        return jsonify({"erro": "Credenciais invalidas"}), 401
    
    return jsonify({"login": True, "userId": user["id"]})

@main.route("/api/artes", methods=["GET"])
def get_artes():
    with open(DATA_PATH, "r", encoding="utf=8") as file:
        artes = json.load(file)
    return jsonify(artes)

if __name__ == "__main__":
    main.run(debug=True)