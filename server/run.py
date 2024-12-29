# import sys
# from pathlib import Path
# from app import create_app
# 
# # Dynamically adjust sys.path
# sys.path.append(str(Path(__file__).resolve().parent))
# 
# # Create the Flask app
# app = create_app()
# 
# if __name__ == "__main__":
#     # Run the Flask app
#     app.run(host="0.0.0.0", port=5555, debug=True)

import sys
from pathlib import Path
from app import create_app

# Dynamically adjust sys.path to ensure modules can be imported
sys.path.append(str(Path(__file__).resolve().parent))

# Create the Flask application instance
app = create_app()

# Test route to verify server setup
@app.route("/")
def home():
    return "Server is running!"

if __name__ == "__main__":
    # Run the Flask app directly (useful for development)
    app.run(host="0.0.0.0", port=5555, debug=True)