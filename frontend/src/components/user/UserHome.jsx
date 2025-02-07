import React from "react";
import { Container } from "react-bootstrap";
import BookCard from "./BookCard";
import styles from "../../styles/user/UserHome.module.css";

const UserHome = () => {
  // Mock book data
  const popularBooks = [
    { id: 1, title: "Atomic Habits", author: "James Clear", image: "https://images.unsplash.com/photo-1598301257942-e6bde1d2149b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { id: 2, title: "The Alchemist", author: "Paulo Coelho", image: "/books/alchemist.jpg" },
    { id: 3, title: "Sapiens", author: "Yuval Noah Harari", image: "/books/sapiens.jpg" },
    { id: 4, title: "1984", author: "George Orwell", image: "/books/1984.jpg" },
  ];

  const recommended = [
    { id: 5, title: "Rich Dad Poor Dad", author: "Robert Kiyosaki", image: "/books/rich-dad.jpg" },
    { id: 6, title: "Harry Potter", author: "J.K. Rowling", image: "/books/harry-potter.jpg" },
    { id: 7, title: "The Psychology of Money", author: "Morgan Housel", image: "/books/money.jpg" },
    { id: 8, title: "To Kill a Mockingbird", author: "Harper Lee", image: "/books/mockingbird.jpg" },
  ];

  const newArrivals = [
    { id: 9, title: "The Subtle Art of Not Giving a F*ck", author: "Mark Manson", image: "/books/subtle-art.jpg" },
    { id: 10, title: "Deep Work", author: "Cal Newport", image: "/books/deep-work.jpg" },
    { id: 11, title: "Can't Hurt Me", author: "David Goggins", image: "/books/cant-hurt-me.jpg" },
    { id: 12, title: "The Midnight Library", author: "Matt Haig", image: "/books/midnight-library.jpg" },
  ];

  return (
    <Container className={styles.userHome}>
      <h2 className={`text-center ${styles.homeTitle}`}>📖 Welcome to Digital Library</h2>
      <Section title="🔥 Popular Books" books={popularBooks} />
      <Section title="🏆 Recommended" books={recommended} />
      <Section title="🆕 New Arrivals" books={newArrivals} />
    </Container>
  );
};

// **Reusable Section Component**
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
