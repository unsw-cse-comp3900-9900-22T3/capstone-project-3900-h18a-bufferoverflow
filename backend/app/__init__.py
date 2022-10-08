
from flask import Flask
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
CORS(app)

app.config.from_object("app.config.Config")
db = SQLAlchemy(app)



@app.route("/")
def hello():
    return "Hello World from Flask"

# @app.route("/allUsers")
# def getAllUsers():
#     return json.dumps([user.email for user in User.query.all()])

# @app.route("/addUser/<email>")
# def addUser(email):
#     try:
#         db.session.add(User(email))
#         db.session.commit()
#         return "User added"
#     except:
#         return "Error adding user, check logs"

# @app.route("/query/")
# def query():
#     result = db.session.execute('select * from users')
#     emails = [row[1] for row in result]
#     print(1)
#     return {"emails": emails}