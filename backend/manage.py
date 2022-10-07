from flask.cli import FlaskGroup

from app import app, db
from app.models import User


cli = FlaskGroup(app)


@cli.command("create_db")
def create_db():
    db.drop_all()
    db.create_all()
    db.session.commit()


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
