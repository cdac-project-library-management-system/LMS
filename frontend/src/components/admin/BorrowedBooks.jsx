import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUsers } from "../../services/user";
import "bootstrap/dist/css/bootstrap.min.css"; // Ensure Bootstrap is imported

const BorrowedBooks = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getUsers()
      .then((response) => {
        setUsers(Array.isArray(response) ? response : []);
      })
      .catch((err) => {
        console.error("Error fetching users:", err);
        setUsers([]);
      });
  }, []);

  const handleViewHistory = (userId) => {
    navigate(`/admin/borrowedhistory/${userId}`);
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Borrowed Books</h2>
      <table className="table table-bordered">
        <thead className="thead-dark">
          <tr>
            <th>User ID</th>
            <th>User Name</th>
            <th>Borrowed History</th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 ? (
            users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.fullName}</td>
                <td>
                  <button
                    className="btn btn-primary"
                    onClick={() => handleViewHistory(user.id)}
                  >
                    View History
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3" className="text-center">No users found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default BorrowedBooks;
