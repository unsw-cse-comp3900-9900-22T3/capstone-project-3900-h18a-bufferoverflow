from flask.cli import FlaskGroup

from app import app, db
from app.models import User, Category, Material, Listing
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
        want_to_trade_for=["toys", "books"],
        weight=.5,
        volume=2.0,
        materials=["ceramic"]
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
        want_to_trade_for=["clothes", "furniture"],
        weight=.75,
        volume=10.0,
        materials=["wood", "polyester"]
    )
    #save listings
    listing1.save()
    listing2.save()
    listing3.save()




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

