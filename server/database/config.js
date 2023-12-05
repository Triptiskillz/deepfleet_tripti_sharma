import pkg from "pg";
const { Client } = pkg;
// Connection parameters
const dbConfig = {
  user: "postgres",
  host: "db.szrmxthduanxhssoudqq.supabase.co",
  database: "postgres",
  password: "deepfleet@0907",
  port: 5432, // default PostgreSQL port
};
const client = new Client(dbConfig);
export default client;
