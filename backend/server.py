from app import app, db
from ariadne import load_schema_from_path, make_executable_schema, \
    graphql_sync, snake_case_fallback_resolvers, ObjectType
from ariadne.constants import PLAYGROUND_HTML
from flask import request, jsonify
from app.userQueries import *
from app.listingQueries import *
from app.tradeOfferQueries import *
from app.followQueries import *
from app.models import User


# Create queries
query = ObjectType("Query")
query.set_field("listUsers", listUsers_resolver)
query.set_field("getUser", getUser_resolver)
query.set_field("getListing", getListing_resolver)
query.set_field("getListingsByUser", getListingsByUser_resolver)
query.set_field("defaultFeed", defaultFeed_resolver)
query.set_field("userFeed", userFeed_resolver)
query.set_field("searchListings", searchListings_resolver)
query.set_field("getCategories", getCategories_resolver)
query.set_field("getMaterials", getMaterials_resolver)
query.set_field("getTradeOffersByUser", getTradeOffersByUser_resolver)
query.set_field("getFollowing", getFollowing_resolver)
query.set_field("getFollowingList", getFollowingList_resolver)
query.set_field("getListingsInTradeOffer", getListingsInTradeOffer_resolver)
query.set_field("getUsersInTradeOffer", getUsersInTradeOffer_resolver)

# Create mutations
mutation = ObjectType("Mutation")
mutation.set_field("createUser", create_user_resolver)
mutation.set_field("updateUser", update_user_resolver)
mutation.set_field("deleteUser", delete_user_resolver)
mutation.set_field("createListing", create_listing_resolver)
mutation.set_field("updateListing", update_listing_resolver)
mutation.set_field("deleteListing", delete_listing_resolver)
mutation.set_field("createTradeOffer", createTradeOffer_resolver)
mutation.set_field("updateTradeOffer", updateTradeOffer_resolver)
mutation.set_field("deleteTradeOffer", deleteTradeOffer_resolver)
mutation.set_field("followUser", followUser_resolver)
mutation.set_field("unfollowUser", unfollowUser_resolver)

# Create schema
type_defs = load_schema_from_path("schema.graphql")
schema = make_executable_schema(
    type_defs, query, mutation, snake_case_fallback_resolvers
)


# Create routes

@app.route("/test", methods=["GET"])
def test():
    return jsonify([user.to_json() for user in User.query.all()])

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

@app.route("/")
def hello():
    return "Hello World from Flask"

@app.route("/allUsers")
def getAllUsers():
    return jsonify([user.to_json() for user in User.query.all()])


@app.route("/addUser", methods=["POST"])
def addUser():
    email = request.json["userEmail"]
    username = request.json["username"]
    try:
        db.session.add(User(username, email, 100, "", None, 1))
        db.session.commit()
        return jsonify({"status" : "success"})
    except Exception as e:
        return jsonify({"status" : "failure", "error" : str(e)})

@app.route("/updateUserImage", methods=["POST"])
def updateUserImage():
    imageUrl = request.json["imageUrl"]
    userEmail = request.json["userEmail"]
    try:
        db.session.query(User).filter_by(email=userEmail).update({"displayImg" : imageUrl})
        db.session.commit()
        return {"status" : "success"}
    except Exception as e:
        return {"status" : "failure", "error" : str(e)}

@app.route("/query")
def query():
    result = db.session.execute('select * from users')
    emails = [row[1] for row in result]
    return jsonify({"emails": emails})

@app.route("/getToken", methods=["POST"])
def getToken():
    username = request.json["username"]
    return {"username": username}

@app.route("/showListings")
def show_listings():
    result = db.session.execute('select * from listings')
    listings = [
        {
            "id" : row[0],
            "title" : row[1],
            "description" : row[2],
        }
        for row in result
    ]
    return jsonify({"listings": listings})

@app.route("/getMaterials")
def get_materials():
    result = db.session.execute('select * from materials')
    materials = [row[1] for row in result]
    return jsonify({"materials": materials})