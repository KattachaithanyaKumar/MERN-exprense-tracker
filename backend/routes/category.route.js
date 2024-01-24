import { Router } from "express";
const categoryRouter = new Router();

import {
  getAllCategories,
  newCategory,
  updateCategory,
  deleteCategory,
  getAllCategoriesByUserid,
} from "../controllers/category.controller.js";

categoryRouter.get("/", getAllCategories);
categoryRouter.post("/", newCategory);
categoryRouter.get("/:id", getAllCategoriesByUserid);
categoryRouter.put("/:id", updateCategory);
categoryRouter.delete("/:id", deleteCategory);

export default categoryRouter;
