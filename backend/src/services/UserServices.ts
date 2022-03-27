import { prismaClient } from "../database/prismaClient";
import { Request, Response } from "express";

export class UserService {
  public async getUsers(req: Request, res: Response) {
    const users = await prismaClient.user.findMany();
    res.json(users);
  }

  public async getUser(req: Request, res: Response) {
    const { id } = req.params;
    const user = await prismaClient.user.findUnique({
      where: {
        userId: id,
      },
    });
    res.json(user);
  }
}
