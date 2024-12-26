# from flask import request, make_response, Blueprint
# from flask_jwt_extended import create_access_token, create_refresh_token
# from app.auth.services import authenticate_user, register_user, reset_user_password
# from app.auth.utils import validate_user_input
# import logging
# 
# auth_bp = Blueprint("auth_bp", __name__)
# logger = logging.getLogger(__name__)
# 
# @auth_bp.route("/register", methods=["POST"])
# def register():
#     try:
#         data = request.get_json()
#         validation_errors = validate_user_input(data, ["email", "password", "name"])
#         if validation_errors:
#             return {"error": validation_errors}, 400
#         response = register_user(data)
#         return response
#     except Exception as e:
#         logger.error(f"Register error: {str(e)}")
#         return {"error": "An unexpected error occurred"}, 500
# 
# @auth_bp.route("/login", methods=["POST"])
# def login():
#     try:
#         data = request.get_json()
#         email, password = data.get("email"), data.get("password")
#         if not email or not password:
#             return {"error": "Email and password are required"}, 400
#         response = authenticate_user(email, password)
#         return response
#     except Exception as e:
#         logger.error(f"Login error: {str(e)}")
#         return {"error": "An unexpected error occurred"}, 500
# 
# @auth_bp.route("/reset_password", methods=["POST", "PATCH"])
# def reset_password():
#     try:
#         data = request.get_json()
#         email, new_password = data.get("email"), data.get("new_password")
#         if not email or not new_password:
#             return {"error": "Email and new password are required"}, 400
#         response = reset_user_password(email, new_password)
#         return response
#     except Exception as e:
#         logger.error(f"Reset password error: {str(e)}")
#         return {"error": "An unexpected error occurred"}, 500

