from app.database.models import User
from ariadne import convert_kwargs_to_snake_case


def listUsers_resolver(obj, info):
    try:
        users = [user.to_json() for user in User.query.all()]
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
    address=None,
    community=None,
    latitude=None,
    longitude=None,
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

            user.address = address if address is not None else user.address
            user.community = community if community is not None else user.community
            user.latitude = latitude if latitude is not None else user.latitude
            user.longitude = longitude if longitude is not None else user.longitude
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
