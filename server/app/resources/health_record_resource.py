# app/resources/health_record_resource.py

from flask_restful import Resource, reqparse
from app.models.health_record_model import HealthRecord
from app import db

class HealthRecordResource(Resource):
    def get(self, record_id=None):
        """Retrieve health record(s)."""
        try:
            if record_id:
                record = HealthRecord.query.get(record_id)
                if not record:
                    return {"error": "Health record not found"}, 404
                return {
                    "id": record.id,
                    "type": record.type,
                    "status": record.status,
                    "notes": record.notes,
                }, 200
            else:
                records = HealthRecord.query.all()
                return [
                    {
                        "id": r.id,
                        "type": r.type,
                        "status": r.status,
                        "notes": r.notes,
                    }
                    for r in records
                ], 200
        except Exception as e:
            return {"error": str(e)}, 500

    def post(self):
        """Create a new health record."""
        parser = reqparse.RequestParser()
        parser.add_argument("type", required=True, help="Type is required")
        parser.add_argument("status", required=True, help="Status is required")
        parser.add_argument("notes", required=False)
        args = parser.parse_args()

        try:
            new_record = HealthRecord(
                type=args["type"], status=args["status"], notes=args["notes"]
            )
            db.session.add(new_record)
            db.session.commit()
            return {"message": "Health record created successfully", "id": new_record.id}, 201
        except Exception as e:
            return {"error": str(e)}, 500

    def put(self, record_id):
        """Update a health record."""
        parser = reqparse.RequestParser()
        parser.add_argument("type", required=False)
        parser.add_argument("status", required=False)
        parser.add_argument("notes", required=False)
        args = parser.parse_args()

        try:
            record = HealthRecord.query.get(record_id)
            if not record:
                return {"error": "Health record not found"}, 404

            if args["type"]:
                record.type = args["type"]
            if args["status"]:
                record.status = args["status"]
            if args["notes"]:
                record.notes = args["notes"]

            db.session.commit()
            return {"message": "Health record updated successfully"}, 200
        except Exception as e:
            return {"error": str(e)}, 500

    def delete(self, record_id):
        """Delete a health record."""
        try:
            record = HealthRecord.query.get(record_id)
            if not record:
                return {"error": "Health record not found"}, 404

            db.session.delete(record)
            db.session.commit()
            return {"message": "Health record deleted successfully"}, 200
        except Exception as e:
            return {"error": str(e)}, 500
