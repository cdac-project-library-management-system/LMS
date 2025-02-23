import React, { useEffect, useState } from "react";
import CategoryService from "../../services/Category";

const CategoryTable = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
        try {
          const response = await CategoryService.getAllCategories();
          setCategories(Array.isArray(response) ? response : []); // Ensure it's an array
        } catch (error) {
          console.error("Error fetching categories:", error);
          setCategories([]); // Set empty array on failure
        }
      };
      
    fetchCategories();
  }, []);

  return (
    <div className="card p-3" style={{ borderRadius: "10px", backgroundColor: "#f8f9fa" }}>
      <h5 className="text-center mb-3 text-dark">Categories</h5>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>
          {categories.length > 0 ? (
            categories.map((category) => (
              <tr key={category.id}>
                <td>{category.id}</td>
                <td>{category.name}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="2" className="text-center">No Categories Found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default CategoryTable;
