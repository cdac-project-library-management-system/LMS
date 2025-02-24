import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify"; // Import toastify
import "react-toastify/dist/ReactToastify.css"; // Import toastify CSS
import styles from "../../styles/user/BookDetails.module.css";
import BookService from "../../services/BookService";
import ReservationService from "../../services/ReservationService";
import { getUserInfo } from "../../services/api";

const BookDetails = () => {
  const { bookId } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isBorrowed, setIsBorrowed] = useState(false); // Track if book is borrowed
  const [buttonFade, setButtonFade] = useState(false); // Button fade effect
  const userId = getUserInfo().userId;

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const data = await BookService.getBookById(bookId);
        setBook(data);
        setIsBorrowed(data.isBorrowed || false); // Check if already borrowed
      } catch (err) {
        setError("Failed to load book details.");
      } finally {
        setLoading(false);
      }
    };

    fetchBookDetails();
  }, [bookId]);

  const handleBorrow = async () => {
    if (isBorrowed) return; // Prevent duplicate borrowing

    setButtonFade(true); // Start fade effect

    try {
      await ReservationService.createReservation({
        bookId: bookId,
        userId: userId,
        reservationDate: new Date(),
        status: "PENDING",
      });
      console.log("success");
      toast.success("Borrow request sent successfully!"); // Success toast
      setIsBorrowed(true); // Mark as borrowed
    } catch (err) {
      toast.error("Failed to send borrow request."); // Error toast
    } finally {
      setTimeout(() => setButtonFade(false), 1000); // Restore button state after fade
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!book) return <div>Book not found</div>;

  return (
    <div className={styles.bookDetails}>
      <button className={styles.backButton} onClick={() => navigate(-1)}>
        ← Back to results
      </button>

      <div className={styles.bookContent}>
        <img
          src={book.coverImageUrl || "https://via.placeholder.com/150"}
          alt={book.title}
          className={styles.bookImage}
        />

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
            <button
              className={`${styles.borrowButton} ${buttonFade ? styles.fadeOut : ""}`} // Add fade effect
              onClick={handleBorrow}
              disabled={isBorrowed} // Disable if already borrowed
            >
              {isBorrowed ? "Borrowed" : "Borrow"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetails;
