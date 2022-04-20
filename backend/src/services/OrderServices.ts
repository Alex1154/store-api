import { prismaClient } from "../database/prismaClient";
import { Request, Response } from "express";
import { json } from "stream/consumers";
import { NamedImportBindings } from "typescript";
import axios from "axios";
import { Decimal } from "@prisma/client/runtime";
import { Payment } from "@prisma/client";
import { paymentResponseType } from "../types/PaymentType";
require("dotenv").config({ path: ".env" });

const port = process.env.PORT || 3000;
const api = axios.create({
  baseURL: `http://localhost:${port}`,
});

export class OderService {
  public async getOrders(req: Request, res: Response) {
    const orders = await prismaClient.order.findMany();
    return res.json(orders);
  }

  public async getOrder(req: Request, res: Response) {
    const { id } = req.params;
    const order = await prismaClient.order
      .findUnique({
        where: {
          orderId: id,
        },
      })
      .then((order) => {
        return res.json(order);
      })
      .catch((err) => {
        return res.json({
          message: "Order not found",
          error: err,
        });
      });
  }

  public async createOrder(req: Request, res: Response) {
    const { userId, cardNumber, productsId } = req.body;
    var paymentResponse: paymentResponseType;
    const handleProductsId = productsId;
    var total: number = 0.0;

    const user = await prismaClient.user
      .findFirst({
        where: { userId },
      })
      .catch((err) => {
        return res.json({
          message: "User not found",
          error: err,
        });
      });

    for (var i = 0; i < handleProductsId.length; i++) {
      var product = await prismaClient.product
        .findUnique({
          where: {
            productId: handleProductsId[i],
          },
        })
        .then((product) => {
          total += product!.price;
        })
        .catch((err) => {
          return res.json({
            message: "Product not found",
          });
        });
    }
    await api
      .post("/payment/create-payment", {
        userId,
        cardNumber,
        total,
      })
      .then((response) => {
        paymentResponse = response.data;
        console.log(paymentResponse);
      })
      .catch((err) => {
        return console.log(
          res.json({
            error: err,
          })
        );
      });

    const order = await prismaClient.order
      .create({
        data: {
          userId,
          productsId,
          payment: paymentResponse!.payment,
          paymentId: paymentResponse!.payment.paymentId,
        },
      })
      .then((order) => {
        return res.status(201).json({
          message: "Order created",
          order,
        });
      })
      .catch((err) => {
        return res.status(400).json({
          message: "cant create order",
          error: err,
        });
      });
  }

  public async deleteOrders(req: Request, res: Response) {
    const order = await prismaClient.order.deleteMany();
    return res.json({
      message: "Orders deleted",
      order,
    });
  }
}
