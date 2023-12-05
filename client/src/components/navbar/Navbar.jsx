import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar navbar-dark bg-dark pe-4 ps-4">
      <Link className="navbar-brand fw-bold" to="/">
        Navbar
      </Link>
      <div>
        <Link className="text-white text-decoration-none pe-4" to="/">
          Home
        </Link>
        <Link
          className="text-white text-decoration-none pe-4"
          to="/todaysalesreport"
        >
          Today Sales Report
        </Link>
        <Link className="text-white text-decoration-none pe-4" to="/report">
          Report
        </Link>
        <Link className="text-white text-decoration-none pe-4" to="/category">
          Category
        </Link>
        <Link className="text-white text-decoration-none pe-4" to="/product">
          Product
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
