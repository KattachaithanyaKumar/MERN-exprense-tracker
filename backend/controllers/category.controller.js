import Category from "../models/category.model.js";

//get all the categories
const getAllCategories = (req, res) => {
  Category.find()
    .then((categories) => res.json(categories))
    .catch((err) => res.status(400).json("Error: " + err));
};

//create a new category
const newCategory = async (req, res) => {
  try {
    const check = await Category.findOne({ name: req.body.name });
    if (check) {
      return res.status(400).send({
        message: "category already exists",
      });
    }

    const newCategory = new Category({ name: req.body.name });
    await newCategory.save();
    res.status(200).json({
      message: "created a new category",
      category: newCategory,
    });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

//update a category
const updateCategory = async (req, res) => {
  try {
    const category = await Category.findByIdAndUpdate(
      req.params.id,
      { name: req.body.name },
      { new: true }
    );
    res.status(200).json({
      message: `updated the category with the id ${req.params.id}`,
      category: category,
    });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

export { getAllCategories, newCategory, updateCategory };
