// BalanceBox.js
import React from "react";

import "../Styles/balanceBox.css";

const BalanceBox = ({
  updateBalance,
  balance,
  setBalance,
  tempbalance,
  handleUpdateBalance,
  setUpdateBalance,
}) => {
  return (
    <div className="balance box">
      <div className="balance-left">
        <h2>Balance:</h2>
        {updateBalance ? (
          <input
            type="text"
            placeholder="Balance"
            value={balance}
            onChange={(e) => setBalance(e.target.value)}
          />
        ) : (
          <p>{balance}</p>
        )}
      </div>
      {updateBalance ? (
        <button onClick={handleUpdateBalance}>Submit</button>
      ) : (
        <button
          onClick={() => {
            setUpdateBalance(true);
          }}
        >
          Update balance
        </button>
      )}
    </div>
  );
};

export default BalanceBox;
