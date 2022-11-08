from app.config import category_names
from random import seed, random

N_USERS = 5

X_TRADES = 5
Y_SEARCHES = 20 
Z_CLICKS = 10

def create_empty_categories_dict():
    categories = {} 
    
    for category_name in category_names:
        categories[category_name] = 0

    return categories


# generate n trades 
def gen_trades(n_trades, trades=create_empty_categories_dict):
    if n_trades == 0:
        return trades 

    # TODO: implement trade generation algorithm

    # Start with an equal probaility of generating any category 
    # For each key in trades, increase probability of generating that category?

    # Calculate upper bound for rand int 
    upper_bound = len(category_names) - 1
    for i in trades.items():
        upper_bound += i

    # Gen rand int 
    rand_int = random() * upper_bound

    # Check what category we should generate 

    gen_trades(n_trades - 1, trades)


# generate n searches 
def gen_searches(n_searches, searches=create_empty_categories_dict):
    if n_searches == 0:
        return searches 

    # TODO: implement search generation algorithm

    gen_searches(n_searches - 1, searches) 

# generate n clicks 
def gen_clicks(n_clicks, clicks=create_empty_categories_dict):
    if n_clicks == 0:
        return clicks 

    # TODO: implement clicks generation algorithm

    gen_clicks(n_clicks - 1, clicks)

def gen_data():
    # generate data for N users 
    for i in range(0, N_USERS):
        gen_trades(X_TRADES)
        gen_searches(Y_SEARCHES)
        gen_clicks(Z_CLICKS)

if __name__ == "__main__": 
    seed()
    gen_data()
