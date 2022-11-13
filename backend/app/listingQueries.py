from operator import sub
from app import db
from app.models import Listing, User, SearchedListing, ClickedListing
from manage import category_names, material_names
import haversine

from ariadne import convert_kwargs_to_snake_case


@convert_kwargs_to_snake_case
def getListing_resolver(obj, info, id, user_email=None):
    try:
        listing = Listing.query.get(id)

        # if click on listing was done by user, save it in the db
        if user_email:
            # get user id
            user_id = User.query.filter_by(email=user_email).first().id
            clicked_listing = ClickedListing(listing.categories, user_id)
            clicked_listing.save()

        payload = {
            "success": True,
            "listing": listing.to_json()
        }
    except Exception as e:
        payload = {
            "success": False,
            "errors": [str(e)]
        }
    return payload


@convert_kwargs_to_snake_case
def getListingsByUser_resolver(obj, info, user_email):
    try:
        user_id = User.query.filter_by(email=user_email).first().id
        listings = [listing.to_json() for listing in Listing.query.all()
                    if listing.user_id == user_id]

        payload = {
            "success": True,
            "listings": listings
        }
    except Exception as e:
        payload = {
            "success": False,
            "errors": [str(e)]
        }
    return payload


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
        user = User.query.filter_by(email=user_email).first()
        feed_listings = []
        for listing in Listing.query.all():
            if user.is_following(user_id=listing.user_id):
                feed_listings.insert(0, listing.to_json())
            else:
                feed_listings.append(listing.to_json())

        payload = {
            "success": True,
            "listings": feed_listings
        }
    except Exception as error:
        payload = {
            "success": False,
            "errors": [str(error)]
        }
    return payload


@convert_kwargs_to_snake_case
def searchListings_resolver(obi, info,
                            categories=None,
                            distance=None,
                            is_sell_listing=None,
                            price_min=None,
                            price_max=None,
                            user_email=None
                            ):
    try:
        result = [listing.to_json() for listing in Listing.query.all()]
        if price_min:
            result = filter(lambda x: x["price"] >= price_min, result)
        if price_max:
            result = filter(lambda x: x["price"] <= price_max, result)

        if is_sell_listing == True:
            result = filter(lambda x: x["is_sell_listing"], result)
        elif is_sell_listing == False:
            result = filter(lambda x: not x["is_sell_listing"], result)

        if user_email:
            user = User.query.filter_by(email=user_email).first()

        if categories:
            # if search was done by user, save it in the db
            if user_email:
                searched_listing = SearchedListing(categories, user.id)
                searched_listing.save()

            new_result = []
            for listing in result:
                found_category_match = False
                for listing_categories in listing["categories"]:
                    # if we have something of one of the categories we are
                    # searching for, then we can break,
                    # as it fits the criteria
                    if listing_categories["type"] in categories:
                        found_category_match = True
                        break
                # if we found a match, add it to our new result
                if found_category_match:
                    new_result.append(listing)
            # finished looping. set result = new_result
            result = new_result

        if distance and user_email:
            results = filter(lambda listing: haversine([user.lattitude, user.longitude], [
                             listing.lattude, listing.longitude]) < distance, results)

        payload = {
            "success": True,
            "listings": result
        }

    except Exception as error:
        payload = {
            "success": False,
            "errors": [str(error)]
        }
    return payload


@ convert_kwargs_to_snake_case
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
                            categories,
                            want_to_trade_for,
                            weight,
                            volume,
                            materials,
                            address,
                            lattitude,
                            longitude,
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
            categories,
            weight,
            volume,
            materials,
            address,
            lattitude,
            longitude,
            image,
            want_to_trade_for=want_to_trade_for
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


@ convert_kwargs_to_snake_case
def update_listing_resolver(obj, info,
                            id,
                            title=None,
                            description=None,
                            is_sell_listing=None,
                            price=None,
                            can_trade=None,
                            can_pay_cash=None,
                            can_pay_bank=None,
                            status=None,
                            categories=None,
                            want_to_trade_for=None,
                            weight=None,
                            volume=None,
                            materials=None,
                            address=None,
                            image=None,
                            lattitude=None,
                            longitude=None
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
        listing.update_categories(categories)
        listing.update_want_to_trade_for(want_to_trade_for)
        listing.weight = weight if weight is not None else listing.weight
        listing.volume = volume if volume is not None else listing.volume
        listing.update_materials(materials)
        listing.address = address if address is not None else listing.address
        listing.image = image if image is not None else listing.image
        listing.lattitude = lattitude if lattitude is not None else listing.lattitude
        listing.longitude = longitude if longitude is not None else listing.longitude
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


@ convert_kwargs_to_snake_case
def delete_listing_resolver(obj, info, id):
    try:
        listing = Listing.query.get(id)
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


@ convert_kwargs_to_snake_case
def getCategories_resolver(obj, info):
    try:
        payload = {
            "success": True,
            "categories": category_names
        }
    except Exception as error:
        payload = {
            "success": False,
            "errors": [str(error)]
        }
    return payload


@ convert_kwargs_to_snake_case
def getMaterials_resolver(obj, info):
    try:
        payload = {
            "success": True,
            "materials": material_names
        }
    except Exception as error:
        payload = {
            "success": False,
            "errors": [str(error)]
        }
    return payload
