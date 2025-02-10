import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ReturnBook = () => {
  // Navigate hook for routing after form submission
  const navigate = useNavigate();

  // State to hold the form data
  const [formData, setFormData] = useState({
    userId: '',
    bookId: '',
    returnDate: ''
  });

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Book returned:', formData);
    navigate('/books');
  };

  // Handle input changes and update form data
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <div className="card shadow-lg p-4 mb-5 bg-white rounded">
            <h1 className="h3 font-weight-bold mb-4 text-dark">Return Book</h1>

            <form onSubmit={handleSubmit}>
              {/* User ID Input Field */}
              <div className="form-group mb-4">
                <label className="font-weight-bold text-secondary">User ID</label>
                <input
                  type="text"
                  name="userId"
                  className="form-control"
                  onChange={handleInputChange}
                  value={formData.userId}
                  required
                />
              </div>

              {/* Book ID Input Field */}
              <div className="form-group mb-4">
                <label className="font-weight-bold text-secondary">Book ID</label>
                <input
                  type="text"
                  name="bookId"
                  className="form-control"
                  onChange={handleInputChange}
                  value={formData.bookId}
                  required
                />
              </div>

              {/* Return Date Input Field */}
              <div className="form-group mb-4">
                <label className="font-weight-bold text-secondary">Return Date</label>
                <input
                  type="date"
                  name="returnDate"
                  className="form-control"
                  onChange={handleInputChange}
                  value={formData.returnDate}
                  required
                />
              </div>

              {/* Submit Button */}
              <button type="submit" className="btn btn-primary btn-block">
                <i className="fas fa-undo mr-2"></i> Return Book
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReturnBook;
