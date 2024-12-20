# from app import db
# from sqlalchemy.orm import relationship, validates
# 
# class Appointment(db.Model):
#     __tablename__ = 'appointments'
# 
#     id = db.Column(db.Integer, primary_key=True)
#     date = db.Column(db.Date, nullable=False)
#     time = db.Column(db.String(10), nullable=False)
#     location = db.Column(db.String(255), nullable=True)
#     status = db.Column(db.Enum('Scheduled', 'Completed', 'Cancelled', 'Rescheduled', name='appointment_statuses'), nullable=False)
#     health_record_id = db.Column(db.Integer, db.ForeignKey('health_records.id'), nullable=True)
#     user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
# 
#     user = db.relationship('User', back_populates='appointments')
#     health_record = db.relationship('HealthRecord', back_populates='appointments') 
# 
#     @validates('status')
#     def validate_status(self, key, status):
#         assert status in ('Scheduled', 'Completed', 'Cancelled', 'Rescheduled')
#         return status


# Post MVP Update

from app import db
from sqlalchemy.orm import relationship, validates

class Appointment(db.Model):
    __tablename__ = 'appointments'

    id = db.Column(db.Integer, primary_key=True)
    date = db.Column(db.Date, nullable=False)
    time = db.Column(db.String(10), nullable=False)
    location = db.Column(db.String(255), nullable=True)
    status = db.Column(db.Enum('Scheduled', 'Completed', 'Cancelled', 'Rescheduled', name='appointment_statuses'), nullable=False)
    health_record_id = db.Column(db.Integer, db.ForeignKey('health_records.id'), nullable=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=True)
    patient_id = db.Column(db.Integer, db.ForeignKey('patients.id'), nullable=True)  # New FK

    # Relationships
    user = db.relationship('User', back_populates='appointments')
    patient = db.relationship('Patient', back_populates='appointments')  # New relationship
    health_record = db.relationship('HealthRecord', back_populates='appointments')
