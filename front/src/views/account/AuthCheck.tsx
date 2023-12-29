import { useNavigate, useParams } from "react-router-dom"
import { isUserLoggedIn } from "../../helpers/http";
import { useEffect, useState } from "react";

export default (props: any) => {
  const nav = useNavigate();
  const { username } = useParams();
  const [ isLoggedIn, setIsLoggedIn ] = useState()

  useEffect(() => {
    (async () => {
      const isLoggedIn = await isUserLoggedIn(username);

      setIsLoggedIn(isLoggedIn)

      if (!isLoggedIn) nav('/sign-in')
    })()
  }, [isLoggedIn])

	return (
		<>
      {isLoggedIn && props.children}
    </>
	)
}