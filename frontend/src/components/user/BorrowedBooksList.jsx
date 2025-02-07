import React, { useState } from "react";
import { Table, Pagination, Form, InputGroup, Badge } from "react-bootstrap";

const BorrowedBooksList = ({ booksData }) => {  // Receive booksData as prop
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortField, setSortField] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");

  const itemsPerPage = 5;

  const filteredBooks = booksData.filter(
    (book) =>
      book.title.toLowerCase().includes(search.toLowerCase()) ||
      book.author.toLowerCase().includes(search.toLowerCase()) ||
      book.status.toLowerCase().includes(search.toLowerCase())
  );

  const sortedBooks = [...filteredBooks].sort((a, b) => {
    if (!sortField) return 0;
    return sortOrder === "asc" 
      ? a[sortField] > b[sortField] ? 1 : -1 
      : a[sortField] < b[sortField] ? 1 : -1;
  });

  const totalPages = Math.ceil(sortedBooks.length / itemsPerPage);
  const paginatedBooks = sortedBooks.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page) => setCurrentPage(page);
  const handleSort = (field) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  return (
    <div className="borrowed-books-container p-4">
      <h2 className="text-center text-primary mb-4">📚 Borrowed Books</h2>
      <InputGroup className="mb-3">
        <Form.Control
          type="text"
          placeholder="Search by title, author, or status..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </InputGroup>
      <Table striped bordered hover responsive className="text-center shadow-sm">
        <thead className="bg-primary text-white">
          <tr>
            <th>No.</th>
            <th onClick={() => handleSort("title")} style={{ cursor: "pointer" }}>Book Title ⬍</th>
            <th onClick={() => handleSort("author")} style={{ cursor: "pointer" }}>Author ⬍</th>
            <th onClick={() => handleSort("dueDate")} style={{ cursor: "pointer" }}>Due Date ⬍</th>
            <th onClick={() => handleSort("status")} style={{ cursor: "pointer" }}>Status ⬍</th>
          </tr>
        </thead>
        <tbody>
          {paginatedBooks.length > 0 ? (
            paginatedBooks.map((book, index) => (
              <tr key={book.id}>
                <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>
                <td>{book.title}</td>
                <td>{book.author}</td>
                <td>{book.dueDate}</td>
                <td>
                  <Badge
                    bg={book.status === "Overdue" ? "danger" : book.status === "Borrowed" ? "warning" : "success"}
                  >
                    {book.status}
                  </Badge>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center text-muted">
                No books found.
              </td>
            </tr>
          )}
        </tbody>
      </Table>

      <Pagination className="justify-content-center">
        <Pagination.Prev disabled={currentPage === 1} onClick={() => handlePageChange(currentPage - 1)} />
        {[...Array(totalPages)].map((_, index) => (
          <Pagination.Item key={index} active={index + 1 === currentPage} onClick={() => handlePageChange(index + 1)}>
            {index + 1}
          </Pagination.Item>
        ))}
        <Pagination.Next disabled={currentPage === totalPages} onClick={() => handlePageChange(currentPage + 1)} />
      </Pagination>
    </div>
  );
};

export default BorrowedBooksList;
