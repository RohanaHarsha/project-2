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


 
