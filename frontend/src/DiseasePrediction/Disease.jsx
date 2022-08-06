import React from "react";
import "./Disease.css";
import { useNavigate } from "react-router";

const Disease = ({ imgUrl, disease, url }) => {
  const navigate = useNavigate();
  return (
    <>
      <div className="disease col-lg-6">
        <div className="box">
          <img
            src={imgUrl}
            alt=""
            height="200px"
            width="372px"
            onClick={() => {
              navigate(url);
            }}
          />
          <h3>{disease} Prediction</h3>
        </div>
      </div>
    </>
  );
};

export default Disease;
