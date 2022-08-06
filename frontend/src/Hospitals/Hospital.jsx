import React from "react";
import { useState } from "react";
import Navbar from "../Navbar/Navbar";
import "./Appointment.css";
import Region from "./Region";

const Hospital = () => {
  const [region, setRegion] = useState();
  return (
    <>
      <Navbar />
      <div className="regions row">
        <Region
          setRegion={setRegion}
          region="India"
          imgUrl="https://upload.wikimedia.org/wikipedia/en/thumb/4/41/Flag_of_India.svg/1200px-Flag_of_India.svg.png"
          url="/india"
        />
        <Region
          setRegion={setRegion}
          region="USA"
          imgUrl="https://upload.wikimedia.org/wikipedia/en/a/a4/Flag_of_the_United_States.svg"
          url="/us"
        />
      </div>
    </>
  );
};

export default Hospital;
