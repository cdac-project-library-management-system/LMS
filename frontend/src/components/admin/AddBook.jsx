import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import BookService from '../../services/BookService';

const AddBook = () => {
  const [formData, setFormData] = useState({
    title: '',
    isbn: '',
    description: '',
    author: '',
    copiesAvailable: '',
    coverImageUrl: '',
    categoryId: ''
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await BookService.addBook(formData);
      toast.success("Book added successfully!", { position: "top-right", autoClose: 3000 });

      // Clear form fields after successful submission
      setFormData({
        title: '',
        isbn: '',
        description: '',
        author: '',
        copiesAvailable: '',
        coverImageUrl: '',
        categoryId: ''
      });
    } catch (err) {
      toast.error("Failed to add the book. Please try again.", { position: "top-right", autoClose: 3000 });
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="card shadow-sm p-4 mb-5 bg-white rounded">
      <h1 className="h2 font-weight-bold mb-4 text-dark">Add New Book</h1>
      
      {/* Toast Notifications */}
      <ToastContainer />

      <form onSubmit={handleSubmit}>
        <div className="form-group mb-4">
          <label className="font-weight-bold text-secondary">Book Title</label>
          <input type="text" name="title" className="form-control" value={formData.title} onChange={handleInputChange} required />
        </div>

        <div className="form-group mb-4">
          <label className="font-weight-bold text-secondary">ISBN</label>
          <input type="text" name="isbn" className="form-control" value={formData.isbn} onChange={handleInputChange} required />
        </div>

        <div className="form-group mb-4">
          <label className="font-weight-bold text-secondary">Description</label>
          <textarea name="description" className="form-control" rows="3" value={formData.description} onChange={handleInputChange}></textarea>
        </div>

        <div className="form-group mb-4">
          <label className="font-weight-bold text-secondary">Author</label>
          <input type="text" name="author" className="form-control" value={formData.author} onChange={handleInputChange} required />
        </div>
        
        <div className="form-group mb-4">
          <label className="font-weight-bold text-secondary">Available Copies</label>
          <input type="text" name="copiesAvailable" className="form-control" value={formData.copiesAvailable} onChange={handleInputChange} required />
        </div>

        <div className="form-group mb-4">
          <label className="font-weight-bold text-secondary">Cover Image URL</label>
          <input type="text" name="coverImageUrl" className="form-control" value={formData.coverImageUrl} onChange={handleInputChange} required />
        </div>

        <div className="form-group mb-4">
          <label className="font-weight-bold text-secondary">Category ID</label>
          <input type="text" name="categoryId" className="form-control" value={formData.categoryId} onChange={handleInputChange} required />
        </div>

        <button
          type="submit"
          className="btn btn-block text-white"
          disabled={loading}
          style={{backgroundColor:"#ad5b5b"}}
        >
          {loading ? "Adding..." : <><i className="fas fa-plus-circle mr-2"></i>Add Book</>}
        </button>
      </form>
    </div>
  );
};

export default AddBook;
