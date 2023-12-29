import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"

import { postWithNoAuth, getUserBySession } from "../../helpers/http"
import { IUser } from "../../interfaces/User"

import "./dropDownMenu.css"

export default () => {
  const nav = useNavigate();

  const [user, setUser] = useState({} as IUser);

  useEffect(() => {
    (async () => {
      setUser(await getUserBySession())
    })()
  }, [user])

  const signOut = async () => {
    await postWithNoAuth('/sign-out', {}, true)

    nav('/sign-in');
  }

	return (
		<nav className="dropdown-menu hide" id="dropdownmenu">
      <ul className="dropdown-menu__ul">
        <li className="dropdown-menu__ul__item flex flex--a-center">
          <span className="dropdown-menu__ul__item__back image--back image--round" style={{ backgroundImage: `url(/profiles/blank.jpg)` }}></span>
          <span className="dropdown-menu__ul__item__details">
            <span><b>{user.username}</b></span>
            <span><small>Account settings</small></span>
          </span>
        </li>
        <li className="dropdown-menu__ul__item"><Link to="/">Home</Link></li>
        <li className="dropdown-menu__ul__item"><Link to="/browse">Browse</Link></li>
        <li className="dropdown-menu__ul__item"><Link to={`/${user.username}/artworks`}>Artworks</Link></li>
        <li className="dropdown-menu__ul__item"><Link to={`/${user.username}/artworks?kind=model`}>Models</Link></li>
        <li className="dropdown-menu__ul__item"><Link to={`/${user.username}/artworks?kind=painting`}>Paintings</Link></li>
        <li className="dropdown-menu__ul__item" onClick={() => signOut()}>Sign out</li>
      </ul>
    </nav>
	)
}