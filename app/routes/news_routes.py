from flask import Blueprint
from flask_restful import Api
from app.resources.news_resource import NewsResource

news_bp = Blueprint("news", __name__)
api = Api(news_bp)

# Define resource paths
api.add_resource(NewsResource, "", "/", "/<int:news_id>")
