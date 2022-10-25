from app import db
from app.models import Listing

from ariadne import convert_kwargs_to_snake_case

@convert_kwargs_to_snake_case
def defaultFeed_resolver(obj, info):
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
def userFeed_resolver(obj, info, user_email):
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
def searchListings_resolver(obi, info,
    category=None,
    distance=None,
    type=None,
    price_min=None,
    price_max=None
):
    subquery = Listing.query.all()
    print(subquery)
    if price_min and price_max:
        subquery = Listing.query.filter(db.and_(Listing.price >= price_min, Listing.price <= price_max))
    elif price_min:
        subquery = Listing.query.filter(Listing.price >= price_min)
    elif price_max: 
        subquery = Listing.query.filter(Listing.price <= price_max)

    print(subquery)
   

@convert_kwargs_to_snake_case
def create_listing_resolver(obj, info,
        user_email,
        title,
        description,
        is_sell_listing,
        price,
        can_trade,
        can_pay_cash,
        can_pay_bank,
        status,
        want_to_trade_for,
        weight,
        volume,
        materials,
        address,
        image
    ):
    try:
        listing = Listing(
            user_email,
            title,
            description,
            is_sell_listing,
            price,
            can_trade,
            can_pay_cash,
            can_pay_bank,
            status,
            want_to_trade_for,
            weight,
            volume,
            materials,
            address,
            image
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
        price,
        can_trade,
        can_pay_cash,
        can_pay_bank,
        status,
        want_to_trade_for,
        weight,
        volume,
        materials,
        address,
        image
    ):
    try:
        listing = Listing.query.get(id)
        listing.title = title if title is not None else listing.title
        listing.description = description if description is not None else listing.description
        listing.is_sell_listing = is_sell_listing if is_sell_listing is not None else listing.is_sell_listing
        listing.price = price if price is not None else listing.price
        listing.can_trade = can_trade if can_trade is not None else listing.can_trade
        listing.can_pay_cash = can_pay_cash if can_pay_cash is not None else listing.can_pay_cash
        listing.can_pay_bank = can_pay_bank if can_pay_bank is not None else listing.can_pay_bank
        listing.status = status if status is not None else listing.status
        listing.update_want_to_trade_for(want_to_trade_for)
        listing.weight = weight if weight is not None else listing.weight
        listing.volume = volume if volume is not None else listing.volume
        listing.update_materials(materials)
        listing.address = address if address is not None else listing.address
        listing.image = image if image is not None else listing.image
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
