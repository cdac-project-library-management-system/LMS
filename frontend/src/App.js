import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/user/Login';
import UserProfile from './pages/user/profile-management/ProfilePage'; // Import UserProfile

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
import BookDetailsPage from './pages/admin/BookDetailsPage';
import MemberDetailsPage from './pages/admin/MemberDetails';
import EditUserPage from './pages/admin/EditUserPage';
import AddBookPage from './pages/admin/AddBookPage';
import EditBookPage from './pages/admin/EditBookDetailsPage';
import FinesPage from './pages/admin/FinePage';
import ReservationPage from './pages/admin/ReservationPage';
import TransactionPage from './pages/admin/TransactionPage';
import ReviewPage from './pages/admin/BookReviewPage';
import ChangePassword from './pages/user/profile-management/changepass';
import FineManagement from './pages/user/payment/finepaymentcard';
import LogoutPage from './pages/user/logout';
import AddCategory from './pages/admin/AddCategory'
import { ToastContainer } from 'react-bootstrap';


import Dashboard from './pages/admin/DashboardPage';




function App() {
  return (
    <>
    <ToastContainer position="top-right" autoClose={3000} />
    <Router>
      <Routes>
      <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/browse-categories" element={<BrowseCategoriesPage />} />
        <Route path="/borrowed-books" element={<BorrowedBooks />} />
        <Route path="/review-book" element={<BookReviewPage />} />
        <Route path="/book/:bookId" element={<BookInfo />} />
        <Route path="/userProfile" element={< UserProfile/>} />
        <Route path="/change-password" element={< ChangePassword />} />
        <Route path="/userProfile" element={<UserProfile />} /> 
        <Route path="/logout" element={<LogoutPage/>} />
        <Route path="/" element={<UserDashboard/>}/>

        <Route path="/fine" element={< FineManagement/>} />
        <Route path="/*" element={<Login />} /> {/* Default to Login */}
     
       
       <Route path="/admin/UserDetails" element={<MemberDetailsPage/>}/>
       <Route path="/admin/EditUser/:id" element={<EditUserPage/>}/>
       <Route path="/admin/BookDetails" element={<BookDetailsPage/>}/>
       <Route path="/admin/ManageReservations" element={<ReservationPage/>}/>
       <Route path="/admin/AddBook" element={<AddBookPage/>}/>
       <Route path="/admin/EditBook/:id" element={<EditBookPage/>}/>
       <Route path="/admin/Fines" element={<FinesPage/>} />
       <Route path="/admin/Transaction" element={<TransactionPage/>}/>
       <Route path="/admin/BookReviews" element={<ReviewPage/>}/>
       <Route path="/admin/Dashboard" element={<Dashboard/>} />
       <Route path="/admin/AddCategory" element={<AddCategory/>} />
      </Routes>
    </Router>
    </>
  );
}

export default App;
