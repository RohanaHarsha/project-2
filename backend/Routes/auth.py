from flask import Blueprint, jsonify, request, session

#import os
#from werkzeug.utils import secure_filename
#from flask_marshmallow import Marshmallow
#from flask_cors import CORS
from models import db, User,Agent, Admin, Customer
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
        role = request.json.get("role")

        # Check for a valid role
        if role not in VALID_ROLES:
            return jsonify({"error": "Invalid role", "status": "fail"}), 400
        
        print(role)
        # Query for the appropriate user based on role
        user = None
        username = None  # Default username as None

        if role == 'customer':
            user = Customer.query.filter_by(email=email).first()
            username = user.username if user else None
        elif role == 'agent':
            user = Agent.query.filter_by(email=email).first()
            # Agents do not have usernames
        #elif role == 'user':
            #user = User.query.filter_by(email=email).first()
            #username = user.username if user else None
        elif role == 'user':
            user = Admin.query.filter_by(email=email).first()
            print("HEY",user)
            username = user.username if user else None

        
        
        print("HEY",user,username)
            

        # If the user is not found, return an erro
        if user:
            print(f"Stored Hash: {user}")
    
        if user is None:
            return jsonify({"error": "Email not found", "status": "fail"}), 401
        

        if not bcrypt.check_password_hash(user.password, password):
            return jsonify({"error": "Invalid password", "status": "fail"}), 402

        # Save user ID and email in session
        session["user_id"] = user.id
        session["email"] = user.email

        return jsonify({
            "id": user.id,
            "email": user.email,
            "username": username,  # ✅ This avoids the error for 'agent'
            "role": role,
            "status": "success",
            "user_id": session["user_id"],
            "user_email": session["email"]
        }), 200

    except Exception as e:
        print("ERROR:", str(e))
        return jsonify({"error": str(e), "status": "fail"}), 500

    ##################################################################################

'''@auth_bp.route('/UsersignUp', methods=['POST'])
def UsersignUp():
    try:
        # Retrieve data from the request
        name = request.json.get("name")
        email = request.json.get("email")
        password = request.json.get("password")
        tp = request.json.get("tp")  # TelePhone number
        username = request.json.get("username")

        # Check if user already exists
        user_exists = Customer.query.filter_by(email=email).first() is not None

        if user_exists:
            return jsonify({"error": "Email already exists", "status": "fail"}), 409
        
        # Create new user instance
        hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')
        new_user = Customer(name=name, email=email, TP=tp, username=username, password=hashed_password)

        
        # Add new user to the session and commit to the database
        db.session.add(new_user)
        db.session.commit()
        
        # Optionally, store user ID in session (if you want to manage sessions)
        session["user_id"] = new_user.id
        
        return jsonify({
            "id": new_user.id,
            "email": new_user.email,
            "status": "success"
        }), 201

    except Exception as e:
        print(e)  # Log the exception for debugging purposes
        return jsonify({"error": "An error occurred during sign up", "status": "fail"}), 500
    

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
        db.session.rollback()
        return jsonify({"error": str(e), "status": "fail"}), 500'''