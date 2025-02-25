import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Search } from "lucide-react";
import FineService from "../../services/FineService";
import "bootstrap/dist/css/bootstrap.min.css";

const Fine = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [fines, setFines] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFines();
  }, []);

  const fetchFines = async () => {
    try {
      setLoading(true);
      const response = await FineService.getAllFines();
      setFines(response.items);
    } catch (error) {
      console.error("Error fetching fines:", error);
      toast.error("Failed to fetch fines");
    } finally {
      setLoading(false);
    }
  };

  const handleMarkAsPaid = async (fineId) => {
    try {
      await FineService.updateFine(fineId, { status: "PAID" });
      setFines((prevFines) =>
        prevFines.map((fine) =>
          fine.id === fineId ? { ...fine, status: "PAID" } : fine
        )
      );
      toast.success("Fine has been marked as paid.");
    } catch (error) {
      console.error("Error updating fine:", error);
      toast.error("Failed to update fine");
    }
  };

  const filteredFines = fines.filter((fine) =>
    (fine.member?.toLowerCase() || "").includes(searchQuery.toLowerCase()) ||
    (fine.transactionId?.toLowerCase() || "").includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container mt-4">
      <ToastContainer position="top-right" autoClose={3000} />
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
                <span className="input-group-text bg-primary text-white">
                  <Search size={20} />
                </span>
              </div>
            </div>

            {loading ? (
              <div className="text-center">Loading fines...</div>
            ) : (
              <div className="table-responsive">
                <table className="table table-bordered table-hover">
                  <thead className="table-dark">
                    <tr>
                      <th>ID</th>
                      <th>Fine Amount (₹)</th>
                      <th>Days Overdue</th>
                      <th>Borrowed Record ID</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredFines.length > 0 ? (
                      filteredFines.map((fine) => (
                        <tr key={fine.id}>
                          <td>{fine.id}</td>
                          <td>₹{fine.fineAmount.toFixed(2)}</td>
                          <td>{fine.daysOverdue}</td>
                          <td>{fine.borrowRecordId}</td>
                          <td>
                            <span
                              className={`badge ${
                                fine.status === "PAID" ? "bg-success" : "bg-danger"
                              }`}
                            >
                              {fine.status}
                            </span>
                          </td>
                          <td>
                            {fine.status !== "PAID" && (
                              <button
                                className="btn btn-success"
                                onClick={() => handleMarkAsPaid(fine.id)}
                              >
                                Mark as Paid
                              </button>
                            )}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="6" className="text-center">
                          No fines found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Fine;
