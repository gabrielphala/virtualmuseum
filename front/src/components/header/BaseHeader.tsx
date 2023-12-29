import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

import { getUserBySession } from "../../helpers/http"
import { IUser } from "../../interfaces/User"

import { showDropdownMenu } from "../../helpers/dropdownmenu"
import DropDownMenu from "../dropdown/DropDownMenu"
import "./header.css"

interface IHeader {
  theme?: any
}

export default (props: IHeader) => {
  const [user, setUser] = useState({} as IUser);

  useEffect(() => {
    (async () => {
      setUser(await getUserBySession())
    })()
  }, [user])

	return (
		<header className={`container__header flex flex--a-center flex--j-space-between ${props.theme}`}>
      <div className="container__header__logo">
        <h6>Virtual<span>Museum</span></h6>
        <p>feel the creativity</p>
      </div>
      <nav className="container__header__menu">
        <ul className="flex">
          <li>Become an Artist</li>

          {user && <li><Link to={`/${user.username}/artworks`}>My works</Link></li>}
          
          <li><Link to="/browse">Browse art</Link></li>
          <li>About</li>
          <li>Contact us</li>
        </ul>
      </nav>
      <div className="container__header__user">
        {
        !user ?
          <div className="flex flex--a-center flex--j-end">
            <p className="margin--right-1"><Link to="/sign-in">Sign in</Link></p>
            <Link to="/sign-up"><button className="btn btn--primary">Sign up</button></Link>
          </div> 
          :
          <>
            <p onClick={() => showDropdownMenu()}>{user.username}</p>
            <DropDownMenu/>
          </>
        }
        
      </div>
    </header>	
	)
}