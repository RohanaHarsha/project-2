import os

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
    MAIL_DEFAULT_SENDER = MAIL_USERNAME if MAIL_USERNAME else None
    UPLOAD_FOLDER = 'static/uploads'
    MAX_CONTENT_LENGTH = 16 * 1024 * 1024
