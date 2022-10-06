# Backend

This is the backend for the [frontend](https://github.com/sschreyer/3900_private/tree/main/frontend)


## Dependencies

- [PostgreSQL](https://www.postgresql.org/) version 13.8
- [Python](https://www.python.org/)
- [Flask](https://flask.palletsprojects.com/en/2.0.x/)
- [Flask-SQLAlchemy](https://flask-sqlalchemy.palletsprojects.com/en/2.x/)
- [Flask-Cors](https://flask-cors.readthedocs.io/en/latest/)
- [Ariadne](https://ariadnegraphql.org/)
- [Gunicon](https://gunicorn.org/)
- [pyscopg2-binary](https://pypi.org/project/psycopg2-binary/)

## Setup

1. Install [Docker Desktop](https://www.docker.com/products/docker-desktop)
2. Run `docker-compose up -d --build` in the root directory
  - The first time you run this command, you might be waiting for a while for the image to install everything. Subsequent runs will use a cached image and the container will start almost immediately

## Usage
- Play around with database via the backend command line using command line tools defined in manage.py
  - example: `python manage.py seed_db` will seed the database with some dummy data (lukes email)
  - feel free to add your own cli commands