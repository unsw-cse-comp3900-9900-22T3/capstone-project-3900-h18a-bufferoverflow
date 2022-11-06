from operator import sub
from app import db
from app.models import User
from ariadne import convert_kwargs_to_snake_case
from app.helpers import get_user_co2_emission_saving

@convert_kwargs_to_snake_case
def getUserStats_resolver(obj, info, user_email, year):
    try:
        user = User.query.filter_by(email=user_email).first()
        cubicMetreSaving, CO2Saving = get_user_co2_emission_saving(user, year)
        payload = {
            'success' : True,
            'userStats' : {
                'numTrades' : user.trade_count(year),
                'cubicMetreSaving' : cubicMetreSaving,
                'CO2Saving' : CO2Saving
            }
        }
    except Exception as e:
        payload = {
            "success": False,
            "errors": [str(e)]
        }
    return payload
