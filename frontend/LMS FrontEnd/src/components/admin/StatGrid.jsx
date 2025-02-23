import React from "react";
import StatComp from "./StatComponent";
import { Container, Row, Col } from "react-bootstrap";

const DashboardStats = () => {
  return (
    <Container fluid className="my-4">
      <Row className="g-3">
        <Col md={3}>
          <StatComp
            icon="users" // Matches the `iconMap` key in StatComponent
            title="Logged in Users"
            value="10"
          />
        </Col>
        <Col md={3}>
          <StatComp
            icon="books" // Matches the `iconMap` key in StatComponent
            title="Total Books"
            value="232"
          />
        </Col>
        <Col md={3}>
          <StatComp
            icon="members" // Matches the `iconMap` key in StatComponent
            title="Total Members"
            value="1234"
          />
        </Col>
        <Col md={3}>
          <StatComp
            icon="sync" // Matches the `iconMap` key in StatComponent
            title="Active Sessions"
            value="5"
          />
        </Col>
      </Row>
    </Container>
  );
};

export default DashboardStats;
