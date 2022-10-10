from app import db

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

    def to_json(self):
        return {
            "id": self.id,
            "street": self.street,
            "cityId": self.cityId,
            "stateId": self.stateId,
            "countryId": self.countryId,
            "postCode": self.postCode
        }

    def save():
        db.session.add(self)
        db.session.commit()

class State(db.Model):
    __tablename__ = "states"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), nullable=False)

    def save():
        db.session.add(self)
        db.session.commit()

class City(db.Model):
    __tablename__ = "cities"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), nullable=False)

    def save():
        db.session.add(self)
        db.session.commit()

class Country(db.Model):
    __tablename__ = "countries"

    id = db.Column(db.Integer, primary_key=True)
    place = db.Column(db.String(128), unique=True, nullable=False)
    users = db.relationship("User")

    def __init__(self, place):
        self.place = place

    def to_dict(self):
        return {
            "id": self.id,
            "place": self.place
        }

    def save():
        db.session.add(self)
        db.session.commit()


class User(db.Model):
    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(128), unique=True, nullable=False)
    preferredDistance = db.Column(db.Integer, default=100, nullable=False)
    bio = db.Column(db.String(500), default="", nullable=False)
    displayImg = db.Column(db.String(128), default="", nullable=False)
    addressId = db.Column(db.Integer, db.ForeignKey("addresses.id"), nullable=True)

    def __init__(self, email, username):
        self.username = username
        self.email = email

    def to_json(self):
        return {
            "id": self.id,
            "email": self.email,
            "username": self.username,
            "active": self.active,
            "preferred_distance": self.preferred_distance,
            "bio": self.bio,
            "display_img": self.display_img,
            "address": self.address
        }

    def save():
        db.session.add(self)
        db.session.commit()

class Images(db.Model):
    __tablename__ = "images"

    id = db.Column(db.Integer, primary_key=True)
    url = db.Column(db.String(128), unique=True, nullable=False)

    def __init__(self, url):
        self.url = url







