import React from "react";
import "../Styles/auth.css";
import { Link } from "react-router-dom";

const Register = () => {
  return (
    <div className="auth-page">
      <div className="auth-box">
        <h3>Register new account</h3>
        <p>
          Access the most powerfull tool in the industry for expense tracker
        </p>
        <form className="auth-form">
          <input type="text" placeholder="User Name" />
          <input type="email" placeholder="E-mail Address" />
          <input type="password" placeholder="Password" />
          <input type="password" placeholder="Re-enter Password" />
          <button onClick={handleRegister}>Register</button>
        </form>

        <Link to={"/login"}>Login to account</Link>
      </div>
    </div>
  );
};

export default Register;
