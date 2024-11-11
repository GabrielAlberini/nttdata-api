import axios from "axios"

// http://localhost:1235/api/products

const API_URL = import.meta.env.VITE_API_URL

// GET -> http://localhost:1235/api/products
const getProducts = async () => {
  const response = await axios.get(API_URL)
  return response.data
}

// POST -> http://localhost:1235/api/products
const addProduct = async (product) => {
  const response = await axios.post(API_URL, product)
  return response.data
}

// PATCH -> http://localhost:1235/api/products/:id
const updateProduct = async (id, updatedProduct) => {
  const response = await axios.patch(`${API_URL}/${id}`, updatedProduct)
  return response.data
}

// DELETE -> http://localhost:1235/api/products/:id
const deleteProduct = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`)
}

export { getProducts, addProduct, updateProduct, deleteProduct }