from flask import Blueprint
from flask_restful import Api
from app.resources.provider_patients_resource import ProviderPatientResource

# Create blueprint
provider_patient_bp = Blueprint("provider_patients", __name__)

# Initialize API
api = Api(provider_patient_bp)

# Register resource with routes
api.add_resource(
    ProviderPatientResource, "/", "/<int:provider_patient_id>"
)

