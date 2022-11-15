from app.database.models import *
from random import random, randint

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
    """ Returns the user's stats for a given year

    Args:
        user: The user object
        year: The year to get stats for

    Returns:
        tuple: The user's stats for a given year
    """

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
            average_material_co2_emission += material_co2_emission_per_kg[material.type]
        average_material_co2_emission /= len(listing.materials)
        manufacturing_co2_savings += (1.35 * weight) * average_material_co2_emission

    total_co2_savings = brick_and_mortar_delivery_co2_savings + landfill_co2_savings + manufacturing_co2_savings
    return user_trade_count, round(cubic_metres_landfill_savings), round(total_co2_savings)

def get_community_co2_emission_saving(user, year):
    """ Gets the community co2 emission saving for a given user and year

    Args:
        user: The user object
        year: The year to get stats for

    Returns:
        tuple: The community co2 emission saving for a given user and year
    """
    total_co2_savings = 0.0
    total_cube_metres_savings = 0.0
    total_trades = 0
    for u in User.query.all():
        if u.community == user.community or user.community == "Global":
            user_trade_count, cubicMetreSaving, CO2Saving = get_user_co2_emission_saving(u, year)
            total_co2_savings += CO2Saving
            total_cube_metres_savings += cubicMetreSaving
            total_trades += user_trade_count
    return total_trades, round(total_cube_metres_savings), round(total_co2_savings)

def generate_categories_dict(): 
    """
    Generates a dictionary with the keys being all item categories, with all 
    values initialised to 0

    Args:
        None

    Returns:
        dict: A dictionary with the keys being all item categories, with all
    """
    categories = {} 
    # it is important to track the total number of times each category appears
    categories["total"] = 0 
    for category_name in category_names:
        categories[category_name] = 0

    return categories

def fill_categories_dict(categories_count, query_results):
    """
    Fills a pre-initialised dictionary with a count of how many times each 
    category appears in a given query

    Args:
        categories_count: A dictionary with the keys being all item categories,
        query_results: A list of listings

    Returns:
        dict: A dictionary with the keys being all item categories, with the
    """
    for result in query_results:
        for category in result.categories:
            categories_count[category.type] += 1 
            categories_count["total"] += 1

def generate_categories_probability(listing, categories_count): 
    """
    Generates the probability that a given category would be accessed 
    (could be searched, clicked, etc.) based on previous data...

    Args:
        listing: A listing object
        categories_count: A dictionary with the keys being all item categories,

    Returns:
        dict: A dictionary with the keys being all item categories, with the
    """
    probability = 0

    # check for div by zero 
    if categories_count["total"] == 0:
        return probability

    for category in listing.categories:
        probability += (categories_count[category.type] / categories_count["total"])

    return probability

def change_db_categories_to_list(listing):
    """
    Takes in a listing, and returns it's categories as a list of strings

    Args:
        listing: A listing object

    Returns:
        list: A list of strings, where each string is a category
    """
    categories_list = []
    for category in listing.categories:
        categories_list.append(category.type)
    return categories_list

def find_place_in_feed(trade_probability, click_probability, search_probability, n_listings,
    feed_len):
    '''
    Finds the place in the feed that a listing should be placed given how likely 
    a user is to trade/click/search for that category.
    '''
    # if any one of these probabilities is greater than .95, we should 
    # have a decent chance of the item appearing high in the feed,
    # regardless of the other probabilities. 
    if trade_probability >= .95 or click_probability >= .95 or search_probability >= .95:
        # 75% chance
        if random() >= .25:
            # generate a random number somewhere in the first 33% of the feed 
            return randint(0, feed_len // 3)

    # insert at the end of the feed
    return n_listings - 1

