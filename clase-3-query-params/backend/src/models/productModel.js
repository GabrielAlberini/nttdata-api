import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  description: {
    type: String,
    trim: true,
    default: "Sin descripción"
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  stock: {
    type: Number,
    required: true,
    default: 0,
    min: 0
  }
}, {
  strict: true,
  versionKey: false
})

productSchema.index({ name: "text" })

const Product = mongoose.model("product", productSchema)

export { Product }