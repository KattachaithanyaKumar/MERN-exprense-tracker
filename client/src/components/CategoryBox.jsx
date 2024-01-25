// CategoriesTable.js
import React, { useState } from "react";

import "../Styles/categoryTable.css";
import api_path from "../defaults/api_path";
import axios from "axios";

const CategoriesTable = ({
  categories,
  category,
  setCategory,
  addCategory,
  getAllCategories,
}) => {
  const [editMode, setEditMode] = useState(false);
  const [updatedCategory, setUpdatedCategory] = useState("");
  const [id, setID] = useState(null);

  const editCategory = (_id, name) => {
    setUpdatedCategory(name);
    console.log(_id);
    setID(_id);
    setEditMode(true);
  };

  const updateCategory = () => {
    axios
      .put(api_path + "/category/" + id, { name: updatedCategory })
      .then((res) => {
        console.log(res.data.category);
        setEditMode(false);
        setUpdatedCategory("");
        getAllCategories();
      });
  };

  return (
    <div className="categories box">
      <table>
        <h1>Categories</h1>
        <tbody>
          {categories?.map((c, i) => (
            <tr key={i}>
              <td>
                {c.name}
                <div className="cat-buttons">
                  <button onClick={() => editCategory(c._id, c.name)}>
                    Edit
                  </button>
                </div>
              </td>
            </tr>
          ))}
          <tr></tr>
        </tbody>
      </table>
      <div className="addcategory">
        {editMode ? (
          <>
            <input
              type="text"
              placeholder="add category"
              value={updatedCategory}
              onChange={(e) => setUpdatedCategory(e.target.value)}
            />
            <button onClick={updateCategory}>Update</button>
          </>
        ) : (
          <>
            <input
              type="text"
              placeholder="add category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
            <button onClick={addCategory}>add</button>
          </>
        )}
      </div>
    </div>
  );
};

export default CategoriesTable;
