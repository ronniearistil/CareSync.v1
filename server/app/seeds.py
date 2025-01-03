# from app import bcrypt
# from faker import Faker
# from app import db, create_app
# from app.models.analytics_model import Analytics
# from app.models.user_model import User
# from app.models.health_record_model import HealthRecord
# from app.models.appointment_model import Appointment
# from app.models.recommendation_model import Recommendation
# from app.models.news_model import News
# from app.models.provider_patients_model import ProviderPatient
# from app.models.user_recommendations_model import UserRecommendation
# from app.models.patient_model import Patient
# from datetime import date
# 
# # Initialize Faker
# faker = Faker()
# 
# def seed_users():
#     users = []
#     for _ in range(10):  # Generate 10 users
#         user = User(
#             name=faker.name(),
#             email=faker.unique.email(),
#             password_hash=bcrypt.generate_password_hash("password123").decode("utf-8"),
#             role=faker.random_element(elements=["Provider", "Admin"]),  # Only valid roles
#         )
#         db.session.add(user)
#         users.append(user)
#     db.session.commit()
#     return users
# 
# def seed_patients():
#     patients = []
#     for _ in range(10):  # Generate 10 patients
#         patient = Patient(
#             first_name=faker.first_name(),
#             last_name=faker.last_name(),
#             email=faker.unique.email(),
#             phone_number=faker.msisdn()[:10],
#             date_of_birth=faker.date_of_birth(minimum_age=18, maximum_age=80),
#             address=faker.address()
#         )
# 
#         # Validate patient data
#         assert isinstance(patient.date_of_birth, date), "Invalid date format for date_of_birth"
#         assert len(patient.phone_number) == 10 and patient.phone_number.isdigit(), "Invalid phone number format"
# 
#         db.session.add(patient)
#         patients.append(patient)
#     db.session.commit()
#     return patients
# 
# def seed_health_records(users):
#     for _ in range(20):  # Generate 20 health records
#         record = HealthRecord(
#             type=faker.random_element(elements=["Vaccine", "Screening", "Procedure"]),
#             status=faker.random_element(elements=["Completed", "Upcoming", "Overdue"]),
#             notes=faker.text(max_nb_chars=200),
#             user_id=faker.random_element([user.id for user in users]),  # Link to existing users
#         )
# 
#         # Validate health record data
#         assert record.type in ["Vaccine", "Screening", "Procedure"], "Invalid health record type"
#         assert record.status in ["Completed", "Upcoming", "Overdue"], "Invalid health record status"
# 
#         db.session.add(record)
#     db.session.commit()
# 
# def seed_appointments(users):
#     for _ in range(15):  # Generate 15 appointments
#         appointment = Appointment(
#             date=faker.date_between(start_date="-30d", end_date="+30d"),
#             time=faker.time(),
#             location=faker.address(),
#             status=faker.random_element(elements=["Scheduled", "Completed", "Cancelled", "Rescheduled"]),
#             user_id=faker.random_element([user.id for user in users]),
#         )
# 
#         # Validate appointment data
#         assert isinstance(appointment.date, date), "Invalid date format for appointment date"
#         assert appointment.status in ["Scheduled", "Completed", "Cancelled", "Rescheduled"], "Invalid status"
# 
#         db.session.add(appointment)
#     db.session.commit()
# 
# def seed_recommendations(users):
#     recommendations = []
#     for _ in range(10):  # Generate 10 recommendations
#         recommendation = Recommendation(
#             text=faker.text(max_nb_chars=300),
#             category=faker.random_element(elements=["Preventive", "Follow-Up", "General Advice"]),
#             age_group=faker.random_element(elements=["Child", "Adult", "Senior"]),
#         )
# 
#         # Validate recommendation data
#         assert recommendation.category in ["Preventive", "Follow-Up", "General Advice"], "Invalid recommendation category"
#         assert recommendation.age_group in ["Child", "Adult", "Senior"], "Invalid age group"
# 
#         db.session.add(recommendation)
#         recommendations.append(recommendation)
#     db.session.commit()
# 
#     for user in users:
#         for recommendation in faker.random_elements(recommendations, length=3, unique=True):
#             user_recommendation = UserRecommendation(user_id=user.id, recommendation_id=recommendation.id)
#             db.session.add(user_recommendation)
#     db.session.commit()
# 
# def seed_provider_patients(users):
#     providers = [user for user in users if user.role == "Provider"]
#     patients = Patient.query.all()
#     
#     for provider in providers:
#         num_patients_to_assign = min(len(patients), 3)  # Assign up to 3 patients per provider
#         assigned_patients = faker.random_elements(patients, length=num_patients_to_assign, unique=True)
#         
#         for patient in assigned_patients:
#             relationship = ProviderPatient(provider_id=provider.id, patient_id=patient.id)
#             db.session.add(relationship)
#     db.session.commit()
# 
# def seed_news():
#     for _ in range(5):  # Generate 5 news items
#         news_item = News(
#             title=faker.sentence(nb_words=6),
#             content=faker.paragraph(nb_sentences=5),
#             type=faker.random_element(elements=["Update", "Case Study", "Best Practice"]),
#             author=faker.name(),
#         )
# 
#         # Validate news data
#         assert news_item.type in ["Update", "Case Study", "Best Practice"], "Invalid news type"
# 
#         db.session.add(news_item)
#     db.session.commit()
# 
# def seed_analytics(users):
#     for user in users:
#         for _ in range(3):  # Each user gets 3 analytics records
#             analytic = Analytics(
#                 metric_name=faker.word(),
#                 value=faker.random_int(min=0, max=100),
#                 user_id=user.id,
#             )
# 
#             # Validate analytics data
#             assert analytic.value >= 0, "Analytics value must be non-negative"
# 
#             db.session.add(analytic)
#     db.session.commit()
# 
# if __name__ == "__main__":
#     app = create_app()
#     with app.app_context():
#         users = seed_users()
#         patients = seed_patients()
#         seed_health_records(users)
#         seed_appointments(users)
#         seed_recommendations(users)
#         seed_provider_patients(users)
#         seed_news()
#         seed_analytics(users)
#         print("Database seeded successfully!")




# POST MVP Addition 

from app import bcrypt
from faker import Faker
from app import db, create_app
from app.models.analytics_model import Analytics
from app.models.user_model import User
from app.models.health_record_model import HealthRecord
from app.models.appointment_model import Appointment
from app.models.recommendation_model import Recommendation
from app.models.news_model import News
from app.models.provider_patients_model import ProviderPatient
from app.models.user_recommendations_model import UserRecommendation
from app.models.patient_model import Patient
from datetime import date

# Initialize Faker
faker = Faker()

def seed_users():
    users = []
    for _ in range(10):  # Generate 10 users
        user = User(
            name=faker.name(),
            email=faker.unique.email(),
            password_hash=bcrypt.generate_password_hash("password123").decode("utf-8"),
            role=faker.random_element(elements=["Provider", "Admin"]),  # Only valid roles
        )
        db.session.add(user)
        users.append(user)
    db.session.commit()
    return users

def seed_patients():
    patients = []
    for _ in range(10):  # Generate 10 patients
        patient = Patient(
            first_name=faker.first_name(),
            last_name=faker.last_name(),
            email=faker.unique.email(),
            phone_number=faker.msisdn()[:10],
            date_of_birth=faker.date_of_birth(minimum_age=18, maximum_age=80),
            address=faker.address(),
            password_hash=bcrypt.generate_password_hash("default_password").decode("utf-8")  # Default password hash
        )

        # Validate patient data
        assert isinstance(patient.date_of_birth, date), "Invalid date format for date_of_birth"
        assert len(patient.phone_number) == 10 and patient.phone_number.isdigit(), "Invalid phone number format"

        db.session.add(patient)
        patients.append(patient)
    db.session.commit()
    return patients

def seed_health_records(users):
    for _ in range(20):  # Generate 20 health records
        record = HealthRecord(
            type=faker.random_element(elements=["Vaccine", "Screening", "Procedure"]),
            status=faker.random_element(elements=["Completed", "Upcoming", "Overdue"]),
            notes=faker.text(max_nb_chars=200),
            user_id=faker.random_element([user.id for user in users]),  # Link to existing users
        )

        # Validate health record data
        assert record.type in ["Vaccine", "Screening", "Procedure"], "Invalid health record type"
        assert record.status in ["Completed", "Upcoming", "Overdue"], "Invalid health record status"

        db.session.add(record)
    db.session.commit()

def seed_appointments(users):
    for _ in range(15):  # Generate 15 appointments
        appointment = Appointment(
            date=faker.date_between(start_date="-30d", end_date="+30d"),
            time=faker.time(),
            location=faker.address(),
            status=faker.random_element(elements=["Scheduled", "Completed", "Cancelled", "Rescheduled"]),
            user_id=faker.random_element([user.id for user in users]),
        )

        # Validate appointment data
        assert isinstance(appointment.date, date), "Invalid date format for appointment date"
        assert appointment.status in ["Scheduled", "Completed", "Cancelled", "Rescheduled"], "Invalid status"

        db.session.add(appointment)
    db.session.commit()

def seed_recommendations(users):
    recommendations = []
    for _ in range(10):  # Generate 10 recommendations
        recommendation = Recommendation(
            text=faker.text(max_nb_chars=300),
            category=faker.random_element(elements=["Preventive", "Follow-Up", "General Advice"]),
            age_group=faker.random_element(elements=["Child", "Adult", "Senior"]),
        )

        # Validate recommendation data
        assert recommendation.category in ["Preventive", "Follow-Up", "General Advice"], "Invalid recommendation category"
        assert recommendation.age_group in ["Child", "Adult", "Senior"], "Invalid age group"

        db.session.add(recommendation)
        recommendations.append(recommendation)
    db.session.commit()

    for user in users:
        for recommendation in faker.random_elements(recommendations, length=3, unique=True):
            user_recommendation = UserRecommendation(user_id=user.id, recommendation_id=recommendation.id)
            db.session.add(user_recommendation)
    db.session.commit()

def seed_provider_patients(users):
    providers = [user for user in users if user.role == "Provider"]
    patients = Patient.query.all()
    
    for provider in providers:
        num_patients_to_assign = min(len(patients), 3)  # Assign up to 3 patients per provider
        assigned_patients = faker.random_elements(patients, length=num_patients_to_assign, unique=True)
        
        for patient in assigned_patients:
            relationship = ProviderPatient(provider_id=provider.id, patient_id=patient.id)
            db.session.add(relationship)
    db.session.commit()

def seed_news():
    for _ in range(5):  # Generate 5 news items
        news_item = News(
            title=faker.sentence(nb_words=6),
            content=faker.paragraph(nb_sentences=5),
            type=faker.random_element(elements=["Update", "Case Study", "Best Practice"]),
            author=faker.name(),
        )

        # Validate news data
        assert news_item.type in ["Update", "Case Study", "Best Practice"], "Invalid news type"

        db.session.add(news_item)
    db.session.commit()

def seed_analytics(users):
    for user in users:
        for _ in range(3):  # Each user gets 3 analytics records
            analytic = Analytics(
                metric_name=faker.word(),
                value=faker.random_int(min=0, max=100),
                user_id=user.id,
            )

            # Validate analytics data
            assert analytic.value >= 0, "Analytics value must be non-negative"

            db.session.add(analytic)
    db.session.commit()

if __name__ == "__main__":
    app = create_app()
    with app.app_context():
        users = seed_users()
        patients = seed_patients()
        seed_health_records(users)
        seed_appointments(users)
        seed_recommendations(users)
        seed_provider_patients(users)
        seed_news()
        seed_analytics(users)
        print("Database seeded successfully!")
