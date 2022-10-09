from flask import Flask, request, jsonify
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
    street = db.Column(db.String(80), nullable=False)
    cityId = db.Column(db.Integer, db.ForeignKey('cities.id'), nullable=False)
    stateId = db.Column(db.Integer, db.ForeignKey('states.id'), nullable=False)
    countryId = db.Column(db.Integer, db.ForeignKey('countries.id'), nullable=False)
    postCode = db.Column(db.String(80), nullable=False)

    def __init__(self, street, cityId, stateId, countryId, postCode):
        self.cityId = cityId
        self.street = street
        self.stateId = stateId
        self.countryId = countryId
        self.postCode = postCode

class State(db.Model):
    __tablename__ = "states"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), nullable=False)

    def __init__(self, name):
        self.name = name

class City(db.Model):
    __tablename__ = "cities"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), nullable=False)

    def __init__(self, name):
        self.name = name

class Country(db.Model):
    __tablename__ = "countries"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), nullable=False)

    def __init__(self, name):
        self.name = name


class User(db.Model):
    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(128), unique=True, nullable=False)
    preferredDistance = db.Column(db.Integer, default=100, nullable=False)
    bio = db.Column(db.String(500), default="", nullable=False)
    displayImg = db.Column(db.String(128), default="", nullable=True)
    addressId = db.Column(db.Integer, db.ForeignKey("addresses.id"), nullable=True)

    def __init__(self, username, email, preferredDistance, bio, displayImg, addressId):
        self.username = username
        self.email = email
        self.preferredDistance = preferredDistance
        self.bio = bio
        self.displayImgId = displayImg
        self.addressId = addressId

class Images(db.Model):
    __tablename__ = "images"

    id = db.Column(db.Integer, primary_key=True)
    url = db.Column(db.String(128), unique=True, nullable=False)

    def __init__(self, url):
        self.url = url

@app.route("/")
def hello():
    return "Hello World from Flask"

@app.route("/allUsers")
def getAllUsers():
    return json.dumps([user.email for user in User.query.all()])

@app.route("/addAddress", methods=["POST"])
def addAddress():
    data = request.get_json()
    country = data["country"]
    state = data["state"]
    city = data["city"]
    postCode = data["postCode"]
    street = data["street"]

    try:
        # add new country
        db.session.add(Country(country))
        # get id
        countryId = Country.query.filter_by(name=country).first().id

        # add new state
        db.session.add(State(state))
        # get id
        stateId = State.query.filter_by(name=state).first().id

        # add new city
        db.session.add(City(city))
        # get id
        cityId = City.query.filter_by(name=city).first().id

        # add new address
        db.session.add(Address(street, cityId, stateId, countryId, postCode))

        db.session.commit()
        return {"status" : "success"}
    except Exception as e:
        return {"status" : "failure", "error" : str(e)}


@app.route("/addUser", methods=["POST"])
def addUser():
    email = request.json["userEmail"]
    username = request.json["username"]
    try:
        db.session.add(User(username, email, 100, "", None, 1))
        db.session.commit()
        return jsonify({"status" : "success"})
    except Exception as e:
        return jsonify({"status" : "failure", "error" : str(e)})

@app.route("/updateUserImage", methods=["POST"])
def updateUserImage():
    imageUrl = request.json["imageUrl"]
    userEmail = request.json["userEmail"]
    try:
        db.session.query(User).filter_by(email=userEmail).update({"displayImg" : imageUrl})
        db.session.commit()
        return {"status" : "success"}
    except Exception as e:
        return {"status" : "failure", "error" : str(e)}

@app.route("/query")
def query():
    result = db.session.execute('select * from users')
    emails = [row[1] for row in result]
    print(1)
    return {"emails": emails}

@app.route("/getToken", methods=["POST"])
def getToken():
    username = request.json["username"]
    return {"username": username}