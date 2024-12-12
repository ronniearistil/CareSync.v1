from app import ma
from app.models.recommendation_model import Recommendation

class RecommendationSchema(ma.SQLAlchemySchema):
    class Meta:
        model = Recommendation
        load_instance = True

    id = ma.auto_field()
    text = ma.auto_field()
    category = ma.auto_field()
    age_group = ma.auto_field()
