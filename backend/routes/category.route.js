import { Router } from "express";
const categoryRouter = new Router();

import {
  getAllCategories,
  newCategory,
  updateCategory,
} from "../controllers/category.controller.js";

categoryRouter.get("/", getAllCategories);
categoryRouter.post("/", newCategory);
categoryRouter.put("/:id", updateCategory);

export default categoryRouter;
