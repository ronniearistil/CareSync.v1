from app import ma
from app.models.analytics_model import Analytics

class AnalyticsSchema(ma.SQLAlchemySchema):
    class Meta:
        model = Analytics
        load_instance = True

    id = ma.auto_field()
    user_id = ma.auto_field()
    metric_name = ma.auto_field()  
    value = ma.auto_field()        
    calculated_at = ma.auto_field() 


