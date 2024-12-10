from app import ma
from app.models.health_record_model import HealthRecord

class HealthRecordSchema(ma.SQLAlchemySchema):
    class Meta:
        model = HealthRecord
        load_instance = True

    id = ma.auto_field()
    type = ma.auto_field()
    status = ma.auto_field()
    notes = ma.auto_field()
    user_id = ma.auto_field()
