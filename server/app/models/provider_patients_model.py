from app import db
from sqlalchemy.orm import relationship

class ProviderPatient(db.Model):
    __tablename__ = 'provider_patients'

    id = db.Column(db.Integer, primary_key=True)
    provider_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    patient_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)

    provider = db.relationship("User", foreign_keys=[provider_id], back_populates="patients")
    patient = db.relationship("User", foreign_keys=[patient_id], back_populates="providers")

