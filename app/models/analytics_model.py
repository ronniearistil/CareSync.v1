from app import db
from sqlalchemy.orm import relationship
from sqlalchemy.orm import validates

class Analytics(db.Model):
    __tablename__ = 'analytics'

    id = db.Column(db.Integer, primary_key=True)
    metric_name = db.Column(db.String(100), nullable=False)
    value = db.Column(db.Integer, nullable=False)
    calculated_at = db.Column(db.DateTime, default=db.func.current_timestamp())
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)

    # Relationship with User
    user = relationship("User", back_populates="analytics")

    @validates('metric_name')
    def validate_metric_name(self, key, metric_name):
        assert len(metric_name) > 0, "Metric name must not be empty."
        return metric_name

    @validates('value')
    def validate_value(self, key, value):
        assert value >= 0, "Value must be non-negative."
        return value


