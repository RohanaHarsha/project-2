
from app import db, app
from models import Agent


with app.app_context():
    new_admin = Agent(
        name = "r",
        address = "hey",
        NIC = 200000000293,
        email = "rh23541@gmail.com",
        TP = 0,
        password = "adddmin" )
    db.session.add(new_admin)
    db.session.commit()

print("Record added successfully!")

