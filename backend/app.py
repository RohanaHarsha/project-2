'''from flask import Flask, jsonify, request, session, redirect, url_for
import os
from werkzeug.utils import secure_filename
from flask_marshmallow import Marshmallow
from flask_cors import CORS
from models import db, Banner, House, HouseImage, User, Hotel, HotelImage, Agent, Admin, Customer, AgentHouse, AgentHouseImage,PropertyBooking
from schemas import banner_schema, house_schema, house_image_schema, hotel_schema, hotel_image_schema, agent_schema, customer_schema, Agent_house_schema, Agent_house_image_schema,Property_Booking_Schema
from flask_bcrypt import Bcrypt
import re
import logging
from datetime import datetime, time
from flask_mail import Mail, Message
from Routes.banner import banner_bp
from Routes.agent import agent_bp
from Routes.hotel import hotel_bp
from Routes.auth import auth_bp


app = Flask(__name__)
CORS(app, supports_credentials=True)


# Database configuration
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///flaskdb.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SECRET_KEY'] = 'DaffodilZone'
VALID_ROLES = {'admin', 'agent', 'user','customer'}

# Email server configuration (Use environment variables)
app.config['MAIL_SERVER'] = 'smtp.gmail.com'
app.config['MAIL_PORT'] = 465
app.config['MAIL_USERNAME'] = os.getenv('MAIL_USERNAME', 'tharindahasaranga99@gmail.com')
app.config['MAIL_PASSWORD'] = os.getenv('MAIL_PASSWORD', 'pdvo biul qxtm esvz')
app.config['MAIL_USE_TLS'] = False
app.config['MAIL_USE_SSL'] = True

# Ensure default sender is properly configured
if app.config['MAIL_USERNAME']:
    app.config['MAIL_DEFAULT_SENDER'] = app.config['MAIL_USERNAME']
else:
    logging.error("MAIL_USERNAME is not set. Please check your environment variables.")

# Create email instance
mail = Mail(app)

# Initialize the database and other extensions
db.init_app(app)
bcrypt = Bcrypt(app)

with app.app_context():
    db.create_all()

UPLOAD_FOLDER = 'static/uploads'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024

ALLOWED_EXTENSIONS = {'txt', 'pdf', 'png', 'jpg', 'jpeg', 'gif', 'jfif'}

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

# Email validation function
def is_valid_email(email):
    """Check if the email format is valid."""
    return re.match(r"[^@]+@[^@]+\.[^@]+", email) is not None


#bluprints 
app.register_blueprint(banner_bp, url_prefix="/banner")
app.register_blueprint(agent_bp, url_prefix="/agent")
app.register_blueprint(hotel_bp, url_prefix="/hotels")
app.register_blueprint(auth_bp, url_prefix="/auth")


# Make routes
@app.route('/send_email', methods=["POST"])
def send_email():
    try:
        # Get the JSON data from the request
        data = request.get_json()

        # Ensure all required fields are present
        if not all(k in data for k in ('name', 'email', 'subject', 'message')):
            return jsonify({"error": "Missing required fields"}), 400

        # Extract fields
        name = data['name']
        email = data['email']
        subject = data['subject']
        message = data['message']

        # Validate email format
        if not is_valid_email(email):
            return jsonify({"error": "Invalid email format"}), 400

        # Create the email message
        msg = Message(subject=subject,
                      sender=app.config['MAIL_DEFAULT_SENDER'],  # Use default sender
                      recipients=[email])  # Ensure recipients is a list

        # Include user's email and name in the body of the email
        msg.body = f"Message from {name} ({email}):\n\n{message}"

        # Send email
        mail.send(msg)
        logging.info(f"Email sent successfully to {email}")
        return jsonify({"message": "Email sent successfully"}), 200

    except Exception as e:
        logging.error(f"Error sending email: {str(e)}")
        return jsonify({"error": "Failed to send email", "details": str(e)}), 500

if __name__ == '__main__':import os

class Config:
    SQLALCHEMY_DATABASE_URI = 'sqlite:///flaskdb.db'
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SECRET_KEY = 'DaffodilZone'
    MAIL_SERVER = 'smtp.gmail.com'
    MAIL_PORT = 465
    MAIL_USERNAME = os.getenv('MAIL_USERNAME', 'tharindahasaranga99@gmail.com')
    MAIL_PASSWORD = os.getenv('MAIL_PASSWORD', 'pdvo biul qxtm esvz')
    MAIL_USE_TLS = False
    MAIL_USE_SSL = True
    UPLOAD_FOLDER = 'static/uploads'
    MAX_CONTENT_LENGTH = 16 * 1024 * 1024
    app.run(debug=True)

#############
@app.route('/addLuxuryHouse', methods=['POST'])
def upload_luxury_house():
    try:
        # Print the form data for debugging
        print("Form Data:")
        print(f"houseType: {request.form['houseType']}")
        print(f"district: {request.form['district'].lower()}")
        print(f"address: {request.form['address']}")
        print(f"no_of_rooms: {request.form['no_of_rooms']}")
        print(f"no_of_bathrooms: {request.form['no_of_bathrooms']}")
        print(f"land_size: {request.form['land_size']}")
        print(f"distance: {request.form['distance']}")
        print(f"storey: {request.form['storey']}")
        print(f"keyWord: {request.form['keyWord']}")
        print(f"description: {request.form['description']}")
        print(f"price: {request.form['price']}")
        print(f"lat: {request.form['lat']}")
        print(f"lng: {request.form['lng']}")

        # Retrieve form data
        houseType = request.form['houseType']
        district = request.form['district'].lower()
        address = request.form['address']
        no_of_rooms = request.form['no_of_rooms']
        no_of_bathrooms = request.form['no_of_bathrooms']
        land_size = request.form['land_size']
        distance = request.form['distance']
        storey = request.form['storey']
        keyWord = request.form['keyWord']
        description = request.form['description']
        price = request.form['price']
        lat = request.form['lat']
        lng = request.form['lng']

        # Create new House object
        new_house = House(houseType=houseType, district=district, address=address,
                          no_of_rooms=no_of_rooms, no_of_bathrooms=no_of_bathrooms,
                          land_size=land_size, distance=distance, storey=storey,
                          keyWord=keyWord, description=description, price=price, lat=lat, lng=lng)
        
        # Add new house to session and commit to database
        db.session.add(new_house)
        db.session.commit()

        # Handle images and print the file names
        print("Handling Images:")
        image_filenames = []
        for i in range(1, 7):
            image_file = request.files.get(f'image{i}')
            if image_file:
                filename = secure_filename(image_file.filename)
                print(f"Image {i} received: {filename}")
                image_file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
                image_filenames.append(filename)
            else:
                print(f"Image {i} not received.")
                image_filenames.append(None)

        # Create new HouseImage object
        new_image = HouseImage(image1=image_filenames[0], image2=image_filenames[1],
                               image3=image_filenames[2], image4=image_filenames[3],
                               image5=image_filenames[4], image6=image_filenames[5],
                               house=new_house)
        
        # Add new image to session and commit to database
        db.session.add(new_image)
        db.session.commit()

        return {"message": "Luxury house added successfully"}, 200
    except Exception as e:
        print(f"Error occurred: {e}")
        return {"error": str(e)}, 500


@app.route('/displayHouses', methods=['GET'])
def houses():
    try:
        all_houses = House.query.all()
        results = house_schema.dump(all_houses)
        return jsonify(results), 200
    except Exception as e:
        return jsonify({"error": str(e), "status": "fail"}), 500


########################################################################################
@app.route('/displayHouse', methods=['POST'])
def get_house():
    try:
        data = request.get_json()
        print("Request data:", data)  # Log the incoming request data

        # Extract the house ID
        id = data.get('id')

        house = House.query.filter(House.id==id)

        if not house:
            return jsonify({"error": "House not found"}), 401
        
        house_data = house_schema.dump(house)
        print("House Data Type:", type(house_data))  # Check the type
        print("House Data:", house_data)  # Log the data

        # Check if house_data is a list and access the first item if necessary
        if isinstance(house_data, list) and len(house_data) > 0:
            house_data = house_data[0]  # Get the first (and only) element

        house_data = {
            'id': house_data['id'],
            'address': house_data['address'],
            'district': house_data['district'],
            'houseType': house_data['houseType'],
            'no_of_rooms': house_data['no_of_rooms'],
            'no_of_bathrooms': house_data['no_of_bathrooms'],
            'land_size': house_data['land_size'],
            'distance': house_data['distance'],
            'storey': house_data['storey'],
            'keyWord': house_data['keyWord'],
            'description': house_data['description'],
            'price': house_data['price'],
            'lat': house_data['lat'],
            'lng': house_data['lng'],
            'images':  [
                {
                    'image1': img['image1'],
                    'image2': img['image2'],
                    'image3': img['image3'],
                    'image4': img['image4'],
                    'image5': img['image5'], 
                    'image6': img['image6']
                }
                for img in house_data['images']
            ]
        }
        print("housedata: ", house_data)
        return jsonify(house_data), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/bookings', methods=['GET'])
def get_bookings():
    try:
        # Retrieve all bookings
        all_bookings = PropertyBooking.query.all()
        results = Property_Booking_Schema.dump(all_bookings)
        return jsonify(results), 200
    except Exception as e:
        return jsonify({"error": str(e), "status": "fail"}), 500

@app.route('/addBooking', methods=['POST'])
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



@app.route('/getBookingDetails', methods=['GET'])
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

@app.route('/getBookingDetailsByUser/<int:user_id>', methods=['GET'])
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


@app.route('/confirmBooking/<int:booking_id>', methods=['POST'])
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

@app.route('/deleteBooking/<int:booking_id>', methods=['DELETE'])
def delete_booking(booking_id):
    # Logic to delete the booking
    booking = PropertyBooking.query.get(booking_id)
    if booking:
        db.session.delete(booking)
        db.session.commit()
        return jsonify({'message': 'Booking deleted successfully!'})
    else:
        return jsonify({'error': 'Booking not found!'}), 404


###############################################################################################

@app.route('/deleteHouse/<int:id>', methods=['DELETE'])
def delete_house(id):
    try:
        house = House.query.get(id)
        if not house:
            return jsonify({"message": "House not found", "status": "fail"}), 404

        # Find all images associated with the house
        house_images = HouseImage.query.filter_by(house_id=house.id).all()

        # Delete each image file
        for image in house_images:
            for i in range(1, 7):  
                image_url = getattr(image, f'image{i}')
                if image_url:
                    image_file_path = os.path.join(app.config['UPLOAD_FOLDER'], image_url)
                    if os.path.exists(image_file_path):
                        os.remove(image_file_path)
            db.session.delete(image)

        # Delete the house record
        db.session.delete(house)
        db.session.commit()
        
        return jsonify({"message": "House and associated images deleted", "status": "success"}), 200

    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e), "status": "fail"}), 500

@app.route('/displayRecentCard', methods=['GET'])
def displayRecentCard():
    try:
        first_ten_houses = House.query.order_by(House.upload_time.desc()).limit(6).all()
        results = house_schema.dump(first_ten_houses)
        return jsonify(results), 200
    except Exception as e:
        return jsonify({"error": str(e), "status": "fail"}), 500

@app.route('/displayHouses/<string:houseType>', methods=['GET'])
def displayHouses(houseType):
    try:
        houses = House.query.filter_by(houseType=houseType).order_by(House.upload_time.desc()).all()
        results = house_schema.dump(houses) 
        return jsonify(results), 200
    except Exception as e:
        return jsonify({"error": str(e), "status": "fail"}), 500



##############
##############Customer Signup copy########################33


##############copy################################


###########################
@app.route('/addAgent', methods=['POST'])
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

@app.route('/displayAgents', methods=['GET'])
def displayAgents():
    try:
        all_agents = Agent.query.all()
        results = agent_schema.dump(all_agents)
        return jsonify(results), 200
    except Exception as e:
        return jsonify({"error": str(e), "status": "fail"}), 500

@app.route('/deleteAgent/<int:id>', methods=['DELETE'])
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

@app.route('/filter/<houseType>', methods=['POST'])
def filter_houses(houseType):
    try:
        # Get the JSON data sent from React
        data = request.get_json()
        district = data.get('district')
        bedrooms = data.get('bedrooms')
        story = data.get('story')

        # Filter based on provided criteria (ignore if not provided)
        query = House.query.filter(House.houseType == houseType)
        if district:
            query = query.filter(House.district == district)
        if bedrooms:
            query = query.filter(House.no_of_rooms == bedrooms)
        if story:
            query = query.filter(House.storey == story)
        
        # Execute query and get filtered houses
        filtered_houses = query.all()

        # Serialize the results using your house schema
        results = house_schema.dump(filtered_houses, many=True)

        return jsonify(results), 200
    except Exception as e:
        return jsonify({"error": str(e), "status": "fail"}), 500



#############
@app.route('/displayAgentHouses/<string:agent_id>', methods=['GET'])
def Agent_houses(agent_id): 
    try:
        # Adjusted query to match your requirements
        all_houses = AgentHouse.query.filter_by(agentId=agent_id).all()
        results = Agent_house_schema.dump(all_houses, many=True) 
        return jsonify(results), 200  
    except Exception as e:
        return jsonify({"error": str(e), "status": "fail"}), 500 
 

#############
@app.route('/deleteAgentHouse/<int:id>', methods=['DELETE'])
def delete_Agent_house(id):
    try:
        house = AgentHouse.query.get(id)
        if not house:
            return jsonify({"message": "House not found", "status": "fail"}), 404

        # Find all images associated with the house
        house_images = AgentHouseImage.query.filter_by(house_id=house.id).all()

        # Delete each image file
        for image in house_images:
            for i in range(1, 7):  
                image_url = getattr(image, f'image{i}')
                if image_url:
                    image_file_path = os.path.join(app.config['UPLOAD_FOLDER'], image_url)
                    if os.path.exists(image_file_path):
                        os.remove(image_file_path)
            db.session.delete(image)

        # Delete the house record
        db.session.delete(house)
        db.session.commit()
        
        return jsonify({"message": "House and associated images deleted", "status": "success"}), 200

    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e), "status": "fail"}), 500
#############
@app.route('/displayAllAgentHouse', methods=['GET'])
def display_all_agent_house():
    try:
        all_images = AgentHouse.query.all()  # Fetch all agent houses from the database
        results = Agent_house_schema.dump(all_images)  # Serialize the results
        return jsonify(results), 200  # Return JSON response
    except Exception as e:
        return jsonify({"error": str(e), "status": "fail"}), 500  # Handle errors




if __name__ == '__main__':
    app.run(debug=True)'''




from flask import Flask, jsonify, request
from schemas import HouseSchema
from config import Config
from flask_cors import CORS
from models import House, db
from flask_mail import Mail
from flask_bcrypt import Bcrypt
import logging
from flask_cors import CORS
from flask import current_app



app = Flask(__name__)
app.config.from_object(Config)
CORS(app)
CORS(app, supports_credentials=True)

# Initialize extensions
db.init_app(app)
mail = Mail(app)
bcrypt = Bcrypt(app)

with app.app_context():
    db.create_all()

# Register blueprints from the Routes folder
from Routes.banner import banner_bp
from Routes.agent import agent_bp
from Routes.hotel import hotel_bp
from Routes.auth import auth_bp
from Routes.main import main_bp  
from Routes.house import house_bp  
from schemas import house_schema

app.register_blueprint(banner_bp, url_prefix="/banner")
app.register_blueprint(agent_bp, url_prefix="/agent")
app.register_blueprint(hotel_bp, url_prefix="/hotels")
app.register_blueprint(auth_bp, url_prefix="/auth")
app.register_blueprint(house_bp, url_prefix="/house")
app.register_blueprint(main_bp)  


@app.route('/displayHouses/<string:houseType>', methods=['GET'])
def displayHouses(houseType):
    try:
        houses = House.query.filter_by(houseType=houseType).order_by(House.upload_time.desc()).all()
        results = house_schema.dump(houses) 
        return jsonify(results), 200
    except Exception as e:
        return jsonify({"error": str(e), "status": "fail"}), 500
    


@app.route('/displayHouse', methods=['POST'])
def get_house():
    try:
        data = request.get_json()
        print("Request data:", data)  # Log the incoming request data

        # Extract the house ID
        id = data.get('id')

        house = House.query.filter(House.id==id)

        if not house:
            return jsonify({"error": "House not found"}), 401
        
        house_data = house_schema.dump(house)
        print("House Data Type:", type(house_data))  # Check the type
        print("House Data:", house_data)  # Log the data

        # Check if house_data is a list and access the first item if necessary
        if isinstance(house_data, list) and len(house_data) > 0:
            house_data = house_data[0]  # Get the first (and only) element

        house_data = {
            'id': house_data['id'],
            'address': house_data['address'],
            'district': house_data['district'],
            'houseType': house_data['houseType'],
            'no_of_rooms': house_data['no_of_rooms'],
            'no_of_bathrooms': house_data['no_of_bathrooms'],
            'land_size': house_data['land_size'],
            'distance': house_data['distance'],
            'storey': house_data['storey'],
            'keyWord': house_data['keyWord'],
            'description': house_data['description'],
            'price': house_data['price'],
            'lat': house_data['lat'],
            'lng': house_data['lng'],
            'images':  [
                {
                    'image1': img['image1'],
                    'image2': img['image2'],
                    'image3': img['image3'],
                    'image4': img['image4'],
                    'image5': img['image5'], 
                    'image6': img['image6']
                }
                for img in house_data['images']
            ]
        }
        print("housedata: ", house_data)
        return jsonify(house_data), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
        
@app.route('/app/displayRecentCard', methods=['GET'])
def displayRecentCard():
    try:
        # Get the recent 6 houses
        first_six_houses = House.query.order_by(House.upload_time.desc()).limit(6).all()

        # Instantiate schema with many=True
        schema = HouseSchema(many=True)

        # Serialize the list of house objects
        results = schema.dump(first_six_houses)

        return jsonify(results), 200
    except Exception as e:
        return jsonify({"error": str(e), "status": "fail"}), 500
if __name__ == '__main__':
    app.run(debug=True)
