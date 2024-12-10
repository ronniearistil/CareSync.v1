# from flask import Blueprint
# from flask_restful import Api
# from app.resources.analytics_resource import AnalyticsResource
# 
# analytics_bp = Blueprint("analytics", __name__)
# api = Api(analytics_bp)
# 
# # Register resource
# api.add_resource(AnalyticsResource, "/", "/<int:analytics_id>")

from flask import Blueprint
from flask_restful import Api
from app.resources.analytics_resource import AnalyticsResource

analytics_bp = Blueprint("analytics", __name__)
api = Api(analytics_bp)

# Define resource paths
api.add_resource(AnalyticsResource, "", "/", "/<int:analytics_id>")
