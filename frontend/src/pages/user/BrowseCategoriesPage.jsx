import React, { useState } from "react";
import BookCard from "../../components/user/BookCard"; // Importing existing BookCard component
import Layout from "../../components/user/layout/MainLayout"
const BrowseCategories = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Sample book data inside the page (No separate JSON file)
  const books = [
    { id: 1, title: "Life's Amazing Secrets", author: "Gaur Gopal Das", category: "Self-Help", image: "/images/book1.jpg" },
    { id: 2, title: "The Alchemist", author: "Paulo Coelho", category: "Fiction", image: "/images/book2.jpg" },
    { id: 3, title: "Sapiens", author: "Yuval Noah Harari", category: "Non-Fiction", image: "/images/book3.jpg" },
    { id: 4, title: "The Silent Patient", author: "Alex Michaelides", category: "Mystery", image: "/images/book4.jpg" },
    { id: 5, title: "Harry Potter", author: "J.K. Rowling", category: "Fantasy", image: "/images/book5.jpg" },
    { id: 6, title: "Dune", author: "Frank Herbert", category: "Sci-Fi", image: "/images/book6.jpg" },
    { id: 7, title: "Steve Jobs", author: "Walter Isaacson", category: "Biography", image: "/images/book7.jpg" }
  ];

  const categories = ["All", "Self-Help", "Fiction", "Non-Fiction", "Mystery", "Fantasy", "Sci-Fi", "Biography"];

  // Filter books based on selected category
  const filteredBooks = selectedCategory === "All" ? books : books.filter((book) => book.category === selectedCategory);

  return (
    <>
    <Layout>
    <div className="p-4">
      {/* Horizontally Scrollable Category Buttons */}
      <div className="flex overflow-x-auto space-x-3 pb-3">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 border rounded transition duration-300 ${
              selectedCategory === category
                ? "bg-blue-600 text-white shadow-md"
                : "bg-white hover:bg-gray-200"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Horizontally Scrollable Book List */}
      <div className="mt-4 overflow-x-auto whitespace-nowrap flex space-x-5 p-2 scrollbar-hide">
        {filteredBooks.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>
    </div>
    </Layout>
    </>
  );
};

export default BrowseCategories;
