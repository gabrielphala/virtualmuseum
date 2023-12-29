import { useEffect, useState } from "react"

import { getUserBySession } from "../../helpers/http"
import { IUser } from "../../interfaces/User"

import { showDropdownMenu } from "../../helpers/dropdownmenu"
import DropDownMenu from "../dropdown/DropDownMenu"

import "./header.css"

export default () => {
  const [user, setUser] = useState({} as IUser);

  useEffect(() => {
    (async () => {
      setUser(await getUserBySession())
    })()
  }, [user])

	return (
		<header className="container__header flex flex--a-center flex--j-space-between">
      <div className="container__header__logo">
        <h6>Virtual<span>Museum</span></h6>
        <p>feel the creativity</p>
      </div>
      <div className="container__header__user">
        <p onClick={() => showDropdownMenu()}>{user.username}</p>

        <DropDownMenu />
      </div>
    </header>	
	)
}