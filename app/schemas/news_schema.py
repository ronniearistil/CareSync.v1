from app import ma
from app.models.news_model import News

class NewsSchema(ma.SQLAlchemySchema):
    class Meta:
        model = News
        load_instance = True

    id = ma.auto_field()
    title = ma.auto_field()
    content = ma.auto_field()
    type = ma.auto_field()
    author = ma.auto_field()
