import React from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import styles from "../../styles/admin/MainLayout.module.css";
import "bootstrap/dist/css/bootstrap.min.css";

const Layout = ({ children }) => {
  return (
    <div className={`d-flex flex-column ${styles.container}`}>
      {/* Header */}
      <Header />

      <div className="d-flex flex-grow-1">
        {/* Sidebar */}
        <Sidebar />

        {/* Main Content Area */}
        <div className={`flex-grow-1 p-3 ${styles.content}`}>{children}</div>
      </div>

      {/* Footer */}
      <footer className={`text-center py-3 ${styles.footer}`}>
        <p>© 2025 Library Management System. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Layout;
