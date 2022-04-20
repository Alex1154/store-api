import { Router } from "express";
import { OderService } from "../services/OrderServices";

const orderController = Router();
const orderService = new OderService();

orderController.get("/get-orders", orderService.getOrders);
orderController.get("/get-order/:id", orderService.getOrder);
orderController.post("/create-order", orderService.createOrder);
// orderController.put("/update-order/:id", orderService.updateOrder)
// orderController.delete("/delete-order/:id", orderService.deleteOrder)
orderController.delete("/delete-orders", orderService.deleteOrders);

export { orderController };
