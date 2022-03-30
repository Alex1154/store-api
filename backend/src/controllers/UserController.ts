import { Router } from "express";
import { UserService } from "../services/UserServices";

const userController = Router();
const userService = new UserService();

userController.get("/get-users", userService.getUsers);
userController.get("/get-user/:id", userService.getUser);
userController.post("/create-user", userService.createUser);
userController.put("/update-user/:id", userService.updateUser);
userController.delete("/delete-user/:id", userService.deleteUser);
userController.delete("/delete-users", userService.deleteUsers);

export { userController };
