import { Router } from "express";

const userRouter = new Router();

//conrtroller functions
import {
  createNewUser,
  getUser,
  getAllUsers,
  updateUser,
  deleteUser,
} from "../controllers/user.controller.js";

//create a new user
userRouter.post("/", createNewUser);

//get a user
userRouter.get("/:id", getUser);

//get all users
userRouter.get("/", getAllUsers);

//update a user
userRouter.put("/:id", updateUser);

//delete a user
userRouter.delete("/:id", deleteUser);

export default userRouter;
