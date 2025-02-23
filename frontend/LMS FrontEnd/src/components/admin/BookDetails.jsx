import React, { useState, useEffect } from "react";
import Swal from "sweetalert2"; // Import SweetAlert2
import "bootstrap/dist/css/bootstrap.min.css";
import { Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import BookService from "../../services/BookService"; // Import BookService
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const BooksDetails = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [books, setBooks] = useState([]); // Ensure it's initialized as an array
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Fetch books from backend on component mount
  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    setLoading(true);
    try {
      const response = await BookService.getAllBooks();
      
      // console.log("Full Response Object:", response);  
      // Safe check before accessing "items"
      if (response) {
        setBooks(response); // Correctly extract books from "items"
      } else {
        console.error("Unexpected response structure:", response);
        toast.error("Unexpected response format from API", { position: "top-right", autoClose: 3000 });
        setBooks([]); // Ensure books is always an array
      }
    } catch (error) {
      console.error("Error fetching books:", error.message);
      toast.error("Failed to fetch books!", { position: "top-right", autoClose: 3000 });
      setBooks([]); // Ensure books is always an array on error
    } finally {
      setLoading(false);
    }
  };
  
  
  
  // Ensure books is always an array before filtering
  const filteredBooks = Array.isArray(books)
    ? books.filter(
        (book) =>
          book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          book.author.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  const handleEdit = (id) => {
    navigate(`/admin/EditBook/${id}`);
  };

  // Show confirmation popup before deleting
  const confirmDelete = (id, title) => {
    Swal.fire({
      title: `Are you sure?`,
      text: `Do you want to delete the book "${title}"?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc3545",
      cancelButtonColor: "#6c757d",
      confirmButtonText: "Yes, Delete!"
    }).then((result) => {
      if (result.isConfirmed) {
        handleDelete(id);
      }
    });
  };

  // Delete book and update the list
  const handleDelete = async (id) => {
    try {
      await BookService.deleteBook(id);
      setBooks(books.filter((book) => book.id !== id));
      toast.success("Book deleted successfully!", { position: "top-right", autoClose: 3000 });
    } catch (error) {
      toast.error("Failed to delete the book!", { position: "top-right", autoClose: 3000 });
    }
  };

  return (
    <div className="container mt-4">
      <ToastContainer /> {/* Toast container for notifications */}
      <div className="row">
        <div className="col-lg-9 col-md-8 col-12">
          <div className="bg-white p-4 rounded shadow-sm">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h3 className="font-weight-bold text-dark">Books</h3>
              <div className="d-flex">
                <input
                  type="text"
                  className="form-control mr-2"
                  style={{ width: "200px" }}
                  placeholder="Search by title or author"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <span className="input-group-text bg-primary text-white">
                  <Search size={20} />
                </span>
              </div>
            </div>

            {loading ? (
              <p>Loading books...</p>
            ) : (
              <div className="table-responsive">
                <table className="table table-bordered table-hover">
                  <thead className="table-dark">
                    <tr>
                      <th>Title</th>
                      <th>Author</th>
                      <th>Category</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredBooks.length > 0 ? (
                      filteredBooks.map((book) => (
                        <tr key={book.id}>
                          <td>{book.title}</td>
                          <td>{book.author}</td>
                          <td>{book.category}</td>
                          <td>
                            <button className="btn btn-warning me-4 p-2 px-3" onClick={() => handleEdit(book.id)}>
                              Edit
                            </button>
                            <button className="btn btn-danger p-2 px-3" onClick={() => confirmDelete(book.id, book.title)}>
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="7" className="text-center">
                          No books found.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BooksDetails;
