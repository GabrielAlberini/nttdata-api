const ProductList = ({ products, onEdit, onDelete }) => {
  return (
    <div className="columns is-multiline">
      {products.map((product) => (
        <div key={product._id} className="column is-half">
          <div className="card">
            <div className="card-content">
              <p className="title is-4">{product.name}</p>
              <p className="subtitle is-6 mt-3">{product.description || "Sin descripción"}</p>
              <p>Price: <strong>${product.price}</strong></p>
              <p>Stock: <strong>{product.stock}</strong></p>
            </div>
            <footer className="card-footer p-2">
              <button className="card-footer-item button is-info is-light" onClick={() => onEdit(product)}>Edit</button>
              <button className="card-footer-item button is-danger is-light ml-2" onClick={() => onDelete(product._id)}>Delete</button>
            </footer>
          </div>
        </div>
      ))}
    </div>
  )
}

export { ProductList }