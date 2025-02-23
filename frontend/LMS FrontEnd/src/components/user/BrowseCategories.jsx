import React, { useState } from "react";
import { Container, Form } from "react-bootstrap";
import BookCard from "./BookCard";
import styles from "../../styles/user/UserHome.module.css";

const BrowseCategory = ({ books }) => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedAuthor, setSelectedAuthor] = useState("All");

  // Extract unique categories & authors for dropdowns
  const categories = ["All", ...new Set(books.map(book => book.category))];
  const authors = ["All", ...new Set(books.map(book => book.author))];

  // Filter books
  const filteredBooks = books.filter(book =>
    (selectedCategory === "All" || book.category === selectedCategory) &&
    (selectedAuthor === "All" || book.author === selectedAuthor)
  );

  return (
    <Container className={styles.userHome}>
      <h2 className={`text-center ${styles.homeTitle}`} style={{ color: "#3b3b3b" }}>📚 Browse Books</h2>

      {/* Filter Options */}
      <div className={styles.filterContainer}>
        <Form.Select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)} className={styles.filterDropdown}>
          {categories.map(category => <option key={category} value={category}>{category}</option>)}
        </Form.Select>

        <Form.Select value={selectedAuthor} onChange={(e) => setSelectedAuthor(e.target.value)} className={styles.filterDropdown}>
          {authors.map(author => <option key={author} value={author}>{author}</option>)}
        </Form.Select>
      </div>

      {/* Display Books */}
      <Section title="📖 Available Books" books={filteredBooks} />
    </Container>
  );
};

// Reusable Section Component
const Section = ({ title, books }) => (
  <div className={styles.bookSection}>
    <h3 className={styles.sectionTitle}>{title}</h3>
    <div className={styles.scrollContainer}>
      <div className={styles.booksRow}>
        {books.length > 0 ? (
          books.map((book) => (
            <div key={book.id} className={styles.bookCardWrapper}>
              <BookCard book={book} />
            </div>
          ))
        ) : (
          <p className="text-center">No books found.</p>
        )}
      </div>
    </div>
  </div>
);

export default BrowseCategory;
