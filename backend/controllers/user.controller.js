import User from "../models/user.model.js";

const createNewUser = async (req, res) => {
  try {
    const checkUser = await User.findOne({ email: req.body.user.email });
    if (checkUser) {
      return res.status(400).send({
        message: "user already exists",
      });
    }
    const user = new User(req.body.user);
    await user.save();
    res.status(200).json({
      message: "created a new user with the data",
      data: req.body.user,
    });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).send({
      message: `fetched the user with the id ${req.params.id}`,
      user: user,
    });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).send({
      message: "fetched all users",
      users: users,
    });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const updateUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body.user, {
      new: true,
    });
    res.status(200).send({
      message: `updated the user with the id ${req.params.id}`,
      user: user,
    });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    res.status(200).send({
      message: `deleted the user with the id ${req.params.id}`,
      user: user,
    });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      res.status(404).send({ message: "user not found" });
    } else {
      if (user.password !== req.body.password) {
        res.status(401).send({ message: "invalid password" });
      }
      res.status(200).send({
        message: "login successful",
        user: user,
      });
    }
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

export {
  createNewUser,
  getUser,
  getAllUsers,
  updateUser,
  deleteUser,
  loginUser,
};
