# # app/resources/appointment_resource.py
# 
# from flask_restful import Resource, reqparse
# from app.models.appointment_model import Appointment
# from app import db
# 
# 
# class AppointmentResource(Resource):
#     def get(self, appointment_id=None):
#         """
#         Retrieve appointment(s).
#         """
#         print("Inside AppointmentResource.get method")  # Debug
#         try:
#             if appointment_id:
#                 appointment = Appointment.query.get(appointment_id)
#                 if not appointment:
#                     return {"error": "Appointment not found"}, 404
#                 return {
#                     "id": appointment.id,
#                     "date": appointment.date,
#                     "time": appointment.time,
#                     "status": appointment.status,
#                 }, 200
#             else:
#                 appointments = Appointment.query.all()
#                 return [
#                     {
#                         "id": a.id,
#                         "date": a.date,
#                         "time": a.time,
#                         "status": a.status,
#                     }
#                     for a in appointments
#                 ], 200
#         except Exception as e:
#             print(f"Error: {e}")  # Debug
#             return {"error": str(e)}, 500
# 
#     def post(self):
#         """
#         Create a new appointment.
#         """
#         parser = reqparse.RequestParser()
#         parser.add_argument("date", required=True, help="Date is required")
#         parser.add_argument("time", required=True, help="Time is required")
#         parser.add_argument("status", required=True, help="Status is required")
#         args = parser.parse_args()
# 
#         try:
#             # Create a new appointment instance
#             new_appointment = Appointment(
#                 date=args["date"],
#                 time=args["time"],
#                 status=args["status"]
#             )
#             db.session.add(new_appointment)
#             db.session.commit()
#             return {
#                 "message": "Appointment created successfully",
#                 "id": new_appointment.id,
#             }, 201
#         except Exception as e:
#             print(f"Error: {e}")  # Debug
#             return {"error": str(e)}, 500
# 
#     def put(self, appointment_id):
#         """
#         Update an existing appointment.
#         """
#         parser = reqparse.RequestParser()
#         parser.add_argument("date", required=False)
#         parser.add_argument("time", required=False)
#         parser.add_argument("status", required=False)
#         args = parser.parse_args()
# 
#         try:
#             # Fetch appointment by ID
#             appointment = Appointment.query.get(appointment_id)
#             if not appointment:
#                 return {"error": "Appointment not found"}, 404
# 
#             # Update fields if provided
#             if args["date"]:
#                 appointment.date = args["date"]
#             if args["time"]:
#                 appointment.time = args["time"]
#             if args["status"]:
#                 appointment.status = args["status"]
# 
#             db.session.commit()
#             return {"message": "Appointment updated successfully"}, 200
#         except Exception as e:
#             print(f"Error: {e}")  # Debug
#             return {"error": str(e)}, 500
# 
#     def delete(self, appointment_id):
#         """
#         Delete an existing appointment.
#         """
#         try:
#             # Fetch appointment by ID
#             appointment = Appointment.query.get(appointment_id)
#             if not appointment:
#                 return {"error": "Appointment not found"}, 404
# 
#             db.session.delete(appointment)
#             db.session.commit()
#             return {"message": "Appointment deleted successfully"}, 200
#         except Exception as e:
#             print(f"Error: {e}")  # Debug
#             return {"error": str(e)}, 500


from flask_restful import Resource, reqparse
from app.models.appointment_model import Appointment
from app.schemas.appointment_schema import AppointmentSchema
from app import db

# Instantiate the Appointment schema for serialization
appointment_schema = AppointmentSchema()
appointments_schema = AppointmentSchema(many=True)

class AppointmentResource(Resource):
    def get(self, appointment_id=None):
        """
        Retrieve appointment(s).
        """
        print("Inside AppointmentResource.get method")  # Debug
        try:
            if appointment_id:
                appointment = Appointment.query.get(appointment_id)
                if not appointment:
                    return {"error": "Appointment not found"}, 404
                return appointment_schema.dump(appointment), 200
            else:
                appointments = Appointment.query.all()
                return appointments_schema.dump(appointments), 200
        except Exception as e:
            print(f"Error: {e}")  # Debug
            return {"error": "An error occurred while retrieving appointments."}, 500

    def post(self):
        """
        Create a new appointment.
        """
        parser = reqparse.RequestParser()
        parser.add_argument("date", required=True, help="Date is required (format: YYYY-MM-DD)")
        parser.add_argument("time", required=True, help="Time is required (format: HH:MM:SS)")
        parser.add_argument("status", required=True, help="Status is required")
        parser.add_argument("location", required=False)
        parser.add_argument("user_id", required=False, type=int)
        args = parser.parse_args()

        try:
            # Create a new appointment instance
            new_appointment = Appointment(
                date=args["date"],
                time=args["time"],
                status=args["status"],
                location=args.get("location"),
                user_id=args.get("user_id"),
            )
            db.session.add(new_appointment)
            db.session.commit()
            return appointment_schema.dump(new_appointment), 201
        except Exception as e:
            print(f"Error: {e}")  # Debug
            return {"error": "An error occurred while creating the appointment."}, 500

    def put(self, appointment_id):
        """
        Update an existing appointment.
        """
        parser = reqparse.RequestParser()
        parser.add_argument("date", required=False)
        parser.add_argument("time", required=False)
        parser.add_argument("status", required=False)
        parser.add_argument("location", required=False)
        parser.add_argument("user_id", required=False, type=int)
        args = parser.parse_args()

        try:
            # Fetch appointment by ID
            appointment = Appointment.query.get(appointment_id)
            if not appointment:
                return {"error": "Appointment not found"}, 404

            # Update fields if provided
            if args["date"]:
                appointment.date = args["date"]
            if args["time"]:
                appointment.time = args["time"]
            if args["status"]:
                appointment.status = args["status"]
            if args["location"]:
                appointment.location = args["location"]
            if args["user_id"]:
                appointment.user_id = args["user_id"]

            db.session.commit()
            return appointment_schema.dump(appointment), 200
        except Exception as e:
            print(f"Error: {e}")  # Debug
            return {"error": "An error occurred while updating the appointment."}, 500

    def delete(self, appointment_id):
        """
        Delete an existing appointment.
        """
        try:
            # Fetch appointment by ID
            appointment = Appointment.query.get(appointment_id)
            if not appointment:
                return {"error": "Appointment not found"}, 404

            db.session.delete(appointment)
            db.session.commit()
            return {"message": "Appointment deleted successfully"}, 200
        except Exception as e:
            print(f"Error: {e}")  # Debug
            return {"error": "An error occurred while deleting the appointment."}, 500
