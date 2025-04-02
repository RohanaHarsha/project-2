from flask import Blueprint, app, jsonify, request
import os
from werkzeug.utils import secure_filename
from models import db, Hotel, HotelImage
from schemas import hotel_schema




hotel_bp = Blueprint('hotels', __name__)

@hotel_bp.route('/addHotel', methods=['POST'])
def upload_hotel():
    try:
        district = request.form['district'].lower()
        address = request.form['address']
        no_of_rooms = request.form['no_of_rooms']
        land_size = request.form['land_size']
        distance = request.form['distance']
        keyWord = request.form['keyWord']
        description = request.form['description']
        
        # Create new House object
        new_hotel = Hotel(district=district, address=address,
                          no_of_rooms=no_of_rooms,
                          land_size=land_size, distance=distance,
                          keyWord=keyWord, description=description)
        
        # Add new house to session and commit to database
        db.session.add(new_hotel)
        db.session.commit()

        # Handle images
        image_filenames = []
        for i in range(1, 7):
            image_file = request.files.get(f'image{i}')
            if image_file:
                filename = secure_filename(image_file.filename)
                image_file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
                image_filenames.append(filename)
            else:
                image_filenames.append(None)

        # Create new HouseImage object
        new_image = HotelImage(image1=image_filenames[0], image2=image_filenames[1],
                               image3=image_filenames[2], image4=image_filenames[3],
                               image5=image_filenames[4], image6=image_filenames[5],
                               hotel=new_hotel)
        
        # Add new image to session and commit to database
        db.session.add(new_image)
        db.session.commit()

        return jsonify({'message': 'Successfully uploaded', 'status': 'success'}), 201

    except Exception as e:
        db.session.rollback() 
        return jsonify({'error': str(e), 'status': 'fail'}), 500
    
@hotel_bp.route('/displayHotel', methods=['GET'])
def hotels():
    try:
        all_hotels = Hotel.query.all()
        results = hotel_schema.dump(all_hotels)
        return jsonify(results), 200
    except Exception as e:
        return jsonify({"error": str(e), "status": "fail"}), 500
    

@hotel_bp.route('/deleteHotel/<int:id>', methods=['DELETE'])
def delete_hotel(id):
    try:
        hotel = Hotel.query.get(id)
        if not hotel:
            return jsonify({"message": "House not found", "status": "fail"}), 404

        # Find all images associated with the house
        hotel_images = HotelImage.query.filter_by(hotel_id=hotel.id).all()

        # Delete each image file
        for image in hotel_images:
            for i in range(1, 7):
                image_url = getattr(image, f'image{i}')
                if image_url:
                    image_file_path = os.path.join(app.config['UPLOAD_FOLDER'], image_url)
                    if os.path.exists(image_file_path):
                        os.remove(image_file_path)
            db.session.delete(image)

        # Delete the house record
        db.session.delete(hotel)
        db.session.commit()
        
        return jsonify({"message": "House and associated images deleted", "status": "success"}), 200

    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e), "status": "fail"}), 500