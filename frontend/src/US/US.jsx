import React from "react";
import { useState } from "react";
import Navbar from "../Navbar/Navbar";

const US = () => {
  const [x, setX] = useState();
  const [y, setY] = useState();
  const [message, setMessage] = useState();
  const predict = async () => {
    try {
      const response = await fetch(
        "https://care-and-cure-api.onrender.com/usHospitals",
        {
          method: "POST",
          "Access-Control-Allow-Origin": "*",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            x: x,
            y: y,
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
        <label htmlFor="x">Latitude</label>
        <input
          type="number"
          name="x"
          id="x"
          value={x}
          onChange={(e) => {
            setX(e.target.value);
          }}
        />
        <br />
        <br />
        <label htmlFor="x">Logitude</label>
        <input
          type="number"
          name="y"
          id="y"
          value={y}
          onChange={(e) => {
            setY(e.target.value);
          }}
        />
        <button className="btn btn-primary indiaButton" onClick={predict}>
          Show
        </button>
      </div>
      <div className="row usHospitals">

        {message &&
          message.map((item) => {
            return (
              <>
                <a className="col-lg-4 usHospital" href={item.WEBSITE}>
                  <ul className="list-group">
                    <li className="list-group-item">
                      Hospital: {item.NAME}
                    </li>
                    <li className="list-group-item">Type: {item.TYPE}</li>
                    <li className="list-group-item">
                      Address: {item.ADDRESS}
                    </li>
                    <li className="list-group-item">City: {item.CITY}</li>
                    <li className="list-group-item">State: {item.STATE}</li>
                  </ul>
                </a>
              </>
            );
          })}
          </div>
    </>
  );
};

export default US;
