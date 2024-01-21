import React, { useState } from "react";
import { Link } from "react-router-dom";

import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

const Login = () => {
  const [showPassword, setShowPassword] = useState(true);

  const handleShow = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="auth-page">
      <div className="auth-box">
        <h3>Login to account</h3>
        <p>
          Access the most powerfull tool in the industry for expense tracker
        </p>
        <form className="auth-form">
          <input type="email" placeholder="E-mail Address" />
          <>
            {showPassword ? (
              <div className="pass">
                <input type="password" placeholder="Password" />
                <FaRegEyeSlash onClick={handleShow} className="eyeicon" />
              </div>
            ) : (
              <div className="pass">
                <input type="text" placeholder="Password" />
                <FaRegEye onClick={handleShow} className="eyeicon" />
              </div>
            )}
          </>
          <button>Login</button>
        </form>

        <Link to={"/"}>Register new account</Link>
      </div>
    </div>
  );
};

export default Login;
