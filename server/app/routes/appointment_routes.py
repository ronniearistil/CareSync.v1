from flask import Blueprint
from flask_restful import Api
from app.resources.appointment_resource import AppointmentResource

appointment_bp = Blueprint("appointments", __name__)
api = Api(appointment_bp)

# Define resource paths
api.add_resource(AppointmentResource, "", "/", "/<int:appointment_id>")
