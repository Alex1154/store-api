import { prismaClient } from "../database/prismaClient";
import { Request, Response } from "express";

export class PaymentServices {
  public async getPayments(req: Request, res: Response) {
    const payments = await prismaClient.payment.findMany();
    return res.json(payments);
  }

  public async getPayment(req: Request, res: Response) {
    const { id } = req.params;
    const payment = await prismaClient.payment
      .findUnique({
        where: {
          paymentId: id,
        },
      })
      .then((payment) => {
        return res.json(payment);
      })
      .catch((err) => {
        return res.json({
          message: "Payment not found",
          error: err,
        });
      });
  }

  public async createPayment(req: Request, res: Response) {
    const { userId, cardNumber, total } = req.body;

    // return res.json({ message: "Payment created", userId, cardNumber, total });

    const payment = await prismaClient.payment
      .create({
        data: {
          userId,
          cardNumber,
          total,
        },
      })
      .then((payment) => {
        return res.status(201).json({
          message: "Payment created",
          payment,
        });
      })
      .catch((err) => {
        return res.status(400).json({
          message: "cant create payment",
          err,
        });
      });
  }

  public async deletePayments(req: Request, res: Response) {
    const payment = await prismaClient.payment.deleteMany();
    return res.json({
      message: "Payments deleted",
      payment,
    });
  }

  public async deletePayment(req: Request, res: Response) {
    const { paymentId } = req.params;
    const payment = await prismaClient.payment
      .delete({
        where: { paymentId },
      })
      .then((payment) => {
        return res.json({
          message: "Payments deleted",
          payment,
        });
      })
      .catch((err) => {
        return res.json({
          message: "Payment not found",
          error: err,
        });
      });
  }
}
