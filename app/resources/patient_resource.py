from flask_restful import Resource, reqparse
from app.models.patient_model import Patient
from app import db
from app.schemas.patient_schema import PatientSchema

patient_schema = PatientSchema()
patients_schema = PatientSchema(many=True)

class PatientResource(Resource):
    def get(self, patient_id=None):
        if patient_id:
            patient = Patient.query.get(patient_id)
            if not patient:
                return {"error": "Patient not found"}, 404
            return patient_schema.dump(patient), 200
        patients = Patient.query.all()
        return patients_schema.dump(patients), 200

    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument("first_name", required=True)
        parser.add_argument("last_name", required=True)
        parser.add_argument("email", required=True)
        parser.add_argument("phone_number")
        parser.add_argument("date_of_birth")
        args = parser.parse_args()

        new_patient = Patient(
            first_name=args["first_name"],
            last_name=args["last_name"],
            email=args["email"],
            phone_number=args.get("phone_number"),
            date_of_birth=args.get("date_of_birth"),
        )
        db.session.add(new_patient)
        db.session.commit()
        return patient_schema.dump(new_patient), 201

    def put(self, patient_id):
        patient = Patient.query.get(patient_id)
        if not patient:
            return {"error": "Patient not found"}, 404

        parser = reqparse.RequestParser()
        parser.add_argument("first_name")
        parser.add_argument("last_name")
        parser.add_argument("email")
        parser.add_argument("phone_number")
        parser.add_argument("date_of_birth")
        args = parser.parse_args()

        if args["first_name"]:
            patient.first_name = args["first_name"]
        if args["last_name"]:
            patient.last_name = args["last_name"]
        if args["email"]:
            patient.email = args["email"]
        if args["phone_number"]:
            patient.phone_number = args["phone_number"]
        if args["date_of_birth"]:
            patient.date_of_birth = args["date_of_birth"]

        db.session.commit()
        return patient_schema.dump(patient), 200

    def delete(self, patient_id):
        patient = Patient.query.get(patient_id)
        if not patient:
            return {"error": "Patient not found"}, 404

        db.session.delete(patient)
        db.session.commit()
        return {"message": "Patient deleted successfully"}, 200
