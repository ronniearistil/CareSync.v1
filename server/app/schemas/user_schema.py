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

user_schema=UserSchema()
users_schema=UserSchema(many=True)