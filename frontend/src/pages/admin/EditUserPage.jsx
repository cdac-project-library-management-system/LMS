
        import React from 'react';
      
        import MainLayout from '../../components/admin/AdminMainLayout';
        import styles from '../../styles/admin/Pages.module.css';
        
        import EditUser from '../../components/admin/EditUser';
        
        const EditUserPage = () => {
          return (
            <MainLayout>
              <div className={styles.membersContent} >
         
          <div className={styles.membersTableContainer}>
            {/* <MembersTable /> */}
            <EditUser/>
          </div>
        </div>
            </MainLayout>
          );
        };
        
        export default EditUserPage;