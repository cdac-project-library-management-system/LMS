import React, { useState, useEffect } from "react";

const Dashboard = () => {
  const [members, setMembers] = useState([]);
  const [books, setBooks] = useState([]);
  const [showAllMembers, setShowAllMembers] = useState(false);
  const [showAllBooks, setShowAllBooks] = useState(false);
  const [startDate, setStartDate] = useState(() => {
    const date = new Date();
    date.setMonth(date.getMonth() - 1);
    return date.toISOString().split("T")[0];
  });

  useEffect(() => {
    // Fetch data from the database (simulated with hardcoded data here)
    const fetchData = async () => {
      const membersData = [
        { id: "#1234", name: "Ramoliya Krunal P.", issued: 1 },
        { id: "#1235", name: "Vasant Chauhan", issued: 3 },
        { id: "#1238", name: "Dilip Radadiya", issued: 1 },
        { id: "#1239", name: "Karnav Patel", issued: 3 },
        { id: "#1240", name: "Viral Patel", issued: 1 },
        { id: "#1241", name: "Ankit Sharma", issued: 2 },
        { id: "#1242", name: "Meera Joshi", issued: 5 },
        { id: "#1243", name: "Sanjay Gupta", issued: 4 },
        { id: "#1244", name: "Nina Rao", issued: 3 },
        { id: "#1245", name: "Ravi Kumar", issued: 2 },
      ];

      const booksData = [
        { id: "#B12", name: "Book Name 1", availability: "Available" },
        { id: "#B23", name: "Book Name 2", availability: "Unavailable" },
        { id: "#B56", name: "Book Name 3", availability: "Available" },
        { id: "#B42", name: "Book Name 4", availability: "Unavailable" },
        { id: "#B34", name: "Book Name 5", availability: "Available" },
        { id: "#B78", name: "Book Name 6", availability: "Unavailable" },
        { id: "#B89", name: "Book Name 7", availability: "Available" },
        { id: "#B90", name: "Book Name 8", availability: "Unavailable" },
        { id: "#B91", name: "Book Name 9", availability: "Available" },
        { id: "#B92", name: "Book Name 10", availability: "Available" },
      ];

      setMembers(membersData);
      setBooks(booksData);
    };

    fetchData();
  }, []);

  const filterMembersByStartDate = () => {
    return members.filter((member) => {
      const issuedDate = new Date(startDate);
      return new Date() >= issuedDate;
    });
  };

  return (
    <div className="container py-4">
      <div className="row">
        {/* New Members Section */}
        <div className="col-md-6 mb-4">
          <div className="card shadow-sm">
            <div className="card-header d-flex justify-content-between align-items-center">
              <h5>{showAllMembers ? "All Members" : "New Members"}</h5>
              <input
                type="date"
                className="form-control w-auto"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>
            <div className="card-body" style={{ maxHeight: "300px", overflowY: "auto" }}>
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>ID</th>
                    <th>Total Books Issued</th>
                  </tr>
                </thead>
                <tbody>
                  {(showAllMembers ? members : filterMembersByStartDate()).map((member, index) => (
                    <tr key={index}>
                      <td>{member.name}</td>
                      <td>{member.id}</td>
                      <td>{member.issued}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="d-flex justify-content-end">
                <button
                  className="btn btn-primary btn-sm"
                  onClick={() => setShowAllMembers(!showAllMembers)}
                >
                  {showAllMembers ? "Show New Members" : "List All Members"}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* New Books Section */}
        <div className="col-md-6 mb-4">
          <div className="card shadow-sm">
            <div className="card-header d-flex justify-content-between align-items-center">
              <h5>{showAllBooks ? "All Books" : "New Books"}</h5>
            </div>
            <div className="card-body" style={{ maxHeight: "300px", overflowY: "auto" }}>
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>ID</th>
                    <th>Availability</th>
                  </tr>
                </thead>
                <tbody>
                  {(showAllBooks ? books : books).map((book, index) => (
                    <tr key={index}>
                      <td>{book.name}</td>
                      <td>{book.id}</td>
                      <td>{book.availability}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="d-flex justify-content-end">
                <button
                  className="btn btn-primary btn-sm"
                  onClick={() => setShowAllBooks(!showAllBooks)}
                >
                  {showAllBooks ? "Show New Books" : "List All Books"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
