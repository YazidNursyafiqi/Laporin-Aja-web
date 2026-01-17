import express from "express"
import {viewController , getProvinceStatusController} from "../controller/view-controller.js"

const viewRoute = express.Router()

viewRoute.get("/posts/:type",viewController)
//data pengirim per-provinsi
viewRoute.get("/provinceData",getProvinceStatusController)

export default viewRoute
