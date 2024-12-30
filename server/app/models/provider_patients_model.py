
from app import db
from sqlalchemy.orm import relationship

class ProviderPatient(db.Model):
    __tablename__ = "provider_patients"
    
    provider_id = db.Column(db.Integer, db.ForeignKey("users.id"), primary_key=True)
    patient_id = db.Column(db.Integer, db.ForeignKey("patients.id"), primary_key=True) 

    # Relationships
    provider = db.relationship("User", foreign_keys=[provider_id], back_populates="patients")
    patient = db.relationship("Patient", foreign_keys=[patient_id], back_populates="providers") 
