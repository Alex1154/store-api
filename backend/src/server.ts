import express from "express";
import cors from "cors";
require("dotenv").config({ path: ".env" });
import { routes } from "./routes";

const app = express();

app.use(routes);
app.use(express.json());
app.use(cors());

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
