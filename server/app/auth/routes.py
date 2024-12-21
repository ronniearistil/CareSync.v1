# MVP Password Hashing 

from flask_bcrypt import Bcrypt
from flask import request, make_response
from flask_jwt_extended import (
    create_access_token,
    create_refresh_token,
    jwt_required,
    get_jwt_identity,
    unset_jwt_cookies
)
from app.auth.services import authenticate_user, register_user, reset_user_password
from app.auth.utils import validate_user_input
from app.models.user_model import User
from app.models.patient_model import Patient
from . import auth_bp
from app import db
from sqlalchemy import func
import logging

# Initialize
bcrypt = Bcrypt()
logger = logging.getLogger(__name__)

# ---------------------------
# User Authentication Routes
# ---------------------------
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
        logger.error(f"Register error: {str(e)}")
        return {"error": "An unexpected error occurred"}, 500
    
    
@auth_bp.route("/login", methods=["POST"])
def login():
    try:
        data = request.get_json()
        email, password = data.get("email"), data.get("password")

        if not email or not password:
            return {"error": "Email and password are required"}, 400

        response = authenticate_user(email, password)
        return response
    except Exception as e:
        logger.error(f"Login error: {str(e)}")
        return {"error": "An unexpected error occurred"}, 500

@auth_bp.route("/reset_password", methods=["POST", "PATCH"])
def reset_password():
    try:
        data = request.get_json()
        email, new_password = data.get("email"), data.get("new_password")

        if not email or not new_password:
            return {"error": "Email and new password are required"}, 400

        response = reset_user_password(email, new_password)
        return response
    except Exception as e:
        logger.error(f"Reset password error: {str(e)}")
        return {"error": "An unexpected error occurred"}, 500

@auth_bp.route("/patients/reset_password", methods=["POST"])
def reset_patient_password():
    try:
        data = request.get_json()
        email = data.get("email")
        new_password = data.get("new_password")

        # Validate inputs
        if not email or not new_password:
            return {"error": "Email and new password are required"}, 400

        if len(new_password) < 8:
            return {"error": "Password must be at least 8 characters"}, 400

        # Check if patient exists
        patient = Patient.query.filter_by(email=email).first()
        if not patient:
            return {"error": "Invalid email or password"}, 400

        # Update password
        patient.password_hash = bcrypt.generate_password_hash(new_password).decode("utf-8")
        db.session.commit()

        return {"message": "Password reset successfully"}, 200

    except Exception as e:
        db.session.rollback()
        logger.error(f"Patient password reset error: {str(e)}")
        return {"error": "An unexpected error occurred. Please try again later."}, 500


@auth_bp.route("/user/login", methods=["POST"])
def login_user():
    try:
        data = request.get_json()
        email, password = data.get("email"), data.get("password")

        if not email or not password:
            return {"error": "Email and password are required"}, 400

        # Ensure the user is not a patient
        user = User.query.filter_by(email=email).filter(User.role != "Patient").first()
        if not user or not bcrypt.check_password_hash(user.password_hash, password):
            return {"error": "Invalid credentials"}, 401

        # Generate tokens
        identity = {"id": user.id, "email": user.email, "role": user.role}
        access_token = create_access_token(identity=identity)
        refresh_token = create_refresh_token(identity=identity)

        response = make_response({"message": "Login successful"}, 200)
        response.set_cookie("access_token_cookie", access_token, httponly=True, max_age=3600)
        response.set_cookie("refresh_token_cookie", refresh_token, httponly=True, max_age=604800)
        return response
    except Exception as e:
        logger.error(f"User login error: {str(e)}")
        return {"error": "An unexpected error occurred"}, 500

@auth_bp.route("/patients/login", methods=["POST"])
def login_patient():
    try:
        # Get email and password from the request
        data = request.get_json()
        email, password = data.get("email"), data.get("password")

        # Validate input
        if not email or not password:
            return {"error": "Email and password are required"}, 400

        # Query the Patient table
        patient = Patient.query.filter_by(email=email).first()

        # Check if patient exists and the password is correct
        if not patient or not bcrypt.check_password_hash(patient.password_hash, password):
            return {"error": "Invalid credentials"}, 401

        # Generate tokens
        identity = {"id": patient.id, "email": patient.email}
        access_token = create_access_token(identity=identity)
        refresh_token = create_refresh_token(identity=identity)

        # Create the response
        response = make_response({"message": "Login successful"}, 200)
        response.set_cookie("access_token_cookie", access_token, httponly=True, max_age=3600)
        response.set_cookie("refresh_token_cookie", refresh_token, httponly=True, max_age=604800)
        return response
    except Exception as e:
        logger.error(f"Patient login error: {str(e)}")
        return {"error": "An unexpected error occurred"}, 500


@auth_bp.route("/me", methods=["GET"])
@jwt_required()
def get_user_profile():
    try:
        # Extract the current user identity from the JWT
        current_user = get_jwt_identity()  # Contains {id, role, email}
        user_id = current_user["id"]
        role = current_user.get("role", None)

        # Check role and fetch the correct model
        if role == "Patient":
            patient = Patient.query.get(user_id)
            if not patient:
                return {"error": "Patient not found"}, 404
            return {
                "id": patient.id,
                "name": f"{patient.first_name} {patient.last_name}",
                "email": patient.email,
                "phone_number": patient.phone_number,
                "role": "Patient"
            }, 200

        elif role in ["Provider", "Admin"]:
            user = User.query.get(user_id)
            if not user:
                return {"error": "User not found"}, 404
            return {
                "id": user.id,
                "name": user.name,
                "email": user.email,
                "role": role
            }, 200

        return {"error": "Invalid role"}, 400

    except Exception as e:
        logger.error(f"Get user profile error: {str(e)}")
        return {"error": "An unexpected error occurred"}, 500

@auth_bp.route("/logout", methods=["POST"])
def logout():
    try:
        response = make_response({"message": "Logout successful"}, 200)
        response.delete_cookie("access_token_cookie")  # Clear access token
        response.delete_cookie("refresh_token_cookie")  # Clear refresh token
        response.delete_cookie("csrf_access_token")  # Explicitly clear CSRF token
        return response
    except Exception as e:
        logger.error(f"Logout error: {str(e)}")
        return {"error": "An unexpected error occurred"}, 500

# ---------------------------
# Global Search
# ---------------------------
@auth_bp.route("/search", methods=["POST"])
@jwt_required()
def global_search():
    try:
        data = request.get_json()
        query = data.get("query")
        page = data.get("page", 1)
        per_page = data.get("per_page", 10)

        if not query:
            return {"error": "Search query is required"}, 400

        search_filter = f"%{query}%"
        logger.info(f"Global search query: {query}, Page: {page}, Per Page: {per_page}")

        # Define a helper function to handle pagination and formatting
        def paginate_and_format(query, formatter, page, per_page):
            paginated = query.paginate(page=page, per_page=per_page, error_out=False)
            return {
                "items": [formatter(item) for item in paginated.items],
                "pagination": {
                    "page": paginated.page,
                    "total_pages": paginated.pages,
                    "total_items": paginated.total,
                },
            }

        # Queries
        patients_query = Patient.query.filter(
            (Patient.first_name.ilike(search_filter)) |
            (Patient.last_name.ilike(search_filter)) |
            (func.concat(Patient.first_name, " ", Patient.last_name).ilike(search_filter)) |
            (Patient.email.ilike(search_filter)) |
            (Patient.phone_number.ilike(search_filter)) |
            (func.cast(Patient.id, db.String).ilike(search_filter))
        )

        users_query = User.query.filter(
            (User.name.ilike(search_filter)) |
            (User.email.ilike(search_filter)) |
            (func.cast(User.id, db.String).ilike(search_filter))
        )

        # Formatters
        def format_patient(patient):
            return {
                "id": patient.id,
                "first_name": patient.first_name,
                "last_name": patient.last_name,
                "email": patient.email,
                "phone_number": patient.phone_number,
                "type": "Patient",
                "route": f"/patients/{patient.id}",
            }

        def format_user(user):
            return {
                "id": user.id,
                "name": user.name,
                "email": user.email,
                "role": user.role,
                "type": "User",
                "route": f"/users/{user.id}",
            }

        # Fetch paginated results
        patients_result = paginate_and_format(patients_query, format_patient, page, per_page)
        users_result = paginate_and_format(users_query, format_user, page, per_page)

        # Combine results
        return {
            "results": patients_result["items"] + users_result["items"],
            "pagination": {
                "patients": patients_result["pagination"],
                "users": users_result["pagination"],
            },
        }, 200

    except Exception as e:
        logger.error(f"Global search error: {str(e)}")
        return {"error": "An unexpected error occurred"}, 500