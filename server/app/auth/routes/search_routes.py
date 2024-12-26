# from flask import request, Blueprint
# from flask_jwt_extended import jwt_required
# from app.models.patient_model import Patient
# from app.models.user_model import User
# from sqlalchemy import func
# from app import db
# import logging
# 
# search_bp = Blueprint("search_bp", __name__)
# logger = logging.getLogger(__name__)
# 
# @search_bp.route("/search", methods=["POST"])
# @jwt_required()
# def global_search():
#     try:
#         data = request.get_json()
#         query = data.get("query")
#         if not query:
#             return {"error": "Search query is required"}, 400
# 
#         search_filter = f"%{query}%"
#         patients = Patient.query.filter(Patient.email.ilike(search_filter)).all()
#         users = User.query.filter(User.email.ilike(search_filter)).all()
# 
#         results = [{"id": p.id, "email": p.email, "type": "Patient"} for p in patients] + \
#                   [{"id": u.id, "email": u.email, "type": "User"} for u in users]
# 
#         return {"results": results}, 200
#     except Exception as e:
#         logger.error(f"Search error: {str(e)}")
#         return {"error": "An unexpected error occurred"}, 500
