import React from "react";
import { useNavigate } from "react-router-dom";
import { Card, Button, Container, Row, Col } from "react-bootstrap";
import "../../../styles/user/payment/finepaymentcard.css";

const FinePaymentCard = ({ fineDetails }) => {
  const navigate = useNavigate();

  const handlePayment = () => {
    navigate("/fine-payment-gateway");
  };

  return (
    <Container className="d-flex justify-content-center align-items-center fine-payment-container">
      <Card className="fine-payment-card shadow-lg">
        <Card.Header className="fine-card-header text-center fw-bold">
        {fineDetails.BorrowedBook}
        </Card.Header>
        <Card.Body className="p-4">
          <div className="fine-details">
            <Row className="mb-2">
              <Col xs={6} className="fw-bold">Due Date:</Col>
              <Col xs={6}>{fineDetails.dueDate}</Col>
            </Row>
            <Row className="mb-2">
              <Col xs={6} className="fw-bold">Days Past Due:</Col>
              <Col xs={6}>{fineDetails.dayspastdue}</Col>
            </Row>
            <Row className="mb-2">
              <Col xs={6} className="fw-bold">Reason:</Col>
              <Col xs={6}>{fineDetails.reason}</Col>
            </Row>
            <Row className="mb-3">
              <Col xs={6} className="fw-bold">Fine Amount:</Col>
              <Col xs={6} className="fw-bold">₹{fineDetails.amount}</Col>
            </Row>
          </div>

          <Button className="pay-now-btn w-100" onClick={handlePayment}>
            Pay Now
          </Button>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default FinePaymentCard;
