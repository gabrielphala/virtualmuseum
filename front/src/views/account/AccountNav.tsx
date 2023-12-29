import { Link, useNavigate, useParams } from "react-router-dom"
import { getPath } from "../../helpers/URL";
import "./AccountNav.css"
import { getElementsByClass } from "../../helpers/dom";

const prepSuffix = (username: string | undefined) => {
  return username ? `/${username}` : '';
}

export default (props: any) => {
  const {username} = useParams();
  const nav = useNavigate();

  const removeLinkHighlight = () => {
    Array.from(getElementsByClass('account-nav__ul__item'))
      .forEach(elem => {
        elem.classList.remove('account-nav__ul__item--active')
      })
  }

  const nextLocation = (e: any) => {
    e.preventDefault();

    nav(getPath(e.target.href))
    removeLinkHighlight();

    (e.target as HTMLElement).classList.add('account-nav__ul__item--active')

    props.setArtwork()
  }

	return (
		<nav className="account-nav">
      <ul className="account-nav__ul flex">
        <Link to={`${prepSuffix(username)}/artworks`} onClick={ (e) => nextLocation(e) } className="account-nav__ul__item account-nav__ul__item--active">All works</Link>
        <Link to={`${prepSuffix(username)}/artworks?kind=painting`} onClick={ (e) => nextLocation(e) } className="account-nav__ul__item">Paintings</Link>
        <Link to={`${prepSuffix(username)}/artworks?kind=model`} onClick={ (e) => nextLocation(e) } className="account-nav__ul__item">3D Models</Link>
      </ul>
    </nav>
	)
}