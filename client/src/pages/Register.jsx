import React, { useState } from "react";
import "../Styles/auth.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import axios from "axios";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigator = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    console.log("registering user...");

    if (password != confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    axios
      .post("http://localhost:3000/api/user", {
        user: {
          username,
          email,
          password,
          confirmPassword,
        },
      })
      .then((res) => {
        console.log("registered user");
        toast.success("Registered user");
        console.log(res);
        navigator("/");
      })
      .catch((err) => {
        console.log(err);
        toast.error("Registration error");
      });
  };

  return (
    <div className="auth-page">
      <div className="auth-box">
        <h3>Register new account</h3>
        <p>
          Access the most powerfull tool in the industry for expense tracker
        </p>
        <form className="auth-form">
          <input
            type="text"
            placeholder="User Name"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="email"
            placeholder="E-mail Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            type="password"
            placeholder="Re-enter Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <button onClick={handleRegister}>Register</button>
        </form>

        <Link to={"/"}>Login to account</Link>
      </div>
    </div>
  );
};

export default Register;
