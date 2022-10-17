from unicodedata import category

from itsdangerous import want_bytes
from app import db
from backend.app.helpers import determine_address_id

class Address(db.Model):
    __tablename__ = "addresses"

    id = db.Column(db.Integer, primary_key=True)
    place = db.Column(db.String, nullable=False)
    # street = db.Column(db.String(80), nullable=False)
    # cityId = db.Column(db.Integer, db.ForeignKey('cities.id'), nullable=False)
    # stateId = db.Column(db.Integer, db.ForeignKey('states.id'), nullable=False)
    # countryId = db.Column(db.Integer, db.ForeignKey('countries.id'), nullable=False)
    # postCode = db.Column(db.String(80), nullable=False)

    def __init__(self, place):
        self.place = place

    def to_json(self):
        return {
            "id": self.id,
            "place": self.place
        }

    def save(self):
        db.session.add(self)
        db.session.commit()

# class State(db.Model):
#     __tablename__ = "states"

#     id = db.Column(db.Integer, primary_key=True)
#     name = db.Column(db.String(80), nullable=False)

#     def save():
#         db.session.add(self)
#         db.session.commit()

# class City(db.Model):
#     __tablename__ = "cities"

#     id = db.Column(db.Integer, primary_key=True)
#     name = db.Column(db.String(80), nullable=False)

#     def save():
#         db.session.add(self)
#         db.session.commit()

# class Country(db.Model):
#     __tablename__ = "countries"

#     id = db.Column(db.Integer, primary_key=True)
#     place = db.Column(db.String(128), unique=True, nullable=False)
#     # users = db.relationship("User")

#     def __init__(self, place):
#         self.place = place

#     def to_dict(self):
#         return {
#             "id": self.id,
#             "place": self.place
#         }

#     def save():
#         db.session.add(self)
#         db.session.commit()


class User(db.Model):
    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(128), unique=True, nullable=False)
    preferred_distance = db.Column(db.Integer, default=100, nullable=False)
    bio = db.Column(db.String(500), default="", nullable=False)
    display_img = db.Column(db.String(500), default="", nullable=False)
    addressId = db.Column(db.Integer, db.ForeignKey("addresses.id"), nullable=True)

    def __init__(self, email, username):
        self.username = username
        self.email = email

    def to_json(self):
        # fetch address.place 
        address = Address.query.get(self.addressId)
        place = ""
        if address is not None:
            place = address.place

        return {
            "id": self.id,
            "email": self.email,
            "username": self.username,
            "preferred_distance": self.preferred_distance,
            "bio": self.bio,
            "display_img": self.display_img,
            "address": {
                "place": place
            }
        }

    def save(self):
        db.session.add(self)
        db.session.commit()

class Image(db.Model):
    __tablename__ = "images"

    id = db.Column(db.Integer, primary_key=True)
    url = db.Column(db.String(128), unique=True, nullable=False)
    listing_id = db.Column(db.Integer, db.ForeignKey('listings.id'), nullable=False)

    def __init__(self, url, listing_id):
        self.url = url
        self.listing_id = listing_id

    def save(self):
        db.session.add(self)
        db.session.commit()

class Category(db.Model):
    __tablename__ = "categories"

    id = db.Column(db.Integer, primary_key=True)
    type = db.Column(db.String(20), unique=True, nullable=False)

    def __init__(self, type):
        self.type = type

    def save(self):
        db.session.add(self)
        db.session.commit()

class CategoryToListing(db.Model):
    __tablename__ = "category_to_listing"
    
    id = db.Column(db.Integer, primary_key=True)
    category_id = db.Column(db.Integer, db.ForeignKey('categories.id'), nullable=False)
    listing_id = db.Column(db.Integer, db.ForeignKey('listings.id'), nullable=False)
    categoryRel = db.relationship('categories', foreign_keys='category_to_listing.material_id')
    listingRel = db.relationship('listings', foreign_keys='category_to_listing.listing_id')

    def __init__(self, category_id, listing_id):
        self.category_id = category_id
        self.listing_id = listing_id

    def save(self):
        db.session.add(self)
        db.session.commit()

class Material(db.Model):
    __tablename__ = "materials"

    id = db.Column(db.Integer, primary_key=True)
    type = db.Column(db.String(20), unique=True, nullable=False)

    def __init__(self, type):
        self.type = type

    def save(self):
        db.session.add(self)
        db.session.commit()

class MaterialToListing(db.Model):
    __tablename__ = "material_to_listing"
    
    id = db.Column(db.Integer, primary_key=True)
    material_id = db.Column(db.Integer, db.ForeignKey('materials.id'), nullable=False)
    listing_id = db.Column(db.Integer, db.ForeignKey('listings.id'), nullable=False)
    materialRel = db.relationship('materials', foreign_keys='material_to_listing.material_id')
    listingRel = db.relationship('listings', foreign_keys='material_to_listing.listing_id')

    def save(self):
        db.session.add(self)
        db.session.commit()

class Listing(db.Model):
    __tablename__ = "listings"

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(20), nullable=False)
    description = db.Column(db.String(512), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    is_sell_listing = db.Column(db.Boolean, nullable=False)
    
    price_min = db.Column(db.Float,nullable=True)
    price_max = db.Column(db.Float, nullable=True)
    can_trade = db.Column(db.Boolean, nullable=False)
    can_pay_cash = db.Column(db.Boolean, nullable=False)
    can_pay_bank = db.Column(db.Boolean, nullable=False)
    weight = db.Column(db.Float, nullable=True)
    volume = db.Column(db.Float, nullable=True)

    status = db.Column(db.Integer, nullable=False)
    addressId = db.Column(db.Integer, db.ForeignKey("addresses.id"), nullable=True)

    def __init__(self, 
        user_email, 
        title,
        description,
        is_sell_listing,
        price_min,
        price_max,
        can_trade,
        can_pay_cash,
        can_pay_bank,
        status,
        want_to_trade_for,
        weight, 
        volume, 
        materials,
        address,
        images
    ):
        self.title = title 
        self.description = description
        self.is_sell_listing = is_sell_listing
        self.price_min = price_min
        self.price_max = price_max
        self.can_trade = can_trade
        self.can_pay_cash = can_pay_cash
        self.can_pay_bank = can_pay_bank
        # TODO: remove hardcoding 
        self.status = 1
        self.weight = weight
        self.volume = volume

        # handle relational data
        self.user_id = User.query.filter_by(email=user_email).first().id
        self.addressId = determine_address_id(address)

        #TODO: insert data for categories + materials on startup
        for category in want_to_trade_for:
            category_id = Category.query.filter_by(type=category_id).first().type().id
            categoryToListing = CategoryToListing(id, category_id)
            categoryToListing.save()

        for material in materials:
            material_id = Material.query.filter_by(type=material).first().type().id
            materialToListing = MaterialToListing(id, category_id)
            materialToListing.save()

        for image in images:
                new_image = Image(image, id)

    def to_json(self):
        return {
            "id": self.id,
            "description": self.description,
            "is_sell_listing": self.is_sell_listing,
            "price_min": self.price_min,
            "price_max": self.price_max,
            "can_trade": self.can_trade,
            "can_pay_cash": self.can_pay_cash,
            "can_pay_bank": self.can_pay_bank
        }

    def save(self):
        db.session.add(self)
        db.session.commit()






