import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import styles from "../../styles/user/BookCard.module.css";
import defaultBookCover from '../../assets/book-cover-blue-book-cover.jpg'; // Import default image

const BookCard = ({ book }) => {
  console.log("Book Data:", book);
  console.log("Cover Image URL:", book.coverImageUrl);

  return (
    <div className="align-content-center">
      <Link to={`/book/${book.id}`} className={styles.bookLink}>
        <div className={styles.bookCard}>
          <img
            src={book.coverImageUrl}
            alt={book.title} 
            className={styles.bookImage}
            onError={(e) => {
              console.error(`Failed to load image: ${book.coverImageUrl}`);
              e.target.src = defaultBookCover; // Set default image on error
            }}
          />
          <h3 className={styles.bookTitle}>{book.title}</h3>
          <p className={styles.bookAuthor}>by {book.author}</p>
        </div>
      </Link>
    </div>
  );
};

BookCard.propTypes = {
  book: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    coverImageUrl: PropTypes.string.isRequired,
  }).isRequired,
};

export default BookCard;
