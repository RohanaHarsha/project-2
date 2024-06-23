from flask import Flask 


def create_app(a():
    app = Flask(__name__)
    app.config.from_object('instance.config.config')

    with app.app_context():
        from . import routes

    return app