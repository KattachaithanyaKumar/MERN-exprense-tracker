import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import api_path from "../defaults/api_path";
import { useNavigate } from "react-router-dom";

import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(true);

  const navigate = useNavigate();

  const handleShow = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = (e) => {
    e.preventDefault();

    axios
      .post(api_path + "/user/login", {
        email,
        password,
      })
      .then((res) => {
        // console.log(res.data.user);
        toast.success("Login successful");
        if (res.status == 200) {
          navigate("/home", { state: { userData: res.data.user } });
        }
      })
      .catch((e) => {
        console.log(e);
        toast.error("Login error");
      });
  };

  return (
    <div className="auth-page">
      <div className="auth-box">
        <h3>Login to account</h3>
        <p>
          Access the most powerfull tool in the industry for expense tracker
        </p>
        <form className="auth-form">
          <input
            type="email"
            placeholder="E-mail Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <>
            {showPassword ? (
              <div className="pass">
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <FaRegEyeSlash onClick={handleShow} className="eyeicon" />
              </div>
            ) : (
              <div className="pass">
                <input
                  type="text"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <FaRegEye onClick={handleShow} className="eyeicon" />
              </div>
            )}
          </>
          <button onClick={handleLogin}>Login</button>
        </form>

        <Link to={"/"}>Register new account</Link>
      </div>
    </div>
  );
};

export default Login;
