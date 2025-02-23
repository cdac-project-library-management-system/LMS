import React from 'react';
import AddCategoryForm from '../../components/admin/AddCategory';
import MainLayout from '../../components/admin/AdminMainLayout';
import styles from '../../styles/admin/Pages.module.css';


const AddBookPage = () => {
  return (
    
        // <div className="col-md-9 p-4 bg-white">
        //  
        // </div>
        <MainLayout>
        <div className={styles.membersContent}>
            <div className={styles.membersTableContainer}>
            <AddCategoryForm/>      
            </div>
        </div>
        </MainLayout>
 
  );
};

export default AddBookPage;