from flask_restful import Resource, reqparse
from app.models.analytics_model import Analytics
from app import db

class AnalyticsResource(Resource):
    def get(self, analytics_id=None):
        # Retrieve analytics records (all or by ID)
        try:
            if analytics_id:
                analytics = Analytics.query.get(analytics_id)
                if not analytics:
                    return {"error": "Analytics record not found"}, 404

                return {
                    "id": analytics.id,
                    "user_id": analytics.user_id,
                    "metric": analytics.metric_name,
                    "value": analytics.value
                }, 200

            all_analytics = Analytics.query.all()
            return [
                {
                    "id": analytic.id,
                    "user_id": analytic.user_id,
                    "metric": analytic.metric_name,
                    "value": analytic.value
                }
                for analytic in all_analytics
            ], 200
        except Exception as e:
            return {"error": f"Failed to retrieve analytics records: {str(e)}"}, 500

    def post(self):
        # Create a new analytics record
        parser = reqparse.RequestParser()
        parser.add_argument("user_id", type=int, required=True, help="User ID is required")
        parser.add_argument("metric", type=str, required=True, help="Metric is required")
        parser.add_argument("value", type=int, required=True, help="Value is required")
        data = parser.parse_args()

        try:
            analytics = Analytics(
                user_id=data["user_id"],
                metric_name=data["metric"],
                value=data["value"]
            )
            db.session.add(analytics)
            db.session.commit()
            return {
                "id": analytics.id,
                "user_id": analytics.user_id,
                "metric": analytics.metric_name,
                "value": analytics.value
            }, 201
        except Exception as e:
            return {"error": f"Failed to create analytics record: {str(e)}"}, 500

    def put(self, analytics_id):
        # Update an existing analytics record
        parser = reqparse.RequestParser()
        parser.add_argument("user_id", type=int, required=True, help="User ID is required")
        parser.add_argument("metric", type=str, required=True, help="Metric is required")
        parser.add_argument("value", type=int, required=True, help="Value is required")
        data = parser.parse_args()

        try:
            analytics = Analytics.query.get(analytics_id)
            if not analytics:
                return {"error": "Analytics record not found"}, 404

            analytics.user_id = data["user_id"]
            analytics.metric_name = data["metric"]
            analytics.value = data["value"]
            db.session.commit()

            return {
                "id": analytics.id,
                "user_id": analytics.user_id,
                "metric": analytics.metric_name,
                "value": analytics.value
            }, 200
        except Exception as e:
            return {"error": f"Failed to update analytics record: {str(e)}"}, 500

    def delete(self, analytics_id):
        # Delete an analytics record
        try:
            analytics = Analytics.query.get(analytics_id)
            if not analytics:
                return {"error": "Analytics record not found"}, 404

            db.session.delete(analytics)
            db.session.commit()
            return {"message": f"Analytics record {analytics_id} deleted successfully"}, 200
        except Exception as e:
            return {"error": f"Failed to delete analytics record: {str(e)}"}, 500