from app import create_app

app = create_app()

if __name__ == "__main__":
    # Specify host and port
    app.run(host="0.0.0.0", port=5555, debug=True)