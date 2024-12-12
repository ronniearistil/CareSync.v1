# app/resources/provider_patients_resource.py
from flask_restful import Resource, reqparse
from app.models.provider_patients_model import ProviderPatient
from app import db

class ProviderPatientResource(Resource):
    def get(self, relationship_id=None):
        """Retrieve provider-patient relationship(s)."""
        try:
            if relationship_id:
                relationship = ProviderPatient.query.get(relationship_id)
                if not relationship:
                    return {"error": "Relationship not found"}, 404
                return {
                    "id": relationship.id,
                    "provider_id": relationship.provider_id,
                    "patient_id": relationship.patient_id,
                    "created_at": relationship.created_at,
                }, 200
            else:
                relationships = ProviderPatient.query.all()
                return [
                    {
                        "id": r.id,
                        "provider_id": r.provider_id,
                        "patient_id": r.patient_id,
                        "created_at": r.created_at,
                    }
                    for r in relationships
                ], 200
        except Exception as e:
            return {"error": str(e)}, 500

    def post(self):
        """Create a new provider-patient relationship."""
        parser = reqparse.RequestParser()
        parser.add_argument("provider_id", required=True, help="Provider ID is required")
        parser.add_argument("patient_id", required=True, help="Patient ID is required")
        args = parser.parse_args()

        try:
            new_relationship = ProviderPatient(
                provider_id=args["provider_id"], patient_id=args["patient_id"]
            )
            db.session.add(new_relationship)
            db.session.commit()
            return {
                "message": "Provider-patient relationship created successfully",
                "id": new_relationship.id,
            }, 201
        except Exception as e:
            return {"error": str(e)}, 500

    def put(self, relationship_id):
        """Update a provider-patient relationship."""
        parser = reqparse.RequestParser()
        parser.add_argument("provider_id", required=False)
        parser.add_argument("patient_id", required=False)
        args = parser.parse_args()

        try:
            relationship = ProviderPatient.query.get(relationship_id)
            if not relationship:
                return {"error": "Relationship not found"}, 404

            if args["provider_id"]:
                relationship.provider_id = args["provider_id"]
            if args["patient_id"]:
                relationship.patient_id = args["patient_id"]

            db.session.commit()
            return {"message": "Provider-patient relationship updated successfully"}, 200
        except Exception as e:
            return {"error": str(e)}, 500

    def delete(self, relationship_id):
        """Delete a provider-patient relationship."""
        try:
            relationship = ProviderPatient.query.get(relationship_id)
            if not relationship:
                return {"error": "Relationship not found"}, 404

            db.session.delete(relationship)
            db.session.commit()
            return {"message": "Relationship deleted successfully"}, 200
        except Exception as e:
            return {"error": str(e)}, 500
