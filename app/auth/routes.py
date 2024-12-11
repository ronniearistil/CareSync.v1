from flask import request, jsonify, make_response
from flask_jwt_extended import jwt_required, get_jwt_identity, unset_jwt_cookies
from app.auth.services import authenticate_user, register_user, reset_user_password
from app.auth.utils import validate_user_input
from . import auth_bp


@auth_bp.route("/login", methods=["POST"])
def login():
    try:
        data = request.get_json()
        email, password = data.get("email"), data.get("password")

        if not email or not password:
            return {"error": "Email and password are required"}, 400

        response = authenticate_user(email, password)
        if response.get("error"):
            return response, 401

        return response
    except Exception as e:
        return {"error": f"An unexpected error occurred: {str(e)}"}, 500


@auth_bp.route("/protected", methods=["GET"])
@jwt_required()
def protected():
    try:
        current_user = get_jwt_identity()
        return {"message": f"Hello, {current_user['email']}! This is a protected route."}, 200
    except Exception as e:
        return {"error": f"An unexpected error occurred: {str(e)}"}, 500


@auth_bp.route("/register", methods=["POST"])
def register():
    try:
        data = request.get_json()
        validation_errors = validate_user_input(data, ["email", "password", "name"])

        if validation_errors:
            return {"error": validation_errors}, 400

        response = register_user(data)
        return response
    except Exception as e:
        return {"error": f"An unexpected error occurred: {str(e)}"}, 500


@auth_bp.route("/reset_password", methods=["POST"])
def reset_password():
    try:
        data = request.get_json()
        email, new_password = data.get("email"), data.get("new_password")

        if not email or not new_password:
            return {"error": "Email and new password are required"}, 400

        response = reset_user_password(email, new_password)
        return response
    except Exception as e:
        return {"error": f"An unexpected error occurred: {str(e)}"}, 500


@auth_bp.route("/logout", methods=["POST"])
def logout():
    try:
        response = make_response({"message": "Logout successful"}, 200)
        unset_jwt_cookies(response)
        return response
    except Exception as e:
        return {"error": f"An unexpected error occurred: {str(e)}"}, 500

