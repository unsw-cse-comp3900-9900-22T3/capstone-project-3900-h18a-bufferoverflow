from app.database.models import TradeOffer, Listing, User, TradedListing
from app.helpers import change_db_categories_to_list, change_db_materials_to_list
from ariadne import convert_kwargs_to_snake_case
from datetime import datetime


@convert_kwargs_to_snake_case
def createTradeOffer_resolver(obj, info, **kwargs):
    """ Creates a trade offer

    Args:
        obj: The parent object, which in this case is the root value
        info (ResolveInfo): Information about the execution state of the query
        kwargs: The arguments passed in the query
    Returns:
        dict: The response payload
    """
    try:
        tradeOffer = TradeOffer(**kwargs)
        tradeOffer.save()
        payload = {
            "success": True,
            "trade_offer": tradeOffer.to_json()
        }
    except Exception as e:
        payload = {
            "success": False,
            "errors": [str(e)]
        }
    return payload


@convert_kwargs_to_snake_case
def updateTradeOffer_resolver(obj, info, id, is_accepted):
    """ Updates a trade offer

    Args:
        obj: The parent object, which in this case is the root value
        info (ResolveInfo): Information about the execution state of the query
        id: The id of the trade offer
        is_accepted: The new value of is_accepted
    Returns:
        dict: The response payload
    """
    try:
        tradeOffer = TradeOffer.query.get(id)
        if is_accepted:
            listing_one = Listing.query.get(tradeOffer.listing_one_id)
            listing_two = Listing.query.get(tradeOffer.listing_two_id)

            # find trade offers with the same listings as this one and delete them
            tradeOffers = TradeOffer.query.all()
            for offer in tradeOffers:
                if offer.listing_two_id == listing_one.id or \
                offer.listing_one_id == listing_two.id or \
                offer.listing_one_id == listing_one.id or \
                offer.listing_two_id == listing_two.id:
                    offer.delete()
            tradeOffer.delete()

            traded_listing_one_categories = change_db_categories_to_list(listing_one)
            traded_listing_one_materials = change_db_materials_to_list(listing_one)
            # add listings to traded listings table
            traded_listing_one = TradedListing(
                listing_id=listing_one.id,
                traded_by=listing_one.user_id,
                traded_to=listing_two.user_id,
                weight=listing_one.weight,
                volume=listing_one.volume,
                materials=traded_listing_one_materials,
                categories=traded_listing_one_categories,
                year_traded = datetime.now().year,
            )

            traded_listing_two_categories = change_db_categories_to_list(listing_two)
            traded_listing_two_materials = change_db_materials_to_list(listing_two)
            traded_listing_two = TradedListing(
                listing_id=listing_two.id,
                traded_by=listing_two.user_id,
                traded_to=listing_one.user_id,
                weight = listing_two.weight,
                volume=listing_two.volume,
                materials=traded_listing_two_materials,
                categories=traded_listing_two_categories,
                year_traded = datetime.now().year,
            )

            print('hihhihi')
            print(listing_one)
            print(listing_two)
            print(listing_one.id)
            print(listing_two.id)
            listing_one.delete()
            listing_two.delete()

            traded_listing_one.save()
            traded_listing_two.save()

        else:
            tradeOffer.delete()

        payload = {
            "success": True
        }
    except Exception as e:
        payload = {
            "success": False,
            "errors": [str(e)]
        }
    return payload


@convert_kwargs_to_snake_case
def deleteTradeOffer_resolver(obj, info, id):
    """ Deletes a trade offer

    Args:
        obj: The parent object, which in this case is the root value
        info (ResolveInfo): Information about the execution state of the query
        id: The id of the trade offer
    Returns:
        dict: The response payload
    """
    try:
        tradeOffer = TradeOffer.query.get(id)
        tradeOffer.delete()
        payload = {
            "success": True
        }
    except Exception as e:
        payload = {
            "success": False,
            "errors": [str(e)]
        }
    return payload


@convert_kwargs_to_snake_case
def getTradeOffersByUser_resolver(obj, info, user_email):
    """ Gets all trade offers for a user

    Args:
        obj: The parent object, which in this case is the root value
        info (ResolveInfo): Information about the execution state of the query
        user_email: The email of the user
    Returns:
        dict: The response payload
    """
    try:
        result = []

        # get all trade offers in db as a list
        tradeOffers = TradeOffer.query.all()

        for offer in tradeOffers:
            # get listings by id
            listing_one = Listing.query.get(offer.listing_one_id)
            # get user id from email
            user_id = User.query.filter_by(email=user_email).first().id

            # see if user owns first listing
            if listing_one.user_id == user_id:
                result.append(offer.to_json())

        payload = {
            "success": True,
            "trade_offers": result
        }
    except Exception as e:
        payload = {
            "success": False,
            "errors": [str(e)]
        }
    return payload


@convert_kwargs_to_snake_case
def getListingsInTradeOffer_resolver(obj, info, trade_offer_id):
    """ Gets all listings in a trade offer

    Args:
        obj: The parent object, which in this case is the root value
        info (ResolveInfo): Information about the execution state of the query
        trade_offer_id: The id of the trade offer
    Returns:
        dict: The response payload
    """
    try:
        tradeOffer = TradeOffer.query.get(trade_offer_id)
        listing_one = Listing.query.get(tradeOffer.listing_one_id)
        listing_two = Listing.query.get(tradeOffer.listing_two_id)

        payload = {
            "success": True,
            "listings": [listing_one.to_json(), listing_two.to_json()]
        }
    except Exception as e:
        payload = {
            "success": False,
            "errors": [str(e)]
        }
    return payload


@convert_kwargs_to_snake_case
def getUsersInTradeOffer_resolver(obj, info, trade_offer_id):
    """ Gets all users in a trade offer

    Args:
        obj: The parent object, which in this case is the root value
        info (ResolveInfo): Information about the execution state of the query
        trade_offer_id: The id of the trade offer
    Returns:
        dict: The response payload
    """
    try:
        tradeOffer = TradeOffer.query.get(trade_offer_id)
        listing_one = Listing.query.get(tradeOffer.listing_one_id)
        listing_two = Listing.query.get(tradeOffer.listing_two_id)

        user_one = User.query.get(listing_one.user_id)
        user_two = User.query.get(listing_two.user_id)

        payload = {
            "success": True,
            "users": [user_one.to_json(), user_two.to_json()]
        }
    except Exception as e:
        payload = {
            "success": False,
            "errors": [str(e)]
        }
    return payload
