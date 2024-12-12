import pytest
from app import create_app, db
from app.models.appointment_model import Appointment

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

def test_get_appointments(client):
    response = client.get("/appointments")
    assert response.status_code == 200
    assert isinstance(response.json, list)

def test_create_appointment(client):
    new_appointment = {
        "date": "2024-12-10",
        "time": "14:00:00",
        "location": "123 Main St",
        "status": "Scheduled",
        "user_id": 1,
    }
    response = client.post("/appointments", json=new_appointment)
    assert response.status_code == 201
    assert response.json["location"] == "123 Main St"

def test_update_appointment(client):
    new_appointment = {
        "date": "2024-12-10",
        "time": "14:00:00",
        "location": "123 Main St",
        "status": "Scheduled",
        "user_id": 1,
    }
    post_response = client.post("/appointments", json=new_appointment)
    appointment_id = post_response.json["id"]

    updated_data = {"location": "456 New Ave"}
    response = client.put(f"/appointments/{appointment_id}", json=updated_data)
    assert response.status_code == 200
    assert response.json["location"] == "456 New Ave"

def test_delete_appointment(client):
    new_appointment = {
        "date": "2024-12-10",
        "time": "14:00:00",
        "location": "123 Main St",
        "status": "Scheduled",
        "user_id": 1,
    }
    post_response = client.post("/appointments", json=new_appointment)
    appointment_id = post_response.json["id"]

    response = client.delete(f"/appointments/{appointment_id}")
    assert response.status_code == 204

