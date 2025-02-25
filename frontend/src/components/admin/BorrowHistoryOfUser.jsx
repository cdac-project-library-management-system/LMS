import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BorrowService from "../../services/BorrowService";
import BookService from "../../services/BookService";

const BorrowedHistory = () => {
  const { userId } = useParams();
  const [borrowRecords, setBorrowRecords] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [loadingRecord, setLoadingRecord] = useState(null); // Track the record being updated
  const pageSize = 10;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await BorrowService.getBorrowRecordsByUser(userId, currentPage, pageSize);
        const records = Array.isArray(response.items) ? response.items : response.items?.content || [];

        // Fetch book titles for each record
        const updatedRecords = await Promise.all(
          records.map(async (record) => {
            const book = await BookService.getBookById(record.bookId);
            return { ...record, bookName: book.title };
          })
        );

        setBorrowRecords(updatedRecords);
      } catch (error) {
        console.error("Error fetching borrowed history:", error);
        setBorrowRecords([]);
      }
    };

    fetchData();
  }, [userId, currentPage]);

  // Handle book return
  const handleReturn = async (recordId) => {
    try {
      setLoadingRecord(recordId); // Indicate which record is being updated
      await BorrowService.updateBorrowRecord(recordId, { status: "RETURNED" });

      // Update UI without refetching everything
      setBorrowRecords((prevRecords) =>
        prevRecords.map((record) =>
          record.id === recordId ? { ...record, status: "RETURNED" } : record
        )
      );
    } catch (error) {
      console.error("Error updating borrow record:", error);
    } finally {
      setLoadingRecord(null);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Borrowed History</h2>
      <table className="table table-bordered text-center">
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Book Name</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {borrowRecords.length > 0 ? (
            borrowRecords.map((record) => (
              <tr key={record.id}>
                <td>{record.id}</td>
                <td>{record.bookName}</td>
                <td>
                  <span
                    className={`badge ${
                      record.status === "RETURNED"
                        ? "bg-success"
                        : record.status === "CANCELLED"
                        ? "bg-danger"
                        : "bg-warning"
                    }`}
                  >
                    {record.status}
                  </span>
                </td>
                <td>
                  {record.status !== "RETURNED" ? (
                    <button
                      className="btn btn-primary"
                      onClick={() => handleReturn(record.id)}
                      disabled={loadingRecord === record.id}
                    >
                      {loadingRecord === record.id ? "Processing..." : "Return"}
                    </button>
                  ) : (
                    <button className="btn btn-success" disabled>
                      Returned
                    </button>
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">No records found</td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <div className="d-flex justify-content-between mt-3">
        <button
          className="btn btn-secondary"
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 0))}
          disabled={currentPage === 0}
        >
          Previous
        </button>
        <button
          className="btn btn-secondary"
          onClick={() => setCurrentPage((prev) => prev + 1)}
          disabled={borrowRecords.length < pageSize}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default BorrowedHistory;
