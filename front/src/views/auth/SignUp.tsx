import { getElementValueById } from "../../helpers/dom";
import { SERVERURL } from "../../helpers/URL";

import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import "./auth.css"

export default () => {
  const [isAuth, setAuth] = useState(null) as any;
  const [username, setUsername] = useState('') as any;

  const nav = useNavigate();

  const signUp = async (e: any) => {
    (e as PointerEvent).preventDefault();

    const _res = await (await fetch(`${SERVERURL}/sign-up`, {
      method: 'POST',
      body: JSON.stringify({
        username: getElementValueById('username'),
        email: getElementValueById('email-address'),
        fullname: getElementValueById('fullname'),
        password: getElementValueById('password'),
        passwordAgain: getElementValueById('password-again')
      }),
      headers: { 'Content-Type': 'application/json;charset=utf-8' },
      credentials: 'include'
    })).json();

    setAuth(_res.successful);

    if (_res.successful) {
      setUsername(_res.userDetails.username)
    }
  };

  useEffect(() => {
    if (isAuth) nav(`/${username}/artworks`);;
  }, [isAuth]);

	return (
		<main className="auth flex flex--a-center">
      <form className="auth__form" onSubmit={(e) => signUp(e)}>
        <div className="auth__form__logo">
          <h1>Virtual<span>Museum</span></h1>
          <p>feel the creativity</p>
        </div>
        <div className="auth__form__body">
          <div className="input">
            <input type="text" id="username" placeholder="Username" />
          </div>
          <div className="input">
            <input type="email" id="email-address" placeholder="Email addres" />
          </div>
          <div className="input">
            <input type="text" id="fullname" placeholder="Full name" />
          </div>
          <div className="input">
            <input type="password" id="password" placeholder="Password" />
          </div>
          <div className="input">
            <input type="password" id="password-again" placeholder="Password again" />
          </div>
          <div className="input">
            <input type="submit" className="btn btn--primary" value="Sign in" />
          </div>
        </div>
        <div className="auth__form__footer margin--top-2 flex flex--j-center">
          <p>Already have an account? Sign in</p>
        </div>
      </form>
      <div className="auth__background image--back" style={{ backgroundImage: `url(/backgrounds/woman-2.jpg)` }}></div>
    </main>
	)
}