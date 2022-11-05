from flask.cli import FlaskGroup

from app import app, db
from app.models import User, Category, Material, Listing, Conversation, Message
from app.config import material_names, category_names


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
    # create users
    user1 = User(email="user1@gmail.com", username="user1")
    user2 = User(email="user2@gmail.com", username="user2")
    user3 = User(email="user3@gmail.com", username="user3")

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
        title = "listing1",
        description="listing1 description",
        is_sell_listing=True,
        price=100.0,
        can_trade=True,
        can_pay_cash=True,
        can_pay_bank=True,
        status="active",
        categories=["toys"],
        want_to_trade_for=["furniture", "electronics"],
        weight=1.0,
        volume=1.0,
        materials=["wood", "metal"],
        image = "https://images.unsplash.com/photo-1666475877254-235b2f5fd4b7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80",
        address = "9 Beagle St, Sydney, NSW 2039"
    )
    listing2 = Listing(
        user_email="user2@gmail.com",
        title = "listing2",
        description="listing2 description",
        is_sell_listing=False,
        price=199.0,
        can_trade=False,
        can_pay_cash=False,
        can_pay_bank=True,
        status="active",
        categories=["books", "furniture"],
        weight=.5,
        volume=2.0,
        materials=["ceramic"],
        image = "https://images.unsplash.com/photo-1666475877254-235b2f5fd4b7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80",
        address = "27 Main St, Australia, WA 6057"
    )
    listing3 = Listing(
        user_email="user3@gmail.com",
        title = "listing3",
        description="listing3 description",
        is_sell_listing=False,
        price=20.0,
        can_trade=True,
        can_pay_cash=True,
        can_pay_bank=True,
        status="active",
        categories=["clothes", "toys"],
        weight=.75,
        volume=10.0,
        materials=["wood", "polyester"],
        image = "https://images.unsplash.com/photo-1666475877254-235b2f5fd4b7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80",
        address = "19 Penshurt St, Willoughby, NSW 2068"
    )

    listing4 = Listing(
        user_email="user3@gmail.com",
        title="listing4",
        description="listing4 description",
        is_sell_listing=True,
        price=8.88,
        can_pay_bank=True,
        can_pay_cash=True,
        can_trade=True,
        status="active",
        categories=["electronics", "automotive"],
        weight=1.0,
        volume=1.0,
        materials=["plastic"],
        image = "https://images.unsplash.com/photo-1666475877254-235b2f5fd4b7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80",
        address = "19 Coora St, Sale, NSW 1111"
    )

    listing5 = Listing(
        user_email="user2@gmail.com",
        title="listing5",
        description="listing5 description",
        is_sell_listing=True,
        price=3.33,
        can_pay_bank=True,
        can_pay_cash=True,
        can_trade=True,
        status="active",
        categories=["kitchen and dining", "automotive"],
        weight=1.0,
        volume=1.0,
        materials=["cotton"],
        image = "https://images.unsplash.com/photo-1666475877254-235b2f5fd4b7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80",
        address = "39 Kuul St, Chatswood, NSW 1234"
    )

    listing6 = Listing(
        user_email="user2@gmail.com",
        title="listing6",
        description="listing6 description",
        is_sell_listing=True,
        price=3.33,
        can_pay_bank=True,
        can_pay_cash=True,
        can_trade=True,
        status="active",
        categories=["kitchen and dining", "beauty"],
        weight=1.0,
        volume=1.0,
        materials=["cotton", "metal"],
        image = "https://images.unsplash.com/photo-1666475877254-235b2f5fd4b7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80",
        address = "17 BigBoy Ave, Heaven, NSW 7777"
    )


    # save listings
    listing1.save()
    listing2.save()
    listing3.save()
    listing4.save()
    listing5.save()
    listing6.save()

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

