from app import ma
from app.models.user_recommendations_model import UserRecommendation

class UserRecommendationSchema(ma.SQLAlchemySchema):
    class Meta:
        model = UserRecommendation
        load_instance = True

    user_id = ma.auto_field()
    recommendation_id = ma.auto_field()

