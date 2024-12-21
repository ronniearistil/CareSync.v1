# from flask_restful import Resource, reqparse
# from flask import request
# from marshmallow import ValidationError
# from app.models.patient_model import Patient
# from app.schemas.patient_schema import PatientSchema
# from app import db
# from sqlalchemy.exc import IntegrityError
# 
# # Initialize schemas
# patient_schema = PatientSchema()
# patients_schema = PatientSchema(many=True)
# 
# # appointments_schema = AppointmentSchema(many=True)
# 
# class PatientResource(Resource):
#     def get(self, patient_id=None):
#         """
#         Retrieve a specific patient by ID or all patients.
#         """
#         try:
#             if patient_id:
#                 patient = Patient.query.get(patient_id)
#                 if not patient:
#                     return {"error": "Patient not found"}, 404
#                 return patient_schema.dump(patient), 200
#             
#             patients = Patient.query.all()
#             return patients_schema.dump(patients), 200
#         except Exception as e:
#             return {"error": f"An unexpected error occurred: {str(e)}"}, 500
# 
# 
# 
#     def post(self):
#         """
#         Create a new patient.
#         """
#         try:
#             json_data = request.get_json()
#             data = patient_schema.load(json_data)  # Validate input data
#             
#             new_patient = Patient(
#                 first_name=data["first_name"],
#                 last_name=data["last_name"],
#                 email=data["email"],
#                 phone_number=data.get("phone_number"),
#                 date_of_birth=data.get("date_of_birth"),
#             )
#             db.session.add(new_patient)
#             db.session.commit()
#             return patient_schema.dump(new_patient), 201
#         except ValidationError as err:
#             return {"errors": err.messages}, 400
#         except IntegrityError:
#             db.session.rollback()
#             return {"error": "A patient with this email already exists."}, 400
#         except Exception as e:
#             db.session.rollback()
#             return {"error": f"An unexpected error occurred: {str(e)}"}, 500
# 
#     def put(self, patient_id):
#         """
#         Update an existing patient by ID.
#         """
#         print(f"PUT Request received for patient_id: {patient_id}")  # Debug log
#         json_data = request.get_json()
#         print(f"Payload: {json_data}")  # Debug log
# 
#         patient = Patient.query.get(patient_id)
#         if not patient:
#             return {"error": "Patient not found"}, 404
# 
#         try:
#             data = patient_schema.load(json_data, partial=True)  # Partial update
#             
#             for key, value in data.items():
#                 setattr(patient, key, value)  # Dynamically update fields
#             
#             db.session.commit()
#             return patient_schema.dump(patient), 200
#         except ValidationError as err:
#             return {"errors": err.messages}, 400
#         except IntegrityError:
#             db.session.rollback()
#             return {"error": "A patient with this email already exists."}, 400
#         except Exception as e:
#             db.session.rollback()
#             return {"error": f"An unexpected error occurred: {str(e)}"}, 500
# 
#     def patch(self, patient_id):
#         """
#         Partially update an existing patient by ID.
#         """
#         print(f"PATCH Request received for patient_id: {patient_id}")  # Debug log
#         json_data = request.get_json()
#         print(f"Payload: {json_data}")  # Debug log
# 
#         patient = Patient.query.get(patient_id)
#         if not patient:
#             return {"error": "Patient not found"}, 404
# 
#         try:
#             data = patient_schema.load(json_data, partial=True) 
# 
#             for key, value in data.items():
#                 setattr(patient, key, value)
# 
#             db.session.commit()
#             return patient_schema.dump(patient), 200
#         except ValidationError as err:
#             return {"errors": err.messages}, 400
#         except IntegrityError:
#             db.session.rollback()
#             return {"error": "A patient with this email already exists."}, 400
#         except Exception as e:
#             db.session.rollback()
#             return {"error": f"An unexpected error occurred: {str(e)}"}, 500
#         
#     def delete(self, patient_id):
#         """
#         Delete a patient by ID.
#         """
#         patient = Patient.query.get(patient_id)
#         if not patient:
#             return {"error": "Patient not found"}, 404
# 
#         try:
#             db.session.delete(patient)
#             db.session.commit()
#             return {"message": "Patient deleted successfully"}, 200
#         except Exception as e:
#             db.session.rollback()
#             return {"error": f"An unexpected error occurred: {str(e)}"}, 500



# Post MVP Test

from flask_restful import Resource
from flask import request
from marshmallow import ValidationError
from app.models.patient_model import Patient
from app.schemas.patient_schema import PatientSchema
from app import db
from app import bcrypt
from sqlalchemy.exc import IntegrityError

# Initialize schemas
patient_schema = PatientSchema()
patients_schema = PatientSchema(many=True)

class PatientResource(Resource):
    def get(self, patient_id=None):
        """Retrieve a specific patient by ID or all patients."""
        try:
            if patient_id:
                patient = Patient.query.get(patient_id)
                if not patient:
                    return {"error": "Patient not found"}, 404
                return patient_schema.dump(patient), 200

            patients = Patient.query.all()
            return patients_schema.dump(patients), 200
        except Exception as e:
            return {"error": f"An unexpected error occurred: {str(e)}"}, 500

    def post(self):
        """Create a new patient."""
        try:
            # Enforce JSON Content-Type
            if not request.is_json:
                return {"error": "Invalid Content-Type. Expected application/json"}, 415

            # Parse and sanitize input
            json_data = request.get_json()
            json_data["email"] = json_data["email"].strip().lower()  # Normalize email

            # Validate data
            data = patient_schema.load(json_data)

            # Check for existing email
            existing_patient = Patient.query.filter(
                db.func.lower(Patient.email) == data["email"]
            ).first()
            if existing_patient:
                return {"error": "A patient with this email already exists."}, 400

            # Create and hash password
            new_patient = Patient(
                first_name=data["first_name"],
                last_name=data["last_name"],
                email=data["email"],
                phone_number=data.get("phone_number"),
                date_of_birth=data.get("date_of_birth"),
                address=data.get("address"),
                password_hash=bcrypt.generate_password_hash(data["password"]).decode("utf-8"),
            )

            # Save to database
            db.session.add(new_patient)
            db.session.commit()
            return {"patient": patient_schema.dump(new_patient)}, 201

        except ValidationError as err:
            return {"errors": err.messages}, 400
        except IntegrityError:
            db.session.rollback()
            return {"error": "A patient with this email already exists."}, 400
        except Exception as e:
            db.session.rollback()
            return {"error": f"An unexpected error occurred: {str(e)}"}, 500

    def put(self, patient_id):
        """Update an existing patient by ID."""
        try:
            # Enforce JSON Content-Type
            if not request.is_json:
                return {"error": "Invalid Content-Type. Expected application/json"}, 415

            json_data = request.get_json()
            json_data["email"] = json_data["email"].strip().lower()

            # Find patient
            patient = Patient.query.get(patient_id)
            if not patient:
                return {"error": "Patient not found"}, 404

            # Validate input and update fields
            data = patient_schema.load(json_data, partial=True)
            for key, value in data.items():
                setattr(patient, key, value)

            db.session.commit()
            return patient_schema.dump(patient), 200

        except ValidationError as err:
            return {"errors": err.messages}, 400
        except IntegrityError:
            db.session.rollback()
            return {"error": "A patient with this email already exists."}, 400
        except Exception as e:
            db.session.rollback()
            return {"error": f"An unexpected error occurred: {str(e)}"}, 500

    def patch(self, patient_id):
        """Partially update an existing patient by ID."""
        try:
            # Enforce JSON Content-Type
            if not request.is_json:
                return {"error": "Invalid Content-Type. Expected application/json"}, 415

            json_data = request.get_json()
            json_data["email"] = json_data["email"].strip().lower()

            # Find patient
            patient = Patient.query.get(patient_id)
            if not patient:
                return {"error": "Patient not found"}, 404

            # Validate and update fields
            data = patient_schema.load(json_data, partial=True)
            for key, value in data.items():
                setattr(patient, key, value)

            db.session.commit()
            return patient_schema.dump(patient), 200

        except ValidationError as err:
            return {"errors": err.messages}, 400
        except IntegrityError:
            db.session.rollback()
            return {"error": "A patient with this email already exists."}, 400
        except Exception as e:
            db.session.rollback()
            return {"error": f"An unexpected error occurred: {str(e)}"}, 500

    def delete(self, patient_id):
        """Delete a patient by ID."""
        try:
            patient = Patient.query.get(patient_id)
            if not patient:
                return {"error": "Patient not found"}, 404

            db.session.delete(patient)
            db.session.commit()
            return {"message": "Patient deleted successfully"}, 200
        except Exception as e:
            db.session.rollback()
            return {"error": f"An unexpected error occurred: {str(e)}"}, 500
