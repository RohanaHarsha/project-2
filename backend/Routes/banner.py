from flask import Blueprint, app, jsonify, request, current_app
import os
from werkzeug.utils import secure_filename
from models import db, Banner
from schemas import BannerSchema
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

        upload_dir = current_app.config.get('UPLOAD_FOLDER', Config.UPLOAD_FOLDER)
        os.makedirs(upload_dir, exist_ok=True)

        errors = {}
        saved = []

        for file in files:
            if file and allowed_file(file.filename):
                filename = secure_filename(file.filename)
                file.save(os.path.join(upload_dir, filename))
                new_image = Banner(title=filename, description=description)
                db.session.add(new_image)
                saved.append(filename)
            else:
                errors[file.filename or "unknown"] = 'File type is not allowed'

        if saved:
            db.session.commit()
            return jsonify({"message": 'Files successfully uploaded', "status": 'success', "files": saved}), 201
        else:
            db.session.rollback()
            return jsonify({"errors": errors, "status": "fail"}), 400

    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e), "status": "fail"}), 500


@banner_bp.route('/displayBanner', methods=['GET'])
def images():
    try:
        all_images = Banner.query.all()
        results = BannerSchema(many=True).dump(all_images)
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