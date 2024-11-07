import { Router } from "express"
import { getAllProducts, addProduct } from "../controllers/productController.js"

const productRouter = Router()

// /api/products
// getAllProducts
productRouter.get("/", getAllProducts)
productRouter.post("/", addProduct)

export { productRouter }