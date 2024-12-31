from .auth_routes import auth_bp
from .patient_routes import patient_bp
from .user_routes import user_bp
from .search_routes import search_bp

__all__ = ["auth_bp", "patient_bp", "user_bp", "search_bp"]
