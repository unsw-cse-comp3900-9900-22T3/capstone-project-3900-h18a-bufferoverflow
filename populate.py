import requests
import json

endpoint = "http://localhost:8000/graphql"
headers = {"Content-Type": "application/json"}


def execute_query(query):
    response = requests.post(endpoint, json={"query": query}, headers=headers)
    print(json.loads(response.content))

###########################################################################
# Create 30 dummy users
###########################################################################


for i in range(30):
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

