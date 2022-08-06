import json
import requests


url = 'http://127.0.0.1:8000/heart_prediction'

input_data_for_model = {
    "Age": 70,
    "Sex": 1,
    "Chest_pain_type": 4,
    "BP": 130,
    "Cholesterol" : 322,
    "FBS_over_120": 0,
    "EKG_results": 2,
    "Max_HR": 109,
    "Exercise_angina": 0,
    "ST_depression": 2.4,
    "Slope_of_ST": 2,
    "Number_of_vessels_fluro": 3,
    "Thallium": 3
    }

input_json = json.dumps(input_data_for_model)

response = requests.post(url, data=input_json)
print(response.text)