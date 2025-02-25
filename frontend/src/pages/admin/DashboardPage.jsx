
import React from 'react';
import Dashboard from '../../components/admin/Dashboard';
import MainLayout from '../../components/admin/AdminMainLayout';
import styles from '../../styles/admin/Pages.module.css';



const DashboardPage = () => {
  return (
    <MainLayout>
      <div className={styles.membersContent}>
 
  <div className={styles.membersTableContainer}>
    <Dashboard />
  
  </div>
</div>
    </MainLayout>
  );
};

export default DashboardPage;