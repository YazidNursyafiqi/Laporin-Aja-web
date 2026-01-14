import { getAuthController } from "../controller/getAuth-controller.js";
import express from 'express'

import checkAuthMiddleware from "../middlewares/checkAuth.js";

const checkAuthRoutes = express.Router()
checkAuthRoutes.use(checkAuthMiddleware)

checkAuthRoutes.get('/',getAuthController)

export default checkAuthRoutes
