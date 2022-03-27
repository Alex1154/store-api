import { prismaClient } from "../database/prismaClient";
import { Request, Response } from "express";

export class UserService {
  public async getUsers(req: Request, res: Response) {
    const users = await prismaClient.user.findMany();
    return res.json(users);
  }

  public async getUser(req: Request, res: Response) {
    const { id } = req.params;
    const user = await prismaClient.user.findUnique({
      where: {
        userId: id,
      },
    });
    return res.json(user);
  }

  public async createUser(req: Request, res: Response) {
    const { name, email } = req.body;
    const user = await prismaClient.user.create({
      data: {
        name,
        email,
      },
    });
    return res.json(user);
  }
}
