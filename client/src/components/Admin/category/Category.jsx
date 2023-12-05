import { Fragment, useState } from "react";
import ShowModel from "./ShowTable";
import http from "../../../api/httpService";
import AddModel from "./AddModel/index";

function Category() {
  // State to manage modal visibility and edited data
  const [showModal, setShowModal] = useState(false);
  const [editdata, setEditdata] = useState({});

  // Function to show the modal
  const handleShowModel = () => {
    setShowModal(true);
  };

  // Function to handle modal cancellation
  const handleModalCancel = () => {
    setShowModal(false);
    setEditdata({});
  };

  // Function to handle adding or updating a category
  const handleaddCategory = async (e) => {
    try {
      let response;

      // If 'id' exists in the data, it's an update; otherwise, it's an add
      if (e.id) {
        response = await http.put("/updatecategory", e);
      } else {
        response = await http.post("/addcategory", e);
      }
    } catch (error) {
      console.error("Error handling category:", error);
    }
  };

  // Function to handle removing a category
  const handleRemoveCategory = async (id) => {
    try {
      const response = await http.deleteApi(`/removecategory/${id}`);
    } catch (error) {
      console.error("Error removing category:", error);
    }
  };

  // Function to handle editing a category
  const handleEditCategory = async (id) => {
    try {
      let newid = +id; // Convert id to a number if needed
      const response = await http.get(`/showcategory/${newid}`);
      setEditdata(response.data);
      setShowModal(true);
    } catch (error) {
      console.error("Error editing category:", error);
    }
  };

  return (
    <Fragment>
      {/* Conditional rendering of AddModel component when showModal is true */}
      {showModal && (
        <AddModel
          handleCancel={handleModalCancel}
          handleSubmit={handleaddCategory}
          editData={editdata}
        />
      )}

      {/* Container for the category management UI */}
      <div className="container-fluid  d-flex justify-content-center">
        {/* Button to show the AddModel modal */}
        <div>
          <button
            type="button"
            onClick={handleShowModel}
            className="btn btn-dark mt-4 rounded-0"
          >
            Add Category
          </button>

          {/* ShowModel component for displaying and managing categories */}
          <ShowModel
            handleRemove={handleRemoveCategory}
            handleEdit={handleEditCategory}
          />
        </div>
      </div>
    </Fragment>
  );
}

export default Category;
