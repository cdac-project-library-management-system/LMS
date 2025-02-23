
import React from 'react';
import BookDetails from '../../components/admin/BookDetails';
import MainLayout from '../../components/admin/AdminMainLayout';
import styles from '../../styles/admin/BookDetails.module.css';
import Fines from '../../components/admin/Fine';


const FinesPage = () => {
  return (
    <MainLayout>
      <div className={styles.membersContent}>
     


  <div className={styles.membersTableContainer}>
   <Fines/>
  
  </div>
  </div>

    </MainLayout>
  );
};

export default FinesPage;