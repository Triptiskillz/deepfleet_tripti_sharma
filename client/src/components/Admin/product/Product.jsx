import { Fragment, useState } from "react";
import ShowModel from "./ShowTable";
import http from "../../../api/httpService";
import AddModel from "./AddModel/index";

// Component to manage products, including adding, removing, and editing
function Product() {
  // State to manage the visibility of the modal
  const [showModal, setShowModal] = useState(false);
  // State to store data for editing
  const [editdata, setEditdata] = useState({});

  // Function to show the modal
  const handleShowModel = () => {
    setShowModal(true);
  };

  // Function to handle modal cancel and reset editing data
  const handleModalCancel = () => {
    setShowModal(false);
    setEditdata({});
  };

  // Function to add or update a product
  const handleaddProduct = async (e) => {
    try {
      let response;

      if (e.id) {
        response = await http.put("/updateproduct", e);
      } else {
        response = await http.post("/addproduct", e);
      }
    } catch (error) {
      console.error("Error handling Product:", error);
    }
  };

  // Function to remove a product
  const handleRemoveProduct = async (id) => {
    try {
      const response = await http.deleteApi(`/removeproduct/${id}`);
    } catch (error) {
      console.error("Error removing Product:", error);
    }
  };

  // Function to edit a product
  const handleEditProduct = async (id) => {
    try {
      let newid = +id;
      const response = await http.get(`/showproduct/${newid}`);
      setEditdata(response.data);
      setShowModal(true);
    } catch (error) {
      console.error("Error editing Product:", error);
    }
  };

  // JSX to render the component
  return (
    <Fragment>
      {showModal && (
        <AddModel
          handleCancel={handleModalCancel}
          handleSubmit={handleaddProduct}
          editData={editdata}
        />
      )}

      <div className="container-fluid d-flex justify-content-center">
        <div>
          {/* Button to show the modal */}
          <button
            type="button"
            onClick={handleShowModel}
            className="btn btn-dark mt-4 rounded-0"
          >
            Add Product
          </button>

          {/* Component to show the list of products */}
          <ShowModel
            handleRemove={handleRemoveProduct}
            handleEdit={handleEditProduct}
          />
        </div>
      </div>
    </Fragment>
  );
}

export default Product;
