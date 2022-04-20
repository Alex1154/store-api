import { prismaClient } from "../database/prismaClient";
import { Request, Response } from "express";

export class ProductService {
  public async getProducts(req: Request, res: Response) {
    const products = await prismaClient.product.findMany();
    return res.json(products);
  }

  public async getProduct(req: Request, res: Response) {
    const { id } = req.params;
    const product = await prismaClient.product
      .findUnique({
        where: {
          productId: id,
        },
      })
      .then((product) => {
        return res.json(product);
      })
      .catch((err) => {
        return res.json({
          message: "Product not found",
          error: err,
        });
      });
  }

  public async createProduct(req: Request, res: Response) {
    const { name, price, description, brand, quantity } = req.body;

    const productExist = await prismaClient.product.findFirst({
      where: {
        name,
        brand,
      },
    });

    if (productExist) {
      return res.json({
        message: "product already exist",
      });
    }

    const product = await prismaClient.product
      .create({
        data: {
          name,
          price,
          description,
          brand,
          quantity,
        },
      })
      .then((product) => {
        return res.status(201).json({
          message: "Product created",
          product,
        });
      })
      .catch((err) => {
        return res.status(400).json({
          message: "cant create product",
          error: err,
        });
      });
  }

  public async updateProduct(req: Request, res: Response) {
    const { id } = req.params;
    const { name, price, description, brand, quantity } = req.body;
    const product = await prismaClient.product
      .update({
        where: {
          productId: id,
        },
        data: {
          name,
          price,
          description,
          brand,
          quantity,
        },
      })
      .then((product) => {
        return res.json({
          message: "Product updated",
          product,
        });
      })
      .catch((err) => {
        return res.status(400).json({
          message: "cant update product",
          error: err,
        });
      });
  }
  public async deleteProduct(req: Request, res: Response) {
    const { productId } = req.params;
    const user = await prismaClient.product
      .delete({
        where: {
          productId: productId,
        },
      })
      .then((user) => {
        return res.json({
          message: "product deleted",
          user,
        });
      })
      .catch((err) => {
        return res.status(400).json({
          message: "can't delete product",
          error: err,
        });
      });
  }

  public async deleteProducts(req: Request, res: Response) {
    const users = await prismaClient.product.deleteMany();
    return res.json({
      message: "products deleted",
      users,
    });
  }
}
