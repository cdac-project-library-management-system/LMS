import React, { useState } from "react";
import { Button, Offcanvas } from "react-bootstrap";
import { List } from "react-bootstrap-icons";
import { Link } from "react-router-dom";

const Layout = ({ children }) => {
  const [showSidebar, setShowSidebar] = useState(false);

  return (
    <div className="d-flex flex-column vh-100">
      {/* Header */}
      <header className="bg-primary text-white d-flex justify-content-between align-items-center px-4 py-3 fixed-top shadow">
        <h4 className="m-0" style={{textAlign:"center"}}>📖 Digital Library</h4>
        <div className="d-lg-none">
          <Button variant="light" onClick={() => setShowSidebar(true)}>
            <List size={30} />
          </Button>
        </div>
        <img
          src="https://c7.alamy.com/comp/2JD98N6/goku-dragon-ball-z-1996-2JD98N6.jpg"
          alt="Profile"
          className="rounded-circle d-none d-lg-block"
          style={{ width: "40px", height: "40px" }}
        />
      </header>
      
        {/* Sidebar for Large Screens */}
        <aside
          className="bg-dark text-white d-none d-lg-flex flex-column align-items-start p-4 position-fixed vh-100 shadow"
          style={{ width: "20%", marginTop: "72px" }}
        >
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
            <Link to="/renew-books" style={{ textDecoration: "none", color: "inherit", display: "block", width: "100%" }}>
            🚪 Logout
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
      <footer className="bg-primary text-white text-center py-3 mt-auto shadow">
        &copy; 2025 Digital Library. All Rights Reserved.
      </footer>
    </div>
  );
};

export default Layout;

