# from app import db
# from sqlalchemy.orm import validates, relationship
# from sqlalchemy.dialects.postgresql import ENUM
# 
# class User(db.Model):
#     __tablename__ = 'users'
# 
#     id = db.Column(db.Integer, primary_key=True)
#     name = db.Column(db.String(100), nullable=False)
#     email = db.Column(db.String(120), unique=True, nullable=False)
#     password_hash = db.Column(db.String(255), nullable=False)
# 
#     # Updated ENUM: Removed 'Patient' role
#     role = db.Column(
#         ENUM('Provider', 'Admin', name='user_roles', create_type=False),
#         nullable=False
#     )
# 
#     # Relationships
#     health_records = relationship(
#         'HealthRecord', 
#         back_populates='user', 
#         cascade='all, delete-orphan'
#     )
#     appointments = relationship(
#         'Appointment', 
#         back_populates='user', 
#         cascade='all, delete-orphan'
#     )
#     user_recommendations = relationship(
#         'UserRecommendation', 
#         back_populates='user', 
#         cascade='all, delete-orphan'
#     )
# 
#     # Providers-patients relationships
#     patients = relationship(
#         'ProviderPatient',
#         foreign_keys='ProviderPatient.provider_id',
#         back_populates='provider',
#         cascade='all, delete-orphan'
#     )
#     providers = relationship(
#         'ProviderPatient',
#         foreign_keys='ProviderPatient.patient_id',
#         back_populates='patient',
#         cascade='all, delete-orphan'
#     )
# 
#     analytics = relationship(
#         "Analytics",
#         back_populates="user",
#         cascade="all, delete-orphan"
#     )
# 
#     @validates('email')
#     def validate_email(self, key, email):
#         """Validate email format."""
#         assert '@' in email and '.' in email.split('@')[-1], 'Invalid email format'
#         return email
#     
#     def __repr__(self):
#         return f"<User {self.name} - {self.role}>"


# POST MVP Addition
from app import db
from sqlalchemy.orm import validates, relationship
from sqlalchemy.dialects.postgresql import ENUM

class User(db.Model):
    __tablename__ = 'users'
    __table_args__ = {'extend_existing': True}  # Ensure no table conflicts

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(255), nullable=False)
    role = db.Column(db.Enum('Provider', 'Admin', name='user_roles'), nullable=False)

    # Relationships
    health_records = db.relationship('HealthRecord', back_populates='user', cascade='all, delete-orphan')
    appointments = db.relationship('Appointment', back_populates='user', cascade='all, delete-orphan')
    patients = db.relationship('ProviderPatient', foreign_keys='ProviderPatient.provider_id', back_populates='provider',cascade='all, delete')
    analytics = db.relationship("Analytics", back_populates="user", cascade="all, delete-orphan")

    # Add the missing relationship for user_recommendations
    user_recommendations = db.relationship("UserRecommendation", back_populates="user", cascade="all, delete-orphan")

    @validates('email')
    def validate_email(self, key, email):
        """Validate email format."""
        assert '@' in email and '.' in email.split('@')[-1], 'Invalid email format'
        return email

    def __repr__(self):
        return f"<User {self.name} - {self.role}>"
