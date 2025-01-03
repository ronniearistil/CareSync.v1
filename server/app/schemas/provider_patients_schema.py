from app import ma
from app.models.provider_patients_model import ProviderPatient

class ProviderPatientSchema(ma.SQLAlchemySchema):
    class Meta:
        model = ProviderPatient
        load_instance = True  # Automatically create model instances

    provider_id = ma.auto_field()
    patient_id = ma.auto_field()


