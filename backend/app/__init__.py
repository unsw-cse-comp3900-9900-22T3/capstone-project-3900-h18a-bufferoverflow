from flask import Flask, request, jsonify
from flask_cors import CORS
import json

from ariadne import load_schema_from_path, make_executable_schema, \
graphql_sync, snake_case_fallback_resolvers, ObjectType
from ariadne.constants import PLAYGROUND_HTML

# from app.queries import listUsers_resolver

app = Flask(__name__)
CORS(app)


from flask_sqlalchemy import SQLAlchemy
app.config.from_object("app.config.Config")
db = SQLAlchemy(app)



@app.route("/")
def hello():
    return "Hello World from Flask"


# TODO: this can't be executed due to some circular import issues
# FIX: have an app.py outside of this module that can import everything directly?
# query = ObjectType("Query")
# query.set_field("listUsers", listUsers_resolver)

type_defs = load_schema_from_path("schema.graphql")
schema = make_executable_schema(
    type_defs, snake_case_fallback_resolvers
)

@app.route("/graphql", methods=["GET"])
def graphql_playground():
    return PLAYGROUND_HTML, 200

@app.route("/graphql", methods=["POST"])
def graphql_server():
    data = request.get_json()
    success, result = graphql_sync(
        schema,
        data,
        context_value=request,
        debug=app.debug
    )
    status_code = 200 if success else 400
    return jsonify(result), status_code

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