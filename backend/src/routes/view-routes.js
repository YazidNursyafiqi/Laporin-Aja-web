import express from "express"
import viewController from "../controller/view-controller.js"

const viewRoute = express.Router()

viewRoute.get("/:type",viewController)

export default viewRoute
