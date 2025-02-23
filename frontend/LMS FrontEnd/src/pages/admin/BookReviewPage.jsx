
import React from 'react';

import MainLayout from '../../components/admin/AdminMainLayout';
import styles from '../../styles/admin/BookDetails.module.css';
import Review from '../../components/admin/Review';


const ReviewPage = () => {
  return (
    <MainLayout>
      <div className={styles.membersContent}>
     


  <div className={styles.membersTableContainer}>
  <Review/>
  
  </div>
  </div>

    </MainLayout>
  );
};

export default ReviewPage;