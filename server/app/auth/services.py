# from flask import make_response
# from flask_jwt_extended import create_access_token, create_refresh_token
# from app.models.user_model import User
# from app import bcrypt, db
# from app.schemas.user_schema import user_schema
# 
# 
# def authenticate_user(email, password):
#     try:
#         # Check if the user exists
#         user = User.query.filter_by(email=email).first()
#         if not user:
#             return {"error": "Invalid credentials"}, 400
# 
#         # Verify password
#         if not bcrypt.check_password_hash(user.password_hash, password):
#             return {"error": "Invalid credentials"}, 400
# 
#         # Generate tokens
#         identity = {"id": user.id, "email": user.email, "role": user.role}
#         access_token = create_access_token(identity=identity)
#         refresh_token = create_refresh_token(identity=identity)
# 
#         # Set cookies
#         response = make_response(user_schema.dump(user), 200)
#         response.set_cookie("access_token_cookie", access_token, httponly=True, max_age=3600)
#         response.set_cookie("refresh_token_cookie", refresh_token, httponly=True, max_age=604800)
#         return response
#     except Exception as e:
#         return {"error": f"An unexpected error occurred: {str(e)}"}, 500
# 
# 
# def register_user(data):
#     try:
#         email = data.get("email")
#         password = data.get("password")
#         name = data.get("name")
#         role = data.get("role", "Patient")
# 
#         # Validate required fields
#         if not email or not password or not name or role not in ["Provider", "Admin"]:
#             return {"error": "Invalid input provided."}, 400
# 
#         # Check for duplicate email
#         if User.query.filter_by(email=email).first():
#             return {"error": "Email already in use"}, 400
# 
#         # Hash the password
#         hashed_password = bcrypt.generate_password_hash(password).decode("utf-8")
# 
#         # Create new user
#         new_user = User(email=email, password_hash=hashed_password, name=name, role=role)
#         db.session.add(new_user)
#         db.session.commit()
# 
#         return {"message": "User registered successfully"}, 201
#     except Exception as e:
#         db.session.rollback()  # Roll back any changes in case of failure
#         return {"error": f"An unexpected error occurred: {str(e)}"}, 500
# 
# 
# def reset_user_password(email, new_password):
#     try:
#         # Find user by email
#         user = User.query.filter_by(email=email).first()
#         if not user:
#             return {"error": "User not found"}, 404
# 
#         # Hash the new password
#         hashed_password = bcrypt.generate_password_hash(new_password).decode("utf-8")
#         user.password_hash = hashed_password
#         db.session.commit()
# 
#         return {"message": "Password reset successfully"}, 200
#     except Exception as e:
#         db.session.rollback()  # Roll back any changes in case of failure
#         return {"error": f"An unexpected error occurred: {str(e)}"}, 500


# MVP Password Hash Update

from flask import make_response
from flask_jwt_extended import create_access_token, create_refresh_token
from app.models.user_model import User
from app import bcrypt, db
from app.schemas.user_schema import user_schema


def authenticate_user(email, password):
    try:
        # Check if the user exists
        user = User.query.filter_by(email=email).first()
        if not user:
            return {"error": "Invalid credentials"}, 400

        # Verify password
        if not bcrypt.check_password_hash(user.password_hash, password):
            return {"error": "Invalid credentials"}, 400

        # Generate tokens
        identity = {"id": user.id, "email": user.email, "role": user.role}
        access_token = create_access_token(identity=identity)
        refresh_token = create_refresh_token(identity=identity)

        # Serialize user data while excluding sensitive fields
        serialized_user = user_schema.dump(user)
        print(f"Serialized User Data: {serialized_user}")  # Debugging

        # Set cookies
        response = make_response(serialized_user, 200)
        response.set_cookie("access_token_cookie", access_token, httponly=True, max_age=3600)
        response.set_cookie("refresh_token_cookie", refresh_token, httponly=True, max_age=604800)
        return response
    except Exception as e:
        return {"error": f"An unexpected error occurred: {str(e)}"}, 500


def register_user(data):
    try:
        email = data.get("email")
        password = data.get("password")
        name = data.get("name")
        role = data.get("role", "Patient")

        # Validate required fields
        if not email or not password or not name or role not in ["Provider", "Admin"]:
            return {"error": "Invalid input provided."}, 400

        # Check for duplicate email
        if User.query.filter_by(email=email).first():
            return {"error": "Email already in use"}, 400

        # Hash the password
        hashed_password = bcrypt.generate_password_hash(password).decode("utf-8")

        # Create new user
        new_user = User(email=email, password_hash=hashed_password, name=name, role=role)
        db.session.add(new_user)
        db.session.commit()

        # Return success message without sensitive data
        return {"message": "User registered successfully"}, 201
    except Exception as e:
        db.session.rollback()  # Roll back any changes in case of failure
        return {"error": f"An unexpected error occurred: {str(e)}"}, 500


def reset_user_password(email, new_password):
    try:
        # Find user by email
        user = User.query.filter_by(email=email).first()
        if not user:
            return {"error": "User not found"}, 404

        # Hash the new password
        hashed_password = bcrypt.generate_password_hash(new_password).decode("utf-8")
        user.password_hash = hashed_password
        db.session.commit()

        return {"message": "Password reset successfully"}, 200
    except Exception as e:
        db.session.rollback()  # Roll back any changes in case of failure
        return {"error": f"An unexpected error occurred: {str(e)}"}, 500
