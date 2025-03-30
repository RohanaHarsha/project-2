from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
from uuid import uuid4

from sqlalchemy import ForeignKey
from sqlalchemy.orm import relationship

db = SQLAlchemy()

def get_uuid():
    return uuid4().hex

class Banner(db.Model):
    __tablename__ = "banner"
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    title = db.Column(db.String(120), index=True, unique=True)
    description = db.Column(db.String(120))

    def __init__(self, title, description):
        self.title = title
        self.description = description

class House(db.Model):  
    __tablename__ = "house"  
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    houseType = db.Column(db.String(120), index=True)  
    district = db.Column(db.String(120), index=True)
    address = db.Column(db.String(120), index=True)
    no_of_rooms = db.Column(db.Integer, index=True, default=0)
    no_of_bathrooms = db.Column(db.Integer, index=True, default=0)
    land_size = db.Column(db.Integer, index=True)
    distance = db.Column(db.Integer, index=True)
    storey = db.Column(db.Integer, index=True)
    keyWord = db.Column(db.String(120), index=True)
    description = db.Column(db.String(500), index=True)  # Increased length
    price = db.Column(db.Float(120), index=True)  # Changed to Float for price
    lat = db.Column(db.Float, index=True,nullable=True)
    lng = db.Column(db.Float, index=True,nullable=True)
    upload_time = db.Column(db.DateTime, default=datetime.utcnow)
    images = db.relationship('HouseImage', back_populates='house', cascade='all, delete-orphan')

    def __init__(self, houseType, district, address, no_of_rooms, no_of_bathrooms, land_size, distance, storey, keyWord, description,price,lat,lng):
        self.houseType = houseType
        self.district = district
        self.address = address
        self.no_of_rooms = no_of_rooms
        self.no_of_bathrooms = no_of_bathrooms
        self.land_size = land_size
        self.distance = distance
        self.storey = storey 
        self.keyWord = keyWord 
        self.description = description
        self.price = price 
        self.lat = lat 
        self.lng = lng

class HouseImage(db.Model):  
    __tablename__ = "house_image"  
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    image1 = db.Column(db.String(120), index=True)
    image2 = db.Column(db.String(120), index=True)
    image3 = db.Column(db.String(120), index=True)
    image4 = db.Column(db.String(120), index=True)
    image5 = db.Column(db.String(120), index=True)
    image6 = db.Column(db.String(120), index=True)
    house_id = db.Column(db.Integer, db.ForeignKey('house.id'))
    house = db.relationship('House', back_populates='images')

    def __init__(self, image1, image2, image3, image4, image5, image6, house):
        self.image1 = image1
        self.image2 = image2
        self.image3 = image3
        self.image4 = image4
        self.image5 = image5
        self.image6 = image6
        self.house = house

class User(db.Model):
    __tablename__ = "users"
    id = db.Column(db.String(36), primary_key=True, unique=True, default=get_uuid)
    username = db.Column(db.String(36))
    email = db.Column(db.String(150), unique=True)
    password = db.Column(db.Text, nullable=False)
    bookings = db.relationship('PropertyBooking', back_populates='user')


class Hotel(db.Model):  
    __tablename__ = "hotel"  
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    district = db.Column(db.String(120), index=True)
    address = db.Column(db.String(120), index=True)
    no_of_rooms = db.Column(db.Integer, index=True)
    land_size = db.Column(db.Integer, index=True)
    distance = db.Column(db.Integer, index=True)
    keyWord = db.Column(db.String(120), index=True)
    description = db.Column(db.String(120), index=True)
    upload_time = db.Column(db.DateTime, default=datetime.utcnow)
    images = db.relationship('HotelImage', back_populates='hotel', cascade='all, delete-orphan')

    def __init__(self, district, address, no_of_rooms, land_size, distance, keyWord, description):
        self.district = district
        self.address = address
        self.no_of_rooms = no_of_rooms
        self.land_size = land_size
        self.distance = distance
        self.keyWord = keyWord 
        self.description = description

class HotelImage(db.Model):  
    __tablename__ = "hotel_image"  
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    image1 = db.Column(db.String(120), index=True)
    image2 = db.Column(db.String(120), index=True)
    image3 = db.Column(db.String(120), index=True)
    image4 = db.Column(db.String(120), index=True)
    image5 = db.Column(db.String(120), index=True)
    image6 = db.Column(db.String(120), index=True)
    hotel_id = db.Column(db.Integer, db.ForeignKey('hotel.id'))
    hotel = db.relationship('Hotel', back_populates='images')

    def __init__(self, image1, image2, image3, image4, image5, image6, hotel):
        self.image1 = image1
        self.image2 = image2
        self.image3 = image3
        self.image4 = image4
        self.image5 = image5
        self.image6 = image6
        self.hotel = hotel

class Agent(db.Model):
    __tablename__ = "agent"
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String(120), index=True)
    address = db.Column(db.String(120), index=True)
    NIC = db.Column(db.String(20), index=True)  # Adjust data type as necessary
    email = db.Column(db.String(150), index=True, unique=True)  # Adjust length and uniqueness constraint
    TP = db.Column(db.String(15), index=True)  # Adjust length as necessary
    password = db.Column(db.String(120), index=True)
    
    def __init__(self, name, address, NIC, email, TP, password):
        self.name = name
        self.address = address
        self.NIC = NIC
        self.email = email
        self.TP = TP
        self.password = password

class Customer(db.Model):
    __tablename__ = "customer"
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String(120), index=True)
    email = db.Column(db.String(150), index=True, unique=True)  # Adjust length and uniqueness constraint
    TP = db.Column(db.String(15), index=True)  # Adjust length as necessary
    username = db.Column(db.String(120), index=True, unique=True)  # Adjust length and uniqueness constraint
    password = db.Column(db.String(120), index=True)

    def __init__(self, name, email, TP, username, password):
        self.name = name
        self.email = email
        self.TP = TP
        self.username = username
        self.password = password

class Appointment(db.Model):
    __tablename__ = "appointment"
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    property_id = db.Column(db.Integer, nullable=False) # that's saved in session
    customer_id = db.Column(db.Integer, db.ForeignKey('customer.id'), nullable=False) # that's saved in session
    date_time = db.Column(db.DateTime, nullable=False)
    

    customer = db.relationship('Customer', backref='appointments')

    def __init__(self, agent_id, property_id, customer_id, date_time):
        self.agent_id = agent_id
        self.property_id = property_id
        self.customer_id = customer_id
        self.date_time = date_time

class Admin(db.Model):
    __tablename__ = "admin"
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String(120), index=True)
    address = db.Column(db.String(120), index=True)
    NIC = db.Column(db.String(20), index=True)  # Adjust data type as necessary
    email = db.Column(db.String(150), index=True, unique=True)  # Adjust length and uniqueness constraint
    username = db.Column(db.String(120), index=True, unique=True)  # Adjust length and uniqueness constraint
    password = db.Column(db.String(120), index=True)
    
    def __init__(self, name, address, NIC, email, TP, username, password):
        self.name = name
        self.address = address
        self.NIC = NIC
        self.email = email
        self.TP = TP
        self.username = username
        self.password = password

#############################################
class AgentHouse(db.Model):
    __tablename__ = "Agenthouse"  # Matches the table name used in ForeignKey reference
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    houseType = db.Column(db.String(120), index=True)
    district = db.Column(db.String(120), index=True)
    address = db.Column(db.String(120), index=True)
    no_of_rooms = db.Column(db.Integer, index=True)
    no_of_bathrooms = db.Column(db.Integer, index=True)
    land_size = db.Column(db.Integer, index=True)
    distance = db.Column(db.Integer, index=True)
    storey = db.Column(db.Integer, index=True)
    keyWord = db.Column(db.String(120), index=True)
    description = db.Column(db.String(120), index=True)
    agentId = db.Column(db.String(120), index=True)  # Added to match the constructor
    agentEmail = db.Column(db.String(120), index=True)
    price = db.Column(db.String(120), index=True)  # Changed to Float for price
    lat = db.Column(db.Float, index=True,nullable=True)
    lng = db.Column(db.Float, index=True,nullable=True)
    upload_time = db.Column(db.DateTime, default=datetime.utcnow)

    # Relationship to AgentHouseImage, with proper back_populates
    images = db.relationship('AgentHouseImage', back_populates='house', cascade='all, delete-orphan')

    def __init__(self, houseType, district, address, no_of_rooms, no_of_bathrooms, land_size, distance, storey, keyWord, description, agentId,agentEmail,lng,lat,price):
        self.houseType = houseType
        self.district = district
        self.address = address
        self.no_of_rooms = no_of_rooms
        self.no_of_bathrooms = no_of_bathrooms
        self.land_size = land_size
        self.distance = distance
        self.storey = storey
        self.keyWord = keyWord
        self.description = description
        self.agentId = agentId  # Now correctly set in constructor
        self.agentEmail = agentEmail
        self.lng = lng
        self.lat = lat
        self.price = price


class AgentHouseImage(db.Model):
    __tablename__ = "Agent_house_image"  # Matches the table name
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    image1 = db.Column(db.String(120), index=True)
    image2 = db.Column(db.String(120), index=True)
    image3 = db.Column(db.String(120), index=True)
    image4 = db.Column(db.String(120), index=True)
    image5 = db.Column(db.String(120), index=True)
    image6 = db.Column(db.String(120), index=True)

    # ForeignKey should point to 'Agenthouse.id' instead of 'house.id'
    house_id = db.Column(db.Integer, db.ForeignKey('Agenthouse.id'))  # Correct ForeignKey

    # Relationship back to AgentHouse, not House
    house = db.relationship('AgentHouse', back_populates='images')

class PropertyBooking(db.Model):
    __tablename__ = 'property_bookings'

    id = db.Column(db.Integer, primary_key=True)
    house_id = db.Column(db.Integer, db.ForeignKey('house.id'), nullable=False)  # Foreign Key linking to House table
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)  # Foreign Key linking to User table
    booking_date = db.Column(db.Date, nullable=False)
    booking_time = db.Column(db.Time, nullable=False)
    status = db.Column(db.String(50), nullable=False, default="Pending")

    # Relationships
    house = db.relationship('House', backref='property_bookings', lazy=True)
    user = db.relationship('User', back_populates='bookings')  # Keep