import React, { useState } from "react";
import { FaUser } from "react-icons/fa6";
import "../Styles/navbar.css";

import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [showProfile, setShowProfile] = useState(false);

  const navigate = useNavigate();

  const handleClick = () => {
    setShowProfile((prev) => !prev);
  };

  const handleLogout = () => {
    localStorage.removeItem("userData");
    console.log("logout");
    navigate("/");
  };

  return (
    <div className="navbar">
      <h1>Expense Manager</h1>
      <div className="profile" onClick={handleClick}>
        <FaUser className="profileicon" color="black" />
        <>
          {showProfile && (
            <div className="profile-bar">
              <button onClick={handleLogout}>Logout</button>
            </div>
          )}
        </>
      </div>
    </div>
  );
};

export default Navbar;
