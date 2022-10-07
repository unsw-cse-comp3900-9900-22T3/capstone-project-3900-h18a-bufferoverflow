from flask import Flask
from flask_cors import CORS
import json
app = Flask(__name__)
CORS(app)


from flask_sqlalchemy import SQLAlchemy
app.config.from_object("app.config.Config")
db = SQLAlchemy(app)

class Address(db.Model):
    __tablename__ = "addresses"

    id = db.Column(db.Integer, primary_key=True)

class User(db.Model):
    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(128), unique=True, nullable=False)
    active = db.Column(db.Boolean(), default=True, nullable=False)
    preferredDistance = db.Column(db.Integer, default=100, nullable=False)
    bio = db.Column(db.String(500), default="", nullable=False)
    displayImg = db.Column(db.String(128), default=None, nullable=True)
    address = db.Column(db.Integer, db.ForeignKey("addresses.id"), nullable=False)

    def __init__(self, email):
        self.email = email

@app.route("/")
def hello():
    return "Hello World from Flask"

@app.route("/allUsers")
def getAllUsers():
    return json.dumps([user.email for user in User.query.all()])

@app.route("/addUser/<email>")
def addUser(email):
    try:
        db.session.add(User(email))
        db.session.commit()
        return "User added"
    except:
        return "Error adding user, check logs"

@app.route("/query/")
def query():
    result = db.session.execute('select * from users')
    emails = [row[1] for row in result]
    print(1)
    return {"emails": emails}