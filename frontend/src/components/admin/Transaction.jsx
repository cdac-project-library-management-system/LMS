import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Search } from "lucide-react";

const Transaction = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [transactions] = useState([
    {
      id: 1,
      member: "Arya Stark",
      book: "A Game of Thrones",
      issueDate: "2025-02-01",
      dueDate: "2025-02-15",
      returnDate: null,
      status: "ISSUED",
    },
    {
      id: 2,
      member: "Frodo Baggins",
      book: "The Lord of the Rings",
      issueDate: "2025-01-20",
      dueDate: "2025-02-05",
      returnDate: "2025-02-07",
      status: "RETURNED",
    },
    {
      id: 3,
      member: "Jon Snow",
      book: "A Clash of Kings",
      issueDate: "2025-01-10",
      dueDate: "2025-01-25",
      returnDate: null,
      status: "OVERDUE",
    },
    {
      id: 4,
      member: "Gandalf the Grey",
      book: "The Hobbit",
      issueDate: "2025-02-02",
      dueDate: "2025-02-16",
      returnDate: null,
      status: "ISSUED",
    },
    {
      id: 5,
      member: "Tyrion Lannister",
      book: "A Storm of Swords",
      issueDate: "2025-02-05",
      dueDate: "2025-02-20",
      returnDate: null,
      status: "ISSUED",
    },
    {
      id: 6,
      member: "Legolas Greenleaf",
      book: "The Silmarillion",
      issueDate: "2025-01-28",
      dueDate: "2025-02-12",
      returnDate: null,
      status: "ISSUED",
    },
    {
      id: 7,
      member: "Samwell Tarly",
      book: "A Feast for Crows",
      issueDate: "2025-02-03",
      dueDate: "2025-02-17",
      returnDate: null,
      status: "ISSUED",
    },
  ]);

  // Filter transactions based on search query
  const filteredTransactions = transactions.filter(
    (transaction) =>
      transaction.member.toLowerCase().includes(searchQuery.toLowerCase()) ||
      transaction.book.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-lg-10 col-md-9 col-12">
          <div className="bg-white p-4 rounded shadow-sm">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h3 className="font-weight-bold text-dark">Borrowed Books By User</h3>
              <div className="d-flex">
                <input
                  type="text"
                  className="form-control me-2"
                  style={{ width: "250px" }} // Increased width for full placeholder visibility
                  placeholder="Search by member or book"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                     <span className="input-group-text bg-primary text-white">
                                                              <Search size={20} />
                                                            </span>
              </div>
            </div>

            {/* Transactions Table */}
            <div className="table-responsive">
              <table className="table table-bordered table-hover">
                <thead className="table-dark">
                  <tr>
                    <th>User ID</th>
                    <th>User Name</th>
                    <th>Borrow Records</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredTransactions.map((transaction) => (
                    <tr key={transaction.id}>
                      <td>{transaction.member}</td>
                      <td>{transaction.book}</td>
                      <td>{transaction.issueDate}</td>
                      <td>{transaction.dueDate}</td>
                      <td>{transaction.returnDate || "Not Returned"}</td>
                      <td>
                        <span
                          className={`badge ${
                            transaction.status === "ISSUED"
                              ? "bg-warning text-dark"
                              : transaction.status === "RETURNED"
                              ? "bg-success"
                              : "bg-danger"
                          }`}
                        >
                          {transaction.status}
                        </span>
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

export default Transaction;
