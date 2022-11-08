from app.config import material_names, category_names

N_USERS = 5

X_TRADES = 5
Y_SEARCHES = 20 
Z_CLICKS = 10

# generate n trades 
def gen_trades(n_trades):
    pass

# generate n searches 
def gen_searches(n_searches):
    pass 

# generate n clicks 
def gen_clicks(n_clicks):
    pass

def gen_data():
    # generate data for N users 
    for i in range(0, N_USERS):
        gen_trades(X_TRADES)
        gen_searches(Y_SEARCHES)
        gen_clicks(Z_CLICKS)

if __name__ == "__main__": 
    gen_data()
