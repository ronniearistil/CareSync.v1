# from flask import Blueprint, request, make_response
# from flask_jwt_extended import (
#     create_access_token,
#     create_refresh_token,
#     jwt_required,
#     get_jwt_identity,
#     unset_jwt_cookies
# )
# from app.models.patient_model import Patient
# from app import db
# import logging
# from flask_bcrypt import Bcrypt
# 
# bcrypt = Bcrypt()
# logger = logging.getLogger(__name__)
# 
# # Blueprint
# patient_bp = Blueprint("patient", __name__)
# 
# # Login Patient
# @patient_bp.route("/login", methods=["POST"])
# def login_patient():
#     try:
#         data = request.get_json()
#         email, password = data.get("email"), data.get("password")
# 
#         # Validate inputs
#         if not email or not password:
#             return {"error": "Email and password are required"}, 400
# 
#         # Find patient
#         patient = Patient.query.filter_by(email=email).first()
#         if not patient or not bcrypt.check_password_hash(patient.password_hash, password):
#             return {"error": "Invalid credentials"}, 401
# 
#         # Generate tokens
#         identity = {"id": patient.id, "email": patient.email}
#         access_token = create_access_token(identity=identity)
#         refresh_token = create_refresh_token(identity=identity)
# 
#         # Set cookies
#         response = make_response({"message": "Login successful"}, 200)
#         response.set_cookie("access_token_cookie", access_token, httponly=True, max_age=3600)
#         response.set_cookie("refresh_token_cookie", refresh_token, httponly=True, max_age=604800)
#         return response
#     except Exception as e:
#         logger.error(f"Patient login error: {str(e)}")
#         return {"error": "An unexpected error occurred"}, 500
# 
# 
# # Reset Patient Password
# @patient_bp.route("/reset_password", methods=["POST"])
# def reset_patient_password():
#     try:
#         data = request.get_json()
#         email = data.get("email")
#         new_password = data.get("new_password")
# 
#         # Validate inputs
#         if not email or not new_password:
#             return {"error": "Email and new password are required"}, 400
# 
#         if len(new_password) < 8:
#             return {"error": "Password must be at least 8 characters"}, 400
# 
#         # Find patient
#         patient = Patient.query.filter_by(email=email).first()
#         if not patient:
#             return {"error": "Invalid email or password"}, 400
# 
#         # Update password
#         patient.password_hash = bcrypt.generate_password_hash(new_password).decode("utf-8")
#         db.session.commit()
# 
#         return {"message": "Password reset successfully"}, 200
#     except Exception as e:
#         db.session.rollback()
#         logger.error(f"Patient password reset error: {str(e)}")
#         return {"error": "An unexpected error occurred. Please try again later."}, 500
# 
# 
# # Get Patient Profile
# @patient_bp.route("/me", methods=["GET"])
# @jwt_required()
# def get_patient_profile():
#     try:
#         # Get patient ID
#         current_user = get_jwt_identity()
#         patient_id = current_user["id"]
# 
#         # Find patient
#         patient = Patient.query.get(patient_id)
#         if not patient:
#             return {"error": "Patient not found"}, 404
# 
#         return {
#             "id": patient.id,
#             "name": f"{patient.first_name} {patient.last_name}",
#             "email": patient.email,
#             "phone_number": patient.phone_number,
#         }, 200
#     except Exception as e:
#         logger.error(f"Get patient profile error: {str(e)}")
#         return {"error": "An unexpected error occurred"}, 500
# 
# 
# # Logout Patient
# @patient_bp.route("/logout", methods=["POST"])
# def logout_patient():
#     try:
#         response = make_response({"message": "Logout successful"}, 200)
#         unset_jwt_cookies(response)  # Securely clear JWT cookies
#         return response
#     except Exception as e:
#         logger.error(f"Logout error: {str(e)}")
#         return {"error": "An unexpected error occurred"}, 500


