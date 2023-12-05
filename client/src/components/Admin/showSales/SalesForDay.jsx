import React, { useState, useEffect } from "react";
import http from "../../../api/httpService";

// Component to display sales data for a specific day
const SalesForDay = () => {
  // State to store sales data and selected date
  const [salesData, setSalesData] = useState([]);
  let [selectedDate, setSelectedDate] = useState(
    new Date().toLocaleDateString()
  );

  // Fetch sales data for the selected date
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await http.get(`/sales?date=${selectedDate}`);
        setSalesData(response.data);
      } catch (error) {
        console.error("Error fetching sales data:", error);
      }
    };

    fetchData();
  }, [selectedDate]);

  // Handle date change
  const handleDateChange = (event) => {
    const inputDate = event.target.value;
    const [year, month, day] = inputDate.split("-");
    const formattedDate = `${year}-${day}-${month}`;
    setSelectedDate(formattedDate);
  };

  // Format options for displaying dates
  const options = { year: "numeric", month: "2-digit", day: "2-digit" };

  // Initialize totalRate and totalTax
  let totalRate = 0;
  let totalTax = 0;

  // Iterate over the array and sum the rates and taxes
  salesData.forEach((item) => {
    totalRate += parseFloat(item.rate);
    totalTax += parseFloat(item.tax);
  });

  // JSX to render the component
  return (
    <div className="container mt-4">
      <h2>Sales for a Day</h2>

      {/* Date Picker */}
      <div className="mb-3">
        <label htmlFor="datePicker" className="form-label">
          Select Date:
        </label>
        <input
          type="date"
          id="datePicker"
          className="form-control border border-dark rounded-0"
          value={selectedDate}
          onChange={handleDateChange}
        />
      </div>

      {/* Sales Table */}
      <table className="table table-striped">
        <thead>
          <tr className="bg-dark text-white">
            <th>ID</th>
            <th>Product Name</th>
            <th>Category Name</th>
            <th>Rate</th>
            <th>Tax</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {salesData.length > 0 ? (
            salesData.map((sale) => (
              <tr key={sale.id}>
                <td>{sale.id}</td>
                <td>{sale.pname}</td>
                <td>{sale.cname}</td>
                <td>
                  {parseFloat(sale.rate).toLocaleString("en-IN", {
                    style: "currency",
                    currency: "INR",
                  })}
                </td>
                <td>{sale.tax}%</td>
                <td>
                  {new Date(sale.date).toLocaleDateString("en-US", options)}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              {/* Display a message when there are no sales data */}
              <td colSpan="6" className="text-center">
                <h1>No data</h1>
              </td>
            </tr>
          )}
          {/* Total row */}
          <tr className="bg-dark text-white">
            <td></td>
            <td></td>
            <td></td>
            <td>
              {parseFloat(totalRate).toLocaleString("en-IN", {
                style: "currency",
                currency: "INR",
              })}
            </td>
            <td>{totalTax}%</td>
            <td></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default SalesForDay;
