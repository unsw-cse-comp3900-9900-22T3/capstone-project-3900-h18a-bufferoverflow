from app.database import db, material_names, category_names


class BaseDataModel():
    """ Base data model for all objects """

    def save(self):
        """ Save the current instance to the database """
        db.session.add(self)
        db.session.commit()

    def delete(self):
        """ Delete the current instance from the database """
        db.session.delete(self)
        db.session.commit()


user_following = db.Table('user_following',
                          db.Column('follower_id', db.Integer, db.ForeignKey(
                              'users.id'), primary_key=True),
                          db.Column('followed_id', db.Integer, db.ForeignKey(
                              'users.id'), primary_key=True)
                          )


class User(BaseDataModel, db.Model):
    """ User Model for storing user related details

    Attributes:
        id (int): User id
        username (str): User name
        email (str): User email
        preffered_distance (int): User preferred distance
        bio (str): User bio
        display_img (str): User display image
        address (str): User address
    """

    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(128), unique=True, nullable=False)
    preferred_distance = db.Column(db.Integer, default=100, nullable=False)
    bio = db.Column(db.String(500), default="", nullable=False)
    display_img = db.Column(db.String(500), default="", nullable=False)
    address = db.Column(db.String(500), default="", nullable=True)
    community = db.Column(db.String(100), default="", nullable=True)

    following = db.relationship(
        'User',
        secondary=user_following,
        primaryjoin=(user_following.c.follower_id == id),
        secondaryjoin=(user_following.c.followed_id == id),
        backref='followed_by'
    )

    def __init__(self, email, username):
        """ Initialize user with email and username """
        self.username = username
        self.email = email

    def add_display_img(self, display_img):
        """ Add display image to user

        Args:
            display_img (str): Display image url
        """
        self.display_img = display_img

    def add_community(self, community):
        """ Add community to user

        Args:
            community (str): User community
        """
        self.community = community

    def add_following(self, followed):
        """ Add followed user to following list

        Args:
            followed (User): User to follow
        """
        if not self.is_following(followed):
            self.following.append(followed)
            self.save()

    def remove_following(self, user):
        """ Remove followed user from following list

        Args:
            user (User): User to unfollow
        """
        if self.is_following(user):
            self.following.remove(user)
            self.save()

    def is_following(self, user=None, user_id=None):
        """ Check if user is following another user

        Args:
            user (User): User to check if following
            user_id (int): User id to check if following

        Returns:
            bool: True if following, False if not
        """
        # error handling
        if user is None and user_id is None:
            return False

        followed_users = [followed.to_json() for followed in self.following]
        # if we were provided an id, use that, otherwise use the user object
        id_to_check = user_id if user_id is not None else user.id
        for u in followed_users:
            if u["id"] == id_to_check:
                return True
        return False

    def to_json(self):
        """ Return user as json

        Returns:
            dict: User as json
        """
        return {
            "id": self.id,
            "email": self.email,
            "username": self.username,
            "preferred_distance": self.preferred_distance,
            "bio": self.bio,
            "display_img": self.display_img,
            "address": self.address,
            "community": self.community
        }


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

search_category = db.Table('search_category',
                            db.Column('search_id', db.Integer, db.ForeignKey(
                                'searched_listings.id'), primary_key=True),
                            db.Column('category_id', db.Integer, db.ForeignKey(
                                'categories.id'), primary_key=True)
                          )

traded_category = db.Table('traded_category',
                            db.Column('traded_id', db.Integer, db.ForeignKey(
                                'traded_listings.id'), primary_key=True),
                            db.Column('category_id', db.Integer, db.ForeignKey(
                                'categories.id'), primary_key=True)
                          )

traded_material = db.Table('traded_material',
                            db.Column('traded_id', db.Integer, db.ForeignKey(
                                'traded_listings.id'), primary_key=True),
                            db.Column('material_id', db.Integer, db.ForeignKey(
                                'materials.id'), primary_key=True)
                          )

clicked_category = db.Table('clicked_category',
                            db.Column('traded_id', db.Integer, db.ForeignKey(
                                'clicked_listings.id'), primary_key=True),
                            db.Column('category_id', db.Integer, db.ForeignKey(
                                'categories.id'), primary_key=True)
                           )

class Category(BaseDataModel, db.Model):
    """ Category Model for storing category related details

    Attributes:
        id (int): Category id
        type (str): Category type
    """

    __tablename__ = "categories"

    id = db.Column(db.Integer, primary_key=True)
    type = db.Column(db.String(20), unique=True, nullable=False)

    category_to = db.relationship(
        'Listing', secondary=listing_category, backref='categories')
    want_to_trade_for_to = db.relationship(
        'Listing', secondary=listing_want_to_trade_for, backref='want_to_trade_for')

    search_category_to = db.relationship(
        'SearchedListing', secondary=search_category, backref='categories')
    traded_category_to = db.relationship(
        'TradedListing', secondary=traded_category, backref='categories')
    clicked_category_to = db.relationship(
        'ClickedListing', secondary=clicked_category, backref='categories')

    def __init__(self, type):
        """ Initialize category with type """
        self.type = type

    def to_json(self):
        """ Return category as json

        Returns:
            dict: Category as json
        """
        return {
            "type": self.type
        }


class Material(BaseDataModel, db.Model):
    """ Material Model for storing material related details

    Attributes:
        id (int): Material id
        type (str): Material type
    """

    __tablename__ = "materials"

    id = db.Column(db.Integer, primary_key=True)
    type = db.Column(db.String(20), unique=True, nullable=False)

    material_to = db.relationship(
        'Listing', secondary=listing_material, backref='materials')

    traded_material_to = db.relationship(
        'TradedListing', secondary=traded_material, backref='materials')

    def __init__(self, type):
        """ Initialize material with type """
        self.type = type

    def to_json(self):
        """ Return material as json

        Returns:
            dict: Material as json
        """
        return {
            "type": self.type
        }


class Listing(BaseDataModel, db.Model):
    """ Listing Model for storing listing related details

    Attributes:
        id (int): Listing id
        title (str): Listing title
        description (str): Listing description
        user_id (int): Listing user id
        is_sell_listing (bool): Listing type
        price (float): Listing price
        can_trade (bool): Listing can trade
        can_pay_cash (bool): Listing can pay cash
        can_pay_bank (bool): Listing can pay bank transfer
        weight (float): Listing weight
        volume (float): Listing volume
        status (str): Listing status
        address (str): Listing address
        images (str): Listing image
    """

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
    address = db.Column(db.String(500), nullable=False)
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
        """ Initialize listing with title, description, user_id, is_sell_listing, price, can_trade, can_pay_cash, can_pay_bank, status, address, image """
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
        """ Update listing categories

        Args:
            categories (list): List of categories
        """
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
        """ Update listing want_to_trade_for

        Args:
            want_to_trade_for (list): List of want_to_trade_for
        """
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
        """ Update listing materials

        Args:
            materials (list): List of materials
        """
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
        """ Return listing as json

        Returns:
            dict: Listing as json
        """
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


class Message(BaseDataModel, db.Model):
    """ Message Model for storing message related details

    Attributes:
        id (int): Message id
        timestamp (datetime): Message timestamp
        text (str): Message text
        author (int): Message author id
        conversation (str): Message conversation string
    """

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
        """ Initialize message with timestamp, text, author, conversation """
        self.timestamp = timestamp
        self.text = text
        self.author = author
        self.conversation = conversation

    def to_json(self):
        """ Return message as json

        Returns:
            dict: Message as json
        """
        return {
            "id": self.id,
            "timestamp": self.timestamp,
            "text": self.text,
            "author": User.query.get(self.author).to_json(),
            "conversation": self.conversation
        }


class Conversation(BaseDataModel, db.Model):
    """ Conversation Model for storing conversation related details

    Attributes:
        id (int): Conversation id
        conversation (str): Conversation string
        last_read_first (int): First last read message id
        last_read_second (int): Second last read message id
        latest_message (int): Latest message id
    """

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
        """ Initialize conversation with conversation, last_read_first, last_read_second """
        self.conversation = conversation
        self.last_read_first = last_read_first
        self.last_read_second = last_read_second
        self.latest = None

    def to_json(self):
        """ Return conversation as json

        Returns:
            dict: Conversation as json
        """
        return {
            "id": self.id,
            "conversation": self.conversation,
            "last_read_first": Message.query.get(self.last_read_first).to_json() if self.last_read_first else None,
            "last_read_second": Message.query.get(self.last_read_second).to_json() if self.last_read_second else None,
            "latest": Message.query.get(self.latest).to_json() if self.latest else None,
        }


class TradeOffer(BaseDataModel, db.Model):
    """ TradeOffer Model for storing trade offer related details

    Attributes:
        id (int): TradeOffer id
        listing_one_id (int): Listing one id
        listing_two_id (int): Listing two id
    """

    __tablename__ = "trade_offers"

    id = db.Column(db.Integer, primary_key=True)
    listing_one_id = db.Column(
        db.Integer, db.ForeignKey("listings.id"), nullable=False)
    listing_two_id = db.Column(
        db.Integer, db.ForeignKey("listings.id"), nullable=False)

    def __init__(self, listing_one_id, listing_two_id, is_accepted=False):
        """ Initialize trade offer with listing_one_id, listing_two_id """
        self.listing_one_id = listing_one_id
        self.listing_two_id = listing_two_id

    def to_json(self):
        """ Return trade offer as json

        Returns:
            dict: Trade offer as json
        """
        return {
            "id" : self.id,
            "listing_one" : Listing.query.get(self.listing_one_id).to_json(),
            "listing_two" : Listing.query.get(self.listing_two_id).to_json()
        }


class TradedListing(BaseDataModel, db.Model):
    """ TradedListing Model for storing traded listing related details

    Attributes:
        id (int): TradedListing id
        traded_by (int): TradedListing traded by id
        traded_to (int): TradedListing traded to id
        weight (int): TradedListing weight
        volume (int): TradedListing volume
        year_traded (int): TradedListing year traded
        materials (list): TradedListing materials
        categories (list): TradedListing categories
    """

    __tablename__ = "traded_listings"

    id = db.Column(db.Integer, primary_key=True)
    traded_by = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    traded_to = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    weight = db.Column(db.Float, nullable=False)
    volume = db.Column(db.Float, nullable=False)
    year_traded = db.Column(db.Integer, nullable=False)

    def update_categories(self, categories):
        if categories is not None:
            # to successfully remove all previous want_to_trade_for
            for category_name in category_names:
                category = Category.query.filter_by(type=category_name).first()
                try:
                    category.traded_category_to.remove(self)
                except:
                    pass

            for category_name in categories:
                category = Category.query.filter_by(type=category_name).first()
                category.traded_category_to.append(self)
                category.save()

    def update_materials(self, materials):
        if materials is not None:
            # to successfully remove all previous want_to_trade_for
            for material_name in material_names:
                material = Material.query.filter_by(type=material_name).first()
                try:
                    material.traded_material_to.remove(self)
                except:
                    pass

            for material_name in materials:
                material = Material.query.filter_by(type=material_name).first()
                material.traded_material_to.append(self)
                material.save()

    def __init__(self, traded_by, traded_to, weight, volume, materials, categories, year_traded):
        """ Initialize traded listing with traded_by, traded_to, weight, volume, materials, categories, year_traded """
        self.traded_by = traded_by
        self.traded_to = traded_to
        self.weight = weight
        self.volume = volume
        self.year_traded = year_traded
        self.update_materials(materials)
        self.update_categories(categories)


class SearchedListing(BaseDataModel, db.Model):
    """ SearchedListing Model for storing searched listing related details

    Attributes:
        id (int): SearchedListing id
        user_id (int): SearchedListing user id
        categories (list): SearchedListing categories
    """
    __tablename__ = "searched_listings"

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)

    def update_categories(self, categories):
        if categories is not None:
            # to successfully remove all previous want_to_trade_for
            for category_name in category_names:
                category = Category.query.filter_by(type=category_name).first()
                try:
                    category.search_category_to.remove(self)
                except:
                    pass

            for category_name in categories:
                category = Category.query.filter_by(type=category_name).first()
                category.search_category_to.append(self)
                category.save()

    def __init__(self, categories, user_id):
        """ Initialize searched listing with categories, user_id """
        self.user_id = user_id
        self.update_categories(categories)


class ClickedListing(BaseDataModel, db.Model):
    """ ClickedListing Model for storing clicked listing related details

    Attributes:
        id (int): ClickedListing id
        user_id (int): ClickedListing user id
        categories (list): ClickedListing categories
    """

    __tablename__ = "clicked_listings"

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)

    def update_categories(self, categories):
        if categories is not None:
            # to successfully remove all previous want_to_trade_for
            for category_name in category_names:
                category = Category.query.filter_by(type=category_name).first()
                try:
                    category.clicked_category_to.remove(self)
                except:
                    pass

            for category_name in categories:
                category = Category.query.filter_by(type=category_name).first()
                category.clicked_category_to.append(self)
                category.save()

    def __init__(self, categories, user_id):
        """ Initialize clicked listing with categories, user_id """
        self.user_id = user_id
        self.update_categories(categories)
