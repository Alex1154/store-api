import { Router } from "express";
import { PaymentServices } from "../services/PaymentServices";

const paymentController = Router();
const paymentService = new PaymentServices();

paymentController.get("/get-payments", paymentService.getPayments);
paymentController.get("/get-payment/:id", paymentService.getPayment);
paymentController.post("/create-payment", paymentService.createPayment);
paymentController.delete("/delete-payment/:id", paymentService.deletePayment);
paymentController.delete("/delete-payment", paymentService.deletePayments);
paymentService;
export { paymentController };
