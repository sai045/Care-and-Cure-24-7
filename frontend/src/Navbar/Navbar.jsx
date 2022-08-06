import React from "react";
import logo from "./logo.jpg";
import "./Navbar.css";
import { logout } from "../firebase";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router";

const Navbar = () => {
  const user = localStorage.getItem("user");
  const navigate = useNavigate();
  return (
    <>
      <nav className="navbar fixed-top">
        <div>
          <a className="navbar-brand" href="/">
            <img src={logo} alt="" height="60px" width="60px" />
            <p> Care and Cure 24/7</p>
          </a>
        </div>
        <div className="navbar-side">
          <ul className="navbar-list">
            <li>
              <a href="/diseasePrediction">Disease Prediction</a>
            </li>
            <li>
              <a href="/appointment">Look for Hospital</a>
            </li>
          </ul>
        </div>
        <div>
          {user && (
            <button
              className="navbar-button"
              onClick={() => {
                logout();
                navigate("/");
              }}
            >
              Logout
            </button>
          )}
          {user === null && (
            <button
              className="navbar-button"
              onClick={() => {
                logout();
                navigate("/");
              }}
            >
              Login
            </button>
          )}
        </div>
      </nav>
    </>
  );
};

export default Navbar;
