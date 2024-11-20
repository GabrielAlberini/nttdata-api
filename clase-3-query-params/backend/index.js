import express from "express"
import cors from "cors"
import { productRouter } from "./src/routes/productRouter.js"
import { mongoConnect } from "./src/config/mongo.js"
process.loadEnvFile()

const PORT = process.env.PORT ?? 3000
const URI_DB_MONGO = process.env.URI_DB_MONGO

const app = express()
app.use(express.json())
app.use(cors())

// /api/products -> GET POST DELETE PUT/PATCH -> productsRouter | authRouter | salesRouter

app.use("/api/products", productRouter)
// app.use("/api/sales", salesRouter)

app.use("*", (req, res) => {
  res.status(404).json({ error: "resource not found" })
})

app.listen(PORT, () => {
  mongoConnect(URI_DB_MONGO)
  console.log(`Server listening on http://localhost:${PORT}`)
})