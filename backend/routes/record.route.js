import { Router } from "express";

const recordRouter = new Router();

//import controllers
import {
  createRecord,
  getRecordsByUserId,
  getRecordsByCategoryByUserId,
  getRecordsByTypeByUser,
  deleteRecord,
} from "../controllers/record.controller.js";

recordRouter.post("/", createRecord);
recordRouter.get("/:id", getRecordsByUserId);
recordRouter.get("/:id/category", getRecordsByCategoryByUserId);
recordRouter.get("/:id/type", getRecordsByTypeByUser);
recordRouter.delete("/:id", deleteRecord);

export default recordRouter;
