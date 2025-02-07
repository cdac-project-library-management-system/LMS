import React from "react";
import BorrowedBooksList from "../../components/user/BorrowedBooksList";
import DueBooksAlert from "../../components/user/DueBooksAlert";
import MainLayout from "../../components/user/layout/MainLayout";

const BorrowedBooks = () => {
  // Sample borrowed books data (You can use the actual data from API)
  const booksData = [
    { id: 1, title: "The Pragmatic Programmer", author: "Andrew Hunt & David Thomas", dueDate: "2025-02-15", status: "Overdue" },
    { id: 2, title: "Clean Code", author: "Robert C. Martin", dueDate: "2025-02-10", status: "Borrowed" },
    { id: 3, title: "Introduction to Algorithms", author: "Cormen et al.", dueDate: "2025-02-20", status: "Returned" },
    { id: 4, title: "Refactoring", author: "Martin Fowler", dueDate: "2025-03-05", status: "Borrowed" },
    { id: 5, title: "Design Patterns", author: "Erich Gamma et al.", dueDate: "2025-03-10", status: "Borrowed" },
    { id: 6, title: "You Don’t Know JS", author: "Kyle Simpson", dueDate: "2025-02-25", status: "Overdue" },
    { id: 7, title: "JavaScript: The Good Parts", author: "Douglas Crockford", dueDate: "2025-02-18", status: "Returned" },
  ];

  // Check if any book is overdue
  const hasOverdueBooks = booksData.some(book => book.status === "Overdue");

  return (
    <>
      <MainLayout>
        {hasOverdueBooks && <DueBooksAlert />}
        <BorrowedBooksList booksData={booksData} />
      </MainLayout>
    </>
  );
};

export default BorrowedBooks;
