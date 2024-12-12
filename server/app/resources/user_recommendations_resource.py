# app/resources/user_recommendations_resource.py

from flask_restful import Resource, reqparse
from app.models.user_recommendations_model import UserRecommendation
from app import db

class UserRecommendationResource(Resource):
    def get(self, user_recommendation_id=None):
        """Retrieve user recommendation(s)."""
        try:
            if user_recommendation_id:
                recommendation = UserRecommendation.query.get(user_recommendation_id)
                if not recommendation:
                    return {"error": "User recommendation not found"}, 404
                return {
                    "id": recommendation.id,
                    "user_id": recommendation.user_id,
                    "recommendation_id": recommendation.recommendation_id,
                    "created_at": recommendation.created_at,
                }, 200
            else:
                recommendations = UserRecommendation.query.all()
                return [
                    {
                        "id": r.id,
                        "user_id": r.user_id,
                        "recommendation_id": r.recommendation_id,
                        "created_at": r.created_at,
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
                "id": new_recommendation.id,
            }, 201
        except Exception as e:
            return {"error": str(e)}, 500

    def delete(self, user_recommendation_id):
        """Delete a user recommendation."""
        try:
            recommendation = UserRecommendation.query.get(user_recommendation_id)
            if not recommendation:
                return {"error": "User recommendation not found"}, 404

            db.session.delete(recommendation)
            db.session.commit()
            return {"message": "User recommendation deleted successfully"}, 200
        except Exception as e:
            return {"error": str(e)}, 500
