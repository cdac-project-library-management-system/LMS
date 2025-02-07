import React, { useState } from "react";
import PropTypes from "prop-types";
import styles from "../../styles/user/BookReview.module.css";

const BookReview = ({ returnedBooks }) => {
  const [reviews, setReviews] = useState({});
  const [submittedReviews, setSubmittedReviews] = useState({});

  const handleRatingChange = (bookId, rating) => {
    if (!submittedReviews[bookId]) { // Prevent changing rating after submission
      setReviews((prev) => ({
        ...prev,
        [bookId]: { ...prev[bookId], rating },
      }));
    }
  };

  const handleCommentChange = (bookId, comment) => {
    if (!submittedReviews[bookId]) { // Prevent changing comment after submission
      setReviews((prev) => ({
        ...prev,
        [bookId]: { ...prev[bookId], comment },
      }));
    }
  };

  const handleSubmit = (bookId) => {
    console.log("Review submitted:", {
      bookId,
      ...reviews[bookId],
    });

    // API Call to save review can be added here.

    setSubmittedReviews((prev) => ({
      ...prev,
      [bookId]: true, // Mark this book as reviewed
    }));

    alert(`Review submitted for Book ID: ${bookId}`);
  };

  return (
    <div className={styles.reviewContainer}>
      <h2>Review Returned Books</h2>
      {returnedBooks.length === 0 ? (
        <p>No books to review.</p>
      ) : (
        returnedBooks.map((book) => (
          <div key={book.id} className={styles.bookCard}>
            <img src={book.image} alt={book.title} className={styles.bookImage} />
            <div className={styles.bookDetails}>
              <h3>{book.title}</h3>
              <p>by {book.author}</p>

              <div className={styles.rating}>
                <span>Rate this book:</span>
                {[1, 2, 3, 4, 5].map((star) => (
                  <span
                    key={star}
                    className={`${styles.star} ${reviews[book.id]?.rating >= star ? styles.filled : ""} ${
                      submittedReviews[book.id] ? styles.disabledStar : ""
                    }`}
                    onClick={() => handleRatingChange(book.id, star)}
                  >
                    ★
                  </span>
                ))}
              </div>

              <textarea
                className={styles.commentBox}
                placeholder="Write your review..."
                value={reviews[book.id]?.comment || ""}
                onChange={(e) => handleCommentChange(book.id, e.target.value)}
                disabled={submittedReviews[book.id]} // Disable after submission
              />

              {!submittedReviews[book.id] && ( // Hide button after submission
                <button className={styles.submitBtn} onClick={() => handleSubmit(book.id)}>
                  Submit Review
                </button>
              )}

              {submittedReviews[book.id] && <p className={styles.submittedMessage}>Review Submitted ✅</p>}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

BookReview.propTypes = {
  returnedBooks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      author: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default BookReview;
