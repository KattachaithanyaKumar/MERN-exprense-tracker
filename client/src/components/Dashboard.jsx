// Dashboard.js
import React from "react";

import "../Styles/dashboard.css";

const Dashboard = ({ income, expense }) => {
  return (
    <div className="dashboard">
      <div className="income box">
        <h2>Income:</h2>
        <p>{income}</p>
      </div>
      <div className="expense box">
        <h2>Expense:</h2>
        <p>{expense}</p>
      </div>
    </div>
  );
};

export default Dashboard;
