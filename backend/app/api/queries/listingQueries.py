from app.database.models import Listing, User, SearchedListing, ClickedListing, \
    TradedListing
from app.helpers import change_db_categories_to_list, generate_categories_dict, \
    fill_categories_dict, generate_categories_probability
from manage import category_names, material_names
from ariadne import convert_kwargs_to_snake_case
from random import random


@convert_kwargs_to_snake_case
def getListing_resolver(obj, info, id, user_email=None):
    try:
        listing = Listing.query.get(id)

        # if click on listing was done by user, save it in the db
        if user_email:
            # get user id
            user_id = User.query.filter_by(email=user_email).first().id
            # Need to change listing.categories to a list of strings
            # to work with the ClickedListing constructor
            categories_list = change_db_categories_to_list(listing)
            
            clicked_listing = ClickedListing(categories_list, user_id)
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
        listings = [listing.to_json() for listing in Listing.query.all() if listing.user_id == user_id]

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
        user =  User.query.filter_by(email=user_email).first()
        feed_listings = []

        # get all searches that have been done by this user 
        searches = SearchedListing.query.filter_by(user_id=user.id).all()
        trades = TradedListing.query.filter_by(traded_to=user.id).all()
        clicks = ClickedListing.query.filter_by(user_id=user.id).all()
        
        # initialise all "count" dictionaries
        search_categories = generate_categories_dict()
        traded_categories = generate_categories_dict() 
        clicked_categories = generate_categories_dict()

        # calculate how many of each category 
        fill_categories_dict(search_categories, searches)
        fill_categories_dict(traded_categories, trades)
        fill_categories_dict(clicked_categories, clicks)
            
        # use this as the *probability* that a listing appears early in 
        # the list 
        probability = 0

        for listing in Listing.query.all():
            probability = 0 
            search_probability = generate_categories_probability(listing, search_categories)
            trade_probability = generate_categories_probability(listing, traded_categories)
            click_probability = generate_categories_probability(listing, clicked_categories)

            # take a weighted average of the previous probabilities
            # we favour trades the most, then clicks, then searches
            probability += (0.5 * trade_probability) + (0.35 * click_probability) + (0.15 * search_probability)
            
            # if the user is following someone, that should bump the probability up
            if user.is_following(user_id=listing.user_id):
                probability += 0.2
                
            # generate a random number between 0-1 and check
            # if our probability is greater...if it is, goes to front of feed
            if probability > random():
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

        if categories:
            # if search was done by user, save it in the db
            if user_email:
                # get user id
                user_id = User.query.filter_by(email=user_email).first().id
                searched_listing = SearchedListing(categories, user_id)
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
        categories,
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
            categories,
            weight,
            volume,
            materials,
            address,
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


@convert_kwargs_to_snake_case
def update_listing_resolver(obj, info,
        id,
        title = None,
        description = None,
        is_sell_listing = None,
        price = None,
        can_trade = None,
        can_pay_cash = None,
        can_pay_bank = None,
        status = None,
        categories = None,
        want_to_trade_for = None,
        weight = None,
        volume = None,
        materials = None,
        address = None,
        image = None,
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


@convert_kwargs_to_snake_case
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


@convert_kwargs_to_snake_case
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
