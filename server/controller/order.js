import client from "../database/config.js";

// Add a new order
export const addOrder = async (req, res) => {
  try {
    const orderData = {
      id: Math.floor(Math.random() * (999999 - 1 + 1)) + 1,
      pname: req.body.pname,
      cname: req.body.cname,
      rate: req.body.rate,
      tax: req.body.tax,
      date: req.body.date,
    };

    const insertSql =
      "INSERT INTO orderdata(id, pname, cname, rate, tax, date) VALUES ($1, $2, $3, $4, $5, $6)";

    await client.query(insertSql, Object.values(orderData));

    return res.status(200).json({ msg: "Order Successfully Added!" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

// Fetch orders by date
export const showOrdersByDate = async (req, res) => {
  try {
    const { date } = req.query;
    const sql = "SELECT * FROM orderdata WHERE date = $1"; // Assuming 'orderdata' is your table name

    const result = await client.query(sql, [date]);

    return res.status(200).json(result.rows);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
