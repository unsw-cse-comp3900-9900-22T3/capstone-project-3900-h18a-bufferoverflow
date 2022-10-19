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
def create_listing_resolver(obj, info,
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

@convert_kwargs_to_snake_case
def update_listing_resolver(obj, info, 
        id,
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
        listing = Listing.query.get(id)
        listing.title = title if title is not None else listing.title
        listing.description = description if description is not None else listing.description
        listing.is_sell_listing = is_sell_listing if is_sell_listing is not None else listing.is_sell_listing
        listing.price_min = price_min if price_min is not None else listing.price_min
        listing.price_max = price_max if price_max is not None else listing.price_max
        listing.can_trade = can_trade if can_trade is not None else listing.can_trade
        listing.can_pay_cash = can_pay_cash if can_pay_cash is not None else listing.can_pay_cash
        listing.can_pay_bank = can_pay_bank if can_pay_bank is not None else listing.can_pay_bank
        listing.status = 1
        listing.update_want_to_trade_for(want_to_trade_for)
        listing.weight = weight if weight is not None else listing.weight
        listing.volume = volume if volume is not None else listing.volume
        listing.update_materials(materials)
        listing.address = determine_address_id(address) if address is not None else listing.address
        listing.images = images if images is not None else listing.images
        listing.save()
        payload = {
            "success": True,
            "listing": listing.to_json()
        }
    except Exception as error:
        payload = {
            "success": False,
            "errors": [str(error)]
        }
    return payload

@convert_kwargs_to_snake_case
def delete_listing_resolver(obj, info, user_email):
    try:
        listing = Listing.query.filter_by(user_email=user_email).first()
        listing.delete()
        payload = {
            "success": True,
            "listing": listing.to_json()
        }
    except Exception as error:
        payload = {
            "success": False,
            "errors": [str(error)]
        }
    return payload
