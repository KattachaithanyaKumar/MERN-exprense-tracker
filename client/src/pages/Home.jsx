import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import "../Styles/home.css";
import api_path from "../defaults/api_path";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const userData = JSON.parse(localStorage.getItem("userData"));
  // console.log(userData);

  const navigate = useNavigate();

  const [data, setData] = useState(null);
  const [updateBalance, setUpdateBalance] = useState(false);
  const [balance, setBalance] = useState(0);
  const [income, setIncome] = useState(0);
  const [expense, setExpense] = useState(0);
  const [tempbalance, setTempBalance] = useState(0);

  const fetchData = () => {
    axios
      .get(api_path + "/user/" + userData.id)
      .then((res) => {
        // console.log(res.data.user);
        setData(res.data.user);
        setBalance(res.data.user.balance);
        setTempBalance(res.data.user.balance);
        setIncome(res.data.user.totalIncome || 0);
        setExpense(res.data.user.totalExpense || 0);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleUpdateBalance = () => {
    axios
      .put(api_path + "/user/" + userData.id, {
        user: {
          balance: balance,
        },
      })
      .then((res) => {
        toast.success("Balance updated successfully");
        // console.log(res.data);
        setTempBalance(res.data.user.balance);
      })
      .catch((err) => {
        toast.error("Error updating balance");
        console.log(err);
        setBalance(tempbalance);
      });
    setUpdateBalance(false);
  };

  useEffect(() => {
    if (!userData) {
      toast.error("Login failed");
      navigate("/");
    } else {
      fetchData();
    }
  }, []);

  return (
    <div className="home-page">
      <Navbar />
      <div className="page">
        <h1>Welcome {data?.username}!</h1>
        <p>
          Access the most powerfull tool in the industry for expense tracker
        </p>

        <div className="dashboard">
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
          <div className="income box">
            <h2>Income:</h2>
            <p>{income}</p>
          </div>
          <div className="expense box">
            <h2>Expense:</h2>
            <p>{expense}</p>
          </div>
        </div>

        <div className="input-container">
          <div className="column">
            <div className="form-container">
              <h1>Add new record</h1>
              <form className="form">
                <div className="row">
                  <h4>Amount:</h4>
                  <input type="text" placeholder="Amount" />
                </div>
                <div className="row">
                  <h4>Category:</h4>
                  <select name="category">
                    <option value="">option1</option>
                  </select>
                </div>
                <div className="row">
                  <h4>Type:</h4>
                  <div className="radio-box">
                    <input type="radio" name="type" id="Income" />
                    <label htmlFor="Income">Income</label>
                    <input type="radio" name="type" id="Expense" />
                    <label htmlFor="Expense">Expense</label>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div className="column">
            <h1>Categories</h1>
            <div className="categories">
              <table>
                <tr>
                  <th>Category</th>
                </tr>
                <tr>
                  <td>Food</td>
                </tr>
                <tr>
                  <td>Shopping</td>
                </tr>
                <tr>
                  <td className="addcategory">
                    <input type="text" placeholder="add category" />
                    <button>add</button>
                  </td>
                </tr>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
