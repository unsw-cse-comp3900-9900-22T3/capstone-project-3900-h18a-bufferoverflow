from app import db
from app.models import User
from ariadne import convert_kwargs_to_snake_case

@convert_kwargs_to_snake_case
def followUser_resolver(obj, info,
    follower_email,
    followed_email
):
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


    