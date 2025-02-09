import React from "react";
import FinePaymentCard from "../../../components/user/payment/finepaymentcard";
import { Container, Row, Col } from "react-bootstrap";
import Layout from '../../../components/user/layout/MainLayout';
import { Columns, Grid } from "react-bootstrap-icons";

const FineManagement = () => {
  const fines = [
    {
      BookId:"1",
      BorrowedBook: "Data Structures",
      amount: 500,
      dueDate: "2025-02-10",
      dayspastdue: 50,
      reason: "Late Return",
    },
    {
      BookId:"2",
      BorrowedBook: "Operating Systems",
      amount: 300,
      dueDate: "2025-02-12",
      dayspastdue: 40,
      reason: "Lost Book",
    },
    {
      BookId:"3",
      BorrowedBook: "Algorithms",
      amount: 250,
      dueDate: "2025-02-15",
      dayspastdue: 30,
      reason: "Damaged Book",
    },
    {
      BookId:"4",
      BorrowedBook: "Data Structures",
      amount: 500,
      dueDate: "2025-02-10",
      dayspastdue: 50,
      reason: "Late Return",
    },
    {
      BookId:"5",
      BorrowedBook: "Operating Systems",
      amount: 300,
      dueDate: "2025-02-12",
      dayspastdue: 40,
      reason: "Lost Book",
    },
    {
      BookId:"6",
      BorrowedBook: "Algorithms",
      amount: 250,
      dueDate: "2025-02-15",
      dayspastdue: 30,
      reason: "Damaged Book",
    },
  ];

  return (
    <Layout>
      <Row className="g-0" style={{ paddingTop: "0", paddingBottom: "0" }}>
        {fines.map((fine) => (
          <Col xs={12} sm={6} md={4} lg={3}>
            <FinePaymentCard fineDetails={fine} />
          </Col>
        ))}
      </Row> <br/>
    </Layout>
  );
};

export default FineManagement;
