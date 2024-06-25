from flask import Flask 

def create_app():
    app = Flask(__name__)
    app.config.from_object('instance.config.Configuration_Settings')

    from routes import main
    app.register_blueprint(main)

    return app
