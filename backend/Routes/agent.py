import bcrypt
from flask import Blueprint, Flask, jsonify, request
from models import Agent, db
from schemas import  agent_schema
from flask_bcrypt import Bcrypt
import re
import logging
from datetime import datetime, time
from flask_mail import Mail, Message


agent_bp = Blueprint('agent',__name__)



@agent_bp.route('/addAgent', methods=['POST'])
def addAgent():
    try:
        # Get JSON data from the request
        data = request.get_json()

        # Print the incoming request data to the terminal
        print("Received data:", data)

        # Check for missing fields
        required_fields = ['name', 'address', 'NIC', 'email', 'TP', 'password']
        for field in required_fields:
            if field not in data:
                return jsonify({'error': f"Missing {field} field", 'status': 'fail'}), 400

        # Extract data
        agent_name = data['name']
        agent_address = data['address']
        agent_nic = data['NIC']
        email = data['email']
        tp = data['TP']
        password = data['password']

        # Hash password
        hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')

        # Create new agent
        new_agent = Agent(name=agent_name, address=agent_address, NIC=agent_nic,
                          email=email, TP=tp, password=hashed_password)

        # Save to database
        db.session.add(new_agent)
        db.session.commit()

        return jsonify({'message': 'Successfully uploaded', 'status': 'success'}), 201

    except KeyError as ke:
        return jsonify({'error': f"Missing key: {str(ke)}", 'status': 'fail'}), 400
    except Exception as e:
        db.session.rollback()
        print(f"Error occurred: {str(e)}")  # Log any errors that occur
        return jsonify({'error': f"Server error: {str(e)}", 'status': 'fail'}), 500

@agent_bp.route('/displayAgents', methods=['GET'])
def displayAgents():
    try:
        all_agents = Agent.query.all()
        results = agent_schema.dump(all_agents)
        return jsonify(results), 200
    except Exception as e:
        return jsonify({"error": str(e), "status": "fail"}), 500

@agent_bp.route('/deleteAgent/<int:id>', methods=['DELETE'])
def delete_agent(id):
    try:
        # Find the agent by ID
        agent = Agent.query.get(id)

        # Check if the agent exists
        if not agent:
            return jsonify({"error": "Agent not found", "status": "fail"}), 404

        # Delete the agent
        db.session.delete(agent)
        db.session.commit()

        return jsonify({"message": "Agent is removed", "status": "success"}), 200

    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e), "status": "fail"}), 500