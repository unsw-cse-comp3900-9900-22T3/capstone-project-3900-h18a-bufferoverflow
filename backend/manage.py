from flask.cli import FlaskGroup

from app.database import db
from app.database.models import *
from app.database import category_names, material_names
from app import app

cli = FlaskGroup(app)

# helper functions


def create_materials():
    """ Create materials

    Args:
        None

    Returns:
        None
    """
    for material in material_names:
        new_material = Material(material)
        new_material.save()


def create_categories():
    """ Create categories

    Args:
        None

    Returns:
        None
    """
    for category in category_names:
        new_category = Category(category)
        new_category.save()


def add_data():
    """ Add data to database

    Args:
        None

    Returns:
        None
    """
    # create materials and categories
    create_materials()
    create_categories()

    # create users
    add_users()

    # create listings
    add_listings()

    # create traded listings
    add_traded_listings_data()

    # create clicked and searched listings
    add_clicked_and_searched_listings_data()

    # create some trade offers, old and active conversations
    create_conversations()


def add_users():
    """ Add users data

    Args:
        None

    Returns:
        None
    """
    # create users
    user2 = User(email="user2@gmail.com", username="Steven123")
    user3 = User(email="user3@gmail.com", username="Frankie")
    user4 = User(email="user4@gmail.com", username="Sally")
    franksAccount = User(email="z5231701@ad.unsw.edu.au", username="Frank")
    cecesAccount = User(email="z3332330@ad.unsw.edu.au", username="Cece")
    seansAccount = User(email="z5310199@ad.unsw.edu.au", username="Sean")

    # add diplay images
    user2.add_display_img("https://mui.com/static/images/avatar/1.jpg")
    user3.add_display_img("https://mui.com/static/images/avatar/2.jpg")
    user4.add_display_img("https://mui.com/static/images/avatar/3.jpg")
    franksAccount.add_display_img("https://mui.com/static/images/avatar/4.jpg")
    cecesAccount.add_display_img("https://mui.com/static/images/avatar/5.jpg")

    user2.add_community("Randwick")
    cecesAccount.add_community("Randwick")
    seansAccount.add_community("Randwick")

    # save users
    user2.save()
    user3.save()
    user4.save()
    franksAccount.save()
    cecesAccount.save()
    seansAccount.save()


def add_listings():
    """Add listings to database

    Args:
        None

    Returns:
        None
    """
    listing1 = Listing(
        user_email="user2@gmail.com",
        title="Hunger Games Trilogy",
        description="The Hunger Games trilogy is a series of young adult dystopian novels written by American novelist Suzanne Collins.",
        is_sell_listing=True,
        price=100.0,
        can_trade=True,
        can_pay_cash=True,
        can_pay_bank=True,
        status="active",
        categories=["books"],
        want_to_trade_for=["furniture", "electronics"],
        weight=5.0,
        volume=1.0,
        address="Bathurst Library, Keppel Street, Bathurst, Bathurst Regional Council, New South Wales, 2795, Australia",
        latitude=-33.4225722,
        longitude=149.5795843,
        materials=["wood", "polyester"],
        image="https://images.unsplash.com/photo-1497633762265-9d179a990aa6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=873&q=80",
    )
    listing2 = Listing(
        user_email="user3@gmail.com",
        title="Batman Figurine",
        description="Batman is a fictional superhero appearing in American comic books published by DC Comics. The character was created by artist Bob Kane and writer Bill Finger, and first appeared in Detective Comics #27 (May 1939).",
        is_sell_listing=True,
        price=10.0,
        can_trade=False,
        can_pay_cash=False,
        can_pay_bank=True,
        status="active",
        weight=.5,
        volume=2.0,
        address="Bathurst Library, Keppel Street, Bathurst, Bathurst Regional Council, New South Wales, 2795, Australia",
        latitude=-33.4225722,
        longitude=149.5795843,
        categories=["toys", "electronics"],
        materials=["plastic"],
        image="https://images.unsplash.com/photo-1531259683007-016a7b628fc3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8YmF0bWFufGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=600&q=60",
    )
    listing3 = Listing(
        user_email="user4@gmail.com",
        title="iPhone 12",
        description="Hi there, i would love to buy your iPhone 12 Pro Max. I am willing to pay $1000 cash. Please contact me if you are interested.",
        is_sell_listing=False,
        price=1000,
        can_trade=False,
        can_pay_cash=True,
        can_pay_bank=True,
        status="active",
        categories=["electronics"],
        weight=.75,
        address="Bathurst Library, Keppel Street, Bathurst, Bathurst Regional Council, New South Wales, 2795, Australia",
        latitude=-33.4225722,
        longitude=149.5795843,
        volume=.2,
        materials=["plastic", "metal"],
        image="https://images.unsplash.com/photo-1495429391702-9cf0b245ba91?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1033&q=80",
    )

    listing4 = Listing(
        user_email="user4@gmail.com",
        title="Hydro Flask 32oz",
        description="The hydro flask is a great water bottle. It keeps your water cold for 24 hours and hot for 12 hours. It is made of stainless steel and is BPA free. It is a great water bottle for the gym or for work.",
        is_sell_listing=True,
        price=80,
        can_pay_bank=True,
        can_pay_cash=True,
        can_trade=True,
        status="active",
        categories=["kitchen and dining"],
        weight=1.0,
        volume=1.0,
        address="Bathurst Library, Keppel Street, Bathurst, Bathurst Regional Council, New South Wales, 2795, Australia",
        latitude=-33.4225722,
        longitude=149.5795843,
        materials=["metal"],
        image="https://images.unsplash.com/photo-1616740540792-3daec604777d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=464&q=80",
    )

    listing5 = Listing(
        user_email="user3@gmail.com",
        title="Ray Ban Sunglasses",
        description="The Ray Ban sunglasses are a great pair of sunglasses. They are polarized and have UV protection. They are a great pair of sunglasses for the beach or for everyday use.",
        is_sell_listing=True,
        price=200,
        can_pay_bank=True,
        can_pay_cash=True,
        can_trade=True,
        status="active",
        address="Bathurst Library, Keppel Street, Bathurst, Bathurst Regional Council, New South Wales, 2795, Australia",
        latitude=-33.4225722,
        longitude=149.5795843,
        categories=["clothes"],
        weight=.2,
        volume=.1,
        materials=["plastic", "metal"],
        image="https://images.unsplash.com/photo-1599838082511-c3bad8d4a80d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
    )

    listing6 = Listing(
        user_email="user3@gmail.com",
        title="Airpods Pro",
        description="The Airpods Pro are a great pair of earbuds. They are wireless and have noise cancellation. They are a great pair of earbuds for the gym or for everyday use.",
        is_sell_listing=True,
        price=300,
        can_pay_bank=True,
        can_pay_cash=True,
        can_trade=True,
        status="active",
        address="Bathurst Library, Keppel Street, Bathurst, Bathurst Regional Council, New South Wales, 2795, Australia",
        latitude=-33.4225722,
        longitude=149.5795843,
        categories=["electronics"],
        weight=.2,
        volume=.2,
        materials=["plastic", "metal"],
        image="https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=989&q=80",
    )

    # save listings
    listing1.save()
    listing2.save()
    listing3.save()
    listing4.save()
    listing5.save()
    listing6.save()


def create_conversations():
    """Create conversations

    Args:
        None

    Returns:
        None
    """

    message = Message(1664802000000, "Hi there, I would like to trade with you",
                      3, "z5231701@ad.unsw.edu.au-user3@gmail.com")
    message.save()
    conversation = Conversation(
        "z5231701@ad.unsw.edu.au-user3@gmail.com", None, None)
    conversation.latest = message.id
    conversation.last_read_first = message.id
    conversation.save()

    inactiveConversation = Conversation(
        "z5231701@ad.unsw.edu.au-user2@gmail.com", None, None)
    inactiveConversation.save()

    messageTest = Message(1664820000000, "Hey Cece this is frank hows it going",
                          1, "z5231701@ad.unsw.edu.au-z3332330@ad.unsw.edu.au")
    messageTest.save()
    conversationWithFrankAndCece = Conversation(
        "z5231701@ad.unsw.edu.au-z3332330@ad.unsw.edu.au", None, None)
    conversationWithFrankAndCece.latest = messageTest.id
    conversationWithFrankAndCece.last_read_first = messageTest.id
    conversationWithFrankAndCece.save()


def add_traded_listings_data():
    """Add traded listings data

    Args:
        None

    Returns:
        None
    """
    # trades which have happend in 2022
    traded_listing1 = TradedListing(
        listing_id=-1,
        traded_by=1,
        traded_to=2,
        weight=10,
        volume=200,
        materials=['wood', 'metal'],
        categories=['toys'],
        year_traded=2022
    )
    traded_listing2 = TradedListing(
        listing_id=-2,
        traded_by=1,
        traded_to=2,
        weight=10,
        volume=200,
        materials=['wood', 'metal'],
        categories=['toys'],
        year_traded=2022
    )
    traded_listing3 = TradedListing(
        listing_id=-3,
        traded_by=1,
        traded_to=2,
        weight=5,
        volume=200,
        materials=['metal', 'ceramic'],
        categories=['toys'],
        year_traded=2022
    )
    traded_listing1.save()
    traded_listing2.save()
    traded_listing3.save()

    # trades which have happend in 2021
    traded_listing4 = TradedListing(
        listing_id=-4,
        traded_by=1,
        traded_to=2,
        weight=10,
        volume=5,
        materials=['wool', 'cotton'],
        categories=['beauty'],
        year_traded=2021
    )
    traded_listing5 = TradedListing(
        listing_id=-5,
        traded_by=1,
        traded_to=2,
        weight=10,
        volume=200,
        materials=['polyester', 'plastic'],
        categories=['electronics'],
        year_traded=2021
    )
    traded_listing6 = TradedListing(
        listing_id=-6,
        traded_by=1,
        traded_to=2,
        weight=5,
        volume=200,
        materials=['wood'],
        categories=['books'],
        year_traded=2021
    )
    traded_listing4.save()
    traded_listing5.save()
    traded_listing6.save()


def add_clicked_and_searched_listings_data():
    """Add clicked and searched listings data

    Args:
        None

    Returns:
        None
    """
    # clicked listings
    clicked_listing1 = ClickedListing(
        user_id=1,
        categories=['toys', 'electronics'],
    )
    clicked_listing2 = ClickedListing(
        user_id=1,
        categories=['sports', 'books'],
    )
    clicked_listing3 = ClickedListing(
        user_id=1,
        categories=['automotive', 'electronics'],
    )
    clicked_listing1.save()
    clicked_listing2.save()
    clicked_listing3.save()

    searched_listing1 = SearchedListing(
        user_id=1,
        categories=['beauty', 'furniture'],
    )
    searched_listing2 = SearchedListing(
        user_id=1,
        categories=['kitchen and dining', 'electronics'],
    )
    searched_listing3 = SearchedListing(
        user_id=1,
        categories=['tools', 'electronics'],
    )

    searched_listing1.save()
    searched_listing2.save()
    searched_listing3.save()


@cli.command("create_db")
def create_db():
    """ Create database

    Args:
        None

    Returns:
        None
    """
    # if no data in db, create default data
    try:
        Material.query.all()  # Raises an exception if no data in db
    except:
        db.create_all()
        db.session.commit()
        add_data()


if __name__ == "__main__":
    cli()
