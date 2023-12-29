import { IUser } from "./User"

export interface IItemCard {
  _id?: number | string,
  _isEditPage: boolean,
  name: string,
  user: IUser,
  kind: string,
  image?: string,
  description: string,

  deleteArtwork: Function
}