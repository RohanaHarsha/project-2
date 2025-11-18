# schemas.py
from flask_marshmallow import Marshmallow
from marshmallow_sqlalchemy import SQLAlchemyAutoSchema
from marshmallow.fields import Nested
from models import *

ma = Marshmallow()


# Base Schemas
class AdminSchema(SQLAlchemyAutoSchema):
    class Meta:
        model = Admin
        load_instance = True


class BannerSchema(SQLAlchemyAutoSchema):
    class Meta:
        model = Banner
        load_instance = True


class AgentSchema(SQLAlchemyAutoSchema):
    class Meta:
        model = Agent
        load_instance = True


class CustomerSchema(SQLAlchemyAutoSchema):
    class Meta:
        model = Customer
        load_instance = True


# House + Image Schemas
class HouseImageSchema(SQLAlchemyAutoSchema):
    class Meta:
        model = HouseImage
        load_instance = True


class HouseSchema(SQLAlchemyAutoSchema):
    images = Nested(HouseImageSchema, many=True)

    class Meta:
        model = House
        include_relationships = True
        load_instance = True


# Agent Houses
class AgentHouseImageSchema(SQLAlchemyAutoSchema):
    class Meta:
        model = AgentHouseImage
        load_instance = True


class AgentHouseSchema(SQLAlchemyAutoSchema):
    images = Nested(AgentHouseImageSchema, many=True)

    class Meta:
        model = AgentHouse
        include_relationships = True
        load_instance = True


# Hotels
class HotelImageSchema(SQLAlchemyAutoSchema):
    class Meta:
        model = HotelImage
        load_instance = True


class HotelSchema(SQLAlchemyAutoSchema):
    images = Nested(HotelImageSchema, many=True)

    class Meta:
        model = Hotel
        include_relationships = True
        load_instance = True


# Users + Bookings
class PropertyBookingSchema(SQLAlchemyAutoSchema):
    class Meta:
        model = PropertyBooking
        include_fk = True
        load_instance = True


class UserSchema(SQLAlchemyAutoSchema):
    bookings = Nested(PropertyBookingSchema, many=True)

    class Meta:
        model = User
        include_relationships = True
        load_instance = True
