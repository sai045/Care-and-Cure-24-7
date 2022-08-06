import React, { useState, useEffect } from "react";
import Navbar from "../Navbar/Navbar";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useNavigate } from "react-router-dom";
import {
  auth,
  signInWithGoogle,
  logout,
  createUserWithEmailAndPassword,
} from "../firebase";
import { sendEmailVerification } from "firebase/auth";
import { db } from "../firebase";
import { addDoc, collection } from "firebase/firestore";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();
  const register = async () => {
    if (!name) return alert("Please enter name");
    const res = createUserWithEmailAndPassword(
      auth,
      email,
      password
    ).then(async (userCredential) => {
      sendEmailVerification(userCredential.user);
      const user = userCredential.user
      await addDoc(collection(db, "users"), {
        uid: user.uid,
        name,
        authProvider: "local",
        email,
      });
      console.log("Yo")
      alert("Email sent");
      logout();
    });
  };
  useEffect(() => {
    if (loading) return;
    if (user) navigate("/login");
  }, [user, loading]);
  return (
    <>
      <Navbar />
      <div className="signupQuote">
        <h2>Empowering People to Improve Their Lives</h2>
      </div>
      <div className="signupForm">
        <h3>Sign Up</h3>

        <div className="mb-3">
          <label>First name</label>
          <input
            type="text"
            className="form-control"
            placeholder="First name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

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
          <button className="btn btn-primary" onClick={register}>
            Sign Up
          </button>
          <button className="btn m-3" onClick={signInWithGoogle}>
            Register with Google
          </button>
        </div>
        <p className="forgot-password text-right">
          Already registered <a href="/login">Login?</a>
        </p>
      </div>
    </>
  );
};

export default Signup;
