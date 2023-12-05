import React, { useState, useEffect } from "react";
import "./styles.css";

function TaskModel(props) {
  // Destructuring props to access necessary functions and data
  const { handleCancel, handleSubmit, editData } = props;

  // State to manage the task data
  const [task, setTask] = useState({
    name: "",
  });

  // useEffect to handle pre-filling form data when editing
  useEffect(() => {
    const editCategories = async () => {
      // If there's editData, set the task state with its values; otherwise, set to default
      if (editData) {
        setTask(editData);
      } else {
        setTask({ name: "" });
      }
    };
    editCategories();
  }, [editData]); // Dependency on editData to trigger the effect when it changes

  // Function to handle input changes
  const onChange = (e) => {
    setTask({
      ...task,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="TaskModel">
      {/* Form for editing or adding a task */}
      <form className="TaskForm" onSubmit={() => handleSubmit(task)}>
        <input
          type="text"
          name="name"
          required={true}
          value={task.name}
          placeholder="Category Name"
          onChange={onChange}
        />
        {/* Buttons for canceling or saving the task */}
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
