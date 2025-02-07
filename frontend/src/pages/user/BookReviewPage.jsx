import React from "react";
import BookReview from "../../components/user/BookReview";
import MainLayout from "../../components/user/layout/MainLayout";

const returnedBooks = [
  {
    id: 1,
    title: "The Alchemist",
    author: "Paulo Coelho",
    image: "https://images.unsplash.com/photo-1738471743329-b50393cf6319?q=80&w=2001&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 2,
    title: "Atomic Habits",
    author: "James Clear",
    image: "https://images.unsplash.com/photo-1598301257942-e6bde1d2149b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

const BookReviewPage = () => {
  return (
    <MainLayout>
      <BookReview returnedBooks={returnedBooks} />
    </MainLayout>
  );
};

export default BookReviewPage;
