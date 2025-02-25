import React from "react";
import AddBook from "../../components/admin/AddBook";
import CategoryTable from "../../components/admin/CategoryTable";
import MainLayout from "../../components/admin/AdminMainLayout";
import styles from "../../styles/admin/Pages.module.css";

const AddBookPage = () => {
  return (
    <MainLayout>
      <div className={`${styles.container} d-flex gap-4 p-3`} style={{ alignItems: "flex-start" }}>
        {/* Add Book Form */}
        <div className="flex-grow-1">
          <AddBook />
        </div>

        {/* Category Table */}
        <div className="category-table" style={{ width: "40%" }}>
          <CategoryTable />
        </div>
      </div>
    </MainLayout>
  );
};

export default AddBookPage;
