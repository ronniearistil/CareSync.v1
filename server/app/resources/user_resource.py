# from flask_restful import Resource, reqparse
# from app.models.user_model import User
# from sqlalchemy.exc import IntegrityError
# from app import db
# 
# class UserResource(Resource):
#     def get(self, user_id=None):
#         """Retrieve user(s)."""
#         try:
#             if user_id:
#                 user = User.query.get(user_id)
#                 if not user:
#                     return {"error": "User not found"}, 404
#                 return {
#                     "id": user.id,
#                     "name": user.name,
#                     "email": user.email,
#                     "role": user.role,
#                 }, 200
#             else:
#                 users = User.query.all()
#                 return [
#                     {"id": u.id, "name": u.name, "email": u.email, "role": u.role}
#                     for u in users
#                 ], 200
#         except Exception as e:
#             return {"error": str(e)}, 500
# 
#     def post(self):
#         """Create a new user."""
#         parser = reqparse.RequestParser()
#         parser.add_argument("name", required=True, help="Name is required")
#         parser.add_argument("email", required=True, help="Email is required")
#         parser.add_argument("password", required=True, help="Password is required")
#         parser.add_argument("role", required=True, choices=["Provider", "Admin"])
#         args = parser.parse_args()
# 
#         try:
#             new_user = User(
#                 name=args["name"],
#                 email=args["email"],
#                 password_hash=args["password"],  # Assuming already hashed
#                 role=args["role"],
#             )
#             db.session.add(new_user)
#             db.session.commit()
#             return {
#                 "id": new_user.id,
#                 "name": new_user.name,
#                 "email": new_user.email,
#                 "role": new_user.role,
#             }, 201
#         except IntegrityError:
#             db.session.rollback()
#             return {"error": "Email already exists."}, 400
#         except Exception as e:
#             return {"error": str(e)}, 500
# 
#     def put(self, user_id):
#         """Update a user."""
#         parser = reqparse.RequestParser()
#         parser.add_argument("name", required=False)
#         parser.add_argument("email", required=False)
#         parser.add_argument("password", required=False)
#         parser.add_argument("role", required=False, choices=["Provider", "Admin"])
#         args = parser.parse_args()
# 
#         try:
#             user = User.query.get(user_id)
#             if not user:
#                 return {"error": "User not found"}, 404
# 
#             if args["name"]:
#                 user.name = args["name"]
#             if args["email"]:
#                 user.email = args["email"]
#             if args["password"]:
#                 user.password_hash = args["password"] 
#             if args["role"]:
#                 user.role = args["role"]
# 
#             db.session.commit()
#             return {
#                 "id": user.id,
#                 "name": user.name,
#                 "email": user.email,
#                 "role": user.role,
#             }, 200
#         except IntegrityError:
#             db.session.rollback()
#             return {"error": "Email already exists."}, 400
#         except Exception as e:
#             return {"error": str(e)}, 500
# 
#     def patch(self, user_id):
#         """Partially update a user."""
#         parser = reqparse.RequestParser()
#         parser.add_argument("name", required=False)
#         parser.add_argument("email", required=False)
#         parser.add_argument("password", required=False)
#         parser.add_argument("role", required=False, choices=["Provider", "Admin"])
#         args = parser.parse_args()
# 
#         try:
#             user = User.query.get(user_id)
#             if not user:
#                 return {"error": "User not found"}, 404
# 
#             if args["name"]:
#                 user.name = args["name"]
#             if args["email"]:
#                 user.email = args["email"]
#             if args["password"]:
#                 user.password_hash = args["password"] 
#             if args["role"]:
#                 user.role = args["role"]
# 
#             db.session.commit()
#             # Return the updated user data
#             return {
#                 "id": user.id,
#                 "name": user.name,
#                 "email": user.email,
#                 "role": user.role,
#             }, 200
#         except IntegrityError:
#             db.session.rollback()
#             return {"error": "Email already exists."}, 400
#         except Exception as e:
#             return {"error": str(e)}, 500
# 
#     def delete(self, user_id):
#         """Delete a user."""
#         try:
#             user = User.query.get(user_id)
#             if not user:
#                 return {"error": "User not found"}, 404
# 
#             db.session.delete(user)
#             db.session.commit()
#             return {"message": "User deleted successfully"}, 200
#         except Exception as e:
#             return {"error": str(e)}, 500


# MVP Test 

from flask_restful import Resource, reqparse
from app.models.user_model import User
from sqlalchemy.exc import IntegrityError
from app import db, bcrypt

class UserResource(Resource):
    def get(self, user_id=None):
        """Retrieve user(s)."""
        try:
            if user_id:
                user = User.query.get(user_id)
                if not user:
                    return {"error": "User not found"}, 404
                return {
                    "id": user.id,
                    "name": user.name,
                    "email": user.email,
                    "role": user.role,
                }, 200
            else:
                users = User.query.all()
                return [
                    {"id": u.id, "name": u.name, "email": u.email, "role": u.role}
                    for u in users
                ], 200
        except Exception as e:
            return {"error": str(e)}, 500

    def post(self):
        """Create a new user."""
        parser = reqparse.RequestParser()
        parser.add_argument("name", required=True, help="Name is required")
        parser.add_argument("email", required=True, help="Email is required")
        parser.add_argument("password", required=True, help="Password is required")
        parser.add_argument("role", required=True, choices=["Provider", "Admin"])
        args = parser.parse_args()

        try:
            hashed_password = bcrypt.generate_password_hash(args["password"]).decode('utf-8')
            new_user = User(
                name=args["name"],
                email=args["email"],
                password_hash=hashed_password,
                role=args["role"],
            )
            db.session.add(new_user)
            db.session.commit()
            return {
                "id": new_user.id,
                "name": new_user.name,
                "email": new_user.email,
                "role": new_user.role,
            }, 201
        except IntegrityError:
            db.session.rollback()
            return {"error": "Email already exists."}, 400
        except Exception as e:
            return {"error": str(e)}, 500

    def put(self, user_id):
        """Update a user."""
        parser = reqparse.RequestParser()
        parser.add_argument("name", required=False)
        parser.add_argument("email", required=False)
        parser.add_argument("password", required=False)
        parser.add_argument("role", required=False, choices=["Provider", "Admin"])
        args = parser.parse_args()

        try:
            user = User.query.get(user_id)
            if not user:
                return {"error": "User not found"}, 404

            if args["email"]:
                existing_user = User.query.filter_by(email=args["email"]).first()
                if existing_user and existing_user.id != user.id:
                    return {"error": "Email already exists."}, 400

            if args["name"]:
                user.name = args["name"]
            if args["email"]:
                user.email = args["email"]
            if args["password"]:
                user.password_hash = bcrypt.generate_password_hash(args["password"]).decode('utf-8')
            if args["role"]:
                user.role = args["role"]

            db.session.commit()
            return {
                "id": user.id,
                "name": user.name,
                "email": user.email,
                "role": user.role,
            }, 200
        except IntegrityError:
            db.session.rollback()
            return {"error": "Email already exists."}, 400
        except Exception as e:
            return {"error": str(e)}, 500

    def patch(self, user_id):
        """Partially update a user."""
        parser = reqparse.RequestParser()
        parser.add_argument("name", required=False)
        parser.add_argument("email", required=False)
        parser.add_argument("password", required=False)
        parser.add_argument("role", required=False, choices=["Provider", "Admin"])
        args = parser.parse_args()

        try:
            user = User.query.get(user_id)
            if not user:
                return {"error": "User not found"}, 404

            if args["email"]:
                existing_user = User.query.filter_by(email=args["email"]).first()
                if existing_user and existing_user.id != user.id:
                    return {"error": "Email already exists."}, 400

            if args["name"]:
                user.name = args["name"]
            if args["email"]:
                user.email = args["email"]
            if args["password"]:
                user.password_hash = bcrypt.generate_password_hash(args["password"]).decode('utf-8')
            if args["role"]:
                user.role = args["role"]

            db.session.commit()
            return {
                "id": user.id,
                "name": user.name,
                "email": user.email,
                "role": user.role,
            }, 200
        except IntegrityError:
            db.session.rollback()
            return {"error": "Email already exists."}, 400
        except Exception as e:
            return {"error": str(e)}, 500

    def delete(self, user_id):
        """Delete a user."""
        try:
            user = User.query.get(user_id)
            if not user:
                return {"error": "User not found"}, 404

            db.session.delete(user)
            db.session.commit()
            return {"message": "User deleted successfully"}, 200
        except Exception as e:
            return {"error": str(e)}, 500
# 