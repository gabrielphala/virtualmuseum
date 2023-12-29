import Artwork from "../models/Artwork";

import v from "../helpers/Validation"

import { IAny, IResponse } from "../interfaces";

export default class ArtPaintingServices {
  static async addPainting (body: IAny, req: IAny): Promise<void> {
    try {
      if (!req.files[0]) throw 'Please upload proper thumbnail';

      const artwork = await Artwork.getNotReadyOrMakeNew(
        req.store.userInfo._id,
        'painting'
      );

      artwork.image = req.files[0].filename
      artwork.hasImage = true;
      artwork.save()

      req.success = true;
      req.painting = req.files[0].filename;

    } catch (e) { throw e; }
  }

  static async addPaintingDetails (wrapRes: IResponse, body: IAny, { userInfo }: IAny): Promise<IResponse>  {
    try {
      const { name, description } = body;

      const artwork = await Artwork.getNotReadyOrMakeNew(
        userInfo._id,
        'painting'
      );

      if (!artwork.hasImage) throw 'Please upload a painting first';

      artwork.name = name;
      artwork.description = description;
      artwork.isReady = true;

      artwork.save();

      wrapRes.successful = true;

      return wrapRes;
    } catch (e) { throw e; }
  }
};