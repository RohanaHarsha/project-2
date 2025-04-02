from app import db, app
from models import Agent
from werkzeug.security import generate_password_hash

with app.app_context():
    new_admin = Agent(
        name="r",
        address="hey",
        NIC=200000000293,
        email="rhAgent@gmail.com",
        TP=0,
        password=generate_password_hash("agent")  # Hash the password before storing
    )
    db.session.add(new_admin)
    db.session.commit()

print("Record added successfully!")
