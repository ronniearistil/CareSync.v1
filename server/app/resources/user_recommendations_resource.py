# app/resources/user_recommendations_resource.py

from flask_restful import Resource, reqparse
from app.models.user_recommendations_model import UserRecommendation
from app import db

class UserRecommendationResource(Resource):
    def get(self):
        """Retrieve all user recommendations."""
        try:
            recommendations = UserRecommendation.query.all()
            return [
                {
                    "user_id": r.user_id,
                    "recommendation_id": r.recommendation_id
                }
                for r in recommendations
            ], 200
        except Exception as e:
            return {"error": str(e)}, 500

    def post(self):
        """Create a new user recommendation."""
        parser = reqparse.RequestParser()
        parser.add_argument("user_id", required=True, help="User ID is required")
        parser.add_argument("recommendation_id", required=True, help="Recommendation ID is required")
        args = parser.parse_args()

        try:
            new_recommendation = UserRecommendation(
                user_id=args["user_id"], recommendation_id=args["recommendation_id"]
            )
            db.session.add(new_recommendation)
            db.session.commit()
            return {
                "message": "User recommendation created successfully",
                "user_id": new_recommendation.user_id,
                "recommendation_id": new_recommendation.recommendation_id
            }, 201
        except Exception as e:
            return {"error": str(e)}, 500

    def delete(self):
        """Delete a user recommendation."""
        parser = reqparse.RequestParser()
        parser.add_argument("user_id", required=True, help="User ID is required")
        parser.add_argument("recommendation_id", required=True, help="Recommendation ID is required")
        args = parser.parse_args()

        try:
            recommendation = UserRecommendation.query.filter_by(
                user_id=args["user_id"], recommendation_id=args["recommendation_id"]
            ).first()
            if not recommendation:
                return {"error": "User recommendation not found"}, 404

            db.session.delete(recommendation)
            db.session.commit()
            return {"message": "User recommendation deleted successfully"}, 200
        except Exception as e:
            return {"error": str(e)}, 500
