import os
import flask_sqlalchemy
from app import app

class Config(object):
    SQLALCHEMY_DATABASE_URI = os.getenv("DATABASE_URL", "sqlite://")
    SQLALCHEMY_TRACK_MODIFICATIONS = False

basedir = os.path.abspath(os.path.dirname(__file__))
app.config.from_object(Config)
app.config['SECRET_KEY'] = 'secret!'
db = flask_sqlalchemy.SQLAlchemy(app)


category_names = [
    "furniture",
    "books",
    "clothes",
    "electronics",
    "beauty",
    "toys",
    "kitchen and dining",
    "sports",
    "automotive",
    "tools",
]

material_names = [
    "wood",
    "plastic",
    "metal",
    "wool",
    "cotton",
    "polyester",
    "ceramic"
]