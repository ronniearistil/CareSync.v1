from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_jwt_extended import JWTManager
from flask_marshmallow import Marshmallow
from flask_cors import CORS
from flask.cli import AppGroup
from flask_bcrypt import Bcrypt
# from flask_caching import Cache
from datetime import timedelta
import os
from .config import Config


# Initialize Flask extensions
db = SQLAlchemy()
migrate = Migrate()
jwt = JWTManager()
ma = Marshmallow()
bcrypt = Bcrypt()
# cache = Cache(config={"CACHE_TYPE": "SimpleCache"}) 

def create_app():
    """
    Create and configure the Flask app.
    """
    app = Flask(__name__)

    # Load configuration from Config class in config.py
    # app.config.from_object("app.config.Config")
    app.config.from_object(Config)



    # Set database URI
    app.config["SQLALCHEMY_DATABASE_URI"] = os.getenv("DATABASE_URL")
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

    # Set JWT configurations
    app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(hours=1)
    app.config["JWT_REFRESH_TOKEN_EXPIRES"] = timedelta(days=7)
    app.config["JWT_TOKEN_LOCATION"] = ["cookies"]
    app.config["JWT_COOKIE_CSRF_PROTECT"] = False

    # Enable CORS
    # app.config["CORS_ALLOWED_ORIGINS"] = ["http://localhost:5174"]
    # CORS(app, resources={r"/*": {"origins": "http://localhost:5173"}}, supports_credentials=True)
    CORS(app, resources={r"/*": {"origins": ["http://localhost:5173", "http://localhost:5174", "http://localhost:5175"]}}, supports_credentials=True)


    # Initialize Flask extensions
    db.init_app(app)
    migrate.init_app(app, db)
    jwt.init_app(app)
    ma.init_app(app)
    # bcrypt.init_app(app)
    # cache.init_app(app)

    # Register blueprints and CLI commands
    register_blueprints(app)
    register_cli_commands(app)

    return app

def register_blueprints(app):
    """
    Import and register all blueprints (routes) in the application.
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

    # Register blueprints with their prefixes
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
    
# Decoupled Routes 
# def register_blueprints(app):

#     # New decoupled route imports
#     from app.auth.routes.auth_routes import auth_bp
#     from app.auth.routes.patient_routes import patient_bp
#     from app.auth.routes.user_routes import user_bp
#     from app.auth.routes.search_routes import search_bp
#     
#     # Existing routes (unchanged)
#     from app.routes.appointment_routes import appointment_bp
#     from app.routes.recommendation_routes import recommendation_bp
#     from app.routes.analytics_routes import analytics_bp
#     from app.routes.news_routes import news_bp
#     from app.routes.provider_patient_routes import provider_patient_bp
#     from app.routes.health_record_routes import health_record_bp
# 
#     # Register blueprints with their prefixes
#     app.register_blueprint(auth_bp, url_prefix="/auth")
#     app.register_blueprint(patient_bp, url_prefix="/patients")
#     app.register_blueprint(user_bp, url_prefix="/users")
#     app.register_blueprint(search_bp, url_prefix="/search")
#     app.register_blueprint(appointment_bp, url_prefix="/appointments")
#     app.register_blueprint(recommendation_bp, url_prefix="/recommendations")
#     app.register_blueprint(analytics_bp, url_prefix="/analytics")
#     app.register_blueprint(news_bp, url_prefix="/news")
#     app.register_blueprint(provider_patient_bp, url_prefix="/provider_patients")
#     app.register_blueprint(health_record_bp, url_prefix="/health_records")
# app.register_blueprint(user_recommendation_bp, url_prefix="/user_recommendations")


def register_cli_commands(app):
    """
    Register custom CLI commands for seeding the database.
    """
    seed_cli = AppGroup("seed")

    @seed_cli.command("run")
    def seed():
        """Run all seed scripts."""
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


