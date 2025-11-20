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
from models import Admin



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

    # ---- Create Default Admin (only if missing) ----
    existing_admin = Admin.query.filter_by(username="admin").first()
    if not existing_admin:
        admin = Admin(
            name="Default Admin",
            address="N/A",
            NIC=200000000293,
            email="admin@example.com",
            TP=200000000293,
            username="admin",
            password=bcrypt.generate_password_hash("admin123").decode("utf-8"),
            role="admin"
        )
        db.session.add(admin)
        db.session.commit()
        print("Default admin created.")
    else:
        print("Default admin already exists.")


# Register blueprints from the Routes folder
from Routes.banner import banner_bp
from Routes.agent import agent_bp
from Routes.hotel import hotel_bp
from Routes.auth import auth_bp
from Routes.main import main_bp  
from Routes.house import house_bp  
from schemas import HouseSchema

app.register_blueprint(banner_bp, url_prefix="/banner")
app.register_blueprint(agent_bp, url_prefix="/agent")
app.register_blueprint(hotel_bp, url_prefix="/hotels")
app.register_blueprint(auth_bp, url_prefix="/auth")
app.register_blueprint(house_bp, url_prefix="/house")
app.register_blueprint(main_bp)  

@app.route('/')
def home():
    
    return "Welcome to the Real Estate Backend API"


@app.route('/displayHouses/<string:houseType>', methods=['GET'])
def displayHouses(houseType):
    try:
        houses = House.query.filter_by(houseType=houseType).order_by(House.upload_time.desc()).all()
        results = HouseSchema.dump(houses) 
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
        
        house_data =  HouseSchema.dump(house)
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
