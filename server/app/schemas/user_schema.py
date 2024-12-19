# from app import ma
# from app.models.user_model import User
# 
# class UserSchema(ma.SQLAlchemySchema):
#     class Meta:
#         model = User
#         load_instance = True  # For deserialization
# 
#     id = ma.auto_field()
#     name = ma.auto_field()
#     email = ma.auto_field()
#     role = ma.auto_field()
#     
# 
# user_schema=UserSchema()
# users_schema=UserSchema(many=True)

# MVP Password Hash Update. 

from app import ma
from app.models.user_model import User

class UserSchema(ma.SQLAlchemySchema):
    class Meta:
        model = User
        load_instance = True  # For deserialization

    id = ma.auto_field()
    name = ma.auto_field()
    email = ma.auto_field()
    role = ma.auto_field()
    password = ma.Str(load_only=True)  # Only used during input, not serialized
    password_hash = ma.Str(load_only=True)  # Excluded from output

user_schema = UserSchema()
users_schema = UserSchema(many=True)
