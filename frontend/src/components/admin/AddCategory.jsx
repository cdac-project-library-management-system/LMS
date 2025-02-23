import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CategoryService from "../../services/Category";

const AddCategoryForm = () => {
  const [category, setCategory] = useState({ name: "", description: "" });

  const handleChange = (e) => {
    setCategory({ ...category, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await CategoryService.addCategory(category);
      toast.success("Category added successfully!", { position: "top-right", autoClose: 3000 });

      // Reset form after success
      setCategory({ name: "", description: "" });
    } catch (error) {
      toast.error("Failed to add category. Try again!", { position: "top-right", autoClose: 3000 });
      console.error("Error adding category:", error);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "20vh" }}>
      <ToastContainer />
      <div className="card p-4 mt-3" style={{ borderRadius: "10px", width: "400px" }}>
        <h3 className="text-center mb-3">Add New Category</h3>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Category Name</label>
            <input
              type="text"
              className="form-control"
              name="name"
              value={category.name}
              onChange={handleChange}
              placeholder="Enter category name"
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Description</label>
            <textarea
              className="form-control"
              name="description"
              value={category.description}
              onChange={handleChange}
              placeholder="Enter category description"
              rows="3"
              required
            />
          </div>

          <button type="submit" className="btn w-100" style={{ backgroundColor: "#ad5b5b", color: "white" }}>
            Add Category
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddCategoryForm;
