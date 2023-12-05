import React, { useEffect, useState } from "react";
import http from "../../../api/httpService";

function ShowModel(props) {
  const { handleRemove, handleEdit } = props;
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        // Fetch categories from the server using the http service
        const response = await http.get("/showcategory");

        // Extract data from the response
        const data = response.data;

        // Update the state with the fetched categories
        setCategories(data);
      } catch (error) {
        // Log an error if fetching categories fails
        console.error("Error fetching categories:", error);
      }
    };

    // Fetch categories when the component mounts or when the categories state changes
    fetchCategories();
  }, [categories]); // Dependency on 'categories' to refetch when categories change

  return (
    <>
      {/* Display the categories in a table */}
      <table className="table table-sm mt-4 table-bordered table-striped text-center p-4 w-auto">
        <thead className="table-dark">
          <tr>
            <th scope="col" className="p-4">
              ID
            </th>
            <th scope="col" className="p-4">
              Category Name
            </th>
            <th scope="col" className="p-4"></th>
          </tr>
        </thead>
        <tbody>
          {categories.length > 0 ? (
            categories.map((category, index) => (
              <tr key={index}>
                <th scope="row">{index + 1}</th>
                <td>{category.name}</td>
                <td scope="col">
                  {/* Buttons to remove and edit each category */}
                  <button
                    type="button"
                    onClick={() => handleRemove(category.id)}
                    className="btn btn-danger me-2"
                  >
                    <i class="fa fa-trash" aria-hidden="true"></i>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleEdit(category.id)}
                    className="btn btn-warning"
                  >
                    <i class="fa fa-edit"></i>
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              {/* Display a message when there are no categories */}
              <td colSpan="3">
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
