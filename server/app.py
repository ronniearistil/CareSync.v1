import logging

logging.basicConfig(level=logging.DEBUG)
logging.debug("App.py has been loaded.")

from app import create_app

app = create_app()
