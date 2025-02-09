import { useState } from "react";
import "../../../styles/user/profile-management/profilecard.css";
import { useNavigate } from "react-router-dom";
import { FaPencilAlt } from "react-icons/fa";
import profile from "../../../assets/profile.png";

const UserProfileCard = ({ user }) => {
  const [editing, setEditing] = useState(false);
  const [updatedUser, setUpdatedUser] = useState({ ...user });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUpdatedUser({ ...updatedUser, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setUpdatedUser({ ...updatedUser, profilePicture: imageUrl });
    }
  };

  const handleEdit = () => setEditing(!editing);
  const handleSave = () => {
    console.log("Updated User Data:", updatedUser);
    setEditing(false);
  };

  const handleChangePasswordClick = () => {
    navigate("/change-password");
  };

  return (
    <div className="user-profile-card">
      <div className="profile-header">
        <div className="header-buttons">
          <button className="edit-btn" onClick={editing ? handleSave : handleEdit}>
            {editing ? "Save" : <><FaPencilAlt /> Edit Profile</>}
          </button>
          <button className="btn btn-secondary" onClick={handleChangePasswordClick}>
            Change Password
          </button>
        </div>
        <div className="profile-pic-container">
          <img src={updatedUser.profilePicture || profile} alt="Profile" className="profile-pic" />
          {editing && <input type="file" accept="image/*" onChange={handleFileChange} className="file-input" />}
        </div>
      </div>
      
      <div className="profile-info">
        <div className="info-row">
          <label>First Name:</label>
          {editing ? <input className="input" type="text" name="name" value={updatedUser.name} onChange={handleChange} /> : <p>{updatedUser.name}</p>}
        </div>

        <div className="info-row">
          <label>Last Name:</label>
          {editing ? <input className="input" type="text" name="lastname" value={updatedUser.lastname} onChange={handleChange} /> : <p>{updatedUser.lastname}</p>}
        </div>

        <div className="info-row">
          <label>Enrollment Number:</label>
          {editing ? <input className="input" type="number" name="enrollment" value={updatedUser.enrollment} onChange={handleChange} /> : <p>{updatedUser.enrollment}</p>}
        </div>

        <div className="info-row">
          <label>Email Address:</label>
          {editing ? <input className="input" type="text" name="email" value={updatedUser.email} onChange={handleChange} /> : <p>{updatedUser.email}</p>}
        </div>

        <div className="info-row">
          <label>Mobile Number:</label>
          {editing ? <input className="input" type="text" name="mobile" value={updatedUser.mobile} onChange={handleChange} /> : <p>{updatedUser.mobile}</p>}
        </div>

        <div className="info-row">
          <label>Address:</label>
          {editing ? <input className="input" type="text" name="address" value={updatedUser.address} onChange={handleChange} /> : <p>{updatedUser.address}</p>}
        </div>

        <div className="info-row">
          <label>Borrowed Books Count:</label>
          <p>{updatedUser.borrowedBooks}</p>
        </div>
      </div>
    </div>
  );
};

export default UserProfileCard;
