import json
import requests


url = 'http://127.0.0.1:8000/usHospitals'

input_data_for_model = {
    "x":-118.815736,
    "y":34.154939
    }

input_json = json.dumps(input_data_for_model)

response = requests.post(url, data=input_json)
print(response.text)