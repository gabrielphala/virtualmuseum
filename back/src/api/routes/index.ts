import { Application } from "express"

import userRoutes from "./user"
import artworkRoutes from "./artwork"

export default (app: Application) : void => {
    userRoutes(app)
    artworkRoutes(app)
}