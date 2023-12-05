import client from "../database/config.js";

// Fetch all products
export const showProducts = async (req, res) => {
  try {
    const sql = "SELECT * FROM product";

    // Execute the SQL query to fetch all products
    const result = await client.query(sql);

    // Respond with the fetched products
    return res.status(200).json(result.rows);
  } catch (err) {
    // Handle errors and respond with an internal server error
    console.error(err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

// Fetch a single product by ID
export const showOneProduct = async (req, res) => {
  try {
    const productId = req.params.id; // Access the id parameter from req.params

    const sql = "SELECT * FROM product WHERE id = $1";

    // Execute the SQL query to fetch a single product by ID
    const result = await client.query(sql, [productId]);

    // Respond with the fetched product or a 404 error if not found
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Product not found" });
    }

    return res.status(200).json(result.rows[0]);
  } catch (err) {
    // Handle errors and respond with an internal server error
    console.error(err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

// Add a new product
export const addProduct = async (req, res) => {
  try {
    const product = {
      id: Math.floor(Math.random() * (999999 - 1 + 1)) + 1,
      pname: req.body.pname,
      cname: req.body.cname,
      rate: req.body.rate,
      tax: req.body.tax,
    };
    let body = Object.values(product);

    const sql1 = "SELECT * FROM product WHERE pname = $1";

    // Check if the product with the given name already exists
    const result = await client.query(sql1, [body[1]]);
    // If product doesn't exist, insert it; otherwise, respond that it's already added
    if (result.rows.length === 0) {
      const insertSql =
        "INSERT INTO product(id, pname, cname, rate, tax) VALUES ($1, $2, $3, $4, $5)";
      await client.query(insertSql, body);
      return res.status(200).json({ msg: "Product Successfully Added!" });
    } else {
      return res.status(200).json({ msg: "Product Already Added!" });
    }
  } catch (err) {
    // Handle errors and log them
    console.error(err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

// Update an existing product
export const updateProduct = async (req, res) => {
  try {
    const product = {
      id: req.body.id,
      pname: req.body.pname,
      cname: req.body.cname,
      rate: req.body.rate,
      tax: req.body.tax,
    };
    let body = Object.values(product);

    const updateSql =
      "UPDATE product SET pname=$2, cname=$3, rate=$4, tax=$5 WHERE id=$1";

    // Execute the SQL query to update the product
    await client.query(updateSql, body);

    // Respond with a success message
    return res.status(200).json({ msg: "Product Successfully Updated!" });
  } catch (err) {
    // Handle errors and respond with a 400 status
    return res
      .status(400)
      .json({ error: { message: "An error occurred", details: err } });
  }
};

// Remove an existing product by ID
export const removeProduct = async (req, res) => {
  const productId = req.params.id; // Assuming you get the product ID from the request parameters

  try {
    const deleteSql = "DELETE FROM product WHERE id = $1";

    // Execute the SQL query to delete the product
    await client.query(deleteSql, [productId]);

    // Respond with a success message
    return res.status(200).json({ msg: "Product Successfully Removed!" });
  } catch (err) {
    // Handle errors and respond with a 400 status
    console.error(err);
    return res.status(400).json({
      error: {
        message: "An error occurred during product removal",
        details: err,
      },
    });
  }
};
