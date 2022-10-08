from .models import User

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