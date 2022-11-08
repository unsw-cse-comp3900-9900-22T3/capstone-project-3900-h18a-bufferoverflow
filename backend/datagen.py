from app.config import material_names, category_names

N_USERS = 5

X_TRADES = 5
Y_SEARCHES = 20 
Z_CLICKS = 10


# generate n trades 
def gen_trades(n_trades, trades=[]):
    if n_trades == 0:
        return trades 

    # TODO: implement trade generation algorithm

    gen_trades(n_trades - 1, trades)


# generate n searches 
def gen_searches(n_searches, searches=[]):
    if n_searches == 0:
        return searches 

    # TODO: implement search generation algorithm

    gen_searches(n_searches - 1, searches) 

# generate n clicks 
def gen_clicks(n_clicks, clicks=[]):
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
    gen_data()
