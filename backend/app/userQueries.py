from .models import User

from app import db
from app.models import User

from ariadne import convert_kwargs_to_snake_case


def listUsers_resolver(obj, info):
    print("test, test")
    try:
        users = [user.to_dict() for user in User.query.all()]
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

def getUser_resolver(obj, info, id):
    try:
        user = User.query.get(id)
        payload = {
            "success": True,
            "user": user.to_dict()
        }
    except AttributeError:  # todo not found
        payload = {
            "success": False,
            "errors": ["User matching {id} not found"]
        }
    return payload

def create_user_resolver(obj, info, email):
    try:
        user = User(email)
        db.session.add(user)
        db.session.commit()
        payload = {
            "success": True,
            "user": user.to_dict()
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
        id,
        email,
        active,
        preferred_distance,
        bio,
        display_img
    ):
    try:
        user = User.query.get(id)
        if user:
            user.email = email 
            user.active = active 
            user.preferred_distance = preferred_distance
            user.bio = bio 
            user.display_img = display_img
        db.session.add(user)
        db.session.commit()
        payload = {
            "success": True,
            "user": user.to_dict()
        }
    except AttributeError:
        payload = {
            "success": False,
            "errors": ["User matching id {id} not found"]
        }
    return payload