import json
import requests


url = 'http://127.0.0.1:8000/disease_prediction'

input_data_for_model = {
    "symptoms":["continuous_sneezing","shivering","chills"]
    }

input_json = json.dumps(input_data_for_model)

response = requests.post(url, data=input_json)
print(response.text)