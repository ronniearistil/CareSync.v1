from flask import make_response
from flask_jwt_extended import create_access_token, create_refresh_token
from app.models.user_model import User
from app import bcrypt, db
from passlib.hash import scrypt


def authenticate_user(email, password):
    user = User.query.filter_by(email=email).first()
    if not user:
        return {"error": "Invalid credentials"}

    if user.password_hash.startswith("scrypt"):
        try:
            if not scrypt.verify(password, user.password_hash):
                return {"error": "Invalid credentials"}
            
            # Rehash to bcrypt
            user.password_hash = bcrypt.generate_password_hash(password).decode("utf-8")
            db.session.commit()
        except ValueError:
            return {"error": "Password hash format is invalid. Contact support."}

    elif not bcrypt.check_password_hash(user.password_hash, password):
        return {"error": "Invalid credentials"}

    access_token = create_access_token(identity={"id": user.id, "email": user.email, "role": user.role})
    refresh_token = create_refresh_token(identity={"id": user.id, "email": user.email, "role": user.role})

    response = make_response({"message": "Login successful"}, 200)
    response.set_cookie("access_token_cookie", access_token, httponly=True, max_age=3600)
    response.set_cookie("refresh_token_cookie", refresh_token, httponly=True, max_age=604800)
    return response


def register_user(data):
    email, password, name, role = data["email"], data["password"], data["name"], data.get("role", "Patient")
    if User.query.filter_by(email=email).first():
        return {"error": "Email already in use"}

    hashed_password = bcrypt.generate_password_hash(password).decode("utf-8")
    new_user = User(email=email, password_hash=hashed_password, name=name, role=role)
    db.session.add(new_user)
    db.session.commit()
    return {"message": "User registered successfully"}, 201


def reset_user_password(email, new_password):
    user = User.query.filter_by(email=email).first()
    if not user:
        return {"error": "User not found"}, 404

    hashed_password = bcrypt.generate_password_hash(new_password).decode("utf-8")
    user.password_hash = hashed_password
    db.session.commit()
    return {"message": "Password reset successfully"}, 200

