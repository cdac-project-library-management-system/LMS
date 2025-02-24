import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import "bootstrap/dist/css/bootstrap.min.css";
import { Search } from "lucide-react";
import ReservationService from "../../services/ReservationService";
import BookService from "../../services/BookService";
import {getUserById} from "../../services/user";

const Reservation = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    fetchReservations();
  }, []);

  const fetchReservations = async () => {
    try {
      const response = await ReservationService.getAllReservations();
      const reservationsList = response.items || [];
  
      // Fetch book and user details for each reservation
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
  
      setReservations(updatedReservations);
    } catch (error) {
      console.error("Error fetching reservations:", error);
    }
  };
  

  const handleApprove = async (id) => {
    try {
      await ReservationService.updateReservation(id, { status: "COMPLETED" });
      setReservations((prev) =>
        prev.map((reservation) =>
          reservation.id === id ? { ...reservation, status: "COMPLETED" } : reservation
        )
      );
      Swal.fire("Approved!", "Reservation has been approved.", "success");
    } catch (error) {
      console.error("Error approving reservation:", error);
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
                      <td>{reservation.userName}</td> {/* Display User Name */}
                      <td>{reservation.bookTitle}</td> {/* Display Book Title */}
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
                              onClick={() => handleApprove(reservation.id)}
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reservation;
