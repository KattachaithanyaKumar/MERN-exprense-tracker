// FormContainer.js
import React from "react";

import "../Styles/formContainer.css";

const FormContainer = ({
  categories,
  setType,
  addRecord,
  setCategory,
  amount,
  setAmount,
}) => {
  return (
    <div className="form-container box">
      <h1>Add new record</h1>
      <form className="form">
        <div className="row">
          <h4>Amount:</h4>
          <input
            type="text"
            placeholder="Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>
        <div className="row">
          <h4>Category:</h4>
          <select name="category" onChange={(e) => setCategory(e.target.value)}>
            {categories?.map((item, index) => (
              <option value={item.name} key={index}>
                {item.name}
              </option>
            ))}
          </select>
        </div>
        <div className="row">
          <h4>Type:</h4>
          <div className="radio-box">
            <div className="radio">
              <input
                type="radio"
                name="type"
                value="Income"
                onChange={(e) => {
                  setType(e.target.value);
                }}
                // checked
              />
              <label htmlFor="Income">Income</label>
            </div>
            <div className="radio">
              <input
                type="radio"
                name="type"
                value="Expense"
                onChange={(e) => {
                  setType(e.target.value);
                }}
              />
              <label htmlFor="Expense">Expense</label>
            </div>
          </div>
        </div>
        <button className="addRecordButton" onClick={addRecord}>
          Add
        </button>
      </form>
    </div>
  );
};

export default FormContainer;
