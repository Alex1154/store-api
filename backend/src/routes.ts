import { Router } from "express";
import { userController } from "@controllers/UserController";

const routes = Router();

routes.use("/users", userController);
