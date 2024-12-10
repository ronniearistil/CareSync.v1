from app import db
from sqlalchemy.orm import validates

class News(db.Model):
    __tablename__ = 'news'

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(255), nullable=False)
    content = db.Column(db.Text, nullable=False)
    type = db.Column(db.Enum('Update', 'Case Study', 'Best Practice', name='news_types'), nullable=False)
    author = db.Column(db.String(100), nullable=False)
    created_at = db.Column(db.DateTime, server_default=db.func.now())

    @validates('type')
    def validate_type(self, key, type):
        assert type in ('Update', 'Case Study', 'Best Practice')
        return type

