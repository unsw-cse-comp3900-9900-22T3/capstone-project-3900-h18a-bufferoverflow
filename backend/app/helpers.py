from app.models import *
from manage import category_names

'''
Sources:    https://www.budgetdirect.com.au/car-insurance/research/average-fuel-consumption-australia.html
            https://www.budgetdirect.com.au/car-insurance/research/average-kilometers-driven.html
            https://www.commonobjective.co/article/fashion-and-waste-an-uneasy-relationship#:~:text=On%20average%2C%2035%25%20of%20all,or%20product%20reaches%20the%20consumer.
            https://www.patagoniaalliance.org/wp-content/uploads/2014/08/How-much-carbon-dioxide-is-produced-by-burning-gasoline-and-diesel-fuel-FAQ-U.S.-Energy-Information-Administration-EIA.pdf
            https://www.winnipeg.ca/finance/findata/matmgt/documents/2012/682-2012/682-2012_Appendix_H-WSTP_South_End_Plant_Process_Selection_Report/Appendix%207.pdf
'''


material_co2_emission_per_kg = {
    'wood': 0.11,
    'plastic' : 3.5,
    'metal' : 5.5,
    'wool' : 0.15,
    'cotton' : 0.15,
    'polyester' : 2.2,
    'ceramic' : 0.53
}

methane_emission_factor = 0.021 * 1000
nitrogen_oxide_emission_factor = 0.025 * 1000
co2_emission_per_delivery_kg = 0.019

def get_user_co2_emission_saving(user, year):
    '''
    Returns the total number of trades, cubic metre saving and CO2 emission saving for a user in a given year
    '''

    brick_and_mortar_delivery_co2_savings = 0.0
    landfill_co2_savings = 0.0
    manufacturing_co2_savings = 0.0
    cubic_metres_landfill_savings = 0.0

    user_traded_listings = TradedListing.query.filter_by(traded_by=user.id, year_traded=year).all()
    user_trade_count = len(user_traded_listings)

    # calculate brick and motar delivery savings
    brick_and_mortar_delivery_co2_savings = user_trade_count * co2_emission_per_delivery_kg

    # calculate landfill savings and calculate manufacturing saving
    for listing in user_traded_listings:
        weight = listing.weight
        cubic_metres_landfill_savings += listing.volume
        landfill_co2_savings += (weight * (methane_emission_factor + nitrogen_oxide_emission_factor))

        # get average material co2 emission per kg for each material
        average_material_co2_emission = 0.0
        for material in listing.materials:
            average_material_co2_emission += material_co2_emission_per_kg[material.name]
        average_material_co2_emission /= len(listing.materials)
        manufacturing_co2_savings += (1.35 * weight) * average_material_co2_emission

    total_co2_savings = brick_and_mortar_delivery_co2_savings + landfill_co2_savings + manufacturing_co2_savings
    return user_trade_count, cubic_metres_landfill_savings, total_co2_savings

def generate_categories_dict(): 
    '''
    Generates a dictionary with the keys being all item categories, with all 
    values initialised to 0
    '''
    # create empty categories dict (TODO: make util function?)
    categories = {} 
    categories["total"] = 0 
    for category_name in category_names:
        categories[category_name] = 0
    return categories