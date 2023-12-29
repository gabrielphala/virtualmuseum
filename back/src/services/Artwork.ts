import Artwork from "../models/Artwork";

import v from "../helpers/Validation";

import { IAny, IResponse } from "../interfaces";

export default class ArtWorkServices {
  static async getAll(wrapRes: IResponse, body: IAny): Promise<IResponse> {
    try {
      if (!body.kind) wrapRes.works = await Artwork.getAllReady();
      else wrapRes.works = await Artwork.getAllReadyByKind(body.kind);

      wrapRes.successful = true;

      return wrapRes;
    } catch (e) {
      throw e;
    }
  }

  static async getAllByUser(
    wrapRes: IResponse,
    body: IAny,
    { userInfo }: IAny
  ): Promise<IResponse> {
    const { kind } = body;

    try {
      wrapRes.works = [];

      if (!userInfo) return wrapRes;

      if (!kind) wrapRes.works = await Artwork.getAllReadyByUser(userInfo._id);
      else
        wrapRes.works = await Artwork.getAllReadyByUserAndKind(
          userInfo._id,
          kind
        );

      wrapRes.successful = true;

      return wrapRes;
    } catch (e) {
      throw e;
    }
  }

  static async getById(wrapRes: IResponse, body: IAny): Promise<IResponse> {
    try {
      wrapRes.art = await Artwork.getById(body.id);

      wrapRes.successful = true;

      return wrapRes;
    } catch (e) {
      throw e;
    }
  }

  static async removeById(wrapRes: IResponse, body: IAny): Promise<IResponse> {
    try {
      wrapRes.art = await Artwork.getById(body.id);

      Artwork.delete(body.id);

      wrapRes.successful = true;

      return wrapRes;
    } catch (e) {
      throw e;
    }
  }
}
