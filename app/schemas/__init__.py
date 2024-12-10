from .user_schema import UserSchema
from .health_record_schema import HealthRecordSchema
from .appointment_schema import AppointmentSchema
from .recommendation_schema import RecommendationSchema
from .news_schema import NewsSchema
from .provider_patients_schema import ProviderPatientSchema
from .user_recommendation_schema import UserRecommendationSchema
from .analytics_schema import AnalyticsSchema
from .patient_schema import PatientSchema


__all__ = [
    "UserSchema",
    "HealthRecordSchema",
    "AppointmentSchema",
    "RecommendationSchema",
    "NewsSchema",
    "ProviderPatientSchema",
    "UserRecommendationSchema",
    "AnalyticsSchema",
    "PatientSchema"
]
