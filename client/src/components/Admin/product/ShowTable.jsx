import React, { useEffect, useState } from "react";
import http from "../../../api/httpService";

// Component to display a table of products with options for removal and editing
function ShowModel(props) {
  // Destructure props to get handleRemove and handleEdit functions
  const { handleRemove, handleEdit } = props;

  // State to store the products data
  const [products, setProducts] = useState([]);

  // Fetch products data on component mount or when the products state changes
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await http.get("/showproduct");

        const data = response.data;
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, [products]);

  // JSX to render the component
  return (
    <>
      <table className="table table-sm mt-4 table-bordered table-striped text-center p-4 w-auto">
        <thead className="table-dark">
          <tr>
            <th scope="col" className="p-4">
              ID
            </th>
            <th scope="col" className="p-4">
              Product Name
            </th>
            <th scope="col" className="p-4">
              Category Name
            </th>
            <th scope="col" className="p-4">
              Rate
            </th>
            <th scope="col" className="p-4">
              Tax
            </th>
            <th scope="col" className="p-4"></th>
          </tr>
        </thead>
        <tbody>
          {products.length > 0 ? (
            products.map((p, index) => (
              <tr key={index}>
                <th scope="row">{index + 1}</th>
                <td>{p.pname}</td>
                <td>{p.cname}</td>
                <td>{p.rate}</td>
                <td>{p.tax}</td>
                <td scope="col">
                  {/* Button for removing the product */}
                  <button
                    type="button"
                    onClick={() => handleRemove(p.id)}
                    className="btn btn-danger me-2"
                  >
                    <i className="fa fa-trash" aria-hidden="true"></i>
                  </button>
                  {/* Button for editing the product */}
                  <button
                    type="button"
                    onClick={() => handleEdit(p.id)}
                    className="btn btn-warning"
                  >
                    <i className="fa fa-edit"></i>
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              {/* Display a message when there are no products */}
              <td colSpan="6">
                <h1>No data</h1>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  );
}

export default ShowModel;
