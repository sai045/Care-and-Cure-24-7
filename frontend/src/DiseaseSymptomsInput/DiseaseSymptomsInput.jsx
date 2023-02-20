import React, { useState } from "react";
import Navbar from "../Navbar/Navbar";
import { diseases } from "./diseases";
import "./DiseasesInput.css";
import $ from "jquery";

const DiseaseSymptomsInput = () => {
  let symptoms = [];
  const [message, setMessage] = useState("");
  const predict = async () => {
    try {
      const response = await fetch(
        "https://care-and-cure-api.onrender.com/disease_prediction",
        {
          method: "POST",
          "Access-Control-Allow-Origin": "*",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            symptoms: symptoms,
          }),
        }
      );
      const responseData = await response.json();
      if (!response.ok) {
        return console.log(responseData.message);
      }
      setMessage(responseData);
      console.log(responseData);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <Navbar />
      <div className="diseaseForm" id="diseaseForm">
        {diseases.map((disease) => {
          return (
            <>
              <div className="diseaseInput">
                <input
                  type="checkbox"
                  id={disease}
                  name={disease}
                  value={disease}
                  onChange={(e) => {
                    if (e.target.checked) {
                      symptoms.push(e.target.value);
                    } else {
                      const index = symptoms.indexOf(5);
                      if (index > -1) {
                        symptoms.splice(index, 1);
                      }
                    }
                  }}
                />
                <label htmlFor={disease}>{disease}</label>
              </div>
            </>
          );
        })}
        <button className="btn btn-primary" onClick={predict}>
          Predict
        </button>
        {message.length > 0 && (
          <div className="message">
            <p>
              You're probably suffering from {message}.Want to book an{" "}
              <a href="appointment"> appointment in the nearest hospital?</a>
            </p>
          </div>
        )}
      </div>
    </>
  );
};

export default DiseaseSymptomsInput;
