from app import db
from sqlalchemy.orm import relationship


class UserRecommendation(db.Model):
    __tablename__ = "user_recommendations"

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    recommendation_id = db.Column(db.Integer, db.ForeignKey("recommendations.id"), nullable=False)

    user = db.relationship("User", back_populates="user_recommendations")
    recommendation = db.relationship("Recommendation", back_populates="user_recommendations")




