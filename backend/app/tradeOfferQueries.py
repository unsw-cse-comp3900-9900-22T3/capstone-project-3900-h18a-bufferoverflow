from operator import sub
from app import db
from app.models import TradeOffer

from ariadne import convert_kwargs_to_snake_case

@convert_kwargs_to_snake_case
def createTradeOffer_resolver(obj, info, **kwargs):
    try:
        tradeOffer = TradeOffer(**kwargs)
        tradeOffer.save()
        payload = {
            "success": True,
            "tradeOffer": tradeOffer.to_json()
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

            listing_one.delete()
            listing_two.delete()
            tradeOffer.delete()
        else:
            tradeOffer.delete()

        payload = {
            "success": True,
            "tradeOffer": tradeOffer.to_json() if tradeOffer else None
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
            "success": True,
            "tradeOffer": tradeOffer.to_json()
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
            listing_two = Listing.query.get(offer.listing_two_id)
            # get user id from email
            user_id = User.query.filter_by(email=user_email).first().id
            # see if user owns either listing
            if listing_one.user_id == user_id or listing_two.user_id == user_id:
                result.append(offer.to_json())

        payload = {
            "success": True,
            "tradeOffers": [result]
        }
    except Exception as e:
        payload = {
            "success": False,
            "errors": [str(e)]
        }
    return payload
