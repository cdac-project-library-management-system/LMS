import { Route } from "lucide-react";
import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from 'react-router-dom';

const ChangePass = () => {
  const navigate = useNavigate();
  const [passwords, setPasswords] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPasswords({ ...passwords, [name]: value });
  };

  const handlePasswordChange = () => {
    if (!passwords.oldPassword || !passwords.newPassword || !passwords.confirmPassword) {
      toast.error("All fields are required!");
      return;
    }
    if (passwords.newPassword !== passwords.confirmPassword) {
      toast.error("New password and confirm password do not match.");
      return;
    }

    setTimeout(() => {
      toast.success("Password changed successfully!");
      setPasswords({ oldPassword: "", newPassword: "", confirmPassword: "" });
      setTimeout(()=>{
        navigate('/userProfile');
      },2000) 
    }, 1000);
  };

  return (
    <div className="d-flex justify-content-center align-items-start vh-100" style={{ paddingTop: "50px" }}>
    <div className="card p-4 shadow-lg" style={{ width: "500px" }}>
      <h3 className="text-center">Change Password</h3>
        <div className="mb-3">
          <label className="form-label">Old Password:</label>
          <input type="password" name="oldPassword" value={passwords.oldPassword} onChange={handleChange} className="form-control" />
        </div>

        <div className="mb-3">
          <label className="form-label">New Password:</label>
          <input type="password" name="newPassword" value={passwords.newPassword} onChange={handleChange} className="form-control" />
        </div>

        <div className="mb-3">
          <label className="form-label">Confirm New Password:</label>
          <input type="password" name="confirmPassword" value={passwords.confirmPassword} onChange={handleChange} className="form-control" />
        </div>

        <button className="btn btn-primary w-100" onClick={handlePasswordChange}>Save New Password</button>

        <ToastContainer position="top-right" autoClose={3000} />
      </div>
    </div>
  );
};

export default ChangePass;
