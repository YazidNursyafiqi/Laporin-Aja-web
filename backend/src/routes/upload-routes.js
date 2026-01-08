import express from "express"
import { uploadController } from "../controller/upload-controller.js"

//tambah middleware untuk handling multipart/from data
import { uploadMiddleware } from "../middlewares/upload-middleware.js"

const uploadRoute = express.Router()


uploadRoute.post('/',uploadMiddleware.single("image"),uploadController)

export default uploadRoute