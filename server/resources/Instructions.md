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
