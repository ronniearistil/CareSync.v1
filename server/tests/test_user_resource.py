import pytest
from app import create_app, db
from app.models.user_model import User

@pytest.fixture
def client():
    app = create_app()
    app.config["TESTING"] = True
    app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///:memory:"
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

    with app.app_context():
        db.create_all()
        yield app.test_client()
        db.drop_all()

def test_get_users(client):
    response = client.get("/users")
    assert response.status_code == 200
    assert isinstance(response.json, list)

def test_create_user(client):
    new_user = {
        "name": "John Doe",
        "email": "johndoe@example.com",
        "password": "password123",
        "role": "Provider",
    }
    response = client.post("/users", json=new_user)
    assert response.status_code == 201
    assert response.json["name"] == "John Doe"

def test_update_user(client):
    new_user = {
        "name": "John Doe",
        "email": "johndoe@example.com",
        "password": "password123",
        "role": "Provider",
    }
    post_response = client.post("/users", json=new_user)
    user_id = post_response.json["id"]

    updated_data = {"name": "John Updated"}
    response = client.put(f"/users/{user_id}", json=updated_data)
    assert response.status_code == 200
    assert response.json["name"] == "John Updated"

def test_delete_user(client):
    new_user = {
        "name": "John Doe",
        "email": "johndoe@example.com",
        "password": "password123",
        "role": "Provider",
    }
    post_response = client.post("/users", json=new_user)
    user_id = post_response.json["id"]

    response = client.delete(f"/users/{user_id}")
    assert response.status_code == 204

