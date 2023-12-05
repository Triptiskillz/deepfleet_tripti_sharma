import React, { useState, useEffect } from "react";
import "./styles.css";
import http from "../../../../api/httpService";

function TaskModel(props) {
  const { handleCancel, handleSubmit, editData } = props;
  const [categories, setCategories] = useState([]);

  // State to manage product data
  const [task, setTask] = useState({
    cname: "",
    pname: "",
    rate: "",
    tax: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch categories to populate the dropdown
        const response = await http.get("/showcategory");
        const data = response.data;
        setCategories(data);

        // If editing, set the form fields with the existing data
        if (editData) {
          setTask(editData);
        } else {
          // If adding, set default values for the form fields
          setTask({ cname: "", pname: "", rate: "", tax: "" });
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchData();
  }, [editData]);

  // Function to handle input changes
  const onChange = (e) => {
    setTask({
      ...task,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="TaskModel">
      <form className="TaskForm" onSubmit={() => handleSubmit(task)}>
        {/* Dropdown for selecting category */}
        <select
          name="cname"
          required={true}
          value={task.cname}
          onChange={onChange}
        >
          <option value="" disabled>
            Select Category
          </option>
          {categories.length > 0 ? (
            categories.map((c) => (
              <option key={c.id} value={c.name}>
                {c.name}
              </option>
            ))
          ) : (
            <option value="" disabled>
              No categories available
            </option>
          )}
        </select>

        {/* Input fields for other product details */}
        <input
          type="text"
          name="pname"
          required={true}
          value={task.pname}
          placeholder="Product Name"
          onChange={onChange}
        />
        <input
          type="number"
          name="rate"
          required={true}
          value={task.rate}
          placeholder="Rate"
          onChange={onChange}
        />
        <input
          type="number"
          name="tax"
          required={true}
          value={task.tax}
          placeholder="Tax"
          onChange={onChange}
        />

        {/* Buttons for canceling or saving the product */}
        <div className="btn-group">
          <button type="button" onClick={handleCancel}>
            Cancel
          </button>
          <button type="submit">Save</button>
        </div>
      </form>
      {/* Overlay to handle canceling when clicking outside the form */}
      <span className="underlay" onClick={handleCancel} />
    </div>
  );
}

export default TaskModel;
