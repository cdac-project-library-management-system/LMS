import React, { useEffect, useState } from "react";
import StatComp from "./StatComponent";
import { Container, Row, Col } from "react-bootstrap";
import BookService from "../../services/BookService";
import { getUsers } from "../../services/user"; // Import the required services

const DashboardStats = () => {
  const [totalUsers, setTotalUsers] = useState(null);
  const [totalBooks, setTotalBooks] = useState(null);
  
  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      // Fetch total users
      const users = await getUsers();
      setTotalUsers(users.length); // Count total users

      // Fetch total books
      const books = await BookService.getAllBooks();
      setTotalBooks(books.length); // Count total books
    } catch (error) {
      console.error("Error fetching dashboard stats:", error);
    }
  };

  return (
    <Container fluid className="my-4">
      <Row className="g-3">
        <Col md={3}>
          <StatComp
            icon="users"
            title="Total Users"
            value={totalUsers !== null ? totalUsers : "Loading..."} // Show loading until data is fetched
          />
        </Col>
        <Col md={3}>
          <StatComp
            icon="books"
            title="Total Books"
            value={totalBooks !== null ? totalBooks : "Loading..."} // Show loading until data is fetched
          />
        </Col>
        <Col md={3}>
          <StatComp
            icon="members"
            title="Total Members"
            value="1234" // Replace this with an actual API call if needed
          />
        </Col>
        <Col md={3}>
          <StatComp
            icon="sync"
            title="Active Sessions"
            value="5" // Replace this with an actual API call if needed
          />
        </Col>
      </Row>
    </Container>
  );
};

export default DashboardStats;
