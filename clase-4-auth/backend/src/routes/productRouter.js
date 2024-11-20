import { Router } from "express"
import { getAllProducts, addProduct, updateProduct, deleteProduct, searchProducts } from "../controllers/productController.js"
import { authMiddleware } from "../middlewares/authMiddleware.js"

const productRouter = Router()

productRouter.use(authMiddleware)

productRouter.get("/", getAllProducts)
productRouter.get("/search", searchProducts)
productRouter.post("/", addProduct)
productRouter.patch("/:id", updateProduct)
productRouter.delete("/:id", deleteProduct)

export { productRouter }
