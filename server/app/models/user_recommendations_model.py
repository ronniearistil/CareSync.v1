from app import db
from sqlalchemy.orm import relationship

class UserRecommendation(db.Model):
    __tablename__ = "user_recommendations"
    
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), primary_key=True)
    recommendation_id = db.Column(db.Integer, db.ForeignKey("recommendations.id"), primary_key=True)

    # Relationships
    user = db.relationship("User", back_populates="user_recommendations")
    recommendation = db.relationship("Recommendation", back_populates="user_recommendations")


