import { Router } from "express";
import { ProductService } from "../services/ProductServices";

const productController = Router();
const productService = new ProductService();

productController.get("/get-products", productService.getProducts);
productController.get("/get-product/:id", productService.getProduct);
productController.post("/create-product", productService.createProduct);
productController.put("/update-product/:id", productService.updateProduct);
productController.delete("/delete-product/:id", productService.deleteProduct);
productController.delete("/delete-products", productService.deleteProducts);

export { productController };
