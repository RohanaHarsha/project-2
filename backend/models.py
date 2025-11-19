# models.py
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
from uuid import uuid4

db = SQLAlchemy()

def get_uuid():
    return uuid4().hex


# ─────────────────────────────
# Admins, Agents, Customers
# ─────────────────────────────

class Admin(db.Model):
    __tablename__ = "admins"
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String(120))
    address = db.Column(db.String(120))
    NIC = db.Column(db.String(20))
    email = db.Column(db.String(150), unique=True)
    TP = db.Column(db.String(20))
    username = db.Column(db.String(120), unique=True)
    password = db.Column(db.String(120))
    role = db.Column(db.String(50))


class Agent(db.Model):
    __tablename__ = "agents"
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String(120))
    address = db.Column(db.String(120))
    NIC = db.Column(db.String(20))
    email = db.Column(db.String(150), unique=True)
    TP = db.Column(db.String(15))
    password = db.Column(db.String(120))

    # one agent can have many houses
    houses = db.relationship('AgentHouse', back_populates='agent', cascade='all, delete-orphan')


class Customer(db.Model):
    __tablename__ = "customers"
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String(120))
    email = db.Column(db.String(150), unique=True)
    TP = db.Column(db.String(15))
    username = db.Column(db.String(120), unique=True)
    password = db.Column(db.String(120))
    appointments = db.relationship('Appointment', back_populates='customer', cascade='all, delete-orphan')


# ─────────────────────────────
# Banners, Hotels, Houses
# ─────────────────────────────

class Banner(db.Model):
    __tablename__ = "banners"
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(120), unique=True)
    description = db.Column(db.String(255))


class Hotel(db.Model):
    __tablename__ = "hotels"
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    district = db.Column(db.String(120))
    address = db.Column(db.String(120))
    no_of_rooms = db.Column(db.Integer)
    land_size = db.Column(db.Integer)
    distance = db.Column(db.Integer)
    keyWord = db.Column(db.String(120))
    description = db.Column(db.String(500))
    upload_time = db.Column(db.DateTime, default=datetime.utcnow)
    images = db.relationship('HotelImage', back_populates='hotel', cascade='all, delete-orphan')


class HotelImage(db.Model):
    __tablename__ = "hotel_images"
    id = db.Column(db.Integer, primary_key=True)
    image1 = db.Column(db.String(255))
    image2 = db.Column(db.String(255))
    image3 = db.Column(db.String(255))
    image4 = db.Column(db.String(255))
    image5 = db.Column(db.String(255))
    image6 = db.Column(db.String(255))
    hotel_id = db.Column(db.Integer, db.ForeignKey('hotels.id'))
    hotel = db.relationship('Hotel', back_populates='images')


class House(db.Model):
    __tablename__ = "houses"
    id = db.Column(db.Integer, primary_key=True)
    houseType = db.Column(db.String(120))
    district = db.Column(db.String(120))
    address = db.Column(db.String(120))
    no_of_rooms = db.Column(db.Integer, default=0)
    no_of_bathrooms = db.Column(db.Integer, default=0)
    land_size = db.Column(db.Integer)
    distance = db.Column(db.Integer)
    storey = db.Column(db.Integer)
    keyWord = db.Column(db.String(120))
    description = db.Column(db.String(500))
    price = db.Column(db.Float)
    lat = db.Column(db.Float, nullable=True)
    lng = db.Column(db.Float, nullable=True)
    upload_time = db.Column(db.DateTime, default=datetime.utcnow)

    images = db.relationship('HouseImage', back_populates='house', cascade='all, delete-orphan')
    bookings = db.relationship('PropertyBooking', back_populates='house', cascade='all, delete-orphan')


class HouseImage(db.Model):
    __tablename__ = "house_images"
    id = db.Column(db.Integer, primary_key=True)
    image1 = db.Column(db.String(255))
    image2 = db.Column(db.String(255))
    image3 = db.Column(db.String(255))
    image4 = db.Column(db.String(255))
    image5 = db.Column(db.String(255))
    image6 = db.Column(db.String(255))
    house_id = db.Column(db.Integer, db.ForeignKey('houses.id'))
    house = db.relationship('House', back_populates='images')


# ─────────────────────────────
# Agent-specific Houses
# ─────────────────────────────

class AgentHouse(db.Model):
    __tablename__ = "agent_houses"
    id = db.Column(db.Integer, primary_key=True)
    houseType = db.Column(db.String(120))
    district = db.Column(db.String(120))
    address = db.Column(db.String(120))
    no_of_rooms = db.Column(db.Integer)
    no_of_bathrooms = db.Column(db.Integer)
    land_size = db.Column(db.Integer)
    distance = db.Column(db.Integer)
    storey = db.Column(db.Integer)
    keyWord = db.Column(db.String(120))
    description = db.Column(db.String(500))
    price = db.Column(db.Float)
    lat = db.Column(db.Float, nullable=True)
    lng = db.Column(db.Float, nullable=True)
    upload_time = db.Column(db.DateTime, default=datetime.utcnow)

    agent_id = db.Column(db.Integer, db.ForeignKey('agents.id'))
    agent = db.relationship('Agent', back_populates='houses')

    images = db.relationship('AgentHouseImage', back_populates='house', cascade='all, delete-orphan')


class AgentHouseImage(db.Model):
    __tablename__ = "agent_house_images"
    id = db.Column(db.Integer, primary_key=True)
    image1 = db.Column(db.String(255))
    image2 = db.Column(db.String(255))
    image3 = db.Column(db.String(255))
    image4 = db.Column(db.String(255))
    image5 = db.Column(db.String(255))
    image6 = db.Column(db.String(255))
    house_id = db.Column(db.Integer, db.ForeignKey('agent_houses.id'))
    house = db.relationship('AgentHouse', back_populates='images')


# ─────────────────────────────
# Bookings & Appointments
# ─────────────────────────────

class PropertyBooking(db.Model):
    __tablename__ = 'property_bookings'
    id = db.Column(db.Integer, primary_key=True)
    house_id = db.Column(db.Integer, db.ForeignKey('houses.id'), nullable=False)
    user_id = db.Column(db.String(36), db.ForeignKey('users.id'), nullable=False)
    booking_date = db.Column(db.Date, nullable=False)
    booking_time = db.Column(db.Time, nullable=False)
    status = db.Column(db.String(50), default="Pending")

    house = db.relationship('House', back_populates='bookings')
    user = db.relationship('User', back_populates='bookings')


class User(db.Model):
    __tablename__ = "users"
    id = db.Column(db.String(36), primary_key=True, unique=True, default=get_uuid)
    username = db.Column(db.String(36))
    email = db.Column(db.String(150), unique=True)
    password = db.Column(db.Text, nullable=False)
    bookings = db.relationship('PropertyBooking', back_populates='user')


class Appointment(db.Model):
    __tablename__ = "appointments"
    id = db.Column(db.Integer, primary_key=True)
    property_id = db.Column(db.Integer, nullable=False)
    customer_id = db.Column(db.Integer, db.ForeignKey('customers.id'), nullable=False)
    date_time = db.Column(db.DateTime, nullable=False)

    customer = db.relationship('Customer', back_populates='appointments')
