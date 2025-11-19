from flask import Blueprint, jsonify, request, session

#import os
#from werkzeug.utils import secure_filename
#from flask_marshmallow import Marshmallow
#from flask_cors import CORS
from models import db,Agent, Admin, Customer, User
#from schemas import admin_schema, agent_schema, customer_schema,
from flask_bcrypt import Bcrypt
#import re
#import logging
#from datetime import datetime, time
#from flask_mail import Mail, Message



auth_bp = Blueprint("auth", __name__)
bcrypt = Bcrypt()


VALID_ROLES = {'admin', 'agent', 'user','customer'}


@auth_bp.route('/login', methods=['POST'])
def login_user():
    try:
        email = request.json.get("email")
        password = request.json.get("password")

        if not email or not password:
            return jsonify({"error": "Email and password required", "status": "fail"}), 400

        # Search in all user tables
        user = (
            Admin.query.filter_by(email=email).first()
            or Agent.query.filter_by(email=email).first()
            or Customer.query.filter_by(email=email).first()
        )

        if not user:
            return jsonify({"error": "User not found", "status": "fail"}), 404

        # DB must store hashed passwords, adjust accordingly
        if not bcrypt.check_password_hash(user.password, password):
            return jsonify({"error": "Invalid credentials", "status": "fail"}), 401

        # 🔥 Role is coming from the DB — no role from request
        role = getattr(user, "role", None)
        username = getattr(user, "username", None)

        return jsonify({
            "message": "Login successful",
            "username": username,
            "role": role,
            "status": "success"
        }), 200

    except Exception as e:
        print(str(e))
        return jsonify({"error": "Server error", "status": "fail"}), 500







@auth_bp.route('/UsersignUp', methods=['POST'])
def UsersignUp():
    try:
        email = request.json.get("email")
        password = request.json.get("password")

        if not email or not password:
            return jsonify({"error": "Email and password required", "status": "fail"}), 400

        # Search in all user tables
        user = (
            Admin.query.filter_by(email=email).first()
            or Agent.query.filter_by(email=email).first()
            or Customer.query.filter_by(email=email).first()
        )

        if not user:
            return jsonify({"error": "User not found", "status": "fail"}), 404

        # DB must store hashed passwords, adjust accordingly
        if not bcrypt.check_password_hash(user.password, password):
            return jsonify({"error": "Invalid credentials", "status": "fail"}), 401

        # 🔥 Role is coming from the DB — no role from request
        role = getattr(user, "role", None)
        username = getattr(user, "username", None)

        return jsonify({
            "message": "Login successful",
            "username": username,
            "role": role,
            "status": "success"
        }), 200

    except Exception as e:
        print(str(e))
        return jsonify({"error": "Server error", "status": "fail"}), 500


@auth_bp.route('/signUp', methods=['POST'])
def signUp():
    try:
     
        email = request.json["email"]
        password = request.json["password"]
        username = request.json["username"]

        user_exists = User.query.filter_by(email=email).first() is not None

        if user_exists:
            return jsonify({"error": "Email already exists", "status": "fail"}), 409
        
        hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')
        new_user = User(email=email, password=hashed_password, username=username)
        db.session.add(new_user)
        db.session.commit()
        
        session["user_id"] = new_user.id
        
        return jsonify({
            "id": new_user.id,
            "email": new_user.email,
            "name": new_user.username,
            "status": "success"
        }), 201

    except Exception as e:
        return "An internal error has occurred!"