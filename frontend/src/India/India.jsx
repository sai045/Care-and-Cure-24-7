import React from "react";
import { useState } from "react";
import Navbar from "../Navbar/Navbar";

const India = () => {
  const [pincode, setPincode] = useState();
  const [message, setMessage] = useState();
  const predict = async () => {
    try {
      const response = await fetch(
        "https://care-and-cure-api.onrender.com/indiaHospitals",
        {
          method: "POST",
          "Access-Control-Allow-Origin": "*",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            pincode: pincode,
          }),
        }
      );
      const responseData = await response.json();
      console.log(responseData);
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
        <label htmlFor="pincode">Pincode</label>
        <input
          type="number"
          name="pincode"
          id="pincode"
          value={pincode}
          onChange={(e) => {
            setPincode(e.target.value);
          }}
        />
        <button className="btn btn-primary indiaButton" onClick={predict}>
          Show
        </button>
        {message && (
          <div className="message">
            <ul className="list-group">
              <li className="list-group-item">Hospital: {message.Hospital}</li>
              <li className="list-group-item">Address: {message.LocalAddress}</li>
            </ul>
          </div>
        )}
      </div>
    </>
  );
};

export default India;
