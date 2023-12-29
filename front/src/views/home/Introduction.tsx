import "./Introduction.css"

export default () => {
	return (
		<div className="container__introduction">
      <div className="container__introduction__image-desc-pair flex flex--j-space-between">
        <div className="container__introduction__image-desc-pair__desc">
          <div className="container__home-title">
            <h2>What is Virtual Museum</h2>
            <p>Some insights</p>
          </div>

          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus assumenda eum expedita eligendi aspernatur nostrum, beatae in architecto voluptatem at, voluptas hic similique commodi veritatis sit? Voluptatibus vero laudantium excepturi!</p>
        </div>
        <div className="container__introduction__image-desc-pair__image">
          <img src="/backgrounds/gallery-1.webp" alt="" />
        </div>
      </div>
    </div>
	)
}