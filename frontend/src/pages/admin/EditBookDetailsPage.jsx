// pages/EditBookDetailsPage.jsx
import React from 'react';
import EditBookDetails from '../../components/admin/EditBookDetails';
import MainLayout from '../../components/admin/AdminMainLayout';
import styles from '../../styles/admin/Pages.module.css';

const EditBookDetailsPage = () => {
  return (
   
    
    <MainLayout>
      <div className={styles.membersContent} >
        <div className={styles.membersTableContainer}>
          <EditBookDetails />
        </div>
      </div>
    </MainLayout>
  );
};

export default EditBookDetailsPage;