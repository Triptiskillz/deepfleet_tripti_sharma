import React, { useState, useEffect, Fragment } from "react";
import http from "../../../api/httpService";

// Component to display a summary of total revenue for a specific day, month, and year
const SummaryWidget = () => {
  // State to store data, selected date, and loading/error indicators
  const [data, setData] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch data on component mount or when the selected date changes
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await http.get("/showtotal");
        setData(response.data);
        // Set default date values
        let date = new Date();
        let month = date.getMonth();
        let formattedMonth = month < 10 ? "0" + month : month;
        let day = date.getDate();
        let formattedDay = day < 10 ? "0" + day : day;
        let year = date.getFullYear();
        setSelectedDate(`${year}-${formattedDay}-${formattedMonth}`);
        setSelectedYear(year);
        setSelectedMonth(formattedMonth);
      } catch (error) {
        setError("Error fetching data");
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedDate]);

  // Function to calculate total revenue for a specific day
  const calculateTotalRevenueForDay = (date) => {
    const totalRevenue = data
      .filter((entry) => entry.date.split("T")[0].startsWith(date))
      .reduce((total, entry) => total + parseFloat(entry.trate), 0);

    return totalRevenue;
  };

  // Function to calculate total revenue for a specific month
  const calculateTotalRevenueForMonth = (month, year) => {
    const totalRevenue = data
      .filter((entry) => {
        let newMonth = new Date(entry.date).getDate();
        let formattedMonth = newMonth < 10 ? "0" + newMonth : newMonth;
        return (
          formattedMonth == month + 1 &&
          new Date(entry.date).getFullYear() === year
        );
      })
      .reduce((total, entry) => total + parseFloat(entry.trate), 0);

    return totalRevenue;
  };

  // Function to calculate total revenue for a specific year
  const calculateTotalRevenueForYear = (year) => {
    const totalRevenue = data
      .filter((entry) => new Date(entry.date).getFullYear() === year)
      .reduce((total, entry) => total + parseFloat(entry.trate), 0);

    return totalRevenue;
  };

  // JSX to render the component
  return (
    <Fragment>
      <div className="text-center mt-4">
        <h1>Total Revenue Summary</h1>
      </div>
      <div className="d-flex justify-content-center align-items-center gap-4 mt-4">
        <div className="card text-center shadow p-3 mb-5 bg-white border-dark rounded-0">
          <div className="card-body">
            <span className="text-secondary">Total Revenue for the Day</span>
            <h2 className="card-text">
              {calculateTotalRevenueForDay(selectedDate).toLocaleString(
                "en-IN",
                {
                  style: "currency",
                  currency: "INR",
                }
              )}
            </h2>
          </div>
        </div>
        <div className="card text-center shadow p-3 mb-5 bg-white border-dark rounded-0">
          <div className="card-body">
            <span className="text-secondary">Total Revenue for the Month</span>
            <h2 className="card-text">
              {calculateTotalRevenueForMonth(
                selectedMonth,
                selectedYear
              ).toLocaleString("en-IN", {
                style: "currency",
                currency: "INR",
              })}
            </h2>
          </div>
        </div>
        <div className="card text-center shadow p-3 mb-5 bg-white border-dark rounded-0">
          <div className="card-body">
            <span className="text-secondary">Total Revenue for the Year</span>
            <h2 className="card-text">
              {calculateTotalRevenueForYear(selectedYear).toLocaleString(
                "en-IN",
                {
                  style: "currency",
                  currency: "INR",
                }
              )}
            </h2>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default SummaryWidget;
