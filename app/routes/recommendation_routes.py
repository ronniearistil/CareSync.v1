# from flask import Blueprint
# from flask_restful import Api
# from app.resources.recommendation_resource import RecommendationResource
# 
# recommendation_bp = Blueprint("recommendations", __name__)
# api = Api(recommendation_bp)
# 
# # Define resource paths without duplicating "/recommendations"
# api.add_resource(RecommendationResource, "/", "/<int:recommendation_id>")

from flask import Blueprint
from flask_restful import Api
from app.resources.recommendation_resource import RecommendationResource

recommendation_bp = Blueprint("recommendations", __name__)
api = Api(recommendation_bp)

# Define resource paths
api.add_resource(RecommendationResource, "", "/", "/<int:recommendation_id>")
