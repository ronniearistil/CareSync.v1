from app import bcrypt, db, create_app
from app.models.user_model import User

def rehash_passwords():
    users = User.query.all()
    for user in users:
        # Check if the password hash is already bcrypt
        if not user.password_hash.startswith("bcrypt:"):
            print(f"Rehashing password for user: {user.email}")

            # Set a new temporary password or use existing credentials if accessible
            new_password = "temporary_password"  # Replace with a secure password
            user.password_hash = bcrypt.generate_password_hash(new_password).decode("utf-8")

    db.session.commit()
    print("All passwords rehashed successfully.")

if __name__ == "__main__":
    app = create_app()  # Create the app instance
    with app.app_context():  # Enter the app context
        rehash_passwords()

