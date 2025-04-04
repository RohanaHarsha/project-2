from flask_bcrypt import Bcrypt
from app import db, app
from models import Agent, Admin


bcrypt = Bcrypt()

with app.app_context():
    new_admin = Admin(
        name="r",
        address="hey",
        NIC=200000000293,
        email="rhAdmin1331@gmail.com",
        TP=0,
        username= "rohan354789",
        password=bcrypt.generate_password_hash("admin").decode('utf-8'),  # Hash the password before storing
          # Debugging
    )

    print("Hashed Password:", new_admin.password)
    db.session.add(new_admin)
    db.session.commit()

print("Record added successfully!")
