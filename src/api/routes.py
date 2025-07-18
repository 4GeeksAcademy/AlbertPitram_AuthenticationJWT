from flask import Blueprint, request, jsonify
from flask_cors import CORS
from flask_jwt_extended import (
    create_access_token,
    jwt_required,
    get_jwt_identity
)
from api.models import db, User

api = Blueprint('api', __name__)
CORS(api)

@api.route('/hello', methods=['GET', 'POST'])
def handle_hello():
    response_body = {
        "message": "Hello, hire me future HR from a cool Tech company."
    }
    return jsonify(response_body), 200

@api.route('/signup', methods=['POST'])
def signup():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    if not email or not password:
        return jsonify({"msg": "Falten dades"}), 400

    if User.query.filter_by(email=email).first():
        return jsonify({"msg": "Usuari ja existeix"}), 400

    user = User(email=email)
    user.set_password(password)
    user.is_active = True

    db.session.add(user)
    db.session.commit()

    return jsonify({"msg": "Usuari creat correctament"}), 201

@api.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    if not email or not password:
        return jsonify({"msg": "Falten dades"}), 400

    user = User.query.filter_by(email=email).first()
    if not user or not user.check_password(password):
        return jsonify({"msg": "Credencials incorrectes"}), 401

    access_token = create_access_token(identity=user.id)
    return jsonify(access_token=access_token, email=user.email), 200

@api.route('/private', methods=['GET'])
@jwt_required()
def private():
    user_id = get_jwt_identity()
    user = User.query.get(user_id)
    return jsonify({"msg": f"Hola, usuari {user.email}, estàs autenticat!"})
