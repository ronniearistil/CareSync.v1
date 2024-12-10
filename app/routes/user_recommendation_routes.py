from flask import Blueprint
from flask_restful import Api
from app.resources.user_recommendations_resource import UserRecommendationResource

user_recommendation_bp = Blueprint("user_recommendations", __name__)
api = Api(user_recommendation_bp)

# Register resource for full CRUD
api.add_resource(UserRecommendationResource, "/user_recommendations", "/user_recommendations/<int:user_recommendation_id>")
