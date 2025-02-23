import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import BookService from '../../services/BookService'; // Import BookService

const EditBookDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // Get bookId from URL params

  // Initialize form data
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

  // Fetch book details by ID when the component mounts
  useEffect(() => {
    if (id) {
      BookService.getBookById(id)
        .then((data) => {
          setFormData({
            title: data.title || '',
            description: data.description || '',
            publishDate: data.publishDate || '',
            category: data.category || '',
            author: data.author || '',
            publisher: data.publisher || '',
            image: data.image || '',
            imageFile: null,
          });

          if (data.image) {
            setImageName('Existing Image');
          }
        })
        .catch((error) => console.error('Error fetching book:', error));
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Basic validation
    const formErrors = {
      title: !formData.title,
      publishDate: !formData.publishDate,
      category: !formData.category,
      author: !formData.author,
      publisher: !formData.publisher,
    };
  
    setErrors(formErrors);
  
    if (Object.values(formErrors).every((val) => !val)) {
      try {
        await BookService.updateBook(id, formData); // ✅ Call updateBook API
        console.log("Book updated successfully");
        navigate("/"); // ✅ Redirect after update
      } catch (error) {
        console.error("Error updating book:", error);
      }
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
        </div>

        {/* Author */}
        <div className="form-group mb-4">
          <label htmlFor="author" className="font-weight-bold text-secondary">
            Author
          </label>
          <input
            type="text"
            id="author"
            name="author"
            className="form-control"
            value={formData.author}
            onChange={handleInputChange}
            required
          />
          {errors.author && (
            <small className="text-danger">Author is required.</small>
          )}
        </div>

        {/* Publisher */}
        <div className="form-group mb-4">
          <label htmlFor="publisher" className="font-weight-bold text-secondary">
            Publisher
          </label>
          <input
            type="text"
            id="publisher"
            name="publisher"
            className="form-control"
            value={formData.publisher}
            onChange={handleInputChange}
            required
          />
          {errors.publisher && (
            <small className="text-danger">Publisher is required.</small>
          )}
        </div>

        {/* Image */}
        <div className="form-group mb-4">
          <label htmlFor="image" className="font-weight-bold text-secondary">
            Image
          </label>
          <input
            type="file"
            id="image"
            name="image"
            className="form-control-file"
            onChange={handleInputChange}
            accept="image/*"
          />
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
