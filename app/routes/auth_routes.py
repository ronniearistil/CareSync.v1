# 
# from flask import Blueprint, request, jsonify, make_response
# from flask_jwt_extended import create_access_token, create_refresh_token, jwt_required, get_jwt_identity
# from app.models.user_model import User
# from app import bcrypt, db
# 
# auth_bp = Blueprint("auth", __name__)
# 
# @auth_bp.route("/login", methods=["POST"])
# def login():
#     """
#     Authenticate user and generate access/refresh tokens.
#     """
#     try:
#         data = request.get_json()
#         email = data.get("email")
#         password = data.get("password")
# 
#         # Check for missing fields
#         if not email or not password:
#             return {"error": "Email and password are required"}, 400
# 
#         # Fetch user from the database
#         user = User.query.filter_by(email=email).first()
# 
#         # Verify user and password
#         if not user or not bcrypt.check_password_hash(user.password_hash, password):
#             return {"error": "Invalid credentials"}, 401
# 
#         # Create access and refresh tokens
#         access_token = create_access_token(identity={"id": user.id, "email": user.email})
#         refresh_token = create_refresh_token(identity={"id": user.id, "email": user.email})
# 
#         # Set tokens as cookies
#         response = make_response({"message": "Login successful"}, 200)
#         response.set_cookie("access_token_cookie", access_token, httponly=True, max_age=3600)  # 1 hour
#         response.set_cookie("refresh_token_cookie", refresh_token, httponly=True, max_age=604800)  # 7 days
#         return response
#     except Exception as e:
#         return {"error": f"An unexpected error occurred: {str(e)}"}, 500
# 
# 
# @auth_bp.route("/protected", methods=["GET"])
# @jwt_required()
# def protected():
#     """
#     Example of a protected route.
#     """
#     current_user = get_jwt_identity()
#     return {"message": f"Hello, {current_user['email']}! This is a protected route."}, 200
# 
# 
# @auth_bp.route("/register", methods=["POST"])
# def register():
#     """
#     Register a new user.
#     """
#     data = request.get_json()
#     email = data.get("email")
#     password = data.get("password")
#     name = data.get("name")
#     role = data.get("role", "Patient")  # Default to "Patient" if no role is provided
# 
#     if User.query.filter_by(email=email).first():
#         return {"error": "Email already in use"}, 400
# 
#     # Hash password
#     hashed_password = bcrypt.generate_password_hash(password).decode("utf-8")
# 
#     # Create new user
#     new_user = User(email=email, password_hash=hashed_password, name=name, role=role)
#     db.session.add(new_user)
#     db.session.commit()
# 
#     return {"message": "User registered successfully"}, 201

from flask import Blueprint, request, jsonify, make_response
from flask_jwt_extended import create_access_token, create_refresh_token, jwt_required, get_jwt_identity
from app.models.user_model import User
from app import bcrypt, db
from passlib.hash import scrypt

auth_bp = Blueprint("auth", __name__)

from passlib.hash import scrypt

@auth_bp.route("/login", methods=["POST"])
def login():
    try:
        data = request.get_json()

        email = data.get("email")
        password = data.get("password")
        if not email or not password:
            return {"error": "Email and password are required"}, 400

        user = User.query.filter_by(email=email).first()
        if not user:
            return {"error": "Invalid credentials"}, 401

        # Handle scrypt-hashed passwords
        if user.password_hash.startswith("scrypt"):
            try:
                if not scrypt.verify(password, user.password_hash):
                    return {"error": "Invalid credentials"}, 401

                # Rehash password to bcrypt after successful login
                user.password_hash = bcrypt.generate_password_hash(password).decode("utf-8")
                db.session.commit()
            except ValueError:
                return {"error": "Password hash format is invalid. Contact support."}, 400
        else:
            # Validate bcrypt password
            if not bcrypt.check_password_hash(user.password_hash, password):
                return {"error": "Invalid credentials"}, 401

        # Generate tokens
        access_token = create_access_token(identity={"id": user.id, "email": user.email, "role": user.role})
        refresh_token = create_refresh_token(identity={"id": user.id, "email": user.email, "role": user.role})

        response = make_response({"message": "Login successful"}, 200)
        response.set_cookie("access_token_cookie", access_token, httponly=True, max_age=3600)
        response.set_cookie("refresh_token_cookie", refresh_token, httponly=True, max_age=604800)
        return response
    except Exception as e:
        return {"error": f"An unexpected error occurred: {str(e)}"}, 500


@auth_bp.route("/protected", methods=["GET"])
@jwt_required()
def protected():
    """
    Example of a protected route.
    """
    try:
        current_user = get_jwt_identity()
        return {"message": f"Hello, {current_user['email']}! This is a protected route."}, 200
    except Exception as e:
        return {"error": f"An unexpected error occurred: {str(e)}"}, 500


@auth_bp.route("/register", methods=["POST"])
def register():
    """
    Register a new user.
    """
    try:
        data = request.get_json()

        # Validate incoming data
        email = data.get("email")
        password = data.get("password")
        name = data.get("name")
        role = data.get("role", "Patient")  # Default to "Patient" if no role is provided

        if not email or not password or not name:
            return {"error": "Email, password, and name are required"}, 400

        # Updated allowed_roles to include Admin
        allowed_roles = ["Patient", "Provider", "Admin"]
        if role not in allowed_roles:
            return {"error": f"Invalid role. Allowed roles: {', '.join(allowed_roles)}"}, 400

        if User.query.filter_by(email=email).first():
            return {"error": "Email already in use"}, 400

        # Hash password
        hashed_password = bcrypt.generate_password_hash(password).decode("utf-8")

        # Create new user
        new_user = User(email=email, password_hash=hashed_password, name=name, role=role)
        db.session.add(new_user)
        db.session.commit()

        return {"message": "User registered successfully"}, 201
    except Exception as e:
        return {"error": f"An unexpected error occurred: {str(e)}"}, 500
    
@auth_bp.route("/reset_password", methods=["POST"])
def reset_password():
    """
    Allow users to reset their password.
    """
    try:
        data = request.get_json()
        email = data.get("email")
        new_password = data.get("new_password")

        if not email or not new_password:
            return {"error": "Email and new password are required"}, 400

        user = User.query.filter_by(email=email).first()
        if not user:
            return {"error": "User not found"}, 404

        # Hash the new password with bcrypt
        hashed_password = bcrypt.generate_password_hash(new_password).decode("utf-8")
        user.password_hash = hashed_password
        db.session.commit()

        return {"message": "Password reset successfully"}, 200
    except Exception as e:
        return {"error": f"An unexpected error occurred: {str(e)}"}, 500

