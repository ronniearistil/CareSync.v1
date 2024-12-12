import sys
import os
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

import pytest
from app import create_app, db

@pytest.fixture
def app():
    """
    Create a test app with a separate test database.
    """
    app = create_app()
    app.config.update({
        "TESTING": True,
        "SQLALCHEMY_DATABASE_URI": "sqlite:///:memory:",  # Use in-memory DB for testing
        "SQLALCHEMY_TRACK_MODIFICATIONS": False,
    })

    with app.app_context():
        db.create_all()  # Create tables for testing
        yield app  # Provide app to test

    # Clean up after tests
    with app.app_context():
        db.drop_all()

@pytest.fixture
def client(app):
    """
    Provides a test client for making HTTP requests.
    """
    return app.test_client()

@pytest.fixture
def runner(app):
    """
    Provides a test runner for CLI commands.
    """
    return app.test_cli_runner()
