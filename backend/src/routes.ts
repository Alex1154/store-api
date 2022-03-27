import { Router } from "express";
import { userController } from "./controllers/UserController";
import express from "express";

const routes = Router();

routes.use(express.json());
routes.use("/users", userController);

export { routes };
