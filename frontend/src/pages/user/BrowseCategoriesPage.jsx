import React from "react";
import Layout from "../../components/user/layout/MainLayout";
import { Card, Container } from "react-bootstrap";

const BrowseCategories = () => {
  return (
    <Layout>
      <Container className="d-flex justify-content-center align-items-center" style={{ height: "80vh" }}>
        <Card className="text-center p-4 shadow" style={{ backgroundColor: "#e6bfbe", maxWidth: "400px" }}>
          <Card.Body>
            <h3 className="fw-bold">Under Progress</h3>
          </Card.Body>
        </Card>
      </Container>
    </Layout>
  );
};

export default BrowseCategories;
