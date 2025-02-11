import React, { useState } from "react";
import Swal from "sweetalert2"; // Import SweetAlert2
import "bootstrap/dist/css/bootstrap.min.css";

const BooksDetails = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [books, setBooks] = useState([
    { 
      id: 1, 
      title: "The Adventure Begins 2", 
      author: "Author D", 
      category: "test category", 
      price: "19.99", 
      publisher: "Publisher W", 
      publicationDate: "2024-01-15" 
    },
    { 
      id: 2, 
      title: "The Scientist's Journey", 
      author: "Author Z", 
      category: "test", 
      price: "29.99", 
      publisher: "Publisher V", 
      publicationDate: "2023-12-05" 
    },
    { 
      id: 3, 
      title: "The Magic Realm", 
      author: "Author Z", 
      category: "Fiction", 
      price: "25.99", 
      publisher: "Publisher Y", 
      publicationDate: "2024-03-10" 
    },
    { 
      id: 4, 
      title: "Finance vol 2", 
      author: "Author B", 
      category: "Biography", 
      price: "15.99", 
      publisher: "Publisher Z", 
      publicationDate: "2024-08-16" 
    }
  ]);

  // Filter books based on search query
  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    book.author.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Show a confirmation popup using SweetAlert2 before deleting
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

  // Delete book if confirmed
  const handleDelete = (id) => {
    setBooks(books.filter((book) => book.id !== id));
    Swal.fire("Deleted!", "The book has been deleted.", "success");
  };

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-lg-9 col-md-8 col-12">
          <div className="bg-white p-4 rounded shadow-sm">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h3 className="font-weight-bold text-dark">Books</h3>
              <div className="d-flex">
                <input
                  type="text"
                  className="form-control mr-2"
                  style={{ width: "200px" }} // Inline style for width adjustment
                  placeholder="Search by title or author"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button className="btn btn-primary">Search</button>
              </div>
            </div>

            <div className="table-responsive">
              <table className="table table-bordered table-hover">
                <thead className="table-dark">
                  <tr>
                    <th>Title</th>
                    <th>Author</th>
                    <th>Category</th>
                    <th>Price</th>
                    <th>Publisher</th>
                    <th>Publication Date</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredBooks.map((book) => (
                    <tr key={book.id}>
                      <td>{book.title}</td>
                      <td>{book.author}</td>
                      <td>{book.category}</td>
                      <td>{book.price}</td>
                      <td>{book.publisher}</td>
                      <td>{book.publicationDate}</td>
                      <td>
                        {/* Increased space for Edit button */}
                        <button className="btn btn-warning me-4 p-2 px-3">Edit</button>
                          
                        {/* Delete button now correctly references book.id and book.title */}
                        <button 
                          className="btn btn-danger p-2 px-3" 
                          onClick={() => confirmDelete(book.id, book.title)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-4 text-center">
              <button className="btn btn-success">Add New Book</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BooksDetails;
