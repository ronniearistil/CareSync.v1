# from app import db
# from sqlalchemy.orm import relationship, validates
# 
# class HealthRecord(db.Model):
#     __tablename__ = 'health_records'
# 
#     id = db.Column(db.Integer, primary_key=True)
#     type = db.Column(db.Enum('Vaccine', 'Screening', 'Procedure', name='health_record_types'), nullable=False)
#     status = db.Column(db.Enum('Completed', 'Upcoming', 'Overdue', name='health_record_statuses'), nullable=False)
#     notes = db.Column(db.Text, nullable=True)
#     user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
# 
#     user = db.relationship('User', back_populates='health_records')
#     appointments = db.relationship('Appointment', back_populates='health_record')  # Fix here
# 
#     @validates('type', 'status')
#     def validate_enum(self, key, value):
#         assert value in ('Vaccine', 'Screening', 'Procedure', 'Completed', 'Upcoming', 'Overdue')
#         return value



# POST MVP Addition 
from app import db
from sqlalchemy.orm import relationship, validates
class HealthRecord(db.Model):
    __tablename__ = 'health_records'

    id = db.Column(db.Integer, primary_key=True)
    type = db.Column(db.Enum('Vaccine', 'Screening', 'Procedure', name='health_record_types'), nullable=False)
    status = db.Column(db.Enum('Completed', 'Upcoming', 'Overdue', name='health_record_statuses'), nullable=False)
    notes = db.Column(db.Text, nullable=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=True)
    patient_id = db.Column(db.Integer, db.ForeignKey('patients.id'), nullable=True)  # New FK

    # Relationships
    user = db.relationship('User', back_populates='health_records')
    patient = db.relationship('Patient', back_populates='health_records')  # New relationship
    appointments = db.relationship('Appointment', back_populates='health_record')
