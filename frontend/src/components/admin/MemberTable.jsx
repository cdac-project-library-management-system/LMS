import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";
import Swal from "sweetalert2"; // Import SweetAlert2
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "../../styles/admin/MemberTable.module.css";

const MembersTable = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const [members, setMembers] = useState([
    { id: 1, name: "AAA", cardId: "2343243", group: "Student", email: "DFDSF@GASDVD", address: "DDSDAS", department: "WVSAD", education: "Doctoral", classNumber: 2, startDate: "01-01-2015" },
    { id: 2, name: "HAMAAA", cardId: "222222222222", group: "Student", email: "VSDV@SEFW", address: "DVSVSF", department: "DVSV", education: "Master", classNumber: 1, startDate: "22-05-2020" },
    { id: 3, name: "Alan Ahmad", cardId: "alan", group: "Student", email: "123@asd", address: "CS", department: "CS", education: "Master", classNumber: 1, startDate: "01-04-2020" },
    { id: 1, name: "AAA", cardId: "2343243", group: "Student", email: "DFDSF@GASDVD", address: "DDSDAS", department: "WVSAD", education: "Doctoral", classNumber: 2, startDate: "01-01-2015" },
    { id: 2, name: "HAMAAA", cardId: "222222222222", group: "Student", email: "VSDV@SEFW", address: "DVSVSF", department: "DVSV", education: "Master", classNumber: 1, startDate: "22-05-2020" },
    { id: 3, name: "Alan Ahmad", cardId: "alan", group: "Student", email: "123@asd", address: "CS", department: "CS", education: "Master", classNumber: 1, startDate: "01-04-2020" },
    { id: 1, name: "AAA", cardId: "2343243", group: "Student", email: "DFDSF@GASDVD", address: "DDSDAS", department: "WVSAD", education: "Doctoral", classNumber: 2, startDate: "01-01-2015" },
    { id: 2, name: "HAMAAA", cardId: "222222222222", group: "Student", email: "VSDV@SEFW", address: "DVSVSF", department: "DVSV", education: "Master", classNumber: 1, startDate: "22-05-2020" },
    { id: 3, name: "Alan Ahmad", cardId: "alan", group: "Student", email: "123@asd", address: "CS", department: "CS", education: "Master", classNumber: 1, startDate: "01-04-2020" },
      
  
  
  ]);

  // Filter members based on search query
  
  const filteredMembers = members.filter((member) =>
    member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (member.cardId && member.cardId.toString().includes(searchQuery)) || // Ensure cardId exists
    member.email.toLowerCase().includes(searchQuery.toLowerCase())
  );
  

  // Navigate to Edit User
  const handleEdit = (id) => {
    navigate(`/admin/EditUser/${id}`);
  };

  // Show a confirmation popup using SweetAlert2 before deleting
  const confirmDelete = (id, name) => {
    Swal.fire({
      title: `Are you sure?`,
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

  // Delete user if confirmed
  const handleDelete = async (id, name) => {
    try {
      // API call to delete user
      const response = await fetch(`https://api.example.com/users/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
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
      {/* Search Bar */}
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

      {/* Members Table */}
      <div className="table-responsive">
        <table className="table table-bordered table-hover members-table">
          <thead className="table-dark">
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Card ID</th>
              <th>Member Group</th>
              <th>Email</th>
              <th>Address</th>
              <th>Department</th>
          
              <th>Class</th>
             
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredMembers.map((member) => (
              <tr key={member.id}>
                <td>{member.id}</td>
                <td>{member.name}</td>
                <td>{member.cardId}</td>
                <td>{member.group}</td>
                <td>{member.email}</td>
                <td>{member.address}</td>
                <td>{member.department}</td>
              
                <td>{member.classNumber}</td>
               
                <td>
                  <button className={`${styles.editButton} me-2`} onClick={() => handleEdit(member.id)}>Edit</button>
                  <button className={styles.deleteButton} onClick={() => confirmDelete(member.id, member.name)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MembersTable;
