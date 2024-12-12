# import bcrypt
from flask import make_response
from flask_jwt_extended import create_access_token, create_refresh_token
from app.models.user_model import User
from app import bcrypt 
from app import db
from app.schemas.user_schema import user_schema

def authenticate_user(email, password):
    """
    Authenticate the user by verifying their email and password.
    Only supports bcrypt for password hashing.
    """
    user = User.query.filter_by(email=email).first()
    if not user:
        return {"error": "Invalid credentials"},400

    # Verify bcrypt hash
    if not bcrypt.check_password_hash(user.password_hash, password):
        return {"error": "Invalid credentials"},400

    # Generate JWT tokens
    access_token = create_access_token(identity={"id": user.id, "email": user.email, "role": user.role})
    refresh_token = create_refresh_token(identity={"id": user.id, "email": user.email, "role": user.role})

    # Set tokens as HTTP-only cookies
    response = make_response(user_schema.dump(user),200)
    response.set_cookie("access_token_cookie", access_token, httponly=True, max_age=3600)
    response.set_cookie("refresh_token_cookie", refresh_token, httponly=True, max_age=604800)
    return response

def register_user(data):
    """
    Register a new user with the provided details.
    Ensures email uniqueness and hashes the password using bcrypt.
    """
    email, password, name, role = data["email"], data["password"], data["name"], data.get("role", "Patient")

    # Check if the email is already in use
    if User.query.filter_by(email=email).first():
        print(f"Email already exists: {email}")  # Debugging
        return {"error": "Email already in use"}

    try:
        # Hash password with bcrypt
        print("Hashing password with bcrypt...")  # Debugging
        hashed_password = bcrypt.generate_password_hash(password).decode("utf-8")
        print(f"Generated bcrypt hash: {hashed_password}")  # Debugging

        # Create new user
        new_user = User(email=email, password_hash=hashed_password, name=name, role=role)
        db.session.add(new_user) # type: ignore
        db.session.commit() # type: ignore
        print(f"User {email} registered successfully.")  # Debugging

        return {"message": "User registered successfully"}, 201
    except Exception as e:
        print(f"Error during user registration: {e}")  # Debugging
        db.session.rollback() # type: ignore
        return {"error": "An unexpected error occurred. Contact support."}, 500


def reset_user_password(email, new_password):
    """
    Reset a user's password. Hashes the new password using bcrypt.
    """
    user = User.query.filter_by(email=email).first()
    if not user:
        print(f"User not found: {email}")  # Debugging
        return {"error": "User not found"}, 404

    try:
        # Hash the new password with bcrypt
        hashed_password = bcrypt.generate_password_hash(new_password).decode("utf-8")
        user.password_hash = hashed_password
        db.session.commit() # type: ignore
        print(f"Password for user {email} reset successfully.")  # Debugging
        return {"message": "Password reset successfully"}, 200
    except Exception as e:
        print(f"Error during password reset: {e}")  # Debugging
        db.session.rollback() # type: ignore
        return {"error": "An unexpected error occurred. Contact support."}, 500
