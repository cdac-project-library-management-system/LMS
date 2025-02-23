import { useEffect, useState } from "react";
import UserProfileCard from "../../../components/user/profile-management/profilecard";
import Layout from "../../../components/user/layout/MainLayout";

const UserProfile = () => {
  return (
    <Layout>
      {<UserProfileCard />}
    </Layout>
  );
};

export default UserProfile;
