from app import db
from app.models import User, Address

from ariadne import convert_kwargs_to_snake_case

def listUsers_resolver(obj, info):
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
        username=None,
        preferred_distance=None,
        bio=None,
        display_img=None,
        address=None
    ):
    try:
        user = None
        try:
            user = User.query.filter_by(email=email).first()
        except:
            user = User.query.filter_by(username=username).first()
        if user:
            user.email = email 
            user.username = username if username is not None else user.username
            user.preferred_distance = preferred_distance if preferred_distance is not None else user.preferred_distance
            user.bio = bio if bio is not None else user.bio
            user.display_img = display_img if display_img is not None else user.display_img

            user.addressId = determine_address_id(address)
            user.save()

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
def determine_address_id(address):
    if address is not None:
        address_info = Address.query.filter_by(place=address["place"]).first()
        # check if address already exists
        if address_info is not None:
            return address_info.id
        else:
            # add it to db 
            new_address = Address(address["place"])
            new_address.save()
            return new_address.id


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
