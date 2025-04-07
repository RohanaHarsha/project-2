import os
import bcrypt
from flask import Blueprint, Flask, jsonify, request
from models import Agent, AgentHouse, AgentHouseImage, db
from schemas import  agent_schema
from flask_bcrypt import Bcrypt
import re
import logging
from datetime import datetime, time
from flask_mail import Mail, Message
from config import Config
from werkzeug.utils import secure_filename


agent_bp = Blueprint('agent',__name__)
bcrypt = Bcrypt()



@agent_bp.route('/addAgentHouse', methods=['POST'])
def upload_Agent_House():
    try:
        # Retrieve form data
        houseType = request.form['house_type']
        district = request.form['district'].lower()
        address = request.form['address']
        no_of_rooms = request.form['no_of_rooms']
        no_of_bathrooms = request.form['no_of_bathrooms']
        land_size = request.form['land_size']
        distance = request.form['distance']
        storey = request.form['storey']
        keyWord = request.form['keyWord']
        description = request.form['description']
        agentId = str(request.form['agentId'])
        agentEmail = request.form['agentEmail']
        lng = request.form['lng']
        lat = str(request.form['lat'])
        price = request.form['price']

        # Create new AgentHouse object
        new_Agent_house = AgentHouse(
            houseType=houseType, district=district, address=address,
            no_of_rooms=no_of_rooms, no_of_bathrooms=no_of_bathrooms,
            land_size=land_size, distance=distance, storey=storey,
            keyWord=keyWord, description=description, agentId=agentId,agentEmail=agentEmail, lng=lng, lat=lat, price=price
        )

        # Add new house to session and commit to database
        db.session.add(new_Agent_house)
        db.session.commit()

        # Handle images
        image_filenames = []
        for i in range(1, 7):
            image_field = f'image{i}'
            image_file = request.files.get(image_field)

            if image_file and image_file.filename != 'null':  # Ignore 'null' or missing images
                filename = secure_filename(image_file.filename)
                image_file.save(os.path.join(Config.UPLOAD_FOLDER, filename))
                image_filenames.append(filename)
            else:
                image_filenames.append(None)  # Append None for missing images

        # Create new AgentHouseImage object and link it to the newly created AgentHouse
        new_image = AgentHouseImage(
            image1=image_filenames[0], image2=image_filenames[1],
            image3=image_filenames[2], image4=image_filenames[3],
            image5=image_filenames[4], image6=image_filenames[5],
            house=new_Agent_house
        )

        # Add new image to session and commit to database
        db.session.add(new_image)
        db.session.commit()

        return jsonify({'message': 'Successfully uploaded', 'status': 'success'}), 201

    except Exception as e:
        print(f"Error: {e}")  # Debugging to see the exact error
        db.session.rollback()  # Roll back the session in case of an error
        #return jsonify({'error': str(e), 'status': 'fail'}), 500



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