from fastapi import FastAPI
from pydantic import BaseModel
import pickle
import json
import numpy as np
import pandas as pd


app = FastAPI()

class diabetes_model_input(BaseModel):
    
    pregnancies : int
    Glucose : int
    BloodPressure : int
    SkinThickness : int
    Insulin : int
    BMI : float
    DiabetesPedigreeFunction : float
    Age : int       
        
# loading the saved model
diabetes_model = pickle.load(open('diabetes_model.sav', 'rb'))

def distance(a,b):
    a = np.array(a)
    b = np.array(b)

    dis = np.sum(np.square(a-b))
    return dis

def usHospital(point):
    us_hospitals = pd.read_csv("US_Hospitals.csv")
    data = us_hospitals.drop(labels=['OBJECTID','ID','NAME','ADDRESS','CITY','STATE','ZIP','ZIP4','TELEPHONE','TYPE','STATUS','POPULATION','COUNTY','COUNTYFIPS','COUNTRY','LATITUDE','LONGITUDE','NAICS_CODE','NAICS_DESC','SOURCE','SOURCEDATE','VAL_METHOD','VAL_DATE','WEBSITE','STATE_ID','ALT_NAME','ST_FIPS','OWNER','TTL_STAFF','BEDS','TRAUMA','HELIPAD'],axis=1)
    all_dist = {}
    for i in range(len(data)):
        d = (data.iloc[i].X,data.iloc[i].Y)
        all_dist[i] = distance(d,point)
    topNeighbours = dict(sorted(all_dist.items(), key=lambda item: item[1]))
    topIndices = list(topNeighbours.keys())
    neighbors= []
    for i in topIndices[:7]:
        neighbors.append(us_hospitals.iloc[i])
    return neighbors


@app.post('/diabetes_prediction')
def diabetes_predd(input_parameters : diabetes_model_input):
    
    input_data = input_parameters.json()
    input_dictionary = json.loads(input_data)
    
    preg = input_dictionary['pregnancies']
    glu = input_dictionary['Glucose']
    bp = input_dictionary['BloodPressure']
    skin = input_dictionary['SkinThickness']
    insulin = input_dictionary['Insulin']
    bmi = input_dictionary['BMI']
    dpf = input_dictionary['DiabetesPedigreeFunction']
    age = input_dictionary['Age']
    
    
    input_list = [preg, glu, bp, skin, insulin, bmi, dpf, age]
    
    prediction = diabetes_model.predict([input_list])
    
    if (prediction[0] == 0):
        return 'The person is not diabetic'
    else:
        return 'The person is diabetic'
    
    
disease_model = pickle.load(open('disease.sav', 'rb'))

class disease_model_input(BaseModel):
    
    symptoms: list    
        

@app.post('/disease_prediction')
def diabetes_pred(input_parameters : disease_model_input):
    
    input_data = input_parameters.json()
    input_dictionary = json.loads(input_data)
    
    symptoms_dict = {"itching":0,"skin_rash":0,"nodal_skin_eruptions":0,"continuous_sneezing":0,"shivering":0,'chills':0,'joint_pain':0,'stomach_pain':0,'acidity':0,'ulcers_on_tongue':0,'muscle_wasting':0,'vomiting':0,'burning_micturition':0,'spotting_urination':0,'fatigue':0,'weight_gain':0,'anxiety':0,'cold_hands_and_feets':0,'mood_swings':0,'weight_loss':0,'restlessness':0,'lethargy':0,'patches_in_throat':0,'irregular_sugar_level':0,'cough':0,'high_fever':0,'sunken_eyes':0,'breathlessness':0,'sweating':0,'dehydration':0,'indigestion':0,'headache':0,'yellowish_skin':0,'dark_urine':0,'nausea':0,'loss_of_appetite':0,'pain_behind_the_eyes':0,'back_pain':0,'constipation':0,'abdominal_pain':0,'diarrhoea':0,'mild_fever':0,'yellow_urine':0,'yellowing_of_eyes':0,'acute_liver_failure':0,'fluid_overload':0,'swelling_of_stomach':0,'swelled_lymph_nodes':0,'malaise':0,'blurred_and_distorted_vision':0,'phlegm':0,'throat_irritation':0,'redness_of_eyes':0,'sinus_pressure':0,'runny_nose':0,'congestion':0,'chest_pain':0,'weakness_in_limbs':0,'fast_heart_rate':0,'pain_during_bowel_movements':0,'pain_in_anal_region':0,'bloody_stool':0,'irritation_in_anus':0,'neck_pain':0,'dizziness':0,'cramps':0,'bruising':0,'obesity':0,'swollen_legs':0,'swollen_blood_vessels':0,'puffy_face_and_eyes':0,'enlarged_thyroid':0,'brittle_nails':0,'swollen_extremeties':0,'excessive_hunger':0,'extra_marital_contacts':0,'drying_and_tingling_lips':0,'slurred_speech':0,'knee_pain':0,'hip_joint_pain':0,'muscle_weakness':0,'stiff_neck':0,'swelling_joints':0,'movement_stiffness':0,'spinning_movements':0,'loss_of_balance':0,'unsteadiness':0,'weakness_of_one_body_side':0,'loss_of_smell':0,'bladder_discomfort':0,'foul_smell_of_urine':0,'continuous_feel_of_urine':0,'passage_of_gases':0,'internal_itching':0,'toxic_look':0,'depression':0,'irritability':0,'muscle_pain':0,'altered_sensorium':0,'red_spots_over_body':0,'belly_pain':0,'abnormal_menstruation':0,'dischromic_patches':0,'watering_from_eyes':0,'increased_appetite':0,'polyuria':0,'family_history':0,'mucoid_sputum':0,'rusty_sputum':0,'lack_of_concentration':0,'visual_disturbances':0,'receiving_blood_transfusion':0,'receiving_unsterile_injections':0,'coma':0,'stomach_bleeding':0,'distention_of_abdomen':0,'history_of_alcohol_consumption':0,'fluid_overload':0,'blood_in_sputum':0,'prominent_veins_on_calf':0,'palpitations':0,'painful_walking':0,'pus_filled_pimples':0,'blackheads':0,'scurring':0,'skin_peeling':0,'silver_like_dusting':0,'small_dents_in_nails':0,'inflammatory_nails':0,'blister':0,'red_sore_around_nose':0,'yellow_crust_ooze':0,'fuck':0}
    for symptom in input_dictionary["symptoms"]:
        symptoms_dict[symptom] = 1
    
    symptoms_as_list = list(symptoms_dict.values())
    symptoms_as_list = np.reshape(symptoms_as_list,(1,-1))
    
    prediction = disease_model.predict(symptoms_as_list)
    y_dict = {0:"Paroymsal  Positional Vertigo",1:"AIDS",2:"Acne",3:"Alcoholic hepatitis",4:"Allergy",5:"Arthritis",6:"Bronchial Asthma",7:"Cervical spondylosis",8:"Chicken pox",9:"Chronic cholestasis",10:"Common Cold",11:"Dengue",12:"Diabetes",13:"Dimorphic hemmorhoids",14:"Drug Reaction",15:"Fungal Infection",16:"GRED",17:"Gastroenteritis",18:"Heart attack",19:"Hepatitis B",20:"Hepatitis C",21:"Hepatitis D",22:"Hepatitis E",23:"Hypertension",24:"Hyperthyroidism",25:"Hypoglycemia",26:"Hypothyroidism",27:"Impetigo",28:"Jaundice",29:"Malaria",30:"Migraine",31:"Osteoarthristis",32:"Paralysis",33:"Peptic ulcer disease",34:"Pneumonia",35:"Psoriasis",36:"Tuberculosis",37:"Typhoid",38:"Urinary tract infection",39:"Varicose veins",40:"hepatitis A"}

    return y_dict[prediction[0]]

class heart_model_input(BaseModel):
    Age: int
    Sex: int
    Chest_pain_type: int
    BP: int
    Cholesterol : int
    FBS_over_120: int
    EKG_results: int
    Max_HR: int
    Exercise_angina: int
    ST_depression: int
    Slope_of_ST: int
    Number_of_vessels_fluro: int
    Thallium: int
    
heart_model = pickle.load(open('heart.sav','rb'))


@app.post('/heart_prediction')
def heart_pred(input_parameters: heart_model_input):
    input_data = input_parameters.json()
    input_dictionary = json.loads(input_data)
    
    age = input_dictionary['Age']
    sex = input_dictionary['Sex']
    chest = input_dictionary['Chest_pain_type']
    bp = input_dictionary['BP']
    chol = input_dictionary['Cholesterol']
    fbs = input_dictionary['FBS_over_120']
    ekg = input_dictionary['EKG_results']
    hr = input_dictionary['Max_HR']
    excer = input_dictionary['Exercise_angina']
    std = input_dictionary['ST_depression']
    slp = input_dictionary['Slope_of_ST']
    nvf = input_dictionary['Number_of_vessels_fluro']
    tha = input_dictionary['Thallium']
    
    
    input_list = [age,sex,chest,bp,chol,fbs,ekg,hr,excer,std,slp,nvf,tha]
    
    prediction = heart_model.predict([input_list])
    
    if (prediction[0] == 1):
        return 'Heart Disease is Present'
    else:
        return 'Heart Disease is not Present'

class usHospitalModelInput(BaseModel):
    
    x : float
    y : float

@app.post("/usHospitals")
def usHospitalAPI(input_parameters: usHospitalModelInput):
    input_data = input_parameters.json()
    input_dictionary = json.loads(input_data)
    point = (input_dictionary['x'],input_dictionary['y'])
    us_hospitals = pd.read_csv("US_Hospitals.csv")
    us_hospitals = us_hospitals.drop(labels=['OBJECTID','ID','ZIP','ZIP4','TELEPHONE','STATUS','POPULATION','COUNTY','COUNTYFIPS','COUNTRY','NAICS_CODE','NAICS_DESC','SOURCE','SOURCEDATE','VAL_METHOD','VAL_DATE','STATE_ID','ALT_NAME','ST_FIPS','OWNER','TTL_STAFF','BEDS','TRAUMA','HELIPAD'],axis=1)
    all_dist = {}
    for i in range(len(us_hospitals)):
        d = (us_hospitals.iloc[i].X,us_hospitals.iloc[i].Y)
        d = np.array(d)
        dis = np.sum(np.square(point-d))
        all_dist[i] = dis
    topNeighbours = dict(sorted(all_dist.items(), key=lambda item: item[1]))
    neighbours = []
    topIndices = list(topNeighbours.keys())
    for i in topIndices[:7]:
        neighbours.append(us_hospitals.iloc[i])
    return neighbours


class indiaHospitalModelInput(BaseModel):

    pincode: int

@app.post("/indiaHospitals")
def indiaHospitalAPI(input_parameters: indiaHospitalModelInput):
    input_data = input_parameters.json()
    input_dictionary = json.loads(input_data)
    pincode = input_dictionary['pincode']
    india = pd.read_csv("HospitalsInIndia.csv")
    india = india.drop(labels=['Unnamed: 0'],axis=1)
    indiaNeighbour = india.query("Pincode == 800016.0")
    return india.iloc[0]