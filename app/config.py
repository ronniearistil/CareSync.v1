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
    SQLALCHEMY_DATABASE_URI = os.getenv("DATABASE_URL")  # PostgreSQL connection URL
    SQLALCHEMY_TRACK_MODIFICATIONS = False  # Disable for performance

    # JWT Configuration
    JWT_ACCESS_TOKEN_EXPIRES = 3600  # Default to 1 hour
    JWT_REFRESH_TOKEN_EXPIRES = 604800  # Default to 7 days
    JWT_TOKEN_LOCATION = ["cookies"]  # Use cookies for storing tokens

    # CORS Configuration
    CORS_ALLOWED_ORIGINS = os.getenv("CORS_ALLOWED_ORIGINS", "http://localhost:3000")  # Default origin for local dev
