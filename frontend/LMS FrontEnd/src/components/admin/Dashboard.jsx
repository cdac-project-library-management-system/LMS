import React from "react";
import GraphComponent from "./GraphComp";
import StatGridComp from "./StatGrid";
import UserAndBookList from "./UserAndBookList";

const DashboardComponent = () => {
  return (
    <div className="container-fluid">
      {/* Statistics Grid */}
      <div className="row mb-4">
        <div className="col-12">
          <StatGridComp />
        </div>
      </div>

      {/* Graph Section */}
      <div className="row mb-4">
        <div className="col-12">
          <GraphComponent />
        </div>
      </div>

      {/* User and Book List Section */}
      <div className="row">
        <div className="col-12">
          <UserAndBookList />
        </div>
      </div>
    </div>
  );
};

export default DashboardComponent;
