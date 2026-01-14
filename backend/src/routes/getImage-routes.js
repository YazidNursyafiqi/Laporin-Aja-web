import express from "express"
import { getImageController } from "../controller/getImageController.js"

const getImageRoute = express.Router()

getImageRoute.get("/:name",getImageController)

export default getImageRoute