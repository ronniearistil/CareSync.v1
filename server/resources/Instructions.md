# Run seed file
python -m app.seeds

# Password Hash
    python rehash_passwords.py


# Run Python 
python run.py

# PostgreSQL 
psql -U care_sync_user -d care_sync

\dt
\d patients

## Exit
\q 

# To view all data from a table
SELECT * FROM patients;


# For Local Development: http://127.0.0.1:5555/

python run.py

# For Deployment (Gunicorn): http://127.0.0.1:8000/

PYTHONPATH=server pipenv run gunicorn -w 4 -b 0.0.0.0:8000 server.run:app


<!-- Deployment Tests -->
gunicorn --chdir server app:app

gunicorn --chdir server app.app:app

# Working Commend with Error
gunicorn --chdir server app:create_app