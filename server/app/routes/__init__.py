# def register_blueprints(app):
#     from app.routes.appointment_routes import appointment_bp
#     from app.routes.news_routes import news_bp
#     from app.routes.recommendation_routes import recommendation_bp
#     from app.routes.analytics_routes import analytics_bp
#     from app.routes.patient_routes import patient_bp
#     from app.routes.auth_routes import auth_bp
#     from app.models.patient_model import Patient
# 
#     app.register_blueprint(appointment_bp, url_prefix="/appointments")
#     app.register_blueprint(news_bp, url_prefix="/news")
#     app.register_blueprint(recommendation_bp, url_prefix="/recommendations")
#     app.register_blueprint(analytics_bp, url_prefix="/analytics")
#     app.register_blueprint(patient_bp, url_prefix="/patients")
#     app.register_blueprint(auth_bp, url_prefix="/auth")
#     


def register_blueprints(app):
    from app.routes.analytics_routes import analytics_bp
    from app.routes.appointment_routes import appointment_bp
    from app.routes.auth_routes import auth_bp
    from app.routes.health_record_routes import health_record_bp
    from app.routes.news_routes import news_bp
    from app.routes.patient_routes import patient_bp
    from app.routes.provider_patient_routes import provider_patient_bp
    from app.routes.recommendation_routes import recommendation_bp
    from app.routes.user_recommendation_routes import user_recommendation_bp
    from app.routes.user_routes import user_bp

    # Register blueprints with explicit prefixes
    app.register_blueprint(analytics_bp, url_prefix="/analytics")
    app.register_blueprint(appointment_bp, url_prefix="/appointments")
    app.register_blueprint(auth_bp, url_prefix="/auth")
    app.register_blueprint(health_record_bp, url_prefix="/health_records")
    app.register_blueprint(news_bp, url_prefix="/news")
    app.register_blueprint(patient_bp, url_prefix="/patients")
    app.register_blueprint(provider_patient_bp, url_prefix="/provider_patients")
    app.register_blueprint(recommendation_bp, url_prefix="/recommendations")
    app.register_blueprint(user_recommendation_bp, url_prefix="/user_recommendations")
    app.register_blueprint(user_bp, url_prefix="/users")
