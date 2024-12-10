# from flask import Blueprint, jsonify
# 
# auth_bp = Blueprint("auth", __name__)
# 
# @auth_bp.route("/login", methods=["POST"])
# def login():
#     return jsonify({"message": "Login route is working!"})
# 
# @auth_bp.route("/register", methods=["POST"])
# def register():
#     return jsonify({"message": "Register route is working!"})

from flask import Blueprint, request, jsonify, make_response
from flask_jwt_extended import create_access_token, create_refresh_token, jwt_required, get_jwt_identity

auth_bp = Blueprint("auth", __name__)

@auth_bp.route("/login", methods=["POST"])
def login():
    """
    Authenticate user and generate access/refresh tokens.
    """
    data = request.get_json()
    # Mock user data (replace with database lookup)
    mock_user = {
        "email": "test@example.com",
        "password": "password123"  # Use hashed passwords in production
    }

    if data["email"] == mock_user["email"] and data["password"] == mock_user["password"]:
        # Create access and refresh tokens
        access_token = create_access_token(identity={"email": mock_user["email"]})
        refresh_token = create_refresh_token(identity={"email": mock_user["email"]})

        # Set tokens as cookies
        response = make_response({"message": "Login successful"}, 200)
        response.set_cookie("access_token_cookie", access_token, httponly=True, max_age=3600)  # 1 hour
        response.set_cookie("refresh_token_cookie", refresh_token, httponly=True, max_age=604800)  # 7 days
        return response

    return {"error": "Invalid credentials"}, 401


@auth_bp.route("/protected", methods=["GET"])
@jwt_required()
def protected():
    """
    Example of a protected route.
    """
    current_user = get_jwt_identity()
    return {"message": f"Hello, {current_user['email']}! This is a protected route."}, 200
