from app.config import category_names
from random import seed, randint

N_USERS = 30

X_TRADES = 40
Y_SEARCHES = 20 
Z_CLICKS = 10

def create_empty_categories_dict():
    categories = {} 
    
    for category_name in category_names:
        categories[category_name] = 0

    return categories


# generate n trades 
def gen_trades(n_trades, trades):
    if n_trades == 0:
        return trades

    # Start with an equal probaility of generating any category 
    # For each key in trades, increase probability of generating that category?

    # Calculate upper bound for rand int 
    upper_bound = len(category_names) - 1
    for i in trades.values():
        upper_bound += i

    # Gen rand int 
    rand_int = randint(0, upper_bound)

    # Check what category we should generate 
    curr_lower_bound = 0
    for category_name in trades.keys(): 
        # Generally, each category should have an even chance of coming up
        # However, increase the chance for each time that category has been seen already...
        if curr_lower_bound <= rand_int <= curr_lower_bound + trades[category_name]:
            trades[category_name] += 1
            break

        curr_lower_bound += 1 + trades[category_name]

    return gen_trades(n_trades - 1, trades)


# generate n searches 
def gen_searches(n_searches, searches):
    if n_searches == 0:
        return searches 

    # TODO: implement search generation algorithm

    gen_searches(n_searches - 1, searches) 

# generate n clicks 
def gen_clicks(n_clicks, clicks):
    if n_clicks == 0:
        return clicks 

    # TODO: implement clicks generation algorithm

    gen_clicks(n_clicks - 1, clicks)

def gen_data():
    # generate data for N users 
    for i in range(0, N_USERS):
        print(gen_trades(X_TRADES, create_empty_categories_dict()))
        gen_searches(Y_SEARCHES, create_empty_categories_dict())
        gen_clicks(Z_CLICKS, create_empty_categories_dict())

if __name__ == "__main__": 
    seed()
    gen_data()
