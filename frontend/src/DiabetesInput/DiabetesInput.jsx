import React from "react";
import { useState } from "react";
import Navbar from "../Navbar/Navbar";
import "./DiabetesInput.css";

const DiabetesSymptomsInput = () => {
  const [pregnencies, setPregnencies] = useState();
  const [glucose, setGlucose] = useState();
  const [bloodPressure, setbloodPressure] = useState();
  const [skinThickness, setSkinThickness] = useState();
  const [insulin, setInsulin] = useState();
  const [bmi, setBmi] = useState();
  const [dpf, setDpf] = useState();
  const [age, setAge] = useState();
  const [message, setMessage] = useState("");

  const predict = async () => {
    try {
      const response = await fetch(
        "https://ml-health-045.herokuapp.com/diabetes_prediction",
        {
          method: "POST",
          "Access-Control-Allow-Origin": "*",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            pregnancies: pregnencies,
            Glucose: glucose,
            BloodPressure: bloodPressure,
            SkinThickness: skinThickness,
            Insulin: insulin,
            BMI: bmi,
            DiabetesPedigreeFunction: dpf,
            Age: age,
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
      <div className="diabetesForm">
        <label htmlFor="pregnencies">Pregnencies</label>
        <input
          type="number"
          name="pregnencies"
          id="pregnencies"
          value={pregnencies}
          onChange={(e) => {
            setPregnencies(e.target.value);
          }}
        />
        <br />
        <br />
        <label htmlFor="glucose">Glucose</label>
        <input
          type="number"
          name="glucose"
          id="glucose"
          value={glucose}
          onChange={(e) => {
            setGlucose(e.target.value);
          }}
        />
        <br />
        <br />
        <label htmlFor="bloodPressure">Blood Pressure</label>
        <input
          type="number"
          name="bloodPressure"
          id="bloodPressure"
          value={bloodPressure}
          onChange={(e) => {
            setbloodPressure(e.target.value);
          }}
        />
        <br />
        <br />
        <label htmlFor="skinThickness">Skin Thickness</label>
        <input
          type="number"
          name="skinThickness"
          id="skinThickness"
          value={skinThickness}
          onChange={(e) => {
            setSkinThickness(e.target.value);
          }}
        />
        <br />
        <br />
        <label htmlFor="insulin">Insulin</label>
        <input
          type="number"
          name="insulin"
          id="insulin"
          value={insulin}
          onChange={(e) => {
            setInsulin(e.target.value);
          }}
        />
        <br />
        <br />
        <label htmlFor="bmi">BMI</label>
        <input
          type="number"
          name="bmi"
          id="bmi"
          value={bmi}
          onChange={(e) => {
            setBmi(e.target.value);
          }}
        />
        <br />
        <br />
        <label htmlFor="dpf">Diabetes Pedigree Function</label>
        <input
          type="number"
          name="dpf"
          id="dpf"
          value={dpf}
          onChange={(e) => {
            setDpf(e.target.value);
          }}
        />
        <br />
        <br />
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
        <button className="btn btn-primary" onClick={predict}>
          Predict
        </button>
        {message.length > 0 && (
          <div className="message">
            <p>
              {message}.
              {message === "Sorry to say this, but you are diabetic" && (
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

export default DiabetesSymptomsInput;
