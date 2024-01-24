import Record from "../models/record.model.js";

//create a new record
const createRecord = async (req, res) => {
  try {
    const newRecord = new Record({
      category: req.body.category,
      type: req.body.type,
      amount: req.body.amount,
      userId: req.body.userId,
    });
    await newRecord.save();
    res.status(200).json({
      message: "created a new record",
      record: newRecord,
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

//get a list of records of a category for a user
const getRecordsByCategoryByUserId = async (req, res) => {
  try {
    const records = await Record.find({
      category: req.params.category,
      userId: req.params.userId,
    });
    res.status(200).json(records);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

//get a list of records of type for a user
const getRecordsByTypeByUser = async (req, res) => {
  try {
    const records = await Record.find({
      type: req.params.type,
      userId: req.params.userId,
    });
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

export {
  createRecord,
  getRecordsByUserId,
  getRecordsByCategoryByUserId,
  getRecordsByTypeByUser,
  deleteRecord,
};
