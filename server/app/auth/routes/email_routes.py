# from flask import Blueprint, request, jsonify, url_for
# from itsdangerous import URLSafeTimedSerializer
# from app.utils import send_email
# from app.models.user_model import User
# from app.models.patient_model import Patient
# from app import db
# import os
# import logging
# 
# # Initialize Blueprint and Logger
# email_bp = Blueprint("email", __name__)
# logger = logging.getLogger(__name__)
# 
# # Token Serializer for Email Verification
# serializer = URLSafeTimedSerializer(os.getenv("SECRET_KEY"))
# 
# # Send Confirmation Email
# @email_bp.route("/send-confirmation", methods=["POST"])
# def send_confirmation_email():
#     try:
#         # Parse input data
#         data = request.get_json()
#         email = data.get("email")
#         user_type = data.get("user_type")  # "user" or "patient"
# 
#         # Validate user type
#         if user_type not in ["user", "patient"]:
#             return jsonify({"error": "Invalid user type."}), 400
# 
#         # Fetch user or patient
#         user = User.query.filter_by(email=email).first() if user_type == "user" else Patient.query.filter_by(email=email).first()
#         if not user:
#             return jsonify({"error": "User not found."}), 404
# 
#         # Check if already verified
#         if user.is_verified:
#             return jsonify({"message": "Email already confirmed."}), 200
# 
#         # Generate token and confirmation link
#         token = serializer.dumps(email, salt="email-confirm")
#         confirm_url = url_for("email.confirm_email", token=token, _external=True)
#         subject = "Confirm Your Email Address"
#         body = f"Please click the link to confirm your email: {confirm_url}"
# 
#         # Send Email
#         send_email(email, subject, body)
#         return jsonify({"message": "Confirmation email sent."}), 200
# 
#     except Exception as e:
#         logger.error(f"Send confirmation email error: {str(e)}")
#         return jsonify({"error": "Failed to send confirmation email."}), 500
# 
# 
# # Confirm Email
# @email_bp.route("/confirm-email/<token>", methods=["GET"])
# def confirm_email(token):
#     try:
#         # Verify token and fetch email
#         email = serializer.loads(token, salt="email-confirm", max_age=3600)  # 1-hour expiry
#         user = User.query.filter_by(email=email).first() or Patient.query.filter_by(email=email).first()
# 
#         if user:
#             user.is_verified = True
#             db.session.commit()
#             return jsonify({"message": "Email confirmed successfully."}), 200
# 
#         return jsonify({"error": "User not found."}), 404
# 
#     except Exception as e:
#         logger.error(f"Confirm email error: {str(e)}")
#         return jsonify({"error": "Invalid or expired token."}), 400
# 
# 
# # Resend Confirmation Email
# @email_bp.route("/resend-confirmation", methods=["POST"])
# def resend_confirmation_email():
#     try:
#         # Parse input data
#         data = request.get_json()
#         email = data.get("email")
#         user_type = data.get("user_type")  # "user" or "patient"
# 
#         # Validate user type
#         if user_type not in ["user", "patient"]:
#             return jsonify({"error": "Invalid user type."}), 400
# 
#         # Fetch user or patient
#         user = User.query.filter_by(email=email).first() if user_type == "user" else Patient.query.filter_by(email=email).first()
#         if not user:
#             return jsonify({"error": "User not found."}), 404
# 
#         # Check if already verified
#         if user.is_verified:
#             return jsonify({"message": "Email already confirmed."}), 200
# 
#         # Resend email
#         token = serializer.dumps(email, salt="email-confirm")
#         confirm_url = url_for("email.confirm_email", token=token, _external=True)
#         subject = "Confirm Your Email Address"
#         body = f"Please click the link to confirm your email: {confirm_url}"
#         send_email(email, subject, body)
# 
#         return jsonify({"message": "Confirmation email resent."}), 200
# 
#     except Exception as e:
#         logger.error(f"Resend confirmation email error: {str(e)}")
#         return jsonify({"error": "Failed to resend confirmation email."}), 500
