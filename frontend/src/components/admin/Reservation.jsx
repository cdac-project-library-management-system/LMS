import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import "bootstrap/dist/css/bootstrap.min.css";
import { Search } from "lucide-react";
import ReservationService from "../../services/ReservationService";
import BookService from "../../services/BookService";
import BorrowService from "../../services/BorrowService";
import { getUserById } from "../../services/user";

const Reservation = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [reservations, setReservations] = useState([]);
  const [page, setPage] = useState(0); // Track current page
  const [totalPages, setTotalPages] = useState(1); // Track total pages

  useEffect(() => {
    fetchReservations();
  }, []);

  const fetchReservations = async (currentPage = 0) => {
    try {
      const response = await ReservationService.getAllReservations(currentPage, 10); // Fetch paginated data
      let reservationsList = response.items || [];
      console.log(response);
      
      setTotalPages(response.totalPages || 1); // Store total pages
  
      const updatedReservations = await Promise.all(
        reservationsList.map(async (reservation) => {
          let bookTitle = "Unknown Book";
          let userName = "Unknown User";
  
          try {
            const book = await BookService.getBookById(reservation.bookId);
            if (book && book.title) {
              bookTitle = book.title;
            }
          } catch (error) {
            console.error(`Error fetching book ${reservation.bookId}:`, error);
          }
  
          try {
            const user = await getUserById(reservation.userId);
            if (user && user.fullName) {
              userName = user.fullName;
            }
          } catch (error) {
            console.error(`Error fetching user ${reservation.userId}:`, error);
          }
  
          return {
            ...reservation,
            bookTitle,
            userName,
          };
        })
      );
  
      // Sort reservations by latest date first
      updatedReservations.sort((a, b) => new Date(b.reservationDate) - new Date(a.reservationDate));
  
      setReservations(updatedReservations);
    } catch (error) {
      console.error("Error fetching reservations:", error);
    }
  };
  

  const handleApprove = async (id, userId, bookId) => {
    try {
      await ReservationService.updateReservation(id, { status: "COMPLETED" });
  
      const borrowDate = new Date().toISOString(); // Convert to ISO format
      const dueDate = new Date();
      dueDate.setDate(dueDate.getDate() + 30); // Add 30 days
      const dueDateISO = dueDate.toISOString(); // Convert to ISO format
      const status = "BORROWED";
  
      // Call Borrow Service to create a borrow record
      await BorrowService.createBorrowRecord({
        userId,
        bookId,
        borrowDate,
        dueDate: dueDateISO, // Use formatted date
        status,
      });
  
      setReservations((prev) =>
        prev.map((reservation) =>
          reservation.id === id ? { ...reservation, status: "COMPLETED" } : reservation
        )
      );
      Swal.fire("Approved!", "Reservation has been approved and borrow record created.", "success");
    } catch (error) {
      console.error("Error approving reservation:", error);
      Swal.fire("Error", "Failed to approve reservation.", "error");
    }
  };
  

  const handleCancel = async (id) => {
    try {
      await ReservationService.updateReservation(id, { status: "CANCELLED" });
      setReservations((prev) =>
        prev.map((reservation) =>
          reservation.id === id ? { ...reservation, status: "CANCELLED" } : reservation
        )
      );
      Swal.fire("Canceled!", "Reservation has been canceled.", "warning");
    } catch (error) {
      console.error("Error canceling reservation:", error);
    }
  };

  const filteredReservations = reservations.filter(
    (reservation) =>
      reservation.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      reservation.bookTitle.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-lg-9 col-md-8 col-12">
          <div className="bg-white p-4 rounded shadow-sm">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h3 className="font-weight-bold text-dark">Reservations</h3>
              <div className="d-flex">
                <input
                  type="text"
                  className="form-control me-2"
                  style={{ width: "200px" }}
                  placeholder="Search by member or book"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <span className="input-group-text bg-primary text-white">
                  <Search size={20} />
                </span>
              </div>
            </div>

            <div className="table-responsive">
            </div>
              <table className="table table-bordered table-hover">
                <thead className="table-dark">
                  <tr>
                    <th>User ID</th>
                    <th>User Name</th>
                    <th>Book Title</th>
                    <th>Reservation Date</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredReservations.map((reservation) => (
                    <tr key={reservation.id}>
                      <td>{reservation.userId}</td>
                      <td>{reservation.userName}</td>
                      <td>{reservation.bookTitle}</td>
                      <td>{reservation.reservationDate}</td>
                      <td>
                        <span
                          className={`badge ${
                            reservation.status === "PENDING"
                              ? "bg-warning text-dark"
                              : reservation.status === "COMPLETED"
                              ? "bg-success"
                              : "bg-danger"
                          }`}
                        >
                          {reservation.status}
                        </span>
                      </td>
                      <td>
                        {reservation.status === "PENDING" && (
                          <>
                            <button
                              className="btn btn-success me-2"
                              onClick={() => handleApprove(reservation.id, reservation.userId, reservation.bookId)}
                            >
                              Approve
                            </button>
                            <button
                              className="btn btn-danger"
                              onClick={() => handleCancel(reservation.id)}
                            >
                              Cancel
                            </button>
                          </>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="d-flex justify-content-between mt-3">
              <button
                className="btn btn-secondary"
                disabled={page === 0}
                onClick={() => setPage((prev) => Math.max(prev - 1, 0))}
              >
                Previous
              </button>

              <span className="align-self-center">Page {page + 1} of {totalPages}</span>

              <button
                className="btn btn-secondary"
                disabled={page >= totalPages - 1}
                onClick={() => setPage((prev) => prev + 1)}
              >
                Next
              </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reservation;
