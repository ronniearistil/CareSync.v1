def register_blueprints(app):
    from app.routes.appointment_routes import appointment_bp
    from app.routes.news_routes import news_bp
    from app.routes.recommendation_routes import recommendation_bp
    from app.routes.analytics_routes import analytics_bp
    from app.routes.patient_routes import patient_bp
    from app.routes.auth_routes import auth_bp
    from app.models.patient_model import Patient

    app.register_blueprint(appointment_bp, url_prefix="/appointments")
    app.register_blueprint(news_bp, url_prefix="/news")
    app.register_blueprint(recommendation_bp, url_prefix="/recommendations")
    app.register_blueprint(analytics_bp, url_prefix="/analytics")
    app.register_blueprint(patient_bp, url_prefix="/patients")
    app.register_blueprint(auth_bp, url_prefix="/auth")
    


