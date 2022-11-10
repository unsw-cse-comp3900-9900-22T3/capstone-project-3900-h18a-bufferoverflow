import requests
import json

endpoint = "http://localhost:8000/graphql"
headers = {"Content-Type": "application/json"}


def execute_query(query):
    response = requests.post(endpoint, json={"query": query}, headers=headers)
    print(json.loads(response.content))

###########################################################################
# Create 5 dummy users
###########################################################################

NUM_USERS = 5

print("----------------- Creating Dummy Users -----------------")

for i in range(NUM_USERS):
    query = f'''
        mutation {{
            createUser(
                email: "user{i}@gmail.com"
                username: "user{i}"
            ) {{
                success
            }}
        }}
    '''
    execute_query(query)

    query = f'''
        mutation {{
            updateUser(
                bio: "Hi my name is user{i} and I don't like uni very much..."
                displayImg: "https://comp3900storage.blob.core.windows.net/files/regoku.png?sv=2021-06-08&ss=bf&srt=sco&sp=rwdlaciytfx&se=2022-12-01T09:33:16Z&st=2022-09-25T02:33:16Z&spr=https&sig=uni0ZKrnnzcEsYL%2BF9Skp%2F%2B3MZmxeko1GZmM87NlA2w%3D"
                email: "user{i}@gmail.com"
                preferredDistance: 1000
            ) {{
                success
            }}
        }}
    '''
    execute_query(query)

###########################################################################
# Create 5 listings per user
###########################################################################

NUM_LISTINGS_PER_USER = 5

print("---------------- Creating Dummy Listings ---------------")

j = 7

for i in range(NUM_USERS):
    for _ in range(NUM_LISTINGS_PER_USER):
        query = f'''
            mutation {{
                createListing (
                    userEmail: "user{i}@gmail.com",
                    title: "Item {j}" ,
                    description: "This is item {j} and it is a very boring item",
                    isSellListing: {"false" if j % 3 == 0 else "true"},
                    price: {j * 123},
                    canTrade: {"false" if j % 2 == 0 else "true"},
                    canPayCash: {"false" if j % 4 == 0 else "true"},
                    canPayBank: {"false" if j % 6 == 0 else "true"},
                    status: "available",
                    categories: ["beauty"],
                    wantToTradeFor: ["beauty"],
                    weight: {j * 32},
                    volume: {j * 40},
                    materials: ["wood"],
                    address: "{i}{j} Road, Kensington, 2000",
                    image: "https://images.unsplash.com/photo-1499720565725-bd574541a3ee?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
                ) {{
                    listing {{
                        id
                    }}
                    success
                }}
            }}
        '''
        execute_query(query)
        j += 1