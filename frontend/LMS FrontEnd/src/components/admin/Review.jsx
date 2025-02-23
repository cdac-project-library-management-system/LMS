import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Search } from "lucide-react";

const Review = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [reviews] = useState([
    {
      id: 1,
      member: "Arya Stark",
      book: "A Game of Thrones",
      rating: 5,
      comment: "Amazing book! A must-read.",
    },
    {
      id: 2,
      member: "Frodo Baggins",
      book: "The Lord of the Rings",
      rating: 4,
      comment: "Great adventure, but a bit long.",
    },
    {
      id: 3,
      member: "Jon Snow",
      book: "A Clash of Kings",
      rating: 3,
      comment: "Good, but not as engaging as the first book.",
    },
    {
      id: 4,
      member: "Gandalf the Grey",
      book: "The Hobbit",
      rating: 5,
      comment: "Absolutely love this classic!",
    },
    {
      id: 5,
      member: "Tyrion Lannister",
      book: "A Storm of Swords",
      rating: 4,
      comment: "One of the best books in the series.",
    },
  ]);

  // Filter reviews based on search query
  const filteredReviews = reviews.filter(
    (review) =>
      review.member.toLowerCase().includes(searchQuery.toLowerCase()) ||
      review.book.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-lg-10 col-md-9 col-12">
          <div className="bg-white p-4 rounded shadow-sm">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h3 className="font-weight-bold text-dark">Reviews</h3>
              <div className="d-flex">
                <input
                  type="text"
                  className="form-control me-2"
                  style={{ width: "250px" }}
                  placeholder="Search by member or book"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                    <span className="input-group-text bg-primary text-white">
                      <Search size={20} />
                    </span>
              </div>
            </div>

            {/* Reviews Table */}
            <div className="table-responsive">
              <table className="table table-bordered table-hover">
                <thead className="table-dark">
                  <tr>
                    <th>Member</th>
                    <th>Book</th>
                    <th>Rating</th>
                    <th>Comment</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredReviews.map((review) => (
                    <tr key={review.id}>
                      <td>{review.member}</td>
                      <td>{review.book}</td>
                      <td>{"⭐".repeat(review.rating)}</td>
                      <td>{review.comment}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Review;
