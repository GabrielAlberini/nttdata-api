import { Router } from "express"
import { getAllProducts, addProduct, updateProduct, deleteProduct } from "../controllers/productController.js"

const productRouter = Router()

// /api/products
// getAllProducts
productRouter.get("/", getAllProducts)
productRouter.post("/", addProduct)
productRouter.patch("/:id", updateProduct)
productRouter.delete("/:id", deleteProduct)


export { productRouter }


// tomar todos los productos -> /api/products/
// actualizar un producto -> /api/products/