from app import db
from app.models import Listing
from app.helpers import determine_address_id

from ariadne import convert_kwargs_to_snake_case

@convert_kwargs_to_snake_case
def listListings_resolver(obj, info):
    try:
        listings = [listing.to_json() for listing in Listing.query.all()]
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

@convert_kwargs_to_snake_case
def createListing_resolver(obj, info, 
        user_email, 
        title,
        description,
        is_sell_listing,
        price_min,
        price_max,
        can_trade,
        can_pay_cash,
        can_pay_bank,
        status,
        want_to_trade_for,
        weight, 
        volume, 
        materials,
        address,
        images
    ):
    try:
        listing = Listing(
            user_email, 
            title,
            description,
            is_sell_listing,
            price_min,
            price_max,
            can_trade,
            can_pay_cash,
            can_pay_bank,
            status,
            want_to_trade_for,
            weight, 
            volume, 
            materials,
            address,
            images
        )
        listing.save()
        payload = {
            "success": True,
            "listing": listing
        }
    except Exception as error:
        payload = {
            "success": False,
            "errors": [str(error)]
        }
    return payload