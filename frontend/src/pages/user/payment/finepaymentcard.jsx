import React, { useEffect, useState } from "react";
import FinePaymentCard from "../../../components/user/payment/finepaymentcard";
import { Row, Col } from "react-bootstrap";
import Layout from "../../../components/user/layout/MainLayout";
import FineService from "../../../services/FineService";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const FineManagement = () => {
  const [fines, setFines] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUserFines();
  }, []);

  const fetchUserFines = async () => {
    try {
      setLoading(true);
      const response = await FineService.getUserFines();
      console.log("Fines Response:", response); // Debugging
  
      // Filter out fines that are PAID
      const unpaidFines = (response.items || []).filter(fine => fine.status !== "PAID");
  
      setFines(unpaidFines);
    } catch (error) {
      console.error("Error fetching user fines:", error);
      toast.error("Failed to fetch fines");
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <Layout>
      <ToastContainer position="top-right" autoClose={3000} />
      
      {loading ? (
        <div className="text-center" style={{ paddingTop: "30px" }}>Loading fines...</div>
        ) : fines.length > 0 ? (
        <Row className="justify-content-center" style={{ paddingTop: "30px" }}>
          {fines.map((fine) => (
            <Col xs={12} sm={6} md={6} lg={4} key={fine.id} className="mb-4 d-flex justify-content-center">
              <FinePaymentCard fineDetails={fine} />
            </Col>
          ))}
        </Row>
        ) : (
        // Only show message if there are no unpaid fines
        <Row className="justify-content-center" style={{ paddingTop: "30px" }}>
          <Col xs={12} className="text-center">
            <h4 className="fw-bold text-success">You have no pending fines.</h4>
          </Col>
        </Row>
      )}

    </Layout>
  );
};

export default FineManagement;
