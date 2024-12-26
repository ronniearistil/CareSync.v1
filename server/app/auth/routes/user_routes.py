# from flask import request, make_response, Blueprint
# from flask_jwt_extended import create_access_token, create_refresh_token
# from app.models.user_model import User
# from flask_bcrypt import Bcrypt
# import logging
# 
# bcrypt = Bcrypt()
# user_bp = Blueprint("user_bp", __name__)
# logger = logging.getLogger(__name__)
# 
# @user_bp.route("/user/login", methods=["POST"])
# def login_user():
#     try:
#         data = request.get_json()
#         email, password = data.get("email"), data.get("password")
#         user = User.query.filter_by(email=email).filter(User.role != "Patient").first()
#         if not user or not bcrypt.check_password_hash(user.password_hash, password):
#             return {"error": "Invalid credentials"}, 401
# 
#         identity = {"id": user.id, "email": user.email, "role": user.role}
#         access_token = create_access_token(identity=identity)
#         refresh_token = create_refresh_token(identity=identity)
# 
#         response = make_response({"message": "Login successful"}, 200)
#         response.set_cookie("access_token_cookie", access_token, httponly=True, max_age=3600)
#         response.set_cookie("refresh_token_cookie", refresh_token, httponly=True, max_age=604800)
#         return response
#     except Exception as e:
#         logger.error(f"User login error: {str(e)}")
#         return {"error": "An unexpected error occurred"}, 500

