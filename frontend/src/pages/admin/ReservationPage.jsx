
import React from 'react';

import MainLayout from '../../components/admin/AdminMainLayout';
import styles from '../../styles/admin/BookDetails.module.css';
import Reservation from '../../components/admin/Reservation';


const ReservationPage = () => {
  return (
    <MainLayout>
      <div className={styles.membersContent}>
        <div className={styles.membersTableContainer}>
          <Reservation/>
        </div>
      </div>
    </MainLayout>
  );
};

export default ReservationPage;