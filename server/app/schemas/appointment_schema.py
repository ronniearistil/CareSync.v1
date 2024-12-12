# from app import ma
# from app.models.appointment_model import Appointment
# 
# class AppointmentSchema(ma.SQLAlchemySchema):
#     class Meta:
#         model = Appointment
#         load_instance = True
# 
#     id = ma.auto_field()
#     date = ma.auto_field()
#     time = ma.auto_field()
#     location = ma.auto_field()
#     status = ma.auto_field()
#     user_id = ma.auto_field()

from app import ma
from app.models.appointment_model import Appointment

class AppointmentSchema(ma.SQLAlchemySchema):
    class Meta:
        model = Appointment
        load_instance = True  # Automatically create model instances

    id = ma.auto_field()
    date = ma.Date(format="%Y-%m-%d")  # Format date fields as 'YYYY-MM-DD'
    time = ma.auto_field()
    location = ma.auto_field()
    status = ma.auto_field()
    user_id = ma.auto_field()
