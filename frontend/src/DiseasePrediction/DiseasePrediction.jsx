import React from "react";
import Navbar from "../Navbar/Navbar";
import Disease from "./Disease";
import "./DiseasePrediction.css";
import diabetesImage from "./diabetesImage.jpg";
import diseaseImage from "./diseaseImage.jpg";
import heartImage from "./heartImage.jpg";
import liverImage from "./liverImage.jpg";

const DiseasePrediction = () => {
  return (
    <>
      <Navbar />
      <div className="diseases row">
        <Disease
          imgUrl={diabetesImage}
          disease="Diabetes"
          url="/diabetesInput"
        />
        <Disease imgUrl={diseaseImage} disease="Disease" url="/diseaseInput" />
        <Disease imgUrl={heartImage} disease="Heart" url="/heartInput" />
        <Disease imgUrl={liverImage} disease="Liver" />
      </div>
    </>
  );
};

export default DiseasePrediction;

// heart liver diabetes disease
