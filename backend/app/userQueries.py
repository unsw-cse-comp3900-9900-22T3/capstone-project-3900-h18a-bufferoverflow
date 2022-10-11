from app import db
from app.models import User, Address

from ariadne import convert_kwargs_to_snake_case


def listUsers_resolver(obj, info):
    print("test, test")
    try:
        users = [user.to_json() for user in User.query.all()]
        print(users)
        payload = {
            "success": True,
            "users": users
        }
    except Exception as error:
        payload = {
            "success": False,
            "errors": [str(error)]
        }
    return payload

def getUser_resolver(obj, info, email):
    try:
        # TODO: None checks (on ALL resolves...)
        user = User.query.filter_by(email=email).first()
        payload = {
            "success": True,
            "user": user.to_json()
        }
    except Exception as e:
        payload = {
            "success": False,
            "errors": [str(e)]
        }
    return payload

def create_user_resolver(obj, info, username, email):
    try:
        user = User(email, username)
        user.save()
        payload = {
            "success": True,
            "user": user.to_json()
        }
    except Exception as error:
        payload = {
            "success": False,
            "errors": [str(error)]
        }
    return payload

@convert_kwargs_to_snake_case
def update_user_resolver(
        obj, 
        info, 
        email,
        username,
        active,
        preferred_distance,
        bio,
        display_img,
        address
    ):
    try:
        try:
            user = User.query.filter_by(email=email).first()
        except:
            user = User.query.filter_by(username=username).first()
        if user:
            user.username = username
            user.email = email 
            user.active = active 
            user.preferred_distance = preferred_distance
            user.bio = bio 
            user.display_img = display_img
            user.address = build_address(address)
            user.save()

    except AttributeError:
        payload = {
            "success": False,
            "errors": ["User matching id {id} not found"]
        }
    return payload

def delete_user_resolver(obj, info, email):
    try:
        user = User.query.filter_by(email=email).first()
        user.delete()
        payload = {
            "success": True
        }
    except AttributeError:
        payload = {
            "success": False,
            "errors": ["User matching id {id} not found"]
        }
    return payload

# helper functions
def build_address(address_data):

    # extract city, state and country from address
    city_string = address_data["city"]
    state_string = address_data["state"]
    country_string = address_data["country"]

    city = City(city_string)
    state = State(state_string)
    country = Country(country_string)

    # save them to db
    city.save()
    state.save()
    country.save()

    # add new address
    address = Address(street = address["street"], city_id = city.id, state_id = state.id, country_id = country.id, post_code = address["post_code"])
    address.save()
    return address.id
