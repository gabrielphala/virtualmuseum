import { Link } from "react-router-dom"
import { SERVERURL } from "../../helpers/URL"
import { IItemCard } from "../../interfaces/ItemCard"

import "./itemCard.css"

export default (props: IItemCard) => {
  const folder = props.kind == 'painting' ? 'paintings' : 'thumbnails';

	return (
		<div className="item-card card">
      <div className="item-card__back image--back" style={{ backgroundImage: `url(${SERVERURL}/assets/uploads/artwork/${folder}/${props.image})` }}></div>
      <div className="card__body">
        <h4><Link to={`/tour?art=${props._id}`}>{props.name}</Link></h4>
        <div className="item-card__label">{props.kind}</div>
        <p className="item-card__channel flex flex--a-center">
          <span className="image--back image--round" style={{ backgroundImage: `url(/profiles/blank.jpg)` }}></span>
          <span>{props.user.username}</span>
        </p>
      </div>
      { props._isEditPage ? (<div className="card__footer flex flex--j-end">
          <svg className="image--icon" onClick={() => props.deleteArtwork(props._id)}>
            <use href="#trash"></use>
          </svg>
        </div>) : ''
      }
      
    </div>
	)
}