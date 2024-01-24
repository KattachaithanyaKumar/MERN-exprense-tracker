// FormContainer.js
import React from "react";

import "../Styles/formContainer.css";

const FormContainer = ({ categories, addCategory, setCategory }) => {
  return (
    <div className="form-container box">
      <h1>Add new record</h1>
      <form className="form">
        <div className="row">
          <h4>Amount:</h4>
          <input type="text" placeholder="Amount" />
        </div>
        <div className="row">
          <h4>Category:</h4>
          <select name="category">
            {categories?.map((item, index) => (
              <option value={item.name} key={index}>
                {item.name}
              </option>
            ))}
            <option value="uncategorized">uncategorized</option>
          </select>
        </div>
        <div className="row">
          <h4>Type:</h4>
          <div className="radio-box">
            <div className="radio">
              <input type="radio" name="type" id="Income" />
              <label htmlFor="Income">Income</label>
            </div>
            <div className="radio">
              <input type="radio" name="type" id="Expense" />
              <label htmlFor="Expense">Expense</label>
            </div>
          </div>
        </div>
        <button className="addRecordButton">Add</button>
      </form>
    </div>
  );
};

export default FormContainer;
