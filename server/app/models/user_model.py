from app import db
from app import db, bcrypt
from sqlalchemy.orm import validates, relationship
from sqlalchemy.dialects.postgresql import ENUM

# bcrypt = Bcrypt()  # Initialize bcrypt

class User(db.Model):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(255), nullable=False)

    # Update ENUM to include Admin
    role = db.Column(
        ENUM('Provider', 'Patient', 'Admin', name='user_roles', create_type=False),
        nullable=False
    )

    # Relationships
    health_records = relationship(
        'HealthRecord', 
        back_populates='user', 
        cascade='all, delete-orphan'
    )
    appointments = relationship(
        'Appointment', 
        back_populates='user', 
        cascade='all, delete-orphan'
    )
    user_recommendations = relationship(
        'UserRecommendation', 
        back_populates='user', 
        cascade='all, delete-orphan'
    )

    # Patients for providers
    patients = relationship(
        'ProviderPatient',
        foreign_keys='ProviderPatient.provider_id',
        back_populates='provider',
        cascade='all, delete-orphan'
    )

    # Providers for patients
    providers = relationship(
        'ProviderPatient',
        foreign_keys='ProviderPatient.patient_id',
        back_populates='patient',
        cascade='all, delete-orphan'
    )

    # Analytics relationship
    analytics = relationship(
        "Analytics",
        back_populates="user",
        cascade="all, delete-orphan"
    )

    @validates('email')
    def validate_email(self, key, email):
        """Validate email format."""
        assert '@' in email and '.' in email.split('@')[-1], 'Invalid email format'
        return email

    # @validates('password_hash')
    # def validate_password(self, key, password):
    #     """Validate and hash passwords."""
    #     assert len(password) >= 8, 'Password must be at least 8 characters long'
    #     # Use bcrypt to hash the password
    #     return bcrypt.generate_password_hash(password).decode('utf-8')

    def __repr__(self):
        return f"<User {self.name} - {self.role}>"