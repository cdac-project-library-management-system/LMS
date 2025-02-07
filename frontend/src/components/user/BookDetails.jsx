// // src/pages/BookDetails.jsx
// import React from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import styles from './BookDetails.module.css';

// const BookDetails = () => {
//   const { bookId } = useParams();
//   const navigate = useNavigate();

//   // Fetch book data (replace with actual API call)
//   const books = [
//     { id: 1, title: "Atomic Habits", author: "James Clear", image: "/books/atomic-habits.jpg" },
//     { id: 2, title: "The Alchemist", author: "Paulo Coelho", image: "/books/alchemist.jpg" },
//     { id: 3, title: "Sapiens", author: "Yuval Noah Harari", image: "/books/sapiens.jpg" },
//     { id: 4, title: "1984", author: "George Orwell", image: "/books/1984.jpg" },
//     { id: 5, title: "Rich Dad Poor Dad", author: "Robert Kiyosaki", image: "/books/rich-dad.jpg" },
//     { id: 6, title: "Harry Potter", author: "J.K. Rowling", image: "/books/harry-potter.jpg" },
//     { id: 7, title: "The Psychology of Money", author: "Morgan Housel", image: "/books/money.jpg" },
//     { id: 8, title: "To Kill a Mockingbird", author: "Harper Lee", image: "/books/mockingbird.jpg" },
//     { id: 9, title: "The Subtle Art of Not Giving a F*ck", author: "Mark Manson", image: "/books/subtle-art.jpg" },
//     { id: 10, title: "Deep Work", author: "Cal Newport", image: "/books/deep-work.jpg" },
//     { id: 11, title: "Can't Hurt Me", author: "David Goggins", image: "/books/cant-hurt-me.jpg" },
//     { id: 12, title: "The Midnight Library", author: "Matt Haig", image: "/books/midnight-library.jpg" },
//   ];

//   const book = books.find(b => b.id === parseInt(bookId));

//   if (!book) return <div>Book not found</div>;

//   return (
//     <div className={styles.bookDetails}>
//       <button className={styles.backButton} onClick={() => navigate(-1)}>
//         ← Back to results
//       </button>

//       <div className={styles.bookContent}>
//         <img src={book.image} alt={book.title} className={styles.bookImage} />
        
//         <div className={styles.bookInfo}>
//           <h2 className={styles.bookTitle}>{book.title}</h2>
//           <h3 className={styles.bookAuthor}>{book.author}</h3>
//           <p className={styles.bookPages}><strong>Pages:</strong> {book.pages}</p>
//           <p className={styles.bookDescription}>{book.description}</p>

//           <div className={styles.buttonGroup}>
//             <button className={styles.statusButton}>Availability Status</button>
//             <button className={styles.borrowButton}>Borrow</button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default BookDetails;




import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styles from "../../styles/user/BookDetails.module.css";

const BookDetails = () => {
  const { bookId } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);

  useEffect(() => {
    // TODO: Replace this with actual API fetching when backend is ready
    // const fetchBookDetails = async () => {
    //   try {
    //     const response = await fetch(`http://localhost:5000/api/books/${bookId}`);
    //     if (!response.ok) throw new Error("Book not found");
    //     const data = await response.json();
    //     setBook(data);
    //   } catch (err) {
    //     console.error(err);
    //   } finally {
    //     setLoading(false);
    //   }
    // };

    // Using dummy data for now
    const dummyBooks = [
      {
        id: "1",
        title: "Atomic Habits",
        author: "James Clear",
        pages: 320,
        description: "A book about habit formation and productivity.",
        image: "https://images.unsplash.com/photo-1598301257942-e6bde1d2149b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      },
      {
        id: "2",
        title: "The Alchemist",
        author: "Paulo Coelho",
        pages: 197,
        description: "A novel about following your dreams and destiny.",
        image: "https://via.placeholder.com/150",
      },
      {
        id: "3",
        title: "Deep Work",
        author: "Cal Newport",
        pages: 296,
        description: "A book on focused success in a distracted world.",
        image: "https://via.placeholder.com/150",
      },
    ];

    // Simulate API delay
    setTimeout(() => {
      const foundBook = dummyBooks.find((b) => b.id === bookId);
      setBook(foundBook || null);
    }, 0);
  }, [bookId]);
  
  if (!book) return <div>Book not found</div>;

  return (
    <div className={styles.bookDetails}>
      <button className={styles.backButton} onClick={() => navigate(-1)}>
        ← Back to results
      </button>

      <div className={styles.bookContent}>
        <img src={book.image} alt={book.title} className={styles.bookImage} />

        <div className={styles.bookInfo}>
          <h2 className={styles.bookTitle}>{book.title}</h2>
          <h3 className={styles.bookAuthor}>by {book.author}</h3>
          <p className={styles.bookPages}>
            <strong>Pages:</strong> {book.pages}
          </p>
          <p className={styles.bookDescription}>
            {book.description || "No description available."}
          </p>

          <div className={styles.buttonGroup}>
            <button className={styles.statusButton}>Check Availability</button>
            <button className={styles.borrowButton}>Borrow</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetails;
