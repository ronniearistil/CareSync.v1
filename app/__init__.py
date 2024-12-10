from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_jwt_extended import JWTManager
from flask_marshmallow import Marshmallow  # Add Marshmallow import

# Initialize Flask extensions
db = SQLAlchemy()
migrate = Migrate()
jwt = JWTManager()
ma = Marshmallow()  # Initialize Marshmallow

def create_app():
    """
    Create and configure the Flask app.
    """
    # Create Flask app instance
    app = Flask(__name__)
    
    # Load configuration from Config class in config.py
    app.config.from_object("app.config.Config")
    
    # Initialize Flask extensions
    db.init_app(app)
    migrate.init_app(app, db)
    jwt.init_app(app)
    ma.init_app(app)  # Initialize Marshmallow with app

    # Import models to ensure they are registered with SQLAlchemy
    with app.app_context():
        from app.models.user_model import User
        from app.models.health_record_model import HealthRecord
        from app.models.appointment_model import Appointment
        from app.models.recommendation_model import Recommendation
        from app.models.news_model import News
        from app.models.provider_patients_model import ProviderPatient
        from app.models.user_recommendations_model import UserRecommendation
        from app.models.analytics_model import Analytics

    # Register blueprints
    register_blueprints(app)

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

    app.register_blueprint(auth_bp, url_prefix="/auth")
    app.register_blueprint(patient_bp, url_prefix="/patients")
    app.register_blueprint(appointment_bp, url_prefix="/appointments")
    app.register_blueprint(recommendation_bp, url_prefix="/recommendations")
    app.register_blueprint(analytics_bp, url_prefix="/analytics")
    app.register_blueprint(news_bp, url_prefix="/news")





