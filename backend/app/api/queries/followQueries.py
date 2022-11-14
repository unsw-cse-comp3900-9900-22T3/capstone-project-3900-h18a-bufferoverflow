from app.database.models import User
from ariadne import convert_kwargs_to_snake_case


@convert_kwargs_to_snake_case
def followUser_resolver(obj, info,
    follower_email,
    followed_email
):
    """ Follows a user """
    try:
        follower = User.query.filter_by(email=follower_email).first()
        followed = User.query.filter_by(email=followed_email).first()
        follower.add_following(followed)
        payload = {
                "success": True
            }
    except Exception as error:
        payload = {
            "success": False,
            "errors": [str(error)]
        }
    return payload


@convert_kwargs_to_snake_case
def unfollowUser_resolver(obj, info,
    follower_email,
    followed_email
):
    """ Unfollows a user """
    try:
        follower = User.query.filter_by(email=follower_email).first()
        followed = User.query.filter_by(email=followed_email).first()
        follower.remove_following(followed)
        payload = {
                "success": True
            }
    except Exception as error:
        payload = {
            "success": False,
            "errors": [str(error)]
        }
    return payload


@convert_kwargs_to_snake_case
def getFollowing_resolver(obj, info, user_email, check_follower_email):
    """ Check if user is following another user """
    try:
        user = User.query.filter_by(email=user_email).first()
        check_follower = User.query.filter_by(email=check_follower_email).first()
        if user.is_following(check_follower):
            payload = {
                "success": True
            }
        else:
            payload = {
                "success": False
            }
    except Exception as e:
        payload = {
            "success": False,
            "errors": [str(e)]
        }
    return payload


@convert_kwargs_to_snake_case
def getFollowingList_resolver(obj, info, user_email):
    """ Gets all users that a user is following """
    try:
        user = User.query.filter_by(email=user_email).first()
        followed_users = [followed.to_json() for followed in user.following]
        payload = {
            "success": True,
            "users": followed_users
        }
    except Exception as e:
        payload = {
            "success": False,
            "errors": [str(e)]
        }
    return payload
