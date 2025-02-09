import UserProfileCard from "../../../components/user/profile-management/profilecard";
import Layout from "../../../components/user/layout/MainLayout";
const UserProfile = () => {
  const userData = {
    name: "John",
    lastname: "Doe",
    enrollment: "12345566",
    email: "john.doe@example.com",
    mobile: "123-456-7890",
    address: "123 Main St, City",
    profilePicture: "",
    role: "User",
    borrowedBooks: 5,
    password: "",
  };
  
  return (
    <div>
        <Layout>
          <UserProfileCard user={userData}/>
        </Layout>
    </div>
  )
};

export default UserProfile;