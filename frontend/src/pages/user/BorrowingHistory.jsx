import React, { useEffect, useState } from "react";
import BorrowedBooksList from "../../components/user/BorrowedBooksList";
import DueBooksAlert from "../../components/user/DueBooksAlert";
import MainLayout from "../../components/user/layout/MainLayout";
import { getUserInfo } from "../../services/api";
import BorrowService from "../../services/BorrowService";
import BookService from "../../services/BookService";

const BorrowedBooks = () => {
  const [booksData, setBooksData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBorrowedBooks = async () => {
      setLoading(true);
      setError(null);
      try {
        const userInfo = getUserInfo();
        if (!userInfo || !userInfo.userId) {
          throw new Error("User not authenticated.");
        }
        
        const response = await BorrowService.getBorrowRecordsByUser(userInfo.userId);
        console.log("Borrowed books response:", response); // Debug API response
        const borrowedBooks = response.items || [];
    
        // Fetch book details for each borrowed book
        const booksWithDetails = await Promise.all(
          borrowedBooks.map(async (record) => {
            if (!record.book_id) {
              console.error(`Missing bookId for record:`, record);
              return {
                id: record.id,
                title: "Unknown Title",
                author: "Unknown Author",
                dueDate: record.dueDate || "Unknown Due Date",
                status: record.status || "Unknown Status",
              };
            }
    
            try {
              console.log(`Fetching book details for bookId: ${record.book_id}`);
              const book = await BookService.getBookById(record.bookId);
              return {
                id: record.id,
                title: book?.title || "Unknown Title",
                author: book?.author || "Unknown Author",
                dueDate: record.dueDate || "Unknown Due Date",
                status: record.status || "Unknown Status",
              };
            } catch (bookError) {
              console.error(`Error fetching book details for bookId: ${record.bookId}`, bookError);
              return {
                id: record.id,
                title: "Unknown Title",
                author: "Unknown Author",
                dueDate: record.dueDate || "Unknown Due Date",
                status: record.status || "Unknown Status",
              };
            }
          })
        );
    
        setBooksData(booksWithDetails);
      } catch (err) {
        console.error("Error fetching borrowed books:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };    

    fetchBorrowedBooks();
  }, []);

  const hasOverdueBooks = booksData.some((book) => book.status === "Overdue");

  return (
    <MainLayout>
      {loading && <p>Loading borrowed books...</p>}
      {error && <p className="text-danger">{error}</p>}
      {!loading && !error && hasOverdueBooks && <DueBooksAlert />}
      {!loading && !error && booksData.length > 0 && <BorrowedBooksList booksData={booksData} />}
      {!loading && !error && booksData.length === 0 && <p>No borrowed books found.</p>}
    </MainLayout>
  );
};

export default BorrowedBooks;
