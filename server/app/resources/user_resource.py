from flask_restful import Resource, reqparse
from app import db, bcrypt
from app.models.user_model import User
from app import db

# bcrypt = Bcrypt()  # Initialize bcrypt

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
        parser.add_argument("role", required=True, choices=["Provider", "Patient"])
        args = parser.parse_args()

        try:
            # Assuming the client sends the already-hashed password
            new_user = User(
                name=args["name"],
                email=args["email"],
                password_hash=args["password"],  # No hashing here
                role=args["role"],
            )
            db.session.add(new_user)
            db.session.commit()
            return {"message": "User created successfully", "id": new_user.id}, 201
        except Exception as e:
            return {"error": str(e)}, 500

    def put(self, user_id):
        """Update a user."""
        parser = reqparse.RequestParser()
        parser.add_argument("name", required=False)
        parser.add_argument("email", required=False)
        parser.add_argument("password", required=False)
        parser.add_argument("role", required=False, choices=["Provider", "Patient"])
        args = parser.parse_args()

        try:
            user = User.query.get(user_id)
            if not user:
                return {"error": "User not found"}, 404

            if args["name"]:
                user.name = args["name"]
            if args["email"]:
                user.email = args["email"]
            if args["password"]:
                # Assuming the client sends the already-hashed password
                user.password_hash = args["password"]  # No hashing here
            if args["role"]:
                user.role = args["role"]

            db.session.commit()
            return {"message": "User updated successfully"}, 200
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