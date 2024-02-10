import requests

# Get user input
user_input = input("Enter your input: ")

# Make the request
url = f'https://donexe-alfa-api.vercel.app/apitext?input={user_input}'
response = requests.get(url)

if response.status_code == 200:
    json_data = response.json()
    json_data = (json_data['response'])
    print("Received JSON data:"+json_data)
    
    # Process the JSON data as needed
else:
    print(f"HTTP request failed with error code {response.status_code}")