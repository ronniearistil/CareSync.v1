from flask import jsonify
from flask_restful import Resource, reqparse
from app.models.analytics_model import Analytics
from app import db
from datetime import datetime, timedelta
from app.models.user_model import User
from app.models.appointment_model import Appointment
from app.models.health_record_model import HealthRecord
from sqlalchemy import func

from app.models.patient_model import Patient

# Helper function to calculate analytics data
from datetime import datetime, timedelta
from sqlalchemy import func
from app import db
from app.models.user_model import User
from app.models.appointment_model import Appointment
from app.models.health_record_model import HealthRecord


def calculate_analytics():
    try:
        # Total users
        total_users = db.session.query(func.count(User.id)).scalar()

        # Active users based on scheduled appointments
        active_users = db.session.query(func.count(Appointment.patient_id.distinct())) \
            .filter(Appointment.status == "Scheduled").scalar()

        # Active appointments
        active_appointments = db.session.query(func.count(Appointment.id)) \
            .filter(Appointment.status == "Scheduled").scalar()

        # Canceled appointments
        canceled_appointments = db.session.query(func.count(Appointment.id)) \
            .filter(Appointment.status == "Cancelled").scalar()

        # Overdue health records
        overdue_records = db.session.query(func.count(HealthRecord.id)) \
            .filter(HealthRecord.status == "Overdue").scalar()

        # Completed procedures
        completed_procedures = db.session.query(func.count(HealthRecord.id)) \
            .filter(HealthRecord.status == "Completed").scalar()

        # New users in the last 30 days
        last_30_days = datetime.utcnow() - timedelta(days=30)
        new_users = db.session.query(func.count(User.id)).filter(
            User.id >= total_users - 10  # Approximation using sequential IDs
        ).scalar()
        
        # Total patients
        total_patients = db.session.query(func.count(Patient.id)).scalar()

        # Active patients based on scheduled appointments
        active_patients = db.session.query(func.count(Appointment.patient_id.distinct())) \
            .filter(Appointment.status == "Scheduled").scalar()


        return {
    "total_users": total_users,
    "active_users": active_users,
    "total_patients": total_patients,  # Added
    "active_patients": active_patients,  # Added
    "active_appointments": active_appointments,
    "canceled_appointments": canceled_appointments,
    "overdue_records": overdue_records,
    "completed_procedures": completed_procedures,
    "new_users": new_users,
}


    except Exception as e:
        print(f"Error in calculate_analytics: {str(e)}")
        return {"error": "Failed to calculate analytics."}

class AnalyticsResource(Resource):
    def get(self, analytics_id=None):
        try:
            if analytics_id is None:
                # Return aggregated analytics data
                analytics_data = calculate_analytics()
                return jsonify(analytics_data)

            # Fetch a specific analytics record by ID
            analytics = Analytics.query.get(analytics_id)
            if not analytics:
                return {"error": "Analytics record not found"}, 404

            return {
                "id": analytics.id,
                "user_id": analytics.user_id,
                "metric": analytics.metric_name,
                "value": analytics.value,
                "calculated_at": analytics.calculated_at,
            }, 200

        except Exception as e:
            return {"error": f"Failed to fetch analytics data: {str(e)}"}, 500

    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument("user_id", type=int, required=True, help="User ID is required")
        parser.add_argument("metric", type=str, required=True, help="Metric is required")
        parser.add_argument("value", type=int, required=True, help="Value is required")
        data = parser.parse_args()

        try:
            analytics = Analytics(
                user_id=data["user_id"],
                metric_name=data["metric"],
                value=data["value"]
            )
            db.session.add(analytics)
            db.session.commit()

            return {
                "id": analytics.id,
                "user_id": analytics.user_id,
                "metric": analytics.metric_name,
                "value": analytics.value,
                "calculated_at": analytics.calculated_at,
            }, 201

        except Exception as e:
            return {"error": f"Failed to create analytics record: {str(e)}"}, 500

    def put(self, analytics_id):
        parser = reqparse.RequestParser()
        parser.add_argument("user_id", type=int, required=True, help="User ID is required")
        parser.add_argument("metric", type=str, required=True, help="Metric is required")
        parser.add_argument("value", type=int, required=True, help="Value is required")
        data = parser.parse_args()

        try:
            analytics = Analytics.query.get(analytics_id)
            if not analytics:
                return {"error": "Analytics record not found"}, 404

            analytics.user_id = data["user_id"]
            analytics.metric_name = data["metric"]
            analytics.value = data["value"]
            db.session.commit()

            return {
                "id": analytics.id,
                "user_id": analytics.user_id,
                "metric": analytics.metric_name,
                "value": analytics.value,
                "calculated_at": analytics.calculated_at,
            }, 200

        except Exception as e:
            return {"error": f"Failed to update analytics record: {str(e)}"}, 500

    def delete(self, analytics_id):
        try:
            analytics = Analytics.query.get(analytics_id)
            if not analytics:
                return {"error": "Analytics record not found"}, 404

            db.session.delete(analytics)
            db.session.commit()
            return {"message": f"Analytics record {analytics_id} deleted successfully"}, 200

        except Exception as e:
            return {"error": f"Failed to delete analytics record: {str(e)}"}, 500




