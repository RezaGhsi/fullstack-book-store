import { useState } from "react";
import { useCategory } from "../context/CategoryContext";

const Category = () => {
  const { categories, loading, createCategory } = useCategory();
  const [categoryName, setCategoryName] = useState("");

  const handleSubmit = (name) => {
    createCategory(name);
    setCategoryName("");
  };

  return (
    <div>
      <div>
        <input
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
          type="text"
          className="border-2"
        />
        <button
          onClick={() => handleSubmit(categoryName)}
          type="submit"
          className="p-3 bg-blue-500 text-white rounded-xl m-4 cursor-pointer shadow-md active:bg-blue-300 shadow-black active:shadow-inner "
        >
          ساخت دسته بندی
        </button>
      </div>
      <div className="text-4xl">
        {loading ? (
          <h1>Loading...</h1>
        ) : (
          categories.map((category, i) => <h1 key={i}>{category.name}</h1>)
        )}
      </div>
    </div>
  );
};
export default Category;
