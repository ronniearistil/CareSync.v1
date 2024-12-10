# import os
# from dotenv import load_dotenv
# 
# # Load environment variables from .env
# load_dotenv()
# 
# class Config:
#     # Security Keys
#     SECRET_KEY = os.getenv("SECRET_KEY", "fallback_secret_key")
#     JWT_SECRET_KEY = os.getenv("JWT_SECRET_KEY", "fallback_jwt_secret")
# 
#     # Database Configuration
#     SQLALCHEMY_DATABASE_URI = os.getenv("DATABASE_URL")  # PostgreSQL connection URL
#     SQLALCHEMY_TRACK_MODIFICATIONS = False  # Disable for performance

import os
from dotenv import load_dotenv

# Load environment variables from .env
load_dotenv()

class Config:
    # Security Keys
    SECRET_KEY = os.getenv("SECRET_KEY")
    JWT_SECRET_KEY = os.getenv("JWT_SECRET_KEY")

    # Database Configuration
    SQLALCHEMY_DATABASE_URI = os.getenv("DATABASE_URL")
    SQLALCHEMY_TRACK_MODIFICATIONS = False

    # JWT Configuration
    JWT_ACCESS_TOKEN_EXPIRES = 3600
    JWT_REFRESH_TOKEN_EXPIRES = 604800
    JWT_TOKEN_LOCATION = ["cookies"]

    # CORS Configuration
    CORS_ALLOWED_ORIGINS = os.getenv("CORS_ALLOWED_ORIGINS", "http://localhost:3000")
