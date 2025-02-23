import React, { useEffect } from "react";
import { toast, ToastContainer } from "react-toastify"; // Import Toastify functions
import "react-toastify/dist/ReactToastify.css"; // Import the Toastify CSS

const DueBooksAlert = () => {
  
  // Show the toast notification when the component mounts
  useEffect(() => {
    toast.warn("You have overdue books that need to be returned.", {
      position: "top-right", 
      autoClose: 3000, 
      hideProgressBar: true, 
      closeOnClick: true, 
      draggable: true, 
      pauseOnHover: true, 
    });
  }, []);

  return (
    <>
      <ToastContainer />
    </>
  );
};

export default DueBooksAlert;
