import React, { Fragment, useState, useEffect } from "react";
import http from "../../api/httpService";

// Component for the search form to filter products by category and product name
function SearchModel(props) {
  // Destructure props to get the necessary function
  const { handleSubmit } = props;

  // State to store category list, product list, and selected category and product
  const [categoryList, setCategoryList] = useState([]);
  const [products, setProducts] = useState([]);
  const [task, setTask] = useState({
    cname: "",
    pname: "",
  });

  // Fetch products and update category list when the component mounts or when products change
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await http.get("/showproduct");

        const data = response.data;
        let arry = [];
        data.map((e) => arry.push(e.cname));

        arry = [...new Set(arry)];
        setCategoryList(arry);
        setProducts(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchProducts();
  }, [products]);

  // Handle input changes and update the task state
  const onChange = (e) => {
    setTask({
      ...task,
      [e.target.name]: e.target.value,
    });
  };

  // JSX to render the search form
  return (
    <form className="container-fluid d-flex justify-content-center gap-4 p-4 m-4">
      <div className="form-group">
        <select
          className="form-control text-dark rounded-0 border border-dark"
          name="cname"
          value={task.cname}
          required={true}
          onChange={onChange}
        >
          <option value="" disabled>
            Select Category
          </option>
          {categoryList.length > 0 ? (
            categoryList.map((c, index) => (
              <option key={index} value={c}>
                {c}
              </option>
            ))
          ) : (
            <option value="" disabled>
              No categories available
            </option>
          )}
        </select>
      </div>
      <div className="form-group">
        <select
          className="form-control text-dark rounded-0 border border-dark"
          name="pname"
          value={task.pname}
          required={true}
          onChange={onChange}
        >
          <option value="" disabled>
            Select Product
          </option>
          {products.length > 0 ? (
            products.map((c, index) => (
              <option key={index} value={c.pname}>
                {c.pname}
              </option>
            ))
          ) : (
            <option value="" disabled>
              No Products available
            </option>
          )}
        </select>
      </div>

      <div className="align-self-center">
        <button
          type="button"
          onClick={() => handleSubmit(task)}
          className="btn btn-dark rounded-0"
        >
          Add
        </button>
      </div>
    </form>
  );
}

export default SearchModel;
