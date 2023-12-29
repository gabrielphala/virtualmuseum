import { Application } from "express";

import baseController from "../controllers/base";
import artWorkService from "../../services/Artwork";
import paintingService from "../../services/Painting";
import modelService from "../../services/Model";

import { anyFiles } from "../../config/multer";

import { IAny, IResponse } from "../../interfaces";

export default (app: Application) => {
  app.post(
    "/painting/add/file",
    (req, res, next) => {
      anyFiles("./public/assets/uploads/artwork/paintings", "image")(
        req,
        res,
        async (err) => {
          await paintingService.addPainting(req.body, req);

          next();
        }
      );
    },
    baseController.wrap_with_request((res_wrap, _, req) => {
      res_wrap.successful = req["success"];
      res_wrap.painting = req["painting"];

      return res_wrap;
    })
  );

  app.post(
    "/painting/add/details",
    baseController.wrap_with_store(paintingService.addPaintingDetails)
  );

  app.post(
    "/model/add/thumbnail",
    (req, res, next) => {
      anyFiles("./public/assets/uploads/artwork/thumbnails", "image")(
        req,
        res,
        async (err) => {
          await modelService.addModelThumbnail(req.body, req);

          next();
        }
      );
    },
    baseController.wrap_with_request((res_wrap, _, req) => {
      res_wrap.successful = req["success"];
      res_wrap.thumbnail = req["thumbnail"];

      return res_wrap;
    })
  );

  app.post(
    "/model/add/model-file",
    (req, res, next) => {
      anyFiles("./public/assets/uploads/artwork/models", "zip")(
        req,
        res,
        async (err) => {
          await modelService.addModelFile(req.body, req);

          next();
        }
      );
    },
    baseController.wrap_with_request((res_wrap, _, req) => {
      res_wrap.successful = req["success"];
      res_wrap.art = req["art"];

      return res_wrap;
    })
  );

  app.post(
    "/model/add/details",
    baseController.wrap_with_store(modelService.addModelDetails)
  );

  app.post(
    "/works/get/all/by/artist",
    baseController.wrap_with_store(artWorkService.getAllByUser)
  );

  app.post("/works/get/all", baseController.wrap(artWorkService.getAll));
  app.post("/works/get/one", baseController.wrap(artWorkService.getById));
  app.post("/works/delete", baseController.wrap(artWorkService.removeById));
};
