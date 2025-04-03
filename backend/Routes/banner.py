from flask import Blueprint, app, jsonify, request, current_app
import os
from werkzeug.utils import secure_filename
from models import db, Banner
from schemas import banner_schema
from config import Config

banner_bp = Blueprint('banner', __name__)

UPLOAD_FOLDER = 'static/uploads'
ALLOWED_EXTENSIONS = {'txt', 'pdf', 'png', 'jpg', 'jpeg', 'gif', 'jfif'}

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS



@banner_bp.route("/addBanner", methods=["POST"])
def upload_file():
    try:
        if 'files[]' not in request.files or 'description' not in request.form:
            return jsonify({"message": 'No file part or description in the request', "status": 'fail'}), 400

        files = request.files.getlist('files[]')
        description = request.form['description']
        
        errors = {}
        success = False

        for file in files:
            if file and allowed_file(file.filename):
                filename = secure_filename(file.filename)
                #file.save(os.path.join(Config['UPLOAD_FOLDER'], filename))
                file.save(os.path.join(Config.UPLOAD_FOLDER, filename)) 

                # Save file metadata to the database
                new_image = Banner(title=filename, description=description)
                db.session.add(new_image)
                db.session.commit()
                success = True
            else:
                errors[file.filename] = 'File type is not allowed'
        
        if success:
            return jsonify({"message": 'Files successfully uploaded', "status": 'success'}), 201
        else:
            return jsonify(errors), 500

    except Exception as e:
        db.session.rollback()
        print(e)  # Log the exception for debugging purposes
        return jsonify({"error": "An error occurred during sign up", "status": "fail"}), 500
        
@banner_bp.route('/displayBanner', methods=['GET'])
def images():
    try:
        all_images = Banner.query.all()
        results = banner_schema.dump(all_images)
        return jsonify(results), 200
    except Exception as e:
        return jsonify({"error": str(e), "status": "fail"}), 500

@banner_bp.route('/deleteBanner/<int:id>', methods=['DELETE'])
def delete_image(id):
    try:
        image = Banner.query.get(id)
        if not image:
            return jsonify({"message": "Image not found", "status": "fail"}), 404

       # os.remove(os.path.join(app.config['UPLOAD_FOLDER'], image.title))
        os.remove(os.path.join(Config.UPLOAD_FOLDER, image.title))
        db.session.delete(image)
        db.session.commit()
        return jsonify({"message": "Image deleted", "status": "success"}), 200

    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e), "status": "fail"}), 500