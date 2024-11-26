import { useState, useEffect } from "react"

const ProductForm = ({ onSubmit, productToEdit }) => {
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: 0,
    stock: 0
  })

  useEffect(() => {
    if (productToEdit) {
      setProduct(productToEdit)
    }
  }, [productToEdit])

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value })
    console.log(product)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit({
      ...product,
      description: product.description || "Sin descripción",
      price: +product.price,
      stock: +product.stock
    })
    setProduct({
      name: "",
      description: "",
      price: 0,
      stock: 0
    })
  }

  return (
    <form onSubmit={handleSubmit} className="box">
      <h2 className="title is-4">Agregar producto</h2>
      <div className="field">
        <label className="label">Name</label>
        <div className="control">
          <input className="input" name="name" placeholder="Name" value={product.name} onChange={handleChange} required />
        </div>
      </div>

      <div className="field">
        <label className="label">Description</label>
        <div className="control">
          <input className="input" name="description" placeholder="Description" value={product.description} onChange={handleChange} />
        </div>
      </div>

      <div className="field">
        <label className="label">Price</label>
        <div className="control">
          <input className="input" name="price" type="number" placeholder="Price" value={product.price} onChange={handleChange} required />
        </div>
      </div>

      <div className="field">
        <label className="label">Stock</label>
        <div className="control">
          <input className="input" name="stock" type="number" placeholder="Stock" value={product.stock} onChange={handleChange} required />
        </div>
      </div>

      <div className="control">
        <button type="submit" className="button is-primary">{productToEdit ? "Update" : "Add"} Product</button>
      </div>
    </form>
  )
}

export { ProductForm }