from flask import Blueprint, jsonify, request, session, redirect, url_for
from flask_cors import CORS
from models import House, PropertyBooking, db
from schemas import Property_Booking_Schema, banner_schema
from datetime import datetime, time
from flask_mail import Mail, Message

booking_bp = Blueprint('booking' , __name__)


@booking_bp.route('/bookings', methods=['GET'])
def get_bookings():
    try:
        # Retrieve all bookings
        all_bookings = PropertyBooking.query.all()
        results = Property_Booking_Schema.dump(all_bookings)
        return jsonify(results), 200
    except Exception as e:
        return jsonify({"error": str(e), "status": "fail"}), 500

@booking_bp.route('/addBooking', methods=['POST','OPTIONS'])
def add_booking():
    try:
        # Extract data from the request
        data = request.json

        # Validate the incoming data
        required_fields = ['house_id', 'user_id', 'booking_date', 'booking_time']
        for field in required_fields:
            if field not in data:
                return jsonify({"error": f"{field} is required", "status": "fail"}), 400

        # Convert booking_date and booking_time to appropriate types
        booking_date = datetime.strptime(data['booking_date'], "%Y-%m-%d").date()
        booking_time = datetime.strptime(data['booking_time'], "%H:%M:%S").time()

        # Check if the user has already booked the same house before (ignore date and time)
        existing_booking = PropertyBooking.query.filter_by(
            house_id=data['house_id'],
            user_id=data['user_id']
        ).first()

        if existing_booking:
            return jsonify({
                "error": "You have already booked this house.",
                "status": "fail"
            }), 400

        # Create a new booking
        new_booking = PropertyBooking(
            house_id=data['house_id'],
            user_id=data['user_id'],
            booking_date=booking_date,
            booking_time=booking_time,
            status="Pending"
        )

        # Add the booking to the database
        db.session.add(new_booking)
        db.session.commit()

        return jsonify({
            "message": "Booking created successfully",
            "booking_id": new_booking.id,
            "status": "success"
        }), 201  # Return the created resource

    except Exception as e:
        db.session.rollback()  # Rollback the session on error
        return jsonify({"error": str(e), "status": "fail"}), 500  # Handle exceptions



@booking_bp.route('/getBookingDetails', methods=['GET'])
def get_booking_details():
    try:
        # Join PropertyBooking with House to get additional house details (houseType and keyWord)
        bookings = db.session.query(
            PropertyBooking.id, 
            PropertyBooking.booking_date, 
            PropertyBooking.booking_time,
            PropertyBooking.status,
            House.houseType,
            House.keyWord
        ).join(House, PropertyBooking.house_id == House.id).all()

        # Serialize the results to JSON
        booking_details = [
            {
                "booking_id": booking.id,
                "booking_date": booking.booking_date.strftime("%Y-%m-%d"),
                "booking_time": booking.booking_time.strftime("%H:%M:%S"),
                "status": booking.status,
                "houseType": booking.houseType,
                "keyWord": booking.keyWord
            } 
            for booking in bookings
        ]

        # Return the booking details as a JSON response
        return jsonify(booking_details), 200

    except Exception as e:
        return jsonify({"error": str(e), "status": "fail"}), 500

@booking_bp.route('/getBookingDetailsByUser/<int:user_id>', methods=['GET'])
def get_booking_details_by_user(user_id):
    try:
        # Query PropertyBooking joined with House, filtered by user_id
        bookings = db.session.query(
            PropertyBooking.id, 
            PropertyBooking.booking_date, 
            PropertyBooking.booking_time,
            PropertyBooking.status,
            House.houseType,
            House.keyWord
        ).join(House, PropertyBooking.house_id == House.id).filter(PropertyBooking.user_id == user_id).all()

        # Serialize the results to JSON
        booking_details = [
            {
                "booking_id": booking.id,
                "booking_date": booking.booking_date.strftime("%Y-%m-%d"),
                "booking_time": booking.booking_time.strftime("%H:%M:%S"),
                "status": booking.status,
                "houseType": booking.houseType,
                "keyWord": booking.keyWord
            } 
            for booking in bookings
        ]

        # Return the booking details as a JSON response
        return jsonify(booking_details), 200

    except Exception as e:
        return jsonify({"error": str(e), "status": "fail"}), 500


@booking_bp.route('/confirmBooking/<int:booking_id>', methods=['POST'])
def confirm_booking(booking_id):
    # Logic to confirm the booking
    # Update booking status to 'Confirmed'
    booking = PropertyBooking.query.get(booking_id)
    if booking:
        booking.status = 'Confirmed'
        db.session.commit()
        return jsonify({'message': 'Booking confirmed successfully!'})
    else:
        return jsonify({'error': 'Booking not found!'}), 404

@booking_bp.route('/deleteBooking/<int:booking_id>', methods=['DELETE'])
def delete_booking(booking_id):
    # Logic to delete the booking
    booking = PropertyBooking.query.get(booking_id)
    if booking:
        db.session.delete(booking)
        db.session.commit()
        return jsonify({'message': 'Booking deleted successfully!'})
    else:
        return jsonify({'error': 'Booking not found!'}), 404