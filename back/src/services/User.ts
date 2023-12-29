import User from "../models/User";

import v from "../helpers/Validation";
import hasher from "../helpers/Hasher";
import jwt from "../helpers/Jwt";

import { IAny, IResponse } from "../interfaces";

export default class UserServices {
  static async signUp(wrapRes: IResponse, body: IAny): Promise<IResponse> {
    try {
      const { fullname, email, username, password, passwordAgain } = body;

      v.validate({
        "Full name": { value: fullname, min: 2, max: 66 },
        "Email address": { value: email, min: 2, max: 66 },
        Username: { value: username, min: 3, max: 25 },
        Password: { value: password, min: 8, max: 30 },
        "Password again": {
          value: passwordAgain,
          min: 8,
          max: 30,
          is: ["Password", "Passwords do not match"],
        },
      });

      if (await User.getByEmail(email))
        throw `Email address: ${email} already exists`;

      if (await User.getByUsername(username))
        throw `Username: ${username} already exists`;

      const userDetails = await User.add({
        fullname: fullname,
        email: email,
        username: username,
        password: await hasher.hash(password),
      });

      delete userDetails.password;

      const tokens = jwt.get_cookie_tokens(userDetails.toJSON());
      wrapRes.set_cookie("_m_user", JSON.stringify(tokens));

      wrapRes.userDetails = userDetails;
      wrapRes.successful = true;

      return wrapRes;
    } catch (e) {
      throw e;
    }
  }

  static async signIn(wrapRes: IResponse, body: IAny): Promise<IResponse> {
    try {
      const { identifier, password } = body;

      v.validate({
        "Username or Email address": { value: identifier, min: 3, max: 30 },
        Password: { value: password, min: 8, max: 30 },
      });

      let userDetails = await User.getByEmail(identifier);

      if (!userDetails) userDetails = await User.getByUsername(identifier);

      if (!userDetails)
        throw "Email address or Username or Password is incorrect";

      if (!hasher.isSame(userDetails.password, password))
        throw "Email address or Username or Password is incorrect";

      delete userDetails.password;

      const tokens = jwt.get_cookie_tokens(userDetails.toJSON());
      wrapRes.set_cookie("_m_user", JSON.stringify(tokens));

      wrapRes.userDetails = userDetails;
      wrapRes.successful = true;

      return wrapRes;
    } catch (e) {
      throw e;
    }
  }

  static getUserBySession(
    wrapRes: IResponse,
    body: IAny,
    { userInfo }: IAny
  ): IResponse {
    wrapRes.details = userInfo;
    wrapRes.successful = true;

    return wrapRes;
  }

  static verify(wrapRes: IResponse, body: IAny, { userInfo }: IAny): IResponse {
    wrapRes.isUserLoggedIn = true;

    if (
      !body.username ||
      !userInfo ||
      (userInfo && userInfo.username != body.username)
    )
      wrapRes.isUserLoggedIn = false;

    return wrapRes;
  }
}
