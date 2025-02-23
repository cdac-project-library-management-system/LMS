import React from "react";
import { Card } from "react-bootstrap";
import { Users, Book, UserCheck, RefreshCw } from "lucide-react";

const StatComp = ({ title, value, icon }) => {
  const iconMap = {
    users: <Users size={24} color="white" />, 
    books: <Book size={24} color="white" />, 
    members: <UserCheck size={24} color="white" />, 
    sync: <RefreshCw size={24} color="white" />,
  };

  return (
    <Card
      className="shadow-sm border-0 p-3 d-flex flex-row justify-content-between align-items-center"
      style={{ transition: "transform 0.3s ease-in-out" }}
      onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
      onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}>
      <div
        className="rounded-circle d-flex align-items-center justify-content-center"
        style={{
          width: "50px",
          height: "50px",
          backgroundColor: "#6c757d", // Default background color
        }}>
        {iconMap[icon]}
      </div>
      <div className="text-end">
        <h6 className="mb-0">{title}</h6>
        <h4 className="fw-bold">{value}</h4>
      </div>
    </Card>
  );
};

export default StatComp;
