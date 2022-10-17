from flask.cli import FlaskGroup

from app import app, db
from app.models import User, Category, Material


cli = FlaskGroup(app)

# helper functions  

# TODO: stick all this info in a config file...
# TODO: add more materials/categories
def create_materials():
    wood = Material("wood")
    wood.save()

    metal = Material("metal")
    metal.save()

def create_categories():
    toys = Category("toys")
    toys.save()

    sports = Category("sports")
    sports.save()

@cli.command("create_db")
def create_db():
    db.drop_all()
    db.create_all()
    db.session.commit()
    create_materials()
    create_categories()


@cli.command("seed_db")
def seed_db():
    db.session.add(User(email="lukebanicevic@gmail.com"))
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

