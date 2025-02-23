import React, { useState } from "react";
import Swal from "sweetalert2"; // SweetAlert for confirmation popups
import "bootstrap/dist/css/bootstrap.min.css";
import { Search } from "lucide-react";

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
      status: "PENDING",
    },
    {
      id: 3,
      member: "Emily Johnson",
      book: "To Kill a Mockingbird",
      reservationDate: "2025-02-10",
      status: "PENDING",
    },
    {
      id: 4,
      member: "Michael Brown",
      book: "The Catcher in the Rye",
      reservationDate: "2025-02-12",
      status: "PENDING",
    },
    {
      id: 5,
      member: "Sarah Davis",
      book: "Pride and Prejudice",
      reservationDate: "2025-02-15",
      status: "PENDING",
    },
    {
      id: 6,
      member: "David Wilson",
      book: "Moby Dick",
      reservationDate: "2025-02-18",
      status: "PENDING",
    },
    {
      id: 7,
      member: "Emma Martinez",
      book: "War and Peace",
      reservationDate: "2025-02-20",
      status: "PENDING",
    },
    {
      id: 8,
      member: "James Anderson",
      book: "The Hobbit",
      reservationDate: "2025-02-22",
      status: "PENDING",
    },
  ]);

  // Filter reservations based on search query
  const filteredReservations = reservations.filter(
    (reservation) =>
      reservation.member.toLowerCase().includes(searchQuery.toLowerCase()) ||
      reservation.book.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Handle approving a reservation (set status to APPROVED permanently)
  const handleApprove = (id) => {
    setReservations(
      reservations.map((reservation) =>
        reservation.id === id ? { ...reservation, status: "APPROVED" } : reservation
      )
    );
    Swal.fire("Approved!", "Reservation has been approved.", "success");
  };

  // Handle canceling a reservation (set status to CANCELED permanently)
  const handleCancel = (id) => {
    setReservations(
      reservations.map((reservation) =>
        reservation.id === id ? { ...reservation, status: "CANCELED" } : reservation
      )
    );
    Swal.fire("Canceled!", "Reservation has been canceled.", "warning");
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
                 <span className="input-group-text bg-primary text-white">
                                              <Search size={20} />
                                            </span>
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
                        <span
                          className={`badge ${
                            reservation.status === "PENDING"
                              ? "bg-warning text-dark"
                              : reservation.status === "APPROVED"
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
