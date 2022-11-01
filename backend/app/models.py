from app import db
from app.config import material_names, category_names

user_following = db.Table('user_following',
                          db.Column('follower_id', db.Integer, db.ForeignKey(
                              'users.id'), primary_key=True),
                          db.Column('followed_id', db.Integer, db.ForeignKey(
                              'users.id'), primary_key=True)
                          )


class User(db.Model):
    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(128), unique=True, nullable=False)
    preferred_distance = db.Column(db.Integer, default=100, nullable=False)
    bio = db.Column(db.String(500), default="", nullable=False)
    display_img = db.Column(db.String(500), default="", nullable=False)
    address = db.Column(db.String(100), default="", nullable=False)

    # TODO: add foreign keys arg?
    following = db.relationship(
        'User',
        secondary=user_following,
        primaryjoin=(user_following.c.follower_id == id),
        secondaryjoin=(user_following.c.followed_id == id),
        backref='followed_by'
    )

    def __init__(self, email, username):
        self.username = username
        self.email = email

    def add_display_img(self, display_img):
        self.display_img = display_img

    def add_following(self, followed):
        if not self.is_following(followed):
            self.following.append(followed)
            self.save()

    def remove_following(self, user):
        if self.is_following(user):
            self.following.remove(user)
            self.save()

    def is_following(self, user):
        followed_users = [followed.to_json() for followed in self.following]
        for u in followed_users:
            if u["id"] == user.id:
                return True
        return False

    def to_json(self):
        return {
            "id": self.id,
            "email": self.email,
            "username": self.username,
            "preferred_distance": self.preferred_distance,
            "bio": self.bio,
            "display_img": self.display_img,
            "address": self.address
        }

    def save(self):
        db.session.add(self)
        db.session.commit()

    def delete(self):
        db.session.delete(self)
        db.session.commit()


listing_material = db.Table('listing_material',
                            db.Column('listing_id', db.Integer, db.ForeignKey(
                                'listings.id'), primary_key=True),
                            db.Column('material_id', db.Integer, db.ForeignKey(
                                'materials.id'), primary_key=True)
                            )

listing_category = db.Table('listing_category',
                            db.Column('listing_id', db.Integer, db.ForeignKey(
                                'listings.id'), primary_key=True),
                            db.Column('category_id', db.Integer, db.ForeignKey(
                                'categories.id'), primary_key=True)
                            )

listing_want_to_trade_for = db.Table('listing_want_to_trade_for',
                                     db.Column('listing_id', db.Integer, db.ForeignKey(
                                         'listings.id'), primary_key=True),
                                     db.Column('category_id', db.Integer, db.ForeignKey(
                                         'categories.id'), primary_key=True)
                                     )


class Category(db.Model):
    __tablename__ = "categories"

    id = db.Column(db.Integer, primary_key=True)
    type = db.Column(db.String(20), unique=True, nullable=False)

    category_to = db.relationship(
        'Listing', secondary=listing_category, backref='categories')
    want_to_trade_for_to = db.relationship(
        'Listing', secondary=listing_want_to_trade_for, backref='want_to_trade_for')

    def __init__(self, type):
        self.type = type

    def to_json(self):
        return {
            "type": self.type
        }

    def save(self):
        db.session.add(self)
        db.session.commit()


class Material(db.Model):
    __tablename__ = "materials"

    id = db.Column(db.Integer, primary_key=True)
    type = db.Column(db.String(20), unique=True, nullable=False)

    material_to = db.relationship(
        'Listing', secondary=listing_material, backref='materials')

    def __init__(self, type):
        self.type = type

    def to_json(self):
        return {
            "type": self.type
        }

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

    price = db.Column(db.Float, nullable=True)
    can_trade = db.Column(db.Boolean, nullable=False)
    can_pay_cash = db.Column(db.Boolean, nullable=False)
    can_pay_bank = db.Column(db.Boolean, nullable=False)
    weight = db.Column(db.Float, nullable=True)
    volume = db.Column(db.Float, nullable=True)

    status = db.Column(db.String(16), nullable=False)
    address = db.Column(db.String(100), nullable=False)
    image = db.Column(db.String(500), default="", nullable=False)

    def __init__(self,
                 user_email,
                 title,
                 description,
                 is_sell_listing,
                 price,
                 can_trade,
                 can_pay_cash,
                 can_pay_bank,
                 status,
                 categories,
                 weight,
                 volume,
                 materials,
                 address=None,
                 image="",
                 want_to_trade_for=[],
                 ):
        self.title = title
        self.description = description
        self.is_sell_listing = is_sell_listing
        self.price = price
        self.can_trade = can_trade
        self.can_pay_cash = can_pay_cash
        self.can_pay_bank = can_pay_bank
        self.status = status
        self.weight = weight
        self.volume = volume
        self.address = address
        self.image = image

        # handle relational data
        self.user_id = User.query.filter_by(email=user_email).first().id

        if address is None:
            self.address = User.query.filter_by(
                email=user_email).first().address

        self.update_categories(categories)
        if self.is_sell_listing:
            self.update_want_to_trade_for(want_to_trade_for)
        self.update_materials(materials)

    def update_categories(self, categories):
        if categories is not None:
            # to successfully remove all previous want_to_trade_for
            for category_name in category_names:
                category = Category.query.filter_by(type=category_name).first()
                try:
                    category.category_to.remove(self)
                except:
                    pass

            for category_name in categories:
                category = Category.query.filter_by(type=category_name).first()
                category.category_to.append(self)
                category.save()

    def update_want_to_trade_for(self, want_to_trade_for):
        if want_to_trade_for is not None:
            # to successfully remove all previous want_to_trade_for
            for category_name in category_names:
                category = Category.query.filter_by(type=category_name).first()
                try:
                    category.want_to_trade_for_to.remove(self)
                except:
                    pass

            for category_name in want_to_trade_for:
                category = Category.query.filter_by(type=category_name).first()
                category.want_to_trade_for_to.append(self)
                category.save()

    def update_materials(self, materials):
        if materials is not None:
            # to successfully remove all previous materials
            for material_name in material_names:
                material = Material.query.filter_by(type=material_name).first()
                try:
                    material.material_to.remove(self)
                except:
                    pass

            for material_name in materials:
                material = Material.query.filter_by(type=material_name).first()
                material.material_to.append(self)
                material.save()

    def to_json(self):
        return {
            "id": self.id,
            "title": self.title,
            "user": User.query.get(self.user_id).to_json(),
            "description": self.description,
            "is_sell_listing": self.is_sell_listing,
            "categories": [category.to_json() for category in self.categories],
            "want_to_trade_for": [category.to_json() for category in self.want_to_trade_for],
            "price": self.price,
            "can_trade": self.can_trade,
            "can_pay_cash": self.can_pay_cash,
            "can_pay_bank": self.can_pay_bank,
            "weight": self.weight,
            "volume": self.volume,
            "status": self.status,
            "address": self.address,
            "image": self.image,
            "materials": [mat.to_json() for mat in self.materials]
        }

    def save(self):
        db.session.add(self)
        db.session.commit()


class Message(db.Model):
    __tablename__ = "messages"

    id = db.Column(db.Integer, primary_key=True)
    timestamp = db.Column(db.BigInteger, nullable=False)
    text = db.Column(db.String, nullable=False)
    author = db.Column(
        db.Integer, db.ForeignKey("users.id"), nullable=False
    )
    # since conversation is a two emails joined by a '-',
    # it should be able to hold 80 + 80 + 1 chars
    conversation = db.Column(db.String(161), nullable=False)

    def __init__(self, timestamp, text, author, conversation):
        self.timestamp = timestamp
        self.text = text
        self.author = author
        self.conversation = conversation

    def to_json(self):
        return {
            "id": self.id,
            "timestamp": self.timestamp,
            "text": self.text,
            "author": User.query.get(self.author).to_json(),
            "conversation": self.conversation
        }

    def save(self):
        db.session.add(self)
        db.session.commit()

    def delete(self):
        db.session.delete(self)
        db.session.commit()


class Conversation(db.Model):
    __tablename__ = "conversations"

    id = db.Column(db.Integer, primary_key=True)
    conversation = db.Column(db.String(1000), nullable=False)
    last_read_first = db.Column(
        db.Integer, db.ForeignKey("messages.id"), nullable=True)
    last_read_second = db.Column(
        db.Integer, db.ForeignKey("messages.id"), nullable=True)
    latest = db.Column(
        db.Integer, db.ForeignKey("messages.id"), nullable=True)

    def __init__(self, conversation, last_read_first=None, last_read_second=None):
        self.conversation = conversation
        self.last_read_first = last_read_first
        self.last_read_second = last_read_second
        self.latest = None

    def to_json(self):
        return {
            "id": self.id,
            "conversation": self.conversation,
            "last_read_first": Message.query.get(self.last_read_first).to_json() if self.last_read_first else None,
            "last_read_second": Message.query.get(self.last_read_second).to_json() if self.last_read_second else None,
            "latest": Message.query.get(self.latest).to_json() if self.latest else None,
        }

    def save(self):
        db.session.add(self)
        db.session.commit()

    def delete(self):
        db.session.delete(self)
        db.session.commit()


class TradeOffer(db.Model):
    __tablename__ = "trade_offers"

    id = db.Column(db.Integer, primary_key=True)
    listing_one_id = db.Column(
        db.Integer, db.ForeignKey("listings.id"), nullable=False)
    listing_two_id = db.Column(
        db.Integer, db.ForeignKey("listings.id"), nullable=False)

    def __init__(self, listing_one_id, listing_two_id, is_accepted=False):
        self.listing_one_id = listing_one_id
        self.listing_two_id = listing_two_id

    def to_json(self):
        return {
            "id" : self.id,
            "listing_one" : Listing.query.get(self.listing_one_id).to_json(),
            "listing_two" : Listing.query.get(self.listing_two_id).to_json()
        }
        
    def save(self):
        db.session.add(self)
        db.session.commit()

    def delete(self):
        db.session.delete(self)
        db.session.commit()
