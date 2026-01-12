import express from "express"
import { loginController } from "../controller/login-controller.js"

const loginRoute = express.Router()
loginRoute.use(express.json())

loginRoute.post("/",loginController)

export default loginRoute