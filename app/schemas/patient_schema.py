from marshmallow import Schema, fields, validates, ValidationError
from marshmallow.validate import Email
from datetime import date

class PatientSchema(Schema):
    id = fields.Int(dump_only=True)
    first_name = fields.Str(required=True)
    last_name = fields.Str(required=True)
    email = fields.Email(required=True, validate=Email(error="Invalid email format."))
    phone_number = fields.Str(required=False)
    date_of_birth = fields.Date(required=False)

    @validates("first_name")
    def validate_first_name(self, value):
        if not value.isalpha():
            raise ValidationError("First name must only contain letters.")
        return value.capitalize()

    @validates("last_name")
    def validate_last_name(self, value):
        if not value.isalpha():
            raise ValidationError("Last name must only contain letters.")
        return value.capitalize()

    @validates("phone_number")
    def validate_phone_number(self, value):
        if value and not value.isdigit():
            raise ValidationError("Phone number must contain only digits.")
        if value and len(value) != 10:
            raise ValidationError("Phone number must be 10 digits long.")
        return value

    @validates("date_of_birth")
    def validate_date_of_birth(self, value):
        if value and value >= date.today():
            raise ValidationError("Date of birth must be in the past.")
        return value
