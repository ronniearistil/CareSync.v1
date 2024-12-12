# app/resources/recommendation_resource.py

from flask_restful import Resource, reqparse
from app.models.recommendation_model import Recommendation
from app import db

class RecommendationResource(Resource):
    def get(self, recommendation_id=None):
        """Retrieve recommendation(s)."""
        try:
            if recommendation_id:
                recommendation = Recommendation.query.get(recommendation_id)
                if not recommendation:
                    return {"error": "Recommendation not found"}, 404
                return {
                    "id": recommendation.id,
                    "text": recommendation.text,
                    "category": recommendation.category,
                    "age_group": recommendation.age_group,
                }, 200
            else:
                recommendations = Recommendation.query.all()
                return [
                    {
                        "id": r.id,
                        "text": r.text,
                        "category": r.category,
                        "age_group": r.age_group,
                    }
                    for r in recommendations
                ], 200
        except Exception as e:
            return {"error": str(e)}, 500

    def post(self):
        """Create a new recommendation."""
        parser = reqparse.RequestParser()
        parser.add_argument("text", required=True, help="Text is required")
        parser.add_argument("category", required=True, help="Category is required")
        parser.add_argument("age_group", required=True, help="Age group is required")
        args = parser.parse_args()

        try:
            new_recommendation = Recommendation(
                text=args["text"],
                category=args["category"],
                age_group=args["age_group"],
            )
            db.session.add(new_recommendation)
            db.session.commit()
            return {
                "message": "Recommendation created successfully",
                "id": new_recommendation.id,
            }, 201
        except Exception as e:
            return {"error": str(e)}, 500

    def put(self, recommendation_id):
        """Update a recommendation."""
        parser = reqparse.RequestParser()
        parser.add_argument("text", required=False)
        parser.add_argument("category", required=False)
        parser.add_argument("age_group", required=False)
        args = parser.parse_args()

        try:
            recommendation = Recommendation.query.get(recommendation_id)
            if not recommendation:
                return {"error": "Recommendation not found"}, 404

            if args["text"]:
                recommendation.text = args["text"]
            if args["category"]:
                recommendation.category = args["category"]
            if args["age_group"]:
                recommendation.age_group = args["age_group"]

            db.session.commit()
            return {"message": "Recommendation updated successfully"}, 200
        except Exception as e:
            return {"error": str(e)}, 500

    def delete(self, recommendation_id):
        """Delete a recommendation."""
        try:
            recommendation = Recommendation.query.get(recommendation_id)
            if not recommendation:
                return {"error": "Recommendation not found"}, 404

            db.session.delete(recommendation)
            db.session.commit()
            return {"message": "Recommendation deleted successfully"}, 200
        except Exception as e:
            return {"error": str(e)}, 500
