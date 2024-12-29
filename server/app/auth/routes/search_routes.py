# from flask import Blueprint, request, jsonify
# from flask_jwt_extended import jwt_required
# from app.models.user_model import User
# from app.models.patient_model import Patient
# from app import db
# from sqlalchemy import func
# import logging
# 
# # Initialize Blueprint and Logger
# search_bp = Blueprint("search", __name__)
# logger = logging.getLogger(__name__)
# 
# # Global Search Route
# @search_bp.route("/", methods=["POST"])
# @jwt_required()
# def global_search():
#     try:
#         # Parse input data
#         data = request.get_json()
#         query = data.get("query")
#         page = data.get("page", 1)
#         per_page = data.get("per_page", 10)
# 
#         # Validate query input
#         if not query:
#             return {"error": "Search query is required"}, 400
# 
#         search_filter = f"%{query}%"
#         logger.info(f"Search Query: {query}, Page: {page}, Per Page: {per_page}")
# 
#         # Helper function for pagination
#         def paginate_and_format(query, formatter, page, per_page):
#             paginated = query.paginate(page=page, per_page=per_page, error_out=False)
#             return {
#                 "items": [formatter(item) for item in paginated.items],
#                 "pagination": {
#                     "page": paginated.page,
#                     "total_pages": paginated.pages,
#                     "total_items": paginated.total,
#                 },
#             }
# 
#         # Queries for Users and Patients
#         patients_query = Patient.query.filter(
#             (Patient.first_name.ilike(search_filter)) |
#             (Patient.last_name.ilike(search_filter)) |
#             (func.concat(Patient.first_name, " ", Patient.last_name).ilike(search_filter)) |
#             (Patient.email.ilike(search_filter)) |
#             (Patient.phone_number.ilike(search_filter)) |
#             (func.cast(Patient.id, db.String).ilike(search_filter))
#         )
# 
#         users_query = User.query.filter(
#             (User.name.ilike(search_filter)) |
#             (User.email.ilike(search_filter)) |
#             (func.cast(User.id, db.String).ilike(search_filter))
#         )
# 
#         # Format Results
#         def format_patient(patient):
#             return {
#                 "id": patient.id,
#                 "first_name": patient.first_name,
#                 "last_name": patient.last_name,
#                 "email": patient.email,
#                 "phone_number": patient.phone_number,
#                 "type": "Patient",
#                 "route": f"/patients/{patient.id}",
#             }
# 
#         def format_user(user):
#             return {
#                 "id": user.id,
#                 "name": user.name,
#                 "email": user.email,
#                 "role": user.role,
#                 "type": "User",
#                 "route": f"/users/{user.id}",
#             }
# 
#         # Fetch paginated results
#         patients_result = paginate_and_format(patients_query, format_patient, page, per_page)
#         users_result = paginate_and_format(users_query, format_user, page, per_page)
# 
#         # Combine results
#         return {
#             "results": patients_result["items"] + users_result["items"],
#             "pagination": {
#                 "patients": patients_result["pagination"],
#                 "users": users_result["pagination"],
#             },
#         }, 200
# 
#     except Exception as e:
#         logger.error(f"Global search error: {str(e)}")
#         return {"error": "An unexpected error occurred"}, 500

