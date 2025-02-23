import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import styles from "../../styles/user/BookCard.module.css";

const BookCard = ({ book }) => {
  return (
    <div className="align-content-center">
    <Link to={`/book/${book.id}`} className={styles.bookLink}>
      <div className={styles.bookCard}>
        <img src={book.image} alt={book.title} className={styles.bookImage} />
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
    image: PropTypes.string.isRequired,
  }).isRequired,
};

export default BookCard;
