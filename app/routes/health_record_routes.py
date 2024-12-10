from flask import Blueprint
from flask_restful import Api
from app.resources.health_record_resource import HealthRecordResource

health_record_bp = Blueprint("health_records", __name__)
api = Api(health_record_bp)

# Register resource
api.add_resource(HealthRecordResource, "", "/", "/<int:health_record_id>")
