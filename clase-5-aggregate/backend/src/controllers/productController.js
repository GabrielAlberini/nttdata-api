import { Product } from "../models/productModel.js"
import { productValidator } from "../validators/productValidator.js";

const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({ owner: req.user.id });
    res.status(200).json(products)
  } catch (error) {
    res.status(500).json({ message: "Error al obtener los productos", error: error.message })
  }
}

const searchProducts = async (req, res) => {
  try {
    const { name, minPrice, maxPrice, minStock, maxStock, sort = "price_asc", limit = 5, page = 1 } = req.query

    const query = { owner: req.user.id }

    if (name) {
      query.name = { $regex: name, $options: "i" }
    }

    if (minPrice || maxPrice) {
      query.price = {}
      if (minPrice) query.price.$gte = +minPrice
      if (maxPrice) query.price.$lte = +maxPrice
    }

    if (minStock || maxStock) {
      query.stock = {}
      if (minStock) query.stock.$gte = +minStock
      if (maxStock) query.stock.$lte = +maxStock
    }

    const sortOrders = {
      priceAsc: { price: 1 },
      priceDesc: { price: -1 }
    }

    const sortOrder = sortOrders[sort] || { price: 1 }

    console.log(query)
    const products = await Product.find(query, null, {
      sort: sortOrder,
      limit: +limit,
      skip: (page - 1) * +limit
    })


    res.json(products)
  } catch (error) {
    res.json({ error: error.message })
  }
}

const getStatsProducts = async (req, res) => {
  try {
    const { operation } = req.params
    // average-price, stock-stats, top-expensive, low-stock

    switch (operation) {
      case "average-price":
        const averagePrice = await Product.aggregate([
          { $group: { _id: "$owner", averagePrice: { $avg: "$price" } } }
        ])

        return res.json(averagePrice)
      case "stock-stats":
        const stockStats = await Product.aggregate([
          {
            $group: {
              _id: "$owner",
              totalStock: { $sum: "$stock" },
              averageStock: { $avg: "$stock" },
              minStock: { $min: "$stock" },
              maxStock: { $max: "$stock" }
            }
          }
        ])

        return res.json(stockStats)
      case "top-expensive":
        const topExpensive = await Product.aggregate([
          { $sort: { price: -1 } },
          { $limit: 5 }
        ])

        return res.json(topExpensive)
      case "low-stock":
        const { min = 1000 } = req.query

        const lowStock = await Product.aggregate([
          { $match: { stock: { $lt: +min } } },
          { $sort: { stock: 1 } }
        ])

        return res.json(lowStock)
      default:
        return res.status(400).json({ message: "Operación invalida" })
    }
  } catch (error) {
    res.status(500).json({ message: "Error al obtener los productos", error: error.message })
  }
}

const addProduct = async (req, res) => {
  try {
    const validatedData = productValidator.parse(req.body)

    const newProduct = new Product({ ...validatedData, owner: req.user.id })
    await newProduct.save()

    res.status(201).json(newProduct)
  } catch (error) {
    if (error.name === "ZodError") {
      res.status(400).json({ message: "Datos de entrada inválidos", errors: error.errors })
    } else {
      res.status(500).json({ message: "Error al crear un producto", error: error.message })
    }
  }
}

const updateProduct = async (req, res) => {
  try {
    const validatedData = productValidator.partial().parse(req.body)

    const updatedProduct = await Product.findByIdAndUpdate({ _id: req.params.id, owner: req.user.id }, validatedData, {
      new: true,
      runValidators: true
    })

    if (updatedProduct === null) {
      return res.status(404).json({ message: "Producto no encontrado" })
    }

    res.status(200).json(updatedProduct)
  } catch (error) {
    if (error.name === "ZodError") {
      res.status(400).json({ message: "Datos de entrada inválidos", errors: error.errors })
    } else {
      res.status(500).json({ message: "Error al actualizar el producto", error: error.message })
    }
  }
}

const deleteProduct = async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete({ _id: req.params.id, owner: req.user.id })

    if (!deletedProduct) {
      return res.status(404).json({ message: "Producto no encontrado" })
    }

    res.status(200).json({ message: "Producto eliminado", product: deletedProduct })
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar el producto", error: error.message })
  }
}

export { getAllProducts, addProduct, updateProduct, deleteProduct, searchProducts, getStatsProducts }