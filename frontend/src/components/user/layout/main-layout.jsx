import React, { useState } from "react";
import { Button, Offcanvas } from "react-bootstrap";
import { List } from "react-bootstrap-icons";
import { Link } from "react-router-dom";
import '../../../styles/user/layout/main-layout.css'
import profile from '../../../assets/profile.png'
import logo from '../../../assets/lms_Logo.png';

const Layout = ({ children }) => {
  const [showSidebar, setShowSidebar] = useState(false);

  return (
    <div className="d-flex flex-column vh-100">
      {/* Header */}
      <header className="bg-primary text-white d-flex justify-content-between align-items-center px-4 py-4 fixed-top shadow" style={{ height: "70px", backgroundColor: "#1E3A5F" }}>
        <img
          src={logo}
          alt="Logo"
          className="d-none d-lg-block"
          style={{ width: "50px", height: "50px" }}
        />
        <h4 className="m-0" style={{ textAlign: "center", flexGrow: 1, color: "#F1F1F1" }}>Library Management</h4>
        <div className="d-lg-none">
          <Button variant="light" onClick={() => setShowSidebar(true)}>
            <List size={30} />
          </Button>
        </div>
        <img
          src={profile}
          alt="Profile"
          className="rounded-circle d-none d-lg-block"
          style={{ width: "40px", height: "40px" }}
        />
      </header>

      {/* Sidebar for Large Screens */}
      <aside
        className="d-none d-lg-flex flex-column align-items-start p-4 position-fixed vh-100 shadow sidebar"
        style={{ backgroundColor: "#1F3A6D" }}
      >
        <Link to="/dashboard" className="sidebar-link">Home</Link>
        <Link to="/browse-categories" className="sidebar-link">Browse Categories</Link>
        <Link to="/renew-books" className="sidebar-link">Renew Book</Link>
        <Link to="/borrowed-books" className="sidebar-link"> Borrowed Books</Link>
        <Link to="/finemanagement" className="sidebar-link">Payment & Fines</Link>
        <Link to="/review-book" className="sidebar-link">Book Review</Link>
        <Link to="/profile" className="sidebar-link">User Profile</Link>
        <Link to="/renew-books" className="sidebar-link"> Logout</Link>
      </aside>

      {/* Sidebar for Small Screens (Offcanvas) */}
      <Offcanvas show={showSidebar} onHide={() => setShowSidebar(false)} placement="start" style={{ backgroundColor: "#1F3A6D" }}>
        <Offcanvas.Header closeButton style={{ color: "#F1F1F1" }}>
          <Offcanvas.Title>Library Management</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body className="d-flex flex-column">
          <Link to="/dashboard" className="sidebar-link" style={{ color: "#F1F1F1" }}>Home</Link>
          <Link to="/browse-categories" className="sidebar-link" style={{ color: "#F1F1F1" }}>Browse Categories</Link>
          <Link to="/renew-books" className="sidebar-link" style={{ color: "#F1F1F1" }}>Renew Book</Link>
          <Link to="/borrowed-books" className="sidebar-link" style={{ color: "#F1F1F1" }}>Borrowed Books</Link>
          <Link to="/finemanagement" className="sidebar-link" style={{ color: "#F1F1F1" }}>Payment & Fines</Link>
          <Link to="/review-book" className="sidebar-link" style={{ color: "#F1F1F1" }}>Book Review</Link>
          <Link to="/profile" className="sidebar-link" style={{ color: "#F1F1F1" }}>User Profile</Link>
          <Link to="/renew-books" className="sidebar-link" style={{ color: "#F1F1F1" }}>Logout</Link>
        </Offcanvas.Body>
      </Offcanvas>

      {/* Main Content */}
      <main className="flex-grow-1 p-4 bg-light" style={{ marginLeft: "20%", width: "80%", marginTop: "70px" }}>
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-primary text-white text-center py-3 mt-auto shadow" style={{ backgroundColor: "#1E3A5F"}}>
        &copy; 2025 Library Management. All Rights Reserved.
      </footer>
    </div>
  );
};

export default Layout;
