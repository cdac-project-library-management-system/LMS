import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaPencilAlt } from "react-icons/fa";
import profile from "../../../assets/profile.png";
import "../../../styles/user/profile-management/profilecard.css";
import { getMyProfile, editMyProfile } from "../../../services/user";
import { toast } from "react-toastify"; // For notifications

const UserProfileCard = () => {
  const [user, setUser] = useState(null);
  const [editing, setEditing] = useState(false);
  const [updatedUser, setUpdatedUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Fetch user profile on mount
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await getMyProfile();
        if (response.status !== "error") {
          setUser(response);
          setUpdatedUser(response);
        } else {
          throw new Error(response.error);
        }
      } catch (err) {
        setError("Failed to load profile.");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  // Handle input changes
  const handleChange = (e) => {
    setUpdatedUser({ ...updatedUser, [e.target.name]: e.target.value });
  };

  // Handle file upload (profile picture)
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setUpdatedUser({ ...updatedUser, profilePicture: imageUrl });
    }
  };

  // Handle profile update
  const handleSave = async () => {
    try {
      const response = await editMyProfile(
        updatedUser.firstName,
        updatedUser.lastName,
        updatedUser.phone,
        updatedUser.email,
        updatedUser.address,
        updatedUser.enrollment
      );

      if (response.status !== "error") {
        setUser(updatedUser);
        toast.success("Profile updated successfully!");
      } else {
        throw new Error(response.error);
      }
    } catch (err) {
      toast.error("Failed to update profile.");
    } finally {
      setEditing(false);
    }
  };

  if (loading) return <p>Loading profile...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="user-profile-card">
      <div className="profile-header">
        <div className="header-buttons">
          <button className="edit-btn" onClick={editing ? handleSave : () => setEditing(true)}>
            {editing ? "Save" : <><FaPencilAlt /> Edit Profile</>}
          </button>
          <button className="btn btn-secondary" onClick={() => navigate("/change-password")}>
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
          {editing ? <input type="text" name="firstName" value={updatedUser.firstName} onChange={handleChange} /> : <p>{user.firstName}</p>}
        </div>

        <div className="info-row">
          <label>Last Name:</label>
          {editing ? <input type="text" name="lastName" value={updatedUser.lastName} onChange={handleChange} /> : <p>{user.lastName}</p>}
        </div>

        <div className="info-row">
          <label>Enrollment Number:</label>
          <p>{user.enrollment}</p>
        </div>

        <div className="info-row">
          <label>Email Address:</label>
          {editing ? <input type="text" name="email" value={updatedUser.email} onChange={handleChange} /> : <p>{user.email}</p>}
        </div>

        <div className="info-row">
          <label>Mobile Number:</label>
          {editing ? <input type="text" name="phone" value={updatedUser.phone} onChange={handleChange} /> : <p>{user.phone}</p>}
        </div>

        <div className="info-row">
          <label>Address:</label>
          {editing ? <input type="text" name="address" value={updatedUser.address} onChange={handleChange} /> : <p>{user.address}</p>}
        </div>

        <div className="info-row">
          <label>Borrowed Books Count:</label>
          <p>{user.borrowedBooks}</p>
        </div>
      </div>
    </div>
  );
};

export default UserProfileCard;
