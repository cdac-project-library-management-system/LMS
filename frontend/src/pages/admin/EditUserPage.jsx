
        import React from 'react';
        import MembersTable from '../../components/admin/MemberTable';
        import MainLayout from '../../components/admin/AdminMainLayout';
        import styles from '../../styles/admin/MemberList.module.css';
        import EditMember from '../../components/admin/EditMember';
        import EditUser from '../../components/admin/EditUser';
        
        const EditUserPage = () => {
          return (
            <MainLayout>
              <div className={styles.membersContent}>
         
          <div className={styles.membersTableContainer}>
            {/* <MembersTable /> */}
            <EditUser/>
          </div>
        </div>
            </MainLayout>
          );
        };
        
        export default EditUserPage;