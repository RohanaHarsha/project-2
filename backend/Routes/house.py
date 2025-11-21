from flask import Blueprint, jsonify, request,current_app
import os
from werkzeug.utils import secure_filename
from models import db, House, HouseImage
from schemas import HouseSchema
from sqlalchemy import or_


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

        return {"message": "Luxury house added successfully"}, 201
    except Exception as e:
        print("heyyyy", e)
        print(f"Error occurred: {e}")
        return {"error": str(e)}, 500


@house_bp.route('/displayHouses', methods=['GET'])
def houses():
    try:
        houses = House.query.order_by(House.upload_time.desc()).all()
        results = HouseSchema(many=True).dump(houses)
        return jsonify(results), 200
    except Exception as e:
        return jsonify({"error": str(e), "status": "fail"}), 500


@house_bp.route('/displayHouses/<string:houseType>', methods=['GET'])
def displayHouses(houseType):
    try:
        houses = House.query.filter_by(houseType=houseType).order_by(House.upload_time.desc()).all()
        results = HouseSchema(many=True).dump(houses)
        return jsonify(results), 200
    except Exception as e:
        return jsonify({"error": str(e), "status": "fail"}), 500       


@house_bp.route('/deleteHouse/<int:id>', methods=['DELETE'])
def delete_house(id):
    try:
        if not id:
            current_app.logger.debug("No ID provided in request")
            return jsonify({"error": "House ID is required"}), 400

        house = House.query.get(id)
        if not house:
            return jsonify({"error": "House not found"}), 404

        # remove associated image files if any
        upload_dir = current_app.config.get('UPLOAD_FOLDER', 'static/uploads')
        images = HouseImage.query.filter_by(house_id=house.id).all()
        for img in images:
            for fname in (img.image1, img.image2, img.image3, img.image4, img.image5, img.image6):
                if fname:
                    path = os.path.join(upload_dir, fname)
                    if os.path.exists(path):
                        os.remove(path)

        db.session.delete(house)
        db.session.commit()
        return jsonify({"message": "House deleted successfully"}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500


@house_bp.route('/displayHouse', methods=['POST'])
def get_house():
    try:
        data = request.get_json()
        id = data.get('id')

        house = House.query.get(id)
        if not house:
            return jsonify({"error": "House not found"}), 404

        # dump a single object (no many=True)
        house_data = HouseSchema().dump(house)

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


@house_bp.route('/displayHouses/search', methods=['GET'])
def search_houses():
    try:
        q = (request.args.get('q') or "").strip()
        # if no query, return all houses
        if not q:
            houses = House.query.order_by(House.upload_time.desc()).all()
        else:
            term = f"%{q}%"
            houses = House.query.filter(
                or_(
                    House.district.ilike(term),
                    House.houseType.ilike(term),
                    House.keyWord.ilike(term),
                    House.address.ilike(term)
                )
            ).order_by(House.upload_time.desc()).all()

        results = HouseSchema(many=True).dump(houses)
        return jsonify(results), 200
    except Exception as e:
        current_app.logger.exception("search_houses error")
        return jsonify({"error": str(e), "status": "fail"}), 500