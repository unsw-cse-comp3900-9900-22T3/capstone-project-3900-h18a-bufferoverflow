from app.database.models import User
from ariadne import convert_kwargs_to_snake_case
import app.helpers as helpers


@convert_kwargs_to_snake_case
def getUserStats_resolver(obj, info, user_email, year):
    '''
    Returns the user's stats for a given year
    '''
    try:
        user = User.query.filter_by(email=user_email).first()
        user_trade_count, cubicMetreSaving, CO2Saving = helpers.get_user_co2_emission_saving(user, year)
        payload = {
            'success' : True,
            'user_stats' : {
                'num_trades' : user_trade_count,
                'cubic_meter_saving' : cubicMetreSaving,
                'carbon_dioxide_saving' : CO2Saving
            }
        }
    except Exception as e:
        payload = {
            "success": False,
            "errors": [str(e)]
        }
    return payload


@convert_kwargs_to_snake_case
def getCommunityStats_resolver(obj, info, user_email, year):
    '''
    Returns the community stats for a given year
    '''
    try:
        user = User.query.filter_by(email=user_email).first()
        user_trade_count, cubicMetreSaving, CO2Saving = get_user_co2_emission_saving(user, year)
        payload = {
            'success' : True,
            'community_stats' : {
                'name' : 'The Best Coomunity',
                'num_trades' : user_trade_count,
                'cubic_meter_saving' : cubicMetreSaving,
                'carbon_dioxide_saving' : CO2Saving
            }
        }
    except Exception as e:
        payload = {
            "success": False,
            "errors": [str(e)]
        }
    return payload
