import { Router } from "express";
import { UserService } from "../services/UserServices";

const userController = Router();
const userService = new UserService();

userController.get("/get-users", userService.getUsers);
userController.get("/get-user/:id", userService.getUser);

export { userController };
