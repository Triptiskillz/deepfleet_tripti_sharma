import { Fragment, useState } from "react";
import SearchModel from "./SearchModel.jsx";
import http from "../../api/httpService.js";
import ProductShow from "./ProductShow.jsx";

function Landing() {
  // State for handling errors and products
  const [error, setErr] = useState("");
  const [products, setProducts] = useState([]);

  // Function to handle search form submission
  const handleSearchSubmit = async (task) => {
    if (task.cname === "" || task.pname === "") {
      setErr("Please select category and product");
    } else {
      try {
        // Fetch products from the server
        const response = await http.get("/showproduct");
        const data = response.data;

        // Filter products based on category and product name
        const filteredData = data.filter(
          (item) => item.pname === task.pname && item.cname === task.cname
        );

        if (filteredData.length > 0) {
          // Use the spread operator to add individual items to the products array
          setProducts((prevArray) => [...prevArray, ...filteredData]);
          setErr("");
        } else {
          setErr("Not Found!");
        }
      } catch (error) {
        console.error("Error fetching categories and products:", error);
        setErr("Error fetching products");
      }
    }
  };

  // Function to handle final bill submission
  const handleFinalBillSubmit = async (data, totalRate, totalTax) => {
    try {
      const date = new Date().toLocaleDateString();

      // Create order for each product in the final bill
      data.map(async (e) => {
        let body = {
          pname: e.pname,
          cname: e.cname,
          rate: e.rate,
          tax: e.tax,
          date: date,
        };
        await http.post("/order", body);
      });

      // Create a total record for the final bill
      let totalbody = {
        trate: totalRate,
        ttax: totalTax,
        date: date,
      };
      await http.post("/total", totalbody);

      // Clear the products array after successful submission
      setProducts([]);
      alert("Final bill added successfully !");
    } catch (error) {
      console.error("Error:", error);
      setErr("Error");
    }
  };

  // Function to delete an item from the products array
  const deleteItemById = (id) => {
    let newproducts = products.filter((item, index) => index !== id);
    setProducts(newproducts);
  };

  return (
    <Fragment>
      {/* Search form component */}
      <SearchModel handleSubmit={handleSearchSubmit} />

      {/* Display error message if any */}
      {error !== "" && (
        <div className="text-center alert alert-warning fw-bold" role="alert">
          {error}
        </div>
      )}

      {/* Component to show products and handle final bill submission */}
      <ProductShow
        products={products}
        handleSubmit={handleFinalBillSubmit}
        deleteItemById={deleteItemById}
      />
    </Fragment>
  );
}

export default Landing;
