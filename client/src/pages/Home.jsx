import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import "../Styles/home.css";
import api_path from "../defaults/api_path";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

import BalanceBox from "../components/BalanceBox";
import Dashboard from "../components/DashBoard";
import FormContainer from "../components/FormContainer";
import CategoriesTable from "../components/CategoryBox";

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
        {/* user's balance */}
        <BalanceBox
          updateBalance={updateBalance}
          balance={balance}
          setBalance={setBalance}
          tempbalance={tempbalance}
          handleUpdateBalance={handleUpdateBalance}
          setUpdateBalance={setUpdateBalance}
        />
        {/* Income and Expense */}
        <Dashboard income={income} expense={expense} />

        {/* Grid */}
        <div className="input-container">
          {/* add a new record */}
          <FormContainer
            categories={categories}
            addCategory={addCategory}
            setCategory={setCategory}
          />
          {/* manage categories */}
          <CategoriesTable
            categories={categories}
            category={category}
            setCategory={setCategory}
            addCategory={addCategory}
          />
        </div>

        {/* list of records */}
      </div>
    </div>
  );
};

export default Home;
