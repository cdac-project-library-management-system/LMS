
import React from 'react';

import MainLayout from '../../components/admin/AdminMainLayout';
import styles from '../../styles/admin/BookDetails.module.css';
import Transaction from '../../components/admin/Transaction';



const TransactionPage = () => {
  return (
    <MainLayout>
      <div className={styles.membersContent}>
     


  <div className={styles.membersTableContainer}>
  <Transaction/>
  
  </div>
  </div>

    </MainLayout>
  );
};

export default TransactionPage;