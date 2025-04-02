from flask import Blueprint, request, jsonify, current_app
import os
import logging
from datetime import datetime
from werkzeug.utils import secure_filename
from flask_mail import Message

from models import db, House, HouseImage, PropertyBooking, AgentHouse, AgentHouseImage, Agent
from schemas import house_schema, Property_Booking_Schema, agent_schema, Agent_house_schema, Agent_house_image_schema
from utils import allowed_file, is_valid_email

main_bp = Blueprint('main', __name__)

@main_bp.route('/send_email', methods=["POST"])
def send_email():
    data = request.get_json()
    if not all(k in data for k in ('name', 'email', 'subject', 'message')):
        return jsonify({"error": "Missing required fields"}), 400

    name = data['name']
    email = data['email']
    subject = data['subject']
    message = data['message']

    if not is_valid_email(email):
        return jsonify({"error": "Invalid email format"}), 400

    msg = Message(
        subject=subject,
        sender=current_app.config['MAIL_DEFAULT_SENDER'],
        recipients=[email]
    )
    msg.body = f"Message from {name} ({email}):\n\n{message}"

    try:
        current_app.extensions['mail'].send(msg)
        logging.info(f"Email sent successfully to {email}")
        return jsonify({"message": "Email sent successfully"}), 200
    except Exception as e:
        logging.error(f"Error sending email: {str(e)}")
        return jsonify({"error": "Failed to send email", "details": str(e)}), 500

@main_bp.route('/addLuxuryHouse', methods=['POST'])
def upload_luxury_house():
    try:
        form = request.form

        new_house = House(
            houseType=form['houseType'],
            district=form['district'].lower(),
            address=form['address'],
            no_of_rooms=form['no_of_rooms'],
            no_of_bathrooms=form['no_of_bathrooms'],
            land_size=form['land_size'],
            distance=form['distance'],
            storey=form['storey'],
            keyWord=form['keyWord'],
            description=form['description'],
            price=form['price'],
            lat=form['lat'],
            lng=form['lng']
        )

        db.session.add(new_house)
        db.session.commit()

        # Handle images
        image_filenames = []
        upload_folder = current_app.config['UPLOAD_FOLDER']
        for i in range(1, 7):
            image_file = request.files.get(f'image{i}')
            if image_file and allowed_file(image_file.filename):
                filename = secure_filename(image_file.filename)
                image_file.save(os.path.join(upload_folder, filename))
                image_filenames.append(filename)
            else:
                image_filenames.append(None)

        new_image = HouseImage(
            image1=image_filenames[0],
            image2=image_filenames[1],
            image3=image_filenames[2],
            image4=image_filenames[3],
            image5=image_filenames[4],
            image6=image_filenames[5],
            house=new_house
        )
        db.session.add(new_image)
        db.session.commit()

        return jsonify({"message": "Luxury house added successfully"}), 200
    except Exception as e:
        current_app.logger.error(f"Error occurred: {e}")
        return jsonify({"error": str(e)}), 500
