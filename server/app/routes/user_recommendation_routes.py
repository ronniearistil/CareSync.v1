from flask import Blueprint
from flask_restful import Api
from app.resources.user_recommendations_resource import UserRecommendationResource

user_recommendation_bp = Blueprint("user_recommendations", __name__)
api = Api(user_recommendation_bp)

# Define resource paths
api.add_resource(
    UserRecommendationResource,
    "",
    "/",
    "/<int:user_recommendation_id>"
)
