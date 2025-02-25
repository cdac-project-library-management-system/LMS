import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {
  const [chartData, setChartData] = useState({
    labels: ["Loading..."],
    datasets: [
      {
        label: "Loading...",
        data: [],
        borderColor: "rgba(0, 0, 0, 0.1)",
        backgroundColor: "rgba(0, 0, 0, 0.1)",
      },
    ],
  });

  const [activeTab, setActiveTab] = useState("Today");

  useEffect(() => {
    const fetchData = async () => {
      let data;

      switch (activeTab) {
        case "Today":
          data = {
            labels: ["Book Issued", "New Member", "Not Returned", "New Book "],
            datasets: [
              {
                label: "Number of Reports",
                data: [10, 12, 4, 16],
                borderColor: "rgba(75, 192, 192, 1)",
                backgroundColor: "rgba(75, 192, 192, 0.2)",
                tension: 0.4,
              },
            ],
          };
          break;
        case "Last Week":
          data = {
            labels: ["Book Issued", "New Member", "Not Returned", "New Book "],
            datasets: [
              {
                label: "Number of Reports",
                data: [15, 18, 10, 20],
                borderColor: "rgba(153, 102, 255, 1)",
                backgroundColor: "rgba(153, 102, 255, 0.2)",
                tension: 0.4,
              },
            ],
          };
          break;
        case "Last Month":
          data = {
            labels: ["Book Issued", "New Member", "Not Returned", "New Book "],
            datasets: [
              {
                label: "Number of Reports",
                data: [70, 60, 40, 80],
                borderColor: "rgba(255, 159, 64, 1)",
                backgroundColor: "rgba(255, 159, 64, 0.2)",
                tension: 0.4,
              },
            ],
          };
          break;
        default:
          data = {
            labels: ["No Data"],
            datasets: [
              {
                label: "No Reports",
                data: [],
                borderColor: "rgba(0, 0, 0, 0.1)",
                backgroundColor: "rgba(0, 0, 0, 0.1)",
              },
            ],
          };
      }

      setChartData(data);
    };

    fetchData();
  }, [activeTab]);

  return (
    <div className="container py-4">
      <div className="row">
        {/* Reports Section */}
        <div className="col-12 mb-4">
          <div className="card shadow-sm">
            <div className="card-header d-flex justify-content-between align-items-center">
              <h5>Reports</h5>
              <div className="nav nav-tabs">
                {["Today", "Last Week", "Last Month"].map((tab) => (
                  <button
                    key={tab}
                    className={`nav-link ${activeTab === tab ? "active" : ""}`}
                    onClick={() => setActiveTab(tab)}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>
            <div className="card-body">
              <Line
                data={chartData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  scales: {
                    y: {
                      title: {
                        display: true,
                        text: "Number of Reports",
                      },
                    },
                  },
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
