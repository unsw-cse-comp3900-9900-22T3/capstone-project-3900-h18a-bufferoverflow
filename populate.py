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
    query = f'''mutation {{
        createUser(
            email: "user{i}@gmail.com"
            username: "user{i}"
        ) {{
            success
        }}
    }}'''
    execute_query(query)