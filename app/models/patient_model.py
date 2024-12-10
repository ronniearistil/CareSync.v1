from app import db
from sqlalchemy.orm import validates
from datetime import date
from sqlalchemy.exc import IntegrityError

class Patient(db.Model):
    __tablename__ = "patients"

    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(50), nullable=False)
    last_name = db.Column(db.String(50), nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)
    phone_number = db.Column(db.String(15), nullable=True)
    date_of_birth = db.Column(db.Date, nullable=False)

    def __repr__(self):
        return f"<Patient {self.first_name} {self.last_name}>"

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
        if value and not value.isdigit():
            raise ValueError("Phone number must contain only digits.")
        if value and len(value) != 10:
            raise ValueError("Phone number must be exactly 10 digits.")
        return value

    @validates("date_of_birth")
    def validate_date_of_birth(self, key, value):
        if value and value >= date.today():
            raise ValueError("Date of birth must be in the past.")
        return value
