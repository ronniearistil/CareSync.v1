# app/resources/analytics_resource.py

from flask_restful import Resource
from app.models.analytics_model import Analytics
from app import db

class AnalyticsResource(Resource):
    def get(self, analytics_id=None):
        """Retrieve analytics data."""
        try:
            if analytics_id:
                analytics = Analytics.query.get(analytics_id)
                if not analytics:
                    return {"error": "Analytics record not found"}, 404
                return {
                    "id": analytics.id,
                    "data": analytics.data,
                    "created_at": analytics.created_at,
                }, 200
            else:
                analytics_data = Analytics.query.all()
                return [
                    {
                        "id": a.id,
                        "data": a.data,
                        "created_at": a.created_at,
                    }
                    for a in analytics_data
                ], 200
        except Exception as e:
            return {"error": str(e)}, 500

    def post(self):
        """Create a new analytics record."""
        # Similar structure as above resources.
