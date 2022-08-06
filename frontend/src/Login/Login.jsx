import React, { useState, useEffect } from "react";
import Navbar from "../Navbar/Navbar";
import "../Signup/Auth.css";
import {
  auth,
  signInWithEmailAndPassword,
  signInWithGoogle,
  logout,
} from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useNavigate } from "react-router-dom";
import { useRef } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, loading, error] = useAuthState(auth);
  const User = localStorage.getItem("user")
  const navigate = useNavigate();
  useEffect(() => {
    if (loading) {
      return;
    }
    if (User) {
      if (user.emailVerified) {
        navigate("/diseasePrediction");
      }
    }
  }, [user, loading]);
  console.log(user);
  return (
    <>
      <Navbar />
      <div className="loginQuote">
        <h2>Making a difference together.</h2>
      </div>
      <div className="loginForm">
        <h3>Log In</h3>

        <div className="mb-3">
          <label>Email address</label>
          <input
            type="email"
            className="form-control"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="d-grid">
          <button
            className="btn btn-primary"
            onClick={() => {
              signInWithEmailAndPassword(auth, email, password).then(
                (userCredentials) => {
                  if (!userCredentials.user.emailVerified) {
                    alert("Please verify your email.");
                  } else {
                    localStorage.setItem(
                      "user",
                      userCredentials.user
                    );
                  }
                }
              );
            }}
          >
            Submit
          </button>
          <button className="btn m-3" onClick={signInWithGoogle}>
            Login with Google
          </button>
        </div>
        <p className="forgot-password text-right">
          New User <a href="/signup">Signup?</a>
        </p>
      </div>
    </>
  );
};

export default Login;
