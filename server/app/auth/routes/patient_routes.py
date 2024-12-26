# from flask import request, make_response, Blueprint
# from flask_jwt_extended import create_access_token, create_refresh_token
# from app.models.patient_model import Patient
# from app import db
# from flask_bcrypt import Bcrypt
# import logging
# 
# bcrypt = Bcrypt()
# patient_bp = Blueprint("patient_bp", __name__)
# logger = logging.getLogger(__name__)
# 
# @patient_bp.route("/patients/login", methods=["POST"])
# def login_patient():
#     try:
#         data = request.get_json()
#         email, password = data.get("email"), data.get("password")
#         patient = Patient.query.filter_by(email=email).first()
#         if not patient or not bcrypt.check_password_hash(patient.password_hash, password):
#             return {"error": "Invalid credentials"}, 401
# 
#         identity = {"id": patient.id, "email": patient.email}
#         access_token = create_access_token(identity=identity)
#         refresh_token = create_refresh_token(identity=identity)
# 
#         response = make_response({"message": "Login successful"}, 200)
#         response.set_cookie("access_token_cookie", access_token, httponly=True)
#         response.set_cookie("refresh_token_cookie", refresh_token, httponly=True)
#         return response
#     except Exception as e:
#         logger.error(f"Patient login error: {str(e)}")
#         return {"error": "An unexpected error occurred"}, 500
# 
# @patient_bp.route("/patients/reset_password", methods=["POST"])
# def reset_patient_password():
#     try:
#         data = request.get_json()
#         email = data.get("email")
#         new_password = data.get("new_password")
#         if not email or not new_password:
#             return {"error": "Email and new password are required"}, 400
# 
#         patient = Patient.query.filter_by(email=email).first()
#         if not patient:
#             return {"error": "Invalid email or password"}, 400
# 
#         patient.password_hash = bcrypt.generate_password_hash(new_password).decode("utf-8")
#         db.session.commit()
#         return {"message": "Password reset successfully"}, 200
#     except Exception as e:
#         db.session.rollback()
#         logger.error(f"Patient password reset error: {str(e)}")
#         return {"error": "An unexpected error occurred."}, 500

