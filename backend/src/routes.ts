import { Router } from "express";
import express from "express";
import { userController } from "./controllers/UserController";

import { productController } from "./controllers/ProductController";
import { orderController } from "./controllers/OrderController";
import { paymentController } from "./controllers/PaymentController";

const routes = Router();

routes.use(express.json());
routes.use("/user", userController);
routes.use("/product", productController);
routes.use("/order", orderController);
routes.use("/payment", paymentController);

export { routes };
