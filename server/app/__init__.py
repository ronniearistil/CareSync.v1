# # Further Test
# 
# from flask import Flask, send_from_directory
# from flask_sqlalchemy import SQLAlchemy
# from flask_migrate import Migrate
# from flask_jwt_extended import JWTManager
# from flask_marshmallow import Marshmallow
# from flask_cors import CORS
# from flask.cli import AppGroup
# from flask_bcrypt import Bcrypt
# from datetime import timedelta
# from .config import Config
# import os
# 
# # Initialize Flask extensions
# db = SQLAlchemy()
# migrate = Migrate()
# jwt = JWTManager()
# ma = Marshmallow()
# bcrypt = Bcrypt()
# 
# def create_app():
#     """
#     Create and configure the Flask app.
#     """
#     # Static folder for React build
#     static_folder_path = os.path.abspath(os.path.join(os.path.dirname(__file__), "../client/dist"))
#     if not os.path.exists(static_folder_path):
#         static_folder_path = None  # Skip static folder setup for backend-only deployment
# 
#     app = Flask(__name__, static_folder=static_folder_path, static_url_path="/")
# 
#     # Load configuration
#     app.config.from_object(Config)
# 
#     # Database Config
#     app.config["SQLALCHEMY_DATABASE_URI"] = os.getenv("SQLALCHEMY_DATABASE_URI")
#     app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
# 
#     # JWT Config
#     app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(hours=1)
#     app.config["JWT_REFRESH_TOKEN_EXPIRES"] = timedelta(days=7)
#     app.config["JWT_TOKEN_LOCATION"] = ["cookies"]
#     app.config["JWT_COOKIE_CSRF_PROTECT"] = False
# 
#     # Enable CORS
#     CORS(app, resources={
#         r"/*": {
#             "origins": [
#                 "http://localhost:5173",
#                 "http://localhost:5555",
#                 "https://caresynq.onrender.com",
#                 "https://caresync-rful.onrender.com"
#             ]
#         }
#     }, supports_credentials=True)
# 
#     # Add CORS headers
#     @app.after_request
#     def add_cors_headers(response):
#         response.headers["Access-Control-Allow-Origin"] = "*"
#         response.headers["Access-Control-Allow-Credentials"] = "true"
#         response.headers["Access-Control-Allow-Methods"] = "GET, POST, PUT, DELETE, OPTIONS"
#         response.headers["Access-Control-Allow-Headers"] = "Content-Type, Authorization"
#         return response
# 
#     # Initialize Extensions
#     db.init_app(app)
#     migrate.init_app(app, db)
#     jwt.init_app(app)
#     ma.init_app(app)
#     bcrypt.init_app(app)
# 
#     # Register Routes
#     register_blueprints(app)
#     register_cli_commands(app)
# 
#     # Serve React Frontend
#     @app.route("/", defaults={"path": ""})
#     @app.route("/<path:path>")
#     def serve_react(path):
#         """
#         Serve React static files for all non-API routes.
#         """
#         try:
#             print(f"Requested path: {path}")  # Debug log
# 
#             # Serve files if path exists
#             if path != "" and os.path.exists(os.path.join(static_folder_path, path)):
#                 return send_from_directory(static_folder_path, path)
# 
#             # Fallback to React index.html
#             return send_from_directory(static_folder_path, "index.html")
#         except Exception as e:
#             print(f"Error serving React file: {e}")
#             return send_from_directory(static_folder_path, "index.html")
# 
#     # Handle 404 errors by serving React index.html
#     @app.errorhandler(404)
#     def not_found(e):
#         print("404 Error - Serving React index.html")
#         return send_from_directory(static_folder_path, "index.html")
# 
#     return app
# 
# def register_blueprints(app):
#     """
#     Import and register all blueprints (routes).
#     """
#     from app.auth import auth_bp
#     from app.routes.patient_routes import patient_bp
#     from app.routes.appointment_routes import appointment_bp
#     from app.routes.recommendation_routes import recommendation_bp
#     from app.routes.analytics_routes import analytics_bp
#     from app.routes.news_routes import news_bp
#     from app.routes.provider_patient_routes import provider_patient_bp
#     from app.routes.user_routes import user_bp
#     from app.routes.health_record_routes import health_record_bp
#     from app.routes.user_recommendation_routes import user_recommendation_bp
# 
#     app.register_blueprint(auth_bp, url_prefix="/auth")
#     app.register_blueprint(patient_bp, url_prefix="/patients")
#     app.register_blueprint(appointment_bp, url_prefix="/appointments")
#     app.register_blueprint(recommendation_bp, url_prefix="/recommendations")
#     app.register_blueprint(analytics_bp, url_prefix="/analytics")
#     app.register_blueprint(news_bp, url_prefix="/news")
#     app.register_blueprint(provider_patient_bp, url_prefix="/provider_patients")
#     app.register_blueprint(user_bp, url_prefix="/users")
#     app.register_blueprint(health_record_bp, url_prefix="/health_records")
#     app.register_blueprint(user_recommendation_bp, url_prefix="/user_recommendations")
# 
# def register_cli_commands(app):
#     """
#     Register CLI commands for database seeding.
#     """
#     seed_cli = AppGroup("seed")
# 
#     @seed_cli.command("run")
#     def seed():
#         """Run database seeds."""
#         from app.seeds import seed_users, seed_patients, seed_appointments
#         try:
#             seed_users()
#             print("Users seeded successfully.")
#         except Exception as e:
#             print(f"Error seeding users: {e}")
# 
#         try:
#             seed_patients()
#             print("Patients seeded successfully.")
#         except Exception as e:
#             print(f"Error seeding patients: {e}")
# 
#         try:
#             seed_appointments()
#             print("Appointments seeded successfully.")
#         except Exception as e:
#             print(f"Error seeding appointments: {e}")
# 
#     app.cli.add_command(seed_cli)

# Test 2

from flask import Flask, send_from_directory, redirect, request
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_jwt_extended import JWTManager
from flask_marshmallow import Marshmallow
from flask_cors import CORS
from flask.cli import AppGroup
from flask_bcrypt import Bcrypt
from datetime import timedelta
from .config import Config
import os

# Initialize Flask extensions
db = SQLAlchemy()
migrate = Migrate()
jwt = JWTManager()
ma = Marshmallow()
bcrypt = Bcrypt()

def create_app():
    """
    Create and configure the Flask app.
    """
    # Determine static folder for serving React build
    static_folder_path = os.path.abspath(os.path.join(os.path.dirname(__file__), "../client/dist"))
    if not os.path.exists(static_folder_path):
        static_folder_path = None  # Backend-only deployment

    app = Flask(__name__, static_folder=static_folder_path, static_url_path="/")

    # Load configuration
    app.config.from_object(Config)

    # Database Config
    app.config["SQLALCHEMY_DATABASE_URI"] = os.getenv("SQLALCHEMY_DATABASE_URI")
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

    # JWT Config
    app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(hours=1)
    app.config["JWT_REFRESH_TOKEN_EXPIRES"] = timedelta(days=7)
    app.config["JWT_TOKEN_LOCATION"] = ["cookies"]
    app.config["JWT_COOKIE_CSRF_PROTECT"] = False

    # Enable CORS
    CORS(app, resources={r"/*": {"origins": [
            "http://localhost:5173",  # Local frontend
            "http://localhost:5555",  # Local backend (for local tests)
            "https://caresync-rful.onrender.com",  # Production frontend
            "https://caresynq-7ykc.onrender.com",  # Production backend
    ], "supports_credentials": True}})

    # Initialize Extensions
    db.init_app(app)
    migrate.init_app(app, db)
    jwt.init_app(app)
    ma.init_app(app)
    bcrypt.init_app(app)

    # Register Routes
    register_blueprints(app)
    register_cli_commands(app)

    # Serve React Frontend (if available)
    if static_folder_path:
        @app.route("/", defaults={"path": ""})
        @app.route("/<path:path>")
        def serve_react(path):
            """
            Serve React static files for all non-API routes.
            """
            if path and os.path.exists(os.path.join(static_folder_path, path)):
                return send_from_directory(static_folder_path, path)
            return send_from_directory(static_folder_path, "index.html")

        @app.errorhandler(404)
        def not_found(e):
            """
            Fallback to React index.html for any 404.
            """
            return send_from_directory(static_folder_path, "index.html")

    else:
        @app.route("/", defaults={"path": ""})
        @app.route("/<path:path>")
        def redirect_to_frontend(path):
            """
            Redirect all non-API requests to hosted React frontend.
            """
            frontend_url = "https://caresync-rful.onrender.com"
            return redirect(f"{frontend_url}/{path}")

        @app.errorhandler(404)
        def not_found_redirect(e):
            """
            Redirect to hosted React frontend for any 404.
            """
            return redirect("https://caresync-rful.onrender.com")

    return app

def register_blueprints(app):
    """
    Import and register all blueprints (routes).
    """
    from app.auth import auth_bp
    from app.routes.patient_routes import patient_bp
    from app.routes.appointment_routes import appointment_bp
    from app.routes.recommendation_routes import recommendation_bp
    from app.routes.analytics_routes import analytics_bp
    from app.routes.news_routes import news_bp
    from app.routes.provider_patient_routes import provider_patient_bp
    from app.routes.user_routes import user_bp
    from app.routes.health_record_routes import health_record_bp
    from app.routes.user_recommendation_routes import user_recommendation_bp

    app.register_blueprint(auth_bp, url_prefix="/auth")
    app.register_blueprint(patient_bp, url_prefix="/patients")
    app.register_blueprint(appointment_bp, url_prefix="/appointments")
    app.register_blueprint(recommendation_bp, url_prefix="/recommendations")
    app.register_blueprint(analytics_bp, url_prefix="/analytics")
    app.register_blueprint(news_bp, url_prefix="/news")
    app.register_blueprint(provider_patient_bp, url_prefix="/provider_patients")
    app.register_blueprint(user_bp, url_prefix="/users")
    app.register_blueprint(health_record_bp, url_prefix="/health_records")
    app.register_blueprint(user_recommendation_bp, url_prefix="/user_recommendations")

def register_cli_commands(app):
    """
    Register CLI commands for database seeding.
    """
    seed_cli = AppGroup("seed")

    @seed_cli.command("run")
    def seed():
        """Run database seeds."""
        from app.seeds import seed_users, seed_patients, seed_appointments
        try:
            seed_users()
            print("Users seeded successfully.")
        except Exception as e:
            print(f"Error seeding users: {e}")

        try:
            seed_patients()
            print("Patients seeded successfully.")
        except Exception as e:
            print(f"Error seeding patients: {e}")

        try:
            seed_appointments()
            print("Appointments seeded successfully.")
        except Exception as e:
            print(f"Error seeding appointments: {e}")

    app.cli.add_command(seed_cli)
