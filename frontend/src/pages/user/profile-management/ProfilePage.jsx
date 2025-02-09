import { useEffect, useState } from "react";
import UserProfileCard from "../../../components/user/profile-management/profilecard";
import Layout from "../../../components/user/layout/MainLayout";
import { getMyProfile } from "../../../services/userService";

const UserProfile = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await getMyProfile();
        if (response.status === "error") {
          throw new Error(response.error);
        }
        setUserData(response);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    
    fetchUserProfile();
  }, []);

  if (loading) return <p>Loading user profile...</p>;
  if (error) return <p>Error: {error}</p>;
  
  return (
    <div>
        <Layout>
          <UserProfileCard user={userData}/>
        </Layout>
    </div>
  )
};

export default UserProfile;