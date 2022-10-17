from app import db
from app.models import User, Address

from ariadne import convert_kwargs_to_snake_case

@convert_kwargs_to_snake_case
def listListings_resolver(obj, info):
    try:
        listings = []
        payload = {
            "success": True,
            "listings": listings
        }
    except Exception as error:
        payload = {
            "success": False,
            "errors": [str(error)]
        }
    return payload