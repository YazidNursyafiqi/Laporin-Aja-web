import express from "express"
import {viewController , getProvinceStatusController , getLikesController , getMyPostsController} from "../controller/view-controller.js"
import checkAuthMiddleware from "../middlewares/checkAuth.js"

const viewRoute = express.Router()

viewRoute.get("/posts/:type",viewController)
//data pengirim per-provinsi
viewRoute.get("/provinceData",getProvinceStatusController)
//list postingan yang di like
viewRoute.use("/likes",checkAuthMiddleware)
viewRoute.get("/likes/:id",getLikesController)
//list postingan user
viewRoute.use("/sent",checkAuthMiddleware)
viewRoute.get("/sent",getMyPostsController)


export default viewRoute
