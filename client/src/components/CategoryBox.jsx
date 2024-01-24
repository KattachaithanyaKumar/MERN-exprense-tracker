// CategoriesTable.js
import React from "react";

import "../Styles/categoryTable.css";

const CategoriesTable = ({
  categories,
  category,
  setCategory,
  addCategory,
}) => {
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
                  <button>update</button>
                  <button>delete</button>
                </div>
              </td>
            </tr>
          ))}
          <tr></tr>
        </tbody>
      </table>
      <div className="addcategory">
        <input
          type="text"
          placeholder="add category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
        <button onClick={addCategory}>add</button>
      </div>
    </div>
  );
};

export default CategoriesTable;
