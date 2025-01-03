from flask import Blueprint
from flask_restful import Api
from app.resources.user_resource import UserResource

user_bp = Blueprint("users", __name__)
api = Api(user_bp)

# Define resource paths
api.add_resource(UserResource, "", "/", "/<int:user_id>")
