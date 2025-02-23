import React, { useEffect, useState } from "react";
import { Container, Spinner, Alert } from "react-bootstrap";
import BookCard from "./BookCard";
import styles from "../../styles/user/UserHome.module.css";
import BookService from "../../services/BookService";

const UserHome = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const data = await BookService.getAllBooks();  
        if (Array.isArray(data)) {
          setBooks(data); // Only set if data is an array
        } else {
          console.error("Invalid data format:", data);
          setError("Invalid data format received.");
        }
      } catch (err) {
        console.error("Error fetching books:", err);
        setError("Failed to load books. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
  
    fetchBooks();
  }, []);
  

  return (
    <Container className={styles.userHome}>
      <h2 className={`text-center ${styles.homeTitle}`} style={{ color: "#3b3b3b" }}>
        Welcome to Library Management System
      </h2>

      {loading && <Spinner animation="border" role="status" />}
      {error && <Alert variant="danger">{error}</Alert>}
      {!loading && !error && <Section title="📚 Available Books" books={books} />}
    </Container>
  );
};

const Section = ({ title, books }) => (
  <div className={styles.bookSection}>
    <h3 className={styles.sectionTitle}>{title}</h3>
    <div className={styles.scrollContainer}>
      <div className={styles.booksRow}>
        {books.map((book) => (
          <div key={book.id} className={styles.bookCardWrapper}>
            <BookCard book={book} />
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default UserHome;
