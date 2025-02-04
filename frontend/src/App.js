import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/user/Login';
import Register from './pages/user/Register';
import ForgotPassword from './pages/user/ForgotPassword';
import BorrowedBooks from './pages/user/BorrowingHistory';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import './styles/global.css'; // Import global styles
import UserDashboard from './pages/user/UserDashboard';
import BookInfo from './pages/user/BookInfo';
import BrowseCategoriesPage from './pages/user/BrowseCategoriesPage';
import BookReviewPage from './pages/user/BookReviewPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/dashboard" element={<UserDashboard />} />
        <Route path="/browse-categories" element={<BrowseCategoriesPage />} />
        <Route path="/borrowed-books" element={<BorrowedBooks />} />
        <Route path="/review-book" element={<BookReviewPage />} />
        <Route path="/book/:bookId" element={<BookInfo />} />
        <Route path="*" element={<Login />} /> {/* Default to login */}
      </Routes>
    </Router>
  );
}

export default App;
