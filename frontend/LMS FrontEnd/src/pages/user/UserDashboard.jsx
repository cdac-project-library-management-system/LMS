import React from "react";
import MainLayout from "../../components/user/layout/MainLayout"; 
import UserHome from "../../components/user/UserHome";  

const UserDashboard = () => {
  return (
    <MainLayout>
      <UserHome />
    </MainLayout>
  );
};

export default UserDashboard;
