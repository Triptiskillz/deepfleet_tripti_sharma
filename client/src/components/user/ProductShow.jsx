import React from "react";

// Component to display and manage the products
function ProductShow(props) {
  // Destructuring props to get necessary data and functions
  let { products, handleSubmit, deleteItemById } = props;

  // Calculate total tax and total rate
  const totalTax = products.reduce(
    (acc, item) => acc + parseFloat(item.tax),
    0
  );
  const totalRate = products.reduce((acc, item) => {
    const rate = parseFloat(item.rate);
    const taxPercentage = parseFloat(item.tax) / 100;
    const calculatedRate = rate / (1 + taxPercentage);

    // Round the calculatedRate to two decimal places
    const roundedRate = parseFloat(calculatedRate.toFixed(2));

    return acc + roundedRate;
  }, 0);

  // JSX to render the component
  return (
    <>
      {/* Table to display product details */}
      <div className="container-fluid d-flex justify-content-center">
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
                Rate (INR)
              </th>
              <th scope="col" className="p-4">
                Tax (INR)
              </th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {products.length > 0 ? (
              products.map((p, index) => (
                <tr key={index}>
                  <th scope="row">{index + 1}</th>
                  <td>{p.pname}</td>
                  <td>{p.cname}</td>
                  <td>
                    {parseFloat(p.rate).toLocaleString("en-IN", {
                      style: "currency",
                      currency: "INR",
                    })}
                  </td>
                  <td>{p.tax}%</td>
                  <td onClick={() => deleteItemById(index)}>
                    <i
                      className="fa fa-trash text-danger p-2 fs-4"
                      aria-hidden="true"
                    ></i>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6">
                  <h1>No data</h1>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Display total tax, total rate, and Final Bill button */}
      <div className="mt-4  d-flex justify-content-center  ">
        <p className="border p-4 border-dark">
          <b>Total Tax: </b>
          {totalTax.toLocaleString("en-IN", {
            style: "currency",
            currency: "INR",
          })}
          <br />
          <b>Total Rate: </b>
          {totalRate.toLocaleString("en-IN", {
            style: "currency",
            currency: "INR",
          })}
          <br />
          {products.length > 0 && (
            <div className="align-self-center pt-4 ">
              <button
                type="button"
                onClick={() =>
                  handleSubmit(
                    products,
                    totalRate.toFixed(2),
                    totalTax.toFixed(2)
                  )
                }
                className="btn btn-dark rounded-0 w-100"
              >
                Final Bill
              </button>
            </div>
          )}
        </p>
      </div>
    </>
  );
}

export default ProductShow;
