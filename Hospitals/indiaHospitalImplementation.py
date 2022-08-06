import json
import requests


url = 'http://127.0.0.1:8000/indiaHospitals'

input_data_for_model = {
    "pincode":800016.0
    }

input_json = json.dumps(input_data_for_model)

response = requests.post(url, data=input_json)
print(response.text)