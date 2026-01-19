import express from "express"
import { uploadController } from "../controller/upload-controller.js"

//tambah middleware untuk handling multipart/from data
import upload from "../middlewares/upload-middleware.js"
//middleware untuk memastikan pengguna sudah login
import checkAuthMiddleware from "../middlewares/checkAuth.js"

const uploadRoute = express.Router()
uploadRoute.use(checkAuthMiddleware)

uploadRoute.post('/',upload.single("image"),uploadController)

export default uploadRoute