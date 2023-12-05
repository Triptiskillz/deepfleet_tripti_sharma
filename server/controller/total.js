import client from "../database/config.js";

// Add total data
export const addTotal = async (req, res) => {
  try {
    const totalData = {
      id: generateUniqueId(),
      trate: req.body.trate,
      ttax: req.body.ttax,
      date: req.body.date,
    };

    const insertSql =
      "INSERT INTO total(id, trate, ttax, date) VALUES ($1, $2, $3, $4)";
    await client.query(insertSql, Object.values(totalData));

    return res.status(200).json({ msg: "Value Successfully Added!" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

// Show all total data
export const showTotal = async (req, res) => {
  try {
    const sql = "SELECT * FROM total";

    const result = await client.query(sql);

    return res.status(200).json(result.rows);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

// Generate a unique ID (example, consider a more robust method)
function generateUniqueId() {
  return Date.now().toString(); // Convert the timestamp to a string
}
