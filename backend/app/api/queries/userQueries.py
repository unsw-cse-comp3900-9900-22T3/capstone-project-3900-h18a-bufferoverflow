from app.database.models import User
from ariadne import convert_kwargs_to_snake_case


def listUsers_resolver(obj, info):
    """ Gets all users

    Args:
        obj: The parent object, which in this case is the root value
        info (ResolveInfo): Information about the execution state of the query
    Returns:
        dict: The response payload
    """
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
    """ Gets a user by email

    Args:
        obj: The parent object, which in this case is the root value
        info (ResolveInfo): Information about the execution state of the query
        email: The email of the user
    Returns:
        dict: The response payload
    """
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
    """ Creates a user

    Args:
        obj: The parent object, which in this case is the root value
        info (ResolveInfo): Information about the execution state of the query
        username: The username of the user
        email: The email of the user
    Returns:
        dict: The response payload
    """
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
    """ Updates a user

    Args:
        obj: The parent object, which in this case is the root value
        info (ResolveInfo): Information about the execution state of the query
        email: The email of the user
        username: The username of the user
        preferred_distance: The preferred distance of the user
        bio: The bio of the user
        display_img: The display image of the user
        address: The address of the user
        community: The community of the user
        latitude: The latitude of the user
        longitude: The longitude of the user
    Returns:
        dict: The response payload
    """
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
    """ Deletes a user

    Args:
        obj: The parent object, which in this case is the root value
        info (ResolveInfo): Information about the execution state of the query
        email: The email of the user
    Returns:
        dict: The response payload
    """
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
