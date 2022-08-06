import React from "react";
import { useState } from "react";
import Navbar from "../Navbar/Navbar";
import "./HeartInput.css";

const HeartInput = () => {
  const [age, setAge] = useState("");
  const [sex, setSex] = useState(0);
  const [chestPainType, setChestPainType] = useState(0);
  const [bp, setBp] = useState("");
  const [cholestrerol, setCholesterol] = useState("");
  const [fbsOver120, setFbsOver120] = useState(0);
  const [ekg, setEkg] = useState(0);
  const [maxHr, setMaxHr] = useState("");
  const [exerciseAngina, setExerciseAngina] = useState(0);
  const [stDepression, setStDepression] = useState("");
  const [slopeOfSt, setSlopeOfSt] = useState(0);
  const [numberOfVesselsFluro, setNumberOfVesselsFluro] = useState("");
  const [thallium, setThallium] = useState(3);
  const [message, setMessage] = useState("");

  const predict = async () => {
    try {
      const response = await fetch(
        "https://ml-health-045.herokuapp.com/heart_prediction",
        {
          method: "POST",
          "Access-Control-Allow-Origin": "*",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            Age: age,
            Sex: sex,
            Chest_pain_type: chestPainType,
            BP: bp,
            Cholesterol: cholestrerol,
            FBS_over_120: fbsOver120,
            EKG_results: ekg,
            Max_HR: maxHr,
            Exercise_angina: exerciseAngina,
            ST_depression: stDepression,
            Slope_of_ST: slopeOfSt,
            Number_of_vessels_fluro: numberOfVesselsFluro,
            Thallium: thallium,
          }),
        }
      );
      const responseData = await response.json();
      if (!response.ok) {
        return console.log(responseData.message);
      }
      setMessage(responseData);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Navbar />
      <div className="HeartForm">
        <label htmlFor="age">Age</label>
        <input
          type="number"
          name="age"
          id="age"
          value={age}
          onChange={(e) => {
            setAge(e.target.value);
          }}
        />
        <br />
        <br />
        <label htmlFor="sex">sex</label>
        <select
          name="sex"
          id="sex"
          onChange={(e) => {
            setSex(e.target.value);
          }}
          value={sex}
        >
          <option value="0">Female</option>
          <option value="1">Male</option>
        </select>
        <br />
        <br />
        <label htmlFor="chestPainType"> Chest Pain Type</label>
        <select
          name="chestPainType"
          id="chestPainType"
          value={chestPainType}
          onChange={(e) => {
            setChestPainType(e.target.value);
          }}
        >
          <option value="1">Typical Angina</option>
          <option value="2">Atypical Angina</option>
          <option value="3">Non-anginal Pain</option>
          <option value="4">Asymptomatic</option>
        </select>
        <br />
        <br />
        <label htmlFor="bloodPressure">Blood Pressure</label>
        <input
          type="number"
          name="bloodPressure"
          id="bloodPressure"
          value={bp}
          onChange={(e) => {
            setBp(e.target.value);
          }}
        />
        <br />
        <br />
        <label htmlFor="cholesterol">Cholesterol</label>
        <input
          type="number"
          name="cholesterol"
          id="cholesterol"
          value={cholestrerol}
          onChange={(e) => {
            setCholesterol(e.target.value);
          }}
        />
        <br />
        <br />
        <label htmlFor="fbs">FBS Over 120</label>
        <select
          name="fbs"
          id="fbs"
          value={fbsOver120}
          onChange={(e) => {
            setFbsOver120(e.target.value);
          }}
        >
          <option value="1">Yes</option>
          <option value="0">No</option>
        </select>
        <br />
        <br />
        <label htmlFor="ekg">EKG Results</label>
        <select
          name="ekg"
          id="ekg"
          value={exerciseAngina}
          onChange={(e) => {
            setEkg(e.target.value);
          }}
        >
          <option value="0">Normal</option>
          <option value="1">ST-T wave abnormality</option>
          <option value="2">Probable Estes'</option>
        </select>
        <br />
        <br />
        <label htmlFor="maxHr">Maximum Heart Rate</label>
        <input
          type="number"
          name="maxHr"
          id="maxhr"
          value={maxHr}
          onChange={(e) => {
            setMaxHr(e.target.value);
          }}
        />
        <br />
        <br />
        <label htmlFor="exerciseAngina">Exercise Angina</label>
        <select
          name="exersiseAngina"
          id="exerciseAngina"
          value={exerciseAngina}
          onChange={(e) => {
            setExerciseAngina(e.target.value);
          }}
        >
          <option value="1">Yes</option>
          <option value="0">No</option>
        </select>
        <br />
        <br />
        <label htmlFor="stDepression">ST Depression</label>
        <input
          type="number"
          name="stDepression"
          id="stDepression"
          value={stDepression}
          onChange={(e) => {
            setStDepression(e.target.value);
          }}
        />
        <br />
        <br />
        <label htmlFor="slopeSt">Slope of ST</label>
        <input
          type="number"
          name="slopeSt"
          id="slopeSt"
          value={slopeOfSt}
          onChange={(e) => {
            setSlopeOfSt(e.target.value);
          }}
        />
        <br />
        <br />
        <label htmlFor="vessels">Number of Vessels Fluroscopy</label>
        <input
          type="number"
          name="vessels"
          id="vessels"
          value={numberOfVesselsFluro}
          onChange={(e) => {
            setNumberOfVesselsFluro(e.target.value);
          }}
        />
        <br />
        <br />
        <label htmlFor="thallium">Thallium</label>
        <select
          name="thallium"
          id="thallium"
          value={thallium}
          onChange={(e) => {
            setThallium(e.target.value);
          }}
        >
          Thallium
          <option value="3">Normal</option>
          <option value="6">Fixed Defect</option>
          <option value="7">Reversable Defect</option>
        </select>
        <br />
        <br />
        <button className="btn btn-primary" onClick={predict}>
          Predict
        </button>
        {message.length > 0 && (
          <div className="message">
            <p>
              {message}.
              {message === "Heart Disease is Present" && (
                <a href="appointment">
                  Want to book an appointment in the nearest hospital?
                </a>
              )}
            </p>
          </div>
        )}
      </div>
    </>
  );
};

export default HeartInput;
