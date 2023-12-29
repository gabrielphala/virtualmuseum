import "./auth.css"

import { getElementValueById } from "../../helpers/dom";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { postWithNoAuth } from "../../helpers/http";
import { showError } from "../../helpers/error";

export default () => {
  const [isAuth, setAuth] = useState(null) as any;
  const [username, setUsername] = useState('') as any;

  const nav = useNavigate();

  const signIn = async (e: any) => {
    (e as PointerEvent).preventDefault();

    const res = await postWithNoAuth('/sign-in', {
      identifier: getElementValueById('identifier'),
      password: getElementValueById('password')
    }, true)

    setAuth(res.successful);

    if (res.successful) {
      return setUsername(res.userDetails.username)
    }

    showError('auth', res.error)
  };

  useEffect(() => {
    if (isAuth) nav(`/${username}/artworks`);;
  }, [isAuth]);

	return (
		<main className="auth flex flex--a-center">
      <form className="auth__form" onSubmit={(e) => signIn(e)}>
        <div className="auth__form__logo">
          <h1>Virtual<span>Museum</span></h1>
          <p>feel the creativity</p>
        </div>
        <div className="auth__form__body">
          <div className="error hide" id="auth-error"><p><b>Sorry.</b> <span className="error-msg">error here</span></p></div>
          <div className="input">
            <input type="text" id="identifier" placeholder="Username or Email address" />
          </div>
          <div className="input">
            <input type="password" id="password" placeholder="Password" />
          </div>
          <div className="input">
            <button className="btn btn--primary" >Sign in</button>
          </div>
        </div>
        <div className="auth__form__footer margin--top-2 flex flex--j-center">
          <p>Don't have an account? <Link to='/sign-up'>Sign up</Link></p>
        </div>
      </form>
      <div className="auth__background image--back" style={{ backgroundImage: `url(/backgrounds/woman-2.jpg)` }}></div>
    </main>
	)
}