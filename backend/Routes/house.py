from flask import Blueprint, jsonify, request,current_app
import os
from werkzeug.utils import secure_filename
from models import db, House, HouseImage
from schemas import house_schema


house_bp = Blueprint('Houses', __name__)


@house_bp.route('/addLuxuryHouse', methods=['POST'])
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
                image_file.save(os.path.join(current_app.config['UPLOAD_FOLDER'], filename))
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
        print("heyyyy", e)
        print(f"Error occurred: {e}")
        return {"error": str(e)}, 500


@house_bp.route('/displayHouses', methods=['GET'])
def houses():
    try:
        all_houses = House.query.all()
        results = house_schema.dump(all_houses)
        return jsonify(results), 200
    except Exception as e:
        return jsonify({"error": str(e), "status": "fail"}), 500        

########################################################################################
@house_bp.route('/displayHouse', methods=['POST'])
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