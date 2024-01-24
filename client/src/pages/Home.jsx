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
  const [categories, setCategories] = useState(null);
  const [category, setCategory] = useState("");

  const getAllCategories = () => {
    axios
      .get(api_path + "/category/" + userData.id)
      .then((res) => {
        console.log(res.data);
        setCategories(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

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

    getAllCategories();
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

  const addCategory = () => {
    axios
      .post(api_path + "/category", {
        name: category,
        userId: userData.id,
      })
      .then((res) => {
        console.log(res.data.category);
        setCategories([...categories, res.data.category]);
        setCategory("");
      })
      .catch((err) => {
        console.error(
          "Error adding category:",
          err.response?.data || err.message
        );
      });

    getAllCategories();
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
                    {categories?.map((item, index) => (
                      <option value={item.name}>{item.name}</option>
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
          </div>
          <div className="column">
            <h1>Categories</h1>
            <div className="categories">
              <table>
                <tbody>
                  {categories?.map((c, i) => (
                    <tr key={i}>
                      <td>
                        {c.name}
                        <div className="cat-buttons">
                          <button>update</button>
                          <button>delete</button>
                        </div>
                      </td>
                    </tr>
                  ))}

                  <tr></tr>
                </tbody>
              </table>
              <div className="addcategory">
                <input
                  type="text"
                  placeholder="add category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                />
                <button onClick={addCategory}>add</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
