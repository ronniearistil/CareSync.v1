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
from . import auth_bp
from app import db
from sqlalchemy import func

bcrypt = Bcrypt()

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
        return {"error": f"An unexpected error occurred: {str(e)}"}, 500


@auth_bp.route("/patients/login", methods=["POST"])
def login_patient():
    try:
        data = request.get_json()
        email, password = data.get("email"), data.get("password")

        if not email or not password:
            return {"error": "Email and password are required"}, 400

        # Filter by role 'Patient'
        patient = User.query.filter_by(email=email, role="Patient").first()
        if not patient or not bcrypt.check_password_hash(patient.password_hash, password):
            return {"error": "Invalid credentials"}, 401

        # Generate tokens
        identity = {"id": patient.id, "email": patient.email, "role": patient.role}
        access_token = create_access_token(identity=identity)
        refresh_token = create_refresh_token(identity=identity)

        response = make_response({"message": "Login successful"}, 200)
        response.set_cookie("access_token_cookie", access_token, httponly=True, max_age=3600)
        response.set_cookie("refresh_token_cookie", refresh_token, httponly=True, max_age=604800)
        return response
    except Exception as e:
        return {"error": f"An unexpected error occurred: {str(e)}"}, 500

#Testing Search Bar 12/16/2024

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
        from app.models.patient_model import Patient  # Import Patient model
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
        return {"error": f"An unexpected error occurred: {str(e)}"}, 500