from flask import Blueprint
from flask_restful import Api
# from app import cache
from app.resources.analytics_resource import AnalyticsResource

analytics_bp = Blueprint("analytics", __name__)
api = Api(analytics_bp)

# Define resource paths
api.add_resource(AnalyticsResource, "", "/", "/<int:analytics_id>")



