import React, { useState } from "react";
import { Button, Offcanvas, Dropdown } from "react-bootstrap";
import { List } from "react-bootstrap-icons";
import { Link } from "react-router-dom";

const Layout = ({ children }) => {
  const [showSidebar, setShowSidebar] = useState(false);
  const [show, setShow] = useState(false);

  return (
    <div className="d-flex flex-column vh-100">
      {/* Header */}
      <header className="text-white d-flex justify-content-between align-items-center px-4 py-3 fixed-top shadow"
      style={{backgroundColor: "#ad5b5b"}}>
        {/* Logo on the extreme left */}
        <div className="d-flex align-items-center">
          <img 
            src={require("../../assets/logo.jpg")} 
            alt="Library Logo" 
            style={{ width: "50px", height: "50px", marginRight: "10px" }} 
          />
          <h4 className="m-0" style={{ textAlign: "center" }}>Library Management System</h4>
        </div>

        <div className="d-lg-none">
          <Button variant="light" onClick={() => setShowSidebar(true)}>
            <List size={30} />
          </Button>
        </div>

        <Dropdown
          className="d-none d-lg-block"
          onMouseEnter={() => setShow(true)}
          onMouseLeave={() => setShow(false)}
          show={show} // Controls the dropdown state
          >
          <Dropdown.Toggle
            as="div"
            className="d-flex align-items-center"
            style={{ cursor: "pointer" }}
          >
          <img
            src="https://c7.alamy.com/comp/2JD98N6/goku-dragon-ball-z-1996-2JD98N6.jpg"
            alt="Profile"
            className="rounded-circle"
            style={{ width: "50px", height: "50px" }}
          />
          </Dropdown.Toggle>

          <Dropdown.Menu align="" style={{ backgroundColor: "#e6bfbe" }}>
            <Dropdown.Item href="/profile">Profile</Dropdown.Item>
            <Dropdown.Item href="/settings">Settings</Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item href="/logout">Logout</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </header>

      
        {/* Sidebar for Large Screens */}
        <aside
          className="text-white d-none d-lg-flex flex-column align-items-start p-4 position-fixed vh-100 shadow"
          style={{ backgroundColor: "#dea6a4", width: "20%", marginTop: "72px" }}
        >
          <Button variant="" className="mb-3 w-100 text-start">
            <Link to="/admin/Dashboard" style={{ textDecoration: "#c4c4c4", color: "inherit", display: "block", width: "100%" }}>
              Dashboard
            </Link>
          </Button>
          <Button variant="" className="mb-3 w-100 text-start">
            <Link to="/admin/AddCategory" style={{ textDecoration: "#c4c4c4", color: "inherit", display: "block", width: "100%" }}>
              Add Category
            </Link>
          </Button>
          <Button variant="" className="mb-3 w-100 text-start">
            <Link to="/admin/AddBook" style={{ textDecoration: "#c4c4c4", color: "inherit", display: "block", width: "100%" }}>
              Add Book
            </Link>
          </Button>
          <Button variant="" className="mb-3 w-100 text-start">
            <Link to="/admin/BookDetails" style={{ textDecoration: "#c4c4c4", color: "inherit", display: "block", width: "100%" }}>
              Book Details
            </Link>
          </Button>
          <Button variant="" className="mb-3 w-100 text-start">
            <Link to="/admin/BookReviews" style={{ textDecoration: "#c4c4c4", color: "inherit", display: "block", width: "100%" }}>
              Book Reviews
            </Link>
          </Button>
          <Button variant="" className="mb-3 w-100 text-start">
            <Link to="/admin/Fines" style={{ textDecoration: "#c4c4c4", color: "inherit", display: "block", width: "100%" }}>
            Fines
            </Link>
          </Button>
          <Button variant="" className="mb-3 w-100 text-start">
            <Link to="/admin/UserDetails" style={{ textDecoration: "#c4c4c4", color: "inherit", display: "block", width: "100%" }}>
              Members
            </Link>
          </Button>
          <Button variant="" className="mb-3 w-100 text-start">
            <Link to="/admin/borrowedbooks" style={{ textDecoration: "#c4c4c4", color: "inherit", display: "block", width: "100%" }}>
              Borrowed Books
            </Link>
          </Button>
          <Button variant="" className="mb-3 w-100 text-start">
            <Link to="/admin/ManageReservations" style={{ textDecoration: "#c4c4c4", color: "inherit", display: "block", width: "100%" }}>
              Reservations
            </Link>
          </Button>
        </aside>

        {/* Sidebar for Small Screens (Offcanvas) */}
        <Offcanvas show={showSidebar} onHide={() => setShowSidebar(false)} placement="start">
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>📖 Digital Library</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body className="d-flex flex-column">
          <Button variant="secondary" className="mb-3 w-100 text-start">
            <Link to="/dashboard" style={{ textDecoration: "none", color: "inherit", display: "block", width: "100%" }}>
              🏠 Home
            </Link>
          </Button>
          <Button variant="secondary" className="mb-3 w-100 text-start">
            <Link to="/browse-categories" style={{ textDecoration: "none", color: "inherit", display: "block", width: "100%" }}>
              Browse Categories
            </Link>
          </Button>
          <Button variant="secondary" className="mb-3 w-100 text-start">
            <Link to="/renew-books" style={{ textDecoration: "none", color: "inherit", display: "block", width: "100%" }}>
              Renew Book
            </Link>
          </Button>
          <Button variant="secondary" className="mb-3 w-100 text-start">
            <Link to="/borrowed-books" style={{ textDecoration: "none", color: "inherit", display: "block", width: "100%" }}>
            📚 Borrowed Books
            </Link>
          </Button>
          <Button variant="secondary" className="mb-3 w-100 text-start">
            <Link to="/fines" style={{ textDecoration: "none", color: "inherit", display: "block", width: "100%" }}>
              Payment & Fines
            </Link>
          </Button>
          <Button variant="secondary" className="mb-3 w-100 text-start">
            <Link to="/review-book" style={{ textDecoration: "none", color: "inherit", display: "block", width: "100%" }}>
              Book Review
            </Link>
          </Button>
          <Button variant="secondary" className="mb-3 w-100 text-start">
            <Link to="/profile" style={{ textDecoration: "none", color: "inherit", display: "block", width: "100%" }}>
              User Profile
            </Link>
          </Button>
          <Button variant="secondary" className="mb-3 w-100 text-start btn-danger">
            <Link to="/login" style={{ textDecoration: "none", color: "inherit", display: "block", width: "100%" }}>
            🚪 Logout
            </Link>
          </Button>
          </Offcanvas.Body>
        </Offcanvas>

        {/* Main Content (Ensures Sidebar Space) */}
        <main className="flex-grow-1 p-4 bg-light" style={{ marginLeft: "20%", width: "80%", marginTop: "56px" }}>
          {children}
        </main>

      {/* Footer (Not Fixed) */}
      <footer className="text-white text-center py-3 mt-auto shadow" style={{backgroundColor:"#ad5b5b"}}>
        &copy; 2025 Digital Library. All Rights Reserved.
      </footer>
    </div>
  );
};

export default Layout;

