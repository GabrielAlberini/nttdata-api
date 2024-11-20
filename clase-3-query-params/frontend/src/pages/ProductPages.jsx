import { useState, useEffect } from "react"
import { getProducts, addProduct, updateProduct, deleteProduct } from "../api/productApi"
import { ProductForm } from "../components/ProductForm"
import { ProductList } from "../components/ProductList"
import { ProductFilter } from "../components/ProductFilter"

const ProductPage = () => {
  const [products, setProducts] = useState([])
  const [productToEdit, setProductToEdit] = useState(null)

  const [filter, setFilter] = useState({})

  const loadProducts = async (filterParams = {}) => {
    const data = await getProducts(filterParams)
    console.log(data)
    setProducts(data)
  }

  useEffect(() => {
    loadProducts(filter)
  }, [filter])


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
    loadProducts(filter)
  }

  const handleFilterChange = (newFilters) => {
    setFilter(newFilters)
  }

  return (
    <div className="container p-3">
      <ProductFilter onFilter={handleFilterChange} />
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