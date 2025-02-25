import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Card, Button, Row, Col } from "react-bootstrap";
import BorrowService from "../../../services/BorrowService"; 
import BookService from "../../../services/BookService"; 
import "../../../styles/user/payment/finepaymentcard.css";

const FinePaymentCard = ({ fineDetails }) => {
  const navigate = useNavigate();
  const [dueDate, setDueDate] = useState(null);
  const [bookTitle, setBookTitle] = useState("Loading...");
  const borrowId = fineDetails.borrowRecordId;

  const fetchBookTitle = useCallback(async (bookId) => {
    try {
      const bookResponse = await BookService.getBookById(bookId);
      setBookTitle(bookResponse.title); 
    } catch (error) {
      console.error("Error fetching book title:", error);
      setBookTitle("Unknown Book");
    }
  }, []);

  const fetchBorrowRecord = useCallback(async () => {
    if (!borrowId) return;
    try {
      const response = await BorrowService.getBorrowRecordById(borrowId);
      const formattedDate = response.dueDate.split("T")[0];
      setDueDate(formattedDate);
      fetchBookTitle(response.bookId);
    } catch (error) {
      console.error("Error fetching borrow record:", error);
    }
  }, [borrowId, fetchBookTitle]);

  useEffect(() => {
    fetchBorrowRecord();
  }, [fetchBorrowRecord]);

  const handlePayment = () => {
    navigate("/fine-payment-gateway");
  };

  return (
    <Card className="fine-payment-card shadow-lg" style={{ width: "100%", maxWidth: "300px", padding: "20px" }}>
      <Card.Header className="fine-card-header text-center fw-bold">
        {bookTitle}
      </Card.Header>
      <Card.Body className="p-4">
        <div className="fine-details">
          <Row className="mb-2">
            <Col xs={6} className="fw-bold">Due Date:</Col>
            <Col xs={6}>{dueDate || "Loading..."}</Col>
          </Row>
          <Row className="mb-2">
            <Col xs={6} className="fw-bold">Days Past Due:</Col>
            <Col xs={6}>{fineDetails.daysOverdue}</Col>
          </Row>
          <Row className="mb-3">
            <Col xs={6} className="fw-bold">Fine Amount:</Col>
            <Col xs={6} className="fw-bold">₹{fineDetails.fineAmount}</Col>
          </Row>
        </div>

        <Button style={{ backgroundColor: "#ad5b5b" }} className="pay-now-btn w-100" onClick={handlePayment}>
          Pay Now
        </Button>
      </Card.Body>
    </Card>
  );
};

export default FinePaymentCard;
