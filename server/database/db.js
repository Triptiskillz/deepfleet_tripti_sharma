import client from "./config.js";
async function connection() {
  try {
    // Connect to the PostgreSQL database
    await client.connect();
    console.log("Connected to the database");
  } catch (err) {
    console.error("Error connecting to or querying the database", err);
  }
}
export default connection;
