// import React, { useState } from "react";
// import { UserCircle, LogOut, Settings } from "lucide-react";
// import Swal from "sweetalert2";
// import "../../styles/admin/Header.css";

// const Head = () => {
//   const [showDropdown, setShowDropdown] = useState(false);

//   const handleLogout = () => {
//     Swal.fire({
//       title: "Are you sure?",
//       text: "You will be logged out of your account.",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#d33",
//       cancelButtonColor: "#3085d6",
//       confirmButtonText: "Yes, logout!",
//       cancelButtonText: "No, stay",
//     }).then((result) => {
//       if (result.isConfirmed) {
//         console.log("User logged out");
//       }
//     });
//   };

//   return (
//     <header className="header-container">
//       {/* Left Side - Logo & Title */}
//       <div className="header-left">
//         <img src="logo.png" alt="Library Logo" className="logo" />
//         <h1 className="title">Library Management System</h1>
//       </div>

//       {/* Right Side - Profile Dropdown */}
//       <div 
//         className="header-right"
//         onMouseEnter={() => setShowDropdown(true)}
//         onMouseLeave={() => setShowDropdown(false)}
//       >
//         {/* Profile Icon */}
//         <button className="profile-button">
//           <UserCircle size={36} />
//         </button>

//         {/* Dropdown Menu */}
//         {showDropdown && (
//           <div className="profile-dropdown">
//             <button className="dropdown-item" onClick={() => console.log("My Profile")}>
//               <UserCircle className="icon" size={20} /> My Profile
//             </button>
//             <button className="dropdown-item" onClick={() => console.log("Settings")}>
//               <Settings className="icon" size={20} /> Settings
//             </button>
//             <button className="dropdown-item logout" onClick={handleLogout}>
//               <LogOut className="icon" size={20} /> Logout
//             </button>
//           </div>
//         )}
//       </div>
//     </header>
//   );
// };

// export default Head;


import React, { useState, useEffect } from "react";
import { UserCircle, LogOut, Settings } from "lucide-react";
import Swal from "sweetalert2";
import { Link } from "react-router-dom"; // Import Link for navigation
import styles from "../../styles/admin/Header.module.css";

const Head = () => {
  const [showDropdown, setShowDropdown] = useState(false);

  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will be logged out of your account.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, logout!",
      cancelButtonText: "No, stay",
    }).then((result) => {
      if (result.isConfirmed) {
        console.log("User logged out"); // Replace with logout functionality
      }
    });
  };

  const toggleDropdown = () => {
    setShowDropdown((prev) => !prev);
  };

  const handleClickOutside = (e) => {
    if (!e.target.closest(`.${styles["header-right"]}`)) {
      setShowDropdown(false);
    }
  };

  useEffect(() => {
    if (showDropdown) {
      document.addEventListener("click", handleClickOutside);
    } else {
      document.removeEventListener("click", handleClickOutside);
    }
    return () => document.removeEventListener("click", handleClickOutside);
  }, [showDropdown]);

  return (
    <header className={styles["header-container"]}>
      {/* Left Side - Logo & Title */}
      <div className={styles["header-left"]}>
        <img src="logo.png" alt="Library Logo" className={styles.logo} />
        <h1 className={styles.title}>Library Management System</h1>
      </div>

      {/* Right Side - Profile Dropdown */}
      <div className={styles["header-right"]}>
        {/* Profile Icon */}
        <button
          className={styles["profile-button"]}
          onClick={toggleDropdown}
          aria-label="Toggle Profile Dropdown"
        >
          <UserCircle size={36} />
        </button>

        {/* Dropdown Menu */}
        {showDropdown && (
          <div className={styles["profile-dropdown"]}>
            <Link to="/profile" className={styles["dropdown-item"]}>
              <UserCircle className={styles.icon} size={20} /> My Profile
            </Link>
            <Link to="/settings" className={styles["dropdown-item"]}>
              <Settings className={styles.icon} size={20} /> Settings
            </Link>
            <button
              className={`${styles["dropdown-item"]} ${styles.logout}`}
              onClick={handleLogout}
            >
              <LogOut className={styles.icon} size={20} /> Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Head;
