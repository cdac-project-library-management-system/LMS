// components/BookForm.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddBook = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    publishDate: '',
    category: '',
    author: '',
    publisher: '',
    image: null
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    navigate('/');
  };

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: files ? files[0] : value
    }));
  };

  return (
    <div className="card shadow-sm p-4 mb-5 bg-white rounded">
      <h1 className="h2 font-weight-bold mb-4 text-dark">Add New Book</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group mb-4">
          <label className="font-weight-bold text-secondary">Book Title</label>
          <input
            type="text"
            name="title"
            className="form-control"
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group mb-4">
          <label className="font-weight-bold text-secondary">Description</label>
          <textarea
            name="description"
            className="form-control"
            rows="3"
            onChange={handleInputChange}
          ></textarea>
        </div>

        <div className="form-group mb-4">
          <label className="font-weight-bold text-secondary">Publish Date</label>
          <input
            type="date"
            name="publishDate"
            className="form-control"
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group mb-4">
          <label className="font-weight-bold text-secondary">Category</label>
          <select
            name="category"
            className="form-control"
            onChange={handleInputChange}
            required
          >
            <option value="">Select Category</option>
            <option value="fiction">Fiction</option>
            <option value="non-fiction">Non-Fiction</option>
          </select>
        </div>

        <div className="form-group mb-4">
          <label className="font-weight-bold text-secondary">Author</label>
          <select
            name="author"
            className="form-control"
            onChange={handleInputChange}
            required
          >
            <option value="">Select Author</option>
            <option value="author1">Author 1</option>
            <option value="author2">Author 2</option>
          </select>
        </div>

        <div className="form-group mb-4">
          <label className="font-weight-bold text-secondary">Publisher</label>
          <select
            name="publisher"
            className="form-control"
            onChange={handleInputChange}
            required
          >
            <option value="">Select Publisher</option>
            <option value="publisher1">Publisher 1</option>
            <option value="publisher2">Publisher 2</option>
          </select>
        </div>

        <div className="form-group mb-4">
          <label className="font-weight-bold text-secondary">Image</label>
          <div className="custom-file">
            <input
              type="file"
              name="image"
              className="custom-file-input"
              onChange={handleInputChange}
              accept="image/*"
            />
            <label className="custom-file-label">Choose file</label>
          </div>
        </div>

        <button
          type="submit"
          className="btn btn-primary btn-block"
        >
          <i className="fas fa-plus-circle mr-2"></i>Add Book
        </button>
      </form>
    </div>
  );
};

export default AddBook;