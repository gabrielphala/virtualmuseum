import { Application } from "express";

import baseController from "../controllers/base";
import userService from "../../services/User";

import { IAny, IResponse } from "../../interfaces";

export default (app: Application) => {
  app.post("/sign-up", baseController.wrap(userService.signUp));
  app.post("/sign-in", baseController.wrap(userService.signIn));

  app.post(
    "/user/get/by/session",
    baseController.wrap_with_store(userService.getUserBySession)
  );

  app.post("/user/verify", baseController.wrap_with_store(userService.verify));

  app.post("/sign-out", baseController.signOut);
};
