import { useState } from "react"

const ProductFilter = ({ onFilter }) => {
  const [filters, setFilters] = useState({
    name: "",
    minPrice: "",
    maxPrice: "",
    minStock: "",
    maxStock: "",
    sort: "",
    page: 1
  })

  const handleSubmit = (e) => {
    e.preventDefault()

    onFilter(filters)
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value
    }))
  }

  const handlerClearFilters = () => {
    const clearedFilters = {
      name: "",
      minPrice: "",
      maxPrice: "",
      minStock: "",
      maxStock: "",
      sort: "",
      page: 1
    }

    setFilters(clearedFilters)
    onFilter(clearedFilters)
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="box mb-4">
        <h2 className="title is-4">Filtrar productos</h2>

        <div className="field">
          <label className="label">Search</label>
          <input
            className="input"
            type="text"
            placeholder="Search for products..."
            name="name"
            value={filters.search}
            onChange={handleChange}
          />
        </div>

        <div className="field">
          <label className="label">Min Price</label>
          <input
            className="input"
            type="number"
            placeholder="Minimum price"
            name="minPrice"
            value={filters.minPrice}
            onChange={handleChange}
          />
        </div>

        <div className="field">
          <label className="label">Max Price</label>
          <input
            className="input"
            type="number"
            placeholder="Maximum price"
            name="maxPrice"
            value={filters.maxPrice}
            onChange={handleChange}
          />
        </div>

        <div className="field">
          <label className="label">Min Stock</label>
          <input
            className="input"
            type="number"
            placeholder="Minimum stock"
            name="maxStock"
            value={filters.minStock}
            onChange={handleChange}
          />
        </div>

        <div className="field">
          <label className="label">Max Stock</label>
          <input
            className="input"
            type="number"
            placeholder="Maximum stock"
            name="maxStock"
            value={filters.maxStock}
            onChange={handleChange}
          />
        </div>

        <div className="field">
          <label className="label">Sort by</label>
          <div className="select">
            <select name="sort" value={filters.sort} onChange={handleChange}>
              <option value="">Select</option>
              <option value="price_asc">Price: Low to High</option>
              <option value="price_desc">Price: High to Low</option>
            </select>
          </div>
        </div>

        <div className="field">
          <label className="label">Page</label>
          <input
            className="input"
            type="number"
            min="1"
            placeholder="Page number"
            name="page"
            value={filters.page}
            onChange={handleChange}
          />
        </div>

        <button type="submit" className="button is-primary">Aplicar filtros</button>
        <button type="button" className="button is-secondary ml-3" onClick={handlerClearFilters}>Limpiar filtros</button>
      </form>
    </>
  )
}

export { ProductFilter }