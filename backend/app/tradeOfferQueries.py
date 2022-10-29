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
def updateTradeOffer_resolver(obj, info, id, **kwargs):
    try:
        tradeOffer = TradeOffer.query.get(id)
        for key, value in kwargs.items():
            setattr(tradeOffer, key, value)
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
