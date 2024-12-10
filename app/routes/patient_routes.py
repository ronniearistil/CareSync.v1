from flask import Blueprint
from flask_restful import Api
from app.resources.patient_resource import PatientResource

patient_bp = Blueprint("patients", __name__)
api = Api(patient_bp)

# Define resource paths
api.add_resource(PatientResource, "", "/", "/<int:patient_id>")



