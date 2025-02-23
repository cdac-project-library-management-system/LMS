import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "../../services/AuthService"; // Ensure correct import

const LogoutPage = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState("Logging you out...");

  useEffect(() => {
    const logout = async () => {
      const response = await AuthService.logoutUser();
      setMessage(response.message);

      // Stay on the page for 5 seconds, then redirect
      setTimeout(() => {
        navigate("/login");
      }, 3000);
    };

    logout();
  }, [navigate]);

  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      <h2>{message}</h2>
      <p>Redirecting to login in 3 seconds...</p>
    </div>
  );
};

export default LogoutPage;
