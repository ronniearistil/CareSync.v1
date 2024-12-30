
from app import db
from sqlalchemy.orm import relationship

class Recommendation(db.Model):
    __tablename__ = "recommendations"

    id = db.Column(db.Integer, primary_key=True)
    text = db.Column(db.Text, nullable=False)
    category = db.Column(
        db.Enum("Preventive", "Follow-Up", "General Advice", name="recommendation_categories"),
        nullable=False
    )
    age_group = db.Column(
        db.Enum("Child", "Adult", "Senior", name="age_groups"),
        nullable=True
    )

    # Relationships
    user_recommendations = relationship(
        "UserRecommendation", back_populates="recommendation", cascade="all, delete-orphan"
    )




