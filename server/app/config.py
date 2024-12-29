# 
# import os
# from dotenv import load_dotenv
# 
# # Load environment variables from .env
# load_dotenv()
# 
# class Config:
#     # Security Keys
#     SECRET_KEY = os.getenv("SECRET_KEY")
#     JWT_SECRET_KEY = os.getenv("JWT_SECRET_KEY")
# 
#     # Database Configuration
#     SQLALCHEMY_DATABASE_URI = os.getenv("DATABASE_URL")
#     SQLALCHEMY_TRACK_MODIFICATIONS = False
# 
#     # JWT Configuration
#     JWT_ACCESS_TOKEN_EXPIRES = 3600
#     JWT_REFRESH_TOKEN_EXPIRES = 604800
#     JWT_TOKEN_LOCATION = ["cookies"]
# 
#     # CORS Configuration
#     CORS_ALLOWED_ORIGINS = os.getenv("CORS_ALLOWED_ORIGINS", "http://localhost:5174")
#     
    
    
    # Deployment Test
    
import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

class Config:
    # Security Keys
    SECRET_KEY = os.getenv("SECRET_KEY")
    JWT_SECRET_KEY = os.getenv("JWT_SECRET_KEY")

    # Database Configuration
    SQLALCHEMY_DATABASE_URI = os.getenv("DATABASE_URL")
    SQLALCHEMY_TRACK_MODIFICATIONS = False

    # JWT Configuration
    JWT_ACCESS_TOKEN_EXPIRES = 3600  # 1 hour
    JWT_REFRESH_TOKEN_EXPIRES = 604800  # 7 days
    JWT_TOKEN_LOCATION = ["cookies"]
    JWT_COOKIE_CSRF_PROTECT = False

    # CORS Configuration
    CORS_ALLOWED_ORIGINS = os.getenv("CORS_ALLOWED_ORIGINS", "http://localhost:5173").split(",")
