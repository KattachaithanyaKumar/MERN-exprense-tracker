import Record from "../models/record.model.js";
import Category from "../models/category.model.js";
import User from "../models/user.model.js";

//create a new record
const createRecord = async (req, res) => {
  try {
    // Find the corresponding category ObjectId
    const categoryObjectId = await Category.findOne({
      name: req.body.category,
    }).select("_id");

    if (!categoryObjectId) {
      return res.status(400).json({ message: "Category not found" });
    }

    // Find the user by userId
    const user = await User.findById(req.body.userId);
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    // console.log(user);

    // Calculate the updated values based on the record type
    let updatedBalance = user.balance;
    let updatedTotalIncome = user.totalIncome;
    let updatedTotalExpense = user.totalExpense;

    console.log(typeof req.body.amount);

    const amount = parseFloat(req.body.amount);

    if (isNaN(amount)) {
      return res.status(400).json({ message: "Invalid amount value" });
    }

    if (req.body.type === "Income") {
      updatedBalance += amount;
      updatedTotalIncome += amount;
    } else if (req.body.type === "Expense") {
      updatedBalance -= amount;
      updatedTotalExpense += amount;
    }

    // Update the user's balance, totalIncome, and totalExpense
    await User.findByIdAndUpdate(
      req.body.userId,
      {
        // $set: {
        balance: updatedBalance,
        totalIncome: updatedTotalIncome,
        totalExpense: updatedTotalExpense,
        // },
      },
      { new: true }
    );

    const newRecord = new Record({
      category: categoryObjectId._id,
      categoryName: req.body.category,
      type: req.body.type,
      amount: req.body.amount,
      userId: req.body.userId,
    });
    await newRecord.save();

    res.status(200).json({
      message: "created a new record",
      record: newRecord,
      user: user,
    });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

//get a list of records of a user
const getRecordsByUserId = async (req, res) => {
  try {
    const records = await Record.find({ userId: req.params.id });
    res.status(200).json(records);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

//delete a record
const deleteRecord = async (req, res) => {
  try {
    const record = await Record.findByIdAndDelete(req.params.id);
    res.status(200).json({
      message: `deleted the record with the id ${req.params.id}`,
      record: record,
    });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

export { createRecord, getRecordsByUserId, deleteRecord };
