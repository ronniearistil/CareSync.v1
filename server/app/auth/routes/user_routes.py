# from flask import Blueprint, request, make_response
# from flask_jwt_extended import (
#     create_access_token,
#     create_refresh_token,
#     jwt_required,
#     get_jwt_identity,
#     unset_jwt_cookies
# )
# from app.auth.services import authenticate_user, register_user, reset_user_password
# from app.auth.utils import validate_user_input
# from app.models.user_model import User
# from app import db
# import logging
# from flask_bcrypt import Bcrypt
# 
# bcrypt = Bcrypt()
# logger = logging.getLogger(__name__)
# 
# # Blueprint
# user_bp = Blueprint("user", __name__)
# 
# # Register User
# @user_bp.route("/register", methods=["POST"])
# def register():
#     try:
#         data = request.get_json()
#         validation_errors = validate_user_input(data, ["email", "password", "name"])
# 
#         if validation_errors:
#             return {"error": validation_errors}, 400
# 
#         response = register_user(data)
#         return response
#     except Exception as e:
#         logger.error(f"Register error: {str(e)}")
#         return {"error": "An unexpected error occurred"}, 500
# 
# 
# # Login User
# @user_bp.route("/login", methods=["POST"])
# def login():
#     try:
#         data = request.get_json()
#         email, password = data.get("email"), data.get("password")
# 
#         if not email or not password:
#             return {"error": "Email and password are required"}, 400
# 
#         response = authenticate_user(email, password)
#         return response
#     except Exception as e:
#         logger.error(f"Login error: {str(e)}")
#         return {"error": "An unexpected error occurred"}, 500
# 
# 
# # Reset User Password
# @user_bp.route("/reset_password", methods=["POST", "PATCH"])
# def reset_password():
#     try:
#         data = request.get_json()
#         email, new_password = data.get("email"), data.get("new_password")
# 
#         if not email or not new_password:
#             return {"error": "Email and new password are required"}, 400
# 
#         response = reset_user_password(email, new_password)
#         return response
#     except Exception as e:
#         logger.error(f"Reset password error: {str(e)}")
#         return {"error": "An unexpected error occurred"}, 500
# 
# 
# # Get User Profile
# @user_bp.route("/me", methods=["GET"])
# @jwt_required()
# def get_user_profile():
#     try:
#         current_user = get_jwt_identity()
#         user_id = current_user["id"]
# 
#         user = User.query.get(user_id)
#         if not user:
#             return {"error": "User not found"}, 404
# 
#         return {
#             "id": user.id,
#             "name": user.name,
#             "email": user.email,
#             "role": user.role,
#         }, 200
#     except Exception as e:
#         logger.error(f"Get user profile error: {str(e)}")
#         return {"error": "An unexpected error occurred"}, 500
# 
# 
# # Logout User
# @user_bp.route("/logout", methods=["POST"])
# def logout():
#     try:
#         response = make_response({"message": "Logout successful"}, 200)
#         unset_jwt_cookies(response)  # Clear JWT cookies securely
#         return response
#     except Exception as e:
#         logger.error(f"Logout error: {str(e)}")
#         return {"error": "An unexpected error occurred"}, 500

