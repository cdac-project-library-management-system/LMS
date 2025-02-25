import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";
import Swal from "sweetalert2";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "../../styles/admin/MemberTable.module.css";
import { getUsers, deleteUser } from "../../services/user"; // Import service functions

const MembersTable = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch members from backend API
  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const data = await getUsers();
  
        if (!Array.isArray(data)) {
          throw new Error("Data is not an array");
        }
  
        setMembers(data);
      } catch (error) {
        console.error("Error fetching members:", error);
        Swal.fire("Error", "Failed to fetch members. Please try again.", "error");
      } finally {
        setLoading(false);
      }
    };
  
    fetchMembers();
  }, []);
  

  // Filter members based on search query
  const filteredMembers = members.filter((member) => {
    if (!member || !member.fullName || !member.email) return false; // Check correct property names
  
    return (
      member.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||  // ✅ Use fullName instead of name
      member.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (member.id && member.id.toString().includes(searchQuery))  // ✅ Use id instead of cardId
    );
  });
  
  

  // Navigate to Edit User
  const handleEdit = (id) => {
    navigate(`/admin/EditUser/${id}`);
  };

  // Delete confirmation
  const confirmDelete = (id, name) => {
    Swal.fire({
      title: "Are you sure?",
      text: `Do you want to delete user ${name}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc3545",
      cancelButtonColor: "#6c757d",
      confirmButtonText: "Yes, Delete!",
    }).then((result) => {
      if (result.isConfirmed) {
        handleDelete(id, name);
      }
    });
  };

  // Handle delete
  const handleDelete = async (id, name) => {
    try {
      const success = await deleteUser(id);
      if (success) {
        setMembers(members.filter((member) => member.id !== id));
        Swal.fire("Deleted!", `User ${name} has been deleted.`, "success");
      } else {
        Swal.fire("Error", "Failed to delete user. Please try again.", "error");
      }
    } catch (error) {
      Swal.fire("Error", "Error deleting user. Please check your connection.", "error");
    }
  };

  return (
    <div className={`container mt-4 ${styles.membersContainer}`}>
      <div className="row mb-3">
        <div className="col-md-4 ms-auto">
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              placeholder="Search members..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <span className="input-group-text bg-primary text-white">
              <Search size={20} />
            </span>
          </div>
        </div>
      </div>

      {loading ? (
        <p className="text-center">Loading members...</p>
      ) : (
        <div className="table-responsive">
          <table className="table table-bordered table-hover members-table">
            <thead className="table-dark">
              <tr>
                <th>ID</th>
                <th>Full Name</th>
                <th>Email</th>
                <th>Phone Number</th>
                <th>Address</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredMembers.length > 0 ? (
                filteredMembers.map((member) => (
                  <tr key={member.id}>
                    <td>{member.id}</td>
                    <td>{member.fullName}</td> {/* Use fullName instead of name */}
                    <td>{member.email}</td> {/* Use id instead of cardId */}
                    <td>{member.phoneNumber || "N/A"}</td> {/* Handle missing fields gracefully */}
                    <td>{member.address}</td>
                    <td>
                      <button className={`${styles.editButton} me-2`} onClick={() => handleEdit(member.id)}>Edit</button>
                      <button className={styles.deleteButton} onClick={() => confirmDelete(member.id, member.fullName)}>Delete</button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="9" className="text-center">No members found.</td>
                </tr>
              )}
            </tbody>

          </table>
        </div>
      )}
    </div>
  );
};

export default MembersTable;
