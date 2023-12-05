import express from "express";
import dotenv from "dotenv";

import connection from "./database/db.js";
import router from "./routes/route.js";
import cors from "cors";
import bodyParser from "body-parser";

dotenv.config();

const app = express();

app.use(cors());
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/", router);

const PORT = 8080;

app.listen(PORT, () =>
  console.log(`server is running successfully on PORT ${PORT}`)
);

connection();
