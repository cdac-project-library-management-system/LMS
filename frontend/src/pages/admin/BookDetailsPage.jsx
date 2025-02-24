
import React from 'react';
import MainLayout from '../../components/admin/AdminMainLayout';
import styles from '../../styles/admin/BookDetails.module.css';
import BooksDetails from '../../components/admin/BookDetails';


const BookDetailsPage = () => {
  return (
    <MainLayout>
      <div className={styles.membersContent}>
        <div className={styles.membersTableContainer}>
          <BooksDetails/>      
        </div>
      </div>
    </MainLayout>
  );
};

export default BookDetailsPage;