import "./Hero.css"

export default () => {
	return (
		<div className="container__hero">
      <div className="container__hero__background image--back" style={{ backgroundImage: 'url("/backgrounds/model-2.png")' }}></div>
      <div className="container__hero__content">
        <div className="container__hero__content__bottom-left">
          <h1 className="flex">
            <span>Creativity. <span className="highlight">Unboxed.</span></span>
            <span>Explore.</span>
            <span>Share.</span>
          </h1>
          <p>Be inspired <button className="btn btn--primary">Browse.</button></p>
        </div>
      </div>
    </div>
	)
}