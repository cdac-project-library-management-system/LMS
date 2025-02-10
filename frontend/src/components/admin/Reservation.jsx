import React, { useState } from "react";
import Swal from "sweetalert2"; // SweetAlert for confirmation popups
import "bootstrap/dist/css/bootstrap.min.css";

const Reservation = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [reservations, setReservations] = useState([
    {
      id: 1,
      member: "John Doe",
      book: "The Great Gatsby",
      reservationDate: "2025-02-05",
      status: "PENDING",
    },
    {
      id: 2,
      member: "Jane Smith",
      book: "1984",
      reservationDate: "2025-02-08",
      status: "APPROVED",
    },
  ]);

  const [newReservation, setNewReservation] = useState({
    member: "",
    book: "",
    reservationDate: "",
    status: "PENDING",
  });

  // Filter reservations based on search query
  const filteredReservations = reservations.filter(
    (reservation) =>
      reservation.member.toLowerCase().includes(searchQuery.toLowerCase()) ||
      reservation.book.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Handle input changes for adding new reservations
  const handleInputChange = (e) => {
    setNewReservation({ ...newReservation, [e.target.name]: e.target.value });
  };

  // Add a new reservation
  const handleAddReservation = () => {
    if (!newReservation.member || !newReservation.book || !newReservation.reservationDate) {
      Swal.fire("Error", "All fields are required!", "error");
      return;
    }

    setReservations([...reservations, { id: reservations.length + 1, ...newReservation }]);
    setNewReservation({ member: "", book: "", reservationDate: "", status: "PENDING" });

    Swal.fire("Success", "Reservation added successfully!", "success");
  };

  // Confirm and delete a reservation
  const confirmDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This will delete the reservation permanently.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc3545",
      cancelButtonColor: "#6c757d",
      confirmButtonText: "Yes, Delete!",
    }).then((result) => {
      if (result.isConfirmed) {
        setReservations(reservations.filter((reservation) => reservation.id !== id));
        Swal.fire("Deleted!", "The reservation has been removed.", "success");
      }
    });
  };

  // Handle reservation status change
  const handleStatusChange = (id, newStatus) => {
    setReservations(
      reservations.map((reservation) =>
        reservation.id === id ? { ...reservation, status: newStatus } : reservation
      )
    );
    Swal.fire("Updated!", "Reservation status updated.", "success");
  };

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
                <button className="btn btn-primary">Search</button>
              </div>
            </div>

            {/* Reservation Table */}
            <div className="table-responsive">
              <table className="table table-bordered table-hover">
                <thead className="table-dark">
                  <tr>
                    <th>Member</th>
                    <th>Book</th>
                    <th>Reservation Date</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredReservations.map((reservation) => (
                    <tr key={reservation.id}>
                      <td>{reservation.member}</td>
                      <td>{reservation.book}</td>
                      <td>{reservation.reservationDate}</td>
                      <td>
                        <select
                          className="form-select"
                          value={reservation.status}
                          onChange={(e) => handleStatusChange(reservation.id, e.target.value)}
                        >
                          <option value="PENDING">PENDING</option>
                          <option value="APPROVED">APPROVED</option>
                          <option value="CANCELED">CANCELED</option>
                        </select>
                      </td>
                      <td>
                        <button
                          className="btn btn-danger px-3"
                          onClick={() => confirmDelete(reservation.id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Add New Reservation */}
            <div className="mt-4">
              <h4 className="text-dark">Add New Reservation</h4>
              <div className="row">
                <div className="col-md-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Member Name"
                    name="member"
                    value={newReservation.member}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="col-md-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Book Name"
                    name="book"
                    value={newReservation.book}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="col-md-3">
                  <input
                    type="date"
                    className="form-control"
                    name="reservationDate"
                    value={newReservation.reservationDate}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="col-md-3">
                  <button className="btn btn-success w-100" onClick={handleAddReservation}>
                    Add Reservation
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Reservation;
