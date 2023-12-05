import client from "../database/config.js";

// Fetch all categories
export const showCategories = async (req, res) => {
  try {
    const sql = "SELECT * FROM category";

    // Execute the SQL query to fetch all categories
    const result = await client.query(sql);

    // Respond with the fetched categories
    return res.status(200).json(result.rows);
  } catch (err) {
    // Handle errors and respond with an internal server error
    console.error(err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

// Fetch a single category by ID
export const showOneCategory = async (req, res) => {
  try {
    const categoryId = req.params.id; // Access the id parameter from req.params

    const sql = "SELECT * FROM category WHERE id = $1";

    // Execute the SQL query to fetch a single category by ID
    const result = await client.query(sql, [categoryId]);

    // Respond with the fetched category or a 404 error if not found
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Category not found" });
    }

    return res.status(200).json(result.rows[0]);
  } catch (err) {
    // Handle errors and respond with an internal server error
    console.error(err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

// Add a new category
export const addCategory = async (req, res) => {
  try {
    const category = {
      id: Math.floor(Math.random() * (999999 - 1 + 1)) + 1,
      name: req.body.name,
    };
    const body = Object.values(category);

    const sql1 = "SELECT * FROM category WHERE name = $1";

    // Check if the category with the given name already exists
    const result = await client.query(sql1, [body[1]]);

    // If category doesn't exist, insert it; otherwise, respond that it's already added
    if (result.rows.length === 0) {
      const insertSql = "INSERT INTO category(id, name) VALUES ($1, $2)";
      await client.query(insertSql, body);
      return res.status(200).json({ msg: "Category Successfully Added!" });
    } else {
      return res.status(200).json({ msg: "Category Already Added!" });
    }
  } catch (err) {
    // Handle errors and log them
    console.error(err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

// Update an existing category
export const updateCategory = async (req, res) => {
  try {
    const category = {
      id: req.body.id,
      name: req.body.name,
    };
    const body = Object.values(category);

    const updateSql = "UPDATE category SET name=$2 WHERE id=$1";

    // Execute the SQL query to update the category
    await client.query(updateSql, body);

    // Respond with a success message
    return res.status(200).json({ msg: "Category Successfully Updated!" });
  } catch (err) {
    // Handle errors and respond with a 400 status
    console.error(err);
    return res.status(400).json({ error: "Bad Request" });
  }
};

// Remove an existing category by ID
export const removeCategory = async (req, res) => {
  const categoryId = req.params.id; // Assuming you get the category ID from the request parameters

  try {
    const deleteSql = "DELETE FROM category WHERE id = $1";

    // Execute the SQL query to delete the category
    await client.query(deleteSql, [categoryId]);

    // Respond with a success message
    return res.status(200).json({ msg: "Category Successfully Removed!" });
  } catch (err) {
    // Handle errors and respond with a 400 status
    console.error(err);
    return res.status(400).json({ error: "Bad Request" });
  }
};
