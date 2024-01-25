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
import RecordBox from "../components/RecordBox";

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
  const [type, setType] = useState("");
  const [amount, setAmount] = useState(0);
  const [records, setRecords] = useState(null);

  const getAllCategories = () => {
    axios
      .get(api_path + "/category/" + userData.id)
      .then((res) => {
        // console.log(res.data);
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

  const getRecords = () => {
    console.log(api_path + "/record/" + userData.id);
    axios
      .get(api_path + "/record/" + userData.id)
      .then((res) => {
        console.log(res.data);
        setRecords(res.data);
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

  const addRecord = (e) => {
    e.preventDefault();
    console.log(type);
    if (amount == 0) {
      toast.error("Please enter an amount");
      return;
    }
    console.log(category);
    if (category == "") {
      toast.error("Please select a category or create a new category");
      return;
    }

    if (type == "") {
      toast.error("please select a type (income / expense)");
      return;
    }

    axios
      .post(api_path + "/record", {
        amount: amount,
        category: category,
        type: type,
        userId: userData.id,
      })
      .then((res) => {
        console.log(res.data.record);
        fetchData();
        getRecords();
        setAmount(0);
      })
      .catch((err) => {
        console.error(
          "Error adding record:",
          err.response?.data || err.message
        );
      });
  };

  useEffect(() => {
    if (!userData) {
      toast.error("Login failed");
      navigate("/");
    } else {
      fetchData();
      getRecords();
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
            setCategory={setCategory}
            setType={setType}
            addRecord={addRecord}
            amount={amount}
            setAmount={setAmount}
          />
          {/* manage categories */}
          <CategoriesTable
            categories={categories}
            category={category}
            setCategory={setCategory}
            addCategory={addCategory}
            getAllCategories={getAllCategories}
          />
        </div>

        {/* list of records */}
        <RecordBox
          record={records}
          setRecords={setRecords}
          categories={categories}
          setCategory={setCategory}
          fetchData={fetchData}
          getRecords={getRecords}
        />
      </div>
    </div>
  );
};

export default Home;
