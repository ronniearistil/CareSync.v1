def validate_user_input(data, required_fields):
    errors = []
    for field in required_fields:
        if not data.get(field):
            errors.append(f"{field} is required")
    return ", ".join(errors) if errors else None

