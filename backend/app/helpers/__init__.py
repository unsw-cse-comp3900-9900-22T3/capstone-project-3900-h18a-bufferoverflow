from app.database.models import *

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
    categories = {} 
    # it is important to track the total number of times each category appears
    categories["total"] = 0 
    for category_name in category_names:
        categories[category_name] = 0

    return categories

def fill_categories_dict(categories_count, query_results):
    '''
    Fills a pre-initialised dictionary with a count of how many times each 
    category appears in a given query
    '''
    for result in query_results:
        for category in result.categories:
            categories_count[category.type] += 1 
            categories_count["total"] += 1

def generate_categories_probability(listing, categories_count): 
    '''
    Generates the probability that a given category would be accessed 
    (could be searched, clicked, etc.) based on previous data...
    '''
    probability = 0

    # check for div by zero 
    if categories_count["total"] == 0:
        return probability

    for category in listing.categories:
        probability += (categories_count[category.type] / categories_count["total"])

    return probability

def change_db_categories_to_list(listing):
    '''
    Takes in a listing, and returns it's categories as a list of strings
    '''
    categories_list = []
    for category in listing.categories:
        categories_list.append(category.type)
    return categories_list

