import React, { useState } from "react";
import "../Styles/recordbox.css";
import axios from "axios";
import api_path from "../defaults/api_path";

const RecordBox = ({
  record,
  setRecords,
  categories,
  fetchData,
  getRecords,
}) => {
  const [filterCategory, setFilterCategory] = useState(null);
  const [filterType, setFilterType] = useState("Income");
  const [showAll, setShowAll] = useState(true);
  const [filteredRecords, setFilteredRecords] = useState(null);

  const filterRecords = () => {
    console.log(record, filterCategory, filterType);
    const tempRecords = record.filter((item) => {
      return item.categoryName === filterCategory && item.type === filterType;
    });
    console.log(tempRecords);
    setFilteredRecords(tempRecords);
    setShowAll(false);
  };

  const deleteRecord = (id) => {
    axios
      .delete(api_path + "/record/" + id)
      .then((res) => {
        console.log(res.data);
        fetchData();
        getRecords();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="recordBox">
      <div className="record-header">
        <h1>Records</h1>
        <div className="record-filter">
          <h2>Filter:</h2>
          <select
            name="category"
            onChange={(e) => setFilterCategory(e.target.value)}
          >
            {categories?.map((item, index) => (
              <option value={item.name} key={index}>
                {item.name}
              </option>
            ))}
          </select>
          <div className="typeSelection">
            <div
              className={filterType == "Income" ? "type active" : "type"}
              onClick={() => setFilterType("Income")}
            >
              <p>Income</p>
            </div>
            <div
              className={filterType == "Expense" ? "type active" : "type"}
              onClick={() => setFilterType("Expense")}
            >
              <p>Expense</p>
            </div>
          </div>
          <button onClick={() => setShowAll(true)}>Clear</button>
          <button onClick={filterRecords}>Search</button>
        </div>
      </div>
      <div className="records">
        {showAll ? (
          <>
            {record?.map((item, index) => (
              <div
                className={
                  item.type == "Income" ? "record income" : "record expense"
                }
                key={index}
              >
                <h3>{item.categoryName}</h3>
                <div className="record-right">
                  {item.type == "Income" ? (
                    <h3>+{item.amount}</h3>
                  ) : (
                    <h3>-{item.amount}</h3>
                  )}
                  <button onClick={() => deleteRecord(item._id)}>Delete</button>
                </div>
              </div>
            ))}
          </>
        ) : (
          <>
            {filteredRecords?.map((item, index) => (
              <div
                className={
                  item.type == "Income" ? "record income" : "record expense"
                }
                key={index}
              >
                <h3>{item.categoryName}</h3>
                <div className="record-right">
                  {item.type == "Income" ? (
                    <h3>+{item.amount}</h3>
                  ) : (
                    <h3>-{item.amount}</h3>
                  )}
                  <button onClick={() => deleteRecord(item._id)}>Delete</button>
                </div>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default RecordBox;
