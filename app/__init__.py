# from flask import Flask
# from flask_sqlalchemy import SQLAlchemy
# from flask_migrate import Migrate
# from flask_jwt_extended import JWTManager
# from flask_marshmallow import Marshmallow  # Add Marshmallow import
# 
# # Initialize Flask extensions
# db = SQLAlchemy()
# migrate = Migrate()
# jwt = JWTManager()
# ma = Marshmallow()  # Initialize Marshmallow
# 
# def create_app():
#     """
#     Create and configure the Flask app.
#     """
#     # Create Flask app instance
#     app = Flask(__name__)
#     
#     # Load configuration from Config class in config.py
#     app.config.from_object("app.config.Config")
#     
#     # Initialize Flask extensions
#     db.init_app(app)
#     migrate.init_app(app, db)
#     jwt.init_app(app)
#     ma.init_app(app)  # Initialize Marshmallow with app
# 
#     # Import models to ensure they are registered with SQLAlchemy
#     with app.app_context():
#         from app.models.user_model import User
#         from app.models.health_record_model import HealthRecord
#         from app.models.appointment_model import Appointment
#         from app.models.recommendation_model import Recommendation
#         from app.models.news_model import News
#         from app.models.provider_patients_model import ProviderPatient
#         from app.models.user_recommendations_model import UserRecommendation
#         from app.models.analytics_model import Analytics
# 
#     # Register blueprints
#     register_blueprints(app)
# 
#     return app
# 
# def register_blueprints(app):
#     """
#     Import and register all blueprints (routes) in the application.
#     This keeps the `create_app` function cleaner.
#     """
#     from app.routes.auth_routes import auth_bp
#     from app.routes.patient_routes import patient_bp
#     from app.routes.appointment_routes import appointment_bp
#     from app.routes.recommendation_routes import recommendation_bp
#     from app.routes.analytics_routes import analytics_bp
#     from app.routes.news_routes import news_bp
# 
#     app.register_blueprint(auth_bp, url_prefix="/auth")
#     app.register_blueprint(patient_bp, url_prefix="/patients")
#     app.register_blueprint(appointment_bp, url_prefix="/appointments")
#     app.register_blueprint(recommendation_bp, url_prefix="/recommendations")
#     app.register_blueprint(analytics_bp, url_prefix="/analytics")
#     app.register_blueprint(news_bp, url_prefix="/news")

from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_jwt_extended import JWTManager
from flask_marshmallow import Marshmallow
from flask_cors import CORS
from flask.cli import AppGroup
from datetime import timedelta

# Initialize Flask extensions
db = SQLAlchemy()
migrate = Migrate()
jwt = JWTManager()
ma = Marshmallow()

def create_app():
    """
    Create and configure the Flask app.
    """
    app = Flask(__name__)

    # Load configuration from Config class in config.py
    app.config.from_object("app.config.Config")

    # Set JWT configurations
    app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(hours=1)
    app.config["JWT_REFRESH_TOKEN_EXPIRES"] = timedelta(days=7)
    app.config["JWT_TOKEN_LOCATION"] = ["cookies"]

    # Set up CORS
    CORS(app, supports_credentials=True, resources={r"/*": {"origins": "*"}})

    # Initialize Flask extensions
    db.init_app(app)
    migrate.init_app(app, db)
    jwt.init_app(app)
    ma.init_app(app)

    # Register blueprints and CLI commands
    register_blueprints(app)
    register_cli_commands(app)

    # Import models to ensure tables are created
    with app.app_context():
        register_models()

    return app


def register_blueprints(app):
    """
    Import and register all blueprints (routes) in the application.
    This keeps the `create_app` function cleaner.
    """
    from app.routes.auth_routes import auth_bp
    from app.routes.patient_routes import patient_bp
    from app.routes.appointment_routes import appointment_bp
    from app.routes.recommendation_routes import recommendation_bp
    from app.routes.analytics_routes import analytics_bp
    from app.routes.news_routes import news_bp
    from app.routes.provider_patient_routes import provider_patient_bp
    from app.routes.user_routes import user_bp

    # Register blueprints with their prefixes
    app.register_blueprint(auth_bp, url_prefix="/auth")
    app.register_blueprint(patient_bp, url_prefix="/patients")
    app.register_blueprint(appointment_bp, url_prefix="/appointments")
    app.register_blueprint(recommendation_bp, url_prefix="/recommendations")
    app.register_blueprint(analytics_bp, url_prefix="/analytics")
    app.register_blueprint(news_bp, url_prefix="/news")
    app.register_blueprint(provider_patient_bp, url_prefix="/provider_patients")
    app.register_blueprint(user_bp, url_prefix="/users")


def register_models():
    """
    Import models to ensure they are registered with SQLAlchemy.
    This avoids circular import issues and ensures all models are initialized properly.
    """
    from app.models.user_model import User
    from app.models.health_record_model import HealthRecord
    from app.models.appointment_model import Appointment
    from app.models.recommendation_model import Recommendation
    from app.models.news_model import News
    from app.models.provider_patients_model import ProviderPatient
    from app.models.user_recommendations_model import UserRecommendation
    from app.models.analytics_model import Analytics


def register_cli_commands(app):
    seed_cli = AppGroup("seed")

    @seed_cli.command("run")
    def seed():
        """Run all seed scripts."""
        # Import seeding functions here to avoid circular imports
        from app.seeds import seed_users, seed_patients, seed_appointments

        try:
            seed_users()
            seed_patients()
            seed_appointments()
            print("Database seeded successfully!")
        except Exception as e:
            print(f"Error during seeding: {e}")

    app.cli.add_command(seed_cli)
