from flask_bcrypt import Bcrypt
from app import db, app
from models import Agent


bcrypt = Bcrypt()

with app.app_context():
    new_admin = Agent(
        name="r",
        address="hey",
        NIC=200000000293,
        email="rhAgent2@gmail.com",
        TP=0,
        password=bcrypt.generate_password_hash("agent2")  # Hash the password before storing
    )
    db.session.add(new_admin)
    db.session.commit()

print("Record added successfully!")
