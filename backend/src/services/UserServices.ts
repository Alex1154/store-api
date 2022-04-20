import { prismaClient } from "../database/prismaClient";
import { Request, Response } from "express";

export class UserService {
  public async getUsers(req: Request, res: Response) {
    const users = await prismaClient.user.findMany();
    return res.json(users);
  }

  public async getUser(req: Request, res: Response) {
    const { id } = req.params;
    const user = await prismaClient.user
      .findUnique({
        where: {
          userId: id,
        },
      })
      .catch((err) => {
        return res.json({
          message: "User not found",
          error: err,
        });
      });
    return res.json(user);
  }

  public async createUser(req: Request, res: Response) {
    const { name, email } = req.body;

    const user = await prismaClient.user
      .create({
        data: {
          name,
          email,
        },
      })
      .then((user) => {
        return res.status(201).json({
          message: "User created",
          user,
        });
      })
      .catch((err) => {
        return res.status(400).json({
          message: "cant create user",
          error: err,
        });
      });
  }
  public async updateUser(req: Request, res: Response) {
    const { id } = req.params;
    const { name, email } = req.body;
    const user = await prismaClient.user
      .update({
        where: {
          userId: id,
        },
        data: {
          name,
          email,
        },
      })
      .then((user) => {
        return res.json({
          message: "User updated",
          user,
        });
      })
      .catch((err) => {
        return res.status(400).json({
          message: "cant update user",
          error: err,
        });
      });
  }

  public async deleteUser(req: Request, res: Response) {
    const { id } = req.params;
    const user = await prismaClient.user
      .delete({
        where: {
          userId: id,
        },
      })
      .then((user) => {
        return res.json({
          message: "User deleted",
          user,
        });
      })
      .catch((err) => {
        return res.status(400).json({
          message: "cant delete user",
          error: err,
        });
      });
  }

  public async deleteUsers(req: Request, res: Response) {
    const users = await prismaClient.user.deleteMany();
    return res.json({
      message: "Users deleted",
      users,
    });
  }
}
