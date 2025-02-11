// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// // import AddBookPage from './pages/AddBookPage';
// // import EditBookDetailsPage from './pages/EditBookDetailsPage';
// // import BookDetails from './components/BookDetails';
// import Reservation from './components/Reservation';

// function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<Reservation />} />
//         {/* Add other routes here */}
//       </Routes>
//     </Router>
//   );
// }

// export default App;



import React, { useState } from "react";
import Swal from "sweetalert2";
import "bootstrap/dist/css/bootstrap.min.css";

const Fine = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [fines, setFines] = useState([
    {
      id: 1,
      member: "John Doe",
      transactionId: "TXN123",
      amount: 15.0,
      paid: false,
      dueDate: "2025-02-15",
      returnDate: "2025-02-10",
      daysLate: 5,
    },
    {
      id: 2,
      member: "Jane Smith",
      transactionId: "TXN124",
      amount: 25.0,
      paid: true,
      dueDate: "2025-02-12",
      returnDate: "2025-02-05",
      daysLate: 7,
    },
  ]);

  // Filter fines based on search query
  const filteredFines = fines.filter(
    (fine) =>
      fine.member.toLowerCase().includes(searchQuery.toLowerCase()) ||
      fine.transactionId.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Handle marking a fine as paid
  const handleMarkAsPaid = (id) => {
    setFines(
      fines.map((fine) =>
        fine.id === id ? { ...fine, paid: true } : fine
      )
    );
    Swal.fire("Success!", "Fine has been marked as paid.", "success");
  };

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-lg-9 col-md-8 col-12">
          <div className="bg-white p-4 rounded shadow-sm">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h3 className="font-weight-bold text-dark">Fines</h3>
              <div className="d-flex">
                <input
                  type="text"
                  className="form-control me-2"
                  style={{ width: "200px" }}
                  placeholder="Search by member or transaction"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button className="btn btn-primary">Search</button>
              </div>
            </div>

            {/* Fine Table */}
            <div className="table-responsive">
              <table className="table table-bordered table-hover">
                <thead className="table-dark">
                  <tr>
                    <th>Member</th>
                    <th>Transaction ID</th>
                    <th>Amount ($)</th>
                    <th>Due Date</th>
                    <th>Return Date</th>
                    <th>Days Late</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredFines.map((fine) => (
                    <tr key={fine.id}>
                      <td>{fine.member}</td>
                      <td>{fine.transactionId}</td>
                      <td>{fine.amount.toFixed(2)}</td>
                      <td>{fine.dueDate}</td>
                      <td>{fine.returnDate}</td>
                      <td>{fine.daysLate}</td>
                      <td>
                        <span
                          className={`badge ${fine.paid ? "bg-success" : "bg-danger"}`}
                        >
                          {fine.paid ? "PAID" : "UNPAID"}
                        </span>
                      </td>
                      <td>
                        {!fine.paid && (
                          <button
                            className="btn btn-success"
                            onClick={() => handleMarkAsPaid(fine.id)}
                          >
                            Mark as Paid
                          </button>
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

export default Fine;
