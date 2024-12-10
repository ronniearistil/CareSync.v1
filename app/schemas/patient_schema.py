from marshmallow import Schema, fields, validates, ValidationError
from marshmallow.validate import Email
from datetime import datetime, date


class PatientSchema(Schema):
    id = fields.Int(dump_only=True)
    first_name = fields.Str(
        required=True,
        validate=lambda v: v.isalpha(),
        error_messages={
            "required": "First name is required.",
            "validator_failed": "First name must only contain letters."
        }
    )
    last_name = fields.Str(
        required=True,
        validate=lambda v: v.isalpha(),
        error_messages={
            "required": "Last name is required.",
            "validator_failed": "Last name must only contain letters."
        }
    )
    email = fields.Email(
        required=True,
        validate=Email(error="Invalid email format."),
        error_messages={"required": "Email is required."}
    )
    phone_number = fields.Str(required=False, missing=None)
    date_of_birth = fields.Method(
        deserialize="deserialize_date_of_birth",
        required=False,
        missing=None,
        error_messages={"invalid": "Date of birth must follow the format MM/DD/YYYY."}
    )

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
        if value:
            value = value.replace(" ", "").replace("-", "").replace("(", "").replace(")", "")
            if not value.isdigit():
                raise ValidationError("Phone number must contain only digits.")
            if len(value) != 10:
                raise ValidationError("Phone number must be 10 digits long.")
        return value

    def deserialize_date_of_birth(self, value):
        """
        Converts date_of_birth from MM/DD/YYYY format to datetime.date.
        """
        try:
            # Parse string into datetime.date
            dob = datetime.strptime(value, "%m/%d/%Y").date()
            if dob >= date.today():
                raise ValidationError("Date of birth must be in the past.")
            return dob
        except ValueError:
            raise ValidationError("Invalid date format. Use MM/DD/YYYY.")



