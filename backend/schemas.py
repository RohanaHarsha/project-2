#Serialization of instances of SQLAlchemy models
from flask_marshmallow import Marshmallow
from marshmallow_sqlalchemy import SQLAlchemyAutoSchema
from marshmallow.fields import Nested
from models import Admin, Banner, House, HouseImage,User,Hotel,HotelImage,Agent,Customer,AgentHouse,AgentHouseImage,PropertyBooking

ma = Marshmallow()


class AdminSchema(SQLAlchemyAutoSchema):
    class Meta:
        model = Admin  
        fields = ('id', 'name', 'address', 'NIC', 'email', 'TP','username','password')

class BannerSchema(SQLAlchemyAutoSchema):
    class Meta:
        model = Banner
        fields = ('id', 'title', 'description')

class HouseImageSchema(SQLAlchemyAutoSchema):
    class Meta:
        model = HouseImage
        fields = ('id', 'image1', 'image2', 'image3', 'image4', 'image5', 'image6', 'house_id')



class HouseSchema(SQLAlchemyAutoSchema):
    images = Nested(HouseImageSchema, many=True)
    
    class Meta:
        model = House
        include_relationships = True
        load_instance = True
        fields = ('id', 'houseType', 'district', 'address', 'no_of_rooms', 'no_of_bathrooms',
                  'land_size', 'distance', 'description','price','lat','lng', 'upload_time', 'images', 'storey', 'keyWord')
        
class UserSchema(SQLAlchemyAutoSchema):
    class Meta:
        model = User
        fields = ('id', 'username' 'email', 'password')

class HotelImageSchema(SQLAlchemyAutoSchema):
    class Meta:
        model = HotelImage
        fields = ('id', 'image1', 'image2', 'image3', 'image4', 'image5', 'image6', 'hotel_id')



class HotelSchema(SQLAlchemyAutoSchema):
    images = Nested(HotelImageSchema, many=True)
    
    class Meta:
        model = Hotel
        fields = ('id', 'district', 'address', 'no_of_rooms',
                  'land_size', 'distance', 'description', 'upload_time', 'images', 'keyWord')
        
class AgentSchema(SQLAlchemyAutoSchema):
    class Meta:
        model = Agent
        fields = ('id','name','address','NIC','email','TP','password')

class CustomerSchema(SQLAlchemyAutoSchema):
    class Meta:
        model = Customer
        fields = ('id','name','email','TP','username','password')

############################
class AgentHouseImageSchema(SQLAlchemyAutoSchema):
    class Meta:
        model = AgentHouseImage
        fields = ('id', 'image1', 'image2', 'image3', 'image4', 'image5', 'image6', 'house_id')



class AgentHouseSchema(SQLAlchemyAutoSchema):
    images = Nested(HouseImageSchema, many=True)
    
    class Meta:
        model = AgentHouse
        fields = ('id', 'houseType', 'district', 'address', 'no_of_rooms', 'no_of_bathrooms',
                  'land_size', 'distance', 'description','agentId','agentEmail','lng','lat','price','upload_time', 'images', 'storey', 'keyWord')
###############################

class PropertyBookingSchema(SQLAlchemyAutoSchema):
    class Meta:
        model = PropertyBooking
        fields = ('id', 'house_id', 'user_id', 'booking_date', 'booking_time', 'status')



admin_schema = AdminSchema(many=True)  
banner_schema = BannerSchema(many=True)
house_schema = HouseSchema(many=True)
house_image_schema = HouseImageSchema(many=True)
User_schema = UserSchema(many=True)
hotel_schema = HotelSchema(many=True)
hotel_image_schema = HotelImageSchema(many=True)
agent_schema = AgentSchema(many=True)
customer_schema = CustomerSchema(many=True)
Agent_house_schema = AgentHouseSchema(many=True)
Agent_house_image_schema = AgentHouseImageSchema(many=True)
Agent_house_image_schema = AgentHouseImageSchema(many=True)
Property_Booking_Schema=PropertyBookingSchema(many=True)