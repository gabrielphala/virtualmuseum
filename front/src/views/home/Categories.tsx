import "./Categories.css"

export default () => {
	return (
		<div className="container__categories">
      <div className="container__home-title">
        <h2>Categories and tags</h2>
        <p>What category of art are you interested in?</p>
      </div>
      <ul className="container__categories__list flex flex--j-space-between">
        <li>Women</li>
        <li>Man</li>
        <li>Sculpure</li>
        <li>Painting</li>
        <li>Weapon</li>
      </ul>
    </div>
	)
}