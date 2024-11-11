import { useState, useEffect } from "react"
import { getProducts, addProduct, updateProduct, deleteProduct } from "../api/productApi"
import { ProductForm } from "../components/ProductForm"
import { ProductList } from "../components/ProductList"

const ProductPage = () => {
  const [products, setProducts] = useState([])
  const [productToEdit, setProductToEdit] = useState(null)

  const loadProducts = async () => {
    const data = await getProducts()
    console.log(data)
    setProducts(data)
  }

  useEffect(() => {
    loadProducts()
  }, [])


  const handleEditProduct = (product) => {
    setProductToEdit(product)
  }

  const handleDeleteProduct = async (id) => {
    const isConfirmed = window.confirm("Estás seguro que quieres borrar el producto?")
    if (isConfirmed) {
      await deleteProduct(id)
      loadProducts()
    }
  }

  const handleAddProduct = async (product) => {
    if (productToEdit) {
      await updateProduct(productToEdit._id, product)
      setProductToEdit(null)
    } else {
      await addProduct(product)
    }
    loadProducts()
  }

  return (
    <div className="container p-3">
      <h1>Product Managment | NTTData</h1>
      <div className="columns">
        <div className="column">
          <ProductForm onSubmit={handleAddProduct} productToEdit={productToEdit} />
        </div>
        <div className="column">
          <ProductList products={products} onEdit={handleEditProduct} onDelete={handleDeleteProduct} />
        </div>
      </div>
    </div>
  )
}

export { ProductPage }