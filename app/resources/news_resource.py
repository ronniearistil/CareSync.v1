# app/resources/news_resource.py

from flask_restful import Resource, reqparse
from app.models.news_model import News
from app import db

class NewsResource(Resource):
    def get(self, news_id=None):
        """Retrieve news item(s)."""
        try:
            if news_id:
                news_item = News.query.get(news_id)
                if not news_item:
                    return {"error": "News item not found"}, 404
                return {
                    "id": news_item.id,
                    "title": news_item.title,
                    "content": news_item.content,
                    "type": news_item.type,
                    "author": news_item.author,
                }, 200
            else:
                news_items = News.query.all()
                return [
                    {
                        "id": n.id,
                        "title": n.title,
                        "content": n.content,
                        "type": n.type,
                        "author": n.author,
                    }
                    for n in news_items
                ], 200
        except Exception as e:
            return {"error": str(e)}, 500

    def post(self):
        """Create a new news item."""
        parser = reqparse.RequestParser()
        parser.add_argument("title", required=True, help="Title is required")
        parser.add_argument("content", required=True, help="Content is required")
        parser.add_argument("type", required=True, help="Type is required")
        parser.add_argument("author", required=True, help="Author is required")
        args = parser.parse_args()

        try:
            new_news = News(
                title=args["title"],
                content=args["content"],
                type=args["type"],
                author=args["author"],
            )
            db.session.add(new_news)
            db.session.commit()
            return {"message": "News item created successfully", "id": new_news.id}, 201
        except Exception as e:
            return {"error": str(e)}, 500

    def put(self, news_id):
        """Update a news item."""
        parser = reqparse.RequestParser()
        parser.add_argument("title", required=False)
        parser.add_argument("content", required=False)
        parser.add_argument("type", required=False)
        parser.add_argument("author", required=False)
        args = parser.parse_args()

        try:
            news_item = News.query.get(news_id)
            if not news_item:
                return {"error": "News item not found"}, 404

            if args["title"]:
                news_item.title = args["title"]
            if args["content"]:
                news_item.content = args["content"]
            if args["type"]:
                news_item.type = args["type"]
            if args["author"]:
                news_item.author = args["author"]

            db.session.commit()
            return {"message": "News item updated successfully"}, 200
        except Exception as e:
            return {"error": str(e)}, 500

    def delete(self, news_id):
        """Delete a news item."""
        try:
            news_item = News.query.get(news_id)
            if not news_item:
                return {"error": "News item not found"}, 404

            db.session.delete(news_item)
            db.session.commit()
            return {"message": "News item deleted successfully"}, 200
        except Exception as e:
            return {"error": str(e)}, 500
