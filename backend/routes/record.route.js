import { Router } from "express";

const recordRouter = new Router();

//import controllers
import {
  createRecord,
  getRecordsByUserId,
  deleteRecord,
} from "../controllers/record.controller.js";

recordRouter.post("/", createRecord);
recordRouter.get("/:id", getRecordsByUserId);
recordRouter.delete("/:id", deleteRecord);

export default recordRouter;
