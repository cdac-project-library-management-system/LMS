


import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "../../styles/admin/Sidebar.module.css";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [openSubMenu, setOpenSubMenu] = useState(null);

  const toggleSidebar = () => setIsOpen(!isOpen);
  const toggleSubMenu = (menu) =>
    setOpenSubMenu(openSubMenu === menu ? null : menu);

  return (
    <>
      {/* Hamburger Button - Only on Mobile */}
      <button className={styles.toggleButton} onClick={toggleSidebar}>
        ☰
      </button>

      {/* Sidebar */}
      <div className={`${styles.sidebar} ${isOpen ? styles.open : ""}`}>
        {/* Close Button - Only on Mobile */}
        <button className={styles.closeButton} onClick={toggleSidebar}>
          ✖
        </button>

        <ul className={styles.menu}>
          <li>
            <div className={styles.menuItem} onClick={() => toggleSubMenu("dashboard")}>
              Dashboard
            </div>
            {openSubMenu === "dashboard" && (
              <ul className={styles.subMenu}>
                <li><Link to="/dashboard" className={styles.subMenuItem}>General</Link></li>
              </ul>
            )}
          </li>

          <li>
            <div className={styles.menuItem} onClick={() => toggleSubMenu("books")}>
              Books
            </div>
            {openSubMenu === "books" && (
              <ul className={styles.subMenu}>
                <li><Link to="/books" className={styles.subMenuItem}>Books</Link></li>
                <li><Link to="/admin/BookDetails" className={styles.subMenuItem}>Book Details</Link></li>
                <li><Link to="/admin/AddBook" className={styles.subMenuItem}>Add Book</Link></li>
               
                
                <li><Link to="/issue-book" className={styles.subMenuItem}>Issue Book</Link></li>
                <li><Link to="/return-book" className={styles.subMenuItem}>Return Book</Link></li>
              </ul>
            )}
          </li>

          <li>
            <div className={styles.menuItem} onClick={() => toggleSubMenu("fines")}>
              Fines
            </div>
            {openSubMenu === "fines" && (
              <ul className={styles.subMenu}>
                <li><Link to="/admin/Fines" className={styles.subMenuItem}>Manage Fines</Link></li>
              
              </ul>
            )}
          </li>

          <li>
            <div className={styles.menuItem} onClick={() => toggleSubMenu("members")}>
              Members
            </div>
            {openSubMenu === "members" && (
              <ul className={styles.subMenu}>
                <li><Link to="/admin/UserDetails" className={styles.subMenuItem}>Members</Link></li>
                
                
              </ul>
            )}
          </li>

          <li>
            <div className={styles.menuItem} onClick={() => toggleSubMenu("reservations")}>
              Reservations
            </div>
            {openSubMenu === "reservations" && (
              <ul className={styles.subMenu}>
                <li><Link to="/admin/ManageReservations" className={styles.subMenuItem}>Manage Reservations</Link></li>
                
              </ul>
            )}
          </li>

          <li>
            <div className={styles.menuItem} onClick={() => toggleSubMenu("reports")}>
              Reports & Logs
            </div>
            {openSubMenu === "reports" && (
              <ul className={styles.subMenu}>
                <li><Link to="/activity-logs" className={styles.subMenuItem}>Activity Logs</Link></li>
                <li><Link to="/generate-reports" className={styles.subMenuItem}>Generate Reports</Link></li>
              </ul>
            )}
          </li>

          <li>
            <Link to="/help" className={styles.menuItem}>Help</Link>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Sidebar;


