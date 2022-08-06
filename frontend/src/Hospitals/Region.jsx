import React from "react";
import { useNavigate } from "react-router";

const Region = ({ imgUrl, region, url }) => {
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
          <h3>{region}</h3>
        </div>
      </div>
    </>
  );
};

export default Region;
