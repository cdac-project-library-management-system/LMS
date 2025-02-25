import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import BookService from "../../services/BookService";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EditBookDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [formData, setFormData] = useState({
    title: "",
    isbn: "",
    description: "",
    author: "",
    copiesAvailable: "",
    coverImageUrl: "",
    categoryId: "",
  });

  const [errors, setErrors] = useState({
    title: false,
    isbn: false,
    author: false,
    categoryId: false,
    copiesAvailable: false,
  });

  useEffect(() => {
    if (id) {
      BookService.getBookById(id)
        .then((data) => {
          setFormData({
            title: data.title || "",
            isbn: data.isbn || "",
            description: data.description || "",
            author: data.author || "",
            copiesAvailable: data.copiesAvailable || "",
            coverImageUrl: data.coverImageUrl || "",
            categoryId: data.categoryId || "",
          });
        })
        .catch((error) => console.error("Error fetching book:", error));
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formErrors = {
      title: !formData.title,
      isbn: !formData.isbn,
      author: !formData.author,
      categoryId: !formData.categoryId,
      copiesAvailable: !formData.copiesAvailable,
    };

    setErrors(formErrors);

    if (Object.values(formErrors).every((val) => !val)) {
      try {
        await BookService.updateBook(id, formData);
        toast.success("Book updated successfully!", {
          position: "top-right",
          autoClose: 3000,
        });
        
        setTimeout(()=>{
          navigate(`/admin/BookDetails`);
        },4000);
      } catch (error) {
        toast.error("Failed to update book. Please try again.", {
          position: "top-right",
          autoClose: 3000,
        });
      }
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="card shadow-sm p-4 mb-5 bg-white rounded">
      <h1 className="h2 font-weight-bold mb-4 text-dark">Edit Book Details</h1>

      <ToastContainer />

      <form onSubmit={handleSubmit}>
        <div className="form-group mb-4">
          <label className="font-weight-bold text-secondary">Book Title</label>
          <input type="text" name="title" className="form-control" value={formData.title} onChange={handleInputChange} required />
          {errors.title && <small className="text-danger">Title is required.</small>}
        </div>

        <div className="form-group mb-4">
          <label className="font-weight-bold text-secondary">ISBN</label>
          <input type="text" name="isbn" className="form-control" value={formData.isbn} onChange={handleInputChange} required />
          {errors.isbn && <small className="text-danger">ISBN is required.</small>}
        </div>

        <div className="form-group mb-4">
          <label className="font-weight-bold text-secondary">Description</label>
          <textarea name="description" className="form-control" rows="3" value={formData.description} onChange={handleInputChange}></textarea>
        </div>

        <div className="form-group mb-4">
          <label className="font-weight-bold text-secondary">Author</label>
          <input type="text" name="author" className="form-control" value={formData.author} onChange={handleInputChange} required />
          {errors.author && <small className="text-danger">Author is required.</small>}
        </div>

        <div className="form-group mb-4">
          <label className="font-weight-bold text-secondary">Available Copies</label>
          <input type="text" name="copiesAvailable" className="form-control" value={formData.copiesAvailable} onChange={handleInputChange} required />
          {errors.copiesAvailable && <small className="text-danger">Available Copies are required.</small>}
        </div>

        <div className="form-group mb-4">
          <label className="font-weight-bold text-secondary">Cover Image URL</label>
          <input type="text" name="coverImageUrl" className="form-control" value={formData.coverImageUrl} onChange={handleInputChange} required />
        </div>

        <div className="form-group mb-4">
          <label className="font-weight-bold text-secondary">Category ID</label>
          <input type="text" name="categoryId" className="form-control" value={formData.categoryId} onChange={handleInputChange} required />
          {errors.categoryId && <small className="text-danger">Category ID is required.</small>}
        </div>

        <button type="submit" className="btn btn-primary btn-block">
          <i className="fas fa-save mr-2"></i> Update Book
        </button>
      </form>
    </div>
  );
};

export default EditBookDetails;
