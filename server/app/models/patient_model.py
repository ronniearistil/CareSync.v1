
from app import db
from sqlalchemy.orm import validates
from datetime import date

class Patient(db.Model):
    __tablename__ = "patients"

    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(50), nullable=False)
    last_name = db.Column(db.String(50), nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)
    phone_number = db.Column(db.String(15), nullable=True)
    date_of_birth = db.Column(db.Date, nullable=False)
    address = db.Column(db.String(255), nullable=True, default=None)
    password_hash = db.Column(db.String(255), nullable=False)

    # Relationships
    providers = db.relationship('ProviderPatient', foreign_keys='ProviderPatient.patient_id', back_populates='patient', cascade='all, delete')
    appointments = db.relationship('Appointment', back_populates='patient', cascade='all, delete-orphan')
    health_records = db.relationship('HealthRecord', back_populates='patient', cascade='all, delete-orphan')


    def __repr__(self):
        return f"<Patient {self.first_name} {self.last_name}>"

    @validates("address")
    def validate_address(self, key, value):
        if value and len(value) > 255:
            raise ValueError("Address must not exceed 255 characters.")
        return value

    @validates("first_name")
    def validate_first_name(self, key, value):
        if not value.isalpha():
            raise ValueError("First name must only contain letters.")
        return value.capitalize()

    @validates("last_name")
    def validate_last_name(self, key, value):
        if not value.isalpha():
            raise ValueError("Last name must only contain letters.")
        return value.capitalize()

    @validates("email")
    def validate_email(self, key, value):
        if "@" not in value or "." not in value.split("@")[-1]:
            raise ValueError("Invalid email address.")
        return value.lower()

    @validates("phone_number")
    def validate_phone_number(self, key, value):
        if value:
            value = value.replace(" ", "").replace("-", "").replace("(", "").replace(")", "")
            if not value.isdigit():
                raise ValueError("Phone number must contain only digits.")
            if len(value) != 10:
                raise ValueError("Phone number must be exactly 10 digits.")
        return value

    @validates("date_of_birth")
    def validate_date_of_birth(self, key, value):
        if not isinstance(value, date):
            raise ValueError("Date of birth must be a valid date object.")
        if value >= date.today():
            raise ValueError("Date of birth must be in the past.")
        return value
