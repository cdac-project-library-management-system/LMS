import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const EditBookDetails = ({ initialData }) => {
  const navigate = useNavigate();

  // Initialize form data dynamically based on props
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    publishDate: '',
    category: '',
    author: '',
    publisher: '',
    image: '',
    imageFile: null,
  });

  const [imageName, setImageName] = useState('');
  const [errors, setErrors] = useState({
    title: false,
    publishDate: false,
    category: false,
    author: false,
    publisher: false,
  });

  // Update state if initialData is provided
  useEffect(() => {
    if (initialData) {
      setFormData((prev) => ({
        ...prev,
        ...initialData,
      }));

      // Set image name if initialData contains an image
      if (initialData.image) {
        setImageName('Existing Image');
      }
    }
  }, [initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic form validation
    const formErrors = {
      title: !formData.title,
      publishDate: !formData.publishDate,
      category: !formData.category,
      author: !formData.author,
      publisher: !formData.publisher,
    };

    setErrors(formErrors);

    if (Object.values(formErrors).every((val) => !val)) {
      console.log('Form submitted:', formData);
      navigate('/');
    }
  };

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      const file = files[0];
      setFormData((prev) => ({
        ...prev,
        image: URL.createObjectURL(file),
        imageFile: file,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  return (
    <div className="card shadow-sm p-4 mb-5 bg-white rounded">
      <h1 className="h2 font-weight-bold mb-4 text-dark">Edit Book Details</h1>
      <form onSubmit={handleSubmit}>
        {/* Title */}
        <div className="form-group mb-4">
          <label htmlFor="title" className="font-weight-bold text-secondary">
            Book Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            className="form-control"
            value={formData.title}
            onChange={handleInputChange}
            required
          />
          {errors.title && (
            <small className="text-danger">Title is required.</small>
          )}
        </div>

        {/* Description */}
        <div className="form-group mb-4">
          <label htmlFor="description" className="font-weight-bold text-secondary">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            className="form-control"
            rows="3"
            value={formData.description}
            onChange={handleInputChange}
          />
        </div>

        {/* Publish Date */}
        <div className="form-group mb-4">
          <label htmlFor="publishDate" className="font-weight-bold text-secondary">
            Publish Date
          </label>
          <input
            type="date"
            id="publishDate"
            name="publishDate"
            className="form-control"
            value={formData.publishDate}
            onChange={handleInputChange}
            required
          />
          {errors.publishDate && (
            <small className="text-danger">Publish date is required.</small>
          )}
        </div>

        {/* Category */}
        <div className="form-group mb-4">
          <label htmlFor="category" className="font-weight-bold text-secondary">
            Category
          </label>
          <select
            id="category"
            name="category"
            className="custom-select"
            value={formData.category}
            onChange={handleInputChange}
            required
          >
            <option value="">Select Category</option>
            <option value="fiction">Fiction</option>
            <option value="non-fiction">Non-Fiction</option>
          </select>
          {errors.category && (
            <small className="text-danger">Category is required.</small>
          )}
          <div className="mt-2">
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => console.log('Add new category')}
            >
              Add New Category
            </button>
          </div>
        </div>

        {/* Author */}
        <div className="form-group mb-4">
          <label htmlFor="author" className="font-weight-bold text-secondary">
            Author
          </label>
          <select
            id="author"
            name="author"
            className="custom-select"
            value={formData.author}
            onChange={handleInputChange}
            required
          >
            <option value="">Select Author</option>
            <option value="author1">Author 1</option>
            <option value="author2">Author 2</option>
          </select>
          {errors.author && (
            <small className="text-danger">Author is required.</small>
          )}
          <div className="mt-2">
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => console.log('Add new author')}
            >
              Add New Author
            </button>
          </div>
        </div>

        {/* Publisher */}
        <div className="form-group mb-4">
          <label htmlFor="publisher" className="font-weight-bold text-secondary">
            Publisher
          </label>
          <select
            id="publisher"
            name="publisher"
            className="custom-select"
            value={formData.publisher}
            onChange={handleInputChange}
            required
          >
            <option value="">Select Publisher</option>
            <option value="publisher1">Publisher 1</option>
            <option value="publisher2">Publisher 2</option>
          </select>
          {errors.publisher && (
            <small className="text-danger">Publisher is required.</small>
          )}
          <div className="mt-2">
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => console.log('Add new publisher')}
            >
              Add New Publisher
            </button>
          </div>
        </div>

        {/* Image */}
        <div className="form-group mb-4">
          <label htmlFor="image" className="font-weight-bold text-secondary">
            Image
          </label>
          <div className="custom-file">
            <input
              type="file"
              id="image"
              name="image"
              className="custom-file-input"
              onChange={handleInputChange}
              accept="image/*"
            />
            <label className="custom-file-label">
              {imageName ? imageName : ''}
            </label>
          </div>
          {formData.image && (
            <img
              src={formData.image}
              alt="Book cover"
              className="img-thumbnail mt-2"
              style={{ width: '100px', height: '150px' }}
            />
          )}
        </div>

        {/* Submit Button */}
        <button type="submit" className="btn btn-primary btn-block">
          <i className="fas fa-save mr-2"></i>Update Book
        </button>
      </form>
    </div>
  );
};

export default EditBookDetails;
