import express from "express";
import cors from "cors";
require("dotenv").config({ path: ".env" });
import { routes } from "./routes";

const app = express();

app.use(routes);

app.use(cors());

const port = process.env.PORT || 3000;
var cleanExit = function () {
  process.exit();
};
process.on("SIGINT", cleanExit); // catch ctrl-c
process.on("SIGTERM", cleanExit); // catch kill

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
