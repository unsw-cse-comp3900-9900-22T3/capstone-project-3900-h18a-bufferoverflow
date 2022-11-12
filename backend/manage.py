from flask.cli import FlaskGroup

from app.database import db
from app.database.models import *
from app.database import category_names, material_names
from app import app


cli = FlaskGroup(app)

# helper functions
def create_materials():

    for material in material_names:
        new_material = Material(material)
        new_material.save()


def create_categories():
    for category in category_names:
        new_category = Category(category)
        new_category.save()


@cli.command("create_db")
def create_db():
    # drop all tables in db in dependency order if they exist
    tables_in_dependency_order = reversed(db.metadata.sorted_tables)
    for table in tables_in_dependency_order:
        # if table in database, delete
        if table.exists(db.engine):
            table.drop(db.engine)

    # create all tables in db
    db.session.commit()
    db.create_all()
    db.session.commit()
    create_materials()
    create_categories()


@cli.command("add_data")
def add_data():
    
    # add data is there is only one user
    if User.query.count() == 0:
        # create users
        user1 = User(email="user1@gmail.com", username="Steven123")
        user2 = User(email="user2@gmail.com", username="Frankie")
        user3 = User(email="user3@gmail.com", username="Sally")

        # add diplay images
        user1.add_display_img("https://mui.com/static/images/avatar/1.jpg")
        user2.add_display_img("https://mui.com/static/images/avatar/2.jpg")
        user3.add_display_img("https://mui.com/static/images/avatar/3.jpg")

        # save users
        user1.save()
        user2.save()
        user3.save()

        # create listings
        listing1 = Listing(
            user_email="user1@gmail.com",
            title = "Hunger Games Trilogy",
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
            materials=["wood", "polyester"],
            image = "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=873&q=80",
            address = "9 Beagle St, Sydney, NSW 2039"
        )
        listing2 = Listing(
            user_email="user2@gmail.com",
            title = "Batman Figurine",
            description="Batman is a fictional superhero appearing in American comic books published by DC Comics. The character was created by artist Bob Kane and writer Bill Finger, and first appeared in Detective Comics #27 (May 1939).",
            is_sell_listing=True,
            price=10.0,
            can_trade=False,
            can_pay_cash=False,
            can_pay_bank=True,
            status="active",
            categories=["toys", "electronics"],
            weight=1,
            volume=0.5,
            materials=["plastic"],
            image = "https://images.unsplash.com/photo-1531259683007-016a7b628fc3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8YmF0bWFufGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=600&q=60",
            address = "27 Main St, Australia, WA 6057"
        )
        listing3 = Listing(
            user_email="user3@gmail.com",
            title = "iPhone 12",
            description="Hi there, i would love to buy your iPhone 12 Pro Max. I am willing to pay $1000 cash. Please contact me if you are interested.",
            is_sell_listing=False,
            price=1000,
            can_trade=False,
            can_pay_cash=True,
            can_pay_bank=True,
            status="active",
            categories=["electronics"],
            weight=.75,
            volume=.2,
            materials=["plastic", "metal"],
            image = "https://images.unsplash.com/photo-1495429391702-9cf0b245ba91?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1033&q=80",
            address = "19 Penshurt St, Willoughby, NSW 2068"
        )

        listing4 = Listing(
            user_email="user3@gmail.com",
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
            materials=["metal"],
            image = "https://images.unsplash.com/photo-1616740540792-3daec604777d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=464&q=80",
            address = "19 Coora St, Sale, NSW 1111"
        )

        listing5 = Listing(
            user_email="user2@gmail.com",
            title="Ray Ban Sunglasses",
            description="The Ray Ban sunglasses are a great pair of sunglasses. They are polarized and have UV protection. They are a great pair of sunglasses for the beach or for everyday use.",
            is_sell_listing=True,
            price=200,
            can_pay_bank=True,
            can_pay_cash=True,
            can_trade=True,
            status="active",
            categories=["clothes"],
            weight=.2,
            volume=.1,
            materials=["plastic", "metal"],
            image = "https://images.unsplash.com/photo-1599838082511-c3bad8d4a80d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
            address = "39 Kuul St, Chatswood, NSW 1234"
        )

        listing6 = Listing(
            user_email="user2@gmail.com",
            title="Airpods Pro",
            description="The Airpods Pro are a great pair of earbuds. They are wireless and have noise cancellation. They are a great pair of earbuds for the gym or for everyday use.",
            is_sell_listing=True,
            price=300,
            can_pay_bank=True,
            can_pay_cash=True,
            can_trade=True,
            status="active",
            categories=["electronics"],
            weight=.2,
            volume=.2,
            materials=["plastic", "metal"],
            image = "https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=989&q=80",
            address = "17 BigBoy Ave, Heaven, NSW 7777"
        )

        # save listings
        listing1.save()
        listing2.save()
        listing3.save()
        listing4.save()
        listing5.save()
        listing6.save()

        # create traded listings
        traded_listing1 = TradedListing(
            traded_by=1,
            traded_to=2,
            weight=10,
            volume=200,
            materials=['wood', 'metal'],
            categories=['toys'],
            year_traded=2022
        )

        traded_listing1.save()


@cli.command("seed_db")
def seed_db():
    db.session.add(User(email="lukebanicevic@gmail.com", username="luke"))
    db.session.commit()


@cli.command("query_db")
def query_db():
    print(User.query.all())
    print(User.query.all()[0].id)
    print(User.query.all()[0].email)


@cli.command("show_db")
def show_db():
    print(db)


if __name__ == "__main__":
    cli()
