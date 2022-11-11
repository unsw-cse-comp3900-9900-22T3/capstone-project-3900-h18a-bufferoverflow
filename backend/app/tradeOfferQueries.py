from operator import sub
from app import db
from app.models import TradeOffer, Listing, User, TradedListing
from ariadne import convert_kwargs_to_snake_case

from datetime import datetime

@convert_kwargs_to_snake_case
def createTradeOffer_resolver(obj, info, **kwargs):
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
    try:
        tradeOffer = TradeOffer.query.get(id)
        if is_accepted:
            listing_one = Listing.query.get(tradeOffer.listing_one_id)
            listing_two = Listing.query.get(tradeOffer.listing_two_id)

            # find complementary trade offers and delete them
            tradeOffers = TradeOffer.query.all()
            for offer in tradeOffers:
                if offer.listing_two_id == listing_one.id and offer.listing_one_id == listing_two.id:
                    offer.delete()
                    break
            tradeOffer.delete()

            # add listings to traded listings table
            traded_listing_one = TradedListing(
                listing_id=listing_one.id,
                traded_by=listing_one.user_id,
                traded_to=listing_two.user_id,
                weight=listing_one.weight,
                volume=listing_one.volume,
                materials=listing_one.materials,
                categories=listing_one.categories,
                year_traded = datetime.now().year,
            )

            traded_listing_two = TradedListing(
                listing_id=listing_two.id,
                traded_by=listing_two.user_id,
                traded_to=listing_one.user_id,
                weight = listing_two.weight,
                volume=listing_two.volume,
                materials=listing_two.materials,
                categories=listing_two.categories,
                year_traded = datetime.now().year,
            )

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
