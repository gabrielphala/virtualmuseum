import "./browseFilter.css"

export default () => {
	return (
		<section className="container__browse__filter flex flex--j-space-between">
      <div className="container__browse__filter__filter-area flex">
        <div className="container__browse__filter__item margin--right-2">
          <label htmlFor="category">Category</label>
          <div className="input">
            <select id="category">
              <option value="all">All</option>
              <option value="painting">Painting</option>
              <option value="model">Model</option>
            </select>
          </div>
        </div>
        <div className="container__browse__filter__item">
          <label htmlFor="style">Style</label>
          <div className="input">
            <select id="style">
              <option value="all">All</option>
              <option value="oil">Oil</option>
              <option value="black n white">Black n White</option>
            </select>
          </div>
        </div>
      </div>
      <div className="container__browse__filter__sort-area">
        <div className="container__browse__filter__item">
          <label htmlFor="sort-by">Sort by</label>
          <div className="input">
            <select id="sort-by">
              <option value="upload date">Upload date</option>
            </select>
          </div>
        </div>
      </div>
    </section>
	)
}